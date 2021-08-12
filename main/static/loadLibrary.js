function loadLibrary() {
    if (null == isMobile.any()) {
        appendLibrary("main/static/loadLibraryForPC.js")
        whenAvailable("loadLibraryForPC", function(t){
            loadLibraryForPC()
        })
    }
    appendLibrary("main/static/func.js")
    appendLibrary("main/static/setting.js")
}
function whenAvailable(name, callback) {
    var interval = 10; // ms
    window.setTimeout(function() {
        if (window[name]) {
            callback(window[name]);
        } else {
            whenAvailable(name, callback);
        }
    }, interval);
}
function appendLibrary(src){
    e = document.createElement("script"),
    (e.type = "application/javascript"), (e.src = src), document.getElementsByTagName("head")[0].appendChild(e)
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
