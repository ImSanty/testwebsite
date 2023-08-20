import {r as e} from "./index.03be2d59.js";
import {u as N, f as $, a as A, P as F, L as S, j as o, m as v, T} from "./TitileSection.dcdcfc0c.js";
function M() {
    const n = e.useRef(!1);
    return N(()=>(n.current = !0,
    ()=>{
        n.current = !1
    }
    ), []),
    n
}
function U() {
    const n = M()
      , [r,t] = e.useState(0)
      , s = e.useCallback(()=>{
        n.current && t(r + 1)
    }
    , [r]);
    return [e.useCallback(()=>$.postRender(s), [s]), r]
}
class K extends e.Component {
    getSnapshotBeforeUpdate(r) {
        const t = this.props.childRef.current;
        if (t && r.isPresent && !this.props.isPresent) {
            const s = this.props.sizeRef.current;
            s.height = t.offsetHeight || 0,
            s.width = t.offsetWidth || 0,
            s.top = t.offsetTop,
            s.left = t.offsetLeft
        }
        return null
    }
    componentDidUpdate() {}
    render() {
        return this.props.children
    }
}
function O({children: n, isPresent: r}) {
    const t = e.useId()
      , s = e.useRef(null)
      , m = e.useRef({
        width: 0,
        height: 0,
        top: 0,
        left: 0
    });
    return e.useInsertionEffect(()=>{
        const {width: l, height: f, top: u, left: x} = m.current;
        if (r || !s.current || !l || !f)
            return;
        s.current.dataset.motionPopId = t;
        const p = document.createElement("style");
        return document.head.appendChild(p),
        p.sheet && p.sheet.insertRule(`
          [data-motion-pop-id="${t}"] {
            position: absolute !important;
            width: ${l}px !important;
            height: ${f}px !important;
            top: ${u}px !important;
            left: ${x}px !important;
          }
        `),
        ()=>{
            document.head.removeChild(p)
        }
    }
    , [r]),
    e.createElement(K, {
        isPresent: r,
        childRef: s,
        sizeRef: m
    }, e.cloneElement(n, {
        ref: s
    }))
}
const w = ({children: n, initial: r, isPresent: t, onExitComplete: s, custom: m, presenceAffectsLayout: l, mode: f})=>{
    const u = A(B)
      , x = e.useId()
      , p = e.useMemo(()=>({
        id: x,
        initial: r,
        isPresent: t,
        custom: m,
        onExitComplete: i=>{
            u.set(i, !0);
            for (const c of u.values())
                if (!c)
                    return;
            s && s()
        }
        ,
        register: i=>(u.set(i, !1),
        ()=>u.delete(i))
    }), l ? void 0 : [t]);
    return e.useMemo(()=>{
        u.forEach((i,c)=>u.set(c, !1))
    }
    , [t]),
    e.useEffect(()=>{
        !t && !u.size && s && s()
    }
    , [t]),
    f === "popLayout" && (n = e.createElement(O, {
        isPresent: t
    }, n)),
    e.createElement(F.Provider, {
        value: p
    }, n)
}
;
function B() {
    return new Map
}
function D(n) {
    return e.useEffect(()=>()=>n(), [])
}
const h = n=>n.key || "";
function G(n, r) {
    n.forEach(t=>{
        const s = h(t);
        r.set(s, t)
    }
    )
}
function H(n) {
    const r = [];
    return e.Children.forEach(n, t=>{
        e.isValidElement(t) && r.push(t)
    }
    ),
    r
}
const V = ({children: n, custom: r, initial: t=!0, onExitComplete: s, exitBeforeEnter: m, presenceAffectsLayout: l=!0, mode: f="sync"})=>{
    const u = e.useContext(S).forceRender || U()[0]
      , x = M()
      , p = H(n);
    let i = p;
    const c = e.useRef(new Map).current
      , g = e.useRef(i)
      , y = e.useRef(new Map).current
      , C = e.useRef(!0);
    if (N(()=>{
        C.current = !1,
        G(p, y),
        g.current = i
    }
    ),
    D(()=>{
        C.current = !0,
        y.clear(),
        c.clear()
    }
    ),
    C.current)
        return e.createElement(e.Fragment, null, i.map(a=>e.createElement(w, {
            key: h(a),
            isPresent: !0,
            initial: t ? void 0 : !1,
            presenceAffectsLayout: l,
            mode: f
        }, a)));
    i = [...i];
    const j = g.current.map(h)
      , b = p.map(h)
      , I = j.length;
    for (let a = 0; a < I; a++) {
        const d = j[a];
        b.indexOf(d) === -1 && !c.has(d) && c.set(d, void 0)
    }
    return f === "wait" && c.size && (i = []),
    c.forEach((a,d)=>{
        if (b.indexOf(d) !== -1)
            return;
        const R = y.get(d);
        if (!R)
            return;
        const z = j.indexOf(d);
        let E = a;
        if (!E) {
            const P = ()=>{
                y.delete(d),
                c.delete(d);
                const L = g.current.findIndex(k=>k.key === d);
                if (g.current.splice(L, 1),
                !c.size) {
                    if (g.current = p,
                    x.current === !1)
                        return;
                    u(),
                    s && s()
                }
            }
            ;
            E = e.createElement(w, {
                key: h(R),
                isPresent: !1,
                onExitComplete: P,
                custom: r,
                presenceAffectsLayout: l,
                mode: f
            }, R),
            c.set(d, E)
        }
        i.splice(z, 0, E)
    }
    ),
    i = i.map(a=>{
        const d = a.key;
        return c.has(d) ? a : e.createElement(w, {
            key: h(a),
            isPresent: !0,
            presenceAffectsLayout: l,
            mode: f
        }, a)
    }
    ),
    e.createElement(e.Fragment, null, c.size ? i : i.map(a=>e.cloneElement(a)))
}
  , W = ({responsability: n})=>o.jsxs("div", {
    className: "text-sm text-gray-500 my-1	",
    children: ["- ", n]
})
  , _ = ({responsabilities: n})=>{
    const [r,t] = e.useState(!0)
      , s = ()=>t(!r)
      , m = r ? "Expand" : "Collapse";
    return o.jsxs(v.article, {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        transition: {
            duration: .5
        },
        exit: {
            opacity: 0
        },
        style: {
            gridArea: "responsabilities"
        },
        children: [o.jsxs("div", {
            className: `${r ? "h-12 overflow-hidden relative" : "h-auto"}`,
            children: [r && o.jsx("span", {
                className: `${r ? " absolute w-full h-full overflow-hidden bg-gradient-to-b from-transparent to-white" : "h-auto hidden"}`
            }), n.map(l=>o.jsx(W, {
                responsability: l
            }, l))]
        }), o.jsx("footer", {
            className: "flex justify-between pt-4",
            children: o.jsxs("div", {
                className: "relative w-max   ml-auto group",
                children: [o.jsx("span", {
                    className: "w-full h-full  bg-gray-500 ml-0.5 mt-0.5 rounded-lg absolute left-0 top-0 group-active:m-0 group-hover:bg-indigo-950 transition-all group-hover:ml-1 group-hover:mt-1"
                }), o.jsx("button", {
                    className: "rounded-md border-gray-600 w-max px-3 py-1.5 text-xs bg-white border z-10 relative font-medium  hover:text-gray-950 text-gray-800 ",
                    onClick: s,
                    children: m
                })]
            })
        })]
    })
}
  , Q = ({experience: n, name: r})=>o.jsxs("section", {
    className: "mt-10",
    id: "experience",
    children: [o.jsx(T, {
        title: r,
        id: "experience"
    }), o.jsx(v.ul, {
        layout: !0,
        className: "mt-4 flex flex-col gap-4",
        children: o.jsx(V, {
            children: n.map(({id: t, company: s, position: m, date: l, responsabilities: f},u)=>o.jsx(v.li, {
                animate: {
                    opacity: 1
                },
                initial: {
                    opacity: 0
                },
                exit: {
                    opacity: 0
                },
                transition: {
                    duration: .5 * u + .2
                },
                className: "w-full transition-all",
                children: o.jsx("article", {
                    className: "border border-gray-500 rounded-md p-3  bg-white",
                    children: o.jsxs("header", {
                        className: "grid card-experience w-full",
                        children: [o.jsx("p", {
                            className: "font-medium text-lg",
                            style: {
                                gridArea: "companyName"
                            },
                            children: s
                        }), o.jsx("p", {
                            className: "text-sm text-gray-500",
                            style: {
                                gridArea: "position"
                            },
                            children: m
                        }), o.jsx("span", {
                            style: {
                                gridArea: "date"
                            },
                            className: "ml-auto",
                            children: l
                        }), o.jsx(_, {
                            responsabilities: f
                        })]
                    })
                })
            }, t))
        })
    })]
});
export {Q as default};
