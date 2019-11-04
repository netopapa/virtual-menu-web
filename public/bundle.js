var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function o(){return Object.create(null)}function c(t){t.forEach(n)}function r(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t,e,n){if(t){const o=l(t,e,n);return t[0](o)}}function l(t,n,o){return t[1]?e({},e(n.$$scope.ctx,t[1](o?o(n):{}))):n.$$scope.ctx}function u(t,n,o,c){return t[1]?e({},e(n.$$scope.changed||{},t[1](c?c(o):{}))):n.$$scope.changed||{}}function d(t){return null==t?"":t}function a(t,e){t.appendChild(e)}function p(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function h(t){return document.createElement(t)}function v(t){return document.createTextNode(t)}function m(){return v(" ")}function $(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function b(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function g(t,e){e=""+e,t.data!==e&&(t.data=e)}function y(t,e){(null!=e||t.value)&&(t.value=e)}let x;function k(t){x=t}function _(t){(function(){if(!x)throw new Error("Function called outside component initialization");return x})().$$.on_mount.push(t)}function E(){const t=x;return(e,n)=>{const o=t.$$.callbacks[e];if(o){const c=function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(e,n);o.slice().forEach(e=>{e.call(t,c)})}}}const T=[],w=[],L=[],z=[],C=Promise.resolve();let M=!1;function F(t){L.push(t)}function O(){const t=new Set;do{for(;T.length;){const t=T.shift();k(t),P(t.$$)}for(;w.length;)w.pop()();for(let e=0;e<L.length;e+=1){const n=L[e];t.has(n)||(n(),t.add(n))}L.length=0}while(T.length);for(;z.length;)z.pop()();M=!1}function P(t){t.fragment&&(t.update(t.dirty),c(t.before_update),t.fragment.p(t.dirty,t.ctx),t.dirty=null,t.after_update.forEach(F))}const j=new Set;let D;function N(t,e){t&&t.i&&(j.delete(t),t.i(e))}function S(t,e,n,o){if(t&&t.o){if(j.has(t))return;j.add(t),D.c.push(()=>{j.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}function I(t,e,o){const{fragment:s,on_mount:i,on_destroy:l,after_update:u}=t.$$;s.m(e,o),F(()=>{const e=i.map(n).filter(r);l?l.push(...e):c(e),t.$$.on_mount=[]}),u.forEach(F)}function A(t,e){t.$$.fragment&&(c(t.$$.on_destroy),t.$$.fragment.d(e),t.$$.on_destroy=t.$$.fragment=null,t.$$.ctx={})}function H(t,e){t.$$.dirty||(T.push(t),M||(M=!0,C.then(O)),t.$$.dirty=o()),t.$$.dirty[e]=!0}function U(e,n,r,s,i,l){const u=x;k(e);const d=n.props||{},a=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:i,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:o(),dirty:null};let p=!1;var f;a.ctx=r?r(e,d,(t,n,o=n)=>(a.ctx&&i(a.ctx[t],a.ctx[t]=o)&&(a.bound[t]&&a.bound[t](o),p&&H(e,t)),n)):d,a.update(),p=!0,c(a.before_update),a.fragment=s(a.ctx),n.target&&(n.hydrate?a.fragment.l((f=n.target,Array.from(f.childNodes))):a.fragment.c(),n.intro&&N(e.$$.fragment),I(e,n.target,n.anchor),O()),k(u)}class q{$destroy(){A(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}function J(e){var n;return{c(){(n=h("nav")).innerHTML='<h1 class="center svelte-xtxktv">VIRTUAL MENU</h1> <div class="centralizado"><sub>Administration</sub></div>',b(n,"id","header"),b(n,"class","svelte-xtxktv")},m(t,e){p(t,n,e)},p:t,i:t,o:t,d(t){t&&f(n)}}}class B extends q{constructor(t){super(),U(this,t,null,J,s,[])}}let G="http://localhost:8080/";const R=(t,e)=>((t,e)=>{let n={method:"POST",body:JSON.stringify(e),headers:{"Content-type":"application/json"},mode:"cors",cache:"default"};return fetch(t,n).then(t=>t.json()).then(e=>(console.log("-- response POST:"+t),console.table(e),e))})(G+t,e),V=(t,e)=>((t,e)=>{let n={method:"PUT",body:JSON.stringify(e),headers:{"Content-type":"application/json"},mode:"cors",cache:"default"};return fetch(t,n).then(t=>t.json()).then(e=>(console.log("-- response POST:"+t),console.table(e),e))})(G+t,e),K=t=>(t=>{return fetch(t,{method:"GET",headers:{"Content-type":"application/json"},mode:"cors",cache:"default"}).then(t=>t.json()).then(t=>t)})(G+t),Q=(t,e)=>{return(t=>{return fetch(t,{method:"DELETE"}).then(t=>t).then(t=>t)})(G+t+e)},W=()=>({}),X=()=>({}),Y=()=>({}),Z=()=>({});function tt(t){var e,n,o,c,r,s,v,g,y,x,k;const _=t.$$slots.title,E=i(_,t,Z),T=t.$$slots.content,w=i(T,t,X);return{c(){e=h("div"),n=h("div"),o=h("div"),c=h("div"),(r=h("button")).innerHTML='<i class="fa fa-close"></i>',s=m(),E&&E.c(),v=m(),g=h("div"),w&&w.c(),b(r,"class","btn-close svelte-1hk5sf0"),b(c,"class","card-header svelte-1hk5sf0"),b(g,"class","card-content svelte-1hk5sf0"),b(o,"class","card svelte-1hk5sf0"),b(n,"class","pelicula centralizado svelte-1hk5sf0"),b(e,"class",y=d(t.open?"modal open":"modal")+" svelte-1hk5sf0"),k=$(r,"click",t.hideForm)},l(t){E&&E.l(div0_nodes),w&&w.l(div1_nodes)},m(t,i){p(t,e,i),a(e,n),a(n,o),a(o,c),a(c,r),a(c,s),E&&E.m(c,null),a(o,v),a(o,g),w&&w.m(g,null),x=!0},p(t,n){E&&E.p&&t.$$scope&&E.p(u(_,n,t,Y),l(_,n,Z)),w&&w.p&&t.$$scope&&w.p(u(T,n,t,W),l(T,n,X)),x&&!t.open||y===(y=d(n.open?"modal open":"modal")+" svelte-1hk5sf0")||b(e,"class",y)},i(t){x||(N(E,t),N(w,t),x=!0)},o(t){S(E,t),S(w,t),x=!1},d(t){t&&f(e),E&&E.d(t),w&&w.d(t),k()}}}function et(t,e,n){let{open:o=!1}=e;const c=E();let{$$slots:r={},$$scope:s}=e;return t.$set=(t=>{"open"in t&&n("open",o=t.open),"$$scope"in t&&n("$$scope",s=t.$$scope)}),{open:o,hideForm:()=>{c("hide")},$$slots:r,$$scope:s}}class nt extends q{constructor(t){super(),U(this,t,et,tt,s,["open"])}}function ot(e){var n,o,r,s,i,l,u,d,g,x,k,_,E,T,w,L,z,C,M,F,O,P,j,D,N,S=!1;function I(){S=!0,e.input1_input_handler.call(E)}return{c(){var t;n=h("form"),o=h("div"),r=h("div"),s=h("div"),(i=h("label")).textContent="Nome:",l=m(),u=h("input"),d=m(),g=h("div"),x=h("div"),(k=h("label")).textContent="Preço:",_=m(),E=h("input"),T=m(),w=h("div"),(L=h("label")).textContent="Descrição:",z=m(),C=h("textarea"),M=m(),F=h("div"),(O=h("button")).textContent="Cancelar",P=m(),j=h("button"),D=v("Salvar"),b(u,"type","text"),u.required=!0,b(u,"class","svelte-1u3cb8y"),b(s,"class","input-area svelte-1u3cb8y"),b(r,"class","half svelte-1u3cb8y"),b(E,"type","number"),E.required=!0,b(E,"class","svelte-1u3cb8y"),b(x,"class","input-area svelte-1u3cb8y"),b(g,"class","half svelte-1u3cb8y"),b(o,"class","row-line svelte-1u3cb8y"),C.required=!0,b(C,"class","svelte-1u3cb8y"),b(w,"class","input-area svelte-1u3cb8y"),b(O,"type","button"),b(O,"class","btn warn svelte-1u3cb8y"),b(j,"type","submit"),b(j,"class","btn success svelte-1u3cb8y"),j.disabled=e.mustDisable,b(F,"class","actions row-line svelte-1u3cb8y"),b(n,"class","svelte-1u3cb8y"),N=[$(u,"input",e.input0_input_handler),$(u,"keydown",e.verifyFields),$(E,"input",I),$(E,"keydown",e.verifyFields),$(C,"input",e.textarea_input_handler),$(C,"keydown",e.verifyFields),$(O,"click",e.hideForm),$(n,"submit",(t=e.saveOrUpdate,function(e){return e.preventDefault(),t.call(this,e)}))]},m(t,c){p(t,n,c),a(n,o),a(o,r),a(r,s),a(s,i),a(s,l),a(s,u),y(u,e.product.name),a(o,d),a(o,g),a(g,x),a(x,k),a(x,_),a(x,E),y(E,e.product.price),a(n,T),a(n,w),a(w,L),a(w,z),a(w,C),y(C,e.product.description),a(n,M),a(n,F),a(F,O),a(F,P),a(F,j),a(j,D)},p(t,e){t.product&&u.value!==e.product.name&&y(u,e.product.name),!S&&t.product&&y(E,e.product.price),S=!1,t.product&&y(C,e.product.description),t.mustDisable&&(j.disabled=e.mustDisable)},i:t,o:t,d(t){t&&f(n),c(N)}}}function ct(t,e,n){let{product:o={id:0,name:"",description:"",price:0}}=e;const c=E();let r=!0;const s=()=>{n("product",o={id:0,name:"",description:"",price:0}),c("hide")};return t.$set=(t=>{"product"in t&&n("product",o=t.product)}),{product:o,mustDisable:r,saveOrUpdate:()=>{o.id&&0!=o.id?V("products/",o).then(t=>{s()}):R("products/",o).then(t=>{s()})},verifyFields:t=>{n("mustDisable",r=!o.name||o.name.length<1||!o.description||o.description.length<1||!o.price||o.price<.1)},hideForm:s,input0_input_handler:function(){o.name=this.value,n("product",o)},input1_input_handler:function(){var t;o.price=""===(t=this.value)?void 0:+t,n("product",o)},textarea_input_handler:function(){o.description=this.value,n("product",o)}}}class rt extends q{constructor(t){super(),U(this,t,ct,ot,s,["product"])}}function st(t,e,n){const o=Object.create(t);return o.product=e[n],o}function it(t){var e;return{c(){e=v("Edit Product")},m(t,n){p(t,e,n)},d(t){t&&f(e)}}}function lt(t){var e;return{c(){e=v("Create Product")},m(t,n){p(t,e,n)},d(t){t&&f(e)}}}function ut(t){var e;function n(t,e){return e.productToEdit.id&&0!=e.productToEdit.id?it:lt}var o=n(0,t),c=o(t);return{c(){e=h("h3"),c.c(),b(e,"class","center"),b(e,"slot","title")},m(t,n){p(t,e,n),c.m(e,null)},p(t,r){o!==(o=n(0,r))&&(c.d(1),(c=o(r))&&(c.c(),c.m(e,null)))},d(t){t&&f(e),c.d()}}}function dt(t){var e,n,o=new rt({props:{product:t.productToEdit}});return o.$on("hide",t.hideForm),{c(){e=h("div"),o.$$.fragment.c(),b(e,"slot","content")},m(t,c){p(t,e,c),I(o,e,null),n=!0},p(t,e){var n={};t.productToEdit&&(n.product=e.productToEdit),o.$set(n)},i(t){n||(N(o.$$.fragment,t),n=!0)},o(t){S(o.$$.fragment,t),n=!1},d(t){t&&f(e),A(o)}}}function at(e){var n;return{c(){n=m()},m(t,e){p(t,n,e)},p:t,i:t,o:t,d(t){t&&f(n)}}}function pt(t){var e;return{c(){(e=h("h5")).textContent="No products yet",b(e,"class","center")},m(t,n){p(t,e,n)},d(t){t&&f(e)}}}function ft(t){var e,n,o,r,s,i,l,u,d,y,x,k,_,E,T,w,L,z=t.product.name+"",C=t.product.description+"",M=t.product.price+"";return{c(){e=h("div"),n=h("div"),o=v(z),r=m(),s=h("div"),i=v(C),l=m(),u=h("div"),d=v(M),y=m(),x=h("div"),k=h("div"),(_=h("button")).innerHTML='<i class="fa fa-pencil"></i>',E=m(),(T=h("button")).innerHTML='<i class="fa fa-trash"></i>',w=m(),b(n,"class","cell svelte-ukhzld"),b(n,"data-title","name"),b(s,"class","cell svelte-ukhzld"),b(s,"data-title","description"),b(u,"class","cell svelte-ukhzld"),b(u,"data-title","price"),b(_,"class","btn info"),b(T,"class","btn danger"),b(k,"class","options"),b(x,"class","cell svelte-ukhzld"),b(x,"data-title","actions"),b(e,"class","row"),L=[$(_,"click",t.editItem.bind(this,t.product)),$(T,"click",t.removeItem.bind(this,t.product.id))]},m(t,c){p(t,e,c),a(e,n),a(n,o),a(e,r),a(e,s),a(s,i),a(e,l),a(e,u),a(u,d),a(e,y),a(e,x),a(x,k),a(k,_),a(k,E),a(k,T),a(e,w)},p(e,n){t=n,e.productList&&z!==(z=t.product.name+"")&&g(o,z),e.productList&&C!==(C=t.product.description+"")&&g(i,C),e.productList&&M!==(M=t.product.price+"")&&g(d,M)},d(t){t&&f(e),c(L)}}}function ht(t){var e,n,o,c,r,s,i,l,u,d,y,x,k,_,E,T,w=t.productList.length+"",L=new nt({props:{open:t.openModal,$$slots:{default:[at],content:[dt],title:[ut]},$$scope:{ctx:t}}});L.$on("hide",t.hideForm);let z=t.productList,C=[];for(let e=0;e<z.length;e+=1)C[e]=ft(st(t,z,e));let M=null;return z.length||(M=pt()).c(),{c(){L.$$.fragment.c(),e=m(),n=h("section"),o=h("div"),c=h("h3"),r=v("Produtos ("),s=v(w),i=v(")"),l=m(),(u=h("button")).innerHTML='<i class="fa fa-plus"></i>',d=m(),y=h("div"),(x=h("div")).innerHTML='<div class="cell svelte-ukhzld">Name</div> <div class="cell svelte-ukhzld">Description</div> <div class="cell svelte-ukhzld">Price</div> <div class="cell svelte-ukhzld">Actions</div>',k=m(),_=h("div");for(let t=0;t<C.length;t+=1)C[t].c();b(u,"class","btn success"),b(o,"class","header space-between"),b(x,"class","row header"),b(_,"class","list-content svelte-ukhzld"),b(y,"class","table"),b(n,"id","product-list"),b(n,"class","card svelte-ukhzld"),T=$(u,"click",t.createItem)},m(t,f){I(L,t,f),p(t,e,f),p(t,n,f),a(n,o),a(o,c),a(c,r),a(c,s),a(c,i),a(o,l),a(o,u),a(n,d),a(n,y),a(y,x),a(y,k),a(y,_);for(let t=0;t<C.length;t+=1)C[t].m(_,null);M&&M.m(_,null),E=!0},p(t,e){var n={};if(t.openModal&&(n.open=e.openModal),(t.$$scope||t.productToEdit)&&(n.$$scope={changed:t,ctx:e}),L.$set(n),E&&!t.productList||w===(w=e.productList.length+"")||g(s,w),t.productList){let n;for(z=e.productList,n=0;n<z.length;n+=1){const o=st(e,z,n);C[n]?C[n].p(t,o):(C[n]=ft(o),C[n].c(),C[n].m(_,null))}for(;n<C.length;n+=1)C[n].d(1);C.length=z.length}z.length?M&&(M.d(1),M=null):M||((M=pt()).c(),M.m(_,null))},i(t){E||(N(L.$$.fragment,t),E=!0)},o(t){S(L.$$.fragment,t),E=!1},d(t){A(L,t),t&&(f(e),f(n)),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(C,t),M&&M.d(),T()}}}function vt(t,e,n){let o=!1,c={};const r=()=>{n("openModal",o=!0)};let s=[];const i=()=>{K("products/").then(t=>{n("productList",s=t)})};return _(()=>{i()}),{openModal:o,productToEdit:c,editItem:(t,e)=>{n("productToEdit",c=t),r()},removeItem:(t,e)=>{Q("products/",t).then(()=>{i()})},createItem:()=>{n("productToEdit",c={id:0,name:"",description:"",price:0}),r()},hideForm:()=>{n("openModal",o=!1),i()},productList:s}}class mt extends q{constructor(t){super(),U(this,t,vt,ht,s,[])}}function $t(e){var n,o,c,r=new B({}),s=new mt({});return{c(){r.$$.fragment.c(),n=m(),o=h("section"),s.$$.fragment.c(),b(o,"id","dashboard"),b(o,"class","centralizado svelte-kvfky3")},m(t,e){I(r,t,e),p(t,n,e),p(t,o,e),I(s,o,null),c=!0},p:t,i(t){c||(N(r.$$.fragment,t),N(s.$$.fragment,t),c=!0)},o(t){S(r.$$.fragment,t),S(s.$$.fragment,t),c=!1},d(t){A(r,t),t&&(f(n),f(o)),A(s)}}}return new class extends q{constructor(t){super(),U(this,t,null,$t,s,[])}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
