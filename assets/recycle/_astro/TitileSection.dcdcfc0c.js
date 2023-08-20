import {r as b, R as fs} from "./index.03be2d59.js";
const ds = b.createContext({
    transformPagePoint: t=>t,
    isStatic: !1,
    reducedMotion: "never"
})
  , Xt = b.createContext({})
  , Ee = b.createContext(null)
  , qt = typeof document < "u"
  , an = qt ? b.useLayoutEffect : b.useEffect
  , ms = b.createContext({
    strict: !1
});
function Oi(t, e, n, s) {
    const {visualElement: i} = b.useContext(Xt)
      , o = b.useContext(ms)
      , r = b.useContext(Ee)
      , a = b.useContext(ds).reducedMotion
      , l = b.useRef();
    s = s || o.renderer,
    !l.current && s && (l.current = s(t, {
        visualState: e,
        parent: i,
        props: n,
        presenceContext: r,
        blockInitialAnimation: r ? r.initial === !1 : !1,
        reducedMotionConfig: a
    }));
    const c = l.current;
    return b.useInsertionEffect(()=>{
        c && c.update(n, r)
    }
    ),
    an(()=>{
        c && c.render()
    }
    ),
    b.useEffect(()=>{
        c && c.updateFeatures()
    }
    ),
    (window.HandoffAppearAnimations ? an : b.useEffect)(()=>{
        c && c.animationState && c.animationState.animateChanges()
    }
    ),
    c
}
function ft(t) {
    return typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current")
}
function Ii(t, e, n) {
    return b.useCallback(s=>{
        s && t.mount && t.mount(s),
        e && (s ? e.mount(s) : e.unmount()),
        n && (typeof n == "function" ? n(s) : ft(n) && (n.current = s))
    }
    , [e])
}
function Ct(t) {
    return typeof t == "string" || Array.isArray(t)
}
function Zt(t) {
    return typeof t == "object" && typeof t.start == "function"
}
const Fe = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"]
  , Be = ["initial", ...Fe];
function Jt(t) {
    return Zt(t.animate) || Be.some(e=>Ct(t[e]))
}
function ps(t) {
    return !!(Jt(t) || t.variants)
}
function Ui(t, e) {
    if (Jt(t)) {
        const {initial: n, animate: s} = t;
        return {
            initial: n === !1 || Ct(n) ? n : void 0,
            animate: Ct(s) ? s : void 0
        }
    }
    return t.inherit !== !1 ? e : {}
}
function Ni(t) {
    const {initial: e, animate: n} = Ui(t, b.useContext(Xt));
    return b.useMemo(()=>({
        initial: e,
        animate: n
    }), [ln(e), ln(n)])
}
function ln(t) {
    return Array.isArray(t) ? t.join(" ") : t
}
const cn = {
    animation: ["animate", "variants", "whileHover", "whileTap", "exit", "whileInView", "whileFocus", "whileDrag"],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"]
}
  , wt = {};
for (const t in cn)
    wt[t] = {
        isEnabled: e=>cn[t].some(n=>!!e[n])
    };
function Gi(t) {
    for (const e in t)
        wt[e] = {
            ...wt[e],
            ...t[e]
        }
}
const gs = b.createContext({})
  , ys = b.createContext({})
  , Wi = Symbol.for("motionComponentSymbol");
function $i({preloadedFeatures: t, createVisualElement: e, useRender: n, useVisualState: s, Component: i}) {
    t && Gi(t);
    function o(a, l) {
        let c;
        const u = {
            ...b.useContext(ds),
            ...a,
            layoutId: _i(a)
        }
          , {isStatic: h} = u
          , f = Ni(a)
          , d = s(a, h);
        if (!h && qt) {
            f.visualElement = Oi(i, d, u, e);
            const m = b.useContext(ys)
              , p = b.useContext(ms).strict;
            f.visualElement && (c = f.visualElement.loadFeatures(u, p, t, m))
        }
        return b.createElement(Xt.Provider, {
            value: f
        }, c && f.visualElement ? b.createElement(c, {
            visualElement: f.visualElement,
            ...u
        }) : null, n(i, a, Ii(d, f.visualElement, l), d, h, f.visualElement))
    }
    const r = b.forwardRef(o);
    return r[Wi] = i,
    r
}
function _i({layoutId: t}) {
    const e = b.useContext(gs).id;
    return e && t !== void 0 ? e + "-" + t : t
}
function Hi(t) {
    function e(s, i={}) {
        return $i(t(s, i))
    }
    if (typeof Proxy > "u")
        return e;
    const n = new Map;
    return new Proxy(e,{
        get: (s,i)=>(n.has(i) || n.set(i, e(i)),
        n.get(i))
    })
}
const zi = ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "switch", "symbol", "svg", "text", "tspan", "use", "view"];
function ke(t) {
    return typeof t != "string" || t.includes("-") ? !1 : !!(zi.indexOf(t) > -1 || /[A-Z]/.test(t))
}
const Gt = {};
function Ki(t) {
    Object.assign(Gt, t)
}
const Lt = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"]
  , lt = new Set(Lt);
function vs(t, {layout: e, layoutId: n}) {
    return lt.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!Gt[t] || t === "opacity")
}
const O = t=>!!(t && t.getVelocity)
  , Yi = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective"
}
  , Xi = Lt.length;
function qi(t, {enableHardwareAcceleration: e=!0, allowTransformNone: n=!0}, s, i) {
    let o = "";
    for (let r = 0; r < Xi; r++) {
        const a = Lt[r];
        if (t[a] !== void 0) {
            const l = Yi[a] || a;
            o += `${l}(${t[a]}) `
        }
    }
    return e && !t.z && (o += "translateZ(0)"),
    o = o.trim(),
    i ? o = i(t, s ? "" : o) : n && s && (o = "none"),
    o
}
const xs = t=>e=>typeof e == "string" && e.startsWith(t)
  , Ps = xs("--")
  , ye = xs("var(--")
  , Zi = /var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)/g
  , Ji = (t,e)=>e && typeof t == "number" ? e.transform(t) : t
  , tt = (t,e,n)=>Math.min(Math.max(n, t), e)
  , ct = {
    test: t=>typeof t == "number",
    parse: parseFloat,
    transform: t=>t
}
  , bt = {
    ...ct,
    transform: t=>tt(0, 1, t)
}
  , jt = {
    ...ct,
    default: 1
}
  , Vt = t=>Math.round(t * 1e5) / 1e5
  , Qt = /(-)?([\d]*\.?[\d])+/g
  , Ts = /(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi
  , Qi = /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function Rt(t) {
    return typeof t == "string"
}
const Et = t=>({
    test: e=>Rt(e) && e.endsWith(t) && e.split(" ").length === 1,
    parse: parseFloat,
    transform: e=>`${e}${t}`
})
  , q = Et("deg")
  , G = Et("%")
  , x = Et("px")
  , tr = Et("vh")
  , er = Et("vw")
  , un = {
    ...G,
    parse: t=>G.parse(t) / 100,
    transform: t=>G.transform(t * 100)
}
  , hn = {
    ...ct,
    transform: Math.round
}
  , bs = {
    borderWidth: x,
    borderTopWidth: x,
    borderRightWidth: x,
    borderBottomWidth: x,
    borderLeftWidth: x,
    borderRadius: x,
    radius: x,
    borderTopLeftRadius: x,
    borderTopRightRadius: x,
    borderBottomRightRadius: x,
    borderBottomLeftRadius: x,
    width: x,
    maxWidth: x,
    height: x,
    maxHeight: x,
    size: x,
    top: x,
    right: x,
    bottom: x,
    left: x,
    padding: x,
    paddingTop: x,
    paddingRight: x,
    paddingBottom: x,
    paddingLeft: x,
    margin: x,
    marginTop: x,
    marginRight: x,
    marginBottom: x,
    marginLeft: x,
    rotate: q,
    rotateX: q,
    rotateY: q,
    rotateZ: q,
    scale: jt,
    scaleX: jt,
    scaleY: jt,
    scaleZ: jt,
    skew: q,
    skewX: q,
    skewY: q,
    distance: x,
    translateX: x,
    translateY: x,
    translateZ: x,
    x,
    y: x,
    z: x,
    perspective: x,
    transformPerspective: x,
    opacity: bt,
    originX: un,
    originY: un,
    originZ: x,
    zIndex: hn,
    fillOpacity: bt,
    strokeOpacity: bt,
    numOctaves: hn
};
function je(t, e, n, s) {
    const {style: i, vars: o, transform: r, transformOrigin: a} = t;
    let l = !1
      , c = !1
      , u = !0;
    for (const h in e) {
        const f = e[h];
        if (Ps(h)) {
            o[h] = f;
            continue
        }
        const d = bs[h]
          , m = Ji(f, d);
        if (lt.has(h)) {
            if (l = !0,
            r[h] = m,
            !u)
                continue;
            f !== (d.default || 0) && (u = !1)
        } else
            h.startsWith("origin") ? (c = !0,
            a[h] = m) : i[h] = m
    }
    if (e.transform || (l || s ? i.transform = qi(t.transform, n, u, s) : i.transform && (i.transform = "none")),
    c) {
        const {originX: h="50%", originY: f="50%", originZ: d=0} = a;
        i.transformOrigin = `${h} ${f} ${d}`
    }
}
const Oe = ()=>({
    style: {},
    transform: {},
    transformOrigin: {},
    vars: {}
});
function Vs(t, e, n) {
    for (const s in e)
        !O(e[s]) && !vs(s, n) && (t[s] = e[s])
}
function nr({transformTemplate: t}, e, n) {
    return b.useMemo(()=>{
        const s = Oe();
        return je(s, e, {
            enableHardwareAcceleration: !n
        }, t),
        Object.assign({}, s.vars, s.style)
    }
    , [e])
}
function sr(t, e, n) {
    const s = t.style || {}
      , i = {};
    return Vs(i, s, t),
    Object.assign(i, nr(t, e, n)),
    t.transformValues ? t.transformValues(i) : i
}
function ir(t, e, n) {
    const s = {}
      , i = sr(t, e, n);
    return t.drag && t.dragListener !== !1 && (s.draggable = !1,
    i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none",
    i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`),
    t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (s.tabIndex = 0),
    s.style = i,
    s
}
const rr = new Set(["animate", "exit", "variants", "initial", "style", "values", "variants", "transition", "transformTemplate", "transformValues", "custom", "inherit", "onLayoutAnimationStart", "onLayoutAnimationComplete", "onLayoutMeasure", "onBeforeLayoutMeasure", "onAnimationStart", "onAnimationComplete", "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock", "onDragTransitionEnd", "_dragX", "_dragY", "onHoverStart", "onHoverEnd", "onViewportEnter", "onViewportLeave", "ignoreStrict", "viewport"]);
function Wt(t) {
    return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || rr.has(t)
}
let Ss = t=>!Wt(t);
function or(t) {
    t && (Ss = e=>e.startsWith("on") ? !Wt(e) : t(e))
}
try {
    or(require("@emotion/is-prop-valid").default)
} catch {}
function ar(t, e, n) {
    const s = {};
    for (const i in t)
        i === "values" && typeof t.values == "object" || (Ss(i) || n === !0 && Wt(i) || !e && !Wt(i) || t.draggable && i.startsWith("onDrag")) && (s[i] = t[i]);
    return s
}
function fn(t, e, n) {
    return typeof t == "string" ? t : x.transform(e + n * t)
}
function lr(t, e, n) {
    const s = fn(e, t.x, t.width)
      , i = fn(n, t.y, t.height);
    return `${s} ${i}`
}
const cr = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray"
}
  , ur = {
    offset: "strokeDashoffset",
    array: "strokeDasharray"
};
function hr(t, e, n=1, s=0, i=!0) {
    t.pathLength = 1;
    const o = i ? cr : ur;
    t[o.offset] = x.transform(-s);
    const r = x.transform(e)
      , a = x.transform(n);
    t[o.array] = `${r} ${a}`
}
function Ie(t, {attrX: e, attrY: n, attrScale: s, originX: i, originY: o, pathLength: r, pathSpacing: a=1, pathOffset: l=0, ...c}, u, h, f) {
    if (je(t, c, u, f),
    h) {
        t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
        return
    }
    t.attrs = t.style,
    t.style = {};
    const {attrs: d, style: m, dimensions: p} = t;
    d.transform && (p && (m.transform = d.transform),
    delete d.transform),
    p && (i !== void 0 || o !== void 0 || m.transform) && (m.transformOrigin = lr(p, i !== void 0 ? i : .5, o !== void 0 ? o : .5)),
    e !== void 0 && (d.x = e),
    n !== void 0 && (d.y = n),
    s !== void 0 && (d.scale = s),
    r !== void 0 && hr(d, r, a, l, !1)
}
const As = ()=>({
    ...Oe(),
    attrs: {}
})
  , Ue = t=>typeof t == "string" && t.toLowerCase() === "svg";
function fr(t, e, n, s) {
    const i = b.useMemo(()=>{
        const o = As();
        return Ie(o, e, {
            enableHardwareAcceleration: !1
        }, Ue(s), t.transformTemplate),
        {
            ...o.attrs,
            style: {
                ...o.style
            }
        }
    }
    , [e]);
    if (t.style) {
        const o = {};
        Vs(o, t.style, t),
        i.style = {
            ...o,
            ...i.style
        }
    }
    return i
}
function dr(t=!1) {
    return (n,s,i,{latestValues: o},r)=>{
        const l = (ke(n) ? fr : ir)(s, o, r, n)
          , u = {
            ...ar(s, typeof n == "string", t),
            ...l,
            ref: i
        }
          , {children: h} = s
          , f = b.useMemo(()=>O(h) ? h.get() : h, [h]);
        return b.createElement(n, {
            ...u,
            children: f
        })
    }
}
const Ne = t=>t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
function Cs(t, {style: e, vars: n}, s, i) {
    Object.assign(t.style, e, i && i.getProjectionStyles(s));
    for (const o in n)
        t.style.setProperty(o, n[o])
}
const ws = new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes", "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale", "specularConstant", "specularExponent", "stdDeviation", "tableValues", "viewBox", "gradientTransform", "pathLength", "startOffset", "textLength", "lengthAdjust"]);
function Ds(t, e, n, s) {
    Cs(t, e, void 0, s);
    for (const i in e.attrs)
        t.setAttribute(ws.has(i) ? i : Ne(i), e.attrs[i])
}
function Ge(t, e) {
    const {style: n} = t
      , s = {};
    for (const i in n)
        (O(n[i]) || e.style && O(e.style[i]) || vs(i, t)) && (s[i] = n[i]);
    return s
}
function Ms(t, e) {
    const n = Ge(t, e);
    for (const s in t)
        if (O(t[s]) || O(e[s])) {
            const i = Lt.indexOf(s) !== -1 ? "attr" + s.charAt(0).toUpperCase() + s.substring(1) : s;
            n[i] = t[s]
        }
    return n
}
function We(t, e, n, s={}, i={}) {
    return typeof e == "function" && (e = e(n !== void 0 ? n : t.custom, s, i)),
    typeof e == "string" && (e = t.variants && t.variants[e]),
    typeof e == "function" && (e = e(n !== void 0 ? n : t.custom, s, i)),
    e
}
function mr(t) {
    const e = b.useRef(null);
    return e.current === null && (e.current = t()),
    e.current
}
const $t = t=>Array.isArray(t)
  , pr = t=>!!(t && typeof t == "object" && t.mix && t.toValue)
  , gr = t=>$t(t) ? t[t.length - 1] || 0 : t;
function Ut(t) {
    const e = O(t) ? t.get() : t;
    return pr(e) ? e.toValue() : e
}
function yr({scrapeMotionValuesFromProps: t, createRenderState: e, onMount: n}, s, i, o) {
    const r = {
        latestValues: vr(s, i, o, t),
        renderState: e()
    };
    return n && (r.mount = a=>n(s, a, r)),
    r
}
const Ls = t=>(e,n)=>{
    const s = b.useContext(Xt)
      , i = b.useContext(Ee)
      , o = ()=>yr(t, e, s, i);
    return n ? o() : mr(o)
}
;
function vr(t, e, n, s) {
    const i = {}
      , o = s(t, {});
    for (const f in o)
        i[f] = Ut(o[f]);
    let {initial: r, animate: a} = t;
    const l = Jt(t)
      , c = ps(t);
    e && c && !l && t.inherit !== !1 && (r === void 0 && (r = e.initial),
    a === void 0 && (a = e.animate));
    let u = n ? n.initial === !1 : !1;
    u = u || r === !1;
    const h = u ? a : r;
    return h && typeof h != "boolean" && !Zt(h) && (Array.isArray(h) ? h : [h]).forEach(d=>{
        const m = We(t, d);
        if (!m)
            return;
        const {transitionEnd: p, transition: T, ...v} = m;
        for (const y in v) {
            let g = v[y];
            if (Array.isArray(g)) {
                const P = u ? g.length - 1 : 0;
                g = g[P]
            }
            g !== null && (i[y] = g)
        }
        for (const y in p)
            i[y] = p[y]
    }
    ),
    i
}
const xr = {
    useVisualState: Ls({
        scrapeMotionValuesFromProps: Ms,
        createRenderState: As,
        onMount: (t,e,{renderState: n, latestValues: s})=>{
            try {
                n.dimensions = typeof e.getBBox == "function" ? e.getBBox() : e.getBoundingClientRect()
            } catch {
                n.dimensions = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }
            }
            Ie(n, s, {
                enableHardwareAcceleration: !1
            }, Ue(e.tagName), t.transformTemplate),
            Ds(e, n)
        }
    })
}
  , Pr = {
    useVisualState: Ls({
        scrapeMotionValuesFromProps: Ge,
        createRenderState: Oe
    })
};
function Tr(t, {forwardMotionProps: e=!1}, n, s) {
    return {
        ...ke(t) ? xr : Pr,
        preloadedFeatures: n,
        useRender: dr(e),
        createVisualElement: s,
        Component: t
    }
}
function _(t, e, n, s={
    passive: !0
}) {
    return t.addEventListener(e, n, s),
    ()=>t.removeEventListener(e, n)
}
const Rs = t=>t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1;
function te(t, e="page") {
    return {
        point: {
            x: t[e + "X"],
            y: t[e + "Y"]
        }
    }
}
const br = t=>e=>Rs(e) && t(e, te(e));
function H(t, e, n, s) {
    return _(t, e, br(n), s)
}
const Vr = (t,e)=>n=>e(t(n))
  , J = (...t)=>t.reduce(Vr);
function Es(t) {
    let e = null;
    return ()=>{
        const n = ()=>{
            e = null
        }
        ;
        return e === null ? (e = t,
        n) : !1
    }
}
const dn = Es("dragHorizontal")
  , mn = Es("dragVertical");
function Fs(t) {
    let e = !1;
    if (t === "y")
        e = mn();
    else if (t === "x")
        e = dn();
    else {
        const n = dn()
          , s = mn();
        n && s ? e = ()=>{
            n(),
            s()
        }
        : (n && n(),
        s && s())
    }
    return e
}
function Bs() {
    const t = Fs(!0);
    return t ? (t(),
    !1) : !0
}
class nt {
    constructor(e) {
        this.isMounted = !1,
        this.node = e
    }
    update() {}
}
function Sr(t) {
    let e = []
      , n = []
      , s = 0
      , i = !1
      , o = !1;
    const r = new WeakSet
      , a = {
        schedule: (l,c=!1,u=!1)=>{
            const h = u && i
              , f = h ? e : n;
            return c && r.add(l),
            f.indexOf(l) === -1 && (f.push(l),
            h && i && (s = e.length)),
            l
        }
        ,
        cancel: l=>{
            const c = n.indexOf(l);
            c !== -1 && n.splice(c, 1),
            r.delete(l)
        }
        ,
        process: l=>{
            if (i) {
                o = !0;
                return
            }
            if (i = !0,
            [e,n] = [n, e],
            n.length = 0,
            s = e.length,
            s)
                for (let c = 0; c < s; c++) {
                    const u = e[c];
                    u(l),
                    r.has(u) && (a.schedule(u),
                    t())
                }
            i = !1,
            o && (o = !1,
            a.process(l))
        }
    };
    return a
}
const A = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
}
  , Ar = 40;
let ve = !0
  , Dt = !1;
const ee = ["read", "update", "preRender", "render", "postRender"]
  , gt = ee.reduce((t,e)=>(t[e] = Sr(()=>Dt = !0),
t), {})
  , Cr = t=>gt[t].process(A)
  , ks = t=>{
    Dt = !1,
    A.delta = ve ? 1e3 / 60 : Math.max(Math.min(t - A.timestamp, Ar), 1),
    A.timestamp = t,
    A.isProcessing = !0,
    ee.forEach(Cr),
    A.isProcessing = !1,
    Dt && (ve = !1,
    requestAnimationFrame(ks))
}
  , wr = ()=>{
    Dt = !0,
    ve = !0,
    A.isProcessing || requestAnimationFrame(ks)
}
  , w = ee.reduce((t,e)=>{
    const n = gt[e];
    return t[e] = (s,i=!1,o=!1)=>(Dt || wr(),
    n.schedule(s, i, o)),
    t
}
, {});
function K(t) {
    ee.forEach(e=>gt[e].cancel(t))
}
function pn(t, e) {
    const n = "pointer" + (e ? "enter" : "leave")
      , s = "onHover" + (e ? "Start" : "End")
      , i = (o,r)=>{
        if (o.type === "touch" || Bs())
            return;
        const a = t.getProps();
        t.animationState && a.whileHover && t.animationState.setActive("whileHover", e),
        a[s] && w.update(()=>a[s](o, r))
    }
    ;
    return H(t.current, n, i, {
        passive: !t.getProps()[s]
    })
}
class Dr extends nt {
    mount() {
        this.unmount = J(pn(this.node, !0), pn(this.node, !1))
    }
    unmount() {}
}
class Mr extends nt {
    constructor() {
        super(...arguments),
        this.isActive = !1
    }
    onFocus() {
        let e = !1;
        try {
            e = this.node.current.matches(":focus-visible")
        } catch {
            e = !0
        }
        !e || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0),
        this.isActive = !0)
    }
    onBlur() {
        !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1),
        this.isActive = !1)
    }
    mount() {
        this.unmount = J(_(this.node.current, "focus", ()=>this.onFocus()), _(this.node.current, "blur", ()=>this.onBlur()))
    }
    unmount() {}
}
const js = (t,e)=>e ? t === e ? !0 : js(t, e.parentElement) : !1
  , F = t=>t;
function re(t, e) {
    if (!e)
        return;
    const n = new PointerEvent("pointer" + t);
    e(n, te(n))
}
class Lr extends nt {
    constructor() {
        super(...arguments),
        this.removeStartListeners = F,
        this.removeEndListeners = F,
        this.removeAccessibleListeners = F,
        this.startPointerPress = (e,n)=>{
            if (this.removeEndListeners(),
            this.isPressing)
                return;
            const s = this.node.getProps()
              , o = H(window, "pointerup", (a,l)=>{
                if (!this.checkPressEnd())
                    return;
                const {onTap: c, onTapCancel: u} = this.node.getProps();
                w.update(()=>{
                    js(this.node.current, a.target) ? c && c(a, l) : u && u(a, l)
                }
                )
            }
            , {
                passive: !(s.onTap || s.onPointerUp)
            })
              , r = H(window, "pointercancel", (a,l)=>this.cancelPress(a, l), {
                passive: !(s.onTapCancel || s.onPointerCancel)
            });
            this.removeEndListeners = J(o, r),
            this.startPress(e, n)
        }
        ,
        this.startAccessiblePress = ()=>{
            const e = o=>{
                if (o.key !== "Enter" || this.isPressing)
                    return;
                const r = a=>{
                    a.key !== "Enter" || !this.checkPressEnd() || re("up", (l,c)=>{
                        const {onTap: u} = this.node.getProps();
                        u && w.update(()=>u(l, c))
                    }
                    )
                }
                ;
                this.removeEndListeners(),
                this.removeEndListeners = _(this.node.current, "keyup", r),
                re("down", (a,l)=>{
                    this.startPress(a, l)
                }
                )
            }
              , n = _(this.node.current, "keydown", e)
              , s = ()=>{
                this.isPressing && re("cancel", (o,r)=>this.cancelPress(o, r))
            }
              , i = _(this.node.current, "blur", s);
            this.removeAccessibleListeners = J(n, i)
        }
    }
    startPress(e, n) {
        this.isPressing = !0;
        const {onTapStart: s, whileTap: i} = this.node.getProps();
        i && this.node.animationState && this.node.animationState.setActive("whileTap", !0),
        s && w.update(()=>s(e, n))
    }
    checkPressEnd() {
        return this.removeEndListeners(),
        this.isPressing = !1,
        this.node.getProps().whileTap && this.node.animationState && this.node.animationState.setActive("whileTap", !1),
        !Bs()
    }
    cancelPress(e, n) {
        if (!this.checkPressEnd())
            return;
        const {onTapCancel: s} = this.node.getProps();
        s && w.update(()=>s(e, n))
    }
    mount() {
        const e = this.node.getProps()
          , n = H(this.node.current, "pointerdown", this.startPointerPress, {
            passive: !(e.onTapStart || e.onPointerStart)
        })
          , s = _(this.node.current, "focus", this.startAccessiblePress);
        this.removeStartListeners = J(n, s)
    }
    unmount() {
        this.removeStartListeners(),
        this.removeEndListeners(),
        this.removeAccessibleListeners()
    }
}
const xe = new WeakMap
  , oe = new WeakMap
  , Rr = t=>{
    const e = xe.get(t.target);
    e && e(t)
}
  , Er = t=>{
    t.forEach(Rr)
}
;
function Fr({root: t, ...e}) {
    const n = t || document;
    oe.has(n) || oe.set(n, {});
    const s = oe.get(n)
      , i = JSON.stringify(e);
    return s[i] || (s[i] = new IntersectionObserver(Er,{
        root: t,
        ...e
    })),
    s[i]
}
function Br(t, e, n) {
    const s = Fr(e);
    return xe.set(t, n),
    s.observe(t),
    ()=>{
        xe.delete(t),
        s.unobserve(t)
    }
}
const kr = {
    some: 0,
    all: 1
};
class jr extends nt {
    constructor() {
        super(...arguments),
        this.hasEnteredView = !1,
        this.isInView = !1
    }
    startObserver() {
        this.unmount();
        const {viewport: e={}} = this.node.getProps()
          , {root: n, margin: s, amount: i="some", once: o} = e
          , r = {
            root: n ? n.current : void 0,
            rootMargin: s,
            threshold: typeof i == "number" ? i : kr[i]
        }
          , a = l=>{
            const {isIntersecting: c} = l;
            if (this.isInView === c || (this.isInView = c,
            o && !c && this.hasEnteredView))
                return;
            c && (this.hasEnteredView = !0),
            this.node.animationState && this.node.animationState.setActive("whileInView", c);
            const {onViewportEnter: u, onViewportLeave: h} = this.node.getProps()
              , f = c ? u : h;
            f && f(l)
        }
        ;
        return Br(this.node.current, r, a)
    }
    mount() {
        this.startObserver()
    }
    update() {
        if (typeof IntersectionObserver > "u")
            return;
        const {props: e, prevProps: n} = this.node;
        ["amount", "margin", "root"].some(Or(e, n)) && this.startObserver()
    }
    unmount() {}
}
function Or({viewport: t={}}, {viewport: e={}}={}) {
    return n=>t[n] !== e[n]
}
const Ir = {
    inView: {
        Feature: jr
    },
    tap: {
        Feature: Lr
    },
    focus: {
        Feature: Mr
    },
    hover: {
        Feature: Dr
    }
};
function Os(t, e) {
    if (!Array.isArray(e))
        return !1;
    const n = e.length;
    if (n !== t.length)
        return !1;
    for (let s = 0; s < n; s++)
        if (e[s] !== t[s])
            return !1;
    return !0
}
function Ur(t) {
    const e = {};
    return t.values.forEach((n,s)=>e[s] = n.get()),
    e
}
function Nr(t) {
    const e = {};
    return t.values.forEach((n,s)=>e[s] = n.getVelocity()),
    e
}
function ne(t, e, n) {
    const s = t.getProps();
    return We(s, e, n !== void 0 ? n : s.custom, Ur(t), Nr(t))
}
const Gr = "framerAppearId"
  , Wr = "data-" + Ne(Gr);
let $r = F
  , $e = F;
const Q = t=>t * 1e3
  , z = t=>t / 1e3
  , _r = {
    current: !1
}
  , Is = t=>Array.isArray(t) && typeof t[0] == "number";
function Us(t) {
    return !!(!t || typeof t == "string" && Ns[t] || Is(t) || Array.isArray(t) && t.every(Us))
}
const Tt = ([t,e,n,s])=>`cubic-bezier(${t}, ${e}, ${n}, ${s})`
  , Ns = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: Tt([0, .65, .55, 1]),
    circOut: Tt([.55, 0, 1, .45]),
    backIn: Tt([.31, .01, .66, -.59]),
    backOut: Tt([.33, 1.53, .69, .99])
};
function Gs(t) {
    if (t)
        return Is(t) ? Tt(t) : Array.isArray(t) ? t.map(Gs) : Ns[t]
}
function Hr(t, e, n, {delay: s=0, duration: i, repeat: o=0, repeatType: r="loop", ease: a, times: l}={}) {
    const c = {
        [e]: n
    };
    l && (c.offset = l);
    const u = Gs(a);
    return Array.isArray(u) && (c.easing = u),
    t.animate(c, {
        delay: s,
        duration: i,
        easing: Array.isArray(u) ? "linear" : u,
        fill: "both",
        iterations: o + 1,
        direction: r === "reverse" ? "alternate" : "normal"
    })
}
const gn = {
    waapi: ()=>Object.hasOwnProperty.call(Element.prototype, "animate")
}
  , ae = {}
  , Ws = {};
for (const t in gn)
    Ws[t] = ()=>(ae[t] === void 0 && (ae[t] = gn[t]()),
    ae[t]);
function zr(t, {repeat: e, repeatType: n="loop"}) {
    const s = e && n !== "loop" && e % 2 === 1 ? 0 : t.length - 1;
    return t[s]
}
const $s = (t,e,n)=>(((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t
  , Kr = 1e-7
  , Yr = 12;
function Xr(t, e, n, s, i) {
    let o, r, a = 0;
    do
        r = e + (n - e) / 2,
        o = $s(r, s, i) - t,
        o > 0 ? n = r : e = r;
    while (Math.abs(o) > Kr && ++a < Yr);
    return r
}
function Ft(t, e, n, s) {
    if (t === e && n === s)
        return F;
    const i = o=>Xr(o, 0, 1, t, n);
    return o=>o === 0 || o === 1 ? o : $s(i(o), e, s)
}
const qr = Ft(.42, 0, 1, 1)
  , Zr = Ft(0, 0, .58, 1)
  , _s = Ft(.42, 0, .58, 1)
  , Jr = t=>Array.isArray(t) && typeof t[0] != "number"
  , Hs = t=>e=>e <= .5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2
  , zs = t=>e=>1 - t(1 - e)
  , Ks = t=>1 - Math.sin(Math.acos(t))
  , _e = zs(Ks)
  , Qr = Hs(_e)
  , Ys = Ft(.33, 1.53, .69, .99)
  , He = zs(Ys)
  , to = Hs(He)
  , eo = t=>(t *= 2) < 1 ? .5 * He(t) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
  , no = {
    linear: F,
    easeIn: qr,
    easeInOut: _s,
    easeOut: Zr,
    circIn: Ks,
    circInOut: Qr,
    circOut: _e,
    backIn: He,
    backInOut: to,
    backOut: Ys,
    anticipate: eo
}
  , yn = t=>{
    if (Array.isArray(t)) {
        $e(t.length === 4);
        const [e,n,s,i] = t;
        return Ft(e, n, s, i)
    } else if (typeof t == "string")
        return no[t];
    return t
}
  , ze = (t,e)=>n=>!!(Rt(n) && Qi.test(n) && n.startsWith(t) || e && Object.prototype.hasOwnProperty.call(n, e))
  , Xs = (t,e,n)=>s=>{
    if (!Rt(s))
        return s;
    const [i,o,r,a] = s.match(Qt);
    return {
        [t]: parseFloat(i),
        [e]: parseFloat(o),
        [n]: parseFloat(r),
        alpha: a !== void 0 ? parseFloat(a) : 1
    }
}
  , so = t=>tt(0, 255, t)
  , le = {
    ...ct,
    transform: t=>Math.round(so(t))
}
  , at = {
    test: ze("rgb", "red"),
    parse: Xs("red", "green", "blue"),
    transform: ({red: t, green: e, blue: n, alpha: s=1})=>"rgba(" + le.transform(t) + ", " + le.transform(e) + ", " + le.transform(n) + ", " + Vt(bt.transform(s)) + ")"
};
function io(t) {
    let e = ""
      , n = ""
      , s = ""
      , i = "";
    return t.length > 5 ? (e = t.substring(1, 3),
    n = t.substring(3, 5),
    s = t.substring(5, 7),
    i = t.substring(7, 9)) : (e = t.substring(1, 2),
    n = t.substring(2, 3),
    s = t.substring(3, 4),
    i = t.substring(4, 5),
    e += e,
    n += n,
    s += s,
    i += i),
    {
        red: parseInt(e, 16),
        green: parseInt(n, 16),
        blue: parseInt(s, 16),
        alpha: i ? parseInt(i, 16) / 255 : 1
    }
}
const Pe = {
    test: ze("#"),
    parse: io,
    transform: at.transform
}
  , dt = {
    test: ze("hsl", "hue"),
    parse: Xs("hue", "saturation", "lightness"),
    transform: ({hue: t, saturation: e, lightness: n, alpha: s=1})=>"hsla(" + Math.round(t) + ", " + G.transform(Vt(e)) + ", " + G.transform(Vt(n)) + ", " + Vt(bt.transform(s)) + ")"
}
  , j = {
    test: t=>at.test(t) || Pe.test(t) || dt.test(t),
    parse: t=>at.test(t) ? at.parse(t) : dt.test(t) ? dt.parse(t) : Pe.parse(t),
    transform: t=>Rt(t) ? t : t.hasOwnProperty("red") ? at.transform(t) : dt.transform(t)
}
  , C = (t,e,n)=>-n * t + n * e + t;
function ce(t, e, n) {
    return n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t
}
function ro({hue: t, saturation: e, lightness: n, alpha: s}) {
    t /= 360,
    e /= 100,
    n /= 100;
    let i = 0
      , o = 0
      , r = 0;
    if (!e)
        i = o = r = n;
    else {
        const a = n < .5 ? n * (1 + e) : n + e - n * e
          , l = 2 * n - a;
        i = ce(l, a, t + 1 / 3),
        o = ce(l, a, t),
        r = ce(l, a, t - 1 / 3)
    }
    return {
        red: Math.round(i * 255),
        green: Math.round(o * 255),
        blue: Math.round(r * 255),
        alpha: s
    }
}
const ue = (t,e,n)=>{
    const s = t * t;
    return Math.sqrt(Math.max(0, n * (e * e - s) + s))
}
  , oo = [Pe, at, dt]
  , ao = t=>oo.find(e=>e.test(t));
function vn(t) {
    const e = ao(t);
    let n = e.parse(t);
    return e === dt && (n = ro(n)),
    n
}
const qs = (t,e)=>{
    const n = vn(t)
      , s = vn(e)
      , i = {
        ...n
    };
    return o=>(i.red = ue(n.red, s.red, o),
    i.green = ue(n.green, s.green, o),
    i.blue = ue(n.blue, s.blue, o),
    i.alpha = C(n.alpha, s.alpha, o),
    at.transform(i))
}
;
function lo(t) {
    var e, n;
    return isNaN(t) && Rt(t) && (((e = t.match(Qt)) === null || e === void 0 ? void 0 : e.length) || 0) + (((n = t.match(Ts)) === null || n === void 0 ? void 0 : n.length) || 0) > 0
}
const Zs = {
    regex: Zi,
    countKey: "Vars",
    token: "${v}",
    parse: F
}
  , Js = {
    regex: Ts,
    countKey: "Colors",
    token: "${c}",
    parse: j.parse
}
  , Qs = {
    regex: Qt,
    countKey: "Numbers",
    token: "${n}",
    parse: ct.parse
};
function he(t, {regex: e, countKey: n, token: s, parse: i}) {
    const o = t.tokenised.match(e);
    o && (t["num" + n] = o.length,
    t.tokenised = t.tokenised.replace(e, s),
    t.values.push(...o.map(i)))
}
function _t(t) {
    const e = t.toString()
      , n = {
        value: e,
        tokenised: e,
        values: [],
        numVars: 0,
        numColors: 0,
        numNumbers: 0
    };
    return n.value.includes("var(--") && he(n, Zs),
    he(n, Js),
    he(n, Qs),
    n
}
function ti(t) {
    return _t(t).values
}
function ei(t) {
    const {values: e, numColors: n, numVars: s, tokenised: i} = _t(t)
      , o = e.length;
    return r=>{
        let a = i;
        for (let l = 0; l < o; l++)
            l < s ? a = a.replace(Zs.token, r[l]) : l < s + n ? a = a.replace(Js.token, j.transform(r[l])) : a = a.replace(Qs.token, Vt(r[l]));
        return a
    }
}
const co = t=>typeof t == "number" ? 0 : t;
function uo(t) {
    const e = ti(t);
    return ei(t)(e.map(co))
}
const et = {
    test: lo,
    parse: ti,
    createTransformer: ei,
    getAnimatableNone: uo
}
  , ni = (t,e)=>n=>`${n > 0 ? e : t}`;
function si(t, e) {
    return typeof t == "number" ? n=>C(t, e, n) : j.test(t) ? qs(t, e) : t.startsWith("var(") ? ni(t, e) : ri(t, e)
}
const ii = (t,e)=>{
    const n = [...t]
      , s = n.length
      , i = t.map((o,r)=>si(o, e[r]));
    return o=>{
        for (let r = 0; r < s; r++)
            n[r] = i[r](o);
        return n
    }
}
  , ho = (t,e)=>{
    const n = {
        ...t,
        ...e
    }
      , s = {};
    for (const i in n)
        t[i] !== void 0 && e[i] !== void 0 && (s[i] = si(t[i], e[i]));
    return i=>{
        for (const o in s)
            n[o] = s[o](i);
        return n
    }
}
  , ri = (t,e)=>{
    const n = et.createTransformer(e)
      , s = _t(t)
      , i = _t(e);
    return s.numVars === i.numVars && s.numColors === i.numColors && s.numNumbers >= i.numNumbers ? J(ii(s.values, i.values), n) : ni(t, e)
}
  , Mt = (t,e,n)=>{
    const s = e - t;
    return s === 0 ? 1 : (n - t) / s
}
  , xn = (t,e)=>n=>C(t, e, n);
function fo(t) {
    return typeof t == "number" ? xn : typeof t == "string" ? j.test(t) ? qs : ri : Array.isArray(t) ? ii : typeof t == "object" ? ho : xn
}
function mo(t, e, n) {
    const s = []
      , i = n || fo(t[0])
      , o = t.length - 1;
    for (let r = 0; r < o; r++) {
        let a = i(t[r], t[r + 1]);
        if (e) {
            const l = Array.isArray(e) ? e[r] || F : e;
            a = J(l, a)
        }
        s.push(a)
    }
    return s
}
function oi(t, e, {clamp: n=!0, ease: s, mixer: i}={}) {
    const o = t.length;
    if ($e(o === e.length),
    o === 1)
        return ()=>e[0];
    t[0] > t[o - 1] && (t = [...t].reverse(),
    e = [...e].reverse());
    const r = mo(e, s, i)
      , a = r.length
      , l = c=>{
        let u = 0;
        if (a > 1)
            for (; u < t.length - 2 && !(c < t[u + 1]); u++)
                ;
        const h = Mt(t[u], t[u + 1], c);
        return r[u](h)
    }
    ;
    return n ? c=>l(tt(t[0], t[o - 1], c)) : l
}
function po(t, e) {
    const n = t[t.length - 1];
    for (let s = 1; s <= e; s++) {
        const i = Mt(0, e, s);
        t.push(C(n, 1, i))
    }
}
function go(t) {
    const e = [0];
    return po(e, t.length - 1),
    e
}
function yo(t, e) {
    return t.map(n=>n * e)
}
function vo(t, e) {
    return t.map(()=>e || _s).splice(0, t.length - 1)
}
function Ht({duration: t=300, keyframes: e, times: n, ease: s="easeInOut"}) {
    const i = Jr(s) ? s.map(yn) : yn(s)
      , o = {
        done: !1,
        value: e[0]
    }
      , r = yo(n && n.length === e.length ? n : go(e), t)
      , a = oi(r, e, {
        ease: Array.isArray(i) ? i : vo(e, i)
    });
    return {
        calculatedDuration: t,
        next: l=>(o.value = a(l),
        o.done = l >= t,
        o)
    }
}
function ai(t, e) {
    return e ? t * (1e3 / e) : 0
}
const xo = 5;
function li(t, e, n) {
    const s = Math.max(e - xo, 0);
    return ai(n - t(s), e - s)
}
const fe = .001
  , Po = .01
  , Pn = 10
  , To = .05
  , bo = 1;
function Vo({duration: t=800, bounce: e=.25, velocity: n=0, mass: s=1}) {
    let i, o;
    $r(t <= Q(Pn));
    let r = 1 - e;
    r = tt(To, bo, r),
    t = tt(Po, Pn, z(t)),
    r < 1 ? (i = c=>{
        const u = c * r
          , h = u * t
          , f = u - n
          , d = Te(c, r)
          , m = Math.exp(-h);
        return fe - f / d * m
    }
    ,
    o = c=>{
        const h = c * r * t
          , f = h * n + n
          , d = Math.pow(r, 2) * Math.pow(c, 2) * t
          , m = Math.exp(-h)
          , p = Te(Math.pow(c, 2), r);
        return (-i(c) + fe > 0 ? -1 : 1) * ((f - d) * m) / p
    }
    ) : (i = c=>{
        const u = Math.exp(-c * t)
          , h = (c - n) * t + 1;
        return -fe + u * h
    }
    ,
    o = c=>{
        const u = Math.exp(-c * t)
          , h = (n - c) * (t * t);
        return u * h
    }
    );
    const a = 5 / t
      , l = Ao(i, o, a);
    if (t = Q(t),
    isNaN(l))
        return {
            stiffness: 100,
            damping: 10,
            duration: t
        };
    {
        const c = Math.pow(l, 2) * s;
        return {
            stiffness: c,
            damping: r * 2 * Math.sqrt(s * c),
            duration: t
        }
    }
}
const So = 12;
function Ao(t, e, n) {
    let s = n;
    for (let i = 1; i < So; i++)
        s = s - t(s) / e(s);
    return s
}
function Te(t, e) {
    return t * Math.sqrt(1 - e * e)
}
const Co = ["duration", "bounce"]
  , wo = ["stiffness", "damping", "mass"];
function Tn(t, e) {
    return e.some(n=>t[n] !== void 0)
}
function Do(t) {
    let e = {
        velocity: 0,
        stiffness: 100,
        damping: 10,
        mass: 1,
        isResolvedFromDuration: !1,
        ...t
    };
    if (!Tn(t, wo) && Tn(t, Co)) {
        const n = Vo(t);
        e = {
            ...e,
            ...n,
            velocity: 0,
            mass: 1
        },
        e.isResolvedFromDuration = !0
    }
    return e
}
function ci({keyframes: t, restDelta: e, restSpeed: n, ...s}) {
    const i = t[0]
      , o = t[t.length - 1]
      , r = {
        done: !1,
        value: i
    }
      , {stiffness: a, damping: l, mass: c, velocity: u, duration: h, isResolvedFromDuration: f} = Do(s)
      , d = u ? -z(u) : 0
      , m = l / (2 * Math.sqrt(a * c))
      , p = o - i
      , T = z(Math.sqrt(a / c))
      , v = Math.abs(p) < 5;
    n || (n = v ? .01 : 2),
    e || (e = v ? .005 : .5);
    let y;
    if (m < 1) {
        const g = Te(T, m);
        y = P=>{
            const S = Math.exp(-m * T * P);
            return o - S * ((d + m * T * p) / g * Math.sin(g * P) + p * Math.cos(g * P))
        }
    } else if (m === 1)
        y = g=>o - Math.exp(-T * g) * (p + (d + T * p) * g);
    else {
        const g = T * Math.sqrt(m * m - 1);
        y = P=>{
            const S = Math.exp(-m * T * P)
              , k = Math.min(g * P, 300);
            return o - S * ((d + m * T * p) * Math.sinh(k) + g * p * Math.cosh(k)) / g
        }
    }
    return {
        calculatedDuration: f && h || null,
        next: g=>{
            const P = y(g);
            if (f)
                r.done = g >= h;
            else {
                let S = d;
                g !== 0 && (m < 1 ? S = li(y, g, P) : S = 0);
                const k = Math.abs(S) <= n
                  , D = Math.abs(o - P) <= e;
                r.done = k && D
            }
            return r.value = r.done ? o : P,
            r
        }
    }
}
function bn({keyframes: t, velocity: e=0, power: n=.8, timeConstant: s=325, bounceDamping: i=10, bounceStiffness: o=500, modifyTarget: r, min: a, max: l, restDelta: c=.5, restSpeed: u}) {
    const h = t[0]
      , f = {
        done: !1,
        value: h
    }
      , d = V=>a !== void 0 && V < a || l !== void 0 && V > l
      , m = V=>a === void 0 ? l : l === void 0 || Math.abs(a - V) < Math.abs(l - V) ? a : l;
    let p = n * e;
    const T = h + p
      , v = r === void 0 ? T : r(T);
    v !== T && (p = v - h);
    const y = V=>-p * Math.exp(-V / s)
      , g = V=>v + y(V)
      , P = V=>{
        const L = y(V)
          , W = g(V);
        f.done = Math.abs(L) <= c,
        f.value = f.done ? v : W
    }
    ;
    let S, k;
    const D = V=>{
        d(f.value) && (S = V,
        k = ci({
            keyframes: [f.value, m(f.value)],
            velocity: li(g, V, f.value),
            damping: i,
            stiffness: o,
            restDelta: c,
            restSpeed: u
        }))
    }
    ;
    return D(0),
    {
        calculatedDuration: null,
        next: V=>{
            let L = !1;
            return !k && S === void 0 && (L = !0,
            P(V),
            D(V)),
            S !== void 0 && V > S ? k.next(V - S) : (!L && P(V),
            f)
        }
    }
}
const Mo = t=>{
    const e = ({timestamp: n})=>t(n);
    return {
        start: ()=>w.update(e, !0),
        stop: ()=>K(e),
        now: ()=>A.isProcessing ? A.timestamp : performance.now()
    }
}
  , Vn = 2e4;
function Sn(t) {
    let e = 0;
    const n = 50;
    let s = t.next(e);
    for (; !s.done && e < Vn; )
        e += n,
        s = t.next(e);
    return e >= Vn ? 1 / 0 : e
}
const Lo = {
    decay: bn,
    inertia: bn,
    tween: Ht,
    keyframes: Ht,
    spring: ci
};
function zt({autoplay: t=!0, delay: e=0, driver: n=Mo, keyframes: s, type: i="keyframes", repeat: o=0, repeatDelay: r=0, repeatType: a="loop", onPlay: l, onStop: c, onComplete: u, onUpdate: h, ...f}) {
    let d = 1, m = !1, p, T;
    const v = ()=>{
        p && p(),
        T = new Promise(M=>{
            p = M
        }
        )
    }
    ;
    v();
    let y;
    const g = Lo[i] || Ht;
    let P;
    g !== Ht && typeof s[0] != "number" && (P = oi([0, 100], s, {
        clamp: !1
    }),
    s = [0, 100]);
    const S = g({
        ...f,
        keyframes: s
    });
    let k;
    a === "mirror" && (k = g({
        ...f,
        keyframes: [...s].reverse(),
        velocity: -(f.velocity || 0)
    }));
    let D = "idle"
      , V = null
      , L = null
      , W = null;
    S.calculatedDuration === null && o && (S.calculatedDuration = Sn(S));
    const {calculatedDuration: $} = S;
    let Y = 1 / 0
      , ut = 1 / 0;
    $ !== null && (Y = $ + r,
    ut = Y * (o + 1) - r);
    let B = 0;
    const E = M=>{
        if (L === null)
            return;
        d > 0 && (L = Math.min(L, M)),
        V !== null ? B = V : B = (M - L) * d;
        const Bt = B - e
          , tn = Bt < 0;
        B = Math.max(Bt, 0),
        D === "finished" && V === null && (B = ut);
        let en = B
          , nn = S;
        if (o) {
            const ie = B / Y;
            let kt = Math.floor(ie)
              , st = ie % 1;
            !st && ie >= 1 && (st = 1),
            st === 1 && kt--,
            kt = Math.min(kt, o + 1);
            const rn = !!(kt % 2);
            rn && (a === "reverse" ? (st = 1 - st,
            r && (st -= r / Y)) : a === "mirror" && (nn = k));
            let on = tt(0, 1, st);
            B > ut && (on = a === "reverse" && rn ? 1 : 0),
            en = on * Y
        }
        const vt = tn ? {
            done: !1,
            value: s[0]
        } : nn.next(en);
        P && (vt.value = P(vt.value));
        let {done: sn} = vt;
        !tn && $ !== null && (sn = B >= ut);
        const ji = V === null && (D === "finished" || D === "running" && sn || d < 0 && B <= 0);
        return h && h(vt.value),
        ji && ki(),
        vt
    }
      , X = ()=>{
        y && y.stop(),
        y = void 0
    }
      , ht = ()=>{
        D = "idle",
        X(),
        v(),
        L = W = null
    }
      , ki = ()=>{
        D = "finished",
        u && u(),
        X(),
        v()
    }
      , Je = ()=>{
        if (m)
            return;
        y || (y = n(E));
        const M = y.now();
        l && l(),
        V !== null ? L = M - V : (!L || D === "finished") && (L = M),
        W = L,
        V = null,
        D = "running",
        y.start()
    }
    ;
    t && Je();
    const Qe = {
        then(M, Bt) {
            return T.then(M, Bt)
        },
        get time() {
            return z(B)
        },
        set time(M) {
            M = Q(M),
            B = M,
            V !== null || !y || d === 0 ? V = M : L = y.now() - M / d
        },
        get duration() {
            const M = S.calculatedDuration === null ? Sn(S) : S.calculatedDuration;
            return z(M)
        },
        get speed() {
            return d
        },
        set speed(M) {
            M === d || !y || (d = M,
            Qe.time = z(B))
        },
        get state() {
            return D
        },
        play: Je,
        pause: ()=>{
            D = "paused",
            V = B
        }
        ,
        stop: ()=>{
            m = !0,
            D !== "idle" && (D = "idle",
            c && c(),
            ht())
        }
        ,
        cancel: ()=>{
            W !== null && E(W),
            ht()
        }
        ,
        complete: ()=>{
            D = "finished"
        }
        ,
        sample: M=>(L = 0,
        E(M))
    };
    return Qe
}
const Ro = new Set(["opacity", "clipPath", "filter", "transform", "backgroundColor"])
  , Ot = 10
  , Eo = 2e4
  , Fo = (t,e)=>e.type === "spring" || t === "backgroundColor" || !Us(e.ease);
function Bo(t, e, {onUpdate: n, onComplete: s, ...i}) {
    if (!(Ws.waapi() && Ro.has(e) && !i.repeatDelay && i.repeatType !== "mirror" && i.damping !== 0 && i.type !== "inertia"))
        return !1;
    let r = !1, a, l;
    const c = ()=>{
        l = new Promise(v=>{
            a = v
        }
        )
    }
    ;
    c();
    let {keyframes: u, duration: h=300, ease: f, times: d} = i;
    if (Fo(e, i)) {
        const v = zt({
            ...i,
            repeat: 0,
            delay: 0
        });
        let y = {
            done: !1,
            value: u[0]
        };
        const g = [];
        let P = 0;
        for (; !y.done && P < Eo; )
            y = v.sample(P),
            g.push(y.value),
            P += Ot;
        d = void 0,
        u = g,
        h = P - Ot,
        f = "linear"
    }
    const m = Hr(t.owner.current, e, u, {
        ...i,
        duration: h,
        ease: f,
        times: d
    })
      , p = ()=>m.cancel()
      , T = ()=>{
        w.update(p),
        a(),
        c()
    }
    ;
    return m.onfinish = ()=>{
        t.set(zr(u, i)),
        s && s(),
        T()
    }
    ,
    {
        then(v, y) {
            return l.then(v, y)
        },
        get time() {
            return z(m.currentTime || 0)
        },
        set time(v) {
            m.currentTime = Q(v)
        },
        get speed() {
            return m.playbackRate
        },
        set speed(v) {
            m.playbackRate = v
        },
        get duration() {
            return z(h)
        },
        play: ()=>{
            r || (m.play(),
            K(p))
        }
        ,
        pause: ()=>m.pause(),
        stop: ()=>{
            if (r = !0,
            m.playState === "idle")
                return;
            const {currentTime: v} = m;
            if (v) {
                const y = zt({
                    ...i,
                    autoplay: !1
                });
                t.setWithVelocity(y.sample(v - Ot).value, y.sample(v).value, Ot)
            }
            T()
        }
        ,
        complete: ()=>m.finish(),
        cancel: T
    }
}
function ko({keyframes: t, delay: e, onUpdate: n, onComplete: s}) {
    const i = ()=>(n && n(t[t.length - 1]),
    s && s(),
    {
        time: 0,
        speed: 1,
        duration: 0,
        play: F,
        pause: F,
        stop: F,
        then: o=>(o(),
        Promise.resolve()),
        cancel: F,
        complete: F
    });
    return e ? zt({
        keyframes: [0, 1],
        duration: 0,
        delay: e,
        onComplete: i
    }) : i()
}
const jo = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10
}
  , Oo = t=>({
    type: "spring",
    stiffness: 550,
    damping: t === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10
})
  , Io = {
    type: "keyframes",
    duration: .8
}
  , Uo = {
    type: "keyframes",
    ease: [.25, .1, .35, 1],
    duration: .3
}
  , No = (t,{keyframes: e})=>e.length > 2 ? Io : lt.has(t) ? t.startsWith("scale") ? Oo(e[1]) : jo : Uo
  , be = (t,e)=>t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && (et.test(e) || e === "0") && !e.startsWith("url("))
  , Go = new Set(["brightness", "contrast", "saturate", "opacity"]);
function Wo(t) {
    const [e,n] = t.slice(0, -1).split("(");
    if (e === "drop-shadow")
        return t;
    const [s] = n.match(Qt) || [];
    if (!s)
        return t;
    const i = n.replace(s, "");
    let o = Go.has(e) ? 1 : 0;
    return s !== n && (o *= 100),
    e + "(" + o + i + ")"
}
const $o = /([a-z-]*)\(.*?\)/g
  , Ve = {
    ...et,
    getAnimatableNone: t=>{
        const e = t.match($o);
        return e ? e.map(Wo).join(" ") : t
    }
}
  , _o = {
    ...bs,
    color: j,
    backgroundColor: j,
    outlineColor: j,
    fill: j,
    stroke: j,
    borderColor: j,
    borderTopColor: j,
    borderRightColor: j,
    borderBottomColor: j,
    borderLeftColor: j,
    filter: Ve,
    WebkitFilter: Ve
}
  , Ke = t=>_o[t];
function ui(t, e) {
    let n = Ke(t);
    return n !== Ve && (n = et),
    n.getAnimatableNone ? n.getAnimatableNone(e) : void 0
}
const hi = t=>/^0[^.\s]+$/.test(t);
function Ho(t) {
    if (typeof t == "number")
        return t === 0;
    if (t !== null)
        return t === "none" || t === "0" || hi(t)
}
function zo(t, e, n, s) {
    const i = be(e, n);
    let o;
    Array.isArray(n) ? o = [...n] : o = [null, n];
    const r = s.from !== void 0 ? s.from : t.get();
    let a;
    const l = [];
    for (let c = 0; c < o.length; c++)
        o[c] === null && (o[c] = c === 0 ? r : o[c - 1]),
        Ho(o[c]) && l.push(c),
        typeof o[c] == "string" && o[c] !== "none" && o[c] !== "0" && (a = o[c]);
    if (i && l.length && a)
        for (let c = 0; c < l.length; c++) {
            const u = l[c];
            o[u] = ui(e, a)
        }
    return o
}
function Ko({when: t, delay: e, delayChildren: n, staggerChildren: s, staggerDirection: i, repeat: o, repeatType: r, repeatDelay: a, from: l, elapsed: c, ...u}) {
    return !!Object.keys(u).length
}
function fi(t, e) {
    return t[e] || t.default || t
}
const Ye = (t,e,n,s={})=>i=>{
    const o = fi(s, t) || {}
      , r = o.delay || s.delay || 0;
    let {elapsed: a=0} = s;
    a = a - Q(r);
    const l = zo(e, t, n, o)
      , c = l[0]
      , u = l[l.length - 1]
      , h = be(t, c)
      , f = be(t, u);
    let d = {
        keyframes: l,
        velocity: e.getVelocity(),
        ease: "easeOut",
        ...o,
        delay: -a,
        onUpdate: m=>{
            e.set(m),
            o.onUpdate && o.onUpdate(m)
        }
        ,
        onComplete: ()=>{
            i(),
            o.onComplete && o.onComplete()
        }
    };
    if (Ko(o) || (d = {
        ...d,
        ...No(t, d)
    }),
    d.duration && (d.duration = Q(d.duration)),
    d.repeatDelay && (d.repeatDelay = Q(d.repeatDelay)),
    !h || !f || _r.current || o.type === !1)
        return ko(d);
    if (e.owner && e.owner.current instanceof HTMLElement && !e.owner.getProps().onUpdate) {
        const m = Bo(e, t, d);
        if (m)
            return m
    }
    return zt(d)
}
;
function Kt(t) {
    return !!(O(t) && t.add)
}
const Yo = t=>/^\-?\d*\.?\d+$/.test(t);
function Xe(t, e) {
    t.indexOf(e) === -1 && t.push(e)
}
function qe(t, e) {
    const n = t.indexOf(e);
    n > -1 && t.splice(n, 1)
}
class Ze {
    constructor() {
        this.subscriptions = []
    }
    add(e) {
        return Xe(this.subscriptions, e),
        ()=>qe(this.subscriptions, e)
    }
    notify(e, n, s) {
        const i = this.subscriptions.length;
        if (i)
            if (i === 1)
                this.subscriptions[0](e, n, s);
            else
                for (let o = 0; o < i; o++) {
                    const r = this.subscriptions[o];
                    r && r(e, n, s)
                }
    }
    getSize() {
        return this.subscriptions.length
    }
    clear() {
        this.subscriptions.length = 0
    }
}
const Xo = t=>!isNaN(parseFloat(t));
class qo {
    constructor(e, n={}) {
        this.version = "10.12.16",
        this.timeDelta = 0,
        this.lastUpdated = 0,
        this.canTrackVelocity = !1,
        this.events = {},
        this.updateAndNotify = (s,i=!0)=>{
            this.prev = this.current,
            this.current = s;
            const {delta: o, timestamp: r} = A;
            this.lastUpdated !== r && (this.timeDelta = o,
            this.lastUpdated = r,
            w.postRender(this.scheduleVelocityCheck)),
            this.prev !== this.current && this.events.change && this.events.change.notify(this.current),
            this.events.velocityChange && this.events.velocityChange.notify(this.getVelocity()),
            i && this.events.renderRequest && this.events.renderRequest.notify(this.current)
        }
        ,
        this.scheduleVelocityCheck = ()=>w.postRender(this.velocityCheck),
        this.velocityCheck = ({timestamp: s})=>{
            s !== this.lastUpdated && (this.prev = this.current,
            this.events.velocityChange && this.events.velocityChange.notify(this.getVelocity()))
        }
        ,
        this.hasAnimated = !1,
        this.prev = this.current = e,
        this.canTrackVelocity = Xo(this.current),
        this.owner = n.owner
    }
    onChange(e) {
        return this.on("change", e)
    }
    on(e, n) {
        this.events[e] || (this.events[e] = new Ze);
        const s = this.events[e].add(n);
        return e === "change" ? ()=>{
            s(),
            w.read(()=>{
                this.events.change.getSize() || this.stop()
            }
            )
        }
        : s
    }
    clearListeners() {
        for (const e in this.events)
            this.events[e].clear()
    }
    attach(e, n) {
        this.passiveEffect = e,
        this.stopPassiveEffect = n
    }
    set(e, n=!0) {
        !n || !this.passiveEffect ? this.updateAndNotify(e, n) : this.passiveEffect(e, this.updateAndNotify)
    }
    setWithVelocity(e, n, s) {
        this.set(n),
        this.prev = e,
        this.timeDelta = s
    }
    jump(e) {
        this.updateAndNotify(e),
        this.prev = e,
        this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect()
    }
    get() {
        return this.current
    }
    getPrevious() {
        return this.prev
    }
    getVelocity() {
        return this.canTrackVelocity ? ai(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0
    }
    start(e) {
        return this.stop(),
        new Promise(n=>{
            this.hasAnimated = !0,
            this.animation = e(n),
            this.events.animationStart && this.events.animationStart.notify()
        }
        ).then(()=>{
            this.events.animationComplete && this.events.animationComplete.notify(),
            this.clearAnimation()
        }
        )
    }
    stop() {
        this.animation && (this.animation.stop(),
        this.events.animationCancel && this.events.animationCancel.notify()),
        this.clearAnimation()
    }
    isAnimating() {
        return !!this.animation
    }
    clearAnimation() {
        delete this.animation
    }
    destroy() {
        this.clearListeners(),
        this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect()
    }
}
function yt(t, e) {
    return new qo(t,e)
}
const di = t=>e=>e.test(t)
  , Zo = {
    test: t=>t === "auto",
    parse: t=>t
}
  , mi = [ct, x, G, q, er, tr, Zo]
  , xt = t=>mi.find(di(t))
  , Jo = [...mi, j, et]
  , Qo = t=>Jo.find(di(t));
function ta(t, e, n) {
    t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, yt(n))
}
function ea(t, e) {
    const n = ne(t, e);
    let {transitionEnd: s={}, transition: i={}, ...o} = n ? t.makeTargetAnimatable(n, !1) : {};
    o = {
        ...o,
        ...s
    };
    for (const r in o) {
        const a = gr(o[r]);
        ta(t, r, a)
    }
}
function na(t, e, n) {
    var s, i;
    const o = Object.keys(e).filter(a=>!t.hasValue(a))
      , r = o.length;
    if (r)
        for (let a = 0; a < r; a++) {
            const l = o[a]
              , c = e[l];
            let u = null;
            Array.isArray(c) && (u = c[0]),
            u === null && (u = (i = (s = n[l]) !== null && s !== void 0 ? s : t.readValue(l)) !== null && i !== void 0 ? i : e[l]),
            u != null && (typeof u == "string" && (Yo(u) || hi(u)) ? u = parseFloat(u) : !Qo(u) && et.test(c) && (u = ui(l, c)),
            t.addValue(l, yt(u, {
                owner: t
            })),
            n[l] === void 0 && (n[l] = u),
            u !== null && t.setBaseTarget(l, u))
        }
}
function sa(t, e) {
    return e ? (e[t] || e.default || e).from : void 0
}
function ia(t, e, n) {
    const s = {};
    for (const i in t) {
        const o = sa(i, e);
        if (o !== void 0)
            s[i] = o;
        else {
            const r = n.getValue(i);
            r && (s[i] = r.get())
        }
    }
    return s
}
function ra({protectedKeys: t, needsAnimating: e}, n) {
    const s = t.hasOwnProperty(n) && e[n] !== !0;
    return e[n] = !1,
    s
}
function pi(t, e, {delay: n=0, transitionOverride: s, type: i}={}) {
    let {transition: o=t.getDefaultTransition(), transitionEnd: r, ...a} = t.makeTargetAnimatable(e);
    const l = t.getValue("willChange");
    s && (o = s);
    const c = []
      , u = i && t.animationState && t.animationState.getState()[i];
    for (const h in a) {
        const f = t.getValue(h)
          , d = a[h];
        if (!f || d === void 0 || u && ra(u, h))
            continue;
        const m = {
            delay: n,
            elapsed: 0,
            ...o
        };
        if (window.HandoffAppearAnimations && !f.hasAnimated) {
            const T = t.getProps()[Wr];
            T && (m.elapsed = window.HandoffAppearAnimations(T, h, f, w))
        }
        f.start(Ye(h, f, d, t.shouldReduceMotion && lt.has(h) ? {
            type: !1
        } : m));
        const p = f.animation;
        Kt(l) && (l.add(h),
        p.then(()=>l.remove(h))),
        c.push(p)
    }
    return r && Promise.all(c).then(()=>{
        r && ea(t, r)
    }
    ),
    c
}
function Se(t, e, n={}) {
    const s = ne(t, e, n.custom);
    let {transition: i=t.getDefaultTransition() || {}} = s || {};
    n.transitionOverride && (i = n.transitionOverride);
    const o = s ? ()=>Promise.all(pi(t, s, n)) : ()=>Promise.resolve()
      , r = t.variantChildren && t.variantChildren.size ? (l=0)=>{
        const {delayChildren: c=0, staggerChildren: u, staggerDirection: h} = i;
        return oa(t, e, c + l, u, h, n)
    }
    : ()=>Promise.resolve()
      , {when: a} = i;
    if (a) {
        const [l,c] = a === "beforeChildren" ? [o, r] : [r, o];
        return l().then(()=>c())
    } else
        return Promise.all([o(), r(n.delay)])
}
function oa(t, e, n=0, s=0, i=1, o) {
    const r = []
      , a = (t.variantChildren.size - 1) * s
      , l = i === 1 ? (c=0)=>c * s : (c=0)=>a - c * s;
    return Array.from(t.variantChildren).sort(aa).forEach((c,u)=>{
        c.notify("AnimationStart", e),
        r.push(Se(c, e, {
            ...o,
            delay: n + l(u)
        }).then(()=>c.notify("AnimationComplete", e)))
    }
    ),
    Promise.all(r)
}
function aa(t, e) {
    return t.sortNodePosition(e)
}
function la(t, e, n={}) {
    t.notify("AnimationStart", e);
    let s;
    if (Array.isArray(e)) {
        const i = e.map(o=>Se(t, o, n));
        s = Promise.all(i)
    } else if (typeof e == "string")
        s = Se(t, e, n);
    else {
        const i = typeof e == "function" ? ne(t, e, n.custom) : e;
        s = Promise.all(pi(t, i, n))
    }
    return s.then(()=>t.notify("AnimationComplete", e))
}
const ca = [...Fe].reverse()
  , ua = Fe.length;
function ha(t) {
    return e=>Promise.all(e.map(({animation: n, options: s})=>la(t, n, s)))
}
function fa(t) {
    let e = ha(t);
    const n = ma();
    let s = !0;
    const i = (l,c)=>{
        const u = ne(t, c);
        if (u) {
            const {transition: h, transitionEnd: f, ...d} = u;
            l = {
                ...l,
                ...d,
                ...f
            }
        }
        return l
    }
    ;
    function o(l) {
        e = l(t)
    }
    function r(l, c) {
        const u = t.getProps()
          , h = t.getVariantContext(!0) || {}
          , f = []
          , d = new Set;
        let m = {}
          , p = 1 / 0;
        for (let v = 0; v < ua; v++) {
            const y = ca[v]
              , g = n[y]
              , P = u[y] !== void 0 ? u[y] : h[y]
              , S = Ct(P)
              , k = y === c ? g.isActive : null;
            k === !1 && (p = v);
            let D = P === h[y] && P !== u[y] && S;
            if (D && s && t.manuallyAnimateOnMount && (D = !1),
            g.protectedKeys = {
                ...m
            },
            !g.isActive && k === null || !P && !g.prevProp || Zt(P) || typeof P == "boolean")
                continue;
            const V = da(g.prevProp, P);
            let L = V || y === c && g.isActive && !D && S || v > p && S;
            const W = Array.isArray(P) ? P : [P];
            let $ = W.reduce(i, {});
            k === !1 && ($ = {});
            const {prevResolvedValues: Y={}} = g
              , ut = {
                ...Y,
                ...$
            }
              , B = E=>{
                L = !0,
                d.delete(E),
                g.needsAnimating[E] = !0
            }
            ;
            for (const E in ut) {
                const X = $[E]
                  , ht = Y[E];
                m.hasOwnProperty(E) || (X !== ht ? $t(X) && $t(ht) ? !Os(X, ht) || V ? B(E) : g.protectedKeys[E] = !0 : X !== void 0 ? B(E) : d.add(E) : X !== void 0 && d.has(E) ? B(E) : g.protectedKeys[E] = !0)
            }
            g.prevProp = P,
            g.prevResolvedValues = $,
            g.isActive && (m = {
                ...m,
                ...$
            }),
            s && t.blockInitialAnimation && (L = !1),
            L && !D && f.push(...W.map(E=>({
                animation: E,
                options: {
                    type: y,
                    ...l
                }
            })))
        }
        if (d.size) {
            const v = {};
            d.forEach(y=>{
                const g = t.getBaseTarget(y);
                g !== void 0 && (v[y] = g)
            }
            ),
            f.push({
                animation: v
            })
        }
        let T = !!f.length;
        return s && u.initial === !1 && !t.manuallyAnimateOnMount && (T = !1),
        s = !1,
        T ? e(f) : Promise.resolve()
    }
    function a(l, c, u) {
        var h;
        if (n[l].isActive === c)
            return Promise.resolve();
        (h = t.variantChildren) === null || h === void 0 || h.forEach(d=>{
            var m;
            return (m = d.animationState) === null || m === void 0 ? void 0 : m.setActive(l, c)
        }
        ),
        n[l].isActive = c;
        const f = r(u, l);
        for (const d in n)
            n[d].protectedKeys = {};
        return f
    }
    return {
        animateChanges: r,
        setActive: a,
        setAnimateFunction: o,
        getState: ()=>n
    }
}
function da(t, e) {
    return typeof e == "string" ? e !== t : Array.isArray(e) ? !Os(e, t) : !1
}
function it(t=!1) {
    return {
        isActive: t,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {}
    }
}
function ma() {
    return {
        animate: it(!0),
        whileInView: it(),
        whileHover: it(),
        whileTap: it(),
        whileDrag: it(),
        whileFocus: it(),
        exit: it()
    }
}
class pa extends nt {
    constructor(e) {
        super(e),
        e.animationState || (e.animationState = fa(e))
    }
    updateAnimationControlsSubscription() {
        const {animate: e} = this.node.getProps();
        this.unmount(),
        Zt(e) && (this.unmount = e.subscribe(this.node))
    }
    mount() {
        this.updateAnimationControlsSubscription()
    }
    update() {
        const {animate: e} = this.node.getProps()
          , {animate: n} = this.node.prevProps || {};
        e !== n && this.updateAnimationControlsSubscription()
    }
    unmount() {}
}
let ga = 0;
class ya extends nt {
    constructor() {
        super(...arguments),
        this.id = ga++
    }
    update() {
        if (!this.node.presenceContext)
            return;
        const {isPresent: e, onExitComplete: n, custom: s} = this.node.presenceContext
          , {isPresent: i} = this.node.prevPresenceContext || {};
        if (!this.node.animationState || e === i)
            return;
        const o = this.node.animationState.setActive("exit", !e, {
            custom: s ?? this.node.getProps().custom
        });
        n && !e && o.then(()=>n(this.id))
    }
    mount() {
        const {register: e} = this.node.presenceContext || {};
        e && (this.unmount = e(this.id))
    }
    unmount() {}
}
const va = {
    animation: {
        Feature: pa
    },
    exit: {
        Feature: ya
    }
}
  , An = (t,e)=>Math.abs(t - e);
function xa(t, e) {
    const n = An(t.x, e.x)
      , s = An(t.y, e.y);
    return Math.sqrt(n ** 2 + s ** 2)
}
class gi {
    constructor(e, n, {transformPagePoint: s}={}) {
        if (this.startEvent = null,
        this.lastMoveEvent = null,
        this.lastMoveEventInfo = null,
        this.handlers = {},
        this.updatePoint = ()=>{
            if (!(this.lastMoveEvent && this.lastMoveEventInfo))
                return;
            const c = me(this.lastMoveEventInfo, this.history)
              , u = this.startEvent !== null
              , h = xa(c.offset, {
                x: 0,
                y: 0
            }) >= 3;
            if (!u && !h)
                return;
            const {point: f} = c
              , {timestamp: d} = A;
            this.history.push({
                ...f,
                timestamp: d
            });
            const {onStart: m, onMove: p} = this.handlers;
            u || (m && m(this.lastMoveEvent, c),
            this.startEvent = this.lastMoveEvent),
            p && p(this.lastMoveEvent, c)
        }
        ,
        this.handlePointerMove = (c,u)=>{
            this.lastMoveEvent = c,
            this.lastMoveEventInfo = de(u, this.transformPagePoint),
            w.update(this.updatePoint, !0)
        }
        ,
        this.handlePointerUp = (c,u)=>{
            if (this.end(),
            !(this.lastMoveEvent && this.lastMoveEventInfo))
                return;
            const {onEnd: h, onSessionEnd: f} = this.handlers
              , d = me(c.type === "pointercancel" ? this.lastMoveEventInfo : de(u, this.transformPagePoint), this.history);
            this.startEvent && h && h(c, d),
            f && f(c, d)
        }
        ,
        !Rs(e))
            return;
        this.handlers = n,
        this.transformPagePoint = s;
        const i = te(e)
          , o = de(i, this.transformPagePoint)
          , {point: r} = o
          , {timestamp: a} = A;
        this.history = [{
            ...r,
            timestamp: a
        }];
        const {onSessionStart: l} = n;
        l && l(e, me(o, this.history)),
        this.removeListeners = J(H(window, "pointermove", this.handlePointerMove), H(window, "pointerup", this.handlePointerUp), H(window, "pointercancel", this.handlePointerUp))
    }
    updateHandlers(e) {
        this.handlers = e
    }
    end() {
        this.removeListeners && this.removeListeners(),
        K(this.updatePoint)
    }
}
function de(t, e) {
    return e ? {
        point: e(t.point)
    } : t
}
function Cn(t, e) {
    return {
        x: t.x - e.x,
        y: t.y - e.y
    }
}
function me({point: t}, e) {
    return {
        point: t,
        delta: Cn(t, yi(e)),
        offset: Cn(t, Pa(e)),
        velocity: Ta(e, .1)
    }
}
function Pa(t) {
    return t[0]
}
function yi(t) {
    return t[t.length - 1]
}
function Ta(t, e) {
    if (t.length < 2)
        return {
            x: 0,
            y: 0
        };
    let n = t.length - 1
      , s = null;
    const i = yi(t);
    for (; n >= 0 && (s = t[n],
    !(i.timestamp - s.timestamp > Q(e))); )
        n--;
    if (!s)
        return {
            x: 0,
            y: 0
        };
    const o = z(i.timestamp - s.timestamp);
    if (o === 0)
        return {
            x: 0,
            y: 0
        };
    const r = {
        x: (i.x - s.x) / o,
        y: (i.y - s.y) / o
    };
    return r.x === 1 / 0 && (r.x = 0),
    r.y === 1 / 0 && (r.y = 0),
    r
}
function I(t) {
    return t.max - t.min
}
function Ae(t, e=0, n=.01) {
    return Math.abs(t - e) <= n
}
function wn(t, e, n, s=.5) {
    t.origin = s,
    t.originPoint = C(e.min, e.max, t.origin),
    t.scale = I(n) / I(e),
    (Ae(t.scale, 1, 1e-4) || isNaN(t.scale)) && (t.scale = 1),
    t.translate = C(n.min, n.max, t.origin) - t.originPoint,
    (Ae(t.translate) || isNaN(t.translate)) && (t.translate = 0)
}
function St(t, e, n, s) {
    wn(t.x, e.x, n.x, s ? s.originX : void 0),
    wn(t.y, e.y, n.y, s ? s.originY : void 0)
}
function Dn(t, e, n) {
    t.min = n.min + e.min,
    t.max = t.min + I(e)
}
function ba(t, e, n) {
    Dn(t.x, e.x, n.x),
    Dn(t.y, e.y, n.y)
}
function Mn(t, e, n) {
    t.min = e.min - n.min,
    t.max = t.min + I(e)
}
function At(t, e, n) {
    Mn(t.x, e.x, n.x),
    Mn(t.y, e.y, n.y)
}
function Va(t, {min: e, max: n}, s) {
    return e !== void 0 && t < e ? t = s ? C(e, t, s.min) : Math.max(t, e) : n !== void 0 && t > n && (t = s ? C(n, t, s.max) : Math.min(t, n)),
    t
}
function Ln(t, e, n) {
    return {
        min: e !== void 0 ? t.min + e : void 0,
        max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0
    }
}
function Sa(t, {top: e, left: n, bottom: s, right: i}) {
    return {
        x: Ln(t.x, n, i),
        y: Ln(t.y, e, s)
    }
}
function Rn(t, e) {
    let n = e.min - t.min
      , s = e.max - t.max;
    return e.max - e.min < t.max - t.min && ([n,s] = [s, n]),
    {
        min: n,
        max: s
    }
}
function Aa(t, e) {
    return {
        x: Rn(t.x, e.x),
        y: Rn(t.y, e.y)
    }
}
function Ca(t, e) {
    let n = .5;
    const s = I(t)
      , i = I(e);
    return i > s ? n = Mt(e.min, e.max - s, t.min) : s > i && (n = Mt(t.min, t.max - i, e.min)),
    tt(0, 1, n)
}
function wa(t, e) {
    const n = {};
    return e.min !== void 0 && (n.min = e.min - t.min),
    e.max !== void 0 && (n.max = e.max - t.min),
    n
}
const Ce = .35;
function Da(t=Ce) {
    return t === !1 ? t = 0 : t === !0 && (t = Ce),
    {
        x: En(t, "left", "right"),
        y: En(t, "top", "bottom")
    }
}
function En(t, e, n) {
    return {
        min: Fn(t, e),
        max: Fn(t, n)
    }
}
function Fn(t, e) {
    return typeof t == "number" ? t : t[e] || 0
}
const Bn = ()=>({
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0
})
  , mt = ()=>({
    x: Bn(),
    y: Bn()
})
  , kn = ()=>({
    min: 0,
    max: 0
})
  , R = ()=>({
    x: kn(),
    y: kn()
});
function N(t) {
    return [t("x"), t("y")]
}
function vi({top: t, left: e, right: n, bottom: s}) {
    return {
        x: {
            min: e,
            max: n
        },
        y: {
            min: t,
            max: s
        }
    }
}
function Ma({x: t, y: e}) {
    return {
        top: e.min,
        right: t.max,
        bottom: e.max,
        left: t.min
    }
}
function La(t, e) {
    if (!e)
        return t;
    const n = e({
        x: t.left,
        y: t.top
    })
      , s = e({
        x: t.right,
        y: t.bottom
    });
    return {
        top: n.y,
        left: n.x,
        bottom: s.y,
        right: s.x
    }
}
function pe(t) {
    return t === void 0 || t === 1
}
function we({scale: t, scaleX: e, scaleY: n}) {
    return !pe(t) || !pe(e) || !pe(n)
}
function rt(t) {
    return we(t) || xi(t) || t.z || t.rotate || t.rotateX || t.rotateY
}
function xi(t) {
    return jn(t.x) || jn(t.y)
}
function jn(t) {
    return t && t !== "0%"
}
function Yt(t, e, n) {
    const s = t - n
      , i = e * s;
    return n + i
}
function On(t, e, n, s, i) {
    return i !== void 0 && (t = Yt(t, i, s)),
    Yt(t, n, s) + e
}
function De(t, e=0, n=1, s, i) {
    t.min = On(t.min, e, n, s, i),
    t.max = On(t.max, e, n, s, i)
}
function Pi(t, {x: e, y: n}) {
    De(t.x, e.translate, e.scale, e.originPoint),
    De(t.y, n.translate, n.scale, n.originPoint)
}
function Ra(t, e, n, s=!1) {
    const i = n.length;
    if (!i)
        return;
    e.x = e.y = 1;
    let o, r;
    for (let a = 0; a < i; a++) {
        o = n[a],
        r = o.projectionDelta;
        const l = o.instance;
        l && l.style && l.style.display === "contents" || (s && o.options.layoutScroll && o.scroll && o !== o.root && pt(t, {
            x: -o.scroll.offset.x,
            y: -o.scroll.offset.y
        }),
        r && (e.x *= r.x.scale,
        e.y *= r.y.scale,
        Pi(t, r)),
        s && rt(o.latestValues) && pt(t, o.latestValues))
    }
    e.x = In(e.x),
    e.y = In(e.y)
}
function In(t) {
    return Number.isInteger(t) || t > 1.0000000000001 || t < .999999999999 ? t : 1
}
function Z(t, e) {
    t.min = t.min + e,
    t.max = t.max + e
}
function Un(t, e, [n,s,i]) {
    const o = e[i] !== void 0 ? e[i] : .5
      , r = C(t.min, t.max, o);
    De(t, e[n], e[s], r, e.scale)
}
const Ea = ["x", "scaleX", "originX"]
  , Fa = ["y", "scaleY", "originY"];
function pt(t, e) {
    Un(t.x, e, Ea),
    Un(t.y, e, Fa)
}
function Ti(t, e) {
    return vi(La(t.getBoundingClientRect(), e))
}
function Ba(t, e, n) {
    const s = Ti(t, n)
      , {scroll: i} = e;
    return i && (Z(s.x, i.offset.x),
    Z(s.y, i.offset.y)),
    s
}
const ka = new WeakMap;
class ja {
    constructor(e) {
        this.openGlobalLock = null,
        this.isDragging = !1,
        this.currentDirection = null,
        this.originPoint = {
            x: 0,
            y: 0
        },
        this.constraints = !1,
        this.hasMutatedConstraints = !1,
        this.elastic = R(),
        this.visualElement = e
    }
    start(e, {snapToCursor: n=!1}={}) {
        const {presenceContext: s} = this.visualElement;
        if (s && s.isPresent === !1)
            return;
        const i = l=>{
            this.stopAnimation(),
            n && this.snapToCursor(te(l, "page").point)
        }
          , o = (l,c)=>{
            const {drag: u, dragPropagation: h, onDragStart: f} = this.getProps();
            if (u && !h && (this.openGlobalLock && this.openGlobalLock(),
            this.openGlobalLock = Fs(u),
            !this.openGlobalLock))
                return;
            this.isDragging = !0,
            this.currentDirection = null,
            this.resolveConstraints(),
            this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0,
            this.visualElement.projection.target = void 0),
            N(m=>{
                let p = this.getAxisMotionValue(m).get() || 0;
                if (G.test(p)) {
                    const {projection: T} = this.visualElement;
                    if (T && T.layout) {
                        const v = T.layout.layoutBox[m];
                        v && (p = I(v) * (parseFloat(p) / 100))
                    }
                }
                this.originPoint[m] = p
            }
            ),
            f && w.update(()=>f(l, c), !1, !0);
            const {animationState: d} = this.visualElement;
            d && d.setActive("whileDrag", !0)
        }
          , r = (l,c)=>{
            const {dragPropagation: u, dragDirectionLock: h, onDirectionLock: f, onDrag: d} = this.getProps();
            if (!u && !this.openGlobalLock)
                return;
            const {offset: m} = c;
            if (h && this.currentDirection === null) {
                this.currentDirection = Oa(m),
                this.currentDirection !== null && f && f(this.currentDirection);
                return
            }
            this.updateAxis("x", c.point, m),
            this.updateAxis("y", c.point, m),
            this.visualElement.render(),
            d && d(l, c)
        }
          , a = (l,c)=>this.stop(l, c);
        this.panSession = new gi(e,{
            onSessionStart: i,
            onStart: o,
            onMove: r,
            onSessionEnd: a
        },{
            transformPagePoint: this.visualElement.getTransformPagePoint()
        })
    }
    stop(e, n) {
        const s = this.isDragging;
        if (this.cancel(),
        !s)
            return;
        const {velocity: i} = n;
        this.startAnimation(i);
        const {onDragEnd: o} = this.getProps();
        o && w.update(()=>o(e, n))
    }
    cancel() {
        this.isDragging = !1;
        const {projection: e, animationState: n} = this.visualElement;
        e && (e.isAnimationBlocked = !1),
        this.panSession && this.panSession.end(),
        this.panSession = void 0;
        const {dragPropagation: s} = this.getProps();
        !s && this.openGlobalLock && (this.openGlobalLock(),
        this.openGlobalLock = null),
        n && n.setActive("whileDrag", !1)
    }
    updateAxis(e, n, s) {
        const {drag: i} = this.getProps();
        if (!s || !It(e, i, this.currentDirection))
            return;
        const o = this.getAxisMotionValue(e);
        let r = this.originPoint[e] + s[e];
        this.constraints && this.constraints[e] && (r = Va(r, this.constraints[e], this.elastic[e])),
        o.set(r)
    }
    resolveConstraints() {
        const {dragConstraints: e, dragElastic: n} = this.getProps()
          , {layout: s} = this.visualElement.projection || {}
          , i = this.constraints;
        e && ft(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && s ? this.constraints = Sa(s.layoutBox, e) : this.constraints = !1,
        this.elastic = Da(n),
        i !== this.constraints && s && this.constraints && !this.hasMutatedConstraints && N(o=>{
            this.getAxisMotionValue(o) && (this.constraints[o] = wa(s.layoutBox[o], this.constraints[o]))
        }
        )
    }
    resolveRefConstraints() {
        const {dragConstraints: e, onMeasureDragConstraints: n} = this.getProps();
        if (!e || !ft(e))
            return !1;
        const s = e.current
          , {projection: i} = this.visualElement;
        if (!i || !i.layout)
            return !1;
        const o = Ba(s, i.root, this.visualElement.getTransformPagePoint());
        let r = Aa(i.layout.layoutBox, o);
        if (n) {
            const a = n(Ma(r));
            this.hasMutatedConstraints = !!a,
            a && (r = vi(a))
        }
        return r
    }
    startAnimation(e) {
        const {drag: n, dragMomentum: s, dragElastic: i, dragTransition: o, dragSnapToOrigin: r, onDragTransitionEnd: a} = this.getProps()
          , l = this.constraints || {}
          , c = N(u=>{
            if (!It(u, n, this.currentDirection))
                return;
            let h = l && l[u] || {};
            r && (h = {
                min: 0,
                max: 0
            });
            const f = i ? 200 : 1e6
              , d = i ? 40 : 1e7
              , m = {
                type: "inertia",
                velocity: s ? e[u] : 0,
                bounceStiffness: f,
                bounceDamping: d,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10,
                ...o,
                ...h
            };
            return this.startAxisValueAnimation(u, m)
        }
        );
        return Promise.all(c).then(a)
    }
    startAxisValueAnimation(e, n) {
        const s = this.getAxisMotionValue(e);
        return s.start(Ye(e, s, 0, n))
    }
    stopAnimation() {
        N(e=>this.getAxisMotionValue(e).stop())
    }
    getAxisMotionValue(e) {
        const n = "_drag" + e.toUpperCase()
          , s = this.visualElement.getProps()
          , i = s[n];
        return i || this.visualElement.getValue(e, (s.initial ? s.initial[e] : void 0) || 0)
    }
    snapToCursor(e) {
        N(n=>{
            const {drag: s} = this.getProps();
            if (!It(n, s, this.currentDirection))
                return;
            const {projection: i} = this.visualElement
              , o = this.getAxisMotionValue(n);
            if (i && i.layout) {
                const {min: r, max: a} = i.layout.layoutBox[n];
                o.set(e[n] - C(r, a, .5))
            }
        }
        )
    }
    scalePositionWithinConstraints() {
        if (!this.visualElement.current)
            return;
        const {drag: e, dragConstraints: n} = this.getProps()
          , {projection: s} = this.visualElement;
        if (!ft(n) || !s || !this.constraints)
            return;
        this.stopAnimation();
        const i = {
            x: 0,
            y: 0
        };
        N(r=>{
            const a = this.getAxisMotionValue(r);
            if (a) {
                const l = a.get();
                i[r] = Ca({
                    min: l,
                    max: l
                }, this.constraints[r])
            }
        }
        );
        const {transformTemplate: o} = this.visualElement.getProps();
        this.visualElement.current.style.transform = o ? o({}, "") : "none",
        s.root && s.root.updateScroll(),
        s.updateLayout(),
        this.resolveConstraints(),
        N(r=>{
            if (!It(r, e, null))
                return;
            const a = this.getAxisMotionValue(r)
              , {min: l, max: c} = this.constraints[r];
            a.set(C(l, c, i[r]))
        }
        )
    }
    addListeners() {
        if (!this.visualElement.current)
            return;
        ka.set(this.visualElement, this);
        const e = this.visualElement.current
          , n = H(e, "pointerdown", l=>{
            const {drag: c, dragListener: u=!0} = this.getProps();
            c && u && this.start(l)
        }
        )
          , s = ()=>{
            const {dragConstraints: l} = this.getProps();
            ft(l) && (this.constraints = this.resolveRefConstraints())
        }
          , {projection: i} = this.visualElement
          , o = i.addEventListener("measure", s);
        i && !i.layout && (i.root && i.root.updateScroll(),
        i.updateLayout()),
        s();
        const r = _(window, "resize", ()=>this.scalePositionWithinConstraints())
          , a = i.addEventListener("didUpdate", ({delta: l, hasLayoutChanged: c})=>{
            this.isDragging && c && (N(u=>{
                const h = this.getAxisMotionValue(u);
                h && (this.originPoint[u] += l[u].translate,
                h.set(h.get() + l[u].translate))
            }
            ),
            this.visualElement.render())
        }
        );
        return ()=>{
            r(),
            n(),
            o(),
            a && a()
        }
    }
    getProps() {
        const e = this.visualElement.getProps()
          , {drag: n=!1, dragDirectionLock: s=!1, dragPropagation: i=!1, dragConstraints: o=!1, dragElastic: r=Ce, dragMomentum: a=!0} = e;
        return {
            ...e,
            drag: n,
            dragDirectionLock: s,
            dragPropagation: i,
            dragConstraints: o,
            dragElastic: r,
            dragMomentum: a
        }
    }
}
function It(t, e, n) {
    return (e === !0 || e === t) && (n === null || n === t)
}
function Oa(t, e=10) {
    let n = null;
    return Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x"),
    n
}
class Ia extends nt {
    constructor(e) {
        super(e),
        this.removeGroupControls = F,
        this.removeListeners = F,
        this.controls = new ja(e)
    }
    mount() {
        const {dragControls: e} = this.node.getProps();
        e && (this.removeGroupControls = e.subscribe(this.controls)),
        this.removeListeners = this.controls.addListeners() || F
    }
    unmount() {
        this.removeGroupControls(),
        this.removeListeners()
    }
}
const Nn = t=>(e,n)=>{
    t && w.update(()=>t(e, n))
}
;
class Ua extends nt {
    constructor() {
        super(...arguments),
        this.removePointerDownListener = F
    }
    onPointerDown(e) {
        this.session = new gi(e,this.createPanHandlers(),{
            transformPagePoint: this.node.getTransformPagePoint()
        })
    }
    createPanHandlers() {
        const {onPanSessionStart: e, onPanStart: n, onPan: s, onPanEnd: i} = this.node.getProps();
        return {
            onSessionStart: Nn(e),
            onStart: Nn(n),
            onMove: s,
            onEnd: (o,r)=>{
                delete this.session,
                i && w.update(()=>i(o, r))
            }
        }
    }
    mount() {
        this.removePointerDownListener = H(this.node.current, "pointerdown", e=>this.onPointerDown(e))
    }
    update() {
        this.session && this.session.updateHandlers(this.createPanHandlers())
    }
    unmount() {
        this.removePointerDownListener(),
        this.session && this.session.end()
    }
}
function Na() {
    const t = b.useContext(Ee);
    if (t === null)
        return [!0, null];
    const {isPresent: e, onExitComplete: n, register: s} = t
      , i = b.useId();
    return b.useEffect(()=>s(i), []),
    !e && n ? [!1, ()=>n && n(i)] : [!0]
}
const Nt = {
    hasAnimatedSinceResize: !0,
    hasEverUpdated: !1
};
function Gn(t, e) {
    return e.max === e.min ? 0 : t / (e.max - e.min) * 100
}
const Pt = {
    correct: (t,e)=>{
        if (!e.target)
            return t;
        if (typeof t == "string")
            if (x.test(t))
                t = parseFloat(t);
            else
                return t;
        const n = Gn(t, e.target.x)
          , s = Gn(t, e.target.y);
        return `${n}% ${s}%`
    }
}
  , Ga = {
    correct: (t,{treeScale: e, projectionDelta: n})=>{
        const s = t
          , i = et.parse(t);
        if (i.length > 5)
            return s;
        const o = et.createTransformer(t)
          , r = typeof i[0] != "number" ? 1 : 0
          , a = n.x.scale * e.x
          , l = n.y.scale * e.y;
        i[0 + r] /= a,
        i[1 + r] /= l;
        const c = C(a, l, .5);
        return typeof i[2 + r] == "number" && (i[2 + r] /= c),
        typeof i[3 + r] == "number" && (i[3 + r] /= c),
        o(i)
    }
};
class Wa extends fs.Component {
    componentDidMount() {
        const {visualElement: e, layoutGroup: n, switchLayoutGroup: s, layoutId: i} = this.props
          , {projection: o} = e;
        Ki($a),
        o && (n.group && n.group.add(o),
        s && s.register && i && s.register(o),
        o.root.didUpdate(),
        o.addEventListener("animationComplete", ()=>{
            this.safeToRemove()
        }
        ),
        o.setOptions({
            ...o.options,
            onExitComplete: ()=>this.safeToRemove()
        })),
        Nt.hasEverUpdated = !0
    }
    getSnapshotBeforeUpdate(e) {
        const {layoutDependency: n, visualElement: s, drag: i, isPresent: o} = this.props
          , r = s.projection;
        return r && (r.isPresent = o,
        i || e.layoutDependency !== n || n === void 0 ? r.willUpdate() : this.safeToRemove(),
        e.isPresent !== o && (o ? r.promote() : r.relegate() || w.postRender(()=>{
            const a = r.getStack();
            (!a || !a.members.length) && this.safeToRemove()
        }
        ))),
        null
    }
    componentDidUpdate() {
        const {projection: e} = this.props.visualElement;
        e && (e.root.didUpdate(),
        queueMicrotask(()=>{
            !e.currentAnimation && e.isLead() && this.safeToRemove()
        }
        ))
    }
    componentWillUnmount() {
        const {visualElement: e, layoutGroup: n, switchLayoutGroup: s} = this.props
          , {projection: i} = e;
        i && (i.scheduleCheckAfterUnmount(),
        n && n.group && n.group.remove(i),
        s && s.deregister && s.deregister(i))
    }
    safeToRemove() {
        const {safeToRemove: e} = this.props;
        e && e()
    }
    render() {
        return null
    }
}
function bi(t) {
    const [e,n] = Na()
      , s = b.useContext(gs);
    return fs.createElement(Wa, {
        ...t,
        layoutGroup: s,
        switchLayoutGroup: b.useContext(ys),
        isPresent: e,
        safeToRemove: n
    })
}
const $a = {
    borderRadius: {
        ...Pt,
        applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]
    },
    borderTopLeftRadius: Pt,
    borderTopRightRadius: Pt,
    borderBottomLeftRadius: Pt,
    borderBottomRightRadius: Pt,
    boxShadow: Ga
}
  , Vi = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"]
  , _a = Vi.length
  , Wn = t=>typeof t == "string" ? parseFloat(t) : t
  , $n = t=>typeof t == "number" || x.test(t);
function Ha(t, e, n, s, i, o) {
    i ? (t.opacity = C(0, n.opacity !== void 0 ? n.opacity : 1, za(s)),
    t.opacityExit = C(e.opacity !== void 0 ? e.opacity : 1, 0, Ka(s))) : o && (t.opacity = C(e.opacity !== void 0 ? e.opacity : 1, n.opacity !== void 0 ? n.opacity : 1, s));
    for (let r = 0; r < _a; r++) {
        const a = `border ${Vi[r]}Radius`;
        let l = _n(e, a)
          , c = _n(n, a);
        if (l === void 0 && c === void 0)
            continue;
        l || (l = 0),
        c || (c = 0),
        l === 0 || c === 0 || $n(l) === $n(c) ? (t[a] = Math.max(C(Wn(l), Wn(c), s), 0),
        (G.test(c) || G.test(l)) && (t[a] += "%")) : t[a] = c
    }
    (e.rotate || n.rotate) && (t.rotate = C(e.rotate || 0, n.rotate || 0, s))
}
function _n(t, e) {
    return t[e] !== void 0 ? t[e] : t.borderRadius
}
const za = Si(0, .5, _e)
  , Ka = Si(.5, .95, F);
function Si(t, e, n) {
    return s=>s < t ? 0 : s > e ? 1 : n(Mt(t, e, s))
}
function Hn(t, e) {
    t.min = e.min,
    t.max = e.max
}
function U(t, e) {
    Hn(t.x, e.x),
    Hn(t.y, e.y)
}
function zn(t, e, n, s, i) {
    return t -= e,
    t = Yt(t, 1 / n, s),
    i !== void 0 && (t = Yt(t, 1 / i, s)),
    t
}
function Ya(t, e=0, n=1, s=.5, i, o=t, r=t) {
    if (G.test(e) && (e = parseFloat(e),
    e = C(r.min, r.max, e / 100) - r.min),
    typeof e != "number")
        return;
    let a = C(o.min, o.max, s);
    t === o && (a -= e),
    t.min = zn(t.min, e, n, a, i),
    t.max = zn(t.max, e, n, a, i)
}
function Kn(t, e, [n,s,i], o, r) {
    Ya(t, e[n], e[s], e[i], e.scale, o, r)
}
const Xa = ["x", "scaleX", "originX"]
  , qa = ["y", "scaleY", "originY"];
function Yn(t, e, n, s) {
    Kn(t.x, e, Xa, n ? n.x : void 0, s ? s.x : void 0),
    Kn(t.y, e, qa, n ? n.y : void 0, s ? s.y : void 0)
}
function Xn(t) {
    return t.translate === 0 && t.scale === 1
}
function Ai(t) {
    return Xn(t.x) && Xn(t.y)
}
function Me(t, e) {
    return t.x.min === e.x.min && t.x.max === e.x.max && t.y.min === e.y.min && t.y.max === e.y.max
}
function qn(t) {
    return I(t.x) / I(t.y)
}
class Za {
    constructor() {
        this.members = []
    }
    add(e) {
        Xe(this.members, e),
        e.scheduleRender()
    }
    remove(e) {
        if (qe(this.members, e),
        e === this.prevLead && (this.prevLead = void 0),
        e === this.lead) {
            const n = this.members[this.members.length - 1];
            n && this.promote(n)
        }
    }
    relegate(e) {
        const n = this.members.findIndex(i=>e === i);
        if (n === 0)
            return !1;
        let s;
        for (let i = n; i >= 0; i--) {
            const o = this.members[i];
            if (o.isPresent !== !1) {
                s = o;
                break
            }
        }
        return s ? (this.promote(s),
        !0) : !1
    }
    promote(e, n) {
        const s = this.lead;
        if (e !== s && (this.prevLead = s,
        this.lead = e,
        e.show(),
        s)) {
            s.instance && s.scheduleRender(),
            e.scheduleRender(),
            e.resumeFrom = s,
            n && (e.resumeFrom.preserveOpacity = !0),
            s.snapshot && (e.snapshot = s.snapshot,
            e.snapshot.latestValues = s.animationValues || s.latestValues),
            e.root && e.root.isUpdating && (e.isLayoutDirty = !0);
            const {crossfade: i} = e.options;
            i === !1 && s.hide()
        }
    }
    exitAnimationComplete() {
        this.members.forEach(e=>{
            const {options: n, resumingFrom: s} = e;
            n.onExitComplete && n.onExitComplete(),
            s && s.options.onExitComplete && s.options.onExitComplete()
        }
        )
    }
    scheduleRender() {
        this.members.forEach(e=>{
            e.instance && e.scheduleRender(!1)
        }
        )
    }
    removeLeadSnapshot() {
        this.lead && this.lead.snapshot && (this.lead.snapshot = void 0)
    }
}
function Zn(t, e, n) {
    let s = "";
    const i = t.x.translate / e.x
      , o = t.y.translate / e.y;
    if ((i || o) && (s = `translate3d(${i}px, ${o}px, 0) `),
    (e.x !== 1 || e.y !== 1) && (s += `scale(${1 / e.x}, ${1 / e.y}) `),
    n) {
        const {rotate: l, rotateX: c, rotateY: u} = n;
        l && (s += `rotate(${l}deg) `),
        c && (s += `rotateX(${c}deg) `),
        u && (s += `rotateY(${u}deg) `)
    }
    const r = t.x.scale * e.x
      , a = t.y.scale * e.y;
    return (r !== 1 || a !== 1) && (s += `scale(${r}, ${a})`),
    s || "none"
}
const Ja = (t,e)=>t.depth - e.depth;
class Qa {
    constructor() {
        this.children = [],
        this.isDirty = !1
    }
    add(e) {
        Xe(this.children, e),
        this.isDirty = !0
    }
    remove(e) {
        qe(this.children, e),
        this.isDirty = !0
    }
    forEach(e) {
        this.isDirty && this.children.sort(Ja),
        this.isDirty = !1,
        this.children.forEach(e)
    }
}
function tl(t, e) {
    const n = performance.now()
      , s = ({timestamp: i})=>{
        const o = i - n;
        o >= e && (K(s),
        t(o - e))
    }
    ;
    return w.read(s, !0),
    ()=>K(s)
}
function el(t) {
    window.MotionDebug && window.MotionDebug.record(t)
}
function nl(t) {
    return t instanceof SVGElement && t.tagName !== "svg"
}
function sl(t, e, n) {
    const s = O(t) ? t : yt(t);
    return s.start(Ye("", s, e, n)),
    s.animation
}
const Jn = ["", "X", "Y", "Z"]
  , Qn = 1e3;
let il = 0;
const ot = {
    type: "projectionFrame",
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0
};
function Ci({attachResizeListener: t, defaultParent: e, measureScroll: n, checkIsScrollRoot: s, resetTransform: i}) {
    return class {
        constructor(r={}, a=e?.()) {
            this.id = il++,
            this.animationId = 0,
            this.children = new Set,
            this.options = {},
            this.isTreeAnimating = !1,
            this.isAnimationBlocked = !1,
            this.isLayoutDirty = !1,
            this.isProjectionDirty = !1,
            this.isSharedProjectionDirty = !1,
            this.isTransformDirty = !1,
            this.updateManuallyBlocked = !1,
            this.updateBlockedByResize = !1,
            this.isUpdating = !1,
            this.isSVG = !1,
            this.needsReset = !1,
            this.shouldResetTransform = !1,
            this.treeScale = {
                x: 1,
                y: 1
            },
            this.eventHandlers = new Map,
            this.hasTreeAnimated = !1,
            this.updateScheduled = !1,
            this.checkUpdateFailed = ()=>{
                this.isUpdating && (this.isUpdating = !1,
                this.clearAllSnapshots())
            }
            ,
            this.updateProjection = ()=>{
                ot.totalNodes = ot.resolvedTargetDeltas = ot.recalculatedProjection = 0,
                this.nodes.forEach(al),
                this.nodes.forEach(fl),
                this.nodes.forEach(dl),
                this.nodes.forEach(ll),
                el(ot)
            }
            ,
            this.hasProjected = !1,
            this.isVisible = !0,
            this.animationProgress = 0,
            this.sharedNodes = new Map,
            this.latestValues = r,
            this.root = a ? a.root || a : this,
            this.path = a ? [...a.path, a] : [],
            this.parent = a,
            this.depth = a ? a.depth + 1 : 0;
            for (let l = 0; l < this.path.length; l++)
                this.path[l].shouldResetTransform = !0;
            this.root === this && (this.nodes = new Qa)
        }
        addEventListener(r, a) {
            return this.eventHandlers.has(r) || this.eventHandlers.set(r, new Ze),
            this.eventHandlers.get(r).add(a)
        }
        notifyListeners(r, ...a) {
            const l = this.eventHandlers.get(r);
            l && l.notify(...a)
        }
        hasListeners(r) {
            return this.eventHandlers.has(r)
        }
        mount(r, a=this.root.hasTreeAnimated) {
            if (this.instance)
                return;
            this.isSVG = nl(r),
            this.instance = r;
            const {layoutId: l, layout: c, visualElement: u} = this.options;
            if (u && !u.current && u.mount(r),
            this.root.nodes.add(this),
            this.parent && this.parent.children.add(this),
            a && (c || l) && (this.isLayoutDirty = !0),
            t) {
                let h;
                const f = ()=>this.root.updateBlockedByResize = !1;
                t(r, ()=>{
                    this.root.updateBlockedByResize = !0,
                    h && h(),
                    h = tl(f, 250),
                    Nt.hasAnimatedSinceResize && (Nt.hasAnimatedSinceResize = !1,
                    this.nodes.forEach(es))
                }
                )
            }
            l && this.root.registerSharedNode(l, this),
            this.options.animate !== !1 && u && (l || c) && this.addEventListener("didUpdate", ({delta: h, hasLayoutChanged: f, hasRelativeTargetChanged: d, layout: m})=>{
                if (this.isTreeAnimationBlocked()) {
                    this.target = void 0,
                    this.relativeTarget = void 0;
                    return
                }
                const p = this.options.transition || u.getDefaultTransition() || vl
                  , {onLayoutAnimationStart: T, onLayoutAnimationComplete: v} = u.getProps()
                  , y = !this.targetLayout || !Me(this.targetLayout, m) || d
                  , g = !f && d;
                if (this.options.layoutRoot || this.resumeFrom && this.resumeFrom.instance || g || f && (y || !this.currentAnimation)) {
                    this.resumeFrom && (this.resumingFrom = this.resumeFrom,
                    this.resumingFrom.resumingFrom = void 0),
                    this.setAnimationOrigin(h, g);
                    const P = {
                        ...fi(p, "layout"),
                        onPlay: T,
                        onComplete: v
                    };
                    (u.shouldReduceMotion || this.options.layoutRoot) && (P.delay = 0,
                    P.type = !1),
                    this.startAnimation(P)
                } else
                    f || es(this),
                    this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
                this.targetLayout = m
            }
            )
        }
        unmount() {
            this.options.layoutId && this.willUpdate(),
            this.root.nodes.remove(this);
            const r = this.getStack();
            r && r.remove(this),
            this.parent && this.parent.children.delete(this),
            this.instance = void 0,
            K(this.updateProjection)
        }
        blockUpdate() {
            this.updateManuallyBlocked = !0
        }
        unblockUpdate() {
            this.updateManuallyBlocked = !1
        }
        isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize
        }
        isTreeAnimationBlocked() {
            return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1
        }
        startUpdate() {
            this.isUpdateBlocked() || (this.isUpdating = !0,
            this.nodes && this.nodes.forEach(ml),
            this.animationId++)
        }
        getTransformTemplate() {
            const {visualElement: r} = this.options;
            return r && r.getProps().transformTemplate
        }
        willUpdate(r=!0) {
            if (this.root.hasTreeAnimated = !0,
            this.root.isUpdateBlocked()) {
                this.options.onExitComplete && this.options.onExitComplete();
                return
            }
            if (!this.root.isUpdating && this.root.startUpdate(),
            this.isLayoutDirty)
                return;
            this.isLayoutDirty = !0;
            for (let u = 0; u < this.path.length; u++) {
                const h = this.path[u];
                h.shouldResetTransform = !0,
                h.updateScroll("snapshot"),
                h.options.layoutRoot && h.willUpdate(!1)
            }
            const {layoutId: a, layout: l} = this.options;
            if (a === void 0 && !l)
                return;
            const c = this.getTransformTemplate();
            this.prevTransformTemplateValue = c ? c(this.latestValues, "") : void 0,
            this.updateSnapshot(),
            r && this.notifyListeners("willUpdate")
        }
        update() {
            if (this.updateScheduled = !1,
            this.isUpdateBlocked()) {
                this.unblockUpdate(),
                this.clearAllSnapshots(),
                this.nodes.forEach(ts);
                return
            }
            this.isUpdating || this.nodes.forEach(ul),
            this.isUpdating = !1,
            this.nodes.forEach(hl),
            this.nodes.forEach(rl),
            this.nodes.forEach(ol),
            this.clearAllSnapshots();
            const a = performance.now();
            A.delta = tt(0, 1e3 / 60, a - A.timestamp),
            A.timestamp = a,
            A.isProcessing = !0,
            gt.update.process(A),
            gt.preRender.process(A),
            gt.render.process(A),
            A.isProcessing = !1
        }
        didUpdate() {
            this.updateScheduled || (this.updateScheduled = !0,
            queueMicrotask(()=>this.update()))
        }
        clearAllSnapshots() {
            this.nodes.forEach(cl),
            this.sharedNodes.forEach(pl)
        }
        scheduleUpdateProjection() {
            w.preRender(this.updateProjection, !1, !0)
        }
        scheduleCheckAfterUnmount() {
            w.postRender(()=>{
                this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed()
            }
            )
        }
        updateSnapshot() {
            this.snapshot || !this.instance || (this.snapshot = this.measure())
        }
        updateLayout() {
            if (!this.instance || (this.updateScroll(),
            !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
                return;
            if (this.resumeFrom && !this.resumeFrom.instance)
                for (let l = 0; l < this.path.length; l++)
                    this.path[l].updateScroll();
            const r = this.layout;
            this.layout = this.measure(!1),
            this.layoutCorrected = R(),
            this.isLayoutDirty = !1,
            this.projectionDelta = void 0,
            this.notifyListeners("measure", this.layout.layoutBox);
            const {visualElement: a} = this.options;
            a && a.notify("LayoutMeasure", this.layout.layoutBox, r ? r.layoutBox : void 0)
        }
        updateScroll(r="measure") {
            let a = !!(this.options.layoutScroll && this.instance);
            this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === r && (a = !1),
            a && (this.scroll = {
                animationId: this.root.animationId,
                phase: r,
                isRoot: s(this.instance),
                offset: n(this.instance)
            })
        }
        resetTransform() {
            if (!i)
                return;
            const r = this.isLayoutDirty || this.shouldResetTransform
              , a = this.projectionDelta && !Ai(this.projectionDelta)
              , l = this.getTransformTemplate()
              , c = l ? l(this.latestValues, "") : void 0
              , u = c !== this.prevTransformTemplateValue;
            r && (a || rt(this.latestValues) || u) && (i(this.instance, c),
            this.shouldResetTransform = !1,
            this.scheduleRender())
        }
        measure(r=!0) {
            const a = this.measurePageBox();
            let l = this.removeElementScroll(a);
            return r && (l = this.removeTransform(l)),
            xl(l),
            {
                animationId: this.root.animationId,
                measuredBox: a,
                layoutBox: l,
                latestValues: {},
                source: this.id
            }
        }
        measurePageBox() {
            const {visualElement: r} = this.options;
            if (!r)
                return R();
            const a = r.measureViewportBox()
              , {scroll: l} = this.root;
            return l && (Z(a.x, l.offset.x),
            Z(a.y, l.offset.y)),
            a
        }
        removeElementScroll(r) {
            const a = R();
            U(a, r);
            for (let l = 0; l < this.path.length; l++) {
                const c = this.path[l]
                  , {scroll: u, options: h} = c;
                if (c !== this.root && u && h.layoutScroll) {
                    if (u.isRoot) {
                        U(a, r);
                        const {scroll: f} = this.root;
                        f && (Z(a.x, -f.offset.x),
                        Z(a.y, -f.offset.y))
                    }
                    Z(a.x, u.offset.x),
                    Z(a.y, u.offset.y)
                }
            }
            return a
        }
        applyTransform(r, a=!1) {
            const l = R();
            U(l, r);
            for (let c = 0; c < this.path.length; c++) {
                const u = this.path[c];
                !a && u.options.layoutScroll && u.scroll && u !== u.root && pt(l, {
                    x: -u.scroll.offset.x,
                    y: -u.scroll.offset.y
                }),
                rt(u.latestValues) && pt(l, u.latestValues)
            }
            return rt(this.latestValues) && pt(l, this.latestValues),
            l
        }
        removeTransform(r) {
            const a = R();
            U(a, r);
            for (let l = 0; l < this.path.length; l++) {
                const c = this.path[l];
                if (!c.instance || !rt(c.latestValues))
                    continue;
                we(c.latestValues) && c.updateSnapshot();
                const u = R()
                  , h = c.measurePageBox();
                U(u, h),
                Yn(a, c.latestValues, c.snapshot ? c.snapshot.layoutBox : void 0, u)
            }
            return rt(this.latestValues) && Yn(a, this.latestValues),
            a
        }
        setTargetDelta(r) {
            this.targetDelta = r,
            this.root.scheduleUpdateProjection(),
            this.isProjectionDirty = !0
        }
        setOptions(r) {
            this.options = {
                ...this.options,
                ...r,
                crossfade: r.crossfade !== void 0 ? r.crossfade : !0
            }
        }
        clearMeasurements() {
            this.scroll = void 0,
            this.layout = void 0,
            this.snapshot = void 0,
            this.prevTransformTemplateValue = void 0,
            this.targetDelta = void 0,
            this.target = void 0,
            this.isLayoutDirty = !1
        }
        forceRelativeParentToResolveTarget() {
            this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== A.timestamp && this.relativeParent.resolveTargetDelta(!0)
        }
        resolveTargetDelta(r=!1) {
            var a;
            const l = this.getLead();
            this.isProjectionDirty || (this.isProjectionDirty = l.isProjectionDirty),
            this.isTransformDirty || (this.isTransformDirty = l.isTransformDirty),
            this.isSharedProjectionDirty || (this.isSharedProjectionDirty = l.isSharedProjectionDirty);
            const c = !!this.resumingFrom || this !== l;
            if (!(r || c && this.isSharedProjectionDirty || this.isProjectionDirty || !((a = this.parent) === null || a === void 0) && a.isProjectionDirty || this.attemptToResolveRelativeTarget))
                return;
            const {layout: h, layoutId: f} = this.options;
            if (!(!this.layout || !(h || f))) {
                if (this.resolvedRelativeTargetAt = A.timestamp,
                !this.targetDelta && !this.relativeTarget) {
                    const d = this.getClosestProjectingParent();
                    d && d.layout && this.animationProgress !== 1 ? (this.relativeParent = d,
                    this.forceRelativeParentToResolveTarget(),
                    this.relativeTarget = R(),
                    this.relativeTargetOrigin = R(),
                    At(this.relativeTargetOrigin, this.layout.layoutBox, d.layout.layoutBox),
                    U(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0
                }
                if (!(!this.relativeTarget && !this.targetDelta)) {
                    if (this.target || (this.target = R(),
                    this.targetWithTransforms = R()),
                    this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(),
                    ba(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : U(this.target, this.layout.layoutBox),
                    Pi(this.target, this.targetDelta)) : U(this.target, this.layout.layoutBox),
                    this.attemptToResolveRelativeTarget) {
                        this.attemptToResolveRelativeTarget = !1;
                        const d = this.getClosestProjectingParent();
                        d && !!d.resumingFrom == !!this.resumingFrom && !d.options.layoutScroll && d.target && this.animationProgress !== 1 ? (this.relativeParent = d,
                        this.forceRelativeParentToResolveTarget(),
                        this.relativeTarget = R(),
                        this.relativeTargetOrigin = R(),
                        At(this.relativeTargetOrigin, this.target, d.target),
                        U(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0
                    }
                    ot.resolvedTargetDeltas++
                }
            }
        }
        getClosestProjectingParent() {
            if (!(!this.parent || we(this.parent.latestValues) || xi(this.parent.latestValues)))
                return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent()
        }
        isProjecting() {
            return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
        }
        calcProjection() {
            var r;
            const a = this.getLead()
              , l = !!this.resumingFrom || this !== a;
            let c = !0;
            if ((this.isProjectionDirty || !((r = this.parent) === null || r === void 0) && r.isProjectionDirty) && (c = !1),
            l && (this.isSharedProjectionDirty || this.isTransformDirty) && (c = !1),
            this.resolvedRelativeTargetAt === A.timestamp && (c = !1),
            c)
                return;
            const {layout: u, layoutId: h} = this.options;
            if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation),
            this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
            !this.layout || !(u || h))
                return;
            U(this.layoutCorrected, this.layout.layoutBox);
            const f = this.treeScale.x
              , d = this.treeScale.y;
            Ra(this.layoutCorrected, this.treeScale, this.path, l),
            a.layout && !a.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (a.target = a.layout.layoutBox);
            const {target: m} = a;
            if (!m) {
                this.projectionTransform && (this.projectionDelta = mt(),
                this.projectionTransform = "none",
                this.scheduleRender());
                return
            }
            this.projectionDelta || (this.projectionDelta = mt(),
            this.projectionDeltaWithTransform = mt());
            const p = this.projectionTransform;
            St(this.projectionDelta, this.layoutCorrected, m, this.latestValues),
            this.projectionTransform = Zn(this.projectionDelta, this.treeScale),
            (this.projectionTransform !== p || this.treeScale.x !== f || this.treeScale.y !== d) && (this.hasProjected = !0,
            this.scheduleRender(),
            this.notifyListeners("projectionUpdate", m)),
            ot.recalculatedProjection++
        }
        hide() {
            this.isVisible = !1
        }
        show() {
            this.isVisible = !0
        }
        scheduleRender(r=!0) {
            if (this.options.scheduleRender && this.options.scheduleRender(),
            r) {
                const a = this.getStack();
                a && a.scheduleRender()
            }
            this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
        }
        setAnimationOrigin(r, a=!1) {
            const l = this.snapshot
              , c = l ? l.latestValues : {}
              , u = {
                ...this.latestValues
            }
              , h = mt();
            (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0),
            this.attemptToResolveRelativeTarget = !a;
            const f = R()
              , d = l ? l.source : void 0
              , m = this.layout ? this.layout.source : void 0
              , p = d !== m
              , T = this.getStack()
              , v = !T || T.members.length <= 1
              , y = !!(p && !v && this.options.crossfade === !0 && !this.path.some(yl));
            this.animationProgress = 0;
            let g;
            this.mixTargetDelta = P=>{
                const S = P / 1e3;
                ns(h.x, r.x, S),
                ns(h.y, r.y, S),
                this.setTargetDelta(h),
                this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (At(f, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
                gl(this.relativeTarget, this.relativeTargetOrigin, f, S),
                g && Me(this.relativeTarget, g) && (this.isProjectionDirty = !1),
                g || (g = R()),
                U(g, this.relativeTarget)),
                p && (this.animationValues = u,
                Ha(u, c, this.latestValues, S, y, v)),
                this.root.scheduleUpdateProjection(),
                this.scheduleRender(),
                this.animationProgress = S
            }
            ,
            this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0)
        }
        startAnimation(r) {
            this.notifyListeners("animationStart"),
            this.currentAnimation && this.currentAnimation.stop(),
            this.resumingFrom && this.resumingFrom.currentAnimation && this.resumingFrom.currentAnimation.stop(),
            this.pendingAnimation && (K(this.pendingAnimation),
            this.pendingAnimation = void 0),
            this.pendingAnimation = w.update(()=>{
                Nt.hasAnimatedSinceResize = !0,
                this.currentAnimation = sl(0, Qn, {
                    ...r,
                    onUpdate: a=>{
                        this.mixTargetDelta(a),
                        r.onUpdate && r.onUpdate(a)
                    }
                    ,
                    onComplete: ()=>{
                        r.onComplete && r.onComplete(),
                        this.completeAnimation()
                    }
                }),
                this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
                this.pendingAnimation = void 0
            }
            )
        }
        completeAnimation() {
            this.resumingFrom && (this.resumingFrom.currentAnimation = void 0,
            this.resumingFrom.preserveOpacity = void 0);
            const r = this.getStack();
            r && r.exitAnimationComplete(),
            this.resumingFrom = this.currentAnimation = this.animationValues = void 0,
            this.notifyListeners("animationComplete")
        }
        finishAnimation() {
            this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(Qn),
            this.currentAnimation.stop()),
            this.completeAnimation()
        }
        applyTransformsToTarget() {
            const r = this.getLead();
            let {targetWithTransforms: a, target: l, layout: c, latestValues: u} = r;
            if (!(!a || !l || !c)) {
                if (this !== r && this.layout && c && wi(this.options.animationType, this.layout.layoutBox, c.layoutBox)) {
                    l = this.target || R();
                    const h = I(this.layout.layoutBox.x);
                    l.x.min = r.target.x.min,
                    l.x.max = l.x.min + h;
                    const f = I(this.layout.layoutBox.y);
                    l.y.min = r.target.y.min,
                    l.y.max = l.y.min + f
                }
                U(a, l),
                pt(a, u),
                St(this.projectionDeltaWithTransform, this.layoutCorrected, a, u)
            }
        }
        registerSharedNode(r, a) {
            this.sharedNodes.has(r) || this.sharedNodes.set(r, new Za),
            this.sharedNodes.get(r).add(a);
            const c = a.options.initialPromotionConfig;
            a.promote({
                transition: c ? c.transition : void 0,
                preserveFollowOpacity: c && c.shouldPreserveFollowOpacity ? c.shouldPreserveFollowOpacity(a) : void 0
            })
        }
        isLead() {
            const r = this.getStack();
            return r ? r.lead === this : !0
        }
        getLead() {
            var r;
            const {layoutId: a} = this.options;
            return a ? ((r = this.getStack()) === null || r === void 0 ? void 0 : r.lead) || this : this
        }
        getPrevLead() {
            var r;
            const {layoutId: a} = this.options;
            return a ? (r = this.getStack()) === null || r === void 0 ? void 0 : r.prevLead : void 0
        }
        getStack() {
            const {layoutId: r} = this.options;
            if (r)
                return this.root.sharedNodes.get(r)
        }
        promote({needsReset: r, transition: a, preserveFollowOpacity: l}={}) {
            const c = this.getStack();
            c && c.promote(this, l),
            r && (this.projectionDelta = void 0,
            this.needsReset = !0),
            a && this.setOptions({
                transition: a
            })
        }
        relegate() {
            const r = this.getStack();
            return r ? r.relegate(this) : !1
        }
        resetRotation() {
            const {visualElement: r} = this.options;
            if (!r)
                return;
            let a = !1;
            const {latestValues: l} = r;
            if ((l.rotate || l.rotateX || l.rotateY || l.rotateZ) && (a = !0),
            !a)
                return;
            const c = {};
            for (let u = 0; u < Jn.length; u++) {
                const h = "rotate" + Jn[u];
                l[h] && (c[h] = l[h],
                r.setStaticValue(h, 0))
            }
            r.render();
            for (const u in c)
                r.setStaticValue(u, c[u]);
            r.scheduleRender()
        }
        getProjectionStyles(r={}) {
            var a, l;
            const c = {};
            if (!this.instance || this.isSVG)
                return c;
            if (this.isVisible)
                c.visibility = "";
            else
                return {
                    visibility: "hidden"
                };
            const u = this.getTransformTemplate();
            if (this.needsReset)
                return this.needsReset = !1,
                c.opacity = "",
                c.pointerEvents = Ut(r.pointerEvents) || "",
                c.transform = u ? u(this.latestValues, "") : "none",
                c;
            const h = this.getLead();
            if (!this.projectionDelta || !this.layout || !h.target) {
                const p = {};
                return this.options.layoutId && (p.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1,
                p.pointerEvents = Ut(r.pointerEvents) || ""),
                this.hasProjected && !rt(this.latestValues) && (p.transform = u ? u({}, "") : "none",
                this.hasProjected = !1),
                p
            }
            const f = h.animationValues || h.latestValues;
            this.applyTransformsToTarget(),
            c.transform = Zn(this.projectionDeltaWithTransform, this.treeScale, f),
            u && (c.transform = u(f, c.transform));
            const {x: d, y: m} = this.projectionDelta;
            c.transformOrigin = `${d.origin * 100}% ${m.origin * 100}% 0`,
            h.animationValues ? c.opacity = h === this ? (l = (a = f.opacity) !== null && a !== void 0 ? a : this.latestValues.opacity) !== null && l !== void 0 ? l : 1 : this.preserveOpacity ? this.latestValues.opacity : f.opacityExit : c.opacity = h === this ? f.opacity !== void 0 ? f.opacity : "" : f.opacityExit !== void 0 ? f.opacityExit : 0;
            for (const p in Gt) {
                if (f[p] === void 0)
                    continue;
                const {correct: T, applyTo: v} = Gt[p]
                  , y = c.transform === "none" ? f[p] : T(f[p], h);
                if (v) {
                    const g = v.length;
                    for (let P = 0; P < g; P++)
                        c[v[P]] = y
                } else
                    c[p] = y
            }
            return this.options.layoutId && (c.pointerEvents = h === this ? Ut(r.pointerEvents) || "" : "none"),
            c
        }
        clearSnapshot() {
            this.resumeFrom = this.snapshot = void 0
        }
        resetTree() {
            this.root.nodes.forEach(r=>{
                var a;
                return (a = r.currentAnimation) === null || a === void 0 ? void 0 : a.stop()
            }
            ),
            this.root.nodes.forEach(ts),
            this.root.sharedNodes.clear()
        }
    }
}
function rl(t) {
    t.updateLayout()
}
function ol(t) {
    var e;
    const n = ((e = t.resumeFrom) === null || e === void 0 ? void 0 : e.snapshot) || t.snapshot;
    if (t.isLead() && t.layout && n && t.hasListeners("didUpdate")) {
        const {layoutBox: s, measuredBox: i} = t.layout
          , {animationType: o} = t.options
          , r = n.source !== t.layout.source;
        o === "size" ? N(h=>{
            const f = r ? n.measuredBox[h] : n.layoutBox[h]
              , d = I(f);
            f.min = s[h].min,
            f.max = f.min + d
        }
        ) : wi(o, n.layoutBox, s) && N(h=>{
            const f = r ? n.measuredBox[h] : n.layoutBox[h]
              , d = I(s[h]);
            f.max = f.min + d,
            t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0,
            t.relativeTarget[h].max = t.relativeTarget[h].min + d)
        }
        );
        const a = mt();
        St(a, s, n.layoutBox);
        const l = mt();
        r ? St(l, t.applyTransform(i, !0), n.measuredBox) : St(l, s, n.layoutBox);
        const c = !Ai(a);
        let u = !1;
        if (!t.resumeFrom) {
            const h = t.getClosestProjectingParent();
            if (h && !h.resumeFrom) {
                const {snapshot: f, layout: d} = h;
                if (f && d) {
                    const m = R();
                    At(m, n.layoutBox, f.layoutBox);
                    const p = R();
                    At(p, s, d.layoutBox),
                    Me(m, p) || (u = !0),
                    h.options.layoutRoot && (t.relativeTarget = p,
                    t.relativeTargetOrigin = m,
                    t.relativeParent = h)
                }
            }
        }
        t.notifyListeners("didUpdate", {
            layout: s,
            snapshot: n,
            delta: l,
            layoutDelta: a,
            hasLayoutChanged: c,
            hasRelativeTargetChanged: u
        })
    } else if (t.isLead()) {
        const {onExitComplete: s} = t.options;
        s && s()
    }
    t.options.transition = void 0
}
function al(t) {
    ot.totalNodes++,
    t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
    t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)),
    t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty))
}
function ll(t) {
    t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1
}
function cl(t) {
    t.clearSnapshot()
}
function ts(t) {
    t.clearMeasurements()
}
function ul(t) {
    t.isLayoutDirty = !1
}
function hl(t) {
    const {visualElement: e} = t.options;
    e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"),
    t.resetTransform()
}
function es(t) {
    t.finishAnimation(),
    t.targetDelta = t.relativeTarget = t.target = void 0,
    t.isProjectionDirty = !0
}
function fl(t) {
    t.resolveTargetDelta()
}
function dl(t) {
    t.calcProjection()
}
function ml(t) {
    t.resetRotation()
}
function pl(t) {
    t.removeLeadSnapshot()
}
function ns(t, e, n) {
    t.translate = C(e.translate, 0, n),
    t.scale = C(e.scale, 1, n),
    t.origin = e.origin,
    t.originPoint = e.originPoint
}
function ss(t, e, n, s) {
    t.min = C(e.min, n.min, s),
    t.max = C(e.max, n.max, s)
}
function gl(t, e, n, s) {
    ss(t.x, e.x, n.x, s),
    ss(t.y, e.y, n.y, s)
}
function yl(t) {
    return t.animationValues && t.animationValues.opacityExit !== void 0
}
const vl = {
    duration: .45,
    ease: [.4, 0, .1, 1]
};
function is(t) {
    t.min = Math.round(t.min),
    t.max = Math.round(t.max)
}
function xl(t) {
    is(t.x),
    is(t.y)
}
function wi(t, e, n) {
    return t === "position" || t === "preserve-aspect" && !Ae(qn(e), qn(n), .2)
}
const Pl = Ci({
    attachResizeListener: (t,e)=>_(t, "resize", e),
    measureScroll: ()=>({
        x: document.documentElement.scrollLeft || document.body.scrollLeft,
        y: document.documentElement.scrollTop || document.body.scrollTop
    }),
    checkIsScrollRoot: ()=>!0
})
  , ge = {
    current: void 0
}
  , Di = Ci({
    measureScroll: t=>({
        x: t.scrollLeft,
        y: t.scrollTop
    }),
    defaultParent: ()=>{
        if (!ge.current) {
            const t = new Pl({});
            t.mount(window),
            t.setOptions({
                layoutScroll: !0
            }),
            ge.current = t
        }
        return ge.current
    }
    ,
    resetTransform: (t,e)=>{
        t.style.transform = e !== void 0 ? e : "none"
    }
    ,
    checkIsScrollRoot: t=>window.getComputedStyle(t).position === "fixed"
})
  , Tl = {
    pan: {
        Feature: Ua
    },
    drag: {
        Feature: Ia,
        ProjectionNode: Di,
        MeasureLayout: bi
    }
}
  , bl = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function Vl(t) {
    const e = bl.exec(t);
    if (!e)
        return [, ];
    const [,n,s] = e;
    return [n, s]
}
function Le(t, e, n=1) {
    const [s,i] = Vl(t);
    if (!s)
        return;
    const o = window.getComputedStyle(e).getPropertyValue(s);
    return o ? o.trim() : ye(i) ? Le(i, e, n + 1) : i
}
function Sl(t, {...e}, n) {
    const s = t.current;
    if (!(s instanceof Element))
        return {
            target: e,
            transitionEnd: n
        };
    n && (n = {
        ...n
    }),
    t.values.forEach(i=>{
        const o = i.get();
        if (!ye(o))
            return;
        const r = Le(o, s);
        r && i.set(r)
    }
    );
    for (const i in e) {
        const o = e[i];
        if (!ye(o))
            continue;
        const r = Le(o, s);
        r && (e[i] = r,
        n || (n = {}),
        n[i] === void 0 && (n[i] = o))
    }
    return {
        target: e,
        transitionEnd: n
    }
}
const Al = new Set(["width", "height", "top", "left", "right", "bottom", "x", "y", "translateX", "translateY"])
  , Mi = t=>Al.has(t)
  , Cl = t=>Object.keys(t).some(Mi)
  , rs = t=>t === ct || t === x
  , os = (t,e)=>parseFloat(t.split(", ")[e])
  , as = (t,e)=>(n,{transform: s})=>{
    if (s === "none" || !s)
        return 0;
    const i = s.match(/^matrix3d\((.+)\)$/);
    if (i)
        return os(i[1], e);
    {
        const o = s.match(/^matrix\((.+)\)$/);
        return o ? os(o[1], t) : 0
    }
}
  , wl = new Set(["x", "y", "z"])
  , Dl = Lt.filter(t=>!wl.has(t));
function Ml(t) {
    const e = [];
    return Dl.forEach(n=>{
        const s = t.getValue(n);
        s !== void 0 && (e.push([n, s.get()]),
        s.set(n.startsWith("scale") ? 1 : 0))
    }
    ),
    e.length && t.render(),
    e
}
const ls = {
    width: ({x: t},{paddingLeft: e="0", paddingRight: n="0"})=>t.max - t.min - parseFloat(e) - parseFloat(n),
    height: ({y: t},{paddingTop: e="0", paddingBottom: n="0"})=>t.max - t.min - parseFloat(e) - parseFloat(n),
    top: (t,{top: e})=>parseFloat(e),
    left: (t,{left: e})=>parseFloat(e),
    bottom: ({y: t},{top: e})=>parseFloat(e) + (t.max - t.min),
    right: ({x: t},{left: e})=>parseFloat(e) + (t.max - t.min),
    x: as(4, 13),
    y: as(5, 14)
}
  , Ll = (t,e,n)=>{
    const s = e.measureViewportBox()
      , i = e.current
      , o = getComputedStyle(i)
      , {display: r} = o
      , a = {};
    r === "none" && e.setStaticValue("display", t.display || "block"),
    n.forEach(c=>{
        a[c] = ls[c](s, o)
    }
    ),
    e.render();
    const l = e.measureViewportBox();
    return n.forEach(c=>{
        const u = e.getValue(c);
        u && u.jump(a[c]),
        t[c] = ls[c](l, o)
    }
    ),
    t
}
  , Rl = (t,e,n={},s={})=>{
    e = {
        ...e
    },
    s = {
        ...s
    };
    const i = Object.keys(e).filter(Mi);
    let o = []
      , r = !1;
    const a = [];
    if (i.forEach(l=>{
        const c = t.getValue(l);
        if (!t.hasValue(l))
            return;
        let u = n[l]
          , h = xt(u);
        const f = e[l];
        let d;
        if ($t(f)) {
            const m = f.length
              , p = f[0] === null ? 1 : 0;
            u = f[p],
            h = xt(u);
            for (let T = p; T < m && f[T] !== null; T++)
                d ? $e(xt(f[T]) === d) : d = xt(f[T])
        } else
            d = xt(f);
        if (h !== d)
            if (rs(h) && rs(d)) {
                const m = c.get();
                typeof m == "string" && c.set(parseFloat(m)),
                typeof f == "string" ? e[l] = parseFloat(f) : Array.isArray(f) && d === x && (e[l] = f.map(parseFloat))
            } else
                h?.transform && d?.transform && (u === 0 || f === 0) ? u === 0 ? c.set(d.transform(u)) : e[l] = h.transform(f) : (r || (o = Ml(t),
                r = !0),
                a.push(l),
                s[l] = s[l] !== void 0 ? s[l] : e[l],
                c.jump(f))
    }
    ),
    a.length) {
        const l = a.indexOf("height") >= 0 ? window.pageYOffset : null
          , c = Ll(e, t, a);
        return o.length && o.forEach(([u,h])=>{
            t.getValue(u).set(h)
        }
        ),
        t.render(),
        qt && l !== null && window.scrollTo({
            top: l
        }),
        {
            target: c,
            transitionEnd: s
        }
    } else
        return {
            target: e,
            transitionEnd: s
        }
}
;
function El(t, e, n, s) {
    return Cl(e) ? Rl(t, e, n, s) : {
        target: e,
        transitionEnd: s
    }
}
const Fl = (t,e,n,s)=>{
    const i = Sl(t, e, s);
    return e = i.target,
    s = i.transitionEnd,
    El(t, e, n, s)
}
  , Re = {
    current: null
}
  , Li = {
    current: !1
};
function Bl() {
    if (Li.current = !0,
    !!qt)
        if (window.matchMedia) {
            const t = window.matchMedia("(prefers-reduced-motion)")
              , e = ()=>Re.current = t.matches;
            t.addListener(e),
            e()
        } else
            Re.current = !1
}
function kl(t, e, n) {
    const {willChange: s} = e;
    for (const i in e) {
        const o = e[i]
          , r = n[i];
        if (O(o))
            t.addValue(i, o),
            Kt(s) && s.add(i);
        else if (O(r))
            t.addValue(i, yt(o, {
                owner: t
            })),
            Kt(s) && s.remove(i);
        else if (r !== o)
            if (t.hasValue(i)) {
                const a = t.getValue(i);
                !a.hasAnimated && a.set(o)
            } else {
                const a = t.getStaticValue(i);
                t.addValue(i, yt(a !== void 0 ? a : o, {
                    owner: t
                }))
            }
    }
    for (const i in n)
        e[i] === void 0 && t.removeValue(i);
    return e
}
const cs = new WeakMap
  , Ri = Object.keys(wt)
  , jl = Ri.length
  , us = ["AnimationStart", "AnimationComplete", "Update", "BeforeLayoutMeasure", "LayoutMeasure", "LayoutAnimationStart", "LayoutAnimationComplete"]
  , Ol = Be.length;
class Il {
    constructor({parent: e, props: n, presenceContext: s, reducedMotionConfig: i, visualState: o}, r={}) {
        this.current = null,
        this.children = new Set,
        this.isVariantNode = !1,
        this.isControllingVariants = !1,
        this.shouldReduceMotion = null,
        this.values = new Map,
        this.features = {},
        this.valueSubscriptions = new Map,
        this.prevMotionValues = {},
        this.events = {},
        this.propEventSubscriptions = {},
        this.notifyUpdate = ()=>this.notify("Update", this.latestValues),
        this.render = ()=>{
            this.current && (this.triggerBuild(),
            this.renderInstance(this.current, this.renderState, this.props.style, this.projection))
        }
        ,
        this.scheduleRender = ()=>w.render(this.render, !1, !0);
        const {latestValues: a, renderState: l} = o;
        this.latestValues = a,
        this.baseTarget = {
            ...a
        },
        this.initialValues = n.initial ? {
            ...a
        } : {},
        this.renderState = l,
        this.parent = e,
        this.props = n,
        this.presenceContext = s,
        this.depth = e ? e.depth + 1 : 0,
        this.reducedMotionConfig = i,
        this.options = r,
        this.isControllingVariants = Jt(n),
        this.isVariantNode = ps(n),
        this.isVariantNode && (this.variantChildren = new Set),
        this.manuallyAnimateOnMount = !!(e && e.current);
        const {willChange: c, ...u} = this.scrapeMotionValuesFromProps(n, {});
        for (const h in u) {
            const f = u[h];
            a[h] !== void 0 && O(f) && (f.set(a[h], !1),
            Kt(c) && c.add(h))
        }
    }
    scrapeMotionValuesFromProps(e, n) {
        return {}
    }
    mount(e) {
        this.current = e,
        cs.set(e, this),
        this.projection && !this.projection.instance && this.projection.mount(e),
        this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)),
        this.values.forEach((n,s)=>this.bindToMotionValue(s, n)),
        Li.current || Bl(),
        this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : Re.current,
        this.parent && this.parent.children.add(this),
        this.update(this.props, this.presenceContext)
    }
    unmount() {
        cs.delete(this.current),
        this.projection && this.projection.unmount(),
        K(this.notifyUpdate),
        K(this.render),
        this.valueSubscriptions.forEach(e=>e()),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        this.parent && this.parent.children.delete(this);
        for (const e in this.events)
            this.events[e].clear();
        for (const e in this.features)
            this.features[e].unmount();
        this.current = null
    }
    bindToMotionValue(e, n) {
        const s = lt.has(e)
          , i = n.on("change", r=>{
            this.latestValues[e] = r,
            this.props.onUpdate && w.update(this.notifyUpdate, !1, !0),
            s && this.projection && (this.projection.isTransformDirty = !0)
        }
        )
          , o = n.on("renderRequest", this.scheduleRender);
        this.valueSubscriptions.set(e, ()=>{
            i(),
            o()
        }
        )
    }
    sortNodePosition(e) {
        return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current)
    }
    loadFeatures({children: e, ...n}, s, i, o) {
        let r, a;
        for (let l = 0; l < jl; l++) {
            const c = Ri[l]
              , {isEnabled: u, Feature: h, ProjectionNode: f, MeasureLayout: d} = wt[c];
            f && (r = f),
            u(n) && (!this.features[c] && h && (this.features[c] = new h(this)),
            d && (a = d))
        }
        if (!this.projection && r) {
            this.projection = new r(this.latestValues,this.parent && this.parent.projection);
            const {layoutId: l, layout: c, drag: u, dragConstraints: h, layoutScroll: f, layoutRoot: d} = n;
            this.projection.setOptions({
                layoutId: l,
                layout: c,
                alwaysMeasureLayout: !!u || h && ft(h),
                visualElement: this,
                scheduleRender: ()=>this.scheduleRender(),
                animationType: typeof c == "string" ? c : "both",
                initialPromotionConfig: o,
                layoutScroll: f,
                layoutRoot: d
            })
        }
        return a
    }
    updateFeatures() {
        for (const e in this.features) {
            const n = this.features[e];
            n.isMounted ? n.update() : (n.mount(),
            n.isMounted = !0)
        }
    }
    triggerBuild() {
        this.build(this.renderState, this.latestValues, this.options, this.props)
    }
    measureViewportBox() {
        return this.current ? this.measureInstanceViewportBox(this.current, this.props) : R()
    }
    getStaticValue(e) {
        return this.latestValues[e]
    }
    setStaticValue(e, n) {
        this.latestValues[e] = n
    }
    makeTargetAnimatable(e, n=!0) {
        return this.makeTargetAnimatableFromInstance(e, this.props, n)
    }
    update(e, n) {
        (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
        this.prevProps = this.props,
        this.props = e,
        this.prevPresenceContext = this.presenceContext,
        this.presenceContext = n;
        for (let s = 0; s < us.length; s++) {
            const i = us[s];
            this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](),
            delete this.propEventSubscriptions[i]);
            const o = e["on" + i];
            o && (this.propEventSubscriptions[i] = this.on(i, o))
        }
        this.prevMotionValues = kl(this, this.scrapeMotionValuesFromProps(e, this.prevProps), this.prevMotionValues),
        this.handleChildMotionValue && this.handleChildMotionValue()
    }
    getProps() {
        return this.props
    }
    getVariant(e) {
        return this.props.variants ? this.props.variants[e] : void 0
    }
    getDefaultTransition() {
        return this.props.transition
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint
    }
    getClosestVariantNode() {
        return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0
    }
    getVariantContext(e=!1) {
        if (e)
            return this.parent ? this.parent.getVariantContext() : void 0;
        if (!this.isControllingVariants) {
            const s = this.parent ? this.parent.getVariantContext() || {} : {};
            return this.props.initial !== void 0 && (s.initial = this.props.initial),
            s
        }
        const n = {};
        for (let s = 0; s < Ol; s++) {
            const i = Be[s]
              , o = this.props[i];
            (Ct(o) || o === !1) && (n[i] = o)
        }
        return n
    }
    addVariantChild(e) {
        const n = this.getClosestVariantNode();
        if (n)
            return n.variantChildren && n.variantChildren.add(e),
            ()=>n.variantChildren.delete(e)
    }
    addValue(e, n) {
        n !== this.values.get(e) && (this.removeValue(e),
        this.bindToMotionValue(e, n)),
        this.values.set(e, n),
        this.latestValues[e] = n.get()
    }
    removeValue(e) {
        this.values.delete(e);
        const n = this.valueSubscriptions.get(e);
        n && (n(),
        this.valueSubscriptions.delete(e)),
        delete this.latestValues[e],
        this.removeValueFromRenderState(e, this.renderState)
    }
    hasValue(e) {
        return this.values.has(e)
    }
    getValue(e, n) {
        if (this.props.values && this.props.values[e])
            return this.props.values[e];
        let s = this.values.get(e);
        return s === void 0 && n !== void 0 && (s = yt(n, {
            owner: this
        }),
        this.addValue(e, s)),
        s
    }
    readValue(e) {
        return this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.readValueFromInstance(this.current, e, this.options)
    }
    setBaseTarget(e, n) {
        this.baseTarget[e] = n
    }
    getBaseTarget(e) {
        var n;
        const {initial: s} = this.props
          , i = typeof s == "string" || typeof s == "object" ? (n = We(this.props, s)) === null || n === void 0 ? void 0 : n[e] : void 0;
        if (s && i !== void 0)
            return i;
        const o = this.getBaseTargetFromProps(this.props, e);
        return o !== void 0 && !O(o) ? o : this.initialValues[e] !== void 0 && i === void 0 ? void 0 : this.baseTarget[e]
    }
    on(e, n) {
        return this.events[e] || (this.events[e] = new Ze),
        this.events[e].add(n)
    }
    notify(e, ...n) {
        this.events[e] && this.events[e].notify(...n)
    }
}
class Ei extends Il {
    sortInstanceNodePosition(e, n) {
        return e.compareDocumentPosition(n) & 2 ? 1 : -1
    }
    getBaseTargetFromProps(e, n) {
        return e.style ? e.style[n] : void 0
    }
    removeValueFromRenderState(e, {vars: n, style: s}) {
        delete n[e],
        delete s[e]
    }
    makeTargetAnimatableFromInstance({transition: e, transitionEnd: n, ...s}, {transformValues: i}, o) {
        let r = ia(s, e || {}, this);
        if (i && (n && (n = i(n)),
        s && (s = i(s)),
        r && (r = i(r))),
        o) {
            na(this, s, r);
            const a = Fl(this, s, r, n);
            n = a.transitionEnd,
            s = a.target
        }
        return {
            transition: e,
            transitionEnd: n,
            ...s
        }
    }
}
function Ul(t) {
    return window.getComputedStyle(t)
}
class Nl extends Ei {
    readValueFromInstance(e, n) {
        if (lt.has(n)) {
            const s = Ke(n);
            return s && s.default || 0
        } else {
            const s = Ul(e)
              , i = (Ps(n) ? s.getPropertyValue(n) : s[n]) || 0;
            return typeof i == "string" ? i.trim() : i
        }
    }
    measureInstanceViewportBox(e, {transformPagePoint: n}) {
        return Ti(e, n)
    }
    build(e, n, s, i) {
        je(e, n, s, i.transformTemplate)
    }
    scrapeMotionValuesFromProps(e, n) {
        return Ge(e, n)
    }
    handleChildMotionValue() {
        this.childSubscription && (this.childSubscription(),
        delete this.childSubscription);
        const {children: e} = this.props;
        O(e) && (this.childSubscription = e.on("change", n=>{
            this.current && (this.current.textContent = `${n}`)
        }
        ))
    }
    renderInstance(e, n, s, i) {
        Cs(e, n, s, i)
    }
}
class Gl extends Ei {
    constructor() {
        super(...arguments),
        this.isSVGTag = !1
    }
    getBaseTargetFromProps(e, n) {
        return e[n]
    }
    readValueFromInstance(e, n) {
        if (lt.has(n)) {
            const s = Ke(n);
            return s && s.default || 0
        }
        return n = ws.has(n) ? n : Ne(n),
        e.getAttribute(n)
    }
    measureInstanceViewportBox() {
        return R()
    }
    scrapeMotionValuesFromProps(e, n) {
        return Ms(e, n)
    }
    build(e, n, s, i) {
        Ie(e, n, s, this.isSVGTag, i.transformTemplate)
    }
    renderInstance(e, n, s, i) {
        Ds(e, n, s, i)
    }
    mount(e) {
        this.isSVGTag = Ue(e.tagName),
        super.mount(e)
    }
}
const Wl = (t,e)=>ke(t) ? new Gl(e,{
    enableHardwareAcceleration: !1
}) : new Nl(e,{
    enableHardwareAcceleration: !0
})
  , $l = {
    layout: {
        ProjectionNode: Di,
        MeasureLayout: bi
    }
}
  , _l = {
    ...va,
    ...Ir,
    ...Tl,
    ...$l
}
  , Ql = Hi((t,e)=>Tr(t, e, _l, Wl));
var Fi = {
    exports: {}
}
  , se = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hl = b
  , zl = Symbol.for("react.element")
  , Kl = Symbol.for("react.fragment")
  , Yl = Object.prototype.hasOwnProperty
  , Xl = Hl.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
  , ql = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function Bi(t, e, n) {
    var s, i = {}, o = null, r = null;
    n !== void 0 && (o = "" + n),
    e.key !== void 0 && (o = "" + e.key),
    e.ref !== void 0 && (r = e.ref);
    for (s in e)
        Yl.call(e, s) && !ql.hasOwnProperty(s) && (i[s] = e[s]);
    if (t && t.defaultProps)
        for (s in e = t.defaultProps,
        e)
            i[s] === void 0 && (i[s] = e[s]);
    return {
        $$typeof: zl,
        type: t,
        key: o,
        ref: r,
        props: i,
        _owner: Xl.current
    }
}
se.Fragment = Kl;
se.jsx = Bi;
se.jsxs = Bi;
Fi.exports = se;
var hs = Fi.exports;
const tc = ({title: t, id: e})=>hs.jsx("div", {
    children: hs.jsx("h2", {
        className: "text-2xl font-bold text-gray-700 my-4",
        id: e,
        children: t
    })
});
export {gs as L, Ee as P, tc as T, mr as a, w as f, hs as j, Ql as m, an as u};
