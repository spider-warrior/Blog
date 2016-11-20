(function (AD_CONFIG, LINKS, RT_CONFIG) {
    /*! Copyright 2016 Baidu Inc. All Rights Reserved. */
    "";
    "";
    var baidu = {version: "1.5.0"};
    baidu.guid = "$BAIDU$";
    window[baidu.guid] = window[baidu.guid] || {};
    baidu.array = baidu.array || {};
    baidu.array.removeAt = function (b, a) {
        return b.splice(a, 1)[0]
    };
    baidu.dom = baidu.dom || {};
    baidu.dom.g = function (a) {
        if ("string" == typeof a || a instanceof String) {
            return document.getElementById(a)
        } else {
            if (a && a.nodeName && (a.nodeType == 1 || a.nodeType == 9)) {
                return a
            }
        }
        return null
    };
    baidu.g = baidu.G = baidu.dom.g;
    baidu.dom._matchNode = function (a, c, d) {
        a = baidu.dom.g(a);
        for (var b = a[d]; b; b = b[c]) {
            if (b.nodeType == 1) {
                return b
            }
        }
        return null
    };
    baidu.dom.first = function (a) {
        return baidu.dom._matchNode(a, "nextSibling", "firstChild")
    };
    baidu.dom.next = function (a) {
        return baidu.dom._matchNode(a, "nextSibling", "nextSibling")
    };
    baidu.cookie = baidu.cookie || {};
    baidu.cookie._isValidKey = function (a) {
        return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24')).test(a)
    };
    baidu.cookie.getRaw = function (b) {
        if (baidu.cookie._isValidKey(b)) {
            var c = new RegExp("(^| )" + b + "=([^;]*)(;|\x24)"), a = c.exec(document.cookie);
            if (a) {
                return a[2] || null
            }
        }
        return null
    };
    baidu.cookie.get = function (a) {
        var b = baidu.cookie.getRaw(a);
        if ("string" == typeof b) {
            b = decodeURIComponent(b);
            return b
        }
        return null
    };
    baidu.lang = baidu.lang || {};
    baidu.lang.isArray = function (a) {
        return "[object Array]" == Object.prototype.toString.call(a)
    };
    baidu.page = baidu.page || {};
    baidu.page.getViewWidth = function () {
        var b = document, a = b.compatMode == "BackCompat" ? b.body : b.documentElement;
        return a.clientWidth
    };
    baidu.page.getScrollTop = function () {
        var a = document;
        return window.pageYOffset || a.documentElement.scrollTop || a.body.scrollTop
    };
    baidu.dom.prev = function (a) {
        return baidu.dom._matchNode(a, "previousSibling", "previousSibling")
    };
    baidu.cookie.setRaw = function (c, d, b) {
        if (!baidu.cookie._isValidKey(c)) {
            return
        }
        b = b || {};
        var a = b.expires;
        if ("number" == typeof b.expires) {
            a = new Date();
            a.setTime(a.getTime() + b.expires)
        }
        document.cookie = c + "=" + d + (b.path ? "; path=" + b.path : "") + (a ? "; expires=" + a.toGMTString() : "") + (b.domain ? "; domain=" + b.domain : "") + (b.secure ? "; secure" : "")
    };
    baidu.cookie.remove = function (b, a) {
        a = a || {};
        a.expires = new Date(0);
        baidu.cookie.setRaw(b, "", a)
    };
    baidu.string = baidu.string || {};
    (function () {
        var a = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
        baidu.string.trim = function (b) {
            return String(b).replace(a, "")
        }
    })();
    baidu.trim = baidu.string.trim;
    baidu.string.escapeReg = function (a) {
        return String(a).replace(new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])", "g"), "\\\x241")
    };
    baidu.dom.q = function (h, e, b) {
        var j = [], d = baidu.string.trim, g, f, a, c;
        if (!(h = d(h))) {
            return j
        }
        if ("undefined" == typeof e) {
            e = document
        } else {
            e = baidu.dom.g(e);
            if (!e) {
                return j
            }
        }
        b && (b = d(b).toUpperCase());
        if (e.getElementsByClassName) {
            a = e.getElementsByClassName(h);
            g = a.length;
            for (f = 0; f < g; f++) {
                c = a[f];
                if (b && c.tagName != b) {
                    continue
                }
                j[j.length] = c
            }
        } else {
            h = new RegExp("(^|\\s)" + baidu.string.escapeReg(h) + "(\\s|\x24)");
            a = b ? e.getElementsByTagName(b) : (e.all || e.getElementsByTagName("*"));
            g = a.length;
            for (f = 0; f < g; f++) {
                c = a[f];
                h.test(c.className) && (j[j.length] = c)
            }
        }
        return j
    };
    baidu.q = baidu.Q = baidu.dom.q;
    baidu.sio = baidu.sio || {};
    baidu.lang.isFunction = function (a) {
        return "[object Function]" == Object.prototype.toString.call(a)
    };
    baidu.lang.isString = function (a) {
        return "[object String]" == Object.prototype.toString.call(a)
    };
    baidu.isString = baidu.lang.isString;
    baidu.sio._createScriptTag = function (b, a, c) {
        b.setAttribute("type", "text/javascript");
        c && b.setAttribute("charset", c);
        b.setAttribute("src", a);
        document.getElementsByTagName("head")[0].appendChild(b)
    };
    baidu.sio._removeScriptTag = function (b) {
        if (b.clearAttributes) {
            b.clearAttributes()
        } else {
            for (var a in b) {
                if (b.hasOwnProperty(a)) {
                    delete b[a]
                }
            }
        }
        if (b && b.parentNode) {
            b.parentNode.removeChild(b)
        }
        b = null
    };
    baidu.sio.callByServer = function (a, m, n) {
        var i = document.createElement("SCRIPT"), h = "bd__cbs__", k, e, o = n || {}, d = o.charset, f = o.queryField || "callback", l = o.timeOut || 0, b, c = new RegExp("(\\?|&)" + f + "=([^&]*)"), g;
        if (baidu.lang.isFunction(m)) {
            k = h + Math.floor(Math.random() * 2147483648).toString(36);
            window[k] = j(0)
        } else {
            if (baidu.lang.isString(m)) {
                k = m
            } else {
                if (g = c.exec(a)) {
                    k = g[2]
                }
            }
        }
        if (l) {
            b = setTimeout(j(1), l)
        }
        a = a.replace(c, "\x241" + f + "=" + k);
        if (a.search(c) < 0) {
            a += (a.indexOf("?") < 0 ? "?" : "&") + f + "=" + k
        }
        baidu.sio._createScriptTag(i, a, d);
        function j(p) {
            return function () {
                try {
                    if (p) {
                        o.onfailure && o.onfailure()
                    } else {
                        m.apply(window, arguments);
                        clearTimeout(b)
                    }
                    window[k] = null;
                    delete window[k]
                } catch (q) {
                } finally {
                    baidu.sio._removeScriptTag(i)
                }
            }
        }
    };
    baidu.sio.log = function (b) {
        var a = new Image(), c = "tangram_sio_log_" + Math.floor(Math.random() * 2147483648).toString(36);
        window[c] = a;
        a.onload = a.onerror = a.onabort = function () {
            a.onload = a.onerror = a.onabort = null;
            window[c] = null;
            a = null
        };
        a.src = b
    };
    baidu.page.getViewHeight = function () {
        var b = document, a = b.compatMode == "BackCompat" ? b.body : b.documentElement;
        return a.clientHeight
    };
    baidu.dom.getDocument = function (a) {
        a = baidu.dom.g(a);
        return a.nodeType == 9 ? a : a.ownerDocument || a.document
    };
    baidu.dom._g = function (a) {
        if (baidu.lang.isString(a)) {
            return document.getElementById(a)
        }
        return a
    };
    baidu._g = baidu.dom._g;
    baidu.browser = baidu.browser || {};
    baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || +RegExp["\x241"]) : undefined;
    baidu.dom.getComputedStyle = function (b, a) {
        b = baidu.dom._g(b);
        var d = baidu.dom.getDocument(b), c;
        if (d.defaultView && d.defaultView.getComputedStyle) {
            c = d.defaultView.getComputedStyle(b, null);
            if (c) {
                return c[a] || c.getPropertyValue(a)
            }
        }
        return ""
    };
    baidu.dom._styleFixer = baidu.dom._styleFixer || {};
    baidu.dom._styleFilter = baidu.dom._styleFilter || [];
    baidu.dom._styleFilter.filter = function (b, e, f) {
        for (var a = 0, d = baidu.dom._styleFilter, c; c = d[a]; a++) {
            if (c = c[f]) {
                e = c(b, e)
            }
        }
        return e
    };
    baidu.string.toCamelCase = function (a) {
        if (a.indexOf("-") < 0 && a.indexOf("_") < 0) {
            return a
        }
        return a.replace(/[-_][^-_]/g, function (b) {
            return b.charAt(1).toUpperCase()
        })
    };
    baidu.dom.getStyle = function (c, b) {
        var e = baidu.dom;
        c = e.g(c);
        b = baidu.string.toCamelCase(b);
        var d = c.style[b] || (c.currentStyle ? c.currentStyle[b] : "") || e.getComputedStyle(c, b);
        if (!d) {
            var a = e._styleFixer[b];
            if (a) {
                d = a.get ? a.get(c) : baidu.dom.getStyle(c, a)
            }
        }
        if (a = e._styleFilter) {
            d = a.filter(b, d, "get")
        }
        return d
    };
    baidu.getStyle = baidu.dom.getStyle;
    baidu.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ? +(RegExp["\x246"] || RegExp["\x242"]) : undefined;
    baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
    baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
    baidu.browser.isStrict = document.compatMode == "CSS1Compat";
    baidu.dom.getPosition = function (a) {
        a = baidu.dom.g(a);
        var j = baidu.dom.getDocument(a), d = baidu.browser, g = baidu.dom.getStyle, c = d.isGecko > 0 && j.getBoxObjectFor && g(a, "position") == "absolute" && (a.style.top === "" || a.style.left === ""), h = {
            left: 0,
            top: 0
        }, f = (d.ie && !d.isStrict) ? j.body : j.documentElement, k, b;
        if (a == f) {
            return h
        }
        if (a.getBoundingClientRect) {
            b = a.getBoundingClientRect();
            h.left = Math.floor(b.left) + Math.max(j.documentElement.scrollLeft, j.body.scrollLeft);
            h.top = Math.floor(b.top) + Math.max(j.documentElement.scrollTop, j.body.scrollTop);
            h.left -= j.documentElement.clientLeft;
            h.top -= j.documentElement.clientTop;
            var i = j.body, l = parseInt(g(i, "borderLeftWidth")), e = parseInt(g(i, "borderTopWidth"));
            if (d.ie && !d.isStrict) {
                h.left -= isNaN(l) ? 2 : l;
                h.top -= isNaN(e) ? 2 : e
            }
        } else {
            k = a;
            do {
                h.left += k.offsetLeft;
                h.top += k.offsetTop;
                if (d.isWebkit > 0 && g(k, "position") == "fixed") {
                    h.left += j.body.scrollLeft;
                    h.top += j.body.scrollTop;
                    break
                }
                k = k.offsetParent
            } while (k && k != a);
            if (d.opera > 0 || (d.isWebkit > 0 && g(a, "position") == "absolute")) {
                h.top -= j.body.offsetTop
            }
            k = a.offsetParent;
            while (k && k != j.body) {
                h.left -= k.scrollLeft;
                if (!d.opera || k.tagName != "TR") {
                    h.top -= k.scrollTop
                }
                k = k.offsetParent
            }
        }
        return h
    };
    baidu.dom.getAncestorBy = function (a, b) {
        a = baidu.dom.g(a);
        while ((a = a.parentNode) && a.nodeType == 1) {
            if (b(a)) {
                return a
            }
        }
        return null
    };
    baidu.lang.toArray = function (b) {
        if (b === null || b === undefined) {
            return []
        }
        if (baidu.lang.isArray(b)) {
            return b
        }
        if (typeof b.length !== "number" || typeof b === "string" || baidu.lang.isFunction(b)) {
            return [b]
        }
        if (b.item) {
            var a = b.length, c = new Array(a);
            while (a--) {
                c[a] = b[a]
            }
            return c
        }
        return [].slice.call(b)
    };
    baidu.page.getScrollLeft = function () {
        var a = document;
        return window.pageXOffset || a.documentElement.scrollLeft || a.body.scrollLeft
    };
    baidu.array.indexOf = function (e, b, d) {
        var a = e.length, c = b;
        d = d | 0;
        if (d < 0) {
            d = Math.max(0, a + d)
        }
        for (; d < a; d++) {
            if (d in e && e[d] === b) {
                return d
            }
        }
        return -1
    };
    baidu.lang.inherits = function (g, e, d) {
        var c, f, a = g.prototype, b = new Function();
        b.prototype = e.prototype;
        f = g.prototype = new b();
        for (c in a) {
            f[c] = a[c]
        }
        g.prototype.constructor = g;
        g.superClass = e.prototype;
        if ("string" == typeof d) {
            f._className = d
        }
    };
    baidu.inherits = baidu.lang.inherits;
    ;
    var n, q = q || {};
    q.global = this;
    q.Ya = !0;
    q.$a = "en";
    q.Za = !0;
    q.Sa = function (a) {
        return void 0 !== a
    };
    q.Ma = function (a, b, c) {
        a = a.split(".");
        c = c || q.global;
        a[0] in c || !c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());)!a.length && q.Sa(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
    };
    q.eb = function (a, b, c) {
        q.Ma(a, b, c)
    };
    q.cb = function (a, b, c) {
        a[b] = c
    };
    q.gb = function () {
        return !1
    };
    q.kb = function () {
    };
    q.fb = function () {
    };
    var aa, s;
    if (s = /msie (\d+\.\d)/i.exec(navigator.userAgent))var v = document.documentMode || +s[1];
    if (s = /firefox\/(\d+\.\d)/i.exec(navigator.userAgent))var ba = +s[1];
    if (s = /opera\/(\d+\.\d)/i.exec(navigator.userAgent))var ca = +s[1];
    var da = navigator.userAgent, ea = da.match(/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i);
    ea && !/chrome/i.test(da) && (aa = +(ea[1] || ea[2]));
    var fa = "CSS1Compat" === document.compatMode, ga = /webkit/i.test(navigator.userAgent);
    s = /UCBrowser\/(\d+\.\d)/i.exec(navigator.userAgent);
    window.$ECMA$ = window.$ECMA$ || {};
    function w(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }

    function ha(a) {
        return "[object Number]" === Object.prototype.toString.call(a) && isFinite(a)
    }

    function ia(a) {
        if (null === a || void 0 === a)return [];
        if (w(a))return a;
        if ("number" !== typeof a.length || "string" === typeof a || "[object Function]" === Object.prototype.toString.call(a))return [a];
        if (a.item) {
            for (var b = a.length, c = Array(b); b--;)c[b] = a[b];
            return c
        }
        return [].slice.call(a)
    }

    function ja(a, b) {
        function c() {
        }

        var d = a.prototype;
        c.prototype = b.prototype;
        var e = a.prototype = new c, f;
        for (f in d)d.hasOwnProperty(f) && (e[f] = d[f]);
        a.prototype.constructor = a;
        a.superClass = b.prototype
    }

    window.$ECMA$._instances = window.$ECMA$._instances || {};
    (function () {
        var a = window.$ECMA$;
        a.ma = a.ma || 1;
        return function () {
            return "ECMA__" + (a.ma++).toString(36)
        }
    })();
    function ka(a, b, c) {
        var d = 2 < arguments.length ? [].slice.call(arguments, 2) : null, e = "[object String]" === Object.prototype.toString.call(a) ? b[a] : a, f = b || e, g = Function.prototype.bind;
        if (g) {
            var k = [].slice.call(arguments, 2);
            k.unshift(f);
            return g.apply(e, k)
        }
        return function () {
            var a = d ? d.concat([].slice.call(arguments, 0)) : arguments;
            return e.apply(f, a)
        }
    };
    function la(a, b) {
        if ("function" === typeof b)for (var c in a)if (a.hasOwnProperty(c) && !1 === b.call(a, a[c], c))break
    }

    function x(a, b) {
        for (var c in b)b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    }

    function ma(a) {
        var b = Object.prototype.hasOwnProperty, c;
        if (!(a && "[object Object]" === Object.prototype.toString.call(a) && "isPrototypeOf" in a) || a.constructor && !b.call(a, "constructor") && !b.call(a.constructor.prototype, "isPrototypeOf"))return !1;
        for (c in a);
        return void 0 === c || b.call(a, c)
    };
    var y = [];

    function A(a, b, c) {
        function d(b) {
            c.call(a, b)
        }

        b = b.replace(/^on/i, "");
        "string" === typeof a && (a = document.getElementById(a));
        var e = b;
        b = b.toLowerCase();
        if (B && B[b])var f = B[b](a, b, d), e = f.type, d = f.Ba;
        a.addEventListener ? a.addEventListener(e, d, !1) : a.attachEvent && a.attachEvent("on" + e, d);
        y[y.length] = [a, b, c, d, e]
    }

    function C(a, b, c) {
        "string" === typeof a && (a = document.getElementById(a));
        b = b.replace(/^on/i, "").toLowerCase();
        for (var d = y.length, e = !c, f, g; d--;)f = y[d], f[1] !== b || f[0] !== a || !e && f[2] !== c || (g = f[4], f = f[3], a.removeEventListener ? a.removeEventListener(g, f, !1) : a.detachEvent && a.detachEvent("on" + g, f), y.splice(d, 1))
    }

    function na(a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }

    var B = B || {};
    B.na = function (a, b) {
        var c = b.relatedTarget, d = b.currentTarget;
        if (c && d !== c && (!c || "xul" !== c.prefix && !D.contains(d, c)))return a.call(d, b)
    };
    B.mouseenter = window.attachEvent ? null : function (a, b, c) {
        return {type: "mouseover", Ba: ka(B.na, this, c)}
    };
    B.mouseleave = window.attachEvent ? null : function (a, b, c) {
        return {type: "mouseout", Ba: ka(B.na, this, c)}
    };
    (function () {
        function a(a, b) {
            for (var c = 0, d = a.length, e = {}; c < d; c++)e[a[c]] = b[a[c]], delete b[a[c]];
            return e
        }

        function b(b, c, d) {
            d = x({}, d);
            var e = a(k[c], d), f = [], g;
            for (g in e)e.hasOwnProperty(g) && f.push(e[g]);
            e = document.createEvent(c);
            f.unshift(b);
            "KeyEvents" === c ? e.initKeyEvent.apply(e, f) : "MouseEvents" === c ? e.initMouseEvent.apply(e, f) : "UIEvents" === c ? e.initUIEvent.apply(e, f) : e.initEvent.apply(e, f);
            x(e, d);
            return e
        }

        function c(a) {
            var b;
            document.createEventObject && (b = document.createEventObject(), x(b, a));
            return b
        }

        var d = {hb: 1, jb: 1, ib: 1}, e = {click: 1, bb: 1, lb: 1, mb: 1, pb: 1, ob: 1, nb: 1}, f = {
            abort: 1,
            blur: 1,
            La: 1,
            error: 1,
            focus: 1,
            load: v ? 0 : 1,
            reset: 1,
            resize: 1,
            scroll: 1,
            select: 1,
            submit: 1,
            rb: v ? 0 : 1
        }, g = {scroll: 1, resize: 1, reset: 1, submit: 1, La: 1, select: 1, error: 1, abort: 1}, k = {
            KeyEvents: "bubbles cancelable view ctrlKey altKey shiftKey metaKey keyCode charCode".split(" "),
            MouseEvents: "bubbles cancelable view detail screenX screenY clientX clientY ctrlKey altKey shiftKey metaKey button relatedTarget".split(" "),
            HTMLEvents: ["bubbles", "cancelable"],
            UIEvents: ["bubbles", "cancelable", "view", "detail"],
            Events: ["bubbles", "cancelable"]
        };
        x(g, d);
        x(g, e);
        return function (m, r, h) {
            r = r.replace(/^on/i, "");
            m = D.g(m);
            h = x({
                bubbles: !0,
                cancelable: !0,
                view: window,
                detail: 1,
                screenX: 0,
                screenY: 0,
                clientX: 0,
                clientY: 0,
                ctrlKey: !1,
                altKey: !1,
                shiftKey: !1,
                metaKey: !1,
                keyCode: 0,
                charCode: 0,
                button: 0,
                relatedTarget: null
            }, h);
            if (d[r]) {
                var p = r;
                h = a(k.KeyEvents, h);
                var l;
                if (document.createEvent)try {
                    l = b(p, "KeyEvents", h)
                } catch (t) {
                    try {
                        l = b(p, "Events", h)
                    } catch (u) {
                        l = b(p, "UIEvents", h)
                    }
                } else h.keyCode =
                    0 < h.charCode ? h.charCode : h.keyCode, l = c(h);
                h = l
            } else if (e[r])l = r, h = a(k.MouseEvents, h), document.createEvent ? (p = b(l, "MouseEvents", h), h.relatedTarget && !p.relatedTarget && ("mouseout" === l.toLowerCase() ? p.toElement = h.relatedTarget : "mouseover" === l.toLowerCase() && (p.fromElement = h.relatedTarget))) : (h.button = 0 === h.button ? 1 : 1 === h.button ? 4 : ha(h.button) ? h.button : 0, p = c(h)), h = p; else if (f[r]) {
                l = r;
                h.bubbles = g.hasOwnProperty(l);
                h = a(k.HTMLEvents, h);
                if (document.createEvent)try {
                    p = b(l, "HTMLEvents", h)
                } catch (z) {
                    try {
                        p = b(l, "UIEvents",
                            h)
                    } catch (E) {
                        p = b(l, "Events", h)
                    }
                } else p = c(h);
                h = p
            } else throw Error(r + " is not support!");
            h && (m.dispatchEvent ? m.dispatchEvent(h) : m.fireEvent && m.fireEvent("on" + r, h))
        }
    })();
    var F;
    F = function (a, b, c) {
        var d, e, f = a.length;
        if ("function" === typeof b)for (e = 0; e < f && (d = a[e], d = b.call(c || a, d, e), !1 !== d); e++);
    };
    var G = "function" === typeof"".trim ? function (a) {
        return String(a).trim()
    } : function (a) {
        return String(a).replace(/(^[\s\t\xa0\u3000\ufeff]+)|([\ufeff\u3000\xa0\s\t]+$)/g, "")
    };

    function oa(a, b) {
        a = String(a);
        var c = arguments[1];
        if ("undefined" !== typeof c) {
            if (ma(c))return a.replace(/\$\{(.+?)\}/g, function (a, b) {
                var d = c[b];
                "function" === typeof d && (d = d(b));
                return "undefined" === typeof d ? "" : d
            });
            var d = Array.prototype.slice.call(arguments, 1), e = d.length;
            return a.replace(/\{(\d+)\}/g, function (a, b) {
                b = parseInt(b, 10);
                return b >= e ? a : d[b]
            })
        }
        return a
    }

    function pa(a) {
        return 0 > a.indexOf("-") && 0 > a.indexOf("_") ? a : a.replace(/[-_][^-_]/g, function (a) {
            return a.charAt(1).toUpperCase()
        })
    };
    function qa(a) {
        return String(a).replace(/%/g, "%25").replace(/&/g, "%26").replace(/\+/g, "%2B").replace(/ /g, "%20").replace(/\//g, "%2F").replace(/#/g, "%23").replace(/=/g, "%3D")
    }

    function ra(a) {
        var b = [], c;
        la(a, function (a, e) {
            if (w(a))for (c = a.length; c--;)b.push(e + "=" + qa(a[c])); else b.push(e + "=" + qa(a))
        });
        return b.join("&")
    };
    function sa(a) {
        a = a.split(".");
        for (var b = window, c; c = a.shift();)if (null != b[c])b = b[c]; else return null;
        return b
    }

    function H() {
        return Math.floor(2147483648 * Math.random()).toString(36)
    }

    var ta = RT_CONFIG.HOSTMAP;
    ta || (ta = RT_CONFIG.HOSTMAP = {});
    "object" !== typeof RT_CONFIG || RT_CONFIG.HOST || (RT_CONFIG.HOST = function (a) {
        return RT_CONFIG.HOSTMAP[a] || "http://" + a
    });
    function wa(a) {
        var b = sa("bds.ready");
        "function" === typeof b && b(function () {
            a()
        })
    }

    var xa = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regexp",
        "[object Object]": "object",
        "[object Error]": "error"
    }, ya = Object.prototype.toString;

    function za(a) {
        return null == a ? String(a) : "object" === typeof a || "function" === typeof a ? xa[ya.call(a)] || "object" : typeof a
    }

    function I(a, b, c) {
        for (var d in b)if (b.hasOwnProperty(d) && (c || !a.hasOwnProperty(d))) {
            var e = za(b[d]);
            if ("object" === e || "array" === e) {
                var f = za(a[d]);
                "object" !== f && "array" !== f && (a[d] = "object" === e ? {} : []);
                I(a[d], b[d], c)
            } else a[d] = b[d]
        }
    }

    var J = {}, Aa = {};

    function Ba(a, b) {
        Ca();
        var c = setTimeout(a, b);
        J[c] = !0;
        return c
    }

    function Da(a) {
        a && (delete J[a], clearTimeout(a))
    }

    var Ea = !1;

    function Ca() {
        Ea || (K(function () {
            for (var a in J)J.hasOwnProperty(a) && Da(parseInt(a, 10));
            for (a in Aa)if (Aa.hasOwnProperty(a)) {
                var b = parseInt(a, 10);
                b && (delete Aa[b], clearInterval(b))
            }
        }), Ea = !0)
    }

    function K(a) {
        var b = sa("bds.comm.registerUnloadHandler");
        "function" === typeof b ? b(a) : wa(function () {
            K(a)
        })
    };
    function Fa(a) {
        this.r = a || document;
        Ga(this)
    }

    n = Fa.prototype;
    n.g = function (a) {
        return "[object String]" === Object.prototype.toString.call(a) ? this.r.getElementById(a) : a && a.nodeName && (1 === a.nodeType || 9 === a.nodeType) ? a : null
    };
    n.M = null;
    n.S = null;
    function Ha(a) {
        var b = D;
        b.M = a;
        var c = b.r.head || b.r.getElementsByTagName("head")[0] || b.r.body;
        c.insertBefore(a, c.firstChild);
        b.M = null
    }

    function Ia() {
        var a = D;
        if (a.M)return a.M;
        if (a.S && "interactive" === a.S.readyState)return a.S;
        for (var b = a.r.getElementsByTagName("script"), c = b.length; c--;) {
            var d = b[c];
            if ("interactive" === d.readyState)return a.S = d
        }
        return null
    }

    n.remove = function (a) {
        (a = this.g(a)) && a.parentNode && a.parentNode.removeChild(a)
    };
    n.getPosition = function (a) {
        a = this.g(a);
        var b = a.ownerDocument || a.document, c = {left: 0, top: 0}, d = v && !fa;
        if (a === (d ? b.body : b.documentElement))return c;
        if (a.getBoundingClientRect)a = a.getBoundingClientRect(), c.left = Math.floor(a.left) + Math.max(b.documentElement.scrollLeft, b.body.scrollLeft), c.top = Math.floor(a.top) + Math.max(b.documentElement.scrollTop, b.body.scrollTop), c.left -= b.documentElement.clientLeft, c.top -= b.documentElement.clientTop, a = b.body, b = parseInt(this.getStyle(a, "borderLeftWidth"), 10), a = parseInt(this.getStyle(a,
            "borderTopWidth"), 10), d && (c.left -= isNaN(b) ? 2 : b, c.top -= isNaN(a) ? 2 : a); else {
            d = a;
            do {
                c.left += d.offsetLeft;
                c.top += d.offsetTop;
                if (0 < ga && "fixed" === this.getStyle(d, "position")) {
                    c.left += b.body.scrollLeft;
                    c.top += b.body.scrollTop;
                    break
                }
                d = d.offsetParent
            } while (d && d !== a);
            if (0 < ca || 0 < ga && "absolute" === this.getStyle(a, "position"))c.top -= b.body.offsetTop;
            for (d = a.offsetParent; d && d !== b.body;)c.left -= d.scrollLeft, ca && "TR" === d.tagName || (c.top -= d.scrollTop), d = d.offsetParent
        }
        return c
    };
    function L(a) {
        var b = D;
        a = b.g(a);
        b = b.getPosition(a);
        b.width = a.offsetWidth;
        b.height = a.offsetHeight;
        return b
    }

    n.opacity = function (a, b) {
        a = this.g(a);
        var c = v && 9 > v;
        return null != b || 0 === b ? (c ? (c = a.style, c.filter = "" + (c.filter || "").replace(/alpha\([^\)]*\)/gi, "") + (1 === b ? "" : "alpha(opacity=" + 100 * b + ")"), c.zoom = 1) : a.style.opacity = b, "") : c ? (c = a.style.filter) && 0 <= c.indexOf("opacity=") ? parseFloat(c.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : this.getStyle(a, "opacity")
    };
    n.contains = function (a, b) {
        a = this.g(a);
        b = this.g(b);
        return a.contains ? a !== b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16)
    };
    n.hasClass = function (a, b) {
        a = this.g(a);
        var c = G(b).split(/\s+/), d = c.length;
        for (b = a.className.split(/\s+/).join(" "); d--;)if (!RegExp("(^| )" + c[d] + "( |$)").test(b))return !1;
        return !0
    };
    n.getComputedStyle = function (a, b) {
        a = this.g(a);
        var c = a.ownerDocument;
        return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) : ""
    };
    n.getStyle = function (a, b) {
        a = this.g(a);
        b = pa(b);
        var c = (a.currentStyle ? a.currentStyle[b] : "") || this.getComputedStyle(a, b);
        if (!c || "auto" === c) {
            var d = M[b];
            d && (c = d.get ? d.get(a, b, c) : this.getStyle(a, d))
        }
        if (O)for (var d = b, e = 0, f; f = O[e]; e++)(f = f.get) && (c = f(d, c));
        return c
    };
    var M = M || {};
    M.display = v && 8 > v ? {
        set: function (a, b) {
            var c = a.style;
            "inline-block" === b ? (c.display = "inline", c.zoom = 1) : c.display = b
        }
    } : ba && 3 > ba ? {
        set: function (a, b) {
            a.style.display = "inline-block" === b ? "-moz-inline-box" : b
        }
    } : null;
    M["float"] = v ? "styleFloat" : "cssFloat";
    M.opacity = v && 9 > v ? {
        get: function (a) {
            return (a = a.style.filter) && 0 <= a.indexOf("opacity=") ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
        }, set: function (a, b) {
            var c = a.style;
            c.filter = (c.filter || "").replace(/alpha\([^\)]*\)/gi, "") + (1 == b ? "" : "alpha(opacity=" + 100 * b + ")");
            c.zoom = 1
        }
    } : null;
    var O = O || [];
    O[O.length] = {
        get: function (a, b) {
            if (/color/i.test(a) && -1 !== b.indexOf("rgb(")) {
                var c = b.split(",");
                b = "#";
                for (var d = 0, e; e = c[d]; d++)e = parseInt(e.replace(/[^\d]/gi, ""), 10).toString(16), b += 1 === e.length ? "0" + e : e;
                b = b.toUpperCase()
            }
            return b
        }
    };
    O[O.length] = {
        set: function (a, b) {
            b.constructor !== Number || /zIndex|fontWeight|opacity|zoom|lineHeight/i.test(a) || (b += "px");
            return b
        }
    };
    n = Fa.prototype;
    n.children = function (a) {
        a = this.g(a);
        var b = [];
        for (a = a.firstChild; a; a = a.nextSibling)1 === a.nodeType && b.push(a);
        return b
    };
    function Ja(a, b, c, d) {
        b = a.g(b);
        for (a = b[d]; a; a = a[c])if (1 === a.nodeType)return a;
        return null
    }

    n.first = function (a) {
        return Ja(this, a, "nextSibling", "firstChild")
    };
    n.next = function (a) {
        return Ja(this, a, "nextSibling", "nextSibling")
    };
    n.prev = function (a) {
        return Ja(this, a, "previousSibling", "previousSibling")
    };
    n.getAncestorBy = function (a, b) {
        for (a = this.g(a); (a = a.parentNode) && 1 === a.nodeType;)if (b(a))return a;
        return null
    };
    n.insertBefore = function (a, b) {
        var c;
        a = this.g(a);
        b = this.g(b);
        (c = b.parentNode) && c.insertBefore(a, b);
        return a
    };
    n.q = function (a, b, c) {
        var d = [], e, f, g;
        if (!(a = G(a)))return d;
        if ("undefined" === typeof b)b = this.r; else if (b = this.g(b), !b)return d;
        c && (c = G(c).toUpperCase());
        if (b.getElementsByClassName)for (f = b.getElementsByClassName(a), b = f.length, e = 0; e < b; e++)g = f[e], c && g.tagName !== c || (d[d.length] = g); else for (a = RegExp("(^|\\s)" + String(a).replace(RegExp("([.*+?^=!:${}()|[\\]/\\\\-])", "g"), "\\$1") + "(\\s|$)"), f = c ? b.getElementsByTagName(c) : b.all || b.getElementsByTagName("*"), b = f.length, e = 0; e < b; e++)g = f[e], a.test(g.className) && (d[d.length] =
            g);
        return d
    };
    function Ga(a) {
        a.Ca || (a.Ca = function () {
            function b() {
                if (!b.isReady) {
                    b.isReady = !0;
                    for (var a = 0, c = d.length; a < c; a++)d[a]()
                }
            }

            var c = !1, d = [];
            (function () {
                if (!c) {
                    c = !0;
                    var d = a.r, f = window;
                    if (v && f === top)(function () {
                        if (!b.isReady) {
                            try {
                                d.documentElement.doScroll("left")
                            } catch (a) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            b()
                        }
                    })(); else if (d.addEventListener) {
                        var g = ca ? function () {
                            if (!b.isReady) {
                                for (var a = 0; a < d.styleSheets.length; a++)if (d.styleSheets[a].disabled) {
                                    setTimeout(arguments.callee, 0);
                                    return
                                }
                                b()
                            }
                        } : b;
                        d.addEventListener("DOMContentLoaded",
                            g, !1);
                        K(function () {
                            d.removeEventListener("DOMContentLoaded", g, !1)
                        })
                    } else if (aa) {
                        var k;
                        (function () {
                            if (!b.isReady)if ("loaded" !== d.readyState && "complete" !== d.readyState)setTimeout(arguments.callee, 0); else {
                                if (void 0 === k) {
                                    k = 0;
                                    var a = d.getElementsByTagName("style"), c = d.getElementsByTagName("link");
                                    a && (k += a.length);
                                    if (c)for (var a = 0, f = c.length; a < f; a++)"stylesheet" === c[a].getAttribute("rel") && k++
                                }
                                d.styleSheets.length !== k ? setTimeout(arguments.callee, 0) : b()
                            }
                        })()
                    }
                    f.attachEvent ? (f.attachEvent("onload", b), K(function () {
                        f.detachEvent("onload",
                            b)
                    })) : f.addEventListener && (f.addEventListener("load", b, !1), K(function () {
                        f.removeEventListener("load", b, !1)
                    }))
                }
            })();
            return function (a) {
                b.isReady ? a() : d[d.length] = a
            }
        }())
    }

    n.ready = function (a) {
        this.Ca.apply(this, arguments)
    };
    var D = new Fa;
    var P = {}, Ka = [];

    function La(a, b) {
        function c() {
            d++;
            d >= e && b.apply(null, Ma(a))
        }

        "string" === typeof a && (a = [a]);
        for (var d = 0, e = a.length, f = 0; f < e; f++)Na(a[f], c)
    }

    function Ma(a) {
        for (var b = [], c = 0; c < a.length; c++)b.push(P[a[c]] || null);
        return b
    }

    function Na(a, b) {
        function c() {
            var a = d.readyState;
            if ("undefined" === typeof a || /^(?:loaded|complete)$/.test(a))if (a = d.src, d = d.onload = d.onreadystatechange = null, P[a])b(P[a]); else {
                var c = Ka.pop();
                c && (P[a] = c, b(c))
            }
        }

        if (P[a])b(P[a]); else {
            var d = Oa();
            d.src = a;
            document.addEventListener ? d.onload = c : d.readyState && (d.onreadystatechange = c);
            Ha(d)
        }
    }

    function Oa() {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.charset = "utf-8";
        a.async = !0;
        return a
    }

    window.ECMA_define = window.ECMA_define || function (a) {
            var b = Ia();
            b ? (a = a(), (b = b.src) ? P[b] = a : Ka.push(a)) : (b = a(), Ka.push(b))
        };
    window.ECMA_require = window.ECMA_require || function (a, b) {
            La(a, b)
        };
    function Pa(a) {
        this.N = x({closeBoardRenderUrl: "http://ecma.bdimg.com/public03/imageplus/v2/dailog/close_board.app.js"}, this.N || {});
        this.p = x(this.N, a)
    }

    Pa.prototype.get = function (a, b) {
        return a in this.p ? this.p[a] : b
    };
    function Qa(a, b, c) {
        this.A = "f21ac82b21eeb7322631b6aa94e17f45" + H();
        this.V = c;
        this.Ja = this.render();
        a.insertBefore(this.Ja, a.firstChild);
        Ra(this, b)
    }

    function Ra(a, b) {
        var c = D.g(a.A + "-icon");
        A(c, "mouseover", function (a) {
            na(a);
            if (a = c.nextSibling)a.style.display = "block";
            b("tipmouseover")
        });
        A(c, "mouseout", function (a) {
            na(a);
            if (a = c.nextSibling)a.style.display = "none";
            b("tipmouseout")
        });
        A(c, "click", function (a) {
            na(a);
            b("tipclick")
        })
    }

    Qa.prototype.render = function () {
        var a = "#${domId} {position:absolute;top:0;left:0;right:auto;bottom:auto;margin:0;padding:0;border:0;width:200px;background:transparent;-webkit-box-sizing:content-box;box-sizing:content-box;}#${domId} div{float:left;width:144px;height:17px;line-height:17px;margin:3px 0 0 -2px;background:url(${TIP_BACK_URL}) 0 0 no-repeat;_background:0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='corp',src='${TIP_BACK_URL}');font-family:sans-serif;text-align:center;font-size:12px;color:#666;padding:8px 10px;display:none;-webkit-box-sizing:content-box;box-sizing:content-box;}#${domId}-icon {float:left;height:38px;width:38px;cursor:default;background:url(${ICON_URL}) 0 0 no-repeat;_background:0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='corp',src='${ICON_URL}');-webkit-box-sizing:content-box;box-sizing:content-box;}#${domId}-icon:hover {float:left;height:38px;width:38px;}#${domId} #${domId}-icon:hover {background:url(${ICON_HOVER_URL}) 0 0 no-repeat;_background:0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='corp',src='${ICON_HOVER_URL}');}";
        this.V &&
        (a += "#${domId}-icon {width:34px;height:34px;margin:2px 0 0 2px;cursor:pointer;}#${domId}-icon:hover {width:34px;height:34px;}");
        var b = document.createElement("div");
        b.id = this.A;
        b.innerHTML = '<a href="javascript:void(0);" id="' + this.A + '-icon"></a>' + (this.V ? "" : '<div id="' + this.A + '-msg">\u67e5\u770b\u6807\u8bc6\u83b7\u53d6\u66f4\u591a\u4fe1\u606f</div>');
        var c = b.childNodes[0], a = oa(a, {
            domId: this.A,
            TIP_BACK_URL: "http://ecma.bdimg.com/public03/imageplus/tip-back.png",
            ICON_URL: this.V ? "http://ecma.bdimg.com/public03/imageplus/i_2.png" :
                "http://ecma.bdimg.com/public03/imageplus/tip.png",
            ICON_HOVER_URL: this.V ? "http://ecma.bdimg.com/public03/imageplus/i_2.png" : "http://ecma.bdimg.com/public03/imageplus/tip-hover.png"
        }), d = D.r, e = c.parentNode;
        if (e) {
            var f = d.createElement("style");
            f.type = "text/css";
            f.media = "screen";
            e.insertBefore(f, c);
            f.styleSheet ? f.styleSheet.cssText = a : f.appendChild(d.createTextNode(a))
        }
        return b
    };
    function Q(a) {
        this.d = this.m = 0;
        this.a = [];
        this.O = [];
        this.config = a;
        this.U = a.get("cacheTime");
        this.U || (this.U = Math.ceil(new Date / 36E5));
        this.t = {};
        this.s = null;
        this.ga = !1
    }

    n = Q.prototype;
    n.H = function () {
    };
    n.X = function () {
    };
    n.Da = function () {
    };
    function Sa(a, b) {
        var c = a.getImgIndex(b);
        if (!c) {
            var c = ++a.d, d = a.X(b), e = function (b) {
                Ta(a, b.relatedTarget || b.fromElement, c) || a.b(c, "mouseover")
            }, f = function (b) {
                Ta(a, b.relatedTarget || b.toElement, c) || a.b(c, "mouseout")
            }, g = function () {
                a.b(c, "mousemove")
            };
            A(d, "mouseover", e);
            A(d, "mouseout", f);
            A(d, "mousemove", g);
            A(b, "mouseover", e);
            A(b, "mouseout", f);
            A(b, "mousemove", g);
            A(b, "click", function () {
                a.b(c, "clickimg")
            });
            a.a[c] = {f: b, h: d, u: {}, ya: {}, w: {}, o: {}, ha: 0, I: {}, aa: "", Wa: null, Va: !1};
            a.m++
        }
        return c
    }

    function Ta(a, b, c) {
        a = a.a[c];
        if (!a || null == b)return !1;
        if (a.f === b || D.contains(a.h, b))return !0;
        var d = !1;
        a.links && F(a.links, function (a) {
            if (a === b || D.contains(a, b))return d = !0, !1
        });
        return d
    }

    n.W = function (a, b, c) {
        var d = this, e = "string" === typeof b ? b : b.url, f = "string" === typeof b ? "" : b.id, g = new R(this, a), k = g.getImgWrapper();
        if (k) {
            b = e;
            var m = d.config.get("vReg");
            m && m.test(b) || (b = -1 !== b.indexOf("?") ? b + "&" : b + "?", b += "cacheTime=" + this.U);
            ECMA_require(b, function (b) {
                var h = d.a[a];
                if (null != h && D.contains(document.documentElement, k)) {
                    d.t[e] || (d.t[e] = b.get("AD_CONFIG"));
                    var p = {};
                    I(p, d.t[e]);
                    var l = c.id || p.id || "f21ac82b21eeb7322631b6aa94e17f45" + a + H();
                    c.id = l;
                    d.b(a, "renderloaded", e, l);
                    var m = d.config.get("adConfig");
                    m && I(p, m, !0);
                    I(p, c, !0);
                    p.api = g;
                    b.set("AD_CONFIG", p);
                    p = document.createElement("div");
                    p.id = l;
                    p.style.margin = "0px";
                    p.style.padding = "0px";
                    p.style.border = "none";
                    p.style.overflow = "visible";
                    p.style.textAlign = "left";
                    k.appendChild(p);
                    h.u[l] = p;
                    h.w[l] = "canvasopen";
                    h.o[l] = {id: f, url: e};
                    h.ha++;
                    g.l = l;
                    b = b.start(!0, !0);
                    h.ya[l] = b
                }
            })
        }
    };
    n.ia = function (a) {
        var b = this, c = b.a[a];
        if (c && !c.aa) {
            var d = new Qa(c.h, function () {
                var c = [].slice.call(arguments, 0);
                c.unshift(a);
                b.b.apply(b, c)
            }, b.ga);
            c.aa = d.A;
            c.Wa = d
        }
    };
    function Ua(a, b, c) {
        function d(a) {
            var b = {}, c;
            for (c in a)if (a.hasOwnProperty(c)) {
                var e = za(a[c]);
                if ("object" === e || "array" === e) {
                    if ("object" !== e || a[c].constructor === Object)b[c] = d(a[c])
                } else b[c] = a[c]
            }
            return b
        }

        var e = a.a[b];
        a = e.ya;
        var e = e.o, f = c || "ALL";
        c = [];
        if (w(f))c = f; else if ("ALL" === f)for (var g in a)a.hasOwnProperty(g) && c.push(g); else c = [f];
        f = [];
        b = "f21ac82b21eeb7322631b6aa94e17f45closeBoardCavnasId" + b;
        for (var k = 0; k < c.length; k++)if (g = c[k], g !== b) {
            var m = e[g];
            f.push({renderId: m.id, renderUrl: m.url, data: d(a[g].adConfig)})
        }
        return f
    }

    Q.prototype.closeAd = function (a, b, c) {
        var d = this.a[a], e = d.u, d = d.w;
        if ("ALL" === b) {
            for (var f in e)e.hasOwnProperty(f) && (e[f].style.display = "none", d[f] = "canvasclose");
            this.b(a, "hide");
            this.b(a, "onclose", c)
        } else e[b].style.display = "none", d[b] = "canvasclose", this.fire(a, b, "hide"), this.fire(a, b, "onclose", c)
    };
    Q.prototype.b = function (a, b, c) {
        if (3 < arguments.length) {
            var d = Array.prototype.slice.call(arguments);
            d.shift();
            d.unshift("ALL");
            d.unshift(a);
            this.fire.apply(this, d)
        } else this.fire(a, "ALL", b, c)
    };
    Q.prototype.fire = function (a, b, c, d) {
        var e = this.O[a];
        if (e) {
            var f;
            "string" !== typeof c && (f = c, c = c.type);
            if ((e = e[c]) && 0 !== e.length) {
                var g = Array.prototype.slice.call(arguments, 3);
                f ? f.imgIndex = a : f = {imgIndex: a, id: H(), type: c};
                g.unshift(f);
                for (var k = "ALL" === b, m, r = 0, h = e.length; r < h; r++)f = e[r], m = f.canvas, (k || "ALL" === m || m === b) && f.func.apply(null, g)
            }
        }
    };
    Q.prototype.getImgIndex = function (a) {
        if ("number" === typeof a)return a;
        for (var b = this.a, c = 1, d = b.length; c < d; c++)if (b[c] && b[c].f === a)return c;
        return 0
    };
    Q.prototype.j = function (a) {
        for (var b = this.a, c = 1, d = b.length; c < d; c++)if (b[c] && b[c].f === a)return b[c];
        return null
    };
    function S(a, b) {
        for (var c = a.a, d = 1, e = c.length; d < e; d++)c[d] && b(c[d], d)
    }

    Q.prototype.recordKey = function (a, b, c, d) {
        if (a = this.a[a])a.I[b] = a.I[b] || [], a.I[b].push("string" === typeof c ? {type: c, time: d} : c)
    };
    Q.prototype.addListener = function (a, b, c, d) {
        var e = this.O[a];
        e || (e = this.O[a] = {});
        e[c] || (e[c] = []);
        e[c].push({canvas: b, func: d})
    };
    Q.prototype.getImgs = function () {
        for (var a = [], b = 1; b <= this.m; b++)null != this.a[b] && a.push(this.a[b].f);
        return a
    };
    function R(a, b) {
        this.c = a;
        this.d = b;
        this.l = "";
        this.version = "1.0.7"
    }

    R.prototype.getImgs = function () {
        return this.c.getImgs()
    };
    R.prototype.j = function () {
        return this.c.a[this.d]
    };
    R.prototype.rendDone = function (a) {
        var b = this.c, c;
        "object" === typeof a ? (c = a.showTip, this.c.ga = null != a.useV2Tip ? a.useV2Tip : this.c.ga) : c = a;
        c && b.ia(this.d);
        b.a[this.d].Va = !0
    };
    R.prototype.addListener = function (a, b) {
        this.c.addListener(this.d, this.l, a, b)
    };
    R.prototype.getImg = function () {
        var a = this.j();
        return a ? a.f : null
    };
    R.prototype.getImgWrapper = function () {
        var a = this.j();
        return a ? a.h : null
    };
    R.prototype.getCanvas = function () {
        var a = this.j();
        return a && a.u ? a.u[this.l] : null
    };
    R.prototype.getImgIndex = function () {
        return this.d
    };
    R.prototype.getImgRect = R.prototype.getAdRect = function () {
        var a = this.j();
        return a.rect || L(a.f)
    };
    R.prototype.setShareData = function (a, b, c) {
        var d = this.c;
        if (c)d.s = d.s || {}, d.s[a] = b; else if (c = d.a[this.d])c.$ = c.$ || {}, c.$[a] = b
    };
    R.prototype.getShareData = function (a, b) {
        if (b) {
            var c = this.c.s;
            return c ? c[a] || null : null
        }
        return (c = this.j()) && c.$ ? c.$[a] : null
    };
    R.prototype.recordKey = function (a, b) {
        this.c.recordKey(this.d, this.l, a, b)
    };
    R.prototype.recordTime = R.prototype.recordKey;
    R.prototype.getRecordedKey = function () {
        var a = this.j();
        return a && a.I ? a.I[this.l] : null
    };
    R.prototype.getRecordedTime = R.prototype.getRecordedKey;
    R.prototype.getRenderUrl = function () {
        var a = this.j();
        return a && a.o ? a.o[this.l].url || "" : ""
    };
    R.prototype.getRenderId = function () {
        var a = this.j();
        return a && a.o ? a.o[this.l].id || "" : ""
    };
    R.prototype.getLoaderConfig = function (a, b) {
        var c = this.c.config;
        return c.get.apply(c, arguments)
    };
    R.prototype.closeAd = function (a) {
        var b = {usePrompt: !0, reasons: "", availableReasons: null, canvas: "ALL", closeBy: "AD"};
        I(b, a || {}, !0);
        a = b.canvas;
        if ("string" === typeof a)"ME" === a.toUpperCase() && (a = this.l, b.canvas = this.l); else for (var c = 0; c < a.length; c++)"ME" === a[c].toUpperCase() && (a[c] = this.l);
        if (b.usePrompt) {
            b.materials = Ua(this.c, this.d, b.canvas);
            a = this.c;
            var c = this.d, d = a.a[c], e = "f21ac82b21eeb7322631b6aa94e17f45closeBoardCavnasId" + c, f = d.w[e];
            if ("canvasloading" !== f && "canvasopen" !== f)if ("canvasclose" === f)if (d =
                    a.a[c], b = d.u, d = d.w, "ALL" === e) {
                for (var g in b)b.hasOwnProperty(g) && (b[g].style.display = "block", d[g] = "canvasopen");
                a.b(c, "show");
                a.b(c, "reopen")
            } else b[e].style.display = "block", d[e] = "canvasopen", a.fire(c, e, "show"), a.fire(c, e, "reopen"); else if (g = a.config.get("closeBoardRenderUrl"))d.w[e] = "canvasloading", b = b || {}, b.id = e, a.W(c, {
                url: g,
                id: "closeBoardRenderId"
            }, b)
        } else for (g = [], g = "string" === typeof a ? [a] : a, c = 0; c < g.length; c++)this.c.closeAd(this.d, g[c], b.reasons)
    };
    R.prototype.triggerAll = function (a, b) {
        if (2 < arguments.length) {
            var c = Array.prototype.slice.call(arguments);
            c.unshift(this.d);
            this.c.b.apply(this.c, c)
        } else this.c.b(this.d, a, b)
    };
    R.prototype.getRenderInfos = function () {
        var a = this.j(), b = [];
        if (!a || !a.o)return b;
        var a = a.o, c = {}, d, e;
        for (e in a)a.hasOwnProperty(e) && (d = a[e], c[d.id] || (c[d.id] = !0, b.push({id: d.id, url: d.url})));
        return b
    };
    R.prototype.getEnv = function () {
        return {from: "desktop"}
    };
    R.prototype.inView = function () {
        var a = this.j();
        return a ? a.inView : !0
    };
    function Va() {
        var a = document;
        return ("BackCompat" === a.compatMode ? a.body : a.documentElement).clientWidth
    }

    function Xa() {
        var a = document;
        return ("BackCompat" === a.compatMode ? a.body : a.documentElement).clientHeight
    };
    function U(a) {
        var b = {top: 0, left: 0, width: 0, height: 0};
        if (Ya(a))return b;
        var c = a.baiduImageplusOverflowParent;
        if (c && Za(c))return $a(a, c);
        if ((c = a.baiduImageplusHiddenParent) && Ya(c))return b;
        var d = !1, e = !1, f = null, c = baidu.dom.getAncestorBy(a, function (b) {
            var c = D.getStyle(b, "position");
            if ("absolute" === c || "fixed" === c)e = !0;
            if (Ya(b))return d = !0;
            if (e && "static" === c || !Za(b))return !1;
            f = $a(a, b);
            return f.clipped
        });
        if (!c)return L(a);
        if (d)return a.baiduImageplusHiddenParent = c, b;
        a.baiduImageplusOverflowParent = c;
        return f
    }

    function Ya(a) {
        return "none" === D.getStyle(a, "display") || "0" === D.getStyle(a, "opacity") || "hidden" === D.getStyle(a, "visibility")
    }

    function Za(a) {
        if ("HTML" === a.nodeName || "BODY" === a.nodeName)return !1;
        var b = D.getStyle(a, "display"), c = D.getStyle(a, "float");
        return "inline" !== b || "none" !== c && "" !== c ? "visible" !== D.getStyle(a, "overflow") ? !0 : !1 : !1
    }

    function $a(a, b) {
        var c = L(a), d = L(b), e = c.top, f = c.left, g = c.width, k = c.height, m = d.top, r = d.left, h = d.width, d = d.height;
        if (e >= m && f >= r && f + g <= r + h && e + k <= m + d)return c.clipped = !1, c;
        c = {clipped: !0};
        f > r ? (c.left = f, c.width = h - (f - r)) : (c.left = r, c.width = g - (r - f));
        c.width = Math.min(c.width, g, h);
        e > m ? (c.top = e, c.height = d - (e - m)) : (c.top = m, c.height = k - (m - e));
        c.height = Math.min(c.height, k, d);
        return c
    };
    function V(a) {
        this.R = a.get("imgRectKey", "baiduImageplusRect");
        Q.call(this, a);
        (a = baidu.cookie.get("baiduImageplusQid")) && baidu.cookie.remove("baiduImageplusQid", {path: "/"});
        this.va = a || H() + (new Date).getTime();
        this.s = this.s || {};
        this.s.qid = "";
        this.ua = this.config.get("maxAdCount");
        this.sa = this.config.get("maxMiniAdCount");
        this.F = this.ua + this.sa;
        this.K = this.L = 0;
        this.n = {};
        this.Ha = {};
        this.Ga = document.getElementsByTagName("img").length;
        this.ra = !1;
        this.wa = [];
        this.ea = this.fa = 0;
        this.ba = null;
        this.da = this.T = 0;
        this.Ia = this.config.get("noLogo");
        this.ta = this.config.get("maxMultiFormImgCount");
        this.C = (this.P = this.config.get("formList")) ? this.P.length : 0;
        this.qa = !1
    }

    baidu.inherits(V, Q);
    function ab(a) {
        a = (a = a.config.get("imgContainerId")) && D.g(a) || document;
        return baidu.lang.toArray("img" === a.nodeName.toLowerCase() ? [a] : a.getElementsByTagName("img"))
    }

    n = V.prototype;
    n.H = function () {
        function a() {
            bb(b);
            b.la();
            b.ra = !0;
            F(b.wa, function (a) {
                a()
            })
        }

        var b = this;
        b.config.get("autoStart") && ("complete" === document.readyState ? a() : A(window, "load", a))
    };
    n.ready = function (a) {
        this.ra ? a() : this.wa.push(a)
    };
    function bb(a) {
        var b = a.m;
        0 < b && S(a, function (b, c) {
            cb(a, c)
        });
        if (b < a.F) {
            var c = ab(a), d = function () {
                if (c.length && !(a.m >= a.F)) {
                    var b = c.shift();
                    db(a.config, b) ? a.ja(b, function (c) {
                        c ? (eb(a, b), Ba(d, 500)) : d()
                    }) : d()
                }
            };
            d()
        }
    }

    function fb(a) {
        var b;
        try {
            b = decodeURIComponent(a.src)
        } catch (c) {
            b = qa(a.src)
        }
        return b
    }

    function gb(a, b) {
        if (!b)return !1;
        switch (b) {
            case 1:
                return a.da < a.sa;
            case 2:
                return a.T < a.ua;
            default:
                return !1
        }
    }

    n.ja = function (a, b) {
        var c = this, d = c.getImgIndex(a);
        if (d)cb(c, d), b && b(d); else if (c.m >= c.F)b && b(0); else if (hb(c, a))b && b(0); else {
            var e = (new Date).getTime();
            ib(a, function (d) {
                if (!d || c.m >= c.F)b && b(0); else {
                    d = a[c.R] = U(a);
                    var g = X(c.config, d);
                    if (gb(c, g)) {
                        var k = (new Date).getTime();
                        c.getData(a, function (d) {
                            if (d && gb(c, g)) {
                                var f = (new Date).getTime(), h;
                                try {
                                    h = decodeURIComponent(a.src)
                                } catch (p) {
                                    h = a.src
                                }
                                for (var l, t, u, z, E = !1, W = !1, Db = function (a, b, d) {
                                    if (a.imgIndex === l) {
                                        for (var h in c.n)c.n.hasOwnProperty(h) && c.recordKey(l,
                                            d, h, c.n[h]);
                                        c.recordKey(l, d, "found", e);
                                        c.recordKey(l, d, "loading", k);
                                        c.recordKey(l, d, "loaded", f);
                                        c.recordKey(l, d, "render_loaded", (new Date).getTime());
                                        c.recordKey(l, d, "ad_count", c.fa);
                                        c.recordKey(l, d, "pg_rect", jb());
                                        a = N.rect;
                                        c.recordKey(l, d, "img_rect", [a.top, a.left, a.width, a.height].join("_"))
                                    }
                                }, ua = 0, Eb = d.length; ua < Eb; ua++)if (t = d[ua], t.cproId && c.config.get("growCookie") && !c.qa && (c.qa = !0, u = window.document.createElement("iframe"), u.style.cssText = "display: none;", u.src = c.config.get("growCookie") + "CPROID=" +
                                        t.cproId, window.document.body.appendChild(u)), u = t.ads, "product" === t.name && kb(c.config.get("unionId"), "c_" + (u || []).length), u.length) {
                                    for (var va = 0, Fb = u.length; va < Fb; va++)if (z = u[va], h === z.image) {
                                        var Wa = lb(c, t.render);
                                        if (Wa) {
                                            z.position_type = t.position_type;
                                            z.exp_list = t.exp_list;
                                            t.box && (z.box = z.box || {}, I(z.box, t.box, !0));
                                            if (!W) {
                                                E = a[c.R];
                                                l = Sa(c, a);
                                                c.fa++;
                                                1 === g ? c.da++ : c.T++;
                                                var N = c.a[l], W = U(a);
                                                N.rect = E || W;
                                                N.Ra = g;
                                                X(c.config, W) ? N.inView = mb(c, a) : (N.inView = !1, N.h.style.display = "none");
                                                W = !0;
                                                c.addListener(l, "ALL",
                                                    "renderloaded", Db)
                                            }
                                            c.W(l, {url: Wa, id: t.render_id}, z);
                                            E = !0
                                        }
                                    }
                                    E && nb(c, l)
                                }
                                b && b(l || 0)
                            } else b && b(0)
                        }, {imgType: g})
                    } else b && b(0)
                }
            })
        }
    };
    function lb(a, b) {
        var c = a.config.get("renderReplaceRules");
        if (!c)return b;
        for (var d in c)if (c.hasOwnProperty(d)) {
            var e = RegExp(d);
            if (b.match(e))return (c = c[d]) ? b.replace(e, c) : ""
        }
        return b
    }

    n.Z = function (a) {
        if (a = this.getImgIndex(a)) {
            this.Ea(a);
            var b = this.a[a];
            if (b) {
                var c = b.u, d = b.w, e = b.o;
                this.b(a, "release");
                for (var f in c)c.hasOwnProperty(f) && (D.remove(f), c[f] = null, d[f] = null, e.ALL = null, b.ha--);
                0 < b.ha || (b.aa && D.remove(b.aa), f = b.f, C(f, "mouseover"), C(f, "mousemove"), C(f, "mouseout"), C(f, "click"), b = b.h, C(b, "mouseover"), C(b, "mousemove"), C(b, "mouseout"), this.Da(a), this.a[a] = null, this.O[a] = null, this.m--)
            }
            this.fa--
        }
    };
    n.X = function (a) {
        var b = document.createElement("div");
        b.style.cssText = "position:absolute;border:0;margin:0;padding:0;height:0;overflow:visible;text-align:left;";
        ob(b, a);
        document.body.appendChild(b);
        var c = a[this.R];
        a[this.R] = null;
        pb(this, c, b);
        return b
    };
    function pb(a, b, c) {
        b = b.nodeName ? U(b) : b;
        var d = a.ba;
        d || ("static" === D.getStyle(document.body, "position") ? a.ba = d = {
            top: 0,
            left: 0
        } : a.ba = d = baidu.dom.getPosition(document.body));
        c.style.top = b.top - d.top + "px";
        c.style.left = b.left - d.left + "px";
        c.style.width = b.width + "px"
    }

    n.Da = function (a) {
        (a = this.a[a]) && D.remove(a.h)
    };
    n.getData = function (a, b, c) {
        if (location.href.match(/(\?|&)baiduImageplus=/))b(window.baiduImagePlusFakeData); else {
            c = 1 === (c || {}).imgType;
            var d = this, e, f, g;
            if (a.nodeName && "img" === a.nodeName.toLowerCase()) {
                e = fb(a);
                if (f = d.Ha[e]) {
                    b(f);
                    return
                }
                f = d.config.get("apiWd");
                "function" === typeof f && (f = f(a));
                f = encodeURIComponent(f);
                g = a.offsetWidth;
                a = a.offsetHeight
            } else e = a.image, f = a.wd || "", g = a.width, a = a.height;
            var k = d.config.get("api"), m = d.config.get("unionId"), r = {
                src: d.config.get("apiSrc"),
                k: f,
                "iurl[]": e,
                qid: d.va,
                tu: m,
                width: g,
                height: a,
                opt: d.n.opt || "",
                v: d.n.v || "",
                cached: 0,
                pic: d.Ga,
                explist: d.config.get("expList", ""),
                vn: qb,
                pagetitle: encodeURIComponent(window.document.title),
                screen_width: Va(),
                screen_height: Xa()
            };
            if (d.config.get("clid") || d.config.get("cuid"))r.clid = d.config.get("clid"), r.cuid = d.config.get("cuid");
            var k = k + (-1 === k.indexOf("?") ? "?" : "&"), h = function (a, b) {
                I(a, r);
                baidu.sio.callByServer(k + ra(a), b, {charset: "gbk", timeOut: 1E4, onfailure: b})
            }, p = 0;
            e = function (a, b, c) {
                var e = {dri: ++d.ea};
                c && (e.is_small_pic = 1);
                b && d.C &&
                (I(e, d.P[p % d.C]), p++);
                h(e, a)
            };
            if (c)e(b, !1, !0); else if (0 <= d.ta && d.T >= d.ta)e(b, !0); else {
                var l = parseInt(d.config.get("yuetuFormId", 0) || 0, 10), t = !1;
                0 < l && F(d.P || [], function (a) {
                    if (l === parseInt(a.formId || 0, 10))return t = !0, !1
                });
                var u = [], z = 0, E = d.C;
                1 > E && (E = 1);
                c = function (a) {
                    a && u.push(a);
                    z++;
                    z >= E && b(Array.prototype.concat.apply([], u))
                };
                0 < l && !t && (E += 1, a = {dri: ++d.ea, formId: l}, h(a, c));
                if (1 > d.C)e(c, !1); else for (a = 0; a < d.C; a++)e(c, !0)
            }
        }
    };
    function ib(a, b) {
        if (a.complete)b(!0); else {
            var c = function () {
                b(!0);
                C(a, "load", c)
            };
            A(a, "load", c);
            var d = function () {
                b(!1);
                C(a, "abort", d);
                C(a, "error", d)
            };
            A(a, "abort", d);
            A(a, "error", d)
        }
    }

    function rb(a, b, c) {
        var d = [];
        c ? (d[0] = c, d[1] = b) : (d[0] = a.getImgIndex(b), d[1] = a.a[d[0]]);
        return d[0] && d[1] ? d : null
    }

    n.ka = function (a, b) {
        var c = rb(this, a, b);
        if (c) {
            var d = c[0], c = c[1];
            if (D.contains(document.documentElement, c.f)) {
                var e = U(c.f), f = c.rect;
                if (e.top !== f.top || e.left !== f.left || e.width !== f.width || e.height !== f.height)if (c.rect = e, X(this.config, e))pb(this, e, c.h), cb(this, d), ob(c.h, c.f), this.b(d, "resize", e); else if (d = this.getImgIndex(d))c = this.a[d], c.inView = !1, c.h.style.display = "none", this.b(d, "hide")
            } else this.Z(d), 1 === c.Ra ? this.da-- : this.T--
        }
    };
    function cb(a, b) {
        var c = a.a[b];
        c.h.style.display = "block";
        c.inView = mb(a, c.f);
        a.b(b, "show")
    }

    n.Fa = function () {
        var a = this;
        S(a, function (b, c) {
            a.ka(b, c)
        })
    };
    n.la = function () {
        var a = this;
        sb(function () {
            a.m && (tb(a), S(a, function (b, c) {
                a.ka(b, c);
                ub(a, b, c)
            }))
        });
        vb(function () {
            a.m && S(a, function (b, c) {
                ub(a, b, c)
            })
        })
    };
    function sb(a) {
        var b;
        A(window, "resize", function () {
            b && Da(b);
            var c = arguments, d = this;
            b = Ba(function () {
                a.apply(d, c);
                b = null
            }, 500)
        })
    }

    function vb(a) {
        function b() {
            d = g;
            c = null;
            a.apply(e, f);
            e = f = null
        }

        var c, d, e, f, g;
        A(window, "scroll", function () {
            e = this;
            f = arguments;
            g = (new Date).getTime();
            d = d || g;
            var a = 1E3 - (g - d);
            0 >= a ? (Da(c), b()) : c || (c = Ba(b, a))
        })
    }

    function ub(a, b, c) {
        var d = mb(a, b.f);
        b.inView !== d && (b.inView = d, a.b(c, d ? "intoview" : "outview"));
        d && a.b(c, "inview")
    }

    function mb(a, b) {
        a.L = a.L || baidu.page.getViewWidth();
        a.K = a.K || baidu.page.getViewHeight();
        var c = b.getBoundingClientRect();
        return 0 < c.bottom && c.top < a.K && 0 < c.right && c.left < a.L
    }

    function tb(a) {
        a.L = baidu.page.getViewWidth();
        a.K = baidu.page.getViewHeight()
    }

    function eb(a, b) {
        function c(a) {
            (a = "." === a.charAt(0) ? baidu.q(a.replace(/^\./, "")) : D.g(a.replace(/^#/, ""))) && (baidu.lang.isArray(a) ? a.length && F(a, function (a) {
                d.Y(a, f, e)
            }) : d.Y(a, f, e))
        }

        var d = a, e = b ? d.getImgIndex(b) : 1, f = d.a[e];
        if (f) {
            var g = d.config.get("imgCoverId");
            g && c(g);
            (g = d.config.get("imgCovers")) && F(g.split(","), c)
        }
    }

    n.Y = function (a, b, c) {
        var d = this;
        if (b = rb(d, b, c)) {
            var e = b[0];
            b = b[1];
            b.links = b.links || [];
            b.B = b.B || [];
            c = function (a) {
                Ta(d, a.relatedTarget || a.fromElement, e) || d.b(e, "mouseover")
            };
            var f = function (a) {
                Ta(d, a.relatedTarget || a.toElement, e) || d.b(e, "mouseout")
            }, g = function () {
                d.b(e, "mousemove")
            }, k = function () {
                d.b(e, "clickimg")
            };
            b.links.push(a);
            b.B.push({mouseover: c, mouseout: f, mousemove: g, click: k});
            A(a, "mouseover", c);
            A(a, "mouseout", f);
            A(a, "mousemove", g);
            A(a, "click", k);
            ob(b.h, a)
        }
    };
    function ob(a, b) {
        var c;
        var d = b, e = d;
        for (c = [d]; (e = e.offsetParent) && "body" !== e.nodeName.toLowerCase();)"static" !== D.getStyle(e, "position") && (d = e, c.push(d));
        if (6 === v)c = parseInt(D.getStyle(d, "z-index"), 10) || 0; else {
            for (e = 0; c.length;)d = c.pop(), d = parseInt(D.getStyle(d, "z-index"), 10), isNaN(d) || (e = Math.max(d, e));
            c = e
        }
        d = parseInt(D.getStyle(a, "z-index"), 10) || 0;
        c > d && (a.style.zIndex = c + 10)
    }

    n.Xa = function (a, b) {
        var c = this.getImgIndex(b);
        if (c && (c = this.a[c], c.links)) {
            var d = baidu.array.indexOf(c.links, a);
            if (-1 !== d) {
                var e = c.B[d], f;
                for (f in e)e.hasOwnProperty(f) && C(a, f, e[f]);
                baidu.array.removeAt(c.links, d);
                baidu.array.removeAt(c.B, d)
            }
        }
    };
    n.Ea = function (a) {
        if (a = this.getImgIndex(a)) {
            var b = this.a[a];
            b.links && (F(b.links, function (a, d) {
                var e = b.B[d], f;
                for (f in e)e.hasOwnProperty(f) && C(a, f, e[f])
            }), b.links.length = 0, b.B.length = 0)
        }
    };
    function nb(a, b) {
        if (a.config.get("autoDetectCover")) {
            var c = a.config.get("findCoverLevel");
            if (!(0 >= c)) {
                var d = a.a[b];
                if (d) {
                    var e = d.f, f = -1, g = {
                        BODY: !0,
                        HEAD: !0,
                        SCRIPT: !0,
                        STYLE: !0,
                        META: !0,
                        HTML: !0
                    }, k = function (m, r) {
                        if (!(f >= c || g[m.nodeName])) {
                            f++;
                            var h;
                            if (h = 0 !== r)if ("a" === m.nodeName.toLowerCase() ? h = !0 : (h = D.getStyle(m, "cursor"), h = "pointer" === h || 0 === h.indexOf("url(")), h && (h = !D.contains(m, e))) {
                                h = L(m);
                                var p = d.rect, l = h.top, t = h.left, u = p.top, z = p.left, t = Math.abs(t - z) < (t > z ? p.width : h.width);
                                h = Math.abs(l - u) < (l > u ? p.height :
                                        h.height) && t
                            }
                            h && a.Y(m, d, b);
                            4 !== r && (h = baidu.dom.first(m)) && k(h, 1);
                            3 !== r && (h = baidu.dom.next(m)) && k(h, 2);
                            2 !== r && (h = baidu.dom.prev(m)) && k(h, 3);
                            (0 === r || 4 === r) && (h = m.parentNode) && k(h, 4);
                            f--
                        }
                    };
                    k(e, 0)
                }
            }
        }
    }

    function hb(a, b) {
        var c = !1;
        S(a, function (a) {
            c || a.h && (c = D.contains(a.h, b))
        });
        return c
    }

    function jb() {
        var a = baidu.page.getViewHeight(), b = baidu.page.getViewWidth(), c = baidu.page.getScrollTop(), d = baidu.page.getScrollLeft();
        return [c, d, b, a].join("_")
    }

    n.ia = function () {
        this.Ia || V.superClass.ia.apply(this, arguments)
    };
    function wb(a) {
        var b = new Image, c = "baidu_ecom_lego_log_" + Math.floor(2147483648 * Math.random()).toString(36);
        window[c] = b;
        b.onload = b.onerror = b.onabort = function () {
            b.onload = b.onerror = b.onabort = null;
            b = window[c] = null
        };
        b.src = a
    };
    function Y(a) {
        this.pa = a.get("imgStatusKey", "baiduImageplusStatus");
        this.oa = a.get("imgSnapshotKey", "baiduImageplusSnapshot");
        this.ca = !1;
        this.xa = 0;
        this.Aa = {};
        this.Oa = /.(?:gif)(?:$|#|\?)/;
        this.Pa = /^(https?:\/\/)?[^/]+($|\/$)/;
        V.call(this, a)
    }

    baidu.inherits(Y, V);
    Y.prototype.H = function () {
        var a = this;
        if (a.config.get("autoStart") && (!a.config.get("banHomePage") || !a.Pa.test(window.location.href))) {
            a.n.opt = 1;
            a.n.v = 8;
            var b = a.config.get("startOnLoad"), c, d = function () {
                function d() {
                    a.m < a.F && xb(a);
                    a.Fa();
                    a.xa++;
                    Ba(d, a.config.get("tickInterval"))
                }

                b && (a.n.onload = (new Date).getTime());
                c && clearTimeout(c);
                d();
                a.la()
            };
            b && "complete" !== document.readyState ? (A(window, "load", d), c = setTimeout(d, a.config.get("onloadTimeout"))) : d()
        }
    };
    function yb(a, b) {
        if (a.xa === parseInt(a.config.get("checkNoBigPicAtTickNum", 8), 10)) {
            b = b || [];
            var c = 0, d = !0;
            F(b, function (b) {
                if (db(a.config, b)) {
                    b = X(a.config, b);
                    if (1 < b)return d = !1;
                    1 === b && c++
                }
            });
            if (d) {
                var e = a.config.get("noBigPicLogUrl", "http://bzclk.baidu.com/nopic.jpg") + "?tu=" + a.config.get("unionId", "") + "&url=" + encodeURIComponent(window.location.href) + "&simg=" + c + "&cache=" + (new Date).getTime();
                wb(e)
            }
        }
    }

    function zb(a, b) {
        b = b || [];
        F(b, function (b) {
            if (!b || a.Aa[b.src] || !X(a.config, b) || !a.Oa.test(b.src))return !0;
            a.Aa[b.src] = !0;
            b = "gif&hostname=" + encodeURIComponent(window.location.hostname) + "&gifsrc=" + encodeURIComponent(b.src);
            kb(a.config.get("unionId"), b)
        })
    }

    function xb(a) {
        var b = ab(a);
        yb(a, b);
        zb(a, b);
        var c = a.pa;
        F(b, function (b) {
            if (b && db(a.config, b))switch (b[c] || 0) {
                case 0:
                    Ab(a, b);
                    break;
                case 1:
                    var e = Bb(b), f = b[a.oa], g = !1, k;
                    for (k in e)if (e.hasOwnProperty(k) && e[k] !== f[k]) {
                        g = !0;
                        break
                    }
                    g && (b[c] = 1, Ab(a, b))
            }
        })
    }

    function Ab(a, b) {
        var c = {};
        if (c.immediate || !a.ca)a.ca = !0, a.ja(b, function (d) {
            a.ca = !1;
            var e = a.pa;
            d ? (b[e] = 2, eb(a, b)) : (b[e] = 1, b[a.oa] = Bb(b));
            c.callback && c.callback(d)
        })
    }

    function Bb(a) {
        var b = U(a);
        return {
            src: a.src,
            opacity: D.getStyle(a, "opacity"),
            visibility: D.getStyle(a, "visibility"),
            width: a.offsetWidth,
            height: a.offsetHeight,
            ab: b.clipped
        }
    }

    Y.prototype.Z = function (a) {
        var b = a;
        if ("number" === typeof b)if (b = this.a[b])b = b.f; else return;
        b.baiduImageplusStatus = 0;
        Y.superClass.Z.call(this, a)
    };
    function Z(a) {
        this.N = x({
            autoStart: !0,
            imgContainerId: "",
            ignoredContainers: "",
            imgCoverId: "",
            imgCovers: "",
            apiSrc: 1E3,
            apiWd: function (a) {
                return a.alt || ""
            },
            api: "http://imageplus.baidu.com/ui",
            minImgWidth: 300,
            minImgHeight: 200,
            maxAdCount: 4,
            minMiniImgWidth: 200,
            minMiniImgHeight: 180,
            maxMiniAdCount: 2,
            autoDetectCover: !0,
            findCoverLevel: 4,
            supportGIF: !0,
            ignoreGIFs: "dot.gif grey.gif 1x1.gif none.gif loadb.gif tou.gif loading.gif load.gif lazyload.gif lazy.gif loader.gif lazy_loading.gif".split(" "),
            moreIgnoreGIFs: "",
            growCookie: "http://imageplus.baidu.com/cookie_iframe.html?",
            vReg: /[?&]v=\w+(&|$)/i,
            noLogo: !1,
            maxMultiFormImgCount: -1,
            moreFormList: [],
            clid: "",
            cuid: "",
            cacheTime: ""
        }, this.N || {});
        Pa.call(this, a);
        a = this.get("moreFormList", []);
        if (0 < a.length) {
            var b = this.get("formList", []);
            1 > b.length && b.push({formId: 0});
            var c = {};
            F(b, function (a) {
                c[a.formId] = !0
            });
            F(a, function (a) {
                c[a.formId] || b.push({formId: a.formId})
            });
            this.p.formList = b
        }
        this.Ka = this.get("supportGIF") ? /.(?:html|htm)(?:$|#|\?)/ : /.(?:gif|html|htm)(?:$|#|\?)/;
        this.minWidth = parseInt(this.get("minImgWidth"), 10);
        this.minHeight = parseInt(this.get("minImgHeight"), 10);
        this.Ua = parseInt(this.get("minMiniImgWidth"), 10);
        this.Ta = parseInt(this.get("minMiniImgHeight"), 10);
        (a = G(this.get("unionId"))) && 0 === a.indexOf("u") && (a = a.slice(1));
        this.p.unionId = a;
        this.D = null;
        var d = {};
        a = this.get("ignoreGIFs", []).concat(this.get("moreIgnoreGIFs"));
        F(a, function (a) {
            d[a] = !0
        });
        this.Qa = d;
        this.Na = /(?:\S+\/)(\w+\.gif)(?:$|#|\?)/i
    }

    baidu.inherits(Z, Pa);
    function Cb(a, b) {
        var c = a.get("ignoredContainers");
        if (!c)return !1;
        a.D || (a.D = [], F(c.split(","), function (b) {
            b = "." === b.charAt(0) ? baidu.q(b.slice(1)) : [D.g(b.slice(1))];
            a.D = a.D.concat(b)
        }));
        var d = !1;
        F(a.D, function (a) {
            if (a && (D.contains(a, b) || a === b))return d = !0, !1
        });
        return d
    }

    function db(a, b) {
        var c = b.getAttributeNode("data-baiduimageplus-ignore");
        return c && c.specified || a.Ka.test(b.src) || Cb(a, b) || a.get("supportGIF") && (c = b.src, (c = (c = (c || "").match(a.Na)) ? c[1] : !1) && a.Qa[c]) ? !1 : !!X(a, {
            width: b.offsetWidth,
            height: b.offsetHeight
        })
    }

    function X(a, b) {
        var c = b.width, d = b.height;
        return d >= a.minHeight && c >= a.minWidth ? 2 : d >= a.Ta && c >= a.Ua ? 1 : 0
    };
    function Gb(a) {
        Z.call(this, a);
        this.p = x({
            tickInterval: 1E3,
            onloadTimeout: 5E3,
            startOnLoad: !1,
            banHomePage: !1,
            noBigPicLogUrl: "http://bzclk.baidu.com/nopic.jpg",
            checkNoBigPicAtTickNum: 8
        }, this.p)
    }

    baidu.inherits(Gb, Z);
    function Hb(a) {
        Z.call(this, a);
        this.p = x({
            nopicLoaderLogUrl: "http://bzclk.baidu.com/nopic_loader.jpg",
            tagDomId: "imageplus-nopic-icon",
            nopicTickInterval: 1E3
        }, this.p)
    }

    ja(Hb, Z);
    function Ib() {
        return RegExp("^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\'\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$").test("BDTUJIAID")
    }

    function Jb() {
        if (Ib()) {
            var a = /(^| )BDTUJIAID=([^;]*)(;|$)/.exec(document.cookie);
            if (a)return a[2] || null
        }
        return null
    };
    function Kb(a) {
        V.call(this, a);
        this.J = this.config.get("tagDomId", "imageplus-nopic-icon")
    }

    ja(Kb, V);
    n = Kb.prototype;
    n.H = function () {
        var a = this, b = a.config.get("yuetuNopicFloatFormId", 0);
        b && a.go(b, null);
        var c = a.config.get("yuetuNopicFormId", 0);
        if (c) {
            var d = null, e = 0, f = function () {
                (d = D.g(a.J)) ? a.go(c, d) : e = setTimeout(function () {
                    f()
                }, a.config.get("nopicTickInterval", 1E3))
            };
            f();
            D.ready(function () {
                clearTimeout(e);
                if (!0 !== !!d) {
                    d = D.g(a.J);
                    if (!d) {
                        var b;
                        b = [];
                        for (var f = [document.body], m = [], r = 10, h = {
                            script: !0,
                            style: !0,
                            input: !0,
                            img: !0
                        }, p = window.document.title, p = p.split("-")[0]; 0 < r--;) {
                            for (; 0 < f.length;) {
                                var l = f.shift();
                                if (!h[l.tagName.toLowerCase()] && !D.hasClass(l, "yuetu-float-layer") && l.innerHTML) {
                                    for (var t = parseInt(2 * p.length / 3, 10), u = 0; u < t && l.innerHTML.charAt(u) === p.charAt(u); u++);
                                    u === t && b.push(l);
                                    m = m.concat(D.children(l))
                                }
                            }
                            f = m;
                            m = [];
                            if (1 > f.length)break
                        }
                        1 === b.length && (b = b[0], b.innerHTML += '<span id="' + a.J + '"></span>', d = D.g(a.J))
                    }
                    !0 === !!d && a.go(c, d)
                }
            })
        }
    };
    n.getData = function (a, b) {
        if (location.href.match(/(\?|&)baiduImageplus=/))b(window.baiduImagePlusFakeData); else {
            var c = this.config.get("apiWd");
            "function" === typeof c && (c = c({}));
            var d = this.config.get("api"), e = this.config.get("unionId"), c = {
                src: this.config.get("apiSrc"),
                k: c,
                "iurl[]": "http://imageplus.baidu.com/imgs/showcase-1.jpg",
                qid: this.va,
                tu: e,
                width: 660,
                height: 370,
                opt: 1,
                v: 8,
                cached: 0,
                pic: 1,
                explist: this.config.get("expList", ""),
                vn: qb,
                pagetitle: encodeURIComponent(window.document.title),
                screen_width: Va(),
                screen_height: Xa()
            };
            if (this.config.get("clid") || this.config.get("cuid"))c.clid = this.config.get("clid"), c.cuid = this.config.get("cuid");
            d += -1 === d.indexOf("?") ? "?" : "&";
            e = {dri: ++this.ea, formId: a};
            I(e, c);
            baidu.sio.callByServer(d + ra(e), b, {charset: "gbk", timeOut: 1E4, onfailure: b})
        }
    };
    n.X = function () {
        var a = document.createElement("div");
        a.style.cssText = "position:absolute;border:0;margin:0;padding:0;height:0;overflow:visible;text-align:left;";
        document.body.appendChild(a);
        return a
    };
    n.W = function (a, b) {
        var c = this, d = "string" === typeof a ? a : a.url, e = "string" === typeof a ? "" : a.id, f = this.X();
        if (f) {
            var g = d, k = c.config.get("vReg");
            k && k.test(g) || (g = -1 !== g.indexOf("?") ? g + "&" : g + "?", g += "cacheTime=" + c.U);
            ECMA_require(g + "&nopic=1", function (a) {
                if (D.contains(document.documentElement, f)) {
                    c.t[d] || (c.t[d] = a.get("AD_CONFIG"));
                    var g = {
                        renderWrapper: f,
                        unionId: c.config.get("unionId"),
                        tagDom: D.g(c.J),
                        renderId: e,
                        api: {
                            getImgWrapper: function () {
                                return f
                            }
                        }
                    };
                    I(g, c.t[d]);
                    var h = b.id || g.id || "f21ac82b21eeb7322631b6aa94e17f450" +
                        H();
                    b.id = h;
                    var k = c.config.get("adConfig");
                    k && I(g, k, !0);
                    I(g, b, !0);
                    a.set("AD_CONFIG", g);
                    g = document.createElement("div");
                    g.id = h;
                    g.style.margin = "0px";
                    g.style.padding = "0px";
                    g.style.border = "none";
                    g.style.overflow = "visible";
                    g.style.textAlign = "left";
                    f.appendChild(g);
                    a.start(!0, !0)
                }
            })
        }
    };
    n.go = function (a) {
        var b = this, c, d, e;
        b.getData(a, function (a) {
            a = a || [];
            for (var g = 0, k = a.length; g < k; g++)if (c = a[g], d = c.ads, "product" === c.name && kb(b.config.get("unionId"), "c_" + (d || []).length), d.length)for (var m = 0, r = d.length; m < r; m++) {
                e = d[m];
                var h = lb(b, c.render);
                h && (e.position_type = c.position_type, e.exp_list = c.exp_list, c.box && (e.box = e.box || {}, I(e.box, c.box, !0)), b.W({
                    url: h,
                    id: c.render_id
                }, e))
            }
        })
    };
    var Lb = window.cpro_id || "", $ = window.baiduImagePlus || {}, Mb = {};
    Lb && (window.cpro_id = null);
    !$.unionId && Lb && ($.unionId = Lb);
    var qb = "160314";

    function kb(a, b) {
        baidu.sio.log("http://bzclk.baidu.com/eye.php?actionid=100&attach=" + a + "_" + b + "&timestamp=" + (new Date).getTime() + "_" + Math.floor(2147483648 * Math.random()).toString(36) + "&vn=" + qb)
    }

    function Nb(a) {
        function b(a) {
            var b = (window.location.hostname || "").split(".");
            if (!(2 > b.length))for (var c = "." + b[b.length - 1], d = b.length - 2; 0 <= d; d--) {
                var c = "." + b[d] + c, e = a, f = {path: "/", domain: c, za: 31536E6};
                if (Ib()) {
                    var f = f || {}, g = f.za;
                    ha(g) && (g = new Date, g.setTime(g.getTime() + f.za));
                    document.cookie = "BDTUJIAID=" + e + (f.path ? "; path=" + f.path : "") + (g ? "; expires=" + g.toGMTString() : "") + (f.domain ? "; domain=" + f.domain : "") + (f.qb ? "; secure" : "")
                }
                if (!0 === !!Jb())break
            }
        }

        function c() {
            for (var a = "", b = 10; 32 > a.length && 0 < b;)a +=
                Math.random().toString(16).slice(2), b -= 1;
            for (b = 32 - a.length; 0 < b;)a = "0" + a, b -= 1;
            return a.substr(0, 32)
        }

        function d(a) {
            var b;
            a = a || "";
            b = b || 4;
            for (var c = 0, d = Math.pow(10, b), e = a.length, f = 0; f < e; f += b) {
                var g = parseInt(a.substr(f, b), 16);
                ha(g) && (c = (c + g) % d)
            }
            return c
        }

        function e(a) {
            return !0 === !w(a) || 1 > a.length ? !1 : !0
        }

        var f = null, g = a.exp, k = Jb();
        k || b(c());
        k = Jb();
        if (!0 === !!g && !0 === e(g) && !0 === !!k) {
            f = x({}, a);
            f.expList = "";
            var m = d(k);
            F(g, function (a) {
                var b = ia(a.flow), c = parseInt(b[1] || 0, 10), d = m % parseInt(a.mode || 1E3, 10);
                if (d < parseInt(b[0] ||
                        0, 10) || d >= c)return !0;
                f = x(f, a.config || {});
                f.expList = f.expList ? f.expList + ("_" + a.name) : "" + a.name
            });
            g = "exp&explist=" + f.expList + "&cookieid=" + k + "&url=" + encodeURIComponent(window.location.href) + "&referurl=" + encodeURIComponent(window.document.referrer);
            kb(G(f.unionId || "").replace(/^u/, ""), g)
        }
        return f || a
    }

    function Ob(a) {
        if (a.unionId) {
            a = Nb(a);
            var b = null;
            0 !== a.formList && (b = new Y(new Gb(a || $)), b.n = Mb, b.H());
            a = a || $;
            (0 < parseInt(a.yuetuNopicFormId || 0, 10) || 0 < parseInt(a.yuetuNopicFloatFormId || 0, 10)) && (new Kb(new Hb(a))).H();
            window.baiduImagePlus = {_status: "loaded", _loader: b};
            b || x(window.baiduImagePlus, {
                showAd: function () {
                    return b.ja.apply(b, arguments)
                }, removeAd: function () {
                    return b.Z.apply(b, arguments)
                }, updateAd: function () {
                    return b.ka.apply(b, arguments)
                }, updateAds: function () {
                    return b.Fa.apply(b, arguments)
                }, watchAds: function () {
                    return b.la.apply(b,
                        arguments)
                }, linkAd: function () {
                    return b.Y.apply(b, arguments)
                }, unlinkAd: function () {
                    return b.Xa.apply(b, arguments)
                }, unlinkAds: function () {
                    return b.Ea.apply(b, arguments)
                }
            })
        }
    }

    window.baiduTujia && baidu.sio.log("http://bzclk.baidu.com/loader_repeat.jpg?tu=" + G($.unionId || "").replace(/^u/, "") + "&pageurl=" + encodeURIComponent(window.location.href));
    if ("loading" !== $._status && "loaded" !== $._status) {
        $._status = "loading";
        window.baiduImagePlus = $;
        window.baiduTujia = {config: $};
        Mb.start = (new Date).getTime();
        var Pb = $.api || "http://imageplus.baidu.com/ui", Pb = Pb + (-1 === Pb.indexOf("?") ? "?" : "&") + "api=config&tu=" + G($.unionId || "").replace(/^u/, "") + "&pic=" + document.getElementsByTagName("img").length + "&vn=" + qb;
        baidu.sio.callByServer(Pb, function (a) {
            Mb.site_api_loaded = (new Date).getTime();
            a = a || {};
            var b = x({}, a.union || {});
            0 === parseInt(a.confPriority, 10) ? (b = x(b, a), Ob(x(b,
                $))) : (b = x(b, $), Ob(x(b, a)))
        }, {charset: "gbk", timeOut: 1E4, onfailure: Ob})
    }
    ;

})(/** AD_CONFIG */{}, /** LINKS */[], /** RT_CONFIG */{});
//Tue Aug 30 2016 14:07:29 GMT+0800 (CST)