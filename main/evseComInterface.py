import modbus
from machine import UART
import uasyncio as asyncio
from machine import Pin

class Interface:

    def __init__(self,baudrate,lock):
        self.lock = lock
        self.DE = Pin(15, Pin.OUT) 
        self.uart =  UART(2,baudrate)
        self.uart.init(baudrate, bits=8, parity=None, stop=1) # init with given parameters
        self.modbusClient = modbus.Modbus()

    async def __aenter__(self):
        await self.lock.acquire()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        self.lock.release()

    async def writeEvseRegister(self,reg,data,ID):
        writeRegs = self.modbusClient.write_regs(reg, data,ID)
        self.uart.write(writeRegs)
        self.DE.on()
        await asyncio.sleep_ms(80)
        self.DE.off() 
        receiveData = self.uart.read()
        receiveData = self.checkMsg(receiveData,ID,16)
        receiveData = receiveData[:8]
        if receiveData and (0 == self.modbusClient.mbrtu_data_processing(receiveData, ID)):
            return bytearray([receiveData[2],receiveData[3]])
        else:
            return None
        
    async def readEvseRegister(self,reg,length,ID):
        readRegs = self.modbusClient.read_regs(reg, length,ID)
        self.uart.write(readRegs)
        self.DE.on() 
        await asyncio.sleep_ms(80)
        self.DE.off() 
        receiveData = self.uart.read() 
        receiveData = self.checkMsg(receiveData,ID,3)
        receiveData = receiveData[:(int(receiveData[2])+5)]
        if receiveData and  (0 == self.modbusClient.mbrtu_data_processing(receiveData, ID)):
            return bytearray(receiveData[i+3] for i in range(0,(length*2)))
        else:
            return None
        
    def checkMsg(self,buf,ID,fce):
        for i in range(0,len(buf)):
            if i> len(buf)-2:
                break
            if (buf[i] == ID) and (buf[i + 1])==fce:
                return buf[i:]