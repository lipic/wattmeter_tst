function updateData(){$.ajax({url:"/updateData"}).done(function(t){$("#updateData").html(t.datalayer),$("#WATTMETER_TIME").text(t.WATTMETER_TIME);let e=parseInt(t.RUN_TIME,10);e-=3600*(s=Math.floor(e/86400))*24;let a=Math.floor(e/3600);e-=3600*a;let r=Math.floor(e/60);e-=60*r,$("#RUN_TIME").text((s<10?"0"+s:s)+":"+(a<10?"0"+a:a)+":"+(r<10?"0"+r:r)+":"+(e<10?"0"+e:e)),$("#U1").text(t.U1),$("#U2").text(t.U2),$("#U3").text(t.U3),$("#I1").text(rnd(t.I1,100,2,!0)),$("#I2").text(rnd(t.I2,100,2,!0)),$("#I3").text(rnd(t.I3,100,2,!0)),$("#P1").text(rnd(t.P1,1e3,2,!0)),$("#P2").text(rnd(t.P2,1e3,2,!0)),$("#P3").text(rnd(t.P3,1e3,2,!0)),t.AC_IN>0?($("#AC_IN").text("ON"),$("#AC_IN").css("color","#74DF00")):($("#AC_IN").text("OFF"),$("#AC_IN").css("color","#FF0000")),t.RELAY>0?($("#RELAY").text("ON"),$("#RELAY").css("color","#74DF00")):($("#RELAY").text("OFF"),$("#RELAY").css("color","#FF0000")),$("#PF1").text(rnd(t.PF1,100,2)),$("#PF2").text(rnd(t.PF2,100,2)),$("#PF3").text(rnd(t.PF3,100,2)),$("#PP1p").text(rnd(t.PP1p,1e3,1)),$("#PP2p").text(rnd(t.PP2p,1e3,1)),$("#PP3p").text(rnd(t.PP3p,1e3,1)),$("#PN1p").text(rnd(t.PN1p,1e3,1)),$("#PN2p").text(rnd(t.PN2p,1e3,1)),$("#PN3p").text(rnd(t.PN3p,1e3,1)),$("#E1dP").text(rnd(t.E1dP,100,2)),$("#E2dP").text(rnd(t.E2dP,100,2)),$("#E3dP").text(rnd(t.E3dP,100,2)),$("#E1dN").text(rnd(t.E1dN,100,2)),$("#E2dN").text(rnd(t.E2dN,100,2)),$("#E3dN").text(rnd(t.E3dN,100,2)),t.E1tP/100>1e6||t.E2tP/100>1e6||t.E3tP/100>1e6?($("#E1tP").text(rnd(t.E1tP,1e8,2)),$("#E2tP").text(rnd(t.E2tP,1e8,2)),$("#E3tP").text(rnd(t.E3tP,1e8,2)),$("#EtP").text("↓ Total E [GWh]")):t.E1tP/100>1e3||t.E2tP/100>1e3||t.E3tP/100>1e3?($("#E1tP").text(rnd(t.E1tP,1e5,2)),$("#E2tP").text(rnd(t.E2tP,1e5,2)),$("#E3tP").text(rnd(t.E3tP,1e5,2)),$("#EtP").text("↓ Total E [MWh]")):($("#E1tP").text(rnd(t.E1tP,100,1)),$("#E2tP").text(rnd(t.E2tP,100,1)),$("#E3tP").text(rnd(t.E3tP,100,1)),$("#EtP").text("↓ Total E [kWh]")),t.E1tN/100>1e6||t.E2tN/100>1e6||t.E3tN/100>1e6?($("#E1tN").text(rnd(t.E1tN,1e8,2)),$("#E2tN").text(rnd(t.E2tN,1e8,2)),$("#E3tN").text(rnd(t.E3tN,1e8,2)),$("#EtN").text("↑ Total E [GWh]")):t.E1tN/100>1e3||t.E2tN/100>1e3||t.E3tN/100>1e3?($("#E1tN").text(rnd(t.E1tN,1e5,2)),$("#E2tN").text(rnd(t.E2tN,1e5,2)),$("#E3tN").text(rnd(t.E3tN,1e5,2)),$("#EtN").text("↑ Total E [MWh]")):($("#E1tN").text(rnd(t.E1tN,100,1)),$("#E2tN").text(rnd(t.E2tN,100,1)),$("#E3tN").text(rnd(t.E3tN,100,1)),$("#EtN").text("↑ Total E [kWh]")),$("#Current_EP").text(rnd(t.E1dP+t.E2dP+t.E3dP,100,2)),$("#Current_EN").text(rnd(t.E1dN+t.E2dN+t.E3dN,100,2)),$("#Previous_EP").text(rnd(t.EpDP,100,2)),$("#Previous_EN").text(rnd(t.EpDN,100,2)),$("#Total_EP").text(rnd(t.E1tP+t.E2tP+t.E3tP,100,0)),$("#Total_EN").text(rnd(t.E1tN+t.E2tN+t.E3tN,100,0)),$("#ID").text(t.ID),hourEnergyData=t.E_hour,dailyEnergyData=t.DailyEnergy,monthlyEnergyData=t.MonthlyEnergy,powerAVGchartData=t.P_minuten,dotControl()})}function rnd(t,e,a,r){return 1==r?((t>32767?t-65535:t)/e).toFixed(a):(t/e).toFixed(a)}function chargingAnim(t,e){for(var a=1;a<5;a++)$(".charge"+(a+4*(e-1))).css("animation-play-state",t)}function handleEvseAPI(t,e,a,r){for(var n=1;n<=t;n++)$("#ACTUAL_CONFIG_CURRENT"+n).text(void 0!==e[n-1]?e[n-1]+" A":"COMM ERR."),$("#ACTUAL_OUTPUT_CURRENT"+n).text(void 0!==a[n-1]?a[n-1]+" A":"COMM ERR."),r[n-1]<1||r[n-1]>3?($("#EV_STATE"+n).text("COMM ERR."),chargingAnim("paused",n),$(".charge"+(1+4*(n-1))).css("background-color","inherit")):1==r[n-1]?($("#EV_STATE"+n).text("UNPLUG"),chargingAnim("paused",n),$(".charge"+(1+4*(n-1))).css({"background-color":"red"})):2==r[n-1]?($("#EV_STATE"+n).text("PLUG"),chargingAnim("paused",n),$(".charge"+(2+4*(n-1))).css("background-color","inherit"),$(".charge"+(3+4*(n-1))).css("background-color","inherit"),$(".charge"+(4+4*(n-1))).css("background-color","inherit"),$(".charge"+(1+4*(n-1))).css({"background-color":"yellow"})):3==r[n-1]&&($("#EV_STATE"+n).text("CHARGING"),chargingAnim("running",n),$(".charge"+(1+4*(n-1))).css({"background-color":"green"}))}function dotControl(){elements=$("#dot");for(var t=0;t<elements.length;t++)"grey"==elements[t].style.color?elements[t].style.color="orange":elements[t].style.color="grey"}function getTime(){var t=new Date,e=""+(t.getMonth()+1);return[""+t.getDate(),e,t.getFullYear(),t.getHours(),t.getMinutes(),t.getSeconds()]}function loadPowerChart(){len=powerAVGchartData[0];for(var t=1;t<61-len;t++)powerGraph.config.data.datasets.forEach(function(e){e.data.push({x:Date.now()-1e3*(61-t)*60,y:0})});for(t=1;t<len;t++){var e;e=null!=powerAVGchartData[t]?powerAVGchartData[t]:0,powerGraph.config.data.datasets.forEach(function(a){a.data.push({x:Date.now()-1e3*(len-t)*60,y:e})})}powerGraph.update()}function refreshPowerChart(){len=powerAVGchartData[0],powerGraph.data.datasets.forEach(function(t){t.data.push({x:Date.now(),y:powerAVGchartData[len-1]})})}function refreshEnergyChartHourly(){len=hourEnergyData[0];for(var t=0,e=0,a=0,r=0,n=0;n<24;n++)null!=hourEnergyData[4*n+4]?(t=hourEnergyData[4*n+1],dataP=hourEnergyData[4*n+2],dataN=hourEnergyData[4*n+3],a=a+dataP-dataN,r+=1,energyBarGraph.data.labels[24-((len-1)/4-n)]=t+1<10?"0"+t+"-0"+(t+1):t+1==10?"09-10":t+"-"+(t+1),energyBarGraph.data.datasets[0].data[24-((len-1)/4-n)]=dataP,1==hourEnergyData[4*n+4]?energyBarGraph.data.datasets[0].backgroundColor[24-((len-1)/4-n)]="#72BD00":energyBarGraph.data.datasets[0].backgroundColor[24-((len-1)/4-n)]="#00BFEC",energyBarGraph.data.datasets[1].data[24-((len-1)/4-n)]=-dataN):(t<23?(t+=1,energyBarGraph.data.labels[e]=t+1<10?"0"+t+"-0"+(t+1):t+1==10?"09-10":t+"-"+(t+1),energyBarGraph.data.datasets[0].data[e]=0,energyBarGraph.data.datasets[1].data[e]=0,e++):(t=0,energyBarGraph.data.labels[e]="0"+t+"-0"+(t+1),energyBarGraph.data.datasets[0].data[e]=0,energyBarGraph.data.datasets[1].data[e]=0,e++),e>23&&(e=0));for(var d=0;d<24;d++)energyBarGraph.data.datasets[2].data[d]=(a/r).toFixed(1);energyBarGraph.update()}function refreshEnergyChartDaily(){var t=0,e=1;null!=dailyEnergyData&&(e=dailyEnergyData.length-1),days=Last31Days();for(var a=0;a<31;a++)null!=dailyEnergyData&&null!=dailyEnergyData[e-a]?(arr=dailyEnergyData[e-a].split(":"),t=arr[0],dat=JSON.parse(arr[1]),dataP=dat[0],dataN=dat[1],energyBarGraph.data.labels[30-a]=t,energyBarGraph.data.datasets[0].data[30-a]=parseFloat(dataP/100).toFixed(1),energyBarGraph.data.datasets[1].data[30-a]=-parseFloat(dataN/100).toFixed(1)):(energyBarGraph.data.labels[30-a]=days[a],energyBarGraph.data.datasets[0].data[30-a]=0,energyBarGraph.data.datasets[1].data[30-a]=0);for(var r=0;r<31;r++)energyBarGraph.data.datasets[2].data[r]=getAvgEnergy(dailyEnergyData,31);energyBarGraph.update()}function refreshEnergyChartMonthly(){var t=0,e=1;null!=monthlyEnergyData&&(e=monthlyEnergyData.length-1),days=Last12Month();for(var a=0;a<12;a++)null!=monthlyEnergyData&&null!=monthlyEnergyData[e-a]?(arr=monthlyEnergyData[e-a].split(":"),t=arr[0],dat=JSON.parse(arr[1]),dataP=dat[0],dataN=dat[1],energyBarGraph.data.labels[11-a]=t,energyBarGraph.data.datasets[0].data[11-a]=parseFloat(dataP/100).toFixed(1),energyBarGraph.data.datasets[1].data[11-a]=-parseFloat(dataN/100).toFixed(1)):(energyBarGraph.data.labels[11-a]=days[a],energyBarGraph.data.datasets[0].data[11-a]=0,energyBarGraph.data.datasets[1].data[11-a]=0);for(var r=0;r<12;r++)energyBarGraph.data.datasets[2].data[r]=getAvgEnergy(monthlyEnergyData,12);energyBarGraph.update()}function getAvgEnergy(t,e){for(var a=0,r=0,n=0;n<e;n++)null!=t&&null!=t[n]&&(arr=t[n].split(":"),dat=JSON.parse(arr[1]),dataP=dat[0],dataN=dat[1],a=a+parseFloat(dataP/100)-parseFloat(dataN/100),r++);return(a/r).toFixed(1)}function Last31Days(){for(var t=[],e=1;e<32;e++){var a=new Date;a.setDate(a.getDate()-e),t.push(formatDate(a))}return t}function Last12Month(){var t=new Date,e=[];for(i=0;i<=11;i++)e.push(t.getMonth()+1+"/"+t.getFullYear().toString().substr(-2)),t.setMonth(t.getMonth()-1);return e}function formatDate(t){var e=t.getDate(),a=t.getMonth()+1;return e<10&&(e="0"+e),a<10&&(a="0"+a),(a+"/"+e+"/"+t.getFullYear().toString().substr(-2)).toString()}function openNav(){$("#mySidenav").css("width","250px")}function closeNav(){$("#mySidenav").css("width","0")}function updateOverView(t,e){$("#updateData").html(t.datalayer),"undefined"==evseInstanceGauge&&0!=t.NUMBER_OF_EVSE&&(evseInstanceGauge=new evse(t.NUMBER_OF_EVSE),evseInstanceGauge.createEvseGauge());var a=(((t.P1>32767?t.P1-65535:t.P1)+(t.P2>32767?t.P2-65535:t.P2)+(t.P3>32767?t.P3-65535:t.P3))/1e3).toFixed(1);e.set((a>20?20:a)<0?-1*(a>20?20:a):a>20?20:a),$("#powerTxt").text(a.toString()),powerAVGchartData=t.P_minuten,hourEnergyData=t.E_hour,dailyEnergyData=t.DailyEnergy;for(var r=((t.E1tP+t.E2tP+t.E3tP)/100).toFixed(0).toString(),n=((t.E1dP+t.E2dP+t.E3dP)/100).toFixed(1).toString(),d=(t.EpDP/100).toFixed(1).toString(),o=r.length-1;o>=0;o--)$("#kWh"+(r.length-o)).text(r[o]),$("#dWh"+(n.length-o)).text(n[o]),$("#lWh"+(d.length-o)).text(d[o]);handleEvseAPI(t.NUMBER_OF_EVSE,t.ACTUAL_CONFIG_CURRENT,t.ACTUAL_OUTPUT_CURRENT,t.EV_STATE),dotControl()}powerAVGchartData=0,hourEnergyData=[],dailyEnergyData=[],monthlyEnergyData=[],selectedEnergy="hourly",powerGraph="undefined",energyBarGraph="undefined",energyPieGraph="undefined",evseInstanceGauge="undefined",timer=0,$(function(){$("div.mainContainer").load("overview",function(){$(".loader").hide(100);var t=new GaugeSetting("power",20,0).getGauge();$("#powerTxt").text("0.0"),$.ajax({url:"/updateData"}).done(function(e){updateOverView(e,t)}),timer=setInterval(function(){$.ajax({url:"/updateData"}).done(function(e){updateOverView(e,t)})},2e3)}),$("#mySidenav a").click(function(t){"overview"==$(this).attr("id")?(clearTimeout(timer),evseInstanceGauge="undefined",$("div.mainContainer").load("overview",function(){$("#sideText").text("☰ Overview");var t=new GaugeSetting("power",20,0).getGauge();$("#powerTxt").text("0.0"),$.ajax({url:"/updateData"}).done(function(e){updateOverView(e,t)}),timer=setInterval(function(){$.ajax({url:"/updateData"}).done(function(e){updateOverView(e,t)})},2e3)})):"data"==$(this).attr("id")?(clearTimeout(timer),$("div.mainContainer").load("datatable",function(){evseInstanceGauge="undefined",$("#sideText").text("☰ Data"),new CreateDataTable,updateData(),timer=setInterval(function(){updateData()},2e3)})):"settings"==$(this).attr("id")?(clearTimeout(timer),$("div.mainContainer").load("settings",function(){$("#Lw").text("Preparing settings"),$(".loader").show();var t=new Setting;t.refreshSetting(),t.refreshWifiClient(),evseInstanceGauge="undefined",$("#sideText").text("☰  Settings")})):"powerChart"==$(this).attr("id")?(clearTimeout(timer),$("div.mainContainer").load("powerChart",function(){evseInstanceGauge="undefined","undefined"!=powerGraph&&powerGraph.destroy(),$("#sideText").text("☰  Power chart");var t=new powerChart(refreshPowerChart),e=$("#powerGraph"),a=t.getConfig();powerGraph=new Chart(e,a),timer=setInterval(function(){$.ajax({url:"/updateData"}).done(function(t){$("#updateData").html(t.datalayer),powerAVGchartData=t.P_minuten,dotControl(),refreshPowerChart()})},5e3),loadPowerChart()})):"energyChart"==$(this).attr("id")&&(clearTimeout(timer),$("div.mainContainer").load("energyChart",function(){evseInstanceGauge="undefined",$("#sideText").text("☰  Energy charts");var t=new energyChart("","Hourly E [Wh]","Wh");o=$("#barEnergy"),d=t.getConfig(24),energyBarGraph=new Chart(o,d),selectedEnergy="daily",updateData(),timer=setInterval(function(){$.ajax({url:"/updateData"}).done(function(t){$("#updateData").html(t.datalayer),hourEnergyData=t.E_hour,dailyEnergyData=t.DailyEnergy,monthlyEnergyData=t.MonthlyEnergy,"hourly"==selectedEnergy?refreshEnergyChartHourly():"daily"==selectedEnergy?refreshEnergyChartDaily():"monthly"==selectedEnergy&&refreshEnergyChartMonthly(),dotControl()})},2e4),refreshEnergyChartHourly()}))}),$(document).on("click","#synchroTime",function(){$("#synchroTime").append('<span class="spinner-border spinner-border-sm"></span>'),e=getTime(),e&&$.ajax({type:"POST",url:"/updateData",async:!0,data:JSON.stringify({time:e}),success:function(t){$("#updateData").html(t.datalayer),$("#synchroTime").find("span").remove()}})}),$(document).on("click","#relay",function(){e=1,e&&$.ajax({type:"POST",url:"/updateData",async:!0,data:JSON.stringify({relay:e}),success:function(t){$("#updateData").html(t.datalayer),1==t.process?($("#RELAY").text("ON"),$("#RELAY").css("color","#74DF00")):($("#RELAY").text("OFF"),$("#RELAY").css("color","#FF0000"))}})}),$(document).on("click","#hourE",function(){selectedEnergy="hourly",energyBarGraph.clear(),energyBarGraph.destroy();var t=new energyChart("","Hourly E [Wh]","Wh");o=$("#barEnergy"),o.height("75vh"),d=t.getConfig(24),energyBarGraph=new Chart(o,d),refreshEnergyChartHourly()}),$(document).on("click","#dayE",function(){selectedEnergy="daily",energyBarGraph.clear(),energyBarGraph.destroy();var t=new energyChart("","Daily E [kWh]","kWh");o=$("#barEnergy"),o.height("75vh"),d=t.getConfig(31),energyBarGraph=new Chart(o,d),refreshEnergyChartDaily()}),$(document).on("click","#monthE",function(){selectedEnergy="monthly",energyBarGraph.clear(),energyBarGraph.destroy();var t=new energyChart("","Monthly E [kWh]","kWh");o=$("#barEnergy"),o.height("75vh"),d=t.getConfig(12),energyBarGraph=new Chart(o,d),refreshEnergyChartMonthly()})});