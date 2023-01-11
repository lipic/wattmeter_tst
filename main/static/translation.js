const locale=getUseLanguage(),translations={en:{power:"Power",today:"Today \n[kWh]",yesterday:"Yesterday \n[kWh]",total:"Total [kWh]",overview:"Overview",data:" Data",energy:"Energy",settings:"Settings",state:"STATE: ",unplug:"UNPLUG",plug:"PLUG",charging:"CHARGING",voltages:"VOLTAGES \n[V]",currents:"CURRENTS \n[A]",current:"CURRENTS",powers:"POWERS \n[kW]",pfactor:"POWER FACTOR \n[-]",pmax:"↓TODAY MAX \n[kW]",pmin:"↑TODAY MAX \n[kW]",tenergyP:"↓TODAY ENERGY \n[kWh]",tenergyN:"↑TODAY ENERGY \n[kWh]",totalEp:"↓TOTAL ENERGY \n[kWh]",totalEn:"↑TOTAL ENERGY \n[kWh]",acIN:"AC IN",relay:"RELAY",time:"ACTUAL TIME",upTime:"RUN TIME",lastHour:"Last hour",hourly:"Hourly",daily:"Daily",monthly:"Monthly",p_setting:"Preparing settings",state:"State",procces_stat:"Proccess status",close:"Close",pass:"Pass",submit:"Submit",refresh:"Sefresh",register:"Register",value:"Value",read:"Read",write:"Write",wifi1:"Please choose ssid client first!",wifi2:"Can not connect to SSID",wifi3:"Connected to: ",wifi4:"Error during connection to: ",wifi5:"Not connected to Wi-Fi",wifi6:"Scanning wifi ....",wifi7:"Error during loading WiFi clients",modbus1:"Reading register: ",modbus2:"Writing register: ",modbus3:" with value ",NAN:"VARIABLE IS NOT NUMBER",modbus5:"Proccess successful",modbus6:"Proccess unsuccessful: ",modbus7:"Response error",save1:"WAITING..",save2:"SAVED SUCCESS!",save3:"SAVED UNSUCCESS!",update1:"New FW version is ",update2:"Your FW is out of date. Enable automatic update and reset IoTMeter",save:"SAVE","ACTUAL SW VERSION":"VERSION","AUTOMATIC UPDATE":"AUTOMATIC UPDATE","ENABLE CHARGING":"ENABLE CHARGING","ENABLE BALANCING":"ENABLE BALANCING","WHEN AC IN: RELAY ON":"IF AC IN: RELAY ON","WHEN OVERFLOW: RELAY ON":"IF OVERFLOW: RELAY ON","WHEN AC IN: CHARGING":"IF AC IN: CHARGING","AC IN ACTIVE: HIGH":"AC IN ACTIVE: 230V","TESTING SOFTWARE":"TESTING SOFTWARE","Wi-Fi AP":"Wi-Fi AP","MODBUS-TCP":"MODBUS-TCP",PHOTOVOLTAIC:"PHOTOVOLTAIC","MAX-CURRENT-FROM-GRID-A":"MAX CURRENT FROM GRID [A]","TIME-ZONE":"TIME ZONE","EVSE-NUMBER":"NUMBER OF EVSE","PV-GRID-ASSIST-A":"PV GRID ASSIST [A]",waiting:"WAITING "},cs:{power:"V\xfdkon",today:"Dnes [kWh]",yesterday:"Včera [kWh]",total:"Celkov\xe1 [kWh]",overview:"Přehled",data:" Data",energy:"Energie",settings:"Nastaven\xed",state:"STATUS: ",unplug:"ODPOJENO",plug:"ZAPOJENO",charging:"NAB\xcdJ\xcd",voltages:"NAPĚT\xcd \n[V]",currents:"PROUDY \n[A]",current:"PROUD",powers:"V\xddKONY \n[kW]",pfactor:"\xdaČIN\xcdK \n[-]",pmax:"↓DNEŠN\xcd MAX \n[kW]",pmin:"↑DNEŠN\xcd MAX \n[kW]",tenergyP:"↓DNEŠN\xcd ENERGIE \n[kWh]",tenergyN:"↑DNEŠN\xcd ENERGIE \n[kWh]",totalEp:"↓CELKOV\xc1 ENERGIE",totalEn:"↑CELKOV\xc1 ENERGIE",acIN:"HDO",relay:"REL\xc9",time:"AKTU\xc1LN\xcd ČAS",upTime:"DOBA BĚHU",lastHour:"Posledn\xed hodina",hourly:"Hodinov\xe1",daily:"Denn\xed",monthly:"Měs\xedčn\xed",p_setting:"Nač\xedt\xe1n\xed nastaven\xed",state:"Stav",procces_stat:"Stav procesu",close:"Zavř\xedt",pass:"Heslo",submit:"Potvrdit",refresh:"Obnovit",register:"Registr",value:"Hodnota",read:"Č\xedst",write:"Zapsat",wifi1:"Nejprve zvolte ssid klienta!",wifi2:"Nelze se připojit k požadov\xe1n\xe9mu SSID",wifi3:"Připojeno k: ",wifi4:"Chyba během připojov\xe1n\xed: ",wifi5:"Nepřipojeno k Wi-Fi",wifi6:"Skenov\xe1n\xed wifi ....",modbus1:"Čten\xed registru: ",modbus2:"Z\xe1pis registru: ",modbus3:" s hodnotou ",NAN:"Proměn\xe1 něn\xed č\xedslo",modbus5:"Proces \xfaspěšn\xfd",modbus6:"Proces ne\xfaspěšn\xfd: ",modbus7:"Chyba odpovědi",save1:"ČEKEJTE..",save2:"ULOŽENO \xdaSPĚŠNĚ!",save3:"ULOŽENO NE\xdaSPĚŠNĚ!",update1:"Nov\xe1 verze FW je ",update2:"FW je zastaral\xfd. Povolte automatickou aktualizaci a resetujte IoTMeter",save:"ULOŽIT","ACTUAL SW VERSION":"VERZE","AUTOMATIC UPDATE":"AUTOMATICK\xc1 AKTUALIZACE","ENABLE CHARGING":"NAB\xcdJEN\xcd","ENABLE BALANCING":"DYNAMICK\xc9 VYROVN\xc1V\xc1N\xcd","WHEN AC IN: RELAY ON":"HDO AKTIVN\xcd: ZAPNI REL\xc9","WHEN OVERFLOW: RELAY ON":"PŘETOK: ZAPNI REL\xc9","WHEN AC IN: CHARGING":"HDO AKTIVN\xcd: NAB\xcdJEJ","AC IN ACTIVE: HIGH":"HDO AKTIVN\xcd: 230V","TESTING SOFTWARE":"TESTOVAC\xcd SOFTWARE","Wi-Fi AP":"Wi-Fi AP","MODBUS-TCP":"MODBUS-TCP",PHOTOVOLTAIC:"FOTOVOLTAIKA","MAX-CURRENT-FROM-GRID-A":"MAX PROUD ZE S\xcdTĚ [A]","TIME-ZONE":"ČASOV\xc9 P\xc1SMO","EVSE-NUMBER":"POČET EVSE","PV-GRID-ASSIST-A":"S\xcdŤOV\xc1 POMOC PRO FV [A]",waiting:"ČEKEJTE "},de:{power:"Leistung",today:"Heute [kWh]",yesterday:"Gestern [kWh]",total:"Gesamtleistung [kWh]",overview:"\xdcberblick",data:" Daten",energy:"Energie",settings:"Einstellungen",state:"Zustand: ",unplug:"Fahrzeug getrennt",plug:"Fahrzeug verbunden",charging:"Aufladen",voltages:"Spannungen \n[V]",currents:"Stromst\xe4rken \n[A]",current:"Stromst\xe4rk",powers:"Leistungen \n[kW]",pfactor:"Wirkleistungsfaktor \n[-]",pmax:"↓Tagesspitzenlast \n[kW]",pmin:"↑Tagesspitzenlast \n[kW]",tenergyP:"↓Tagesenergie \n[kWh]",tenergyN:"↑Tagesenergie \n[kWh]",totalEp:"↓Gesamtenergie",totalEn:"↑Gesamtenergie",acIN:"AC Eingang",relay:"Relais",time:"Aktuelle Zeit",upTime:"Laufzeit",lastHour:"Letzte stunde",hourly:"St\xfcndlich",daily:"T\xe4glich",monthly:"Monatlich",p_setting:"Konfig laden",state:"Zustand",procces_stat:"Prozessstatus",close:"Schlie\xdfe",pass:"Pass",submit:"Einreichen",refresh:"Aktualisierung",register:"Register",value:"Wert",read:"Lesen",write:"Aufschreiben",wifi1:"W\xe4hlen Sie zuerst die Ssid des Clients!",wifi2:"Es kann keine Verbindung zur angeforderten SSID hergestellt werden",wifi3:"Verbunden: ",wifi4:"Fehler beim Verbinden: ",wifi5:"Nicht mit WLAN verbunden",wifi6:"WLAN-Scannen ....",modbus1:"Auslesen der Registrierung: ",modbus2:"Registrierungseintrag: ",modbus3:" mit Wert ",NAN:"Die Transformation ist keine Zahl",modbus5:"Prozess erfolgreich",modbus6:"Prozess fehlgeschlagen: ",modbus7:"Antwortfehler",save1:"WARTEN..",save2:"GESPEICHERTER ERFOLG!",save3:"ERFOLGLOS GESPEICHERT!",update1:"Neue FW-Version ist",update2:"Deine FW ist veraltet. Automatisches Update und Zur\xfccksetzen IoTMeter aktivieren",save:"SPEICHERN","ACTUAL SW VERSION":"VERSION","AUTOMATIC UPDATE":"AUTOMATISCHES UPDATE","ENABLE CHARGING":"LADEN AKTIVIEREN","ENABLE BALANCING":"AUSGLEICH AKTIVIEREN","WHEN AC IN: RELAY ON":"WENN AC IN: RELAIS EIN","WHEN OVERFLOW: RELAY ON":"BEI \xdcBERLAUF: RELAIS AN","WHEN AC IN: CHARGING":"WENN AC IN: LADEN","AC IN ACTIVE: HIGH":"AC IN AKTIV: 230V","TESTING SOFTWARE":"TEST SOFTWARE","Wi-Fi AP":"Wi-Fi AP","MODBUS-TCP":"MODBUS-TCP",PHOTOVOLTAIC:"PHOTOVOLTAIK","MAX-CURRENT-FROM-GRID-A":"MAX STROM VOM NETZ [A]","TIME-ZONE":"ZEITZONE","EVSE-NUMBER":"ANZAHL DER EVSE","PV-GRID-ASSIST-A":"PV-NETZUNTERST\xdcTZUNG [A]",waiting:"WARTEN "}};function translatePage(){document.querySelectorAll("[data-i18n-key]").forEach(translateElement)}function translateElement(e){let t=e.getAttribute("data-i18n-key"),n=translations[locale][t];e.innerText=n}function getUseLanguage(){var e=navigator.language||navigator.userLanguage;return e.includes("-")?e.split("-")[0]:e}function translate(e){return translations[locale][e]}