var setting={t:"undefined",n:0,refreshSetting:()=>{$.ajax({url:"/updateSetting"}).done(function(e){for(var s in t=e,e)e.hasOwnProperty(s)&&"txt"==(s=s.split(","))[0]&&$('<div class="row  mt-3" >  <div class="col" >  <p id="debug">'+s[1]+'</p> </div>  <div class="col">  <p> '+("1"==e["sw,TESTING SOFTWARE"]?"tst_"+e[s[0]+","+s[1]]:e[s[0]+","+s[1]])+"</p> </div> </div>").appendTo("#settingTable");for(var s in $("#updateSetting").html(e.datalayer),e)if(e.hasOwnProperty(s)&&"sw"==(s=s.split(","))[0]){if("TESTING SOFTWARE"==s[1]&&"0"==e[s[0]+","+s[1]])continue;$('<div class="row  mt-4">  <div class="col" >  <p>'+s[1]+'</p> </div>  <div class="col">  <input id="'+s[1]+'"  type="checkbox" name="btn-checkbox" data-toggle="witchbutton"> </div> </div>').appendTo("#settingTable"),"1"==e[s[0]+","+s[1]]?document.getElementById(s[1]).switchButton("on",!0):document.getElementById(s[1]).switchButton("off",!1)}for(var s in e)e.hasOwnProperty(s)&&"btn"==(s=s.split(","))[0]&&$('<div class="row  mt-4 mb-3" >  <div class="col" >  <p id="'+s[1]+'">'+s[1]+'</p> </div><div class="col"><div class="btn-group btn-group-toggle" id="PV" data-toggle="buttons"><label id="PV0" class="btn btn-outline-primary 0"><input type="radio" name="options" checked> Off </label><label id="PV1" class="btn btn-outline-primary 1"><input type="radio" name="options" checked> 1p </label><label id="PV2" class="btn btn-outline-primary 2"><input type="radio" name="options" checked> 3p </label></div></div></div>').appendTo("#settingTable");for(var s in $("#PV"+e["btn,PHOTOVOLTAIC"]).toggleClass("active"),e)e.hasOwnProperty(s)&&"bt"==(s=s.split(","))[0]&&$('<div class="row  mt-4 mb-3" >  <div class="col" >  <p id="'+s[1]+'">'+s[1]+'</p> </div>  <div class="col"> <button  id="resetEsp" type="button" class="btn btn-danger">RESET</button>  </div> </div>').appendTo("#settingTable");for(var s in $('.switch input[type="checkbox"]').on("change",function(){setting.saveSetting("sw,"+$(this).attr("id"),1==$(this).prop("checked")?1:0)}),$("#updateSetting").html(e.datalayer),e)e.hasOwnProperty(s)&&"in"==(s=s.split(","))[0]&&$('<div class="row mt-4"><div class="col align-self-center"><p>'+s[1]+'</p></div></div><div class="row"><div class="col"><div class="input-group" style="display: block; margin:auto;"><span class="input-group-btn"><button id="'+s[0]+","+s[1]+'" class="btnF btn-primary btn-minuse" type="button">-</button></span><input id="'+s[0]+s[1]+'"type="text" class="add-color text-center height-25" maxlength="3" size="8" value="'+e[s[0]+","+s[1]]+'"><span class="input-group-btn"><button  id="'+s[0]+","+s[1]+'" class="btnF btn-primary btn-plus" type="button">+</button> </span></div></div></div></div><div class="container mt-2"><div class="row"> <button  style="margin:auto" id="'+s[0]+","+s[1]+'" type="button" class="btnF btn-light btn-s saveValue">SAVE</button>  </div></div>').appendTo("#settingTable");$('<div id="settingResult" class="container">').appendTo("#settingTable"),setting.evseSetting(e["in,EVSE-NUMBER"],e),setting.checkUpdate(e["txt,ACTUAL SW VERSION"],e["sw,TESTING SOFTWARE"])})},refreshWifiClient:()=>{setTimeout(function(){$(".loader").hide(100)},6e3),$.ajax({url:"/updateWificlient",async:!0,success:t=>{for(var s in $("#wifiStatus").html(""),$("#ssid").empty(),$("#updateWificlient").html(t.datalayer),t)"connectSSID"==s?"None"==t[s]?($("#wifiStatus").text("Not connected to wifi"),$("#wifiStatus").css("color","#FF0000")):($("#wifiStatus").text("Currently connected to: "+t[s]),$("#wifiStatus").css("color","#74DF00")):t.hasOwnProperty(s)&&(e=t[s]<=-100?0:-50<=t[s]?100:2*(t[s]+100),$('<input type="radio" style="text-align:left;" name="ssid" value="'+s+'">'+s+": "+e+"%<br>").appendTo("#ssid"));$("#refreshSSID").find("span").remove(),$(".loader").hide(100)},error:t=>{$("#wifiStatus").text("Error during loading WiFi clients"),$("#wifiStatus").css("color","#FF0000"),$(".loader").hide(100),$("#refreshSSID").find("span").remove()}})},resetCounter:()=>{0!=setting.n&&($("#resetEsp").text("WAITING "+setting.n+"s"),setting.n-=1)},checkUpdate:(t,e)=>{var s,n=parseFloat(t.substr(t.length-5,t.length));s="1"==e?"https://api.github.com/repos/lipic/wattmeter_tst/contents/":"https://api.github.com/repos/lipic/wattmeter/contents/",$.ajax({url:s}).done(function(t){for(var e in t)(t[e].name.includes("tst")||t[e].name.includes("rev"))&&(sf=parseFloat(t[e].name.substr(t[e].name.length-5,t[e].name.length)),sf!=n&&($("#stat").text("New FW version is "+sf),$("#stat").css("color","red"),$("#val").text("Your FW is out of date. Enable automatic update and reset IoTMeter."),$("#myModal").modal("show")))})},evseSetting:e=>{for(var s=1;s<=e;s++)$('<div id="evseSett"  class="container-sm pt-2 mt-3 text-center bg border border-secondary"><span class="dim">EVSE setting: '+s+' </span></div><div class="row mt-3"><div class="col align-self-center"><p>CURRENT [A]</p></div></div><div class="row"><div class="col"><div class="input-group" style="display: block; margin:auto;"><span class="input-group-btn"><button id="inp,EVSE'+s+'" class="btnF btn-primary btn-minuse" type="button">-</button></span><input id="inpEVSE'+s+'" type="text" class="add-color text-center height-25" maxlength="2" size="8" value="'+t["inp,EVSE"+s]+'"><span class="input-group-btn"><button  id="inp,EVSE'+s+'" class="btnF btn-primary btn-plus" type="button">+</button> </span></div></div></div><div class="container mt-2"><div class="row"> <button  style="margin:auto" id="inp,EVSE'+s+'" type="button" class="btnF btn-light btn-s saveValue">SAVE</button>  </div></div>').appendTo("#evseSetting")},saveSetting:(t,e)=>{$("#val").text(""),$("#stat").text("WAITING.. "),$("#stat").append('<span class="spinner-border spinner-border-sm"></span>'),$("#stat").css("color","black"),$("#myModal").modal("show"),isNaN(e)?($("#stat").text("VARIABLE IS NOT NUMBER"),$("#stat").css("color","red")):$.ajax({type:"POST",url:"/updateSetting",async:!0,data:JSON.stringify({variable:t,value:e}),success:function(s){$("#updateSetting").html(s.datalayer),1==s.process?($("#val").text(t.split(",")[1]+" = "+e),$("#stat").text("SAVED SUCCESS!"),$("#stat").css("color","green")):($("#val").text(t.split(",")[1]+" = "+e),$("#stat").text("SAVED UNSUCCESS!"),$("#stat").css("color","red"))}})},modbusProccess:(t,e,s,n)=>{$("#modbusStatus").text(""),"read"==s?($("#modbusStatus").text("Reading register: "+e+" ..."),$("#readReg").append('<span class="spinner-border spinner-border-sm"></span>'),$("#modbusStatus").css("color","#FBD428")):"write"==s&&($("#modbusStatus").text("Writing register: "+e+" with value: "+n+" ..."),$("#writeReg").append('<span class="spinner-border spinner-border-sm"></span>'),$("#modbusStatus").css("color","#FBD428")),isNaN(e&&t&&n)?($("#modbusStatus").text("VARIABLE IS NOT NUMBER"),$("#modbusStatus").css("color","red"),$("#readReg").find("span").remove(),$("#writeReg").find("span").remove()):$.ajax({type:"POST",url:"/modbusRW",async:!0,data:JSON.stringify({type:s,id:t,reg:e,value:n}),success:function(t){$("#modbusRW").html(t.datalayer),1==t.process?($("#modbusStatus").text("Proccess successful"),$("#valueM").val(t.value),$("#modbusStatus").css("color","#74DF00"),$("#readReg").find("span").remove(),$("#writeReg").find("span").remove()):($("#modbusStatus").text("Proccess unsuccessful: "+t.value),$("#modbusStatus").css("color","red"),$("#readReg").find("span").remove(),$("#writeReg").find("span").remove())},error:function(){$("#modbusStatus").text("Response error"),$("#modbusStatus").css("color","red"),$("#writeReg").find("span").remove(),$("#readReg").find("span").remove()}})}};$(function(){$(document).on("click","#setSSID",function(){$("#setSSID").append('<span class="spinner-border spinner-border-sm"></span>'),$("#wifiStatus").html("Waiting .... "),$("#wifiStatus").css("color","#FBD428"),password=$("#passwordField").val();var t=$("input[name='ssid']:checked").val();t?$.ajax({type:"POST",url:"/updateWificlient",async:!0,data:JSON.stringify({ssid:t,password:password}),success:function(e){$("#updateWificlient").html(e.datalayer),0==e.process?($("#wifiStatus").html("Please choose ssid client first!"),$("#wifiStatus").css("color","#FF0000")):1==e.process?($("#wifiStatus").html("Can not connect to Wattmeter SSID"),$("#wifiStatus").css("color","#FF0000")):2==e.process||3==e.process?($("#wifiStatus").html("Currently connected to: "+t),$("#wifiStatus").css("color","#74DF00")):($("#wifiStatus").html("Error during connection to: "+t),$("#wifiStatus").css("color","#FF0000"))}}):($("#wifiStatus").html("Please choose ssid client first!"),$("#wifiStatus").css("color","#FF0000")),$("#setSSID").find("span").remove()}),$(document).on("click","#refreshSSID",function(){$("#wifiStatus").text("Scanning wifi ...."),$("#refreshSSID").append('<span class="spinner-border spinner-border-sm"></span>'),setting.refreshWifiClient()}),$(document).on("click",".btnF",function(){var t=this.id.replace(",",""),e=$("#"+this.id.replace(",","")).val();hodnota=0,$(this).hasClass("saveValue")&&setting.saveSetting(this.id,e),$(this).hasClass("btn-minuse")&&("inEVSE-NUMBER"==t&&(parseInt(e)-1<0?(hodnota=0,$("#"+t).val(0)):(hodnota=parseInt(e)-1,$("#"+t).val(hodnota)),$("#evseSetting").children().remove(),setting.evseSetting(hodnota)),"inMAX-CURRENT-FROM-GRID-A"==t&&(parseInt(e)-1<0?(hodnota=0,$("#"+t).val(0)):(hodnota=parseInt(e)-1,$("#"+t).val(hodnota))),"inPV-GRID-ASSIST-A"==t&&(parseInt(e)-1<0?(hodnota=0,$("#"+t).val(0)):(hodnota=parseInt(e)-1,$("#"+t).val(hodnota))),"inTIME-ZONE"==t&&(parseInt(e)-1<-24?(hodnota=-24,$("#"+t).val(-24)):(hodnota=parseInt(e)-1,$("#"+t).val(hodnota))),t.includes("inpEVSE")&&(parseInt(e)-1<0?(hodnota=0,$("#"+t).val(0)):(hodnota=parseInt(e)-1,$("#"+t).val(hodnota)))),$(this).hasClass("btn-plus")&&("inEVSE-NUMBER"==t&&(parseInt(e)+1>10?(hodnota=10,$("#"+t).val(10)):(hodnota=parseInt(e)+1,$("#"+t).val(hodnota)),$("#evseSetting").children().remove(),setting.evseSetting(hodnota)),"inMAX-CURRENT-FROM-GRID-A"==t&&(parseInt(e)+1>125?(hodnota=125,$("#"+t).val(125)):(hodnota=parseInt(e)+1,$("#"+t).val(hodnota))),"inPV-GRID-ASSIST-A"==t&&(parseInt(e)+1>125?(hodnota=125,$("#"+t).val(125)):(hodnota=parseInt(e)+1,$("#"+t).val(hodnota))),"inTIME-ZONE"==t&&(parseInt(e)+1>24?(hodnota=24,$("#"+t).val(24)):(hodnota=parseInt(e)+1,$("#"+t).val(hodnota))),t.includes("inpEVSE")&&(parseInt(e)+1>99?(hodnota=99,$("#"+t).val(99)):(hodnota=parseInt(e)+1,$("#"+t).val(hodnota))))}),$(document).on("click","#debug",function(){t+=1,setTimeout(function(){t=0},1e4),t>20&&($(".modal-body").text("Please reset wattmeter to switch testing FW"),$("#myModal").modal("show"),setting.saveSetting("sw,TESTING SOFTWARE",1))}),$(document).on("click","#readReg",function(){setting.modbusProccess($("#id").val(),$("#register").val(),"read",0)}),$(document).on("click","#writeReg",function(){setting.modbusProccess($("#id").val(),$("#register").val(),"write",$("#valueM").val())}),$(document).on("click","#PV0",function(){setting.saveSetting("btn,PHOTOVOLTAIC",0)}),$(document).on("click","#PV1",function(){setting.saveSetting("btn,PHOTOVOLTAIC",1)}),$(document).on("click","#PV2",function(){setting.saveSetting("btn,PHOTOVOLTAIC",2)}),$(document).on("click","#resetEsp",function(t){setting.n=70,setInterval(setting.resetCounter,1e3),setTimeout(function(){location.reload(!0),setting.n=0,$("#resetEsp").text("FINISHING")},7e4),setting.saveSetting("bt,RESET WATTMETER",1)})});