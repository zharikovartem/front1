(this["webpackJsonpepam-app"]=this["webpackJsonpepam-app"]||[]).push([[0],{148:function(e,t,n){},149:function(e,t,n){},266:function(e,t,n){"use strict";n.r(t);var s=n(15),c=n(0),a=n.n(c),o=n(25),i=n.n(o),r=(n(148),n(149),n(64)),l=n(94),u=n(270),j=n(272),b=n(105),d=n(91),f=n(275),h=n(274),p=n(41),O=n.n(p),m=n(56),g=n(273),k=n(271),x=n(269),T={labelCol:{span:8},wrapperCol:{span:16}},L={wrapperCol:{offset:8,span:16}},y=g.a.TextArea,C=function(e){return console.log(e),Object(s.jsxs)(k.a,Object(m.a)(Object(m.a)({},T),{},{name:"basic",initialValues:{remember:!0},onFinish:function(t){console.log("Success:",t),e.newTask(t)},onFinishFailed:function(e){console.log("Failed:",e)},children:[Object(s.jsx)(k.a.Item,{label:"Task name",name:"taskNime",rules:[{required:!0,message:"Please input task name!"}],children:Object(s.jsx)(g.a,{})}),Object(s.jsx)(k.a.Item,{label:"Task time",name:"taskTime",rules:[{required:!0,message:"Please input time!"}],children:Object(s.jsx)(x.a,{onChange:function(e,t){console.log(e,t)},format:"HH:mm"})}),Object(s.jsx)(k.a.Item,{label:"Description",name:"description",children:Object(s.jsx)(y,{rows:2})}),Object(s.jsx)(k.a.Item,Object(m.a)(Object(m.a)({},L),{},{children:Object(s.jsx)(d.a,{type:"primary",htmlType:"submit",children:"Create"})}))]}))},w={method:"POST",headers:{"Content-Type":"application/json"}},S={getTaskList:function(){fetch("http://81.90.181.175/api/tasks",{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){return console.log(e)})).catch((function(){return console.log("Can\u2019t access  response. Blocked by browser?")}))},newTask:function(e){console.log("data in api",e),w.body=JSON.stringify(e),console.log("postOptions",w),fetch("http://81.90.181.175/api/",w).then((function(e){return console.log(e.json()),e.json()})).then((function(e){console.log(e)}))}},v="SET_TASK_LIST",F={taskList:null},I=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0,n=Object(m.a)({},e);switch(t.type){case v:return n.taskList=t.taskList,n;default:return e}},Y=Object(r.b)((function(e){return{taskList:e.task.taskList}}),{newTask:function(e){return console.log("data in reducer: ",e),function(t){S.newTask(e).then((function(e){console.log(e)}))}}})(C),D=function(e){var t=Object(c.useState)(O()()),n=Object(l.a)(t,2),a=n[0],o=n[1],i=Object(c.useState)(!1),r=Object(l.a)(i,2),p=r[0],m=r[1],g=Object(c.useState)(!1),k=Object(l.a)(g,2),x=k[0],T=k[1];Object(c.useEffect)((function(){if(console.log("useEffect",e),null===e.taskList){console.log("getTaskList");fetch("http://81.90.181.175/api/tasks",{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){return console.log(e)})).catch((function(){return console.log("Can\u2019t access  response. Blocked by browser?")}))}}),[e.taskList]);return Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)("div",{className:"site-card-border-less-wrapper",children:[Object(s.jsx)(j.a,{title:Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("label",{children:"Select date:"}),Object(s.jsx)(b.a,{onChange:function(e,t){null!==e?(o(e),T(!1)):(o(O()(null)),T(!0))},defaultValue:a,format:"DD-MM-YYYY",style:{marginLeft:10}}),Object(s.jsx)(d.a,{type:"primary",shape:"round",icon:Object(s.jsx)(h.a,{}),style:{marginLeft:10},size:"small",onClick:function(){m(!0)},disabled:x,children:"Add"})]}),bordered:!1,children:function(){for(var e=[],t=0;t<24;t++)e.push(Object(s.jsxs)(u.a,{orientation:"left",children:[t<=9?"0":null,t,":00"]},t));return e}()}),Object(s.jsx)(f.a,{title:"Create New Task for "+a.format("DD MMM YYYY"),placement:"right",closable:!1,onClose:function(){m(!1)},visible:p,width:"80%",children:Object(s.jsx)(Y,{selectedDate:a})})]})})},E=Object(r.b)((function(e){return{taskList:e.task.taskList}}),{getTaskList:function(){return console.log("taskAPI",S),function(e){S.getTaskList().then((function(t){e({type:v,taskList:t})}))}}})(D),M=(n(265),n(66)),P=n(135),N=Object(M.c)({task:I}),A=Object(M.d)(N,Object(M.a)(P.a)),B=function(e){return Object(s.jsx)(r.a,{store:A,children:Object(s.jsx)("div",{className:"container",children:Object(s.jsx)(E,{})})})},J=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,276)).then((function(t){var n=t.getCLS,s=t.getFID,c=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),s(e),c(e),a(e),o(e)}))};i.a.render(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(B,{})}),document.getElementById("root")),J()}},[[266,1,2]]]);
//# sourceMappingURL=main.71c591e5.chunk.js.map