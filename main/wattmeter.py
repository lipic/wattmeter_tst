_j='EpDN'
_i='EpDP'
_h='E3tN'
_g='E2tN'
_f='E1tN'
_e='E3tP'
_d='E2tP'
_c='E1tP'
_b='PN3p'
_a='PN2p'
_Z='PN1p'
_Y='PP3p'
_X='PP2p'
_W='PP1p'
_V='PF3'
_U='PF2'
_T='PF1'
_S='WATTMETER_TIME'
_R='RUN_TIME'
_Q='E3dN'
_P='E2dN'
_O='E1dN'
_N='E3dP'
_M='E2dP'
_L='E1dP'
_K='DailyEnergy'
_J='ID'
_I='RELAY'
_H='HDO'
_G='EminP'
_F=False
_E='EhourN'
_D='EhourP'
_C=True
_B='P_minuten'
_A='E_hour'
import time,uasyncio as asyncio
from machine import Pin,UART
from main import __config__
class Wattmeter:
	def __init__(A,wattmeter):A.relay=Pin(25,Pin.OUT);A.wattmeterInterface=wattmeter;A.dataLayer=DataLayer();A.fileHandler=fileHandler();A.MONTHLY_CONSUMPTION='monthly_consumption.dat';A.DAILY_CONSUMPTION='daily_consumption.dat';A.timeInit=_F;A.timeOfset=_F;A.lastMinute=0;A.lastHour=0;A.lastDay=0;A.test=0;A.startUpTime=0;A.dataLayer.data[_J]=__config__.Config().getConfig()[_J]
	async def wattmeterHandler(A):
		if A.timeOfset==_F and A.timeInit==_C:A.startUpTime=time.time();A.lastMinute=int(time.localtime()[4]);A.lastDay=int(time.localtime()[2]);A.dataLayer.data[_K]=A.fileHandler.readData(A.DAILY_CONSUMPTION);A.timeOfset=_C
		A.dataLayer.data[_R]=time.time()-A.startUpTime;D=str(time.localtime()[0])[-2:];A.dataLayer.data[_S]='{0:02}.{1:02}.{2}  {3:02}:{4:02}:{5:02}'.format(time.localtime()[2],time.localtime()[1],D,time.localtime()[3],time.localtime()[4],time.localtime()[5]);B=await A.__readWattmeter_data(1000,12);B=await A.__readWattmeter_data(2502,3);B=await A.__readWattmeter_data(2802,6);B=await A.__readWattmeter_data(3102,12);B=await A.__readWattmeter_data(2902,6);B=await A.__readWattmeter_data(1015,3);B=await A.__readWattmeter_data(4000,12);B=await A.__readWattmeter_data(200,1);A.controlRelay()
		if A.lastMinute is not int(time.localtime()[4])and A.timeInit==_C:
			if len(A.dataLayer.data[_B])<61:A.dataLayer.data[_B].append(A.dataLayer.data[_G]*6)
			else:A.dataLayer.data[_B]=A.dataLayer.data[_B][1:];A.dataLayer.data[_B].append(A.dataLayer.data[_G]*6)
			A.dataLayer.data[_B][0]=len(A.dataLayer.data[_B])
			async with A.wattmeterInterface as C:await C.writeWattmeterRegister(100,[1])
			A.lastMinute=int(time.localtime()[4])
		if A.timeInit==_C:
			if A.lastHour is not int(time.localtime()[3]):
				async with A.wattmeterInterface as C:await C.writeWattmeterRegister(101,[1])
				A.lastHour=int(time.localtime()[3])
				if len(A.dataLayer.data[_A])<73:A.dataLayer.data[_A].append(A.lastHour);A.dataLayer.data[_A].append(A.dataLayer.data[_D]);A.dataLayer.data[_A].append(A.dataLayer.data[_E])
				else:A.dataLayer.data[_A]=A.dataLayer.data[_A][3:];A.dataLayer.data[_A].append(A.lastHour);A.dataLayer.data[_A].append(A.dataLayer.data[_D]);A.dataLayer.data[_A].append(A.dataLayer.data[_E])
				A.dataLayer.data[_A][0]=len(A.dataLayer.data[_A])
		elif len(A.dataLayer.data[_A])<73:A.dataLayer.data[_A][len(A.dataLayer.data[_A])-2]=A.dataLayer.data[_D];A.dataLayer.data[_A][len(A.dataLayer.data[_A])-1]=A.dataLayer.data[_E]
		else:A.dataLayer.data[_A][71]=A.dataLayer.data[_D];A.dataLayer.data[_A][72]=A.dataLayer.data[_E]
		if A.lastDay is not int(time.localtime()[2])and A.timeInit==_C:
			D=str(time.localtime()[0])[-2:];E={'{0:02}/{1:02}/{2}'.format(time.localtime()[1],time.localtime()[2],D):[A.dataLayer.data[_L]+A.dataLayer.data[_M]+A.dataLayer.data[_N],A.dataLayer.data[_O]+A.dataLayer.data[_P]+A.dataLayer.data[_Q]]}
			async with A.wattmeterInterface as C:await C.writeWattmeterRegister(102,[1])
			A.lastDay=int(time.localtime()[2]);A.fileHandler.handleData(A.DAILY_CONSUMPTION);A.fileHandler.writeData(A.DAILY_CONSUMPTION,E);A.dataLayer.data[_K]=A.fileHandler.readData(A.DAILY_CONSUMPTION)
	async def __readWattmeter_data(B,reg,length):
		D='SUCCESS_READ';E='Null';C=reg
		async with B.wattmeterInterface as F:A=await F.readWattmeterRegister(C,length)
		try:
			if A!=E and C==1000:B.dataLayer.data['I1']=int(A[0]<<8|A[1]);B.dataLayer.data['I2']=int(A[2]<<8|A[3]);B.dataLayer.data['I3']=int(A[4]<<8|A[5]);B.dataLayer.data['U1']=int(A[6]<<8|A[7]);B.dataLayer.data['U2']=int(A[8]<<8|A[9]);B.dataLayer.data['U3']=int(A[10]<<8|A[11]);B.dataLayer.data['P1']=int(A[12]<<8|A[13]);B.dataLayer.data['P2']=int(A[14]<<8|A[15]);B.dataLayer.data['P3']=int(A[16]<<8|A[17]);B.dataLayer.data['S1']=int(A[18]<<8|A[19]);B.dataLayer.data['S2']=int(A[20]<<8|A[21]);B.dataLayer.data['S3']=int(A[22]<<8|A[23]);return D
			if A!=E and C==200:B.dataLayer.data[_H]=int(A[0]<<8|A[1]);return D
			elif A!=E and C==1015:B.dataLayer.data[_T]=int(A[0]<<8|A[1]);B.dataLayer.data[_U]=int(A[2]<<8|A[3]);B.dataLayer.data[_V]=int(A[4]<<8|A[5]);return D
			elif A!=E and C==2502:B.dataLayer.data[_G]=int(A[0]<<8|A[1])+int(A[2]<<8|A[3])+int(A[4]<<8|A[5]);return D
			elif A!=E and C==2802:B.dataLayer.data[_D]=int(A[0]<<8|A[1])+int(A[2]<<8|A[3])+int(A[4]<<8|A[5]);B.dataLayer.data[_E]=int(A[6]<<8|A[7])+int(A[8]<<8|A[9])+int(A[10]<<8|A[11]);return D
			elif A!=E and C==3102:B.dataLayer.data[_L]=int(A[0]<<8|A[1]);B.dataLayer.data[_M]=int(A[2]<<8|A[3]);B.dataLayer.data[_N]=int(A[4]<<8|A[5]);B.dataLayer.data[_O]=int(A[6]<<8|A[7]);B.dataLayer.data[_P]=int(A[8]<<8|A[9]);B.dataLayer.data[_Q]=int(A[10]<<8|A[11]);B.dataLayer.data[_W]=int(A[12]<<8|A[13]);B.dataLayer.data[_X]=int(A[14]<<8|A[15]);B.dataLayer.data[_Y]=int(A[16]<<8|A[17]);B.dataLayer.data[_Z]=int(A[18]<<8|A[19]);B.dataLayer.data[_a]=int(A[20]<<8|A[21]);B.dataLayer.data[_b]=int(A[22]<<8|A[23]);return D
			elif A!=E and C==4000:B.dataLayer.data[_c]=int(A[2]<<24|A[3]<<16|A[0]<<8|A[1]);B.dataLayer.data[_d]=int(A[6]<<24|A[7]<<16|A[4]<<8|A[5]);B.dataLayer.data[_e]=int(A[10]<<24|A[11]<<16|A[8]<<8|A[9]);B.dataLayer.data[_f]=int(A[14]<<24|A[15]<<16|A[12]<<8|A[13]);B.dataLayer.data[_g]=int(A[18]<<24|A[19]<<16|A[16]<<8|A[17]);B.dataLayer.data[_h]=int(A[22]<<24|A[23]<<16|A[20]<<8|A[21]);return D
			elif A!=E and C==2902:B.dataLayer.data[_i]=int(A[0]<<8|A[1])+int(A[2]<<8|A[3])+int(A[4]<<8|A[5]);B.dataLayer.data[_j]=int(A[6]<<8|A[7])+int(A[8]<<8|A[9])+int(A[10]<<8|A[11]);return D
			else:return'Timed out waiting for result.'
		except Exception as G:return 'Exception: {}. UART is probably not connected.'.format(G)
	def negotiationRelay(A):
		if A.relay.value():A.relay.off();A.dataLayer.data[_I]=0;return _F
		else:A.relay.on();A.dataLayer.data[_I]=1;return _C
	def controlRelay(A):
		C='sw,WHEN AC IN: ACTIVE HIGH';D='1';B=__config__.Config()
		if B.getConfig()['sw,WHEN AC IN: RELAY ON']==D:
			if A.dataLayer.data[_H]==1 and B.getConfig()[C]==D:A.relay.on()
			elif A.dataLayer.data[_H]==0 and B.getConfig()[C]=='0':A.relay.on()
			else:A.relay.off()
		if A.relay.value():A.dataLayer.data[_I]=1
		else:A.dataLayer.data[_I]=0
class DataLayer:
	def __init__(A):A.data={};A.data['I1']=0;A.data['I2']=0;A.data['I3']=0;A.data['U1']=0;A.data['U2']=0;A.data['U3']=0;A.data[_T]=0;A.data[_U]=0;A.data[_V]=0;A.data[_W]=0;A.data[_X]=0;A.data[_Y]=0;A.data[_Z]=0;A.data[_a]=0;A.data[_b]=0;A.data[_G]=0;A.data[_D]=0;A.data[_E]=0;A.data['P1']=0;A.data['P2']=0;A.data['P3']=0;A.data['S1']=0;A.data['S2']=0;A.data['S3']=0;A.data[_H]=0;A.data[_B]=[0];A.data[_A]=[0];A.data[_K]=None;A.data[_L]=0;A.data[_M]=0;A.data[_N]=0;A.data[_O]=0;A.data[_P]=0;A.data[_Q]=0;A.data[_i]=0;A.data[_j]=0;A.data[_c]=0;A.data[_d]=0;A.data[_e]=0;A.data[_f]=0;A.data[_g]=0;A.data[_h]=0;A.data[_R]=0;A.data[_S]=0;A.data[_J]=0
class fileHandler:
	def handleData(D,file):
		try:B=D.readData(file)
		except OSError:return
		if len(B)>30:
			A=[]
			for E in B:F,G=E.split(':');A.append('{}:{}\n'.format(F,G))
			with open(file,'w+')as C:A=A[1:];C.write(''.join(A));C.close()
	def readData(D,file):
		A=[]
		try:
			with open(file)as C:
				for B in C:B=B.replace('\n','');A.append(B)
			return A
		except Exception as E:return A
	def writeData(E,file,data):
		A=[]
		for (B,C) in data.items():A.append('%s:%s\n'%(B,C))
		with open(file,'a+')as D:D.write(''.join(A))