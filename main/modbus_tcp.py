import uasyncio as asyncio
import ulogging
from umodbus.modbus import ModbusTCP
import ujson as json
from gc import collect
collect()
class ModbusTCPServer:
 def __init__(self, wattmeter_data, setting_data, wifi, port=502, ip='0.0.0.0', debug=False):
  self.port = port
  self.wifi = wifi
  self.data = wattmeter_data
  self.ip = ip
  self.debug = debug
  self.server = None
  self.client = None
  self.logger = ulogging.getLogger(__name__)
  if debug:
   self.logger.setLevel(ulogging.DEBUG)
  else:
   self.logger.setLevel(ulogging.INFO)
  self.init_modbus_tcp()
  collect()
  with open('main/registers.json', 'r') as file:
   register_definitions = json.load(file)
  collect()
  self.client.setup_registers(registers=register_definitions, use_default_vals=True)
  float_value = float(setting_data['txt,ACTUAL SW VERSION'])
  self.fw_version = '{}'.format(int(float_value * 1000))
  last_two_char = hex(int(self.fw_version[2:], 10)).replace('0x', '')
  self.fw_version = int('{}{}'.format(int(float_value * 10), last_two_char), 16)
  serial_id = ('00000' + str(setting_data['ID']))[-5:]
  serial_raw = ['{:02x}'.format(ord('0'))]
  for i in serial_id:
   serial_raw.append('{:02x}'.format(ord(i) & 255))
  self.serial_number = list()
  for i in range(0, 6, 2):
   self.serial_number.append('0x{}{}'.format(serial_raw[i], serial_raw[i + 1]))
 def init_modbus_tcp(self):
  try:
   if self.client is None:
    self.client = ModbusTCP()
   if not self.client.get_bound_status():
    self.client.bind(local_ip=self.ip, local_port=self.port)
   return True
  except Exception as e:
   self.logger.error('modbus bind: {}'.format(e))
   return False
 async def run(self):
  self.set_static_registers()
  while True:
   self.set_dynamic_registers()
   if self.wifi.isConnected():
    try:
     self.nonblocking_client()
     self.client.process()
    except Exception as e:
     self.logger.error(e)
     self.init_modbus_tcp()
   await asyncio.sleep(0.4)
 def nonblocking_client(self):
  try:
   sock = self.client._itf._client_sock
   if sock is not None:
    sock.settimeout(0)
  except Exception:
   pass
 def set_static_registers(self):
  self.client.set_hreg(11, [1648])
  self.client.set_hreg(770, [4126])
  self.client.set_hreg(772, [self.fw_version])
  self.client.set_hreg(4098, [4])
  self.client.set_hreg(20480, [18799, 29805, 25972, 25970, int(self.serial_number[0], 16), int(self.serial_number[1], 16), int(self.serial_number[2], 16)])
  self.client.set_hreg(40960, [7])
  self.client.set_hreg(41216, [1])
 def set_dynamic_registers(self):
  self.client.set_hreg(0, [self.data['U2'] * 10, 0])
  self.client.set_hreg(2, [self.data['U2'] * 10, 0])
  self.client.set_hreg(4, [self.data['U3'] * 10, 0])
  i1 = self.data['I1'] if self.data['I1'] < 32768 else self.data['I1'] - 65536
  self.client.set_hreg(12, [i1 * 10 & 65535, i1 * 10 >> 16 & 65535])
  i2 = self.data['I2'] if self.data['I2'] < 32768 else self.data['I2'] - 65536
  self.client.set_hreg(14, [i2 * 10 & 65535, i2 * 10 >> 16 & 65535])
  i3 = self.data['I3'] if self.data['I3'] < 32768 else self.data['I3'] - 65536
  self.client.set_hreg(16, [i3 * 10 & 65535, i3 * 10 >> 16 & 65535])
  p1 = self.data['P1'] if self.data['P1'] < 32768 else self.data['P1'] - 65536
  self.client.set_hreg(18, [p1 * 10 & 65535, p1 * 10 >> 16 & 65535])
  p2 = self.data['P2'] if self.data['P2'] < 32768 else self.data['P2'] - 65536
  self.client.set_hreg(20, [p2 * 10 & 65535, p2 * 10 >> 16 & 65535])
  p3 = self.data['P3'] if self.data['P3'] < 32768 else self.data['P3'] - 65536
  self.client.set_hreg(22, [p3 * 10 & 65535, p3 * 10 >> 16 & 65535])
  p_sum = (p1 + p2 + p3) * 10
  self.client.set_hreg(40, [p_sum & 65535, p_sum >> 16 & 65535])
  self.client.set_hreg(51, [500])
  e_positive = int((self.data['E1tP'] + self.data['E2tP'] + self.data['E3tP']) / 10)
  self.client.set_hreg(52, [e_positive & 65535, e_positive >> 16 & 65535])
  e_negative = int((self.data['E1tN'] + self.data['E2tN'] + self.data['E3tN']) / 10)
  self.client.set_hreg(78, [e_negative & 65535, e_negative >> 16 & 65535])
  self.client.set_hreg(64, [int(self.data['E1tP'] / 10) & 65535, int(self.data['E1tP'] / 10) >> 16 & 65535])
  self.client.set_hreg(66, [int(self.data['E2tP'] / 10) & 65535, int(self.data['E2tP'] / 10) >> 16 & 65535])
  self.client.set_hreg(68, [int(self.data['E3tP'] / 10) & 65535, int(self.data['E3tP'] / 10) >> 16 & 65535])
