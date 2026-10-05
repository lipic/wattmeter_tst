import picoweb
from machine import reset, RTC
from time import time
import ujson as json
import gc
from gc import collect
from collections import OrderedDict
import uasyncio as asyncio
collect()

REQUEST_TIMEOUT_S = 30
MAX_BODY = 1024           # vetsi telo POST se odmitne (ochrana pameti)
JSON_CHUNK = 256          # velke JSON odpovedi se posilaji po castech teto velikosti


def _json_pieces(obj):
    # JSON po malych kouscich (generator). Slovnik a seznam se rozlozi az na
    # jednotlive polozky, takze se nikdy nesklada cely retezec odpovedi.
    if isinstance(obj, dict):
        yield "{"
        first = True
        for key in list(obj.keys()):      # kopie klicu - data se mezi zapisy muzou menit
            if not first:
                yield ","
            first = False
            yield json.dumps(key)
            yield ":"
            for piece in _json_pieces(obj.get(key)):
                yield piece
        yield "}"
    elif isinstance(obj, (list, tuple)):
        yield "["
        for i in range(len(obj)):
            if i:
                yield ","
            for piece in _json_pieces(obj[i]):
                yield piece
        yield "]"
    else:
        yield json.dumps(obj)
_ASYNCIO_V3 = hasattr(asyncio, "Loop") and hasattr(asyncio, "wait_for")
_LOG_WEB = "web:"


class WebServerApp:
    def __init__(self, wlan, wattmeter, evse, watt_io, evse_io, setting):
        self.watt_io = watt_io
        self.evse_io = evse_io
        self.wifi_manager = wlan
        self.ip_address = self.wifi_manager.getIp()
        self.wattmeter = wattmeter
        self.evse = evse
        self.port = 8000
        self.datalayer = dict()
        self.setting = setting
        self.ROUTES = [
            ("/", self.main),
            ("/datatable", self.data_table),
            ("/overview", self.over_view),
            ("/updateWificlient", self.update_wificlient),
            ("/updateSetting", self.update_setting),
            ("/updateData", self.update_data),
            ("/updateEvse", self.update_evse),
            ("/settings", self.settings),
            ("/powerChart", self.power_chart),
            ("/energyChart", self.energy_chart),
            ("/getEspID", self.get_esp_id),
            ("/modbusRW", self.modbus_rw),
            ("/diag", self.diag)
        ]
        self.diag_provider = None     # nastavi TaskHandler (doba behu, restart, chyby)
        self.app = picoweb.WebApp(None, self.ROUTES)
        self._install_request_timeout()

    def _install_request_timeout(self):
        if hasattr(self.app, "_handle_conn"):
            print(_LOG_WEB, 'timeout fw')
            return
        if not _ASYNCIO_V3:
            print(_LOG_WEB, 'timeout skip')
            return

        original = self.app._handle

        def guarded(reader, writer):
            try:
                yield from asyncio.wait_for(original(reader, writer), REQUEST_TIMEOUT_S)
            except Exception as e:
                print(_LOG_WEB, 'drop', e)
            finally:
                try:
                    yield from writer.aclose()
                except Exception:
                    pass

        self.app._handle = guarded
        print(_LOG_WEB, 'timeout', REQUEST_TIMEOUT_S)

    def main(self, req, resp):
        collect()
        yield from picoweb.start_response(resp)
        yield from self.app.render_template(resp, "main.html")

    def over_view(self, req, resp):
        collect()
        yield from picoweb.start_response(resp)
        yield from self.app.render_template(resp, "overview.html")

    def settings(self, req, resp):
        collect()
        yield from picoweb.start_response(resp)
        yield from self.app.render_template(resp, "settings.html", (req,))

    def power_chart(self, req, resp):
        collect()
        yield from picoweb.start_response(resp)
        yield from self.app.render_template(resp, "powerChart.html", (req,))

    def energy_chart(self, req, resp):
        collect()
        yield from picoweb.start_response(resp)
        yield from self.app.render_template(resp, "energyChart.html", (req,))

    def modbus_rw(self, req, resp):
        collect()
        if req.method == "POST":
            datalayer = {"process": 0, "value": "Bad request"}
            i = await self.read_json(req)
            try:
                reg = int(i['reg'])
                _id = int(i['id'])
                data = int(i.get('value', 0))
                req_type = i['type']
            except Exception:
                req_type = None
            if req_type is not None:
                if req_type == 'read':
                    try:
                        if _id == 0:
                            async with self.watt_io as w:
                                data = await w.readWattmeterRegister(reg, 1)
                        else:
                            async with self.evse_io as e:
                                data = await e.readEvseRegister(reg, 1, _id)
                        if data is None:
                            datalayer = {"process": 0, "value": "Error during reading register"}
                        else:
                            datalayer = {"process": 1, "value": int(((data[0]) << 8) | (data[1]))}

                    except Exception as e:
                        datalayer = {"process": e}

                elif req_type == 'write':
                    try:
                        if _id == 0:
                            async with self.watt_io as w:
                                data = await w.writeWattmeterRegister(reg, [data])
                        else:
                            async with self.evse_io as e:
                                data = await e.writeEvseRegister(reg, [data], _id)

                        if data is None:
                            datalayer = {"process": 0, "value": "Error during writing register"}
                        else:
                            datalayer = {"process": 1, "value": int(((data[0]) << 8) | (data[1]))}

                    except Exception as e:
                        datalayer = {"process": e}

            yield from picoweb.start_response(resp, "application/json")
            yield from resp.awrite(json.dumps(datalayer))

    def update_data(self, req, resp):
        collect()
        datalayer = {}
        if req.method == "POST":
            i = await self.read_json(req)
            if i is not None and 'relay' in i:
                if self.wattmeter.negotiation_relay():
                    datalayer = {"process": 1}
                else:
                    datalayer = {"process": 0}
            elif i is not None and 'time' in i:
                try:
                    t = i["time"]
                    rtc = RTC()
                    rtc.datetime((int(t[2]), int(t[1]), int(t[0]), 0, int(t[3]), int(t[4]), int(t[5]), 0))
                    self.wattmeter.start_up_time = time()
                    self.wattmeter.time_init = True
                    datalayer = {"process": "OK"}
                except Exception:
                    datalayer = {"process": 0}
            yield from picoweb.jsonify(resp, datalayer)

        else:
            charge_mode = int(self.setting.config['chargeMode'])
            self.wattmeter.data_layer.data['chargeMode'] = charge_mode
            yield from picoweb.start_response(resp, "application/json")
            # po castech: json.dumps cele odpovedi (~2 KB+) potreboval jeden
            # souvisly blok pameti a na fragmentovane halde padal (prazdne telo)
            yield from self.awrite_json(resp, self.wattmeter.data_layer.data)

    def update_evse(self, req, resp):
        yield from picoweb.start_response(resp, "application/json")
        yield from resp.awrite(self.evse.data_layer.__str__())

    def update_wificlient(self, req, resp):

        collect()
        if req.method == "POST":
            datalayer = {}
            i = await self.read_json(req)
            if i is None or not i.get("ssid"):
                # neplatny pozadavek - stejny kod jako "nevybrana sit"
                yield from picoweb.jsonify(resp, {"process": 0, "ip": self.ip_address})
                return

            if i["ssid"] == "no_wifi":
                with open('wifi.dat', 'w') as f:
                    f.write('')
                reset()
            else:
                datalayer = await self.wifi_manager.handle_configure(i["ssid"], i.get("password") or "")
                self.ip_address = self.wifi_manager.getIp()
                datalayer = {"process": datalayer, "ip": self.ip_address}

                yield from picoweb.start_response(resp, "application/json")
                yield from resp.awrite(json.dumps(datalayer))

        else:
            client = self.wifi_manager.getSSID()
            datalayer = {}
            for i in client:
                if client[i] > -86 and len(i) > 0:
                    datalayer[i] = client[i]
            datalayer["connectSSID"] = self.wifi_manager.getCurrentConnectSSID()
            datalayer["no_wifi"] = 0
            yield from picoweb.start_response(resp, "application/json")
            yield from resp.awrite(json.dumps(datalayer))

    def update_setting(self, req, resp):
        collect()

        if req.method == "POST":
            datalayer = {"process": False}
            i = await self.read_json(req)
            if i is not None and "variable" in i and "value" in i:
                datalayer = {"process": self.setting.handle_configure(i["variable"], i["value"])}

            yield from picoweb.start_response(resp, "application/json")
            yield from resp.awrite(json.dumps(datalayer))

        else:
            # konfigurace + hodnoty drzene jen v RAM (ram,EVSEx), poradi klicu
            # konfigurace se zachova - podle nej se sklada stranka Nastaveni
            datalayer = OrderedDict()
            config = self.setting.getConfig()
            for key in config:
                datalayer[key] = config[key]
            for key, value in self.setting.get_ram().items():
                datalayer[key] = value
            yield from picoweb.start_response(resp, "application/json")
            yield from self.awrite_json(resp, datalayer)

    def data_table(self, req, resp):
        collect()
        yield from picoweb.start_response(resp)
        yield from self.app.render_template(resp, "datatable.html", (req,))

    def get_esp_id(self, req, resp):
        ip = "192.168.4.1"
        try:
            if self.wifi_manager.wlan_sta.isconnected():
                ip = self.wifi_manager.wlan_sta.ifconfig()[0]
        except Exception:
            pass
        datalayer = {"ID": " Wattmeter: {}".format(self.setting.config['ID']), "IP": ip}
        yield from picoweb.start_response(resp, "application/json")
        yield from resp.awrite(json.dumps(datalayer))

    def awrite_json(self, resp, obj):
        # Odeslani JSON po kouscich ~JSON_CHUNK B - zadny velky souvisly blok.
        # Kousky se spojuji primo do retezce (ne do seznamu): u dlouhych
        # ciselnych poli je kousku na 256 B pres 80 a seznam by sam potreboval
        # souvisly blok ~0,5-1 KB.
        chunk = ""
        for piece in _json_pieces(obj):
            chunk += piece
            if len(chunk) >= JSON_CHUNK:
                yield from resp.awrite(chunk)
                chunk = ""
        if chunk:
            yield from resp.awrite(chunk)

    def diag(self, req, resp):
        # Diagnostika pro hledani pricin "odmlceni": pamet, nejvetsi souvisly
        # blok (fragmentace haldy), doba behu, pricina posledniho restartu.
        collect()
        free = gc.mem_free()
        info = {
            "version": self.setting.config.get("txt,ACTUAL SW VERSION"),
            "mem_free": free,
            "mem_alloc": gc.mem_alloc(),
            "largest_block": self.largest_block(free),
        }
        if self.diag_provider is not None:
            try:
                info.update(self.diag_provider())
            except Exception as e:
                info["diag_error"] = str(e)
        yield from picoweb.start_response(resp, "application/json")
        yield from resp.awrite(json.dumps(info))

    def largest_block(self, free):
        # Nejvetsi blok, ktery jde prave alokovat (puleni intervalu). Kdyz je
        # vyrazne mensi nez mem_free, je halda fragmentovana.
        lo = 0
        hi = free
        while hi - lo > 64:
            mid = (lo + hi) // 2
            try:
                block = bytearray(mid)
                del block
                lo = mid
            except MemoryError:
                hi = mid
            collect()       # uvolnit pokusny blok pred dalsim, vetsim pokusem
        return lo

    def read_json(self, req):
        # Telo POST je JSON objekt (frontend posila retezec z JSON.stringify).
        # Cte se readexactly - read(n) vrati jen to, co uz doslo, a kdyz telo
        # prijde po castech, JSON by byl useknuty. Vraci dict, jinak None.
        try:
            size = int(req.headers.get(b"Content-Length", 0))
        except Exception:
            size = 0
        if size <= 0 or size > MAX_BODY:
            return None
        try:
            body = yield from req.reader.readexactly(size)
            body = body.decode()
        except Exception:
            return None
        data = None
        try:
            data = json.loads(body)
        except Exception:
            # zpetna kompatibilita: JSON zakodovany jako formular (drivejsi
            # cteni pres parse_qs - zaroven rozbijelo hodnoty s & = + %)
            try:
                req.qs = body
                req.parse_qs()
                for key in req.form:
                    data = json.loads(key)
                    break
            except Exception:
                data = None
        return data if isinstance(data, dict) else None

    async def webServer_run(self):
        try:
            print("Webserver app started")
            self.app.run(debug=False, host='', port=self.port)
            while True:
                await asyncio.sleep(100)
        except Exception as e:
            print(_LOG_WEB, 'err', e)
            reset()
