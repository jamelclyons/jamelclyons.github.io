import{a,u as g,r as s,g as l,b as u,c as x,d as j,e as E,j as e,L as d}from"./index.js";import{P as h}from"./PortfolioComponent.js";import{S as P}from"./StatusBarComponent.js";import"https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";import"./ProjectsComponent.js";import"./ProjectDescription.js";import"./TaxListIcon.js";function b(){const{portfolioLoading:i,portfolio:r,portfolioErrorMessage:f}=a(t=>t.portfolio),{projectTypes:n,languages:p,frameworks:c,technologies:m}=a(t=>t.taxonomies),o=g();return s.useEffect(()=>{o(l())},[o]),s.useEffect(()=>{o(u())},[o]),s.useEffect(()=>{o(x())},[o]),s.useEffect(()=>{o(j())},[o]),s.useEffect(()=>{o(E())},[o]),i?e.jsx(d,{}):e.jsx("section",{className:"portfolio",children:e.jsx(e.Fragment,{children:r?e.jsx(h,{portfolio:r,projectTypes:n,languages:p,frameworks:c,technologies:m}):e.jsx(P,{messageType:"error",message:f})})})}export{b as default};
//# sourceMappingURL=Portfolio.js.map
