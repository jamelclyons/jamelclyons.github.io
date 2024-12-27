import{u as De,a as D,r as o,P as Se,B as Le,C as we,D as Pe,E as Te,s as d,q as a,t as r,b as Fe,c as Ae,d as Ne,e as Ee,j as t,F as Ge,G as $e,H as Re}from"./index.js";import{S as Me}from"./StatusBarComponent.js";class Ue{constructor(i={}){this.detailsList=[],this.teamList=[],this.clientID=[],this.detailsList=(i==null?void 0:i.details_list)||[],this.teamList=(i==null?void 0:i.team_list)||[],this.clientID=(i==null?void 0:i.client_id)||""}toObject(){return{}}}function Be(){const c=De(),{addLoading:i,addSuccessMessage:h,addErrorMessage:u}=D(e=>e.add),{projectTypes:p,languages:g,frameworks:S,technologies:j}=D(e=>e.taxonomies),[x,L]=o.useState(""),[f,w]=o.useState(""),[y,P]=o.useState(""),[Oe,T]=o.useState([]),[m,F]=o.useState(""),[qe,A]=o.useState(""),[N,E]=o.useState([]),[G,$]=o.useState([]),[R,M]=o.useState([]),[U,B]=o.useState([]),[k,O]=o.useState(""),[q,H]=o.useState([]),[V,z]=o.useState([]),[J,K]=o.useState([]),[He,Q]=o.useState([]),[W,X]=o.useState([]),[Y,Z]=o.useState([]),[Ve,I]=o.useState([]),[ze,ee]=o.useState([]),[se,te]=o.useState(""),[b,le]=o.useState([]),[v,oe]=o.useState([]),[_,ce]=o.useState([]),[C,ie]=o.useState([]),ne=e=>{le(s=>s.includes(e)?s.filter(l=>l!==e):[...s,e])},ae=e=>{oe(s=>s.includes(e)?s.filter(l=>l!==e):[...s,e])},re=e=>{ce(s=>s.includes(e)?s.filter(l=>l!==e):[...s,e])},de=e=>{ie(s=>s.includes(e)?s.filter(l=>l!==e):[...s,e])},n=e=>{try{const{name:s,value:l}=e.target;s==="id"?L(l):s==="title"?w(l):s==="status"?P(l):s==="types"?T(l):s==="description"?F(l):s==="slug"?A(l):s==="design"?setDesign(l):s==="design_check_list"?E(l):s==="design_gallery"?$(l):s==="colors_list"?M(l):s==="development"?setDevelopment(l):s==="development_check_list"?B(l):s==="repo_url"?O(l):s==="versions_list"?H(l):s==="project_languages"?setLanguages(l):s==="project_frameworks"?setFrameworks(l):s==="project_technologies"?setTechnologies(l):s==="delivery"?setDelivery(l):s==="delivery_gallery"?z(l):s==="delivery_check_list"?K(l):s==="problem"?setProblem(l):s==="problem_gallery"?Q(l):s==="solution"?setSolution(l):s==="solution_gallery"?X(l):s==="urls_list"?Z(l):s==="details_list"?I(l):s==="team_list"?ee(l):s==="client_id"&&te(l)}catch(s){c(a(s.message)),c(r("error"))}},he={solution_gallery:W},ue={design_check_list:N,design_gallery:G,colors_list:R},pe={development_check_list:U,repo_url:k,versions_list:q},ge={delivery_gallery:V,delivery_check_list:J},je={},xe={},fe=new Se(he),ye=new Le(ue),me=new we(pe),ke=new Pe(ge),be=new Re(y,ye,me,ke),ve=new Te(je),_e=new Ue(xe),Ce=async e=>{e.preventDefault();try{const s=new Ge(x,f,m,Y,fe,be,ve,b,v,_,C,_e).toObject();c($e(s)),c(r("info")),c(a("Standbye while an attempt to log you is made."))}catch(s){c(r("error")),c(a(s.message)),c(d(Date.now()))}};return o.useEffect(()=>{i&&c(d(Date.now()))},[i]),o.useEffect(()=>{h&&(c(a(h)),c(r("success")),c(d(Date.now())))},[h]),o.useEffect(()=>{u&&(c(a(u)),c(r("error")),c(d(Date.now())))},[u]),o.useEffect(()=>{c(Fe())},[]),o.useEffect(()=>{c(Ae())},[]),o.useEffect(()=>{c(Ne())},[]),o.useEffect(()=>{c(Ee())},[]),t.jsx(t.Fragment,{children:t.jsxs("main",{children:[t.jsx("h2",{children:"Add Project"}),t.jsxs("form",{action:"",children:[t.jsx("input",{type:"text",name:"id",placeholder:"ID",value:x,onChange:n}),t.jsx("input",{type:"text",name:"title",placeholder:"Title",value:f,onChange:n}),t.jsx("input",{type:"text",name:"status",placeholder:"Status",value:y,onChange:n}),t.jsx("input",{type:"text",name:"description",placeholder:"Description",value:m,onChange:n}),t.jsx("h2",{className:"title",children:"design"}),t.jsx("h2",{className:"title",children:"development"}),t.jsx("input",{type:"text",name:"repo_url",placeholder:"Repo URL",value:k,onChange:n}),t.jsxs("div",{className:"project-selection",children:[t.jsx("label",{for:"options",children:"Choose Project Types:"}),Array.isArray(p)&&p.map(e=>t.jsxs("div",{className:"project-checkbox",children:[t.jsx("input",{type:"checkbox",id:`checkbox-${e.id}`,value:e.id,checked:b.includes(e.id),onChange:()=>ne(e.id)}),t.jsx("label",{htmlFor:`checkbox-${e.id}`,children:e.title})]},e.id))]}),t.jsxs("div",{className:"project-selection",children:[t.jsx("label",{for:"options",children:"Choose Languages:"}),Array.isArray(g)&&g.map(e=>t.jsxs("div",{className:"project-checkbox",children:[t.jsx("input",{type:"checkbox",id:`checkbox-${e.id}`,value:e.id,checked:v.includes(e.id),onChange:()=>ae(e.id)}),t.jsx("label",{htmlFor:`checkbox-${e.id}`,children:e.title})]},e.id))]}),t.jsxs("div",{className:"project-selection",children:[t.jsx("label",{for:"options",children:"Choose Frameworks:"}),Array.isArray(S)&&p.map(e=>t.jsxs("div",{className:"project-checkbox",children:[t.jsx("input",{type:"checkbox",id:`checkbox-${e.id}`,value:e.id,checked:_.includes(e.id),onChange:()=>re(e.id)}),t.jsx("label",{htmlFor:`checkbox-${e.id}`,children:e.title})]},e.id))]}),t.jsxs("div",{className:"project-selection",children:[t.jsx("label",{for:"options",children:"Choose Technologies:"}),Array.isArray(j)&&j.map(e=>t.jsxs("div",{className:"project-checkbox",children:[t.jsx("input",{type:"checkbox",id:`checkbox-${e.id}`,value:e.id,checked:C.includes(e.id),onChange:()=>de(e.id)}),t.jsx("label",{htmlFor:`checkbox-${e.id}`,children:e.title})]},e.id))]}),t.jsx("h2",{className:"title",children:"delivery"}),t.jsx("input",{type:"text",name:"client_id",placeholder:"client_id",value:se,onChange:n}),t.jsx("button",{onClick:Ce,children:t.jsx("h3",{children:"add"})})]}),t.jsx(Me,{})]})})}function Qe(){return t.jsx("section",{className:"add",children:t.jsx(t.Fragment,{children:t.jsx(Be,{})})})}export{Qe as default};
//# sourceMappingURL=Add.js.map
