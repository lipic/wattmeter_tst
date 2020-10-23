_H='SUCCESS_READ'
_G=False
_F='ACTUAL_OUTPUT_CURRENT'
_E='inp,EVSE{}'
_D='NUMBER_OF_EVSE'
_C='EV_STATE'
_B='ACTUAL_CONFIG_CURRENT'
_A=True
import uasyncio as asyncio,time
from main import __config__
class Evse:
	def __init__(A,wattmeter,evse):A.evseInterface=evse;A.dataLayer=DataLayer();A.setting=__config__.Config();A.wattmeter=wattmeter;A.regulationLock1=_G;A.lock1Counter=0;A.__regulationDelay=0;A.__cntCurrent=0;A.__requestCurrent=0
	async def evseHandler(A):
		G='1';D=0;H='';F='';E=A.setting.getConfig();A.dataLayer.data[_D]=E['in,EVSE-NUMBER']
		for C in range(0,int(A.dataLayer.data[_D])):
			try:
				F=await A.__readEvse_data(1000,3,ID=C+1)
				if(F==_H)==_A:
					if E['sw,ENABLE CHARGING']==G:
						if E['sw,ENABLE BALANCING']==G:
							D=A.balancEvseCurrent(C)
							async with A.evseInterface as B:await B.writeEvseRegister(1000,[D],C+1)
						else:
							D=int(E[_E.format(C+1)])
							async with A.evseInterface as B:await B.writeEvseRegister(1000,[D],C+1)
					else:
						async with A.evseInterface as B:await B.writeEvseRegister(1000,[0],C+1)
			except Exception as B:raise Exception('evseHandler error: {}'.format(B))
		return 'Read: {}; Write: {}'.format(F,H)
	async def __readEvse_data(B,reg,length,ID):
		C=ID
		try:
			async with B.evseInterface as D:A=await D.readEvseRegister(reg,length,C)
			if reg==1000 and A!='Null'and A:
				if len(B.dataLayer.data[_B])<C:B.dataLayer.data[_B].append(int(A[0]<<8|A[1]));B.dataLayer.data[_F].append(int(A[2]<<8|A[3]));B.dataLayer.data[_C].append(int(A[4]<<8|A[5]))
				else:B.dataLayer.data[_B][C-1]=int(A[0]<<8|A[1]);B.dataLayer.data[_F][C-1]=int(A[2]<<8|A[3]);B.dataLayer.data[_C][C-1]=int(A[4]<<8|A[5])
				return _H
			else:return'Timed out waiting for result.'
		except Exception as D:raise Exception('__readEvse_data error: {}'.format(D))
	def balancEvseCurrent(A,ID):
		J='in,BREAKER';G='I3';H='I2';I='I1';B=0;C=0;D=0;K=0;L=0;M=0;F=0
		if A.wattmeter.dataLayer.data[I]>32767:K=A.wattmeter.dataLayer.data[I]-65535
		else:B=A.wattmeter.dataLayer.data[I]
		if A.wattmeter.dataLayer.data[H]>32767:L=A.wattmeter.dataLayer.data[H]-65535
		else:C=A.wattmeter.dataLayer.data[H]
		if A.wattmeter.dataLayer.data[G]>32767:M=A.wattmeter.dataLayer.data[G]-65535
		else:D=A.wattmeter.dataLayer.data[G]
		if B>C and B>D:F=int(B/100)
		if C>B and C>D:F=int(C/100)
		if D>B and D>C:F=int(D/100)
		E=int(A.setting.config[J])-F;print(A.setting.config[J]);A.__cntCurrent=A.__cntCurrent+1
		if A.__cntCurrent>=3:
			if int(A.dataLayer.data[_C][ID])!=3:
				if E<0:A.__requestCurrent=0
				elif A.__regulationDelay>0:A.__requestCurrent=0
				else:A.__requestCurrent=6
			elif E<0:
				if A.__requestCurrent+E<0:A.__requestCurrent=0
				else:
					if A.__requestCurrent+E<6:A.__regulationDelay=1
					A.__requestCurrent=A.__requestCurrent+E;A.regulationLock1=_A;A.lock1Counter=1
			elif A.regulationLock1!=_A:A.__requestCurrent=A.__requestCurrent+1
			A.__cntCurrent=0
		if A.lock1Counter>=30:A.lock1Counter=0;A.regulationLock1=_G
		if A.regulationLock1==_A or A.lock1Counter>0:A.lock1Counter=A.lock1Counter+1
		if A.__regulationDelay>0:A.__regulationDelay=A.__regulationDelay+1
		if A.__regulationDelay>60:A.__regulationDelay=0
		if A.__requestCurrent>int(A.setting.config[_E.format(ID+1)]):A.__requestCurrent=int(A.setting.config[_E.format(ID+1)])
		return A.__requestCurrent
class DataLayer:
	def __init__(A):A.data={};A.data[_B]=[];A.data[_F]=[];A.data[_C]=[];A.data[_D]=0