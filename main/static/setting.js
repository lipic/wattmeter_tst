function Setting() {
    ((self = this).refreshSetting = function() {
        var t, e;
        $.ajax({ url: "/updateSetting" }).done(function(n) {
            for (var i in n)
                n.hasOwnProperty(i) &&
                "txt" == (i = i.split(","))[0] &&
                $('<div class="row  mt-3" >  <div class="col" >  <p id="' + i[1] + '">' + i[1] + '</p> </div>  <div class="col">  <p> ' + (((n['sw,TESTING SOFTWARE']) == '1') ? ("tst_" + n[i[0] + "," + i[1]]) : ("prd_" + n[i[0] + "," + i[1]])) + "</p> </div> </div>").appendTo("#settingTable");

            for (var i in ($("#updateSetting").html(n.datalayer), n))
                n.hasOwnProperty(i) &&
                "sw" == (i = i.split(","))[0] &&
                ($('<div class="row  mt-3">  <div class="col" >  <p>' + i[1] + '</p> </div>  <div class="col">  <input id="' + i[1] + '"  type="checkbox" name="btn-checkbox" data-toggle="witchbutton"> </div> </div>').appendTo(
                        "#settingTable"
                    ),
                    "1" == n[i[0] + "," + i[1]] ? document.getElementById(i[1]).switchButton("on", !0) : document.getElementById(i[1]).switchButton("off", !1));

            ///////////////////////////////////////////////////////
            for (var i in ($("#updateSetting").html(n.datalayer), n))
                n.hasOwnProperty(i) &&
                "in" == (i = i.split(","))[0] &&
                $(
                    '<div class="row mt-3">' +
                    '<div class="col"><p>' + i[1] + '</p></div>' +
                    '<div class="col"><div class="input-group">' +
                    '<span class="input-group-btn"><button id="' + i[0] + "," + i[1] + '" class="btn btn-primary btn-minuse" type="button">-</button></span>' +
                    '<input id="' + i[0] + i[1] + '"type="text" class="form-control no-padding add-color text-center height-25" maxlength="2" value="' + n[i[0] + "," + i[1]] + '">' +
                    '<span class="input-group-btn"><button  id="' + i[0] + "," + i[1] + '" class="btn btn-primary btn-plus" type="button">+</button> </span></div></div> </div>'
                ).appendTo("#settingTable");

            $(".btn").on("click", function() {
                var ID = (this.id.replace(',', ''));
                var val = $('#' + this.id.replace(',', '')).val();
                console.log(ID);
                (hodnota = 0);
                if ($(this).hasClass("btn-minuse")) {
                    if (ID == "inEVSE-NUMBER") {
                        (parseInt(val) - 1 < 0 ? ((hodnota = 0), $('#' + ID).val(0)) : ((hodnota = parseInt(val) - 1), $('#' + ID).val(hodnota)), self.saveSetting(this.id, hodnota), ($("#evseSetting").children().remove()), (self.evseSetting(hodnota, n)))
                    }
                    if (ID == "inBREAKER") {
                        (parseInt(val) - 1 < 0 ? ((hodnota = 0), $('#' + ID).val(0)) : ((hodnota = parseInt(val) - 1), $('#' + ID).val(hodnota)), self.saveSetting(this.id, hodnota))
                    }
                    if (ID == "inTIME-ZONE") {
                        (parseInt(val) - 1 < -24 ? ((hodnota = -24), $('#' + ID).val(-24)) : ((hodnota = parseInt(val) - 1), $('#' + ID).val(hodnota)), self.saveSetting(this.id, hodnota))
                    }
                    if (ID.includes("inpEVSE")) {
                        (parseInt(val) - 1 < 0 ? ((hodnota = 0), $('#' + ID).val(0)) : ((hodnota = parseInt(val) - 1), $('#' + ID).val(hodnota)), self.saveSetting(this.id, hodnota))
                    }
                }
                if ($(this).hasClass("btn-plus")) {
                    if (ID == "inEVSE-NUMBER") {
                        (parseInt(val) + 1 > 10 ? ((hodnota = 10), $('#' + ID).val(10)) : ((hodnota = parseInt(val) + 1), $('#' + ID).val(hodnota)), self.saveSetting("in,EVSE-NUMBER", hodnota), ($("#evseSetting").children().remove()), (self.evseSetting(hodnota, n)));
                    }
                    if (ID == "inBREAKER") {
                        (parseInt(val) + 1 > 99 ? ((hodnota = 99), $('#' + ID).val(99)) : ((hodnota = parseInt(val) + 1), $('#' + ID).val(hodnota)), self.saveSetting("in,BREAKER", hodnota));
                    }
                    if (ID == "inTIME-ZONE") {
                        (parseInt(val) + 1 > 24 ? ((hodnota = 24), $('#' + ID).val(24)) : ((hodnota = parseInt(val) + 1), $('#' + ID).val(hodnota)), self.saveSetting("in,TIME-ZONE", hodnota));
                    }
                    if (ID.includes("inpEVSE")) {
                        (parseInt(val) + 1 > 10 ? ((hodnota = 10), $('#' + ID).val(10)) : ((hodnota = parseInt(val) + 1), $('#' + ID).val(hodnota)), self.saveSetting(this.id, hodnota))
                    }
                }
            });
            for (var i in n)
                n.hasOwnProperty(i) &&
                "bt" == (i = i.split(","))[0] &&
                $('<div class="row  mt-4 mb-3" >  <div class="col" >  <p id="' + i[1] + '">' + i[1] + '</p> </div>  <div class="col"> <button  id="resetEsp" type="button" class="btn btn-primary ">RESET</button>  </div> </div>').appendTo("#settingTable");
            $('.switch input[type="checkbox"]').on("change", function() {
                self.saveSetting("sw," + $(this).attr("id"), 1 == $(this).prop("checked") ? 1 : 0);
            });

            var a = 60;
            $(document).on("click", "#resetEsp", function(t) {
                    setInterval(resetCounter, 1e3),
                        setTimeout(function() {
                            location.reload(!0), (a = 0), ($('#resetEsp').text("FINISHING"));
                        }, 60e3),
                        self.saveSetting("bt,RESET WATTMETER", 1);
                }),
                (resetCounter = function() {
                    0 != a && (($('#resetEsp').text("WAITING " + a + "s")), (a -= 1));
                });

            self.evseSetting(n['in,EVSE-NUMBER'], n)
        });
    }),
    (this.refreshWifiClient = function() {
        $.ajax({ url: "/updateWificlient" }).done(function(t) {
            for (var e in ($("#updateWificlient").html(t.datalayer), t)) {
                var n;
                "connectSSID" == e
                    ?
                    "None" == t[e] ?
                    (($('#wifiStatus').text("Not connected to wifi")), ($('#wifiStatus').css('color', "#FF0000"))) :
                    (($('#wifiStatus').text("Currently connected to: " + t[e])), ($('#wifiStatus').css("color", "#74DF00"))) :
                    t.hasOwnProperty(e) && ((n = t[e] <= -100 ? 0 : -50 <= t[e] ? 100 : 2 * (t[e] + 100)), $('<input class="essidRadio" type="radio" style="text-align:left;" name="ssid" value=' + e + ">" + e + ": " + n + "%<br>").appendTo("#ssid"));
            }
            $("#refreshSSID").find("span").remove();
        });
    }),
    //##SETTING FOR EVESE
    (this.evseSetting = function(numEvse, n) {
        console.log("Tisknu n: ", n)
        for (var i = 1; i <= numEvse; i++) {
            $('<div id="evseSett"  class="container-fluid pt-2 mt-3 text-center">' +
                ' <span class="dim">EVSE setting: ' + i + ' </span>' +

                '<div class="row mt-3">' +
                '<div class="col"><p> EVSE CURRENT [A]</p></div>' +
                '<div class="col"><div class="input-group">' +
                '<span class="input-group-btn"><button id="inp,EVSE' + i + '" class="btn btn-primary btn-minuse" type="button">-</button></span>' +
                '<input id="inpEVSE' + i + '" type="text" class="form-control no-padding add-color text-center height-25" maxlength="2" value="' + n["inp,EVSE" + i] + '">' +
                '<span class="input-group-btn"><button  id="inp,EVSE' + i + '" class="btn btn-primary btn-plus" type="button">+</button> </span></div></div> </div>' +
                '</div>'
            ).appendTo("#evseSetting");
        }
        $(".btn").on("click", function() {
            var ID = (this.id.replace(',', ''));
            var val = $('#' + this.id.replace(',', '')).val();
            console.log(ID);
            (hodnota = 0);
            if ($(this).hasClass("btn-minuse")) {
                if (ID.includes("inpEVSE")) {
                    (parseInt(val) - 1 < 0 ? ((hodnota = 0), $('#' + ID).val(0)) : ((hodnota = parseInt(val) - 1), $('#' + ID).val(hodnota)), self.saveSetting(this.id, hodnota))
                }
            }
            if ($(this).hasClass("btn-plus")) {
                if (ID.includes("inpEVSE")) {
                    (parseInt(val) + 1 > 99 ? ((hodnota = 99), $('#' + ID).val(99)) : ((hodnota = parseInt(val) + 1), $('#' + ID).val(hodnota)), self.saveSetting(this.id, hodnota))
                }
            }
        });
    }),
    (this.saveSetting = function(t, e) {
        if (isNaN(e)) {
            return
        }
        console.log("variable", t, "value", e),
            $.ajax({
                type: "POST",
                url: "/updateSetting",
                async: !0,
                data: JSON.stringify({ variable: t, value: e }),
                success: function(t) {
                    $("#updateSetting").html(t.datalayer), 1 == t.process ? console.log("save success") : console.log("error during saving");
                },
            });
    }),
    $(document).on("click", "#setSSID", function() {
            $("#setSSID").append('<span class="spinner-border spinner-border-sm"></span>'),
                ($('#wifiStatus').html("Waiting .... ")),
                ($('#wifiStatus').css('color', "#FBD428")),
                (password = document.getElementById("passwordField").value);
            var e = $("input[name='ssid']:checked").val();
            e
                ?
                $.ajax({
                    type: "POST",
                    url: "/updateWificlient",
                    async: !0,
                    data: JSON.stringify({ ssid: e, password: password }),
                    success: function(t) {
                        $("#updateWificlient").html(t.datalayer),
                            0 == t.process ?
                            ($('#wifiStatus').html("Please choose ssid client first!"), ($('#wifiStatus').css("color", "#FF0000"))) :
                            1 == t.process ?
                            ($('#wifiStatus').html("Can not connect to Wattmeter SSID"), ($('#wifiStatus').css("color", "#FF0000"))) :
                            2 == t.process ?
                            ($('#wifiStatus').html("Currently connected to: " + e), ($('#wifiStatus').css("color", "#74DF00"))) :
                            3 == t.process ?
                            ($('#wifiStatus').html("Currently connected to: " + e), ($('#wifiStatus').css("color", "#74DF00"))) :
                            ($('#wifiStatus').html("Error during connection to: " + e), ($('#wifiStatus').css("color", "#FF0000")));
                    },
                }) :
                (($('#wifiStatus').html("Please choose ssid client first!"), (($('#wifiStatus').css("color", "#FF0000")))));
            $("#setSSID").find("span").remove();
        }),
        $(document).on("click", "#refreshSSID", function() {
            $('#ssid').empty();
            ($('#wifiStatus').text("")), $("#refreshSSID").append('<span class="spinner-border spinner-border-sm"></span>'), setting.refreshWifiClient();
        });
}