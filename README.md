# wattmeter_tst

##version 0.065
1. **Add Modbus setting interface** - interface for setting EVSE or WATTMETER

##version 0.064
1. **Add multiple EVSE balancing** - Adding multiple balancing for more then one EVSE wallbox
2. **Add await statment in webserver app** - It could cause problem, which broke socket port
3. **WDG add to queue**

##version 0.063
1. **Resolve Modbus TCP error** - The problem has been caused by not closing open socket
2. **Add testing webserver console** -  In testing mode is now possible to see online console log in [http://micropython.org/webrepl/#]
3. **Add alert dialog** - After setting proccess the alert dialog show proccess status
