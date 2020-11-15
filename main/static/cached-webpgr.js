function _cacheScript(e, t, a) {
    var c = new XMLHttpRequest();
    (c.onreadystatechange = function () {
        4 == c.readyState && 200 == c.status && localStorage.setItem(e, JSON.stringify({ content: c.responseText, version: t }));
    }),
        c.open("GET", a, !0),
        c.send();
}
function _loadScript(e, t, a, c) {
    var n = document.createElement("script");
    n.readyState
        ? (n.onreadystatechange = function () {
              ("loaded" != n.readyState && "complete" != n.readyState) || ((n.onreadystatechange = null), _cacheScript(t, a, e), c && c());
          })
        : (n.onload = function () {
              _cacheScript(t, a, e), c && c();
          }),
        n.setAttribute("src", e),
        document.getElementsByTagName("head")[0].appendChild(n);
}
function _injectScript(e, t, a, c, n) {
    var r = JSON.parse(e);
    if (r.version != c) return localStorage.removeItem(a), void _loadScript(t, a, c, n);
    var o = document.createElement("script");
    o.type = "text/javascript";
    var i = document.createTextNode(r.content);
    o.appendChild(i), document.getElementsByTagName("head")[0].appendChild(o), n && n();
}
function requireScript(e, t, a, c) {
    try {
        var n;
        null == (n = localStorage.getItem(e)) ? _loadScript(a, e, t, c) : _injectScript(n, a, e, t, c);
    } catch (r) {
        console.log("Error During upload js. library")
    }
}
