parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"iJA9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DB_USER=exports.DB_PATH=exports.DB_PASSWORD=void 0;var e="neo4j://abdf20aa.databases.neo4j.io",o="neo4j",s="B4uwAXSsSNmGXJjBlUVT5ejkJN3ym2HMxeZmNaTj3Co";exports.DB_PASSWORD=s,exports.DB_USER=o,exports.DB_PATH=e;
},{}],"epB2":[function(require,module,exports) {
"use strict";var e,t=require("./constants.js");function n(e){return i(e)||c(e)||o(e)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}function c(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function i(e){if(Array.isArray(e))return a(e)}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var u="Field is empty.",l="Incorrect number.",s="Incorrect query.",d="Select at least one option.";function m(e){e.classList.remove("not-visible"),e.classList.add("visible")}function f(e){e.classList.add("not-visible")}function p(e){document.getElementById("message").innerHTML=e,m(document.getElementById("message"))}function y(){return n(document.querySelectorAll("input[type='checkbox']")).map(function(e){return e.checked})}function g(){return y().includes(!0)}function v(){var e=document.getElementById("textRecords").value;return null!==e&&""!==e}function h(){var e=y(),t={0:"(p)-[r:REL]-(t), ",1:"(p)-[e:EASY]-(t), ",2:"(p)-[h:HARD]-(t), "},n="MATCH ",r="RETURN p, t, ",o="";if(e.forEach(function(e,r){e&&(n+=t[r])}),n=n.slice(0,-2),e.forEach(function(e,n){e&&(r+="".concat(t[n].slice(5,6),", "))}),r=r.slice(0,-2),v()){var c=document.getElementById("textRecords").value,i=document.getElementById("textList").value.split(", ");if(o="".concat(n," ").concat(r," LIMIT ").concat(c),i.length>0&&""!==i[0]){var a=Math.ceil(c/i.length),u="LIMIT ".concat(a," UNION ALL ");o=(i=i.map(function(e){return"".concat(n," WHERE p.name = '").concat(e,"' ").concat(r," ").concat(u)})).join("").slice(0,-11)}}return f(document.getElementById("message")),console.log(o),o}function E(e){return Number.isInteger(e)&&e>0&&e<=1e3}function I(){var n=h(),r={container_id:"viz",server_url:t.DB_PATH,server_user:t.DB_USER,server_password:t.DB_PASSWORD,labels:{Player:{caption:"name",size:"pagerank",community:"community",title_properties:["name","pagerank","community"]}},relationships:{REL:{thickness:"weight",caption:"weight"},EASY:{thickness:"weight",caption:"weight"},HARD:{thickness:"weight",caption:"weight"}},initial_cypher:n};try{(e=new NeoVis.default(r)).render()}catch(o){return console.log("Exception: ",o),void p(s)}document.querySelector("details").open=!1}function A(e){e.preventDefault();var t=v(),n=g(),r=document.getElementById("textRecords").value;t&&!E(+r)?p(l):t?n?I():p(d):(document.getElementById("textRecords").value=500,I())}function b(e){"Enter"===e.key&&A(e)}document.querySelector(".trigger").addEventListener("click",A);var S=document.querySelectorAll("input");S.forEach(function(e){return e.addEventListener("keypress",b)});
},{"./constants.js":"iJA9"}]},{},["epB2"], null)
//# sourceMappingURL=/main.84da31fe.js.map