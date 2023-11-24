import uasyncio as asyncio
import ulogging
from main.modbus import ModbusTCP
import ujson as json
from gc import collect


class ModbusTCPServer:

    def __init__(self, wattmeter_data, setting_data, port: int = 502, ip: str = '0.0.0.0', debug: bool = False) -> None:
        self.port = port
        self.data = wattmeter_data
        self.ip = ip
        self.debug = debug
        self.server = None

        self.client = ModbusTCP()
        is_bound = False
        is_bound = self.client.get_bound_status()
        if not is_bound:
            self.client.bind(local_ip=ip, local_port=port)

        collect()
        with open('main/registers.json', 'r') as file:
            register_definitions = json.load(file)
        collect()
        self.client.setup_registers(registers=register_definitions, use_default_vals=True)
        float_value = float(setting_data["txt,ACTUAL SW VERSION"])
        self.fw_version = int("{}E".format(int(float_value * 100)), 16)

        self.logger = ulogging.getLogger(__name__)
        if debug:
            self.logger.setLevel(ulogging.DEBUG)
        else:
            self.logger.setLevel(ulogging.INFO)
        self.logger.info("**********************************************************")
        self.logger.info("****** SET MODBUS TCP WITH PORT: {}; IP: {} *****".format(port, ip))
        self.logger.info("**********************************************************")

    async def run(self) -> None:
        self.set_static_registers()

        while True:
            self.set_dynamic_registers()
            self.client.process()
            await asyncio.sleep(0.2)

    def set_static_registers(self):
        self.client.set_hreg(11, [1648])
        self.client.set_hreg(770, [4126])
        self.client.set_hreg(772, [self.fw_version])
        self.client.set_hreg(4098, [4])
        self.client.set_hreg(20480, [0x496f, 0x746d, 0x6574, 0x6572, 0x3063, 0x7A30, 0x3031])
        self.client.set_hreg(40960, [7])
        self.client.set_hreg(41216, [1])

    def set_dynamic_registers(self):
        self.client.set_hreg(0, [self.data['U2']*10, 0])
        self.client.set_hreg(2, [self.data['U2']*10, 0])
        self.client.set_hreg(4, [self.data['U3']*10, 0])
        self.client.set_hreg(12, [self.data['I1']*10 & 0xFFFF, (self.data['I1']*10 >> 16) & 0xFFFF])
        self.client.set_hreg(14, [self.data['I2']*10 & 0xFFFF, (self.data['I2']*10 >> 16) & 0xFFFF])
        self.client.set_hreg(16, [self.data['I3']*10 & 0xFFFF, (self.data['I3']*10 >> 16) & 0xFFFF])
        p1: int = self.data['P1'] if self.data['P1'] < 32769 else self.data['P1'] - 65535
        self.client.set_hreg(18, [p1 & 0xFFFF, (p1 >> 16) & 0xFFFF])
        p2: int = self.data['P2'] if self.data['P2'] < 32769 else self.data['P2'] - 65535
        self.client.set_hreg(20, [p2 & 0xFFFF, (p2 >> 16) & 0xFFFF])
        p3: int = self.data['P3'] if self.data['P3'] < 32769 else self.data['P3'] - 65535
        self.client.set_hreg(22, [p3 & 0xFFFF, (p3 >> 16) & 0xFFFF])
        p_sum = p1 + p2 + p3
        self.client.set_hreg(40, [p_sum & 0xFFFF, (p_sum >> 16) & 0xFFFF])
        self.client.set_hreg(51, [500])
        e_positive: int = int((self.data['E1tP'] + self.data['E2tP'] + self.data['E3tP'])/10)
        self.client.set_hreg(52, [e_positive & 0xFFFF, (e_positive >> 16) & 0xFFFF])
        e_negative: int = int((self.data['E1tN'] + self.data['E2tN'] + self.data['E3tN'])/10)
        self.client.set_hreg(78, [e_negative & 0xFFFF, (e_negative >> 16) & 0xFFFF])
        self.client.set_hreg(64, [self.data['E1tP'] & 0xFFFF, (self.data['E1tP'] >> 16) & 0xFFFF])
        self.client.set_hreg(66, [self.data['E2tP'] & 0xFFFF, (self.data['E2tP'] >> 16) & 0xFFFF])
        self.client.set_hreg(68, [self.data['E3tP'] & 0xFFFF, (self.data['E3tP'] >> 16) & 0xFFFF])
