function Setting(){var t="undefined";(self=this).refreshSetting=function(){$.ajax({url:"/updateSetting"}).done((function(s){for(var n in t=s,s)s.hasOwnProperty(n)&&"txt"==(n=n.split(","))[0]&&$('<div class="row  mt-3" >  <div class="col" >  <p id="'+n[1]+'">'+n[1]+'</p> </div>  <div class="col">  <p> '+("1"==s["sw,TESTING SOFTWARE"]?"tst_"+s[n[0]+","+n[1]]:"prd_"+s[n[0]+","+n[1]])+"</p> </div> </div>").appendTo("#settingTable");for(var n in $("#updateSetting").html(s.datalayer),s)s.hasOwnProperty(n)&&"sw"==(n=n.split(","))[0]&&($('<div class="row  mt-3">  <div class="col" >  <p>'+n[1]+'</p> </div>  <div class="col">  <input id="'+n[1]+'"  type="checkbox" name="btn-checkbox" data-toggle="witchbutton"> </div> </div>').appendTo("#settingTable"),"1"==s[n[0]+","+n[1]]?document.getElementById(n[1]).switchButton("on",!0):document.getElementById(n[1]).switchButton("off",!1));for(var n in $("#updateSetting").html(s.datalayer),s)s.hasOwnProperty(n)&&"in"==(n=n.split(","))[0]&&$('<div class="row mt-3"><div class="col"><p>'+n[1]+'</p></div><div class="col"><div class="input-group"><span class="input-group-btn"><button id="'+n[0]+","+n[1]+'" class="btnF btn-primary btn-minuse" type="button">-</button></span><input id="'+n[0]+n[1]+'"type="text" class="form-control no-padding add-color text-center height-25" maxlength="2" value="'+s[n[0]+","+n[1]]+'"><span class="input-group-btn"><button  id="'+n[0]+","+n[1]+'" class="btnF btn-primary btn-plus" type="button">+</button> </span></div></div></div><div class="container mt-2"><div class="row"> <button  style="margin:auto" id="'+n[0]+","+n[1]+'" type="button" class="btnF btn-light btn-xs saveValue">SAVE</button>  </div></div>').appendTo("#settingTable");for(var n in s)s.hasOwnProperty(n)&&"bt"==(n=n.split(","))[0]&&$('<div class="row  mt-4 mb-3" >  <div class="col" >  <p id="'+n[1]+'">'+n[1]+'</p> </div>  <div class="col"> <button  id="resetEsp" type="button" class="btn btn-primary ">RESET</button>  </div> </div>').appendTo("#settingTable");$('.switch input[type="checkbox"]').on("change",(function(){self.saveSetting("sw,"+$(this).attr("id"),1==$(this).prop("checked")?1:0)}));var e=60;$(document).on("click","#resetEsp",(function(t){setInterval(resetCounter,1e3),setTimeout((function(){location.reload(!0),e=0,$("#resetEsp").text("FINISHING")}),6e4),self.saveSetting("bt,RESET WATTMETER",1)})),resetCounter=function(){0!=e&&($("#resetEsp").text("WAITING "+e+"s"),e-=1)},$('<div id="settingResult" class="container">').appendTo("#settingTable"),self.evseSetting(s["in,EVSE-NUMBER"],s)}))},this.refreshWifiClient=function(){$.ajax({url:"/updateWificlient"}).done((function(t){for(var s in $("#updateWificlient").html(t.datalayer),t){var n;"connectSSID"==s?"None"==t[s]?($("#wifiStatus").text("Not connected to wifi"),$("#wifiStatus").css("color","#FF0000")):($("#wifiStatus").text("Currently connected to: "+t[s]),$("#wifiStatus").css("color","#74DF00")):t.hasOwnProperty(s)&&(n=t[s]<=-100?0:-50<=t[s]?100:2*(t[s]+100),$('<input class="essidRadio" type="radio" style="text-align:left;" name="ssid" value='+s+">"+s+": "+n+"%<br>").appendTo("#ssid"))}$("#refreshSSID").find("span").remove()}))},this.evseSetting=function(s){for(var n=1;n<=s;n++)$('<div id="evseSett"  class="container-fluid pt-2 mt-3 text-center"><span class="dim">EVSE setting: '+n+' </span><div class="row mt-3"><div class="col"><p>CURRENT</p></div><div class="col"><div class="input-group"><span class="input-group-btn"><button id="inp,EVSE'+n+'" class="btnF btn-primary btn-minuse" type="button">-</button></span><input id="inpEVSE'+n+'" type="text" class="form-control no-padding add-color text-center height-25" maxlength="2" value="'+t["inp,EVSE"+n]+'"><span class="input-group-btn"><button  id="inp,EVSE'+n+'" class="btnF btn-primary btn-plus" type="button">+</button> </span></div></div> </div></div><div class="container mt-2"><div class="row"> <button  style="margin:auto" id="inp,EVSE'+n+'" type="button" class="btnF btn-light btn-xs saveValue">SAVE</button>  </div></div>').appendTo("#evseSetting")},this.saveSetting=function(t,s){$('<div id="saving"><div class="spinner-border" role="status"></div><span> Saving...</span></div>').appendTo("#settingResult"),isNaN(s)?$('<div class="alert alert-success"><strong>Error:</strong> variable is not number</div>').appendTo("#settingResult"):$.ajax({type:"POST",url:"/updateSetting",async:!0,data:JSON.stringify({variable:t,value:s}),success:function(n){$("#updateSetting").html(n.datalayer),$("#saving").remove(),1==n.process?$('<div class="alert alert-success" id="alert_template"><strong>'+t.split(",")[1]+" = "+s+'</strong><br>saved successfully<button type="button" class="close">×</button></div>').appendTo("#settingResult"):$('<div class="alert alert-danger" id="alert_template"><strong>'+t.split(",")[1]+" = "+s+'</strong> <br>saved unsuccessfully<button type="button" class="close">×</button> </div>').appendTo("#settingResult")}})}}$(document).on("click","#alert_template .close",(function(){$("#alert_template").remove()})),$(document).on("click","#setSSID",(function(){$("#setSSID").append('<span class="spinner-border spinner-border-sm"></span>'),$("#wifiStatus").html("Waiting .... "),$("#wifiStatus").css("color","#FBD428"),password=$("#passwordField").val();var t=$("input[name='ssid']:checked").val();t?$.ajax({type:"POST",url:"/updateWificlient",async:!0,data:JSON.stringify({ssid:t,password:password}),success:function(s){$("#updateWificlient").html(s.datalayer),0==s.process?($("#wifiStatus").html("Please choose ssid client first!"),$("#wifiStatus").css("color","#FF0000")):1==s.process?($("#wifiStatus").html("Can not connect to Wattmeter SSID"),$("#wifiStatus").css("color","#FF0000")):2==s.process||3==s.process?($("#wifiStatus").html("Currently connected to: "+t),$("#wifiStatus").css("color","#74DF00")):($("#wifiStatus").html("Error during connection to: "+t),$("#wifiStatus").css("color","#FF0000"))}}):($("#wifiStatus").html("Please choose ssid client first!"),$("#wifiStatus").css("color","#FF0000")),$("#setSSID").find("span").remove()})),$(document).on("click","#refreshSSID",(function(){$("#ssid").empty(),$("#wifiStatus").text(""),$("#refreshSSID").append('<span class="spinner-border spinner-border-sm"></span>'),self.refreshWifiClient()})),$(document).on("click",".btnF",(function(){var t=this.id.replace(",",""),s=$("#"+this.id.replace(",","")).val();hodnota=0,$(this).hasClass("saveValue")&&self.saveSetting(this.id,s),$(this).hasClass("btn-minuse")&&("inEVSE-NUMBER"==t&&(parseInt(s)-1<0?(hodnota=0,$("#"+t).val(0)):(hodnota=parseInt(s)-1,$("#"+t).val(hodnota)),$("#evseSetting").children().remove(),self.evseSetting(hodnota)),"inBREAKER"==t&&(parseInt(s)-1<0?(hodnota=0,$("#"+t).val(0)):(hodnota=parseInt(s)-1,$("#"+t).val(hodnota))),"inTIME-ZONE"==t&&(parseInt(s)-1<-24?(hodnota=-24,$("#"+t).val(-24)):(hodnota=parseInt(s)-1,$("#"+t).val(hodnota))),t.includes("inpEVSE")&&(parseInt(s)-1<0?(hodnota=0,$("#"+t).val(0)):(hodnota=parseInt(s)-1,$("#"+t).val(hodnota)))),$(this).hasClass("btn-plus")&&("inEVSE-NUMBER"==t&&(parseInt(s)+1>10?(hodnota=10,$("#"+t).val(10)):(hodnota=parseInt(s)+1,$("#"+t).val(hodnota)),$("#evseSetting").children().remove(),self.evseSetting(hodnota)),"inBREAKER"==t&&(parseInt(s)+1>99?(hodnota=99,$("#"+t).val(99)):(hodnota=parseInt(s)+1,$("#"+t).val(hodnota))),"inTIME-ZONE"==t&&(parseInt(s)+1>24?(hodnota=24,$("#"+t).val(24)):(hodnota=parseInt(s)+1,$("#"+t).val(hodnota))),t.includes("inpEVSE")&&(parseInt(s)+1>99?(hodnota=99,$("#"+t).val(99)):(hodnota=parseInt(s)+1,$("#"+t).val(hodnota))))}));