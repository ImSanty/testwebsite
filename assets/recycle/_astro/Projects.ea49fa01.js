import {j as e, T as d, m as i} from "./TitileSection.dcdcfc0c.js";
import "./index.03be2d59.js";
const m = ({colaborator: r})=>e.jsx("a", {
    href: r.url,
    target: "_blank",
    rel: "noreferrer",
    children: e.jsx("img", {
        src: r.img,
        alt: r.name,
        className: "w-8 h-8 rounded-full inline-block border-2 border-white aspect-square",
        referrerPolicy: "no-referrer",
        height: 32,
        width: 32,
        title: r.name
    })
})
  , x = ({projects: r, name: l})=>e.jsxs("div", {
    children: [e.jsx(d, {
        title: l,
        id: "projects"
    }), e.jsx(i.ul, {
        className: "grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-6 transition-all  ",
        children: r.map((s,a)=>e.jsxs(i.li, {
            className: "border border-gray-500 rounded-lg overflow-hidden bg-white flex flex-col  transition-all group",
            children: [e.jsx("picture", {
                className: "block aspect-video",
                children: e.jsx("img", {
                    src: s.image,
                    alt: s.name,
                    referrerPolicy: "no-referrer",
                    loading: "lazy",
                    width: "100%",
                    height: 140,
                    className: "object-cover "
                })
            }), e.jsxs("div", {
                className: "p-5",
                children: [e.jsx("h3", {
                    className: "font-bold text-lg mt-1",
                    children: s.name
                }), e.jsx("p", {
                    className: "",
                    children: s.description
                })]
            }), e.jsxs("footer", {
                className: "mt-auto w-full p-5 pt-0  text-sm flex gap-2 items-center",
                children: [e.jsx("div", {
                    className: "flex items-start gap-2",
                    children: e.jsx("div", {
                        className: "flex  justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-2 w-max",
                        children: s.colaborators.map((t,n)=>e.jsx(m, {
                            colaborator: t
                        }, n))
                    })
                }), e.jsxs("div", {
                    className: "w-max ml-auto text-xs flex items-center gap-2 ",
                    children: [e.jsx("a", {
                        href: s.github,
                        target: "_blank",
                        className: " text-indigo-600 hover:underline font-medium ",
                        children: "Code"
                    }), e.jsx("a", {
                        href: s.url,
                        target: "_blank",
                        className: "text-indigo-600 hover:underline font-medium",
                        children: "Live"
                    })]
                })]
            })]
        }, a))
    })]
});
export {x as default};
