import{j as s}from"./index.js";import{a as e,P as l}from"./ProjectDescription.js";import{S as n}from"./StatusBarComponent.js";function x(o){const{projects:t}=o;return s.jsx(s.Fragment,{children:Array.isArray(t)?t.map((r,i)=>{var a;return s.jsx("a",{href:`#/portfolio/${r.id}`,children:s.jsxs("div",{className:"project-card card",children:[s.jsx("h2",{className:"title",children:r.title}),Array.isArray(r.solution.gallery)&&r.solution.gallery.length>0?s.jsx("img",{className:"photo",src:r.solution.gallery[0],alt:""}):"",s.jsx(e,{description:r.description}),r.process&&s.jsx(l,{project_status:(a=r.process)==null?void 0:a.status})]},i)})}):s.jsx(n,{})})}export{x as P};
//# sourceMappingURL=ProjectsComponent.js.map
