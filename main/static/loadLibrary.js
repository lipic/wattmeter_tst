function loadLibrary() {
    if (null == isMobile.any()) {
        var t = [
            "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
            "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/11.0.2/css/bootstrap-slider.min.css",
            "https://cdn.jsdelivr.net/gh/gitbrent/bootstrap-switch-button@1.1.0/css/bootstrap-switch-button.min.css",
        ];
        for (var e in t) {
            var i = e;
            if (!document.getElementById(i)) {
                var r = document.getElementsByTagName("head")[0],
                    s = document.createElement("link");
                (s.id = i), (s.rel = "stylesheet"), (s.type = "text/css"), (s.href = t[e]), (s.media = "all"), r.appendChild(s);
            }
        }
        requireScript("jquery", "3.5.1", "https://code.jquery.com/jquery-3.5.1.min.js"),
        requireScript("moment", "1.0.0", "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.0/moment.min.js"),
        requireScript("Chart", "2.9.3", "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"),
        requireScript("chartjs_plugin", "3.5.1", "https://unpkg.com/chartjs-plugin-streaming@latest/dist/chartjs-plugin-streaming.min.js"),
        requireScript("bootstrap_switch_button", "1.1.0", "https://cdn.jsdelivr.net/gh/gitbrent/bootstrap-switch-button@1.1.0/dist/bootstrap-switch-button.min.js"),
        requireScript("gauge.min", "0.0.0", "http://bernii.github.io/gauge.js/dist/gauge.min.js"),
        requireScript("func", "0.0.0", "main/static/func.js"),
        requireScript("setting", "0.0.0", "main/static/setting.js"),
        requireScript("energyChart", "0.0.0", "main/static/energyChart.js"),
        requireScript("powerChart", "0.0.0", "main/static/powerChart.js"),
        requireScript("evse", "0.0.0", "main/static/evse.js"),
        requireScript("gaugeSetting", "0.0.0", "main/static/gauge.js");
    } else {
        var a = document.getElementsByTagName("head")[0],
        n = document.createElement("script");
        (n.type = "text/javascript"), (n.src = "main/static/func.js"), a.appendChild(n);
        requireScript("energyChart", "0.0.0", "main/static/energyChart.js"),
        requireScript("powerChart", "0.0.4", "main/static/powerChart.js"),
        requireScript("evse", "0.0.0", "main/static/evse.js"),
        requireScript("setting", "0.0.0", "main/static/setting.js"),
        requireScript("gaugeSetting", "0.0.0", "main/static/gauge.js");

    }
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
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.Opera() || isMobile.Windows();
    },
};
