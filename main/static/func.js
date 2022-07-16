function updateData(){$.ajax({url:"/updateData"}).done(function(a){$("#WATTMETER_TIME").text(a.WATTMETER_TIME);let b=parseInt(a.RUN_TIME,10);b-=3600*(s=Math.floor(b/86400))*24;let c=Math.floor(b/3600);b-=3600*c;let d=Math.floor(b/60);b-=60*d,$("#RUN_TIME").text((s<10?"0"+s:s)+":"+(c<10?"0"+c:c)+":"+(d<10?"0"+d:d)+":"+(b<10?"0"+b:b)),$("#U1").text(a.U1),$("#U2").text(a.U2),$("#U3").text(a.U3),$("#I1").text(rnd(a.I1,100,1,!0)),$("#I2").text(rnd(a.I2,100,1,!0)),$("#I3").text(rnd(a.I3,100,1,!0)),$("#P1").text(rnd(a.P1,1e3,2,!0)),$("#P2").text(rnd(a.P2,1e3,2,!0)),$("#P3").text(rnd(a.P3,1e3,2,!0)),a.A>0?$("#AC_IN").text("ON"):$("#AC_IN").text("OFF"),a.RELAY>0?$("#RELAY").text("ON"):$("#RELAY").text("OFF"),$("#PF1").text(rnd(a.F1,100,2)),$("#PF2").text(rnd(a.F2,100,2)),$("#PF3").text(rnd(a.F3,100,2)),$("#PP1p").text(rnd(a.W1,1e3,1)),$("#PP2p").text(rnd(a.W2,1e3,1)),$("#PP3p").text(rnd(a.W3,1e3,1)),$("#PN1p").text(rnd(a.R1,1e3,1)),$("#PN2p").text(rnd(a.R2,1e3,1)),$("#PN3p").text(rnd(a.R3,1e3,1)),$("#E1dP").text(rnd(a.E1dP,100,1)),$("#E2dP").text(rnd(a.E2dP,100,1)),$("#E3dP").text(rnd(a.E3dP,100,1)),$("#E1dN").text(rnd(a.E1dN,100,1)),$("#E2dN").text(rnd(a.E2dN,100,1)),$("#E3dN").text(rnd(a.E3dN,100,1)),a.E1tP/100>1e6||a.E2tP/100>1e6||a.E3tP/100>1e6?($("#E1tP").text(rnd(a.E1tP,1e8,2)),$("#E2tP").text(rnd(a.E2tP,1e8,2)),$("#E3tP").text(rnd(a.E3tP,1e8,2)),$("#Ep").text(translate("totalEp")+" \n[GWh]")):a.E1tP/100>1e3||a.E2tP/100>1e3||a.E3tP/100>1e3?($("#E1tP").text(rnd(a.E1tP,1e5,2)),$("#E2tP").text(rnd(a.E2tP,1e5,2)),$("#E3tP").text(rnd(a.E3tP,1e5,2)),$("#Ep").text(translate("totalEp")+" \n[MWh]")):($("#E1tP").text(rnd(a.E1tP,100,1)),$("#E2tP").text(rnd(a.E2tP,100,1)),$("#E3tP").text(rnd(a.E3tP,100,1)),$("#Ep").text(translate("totalEp")+" \n[kWh]")),a.E1tN/100>1e6||a.E2tN/100>1e6||a.E3tN/100>1e6?($("#E1tN").text(rnd(a.E1tN,1e8,2)),$("#E2tN").text(rnd(a.E2tN,1e8,2)),$("#E3tN").text(rnd(a.E3tN,1e8,2)),$("#En").text(translate("totalEn")+" \n[GWh]")):a.E1tN/100>1e3||a.E2tN/100>1e3||a.E3tN/100>1e3?($("#E1tN").text(rnd(a.E1tN,1e5,2)),$("#E2tN").text(rnd(a.E2tN,1e5,2)),$("#E3tN").text(rnd(a.E3tN,1e5,2)),$("#En").text(translate("totalEn")+" \n[MWh]")):($("#E1tN").text(rnd(a.E1tN,100,1)),$("#E2tN").text(rnd(a.E2tN,100,1)),$("#E3tN").text(rnd(a.E3tN,100,1)),$("#En").text(translate("totalEn")+" \n[kWh]")),$("#Current_EP").text(rnd(a.E1dP+a.E2dP+a.E3dP,100,2)),$("#Current_EN").text(rnd(a.E1dN+a.E2dN+a.E3dN,100,2)),$("#Previous_EP").text(rnd(a.EpDP,100,2)),$("#Previous_EN").text(rnd(a.EpDN,100,2)),$("#Total_EP").text(rnd(a.E1tP+a.E2tP+a.E3tP,100,0)),$("#Total_EN").text(rnd(a.E1tN+a.E2tN+a.E3tN,100,0)),$("#ID").text(a.ID),hourEnergyData=a.Es,dailyEnergyData=a.D,monthlyEnergyData=a.M,powerAVGchartData=a.Pm,dotControl()})}function rnd(a,b,c,d){return!0==d?((a>32767?a-65535:a)/b).toFixed(c):(a/b).toFixed(c)}function chargingAnim(b,c){for(var a=1;a<5;a++)$(".charge"+(a+4*(c-1))).css("animation-play-state",b)}function handleEvseAPI(e,c,d,b){for(var a=1;a<=e;a++)$("#ACTUAL_CONFIG_CURRENT"+a).text(void 0!==c[a-1]?c[a-1]+" A":"COMM ERR."),$("#ACTUAL_OUTPUT_CURRENT"+a).text(void 0!==d[a-1]?d[a-1]+" A":"COMM ERR."),b[a-1]<1||b[a-1]>3?($("#EV_STATE"+a).text("COMM ERR."),chargingAnim("paused",a),$(".charge"+(1+4*(a-1))).css("background-color","inherit")):1==b[a-1]?($("#EV_STATE"+a).text(translate("unplug")),chargingAnim("paused",a),$(".charge"+(1+4*(a-1))).css({"background-color":"red"})):2==b[a-1]?($("#EV_STATE"+a).text(translate("plug")),chargingAnim("paused",a),$(".charge"+(2+4*(a-1))).css("background-color","inherit"),$(".charge"+(3+4*(a-1))).css("background-color","inherit"),$(".charge"+(4+4*(a-1))).css("background-color","inherit"),$(".charge"+(1+4*(a-1))).css({"background-color":"yellow"})):3==b[a-1]&&($("#EV_STATE"+a).text(translate("charging")),chargingAnim("running",a),$(".charge"+(1+4*(a-1))).css({"background-color":"green"}))}function dotControl(){elements=$("#dot");for(var a=0;a<elements.length;a++)"grey"==elements[a].style.color?elements[a].style.color="#34ECE1":elements[a].style.color="grey"}function getTime(){var a=new Date,b=""+(a.getMonth()+1);return[""+a.getDate(),b,a.getFullYear(),a.getHours(),a.getMinutes(),a.getSeconds()]}function loadPowerChart(){len=powerAVGchartData[0];for(var b,a=1;a<61-len;a++)powerGraph.config.data.datasets.forEach(function(b){b.data.push({x:Date.now()-1e3*(61-a)*60,y:0})});for(a=1;a<len;a++)b=null!=powerAVGchartData[a]?powerAVGchartData[a]:0,powerGraph.config.data.datasets.forEach(function(c){c.data.push({x:Date.now()-1e3*(len-a)*60,y:b})});powerGraph.update()}function refreshPowerChart(){len=powerAVGchartData[0],powerGraph.data.datasets.forEach(function(a){a.data.push({x:Date.now(),y:powerAVGchartData[len-1]})})}function refreshEnergyChartHourly(){len=hourEnergyData[0];for(var a=0,c=0,d=0,f=0,b=0;b<24;b++)null!=hourEnergyData[4*b+4]?(a=hourEnergyData[4*b+1],dataP=hourEnergyData[4*b+2],dataN=hourEnergyData[4*b+3],d=d+dataP-dataN,f+=1,energyBarGraph.data.labels[24-((len-1)/4-b)]=a+1<10?"0"+a+"-0"+(a+1):a+1==10?"09-10":a+"-"+(a+1),energyBarGraph.data.datasets[0].data[24-((len-1)/4-b)]=dataP,1==hourEnergyData[4*b+4]?energyBarGraph.data.datasets[0].backgroundColor[24-((len-1)/4-b)]="#72BD00":energyBarGraph.data.datasets[0].backgroundColor[24-((len-1)/4-b)]="#34ECE1",energyBarGraph.data.datasets[1].data[24-((len-1)/4-b)]=-dataN):(a<23?(a+=1,energyBarGraph.data.labels[c]=a+1<10?"0"+a+"-0"+(a+1):a+1==10?"09-10":a+"-"+(a+1),energyBarGraph.data.datasets[0].data[c]=0,energyBarGraph.data.datasets[1].data[c]=0,c++):(a=0,energyBarGraph.data.labels[c]="0"+a+"-0"+(a+1),energyBarGraph.data.datasets[0].data[c]=0,energyBarGraph.data.datasets[1].data[c]=0,c++),c>23&&(c=0));for(var e=0;e<24;e++)energyBarGraph.data.datasets[2].data[e]=(d/f).toFixed(1);energyBarGraph.update()}function refreshEnergyChartDaily(){var d=0,b=1;null!=dailyEnergyData&&(b=dailyEnergyData.length-1),days=Last31Days();for(var a=0;a<31;a++)null!=dailyEnergyData&&null!=dailyEnergyData[b-a]?(d=(arr=dailyEnergyData[b-a].split(":"))[0],dataP=(dat=JSON.parse(arr[1]))[0],dataN=dat[1],energyBarGraph.data.labels[30-a]=d,energyBarGraph.data.datasets[0].data[30-a]=parseFloat(dataP/100).toFixed(1),energyBarGraph.data.datasets[1].data[30-a]=-parseFloat(dataN/100).toFixed(1)):(energyBarGraph.data.labels[30-a]=days[a],energyBarGraph.data.datasets[0].data[30-a]=0,energyBarGraph.data.datasets[1].data[30-a]=0);for(var c=0;c<31;c++)energyBarGraph.data.datasets[2].data[c]=getAvgEnergy(dailyEnergyData,31);energyBarGraph.update()}function refreshEnergyChartMonthly(){var d=0,b=1;null!=monthlyEnergyData&&(b=monthlyEnergyData.length-1),days=Last12Month();for(var a=0;a<12;a++)null!=monthlyEnergyData&&null!=monthlyEnergyData[b-a]?(d=(arr=monthlyEnergyData[b-a].split(":"))[0],dataP=(dat=JSON.parse(arr[1]))[0],dataN=dat[1],energyBarGraph.data.labels[11-a]=d,energyBarGraph.data.datasets[0].data[11-a]=parseFloat(dataP/100).toFixed(1),energyBarGraph.data.datasets[1].data[11-a]=-parseFloat(dataN/100).toFixed(1)):(energyBarGraph.data.labels[11-a]=days[a],energyBarGraph.data.datasets[0].data[11-a]=0,energyBarGraph.data.datasets[1].data[11-a]=0);for(var c=0;c<12;c++)energyBarGraph.data.datasets[2].data[c]=getAvgEnergy(monthlyEnergyData,12);energyBarGraph.update()}function getAvgEnergy(b,e){for(var c=0,d=0,a=0;a<e;a++)null!=b&&null!=b[a]&&(arr=b[a].split(":"),dataP=(dat=JSON.parse(arr[1]))[0],dataN=dat[1],c=c+parseFloat(dataP/100)-parseFloat(dataN/100),d++);return(c/d).toFixed(1)}function Last31Days(){for(var c=[],a=1;a<32;a++){var b=new Date;b.setDate(b.getDate()-a),c.push(formatDate(b))}return c}function Last12Month(){var a=new Date,b=[];for(i=0;i<=11;i++)b.push(a.getMonth()+1+"/"+a.getFullYear().toString().substr(-2)),a.setMonth(a.getMonth()-1);return b}function formatDate(c){var a=c.getDate(),b=c.getMonth()+1;return a<10&&(a="0"+a),b<10&&(b="0"+b),(b+"/"+a+"/"+c.getFullYear().toString().substr(-2)).toString()}function openNav(){$("#mySidenav").css("width","250px")}function closeNav(){$("#mySidenav").css("width","0")}function updateOverView(a,c){"undefined"==evseInstanceGauge&&0!=a.NUMBER_OF_EVSE&&(evseInstanceGauge=new evse(a.NUMBER_OF_EVSE)).createEvseGauge();var b=(((a.P1>32767?a.P1-65535:a.P1)+(a.P2>32767?a.P2-65535:a.P2)+(a.P3>32767?a.P3-65535:a.P3))/1e3).toFixed(1);c.set((b>20?20:b)<0?-1*(b>20?20:b):b>20?20:b),$("#powerTxt").text(b.toString()),powerAVGchartData=a.Pm,hourEnergyData=a.Es,dailyEnergyData=a.D,c.maxValue=3*a.BREAKER*.23,$("#totalEnergy").text(((a.E1tP+a.E2tP+a.E3tP)/100).toFixed(0).toString()),$("#todayEnergy").text(((a.E1dP+a.E2dP+a.E3dP)/100).toFixed(1).toString()),$("#yesterdayEnergy").text((a.EpDP/100).toFixed(1).toString()),handleEvseAPI(a.NUMBER_OF_EVSE,a.ACTUAL_CONFIG_CURRENT,a.ACTUAL_OUTPUT_CURRENT,a.EV_STATE),dotControl()}powerAVGchartData=0,hourEnergyData=[],dailyEnergyData=[],monthlyEnergyData=[],selectedEnergy="hourly",powerGraph="undefined",energyBarGraph="undefined",energyPieGraph="undefined",evseInstanceGauge="undefined",timer=0,$(function(){$("div.mainContainer").load("overview",function(){new CreateOverView;var a=new GaugeSetting("power",20,0).getGauge();$("#powerTxt").text("0.0"),$("#sideText").text("\u2630 "+translate("overview")),translatePage(),$(".loader").hide(100),$.ajax({url:"/updateData"}).done(function(b){$.ajax({url:"/updateEvse"}).done(function(c){$.extend(b,c),updateOverView(b,a)})}),timer=setInterval(function(){$.ajax({url:"/updateData"}).done(function(b){$.ajax({url:"/updateEvse"}).done(function(c){$.extend(b,c),updateOverView(b,a)})})},2e3)}),$("#mySidenav a").click(function(a){"overview"==$(this).attr("id")?(clearTimeout(timer),evseInstanceGauge="undefined",$("div.mainContainer").load("overview",function(){$("#sideText").text("\u2630 "+translate("overview")),new CreateOverView;var a=new GaugeSetting("power",20,0).getGauge();translatePage(),$("#powerTxt").text("0.0"),$.ajax({url:"/updateData"}).done(function(b){$.ajax({url:"/updateEvse"}).done(function(c){$.extend(b,c),updateOverView(b,a)})}),timer=setInterval(function(){$.ajax({url:"/updateData"}).done(function(b){$.ajax({url:"/updateEvse"}).done(function(c){$.extend(b,c),updateOverView(b,a)})})},2e3)})):"data"==$(this).attr("id")?(clearTimeout(timer),$("div.mainContainer").load("datatable",function(){evseInstanceGauge="undefined",$("#sideText").text("\u2630 "+translate("data")),new CreateDataTable,translatePage(),updateData(),timer=setInterval(function(){updateData()},2e3)})):"powerChart"==$(this).attr("id")?(clearTimeout(timer),$("div.mainContainer").load("powerChart",function(){evseInstanceGauge="undefined","undefined"!=powerGraph&&powerGraph.destroy(),$("#sideText").text("\u2630  "+translate("power"));var a=new powerChart(refreshPowerChart),b=$("#powerGraph"),c=a.getConfig();powerGraph=new Chart(b,c),translatePage(),timer=setInterval(function(){$.ajax({url:"/updateData"}).done(function(a){$("#updateData").html(a.datalayer),powerAVGchartData=a.Pm,dotControl(),refreshPowerChart()})},5e3),loadPowerChart()})):"energyChart"==$(this).attr("id")?(clearTimeout(timer),$("div.mainContainer").load("energyChart",function(){evseInstanceGauge="undefined",$("#sideText").text("\u2630 "+translate("energy"));var a=new energyChart(""," E [Wh]","Wh");o=$("#barEnergy"),d=a.getConfig(24),energyBarGraph=new Chart(o,d),selectedEnergy="hourly",updateData(),translatePage(),timer=setInterval(function(){$.ajax({url:"/updateData"}).done(function(a){$("#updateData").html(a.datalayer),hourEnergyData=a.Es,dailyEnergyData=a.D,monthlyEnergyData=a.M,"hourly"===selectedEnergy?refreshEnergyChartHourly():"daily"===selectedEnergy?refreshEnergyChartDaily():"monthly"===selectedEnergy&&refreshEnergyChartMonthly(),dotControl()})},2e4),refreshEnergyChartHourly()})):"settings"==$(this).attr("id")&&(clearTimeout(timer),$("div.mainContainer").load("settings",function(){$("#sideText").text("\u2630 "+translate("settings")),$("#Lw").text(translate("p_setting")),$(".loader").show(),setting.refreshSetting(),setting.refreshWifiClient(),evseInstanceGauge="undefined"}))}),$(document).on("click","#synchroTime",function(){$("#synchroTime").append('<span class="spinner-border spinner-border-sm"></span>'),(e=getTime())&&$.ajax({type:"POST",url:"/updateData",async:!0,data:JSON.stringify({time:e}),success:function(a){$("#updateData").html(a.datalayer),$("#synchroTime").find("span").remove()}})}),$(document).on("click","#relay",function(){e=1,$.ajax({type:"POST",url:"/updateData",async:!0,data:JSON.stringify({relay:e}),success:function(a){$("#updateData").html(a.datalayer),1==a.process?$("#RELAY").text("ON"):$("#RELAY").text("OFF")}})}),$(document).on("click","#hourE",function(){selectedEnergy="hourly",energyBarGraph.clear(),energyBarGraph.destroy();var a=new energyChart(""," E [Wh]","Wh");(o=$("#barEnergy")).height("80vh"),d=a.getConfig(24),energyBarGraph=new Chart(o,d),refreshEnergyChartHourly()}),$(document).on("click","#dayE",function(){selectedEnergy="daily",energyBarGraph.clear(),energyBarGraph.destroy();var a=new energyChart(""," E [kWh]","kWh");(o=$("#barEnergy")).height("80vh"),d=a.getConfig(31),energyBarGraph=new Chart(o,d),refreshEnergyChartDaily()}),$(document).on("click","#monthE",function(){selectedEnergy="monthly",energyBarGraph.clear(),energyBarGraph.destroy();var a=new energyChart(""," E [kWh]","kWh");(o=$("#barEnergy")).height("80vh"),d=a.getConfig(12),energyBarGraph=new Chart(o,d),refreshEnergyChartMonthly()})})