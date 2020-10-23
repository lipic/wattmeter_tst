_C='bt,RESET WATTMETER'
_B='ID'
_A='0'
import bootloader,random
from collections import OrderedDict
class Config:
	def __init__(A):C='txt,ACTUAL SW VERSION';B='6';A.boot=bootloader.Bootloader('https://github.com/lipic/wattmeter','');A.config=OrderedDict();A.config[_C]=_A;A.config['sw,AUTOMATIC UPDATE']=_A;A.config[C]=_A;A.config['sw,ENABLE CHARGING']=_A;A.config['in,BREAKER']=B;A.config['in,TIME-ZONE']='2';A.config['in,EVSE-NUMBER']=_A;A.config['sw,ENABLE BALANCING']=_A;A.config['sw,WHEN AC IN: RELAY ON']=_A;A.config['sw,AC IN ACTIVE: HIGH']=_A;A.config['sw,TESTING SOFTWARE']=_A;A.config['sw,ACCESS POINT']='1';A.config[_B]=_A;A.config['AP']=_A;A.config['inp,EVSE1']=B;A.config['inp,EVSE2']=B;A.config['inp,EVSE3']=B;A.config['inp,EVSE4']=B;A.config['inp,EVSE5']=B;A.config['inp,EVSE6']=B;A.config['inp,EVSE7']=B;A.config['inp,EVSE8']=B;A.config['inp,EVSE9']=B;A.config['inp,EVSE10']=B;A.SETTING_PROFILES='setting.dat';A.handle_configure(C,A.boot.get_version(''))
	def getConfig(A):
		C={}
		try:C=A.read_setting()
		except OSError:C={}
		if len(C)!=len(A.config):
			with open(A.SETTING_PROFILES,'w')as D:D.write('');D.close()
			for B in A.config:
				if B in C:
					if A.config[B]!=C[B]:A.config[B]=C[B]
			C={}
		for B in A.config:
			if B in C:
				if A.config[B]!=C[B]:A.config[B]=C[B]
			else:C[B]=A.config[B];A.write_setting(C)
		if A.config[_B]==_A:A.config[_B]=random.randrange(100,999)*random.randrange(0,90)+10000;A.handle_configure(_B,A.config[_B])
		return A.config
	def handle_configure(A,variable,value):
		D=value;B=variable
		try:
			A.handleDifferentRequests(B,D)
			if len(B)>0:
				try:C=A.read_setting()
				except OSError:C={}
				if C[B]!=D:C[B]=D;A.write_setting(C);A.getConfig();return True
			else:return False
		except Exception as E:print(E)
	def handleDifferentRequests(A,variable,value):
		if variable==_C:from machine import reset;reset()
	def read_setting(A):
		with open(A.SETTING_PROFILES)as C:D=C.readlines()
		B={}
		try:
			for E in D:F,G=E.strip('\n').split(';');B[F]=G
			return B
		except Exception as H:A.write_setting(A.config);return A.config
	def write_setting(B,setting):
		A=[]
		for (C,D) in setting.items():A.append('%s;%s\n'%(C,D))
		with open(B.SETTING_PROFILES,'w')as E:E.write(''.join(A))