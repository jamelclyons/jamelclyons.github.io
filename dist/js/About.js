import{j as s,a as c,u as i,r as n,f as l}from"./index.js";import{C as u}from"./ContentComponent.js";import"https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";function d(r){const{user:t}=r,e=()=>{window.location.href="/#/resume"};return s.jsxs("div",{className:"author-info",children:[t.bio&&s.jsx("div",{className:"author-bio-card card",children:s.jsx("h3",{className:"author-bio",children:s.jsx("q",{children:t.bio})})}),s.jsxs("div",{class:"author",children:[s.jsx("div",{class:"author-card card",children:s.jsx("div",{class:"author-pic",children:s.jsx("img",{src:t.avatar_url,alt:""})})}),s.jsx("h2",{class:"title",children:t.title}),s.jsx("button",{onClick:e,children:s.jsx("h3",{class:"title",children:"resume"})})]})]})}function f(r){const{user:t}=r,{content:e}=c(a=>a.content),o=i();return n.useEffect(()=>{document.title="About - Jamel C. Lyons"},[]),n.useEffect(()=>{o(l("about"))},[o]),s.jsx(s.Fragment,{children:s.jsxs("section",{className:"about",children:[s.jsx(d,{user:t}),Array.isArray(e.story)&&s.jsx("div",{className:"story",children:s.jsx(u,{content:e.story})})]})})}export{f as default};
//# sourceMappingURL=About.js.map
