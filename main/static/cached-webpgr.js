function _cacheScript(e, t, a) {
    var n = new XMLHttpRequest();
    (n.onreadystatechange = function () {
        4 == n.readyState && (200 == n.status ? localStorage.setItem(e, JSON.stringify({ content: n.responseText, version: t })) : console.warn("error loading " + a));
    }),
        n.open("GET", a, !0),
        //n.setRequestHeader("Content-Type", "application/javascript;charset=UTF-8"),
        n.send();
}
function _loadScript(e, t, a, n) {
    var r = document.createElement("script");
    r.readyState
        ? (r.onreadystatechange = function () {
              ("loaded" != r.readyState && "complete" != r.readyState) || ((r.onreadystatechange = null), _cacheScript(t, a, e), n && n());
          })
        : (r.onload = function () {
              _cacheScript(t, a, e), n && n();
          }),
        r.setAttribute("src", e),
        document.getElementsByTagName("head")[0].appendChild(r);
}
function _injectScript(e, t, a, n, r) {
    var c = JSON.parse(e);
    if (c.version != n) return localStorage.removeItem(a), void _loadScript(t, a, n, r);
    var o = document.createElement("script");
    o.type = "text/javascript";
    var i = document.createTextNode(c.content);
    o.appendChild(i), document.getElementsByTagName("head")[0].appendChild(o), r && r();
}
function requireScript(e, t, a, n) {
    try{
        var r = localStorage.getItem(e);
        null == r ? _loadScript(a, e, t, n) : _injectScript(r, a, e, t, n);
        }
    catch(err){
        console.log("Load error: ",err);
        var r = localStorage.getItem(e);
        null == r ? _loadScript(a, e, t, n) : _injectScript(r, a, e, t, n);
        }
}
