var setting={t:"undefined",n:0,refreshSetting(){$.ajax({url:"/updateSetting"}).done(function(s){for(var i in t=s,s)s.hasOwnProperty(i)&&"txt"==(i=i.split(","))[0]&&$('<div class="row  mt-3" >  <div class="col" >  <p id="debug">'+translate(i[1])+'</p> </div>  <div class="col">  <p> '+("1"==s["sw,TESTING SOFTWARE"]?"tst_"+s[i[0]+","+i[1]]:s[i[0]+","+i[1]])+"</p> </div> </div>").appendTo("#settingTable");for(var i in $("#updateSetting").html(s.datalayer),s)if(s.hasOwnProperty(i)&&"sw"==(i=i.split(","))[0]){if("TESTING SOFTWARE"==i[1]&&"0"==s[i[0]+","+i[1]])continue;$('<div class="row  mt-4">  <div class="col" >  <p>'+i[1]+'</p> </div>  <div class="col">  <input id="'+i[1]+'"  type="checkbox" name="btn-checkbox" data-toggle="witchbutton"> </div> </div>').appendTo("#settingTable"),"1"==s[i[0]+","+i[1]]?document.getElementById(i[1]).switchButton(translate("on"),!0):document.getElementById(i[1]).switchButton(translate("off"),!1)}for(var i in s)s.hasOwnProperty(i)&&"btn"==(i=i.split(","))[0]&&$('<div class="row  mt-4 mb-3" >  <div class="col" >  <p id="'+i[1]+'">'+i[1]+'</p> </div><div class="col"><div class="btn-group btn-group-toggle" id="PV" data-toggle="buttons"><label id="PV0" class="btn btn-outline-primary 0"><input type="radio" name="options" checked> '+translate("off")+' </label><label id="PV1" class="btn btn-outline-primary 1"><input type="radio" name="options" checked> 1p </label><label id="PV2" class="btn btn-outline-primary 2"><input type="radio" name="options" checked> 3p </label></div></div></div>').appendTo("#settingTable");for(var i in $("#PV"+s["btn,PHOTOVOLTAIC"]).toggleClass("active"),s)s.hasOwnProperty(i)&&"bt"==(i=i.split(","))[0]&&$('<div class="row  mt-4 mb-3" >  <div class="col" >  <p id="'+i[1]+'">'+i[1]+'</p> </div>  <div class="col"> <button  id="resetEsp" type="button" class="btn btn-danger">RESET</button>  </div> </div>').appendTo("#settingTable");for(var i in $('.switch input[type="checkbox"]').on("change",function(){setting.saveSetting("sw,"+$(this).attr("id"),1==$(this).prop("checked")?1:0)}),$("#updateSetting").html(s.datalayer),s)s.hasOwnProperty(i)&&"in"==(i=i.split(","))[0]&&$('<div class="row mt-4"><div class="col align-self-center"><p>'+i[1]+'</p></div></div><div class="row"><div class="col"><div class="input-group" style="display: block; margin:auto;"><span class="input-group-btn"><button id="'+i[0]+","+i[1]+'" class="btnF btn-primary btn-minuse" type="button">-</button></span><input id="'+i[0]+i[1]+'"type="text" class="add-color text-center height-25" maxlength="3" size="8" value="'+s[i[0]+","+i[1]]+'"><span class="input-group-btn"><button  id="'+i[0]+","+i[1]+'" class="btnF btn-primary btn-plus" type="button">+</button> </span></div></div></div></div><div class="container mt-2"><div class="row"> <button  style="margin:auto" id="'+i[0]+","+i[1]+'" type="button" class="btnF btn-light btn-s saveValue">'+translate("save")+"</button>  </div></div>").appendTo("#settingTable");$('<div id="settingResult" class="container">').appendTo("#settingTable"),setting.evseSetting(s["in,EVSE-NUMBER"],s),setting.checkUpdate(s["txt,ACTUAL SW VERSION"],s["sw,TESTING SOFTWARE"])})},refreshWifiClient(){setTimeout(function(){$(".loader").hide(100)},6e3),$.ajax({url:"/updateWificlient",async:!0,success(s){for(var i in $("#wifiStatus").html(""),$("#ssid").empty(),$("#updateWificlient").html(s.datalayer),s)"connectSSID"==i?"None"==s[i]?($("#wifiStatus").text(translate("wifi5")),$("#wifiStatus").css("color","#FF0000")):($("#wifiStatus").text(translate("wifi3")+s[i]),$("#wifiStatus").css("color","#74DF00")):s.hasOwnProperty(i)&&(e=s[i]<=-100?0:-50<=s[i]?100:2*(s[i]+100),$('<input type="radio" style="text-align:left;" name="ssid" value="'+i+'">'+i+": "+e+"%<br>").appendTo("#ssid"));$("#refreshSSID").find("span").remove(),$(".loader").hide(100)},error(s){$("#wifiStatus").text(translate("wifi7")),$("#wifiStatus").css("color","#FF0000"),$(".loader").hide(100),$("#refreshSSID").find("span").remove()}})},resetCounter(){0!=setting.n&&($("#resetEsp").text("WAITING "+setting.n+"s"),setting.n-=1)},checkUpdate(s,i){var n,a=parseFloat(s.substr(s.length-5,s.length));n="1"==i?"https://api.github.com/repos/lipic/wattmeter_tst/contents/":"https://api.github.com/repos/lipic/wattmeter/contents/",$.ajax({url:n}).done(function(s){for(var i in s)(s[i].name.includes("tst")||s[i].name.includes("rev"))&&(sf=parseFloat(s[i].name.substr(s[i].name.length-5,s[i].name.length)))!=a&&($("#stat").text(translate("update1")+sf),$("#stat").css("color","red"),$("#val").text(translate("update2")),$("#myModal").modal("show"))})},evseSetting(s){for(var i=1;i<=s;i++)$('<div id="evseSett"  class="container-sm pt-2 mt-3 text-center bg border border-secondary"><span class="dim">EVSE setting: '+i+' </span></div><div class="row mt-3"><div class="col align-self-center"><p>CURRENT [A]</p></div></div><div class="row"><div class="col"><div class="input-group" style="display: block; margin:auto;"><span class="input-group-btn"><button id="inp,EVSE'+i+'" class="btnF btn-primary btn-minuse" type="button">-</button></span><input id="inpEVSE'+i+'" type="text" class="add-color text-center height-25" maxlength="2" size="8" value="'+t["inp,EVSE"+i]+'"><span class="input-group-btn"><button  id="inp,EVSE'+i+'" class="btnF btn-primary btn-plus" type="button">+</button> </span></div></div></div><div class="container mt-2"><div class="row"> <button  style="margin:auto" id="inp,EVSE'+i+'" type="button" class="btnF btn-light btn-s saveValue">'+translate("save")+"</button>  </div></div>").appendTo("#evseSetting")},saveSetting(s,i){$("#val").text(""),$("#stat").text(translate("save1")),$("#stat").append('<span class="spinner-border spinner-border-sm"></span>'),$("#stat").css("color","black"),$("#myModal").modal("show"),isNaN(i)?($("#stat").text(translate("NAN")),$("#stat").css("color","red")):$.ajax({type:"POST",url:"/updateSetting",async:!0,data:JSON.stringify({variable:s,value:i}),success:function(n){$("#updateSetting").html(n.datalayer),1==n.process?($("#val").text(s.split(",")[1]+" = "+i),$("#stat").text(translate("save2")),$("#stat").css("color","green")):($("#val").text(s.split(",")[1]+" = "+i),$("#stat").text(translate("save3")),$("#stat").css("color","red"))}})},modbusProccess(s,i,n,a){$("#modbusStatus").text(""),"read"==n?($("#modbusStatus").text(translate("modbus1")+i+" ..."),$("#readReg").append('<span class="spinner-border spinner-border-sm"></span>'),$("#modbusStatus").css("color","#FBD428")):"write"==n&&($("#modbusStatus").text(translate("modbus2")+i+translate("modbus3")+a+" ..."),$("#writeReg").append('<span class="spinner-border spinner-border-sm"></span>'),$("#modbusStatus").css("color","#FBD428")),isNaN(i&&s&&a)?($("#modbusStatus").text(translate("NAN")),$("#modbusStatus").css("color","red"),$("#readReg").find("span").remove(),$("#writeReg").find("span").remove()):$.ajax({type:"POST",url:"/modbusRW",async:!0,data:JSON.stringify({type:n,id:s,reg:i,value:a}),success:function(s){$("#modbusRW").html(s.datalayer),1==s.process?($("#modbusStatus").text(translate("modbus5")),$("#valueM").val(s.value),$("#modbusStatus").css("color","#74DF00"),$("#readReg").find("span").remove(),$("#writeReg").find("span").remove()):($("#modbusStatus").text(translate("modbus6")+s.value),$("#modbusStatus").css("color","red"),$("#readReg").find("span").remove(),$("#writeReg").find("span").remove())},error:function(){$("#modbusStatus").text(translate("modbus7")),$("#modbusStatus").css("color","red"),$("#writeReg").find("span").remove(),$("#readReg").find("span").remove()}})}};$(function(){$(document).on("click","#setSSID",function(){$("#setSSID").append('<span class="spinner-border spinner-border-sm"></span>'),$("#wifiStatus").html("Waiting .... "),$("#wifiStatus").css("color","#FBD428"),password=$("#passwordField").val();var s=$("input[name='ssid']:checked").val();s?$.ajax({type:"POST",url:"/updateWificlient",async:!0,data:JSON.stringify({ssid:s,password:password}),success:function(i){$("#updateWificlient").html(i.datalayer),0==i.process?($("#wifiStatus").html(translate("wifi1")),$("#wifiStatus").css("color","#FF0000")):1==i.process?($("#wifiStatus").html(translate("wifi2")),$("#wifiStatus").css("color","#FF0000")):2==i.process||3==i.process?($("#wifiStatus").html(translate("wifi3")+s),$("#wifiStatus").css("color","#74DF00")):($("#wifiStatus").html(translate("wifi4")+s),$("#wifiStatus").css("color","#FF0000"))}}):($("#wifiStatus").html(translate("wifi1")),$("#wifiStatus").css("color","#FF0000")),$("#setSSID").find("span").remove()}),$(document).on("click","#refreshSSID",function(){$("#wifiStatus").text(translate("wifi6")),$("#refreshSSID").append('<span class="spinner-border spinner-border-sm"></span>'),setting.refreshWifiClient()}),$(document).on("click",".btnF",function(){var s=this.id.replace(",",""),i=$("#"+this.id.replace(",","")).val();hodnota=0,$(this).hasClass("saveValue")&&setting.saveSetting(this.id,i),$(this).hasClass("btn-minuse")&&("inEVSE-NUMBER"==s&&(parseInt(i)-1<0?(hodnota=0,$("#"+s).val(0)):(hodnota=parseInt(i)-1,$("#"+s).val(hodnota)),$("#evseSetting").children().remove(),setting.evseSetting(hodnota)),"inMAX-CURRENT-FROM-GRID-A"==s&&(parseInt(i)-1<0?(hodnota=0,$("#"+s).val(0)):(hodnota=parseInt(i)-1,$("#"+s).val(hodnota))),"inPV-GRID-ASSIST-A"==s&&(parseInt(i)-1<0?(hodnota=0,$("#"+s).val(0)):(hodnota=parseInt(i)-1,$("#"+s).val(hodnota))),"inTIME-ZONE"==s&&(parseInt(i)-1<-24?(hodnota=-24,$("#"+s).val(-24)):(hodnota=parseInt(i)-1,$("#"+s).val(hodnota))),s.includes("inpEVSE")&&(parseInt(i)-1<0?(hodnota=0,$("#"+s).val(0)):(hodnota=parseInt(i)-1,$("#"+s).val(hodnota)))),$(this).hasClass("btn-plus")&&("inEVSE-NUMBER"==s&&(parseInt(i)+1>10?(hodnota=10,$("#"+s).val(10)):(hodnota=parseInt(i)+1,$("#"+s).val(hodnota)),$("#evseSetting").children().remove(),setting.evseSetting(hodnota)),"inMAX-CURRENT-FROM-GRID-A"==s&&(parseInt(i)+1>125?(hodnota=125,$("#"+s).val(125)):(hodnota=parseInt(i)+1,$("#"+s).val(hodnota))),"inPV-GRID-ASSIST-A"==s&&(parseInt(i)+1>125?(hodnota=125,$("#"+s).val(125)):(hodnota=parseInt(i)+1,$("#"+s).val(hodnota))),"inTIME-ZONE"==s&&(parseInt(i)+1>24?(hodnota=24,$("#"+s).val(24)):(hodnota=parseInt(i)+1,$("#"+s).val(hodnota))),s.includes("inpEVSE")&&(parseInt(i)+1>99?(hodnota=99,$("#"+s).val(99)):(hodnota=parseInt(i)+1,$("#"+s).val(hodnota))))}),$(document).on("click","#debug",function(){t+=1,setTimeout(function(){t=0},1e4),t>20&&($(".modal-body").text("Please reset wattmeter to switch testing FW"),$("#myModal").modal("show"),setting.saveSetting("sw,TESTING SOFTWARE",1))}),$(document).on("click","#readReg",function(){setting.modbusProccess($("#id").val(),$("#register").val(),"read",0)}),$(document).on("click","#writeReg",function(){setting.modbusProccess($("#id").val(),$("#register").val(),"write",$("#valueM").val())}),$(document).on("click","#PV0",function(){setting.saveSetting("btn,PHOTOVOLTAIC",0)}),$(document).on("click","#PV1",function(){setting.saveSetting("btn,PHOTOVOLTAIC",1)}),$(document).on("click","#PV2",function(){setting.saveSetting("btn,PHOTOVOLTAIC",2)}),$(document).on("click","#resetEsp",function(s){setting.n=80,setInterval(setting.resetCounter,1e3),setTimeout(function(){location.reload(!0),setting.n=0,$("#resetEsp").text("FINISHING")},7e4),setting.saveSetting("bt,RESET WATTMETER",1)})});