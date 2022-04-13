const locale=getUseLanguage(),translations={en:{power:"Power",today:"Today [kWh]",yesterday:"Yesterday [kWh]",total:"Total [kWh]",overview:"Overview",data:" Data",power:"Power",energy:"Energy",settings:"Settings",state:"STATE: ",unplug:"UNPLUG",plug:"PLUG",charging:"CHARGING",voltages:"VOLTAGES [V]",currents:"CURRENTS [A]",powers:"POWERS [kW]",pfactor:"POWER FACTOR [-]",pmax:"↓TODAY MAX [kW]",pmin:"↑TODAY MAX [kW]",tenergyP:"↓TODAY ENERGY [kWh]",tenergyN:"↑TODAY ENERGY [kWh]",totalEp:"↓TOTAL ENERGY [kWh]",totalEn:"↑TOTAL ENERGY [kWh]",acIN:"AC IN",relay:"RELAY",time:"ACTUAL TIME",upTime:"RUN TIME",lastHour:"Last hour",hourly:"Hourly",daily:"Daily",monthly:"Monthly"},cs:{power:"Výkon",today:"Dnes [kWh]",yesterday:"Včera [kWh]",total:"Celková [kWh]",overview:"Přehled",data:" Data",power:"Výkon",energy:"Energie",settings:"Nastavení",state:"STATUS: ",unplug:"ODPOJENO",plug:"ZAPOJENO",charging:"NABÍJÍ",voltages:"NAPĚTÍ [V]",currents:"PROUDY [A]",powers:"VÝKONY [kW]",pfactor:"ÚČINÍK [-]",pmax:"↓DNEŠNÍ MAX [kW]",pmin:"↑DNEŠNÍ MAX [kW]",tenergyP:"↓DNEŠNÍ ENERGIE [kWh]",tenergyN:"↑DNEŠNÍ ENERGIE [kWh]",totalEp:"↓CELKOVÁ ENERGIE [kWh]",totalEn:"↑CELKOVÁ ENERGIE [kWh]",acIN:"HDO",relay:"RELÉ",time:"AKTUÁLNÍ ČAS",upTime:"DOBA BĚHU",lastHour:"Poslední hodina",hourly:"Hodinová",daily:"Denní",monthly:"Měsíční"},de:{power:"Leistung",today:"Heute [kWh]",yesterday:"Gestern [kWh]",total:"Total [kWh]",overview:"Überblick",data:" Data",power:"Power",energy:"Energie",settings:"Einstellungen",state:"STATE: ",unplug:"UNPLUG",plug:"PLUG",charging:"CHARGING",voltages:"VOLTAGES [V]",currents:"CURRENTS [A]",powers:"POWERS [kW]",pfactor:"POWER FACTOR [-]",pmax:"↓TODAY MAX [kW]",pmin:"↑TODAY MAX [kW]",tenergyP:"↓TODAY ENERGY [kWh]",tenergyN:"↑TODAY ENERGY [kWh]",totalEp:"↓TOTAL ENERGY [kWh]",totalEn:"↑TOTAL ENERGY [kWh]",acIN:"AC IN",relay:"RELAY",time:"ACTUAL TIME",upTime:"RUN TIME",lastHour:"Last hour",hourly:"Hourly",daily:"Daily",monthly:"Monthly"}};function translatePage(){document.querySelectorAll("[data-i18n-key]").forEach(translateElement)}function translateElement(e){const t=e.getAttribute("data-i18n-key"),a=translations[locale][t];e.innerText=a}function getUseLanguage(){var e=navigator.language||navigator.userLanguage;return e.includes("-")?e.split("-")[0]:e}function translate(e){return translations[locale][e]}