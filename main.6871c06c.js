parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"iJA9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DB_USER=exports.DB_PATH=exports.DB_PASSWORD=void 0;var e="neo4j://abdf20aa.databases.neo4j.io",o="neo4j",s="B4uwAXSsSNmGXJjBlUVT5ejkJN3ym2HMxeZmNaTj3Co";exports.DB_PASSWORD=s,exports.DB_USER=o,exports.DB_PATH=e;
},{}],"epB2":[function(require,module,exports) {
"use strict";var e,t=require("./constants.js"),n="Field is empty.",r="Incorrect number.",c="Incorrect query.";function i(e){e.classList.remove("not-visible"),e.classList.add("visible")}function o(e){e.classList.add("not-visible")}function a(e){document.getElementById("message").innerHTML=e,i(document.getElementById("message"))}function d(e){e.disabled=!0}function l(e){e.disabled=!1}function s(){var e=document.getElementById("radioPlayer"),t=document.getElementById("radioRecords"),c=document.getElementById("textPlayer").value,i=document.getElementById("textRecords").value,d=document.getElementById("textList").value;if(t.checked&&null!==i&&""!==i){if(u(+i)){var l=d.split(", "),s="MATCH (p)-[r:REL]-(t) RETURN p, r, t LIMIT ".concat(i);if(l.length>0&&""!==l[0]){var m=Math.ceil(i/l.length),g="RETURN p, r, t LIMIT ".concat(m," UNION ALL ");s=(l=l.map(function(e){return"".concat("MATCH (p)-[r:REL]-(t)"," WHERE p.name = '").concat(e,"' ").concat(g)})).join("").slice(0,-11)}return o(document.getElementById("message")),console.log(s),s}return a(r),!1}if(e.checked&&null!==c&&""!==c){var y="MATCH (p {name: '".concat(c,"'})-[r:REL]-(t) RETURN p, r, t");return o(document.getElementById("message")),console.log(y),y}return a(n),!1}function u(e){return!!(Number.isInteger(e)&&e>0&&e<=1e3)}function m(){var n=s();if(n){var r={container_id:"viz",server_url:t.DB_PATH,encrypted:"ENCRYPTION_ON",server_user:t.DB_USER,server_password:t.DB_PASSWORD,labels:{Player:{caption:"name",size:"pagerank",community:"community",title_properties:["name","pagerank"]}},relationships:{REL:{thickness:"weight",caption:"weight",hierarchical:!0},EASY:{thickness:"weight",caption:"weight"},HARD:{thickness:"weight",caption:"weight"}},initial_cypher:n};try{(e=new NeoVis.default(r)).render()}catch(i){return console.log("Exception: ",i),void a(c)}document.querySelector("details").open=!1}}function g(){var e=document.getElementById("radioPlayer"),t=document.getElementById("radioRecords"),n=document.getElementById("textPlayer"),r=document.getElementById("textRecords"),c=document.getElementById("textList");e.checked?(d(r),d(c),l(n)):t.checked&&(d(n),l(r),l(c))}function y(e){e.preventDefault(),m()}function E(e){"Enter"===e.key&&y(e)}document.getElementById("radioPlayer").addEventListener("change",g),document.getElementById("radioRecords").addEventListener("change",g),document.querySelector(".trigger").addEventListener("click",y);var p=document.querySelectorAll("input");p.forEach(function(e){return e.addEventListener("keypress",E)});var v=document.querySelector("details");
},{"./constants.js":"iJA9"}]},{},["epB2"], null)
//# sourceMappingURL=/main.6871c06c.js.map