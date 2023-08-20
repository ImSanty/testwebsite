var V = "@vercel/analytics"
  , J = "0.1.11"
  , N = ()=>{
    window.va || (window.va = function(...e) {
        (window.vaq = window.vaq || []).push(e)
    }
    )
}
;
function X() {
    return typeof window < "u"
}
function Y() {
    try {
        const t = "production";
        return t === "development" || t === "test"
    } catch {
        return !1
    }
}
function Z(t="auto") {
    return t === "auto" ? Y() ? "development" : "production" : t
}
var $ = (t={
    debug: !0
})=>{
    var e;
    if (!X())
        return;
    const n = Z(t.mode);
    N(),
    t.beforeSend && ((e = window.va) == null || e.call(window, "beforeSend", t.beforeSend));
    const r = n === "development" ? "https://cdn.vercel-insights.com/v1/script.debug.js" : "/_vercel/insights/script.js";
    if (document.head.querySelector(`script[src*="${r}"]`))
        return;
    const i = document.createElement("script");
    i.src = r,
    i.defer = !0,
    i.setAttribute("data-sdkn", V),
    i.setAttribute("data-sdkv", J),
    n === "development" && t.debug === !1 && i.setAttribute("data-debug", "false"),
    document.head.appendChild(i)
}
, v, h, j, y, H = -1, p = function(t) {
    addEventListener("pageshow", function(e) {
        e.persisted && (H = e.timeStamp,
        t(e))
    }, !0)
}, L = function() {
    return window.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0]
}, b = function() {
    var t = L();
    return t && t.activationStart || 0
}, d = function(t, e) {
    var n = L()
      , r = "navigate";
    return H >= 0 ? r = "back-forward-cache" : n && (document.prerendering || b() > 0 ? r = "prerender" : document.wasDiscarded ? r = "restore" : n.type && (r = n.type.replace(/_/g, "-"))),
    {
        name: t,
        value: e === void 0 ? -1 : e,
        rating: "good",
        delta: 0,
        entries: [],
        id: "v3-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
        navigationType: r
    }
}, T = function(t, e, n) {
    try {
        if (PerformanceObserver.supportedEntryTypes.includes(t)) {
            var r = new PerformanceObserver(function(i) {
                Promise.resolve().then(function() {
                    e(i.getEntries())
                })
            }
            );
            return r.observe(Object.assign({
                type: t,
                buffered: !0
            }, n || {})),
            r
        }
    } catch {}
}, f = function(t, e, n, r) {
    var i, o;
    return function(c) {
        e.value >= 0 && (c || r) && ((o = e.value - (i || 0)) || i === void 0) && (i = e.value,
        e.delta = o,
        e.rating = function(u, a) {
            return u > a[1] ? "poor" : u > a[0] ? "needs-improvement" : "good"
        }(e.value, n),
        t(e))
    }
}, C = function(t) {
    requestAnimationFrame(function() {
        return requestAnimationFrame(function() {
            return t()
        })
    })
}, A = function(t) {
    var e = function(n) {
        n.type !== "pagehide" && document.visibilityState !== "hidden" || t(n)
    };
    addEventListener("visibilitychange", e, !0),
    addEventListener("pagehide", e, !0)
}, k = function(t) {
    var e = !1;
    return function(n) {
        e || (t(n),
        e = !0)
    }
}, l = -1, D = function() {
    return document.visibilityState !== "hidden" || document.prerendering ? 1 / 0 : 0
}, w = function(t) {
    document.visibilityState === "hidden" && l > -1 && (l = t.type === "visibilitychange" ? t.timeStamp : 0,
    G())
}, F = function() {
    addEventListener("visibilitychange", w, !0),
    addEventListener("prerenderingchange", w, !0)
}, G = function() {
    removeEventListener("visibilitychange", w, !0),
    removeEventListener("prerenderingchange", w, !0)
}, P = function() {
    return l < 0 && (l = D(),
    F(),
    p(function() {
        setTimeout(function() {
            l = D(),
            F()
        }, 0)
    })),
    {
        get firstHiddenTime() {
            return l
        }
    }
}, E = function(t) {
    document.prerendering ? addEventListener("prerenderingchange", function() {
        return t()
    }, !0) : t()
}, B = [1800, 3e3], _ = function(t, e) {
    e = e || {},
    E(function() {
        var n, r = P(), i = d("FCP"), o = T("paint", function(c) {
            c.forEach(function(u) {
                u.name === "first-contentful-paint" && (o.disconnect(),
                u.startTime < r.firstHiddenTime && (i.value = Math.max(u.startTime - b(), 0),
                i.entries.push(u),
                n(!0)))
            })
        });
        o && (n = f(t, i, B, e.reportAllChanges),
        p(function(c) {
            i = d("FCP"),
            n = f(t, i, B, e.reportAllChanges),
            C(function() {
                i.value = performance.now() - c.timeStamp,
                n(!0)
            })
        }))
    })
}, M = [.1, .25], K = function(t, e) {
    e = e || {},
    _(k(function() {
        var n, r = d("CLS", 0), i = 0, o = [], c = function(a) {
            a.forEach(function(s) {
                if (!s.hadRecentInput) {
                    var W = o[0]
                      , z = o[o.length - 1];
                    i && s.startTime - z.startTime < 1e3 && s.startTime - W.startTime < 5e3 ? (i += s.value,
                    o.push(s)) : (i = s.value,
                    o = [s])
                }
            }),
            i > r.value && (r.value = i,
            r.entries = o,
            n())
        }, u = T("layout-shift", c);
        u && (n = f(t, r, M, e.reportAllChanges),
        A(function() {
            c(u.takeRecords()),
            n(!0)
        }),
        p(function() {
            i = 0,
            r = d("CLS", 0),
            n = f(t, r, M, e.reportAllChanges),
            C(function() {
                return n()
            })
        }),
        setTimeout(n, 0))
    }))
}, g = {
    passive: !0,
    capture: !0
}, ee = new Date, q = function(t, e) {
    v || (v = e,
    h = t,
    j = new Date,
    U(removeEventListener),
    Q())
}, Q = function() {
    if (h >= 0 && h < j - ee) {
        var t = {
            entryType: "first-input",
            name: v.type,
            target: v.target,
            cancelable: v.cancelable,
            startTime: v.timeStamp,
            processingStart: v.timeStamp + h
        };
        y.forEach(function(e) {
            e(t)
        }),
        y = []
    }
}, te = function(t) {
    if (t.cancelable) {
        var e = (t.timeStamp > 1e12 ? new Date : performance.now()) - t.timeStamp;
        t.type == "pointerdown" ? function(n, r) {
            var i = function() {
                q(n, r),
                c()
            }
              , o = function() {
                c()
            }
              , c = function() {
                removeEventListener("pointerup", i, g),
                removeEventListener("pointercancel", o, g)
            };
            addEventListener("pointerup", i, g),
            addEventListener("pointercancel", o, g)
        }(e, t) : q(e, t)
    }
}, U = function(t) {
    ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function(e) {
        return t(e, te, g)
    })
}, x = [100, 300], ne = function(t, e) {
    e = e || {},
    E(function() {
        var n, r = P(), i = d("FID"), o = function(a) {
            a.startTime < r.firstHiddenTime && (i.value = a.processingStart - a.startTime,
            i.entries.push(a),
            n(!0))
        }, c = function(a) {
            a.forEach(o)
        }, u = T("first-input", c);
        n = f(t, i, x, e.reportAllChanges),
        u && A(k(function() {
            c(u.takeRecords()),
            u.disconnect()
        })),
        u && p(function() {
            var a;
            i = d("FID"),
            n = f(t, i, x, e.reportAllChanges),
            y = [],
            h = -1,
            v = null,
            U(addEventListener),
            a = o,
            y.push(a),
            Q()
        })
    })
}, I = [2500, 4e3], S = {}, ie = function(t, e) {
    e = e || {},
    E(function() {
        var n, r = P(), i = d("LCP"), o = function(a) {
            var s = a[a.length - 1];
            s && s.startTime < r.firstHiddenTime && (i.value = Math.max(s.startTime - b(), 0),
            i.entries = [s],
            n())
        }, c = T("largest-contentful-paint", o);
        if (c) {
            n = f(t, i, I, e.reportAllChanges);
            var u = k(function() {
                S[i.id] || (o(c.takeRecords()),
                c.disconnect(),
                S[i.id] = !0,
                n(!0))
            });
            ["keydown", "click"].forEach(function(a) {
                addEventListener(a, u, !0)
            }),
            A(u),
            p(function(a) {
                i = d("LCP"),
                n = f(t, i, I, e.reportAllChanges),
                C(function() {
                    i.value = performance.now() - a.timeStamp,
                    S[i.id] = !0,
                    n(!0)
                })
            })
        }
    })
}, O = [800, 1800], re = function t(e) {
    document.prerendering ? E(function() {
        return t(e)
    }) : document.readyState !== "complete" ? addEventListener("load", function() {
        return t(e)
    }, !0) : setTimeout(e, 0)
}, oe = function(t, e) {
    e = e || {};
    var n = d("TTFB")
      , r = f(t, n, O, e.reportAllChanges);
    re(function() {
        var i = L();
        if (i) {
            var o = i.responseStart;
            if (o <= 0 || o > performance.now())
                return;
            n.value = Math.max(o - b(), 0),
            n.entries = [i],
            r(!0),
            p(function() {
                n = d("TTFB", 0),
                (r = f(t, n, O, e.reportAllChanges))(!0)
            })
        }
    })
};
const R = "https://vitals.vercel-analytics.com/v1/vitals"
  , ae = ()=>"connection"in navigator && navigator.connection && "effectiveType"in navigator.connection ? navigator.connection.effectiveType : ""
  , m = (t,e)=>{
    const n = {
        dsn: e.analyticsId,
        id: t.id,
        page: e.path,
        href: location.href,
        event_name: t.name,
        value: t.value.toString(),
        speed: ae()
    }
      , r = new Blob([new URLSearchParams(n).toString()],{
        type: "application/x-www-form-urlencoded"
    });
    navigator.sendBeacon ? navigator.sendBeacon(R, r) : fetch(R, {
        body: r,
        method: "POST",
        credentials: "omit",
        keepalive: !0
    })
}
;
function ce() {
    const t = "Qq3O80eQtf3gLrgWnNzWJgCsbxz"
      , e = {
        path: window.location.pathname,
        analyticsId: t
    };
    try {
        ne(n=>m(n, e)),
        oe(n=>m(n, e)),
        ie(n=>m(n, e)),
        K(n=>m(n, e)),
        _(n=>m(n, e))
    } catch (n) {
        console.error("[Analytics]", n)
    }
}
const ue = "production";
$({
    mode: ue
});
ce();
