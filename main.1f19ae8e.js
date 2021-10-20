// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DB_USER = exports.DB_PATH = exports.DB_PASSWORD = void 0;
var DB_PATH = "neo4j://abdf20aa.databases.neo4j.io",
    DB_USER = "neo4j",
    DB_PASSWORD = "B4uwAXSsSNmGXJjBlUVT5ejkJN3ym2HMxeZmNaTj3Co";
exports.DB_PASSWORD = DB_PASSWORD;
exports.DB_USER = DB_USER;
exports.DB_PATH = DB_PATH;
},{}],"main.js":[function(require,module,exports) {
"use strict";

var _constants = require("./constants.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var viz;
var limit = "Incorrect number.",
    exist = "Incorrect query.",
    checkbox = "Select at least one option.";

function visible(item) {
  item.classList.remove("not-visible");
  item.classList.add("visible");
}

function notVisible(item) {
  item.classList.add("not-visible");
}

function showError(text) {
  document.getElementById("message").innerHTML = text;
  visible(document.getElementById("message"));
}

function getInputs() {
  var inputs = document.querySelectorAll("input[type='checkbox']");
  return _toConsumableArray(inputs).map(function (input) {
    return input.checked;
  });
}

function isChecked() {
  return getInputs().includes(true);
}

function isLimitSelected() {
  var textRecords = document.getElementById("textRecords").value;
  return textRecords !== null && textRecords !== "";
}

function createQuery() {
  var inputs = getInputs();
  var inputs_rel = {
    0: "(p)-[r:REL]-(t), ",
    1: "(p)-[e:EASY]-(t), ",
    2: "(p)-[h:HARD]-(t), "
  };
  var match_q = "MATCH ",
      return_q = "RETURN p, t, ",
      query = ""; // match clause

  inputs.forEach(function (input, index) {
    if (input) match_q += inputs_rel[index];
  });
  match_q = match_q.slice(0, -2); // where clause

  var textWeight = document.getElementById("textWeight").value;
  var where_q = "";

  if (textWeight !== "") {
    inputs.every(function (input, index) {
      console.log(input);

      if (input) {
        where_q = "toInteger(".concat(inputs_rel[index].slice(5, 6), ".weight) >= ").concat(+textWeight);
        return false;
      } else return true;
    });
  } // return clause


  inputs.forEach(function (input, index) {
    if (input) return_q += "".concat(inputs_rel[index].slice(5, 6), ", ");
  });
  return_q = return_q.slice(0, -2);

  if (isLimitSelected()) {
    var textRecords = document.getElementById("textRecords").value;
    var textList = document.getElementById("textList").value;
    var list = textList.split(", ");
    query = "".concat(match_q, " where ").concat(where_q, " ").concat(return_q, " LIMIT ").concat(textRecords);

    if (list.length > 0 && list[0] !== "") {
      var limitPerPlayer = Math.ceil(textRecords / list.length); // limit clause

      var limit_q = "LIMIT ".concat(limitPerPlayer, " UNION ALL ");
      list = list.map(function (player) {
        return "".concat(match_q, " WHERE p.name = '").concat(player, "' and ").concat(where_q, " ").concat(return_q, " ").concat(limit_q);
      });
      query = list.join("").slice(0, -11);
    }
  }

  notVisible(document.getElementById("message"));
  console.log(query);
  return query;
}

function isInt(num) {
  return Number.isInteger(num) && num > 0 && num <= 1000;
}

function draw() {
  var query = createQuery();
  var config = {
    container_id: "viz",
    server_url: _constants.DB_PATH,
    encrypted: "ENCRYPTION_ON",
    server_user: _constants.DB_USER,
    server_password: _constants.DB_PASSWORD,
    labels: {
      Player: {
        caption: "name",
        size: "pagerank",
        community: "community",
        title_properties: ["name", "pagerank", "community"]
      }
    },
    relationships: {
      REL: {
        thickness: "weight",
        caption: "weight"
      },
      EASY: {
        thickness: "weight",
        caption: "weight"
      },
      HARD: {
        thickness: "weight",
        caption: "weight"
      }
    },
    initial_cypher: query
  };

  try {
    viz = new NeoVis.default(config);
    viz.render();
  } catch (e) {
    console.log("Exception: ", e);
    showError(exist);
    return;
  }

  var details = document.querySelector("details");
  details.open = false;
}

function onClick(e) {
  e.preventDefault();
  var isLimit = isLimitSelected(),
      isTypeChecked = isChecked(),
      textRecords = document.getElementById("textRecords").value,
      textWeight = document.getElementById("textWeight").value;

  if (isLimit && !isInt(+textRecords) || !isInt(+textWeight) && textWeight !== "") {
    showError(limit);
  } else if (!isLimit) {
    document.getElementById("textRecords").value = 500;
    draw();
  } else if (!isTypeChecked) {
    showError(checkbox);
  } else {
    draw();
  }
}

function onEnter(e) {
  if (e.key === "Enter") {
    onClick(e);
  }
}

document.querySelector(".trigger").addEventListener("click", onClick);
var input = document.querySelectorAll("input");
input.forEach(function (field) {
  return field.addEventListener("keypress", onEnter);
});
},{"./constants.js":"constants.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62599" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map