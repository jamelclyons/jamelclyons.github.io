import{r as u,j as t}from"./index.js";function f(e){const{title:s,gallery:n}=e;console.log(n);const[r,o]=u.useState(0),c=u.useRef(null),i=()=>{r>0&&o(r-1)},h=()=>{r<e.gallery.length-1&&o(r+1)},x=l=>{const a=l.touches[0].clientX;c.current.setAttribute("data-touch-start",a)},j=l=>{const a=parseInt(c.current.getAttribute("data-touch-start"),10),d=l.changedTouches[0].clientX-a;d>50?i():d<-50&&h()};return t.jsx(t.Fragment,{children:n&&n.length>0?t.jsxs(t.Fragment,{children:[s&&t.jsx("h5",{className:"title",children:s}),t.jsxs("div",{className:"gallery",children:[r!==0?t.jsx("button",{className:"arrow-left",onClick:i,children:t.jsx("h2",{children:"V"})}):"",t.jsx("div",{className:"gallery-row",onTouchStart:x,onTouchEnd:j,ref:c,children:Array.isArray(e.gallery)&&t.jsx("span",{className:"gallery-photo",children:t.jsx("img",{className:"photo",src:e.gallery[r],alt:""})})}),r!==e.gallery.length-1?t.jsx("button",{className:"arrow-right",onClick:h,children:t.jsx("h2",{children:"V"})}):""]})]}):""})}function y(e){const{project_status:s}=e;return t.jsx(t.Fragment,{children:s&&t.jsx(t.Fragment,{children:t.jsxs("div",{className:"project-status",children:[t.jsx("h4",{children:"STATUS"}),t.jsx("progress",{min:"0",value:s,max:"100"}),t.jsxs("p",{children:[s,"% Completed"]})]})})})}function p(e){const{description:s}=e;return t.jsx(t.Fragment,{children:s&&t.jsx("div",{className:"project-description",children:t.jsx("p",{children:s})})})}export{f as G,y as P,p as a};
//# sourceMappingURL=ProjectDescription.js.map
