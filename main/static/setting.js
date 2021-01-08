function Setting() {
    var t = "undefined";
    ((self = this).refreshSetting = function () {
        $.ajax({ url: "/updateSetting" }).done(function (s) {
            for (var e in ((t = s), s))
                s.hasOwnProperty(e) &&
                    "txt" == (e = e.split(","))[0] &&
                    $(
                        '<div class="row  mt-3" >  <div class="col" >  <p id="debug">' +
                            e[1] +
                            '</p> </div>  <div class="col">  <p> ' +
                            ("1" == s["sw,TESTING SOFTWARE"] ? "tst_" + s[e[0] + "," + e[1]] : s[e[0] + "," + e[1]]) +
                            "</p> </div> </div>"
                    ).appendTo("#settingTable");
            for (var e in ($("#updateSetting").html(s.datalayer), s))
                if (s.hasOwnProperty(e) && "sw" == (e = e.split(","))[0]) {
                    if ("TESTING SOFTWARE" == e[1] && "0" == s[e[0] + "," + e[1]]) continue;
                    $('<div class="row  mt-4">  <div class="col" >  <p>' + e[1] + '</p> </div>  <div class="col">  <input id="' + e[1] + '"  type="checkbox" name="btn-checkbox" data-toggle="witchbutton"> </div> </div>').appendTo(
                        "#settingTable"
                    ),
                        "1" == s[e[0] + "," + e[1]] ? document.getElementById(e[1]).switchButton("on", !0) : document.getElementById(e[1]).switchButton("off", !1);
                }
            for (var e in s)
                s.hasOwnProperty(e) &&
                    "bt" == (e = e.split(","))[0] &&
                    $('<div class="row  mt-4 mb-3" >  <div class="col" >  <p id="' + e[1] + '">' + e[1] + '</p> </div>  <div class="col"> <button  id="resetEsp" type="button" class="btn btn-danger">RESET</button>  </div> </div>').appendTo(
                        "#settingTable"
                    );
            for (var e in ($('.switch input[type="checkbox"]').on("change", function () {
                self.saveSetting("sw," + $(this).attr("id"), 1 == $(this).prop("checked") ? 1 : 0);
            }),
            $("#updateSetting").html(s.datalayer),
            s))
                s.hasOwnProperty(e) &&
                    "in" == (e = e.split(","))[0] &&
                    $(
                        '<div class="row mt-4"><div class="col align-self-center"><p>' +
                            e[1] +
                            '</p></div></div><div class="row"><div class="col"><div class="input-group" style="display: block; margin:auto;"><span class="input-group-btn"><button id="' +
                            e[0] +
                            "," +
                            e[1] +
                            '" class="btnF btn-primary btn-minuse" type="button">-</button></span><input id="' +
                            e[0] +
                            e[1] +
                            '"type="text" class="add-color text-center height-25" maxlength="2" size="8" value="' +
                            s[e[0] + "," + e[1]] +
                            '"><span class="input-group-btn"><button  id="' +
                            e[0] +
                            "," +
                            e[1] +
                            '" class="btnF btn-primary btn-plus" type="button">+</button> </span></div></div></div></div><div class="container mt-2"><div class="row"> <button  style="margin:auto" id="' +
                            e[0] +
                            "," +
                            e[1] +
                            '" type="button" class="btnF btn-light btn-s saveValue">SAVE</button>  </div></div>'
                    ).appendTo("#settingTable");
            var n = 60;
            $(document).on("click", "#resetEsp", function (t) {
                setInterval(resetCounter, 1e3),
                    setTimeout(function () {
                        location.reload(!0), (n = 0), $("#resetEsp").text("FINISHING");
                    }, 6e4),
                    self.saveSetting("bt,RESET WATTMETER", 1);
            }),
                (resetCounter = function () {
                    0 != n && ($("#resetEsp").text("WAITING " + n + "s"), (n -= 1));
                }),
                $('<div id="settingResult" class="container">').appendTo("#settingTable"),
                self.evseSetting(s["in,EVSE-NUMBER"], s),
                self.checkUpdate(s["txt,ACTUAL SW VERSION"], s["sw,TESTING SOFTWARE"]);
        });
    }),
        (this.refreshWifiClient = function () {
            $.ajax({ url: "/updateWificlient" }).done(function (t) {
                for (var s in ($("#wifiStatus").html(""), $("#ssid").empty(), $("#updateWificlient").html(t.datalayer), t)) {
                    var e;
                    "connectSSID" == s
                        ? "None" == t[s]
                            ? ($("#wifiStatus").text("Not connected to wifi"), $("#wifiStatus").css("color", "#FF0000"))
                            : ($("#wifiStatus").text("Currently connected to: " + t[s]), $("#wifiStatus").css("color", "#74DF00"))
                        : t.hasOwnProperty(s) &&
                          ((e = t[s] <= -100 ? 0 : -50 <= t[s] ? 100 : 2 * (t[s] + 100)), $('<input class="essidRadio" type="radio" style="text-align:left;" name="ssid" value=' + s + ">" + s + ": " + e + "%<br>").appendTo("#ssid"));
                }
                $("#refreshSSID").find("span").remove();
            });
        }),
        (this.checkUpdate = function (t, s) {
            var e = parseFloat(t.substr(t.length - 5, t.length)),
                n = "";
            (n = "1" == s ? "https://api.github.com/repos/lipic/wattmeter_tst/contents/" : "https://api.github.com/repos/lipic/wattmeter/contents/"),
                $.ajax({ url: n }).done(function (t) {
                    for (var s in t)
                        (t[s].name.includes("tst") || t[s].name.includes("rev")) &&
                            ((sf = parseFloat(t[s].name.substr(t[s].name.length - 5, t[s].name.length))),
                            sf != e && ($("#stat").text("New FW version is " + sf), $("#stat").css("color", "red"), $("#val").text("Your FW is out of date. Enable automatic update and reset IoTMeter."), $("#myModal").modal("show")));
                });
        }),
        (this.evseSetting = function (s) {
            for (var e = 1; e <= s; e++)
                $(
                    '<div id="evseSett"  class="container-sm pt-2 mt-3 text-center bg border border-secondary"><span class="dim">EVSE setting: ' +
                        e +
                        ' </span></div><div class="row mt-3"><div class="col align-self-center"><p>CURRENT</p></div></div><div class="row"><div class="col"><div class="input-group" style="display: block; margin:auto;"><span class="input-group-btn"><button id="inp,EVSE' +
                        e +
                        '" class="btnF btn-primary btn-minuse" type="button">-</button></span><input id="inpEVSE' +
                        e +
                        '" type="text" class="add-color text-center height-25" maxlength="2" size="8" value="' +
                        t["inp,EVSE" + e] +
                        '"><span class="input-group-btn"><button  id="inp,EVSE' +
                        e +
                        '" class="btnF btn-primary btn-plus" type="button">+</button> </span></div></div></div><div class="container mt-2"><div class="row"> <button  style="margin:auto" id="inp,EVSE' +
                        e +
                        '" type="button" class="btnF btn-light btn-s saveValue">SAVE</button>  </div></div>'
                ).appendTo("#evseSetting");
        }),
        (this.saveSetting = function (t, s) {
            $("#val").text(""),
                $("#stat").text("WAITING.. "),
                $("#stat").append('<span class="spinner-border spinner-border-sm"></span>'),
                $("#stat").css("color", "black"),
                $("#myModal").modal("show"),
                isNaN(s)
                    ? ($("#stat").text("VARIABLE IS NOT NUMBER"), $("#stat").css("color", "red"))
                    : $.ajax({
                          type: "POST",
                          url: "/updateSetting",
                          async: !0,
                          data: JSON.stringify({ variable: t, value: s }),
                          success: function (e) {
                              $("#updateSetting").html(e.datalayer),
                                  1 == e.process
                                      ? ($("#val").text(t.split(",")[1] + " = " + s), $("#stat").text("SAVED SUCCESS!"), $("#stat").css("color", "green"))
                                      : ($("#val").text(t.split(",")[1] + " = " + s), $("#stat").text("SAVED UNSUCCESS!"), $("#stat").css("color", "red"));
                          },
                      });
        }),



        (this.modbusProccess = function (i,r,t,v) {
            $("#modbusStatus").text("")
            if(t=="read"){
                $("#modbusStatus").text("Reading register: "+r+" ..."), 
                $("#readReg").append('<span class="spinner-border spinner-border-sm"></span>');
                $("#modbusStatus").css("color", "#FBD428");
            }else if(t=="write"){
                $("#modbusStatus").text("Writing register: "+r+" with value: "+v+" ..."), 
                $("#writeReg").append('<span class="spinner-border spinner-border-sm"></span>');
                $("#modbusStatus").css("color", "#FBD428");
            }
            isNaN(r && i && v)
            ? ($("#modbusStatus").text("VARIABLE IS NOT NUMBER"), $("#modbusStatus").css("color", "red"),($("#readReg").find("span").remove()),($("#writeReg").find("span").remove()))
                    : $.ajax({
                          type: "POST",
                          url: "/modbusRW",
                          async: !0,
                          data: JSON.stringify({type:t, id: i, reg: r,value: v}),
                          success: function (e) {
                              $("#modbusRW").html(e.datalayer),
                                  1 == e.process
                                      ? ($("#modbusStatus").text("Proccess successful"),$("#value").val(e.value), $("#modbusStatus").css("color", "green"))
                                      : ($("#modbusStatus").text("Proccess unsuccessful: "+e.value),$("#modbusStatus").css("color", "red"));
                                      ($("#readReg").find("span").remove()),
                                      ($("#writeReg").find("span").remove());
                          },
                      });
        });


}
$(function () {
    var t = 0;
    $(document).on("click", "#setSSID", function () {
        $("#setSSID").append('<span class="spinner-border spinner-border-sm"></span>'), $("#wifiStatus").html("Waiting .... "), $("#wifiStatus").css("color", "#FBD428"), (password = $("#passwordField").val());
        var t = $("input[name='ssid']:checked").val();
        t
            ? $.ajax({
                  type: "POST",
                  url: "/updateWificlient",
                  async: !0,
                  data: JSON.stringify({ ssid: t, password: password }),
                  success: function (s) {
                      $("#updateWificlient").html(s.datalayer),
                          0 == s.process
                              ? ($("#wifiStatus").html("Please choose ssid client first!"), $("#wifiStatus").css("color", "#FF0000"))
                              : 1 == s.process
                              ? ($("#wifiStatus").html("Can not connect to Wattmeter SSID"), $("#wifiStatus").css("color", "#FF0000"))
                              : 2 == s.process || 3 == s.process
                              ? ($("#wifiStatus").html("Currently connected to: " + t), $("#wifiStatus").css("color", "#74DF00"))
                              : ($("#wifiStatus").html("Error during connection to: " + t), $("#wifiStatus").css("color", "#FF0000"));
                  },
              })
            : ($("#wifiStatus").html("Please choose ssid client first!"), $("#wifiStatus").css("color", "#FF0000")),
            $("#setSSID").find("span").remove();
    }),
        $(document).on("click", "#refreshSSID", function () {
            $("#wifiStatus").text("Scanning wifi ...."), $("#refreshSSID").append('<span class="spinner-border spinner-border-sm"></span>'), self.refreshWifiClient();
        }),
        $(document).on("click", ".btnF", function () {
            var t = this.id.replace(",", ""),
                s = $("#" + this.id.replace(",", "")).val();
            (hodnota = 0),
                $(this).hasClass("saveValue") && self.saveSetting(this.id, s),
                $(this).hasClass("btn-minuse") &&
                    ("inEVSE-NUMBER" == t && (parseInt(s) - 1 < 0 ? ((hodnota = 0), $("#" + t).val(0)) : ((hodnota = parseInt(s) - 1), $("#" + t).val(hodnota)), $("#evseSetting").children().remove(), self.evseSetting(hodnota)),
                    "inBREAKER" == t && (parseInt(s) - 1 < 0 ? ((hodnota = 0), $("#" + t).val(0)) : ((hodnota = parseInt(s) - 1), $("#" + t).val(hodnota))),
                    "inTIME-ZONE" == t && (parseInt(s) - 1 < -24 ? ((hodnota = -24), $("#" + t).val(-24)) : ((hodnota = parseInt(s) - 1), $("#" + t).val(hodnota))),
                    t.includes("inpEVSE") && (parseInt(s) - 1 < 0 ? ((hodnota = 0), $("#" + t).val(0)) : ((hodnota = parseInt(s) - 1), $("#" + t).val(hodnota)))),
                $(this).hasClass("btn-plus") &&
                    ("inEVSE-NUMBER" == t && (parseInt(s) + 1 > 10 ? ((hodnota = 10), $("#" + t).val(10)) : ((hodnota = parseInt(s) + 1), $("#" + t).val(hodnota)), $("#evseSetting").children().remove(), self.evseSetting(hodnota)),
                    "inBREAKER" == t && (parseInt(s) + 1 > 99 ? ((hodnota = 99), $("#" + t).val(99)) : ((hodnota = parseInt(s) + 1), $("#" + t).val(hodnota))),
                    "inTIME-ZONE" == t && (parseInt(s) + 1 > 24 ? ((hodnota = 24), $("#" + t).val(24)) : ((hodnota = parseInt(s) + 1), $("#" + t).val(hodnota))),
                    t.includes("inpEVSE") && (parseInt(s) + 1 > 99 ? ((hodnota = 99), $("#" + t).val(99)) : ((hodnota = parseInt(s) + 1), $("#" + t).val(hodnota))));
        }),
        $(document).on("click", "#debug", function () {
            (t += 1),
                setTimeout(function () {
                    t = 0;
                }, 1e4),
                t > 20 && ($(".modal-body").text("Please reset wattmeter to switch testing FW"), $("#myModal").modal("show"), self.saveSetting("sw,TESTING SOFTWARE", 1));
        }),
        $(document).on("click", "#readReg", function () {
            self.modbusProccess($("#id").val(),$("#register").val(),"read",0)    
        }),
        $(document).on("click", "#writeReg", function () {
           self.modbusProccess($("#id").val(),$("#register").val(),"write",$("#valueM").val())
        });
});
