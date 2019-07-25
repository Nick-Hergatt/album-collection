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
})({"js/utils/html/html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _default() {
  return new html();
}

var html =
/*#__PURE__*/
function () {
  function html() {
    _classCallCheck(this, html);
  }

  _createClass(html, [{
    key: "addAttribute",
    value: function addAttribute(attributeToSet, attributeValue) {
      this.element.setAttribute(attributeToSet, attributeValue);
      return this;
    }
  }, {
    key: "click",
    value: function click(callback) {
      this.element.addEventListener("click", callback);
      return this;
    }
  }, {
    key: "create",
    value: function create(element) {
      this.element = document.createElement(element);
      return this;
    }
  }, {
    key: "addChild",
    value: function addChild(elementToAdd) {
      if (elementToAdd.render() instanceof HTMLUnknownElement) {
        throw new Error("Invalid HTML tag");
      }

      this.element.append(elementToAdd.render());
      return this;
    }
  }, {
    key: "addClass",
    value: function addClass(classToAdd) {
      if (this.element.classList.contains(classToAdd)) {
        throw new Error("This class already exists");
      }

      this.element.classList.add(classToAdd);
      return this;
    }
  }, {
    key: "addHtml",
    value: function addHtml(contentToAdd) {
      if (contentToAdd === undefined) {
        return this.elements.innerHTML;
      }

      this.element.innerHTML = contentToAdd;
      return this;
    }
  }, {
    key: "isClassQuery",
    value: function isClassQuery(query) {
      return query.startsWith(".");
    }
  }, {
    key: "isIdQuery",
    value: function isIdQuery(query) {
      return query.startsWith("#");
    }
  }, {
    key: "render",
    value: function render() {
      return this.element;
    }
  }, {
    key: "replace",
    value: function replace(element) {
      this.element.innerHTML = '';
      this.addChild(element);
      return this;
    }
  }, {
    key: "select",
    value: function select(query) {
      var selection = document.querySelectorAll(query);

      if (selection.length === 1) {
        this.element = selection[0];
      } else {
        this.element = selection;
      }

      return this;
    }
  }, {
    key: "text",
    value: function text(textToAdd) {
      if (textToAdd === undefined) {
        return this.element.textContent;
      }

      this.element.textContent = textToAdd;
      return this;
    }
  }]);

  return html;
}();
},{}],"js/utils/api/Api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _default() {
  return new Api();
}

var Api =
/*#__PURE__*/
function () {
  function Api() {
    _classCallCheck(this, Api);
  }

  _createClass(Api, [{
    key: "getRequest",
    value: function getRequest(location, callback) {
      fetch(location).then(function (response) {
        return response.json();
      }).then(callback).catch(function (err) {
        return console.log(err);
      });
    }
  }]);

  return Api;
}();
},{}],"js/utils/components/Components.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _html = _interopRequireDefault(require("../html/html"));

var _Api = _interopRequireDefault(require("../api/Api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _default = function _default() {
  return new Components();
};

exports.default = _default;

var Components =
/*#__PURE__*/
function () {
  function Components() {
    _classCallCheck(this, Components);
  }

  _createClass(Components, [{
    key: "getAppContext",
    value: function getAppContext() {
      return (0, _html.default)().select("#app");
    }
  }, {
    key: "renderWrapperDiv",
    value: function renderWrapperDiv() {
      return (0, _html.default)().create("div").addClass("wrapper");
    }
  }, {
    key: "renderMainHeader",
    value: function renderMainHeader() {
      var mainHeader = (0, _html.default)().create("header").addClass("main-header");
      var mainHeaderTitle = (0, _html.default)().create("h1").addClass("main-header__title").text("WildGroove");
      var nav = this.renderMainNav();
      mainHeader.addChild(mainHeaderTitle);
      mainHeader.addChild(nav);
      return mainHeader;
    }
  }, {
    key: "renderMainNav",
    value: function renderMainNav() {
      var _this = this;

      var nav = (0, _html.default)().create("nav");
      var navList = (0, _html.default)().create("ol").addClass("nav__list");
      var navListItemOne = (0, _html.default)().create("li").addClass("nav__list-item").addChild((0, _html.default)().create("a").addAttribute("href", "").text("Back To All Artists").click(function (event) {
        event.preventDefault();

        _this.renderPageArtists();
      }));
      navList.addChild(navListItemOne);
      nav.addChild(navList);
      return nav;
    }
  }, {
    key: "renderMainFooter",
    value: function renderMainFooter() {
      var mainFooter = (0, _html.default)().create("footer").addClass("main-footer");
      var mainFooterCopy = (0, _html.default)().create("small").addClass("main-footer__copy").addHtml("&copy; 2019 WildGroove");
      mainFooter.addChild(mainFooterCopy);
      return mainFooter;
    }
  }, {
    key: "renderContentBlock",
    value: function renderContentBlock(requestedData) {
      var _this2 = this;

      var contentBlock = (0, _html.default)().create("section").addClass("content-block");
      var contentBlockTitle = (0, _html.default)().create("h3").addClass("content-block__title").text(requestedData);
      var contentBlockList = (0, _html.default)().create("ul").addClass("content-block__list");
      (0, _Api.default)().getRequest("http://localhost:8080/api/".concat(requestedData), function (responseCollection) {
        responseCollection.forEach(function (item) {
          var elementName;

          if (item.albumTitle) {
            elementName = item.albumTitle;
          } else if (item.name) {
            elementName = item.name;
          } else {
            elementName = item.songTitle;
          }

          var contentBlockListItem = (0, _html.default)().create("li").addClass("content-block__list-item").addChild((0, _html.default)().create("a").addAttribute("href", "/".concat(requestedData, "/").concat(item.id)).text(elementName).click(function (event) {
            event.preventDefault();
            var endpoint = event.target.getAttribute("href");
            (0, _Api.default)().getRequest("http://localhost:8080/api".concat(endpoint), function (data) {
              _this2.renderPageSingle(data, endpoint);
            });
          }));
          contentBlockList.addChild(contentBlockListItem);
        });
      });
      contentBlock.addChild(contentBlockTitle);
      contentBlock.addChild(contentBlockList);
      return contentBlock;
    }
  }, {
    key: "renderMainContent",
    value: function renderMainContent(requestedData) {
      var mainContent = (0, _html.default)().create("main").addClass("main-content");
      var containerDiv = (0, _html.default)().create("div").addClass("container");
      var contentBlock = this.renderContentBlock(requestedData);
      containerDiv.addChild(contentBlock);
      mainContent.addChild(containerDiv);
      return mainContent;
    }
  }, {
    key: "renderPageArtist",
    value: function renderPageArtist(data) {
      var _this3 = this;

      var currentMainContentContainerContentBlock = this.renderWrapperDiv().select(".main-content").select(".container").select(".content-block");
      console.log(data);
      var artistEntry = (0, _html.default)().create('div').addClass('artistEntry');
      var artistName = (0, _html.default)().create("h3").addClass("content-block__title").text(data.name);
      var artistPicture = (0, _html.default)().create('img').addClass('artistsEntry__image').addAttribute('src', data.artistImageUrl);
      var artistAge = (0, _html.default)().create('h4').text(data.artistAge);
      var recordLabel = (0, _html.default)().create('h4').text(data.recordLabel);
      var hometown = (0, _html.default)().create('h4').text(data.hometown);
      var artistAlbums = (0, _html.default)().create('ul');
      data.albums.forEach(function (album) {
        var albumElement = (0, _html.default)().create('li').addChild((0, _html.default)().create('a').addAttribute('href', "/albums/".concat(album.id)).text(album.albumTitle).click(function (event) {
          event.preventDefault();
          var endpoint = event.target.getAttribute('href');
          (0, _Api.default)().getRequest("http://localhost:8080/api".concat(endpoint), function (data) {
            _this3.renderPageSingle(data, endpoint);
          });
        }));
        artistAlbums.addChild(albumElement);
      });
      artistEntry.addChild(artistName);
      artistEntry.addChild(artistPicture);
      artistEntry.addChild(artistAge);
      artistEntry.addChild(recordLabel);
      artistEntry.addChild(hometown);
      artistEntry.addChild(artistAlbums);
      console.log(artistEntry);
      currentMainContentContainerContentBlock.replace(artistEntry);
    }
  }, {
    key: "renderPageArtists",
    value: function renderPageArtists() {
      var currentMainContentContainer = this.renderWrapperDiv().select(".main-content").select(".container");
      currentMainContentContainer.replace(this.renderContentBlock("artists"));
    }
  }, {
    key: "renderPageAlbum",
    value: function renderPageAlbum(data) {
      var _this4 = this;

      var currentMainContentContainerContentBlock = this.renderWrapperDiv().select(".main-content").select(".container").select(".content-block");
      var albumTitle = (0, _html.default)().create("h3").addClass("content-block__title").text(data.title);
      var albumArtist = (0, _html.default)().create("ul").addClass("artist");
      var songAdd = (0, _html.default)().create("section").addClass("add-song");
      var songAddTitle = (0, _html.default)().create("input").addAttribute("type", "text").addClass("add-song__input");
      var songAddButton = (0, _html.default)().create("button").addClass("add-song__button").text("submit new campus").click(function (event) {
        var newTitle = songAddTitle.value;

        _Api.default.postRequest("http://localhost:8080/add-song", {
          songTitle: newTitle
        });
      });
      data.artist.forEach(function (artist) {
        var artistElement = (0, _html.default)().create("li").addChild((0, _html.default)().create("a").addAttribute("href", "/artists/".concat(artist.id)).text(artist.name).click(function (event) {
          event.preventDefault();
          var endpoint = event.target.getAttribute("href");
          (0, _Api.default)().getRequest("http://localhost:8080/api".concat(endpoint), function (data) {
            _this4.renderPageSingle(data, endpoint);
          });
        }));
        albumArtist.addChild(artistElement);
      });
      var albumSong = (0, _html.default)().create("h4").addChild((0, _html.default)().create("a").addAttribute("href", "/songs/".concat(data.song.id)).text(data.song.songTitle).click(function (event) {
        event.preventDefault();
        var endpoint = event.target.getAttribute("href");

        _Api.default.getRequest("http://localhost:8080/api".concat(endpoint), function (data) {
          _this4.renderPageSingle(data, endpoint);
        });
      }));
      songAdd.addChild(songAddTitle).addChild(songAddButton);
      currentMainContentContainerContentBlock.replace(albumTitle);
      currentMainContentContainerContentBlock.addChild(albumArtist);
      currentMainContentContainerContentBlock.addChild(albumSong);
      currentMainContentContainerContentBlock.addChild(songAdd);
    }
  }, {
    key: "renderPageAlbums",
    value: function renderPageAlbums() {
      var currentMainContentContainer = this.renderWrapperDiv().select(".main-content").select(".container");
      currentMainContentContainer.replace(this.renderContentBlock("albums"));
    }
  }, {
    key: "renderPageSong",
    value: function renderPageSong() {
      var currentMainContentContainerContentBlock = this.renderWrapperDiv().select(".main-content").select(".container").select(".content-block");
      var songTitle = (0, _html.default)().create("h3").addClass("content-block_title").text(data.songTitle);
    }
  }, {
    key: "renderPageSongs",
    value: function renderPageSongs() {
      var currentMainContentContainer = this.renderWrapperDiv().select(".main-content").select(".container");
      currentMainContentContainer.replace(this.renderContentBlock("songs"));
    }
  }, {
    key: "renderPageSingle",
    value: function renderPageSingle(data, endpoint) {
      var typeOfObject = endpoint.split('/')[1];

      if (typeOfObject === 'artists') {
        this.renderPageArtist(data);
      }

      if (typeOfObject === 'albums') {
        this.renderPageAlbum(data);
      }

      if (typeOfObject === 'songs') {
        this.renderPageSong(data);
      }
    }
  }, {
    key: "renderPageHome",
    value: function renderPageHome() {
      var app = this.getAppContext();
      var wrapperDiv = this.renderWrapperDiv();
      var mainHeader = this.renderMainHeader();
      var mainContent = this.renderMainContent("artists");
      var mainFooter = this.renderMainFooter();
      wrapperDiv.addChild(mainHeader);
      wrapperDiv.addChild(mainContent);
      wrapperDiv.addChild(mainFooter);
      app.replace(wrapperDiv);
    }
  }]);

  return Components;
}();
},{"../html/html":"js/utils/html/html.js","../api/Api":"js/utils/api/Api.js"}],"js/main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = main;

var _Components = _interopRequireDefault(require("./utils/components/Components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function main() {
  (0, _Components.default)().renderPageHome();
}
},{"./utils/components/Components":"js/utils/components/Components.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _main = _interopRequireDefault(require("./main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _main.default)();
},{"./main":"js/main.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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

  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49832" + '/');


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
      } else {
        window.location.reload();
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map