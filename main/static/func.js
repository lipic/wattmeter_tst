(numberOfEvse = 0), (powerAVGchartData = 0), (hourEnergyData = []), (dailyEnergyData = []);
var refreshGraphs = 0;

function updateData() {
    $.ajax({ url: "/updateData" }).done(function (e) {
        $("#updateData").html(e.datalayer), (document.getElementById("RUN_TIME").textContent = e.RUN_TIME), (document.getElementById("WATTMETER_TIME").textContent = e.WATTMETER_TIME);
        var t = e.U1,
            n = e.U2,
            a = e.U3;
        (document.getElementById("U1").textContent = t), (document.getElementById("U2").textContent = n), (document.getElementById("U3").textContent = a);
        var o = ((e.I1 > 32767 ? e.I1 - 65535 : e.I1) / 100).toFixed(2),
            r = ((e.I2 > 32767 ? e.I2 - 65535 : e.I2) / 100).toFixed(2),
            d = ((e.I3 > 32767 ? e.I3 - 65535 : e.I3) / 100).toFixed(2);
        (document.getElementById("I1").textContent = o), (document.getElementById("I2").textContent = r), (document.getElementById("I3").textContent = d);
        var i = ((e.P1 > 32767 ? e.P1 - 65535 : e.P1) / 1e3).toFixed(2),
            s = ((e.P2 > 32767 ? e.P2 - 65535 : e.P2) / 1e3).toFixed(2),
            l = ((e.P3 > 32767 ? e.P3 - 65535 : e.P3) / 1e3).toFixed(2);
        (document.getElementById("P1").textContent = i), (document.getElementById("P2").textContent = s), (document.getElementById("P3").textContent = l);
        var y = ((e.S1 > 32767 ? e.S1 - 65535 : e.S1) / 1e3).toFixed(2),
            u = ((e.S2 > 32767 ? e.S2 - 65535 : e.S2) / 1e3).toFixed(2),
            c = ((e.S3 > 32767 ? e.S3 - 65535 : e.S3) / 1e3).toFixed(2);
        e.HDO > 0
            ? ((document.getElementById("HDO").textContent = "ON"), (document.getElementById("HDO").style.color = "#74DF00"))
            : ((document.getElementById("HDO").textContent = "OFF"), (document.getElementById("HDO").style.color = "#FF0000")),
            e.RELAY > 0
                ? ((document.getElementById("RELAY").textContent = "ON"), (document.getElementById("RELAY").style.color = "#74DF00"))
                : ((document.getElementById("RELAY").textContent = "OFF"), (document.getElementById("RELAY").style.color = "#FF0000")),
            (document.getElementById("PF1").textContent = (e.PF1 / 100).toFixed(2)),
            (document.getElementById("PF2").textContent = (e.PF2 / 100).toFixed(2)),
            (document.getElementById("PF3").textContent = (e.PF3 / 100).toFixed(2)),
            (document.getElementById("PP1_peak").textContent = (e.PP1_peak / 1e3).toFixed(2)),
            (document.getElementById("PP2_peak").textContent = (e.PP2_peak / 1e3).toFixed(2)),
            (document.getElementById("PP3_peak").textContent = (e.PP3_peak / 1e3).toFixed(2)),
            (document.getElementById("PN1_peak").textContent = (e.PN1_peak / 1e3).toFixed(2)),
            (document.getElementById("PN2_peak").textContent = (e.PN2_peak / 1e3).toFixed(2)),
            (document.getElementById("PN3_peak").textContent = (e.PN3_peak / 1e3).toFixed(2)),
            (document.getElementById("Total_Energy_positive").textContent = (e.E_previousDay_positive / 100).toFixed(2)),
            (document.getElementById("Total_Energy_negative").textContent = e.E_previousDay_negative > 0 ? ((65535 - e.E_previousDay_negative) / 100).toFixed(2) : (0).toFixed(2)),
            (document.getElementById("Previous_Energy_positive").textContent = (e.E_previousDay_positive / 100).toFixed(2)),
            (document.getElementById("Previous_Energy_negative").textContent = (e.E_previousDay_negative / 100).toFixed(2)),
            (document.getElementById("Current_Energy_positive").textContent = (e.E_currentDay_positive / 100).toFixed(2)),
            (document.getElementById("Current_Energy_negative").textContent = (e.E_currentDay_negative / 100).toFixed(2)),
            (document.getElementById("Total_Energy_positive").textContent = ((e.E1_total_positive + e.E2_total_positive + e.E3_total_positive) / 100).toFixed(2)),
            (document.getElementById("Total_Energy_negative").textContent = ((e.E1_total_negative + e.E2_total_negative + e.E3_total_negative) / 100).toFixed(2)),
            (document.getElementById("ID").textContent = e.ID),
            (numberOfEvse = e.NUMBER_OF_EVSE);
            hourEnergyData = e.E_hour;
            dailyEnergyData = e.DailyEnergy;
            powerAVGchartData = e.P_minuten
        if (evseInstance == "undefined" && numberOfEvse != 0) {
            evseInstance = new evse(numberOfEvse);
            evseInstance.createEvseAPI();
        }
        for (var i = 1; i <= numberOfEvse; i++) {
            console.log(e.ACTUAL_CONFIG_CURRENT[i - 1]),
                console.log(typeof e.ACTUAL_CONFIG_CURRENT[i - 1]) != "undefined",
                (document.getElementById("ACTUAL_CONFIG_CURRENT" + i).textContent = typeof e.ACTUAL_CONFIG_CURRENT[i - 1] != "undefined" ? e.ACTUAL_CONFIG_CURRENT[i - 1] : "COMM ERR."),
                (document.getElementById("ACTUAL_OUTPUT_CURRENT" + i).textContent = typeof e.ACTUAL_OUTPUT_CURRENT[i - 1] != "undefined" ? e.ACTUAL_OUTPUT_CURRENT[i - 1] : "COMM ERR.");
            if (typeof e.EV_STATE[i - 1] == "undefined") {
                document.getElementById("EV_STATE" + i).textContent = "COMM ERR.";
            } else if (e.EV_STATE[i - 1] == 1) {
                document.getElementById("EV_STATE" + i).textContent = "UNPLUG";
            } else if (e.EV_STATE[i - 1] == 2) {
                document.getElementById("EV_STATE" + i).textContent = "PLUG";
            } else if (e.EV_STATE[i - 1] == 3) {
                document.getElementById("EV_STATE" + i).textContent = "CHARGING";
            }
        }
      (elements = document.getElementsByClassName("dot"));
        for (var i = 0; i < elements.length; i++) {
            "red" == elements[i].style.backgroundColor ? (elements[i].style.backgroundColor = "") : (elements[i].style.backgroundColor = "red");
        }
        timer = setTimeout(updateData, 1e3);
    });
}
function stop() {
    timer && (console.log("stopTimer"), clearTimeout(timer), (timer = 0));
}
function getTime() {
    var e = new Date(),
        t = "" + (e.getMonth() + 1);
    return ["" + e.getDate(), t, e.getFullYear(), e.getHours(), e.getMinutes(), e.getSeconds()];
}
function loadPowerChart() {
    len = powerAVGchartData[0];
    for (var e = 1; e < 61 - len; e++)
        powerGraph.config.data.datasets.forEach(function (t) {
            t.data.push({ x: Date.now() - 1e3 * (61 - e) * 60, y: 0 });
        });
    for (e = 1; e < len; e++) {
        var t;
        (t = null != powerAVGchartData[e] ? powerAVGchartData[e] : 0),
            powerGraph.config.data.datasets.forEach(function (n) {
                n.data.push({ x: Date.now() - 1e3 * (len - e) * 60, y: t });
            });
    }
    powerGraph.update();
}
function refreshPowerChart() {
    (len = powerAVGchartData[0]),
        powerGraph.config.data.datasets.forEach(function (e) {
            e.data.push({ x: Date.now(), y: powerAVGchartData[len - 1] });
        });
}
function refreshEnergyChartHourly() {
    len = hourEnergyData[0];
    for (var e = 0, t = 0, n = 0, a = 0, o = 0; o < 24; o++)
        null != hourEnergyData[3 * o + 3]
            ? ((e = hourEnergyData[3 * o + 1]),
              (dataP = hourEnergyData[3 * o + 2]),
              (dataN = hourEnergyData[3 * o + 3]),
              (n = n + dataP - dataN),
              (a += 1),
              (energyGraphHourly.data.labels[24 - ((len - 1) / 3 - o)] = e + 1 < 10 ? "0" + e + "-0" + (e + 1) : e + 1 == 10 ? "09-10" : e + "-" + (e + 1)),
              (energyGraphHourly.data.datasets[0].data[24 - ((len - 1) / 3 - o)] = dataP),
              (energyGraphHourly.data.datasets[1].data[24 - ((len - 1) / 3 - o)] = -dataN))
            : (e < 23
                  ? ((e += 1),
                    (energyGraphHourly.data.labels[t] = e + 1 < 10 ? "0" + e + "-0" + (e + 1) : e + 1 == 10 ? "09-10" : e + "-" + (e + 1)),
                    (energyGraphHourly.data.datasets[0].data[t] = 0),
                    (energyGraphHourly.data.datasets[1].data[t] = 0),
                    t++)
                  : ((e = 0), (energyGraphHourly.data.labels[t] = "0" + e + "-0" + (e + 1)), (energyGraphHourly.data.datasets[0].data[t] = 0), (energyGraphHourly.data.datasets[1].data[t] = 0), t++),
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
        null != dailyEnergyData && null != dailyEnergyData[t - o]
            ? ((arr = dailyEnergyData[t - o].split(":")),
              (e = arr[0]),
              (dat = JSON.parse(arr[1])),
              (dataP = dat[0]),
              (dataN = dat[1]),
              (energyGraphDaily.data.labels[30 - o] = e),
              (n = n + parseFloat(dataP / 100) - parseFloat(dataN / 100)),
              (a += 1),
              (energyGraphDaily.data.datasets[0].data[30 - o] = parseFloat(dataP / 100).toFixed(1)),
              (energyGraphDaily.data.datasets[1].data[30 - o] = -parseFloat(dataN / 100).toFixed(1)))
            : ((energyGraphDaily.data.labels[30 - o] = days[o]), (energyGraphDaily.data.datasets[0].data[30 - o] = 0), (energyGraphDaily.data.datasets[1].data[30 - o] = 0));
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
$(function () {
    $("div.mainContainer").load("datatable", function () {
        $(".loader").hide(100);
        evseInstance = "undefined";
        updateData();

    }),
        $("#mySidenav a").click(function (e) {
            if("main" == $(this).attr("id")){
                 (stop(timer),            
                  $("div.mainContainer").load("datatable", function () {
                      evseInstance = "undefined";
                      (document.getElementById("sideText").textContent ='\u2630'+ " Overview"); 
                      updateData();
                       powerGraph.destroy(),
                      energyGraphHourly.destroy(),
                      energyGraphDaily.destroy();
                  }))
                 }
                else if("settings" == $(this).attr("id")){
                  (stop(timer),
                  $("div.mainContainer").load("settings", function () {
                      (document.getElementById("sideText").textContent ='\u2630'+ "  Settings");
                      $("#refreshSSID").append('<span class="spinner-border spinner-border-sm"></span>'),
                      (setting = new Setting()),
                      setting.refreshSetting(),
                      setTimeout(function () {
                          setting.refreshWifiClient();
                      }, 500),
                      powerGraph.destroy(),
                      energyGraphHourly.destroy(),
                      energyGraphDaily.destroy();
                  }))
                }
            else if("powerChart" == $(this).attr("id")){
                (   stop(timer),
                    $("div.mainContainer").load("powerChart", function () {
                    (document.getElementById("sideText").textContent ='\u2630'+ "  Power chart");
                    var e = new powerChart(refreshPowerChart),
                    t = document.getElementById("powerGraph"),
                    n = e.getConfig();
                    powerGraph = new Chart(t, n);
                    energyGraphHourly.destroy();
                    energyGraphDaily.destroy();
                    timer = setInterval(function(){
                        $.ajax({ url: "/updateData" }).done(function (e) {
                        $("#updateData").html(e.datalayer)
                        powerAVGchartData = e.P_minuten
                        }) 
                    },1000)
                    setTimeout(function () {
                        loadPowerChart();
                    }, 100)
                  }))
            }    
            else if("energyChart" == $(this).attr("id")){
                  (stop(timer),
                   $("div.mainContainer").load("energyChart", function () {
                    (document.getElementById("sideText").textContent ='\u2630'+ "  Energy chart");
                    let e = new energyChart("Hourly energy consumption", "Hourly E [Wh]", "Wh"),
                    t = new energyChart("Daily energy consumption", "Daily E [kWh]", "kWh");
                    (o = document.getElementById("energyGraph_hourly")), (d = e.getConfig(24)), (energyGraphHourly = new Chart(o, d));
                    let i = document.getElementById("energyGraph_daily"),
                    s = t.getConfig(31);
                    powerGraph.destroy()
                    (energyGraphDaily = new Chart(i, s));
                    timer = setInterval(function(){
                        $.ajax({ url: "/updateData" }).done(function (e) {
                        $("#updateData").html(e.datalayer)
                        hourEnergyData = e.E_hour
                        dailyEnergyData = e.DailyEnergy
                        console.log(hourEnergyData)
                        console.log(dailyEnergyData)
                        refreshEnergyChartHourly()
                        refreshEnergyChartDaily()
                        })
                    },60000)
                    setTimeout(function () {
                        refreshEnergyChartHourly();
                    }, 500),
                    setTimeout(function () {
                        refreshEnergyChartDaily();
                    }, 500);
                  }))
            }    
        }),
        $(document).on("click", "#synchroTime", function () {
            $("#synchroTime").append('<span class="spinner-border spinner-border-sm"></span>'),
                (e = getTime()),
                e
                    ? $.ajax({
                          type: "POST",
                          url: "/updateData",
                          async: !0,
                          data: JSON.stringify({ time: e }),
                          success: function (e) {
                              $("#updateData").html(e.datalayer), console.log("Syncing proccess: ", e.process), $("#synchroTime").find("span").remove();
                          },
                      })
                    : console.log("ERROR during sync. proccess");
        }),
        $(document).on("click", "#relay", function () {
            (e = 1),
                e
                    ? $.ajax({
                          type: "POST",
                          url: "/updateData",
                          async: !0,
                          data: JSON.stringify({ relay: e }),
                          success: function (e) {
                              $("#updateData").html(e.datalayer),
                                  1 == e.process
                                      ? ((document.getElementById("RELAY").textContent = "ON"), (document.getElementById("RELAY").style.color = "#74DF00"))
                                      : ((document.getElementById("RELAY").textContent = "OFF"), (document.getElementById("RELAY").style.color = "#FF0000"));
                          },
                      })
                    : console.log("ERROR during sync. proccess");
        }),
        $(document).on("click", "#setSSID", function () {
            $("#setSSID").append('<span class="spinner-border spinner-border-sm"></span>'),
                (document.getElementById("wifiStatus").innerHTML = "Waiting .... "),
                (document.getElementById("wifiStatus").style.color = "#FBD428"),
                (password = document.getElementById("passwordField").value);
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
                                  ? ((document.getElementById("wifiStatus").innerHTML = "Please choose ssid client first!"), (document.getElementById("wifiStatus").style.color = "#FF0000"))
                                  : 1 == t.process
                                  ? ((document.getElementById("wifiStatus").innerHTML = "Can not connect to Wattmeter SSID"), (document.getElementById("wifiStatus").style.color = "#FF0000"))
                                  : 2 == t.process
                                  ? ((document.getElementById("wifiStatus").innerHTML = "Currently connected to: " + e), (document.getElementById("wifiStatus").style.color = "#74DF00"))
                                  : 3 == t.process
                                  ? ((document.getElementById("wifiStatus").innerHTML = "Currently connected to: " + e), (document.getElementById("wifiStatus").style.color = "#74DF00"))
                                  : ((document.getElementById("wifiStatus").innerHTML = "Error during connection to: " + e), (document.getElementById("wifiStatus").style.color = "#FF0000"));
                      },
                  })
                : ((document.getElementById("wifiStatus").innerHTML = "Please choose ssid client first!"), (document.getElementById("wifiStatus").style.color = "#FF0000")),
                $("#setSSID").find("span").remove();
        }),
        $(document).on("click", "#readReg", function () {
            return (
                (register = document.getElementById("modbusReg").value),
                (document.getElementById("modbusIO").value = "waiting ..."),
                register > 0
                    ? $.ajax({
                          type: "POST",
                          url: "/readRegister",
                          async: !0,
                          data: JSON.stringify({ register: register }),
                          success: function (e) {
                              $("#readRegister").html(e.datalayer), $(this).parent("span").remove(), (document.getElementById("modbusIO").value = e.data);
                          },
                      })
                    : (alert("Please choose register betwean 1-10000"), $(this).parent("span").remove()),
                0
            );
        }),
        $(document).on("click", "#refreshSSID", function () {
            for (; document.getElementById("ssid").firstChild; ) document.getElementById("ssid").removeChild(document.getElementById("ssid").firstChild);
            (document.getElementById("wifiStatus").innerHTML = ""), $("#refreshSSID").append('<span class="spinner-border spinner-border-sm"></span>'), setting.refreshWifiClient();
        });
});

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

