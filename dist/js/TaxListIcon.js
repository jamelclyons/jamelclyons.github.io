import{j as t}from"./index.js";function j(i){const{tax:s,title:e}=i,r=l=>{window.location.href=`/#/projects/${l.type}/${l.id}`};return Array.isArray(s)&&t.jsxs("div",{className:"tax-list",children:[t.jsx("h4",{className:"title",children:e}),t.jsx("div",{className:"tax-row",children:s.map((l,c)=>l&&l.title?t.jsx("button",{className:"tag",onClick:()=>r(l),children:t.jsx("h3",{children:l.title})},c):null)})]})}function a(i){const{icon:s,type:e}=i;return s instanceof Object?t.jsx("div",{className:"icon",children:t.jsx("a",{href:`#/projects/${s.type??e}/${s.id}`,children:s.icon_url?t.jsx("img",{src:s.icon_url,alt:s.title,title:s.title}):s.class_name&&t.jsx("i",{className:s.class_name,title:s.title})})}):null}function n(i){const{skills:s}=i;return t.jsx(t.Fragment,{children:Array.isArray(s)&&s.length>0&&t.jsx("div",{className:"project-skills-bar",children:s.map((e,r)=>t.jsx(a,{icon:e},r))})})}function x(i){const{tax:s,title:e}=i;return Array.isArray(s)&&t.jsxs("div",{className:"tax-list",children:[t.jsx("h4",{className:"title",children:e}),t.jsx("div",{className:"tax-row",children:t.jsx(n,{skills:s})})]})}export{a as I,j as T,x as a};
//# sourceMappingURL=TaxListIcon.js.map
