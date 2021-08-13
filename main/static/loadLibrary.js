function loadLibrary() {
    null == isMobile.any()
        ? (appendLibrary("main/static/loadLibraryForPC.js"),
          whenAvailable("loadLibraryForPC", function (i) {
              loadLibraryForPC();
          }))
        : (whenAvailable("$",function(i){
            appendLibrary("main/static/func.js"), appendLibrary("main/static/setting.js")
        }));
}
function whenAvailable(i, n) {
    window.setTimeout(function () {
        window[i] ? n(window[i]) : whenAvailable(i, n);
    }, 10);
}
function appendLibrary(i) {
    (e = document.createElement("script")),(e.defer = true),(e.type = "application/javascript"), (e.src = i), document.getElementsByTagName("head")[0].appendChild(e);
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
