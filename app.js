!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){n(1),t.exports=n(7)},function(t,e,n){Helper=n(2),Product=n(4)(),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("service-worker.js").then(t=>{console.log("SW registered: ",t)}).catch(t=>{console.log("SW registration failed: ",t)})})},function(t,e,n){var r,o={accounting:(r=n(3),r.settings.symbol="",r.settings.decimal=",",r.settings.thousand=".",r),futureSelect:(t,e,n=document)=>{let r=null;return new Promise(e=>{const o=()=>{const a=n&&[...n.querySelectorAll(t)]||[];a.length?(cancelAnimationFrame(r),e(a)):r=requestAnimationFrame(o)};o()})},classInParent:function(t,e){var n=t.parentElement;return"BODY"!=n.tagName&&(n.classList.contains(e)?n:this.classInParent(n,e))}};t.exports=o},function(t,e,n){!function(t){"use strict";function e(t,e){return t(e={exports:{}},e.exports),e.exports}var n={symbol:"$",format:"%s%v",decimal:".",thousand:",",precision:2,grouping:3,stripZeros:!1,fallback:0};function r(t){var e=arguments.length<=1||void 0===arguments[1]?n.decimal:arguments[1],o=arguments.length<=2||void 0===arguments[2]?n.fallback:arguments[2];if(Array.isArray(t))return t.map(function(t){return r(t,e,o)});if("number"==typeof t)return t;var a=new RegExp("[^0-9-(-)-"+e+"]",["g"]),u=(""+t).replace(a,"").replace(e,".").replace(/\(([-]*\d*[^)]?\d+)\)/g,"-$1").replace(/\((.*)\)/,""),c=(u.match(/-/g)||2).length%2,i=parseFloat(u.replace(/-/g,"")),s=i*(c?-1:1);return isNaN(s)?o:s}function o(t,e){var r,o;r=e,o=n.precision,r=Math.round(Math.abs(r)),e=isNaN(r)?o:r;var a=Math.pow(10,e);return(Math.round((t+1e-8)*a)/a).toFixed(e)}var a=e(function(t){var e=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(t){if(null==t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}t.exports=Object.assign||function(t,o){for(var a,u,c=r(t),i=1;i<arguments.length;i++){for(var s in a=Object(arguments[i]))e.call(a,s)&&(c[s]=a[s]);if(Object.getOwnPropertySymbols){u=Object.getOwnPropertySymbols(a);for(var l=0;l<u.length;l++)n.call(a,u[l])&&(c[u[l]]=a[u[l]])}}return c}}),u=a&&"object"==typeof a&&"default"in a?a.default:a;function c(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(Array.isArray(t))return t.map(function(t){return c(t,e)});e=u({},n,e);var r,a,i,s,l,p=t<0?"-":"",d=parseInt(o(Math.abs(t),e.precision),10)+"",f=d.length>3?d.length%3:0,m=p+(f?d.substr(0,f)+e.thousand:"")+d.substr(f).replace(/(\d{3})(?=\d)/g,"$1"+e.thousand)+(e.precision>0?e.decimal+o(Math.abs(t),e.precision).split(".")[1]:"");return e.stripZeros?(r=m,a=e.decimal,i=r.split(a),s=i[0],(l=i[1].replace(/0+$/,"")).length>0?s+a+l:s):m}var i=e(function(t){var e=String.prototype.valueOf,n=Object.prototype.toString,r="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag;t.exports=function(t){return"string"==typeof t||"object"==typeof t&&(r?function(t){try{return e.call(t),!0}catch(t){return!1}}(t):"[object String]"===n.call(t))}}),s=i&&"object"==typeof i&&"default"in i?i.default:i;function l(t){return s(t)&&t.match("%v")?{pos:t,neg:t.replace("-","").replace("%v","-%v"),zero:t}:t}function p(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(Array.isArray(t))return t.map(function(t){return p(t,e)});var r=l((e=u({},n,e)).format);return(t>0?r.pos:t<0?r.neg:r.zero).replace("%s",e.symbol).replace("%v",c(Math.abs(t),e))}t.settings=n,t.unformat=r,t.toFixed=o,t.formatMoney=p,t.formatNumber=c,t.formatColumn=function t(e){var o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(!e)return[];var a=l((o=u({},n,o)).format),i=a.pos.indexOf("%s")<a.pos.indexOf("%v"),p=0,d=e.map(function(e){if(Array.isArray(e))return t(e,o);var n=((e=r(e,o.decimal))>0?a.pos:e<0?a.neg:a.zero).replace("%s",o.symbol).replace("%v",c(Math.abs(e),o));return n.length>p&&(p=n.length),n});return d.map(function(t){return s(t)&&t.length<p?i?t.replace(o.symbol,o.symbol+new Array(p-t.length+1).join(" ")):new Array(p-t.length+1).join(" ")+t:t})},t.format=p,t.parse=r}(e)},function(t,e,n){"use strict";var r=n(5)(),o=n(6);t.exports=function(){var t;function e(){document.querySelector("html").style.height=window.innerHeight+"px"}function n(){var t=Helper.classInParent(this,"product-items").dataset.product,e=r.select("produtos"),n={};e.map(function(e){e.id==t&&(e.amount+=1,n=e)}),r.update("produtos",e,function(e){o.updatePurchase(e),o.updateProduct(n,t)})}function a(){Helper.futureSelect(".product-items .product-add").then(function(t){t.map(function(t){t.addEventListener("click",n)})})}function u(){var t,e=Helper.classInParent(this,"product-items").dataset.product,n=r.select("produtos"),a={};t=n.filter(function(t){return t.id==e&&(t.amount-=1,a=t),t.amount>0}),r.update("produtos",t,function(t){o.updatePurchase(t),o.updateProduct(a,e)})}function c(){[...document.querySelectorAll(".product-items")].map(function(t){t.classList.remove("open")})}function i(){Helper.futureSelect(".product-items").then(function(e){e.map(function(e){e.addEventListener("touchstart",function(){clearTimeout(t),t=setTimeout(function(){c(),e.classList.toggle("open")},200)}),e.addEventListener("touchend",function(){clearTimeout(t)})})}),Helper.futureSelect(".product-items .product-delete").then(function(t){t.map(function(t){t.addEventListener("click",u)})})}formInsert.addEventListener("submit",function(t){t.preventDefault();var e,n=(e={},[...this.elements].map(function(t){""!==t.name&&(e[t.name]=t.value)}),e);r.insert("produtos",n,function(t){o.insertProduct(n),o.updatePurchase(t)}),a(),i(),this.reset()}),window.addEventListener("load",function(){var t=r.select("produtos");o.updatePurchase(t),t.map(function(t){o.insertProduct(t)}),e()}),window.addEventListener("resize",function(){e()}),document.addEventListener("touchstart",function(){Helper.classInParent(event.srcElement,"product-list")||c()}),productList.addEventListener("scroll",function(){c(),clearTimeout(t)}),a(),i()}},function(t,e,n){"use strict";t.exports=function(){var t=["produtos"];for(var e in t)localStorage.getItem(t[e])||localStorage.setItem(t[e],"[]");function n(t,e){return JSON.parse(localStorage.getItem(t)).filter(function(t){if(null==e||e==t.id)return t})}return{insert:function(t,e,r){var o=n(t),a=Date.now();return e.id=a,e.amount=1,e.price=parseFloat(e.price),o.push(e),localStorage.setItem(t,JSON.stringify(o)),r?r(o):null},select:n,update:function(t,e,n){return localStorage.setItem(t,JSON.stringify(e)),n?n(e):null}}}},function(t,e,n){"use strict";var r={insertProduct:function(t){var e=Helper.accounting.formatMoney(t.price),n=`\n\t\t\t<li class="product-items" data-product="${t.id}">\n\t\t\t\t<h3 class="product-name">${t.name}</h3>\n\t\t\t\t<span class="product-amount"><span class="amount-value">${t.amount}</span> x</span>\n\t\t\t\t<strong class="product-price">R$ <span class="price-value">${e}</span></strong>\n\t\t\t\t<button type="button" class="btn product-add">Buy</button>\n\t\t\t\t<div class="product-actions">\n\t\t\t\t\t<button type="button" class="btn product-delete">Del</button>\t\n\t\t\t\t</div>\n\t\t\t</li>`;productList.insertAdjacentHTML("afterbegin",n)},updateProduct:function(t,e){var n=document.querySelector('[data-product="'+e+'"]'),r=Helper.accounting.formatMoney(t.price);0==t.amount&&n.remove(),null!=n&&(n.querySelector(".product-name").innerText=t.name,n.querySelector(".amount-value").innerText=t.amount,n.querySelector(".price-value").innerText=r)},updatePurchase:function(t){var e=t.reduce(function(t,e){return t+e.price*e.amount},0);purchaseValue.innerText=Helper.accounting.formatMoney(e)}};t.exports=r},function(t,e,n){}]);