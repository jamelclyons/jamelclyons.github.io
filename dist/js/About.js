import{j as s,a,u as i,r as c,f as l}from"./index.js";import"https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";function d(r){const{user:t}=r,e=()=>{window.location.href="/#/resume"};return s.jsxs("div",{className:"author-info",children:[t.bio&&s.jsx("div",{className:"author-bio-card card",children:s.jsx("h3",{className:"author-bio",children:s.jsx("q",{children:t.bio})})}),s.jsxs("div",{class:"author",children:[s.jsx("div",{class:"author-card card",children:s.jsx("div",{class:"author-pic",children:s.jsx("img",{src:t.avatar_url,alt:""})})}),s.jsx("h2",{class:"title",children:t.title}),s.jsx("button",{onClick:e,children:s.jsx("h3",{class:"title",children:"resume"})})]})]})}function u(r){const{content:t}=r;return s.jsx(s.Fragment,{children:Array.isArray(t)&&t.map((e,n)=>s.jsx("div",{className:"content",children:e},n))})}function j(r){const{user:t}=r,{content:e}=a(o=>o.content),n=i();return c.useEffect(()=>{document.title="About - Jamel C. Lyons"},[]),c.useEffect(()=>{n(l("about"))},[n]),s.jsx(s.Fragment,{children:s.jsxs("section",{className:"about",children:[s.jsx(d,{user:t}),Array.isArray(e.story)&&s.jsx("div",{className:"story",children:s.jsx(u,{content:e.story})})]})})}export{j as default};
//# sourceMappingURL=About.js.map
