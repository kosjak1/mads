"use strict";(window.varrando||(window.varrando={}))._oie||function(e,t,n,i){function r(e){return e=e||"",e+""+Math.random().toString(36).substr(2,9)}function o(){return""+Math.floor(99999999*Math.random())}function s(e){"object"==typeof e&&null!==e||(e={});for(var t=1;t<arguments.length;t++){var n=arguments[t];if("object"==typeof n&&null!==n)for(var i,r,o,l=Object.keys(n),c=0,d=l.length;c<d;c++)i=l[c],r=n[i],"object"==typeof r&&a(r)?(o=e[i],o&&a(o)||(o={}),e[i]=s(o,r)):e[i]=r}return e}function a(e){return"object"==typeof e&&null!==e&&e.constructor===Object&&"[object Object]"===e.toString()}function l(e,t){t===i&&(t=null);var n=parseInt(e,10);return isNaN(n)?t:n}function c(e,t){t===i&&(t=null);try{var n=e.split(":"),r=parseFloat(n[0]/n[1]);return!isNaN(r)&&isFinite(r)?r:t}catch(e){}return t}function d(e){return"function"==typeof e}function u(e){return"string"==typeof e}function f(e,t,n){function i(){r?(e.apply(this,arguments),r=!1,o=null,setTimeout(function(){r=!0,o&&n!==!1&&i.apply(s,o)},t)):(s=this,o=arguments)}var r=!0,o=null,s=null;return i}function p(e,t){setTimeout(e,t||1)}function h(e){var t=this,n="ConfigError",i=e||"";t.name=n,t.message=i,t.toString=function(){return n+": "+i}}function v(e,t){try{e&&e(t)}catch(e){}}function m(e){var t=e.innerWidth,n=e.innerHeight;if("number"!=typeof t){var i=e.document.documentElement;i&&(t=i.clientWidth,n=i.clientHeight)}return{width:t||1020,height:n||760}}function y(e){var t,n=!0;return{set:function(i){t||(t=setTimeout(function(){n&&(n=!1,e())},i))},clear:function(){t&&n&&(clearTimeout(t),n=!1)}}}function g(){try{N.addStyleText(t,S,"varrando-outer")}catch(e){T(e,"outerStyle")}}function w(e){var t=e.playerUrl;if(u(t)&&t.indexOf("formats")>-1)throw new h("Invalid playerUrl. Use without formats!");return e.playerUrl||"//d27kkruj8fr60l.cloudfront.net/os/5.1/varrando.osplayer.min.js"}function b(e,t,n){var i,r,o,s,a,l,c,d=e.header,u=e.footer,f="fill"!==e.size,p=" vrd-reset";return i=new j("",{class:"vrd-formats "+t+p}),r=new j("",{class:p}),s=new j("",{id:n,class:p}),c=new j,s.cssText("position:relative;"),d&&f&&(o=new j("",{class:"vrd-header"+p}),o.textContent(d)),u&&f&&(a=new j("",{class:"vrd-footer"+p}),l=new j("a",{class:"vrd-footer-credits"+p,href:u.url||"",target:"_blank"}),l.textContent(u.name||""),a.appendChild(l)),s.appendChild(c),o&&r.appendChild(o),r.appendChild(s),a&&r.appendChild(a),i.appendChild(r),{o:i,i:r,h:o,p:s,f:a,a:c}}function x(e,t,n,i){var r=N.createIframe("100%","100%","","position:absolute;left:0;top:0;"),o=new j(r,{class:"vrd-reset"}),s=w(t);n.appendChild(o),N.allowfullscreen(r),N.writeIframeContent(r,'<!DOCTYPE html>\n<html>\n<head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" />\n<style>html,body{height:100%;margin:0;padding:0;}</style></head>\n<body><div id="main"></div>\n<script type="text/javascript">window.varrando||(window.varrando={}),varrando._fif=1,varrando.onScriptLoaded=[function(){window.parent.varrando["'+i+'"](varrando);}];</script>\n<script type="text/javascript" src="'+s+'"></script>\n</body></html>');try{var a=r.contentWindow,l=a.varrando||(a.varrando={});l.LogListeners=e.LogListeners}catch(e){T(e,"nsWrite")}return{i:r,io:o}}function C(e,t,n,i){e.autoload=t,e.autostart=n,e.autoplay=i}function E(e,t,n){e.style.overflow="visible",e.expand(t||"auto",n||"auto")}function L(e,t,n){e.collapse(t,n),e.style.overflow="hidden"}function T(e,t){var n=D.errorToString(e);return e instanceof h?D.debug(n):D.error(t+"."+n,"oieError"),n}function k(){function e(e,r,c,d){r=t(r),c=n(c),d||(d=o);for(var u=0,f=a.length;u<f;u++)try{a[u](e,r,c,d)}catch(e){if(s)throw e;try{if(a[u].her){var p=t(e);i!==p&&(i=p,(new Image).src=l+"?cat="+A(d)+"&level=error&msg="+A(p))}}catch(e){}}}function t(e){var t,n=typeof e;return"string"===n?t=e:null===e?t="null":"object"===n?("function"==typeof e.toString&&(t=e.toString()),"[object Object]"!==t&&"[object Error]"!==t&&t||(t=e.message||e.name||n)):t=n,t}function n(e){var t,n=typeof e;return t="string"===n?e:e?n:""}var i,r=this,o="def",s=!1,a=r.listeners=[],l=r.url="//logs.varrando.com/";r.setDebug=function(e){s=e},r.bindCategory=function(n,i){return{debug:function(t,i,r){e("debug",t,i,r||n)},trace:function(t,i,r){e("trace",t,i,r||n)},warn:function(t,i,r){e("warn",t,i,r||n)},error:function(t,i,r){e("error",t,i,r||n)},warnId:function(t){e("warn","","WARN_"+(i||n)+t,n)},debugConfigId:function(t){e("debug","","CONF_ERR_"+(i||n)+t,n)},errorToString:t}}}function F(e){function t(t,r,o,s){if("debug"!==t){var a=e+"?cat="+n(s)+"&level="+n(t)+"&key="+n(o)+"&msg="+n(r)+"&cb="+i();(new Image).src=a}}var n=A,i=o;return t.her=!0,{log:t}}function I(e){var t;return{set:function(n){var i=n<=480?0:n<=640?1:2;if(t!==i){t=i;var r=["vr-sscreen","vr-mscreen","vr-lscreen"],o=r[i];r.splice(i,1);for(var s=2;s--;)e.removeClass(r[s]);return e.addClass(o),t}}}}function j(e,t){var n=this;e&&"string"!=typeof e?(n.el=e,t&&n.setAttributes(t),n.isOwnEl=!1):(n.el=N.createElement(e||"div",t),n.isOwnEl=!0),n.eventListeners=[],n.children=[],n.tapEnabled=!1,n.style=n.el.style}var S=".vrd-formats .vrd-reset,.vrd-formats.vrd-reset{font-family:Arial,Helvetica,sans-serif!important;color:inherit;background-color:transparent;font-size:inherit;line-height:inherit;font-weight:inherit;font-style:inherit;font-variant:inherit;float:none;box-sizing:border-box;padding:0;margin:0;border:0}.vrd-formats .vr-fullscreen-mode{position:fixed!important;top:0;right:0;bottom:0;left:0;z-index:99999!important;width:100%!important;height:100%!important}.vrd-formats .vrd-footer,.vrd-formats .vrd-header{display:none;text-align:center;font-size:12px;line-height:1;color:#000;padding:6px 0}.vrd-inpage .vrd-footer,.vrd-inpage .vrd-header{display:block}.vrd-formats .vrd-header{opacity:.38;text-transform:uppercase}.vrd-formats .vrd-footer{text-align:right}.vrd-formats a.vrd-footer-credits{display:inline-block;text-decoration:none;color:#00796B;opacity:.54;cursor:pointer;margin-right:2px}.vrd-formats a.vrd-footer-credits:hover{opacity:.87}.vrd-formats.vr-sscreen .vrd-footer,.vrd-formats.vr-sscreen .vrd-header{font-size:11px}",A=n.encodeURIComponent,W=n.Error;if(!n.addEventListener)throw new W("Not supported");var N={id:function(e){return t.getElementById(e)},createElement:function(e,n,i){var r,o,s,a=t.createElement(e);if(n&&N.setAttributes(a,n),i)for(r=Object.keys(i),o=0,s=r.length;o<s;o++)a[r[o]]=i[r[o]];return a},setAttributes:function(e,t){for(var n=Object.keys(t),i=0,r=n.length;i<r;i++)e.setAttribute(n[i],t[n[i]])},createIframe:function(e,n,i,r){var o=t.createElement("iframe");return i&&(o.id=i),o.src="about:blank",o.scrolling="no",o.frameBorder="0",o.marginWidth="0",o.marginHeight="0",o.style.cssText=(e?"width:"+e+";":"")+(n?"height:"+n+";":"")+"display:block;margin:0;padding:0;border:0;overflow:hidden;"+(r||""),o},allowfullscreen:function(e){N.setAttributes(e,{webkitAllowFullScreen:"",msAllowFullScreen:"",allowFullScreen:""})},writeIframeContent:function(e,t){try{var n=e.contentDocument||e.contentWindow.document;n.open("text/html","replace"),n.write(t),n.close()}catch(n){try{e.contentWindow.IFRM_content=t,e.src='javascript:window["IFRM_content"]'}catch(e){return!1}}return!0},insertFirst:function(e,t){t.firstChild?t.insertBefore(e,t.firstChild):t.appendChild(e)},hasClass:function(e,t){return(" "+e.className+" ").indexOf(" "+t+" ")!==-1},addClass:function(e,t){return N.hasClass(e,t)||(e.className=""===e.className?t:e.className+" "+t),e},removeClass:function(e,t){if(N.hasClass(e,t)){for(var n=e.className.split(" "),i=n.length-1;i>=0;i--)n[i]===t&&n.splice(i,1);return e.className=n.join(" "),e}},addEventListener:function(e,t,n,r){r===i&&(r=!1),e.addEventListener(t,n,r)},removeEventListener:function(e,t,n,r){r===i&&(r=!1),e.removeEventListener(t,n,r)},addStyleText:function(e,t,n){if(!n||!e.getElementById(n)){var i=e.getElementsByTagName("head")[0]||e.documentElement,r=e.createElement("style");r.id=n,r.type="text/css",r.styleSheet?r.styleSheet.cssText=t:r.appendChild(e.createTextNode(t)),i.appendChild(r)}}},R=new k,D=R.bindCategory("osembed"),O=F(R.url),z=R.listeners;z.push(O.log),function(){var t=e,n=t.LogListeners;n&&Array.isArray(n)&&[].push.apply(z,n),t.addLogListener=function(e){d(e)&&(z.push(e),n.push(e))}}(),j.prototype.setAttributes=function(e){N.setAttributes(this.el,e)},j.prototype.innerHTML=function(e){this.el.innerHTML=e},j.prototype.textContent=function(e){this.el.textContent=e},j.prototype.cssText=function(e){return e===i?this.style.cssText:void(this.style.cssText=e)},j.prototype.onParentAdded=function(e){},j.prototype.onParentRemoving=function(e){},j.prototype.appendChild=function(e,t){if(!e.onParentAdded)throw new W("Child is not UiObject");if(e.el.parentNode)throw new W("Element already in DOM");this.children.push(e),t?N.insertFirst(e.el,this.el):this.el.appendChild(e.el),e.onParentAdded(this)},j.prototype.removeChild=function(e){if(!e.onParentRemoving)throw new W("Child is not UiObject");for(var t=this.children,n=t.length-1;n>=0;n--)if(t[n]===e)return e.onParentRemoving(this),this.el===e.el.parentNode&&this.el.removeChild(e.el),t.splice(n,1),!0},j.prototype.addEventListener=function(e,t,n){if(!Array.isArray(e))return this.eventListeners.push({type:e,callback:t,capture:n}),"tap"===e?void(this.tapEnabled||this.enableTapEvents()):void N.addEventListener(this.el,e,t,n);for(var i=0,r=e.length;i<r;i++)this.addEventListener(e[i],t,n)},j.prototype.removeEventListener=function(e,t){if(Array.isArray(e))for(var n=0,i=e.length;n<i;n++)this.removeEventListener(e[n],t);else for(var r=e&&t,o=this.eventListeners,s=o.length-1;s>=0;s--){var a=o[s];(!r||a.type===e&&a.callback===t)&&(o.splice(s,1),"tap"!==a.type&&N.removeEventListener(this.el,a.type,a.callback,a.capture))}},j.prototype.triggerCustomEvent=function(e,t){if(!t._cStopPropagation)for(var n=this,i=n.eventListeners,r=0,o=i.length;r<o;r++){var s=i[r];s.type===e&&s.callback({type:e,target:n.el,currentTarget:n.el,isCustom:!0,domEvent:t,stopPropagation:function(){t._cStopPropagation=!0},stopImmediatePropagation:function(){t._cStopPropagation=!0},preventDefault:function(){t._cPreventDefault=!0}})}},j.prototype.dimensions=function(e,t){this.style.width=e,this.style.height=t},j.prototype.width=function(e){return e===i?this.el.clientWidth:void(this.style.width=e)},j.prototype.height=function(e){return e===i?this.el.clientHeight:void(this.style.height=e)},j.prototype.addClass=function(e){N.addClass(this.el,e)},j.prototype.removeClass=function(e){N.removeClass(this.el,e)},j.prototype.hasClass=function(e){return N.hasClass(this.el,e)},j.prototype.show=function(){this.style.visibility="visible"},j.prototype.hide=function(){this.style.visibility="hidden"},j.prototype.display=function(e){return"string"==typeof e?void(this.style.display=e):void(e?this.style.display="block":this.style.display="none")},j.prototype.collapse=function(e,t){this.dimensions(e||"1px",t||"1px"),this.style.opacity="0"},j.prototype.expand=function(e,t){this.dimensions(e||"100%",t||"100%"),this.style.opacity="1"},j.prototype.ownerDocument=function(){return this.el.ownerDocument},j.prototype.ownerWindow=function(){var e=this.el.ownerDocument;return e&&e.defaultView},j.prototype.requestFullscreen=function(){var e=this.el;return e.requestFullscreen?(e.requestFullscreen(),!0):e.mozRequestFullScreen?(e.mozRequestFullScreen(),!0):e.webkitRequestFullscreen?(e.webkitRequestFullscreen(),!0):!!e.msRequestFullscreen&&(e.msRequestFullscreen(),!0)},j.prototype.isFullscreen=function(e){var t=N.fullscreenElement(e);return!(!t||t!==this.el)},j.prototype.enableTapEvents=function(){var e=this;if(!e.tapEnabled){e.tapEnabled=!0;var t,n,i=0,r=null,o=10,s=200;e.addEventListener("touchstart",function(e){1===e.touches.length&&(r={pageX:e.touches[0].pageX,pageY:e.touches[0].pageY},i=Date.now(),t=!0)}),e.addEventListener("touchmove",function(e){if(e.touches.length>1)t=!1;else if(r){if(!t)return;var n=e.touches[0].pageX-r.pageX,i=e.touches[0].pageY-r.pageY,s=Math.sqrt(n*n+i*i);s>o&&(t=!1)}}),e.addEventListener("touchend",function(o){if(r=null,t){var a=Date.now();a-i<s&&(o.preventDefault(),n=a,e.triggerCustomEvent("tap",o))}});var a=function(){t=!1};e.addEventListener("touchleave",a),e.addEventListener("touchcancel",a),e.addEventListener("click",function(e){n&&Date.now()-n<500&&(e.stopImmediatePropagation(),e.preventDefault())})}},j.prototype.disposeChildren=function(){this.children.forEach(function(e){e.dispose()}),this.children=[]},j.prototype.dispose=function(){var e=this;if(!e.isDisposed){try{e.removeEventListener(),e.children.forEach(function(e){e.dispose()}),e.children=[];var t=e.el;e.isOwnEl&&t&&t.parentNode&&t.parentNode.removeChild(t)}catch(e){D.error(e,"uiobjectDispose")}e.isDisposed=1}},function(e,t,n,i){function o(n,i,o,a){function l(e){J.clear(),i.fsEl=_.el,C(i,!0,!0,!0),e.setup("main",i,function(r){var s=A=S[n]=r.target;s._ns=e,B=s.dispose,s.dispose=F,M=s.resize,s.resize=f(m,200),s.on("adBreakLoaded",function(e){e.podLength||e.buffetLength?(Q||(w(),m()),t.focus()):F()},G),s.on("loaded",function(){Q&&(w(),m())},G),s.on("creativeView",function(){X=!0},G),s.on("adBreakCompleted",function(){return!X||i.closeCompleted?void F():void(X=!1)},G),s.on("playerClose",function(){F()},G),s.on("fullscreenChanged",function(){p(m,100)},G),v(o,r)},function(e){F(),v(a,e)})}function d(e,t,n){"fill"===n?(_.height("100%"),P.display(!1)):(q=K(e,1.7777),P.style.paddingTop=(100/q).toFixed(4)+"%",t&&(O.style.maxWidth=t))}function u(){p(m,100)}function m(){var e=_.width(),t=_.height();(H!==e||V!==t)&&e&&t&&(H=e,V=t,U(e),M&&M())}function w(){O.style.position="relative",E(O,"100%",q?"auto":"100%"),z.dimensions("100%",q?"auto":"100%"),z.style.position="static"}function T(){z.dimensions((z.width()||D.clientWidth||320)+"px",(z.height()||D.clientHeight||220)+"px"),z.style.position="absolute",L(O,"1px","1px"),O.style.position="absolute"}function k(){}function F(){J.clear(),T(),Y.dispose(),A&&(A.offContext(G),A.stop(),delete S[n]),delete S[W],setTimeout(function(){B&&B(),O.dispose(),t.focus()},3e3),t.focus()}var S,A,W,R,D,O,z,_,P,q,B,M,U,H,V,X,Y,G={},J=y(k),K=c,Q=i.showOnLoaded;if(D="string"==typeof n&&N.id(n),!D)throw new h("Invalid element id");if(S=e.players||(e.players={}),W=n+"_s",S[W])throw new h("Duplicated setup call");i=s({},e.defaults,i),R=r("varrando-"),g();var Z=b(i,"vrd-inpage",R);O=Z.o,z=Z.i,_=Z.p,P=Z.a,z.cssText("top:0;left:0;"),P.cssText("margin:0;padding:0;"),T(),d(i.aspectRatio,i.maxWidth,i.size),q&&(O.style.margin="0 auto"),D.appendChild(O.el),i.width="100%",i.height="100%",delete i.aspectRatio,delete i.maxWidth,e[R]=l,x(e,i,_,R),J.set(15e3),U=I(O).set,Y=new j(t),Y.addEventListener(["resize","orientationchange"],f(u,200)),S[W]=1}e.setupInPage=function(e,t,n,i){try{return o(e,t,n,i)}catch(e){v(i,T(e,"ipSetup"))}}}(e,n,t),function(e,t,n,i){function o(i,o,d){function u(e){Z.clear(),i.fsEl=P.el,i.isFixed=1,C(i,!0,!0,!0),e.setup("main",i,function(n){var r=D=R[O]=n.target;r._ns=e,q=r.dispose,r.dispose=N,B=r.resize,r.resize=f(function(e,t,n,i){if(e||n&&i){var r=F(e,t,n,i);r.ratio&&r.maxWidth&&(U=r.maxWidth,H=r.ratio,k(H))}T()},200),r.on("adBreakLoaded",function(e){e.podLength||e.buffetLength?(te||(S(),B()),t.focus()):N()},K),r.on("loaded",function(){te&&(S(),B())},K),r.on("creativeView",function(){M=!0},K),r.on("adBreakCompleted",function(){return!M||i.closeCompleted?void N():void(M=!1)},K),r.on("playerClose",function(){N()},K),v(o,n)},function(e){N(),v(d,e)})}function w(){p(T,100)}function T(){var e,n=m(t),i=Math.min(U,n.width-Q,Math.floor(H*n.height*.5));V!==i&&(V=i,_.width(i+"px"),X(i),B&&B()),e=i>.75*n.width?n.width-i:Q,G!==e&&(G=e,z.style.margin="8px "+e/2+"px")}function k(e){J.cssText("margin:0;padding:"+(100/e).toFixed(4)+"% 0 0")}function F(e,t,n,i,r){var o,s,a,l,c;if(e){if(o=1,s=ee(e,0)){if(a=$(t,0),!a&&r)throw new h("Responsive setup: maxWidth is required!")}else if(r)throw new h("Invalid aspect ratio (e.g. '16:9')")}else if(n&&i){if(o=2,l=$(n,0),c=$(i,0),l&&c)s=l/c,a=l;else if(r)throw new h("Invalid width/height (e.g. '360px')!")}else if(r)throw new h("Dimensions are required!");return{mode:o||0,maxWidth:a||0,ratio:s||0}}function S(){E(z),_.style.position="static"}function A(){_.style.position="absolute",L(z,"6px","6px")}function W(){}function N(){Z.clear(),A(),Y.dispose(),D&&(D.offContext(K),D.stop(),delete R[O]),a=!1,setTimeout(function(){q&&q(),z.dispose(),t.focus()},3e3),t.focus()}var R,D,O,z,_,P,q,B,M,U,H,V,X,Y,G,J,K={},Q=16,Z=y(W),$=l,ee=c,te=i.showOnLoaded;if(a)throw new h("InView already running");R=e.players||(e.players={}),i=s({},e.defaults,i),O=r("varrando-");var ne=F(i.aspectRatio,i.maxWidth,i.width,i.height,!0);U=ne.maxWidth,H=ne.ratio,i.width="100%",i.height="100%",delete i.aspectRatio,delete i.maxWidth,g();var ie=b(i,"vrd-inview",O);z=ie.o,_=ie.i,P=ie.p,J=ie.a,z.cssText("position:fixed;right:0;bottom:0;z-index:9999;"),_.cssText("right:0;bottom:0;"),A(),k(H),n.getElementsByTagName("body")[0].appendChild(z.el),e[O]=u,x(e,i,P,O),Z.set(15e3),X=I(z).set,T(),Y=new j(t),Y.addEventListener(["resize","orientationchange"],f(w,200)),a=!0}var a;e.setupInView=function(e,t,n){try{return o(e,t,n)}catch(e){v(n,T(e,"ivSetup"))}}}(e,n,t),e._oie=1}(varrando,document,window);