(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[14],{299:function(e,t,n){"use strict";var r=n(324),o=n(322),a=n(2);t.a=function(e){var t=e.children;return Object(a.jsx)(r.a,{children:Object(a.jsx)(o.a,{container:!0,mt:5,justifyContent:"center",children:Object(a.jsx)(o.a,{item:!0,xs:12,sm:7,md:6,sx:{textAlign:"center"},children:t})})})}},325:function(e,t,n){"use strict";var r=n(263),o=n(111),a=n.p+"static/media/no-data.a40e30af.svg",c=n(299),i=n(2);t.a=function(e){var t=e.imgAlt,n=Object(r.a)((function(e){return e.breakpoints.down("md")}));return Object(i.jsxs)(c.a,{children:[Object(i.jsx)("img",{src:a,alt:t,className:"no-data-image"}),Object(i.jsx)(o.a,{mt:3,color:"text.secondary",variant:n?"body1":"h6",sx:{fontWeight:"light"},children:"There seems to be a problem"}),Object(i.jsx)(o.a,{display:"inline",color:"text.secondary",variant:n?"body1":"h6",sx:{fontWeight:"light"},children:"Please try again later."})]})}},358:function(e,t,n){"use strict";var r=n(53);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(54)),a=n(2),c=(0,o.default)((0,a.jsx)("path",{d:"M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"}),"KeyboardBackspace");t.default=c},359:function(e,t,n){e.exports={"masonry-grid":"Notes_masonry-grid__2HxB6","masonry-grid_column":"Notes_masonry-grid_column__3jQB_"}},363:function(e,t,n){"use strict";var r=n(3),o=n(5),a=n(1),c=(n(13),n(8)),i=n(109),l=n(111),s=n(7),u=n(12),d=n(91),b=n(110);function j(e){return Object(d.a)("MuiDialogTitle",e)}Object(b.a)("MuiDialogTitle",["root"]);var m=n(316),p=n(2),f=["className","id"],O=Object(s.a)(l.a,{name:"MuiDialogTitle",slot:"Root",overridesResolver:function(e,t){return t.root}})({padding:"16px 24px",flex:"0 0 auto"}),h=a.forwardRef((function(e,t){var n=Object(u.a)({props:e,name:"MuiDialogTitle"}),l=n.className,s=n.id,d=Object(o.a)(n,f),b=n,h=function(e){var t=e.classes;return Object(i.a)({root:["root"]},j,t)}(b),v=a.useContext(m.a).titleId,x=void 0===v?s:v;return Object(p.jsx)(O,Object(r.a)({component:"h2",className:Object(c.a)(h.root,l),ownerState:b,ref:t,variant:"h6",id:x},d))}));t.a=h},384:function(e,t,n){"use strict";n.r(t);var r=n(27),o=n(1),a=n.n(o),c=n(26),i=n(21),l=n(263),s=n(324),u=n(282),d=n(97),b=n(98),j=n(150),m=n(153),p=n(152);function f(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function O(){return O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},O.apply(this,arguments)}function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){x(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function x(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var y={breakpointCols:void 0,className:void 0,columnClassName:void 0,children:void 0,columnAttrs:void 0,column:void 0},C=function(e){Object(m.a)(n,e);var t=Object(p.a)(n);function n(e){var r,o;return Object(d.a)(this,n),(r=t.call(this,e)).reCalculateColumnCount=r.reCalculateColumnCount.bind(Object(j.a)(r)),r.reCalculateColumnCountDebounce=r.reCalculateColumnCountDebounce.bind(Object(j.a)(r)),o=r.props.breakpointCols&&r.props.breakpointCols.default?r.props.breakpointCols.default:parseInt(r.props.breakpointCols)||2,r.state={columnCount:o},r}return Object(b.a)(n,[{key:"componentDidMount",value:function(){this.reCalculateColumnCount(),window&&window.addEventListener("resize",this.reCalculateColumnCountDebounce)}},{key:"componentDidUpdate",value:function(){this.reCalculateColumnCount()}},{key:"componentWillUnmount",value:function(){window&&window.removeEventListener("resize",this.reCalculateColumnCountDebounce)}},{key:"reCalculateColumnCountDebounce",value:function(){var e=this;window&&window.requestAnimationFrame?(window.cancelAnimationFrame&&window.cancelAnimationFrame(this._lastRecalculateAnimationFrame),this._lastRecalculateAnimationFrame=window.requestAnimationFrame((function(){e.reCalculateColumnCount()}))):this.reCalculateColumnCount()}},{key:"reCalculateColumnCount",value:function(){var e=window&&window.innerWidth||1/0,t=this.props.breakpointCols;"object"!==typeof t&&(t={default:parseInt(t)||2});var n=1/0,r=t.default||2;for(var o in t){var a=parseInt(o);a>0&&e<=a&&a<n&&(n=a,r=t[o])}r=Math.max(1,parseInt(r)||1),this.state.columnCount!==r&&this.setState({columnCount:r})}},{key:"itemsInColumns",value:function(){for(var e=this.state.columnCount,t=new Array(e),n=a.a.Children.toArray(this.props.children),r=0;r<n.length;r++){var o=r%e;t[o]||(t[o]=[]),t[o].push(n[r])}return t}},{key:"renderColumns",value:function(){var e=this.props,t=e.column,n=e.columnAttrs,r=void 0===n?{}:n,o=e.columnClassName,c=this.itemsInColumns(),i="".concat(100/c.length,"%"),l=o;l&&"string"!==typeof l&&(this.logDeprecated('The property "columnClassName" requires a string'),"undefined"===typeof l&&(l="my-masonry-grid_column"));var s=v(v(v({},t),r),{},{style:v(v({},r.style),{},{width:i}),className:l});return c.map((function(e,t){return a.a.createElement("div",O({},s,{key:t}),e)}))}},{key:"logDeprecated",value:function(e){console.error("[Masonry]",e)}},{key:"render",value:function(){var e=this.props,t=(e.children,e.breakpointCols,e.columnClassName,e.columnAttrs,e.column,e.className),n=f(e,["children","breakpointCols","columnClassName","columnAttrs","column","className"]),r=t;return"string"!==typeof t&&(this.logDeprecated('The property "className" requires a string'),"undefined"===typeof t&&(r="my-masonry-grid")),a.a.createElement("div",O({},n,{className:r}),this.renderColumns())}}]),n}(a.a.Component);C.defaultProps=y;var g=C,w=n(43);var k=function(){return Object(i.c)((function(e){return e.notes}))},N=n(395),D=n(394),I=n(2);var _=function(){return Object(I.jsx)(D.a,{children:Object(I.jsxs)(N.a,{children:[Object(I.jsx)(u.a,{sx:{width:"50%"}}),Object(I.jsx)(u.a,{variant:"rectangular",height:40,sx:{mt:3}})]})})},A=n(65),P=n(6),S=n.n(P),W=n(11),T=n(4),M=n(14),E=n(18),F=n(323),B=n(319),z=n.n(B),L=n(284),R=n(322),q=n(362),H=n(34),U={title:"",body:""};var J=function(e){var t=e.projectId,n=Object(i.b)(),r=Object(o.useState)(!1),a=Object(E.a)(r,2),c=a[0],l=a[1],s=Object(o.useState)(U),u=Object(E.a)(s,2),d=u[0],b=u[1],j=function(e){b((function(t){return Object(M.a)(Object(M.a)({},t),{},Object(T.a)({},e.target.name,e.target.value))}))},m=function(){var e=Object(W.a)(S.a.mark((function e(r){return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),d.title.trim()||d.body.trim()){e.next=5;break}return b({title:"",body:""}),l(!0),e.abrupt("return");case 5:n(Object(w.a)(Object(M.a)({projectId:t},d))),b(U),l(!1);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(I.jsx)(R.a,{container:!0,mt:4,justifyContent:"center",children:Object(I.jsx)(R.a,{item:!0,xs:12,sm:6,children:Object(I.jsx)(L.a,{sx:{position:"relative"},children:Object(I.jsxs)("form",{onSubmit:m,children:[c&&Object(I.jsx)(F.c,{fullWidth:!0,name:"title",placeholder:"Title",autoComplete:"off",value:d.title,onChange:j,sx:{px:2,pt:2,fontWeight:"bold"}}),Object(I.jsx)(F.c,{name:"body",fullWidth:!0,placeholder:"Take a note...",autoComplete:"off",rows:4,multiline:c,autoFocus:c,onFocus:function(){l(!0)},value:d.body,onChange:j,sx:Object(M.a)({p:2},H.d.scrollbar)}),Object(I.jsx)(q.a,{type:"submit",color:"primary",size:"medium",sx:{position:"absolute",right:25,bottom:-20},children:Object(I.jsx)(z.a,{})})]})})})})},K=n(358),Q=n.n(K),G=n(111);var V=function(){var e=Object(c.g)();return Object(I.jsxs)("span",{className:"cursor-pointer no-click-overlay",onClick:e.goBack,children:[Object(I.jsx)(Q.a,{color:"action"}),Object(I.jsx)(G.a,{mt:2,display:"inline",variant:"body2",color:"text.secondary",children:"Back"})]})},X=n(325),Y=n.p+"static/media/no-notes.cbbfb4ed.svg",Z=n(299);var $=function(){var e=Object(l.a)((function(e){return e.breakpoints.down("md")}));return Object(I.jsxs)(Z.a,{children:[Object(I.jsx)("img",{src:Y,alt:"No project selected",className:"no-data-image",style:{marginTop:"50px"}}),Object(I.jsx)(G.a,{mt:4,color:"text.secondary",variant:e?"body1":"h6",sx:{fontWeight:"light"},children:"It feels so empty in here"}),Object(I.jsx)(G.a,{color:"text.secondary",variant:e?"body1":"h6",sx:{fontWeight:"light"},children:"Let's create a note."})]})},ee=n(396),te=n(398),ne=n(397),re=n(363),oe=n(134),ae=n.n(oe),ce=n(285),ie=n(283),le=n(393);var se=function(e){var t=e.projectId,n=e.note,r=e.open,a=e.handleModalClose,c=Object(i.b)(),l=Object(o.useState)({title:n.title,body:n.body}),s=Object(E.a)(l,2),u=s[0],d=s[1],b=function(e){d((function(t){return Object(M.a)(Object(M.a)({},t),{},Object(T.a)({},e.target.name,e.target.value))}))},j=function(e){e.preventDefault(),u.title===n.title&&n.body===u.body||c(Object(w.d)(Object(M.a)({projectId:t,noteId:n._id},u))),a()};return Object(I.jsx)("div",{children:Object(I.jsx)(le.a,{fullWidth:!0,open:r,onClose:function(){d({title:n.title,body:n.body}),a()},scroll:"paper",children:Object(I.jsxs)("form",{onSubmit:j,children:[Object(I.jsx)(re.a,{children:Object(I.jsx)(F.c,{name:"title",fullWidth:!0,placeholder:"Title",autoComplete:"off",sx:{fontWeight:"bold"},value:u.title,onChange:b})}),Object(I.jsx)(ne.a,{children:Object(I.jsx)(F.c,{name:"body",fullWidth:!0,placeholder:"Take a note...",autoComplete:"off",sx:H.d.scrollbar,multiline:!0,rows:4,value:u.body,onChange:b})}),Object(I.jsxs)(te.a,{children:[Object(I.jsx)(ce.a,{onClick:function(){c(Object(w.b)({projectId:t,noteId:n._id}))},sx:{position:"absolute",left:13,bottom:9},children:Object(I.jsx)(ae.a,{fontSize:"small",color:"primary"})}),Object(I.jsx)(ie.a,{onClick:j,children:"Done"})]})]})})})};var ue=function(e){var t=e.projectId,n=e.note,r=Object(o.useState)(!1),a=Object(E.a)(r,2),c=a[0],i=a[1];return Object(I.jsxs)(I.Fragment,{children:[Object(I.jsxs)(D.a,{onClick:function(){i(!0)},className:"cursor-pointer no-click-overlay",children:[Object(I.jsxs)(N.a,{children:[Object(I.jsx)(G.a,{gutterBottom:!0,sx:{fontWeight:"bold"},children:n.title}),Object(I.jsx)(G.a,{sx:{whiteSpace:"pre-wrap",wordWrap:"break-word"},children:n.body})]}),Object(I.jsx)(ee.a,{children:Object(I.jsxs)(G.a,{variant:"caption",color:"text.secondary",ml:"auto",children:["Updated: ",new Date(n.updatedAt).toDateString()]})})]}),Object(I.jsx)(se,{projectId:t,note:n,open:c,handleModalClose:function(){i(!1)}})]})},de=n(359),be=n.n(de),je={default:4,1100:3,700:2,500:1};var me=function(){var e=k(),t=e.loading,n=e.notes,a=e.error,d=e.fetchError,b=Object(l.a)((function(e){return e.breakpoints.down("sm")})),j=Object(i.b)(),m=Object(c.i)();return Object(o.useEffect)((function(){j(Object(w.c)(m.id))}),[j,m.id]),Object(I.jsxs)(s.a,{children:[Object(I.jsx)(V,{}),d?Object(I.jsx)(X.a,{imgAlt:"No notes data"}):t?Object(I.jsx)(u.a,{height:80,sx:{mx:"auto",mt:4,width:b?"100%":"50%"}}):Object(I.jsx)(J,{projectId:m.id}),(a||d)&&Object(I.jsx)(A.a,{severity:"error",message:a||d}),n.length||d||t?Object(I.jsx)(g,{breakpointCols:je,className:be.a["masonry-grid"],columnClassName:be.a["masonry-grid_column"],children:t?Object(r.a)(Array(4)).map((function(e,t){return Object(I.jsx)(_,{},t)})):n.map((function(e){return Object(I.jsx)(ue,{projectId:m.id,note:e},e._id)}))}):Object(I.jsx)($,{})]})};t.default=function(){return Object(I.jsx)(me,{})}}}]);
//# sourceMappingURL=14.d08f2f3a.chunk.js.map