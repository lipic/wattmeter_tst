_E='Error during cancelation: {}'
_D='1'
_C='sw,ACCESS POINT'
_B=False
_A=True
import uasyncio as asyncio,ledHandler,time,wattmeterComInterface,evseComInterface,modbusTcp
from ntptime import settime
from asyn import Lock,NamedTask,Event
from gc import mem_free,collect
from machine import Pin,WDT,RTC
from main import webServerApp
import wifiManager,semaphore
from main import wattmeter
from main import evse
from main import __config__
EVSE_ERR=1
WATTMETER_ERR=2
WEBSERVER_CANCELATION_ERR=4
WIFI_HANDLER_ERR=8
TIME_SYNC_ERR=16
AP=1
WIFI=2
class TaskHandler:
	def __init__(A,wifi):B=wattmeterComInterface.Interface(9600,lock=Lock());C=evseComInterface.Interface(9600,lock=Lock());A.wattmeter=wattmeter.Wattmeter(B);A.evse=evse.Evse(A.wattmeter,C);A.webServerApp=webServerApp.WebServerApp(wifi,A.wattmeter,A.evse);A.uModBusTCP=modbusTcp.Server(B,C);A.settingAfterNewConnection=_B;A.wdt=WDT(timeout=60000);A.setting=__config__.Config();A.wifiManager=wifi;A.ledErrorHandler=ledHandler.ledHandler(21,1,3,40);A.ledWifiHandler=ledHandler.ledHandler(22,2,3,10);A.ledRun=Pin(23,Pin.OUT);A.ap=Pin(5,Pin.IN,Pin.PULL_UP);A.ap.irq(trigger=Pin.IRQ_FALLING,handler=A.callback);A.lockPin=0;A.sema=semaphore.Semaphore();lambda:A.wifiManager.turnONAp()if setting[_C]==_D else _B
	def callback(A,pin):
		if A.lockPin==0:A.lockPin=1;B=asyncio.get_event_loop();B.call_later(1,A.pinFilter)
	def pinFilter(A):
		B=A.setting.getConfig()
		if B[_C]==_D:A.setting.handle_configure(_C,'0');A.wifiManager.turnOffAp()
		else:A.setting.handle_configure(_C,_D);A.wifiManager.turnONAp()
		A.lockPin=0
	def memFree(A):collect();mem_free()
	async def timeHandler(A,delay_secs):
		B=delay_secs
		while _A:
			await asyncio.sleep(B)
			async with A.sema:
				if A.wifiManager.isConnected():
					try:settime();D=RTC();import utime as C;E=C.time();F=E+int(A.setting.getConfig()['in,TIME-ZONE'])*3600;G,H,I,J,K,L,N,O=C.localtime(F);D.datetime((G,H,I,0,J,K,L,0));A.wattmeter.timeInit=_A;A.ledErrorHandler.removeState(TIME_SYNC_ERR)
					except Exception as M:A.ledErrorHandler.addState(TIME_SYNC_ERR);print('Error during time setting: {}'.format(M))
				B=600;A.memFree()
	async def systemHandler(A,delay_secs):
		while _A:
			await asyncio.sleep(delay_secs)
			async with A.sema:
				A.wdt.feed();B=mem_free();collect();C=mem_free();print('Memory beofre: {} & after: {}'.format(B,C))
				if A.ledRun.value():A.ledRun.off()
				else:A.ledRun.on()
				A.memFree()
	async def wifiHandler(A,delay_secs):
		C='app2';B=0
		while _A:
			await asyncio.sleep(delay_secs)
			async with A.sema:
				try:
					if A.wifiManager.isConnected()==_A:
						A.ledWifiHandler.addState(WIFI)
						if A.settingAfterNewConnection==_B:
							A.settingAfterNewConnection=_A;E=A.wifiManager.getIp()
							if NamedTask.is_running(C)==_B:F=asyncio.get_event_loop();F.create_task(NamedTask(C,A.webServerApp.webServerRun,1,E,C)())
							else:print('Webserver is running')
					else:
						A.ledWifiHandler.removeState(WIFI)
						if len(A.wifiManager.read_profiles())!=0:
							try:
								if NamedTask.is_running(C)==_A:
									A.settingAfterNewConnection=_B;G=await NamedTask.cancel(C)
									if G:print('app2 will be cancelled when next scheduled')
									else:print('app2 was not cancellable.')
								A.ledErrorHandler.removeState(WEBSERVER_CANCELATION_ERR)
							except Exception as D:A.ledErrorHandler.addState(WEBSERVER_CANCELATION_ERR);print(_E.format(D))
							if B>30:
								B=0;H=await A.wifiManager.get_connection()
								if H:A.settingAfterNewConnection=_B
							B=B+1
					A.ledErrorHandler.removeState(WIFI_HANDLER_ERR)
				except Exception as D:A.ledErrorHandler.addState(WIFI_HANDLER_ERR);print('wifiHandler exception : {}'.format(D))
				A.memFree()
	async def wattmeterHandler(A,delay_secs):
		while _A:
			await asyncio.sleep(delay_secs)
			async with A.sema:
				try:B=await A.wattmeter.wattmeterHandler();A.ledErrorHandler.removeState(WATTMETER_ERR)
				except Exception as C:A.ledErrorHandler.addState(WATTMETER_ERR)
				A.memFree()
	async def evseHandler(A,delay_secs):
		while _A:
			await asyncio.sleep(delay_secs)
			async with A.sema:
				try:B=await A.evse.evseHandler();A.memFree();A.ledErrorHandler.removeState(EVSE_ERR)
				except Exception as C:A.ledErrorHandler.addState(EVSE_ERR)
	async def localWebserverHandler(A,delay_secs):
		B='app1'
		while _A:
			await asyncio.sleep(delay_secs)
			async with A.sema:
				C=A.setting.getConfig()
				if C[_C]==_D:
					A.ledWifiHandler.addState(AP)
					if NamedTask.is_running(B)==_B:D=asyncio.get_event_loop();D.create_task(NamedTask(B,A.webServerApp.webServerRun,1,'192.168.4.1',B)())
				else:
					try:
						if NamedTask.is_running(B)==_A:
							E=await NamedTask.cancel(B);A.ledWifiHandler.removeState(AP)
							if E:print('app1 will be cancelled when next scheduled')
							else:print('app1 was not cancellable.')
							A.ledErrorHandler.removeState(WEBSERVER_CANCELATION_ERR)
					except Exception as F:A.ledErrorHandler.addState(WEBSERVER_CANCELATION_ERR);print(_E.format(F))
				A.memFree()
	def mainTaskHandlerRun(B):A=asyncio.get_event_loop();A.create_task(B.wifiHandler(2));A.create_task(B.timeHandler(1));A.create_task(B.systemHandler(1));A.create_task(B.uModBusTCP.run(A));A.create_task(B.wattmeterHandler(1));A.create_task(B.evseHandler(1));A.create_task(B.localWebserverHandler(2));A.create_task(B.ledErrorHandler.ledHandler());A.create_task(B.ledWifiHandler.ledHandler());A.run_forever()