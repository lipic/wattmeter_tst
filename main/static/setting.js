function Setting() {
    ((self = this).refreshSetting = function () {
        var t, e;
        $.ajax({ url: "/updateSetting" }).done(function (n) {
            for (var i in n)
                n.hasOwnProperty(i) &&
                    "txt" == (i = i.split(","))[0] &&
                    $('<div class="row  mt-3" >  <div class="col" >  <p id="' + i[1] + '">' + i[1] + '</p> </div>  <div class="col">  <p> ' + (((n['sw,TESTING SOFTWARE'])=='1')?("tst_"+n[i[0] + "," + i[1]]): ("prd_"+n[i[0] + "," + i[1]])) + "</p> </div> </div>").appendTo("#settingTable");
            for (var i in ($("#updateSetting").html(n.datalayer), n))
                n.hasOwnProperty(i) &&
                    "sw" == (i = i.split(","))[0] &&
                    ($('<div class="row  mt-3">  <div class="col" >  <p>' + i[1] + '</p> </div>  <div class="col">  <input id="' + i[1] + '"  type="checkbox" name="btn-checkbox" data-toggle="witchbutton"> </div> </div>').appendTo(
                        "#settingTable"
                    ),
                    "1" == n[i[0] + "," + i[1]] ? document.getElementById(i[1]).switchButton("on", !0) : document.getElementById(i[1]).switchButton("off", !1));
            for (var i in ($("#updateSetting").html(n.datalayer), n))
                n.hasOwnProperty(i) &&
                    "in" == (i = i.split(","))[0] &&
                    $(
                        '<div class="row  mt-3">  <div class="col" >  <p>' +
                            i[1] +
                            '</p> </div>  <div class="col">  <div class="input-group"><span class="input-group-btn"><button class="btn btn-primary btn-minuse" type="button">-</button></span> <input type="text" class="form-control no-padding add-color text-center height-25" maxlength="2" value="' +
                            n[i[0] + "," + i[1]] +
                            '"><span class="input-group-btn"><button class="btn btn-primary btn-plus" type="button">+</button> </span></div></div> </div>'
                    ).appendTo("#settingTable");
            for (var i in (($input = $('input[type="text"]')),
            $(".btn").on("click", function () {
                ($val = $input.val()),
                    (hodnota = 0),
                    $(this).hasClass("btn-minuse")
                        ? (parseInt($val) - 1 < 0 ? ((hodnota = 0), $input.val(0)) : ((hodnota = parseInt($val) - 1), $input.val(hodnota)), self.saveSetting("in,EVSE-NUMBER", hodnota))
                        : $(this).hasClass("btn-plus") && (parseInt($val) + 1 > 99 ? ((hodnota = 99), $input.val(99)) : ((hodnota = parseInt($val) + 1), $input.val(hodnota)), self.saveSetting("in,EVSE-NUMBER", hodnota));
            }),
            n))
                n.hasOwnProperty(i) &&
                    "sl" == (i = i.split(","))[0] &&
                    (console.log(n[i[0] + "," + i[1]]),
                    $(
                        ' <div class="container text-center mt-3"> <p id="' +
                            i[0] +
                            i[1] +
                            '">' +
                            i[1] +
                            ": " +
                            n[i[0] + "," + i[1]] +
                            ' A</p> </div>  <div class="container text-center">  <input id="' +
                            i[1] +
                            '" data-slider-id="' +
                            i[1] +
                            '" type="text" data-slider-min="' +
                            ("TIME-ZONE" == i[1] ? "-12" : "0") +
                            '" data-slider-max="' +
                            ("TIME-ZONE" == i[1] ? "12" : "80") +
                            '" data-slider-step="1" style="display: none;" data-slider-value="' +
                            n[i[0] + "," + i[1]] +
                            '"/> </div> '
                    ).appendTo("#settingTable"),
                    $("#" + i[1]).slider({
                        formatter: function (n) {
                            (slideStart = !1),
                                (e = $(this).attr("id")),
                                (value = "TIME-ZONE" == e ? "UTC" + (n >= 0 ? "+" + ("0" + n).slice(-2) : "-" + ("0" + n).slice(-2)) : n + " A"),
                                (document.getElementById("sl" + $(this).attr("id")).innerHTML = e + ": " + value),
                                null != t && clearTimeout(t),
                                (t = setInterval(function () {
                                    var i, a;
                                    (i = "sl," + e), (a = n), console.log(i, a), self.saveSetting(i, a), clearTimeout(t);
                                }, 3e3));
                        },
                    }));
            for (var i in n)
                n.hasOwnProperty(i) &&
                    "bt" == (i = i.split(","))[0] &&
                    $(
                        '<div class="row  mt-4 mb-3" >  <div class="col" >  <p id="' + i[1] + '">' + i[1] + '</p> </div>  <div class="col"> <button  id="resetEsp" type="button" class="btn btn-primary ">RESET</button>  </div> </div>'
                    ).appendTo("#settingTable");
            $('.switch input[type="checkbox"]').on("change", function () {
                self.saveSetting("sw," + $(this).attr("id"), 1 == $(this).prop("checked") ? 1 : 0);
            });
            var a = 60;
            $(document).on("click", "#resetEsp", function (t) {
                setInterval(resetCounter, 1e3),
                    setTimeout(function () {
                        location.reload(!0), (a = 0), (document.getElementById("resetEsp").innerText = "FINISHING");
                    }, 60e3),
                    self.saveSetting("bt,RESET WATTMETER", 1);
            }),
                (resetCounter = function () {
                    0 != a && ((document.getElementById("resetEsp").innerText = "WAITING " + a + "s"), (a -= 1));
                });
        });
    }),
        (this.refreshWifiClient = function () {
            $.ajax({ url: "/updateWificlient" }).done(function (t) {
                for (var e in ($("#updateWificlient").html(t.datalayer), t)) {
                    var n;
                    "connectSSID" == e
                        ? "None" == t[e]
                            ? ((document.getElementById("wifiStatus").innerHTML = "Not connected to wifi"), (document.getElementById("wifiStatus").style.color = "#FF0000"))
                            : ((document.getElementById("wifiStatus").innerHTML = "Currently connected to: " + t[e]), (document.getElementById("wifiStatus").style.color = "#74DF00"))
                        : t.hasOwnProperty(e) && ((n = t[e] <= -100 ? 0 : -50 <= t[e] ? 100 : 2 * (t[e] + 100)), $('<input type="radio" style="text-align:left;" name="ssid" value=' + e + ">" + e + ": " + n + "%<br>").appendTo("#ssid"));
                }
                $("#refreshSSID").find("span").remove();
            });
        }),
        (this.saveSetting = function (t, e) {
            console.log("variable", t, "value", e),
                $.ajax({
                    type: "POST",
                    url: "/updateSetting",
                    async: !0,
                    data: JSON.stringify({ variable: t, value: e }),
                    success: function (t) {
                        $("#updateSetting").html(t.datalayer), 1 == t.process ? console.log("save success") : console.log("error during saving");
                    },
                });
        }),
        $(document).on("click", "#setSSID", function () {
            $("#setSSID").append('<span class="spinner-border spinner-border-sm"></span>'),
                ($('#wifiStatus').html("Waiting .... ")),
                ($('#wifiStatus').css("color", "#FBD428")),
                (password = $('passwordField').value);
            var e = $("input[name='ssid']:checked").val();
            e
                ? $.ajax({
                      type: "POST",
                      url: "/updateWificlient",
                      async: !0,
                      data: JSON.stringify({ ssid: e, password: password }),
                      success: function (t) {
                          $("#updateWificlient").html(t.datalayer),
                              0 == t.process
                                  ? (($('#wifiStatus').html("Please choose ssid client first!")), ($('#wifiStatus').css("color","#FF0000")))
                                  : 1 == t.process
                                  ? (($('#wifiStatus').html("Can not connect to Wattmeter SSID")), ($('#wifiStatus').css("color", "#FF0000")))
                                  : 2 == t.process
                                  ? (($('#wifiStatus').html("Currently connected to: " + e)), ($('#wifiStatus').css("color","#74DF00")))
                                  : 3 == t.process
                                  ? (($('#wifiStatus').html("Currently connected to: " + e)), ($('#wifiStatus').css("color", "#74DF00")))
                                  : (($('#wifiStatus').html("Error during connection to: " + e)), ($('#wifiStatus').css("color","#FF0000")));
                      },
                  })
                : (($('#wifiStatus').html("Please choose ssid client first!")), ($('#wifiStatus').css('color',"#FF0000"))),
                $("#setSSID").find("span").remove();
        }),
        $(document).on("click", "#refreshSSID", function () {
            for (; document.getElementById("ssid").firstChild; ) document.getElementById("ssid").removeChild(document.getElementById("ssid").firstChild);
            ($('#wifiStatus').html("")), $("#refreshSSID").append('<span class="spinner-border spinner-border-sm"></span>'), setting.refreshWifiClient();
        });
}
