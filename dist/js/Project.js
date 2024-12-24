import{r as n,j as e,a as N,u as F,h as k,i as w,k as L,l as T,m as P,n as b,L as A}from"./index.js";import{P as C,a as S}from"./ProjectDescription.js";import{C as p}from"./ContentComponent.js";import{T as D,a as f}from"./TaxListIcon.js";import{S as E}from"./StatusBarComponent.js";import"https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";function h(r){const{title:s,gallery:t}=r;console.log(t);const[c,a]=n.useState(0),o=n.useRef(null),u=()=>{c>0&&a(c-1)},x=()=>{c<r.gallery.length-1&&a(c+1)},g=j=>{const d=j.touches[0].clientX;o.current.setAttribute("data-touch-start",d)},y=j=>{const d=parseInt(o.current.getAttribute("data-touch-start"),10),l=j.changedTouches[0].clientX-d;l>50?u():l<-50&&x()};return e.jsx(e.Fragment,{children:t&&t.length>0?e.jsxs(e.Fragment,{children:[s&&e.jsx("h5",{className:"title",children:s}),e.jsxs("div",{className:"gallery",children:[c!==0?e.jsx("button",{className:"arrow-left",onClick:u,children:e.jsx("h2",{children:"V"})}):"",e.jsx("div",{className:"gallery-row",onTouchStart:g,onTouchEnd:y,ref:o,children:Array.isArray(t)&&e.jsx("span",{className:"gallery-photo",children:e.jsx("img",{className:"photo",src:t[c].url,alt:t[c].title,title:t[c].title})})}),c!==r.gallery.length-1?e.jsx("button",{className:"arrow-right",onClick:x,children:e.jsx("h2",{children:"V"})}):""]})]}):""})}function I(r){const{project_details:s}=r;return e.jsx(e.Fragment,{children:s?e.jsx("div",{className:"project-details",children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("label",{htmlFor:"client_name",children:"Client Name:"})}),e.jsx("td",{children:e.jsx("h4",{className:"company-name",children:s.client_name})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("label",{htmlFor:"start_date",children:"Start Date:"})}),e.jsx("td",{children:s.start_date})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("label",{htmlFor:"end_date",children:"End Date:"})}),e.jsx("td",{children:s.end_date})]})]})})}):""})}function X(r){const{features:s}=r;return Array.isArray(s)&&e.jsxs("div",{className:"product-features-card card",children:[e.jsx("h3",{children:"Features"}),e.jsx("div",{className:"product-features",children:s.map(t=>e.jsx(e.Fragment,{children:e.jsx("p",{className:"feature-name",id:"feature_name",children:t.name})}))})]})}function R(r){const{currency:s,price:t}=r;return e.jsx(e.Fragment,{children:s&&e.jsx("div",{className:"pricing",children:e.jsx("h4",{children:new Intl.NumberFormat("us",{style:"currency",currency:s,minimumFractionDigits:0,maximumFractionDigits:0}).format(t)})})})}function V(r){const{solution:s}=r;return e.jsx(e.Fragment,{children:e.jsx(e.Fragment,{children:s&&e.jsx(e.Fragment,{children:e.jsxs("div",{className:"project-solution",id:"project_solution",children:[e.jsx(X,{features:s.features}),e.jsx(R,{currency:s.currency,price:s.price}),e.jsx("h3",{children:"THE SOLUTION"}),e.jsx("div",{className:"card",dangerouslySetInnerHTML:{__html:s.content}})]})})})})}function _(r){const{project_urls:s}=r;return e.jsx(e.Fragment,{children:s?e.jsx("div",{className:"project-urls",children:Object.keys(s).map((t,c)=>e.jsxs("button",{onClick:()=>window.open(s[t].url,"_blank"),children:[e.jsx("i",{className:`${s[t].icon}`}),e.jsx("h3",{children:`${s[t].name}`})]},c))}):""})}function U(r){const{problem:s}=r;return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"project-problem",id:"project_problem",children:[e.jsx("h3",{className:"title",children:"the problem"}),e.jsx(h,{gallery:s==null?void 0:s.gallery}),e.jsx(p,{content:s==null?void 0:s.content})]})})}function v(r){const{checkList:s}=r;return e.jsx(e.Fragment,{children:s?e.jsx("div",{className:"checklist",children:Array.isArray(s)&&s.map((t,c)=>e.jsxs("span",{children:[e.jsx("input",{type:"checkbox",name:`task_${c}`,id:`task_${c}`,checked:t.status,disabled:!0}),e.jsx("h4",{children:t.name})]},c))}):""})}function $(r){const{colors:s}=r;return e.jsx(e.Fragment,{children:s?e.jsxs("div",{className:"colors",children:[e.jsxs("h5",{className:"title",children:["Colors (",s.length,")"]}),e.jsx("div",{className:"color-row",children:Array.isArray(s)&&s.map((t,c)=>e.jsxs("div",{className:"color",children:[e.jsx("span",{className:"color-square",style:{backgroundColor:t.color}}),e.jsx("h5",{children:t.color})]},c))})]}):""})}function H(r){var t,c,a,o;const{design:s}=r;return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"project-process-design",id:"project_process_design",children:[e.jsx("h4",{class:"title",children:"design"}),e.jsx(v,{checklist:s==null?void 0:s.checkList}),e.jsx($,{colors:s==null?void 0:s.colorsList}),e.jsx(h,{title:"Logos",gallery:(t=s==null?void 0:s.gallery)==null?void 0:t.logos}),e.jsx(h,{title:"icons",gallery:(c=s==null?void 0:s.gallery)==null?void 0:c.icons}),e.jsx(h,{title:"animations",gallery:(a=s==null?void 0:s.gallery)==null?void 0:a.animations}),e.jsx(h,{title:"uml diagrams",gallery:(o=s==null?void 0:s.gallery)==null?void 0:o.umlDiagrams}),e.jsx(p,{content:s.content})]})})}function M(){const{project_versions:r}=N(s=>s.portfolio);return e.jsx(e.Fragment,{children:r?e.jsxs("div",{className:"versions",children:[e.jsxs("span",{className:"current-version",children:[e.jsx("h4",{children:"Current Version"}),r.current_version]}),e.jsxs("span",{className:"upcoming-versions",children:[e.jsx("h4",{children:"Upcoming Versions"}),e.jsx("table",{children:e.jsx("tbody",{children:Array.isArray(r[0])&&r[0].map((s,t)=>e.jsxs("tr",{children:[e.jsx("td",{className:"feature",children:s.title}),e.jsx("td",{children:"-"}),e.jsx("td",{children:s.version})]},t))})})]})]}):""})}function O(r){const{development:s}=r;return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"project-process-development",id:"project_process_development",children:[e.jsx("h4",{class:"title",children:"development"}),e.jsx(v,{checkList:s.checkList}),e.jsx(p,{content:s.content}),e.jsx(_,{project_urls:s.repoURL}),e.jsx(M,{versions_list:s.versionsList})]})})}function q(r){const{delivery:s}=r;return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"project-process-delivery",id:"project_process_delivery",children:[e.jsx("h4",{class:"title",children:"delivery"}),e.jsx(v,{checkList:s.checkList}),e.jsx(h,{gallery:s.gallery}),e.jsx(p,{content:s.content})]})})}function B(r){const{process:s}=r;return e.jsx(e.Fragment,{children:s&&e.jsxs("div",{className:"project-process",id:"project_process",children:[e.jsx("h3",{class:"title",children:"the process"}),e.jsx(C,{project_status:s.status}),e.jsx(H,{design:s.design}),e.jsx(O,{development:s.development}),e.jsx(q,{delivery:s.delivery})]})})}function G(r){const s=F(),{project:t}=r,[c,a]=n.useState([]),[o,u]=n.useState([]),[x,g]=n.useState([]),[y,j]=n.useState([]);return n.useEffect(()=>{Array.isArray(t.types)&&(async()=>{const i=await Promise.all(t.types.map(async l=>{const m=await s(k(l));return console.log(m.payload),m.payload}));a(i)})()},[t.types,s]),n.useEffect(()=>{Array.isArray(t.languages)&&(async()=>{const i=await Promise.all(t.languages.map(async l=>(await s(w(l))).payload));u(i)})()},[t.languages,s]),n.useEffect(()=>{Array.isArray(t.frameworks)&&(async()=>{const i=await Promise.all(t.frameworks.map(async l=>(await s(L(l))).payload));g(i)})()},[t.frameworks,s]),n.useEffect(()=>{Array.isArray(t.technologies)&&(async()=>{const i=await Promise.all(t.technologies.map(async l=>(await s(T(l))).payload));j(i)})()},[t.technologies,s]),e.jsx(e.Fragment,{children:e.jsxs("main",{className:"project",children:[t.title&&e.jsx("h1",{class:"title",children:t.title}),e.jsx(S,{description:t.description}),e.jsx(_,{project_urls:t.urlsList}),e.jsx(V,{solution:t.solution}),e.jsx(B,{process:t.process}),e.jsx(U,{problem:t.problem}),e.jsx(D,{tax:c,title:"types"}),e.jsx(f,{tax:o,title:"languages"}),e.jsx(f,{tax:x,title:"frameworks"}),e.jsx(f,{tax:y,title:"technologies"}),e.jsx(I,{project_details:t.detailsList})]})})}function ee(){const{projectID:r}=P(),{portfolioLoading:s,portfolioErrorMessage:t,project:c}=N(o=>o.portfolio),a=F();return n.useEffect(()=>{r&&a(b(r))},[a,r]),n.useEffect(()=>{document.title=c.title},[c.title]),s?e.jsx(A,{}):(console.log(c),e.jsx("section",{className:"project",children:e.jsx(e.Fragment,{children:t?e.jsx("main",{className:"error-page",children:e.jsx(E,{messageType:"error",message:t})}):e.jsx(G,{project:c})})}))}export{ee as default};
//# sourceMappingURL=Project.js.map
