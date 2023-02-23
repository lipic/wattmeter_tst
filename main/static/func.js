function updateData(){$.ajax({url:"/updateData"}).done(function(t){$("#WATTMETER_TIME").text(t.WATTMETER_TIME);let a=parseInt(t.RUN_TIME,10),n=Math.floor((a-=3600*(s=Math.floor(a/86400))*24)/3600),r=Math.floor((a-=3600*n)/60);a-=60*r,$("#RUN_TIME").text((s<10?"0"+s:s)+":"+(n<10?"0"+n:n)+":"+(r<10?"0"+r:r)+":"+(a<10?"0"+a:a)),$("#U1").text(t.U1),$("#U2").text(t.U2),$("#U3").text(t.U3),$("#I1").text(rnd(t.I1,100,1,!0)),$("#I2").text(rnd(t.I2,100,1,!0)),$("#I3").text(rnd(t.I3,100,1,!0)),$("#P1").text(rnd(t.P1,1e3,2,!0)),$("#P2").text(rnd(t.P2,1e3,2,!0)),$("#P3").text(rnd(t.P3,1e3,2,!0)),t.A>0?$("#AC_IN").text("ON"):$("#AC_IN").text("OFF"),t.RELAY>0?$("#RELAY").text("ON"):$("#RELAY").text("OFF"),$("#PF1").text(rnd(t.F1,100,2)),$("#PF2").text(rnd(t.F2,100,2)),$("#PF3").text(rnd(t.F3,100,2)),$("#PP1p").text(rnd(t.W1,1e3,1)),$("#PP2p").text(rnd(t.W2,1e3,1)),$("#PP3p").text(rnd(t.W3,1e3,1)),$("#PN1p").text(rnd(t.R1,1e3,1)),$("#PN2p").text(rnd(t.R2,1e3,1)),$("#PN3p").text(rnd(t.R3,1e3,1)),$("#E1dP").text(rnd(t.E1dP,100,1)),$("#E2dP").text(rnd(t.E2dP,100,1)),$("#E3dP").text(rnd(t.E3dP,100,1)),$("#E1dN").text(rnd(t.E1dN,100,1)),$("#E2dN").text(rnd(t.E2dN,100,1)),$("#E3dN").text(rnd(t.E3dN,100,1)),t.E1tP/100>1e6||t.E2tP/100>1e6||t.E3tP/100>1e6?($("#E1tP").text(rnd(t.E1tP,1e8,2)),$("#E2tP").text(rnd(t.E2tP,1e8,2)),$("#E3tP").text(rnd(t.E3tP,1e8,2)),$("#Ep").text(translate("totalEp")+" \n[GWh]")):t.E1tP/100>1e3||t.E2tP/100>1e3||t.E3tP/100>1e3?($("#E1tP").text(rnd(t.E1tP,1e5,2)),$("#E2tP").text(rnd(t.E2tP,1e5,2)),$("#E3tP").text(rnd(t.E3tP,1e5,2)),$("#Ep").text(translate("totalEp")+" \n[MWh]")):($("#E1tP").text(rnd(t.E1tP,100,1)),$("#E2tP").text(rnd(t.E2tP,100,1)),$("#E3tP").text(rnd(t.E3tP,100,1)),$("#Ep").text(translate("totalEp")+" \n[kWh]")),t.E1tN/100>1e6||t.E2tN/100>1e6||t.E3tN/100>1e6?($("#E1tN").text(rnd(t.E1tN,1e8,2)),$("#E2tN").text(rnd(t.E2tN,1e8,2)),$("#E3tN").text(rnd(t.E3tN,1e8,2)),$("#En").text(translate("totalEn")+" \n[GWh]")):t.E1tN/100>1e3||t.E2tN/100>1e3||t.E3tN/100>1e3?($("#E1tN").text(rnd(t.E1tN,1e5,2)),$("#E2tN").text(rnd(t.E2tN,1e5,2)),$("#E3tN").text(rnd(t.E3tN,1e5,2)),$("#En").text(translate("totalEn")+" \n[MWh]")):($("#E1tN").text(rnd(t.E1tN,100,1)),$("#E2tN").text(rnd(t.E2tN,100,1)),$("#E3tN").text(rnd(t.E3tN,100,1)),$("#En").text(translate("totalEn")+" \n[kWh]")),$("#Current_EP").text(rnd(t.E1dP+t.E2dP+t.E3dP,100,2)),$("#Current_EN").text(rnd(t.E1dN+t.E2dN+t.E3dN,100,2)),$("#Previous_EP").text(rnd(t.EpDP,100,2)),$("#Previous_EN").text(rnd(t.EpDN,100,2)),$("#Total_EP").text(rnd(t.E1tP+t.E2tP+t.E3tP,100,0)),$("#Total_EN").text(rnd(t.E1tN+t.E2tN+t.E3tN,100,0)),$("#ID").text(t.ID),hourEnergyData=t.Es,dailyEnergyData=t.D,monthlyEnergyData=t.M,powerAVGchartData=t.Pm,dotControl()})}function rnd(t,a,n,r){return!0==r?((t>32767?t-65535:t)/a).toFixed(n):(t/a).toFixed(n)}function chargingAnim(t,a){for(var n=1;n<5;n++)$(".charge"+(n+4*(a-1))).css("animation-play-state",t)}function handleEvseAPI(t,a,n,r){for(var _=1;_<=t;_++)$("#ACTUAL_CONFIG_CURRENT"+_).text(void 0!==a[_-1]?a[_-1]+" A":"COMM ERR."),$("#ACTUAL_OUTPUT_CURRENT"+_).text(void 0!==n[_-1]?n[_-1]+" A":"COMM ERR."),r[_-1]<1||r[_-1]>3?($("#EV_STATE"+_).text("COMM ERR."),chargingAnim("paused",_),$(".charge"+(1+4*(_-1))).css("background-color","inherit")):1==r[_-1]?($("#EV_STATE"+_).text(translate("unplug")),chargingAnim("paused",_),$(".charge"+(1+4*(_-1))).css({"background-color":"red"})):2==r[_-1]?($("#EV_STATE"+_).text(translate("plug")),chargingAnim("paused",_),$(".charge"+(2+4*(_-1))).css("background-color","inherit"),$(".charge"+(3+4*(_-1))).css("background-color","inherit"),$(".charge"+(4+4*(_-1))).css("background-color","inherit"),$(".charge"+(1+4*(_-1))).css({"background-color":"yellow"})):3==r[_-1]&&($("#EV_STATE"+_).text(translate("charging")),chargingAnim("running",_),$(".charge"+(1+4*(_-1))).css({"background-color":"green"}))}function dotControl(){elements=$("#dot");for(var t=0;t<elements.length;t++)"grey"==elements[t].style.color?elements[t].style.color="#34ECE1":elements[t].style.color="grey"}function getTime(){var t=new Date,a=""+(t.getMonth()+1);return[""+t.getDate(),a,t.getFullYear(),t.getHours(),t.getMinutes(),t.getSeconds()]}function loadPowerChart(){len=powerAVGchartData[0];for(var t,a=1;a<61-len;a++)powerGraph.config.data.datasets.forEach(function(t){t.data.push({x:Date.now()-1e3*(61-a)*60,y:0})});for(a=1;a<len;a++)t=null!=powerAVGchartData[a]?powerAVGchartData[a]:0,powerGraph.config.data.datasets.forEach(function(n){n.data.push({x:Date.now()-1e3*(len-a)*60,y:t})});powerGraph.update()}function refreshPowerChart(){len=powerAVGchartData[0],powerGraph.data.datasets.forEach(function(t){t.data.push({x:Date.now(),y:powerAVGchartData[len-1]})})}function refreshEnergyChartHourly(){len=hourEnergyData[0];for(var t=0,a=0,n=0,r=0,_=0;_<24;_++)null!=hourEnergyData[4*_+4]?(t=hourEnergyData[4*_+1],n=n+(dataP=hourEnergyData[4*_+2])-(dataN=hourEnergyData[4*_+3]),r+=1,energyBarGraph.data.labels[24-((len-1)/4-_)]=t+1<10?"0"+t+"-0"+(t+1):t+1==10?"09-10":t+"-"+(t+1),energyBarGraph.data.datasets[0].data[24-((len-1)/4-_)]=dataP,1==hourEnergyData[4*_+4]?energyBarGraph.data.datasets[0].backgroundColor[24-((len-1)/4-_)]="#72BD00":energyBarGraph.data.datasets[0].backgroundColor[24-((len-1)/4-_)]="#34ECE1",energyBarGraph.data.datasets[1].data[24-((len-1)/4-_)]=-dataN):(t<23?(t+=1,energyBarGraph.data.labels[a]=t+1<10?"0"+t+"-0"+(t+1):t+1==10?"09-10":t+"-"+(t+1),energyBarGraph.data.datasets[0].data[a]=0,energyBarGraph.data.datasets[1].data[a]=0,a++):(t=0,energyBarGraph.data.labels[a]="0"+t+"-0"+(t+1),energyBarGraph.data.datasets[0].data[a]=0,energyBarGraph.data.datasets[1].data[a]=0,a++),a>23&&(a=0));for(var l=0;l<24;l++)energyBarGraph.data.datasets[2].data[l]=(n/r).toFixed(1);energyBarGraph.update()}function refreshEnergyChartDaily(){var t=0,a=1;null!=dailyEnergyData&&(a=dailyEnergyData.length-1),days=Last31Days();for(var n=0;n<31;n++)null!=dailyEnergyData&&null!=dailyEnergyData[a-n]?(t=(arr=dailyEnergyData[a-n].split(":"))[0],dataP=(dat=JSON.parse(arr[1]))[0],dataN=dat[1],energyBarGraph.data.labels[30-n]=t,energyBarGraph.data.datasets[0].data[30-n]=parseFloat(dataP/100).toFixed(1),energyBarGraph.data.datasets[1].data[30-n]=-parseFloat(dataN/100).toFixed(1)):(energyBarGraph.data.labels[30-n]=days[n],energyBarGraph.data.datasets[0].data[30-n]=0,energyBarGraph.data.datasets[1].data[30-n]=0);for(var r=0;r<31;r++)energyBarGraph.data.datasets[2].data[r]=getAvgEnergy(dailyEnergyData,31);energyBarGraph.update()}function refreshEnergyChartMonthly(){var t=0,a=1;null!=monthlyEnergyData&&(a=monthlyEnergyData.length-1),days=Last12Month();for(var n=0;n<12;n++)null!=monthlyEnergyData&&null!=monthlyEnergyData[a-n]?(t=(arr=monthlyEnergyData[a-n].split(":"))[0],dataP=(dat=JSON.parse(arr[1]))[0],dataN=dat[1],energyBarGraph.data.labels[11-n]=t,energyBarGraph.data.datasets[0].data[11-n]=parseFloat(dataP/100).toFixed(1),energyBarGraph.data.datasets[1].data[11-n]=-parseFloat(dataN/100).toFixed(1)):(energyBarGraph.data.labels[11-n]=days[n],energyBarGraph.data.datasets[0].data[11-n]=0,energyBarGraph.data.datasets[1].data[11-n]=0);for(var r=0;r<12;r++)energyBarGraph.data.datasets[2].data[r]=getAvgEnergy(monthlyEnergyData,12);energyBarGraph.update()}function refreshEnergyChartYearly(){for(var t=0,a=0,n=0,r=0,_=0,l=0,E=0,c=1,u=0;u<monthlyEnergyData.length;u++){console.log(monthlyEnergyData[u]);var f=monthlyEnergyData[u].split(":"),h=JSON.parse(f[1]),t=f[0].split("/")[1];0==n&&(n=t),n!=t&&(c+=1,energyBarGraph.data.labels[a]=n,n=t,energyBarGraph.data.datasets[0].data[a]=parseFloat(r/100).toFixed(1),energyBarGraph.data.datasets[1].data[a]=-parseFloat(_/100).toFixed(1),r=0,_=0,a+=1),r+=h[0],l+=h[0],_+=h[1],E+=h[1]}energyBarGraph.data.labels[a]=t,energyBarGraph.data.datasets[0].data[a]=parseFloat(r/100).toFixed(1),energyBarGraph.data.datasets[1].data[a]=-parseFloat(_/100).toFixed(1);for(var x=((l+E)/(100*c)).toFixed(1),g=0;g<c;g++)energyBarGraph.data.datasets[2].data[g]=x;energyBarGraph.update()}function getAvgEnergy(t,a){for(var n=0,r=0,_=0;_<a;_++)null!=t&&null!=t[_]&&(dataP=(dat=JSON.parse((arr=t[_].split(":"))[1]))[0],dataN=dat[1],n=n+parseFloat(dataP/100)-parseFloat(dataN/100),r++);return(n/r).toFixed(1)}function Last31Days(){for(var t=[],a=1;a<32;a++){var n=new Date;n.setDate(n.getDate()-a),t.push(formatDate(n))}return t}function Last12Month(){var t=new Date,a=[];for(i=0;i<=11;i++)a.push(t.getMonth()+1+"/"+t.getFullYear().toString().substr(-2)),t.setMonth(t.getMonth()-1);return a}function getNumberOfYear(){for(var t=0,a=0,n=0;n<monthlyEnergyData.length;n++){var r=monthlyEnergyData[n].split(":"),_=r[0].split("/")[2];t!=_&&(t=_,a+=1),JSON.parse(r[1])}return a}function formatDate(t){var a=t.getDate(),n=t.getMonth()+1;return a<10&&(a="0"+a),n<10&&(n="0"+n),(n+"/"+a+"/"+t.getFullYear().toString().substr(-2)).toString()}function openNav(){$("#mySidenav").css("width","250px")}function closeNav(){$("#mySidenav").css("width","0")}function updateOverView(t,a){"undefined"==evseInstanceGauge&&0!=t.NUMBER_OF_EVSE&&(evseInstanceGauge=new evse(t.NUMBER_OF_EVSE)).createEvseGauge();var n=(((t.P1>32767?t.P1-65535:t.P1)+(t.P2>32767?t.P2-65535:t.P2)+(t.P3>32767?t.P3-65535:t.P3))/1e3).toFixed(1);a.set((n>20?20:n)<0?-1*(n>20?20:n):n>20?20:n),$("#powerTxt").text(n.toString()),powerAVGchartData=t.Pm,hourEnergyData=t.Es,dailyEnergyData=t.D,a.maxValue=3*t.BREAKER*.23,$("#totalEnergy").text(((t.E1tP+t.E2tP+t.E3tP)/100).toFixed(0).padStart(9,"0")),$("#totalGenEnergy").text(((t.E1tN+t.E2tN+t.E3tN)/100).toFixed(0).padStart(9,"0")),$("#todayEnergy").text(((t.E1dP+t.E2dP+t.E3dP)/100).toFixed(1).padStart(5,"0")),$("#todayGenEnergy").text(((t.E1dN+t.E2dN+t.E3dN)/100).toFixed(1).padStart(5,"0")),$("#yesterdayEnergy").text((t.EpDP/100).toFixed(1).padStart(5,"0")),$("#yesterdayGenEnergy").text((t.EpDN/100).toFixed(1).padStart(5,"0")),handleEvseAPI(t.NUMBER_OF_EVSE,t.ACTUAL_CONFIG_CURRENT,t.ACTUAL_OUTPUT_CURRENT,t.EV_STATE),dotControl()}function createMainBody(){$('<span id="dot" class="fas fa-wifi"></span><div id="mySidenav" class="sidenav"><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a><a href="#" id="overview" onclick="closeNav()"><i class="fa fa-home"></i><i data-i18n-key="overview">Overview</i></a><a href="#" id="data" onclick="closeNav()"><i class="fas fa-database"></i><i data-i18n-key="data">Data</i></a><a href="#" id="powerChart" onclick="closeNav()"><i class="fa fa-chart-area"></i><i data-i18n-key="power">Power</i></a><a href="#" id="energyChart" onclick="closeNav()"><i class="fas fa-chart-bar"></i><i data-i18n-key="energy">Energy</i></a><a href="#" id="settings" onclick="closeNav()"><i class="fas fa-cog"></i><i data-i18n-key="settings">Settings</i></a></div><span class="font-weight-bold" id="sideText" style="font-size: 30px; cursor: pointer; color: #fff;" onclick="openNav()"></span><div class="loader text-center"><div class="loader-inner"><div class="lds-roller mb-3"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><h4 id="Lw" class="text-uppercase font-weight-bold">Loading</h4></div></div><div class="mainContainer"></div>').appendTo("#mainBody")}powerAVGchartData=0,hourEnergyData=[],dailyEnergyData=[],monthlyEnergyData=[],selectedEnergy="hourly",powerGraph="undefined",energyBarGraph="undefined",energyPieGraph="undefined",evseInstanceGauge="undefined",timer=0,$(function(){createMainBody(),$("div.mainContainer").load("overview",function(){setTimeout(function(){new CreateOverView;var t=new GaugeSetting("power",20,0).getGauge();$("#powerTxt").text("0.0"),$("#sideText").text("☰ "+translate("overview")),translatePage(),$(".loader").hide(100),$.ajax({url:"/updateData"}).done(function(a){$.ajax({url:"/updateEvse"}).done(function(n){$.extend(a,n),updateOverView(a,t)})}),timer=setInterval(function(){$.ajax({url:"/updateData"}).done(function(a){$.ajax({url:"/updateEvse"}).done(function(n){$.extend(a,n),updateOverView(a,t)})})},2e3)},500)}),$("#mySidenav a").click(function(t){"overview"==$(this).attr("id")?(clearTimeout(timer),evseInstanceGauge="undefined",$("div.mainContainer").load("overview",function(){$("#sideText").text("☰ "+translate("overview")),new CreateOverView;var t=new GaugeSetting("power",20,0).getGauge();translatePage(),$("#powerTxt").text("0.0"),$.ajax({url:"/updateData"}).done(function(a){$.ajax({url:"/updateEvse"}).done(function(n){$.extend(a,n),updateOverView(a,t)})}),timer=setInterval(function(){$.ajax({url:"/updateData"}).done(function(a){$.ajax({url:"/updateEvse"}).done(function(n){$.extend(a,n),updateOverView(a,t)})})},2e3)})):"data"==$(this).attr("id")?(clearTimeout(timer),$("div.mainContainer").load("datatable",function(){evseInstanceGauge="undefined",$("#sideText").text("☰ "+translate("data")),new CreateDataTable,translatePage(),updateData(),timer=setInterval(function(){updateData()},2e3)})):"powerChart"==$(this).attr("id")?(clearTimeout(timer),$("div.mainContainer").load("powerChart",function(){evseInstanceGauge="undefined","undefined"!=powerGraph&&powerGraph.destroy(),$("#sideText").text("☰  "+translate("power"));var t=new powerChart(refreshPowerChart),a=$("#powerGraph"),n=t.getConfig();powerGraph=new Chart(a,n),translatePage(),timer=setInterval(function(){$.ajax({url:"/updateData"}).done(function(t){$("#updateData").html(t.datalayer),powerAVGchartData=t.Pm,dotControl(),refreshPowerChart()})},5e3),loadPowerChart()})):"energyChart"==$(this).attr("id")?(clearTimeout(timer),$("div.mainContainer").load("energyChart",function(){evseInstanceGauge="undefined",$("#sideText").text("☰ "+translate("energy"));var t=new energyChart(""," E [Wh]","Wh");t.createTemplate(),o=$("#barEnergy"),d=t.getConfig(24),energyBarGraph=new Chart(o,d),selectedEnergy="hourly",updateData(),translatePage(),timer=setInterval(function(){$.ajax({url:"/updateData"}).done(function(t){$("#updateData").html(t.datalayer),hourEnergyData=t.Es,dailyEnergyData=t.D,monthlyEnergyData=t.M,"hourly"===selectedEnergy?refreshEnergyChartHourly():"daily"===selectedEnergy?refreshEnergyChartDaily():"monthly"===selectedEnergy&&refreshEnergyChartMonthly(),dotControl()})},2e4),refreshEnergyChartHourly()})):"settings"==$(this).attr("id")&&(clearTimeout(timer),$("div.mainContainer").load("settings",function(){$("#sideText").text("☰ "+translate("settings")),$("#Lw").text(translate("p_setting")),$(".loader").show(),setting.refreshSetting(),translatePage(),setting.refreshWifiClient(),evseInstanceGauge="undefined"}))}),$(document).on("click","#synchroTime",function(){$("#synchroTime").append('<span class="spinner-border spinner-border-sm"></span>'),(e=getTime())&&$.ajax({type:"POST",url:"/updateData",async:!0,data:JSON.stringify({time:e}),success:function(t){$("#updateData").html(t.datalayer),$("#synchroTime").find("span").remove()}})}),$(document).on("click","#relay",function(){e=1,$.ajax({type:"POST",url:"/updateData",async:!0,data:JSON.stringify({relay:e}),success:function(t){$("#updateData").html(t.datalayer),1==t.process?$("#RELAY").text("ON"):$("#RELAY").text("OFF")}})}),$(document).on("click","#hourE",function(){selectedEnergy="hourly",energyBarGraph.clear(),energyBarGraph.destroy();var t=new energyChart(""," E [Wh]","Wh");(o=$("#barEnergy")).height("80vh"),d=t.getConfig(24),energyBarGraph=new Chart(o,d),refreshEnergyChartHourly()}),$(document).on("click","#dayE",function(){selectedEnergy="daily",energyBarGraph.clear(),energyBarGraph.destroy();var t=new energyChart(""," E [kWh]","kWh");(o=$("#barEnergy")).height("80vh"),d=t.getConfig(31),energyBarGraph=new Chart(o,d),refreshEnergyChartDaily()}),$(document).on("click","#monthE",function(){selectedEnergy="monthly",energyBarGraph.clear(),energyBarGraph.destroy();var t=new energyChart(""," E [kWh]","kWh");(o=$("#barEnergy")).height("80vh"),d=t.getConfig(12),energyBarGraph=new Chart(o,d),refreshEnergyChartMonthly()}),$(document).on("click","#yearE",function(){selectedEnergy="yearly",energyBarGraph.clear(),energyBarGraph.destroy();var t=new energyChart(""," E [kWh]","kWh");(o=$("#barEnergy")).height("80vh"),d=t.getConfig(getNumberOfYear()),energyBarGraph=new Chart(o,d),refreshEnergyChartYearly()})});