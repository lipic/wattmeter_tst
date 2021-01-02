import socket
import uselect as select
from main import __config__
from main import taskHandler
from asyn import cancellable,Cancellable
import uasyncio as asyncio
from gc import mem_free, collect

class Server:
    
    def __init__(self,wattmeterInterface,evseInterface,host='',port=8123,backlog=5,timeout=5):
        self.tcpModbus = tcpModbus(wattmeterInterface,evseInterface)
        self.socks = []
        self.closedSockets = 0
        self.cid = 0
        self.host = host
        self.port = port
        self.backlog = backlog
        self.timeout = timeout

    async def run(self,debug=False):
        loop = asyncio.get_event_loop()
        self.server = asyncio.start_server(self.run_client, self.host, self.port,self.cid+1)
        try:
            loop.create_task(self.server)
        except Exception as e:
            loop.close()
            print("Modbus TCP server() exception: {}".format(e))

        while True:
            await asyncio.sleep(100)

    async def run_client(self, sreader, swriter):
        self.cid += 1
        print('Got connection from client', self.cid)
        try:
            while True:
                res = b''
                try:
                    res = await asyncio.wait_for(sreader.read(6), self.timeout)
                except asyncio.TimeoutError:
                    res = b''
                if res == b'':
                    raise OSError

                try:
                    length = int((res[4]<<8) | res[5])
                    res += await sreader.read(length)
                except asyncio.TimeoutError:
                    res = b''
                if res == b'':
                    raise OSError

                try:
                    result = await self.tcpModbus.modbusCheckProccess(res)
                    await swriter.awrite(result)

                except Exception as e:
                    print("Error during writing msg. Type of error: {}".format(e))
                    break
        except Exception as e:
            print("Run_client with id: {} exception: {}".format(self.cid,e))
        
        finally:
            print('Client {} disconnect.'.format(self.cid))
            for i in asyncio.activeSock:
                if i != "app1" and i!= 'app2':
                    #asyncio.StreamWriter(asyncio.activeSock[i],'').aclose()
                    await sreader.aclose()#asyncio.StreamReader(asyncio.activeSock[i]).aclose()
                    await swriter.aclose()
            
            print('Client {} socket closed.'.format(self.cid))


class badDataLengthError(ValueError):
    pass
class badFceError(ValueError):
    pass
class badIDError(ValueError):
    pass
    

class tcpModbus():
    
    def __init__(self,wattmeterInterface,evseInterface):
        self.wattmeter = wattmeterInterface
        self.evse = evseInterface
        self.config = __config__.Config()
            
    async def modbusCheckProccess(self, receiveData):
        if len(receiveData) < 12:
            raise badDataLengthError("Error: data miss")

        ID = receiveData[6]
        FCE = receiveData[7]
        LEN = int((receiveData[10]<<8) | receiveData[11])
        REG = int((receiveData[8]<<8) | receiveData[9])

        if (FCE != 3) and (FCE != 16):
            raise badFceError("Error: Unsupported MODBUS function")

        if ID > 101 or ID < 1:
            raise badIDError("Error: Unsupported MODBUS function")
        try:
            UD = bytearray()
            if (ID > 0) and (ID < 100):
                UD = await self.proccessEvseData(FCE,LEN,REG,receiveData[13:],ID)
            if ID == 100:
                UD = await self.proccessWattmeterData(FCE,LEN,REG,receiveData[13:])
            if ID == 101:
                UD = await self.proccessEspData(FCE,LEN,REG,receiveData[13:])    
            
            sendData = bytearray(receiveData[:8])
            sendData[4]=0
            if FCE == 3:
                sendData[5]=(LEN*2)+3
                sendData += bytearray([LEN * 2])
                if UD is not None:
                    sendData+= UD
                else:
                    sendData[5] = 0                    
            elif FCE == 16:
                sendData[5]=6
                if UD is not None:
                    sendData+= UD
                else:
                    sendData[5] = 0
                sendData += bytearray([0])
                sendData += bytearray([LEN])
            return sendData
        except Exception as e:
            print("Modbus TCP proccessing error: ",e)
            return b''
  
        
    async def proccessWattmeterData(self,fce,length,reg,receiveData,ID=1):
        #modbus function 0x03
        if fce == 3:
            async with self.wattmeter as w:
                return  await w.readWattmeterRegister(reg,length)
       
        if fce == 16:
            async with self.wattmeter as w:
                return await w.writeWattmeterRegister(reg,tuple(int(receiveData[(2*i)] | receiveData[1+(2*i)]) for i  in range(0,length)))
                
   
    async def proccessEvseData(self,fce,length,reg,receiveData,ID=1):
        #modbus function 0x03
        if fce == 3:
            async with self.evse as e:
                return await e.readEvseRegister(reg,length,ID)
        
        if fce == 16:
            async with self.evse as e:
                return await e.writeEvseRegister(reg,tuple(int(receiveData[(2*i)] | receiveData[1+(2*i)]) for i  in range(0,length)),ID)
    
    async def proccessEspData(self,fce,length,reg,receiveData,ID=1):
        espData = self.config.getConfig()
        ESP_REGISTER_LEN =  len(espData)
        
        if (reg < 1000)  or ((reg + length) > (ESP_REGISTER_LEN + 1000)):
            raise Exception("Error, bad number of reading register")
        reg -= 1000

        #modbus function 0x03
        if fce == 3:
            newESPReg = list(i for i in espData.keys())
            data = bytearray()
            for i in range(reg,(reg+length)):
                hodnota = int(espData[newESPReg[i]].replace(".",""))
                data += bytearray([((hodnota>>8) & 0xff)])
                data += bytearray([(hodnota) & 0xff])
            return data
                    
        if fce == 16:
            values = list(receiveData[i] for i in range(0,length*2))
            cnt = 0
            for k in range(reg,(reg+length)):
                if cnt<length:
                    listData = list(espData)
                    self.config.handle_configure(variable=listData[reg+cnt],value=int((values[cnt*2]<<8) | values[(cnt*2)+1]))
                    cnt = cnt + 1
                else:
                    break
            reg += 1000
            return bytearray([(reg>>8)&0xFF,reg&0xFF])

