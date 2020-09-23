(numberOfEvse = 0), (powerAVGchartData = 0), (hourEnergyData = []), (dailyEnergyData = []), (powerGraph = 'undefined'), (energyGraphHourly = 'undefined');
var refreshGraphs = 0;

function updateData() {
    $.ajax({ url: "/updateData" }).done(function(e) {
        $("#updateData").html(e.datalayer),
            ($('#RUN_TIME').text(e.RUN_TIME)), ($('#WATTMETER_TIME').text(e.WATTMETER_TIME));
        var t = e.U1,
            n = e.U2,
            a = e.U3;
        ($('#U1').text(t)), ($('#U2').text(n)), ($('#U3').text(a));
        var o = ((e.I1 > 32767 ? e.I1 - 65535 : e.I1) / 100).toFixed(2),
            r = ((e.I2 > 32767 ? e.I2 - 65535 : e.I2) / 100).toFixed(2),
            d = ((e.I3 > 32767 ? e.I3 - 65535 : e.I3) / 100).toFixed(2);
        ($('#I1').text(o)), ($('#I2').text(r)), ($('#I3').text(d));
        var i = ((e.P1 > 32767 ? e.P1 - 65535 : e.P1) / 1e3).toFixed(2),
            s = ((e.P2 > 32767 ? e.P2 - 65535 : e.P2) / 1e3).toFixed(2),
            l = ((e.P3 > 32767 ? e.P3 - 65535 : e.P3) / 1e3).toFixed(2);
        ($('#P1').text(i)), ($('#P2').text(s)), ($('#P3').text(l))
        var y = ((e.P1 > 32767 ? e.P1 - 65535 : e.P1) / 1e3).toFixed(2),
            u = ((e.P2 > 32767 ? e.P2 - 65535 : e.P2) / 1e3).toFixed(2),
            c = ((e.P3 > 32767 ? e.P3 - 65535 : e.P3) / 1e3).toFixed(2);
        e.HDO > 0 ?
            (($('#HDO').text("ON")), ($('#HDO').css("color", "#74DF00"))) :
            (($('#HDO').text("OFF")), ($('#HDO').css("color", "#FF0000"))),
            e.RELAY > 0 ?
            (($('#RELAY').text("ON")), ($('#RELAY').css("color", "#74DF00"))) :
            (($('#RELAY').text("OFF")), ($('#RELAY').css("color", "#FF0000"))),
            ($('#PF1').text((e.PF1 / 100).toFixed(2))),
            ($('#PF2').text((e.PF2 / 100).toFixed(2))),
            ($('#PF3').text((e.PF3 / 100).toFixed(2))),
            ($('#PP1p').text((e.PP1p / 1e3).toFixed(2))),
            ($('#PP2p').text((e.PP2p / 1e3).toFixed(2))),
            ($('#PP3p').text((e.PP3p / 1e3).toFixed(2))),
            ($('#PN1p').text((e.PN1p / 1e3).toFixed(2))),
            ($('#PN2p').text((e.PN2p / 1e3).toFixed(2))),
            ($('#PN3p').text((e.PN3p / 1e3).toFixed(2))),
            ($('#E1dP').text((e.E1dP / 100).toFixed(2))),
            ($('#E2dP').text((e.E2dP / 100).toFixed(2))),
            ($('#E3dP').text((e.E3dP / 100).toFixed(2))),
            ($('#Current_EP').text(((e.E1dP + e.E2dP + e.E3dP) / 100).toFixed(2))),
            ($('#E1dN').text((e.E1dN / 100).toFixed(2))),
            ($('#E2dN').text((e.E2dN / 100).toFixed(2))),
            ($('#E3dN').text((e.E3dN / 100).toFixed(2))),
            ($('#Current_EN').text(((e.E1dN + e.E2dN + e.E3dN) / 100).toFixed(2))),
            ($('#Total_EP').text(((e.E1tP + e.E2tP + e.E3tP) / 100).toFixed(2))),
            ($('#Total_EN').text(((e.E1tN + e.E2tN + e.E3tN) / 100).toFixed(2))),
            ($('#Previous_EP').text((e.EpDP / 100).toFixed(2))),
            ($('#Previous_EN').text((e.EpDN / 100).toFixed(2))),
            ($('#Total_EP').text(((e.E1tP + e.E2tP + e.E3tP) / 100).toFixed(2))),
            ($('#Total_EN').text(((e.E1tN + e.E2tN + e.E3tN) / 100).toFixed(2))),
            ($('#ID').text(e.ID)),
            (numberOfEvse = e.NUMBER_OF_EVSE)
        hourEnergyData = e.E_hour
        dailyEnergyData = e.DailyEnergy
        powerAVGchartData = e.P_minuten
        if (evseInstance == "undefined" && (numberOfEvse != 0)) {
            evseInstance = new evse(numberOfEvse);
            evseInstance.createEvseAPI();
        }

        for (var i = 1; i <= numberOfEvse; i++) {
            ($('#ACTUAL_CONFIG_CURRENT' + i).text(typeof e.ACTUAL_CONFIG_CURRENT[i - 1] != "undefined" ? e.ACTUAL_CONFIG_CURRENT[i - 1] : "COMM ERR.")),
            ($('#ACTUAL_OUTPUT_CURRENT' + i).text(typeof e.ACTUAL_OUTPUT_CURRENT[i - 1] != "undefined" ? e.ACTUAL_OUTPUT_CURRENT[i - 1] : "COMM ERR."))
            if (typeof e.EV_STATE[i - 1] == "undefined") {
                $('#EV_STATE' + i).text("COMM ERR.")
            } else if (e.EV_STATE[i - 1] == 1) {
                $('#EV_STATE' + i).text("UNPLUG")
            } else if (e.EV_STATE[i - 1] == 2) {
                $('#EV_STATE' + i).text("PLUG")
            } else if (e.EV_STATE[i - 1] == 3) {
                $('#EV_STATE' + i).text("CHARGING")
            }
        }
        dotControl()
        timer = setTimeout(updateData, 1e3)
    })
}

function dotControl() {
    (elements = document.getElementsByClassName("dot"))
    for (var i = 0; i < elements.length; i++) {
        "red" == elements[i].style.backgroundColor ? (elements[i].style.backgroundColor = "") : (elements[i].style.backgroundColor = "red")
    }
}

function stop() {
    timer,
    clearTimeout(timer),
    (timer = 0);
}

function getTime() {
    var e = new Date(),
        t = "" + (e.getMonth() + 1);
    return ["" + e.getDate(), t, e.getFullYear(), e.getHours(), e.getMinutes(), e.getSeconds()];
}

function loadPowerChart() {
    len = powerAVGchartData[0];
    for (var e = 1; e < 61 - len; e++)
        powerGraph.config.data.datasets.forEach(function(t) {
            t.data.push({ x: Date.now() - 1e3 * (61 - e) * 60, y: 0 });
        });
    for (e = 1; e < len; e++) {
        var t;
        (t = null != powerAVGchartData[e] ? powerAVGchartData[e] : 0),
        powerGraph.config.data.datasets.forEach(function(n) {
            n.data.push({ x: Date.now() - 1e3 * (len - e) * 60, y: t });
        });
    }
    powerGraph.update();
}

function refreshPowerChart() {
    (len = powerAVGchartData[0]),
    powerGraph.config.data.datasets.forEach(function(e) {
        e.data.push({ x: Date.now(), y: powerAVGchartData[len - 1] });
    });
}

function refreshEnergyChartHourly() {
    len = hourEnergyData[0];
    for (var e = 0, t = 0, n = 0, a = 0, o = 0; o < 24; o++)
        null != hourEnergyData[3 * o + 3] ?
        ((e = hourEnergyData[3 * o + 1]),
            (dataP = hourEnergyData[3 * o + 2]),
            (dataN = hourEnergyData[3 * o + 3]),
            (n = n + dataP - dataN),
            (a += 1),
            (energyGraphHourly.data.labels[24 - ((len - 1) / 3 - o)] = e + 1 < 10 ? "0" + e + "-0" + (e + 1) : e + 1 == 10 ? "09-10" : e + "-" + (e + 1)),
            (energyGraphHourly.data.datasets[0].data[24 - ((len - 1) / 3 - o)] = dataP),
            (energyGraphHourly.data.datasets[1].data[24 - ((len - 1) / 3 - o)] = -dataN)) :
        (e < 23 ?
            ((e += 1),
                (energyGraphHourly.data.labels[t] = e + 1 < 10 ? "0" + e + "-0" + (e + 1) : e + 1 == 10 ? "09-10" : e + "-" + (e + 1)),
                (energyGraphHourly.data.datasets[0].data[t] = 0),
                (energyGraphHourly.data.datasets[1].data[t] = 0),
                t++) :
            ((e = 0), (energyGraphHourly.data.labels[t] = "0" + e + "-0" + (e + 1)), (energyGraphHourly.data.datasets[0].data[t] = 0), (energyGraphHourly.data.datasets[1].data[t] = 0), t++),
            t > 23 && (t = 0));
    for (var r = 0; r < 24; r++) energyGraphHourly.data.datasets[2].data[r] = (n / a).toFixed(1);
    energyGraphHourly.update();
}

function refreshEnergyChartDaily() {
    var e = 0,
        t = 1;
    null != dailyEnergyData && (t = dailyEnergyData.length - 1);
    var n = 0,
        a = 0;
    days = Last31Days();
    for (var o = 0; o < 31; o++)
        null != dailyEnergyData && null != dailyEnergyData[t - o] ?
        ((arr = dailyEnergyData[t - o].split(":")),
            (e = arr[0]),
            (dat = JSON.parse(arr[1])),
            (dataP = dat[0]),
            (dataN = dat[1]),
            (energyGraphDaily.data.labels[30 - o] = e),
            (n = n + parseFloat(dataP / 100) - parseFloat(dataN / 100)),
            (a += 1),
            (energyGraphDaily.data.datasets[0].data[30 - o] = parseFloat(dataP / 100).toFixed(1)),
            (energyGraphDaily.data.datasets[1].data[30 - o] = -parseFloat(dataN / 100).toFixed(1))) :
        ((energyGraphDaily.data.labels[30 - o] = days[o]), (energyGraphDaily.data.datasets[0].data[30 - o] = 0), (energyGraphDaily.data.datasets[1].data[30 - o] = 0));
    (n / a).toFixed(1);
    for (var r = 0; r < 31; r++) energyGraphDaily.data.datasets[2].data[r] = (n / a).toFixed(1);
    energyGraphDaily.update();
}

function Last31Days() {
    for (var e = [], t = 1; t < 32; t++) {
        var n = new Date();
        n.setDate(n.getDate() - t), e.push(formatDate(n));
    }
    return e;
}

function formatDate(e) {
    var t = e.getDate(),
        n = e.getMonth() + 1;
    return t < 10 && (t = "0" + t), n < 10 && (n = "0" + n), (n + "/" + t + "/" + e.getFullYear().toString().substr(-2)).toString();
}
$(function() {
    $("div.mainContainer").load("overview", function() {
            $(".loader").hide(100);
            try { stop(timer) } catch {}
            evseInstance = "undefined";
            let e = new GaugeSetting('power', 20, -10)
            var g = e.getGauge()
            timer = setInterval(function() {
                $.ajax({ url: "/updateData" }).done(function(e) {
                    $("#updateData").html(e.datalayer)
                    var p = (((e.P1 + e.P2 + e.P3) > 32767 ? (e.P1 + e.P2 + e.P3) - 65535 : (e.P1 + e.P2 + e.P3)) / 1e3).toFixed(2)
                    g.set((((e.P1 + e.P2 + e.P3) > 32767 ? (e.P1 + e.P2 + e.P3) - 65535 : (e.P1 + e.P2 + e.P3)) / 1e3).toFixed(2))
                    var k = (((e.E1tP + e.E2tP + e.E3tP) / 100).toFixed(1)).toString()
                    for (var i = (k.length - 1); i >= 0; i--) {
                        $('#kWh' + (k.length - i)).text(k[i]);
                    }
                    dotControl();
                    $('#powerTxt').text(p + ' kW');
                })
            }, 1000)
        }),
        $("#mySidenav a").click(function(e) {
            if ("overview" == $(this).attr("id")) {
                stop(timer);
                evseInstance = "undefined";
                $("div.mainContainer").load("overview", function() {
                    ($('#sideText').text('\u2630' + " Overview"));
                    let e = new GaugeSetting('power', 20, -10)
                    var g = e.getGauge()
                    timer = setInterval(function() {
                        $.ajax({ url: "/updateData" }).done(function(e) {
                            $("#updateData").html(e.datalayer)
                            var p = (((e.P1 + e.P2 + e.P3) > 32767 ? (e.P1 + e.P2 + e.P3) - 65535 : (e.P1 + e.P2 + e.P3)) / 1e3).toFixed(2)
                            g.set((((e.P1 + e.P2 + e.P3) > 32767 ? (e.P1 + e.P2 + e.P3) - 65535 : (e.P1 + e.P2 + e.P3)) / 1e3).toFixed(2))
                            var k = (((e.E1tP + e.E2tP + e.E3tP) / 100).toFixed(1)).toString()
                            for (var i = (k.length - 1); i >= 0; i--) {
                                $('#kWh' + (k.length - i)).text(k[i]);
                            }
                            dotControl();
                            $('#powerTxt').text(p + ' kW');
                        })
                    }, 1000)
                })
            } else if ("data" == $(this).attr("id")) {
                stop(timer);
                evseInstance = "undefined";
                $("div.mainContainer").load("datatable", function() {
                    ($('#sideText').text('\u2630' + "Data"));
                    updateData();
                })
            } else if ("settings" == $(this).attr("id")) {
                (stop(timer),
                    $("div.mainContainer").load("settings", function() {
                        ($('#sideText').text('\u2630' + "  Settings"));
                        $("#refreshSSID").append('<span class="spinner-border spinner-border-sm"></span>'),
                            (setting = new Setting()),
                            setting.refreshSetting(),
                            setting.refreshWifiClient();
                    }))
            } else if ("powerChart" == $(this).attr("id")) {
                (stop(timer),
                    $("div.mainContainer").load("powerChart", function() {
                        if (powerGraph != 'undefined') {
                            powerGraph.destroy()
                        }
                        ($('#sideText').text('\u2630' + "  Power chart"));
                        let e = new powerChart(refreshPowerChart),
                            t = document.getElementById("powerGraph"),
                            n = e.getConfig();
                        powerGraph = new Chart(t, n);
                        timer = setInterval(function() {
                            $.ajax({ url: "/updateData" }).done(function(e) {
                                $("#updateData").html(e.datalayer)
                                powerAVGchartData = e.P_minuten
                            })
                        }, 1000)
                        loadPowerChart()
                    }))
            } else if ("energyChart" == $(this).attr("id")) {
                (stop(timer),
                    $("div.mainContainer").load("energyChart", function() {
                        if (energyGraphHourly != 'undefined') {
                            energyGraphHourly.destroy();
                            energyGraphDaily.destroy();
                        }
                        ($('#sideText').text('\u2630' + "  Energy charts"));
                        let e = new energyChart("", "Hourly E [Wh]", "Wh"),
                            t = new energyChart("", "Daily E [kWh]", "kWh");
                        (o = $('#energyGraph_hourly')), (d = e.getConfig(24)), (energyGraphHourly = new Chart(o, d));
                        let i = $('#energyGraph_daily'),
                            s = t.getConfig(31);
                        (energyGraphDaily = new Chart(i, s));
                        timer = setInterval(function() {
                            $.ajax({ url: "/updateData" }).done(function(e) {
                                $("#updateData").html(e.datalayer)
                                hourEnergyData = e.E_hour
                                dailyEnergyData = e.DailyEnergy
                                refreshEnergyChartHourly()
                                refreshEnergyChartDaily()
                            })
                        }, 60000)
                        energyGraphDaily.getDatasetMeta(1).hidden = true;
                        energyGraphDaily.update();
                        energyGraphHourly.getDatasetMeta(1).hidden = true;
                        energyGraphHourly.update()
                        setTimeout(function() {
                            refreshEnergyChartHourly();
                        }, 100)
                        setTimeout(function() {
                            refreshEnergyChartDaily();
                        }, 100)
                    }))
            }
        }),
        $(document).on("click", "#synchroTime", function() {
            $("#synchroTime").append('<span class="spinner-border spinner-border-sm"></span>'),
                (e = getTime()),
                $.ajax({
                    type: "POST",
                    url: "/updateData",
                    async: !0,
                    data: JSON.stringify({ time: e }),
                    success: function(e) {
                        $("#updateData").html(e.datalayer), $("#synchroTime").find("span").remove();
                    },
                })
        }),
        $(document).on("click", "#relay", function() {
            (e = 1),
            $.ajax({
                type: "POST",
                url: "/updateData",
                async: !0,
                data: JSON.stringify({ relay: e }),
                success: function(e) {
                    $("#updateData").html(e.datalayer),
                        1 == e.process ?
                        (($('#RELAY').text("ON")), ($('#RELAY').css("color", "#74DF00"))) :
                        (($('#RELAY').text("OFF")), ($('#RELAY').css("color", "#FF0000")));
                },
            })
        });
});

function openNav() {
    $('#mySidenav').css("width", "250px");
}

function closeNav() {
    $('#mySidenav').css("width", "0");
}