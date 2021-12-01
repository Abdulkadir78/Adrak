(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[13],{296:function(e,r,t){"use strict";var n=t(225),a=t(2);r.a=function(e){var r=e.error;return Object(a.jsx)(n.a,{severity:"error",sx:{marginBottom:3},children:r})}},297:function(e,r,t){"use strict";var n=t(14),a=t(45),s=t(263),i=t(111),c=t(389),o=t(229),l=t(34),u=t(298),d=t(2),b=["type","label","fullWidth","halfMargin","register","errors","rules"];r.a=function(e){var r=e.type,t=e.label,j=e.fullWidth,f=e.halfMargin,h=e.register,m=e.errors,O=void 0===m?{}:m,x=e.rules,g=Object(a.a)(e,b),v=Object(s.a)((function(e){return e.breakpoints.down("sm")})),p=Object(u.a)().width,w=p-p/10;return Object(d.jsxs)(o.a,{mb:f?2:4,justifyContent:"center",width:v?w:350,sx:{mx:"auto"},children:[Object(d.jsx)(c.a,Object(n.a)(Object(n.a)(Object(n.a)({fullWidth:j,type:r,label:t,variant:"outlined",color:"secondary"},null===h||void 0===h?void 0:h(t,x)),g),{},{sx:["description","body"].includes(t)?Object(n.a)({},l.d.scrollbar):{}})),O[t]&&Object(d.jsx)(i.a,{variant:"caption",color:"error",children:O[t].message||O[t]})]})}},298:function(e,r,t){"use strict";var n=t(18),a=t(1);function s(){var e=window;return{width:e.innerWidth,height:e.innerHeight}}r.a=function(){var e=Object(a.useState)(s()),r=Object(n.a)(e,2),t=r[0],i=r[1];return Object(a.useEffect)((function(){function e(){i(s())}return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}),[]),t}},306:function(e,r,t){"use strict";var n=t(14),a=t(263),s=t(324),i=t(284),c=t(322),o=t(2),l={paddingTop:5,paddingBottom:3,display:"flex",flexDirection:"column",alignItems:"center"};r.a=function(e){var r=e.children,t=Object(a.a)((function(e){return e.breakpoints.down("md")}));return Object(o.jsx)(s.a,{children:Object(o.jsx)(c.a,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"100vh"},children:Object(o.jsx)(c.a,{item:!0,xs:12,sm:8,md:6,sx:t?l:null,children:t?r:Object(o.jsx)(i.a,{sx:Object(n.a)(Object(n.a)({},l),{},{position:"relative"}),children:r})})})})}},320:function(e,r,t){"use strict";var n=t(1),a=t(26);r.a=function(e){var r=Object(a.g)();Object(n.useEffect)((function(){var t=r.listen((function(){return e()}));return function(){return t()}}),[r,e])}},321:function(e,r,t){"use strict";var n=t(14),a=t(45),s=t(364),i=t(360),c=t(2),o=["label","checked","onChange"];r.a=function(e){var r=e.label,t=e.checked,l=e.onChange,u=Object(a.a)(e,o);return Object(c.jsx)(s.a,{control:Object(c.jsx)(i.a,Object(n.a)({checked:t,onChange:l},u)),label:r})}},388:function(e,r,t){"use strict";t.r(r);var n=t(6),a=t.n(n),s=t(11),i=t(18),c=t(1),o=t(26),l=t(21),u=t(312),d=t(111),b=t(283),j=t(229),f=t(32),h=t(60),m=t(320),O=t(75),x=t(354),g=t.n(x),v={username:{required:{value:!0,message:"Username is required"},minLength:{value:3,message:"Username should be atleast 3 characters long"},maxLength:{value:50,message:"Username cannot be more than 50 characters long"}},email:{required:{value:!0,message:"Email is required"},validate:function(e){return r=e,g()(r)||"Invalid email address";var r}},password:{required:{value:!0,message:"Password is required"},minLength:{value:6,message:"Password should be atleast 6 characters long"}},confirmPassword:{required:{value:!0,message:"Confirm password is required"}}},p=t(129),w=t(128),y=t(306),k=t(296),C=t(321),q=t(297),S=t(136),W=t(2);var E=function(){var e=Object(c.useState)(!1),r=Object(i.a)(e,2),t=r[0],n=r[1],x=Object(O.a)(),g=x.loading,E=x.error,L=Object(l.b)(),P=Object(o.g)(),I=Object(c.useCallback)((function(){E&&L(h.a.resetError())}),[L,E]);Object(m.a)(I);var z=Object(u.a)({mode:"onTouched"}),H=z.register,M=z.handleSubmit,U=z.formState.errors,B=function(){var e=Object(s.a)(a.a.mark((function e(r){var t,n,s,i,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=r.username,n=r.email,s=r.password,i=r["confirm password"],c={username:t,email:n,password:s,confirm_password:i},L(Object(f.c)(c)).unwrap().then((function(){P.push("/login")}),(function(){}));case 3:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return Object(W.jsxs)(y.a,{children:[g&&Object(W.jsx)(p.a,{}),Object(W.jsx)(S.a,{}),Object(W.jsx)(d.a,{mt:1,mb:4,children:"Create an account"}),Object(W.jsxs)("form",{onSubmit:M(B),children:[E&&Object(W.jsx)(k.a,{error:E}),Object(W.jsx)(q.a,{fullWidth:!0,type:"text",label:"username",register:H,errors:U,rules:v.username,disabled:g,autoFocus:!0}),Object(W.jsx)(q.a,{fullWidth:!0,type:"text",label:"email",register:H,errors:U,rules:v.email,disabled:g}),Object(W.jsx)(q.a,{fullWidth:!0,type:t?"text":"password",label:"password",register:H,errors:U,rules:v.password,disabled:g}),Object(W.jsx)(q.a,{fullWidth:!0,type:t?"text":"password",label:"confirm password",register:H,errors:U,rules:v.confirmPassword,disabled:g,halfMargin:!0}),Object(W.jsx)(C.a,{label:"Show Password",checked:t,onChange:function(){n((function(e){return!e}))},disabled:g}),Object(W.jsx)(j.a,{textAlign:"center",mt:3,children:Object(W.jsx)(b.a,{type:"submit",variant:"contained",color:"secondary",size:"large",disabled:g,children:"Sign up"})})]}),Object(W.jsxs)(j.a,{mt:3,mr:2,display:"flex",children:[Object(W.jsx)(d.a,{mr:.5,children:"Have an account?"}),Object(W.jsx)(w.a,{to:"/login",style:{pointerEvents:g?"none":"auto"},children:Object(W.jsx)(d.a,{color:"primary",children:"Sign In"})})]})]})};r.default=function(){return Object(W.jsx)(E,{})}}}]);
//# sourceMappingURL=13.d6ad08bd.chunk.js.map