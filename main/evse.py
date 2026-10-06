import json
from gc import collect
import ulogging
collect()
FAST = 1
ECO = 0
MIN_EVSE_CURRENT = 6
EVSE_START_MARGIN = 2
EVSE_RESTART_HOLD_CYCLES = 20
class Evse:
 def __init__(self, wattmeter, evse, __config__):
  self.evse_interface = evse
  self.data_layer = DataLayer()
  self.setting = __config__
  self.wattmeter = wattmeter
  self.regulation_lock = False
  self.lock_counter = 0
  self.__regulation_delay = 0
  self.__cnt_current = 0
  self.__request_current = 0
  self.__last_charge_mode = self.setting.config['chargeMode']
  self.__last_written = {}
  self.__active_evse = 0
  self.__restart_hold = 0
  self.__last_lock = False
  self.__last_delay = 0
  self.__meter_lost = False
  self.logger = ulogging.getLogger('Evse')
  if int(self.setting.config['sw,TESTING SOFTWARE']) == 1:
   self.logger.setLevel(ulogging.DEBUG)
  else:
   self.logger.setLevel(ulogging.INFO)
 async def evse_handler(self):
  status = []
  self.__check_charge_mode_change()
  self.data_layer.data['NUMBER_OF_EVSE'] = int(self.setting.config['in,EVSE-NUMBER'])
  for i in range(0, self.data_layer.data['NUMBER_OF_EVSE']):
   try:
    status.append(await self.__read_evse_data(1000, 3, _id=i + 1))
   except Exception as e:
    status.append('FAILED_READ')
  charging_enabled = self.setting.config['sw,ENABLE CHARGING'] == '1'
  hdo_mode = self.setting.config['sw,WHEN AC IN: CHARGING'] == '1' and int(self.setting.config['chargeMode']) == ECO
  balancing = self.setting.config['sw,ENABLE BALANCING'] == '1'
  meter_ok = self.wattmeter.data_valid()
  meter_needed = charging_enabled and (hdo_mode or balancing)
  if meter_ok:
   if self.__meter_lost:
    self.__meter_lost = False
   current = self.balancingEvseCurrent()
  else:
   if not self.__meter_lost:
    self.__meter_lost = True
   self.__reset_regulation()
   current = 0
  hdo_max_current = int(self.setting.config['in,AC-IN-MAX-CURRENT-FROM-GRID-A'])
  if hdo_max_current > current:
   hdo_max_current = current
  contribution = None
  if meter_needed and (not meter_ok):
   contribution = [0] * self.data_layer.data['NUMBER_OF_EVSE']
  elif charging_enabled:
   if hdo_mode:
    if self.wattmeter.data_layer.data['A'] != 1:
     hdo_max_current = 0
    contribution = self.current_evse_contribution(hdo_max_current)
   elif balancing:
    contribution = self.current_evse_contribution(current)
  write_errors = []
  for i in range(0, self.data_layer.data['NUMBER_OF_EVSE']):
   try:
    if status[i] != 'SUCCESS_READ':
     if self.logger.isEnabledFor(ulogging.DEBUG):
      pass
     continue
    if meter_needed and (not meter_ok):
     write_current = 0
     source = 'METER-ERR'
    elif charging_enabled:
     if hdo_mode:
      write_current = contribution[i]
      source = 'HDO'
     elif balancing:
      write_current = contribution[i]
      source = 'BALANCE'
     else:
      write_current = self.setting.get_evse_current(i + 1)
      source = 'MANUAL'
    else:
     write_current = 0
     source = 'CHARGING-OFF'
    self.__log_write(i + 1, write_current, source)
    async with self.evse_interface as e:
     await e.writeEvseRegister(1000, [write_current], i + 1)
   except Exception as e:
    write_errors.append('ID {}: {}'.format(i + 1, e))
  if write_errors:
   raise Exception('evse_handler error: {}'.format('; '.join(write_errors)))
  return 'Read: {}'.format(status)
 def __log_write(self, evse_id, current, source):
  state = self.__data_at('EV_STATE', evse_id)
  cfg = self.__data_at('ACTUAL_CONFIG_CURRENT', evse_id)
  out = self.__data_at('ACTUAL_OUTPUT_CURRENT', evse_id)
  last = self.__last_written.get(evse_id)
  if last != current:
   self.__last_written[evse_id] = current
   if last is not None and (last == 0) != (current == 0):
    pass
   else:
    pass
  elif self.logger.isEnabledFor(ulogging.DEBUG):
   pass
 def __data_at(self, key, evse_id):
  if len(self.data_layer.data[key]) >= evse_id:
   return self.data_layer.data[key][evse_id - 1]
  return 0
 def __check_charge_mode_change(self):
  charge_mode = self.setting.config['chargeMode']
  if charge_mode != self.__last_charge_mode:
   self.__last_charge_mode = charge_mode
   self.__reset_regulation()
 def __reset_regulation(self):
  self.__request_current = 0
  self.__cnt_current = 0
  self.__regulation_delay = 0
  self.regulation_lock = False
  self.lock_counter = 0
  self.__active_evse = 0
  self.__restart_hold = 0
 async def __read_evse_data(self, reg, length, _id):
  try:
   async with self.evse_interface as e:
    receive_data = await e.readEvseRegister(reg, length, _id)
   if reg == 1000 and receive_data != 'Null' and receive_data:
    if len(self.data_layer.data['ACTUAL_CONFIG_CURRENT']) < _id:
     self.data_layer.data['ACTUAL_CONFIG_CURRENT'].append(int(receive_data[0] << 8 | receive_data[1]))
     self.data_layer.data['ACTUAL_OUTPUT_CURRENT'].append(int(receive_data[2] << 8 | receive_data[3]))
     self.data_layer.data['EV_STATE'].append(int(receive_data[4] << 8 | receive_data[5]))
     self.data_layer.data['EV_COMM_ERR'].append(0)
    else:
     self.data_layer.data['ACTUAL_CONFIG_CURRENT'][_id - 1] = int(receive_data[0] << 8 | receive_data[1])
     self.data_layer.data['ACTUAL_OUTPUT_CURRENT'][_id - 1] = int(receive_data[2] << 8 | receive_data[3])
     self.data_layer.data['EV_STATE'][_id - 1] = int(receive_data[4] << 8 | receive_data[5])
     self.data_layer.data['EV_COMM_ERR'][_id - 1] = 0
    return 'SUCCESS_READ'
   else:
    return 'Timed out waiting for result.'
  except Exception as e:
   if reg == 1000:
    if len(self.data_layer.data['EV_COMM_ERR']) < _id:
     self.data_layer.data['EV_COMM_ERR'].append(0)
     self.data_layer.data['ACTUAL_CONFIG_CURRENT'].append(0)
     self.data_layer.data['ACTUAL_OUTPUT_CURRENT'].append(0)
     self.data_layer.data['EV_STATE'].append(0)
    else:
     self.data_layer.data['EV_COMM_ERR'][_id - 1] += 1
     if self.data_layer.data['EV_COMM_ERR'][_id - 1] > 10:
      self.data_layer.data['ACTUAL_CONFIG_CURRENT'][_id - 1] = 0
      self.data_layer.data['ACTUAL_OUTPUT_CURRENT'][_id - 1] = 0
      self.data_layer.data['EV_STATE'][_id - 1] = 0
      self.data_layer.data['EV_COMM_ERR'][_id - 1] = 11
   raise Exception('__readEvse_data error: {}'.format(e))
 def balancingEvseCurrent(self):
  delta = 0
  i1 = self.wattmeter.data_layer.data['I1']
  if i1 > 32767:
   i1 -= 65536
  i2 = self.wattmeter.data_layer.data['I2']
  if i2 > 32767:
   i2 -= 65536
  i3 = self.wattmeter.data_layer.data['I3']
  if i3 > 32767:
   i3 -= 65536
  max_current = int(round(max(i1, i2, i3) / 100.0))
  sum_current = i1 + i2 + i3
  avg_current = int(round(sum_current / 300))
  grid_assist = int(self.setting.config['in,PV-GRID-ASSIST-A'])
  if grid_assist == 0:
   grid_assist = -1
  hdo = False
  if 1 == self.wattmeter.data_layer.data['A'] and 1 == int(self.setting.config['sw,WHEN AC IN: CHARGING']):
   hdo = True
  if self.setting.config['btn,PHOTOVOLTAIC'] == '1' and hdo == False and (int(self.setting.config['chargeMode']) == ECO):
   delta = grid_assist - int(round(i1 / 100.0))
   delta_src = 'PV-L1'
  elif self.setting.config['btn,PHOTOVOLTAIC'] == '2' and hdo == False and (int(self.setting.config['chargeMode']) == ECO):
   delta = grid_assist - avg_current
   delta_src = 'PV-AVG'
  else:
   delta = int(self.setting.config['in,MAX-CURRENT-FROM-GRID-A']) - max_current
   delta_src = 'GRID'
  if max_current > int(self.setting.config['in,MAX-CURRENT-FROM-GRID-A']):
   delta = int(self.setting.config['in,MAX-CURRENT-FROM-GRID-A']) - max_current
   delta_src = 'GRID-OVERLOAD'
  req_before = self.__request_current
  branch = 'IDLE'
  self.__cnt_current = self.__cnt_current + 1
  breaker = int(self.setting.config['in,MAX-CURRENT-FROM-GRID-A'])
  if breaker * 0.5 + delta < 0:
   self.__request_current = 0
   if self.__regulation_delay == 0:
    pass
   branch = 'PANIC-STOP'
   self.__regulation_delay = 1
  if delta < 0 and self.__cnt_current % 2 == 0:
   if '0' == self.setting.config['btn,PHOTOVOLTAIC']:
    self.regulation_lock = True
    self.lock_counter = 1
    self.__request_current = self.__request_current + delta
    branch = 'DOWN-STEP(delta)'
   else:
    self.__request_current = self.__request_current - 1
    branch = 'DOWN-1'
    if self.__request_current < 6:
     self.regulation_lock = True
     self.lock_counter = 1
     branch = 'DOWN-1+LOCK(req<6)'
   self.__cnt_current = 0
  elif self.__regulation_delay > 0:
   self.__request_current = 0
   self.__cnt_current = 0
   branch = 'DELAY-HOLD-0'
  elif not self.regulation_lock and self.__cnt_current % 3 == 0 and (delta >= (1 if delta_src.startswith('GRID') else 0)):
   if delta >= 6 and self.check_if_ev_is_connected():
    self.__request_current = self.__request_current + 1
    branch = 'UP-connected'
   elif self.check_if_ev_is_charging():
    self.__request_current = self.__request_current + 1
    branch = 'UP-charging'
   else:
    branch = 'UP-BLOCKED'
   self.__cnt_current = 0
  if self.__cnt_current >= 3:
   self.__cnt_current = 0
  if self.lock_counter >= 30:
   self.lock_counter = 0
   self.regulation_lock = False
  if self.regulation_lock == True or self.lock_counter > 0:
   self.lock_counter = self.lock_counter + 1
  if self.__regulation_delay > 0:
   self.__regulation_delay = self.__regulation_delay + 1
  if self.setting.config['btn,PHOTOVOLTAIC'] == '0':
   if self.__regulation_delay > 60:
    self.__regulation_delay = 0
  elif self.__regulation_delay > 10:
   self.__regulation_delay = 0
  total_limit = 0
  for i in range(0, self.data_layer.data['NUMBER_OF_EVSE']):
   total_limit += self.setting.get_evse_current(i + 1)
  if self.__request_current > total_limit:
   branch = branch + '+CAP'
   self.__request_current = total_limit
  if self.__request_current < 0:
   self.__request_current = 0
  if self.regulation_lock != self.__last_lock:
   self.__last_lock = self.regulation_lock
  if (self.__regulation_delay > 0) != (self.__last_delay > 0):
   pass
  self.__last_delay = self.__regulation_delay
  if req_before != self.__request_current:
   pass
  elif self.logger.isEnabledFor(ulogging.DEBUG):
   pass
  return self.__request_current
 def __update_active_evse(self, current, connected):
  if self.__restart_hold > 0:
   self.__restart_hold -= 1
  active = self.__active_evse
  reason = 'KEEP'
  if active > connected:
   active = connected
   reason = 'CLAMP-connected({})'.format(connected)
  possible = int(current // MIN_EVSE_CURRENT)
  if possible > connected:
   possible = connected
  if possible < active:
   if active > 1:
    self.__restart_hold = EVSE_RESTART_HOLD_CYCLES
   active = possible
   reason = 'DOWN'
  elif possible > active:
   if active == 0:
    active = 1
    reason = 'UP-FIRST'
   else:
    need = MIN_EVSE_CURRENT * (active + 1) + EVSE_START_MARGIN
    if self.__restart_hold > 0:
     reason = 'UP-BLOCKED-HOLD'
    elif current < need:
     reason = 'UP-BLOCKED-MARGIN'
    else:
     active += 1
     reason = 'UP'
  self.__active_evse = active
  return (active, reason)
 def current_evse_contribution(self, current):
  connected = []
  for i in range(0, self.data_layer.data['NUMBER_OF_EVSE']):
   if self.__data_at('EV_STATE', i + 1) >= 2:
    connected.append(i)
  active_before = self.__active_evse
  active, reason = self.__update_active_evse(current, len(connected))
  share = 0
  if active > 0:
   share = int(current // active)
  contribution_current = [0] * self.data_layer.data['NUMBER_OF_EVSE']
  for i in connected[:active]:
   contribution_current[i] = share
  debug_on = self.logger.isEnabledFor(ulogging.DEBUG)
  caps = []
  for i in range(0, self.data_layer.data['NUMBER_OF_EVSE']):
   evse_limit = self.setting.get_evse_current(i + 1)
   if contribution_current[i] > evse_limit:
    if debug_on:
     caps.append('EVSE{}({}->{})'.format(i + 1, contribution_current[i], evse_limit))
    contribution_current[i] = evse_limit
  if active != active_before:
   pass
  elif debug_on:
   pass
  return contribution_current
 def check_if_ev_is_connected(self):
  for i in range(0, self.data_layer.data['NUMBER_OF_EVSE']):
   if self.__data_at('EV_STATE', i + 1) == 2:
    return True
  return False
 def check_if_ev_is_charging(self):
  for i in range(0, self.data_layer.data['NUMBER_OF_EVSE']):
   if self.__data_at('EV_STATE', i + 1) == 3:
    return True
  return False
class DataLayer:
 def __str__(self):
  return json.dumps(self.data)
 def __init__(self):
  self.data = {}
  self.data['ACTUAL_CONFIG_CURRENT'] = []
  self.data['ACTUAL_OUTPUT_CURRENT'] = []
  self.data['EV_STATE'] = []
  self.data['EV_COMM_ERR'] = []
  self.data['NUMBER_OF_EVSE'] = 0
