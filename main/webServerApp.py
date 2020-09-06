import picowebimport wifiManagerfrom machine import reset,RTCfrom time import timeimport jsonfrom gc import collect,mem_freefrom asyn import sleep,cancellable,StopTaskimport uasyncio as asyncioclass WebServerApp:          def __init__(self,wlan,wattmeter,evse):        self.wifiManager = wlan        self.ipAddress = self.wifiManager.getIp()        self.wattmeter = wattmeter        self.evse = evse        self.port = 8000        self.ROUTES = [             ("/", self.main),             ("/datatable", self.dataTable),            ("/updateWificlient",self.updateWificlient),             ("/updateSetting",self.updateSetting),            ("/updateData", self.updateData),             ("/settings", self.settings),            ("/getEspID", self.getEspID),            ("/readRegister", self.readRegister)        ]        self.app = picoweb.WebApp(None, self.ROUTES)        def main(self,req, resp):        collect()        mem_free()        yield from picoweb.start_response(resp)        yield from self.app.render_template(resp,"main.html")    def settings(self,req, resp):        collect()        mem_free()        yield from picoweb.start_response(resp)        yield from self.app.render_template(resp, "settings.html", (req,))            def updateData(self,req, resp):        collect()        mem_free()         if req.method == "POST":            datalayer = {}            req = await  self.proccessMsg(req)            for i in req.form:                i = json.loads(i)                if(list(i.keys())[0] == 'relay'):                    if(self.wattmeter.negotiationRelay()):                        datalayer = {"process":1}                    else:                        datalayer = {"process":0}                elif(list(i.keys())[0] == 'time'):                    rtc=RTC()                    rtc.datetime((int(i["time"][2]), int(i["time"][1]), int(i["time"][0]), 0, int(i["time"][3]), int(i["time"][4]), int(i["time"][5]), 0))                               self.wattmeter.startUpTime = time()                    self.wattmeter.timeInit = True                    datalayer = {"process":"OK"}            yield from picoweb.jsonify(resp,datalayer)                        else:            datalayer = self.wattmeter.dataLayer.data            datalayer.update(self.evse.dataLayer.data)                 yield from picoweb.jsonify(resp,datalayer)                def updateWificlient(self,req, resp):        collect()        mem_free()         if req.method == "POST":            datalayer = {}            req = await  self.proccessMsg(req)            for i in req.form:                 i = json.loads(i)                 datalayer = await self.wifiManager.handle_configure(i["ssid"],i["password"])                self.ipAddress=self.wifiManager.getIp()                datalayer = {"process":datalayer,"ip":self.ipAddress}            yield from picoweb.jsonify(resp,datalayer)                        else:            datalayer = self.wifiManager.getSSID()            datalayer["connectSSID"] = self.wifiManager.getCurrentConnectSSID()            yield from picoweb.jsonify(resp,datalayer)            def readRegister(self,req, resp):        if req.method == "POST":            datalayer = {}            req =  await self.proccessMsg(req)            for i in req.form:                 i = json.loads(i)                 register = int(i["register"])                data = await self.wattmeter.readWattmeterRegister(register,1)                datalayer = {"data":data}                        yield from picoweb.jsonify(resp,datalayer)                                #Funkce pro vycitani a ukladani nastaveni    def updateSetting(self,req, resp):        collect()        mem_free()         from main import __config__        setting = __config__.Config()                if req.method == "POST":            datalayer = {}            req = await self.proccessMsg(req)                        for i in req.form:                 i = json.loads(i)                if(i['variable'] == 'bt,RESET WATTMETER'):                    reset()                                    datalayer = setting.handle_configure(i["variable"],i["value"])                datalayer = {"process":datalayer}                        yield from picoweb.jsonify(resp,datalayer)                        else:            datalayer = setting.getConfig()            yield from picoweb.jsonify(resp,datalayer)                    def dataTable(self,req, resp):        collect()        mem_free()         yield from picoweb.start_response(resp)        yield from self.app.render_template(resp, "datatable.html", (req,))    def getEspID(self,req,resp):        from main import __config__        setting = __config__.Config()        datalayer = {"ID":" Wattmeter: {}".format(setting.getConfig()['ID']), "IP":self.wifiManager.getIp()}        yield from picoweb.jsonify(resp,datalayer)                     def proccessMsg(self,req):        size = int(req.headers[b"Content-Length"])        qs = yield from req.reader.read(size)        req.qs = qs.decode()        req.parse_qs()        return req            @cancellable    async def webServerRun(self, delay, ip,n):        threadName= None        sock = None        try:            print("Start webserver App")             threadName = self.app.run(debug=True, host=ip,port=self.port,name=n)            while True:                await sleep(delay)                        except StopTask:            print("I will kill webserver")            asyncio.StreamWriter(asyncio.activeSock['app2'],'').aclose()            asyncio.StreamReader(asyncio.activeSock['app2']).aclose()            asyncio.cancel(threadName)            asyncio.activeSock['app2'].close()