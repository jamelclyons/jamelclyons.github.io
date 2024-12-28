import{u as pe,a as w,r as t,P as xe,B as je,C as ge,D as Se,E as ye,s as h,q as i,t as d,b as me,c as ke,d as ve,e as be,j as s,F as fe,G as Ce,H as De}from"../index.js";import{S as we}from"./StatusBarComponent.CUGhuodM.js";class Le{detailsList=[];teamList=[];clientID=[];constructor(l={}){this.detailsList=l?.details_list||[],this.teamList=l?.team_list||[],this.clientID=l?.client_id||""}toObject(){return{}}}const Pe=()=>{const o=pe(),{addLoading:l,addSuccessMessage:u,addErrorMessage:p}=w(e=>e.add),{projectTypes:x,languages:j,frameworks:L,technologies:g}=w(e=>e.taxonomies),[S,P]=t.useState(""),[y,_]=t.useState(""),[m,F]=t.useState("");t.useState([]);const[k,T]=t.useState(""),[_e,A]=t.useState(""),[N,Fe]=t.useState([]),[E,Te]=t.useState([]),[$,Ae]=t.useState([]),[G,Ne]=t.useState([]),[v,I]=t.useState(""),[R,Ee]=t.useState([]),[M,$e]=t.useState([]),[U,Ge]=t.useState([]);t.useState([]);const[B,Ie]=t.useState([]),[q,Re]=t.useState([]);t.useState([]),t.useState([]);const[H,O]=t.useState(""),[b,V]=t.useState(new Set),[f,z]=t.useState(new Set),[C,J]=t.useState(new Set),[D,K]=t.useState(new Set),Q=e=>{V(a=>{const c=new Set(a);return c.has(e)?c.delete(e):c.add(e),c})},W=e=>{z(a=>{const c=new Set(a);return c.has(e)?c.delete(e):c.add(e),c})},X=e=>{J(a=>{const c=new Set(a);return c.has(e)?c.delete(e):c.add(e),c})},Y=e=>{K(a=>{const c=new Set(a);return c.has(e)?c.delete(e):c.add(e),c})},r=e=>{try{const a=e.target,{name:c,value:n}=a;c==="id"?P(n):c==="title"?_(n):c==="status"?F(n):c==="description"?T(n):c==="slug"?A(n):c==="repo_url"?I(n):c==="client_id"&&O(n)}catch(a){o(i(a.message)),o(d("error"))}},Z={solution_gallery:B},ee={design_check_list:N,design_gallery:E,colors_list:$},se={development_check_list:G,repo_url:v,versions_list:R},te={delivery_gallery:M,delivery_check_list:U},ce={},oe={},ae=new xe(Z),ne=new je(ee),le=new ge(se),re=new Se(te),ie=new De(m,ne,le,re),de=new ye(ce),he=new Le(oe),ue=async e=>{e.preventDefault();try{const a=new fe(S,y,k,q,ae,ie,de,b,f,C,D,he);o(Ce(a)),o(d("info")),o(i("Standbye while an attempt to log you is made."))}catch(a){const c=a;o(d("error")),o(i(c.message)),o(h(Date.now()))}};return t.useEffect(()=>{l&&o(h(Date.now()))},[l]),t.useEffect(()=>{u&&(o(i(u)),o(d("success")),o(h(Date.now())))},[u]),t.useEffect(()=>{p&&(o(i(p)),o(d("error")),o(h(Date.now())))},[p]),t.useEffect(()=>{o(me())},[]),t.useEffect(()=>{o(ke())},[]),t.useEffect(()=>{o(ve())},[]),t.useEffect(()=>{o(be())},[]),s.jsx(s.Fragment,{children:s.jsxs("main",{children:[s.jsx("h2",{children:"Add Project"}),s.jsxs("form",{action:"",children:[s.jsx("input",{type:"text",name:"id",placeholder:"ID",value:S,onChange:r}),s.jsx("input",{type:"text",name:"title",placeholder:"Title",value:y,onChange:r}),s.jsx("input",{type:"text",name:"status",placeholder:"Status",value:m,onChange:r}),s.jsx("input",{type:"text",name:"description",placeholder:"Description",value:k,onChange:r}),s.jsx("h2",{className:"title",children:"design"}),s.jsx("h2",{className:"title",children:"development"}),s.jsx("input",{type:"text",name:"repo_url",placeholder:"Repo URL",value:v,onChange:r}),s.jsxs("div",{className:"project-selection",children:[s.jsx("label",{htmlFor:"options",children:"Choose Project Types:"}),Array.isArray(x)&&x.map(e=>s.jsxs("div",{className:"project-checkbox",children:[s.jsx("input",{type:"checkbox",id:`checkbox-${e.id}`,value:e.id,checked:b.has(e.id),onChange:()=>Q(e.id)}),s.jsx("label",{htmlFor:`checkbox-${e.id}`,children:e.title})]},e.id))]}),s.jsxs("div",{className:"project-selection",children:[s.jsx("label",{htmlFor:"options",children:"Choose Languages:"}),Array.isArray(j)&&j.map(e=>s.jsxs("div",{className:"project-checkbox",children:[s.jsx("input",{type:"checkbox",id:`checkbox-${e.id}`,value:e.id,checked:f.has(e.id),onChange:()=>W(e.id)}),s.jsx("label",{htmlFor:`checkbox-${e.id}`,children:e.title})]},e.id))]}),s.jsxs("div",{className:"project-selection",children:[s.jsx("label",{htmlFor:"options",children:"Choose Frameworks:"}),Array.isArray(L)&&x.map(e=>s.jsxs("div",{className:"project-checkbox",children:[s.jsx("input",{type:"checkbox",id:`checkbox-${e.id}`,value:e.id,checked:C.has(e.id),onChange:()=>X(e.id)}),s.jsx("label",{htmlFor:`checkbox-${e.id}`,children:e.title})]},e.id))]}),s.jsxs("div",{className:"project-selection",children:[s.jsx("label",{htmlFor:"options",children:"Choose Technologies:"}),Array.isArray(g)&&g.map(e=>s.jsxs("div",{className:"project-checkbox",children:[s.jsx("input",{type:"checkbox",id:`checkbox-${e.id}`,value:e.id,checked:D.has(e.id),onChange:()=>Y(e.id)}),s.jsx("label",{htmlFor:`checkbox-${e.id}`,children:e.title})]},e.id))]}),s.jsx("h2",{className:"title",children:"delivery"}),s.jsx("input",{type:"text",name:"client_id",placeholder:"client_id",value:H,onChange:r}),s.jsx("button",{onClick:ue,children:s.jsx("h3",{children:"add"})})]}),s.jsx(we,{})]})})},Be=()=>s.jsx("section",{className:"add",children:s.jsx(s.Fragment,{children:s.jsx(Pe,{})})});export{Be as default};
//# sourceMappingURL=Add.CCjygJd-.js.map
