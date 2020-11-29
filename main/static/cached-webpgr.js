function _cacheScript(e, t, a) {
    var n = new XMLHttpRequest();
    (n.onreadystatechange = function () {
        4 == n.readyState && 200 == n.status && localStorage.setItem(e, JSON.stringify({ content: n.responseText, version: t }));
    }),
        n.open("GET", a, !0),
        n.send();
}
function _loadScript(e, t, a, n) {
    var c = document.createElement("script");
    c.readyState
        ? (c.onreadystatechange = function () {
              ("loaded" != c.readyState && "complete" != c.readyState) || ((c.onreadystatechange = null), _cacheScript(t, a, e), n && n());
          })
        : (c.onload = function () {
              _cacheScript(t, a, e), n && n();
          }),
        c.setAttribute("src", e),
        document.getElementsByTagName("head")[0].appendChild(c);
}
function _injectScript(e, t, a, n, c) {
    var r = JSON.parse(e);
    if (r.version != n) return localStorage.removeItem(a), void _loadScript(t, a, n, c);
    var o = document.createElement("script");
    o.type = "application/javascript";
    var i = document.createTextNode(r.content);
    o.appendChild(i), document.getElementsByTagName("head")[0].appendChild(o), c && c();
}
function requireScript(e, t, a, n) {
    try {
        var c;
        null == (c = localStorage.getItem(e)) ? _loadScript(a, e, t, n) : _injectScript(c, a, e, t, n);
    } catch (e) {}
}
