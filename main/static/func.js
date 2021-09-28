function updateData() {
    $.ajax({ url: "/updateData" }).done(function (t) {
        $("#updateData").html(t.datalayer), $("#WATTMETER_TIME").text(t.WATTMETER_TIME);
        var e = parseInt(t.RUN_TIME, 10);
        e -= 3600 * (s = Math.floor(e / 86400)) * 24;
        var a = Math.floor(e / 3600);
        e -= 3600 * a;
        var r = Math.floor(e / 60);
        (e -= 60 * r), $("#RUN_TIME").text((s < 10 ? "0" + s : s) + ":" + (a < 10 ? "0" + a : a) + ":" + (r < 10 ? "0" + r : r) + ":" + (e < 10 ? "0" + e : e));
        var n = t.U1,
            o = t.U2,
            d = t.U3;
        $("#U1").text(n), $("#U2").text(o), $("#U3").text(d);
        var i = ((t.I1 > 32767 ? t.I1 - 65535 : t.I1) / 100).toFixed(2),
            l = ((t.I2 > 32767 ? t.I2 - 65535 : t.I2) / 100).toFixed(2),
            s = ((t.I3 > 32767 ? t.I3 - 65535 : t.I3) / 100).toFixed(2);
        $("#I1").text(i), $("#I2").text(l), $("#I3").text(s);
        var u = ((t.P1 > 32767 ? t.P1 - 65535 : t.P1) / 1e3).toFixed(2),
            E = ((t.P2 > 32767 ? t.P2 - 65535 : t.P2) / 1e3).toFixed(2),
            h = ((t.P3 > 32767 ? t.P3 - 65535 : t.P3) / 1e3).toFixed(2);
        $("#P1").text(u),
            $("#P2").text(E),
            $("#P3").text(h),
            ((t.P1 > 32767 ? t.P1 - 65535 : t.P1) / 1e3).toFixed(2),
            ((t.P2 > 32767 ? t.P2 - 65535 : t.P2) / 1e3).toFixed(2),
            ((t.P3 > 32767 ? t.P3 - 65535 : t.P3) / 1e3).toFixed(2),
            t.AC_IN > 0 ? ($("#AC_IN").text("ON"), $("#AC_IN").css("color", "#74DF00")) : ($("#AC_IN").text("OFF"), $("#AC_IN").css("color", "#FF0000")),
            t.RELAY > 0 ? ($("#RELAY").text("ON"), $("#RELAY").css("color", "#74DF00")) : ($("#RELAY").text("OFF"), $("#RELAY").css("color", "#FF0000")),
            $("#PF1").text((t.PF1 / 100).toFixed(2)),
            $("#PF2").text((t.PF2 / 100).toFixed(2)),
            $("#PF3").text((t.PF3 / 100).toFixed(2)),
            $("#PP1p").text((t.PP1p / 1e3).toFixed(1)),
            $("#PP2p").text((t.PP2p / 1e3).toFixed(1)),
            $("#PP3p").text((t.PP3p / 1e3).toFixed(1)),
            $("#PN1p").text((t.PN1p / 1e3).toFixed(1)),
            $("#PN2p").text((t.PN2p / 1e3).toFixed(1)),
            $("#PN3p").text((t.PN3p / 1e3).toFixed(1)),
            $("#E1dP").text((t.E1dP / 100).toFixed(2)),
            $("#E2dP").text((t.E2dP / 100).toFixed(2)),
            $("#E3dP").text((t.E3dP / 100).toFixed(2)),
            $("#E1dN").text((t.E1dN / 100).toFixed(2)),
            $("#E2dN").text((t.E2dN / 100).toFixed(2)),
            $("#E3dN").text((t.E3dN / 100).toFixed(2)),
            t.E1tP / 100 > 1e6 || t.E2tP / 100 > 1e6 || t.E3tP / 100 > 1e6
                ? ($("#E1tP").text((t.E1tP / 1e8).toFixed(2)), $("#E2tP").text((t.E2tP / 1e8).toFixed(2)), $("#E3tP").text((t.E3tP / 1e8).toFixed(2), $("#EtP").text("↑ Total E [GWh]")))
                : t.E1tP / 100 > 1e3 || t.E2tP / 100 > 1e3 || t.E3tP / 100 > 1e3
                ? ($("#E1tP").text((t.E1tP / 1e5).toFixed(2)), $("#E2tP").text((t.E2tP / 1e5).toFixed(2)), $("#E3tP").text((t.E3tP / 1e5).toFixed(2), $("#EtP").text("↑ Total E [MWh]")))
                : ($("#E1tP").text((t.E1tP / 100).toFixed(1)), $("#E2tP").text((t.E2tP / 100).toFixed(1)), $("#E3tP").text((t.E3tP / 100).toFixed(1), $("#EtP").text("↑ Total E [kWh]"))),
            t.E1tN / 100 > 1e6 || t.E2tN / 100 > 1e6 || t.E3tN / 100 > 1e6
                ? ($("#E1tN").text((t.E1tP / 1e8).toFixed(2)), $("#E2tN").text((t.E2tN / 1e8).toFixed(2)), $("#E3tN").text((t.E3tN / 1e8).toFixed(2), $("#EtN").text("↑ Total E [GWh]")))
                : t.E1tN / 100 > 1e3 || t.E2tN / 100 > 1e3 || t.E3tN / 100 > 1e3
                ? ($("#E1tN").text((t.E1tN / 1e5).toFixed(2)), $("#E2tN").text((t.E2tN / 1e5).toFixed(2)), $("#E3tN").text((t.E3tN / 1e5).toFixed(2), $("#EtN").text("↑ Total E [MWh]")))
                : ($("#E1tN").text((t.E1tN / 100).toFixed(1)), $("#E2tN").text((t.E2tN / 100).toFixed(1)), $("#E3tN").text((t.E3tN / 100).toFixed(1), $("#EtN").text("↑ Total E [kWh]"))),
            $("#Current_EP").text(((t.E1dP + t.E2dP + t.E3dP) / 100).toFixed(2)),
            $("#Current_EN").text(((t.E1dN + t.E2dN + t.E3dN) / 100).toFixed(2)),
            $("#Previous_EP").text((t.EpDP / 100).toFixed(2)),
            $("#Previous_EN").text((t.EpDN / 100).toFixed(2)),
            $("#Total_EP").text(((t.E1tP + t.E2tP + t.E3tP) / 100).toFixed(0)),
            $("#Total_EN").text(((t.E1tN + t.E2tN + t.E3tN) / 100).toFixed(0)),
            $("#ID").text(t.ID),
            (hourEnergyData = t.E_hour),
            (dailyEnergyData = t.DailyEnergy),
            (monthlyEnergyData = t.MonthlyEnergy),
            (powerAVGchartData = t.P_minuten),
            dotControl();
    });
}
function chargingAnim(t, e) {
    for (var a = 1; a < 5; a++) $(".charge" + (a + 4 * (e - 1))).css("animation-play-state", t);
}
function handleEvseAPI(t, e, a, r) {
    for (var n = 1; n <= t; n++)
        $("#ACTUAL_CONFIG_CURRENT" + n).text(void 0 !== e[n - 1] ? e[n - 1] + " A" : "COMM ERR."),
            $("#ACTUAL_OUTPUT_CURRENT" + n).text(void 0 !== a[n - 1] ? a[n - 1] + " A" : "COMM ERR."),
            r[n - 1] < 1 || r[n - 1] > 3
                ? ($("#EV_STATE" + n).text("COMM ERR."), chargingAnim("paused", n), $(".charge" + (1 + 4 * (n - 1))).css("background-color", "inherit"))
                : 1 == r[n - 1]
                ? ($("#EV_STATE" + n).text("UNPLUG"), chargingAnim("paused", n), $(".charge" + (1 + 4 * (n - 1))).css({ "background-color": "red" }))
                : 2 == r[n - 1]
                ? ($("#EV_STATE" + n).text("PLUG"),
                  chargingAnim("paused", n),
                  $(".charge" + (2 + 4 * (n - 1))).css("background-color", "inherit"),
                  $(".charge" + (3 + 4 * (n - 1))).css("background-color", "inherit"),
                  $(".charge" + (4 + 4 * (n - 1))).css("background-color", "inherit"),
                  $(".charge" + (1 + 4 * (n - 1))).css({ "background-color": "yellow" }))
                : 3 == r[n - 1] && ($("#EV_STATE" + n).text("CHARGING"), chargingAnim("running", n), $(".charge" + (1 + 4 * (n - 1))).css({ "background-color": "green" }));
}
function dotControl() {
    elements = $("#dot");
    for (var t = 0; t < elements.length; t++) "grey" == elements[t].style.color ? (elements[t].style.color = "orange") : (elements[t].style.color = "grey");
}
function getTime() {
    var t = new Date(),
        e = "" + (t.getMonth() + 1);
    return ["" + t.getDate(), e, t.getFullYear(), t.getHours(), t.getMinutes(), t.getSeconds()];
}
function loadPowerChart() {
    len = powerAVGchartData[0];
    for (var t = 1; t < 61 - len; t++)
        powerGraph.config.data.datasets.forEach(function (e) {
            e.data.push({ x: Date.now() - 1e3 * (61 - t) * 60, y: 0 });
        });
    for (t = 1; t < len; t++) {
        var e;
        (e = null != powerAVGchartData[t] ? powerAVGchartData[t] : 0),
            powerGraph.config.data.datasets.forEach(function (a) {
                a.data.push({ x: Date.now() - 1e3 * (len - t) * 60, y: e });
            });
    }
    powerGraph.update();
}
function refreshPowerChart() {
    (len = powerAVGchartData[0]),
    (console.log("....",len)),
        powerGraph.data.datasets.forEach(function (t) {
            t.data.push({ x: Date.now(), y: powerAVGchartData[len - 1] });
        });
}
function refreshEnergyChartHourly() {
    len = hourEnergyData[0];
    for (var t = 0, e = 0, a = 0, r = 0, n = 0; n < 24; n++)
        null != hourEnergyData[4 * n + 4]
            ? ((t = hourEnergyData[4 * n + 1]),
              (dataP = hourEnergyData[4 * n + 2]),
              (dataN = hourEnergyData[4 * n + 3]),
              (a = a + dataP - dataN),
              (r += 1),
              (energyBarGraph.data.labels[24 - ((len - 1) / 4 - n)] = t + 1 < 10 ? "0" + t + "-0" + (t + 1) : t + 1 == 10 ? "09-10" : t + "-" + (t + 1)),
              (energyBarGraph.data.datasets[0].data[24 - ((len - 1) / 4 - n)] = dataP),
              1 == hourEnergyData[4 * n + 4]
                  ? (energyBarGraph.data.datasets[0].backgroundColor[24 - ((len - 1) / 4 - n)] = "rgb(114, 189, 0)")
                  : (energyBarGraph.data.datasets[0].backgroundColor[24 - ((len - 1) / 4 - n)] = "#0d6efd"),
              (energyBarGraph.data.datasets[1].data[24 - ((len - 1) / 4 - n)] = -dataN))
            : (t < 23
                  ? ((t += 1),
                    (energyBarGraph.data.labels[e] = t + 1 < 10 ? "0" + t + "-0" + (t + 1) : t + 1 == 10 ? "09-10" : t + "-" + (t + 1)),
                    (energyBarGraph.data.datasets[0].data[e] = 0),
                    (energyBarGraph.data.datasets[1].data[e] = 0),
                    e++)
                  : ((t = 0), (energyBarGraph.data.labels[e] = "0" + t + "-0" + (t + 1)), (energyBarGraph.data.datasets[0].data[e] = 0), (energyBarGraph.data.datasets[1].data[e] = 0), e++),
              e > 23 && (e = 0));
    for (var o = 0; o < 24; o++) energyBarGraph.data.datasets[2].data[o] = (a / r).toFixed(1);

    energyPieGraph.data.datasets[0].data[0]=dataP
    energyPieGraph.data.datasets[0].data[1]=dataN;
    energyPieGraph.data.datasets[0].data[2]=(a / r).toFixed(1);
    energyPieGraph.update()
    energyBarGraph.update();
}
function refreshEnergyChartDaily() {
    var t = 0,
        e = 1;
    null != dailyEnergyData && (e = dailyEnergyData.length - 1), (days = Last31Days());
    for (var a = 0; a < 31; a++)
        null != dailyEnergyData && null != dailyEnergyData[e - a]
            ? ((arr = dailyEnergyData[e - a].split(":")),
              (t = arr[0]),
              (dat = JSON.parse(arr[1])),
              (dataP = dat[0]),
              (dataN = dat[1]),
              (energyBarGraph.data.labels[30 - a] = t),
              (energyBarGraph.data.datasets[0].data[30 - a] = parseFloat(dataP / 100).toFixed(1)),
              (energyBarGraph.data.datasets[1].data[30 - a] = -parseFloat(dataN / 100).toFixed(1)))
            : ((energyBarGraph.data.labels[30 - a] = days[a]), (energyBarGraph.data.datasets[0].data[30 - a] = 0), (energyBarGraph.data.datasets[1].data[30 - a] = 0));
    for (var r = 0; r < 31; r++) energyBarGraph.data.datasets[2].data[r] = getAvgEnergy(dailyEnergyData,31);
    energyPieGraph.data.datasets[0].data[0]=dataP
    energyPieGraph.data.datasets[0].data[1]=dataN;
    energyPieGraph.data.datasets[0].data[2]=getAvgEnergy(dailyEnergyData,31);
    energyBarGraph.update();
    energyPieGraph.update();
}

function refreshEnergyChartMonthly() {
    var t = 0,
        e = 1;
    null != monthlyEnergyData && (e = monthlyEnergyData.length - 1), (days = Last12Month());
    for (var a = 0; a < 12; a++)
        null != monthlyEnergyData && null != monthlyEnergyData[e - a]
            ? ((arr = monthlyEnergyData[e - a].split(":")),
              (t = arr[0]),
              (dat = JSON.parse(arr[1])),
              (dataP = dat[0]),
              (dataN = dat[1]),
              (energyBarGraph.data.labels[11 - a] = t),
              (energyBarGraph.data.datasets[0].data[11 - a] = parseFloat(dataP / 100).toFixed(1)),
              (energyBarGraph.data.datasets[1].data[11 - a] = -parseFloat(dataN / 100).toFixed(1)))
            : ((energyBarGraph.data.labels[11 - a] = days[a]), (energyBarGraph.data.datasets[0].data[11 - a] = 0), (energyBarGraph.data.datasets[1].data[11 - a] = 0));
    for (var r = 0; r < 12; r++) energyBarGraph.data.datasets[2].data[r] = getAvgEnergy(monthlyEnergyData,12);
    energyPieGraph.data.datasets[0].data[0]=dataP
    energyPieGraph.data.datasets[0].data[1]=dataN;
    energyPieGraph.data.datasets[0].data[2]=getAvgEnergy(monthlyEnergyData,12);
    energyBarGraph.update();
    energyPieGraph.update();
}
function getAvgEnergy(data,len) {
    for (var t = 0, e = 0, a = 0; a < len; a++){
        null != data && null != data[a] && ((arr = data[a].split(":")), (dat = JSON.parse(arr[1])), (dataP = dat[0]), (dataN = dat[1]), (t = t + parseFloat(dataP / 100) - parseFloat(dataN / 100)), e++);
    }
    return (t / e).toFixed(1);
}
function Last31Days() {
    for (var t = [], e = 1; e < 32; e++) {
        var a = new Date();
        a.setDate(a.getDate() - e), t.push(formatDate(a));
    }
    return t;
}
function Last12Month() {
    var d = new Date(),t=[];
    for (i=0; i<=11; i++) {
        t.push(d.getMonth()+1 + '/' + d.getFullYear().toString().substr(-2));
        d.setMonth(d.getMonth() - 1);
    }
    return t;
}
function formatDate(t) {
    var e = t.getDate(),
        a = t.getMonth() + 1;
    return e < 10 && (e = "0" + e), a < 10 && (a = "0" + a), (a + "/" + e + "/" + t.getFullYear().toString().substr(-2)).toString();
}
function openNav() {
    $("#mySidenav").css("width", "250px");
}
function closeNav() {
    $("#mySidenav").css("width", "0");
}
function updateOverView(t, e) {
    $("#updateData").html(t.datalayer), "undefined" == evseInstanceGauge && 0 != t.NUMBER_OF_EVSE && ((evseInstanceGauge = new evse(t.NUMBER_OF_EVSE)), evseInstanceGauge.createEvseGauge());
    var a = (((t.P1 > 32767 ? t.P1 - 65535 : t.P1) + (t.P2 > 32767 ? t.P2 - 65535 : t.P2) + (t.P3 > 32767 ? t.P3 - 65535 : t.P3)) / 1e3).toFixed(1);
    e.set((a > 20 ? 20 : a) < 0 ? -1 * (a > 20 ? 20 : a) : a > 20 ? 20 : a), $("#powerTxt").text(a.toString()), (powerAVGchartData = t.P_minuten), (hourEnergyData = t.E_hour), (dailyEnergyData = t.DailyEnergy);
    for (var r = ((t.E1tP + t.E2tP + t.E3tP) / 100).toFixed(0).toString(), n = ((t.E1dP + t.E2dP + t.E3dP) / 100).toFixed(1).toString(), o = (t.EpDP / 100).toFixed(1).toString(), d = r.length - 1; d >= 0; d--)
        $("#kWh" + (r.length - d)).text(r[d]), $("#dWh" + (n.length - d)).text(n[d]), $("#lWh" + (o.length - d)).text(o[d]);
    handleEvseAPI(t.NUMBER_OF_EVSE, t.ACTUAL_CONFIG_CURRENT, t.ACTUAL_OUTPUT_CURRENT, t.EV_STATE), dotControl();
}
(powerAVGchartData = 0),
    (hourEnergyData = []),
    (dailyEnergyData = []),
    (monthlyEnergyData=[]),
    (selectedEnergy = 'hourly'),
    (powerGraph = "undefined"),
    (energyBarGraph = "undefined"),
    (energyPieGraph = "undefined"),
    (evseInstanceGauge = "undefined"),
    (timer = 0),
    $(function () {
        $("div.mainContainer").load("overview", function () {
            $(".loader").hide(100);
            var t = new GaugeSetting("power", 20, 0).getGauge();
            $("#powerTxt").text("0.0"),
                $.ajax({ url: "/updateData" }).done(function (e) {
                    updateOverView(e, t);
                }),
                (timer = setInterval(function () {
                    $.ajax({ url: "/updateData" }).done(function (e) {
                        updateOverView(e, t);
                    });
                }, 2e3));
        }),
            $("#mySidenav a").click(function (t) {
                "overview" == $(this).attr("id")
                    ? (clearTimeout(timer),
                      (evseInstanceGauge = "undefined"),
                      $("div.mainContainer").load("overview", function () {
                          $("#sideText").text("☰ Overview");
                          var t = new GaugeSetting("power", 20, 0).getGauge();
                          $("#powerTxt").text("0.0"),
                              $.ajax({ url: "/updateData" }).done(function (e) {
                                  updateOverView(e, t);
                              }),
                              (timer = setInterval(function () {
                                  $.ajax({ url: "/updateData" }).done(function (e) {
                                      updateOverView(e, t);
                                  });
                              }, 2e3));
                      }))
                    : "data" == $(this).attr("id")
                    ? (clearTimeout(timer),
                      $("div.mainContainer").load("datatable", function () {
                          (evseInstanceGauge = "undefined"),
                              $("#sideText").text("☰ Data"),
                              updateData(),
                              (timer = setInterval(function () {
                                  updateData();
                              }, 2e3));
                      }))
                    : "settings" == $(this).attr("id")
                    ? (clearTimeout(timer),
                      $("div.mainContainer").load("settings", function () {
                          var t = new Setting();
                          t.refreshSetting(), t.refreshWifiClient(), (evseInstanceGauge = "undefined"), $("#sideText").text("☰  Settings"), $("#refreshSSID").append('<span class="spinner-border spinner-border-sm"></span>');
                      }))
                    : "powerChart" == $(this).attr("id")
                    ? (clearTimeout(timer),
                      $("div.mainContainer").load("powerChart", function () {
                          (evseInstanceGauge = "undefined"), "undefined" != powerGraph && powerGraph.destroy(), $("#sideText").text("☰  Power chart");
                          var t = new powerChart(refreshPowerChart),
                              e = $("#powerGraph"),
                              a = t.getConfig();
                          (powerGraph = new Chart(e, a)),
                              (timer = setInterval(function () {
                                  $.ajax({ url: "/updateData" }).done(function (t) {
                                      $("#updateData").html(t.datalayer), (powerAVGchartData = t.P_minuten), dotControl(),refreshPowerChart();
                                  });
                              }, 5e3)),
                              loadPowerChart();
                      }))
                    : "energyChart" == $(this).attr("id") &&
                      (clearTimeout(timer),
                      $("div.mainContainer").load("energyChart", function () {
                          (evseInstanceGauge = "undefined"), 
                          $("#sideText").text("☰  Energy charts");
                          var t = new energyChart("", "Hourly E [Wh]", "Wh"),e = new pieEnergyChart("", "Hourly E [Wh]", "Wh");
                          o = $("#barEnergy"), d = t.getConfig(24),energyBarGraph = new Chart(o, d),
                          a = $("#pieEnergy"),r = e.getConfig(3), energyPieGraph = new Chart(a, r),
                          selectedEnergy = 'daily';
                          updateData();
                          (timer = setInterval(function () {
                                $.ajax({ url: "/updateData" }).done(function (t) {
                                    $("#updateData").html(t.datalayer),
                                    (hourEnergyData = t.E_hour), 
                                    (dailyEnergyData = t.DailyEnergy),
                                    (monthlyEnergyData = t.MonthlyEnergy);
                                    if(selectedEnergy === 'hourly'){
                                        refreshEnergyChartHourly();
                                    }else if(selectedEnergy === 'daily'){
                                        refreshEnergyChartDaily();
                                    }else if(selectedEnergy === 'monthly'){
                                        refreshEnergyChartMonthly();
                                    }
                                    dotControl();
                                });
                              }, 2e4)),
                            (energyBarGraph.getDatasetMeta(1).hidden = !0),
                             refreshEnergyChartHourly();
                      }));
            }),
            $(document).on("click", "#synchroTime", function () {
                $("#synchroTime").append('<span class="spinner-border spinner-border-sm"></span>'),
                    (e = getTime()),
                    e &&
                        $.ajax({
                            type: "POST",
                            url: "/updateData",
                            async: !0,
                            data: JSON.stringify({ time: e }),
                            success: function (t) {
                                $("#updateData").html(t.datalayer), $("#synchroTime").find("span").remove();
                            },
                        });
            }),
            $(document).on("click", "#relay", function () {
                (e = 1),
                    e &&
                        $.ajax({
                            type: "POST",
                            url: "/updateData",
                            async: !0,
                            data: JSON.stringify({ relay: e }),
                            success: function (t) {
                                $("#updateData").html(t.datalayer), 1 == t.process ? ($("#RELAY").text("ON"), $("#RELAY").css("color", "#74DF00")) : ($("#RELAY").text("OFF"), $("#RELAY").css("color", "#FF0000"));
                            },
                        });
            });
            $(document).on("click", "#hourE", function () {
                selectedEnergy = 'hourly'
                var t = new energyChart("", "Hourly E [Wh]", "Wh"),e = new pieEnergyChart("", "Hourly E [Wh]", "Wh");  
                energyBarGraph.config._config = t.getConfig(24);
                energyPieGraph.config._config = e.getConfig(3);
                refreshEnergyChartHourly();
            });
            
            $(document).on("click", "#dayE", function () {
                selectedEnergy = 'daily'
                var t = new energyChart("", "Daily E [kWh]", "kWh"),e = new pieEnergyChart("", "Daily E [kWh]", "kWh");      
                energyBarGraph.config._config = t.getConfig(31);
                energyPieGraph.config._config = e.getConfig(3);
                refreshEnergyChartDaily();
            });
            
            $(document).on("click", "#monthE", function () {
                selectedEnergy = 'monthly'
                var t = new energyChart("", "Monthly E [kWh]", "kWh"),e = new pieEnergyChart("", "Monthly E [kWh]", "kWh");      
                energyBarGraph.config._config = t.getConfig(12);
                energyPieGraph.config._config = e.getConfig(3);
                refreshEnergyChartMonthly();
            });
    });
