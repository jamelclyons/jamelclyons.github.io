import{j as s}from"./index.js";function x(t){const{tax:l,title:r}=t,i=e=>{window.location.href=`/#/projects/${e.type}/${e.id}`};return Array.isArray(l)&&s.jsxs("div",{className:"tax-list",children:[s.jsx("h4",{className:"title",children:r}),s.jsx("div",{className:"tax-row",children:l.map((e,a)=>e&&e.title?s.jsx("button",{className:"tag",onClick:()=>i(e),children:s.jsx("h3",{children:e.title})},a):null)})]})}function c({icon:t}){return t instanceof Object?s.jsx("div",{className:"icon",children:s.jsx("a",{href:`#/projects/${t.type}/${t.id}`,children:t.icon_url?s.jsx("img",{src:t.icon_url,alt:t.title,title:t.title}):t.class_name&&s.jsx("i",{className:t.class_name})})}):null}function n(t){const{skills:l}=t;return s.jsx(s.Fragment,{children:Array.isArray(l)&&l.length>0&&s.jsx("div",{className:"project-skills-bar",children:l.map((r,i)=>s.jsx(c,{icon:r},i))})})}function d(t){const{tax:l,title:r}=t;return Array.isArray(l)&&s.jsxs("div",{className:"tax-list",children:[s.jsx("h4",{className:"title",children:r}),s.jsx("div",{className:"tax-row",children:s.jsx(n,{skills:l})})]})}export{c as I,x as T,d as a};
//# sourceMappingURL=TaxListIcon.js.map
