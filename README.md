# wattmeter_tst

##version 1.101
1. **Uprava zaokrouhlovani pri rozdelovani proudu u EVSE**
2. **Uprava sipek u smeru toku energie**

##version 1.101
1. **Uprava balancovaciho algoritmu**

##version 1.011
1. **Po dopoeni evse se nenastavi stav na COM ERROR**

##version 1.010
1. **Uprava balancovani**
2. **Uprava, pri chybe u vlakna v socketu -> reset ESP**
3. **Oprava grafickeho zobrazeni EVSE (baterie se pri prechodu z nabijej do ready) nezmenilo barevne pozad**

##version 0.069
1. **remove wallpaper from web**

##version 0.068
1. **Edit load js library for ios**

##version 0.067
1. **Repair webserver thread closing procedure**

##version 0.066
1. **Precompiled python code -> less memory RAM usage_**

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
