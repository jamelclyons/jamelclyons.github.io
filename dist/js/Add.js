import{u as re,a as R,r as t,s as r,p as i,q as c,b as pe,c as ue,d as de,e as je,j as e,z as he}from"./index.js";import{S as ge}from"./StatusBarComponent.js";import"https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";function _e(){const l=re(),{addLoading:j,addStatusCode:xe,addSuccessMessage:p,addErrorMessage:u}=R(n=>n.add),{languages:h,projectTypes:me,frameworks:fe,technologies:ve}=R(n=>n.taxonomies),[g,F]=t.useState(""),[_,B]=t.useState(""),[x,U]=t.useState(""),[m,V]=t.useState(""),[f,q]=t.useState(""),[d,z]=t.useState(""),[v,N]=t.useState(""),[y,H]=t.useState(""),[J,K]=t.useState(""),[C,O]=t.useState(""),[S,Q]=t.useState(""),[D,W]=t.useState(""),[P,X]=t.useState(""),[L,Y]=t.useState(""),[k,Z]=t.useState(""),[E,$]=t.useState(""),[T,ee]=t.useState(""),[w,te]=t.useState(""),[A,se]=t.useState(""),[I,ae]=t.useState(""),[b,oe]=t.useState(""),[G,le]=t.useState(""),[M,ne]=t.useState(""),o=n=>{try{const{name:s,value:a}=n.target;s==="id"?F(a):s==="price"?B(a):s==="project_id"?U(a):s==="project_title"?V(a):s==="project_slug"?q(a):s==="project_status"?z(a):s==="description"?N(a):s==="gallery"?H(a):s==="project_languages"?K(a):s==="title"?O(a):s==="client_id"?Q(a):s==="project_urls_list"?W(a):s==="project_details_list"?X(a):s==="project_versions_list"?Y(a):s==="design"?Z(a):s==="design_check_list"?$(a):s==="colors_list"?ee(a):s==="development"?te(a):s==="development_check_list"?se(a):s==="git_repo"?ae(a):s==="delivery"?oe(a):s==="delivery_check_list"?le(a):s==="project_team_list"&&ne(a)}catch(s){l(i(s.message)),l(c("error"))}},ie={id:g,price:_,project_id:x,project_title:m,project_slug:f,description:v,gallery:y,project_status:d,project_languages:J,title:C,client_id:S,project_urls_list:D,project_details_list:P,project_status:d,project_versions_list:L,design:k,design_check_list:E,colors_list:T,development:w,development_check_list:A,git_repo:I,delivery:b,delivery_check_list:G,project_team_list:M},ce=async n=>{n.preventDefault();try{l(he(ie)),l(c("info")),l(i("Standbye while an attempt to log you is made."))}catch(s){l(c("error")),l(i(s.message)),l(r(Date.now()))}};return t.useEffect(()=>{j&&l(r(Date.now()))},[j]),t.useEffect(()=>{p&&(l(i(p)),l(c("success")),l(r(Date.now())))},[p]),t.useEffect(()=>{u&&(l(i(u)),l(c("error")),l(r(Date.now())))},[u]),t.useEffect(()=>{l(pe())},[]),t.useEffect(()=>{l(ue())},[]),t.useEffect(()=>{l(de())},[]),t.useEffect(()=>{l(je())},[]),e.jsx(e.Fragment,{children:e.jsxs("main",{children:[e.jsx("h2",{children:"Add Project"}),e.jsxs("form",{action:"",children:[e.jsx("input",{type:"text",name:"id",placeholder:"ID",value:g,onChange:o}),e.jsx("input",{type:"text",name:"price",placeholder:"Price",value:_,onChange:o}),e.jsx("input",{type:"text",name:"project_id",placeholder:"Project ID",value:x,onChange:o}),e.jsx("input",{type:"text",name:"project_title",placeholder:"Project Title",value:m,onChange:o}),e.jsx("input",{type:"text",name:"project_slug",placeholder:"Project Slug",value:f,onChange:o}),e.jsx("input",{type:"text",name:"description",placeholder:"Description",value:v,onChange:o}),e.jsx("input",{type:"text",name:"gallery",placeholder:"Gallery",value:y,onChange:o}),e.jsx("input",{type:"text",name:"project_status",placeholder:"Project Status",value:d,onChange:o}),e.jsx("label",{for:"options",children:"Choose Languages:"}),e.jsx("select",{id:"options",children:Array.isArray(h)&&h.map((n,s)=>e.jsx("option",{value:n.id,children:n.title},s))}),e.jsx("input",{type:"text",name:"title",placeholder:"Title",value:C,onChange:o}),e.jsx("input",{type:"text",name:"client_id",placeholder:"client_id",value:S,onChange:o}),e.jsx("input",{type:"text",name:"project_urls_list",placeholder:"Project URLs List",value:D,onChange:o}),e.jsx("input",{type:"text",name:"project_details_list",placeholder:"Project Details List",value:P,onChange:o}),e.jsx("input",{type:"text",name:"project_versions_list",placeholder:"Project Versions List",value:L,onChange:o}),e.jsx("input",{type:"text",name:"design",placeholder:"Design",value:k,onChange:o}),e.jsx("input",{type:"text",name:"design_check_list",placeholder:"Design Check List",value:E,onChange:o}),e.jsx("input",{type:"text",name:"colors_list",placeholder:"Colors List",value:T,onChange:o}),e.jsx("input",{type:"text",name:"development",placeholder:"Development",value:w,onChange:o}),e.jsx("input",{type:"text",name:"development_check_list",placeholder:"Development Check List",value:A,onChange:o}),e.jsx("input",{type:"text",name:"git_repo",placeholder:"Git Repo",value:I,onChange:o}),e.jsx("input",{type:"text",name:"delivery",placeholder:"Delivery",value:b,onChange:o}),e.jsx("input",{type:"text",name:"delivery_check_list",placeholder:"Delivery Check List",value:G,onChange:o}),e.jsx("input",{type:"text",name:"project_team_list",placeholder:"Project Team List",value:M,onChange:o}),e.jsx("button",{onClick:ce,children:e.jsx("h3",{children:"add"})})]}),e.jsx(ge,{})]})})}function Pe(){return e.jsx("section",{className:"add",children:e.jsx(e.Fragment,{children:e.jsx(_e,{})})})}export{Pe as default};
//# sourceMappingURL=Add.js.map
