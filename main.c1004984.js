parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"iJA9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DB_USER=exports.DB_PATH=exports.DB_PASSWORD=void 0;var e="neo4j://4e956df7.databases.neo4j.io",o="neo4j",s="PVu30YN-VesHEoS3HYj963nMp6oZRgDYmxfnQpaCuzs";exports.DB_PASSWORD=s,exports.DB_USER=o,exports.DB_PATH=e;
},{}],"epB2":[function(require,module,exports) {
"use strict";var e,t=require("./constants.js"),n="Field is empty.",r="Incorrect number.",o="Incorrect query.";function c(e){console.log("error"),document.getElementById("message").innerHTML=e,document.getElementById("message").classList.remove("not-visible"),document.getElementById("message").classList.add("visible")}function d(e){e.disabled=!0,e.value=""}function a(e){e.disabled=!1}function i(){var e=document.getElementById("radioPlayer"),t=document.getElementById("radioRecords"),o=document.getElementById("textPlayer").value,d=document.getElementById("textRecords").value;if(t.checked&&null!==d&&""!==d){if(l(+d)){var a="MATCH (n)-[r:REL]->(m)\n      RETURN *, rand() as r\n      ORDER BY r\n      LIMIT ".concat(d);return document.getElementById("message").classList.add("not-visible"),a}return c(r),!1}if(e.checked&&null!==o&&""!==o){var i="MATCH (p {name: '".concat(o,"'})-[r]-(t) RETURN p, r, t");return document.getElementById("message").classList.add("not-visible"),i}return c(n),!1}function l(e){return!!(Number.isInteger(e)&&e>0&&e<=1e3)}function s(){var n=i();if(n){var r={container_id:"viz",server_url:t.DB_PATH,encrypted:"ENCRYPTION_ON",server_user:t.DB_USER,server_password:t.DB_PASSWORD,labels:{Player:{caption:"name"}},relationships:{REL:{thickness:"weight",caption:"weight"}},initial_cypher:n};try{console.log("try"),e=new NeoVis.default(r),console.log(e),e.render(),document.querySelector("details").open=!1}catch(d){console.log(d),c(o)}}}function u(){var e=document.getElementById("radioPlayer"),t=document.getElementById("radioRecords"),n=document.getElementById("textPlayer"),r=document.getElementById("textRecords");e.checked?(d(r),a(n)):t.checked&&(d(n),a(r))}window.onload=function(){document.getElementById("radioPlayer").addEventListener("change",u),document.getElementById("radioRecords").addEventListener("change",u);var e=document.querySelector(".trigger");e.onclick=function(e){e.preventDefault(),s()},e.keyup=function(e){13===et.keyCode&&(e.preventDefault(),s())}};
},{"./constants.js":"iJA9"}]},{},["epB2"], null)
//# sourceMappingURL=/main.c1004984.js.map