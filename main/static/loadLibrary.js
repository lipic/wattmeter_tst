function loadLibrary() {
    if (null == isMobile.any()) {
        var t = ["main/static/style.css","https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css", "https://cdn.jsdelivr.net/gh/gitbrent/bootstrap-switch-button@1.1.0/css/bootstrap-switch-button.min.css"];
        for (var e in t) {
            var i = e;
            if (!document.getElementById(i)) {
                var r = document.getElementsByTagName("head")[0],
                    n = document.createElement("link");
                (n.id = i), (n.rel = "stylesheet"), (n.type = "text/css"), (n.href = t[e]), (n.media = "all"), r.appendChild(n);
            }
        }
        requireScript("jquery", "3.5.1", "https://code.jquery.com/jquery-3.5.1.min.js"),
        requireScript("moment", "1.0.0", "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.0/moment.min.js"),
        setTimeout(function () {
            requireScript("bootstrap", "0.0.0", "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"),
            requireScript("bootstrap_switch_button", "1.1.0", "https://cdn.jsdelivr.net/gh/gitbrent/bootstrap-switch-button@1.1.0/dist/bootstrap-switch-button.min.js"),
            requireScript("gauge.min", "0.0.0", "http://bernii.github.io/gauge.js/dist/gauge.min.js"),
            requireScript("Chart", "2.9.3", "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"),
            requireScript("chartjs_plugin", "3.5.1", "https://unpkg.com/chartjs-plugin-streaming@latest/dist/chartjs-plugin-streaming.min.js");
            requireScript("gaugeSetting", "0.0.0", "main/static/gauge.js"),
            requireScript("evse", "0.0.0", "main/static/evse.js"),
            requireScript("energyChart", "0.0.0", "main/static/energyChart.js"),
            requireScript("powerChart", "0.0.0", "main/static/powerChart.js")
        }, 1e3);
        var t = document.getElementsByTagName("head")[0],
        e = document.createElement("script"),
        i = document.createElement("script");
        (e.type = "application/javascript"), (e.src = "main/static/func.js"), t.appendChild(e), (i.type = "application/javascript"), (i.src = "main/static/setting.js"), t.appendChild(i);
    }
    var t = document.getElementsByTagName("head")[0],
        i = document.createElement("script");
        (i.type = "application/javascript"), (i.src = "main/static/setting.js"), t.appendChild(i);
}
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.Opera() || isMobile.Windows() || isMobile.iOS();
    },
};
