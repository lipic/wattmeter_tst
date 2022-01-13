import picoweb
import wifiManager
from machine import reset,RTC
from time import time
import json
from gc import collect,mem_free
from asyn import sleep,cancellable,StopTask
import uasyncio as asyncio
from main import taskHandler
from main import __config__

class WebServerApp:
    def __init__(self,wlan,wattmeter,evse,wattIO,evseIO):
        self.wattIO = wattIO
        self.evseIO = evseIO
        self.wifiManager = wlan
        self.ipAddress = self.wifiManager.getIp()
        self.wattmeter = wattmeter
        self.evse = evse
        self.port = 8000
        self.datalayer = dict()
        self.ROUTES = [ 
            ("/", self.main), 
            ("/datatable", self.dataTable),
            ("/overview", self.overView),
            ("/updateWificlient",self.updateWificlient),
            ("/updateSetting",self.updateSetting),
            ("/updateData", self.updateData), 
            ("/settings", self.settings),
            ("/powerChart", self.powerChart),
            ("/energyChart", self.energyChart),
            ("/getEspID", self.getEspID),
            ("/modbusRW", self.modbusRW)
        ]
        self.app = picoweb.WebApp(None, self.ROUTES)

         
    def main(self,req, resp):
        collect()
        yield from picoweb.start_response(resp)
        yield from self.app.render_template(resp,"main.html")
    
    def overView(self,req, resp):
        collect()
        yield from picoweb.start_response(resp)
        yield from self.app.render_template(resp,"overview.html")

    def settings(self,req, resp):
        collect()
        yield from picoweb.start_response(resp)
        yield from self.app.render_template(resp,"settings.html", (req,))
        
    def powerChart(self,req, resp):
        collect()
        yield from picoweb.start_response(resp)
        yield from self.app.render_template(resp,"powerChart.html", (req,))
    
    def modbusRW(self,req, resp):
        collect()
        if req.method == "POST":
            datalayer = {}
            req = await  self.proccessMsg(req)
            for i in req.form:
                i = json.loads(i)
                reg = int(i['reg'])
                ID = int(i['id'])
                data = int(i['value'])
                if i['type'] == 'read':
                    try:
                        if ID == 0:
                            async with self.wattIO as w:
                                data = await w.readWattmeterRegister(reg,1)
                        else:
                            async with self.evseIO as e:
                                data = await e.readEvseRegister(reg,1,ID)
                        if data is None:
                            datalayer = {"process":0,"value":"Error during reading register"}
                        else:
                            datalayer = {"process":1,"value":int(((data[0]) << 8) | (data[1]))}

                    except Exception as e:
                        print("Error during reading",e)
                        datalayer = {"process":e}

                elif i['type'] == 'write':
                    try:
                        if ID == 0:
                            async with self.wattIO as w:
                                data = await w.writeWattmeterRegister(reg,[data])
                        else:
                            async with self.evseIO as e:
                                data = await e.writeEvseRegister(reg,[data],ID)
                        
                        if data is None:
                            datalayer = {"process":0,"value":"Error during writing register"}
                        else:
                            datalayer = {"process":1,"value":  int(((data[0]) << 8) | (data[1]))}

                    except Exception as e:
                        print("Error during reading",e)
                        datalayer = {"process":e}
            yield from picoweb.start_response(resp, "application/json")
            yield from resp.awrite(json.dumps(datalayer))
        
    def energyChart(self,req, resp):
        collect()
        yield from picoweb.start_response(resp)
        yield from self.app.render_template(resp, "energyChart.html", (req,))
        
    def updateData(self,req, resp):
        collect() 
        datalayer = {}
        if req.method == "POST":
            req = await  self.proccessMsg(req)
            for i in req.form:
                i = json.loads(i)
                if list(i.keys())[0] == 'relay':
                    if self.wattmeter.negotiationRelay():
                        datalayer = {"process":1}
                    else:
                        datalayer = {"process":0}
                elif list(i.keys())[0] == 'time':
                    rtc=RTC()
                    rtc.datetime((int(i["time"][2]), int(i["time"][1]), int(i["time"][0]), 0, int(i["time"][3]), int(i["time"][4]), int(i["time"][5]), 0))           
                    self.wattmeter.startUpTime = time()
                    self.wattmeter.timeInit = True
                    datalayer = {"process":"OK"}
            yield from picoweb.jsonify(resp,datalayer)
                
        else:
            yield from picoweb.start_response(resp, "application/json")
            datalayer = self.wattmeter.dataLayer.data
            datalayer.update(self.evse.dataLayer.data)
            #picoweb.sendstream(resp,self.datalayer)
            print("kaf")
            yield from resp.awrite({**next(datalayer),**self.evse.dataLayer.data})
            #yield from resp.awrite(json.dumps(self.evse.dataLayer.data))

            #self.datalayer = json.dumps(self.datalayer)
            #yield from resp.awrite(self.datalayer)


    def updateWificlient(self,req, resp):
        
        collect()
        if req.method == "POST":
            datalayer = {}
            req = await  self.proccessMsg(req)
            for i in req.form: 
                i = json.loads(i)
                datalayer = await self.wifiManager.handle_configure(i["ssid"],i["password"])
                self.ipAddress=self.wifiManager.getIp()
                datalayer = {"process":datalayer,"ip":self.ipAddress}
            yield from picoweb.start_response(resp, "application/json")
            yield from resp.awrite(json.dumps(datalayer))
                
        else:
            client = self.wifiManager.getSSID()
            datalayer = {}
            for i in client:
                if client[i] > -86: #jestlize je sila signalu mensi nez 20% nezobrazuj ssid
                    datalayer[i]= client[i]   
            datalayer["connectSSID"] = self.wifiManager.getCurrentConnectSSID()
            yield from picoweb.start_response(resp, "application/json")
            yield from resp.awrite(json.dumps(datalayer))

    #Funkce pro vycitani a ukladani nastaveni
    def updateSetting(self,req, resp):

        collect()
        setting = __config__.Config()
        
        if req.method == "POST":
            datalayer = {}
            req = await self.proccessMsg(req)
            
            for i in req.form: 
                i = json.loads(i)                    
                datalayer = setting.handle_configure(i["variable"],i["value"])
                datalayer = {"process":datalayer}
            
            yield from picoweb.start_response(resp, "application/json")
            yield from resp.awrite(json.dumps(datalayer))
                
        else:
            datalayer = setting.getConfig()
            yield from picoweb.start_response(resp, "application/json")
            yield from resp.awrite(json.dumps(datalayer))

                
    def dataTable(self,req, resp):
        collect()
        yield from picoweb.start_response(resp)
        yield from self.app.render_template(resp, "datatable.html", (req,))

    def getEspID(self,req,resp):
        setting = __config__.Config()
        datalayer = {"ID":" Wattmeter: {}".format(setting.getConfig()['ID']), "IP":self.wifiManager.getIp()}
        yield from picoweb.start_response(resp, "application/json")
        yield from resp.awrite(json.dumps(datalayer))
         
        
    def proccessMsg(self,req):
        size = int(req.headers[b"Content-Length"])
        qs = yield from req.reader.read(size)
        req.qs = qs.decode()
        req.parse_qs()
        return req
        

    async def webServerRun(self):
        try:
            print("Webserver app started")
            self.app.run(debug=False, host='',port=self.port)
            while True:
                await asyncio.sleep(100)                
        except Exception as e:
            print("WEBSERVER ERROR: {}. I will reset MCU".format(e))
            reset()
