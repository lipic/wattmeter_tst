_D=True
_C='POST'
_B=None
_A='process'
import picoweb,wifiManager
from machine import reset,RTC
from time import time
import json
from gc import collect,mem_free
from asyn import sleep,cancellable,StopTask,Event
import uasyncio as asyncio
class WebServerApp:
	def __init__(A,wlan,wattmeter,evse):A.wifiManager=wlan;A.ipAddress=A.wifiManager.getIp();A.wattmeter=wattmeter;A.evse=evse;A.port=8000;A.ROUTES=[('/',A.main),('/datatable',A.dataTable),('/overview',A.overView),('/updateWificlient',A.updateWificlient),('/updateSetting',A.updateSetting),('/updateData',A.updateData),('/settings',A.settings),('/powerChart',A.powerChart),('/energyChart',A.energyChart),('/getEspID',A.getEspID)];A.app=picoweb.WebApp(_B,A.ROUTES)
	def main(A,req,resp):collect();mem_free();yield from picoweb.start_response(resp);yield from A.app.render_template(resp,'main.html')
	def overView(A,req,resp):collect();mem_free();yield from picoweb.start_response(resp);collect();mem_free();yield from A.app.render_template(resp,'overview.html')
	def settings(A,req,resp):collect();mem_free();yield from picoweb.start_response(resp);yield from A.app.render_template(resp,'settings.html',(req,))
	def powerChart(A,req,resp):collect();mem_free();yield from picoweb.start_response(resp);yield from A.app.render_template(resp,'powerChart.html',(req,))
	def energyChart(A,req,resp):collect();mem_free();yield from picoweb.start_response(resp);yield from A.app.render_template(resp,'energyChart.html',(req,))
	def updateData(C,req,resp):
		E=req;D='time';collect();mem_free()
		if E.method==_C:
			B={};E=await C.proccessMsg(E)
			for A in E.form:
				A=json.loads(A)
				if list(A.keys())[0]=='relay':
					if C.wattmeter.negotiationRelay():B={_A:1}
					else:B={_A:0}
				elif list(A.keys())[0]==D:F=RTC();F.datetime((int(A[D][2]),int(A[D][1]),int(A[D][0]),0,int(A[D][3]),int(A[D][4]),int(A[D][5]),0));C.wattmeter.startUpTime=time();C.wattmeter.timeInit=_D;B={_A:'OK'}
			yield from picoweb.jsonify(resp,B)
		else:B=C.wattmeter.dataLayer.data;B.update(C.evse.dataLayer.data);yield from picoweb.jsonify(resp,B)
	def updateWificlient(A,req,resp):
		D=req;collect();mem_free()
		if D.method==_C:
			B={};D=await A.proccessMsg(D)
			for C in D.form:C=json.loads(C);print(C);B=await A.wifiManager.handle_configure(C['ssid'],C['password']);A.ipAddress=A.wifiManager.getIp();B={_A:B,'ip':A.ipAddress}
			yield from picoweb.jsonify(resp,B)
		else:B=A.wifiManager.getSSID();B['connectSSID']=A.wifiManager.getCurrentConnectSSID();yield from picoweb.jsonify(resp,B)
	def updateSetting(E,req,resp):
		F='variable';C=req;collect();mem_free();from main import __config__;D=__config__.Config()
		if C.method==_C:
			A={};C=await E.proccessMsg(C)
			for B in C.form:
				B=json.loads(B)
				if B[F]=='bt,RESET WATTMETER':reset()
				A=D.handle_configure(B[F],B['value']);A={_A:A}
			yield from picoweb.jsonify(resp,A)
		else:A=D.getConfig();yield from picoweb.jsonify(resp,A)
	def dataTable(A,req,resp):collect();mem_free();yield from picoweb.start_response(resp);yield from A.app.render_template(resp,'datatable.html',(req,))
	def getEspID(A,req,resp):D='ID';from main import __config__;B=__config__.Config();C={D:' Wattmeter: {}'.format(B.getConfig()[D]),'IP':A.wifiManager.getIp()};yield from picoweb.jsonify(resp,C)
	def proccessMsg(D,req):A=req;B=int(A.headers[b'Content-Length']);C=yield from A.reader.read(B);A.qs=C.decode();A.parse_qs();return A
	@cancellable
	async def webServerRun(self,delay,ip,n):
		C='app1';B='app2';A=_B;D=_B
		try:
			print('Start webserver App');A=self.app.run(debug=_D,host=ip,port=self.port,name=n)
			while _D:await sleep(delay)
		except StopTask:
			if n==B:asyncio.StreamWriter(asyncio.activeSock[B],'').aclose();asyncio.StreamReader(asyncio.activeSock[B]).aclose();asyncio.cancel(A);asyncio.activeSock[B].close()
			elif n==C:asyncio.StreamWriter(asyncio.activeSock[C],'').aclose();asyncio.StreamReader(asyncio.activeSock[C]).aclose();asyncio.cancel(A);asyncio.activeSock[C].close()