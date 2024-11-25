var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/mdns-js/package.json
var require_package = __commonJS({
  "node_modules/mdns-js/package.json"(exports, module) {
    module.exports = {
      name: "mdns-js",
      version: "1.0.3",
      repository: {
        type: "git",
        url: "git://github.com/mdns-js/node-mdns-js.git"
      },
      description: "JavaScript/NodeJS mDNS discovery implementation",
      keywords: [
        "mdns",
        "dns-sd",
        "zeroconf"
      ],
      engines: {
        node: ">= 6.0.0"
      },
      main: "index.js",
      dependencies: {
        debug: "~3.1.0",
        "dns-js": "~0.2.1",
        semver: "~5.4.1"
      },
      devDependencies: {
        code: "^5.1.2",
        eslint: "^5.10.0",
        joi: "^14.3.0",
        lab: "^18.0.0"
      },
      scripts: {
        pretest: "node ./bin/testversion.js",
        test: "./node_modules/.bin/lab --flat && npm run lint",
        lint: "./node_modules/.bin/eslint test examples lib index.js",
        doc: "jsdoc -d .\\doc index.js lib"
      },
      author: {
        name: "Peter Magnusson",
        email: "peter@birchroad.net"
      },
      contributors: [
        "James Sigur\xF0arson <jamiees2@gmail.com> (http://jamessigurdarson.com)",
        "David Baldwynn <whitef0x0@users.noreply.github.com>",
        "Stefan Sauer <ensonic@google.com>"
      ],
      license: "Apache-2.0",
      bugs: {
        url: "https://github.com/mdns-js/node-mdns-js/issues"
      },
      homepage: "https://github.com/mdns-js/node-mdns-js"
    };
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isNaN(val) === false) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      if (ms >= d) {
        return Math.round(ms / d) + "d";
      }
      if (ms >= h) {
        return Math.round(ms / h) + "h";
      }
      if (ms >= m) {
        return Math.round(ms / m) + "m";
      }
      if (ms >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
    }
    function plural(ms, n, name) {
      if (ms < n) {
        return;
      }
      if (ms < n * 1.5) {
        return Math.floor(ms / n) + " " + name;
      }
      return Math.ceil(ms / n) + " " + name + "s";
    }
  }
});

// node_modules/debug/src/debug.js
var require_debug = __commonJS({
  "node_modules/debug/src/debug.js"(exports, module) {
    exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = require_ms();
    exports.instances = [];
    exports.names = [];
    exports.skips = [];
    exports.formatters = {};
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports.colors[Math.abs(hash) % exports.colors.length];
    }
    function createDebug(namespace) {
      var prevTime;
      function debug() {
        if (!debug.enabled) return;
        var self = debug;
        var curr = +/* @__PURE__ */ new Date();
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        args[0] = exports.coerce(args[0]);
        if ("string" !== typeof args[0]) {
          args.unshift("%O");
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%") return match;
          index++;
          var formatter = exports.formatters[format];
          if ("function" === typeof formatter) {
            var val = args[index];
            match = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        exports.formatArgs.call(self, args);
        var logFn = debug.log || exports.log || console.log.bind(console);
        logFn.apply(self, args);
      }
      debug.namespace = namespace;
      debug.enabled = exports.enabled(namespace);
      debug.useColors = exports.useColors();
      debug.color = selectColor(namespace);
      debug.destroy = destroy;
      if ("function" === typeof exports.init) {
        exports.init(debug);
      }
      exports.instances.push(debug);
      return debug;
    }
    function destroy() {
      var index = exports.instances.indexOf(this);
      if (index !== -1) {
        exports.instances.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }
    function enable(namespaces) {
      exports.save(namespaces);
      exports.names = [];
      exports.skips = [];
      var i;
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (i = 0; i < len; i++) {
        if (!split[i]) continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
      for (i = 0; i < exports.instances.length; i++) {
        var instance = exports.instances[i];
        instance.enabled = exports.enabled(instance.namespace);
      }
    }
    function disable() {
      exports.enable("");
    }
    function enabled(name) {
      if (name[name.length - 1] === "*") {
        return true;
      }
      var i, len;
      for (i = 0, len = exports.skips.length; i < len; i++) {
        if (exports.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports.names.length; i < len; i++) {
        if (exports.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module) {
    exports = module.exports = require_debug();
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args) {
      var useColors2 = this.useColors;
      args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
      if (!useColors2) return;
      var c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match) return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports.storage.removeItem("debug");
        } else {
          exports.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    exports.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports, module) {
    var tty = __require("tty");
    var util = __require("util");
    exports = module.exports = require_debug();
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      supportsColor = __require("supports-color");
      if (supportsColor && supportsColor.level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (err) {
    }
    var supportsColor;
    exports.inspectOpts = Object.keys(process.env).filter(function(key) {
      return /^debug_/i.test(key);
    }).reduce(function(obj, key) {
      var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
        return k.toUpperCase();
      });
      var val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
      else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
      else if (val === "null") val = null;
      else val = Number(val);
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    exports.formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
        return str.trim();
      }).join(" ");
    };
    exports.formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
    function formatArgs(args) {
      var name = this.namespace;
      var useColors2 = this.useColors;
      if (useColors2) {
        var c = this.color;
        var colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        var prefix = "  " + colorCode + ";1m" + name + " \x1B[0m";
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      } else {
        return (/* @__PURE__ */ new Date()).toISOString() + " ";
      }
    }
    function log() {
      return process.stderr.write(util.format.apply(util, arguments) + "\n");
    }
    function save(namespaces) {
      if (null == namespaces) {
        delete process.env.DEBUG;
      } else {
        process.env.DEBUG = namespaces;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      var keys = Object.keys(exports.inspectOpts);
      for (var i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    exports.enable(load());
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports, module) {
    if (typeof process === "undefined" || process.type === "renderer") {
      module.exports = require_browser();
    } else {
      module.exports = require_node();
    }
  }
});

// node_modules/mdns-js/lib/service_type.js
var require_service_type = __commonJS({
  "node_modules/mdns-js/lib/service_type.js"(exports) {
    var debug = require_src()("mdns:lib:ServiceType");
    var MAX_STRING = 20;
    var ServiceType = exports.ServiceType = function() {
      this.name = "";
      this.protocol = "";
      this.subtypes = [];
      var args;
      if (arguments.length === 1) {
        args = Array.isArray(arguments[0]) ? arguments[0] : [arguments[0]];
      } else if (arguments.length > 1) {
        args = Array.prototype.slice.call(arguments);
      }
      if (args) {
        if (args.length === 1) {
          if (typeof args[0] === "string") {
            this.fromString(args[0]);
          } else if (typeof args[0] === "object") {
            this.fromJSON(args[0]);
          } else {
            throw new Error("argument must be a string, array or object");
          }
        } else if (args.length >= 2) {
          this.fromArray(args);
        } else {
        }
      }
      this.description = this.getDescription();
    };
    ServiceType.wildcard = "_services._dns-sd._udp";
    ServiceType.prototype.getDescription = function() {
      var key = this.toString();
      return SERVICE_DESCRIPTIONS[key];
    };
    ServiceType.prototype.isWildcard = function isWildcard() {
      return this.toString() === ServiceType.wildcard;
    };
    ServiceType.prototype.toString = function() {
      var typeString = _u(this.name) + "." + _u(this.protocol);
      if (this.fullyQualified) {
        typeString += ".";
      }
      if (this.subtypes.length > 0) {
        var subtypes = this.subtypes.slice(0);
        subtypes.unshift(typeString);
        typeString = subtypes.join(",");
      }
      return typeString;
    };
    ServiceType.prototype.fromString = function fromString(text) {
      debug("fromString", text);
      text = text.replace(/.local$/, "");
      if (text.charAt(0) === "_") {
        text = text.replace(/^_sub/, "._sub");
      }
      var isWildcard = text === ServiceType.wildcard;
      var subtypes = text.split(",");
      debug("subtypes", subtypes);
      if (subtypes.length === 1) {
        subtypes = text.split("._sub").reverse();
      }
      var primaryString = subtypes.shift();
      var serviceTokens = primaryString.split(".");
      var serviceType = serviceTokens.shift();
      var protocol;
      debug(
        "primary: %s, servicetype: %s, serviceTokens: %s, subtypes: %j",
        primaryString,
        serviceType,
        serviceTokens.join("."),
        subtypes.join(",")
      );
      if (isWildcard) {
        serviceType += "." + serviceTokens.shift();
      }
      if (primaryString[0] !== "_" || primaryString[0] === "_services") {
        serviceType = serviceTokens.shift();
      }
      protocol = serviceTokens.shift();
      if (typeof protocol === "undefined") {
        protocol = "_tcp";
      }
      checkProtocolU(protocol);
      if (!isWildcard) {
        checkFormat(serviceType);
      }
      if (serviceTokens.length === 1 && serviceTokens[0] === "") {
        this.fullyQualified = true;
      } else if (serviceTokens.length > 0) {
        throw new Error('trailing tokens "' + serviceTokens.join(".") + '" in service type string "' + text + '"');
      }
      this.name = serviceType.substr(1);
      this.protocol = protocol.substr(1);
      this.subtypes = subtypes;
      debug("this", this);
    };
    ServiceType.prototype.toArray = function toArray() {
      return [this.name, this.protocol].concat(this.subtypes);
    };
    ServiceType.prototype.fromArray = function fromArray(array) {
      var serviceType = _uu(array.shift());
      var protocol = _uu(array.shift());
      var subtypes = array.map(function(t) {
        return _uu(t);
      });
      checkLengthAndCharset(serviceType);
      checkProtocol(protocol);
      subtypes.forEach(function(t) {
        checkLengthAndCharset(t);
      });
      this.name = serviceType;
      this.protocol = protocol;
      this.subtypes = subtypes;
    };
    ServiceType.prototype.fromJSON = function fromJSON(obj) {
      debug("fromJSON");
      if (!("name" in obj)) {
        throw new Error("required property name is missing");
      }
      if (!("protocol" in obj)) {
        throw new Error("required property protocol is missing");
      }
      var serviceType = _uu(obj.name);
      var protocol = _uu(obj.protocol);
      var subtypes = "subtypes" in obj ? obj.subtypes.map(function(t) {
        return _uu(t);
      }) : [];
      checkLengthAndCharset(serviceType);
      checkProtocol(protocol);
      subtypes.forEach(function(t) {
        checkLengthAndCharset(t);
      });
      this.name = serviceType;
      this.protocol = protocol;
      this.subtypes = subtypes;
      if ("fullyQualified" in obj) {
        this.fullyQualified = obj.fullyQualified;
      }
    };
    ServiceType.prototype.matches = function matches(other) {
      return this.name === other.name && this.protocol === other.protocol;
    };
    exports.makeServiceType = function makeServiceType() {
      if (arguments.length === 1 && arguments[0] instanceof ServiceType) {
        return arguments[0];
      }
      return new ServiceType(Array.prototype.slice.call(arguments));
    };
    exports.protocolHelper = function protocolHelper(protocol) {
      return function() {
        var args = Array.prototype.slice.call(arguments);
        if (isProtocol(args[1])) {
          throw new Error('duplicate protocol "' + args[1] + '" in arguments');
        }
        args.splice(1, 0, protocol);
        return exports.makeServiceType.apply(this, args);
      };
    };
    function isProtocol(str) {
      return str === "tcp" || str === "_tcp" || str === "udp" || str === "_udp";
    }
    function _u(str) {
      return "_" + str;
    }
    function _uu(str) {
      return str[0] === "_" ? str.substr(1) : str;
    }
    var CHARSET_REGEX = /[^-a-zA-Z0-9]/;
    function checkLengthAndCharset(str) {
      if (str.length === 0) {
        throw new Error("type " + str + " must not be empty");
      }
      if (str.length > MAX_STRING) {
        throw new Error("type " + str + " has more than " + MAX_STRING + " characters");
      }
      if (str.match(CHARSET_REGEX)) {
        throw new Error("type " + str + " may only contain alphanumeric characters and hyphens");
      }
    }
    var FORMAT_REGEX = /_[-a-zA-Z0-9]+/;
    function checkFormat(str) {
      if (str.length === 0) {
        throw new Error("type string must not be empty");
      }
      if (str.length > MAX_STRING + 1) {
        throw new Error("type " + _uu(str) + " has more than " + MAX_STRING + " characters");
      }
      if (!str.match(FORMAT_REGEX)) {
        throw new Error("type " + str + " must start with an underscore followed by alphanumeric characters and hyphens only");
      }
    }
    function checkProtocolU(str) {
      if (!(str === "_tcp" || str === "_udp")) {
        throw new Error('protocol must be either "_tcp" or "_udp" but is "' + str + '"');
      }
    }
    function checkProtocol(str) {
      if (!(str === "tcp" || str === "udp")) {
        throw new Error('protocol must be either "tcp" or "udp" but is "' + str + '"');
      }
    }
    var SERVICE_DESCRIPTIONS = {
      "_acrobatSRV._tcp": "Adobe Acrobat",
      "_adisk._tcp": "Apple TimeMachine",
      "_adobe-vc._tcp": "Adobe Version Cue",
      "_afpovertcp._tcp": "Apple File Sharing",
      "_airport._tcp": "Apple AirPort",
      "_apt._tcp": "APT Package Repository",
      "_bzr._tcp": "Bazaar",
      "_cros_p2p._tcp": "Chrome OS P2P Update",
      "_daap._tcp": "iTunes Audio Access",
      "_dacp._tcp": "iTunes Remote Control",
      "_distcc._tcp": "Distributed Compiler",
      "_domain._udp": "DNS Server",
      "_dpap._tcp": "Digital Photo Sharing",
      "_ftp._tcp": "FTP File Transfer",
      "_h323._tcp": "H.323 Telephony",
      "_home-sharing._tcp": "Apple Home Sharing",
      "_https._tcp": "Secure Web Site",
      "_http._tcp": "Web Site",
      "_iax._udp": "Asterisk Exchange",
      "_imap._tcp": "IMAP Mail Access",
      "_ipp._tcp": "Internet Printer",
      "_ksysguard._tcp": "KDE System Guard",
      "_ldap._tcp": "LDAP Directory Server",
      "_libvirt._tcp": "Virtual Machine Manager",
      "_lobby._tcp": "Gobby Collaborative Editor Session",
      "_MacOSXDupSuppress._tcp": "MacOS X Duplicate Machine Suppression",
      "_mpd._tcp": "Music Player Daemon",
      "_mumble._tcp": "Mumble Server",
      "_net-assistant._udp": "Apple Net Assistant",
      "_nfs._tcp": "Network File System",
      "_ntp._udp": "NTP Time Server",
      "_odisk._tcp": "DVD or CD Sharing",
      "_omni-bookmark._tcp": "OmniWeb Bookmark Sharing",
      "_pdl-datastream._tcp": "PDL Printer",
      "_pgpkey-hkp._tcp": "GnuPG/PGP HKP Key Server",
      "_pop3._tcp": "POP3 Mail Access",
      "_postgresql._tcp": "PostgreSQL Server",
      "_presence_olpc._tcp": "OLPC Presence",
      "_presence._tcp": "iChat Presence",
      "_printer._tcp": "UNIX Printer",
      "_pulse-server._tcp": "PulseAudio Sound Server",
      "_pulse-sink._tcp": "PulseAudio Sound Sink",
      "_pulse-source._tcp": "PulseAudio Sound Source",
      "_raop._tcp": "AirTunes Remote Audio",
      "_realplayfavs._tcp": "RealPlayer Shared Favorites",
      "_remote-jukebox._tcp": "Remote Jukebox",
      "_rfb._tcp": "VNC Remote Access",
      "_rss._tcp": "Web Syndication RSS",
      "_rtp._udp": "RTP Realtime Streaming Server",
      "_rtsp._tcp": "RTSP Realtime Streaming Server",
      "_see._tcp": "SubEthaEdit Collaborative Text Editor",
      "_sftp-ssh._tcp": "SFTP File Transfer",
      "_shifter._tcp": "Window Shifter",
      "_sip._udp": "SIP Telephony",
      "_skype._tcp": "Skype VoIP",
      "_smb._tcp": "Microsoft Windows Network",
      "_ssh._tcp": "SSH Remote Terminal",
      "_svn._tcp": "Subversion Revision Control",
      "_telnet._tcp": "Telnet Remote Terminal",
      "_tftp._udp": "TFTP Trivial File Transfer",
      "_timbuktu._tcp": "Timbuktu Remote Desktop Control",
      "_touch-able._tcp": "iPod Touch Music Library",
      "_tp-https._tcp": "Thousand Parsec Server (Secure HTTP Tunnel)",
      "_tp-http._tcp": "Thousand Parsec Server (HTTP Tunnel)",
      "_tps._tcp": "Thousand Parsec Server (Secure)",
      "_tp._tcp": "Thousand Parsec Server",
      "_udisks-ssh._tcp": "Remote Disk Management",
      "_vlc-http._tcp": "VLC Streaming",
      "_webdavs._tcp": "Secure WebDAV File Share",
      "_webdav._tcp": "WebDAV File Share",
      "_workstation._tcp": "Workstation",
      "_googlecast._tcp": "Google Chromecast"
    };
  }
});

// node_modules/semver/semver.js
var require_semver = __commonJS({
  "node_modules/semver/semver.js"(exports, module) {
    exports = module.exports = SemVer;
    var debug;
    if (typeof process === "object" && /* nomin */
    process.env && /* nomin */
    process.env.NODE_DEBUG && /* nomin */
    /\bsemver\b/i.test(process.env.NODE_DEBUG))
      debug = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift("SEMVER");
        console.log.apply(console, args);
      };
    else
      debug = function() {
      };
    exports.SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
    var re = exports.re = [];
    var src = exports.src = [];
    var R = 0;
    var NUMERICIDENTIFIER = R++;
    src[NUMERICIDENTIFIER] = "0|[1-9]\\d*";
    var NUMERICIDENTIFIERLOOSE = R++;
    src[NUMERICIDENTIFIERLOOSE] = "[0-9]+";
    var NONNUMERICIDENTIFIER = R++;
    src[NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
    var MAINVERSION = R++;
    src[MAINVERSION] = "(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")";
    var MAINVERSIONLOOSE = R++;
    src[MAINVERSIONLOOSE] = "(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")";
    var PRERELEASEIDENTIFIER = R++;
    src[PRERELEASEIDENTIFIER] = "(?:" + src[NUMERICIDENTIFIER] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASEIDENTIFIERLOOSE = R++;
    src[PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[NUMERICIDENTIFIERLOOSE] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASE = R++;
    src[PRERELEASE] = "(?:-(" + src[PRERELEASEIDENTIFIER] + "(?:\\." + src[PRERELEASEIDENTIFIER] + ")*))";
    var PRERELEASELOOSE = R++;
    src[PRERELEASELOOSE] = "(?:-?(" + src[PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[PRERELEASEIDENTIFIERLOOSE] + ")*))";
    var BUILDIDENTIFIER = R++;
    src[BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
    var BUILD = R++;
    src[BUILD] = "(?:\\+(" + src[BUILDIDENTIFIER] + "(?:\\." + src[BUILDIDENTIFIER] + ")*))";
    var FULL = R++;
    var FULLPLAIN = "v?" + src[MAINVERSION] + src[PRERELEASE] + "?" + src[BUILD] + "?";
    src[FULL] = "^" + FULLPLAIN + "$";
    var LOOSEPLAIN = "[v=\\s]*" + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + "?" + src[BUILD] + "?";
    var LOOSE = R++;
    src[LOOSE] = "^" + LOOSEPLAIN + "$";
    var GTLT = R++;
    src[GTLT] = "((?:<|>)?=?)";
    var XRANGEIDENTIFIERLOOSE = R++;
    src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
    var XRANGEIDENTIFIER = R++;
    src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + "|x|X|\\*";
    var XRANGEPLAIN = R++;
    src[XRANGEPLAIN] = "[v=\\s]*(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:" + src[PRERELEASE] + ")?" + src[BUILD] + "?)?)?";
    var XRANGEPLAINLOOSE = R++;
    src[XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:" + src[PRERELEASELOOSE] + ")?" + src[BUILD] + "?)?)?";
    var XRANGE = R++;
    src[XRANGE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAIN] + "$";
    var XRANGELOOSE = R++;
    src[XRANGELOOSE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAINLOOSE] + "$";
    var LONETILDE = R++;
    src[LONETILDE] = "(?:~>?)";
    var TILDETRIM = R++;
    src[TILDETRIM] = "(\\s*)" + src[LONETILDE] + "\\s+";
    re[TILDETRIM] = new RegExp(src[TILDETRIM], "g");
    var tildeTrimReplace = "$1~";
    var TILDE = R++;
    src[TILDE] = "^" + src[LONETILDE] + src[XRANGEPLAIN] + "$";
    var TILDELOOSE = R++;
    src[TILDELOOSE] = "^" + src[LONETILDE] + src[XRANGEPLAINLOOSE] + "$";
    var LONECARET = R++;
    src[LONECARET] = "(?:\\^)";
    var CARETTRIM = R++;
    src[CARETTRIM] = "(\\s*)" + src[LONECARET] + "\\s+";
    re[CARETTRIM] = new RegExp(src[CARETTRIM], "g");
    var caretTrimReplace = "$1^";
    var CARET = R++;
    src[CARET] = "^" + src[LONECARET] + src[XRANGEPLAIN] + "$";
    var CARETLOOSE = R++;
    src[CARETLOOSE] = "^" + src[LONECARET] + src[XRANGEPLAINLOOSE] + "$";
    var COMPARATORLOOSE = R++;
    src[COMPARATORLOOSE] = "^" + src[GTLT] + "\\s*(" + LOOSEPLAIN + ")$|^$";
    var COMPARATOR = R++;
    src[COMPARATOR] = "^" + src[GTLT] + "\\s*(" + FULLPLAIN + ")$|^$";
    var COMPARATORTRIM = R++;
    src[COMPARATORTRIM] = "(\\s*)" + src[GTLT] + "\\s*(" + LOOSEPLAIN + "|" + src[XRANGEPLAIN] + ")";
    re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], "g");
    var comparatorTrimReplace = "$1$2$3";
    var HYPHENRANGE = R++;
    src[HYPHENRANGE] = "^\\s*(" + src[XRANGEPLAIN] + ")\\s+-\\s+(" + src[XRANGEPLAIN] + ")\\s*$";
    var HYPHENRANGELOOSE = R++;
    src[HYPHENRANGELOOSE] = "^\\s*(" + src[XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[XRANGEPLAINLOOSE] + ")\\s*$";
    var STAR = R++;
    src[STAR] = "(<|>)?=?\\s*\\*";
    for (i = 0; i < R; i++) {
      debug(i, src[i]);
      if (!re[i])
        re[i] = new RegExp(src[i]);
    }
    var i;
    exports.parse = parse;
    function parse(version, loose) {
      if (version instanceof SemVer)
        return version;
      if (typeof version !== "string")
        return null;
      if (version.length > MAX_LENGTH)
        return null;
      var r = loose ? re[LOOSE] : re[FULL];
      if (!r.test(version))
        return null;
      try {
        return new SemVer(version, loose);
      } catch (er) {
        return null;
      }
    }
    exports.valid = valid;
    function valid(version, loose) {
      var v = parse(version, loose);
      return v ? v.version : null;
    }
    exports.clean = clean;
    function clean(version, loose) {
      var s = parse(version.trim().replace(/^[=v]+/, ""), loose);
      return s ? s.version : null;
    }
    exports.SemVer = SemVer;
    function SemVer(version, loose) {
      if (version instanceof SemVer) {
        if (version.loose === loose)
          return version;
        else
          version = version.version;
      } else if (typeof version !== "string") {
        throw new TypeError("Invalid Version: " + version);
      }
      if (version.length > MAX_LENGTH)
        throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
      if (!(this instanceof SemVer))
        return new SemVer(version, loose);
      debug("SemVer", version, loose);
      this.loose = loose;
      var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);
      if (!m)
        throw new TypeError("Invalid Version: " + version);
      this.raw = version;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0)
        throw new TypeError("Invalid patch version");
      if (!m[4])
        this.prerelease = [];
      else
        this.prerelease = m[4].split(".").map(function(id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER)
              return num;
          }
          return id;
        });
      this.build = m[5] ? m[5].split(".") : [];
      this.format();
    }
    SemVer.prototype.format = function() {
      this.version = this.major + "." + this.minor + "." + this.patch;
      if (this.prerelease.length)
        this.version += "-" + this.prerelease.join(".");
      return this.version;
    };
    SemVer.prototype.toString = function() {
      return this.version;
    };
    SemVer.prototype.compare = function(other) {
      debug("SemVer.compare", this.version, this.loose, other);
      if (!(other instanceof SemVer))
        other = new SemVer(other, this.loose);
      return this.compareMain(other) || this.comparePre(other);
    };
    SemVer.prototype.compareMain = function(other) {
      if (!(other instanceof SemVer))
        other = new SemVer(other, this.loose);
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    };
    SemVer.prototype.comparePre = function(other) {
      if (!(other instanceof SemVer))
        other = new SemVer(other, this.loose);
      if (this.prerelease.length && !other.prerelease.length)
        return -1;
      else if (!this.prerelease.length && other.prerelease.length)
        return 1;
      else if (!this.prerelease.length && !other.prerelease.length)
        return 0;
      var i2 = 0;
      do {
        var a = this.prerelease[i2];
        var b = other.prerelease[i2];
        debug("prerelease compare", i2, a, b);
        if (a === void 0 && b === void 0)
          return 0;
        else if (b === void 0)
          return 1;
        else if (a === void 0)
          return -1;
        else if (a === b)
          continue;
        else
          return compareIdentifiers(a, b);
      } while (++i2);
    };
    SemVer.prototype.inc = function(release, identifier) {
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier);
          this.inc("pre", identifier);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          if (this.prerelease.length === 0)
            this.inc("patch", identifier);
          this.inc("pre", identifier);
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0)
            this.major++;
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0)
            this.minor++;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0)
            this.patch++;
          this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
        case "pre":
          if (this.prerelease.length === 0)
            this.prerelease = [0];
          else {
            var i2 = this.prerelease.length;
            while (--i2 >= 0) {
              if (typeof this.prerelease[i2] === "number") {
                this.prerelease[i2]++;
                i2 = -2;
              }
            }
            if (i2 === -1)
              this.prerelease.push(0);
          }
          if (identifier) {
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1]))
                this.prerelease = [identifier, 0];
            } else
              this.prerelease = [identifier, 0];
          }
          break;
        default:
          throw new Error("invalid increment argument: " + release);
      }
      this.format();
      this.raw = this.version;
      return this;
    };
    exports.inc = inc;
    function inc(version, release, loose, identifier) {
      if (typeof loose === "string") {
        identifier = loose;
        loose = void 0;
      }
      try {
        return new SemVer(version, loose).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    }
    exports.diff = diff;
    function diff(version1, version2) {
      if (eq(version1, version2)) {
        return null;
      } else {
        var v1 = parse(version1);
        var v2 = parse(version2);
        if (v1.prerelease.length || v2.prerelease.length) {
          for (var key in v1) {
            if (key === "major" || key === "minor" || key === "patch") {
              if (v1[key] !== v2[key]) {
                return "pre" + key;
              }
            }
          }
          return "prerelease";
        }
        for (var key in v1) {
          if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) {
              return key;
            }
          }
        }
      }
    }
    exports.compareIdentifiers = compareIdentifiers;
    var numeric = /^[0-9]+$/;
    function compareIdentifiers(a, b) {
      var anum = numeric.test(a);
      var bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : a > b ? 1 : 0;
    }
    exports.rcompareIdentifiers = rcompareIdentifiers;
    function rcompareIdentifiers(a, b) {
      return compareIdentifiers(b, a);
    }
    exports.major = major;
    function major(a, loose) {
      return new SemVer(a, loose).major;
    }
    exports.minor = minor;
    function minor(a, loose) {
      return new SemVer(a, loose).minor;
    }
    exports.patch = patch;
    function patch(a, loose) {
      return new SemVer(a, loose).patch;
    }
    exports.compare = compare;
    function compare(a, b, loose) {
      return new SemVer(a, loose).compare(new SemVer(b, loose));
    }
    exports.compareLoose = compareLoose;
    function compareLoose(a, b) {
      return compare(a, b, true);
    }
    exports.rcompare = rcompare;
    function rcompare(a, b, loose) {
      return compare(b, a, loose);
    }
    exports.sort = sort;
    function sort(list, loose) {
      return list.sort(function(a, b) {
        return exports.compare(a, b, loose);
      });
    }
    exports.rsort = rsort;
    function rsort(list, loose) {
      return list.sort(function(a, b) {
        return exports.rcompare(a, b, loose);
      });
    }
    exports.gt = gt;
    function gt(a, b, loose) {
      return compare(a, b, loose) > 0;
    }
    exports.lt = lt;
    function lt(a, b, loose) {
      return compare(a, b, loose) < 0;
    }
    exports.eq = eq;
    function eq(a, b, loose) {
      return compare(a, b, loose) === 0;
    }
    exports.neq = neq;
    function neq(a, b, loose) {
      return compare(a, b, loose) !== 0;
    }
    exports.gte = gte;
    function gte(a, b, loose) {
      return compare(a, b, loose) >= 0;
    }
    exports.lte = lte;
    function lte(a, b, loose) {
      return compare(a, b, loose) <= 0;
    }
    exports.cmp = cmp;
    function cmp(a, op, b, loose) {
      var ret;
      switch (op) {
        case "===":
          if (typeof a === "object") a = a.version;
          if (typeof b === "object") b = b.version;
          ret = a === b;
          break;
        case "!==":
          if (typeof a === "object") a = a.version;
          if (typeof b === "object") b = b.version;
          ret = a !== b;
          break;
        case "":
        case "=":
        case "==":
          ret = eq(a, b, loose);
          break;
        case "!=":
          ret = neq(a, b, loose);
          break;
        case ">":
          ret = gt(a, b, loose);
          break;
        case ">=":
          ret = gte(a, b, loose);
          break;
        case "<":
          ret = lt(a, b, loose);
          break;
        case "<=":
          ret = lte(a, b, loose);
          break;
        default:
          throw new TypeError("Invalid operator: " + op);
      }
      return ret;
    }
    exports.Comparator = Comparator;
    function Comparator(comp, loose) {
      if (comp instanceof Comparator) {
        if (comp.loose === loose)
          return comp;
        else
          comp = comp.value;
      }
      if (!(this instanceof Comparator))
        return new Comparator(comp, loose);
      debug("comparator", comp, loose);
      this.loose = loose;
      this.parse(comp);
      if (this.semver === ANY)
        this.value = "";
      else
        this.value = this.operator + this.semver.version;
      debug("comp", this);
    }
    var ANY = {};
    Comparator.prototype.parse = function(comp) {
      var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var m = comp.match(r);
      if (!m)
        throw new TypeError("Invalid comparator: " + comp);
      this.operator = m[1];
      if (this.operator === "=")
        this.operator = "";
      if (!m[2])
        this.semver = ANY;
      else
        this.semver = new SemVer(m[2], this.loose);
    };
    Comparator.prototype.toString = function() {
      return this.value;
    };
    Comparator.prototype.test = function(version) {
      debug("Comparator.test", version, this.loose);
      if (this.semver === ANY)
        return true;
      if (typeof version === "string")
        version = new SemVer(version, this.loose);
      return cmp(version, this.operator, this.semver, this.loose);
    };
    Comparator.prototype.intersects = function(comp, loose) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError("a Comparator is required");
      }
      var rangeTmp;
      if (this.operator === "") {
        rangeTmp = new Range(comp.value, loose);
        return satisfies(this.value, rangeTmp, loose);
      } else if (comp.operator === "") {
        rangeTmp = new Range(this.value, loose);
        return satisfies(comp.semver, rangeTmp, loose);
      }
      var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
      var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
      var sameSemVer = this.semver.version === comp.semver.version;
      var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
      var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, loose) && ((this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"));
      var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, loose) && ((this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">"));
      return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    };
    exports.Range = Range;
    function Range(range, loose) {
      if (range instanceof Range) {
        if (range.loose === loose) {
          return range;
        } else {
          return new Range(range.raw, loose);
        }
      }
      if (range instanceof Comparator) {
        return new Range(range.value, loose);
      }
      if (!(this instanceof Range))
        return new Range(range, loose);
      this.loose = loose;
      this.raw = range;
      this.set = range.split(/\s*\|\|\s*/).map(function(range2) {
        return this.parseRange(range2.trim());
      }, this).filter(function(c) {
        return c.length;
      });
      if (!this.set.length) {
        throw new TypeError("Invalid SemVer Range: " + range);
      }
      this.format();
    }
    Range.prototype.format = function() {
      this.range = this.set.map(function(comps) {
        return comps.join(" ").trim();
      }).join("||").trim();
      return this.range;
    };
    Range.prototype.toString = function() {
      return this.range;
    };
    Range.prototype.parseRange = function(range) {
      var loose = this.loose;
      range = range.trim();
      debug("range", range, loose);
      var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
      range = range.replace(hr, hyphenReplace);
      debug("hyphen replace", range);
      range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
      debug("comparator trim", range, re[COMPARATORTRIM]);
      range = range.replace(re[TILDETRIM], tildeTrimReplace);
      range = range.replace(re[CARETTRIM], caretTrimReplace);
      range = range.split(/\s+/).join(" ");
      var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var set = range.split(" ").map(function(comp) {
        return parseComparator(comp, loose);
      }).join(" ").split(/\s+/);
      if (this.loose) {
        set = set.filter(function(comp) {
          return !!comp.match(compRe);
        });
      }
      set = set.map(function(comp) {
        return new Comparator(comp, loose);
      });
      return set;
    };
    Range.prototype.intersects = function(range, loose) {
      if (!(range instanceof Range)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some(function(thisComparators) {
        return thisComparators.every(function(thisComparator) {
          return range.set.some(function(rangeComparators) {
            return rangeComparators.every(function(rangeComparator) {
              return thisComparator.intersects(rangeComparator, loose);
            });
          });
        });
      });
    };
    exports.toComparators = toComparators;
    function toComparators(range, loose) {
      return new Range(range, loose).set.map(function(comp) {
        return comp.map(function(c) {
          return c.value;
        }).join(" ").trim().split(" ");
      });
    }
    function parseComparator(comp, loose) {
      debug("comp", comp);
      comp = replaceCarets(comp, loose);
      debug("caret", comp);
      comp = replaceTildes(comp, loose);
      debug("tildes", comp);
      comp = replaceXRanges(comp, loose);
      debug("xrange", comp);
      comp = replaceStars(comp, loose);
      debug("stars", comp);
      return comp;
    }
    function isX(id) {
      return !id || id.toLowerCase() === "x" || id === "*";
    }
    function replaceTildes(comp, loose) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceTilde(comp2, loose);
      }).join(" ");
    }
    function replaceTilde(comp, loose) {
      var r = loose ? re[TILDELOOSE] : re[TILDE];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug("tilde", comp, _, M, m, p, pr);
        var ret;
        if (isX(M))
          ret = "";
        else if (isX(m))
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        else if (isX(p))
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        else if (pr) {
          debug("replaceTilde pr", pr);
          if (pr.charAt(0) !== "-")
            pr = "-" + pr;
          ret = ">=" + M + "." + m + "." + p + pr + " <" + M + "." + (+m + 1) + ".0";
        } else
          ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
        debug("tilde return", ret);
        return ret;
      });
    }
    function replaceCarets(comp, loose) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceCaret(comp2, loose);
      }).join(" ");
    }
    function replaceCaret(comp, loose) {
      debug("caret", comp, loose);
      var r = loose ? re[CARETLOOSE] : re[CARET];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug("caret", comp, _, M, m, p, pr);
        var ret;
        if (isX(M))
          ret = "";
        else if (isX(m))
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        else if (isX(p)) {
          if (M === "0")
            ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
          else
            ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (pr.charAt(0) !== "-")
            pr = "-" + pr;
          if (M === "0") {
            if (m === "0")
              ret = ">=" + M + "." + m + "." + p + pr + " <" + M + "." + m + "." + (+p + 1);
            else
              ret = ">=" + M + "." + m + "." + p + pr + " <" + M + "." + (+m + 1) + ".0";
          } else
            ret = ">=" + M + "." + m + "." + p + pr + " <" + (+M + 1) + ".0.0";
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0")
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
            else
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
          } else
            ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
        }
        debug("caret return", ret);
        return ret;
      });
    }
    function replaceXRanges(comp, loose) {
      debug("replaceXRanges", comp, loose);
      return comp.split(/\s+/).map(function(comp2) {
        return replaceXRange(comp2, loose);
      }).join(" ");
    }
    function replaceXRange(comp, loose) {
      comp = comp.trim();
      var r = loose ? re[XRANGELOOSE] : re[XRANGE];
      return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;
        if (gtlt === "=" && anyX)
          gtlt = "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm)
            m = 0;
          if (xp)
            p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else if (xp) {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm)
              M = +M + 1;
            else
              m = +m + 1;
          }
          ret = gtlt + M + "." + m + "." + p;
        } else if (xm) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (xp) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        }
        debug("xRange return", ret);
        return ret;
      });
    }
    function replaceStars(comp, loose) {
      debug("replaceStars", comp, loose);
      return comp.trim().replace(re[STAR], "");
    }
    function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
      if (isX(fM))
        from = "";
      else if (isX(fm))
        from = ">=" + fM + ".0.0";
      else if (isX(fp))
        from = ">=" + fM + "." + fm + ".0";
      else
        from = ">=" + from;
      if (isX(tM))
        to = "";
      else if (isX(tm))
        to = "<" + (+tM + 1) + ".0.0";
      else if (isX(tp))
        to = "<" + tM + "." + (+tm + 1) + ".0";
      else if (tpr)
        to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
      else
        to = "<=" + to;
      return (from + " " + to).trim();
    }
    Range.prototype.test = function(version) {
      if (!version)
        return false;
      if (typeof version === "string")
        version = new SemVer(version, this.loose);
      for (var i2 = 0; i2 < this.set.length; i2++) {
        if (testSet(this.set[i2], version))
          return true;
      }
      return false;
    };
    function testSet(set, version) {
      for (var i2 = 0; i2 < set.length; i2++) {
        if (!set[i2].test(version))
          return false;
      }
      if (version.prerelease.length) {
        for (var i2 = 0; i2 < set.length; i2++) {
          debug(set[i2].semver);
          if (set[i2].semver === ANY)
            continue;
          if (set[i2].semver.prerelease.length > 0) {
            var allowed = set[i2].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch)
              return true;
          }
        }
        return false;
      }
      return true;
    }
    exports.satisfies = satisfies;
    function satisfies(version, range, loose) {
      try {
        range = new Range(range, loose);
      } catch (er) {
        return false;
      }
      return range.test(version);
    }
    exports.maxSatisfying = maxSatisfying;
    function maxSatisfying(versions, range, loose) {
      var max = null;
      var maxSV = null;
      try {
        var rangeObj = new Range(range, loose);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, loose);
          }
        }
      });
      return max;
    }
    exports.minSatisfying = minSatisfying;
    function minSatisfying(versions, range, loose) {
      var min = null;
      var minSV = null;
      try {
        var rangeObj = new Range(range, loose);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, loose);
          }
        }
      });
      return min;
    }
    exports.validRange = validRange;
    function validRange(range, loose) {
      try {
        return new Range(range, loose).range || "*";
      } catch (er) {
        return null;
      }
    }
    exports.ltr = ltr;
    function ltr(version, range, loose) {
      return outside(version, range, "<", loose);
    }
    exports.gtr = gtr;
    function gtr(version, range, loose) {
      return outside(version, range, ">", loose);
    }
    exports.outside = outside;
    function outside(version, range, hilo, loose) {
      version = new SemVer(version, loose);
      range = new Range(range, loose);
      var gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, loose)) {
        return false;
      }
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        var high = null;
        var low = null;
        comparators.forEach(function(comparator) {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, loose)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, loose)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    }
    exports.prerelease = prerelease;
    function prerelease(version, loose) {
      var parsed = parse(version, loose);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    }
    exports.intersects = intersects;
    function intersects(r1, r2, loose) {
      r1 = new Range(r1, loose);
      r2 = new Range(r2, loose);
      return r1.intersects(r2);
    }
  }
});

// node_modules/dns-js/node_modules/debug/src/debug.js
var require_debug2 = __commonJS({
  "node_modules/dns-js/node_modules/debug/src/debug.js"(exports, module) {
    exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = require_ms();
    exports.names = [];
    exports.skips = [];
    exports.formatters = {};
    var prevTime;
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports.colors[Math.abs(hash) % exports.colors.length];
    }
    function createDebug(namespace) {
      function debug() {
        if (!debug.enabled) return;
        var self = debug;
        var curr = +/* @__PURE__ */ new Date();
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        args[0] = exports.coerce(args[0]);
        if ("string" !== typeof args[0]) {
          args.unshift("%O");
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%") return match;
          index++;
          var formatter = exports.formatters[format];
          if ("function" === typeof formatter) {
            var val = args[index];
            match = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        exports.formatArgs.call(self, args);
        var logFn = debug.log || exports.log || console.log.bind(console);
        logFn.apply(self, args);
      }
      debug.namespace = namespace;
      debug.enabled = exports.enabled(namespace);
      debug.useColors = exports.useColors();
      debug.color = selectColor(namespace);
      if ("function" === typeof exports.init) {
        exports.init(debug);
      }
      return debug;
    }
    function enable(namespaces) {
      exports.save(namespaces);
      exports.names = [];
      exports.skips = [];
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (var i = 0; i < len; i++) {
        if (!split[i]) continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
    }
    function disable() {
      exports.enable("");
    }
    function enabled(name) {
      var i, len;
      for (i = 0, len = exports.skips.length; i < len; i++) {
        if (exports.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports.names.length; i < len; i++) {
        if (exports.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  }
});

// node_modules/dns-js/node_modules/debug/src/browser.js
var require_browser2 = __commonJS({
  "node_modules/dns-js/node_modules/debug/src/browser.js"(exports, module) {
    exports = module.exports = require_debug2();
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports.colors = [
      "lightseagreen",
      "forestgreen",
      "goldenrod",
      "dodgerblue",
      "darkorchid",
      "crimson"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args) {
      var useColors2 = this.useColors;
      args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
      if (!useColors2) return;
      var c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match) return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports.storage.removeItem("debug");
        } else {
          exports.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    exports.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  }
});

// node_modules/dns-js/node_modules/debug/src/node.js
var require_node2 = __commonJS({
  "node_modules/dns-js/node_modules/debug/src/node.js"(exports, module) {
    var tty = __require("tty");
    var util = __require("util");
    exports = module.exports = require_debug2();
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.colors = [6, 2, 3, 4, 5, 1];
    exports.inspectOpts = Object.keys(process.env).filter(function(key) {
      return /^debug_/i.test(key);
    }).reduce(function(obj, key) {
      var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
        return k.toUpperCase();
      });
      var val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
      else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
      else if (val === "null") val = null;
      else val = Number(val);
      obj[prop] = val;
      return obj;
    }, {});
    var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
    if (1 !== fd && 2 !== fd) {
      util.deprecate(function() {
      }, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
    }
    var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(fd);
    }
    exports.formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
        return str.trim();
      }).join(" ");
    };
    exports.formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
    function formatArgs(args) {
      var name = this.namespace;
      var useColors2 = this.useColors;
      if (useColors2) {
        var c = this.color;
        var prefix = "  \x1B[3" + c + ";1m" + name + " \x1B[0m";
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push("\x1B[3" + c + "m+" + exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = (/* @__PURE__ */ new Date()).toUTCString() + " " + name + " " + args[0];
      }
    }
    function log() {
      return stream.write(util.format.apply(util, arguments) + "\n");
    }
    function save(namespaces) {
      if (null == namespaces) {
        delete process.env.DEBUG;
      } else {
        process.env.DEBUG = namespaces;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function createWritableStdioStream(fd2) {
      var stream2;
      var tty_wrap = process.binding("tty_wrap");
      switch (tty_wrap.guessHandleType(fd2)) {
        case "TTY":
          stream2 = new tty.WriteStream(fd2);
          stream2._type = "tty";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        case "FILE":
          var fs = __require("fs");
          stream2 = new fs.SyncWriteStream(fd2, { autoClose: false });
          stream2._type = "fs";
          break;
        case "PIPE":
        case "TCP":
          var net = __require("net");
          stream2 = new net.Socket({
            fd: fd2,
            readable: false,
            writable: true
          });
          stream2.readable = false;
          stream2.read = null;
          stream2._type = "pipe";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        default:
          throw new Error("Implement me. Unknown stream file type!");
      }
      stream2.fd = fd2;
      stream2._isStdio = true;
      return stream2;
    }
    function init(debug) {
      debug.inspectOpts = {};
      var keys = Object.keys(exports.inspectOpts);
      for (var i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    exports.enable(load());
  }
});

// node_modules/dns-js/node_modules/debug/src/index.js
var require_src2 = __commonJS({
  "node_modules/dns-js/node_modules/debug/src/index.js"(exports, module) {
    if (typeof process !== "undefined" && process.type === "renderer") {
      module.exports = require_browser2();
    } else {
      module.exports = require_node2();
    }
  }
});

// node_modules/qap/lib/qap.js
var require_qap = __commonJS({
  "node_modules/qap/lib/qap.js"(exports) {
    exports.Qap = function() {
      var isArray = Array.isArray, isBuffer = Buffer.isBuffer, lookupTable = function(p) {
        var m = p.length, t = m > 255 ? [] : new Buffer(256), i = 255, j = 0;
        for (; i >= 0; t[i] = 0, i--) ;
        for (; m > 0; t[p[j++]] = m--) ;
        return t;
      }, convert = function(data) {
        if (!isBuffer(data)) {
          if (typeof data === "string") return new Buffer(data);
          else throw new TypeError("the argument type should be Buffer or String");
        }
        return data;
      }, set = function(pattern) {
        var me = this;
        me.p = convert(pattern);
        me.plkb = lookupTable(me.p);
        return me.p;
      }, Qap = function(pattern) {
        var me = this, is = me instanceof Qap;
        if (!is) return new Qap(pattern);
        set.call(me, pattern);
      }, qproto = Qap.prototype;
      qproto.set = set;
      qproto.parse = function(data, start, rlimit, array) {
        var me = this, d = convert(data), plkb = me.plkb, p = me.p, m = p.length, n = d.length, ixs = isArray(array) ? array : [], j = start || 0, ok = 1, z = 0, x = p[0], pos = 0 + j, y = d[pos], i = m + j, c = d[i], offset = n - m, l = rlimit || Infinity;
        for (; j <= offset; i = j + m, c = d[i], z = 0, ok = 1, pos = j, x = p[0], y = d[pos]) {
          for (; z < m; z++, pos++, x = p[z], y = d[pos]) {
            if (x === y) continue;
            else {
              ok = 0;
              break;
            }
          }
          if (ok && ixs.push(j) >= l) break;
          j += plkb[c] || m + 1;
        }
        return ixs;
      };
      return Qap;
    }();
  }
});

// node_modules/qap/index.js
var require_qap2 = __commonJS({
  "node_modules/qap/index.js"(exports, module) {
    module.exports = require_qap().Qap;
  }
});

// node_modules/dns-js/lib/bufferconsumer.js
var require_bufferconsumer = __commonJS({
  "node_modules/dns-js/lib/bufferconsumer.js"(exports, module) {
    var debug = require_src2()("mdns-packet:lib:dns:bufferconsumer");
    var util = __require("util");
    var LABEL_POINTER = 192;
    var BufferConsumer = module.exports = function BufferConsumer2(arg) {
      if (!(arg instanceof Buffer)) {
        debug("arg", arg);
        throw new Error("Expected instance of Buffer");
      }
      this.buffer = arg;
      this.length = this.buffer.length;
      debug("new consumer of %d bytes", this.length);
      this._offset = 0;
    };
    BufferConsumer.prototype.tell = function() {
      return this._offset;
    };
    BufferConsumer.prototype.seek = function(pos) {
      debug("seek(%d)", pos);
      if (pos < 0) {
        throw new Error("Negative pos not allowed");
      }
      if (pos > this.length) {
        debug("bad packet", this.buffer.toString("hex"));
        throw new Error(util.format(
          "Cannot seek after EOF. %d > %d",
          pos,
          this.length
        ));
      }
      this._offset = pos;
      return this;
    };
    BufferConsumer.prototype.slice = function(length) {
      var v;
      if (typeof length === "undefined") {
        v = this.buffer.slice(this._offset);
        this._offset = this.length - 1;
        return v;
      } else {
        if (this._offset + length > this.length) {
          debug("Buffer owerflow. Slice beyond buffer.", {
            offset: this._offset,
            length,
            bufferLength: this.length
          });
          debug("so far", this);
          throw new Error("Buffer overflow");
        }
        v = this.buffer.slice(this._offset, this._offset + length);
        this._offset += length;
        return v;
      }
    };
    BufferConsumer.prototype.isEOF = function() {
      return this._offset >= this.length;
    };
    BufferConsumer.prototype.byte = function() {
      this._offset += 1;
      return this.buffer.readUInt8(this._offset - 1);
    };
    BufferConsumer.prototype.short = function() {
      debug("reading short at %d of %d", this._offset, this.length);
      this._offset += 2;
      return this.buffer.readUInt16BE(this._offset - 2);
    };
    BufferConsumer.prototype.long = function() {
      this._offset += 4;
      return this.buffer.readUInt32BE(this._offset - 4);
    };
    BufferConsumer.prototype.string = function(encoding, length) {
      var end;
      var ret;
      if (length === void 0) {
        end = this.buffer.length;
      } else {
        end = this.tell() + length;
      }
      if (!encoding) {
        encoding = "utf8";
      }
      ret = this.buffer.toString(encoding, this._offset, end);
      debug("got a %s character string:", length, ret);
      this.seek(end);
      return ret;
    };
    BufferConsumer.prototype.name = function(join, endAt) {
      debug(".name(join:%s, endAt:%s)", join, endAt);
      if (typeof join === "undefined") {
        join = true;
      }
      var parts = [];
      var ret;
      var len;
      var pos;
      var end;
      var comp = false;
      len = this.byte();
      debug("name initial len", len);
      if (len === 0) {
        parts.push("");
      }
      while (len !== 0) {
        if ((len & LABEL_POINTER) === LABEL_POINTER) {
          debug("has label");
          len -= LABEL_POINTER;
          len = len << 8;
          pos = len + this.byte();
          if (!comp) {
            end = this.tell();
          }
          this.seek(pos);
          len = this.byte();
          comp = true;
          continue;
        }
        debug("no label");
        var v = this.string("utf8", len);
        if (v.length > 0) {
          parts.push(v);
        }
        if (endAt && this.tell() >= endAt) {
          debug("leaving at", endAt);
          break;
        }
        len = this.byte();
        debug("got len", len);
      }
      if (!comp) {
        end = this.tell();
      }
      debug("ended with %d parts at %d", parts.length, end);
      this.seek(end);
      if (join) {
        ret = parts.join(".");
      } else {
        ret = parts;
      }
      debug("ret", ret);
      return ret;
    };
  }
});

// node_modules/dns-js/lib/bufferwriter.js
var require_bufferwriter = __commonJS({
  "node_modules/dns-js/lib/bufferwriter.js"(exports, module) {
    var debug = require_src2()("mdns-packet:lib:dns:bufferwriter");
    var util = __require("util");
    var Qap = require_qap2();
    var BufferConsumer = require_bufferconsumer();
    var BufferWriter = module.exports = function(size) {
      this.buf = new Buffer(size || 512);
      this.buf.fill(0);
      this.offset = 0;
    };
    BufferWriter.prototype.tell = function() {
      return this.offset;
    };
    BufferWriter.prototype.buffer = function(v) {
      if (typeof v === "undefined") {
        return this;
      }
      if (v instanceof BufferWriter) {
        v = v.dump();
      }
      if (!(v instanceof Buffer)) {
        throw new Error("VariableError: not a buffer");
      }
      if (v.length > 0) {
        v.copy(this.buf, this.offset);
        this.offset += v.length;
      }
      return this;
    };
    BufferWriter.prototype.long = function(v) {
      this.buf.writeInt32BE(v, this.offset);
      this.offset += 4;
      return this;
    };
    BufferWriter.prototype.short = function(v) {
      this.buf.writeUInt16BE(v & 65535, this.offset);
      this.offset += 2;
      return this;
    };
    BufferWriter.prototype.seek = function(pos) {
      debug("seek(%d)", pos);
      if (pos < 0) {
        throw new Error("Negative pos not allowed");
      }
      if (pos > this.buf.length) {
        debug("bad packet", this.buffer.toString("hex"));
        throw new Error(util.format(
          "Cannot seek after EOF. %d > %d",
          pos,
          this.buf.length
        ));
      }
      this.offset = pos;
      return this;
    };
    BufferWriter.prototype.byte = function(v) {
      this.buf.writeUInt8(v, this.offset);
      this.offset += 1;
      return this;
    };
    BufferWriter.prototype.slice = function(start, end) {
      return this.buf.slice(start, end);
    };
    BufferWriter.prototype.indexOf = function(text) {
      var qap = new Qap(text);
      return qap.parse(this.buf);
    };
    BufferWriter.prototype.name = function(v) {
      var self = this;
      debug("#name", v);
      var ref;
      var i;
      var j;
      var part;
      var parts = v.split(".");
      var parts2 = v.split(".");
      var consumer = new BufferConsumer(self.buf);
      var qap = new Qap("");
      var lastPart = parts.length;
      if (v.length > 0) {
        for (i = 0; i < parts.length; i++) {
          if (parts[i].length === 0) {
            lastPart = i;
            continue;
          }
          part = new Buffer(parts[i]);
          qap.set(Buffer.concat([new Buffer([part.length]), part]));
          var location = qap.parse(self.buf)[0];
          if (location) {
            var tr = consumer.seek(location).name();
            if (tr === parts2.join(".")) {
              debug("found index: %s, from %s at %d", i, tr, location);
              ref = location;
              lastPart = i;
              break;
            }
          }
          parts2.shift();
        }
      }
      var out = new BufferWriter();
      debug("lastPart", lastPart, parts);
      for (i = 0; i < lastPart; i++) {
        part = new Buffer(parts[i]);
        debug("writing part", part);
        out.byte(part.length);
        for (j = 0; j < part.length; ++j) {
          out.byte(part[j]);
        }
      }
      if (ref) {
        debug("writing a name ref to %d", ref);
        out.byte(192).byte(ref);
      } else {
        out.byte(0);
      }
      this.buffer(out);
      return this;
    };
    BufferWriter.prototype.dump = function() {
      return this.slice(0, this.tell());
    };
  }
});

// node_modules/dns-js/lib/errors.js
var require_errors = __commonJS({
  "node_modules/dns-js/lib/errors.js"(exports, module) {
    var util = __require("util");
    function MalformedPacket() {
      Error.call(this);
      this.message = util.format.apply(null, arguments);
    }
    util.inherits(MalformedPacket, Error);
    module.exports.MalformedPacket = MalformedPacket;
  }
});

// node_modules/dns-js/lib/dnsrecord.js
var require_dnsrecord = __commonJS({
  "node_modules/dns-js/lib/dnsrecord.js"(exports, module) {
    var debug = require_src2()("mdns-packet:lib:dns:dnsrecord");
    var BufferConsumer = require_bufferconsumer();
    var errors = require_errors();
    var DNSRecord = module.exports = function(name, type, cl, optTTL) {
      var self = this;
      this.name = name;
      this.type = type;
      this.class = cl;
      if (type === 0 || typeof type === "undefined") {
        throw new errors.MalformedPacket("Record.type is empty");
      }
      if (cl === 0) {
        throw new errors.MalformedPacket("Record.class is empty");
      }
      this.ttl = typeof optTTL !== "undefined" ? optTTL : DNSRecord.TTL;
      this.isQD = arguments.length === 3;
      debug("new DNSRecord", this);
      this.__defineGetter__("typeName", function() {
        return DNSRecord.TypeName[self.type];
      });
      this.__defineGetter__("className", function() {
        return DNSRecord.ClassName[self.class & 32767];
      });
      this.__defineGetter__("flag", function() {
        return (self.class & 32768) >> 15;
      });
    };
    DNSRecord.Type = {
      A: 1,
      // 1
      NS: 2,
      //2
      CNAME: 5,
      //5
      SOA: 6,
      //6
      PTR: 12,
      // 12
      MX: 15,
      //15
      TXT: 16,
      // 16
      AAAA: 28,
      // 0x16
      SRV: 33,
      // 33
      OPT: 41,
      //41 RFC6981 -needed for EDNS
      NSEC: 47,
      //47
      TLSA: 52,
      //52 RFC6698 - associate TLS server certificate.
      ANY: 255
    };
    DNSRecord.Class = {
      IN: 1,
      ANY: 255,
      FLUSH: 32768,
      IS_QM: 32768
    };
    DNSRecord.TTL = 3600;
    DNSRecord.TypeName = {};
    DNSRecord.ClassName = {};
    var typekey;
    for (typekey in DNSRecord.Type) {
      if (DNSRecord.Type.hasOwnProperty(typekey)) {
        DNSRecord.TypeName[DNSRecord.Type[typekey]] = typekey;
      }
    }
    for (typekey in DNSRecord.Class) {
      if (DNSRecord.Class.hasOwnProperty(typekey)) {
        DNSRecord.ClassName[DNSRecord.Class[typekey]] = typekey;
      }
    }
    DNSRecord.write = function(out, rec, withLength) {
      withLength = withLength || false;
      debug(
        "#write() type: %s, flag:%d class:%s, withLength:%s",
        rec.typeName,
        rec.flag,
        rec.className,
        withLength
      );
      if (rec.type === 0 || rec.class === 0) {
        throw new Error("Bad record with empty type and/or class");
      }
      out.name(rec.name).short(rec.type).short(rec.class);
      if (rec.isQD) {
        return out;
      }
      out.long(rec.ttl);
      var startPos = out.tell();
      out.short(65535);
      switch (rec.type) {
        case DNSRecord.Type.A:
          writeA(out, rec.address);
          break;
        case DNSRecord.Type.NS:
        case DNSRecord.Type.CNAME:
        case DNSRecord.Type.PTR:
          out.name(rec.data);
          break;
        case DNSRecord.Type.MX:
          break;
        case DNSRecord.Type.TXT:
          for (var key in rec.data) {
            if (rec.data.hasOwnProperty(key)) {
              out.name(key + "=" + rec.data[key]);
              out.offset--;
            }
          }
          break;
        case DNSRecord.Type.AAAA:
          break;
        case DNSRecord.Type.SRV:
          out.short(rec.priority & 65535).short(rec.weight & 65535).short(rec.port & 65535).name(rec.target);
          break;
        case DNSRecord.Type.SOA:
          out.name(rec.primary).name(rec.admin).long(rec.serial).long(rec.refresh).long(rec.retry).long(rec.expiration).long(rec.minimum);
          break;
        default:
          debug("non implemented recordtype of " + rec.type);
          throw new Error("Not implemented recordtype");
      }
      var endPos = out.tell();
      var correctSize = endPos - startPos - 2;
      debug("correct size=%s bytes", correctSize);
      out.seek(startPos).short(correctSize).seek(endPos);
      return out;
    };
    function writeA(out, ip) {
      var parts = ip.split(".");
      for (var i = 0; i < 4; i++) {
        out.byte(parts[i]);
      }
    }
    DNSRecord.parse = function(consumer) {
      if (consumer instanceof Buffer) {
        debug("making consumer out of buffer");
        consumer = new BufferConsumer(consumer);
        consumer.seek(0);
      }
      debug("#parse from %d", consumer.tell());
      var rec = new DNSRecord(
        consumer.name(),
        consumer.short(),
        // type
        consumer.short(),
        // class
        consumer.long()
        //ttlgf
      );
      debug("parsing from %d", consumer.tell());
      var dataSize = consumer.short();
      debug(
        "going for type %s. start: %d, size: %d, end: %d, length: %d",
        rec.type,
        consumer.tell(),
        dataSize,
        consumer.tell() + dataSize,
        consumer.length
      );
      switch (rec.type) {
        case DNSRecord.Type.A:
          asA(consumer, rec);
          break;
        case DNSRecord.Type.NS:
        case DNSRecord.Type.CNAME:
        case DNSRecord.Type.PTR:
          rec.data = asName(consumer);
          break;
        case DNSRecord.Type.MX:
          asMx(consumer, rec);
          break;
        case DNSRecord.Type.TXT:
          rec.data = asTxt(consumer, consumer.tell() + dataSize);
          break;
        case DNSRecord.Type.AAAA:
          asAAAA(consumer, rec);
          break;
        case DNSRecord.Type.SRV:
          asSrv(consumer, rec);
          break;
        case DNSRecord.Type.SOA:
          asSoa(consumer, rec);
          break;
        case DNSRecord.Type.OPT:
          asOpt(consumer, rec);
          break;
        case DNSRecord.Type.TLSA:
          asTLSA(consumer, rec, dataSize);
          break;
        default:
          debug("non implemented recordtype of " + rec.type);
          rec.data = new BufferConsumer(consumer.slice(dataSize));
      }
      debug("record done at %d", consumer.tell(), rec);
      return rec;
    };
    DNSRecord.parseQuestion = function(consumer) {
      if (consumer instanceof Buffer) {
        debug("making consumer out of buffer");
        consumer = new BufferConsumer(consumer);
      }
      debug("#parseQuestion from %d", consumer.tell());
      var r = new DNSRecord(
        consumer.name(),
        consumer.short(),
        // type
        consumer.short()
        // class
      );
      debug("record done at %d", consumer.tell(), r);
      return r;
    };
    function asName(consumer) {
      return consumer.name(true);
    }
    function asSrv(consumer, record) {
      debug("priority: %d", record.priority = consumer.short());
      debug("weight: %d", record.weight = consumer.short());
      debug("port: %d", record.port = consumer.short());
      record.target = consumer.name();
    }
    function asMx(consumer, record) {
      record.priority = consumer.short();
      record.exchange = asName(consumer);
    }
    function asTxt(consumer, endAt) {
      var items = consumer.name(false, endAt);
      debug("txt items", items);
      return items;
    }
    function asA(consumer, record) {
      var data = "";
      for (var i = 0; i < 3; i++) {
        data += consumer.byte() + ".";
      }
      data += consumer.byte();
      record.address = data;
    }
    function asAAAA(consumer, packet) {
      var data = "";
      for (var i = 0; i < 7; i++) {
        data += consumer.short().toString(16) + ":";
      }
      data += consumer.short().toString(16);
      packet.address = data;
    }
    function asSoa(consumer, packet) {
      packet.primary = consumer.name(true);
      packet.admin = consumer.name(true);
      packet.serial = consumer.long();
      packet.refresh = consumer.long();
      packet.retry = consumer.long();
      packet.expiration = consumer.long();
      packet.minimum = consumer.long();
    }
    function asOpt(consumer, packet) {
      var opt = {
        code: 0,
        data: [],
        rcode: 0,
        version: 0,
        do: 0,
        z: 0
      };
      if (!consumer.isEOF()) {
        opt.code = consumer.short();
        opt.data = consumer.slice(consumer.short());
      }
      opt.rcode = (packet.ttl & 4278190080) >> 24;
      opt.version = (packet.ttl & 16711680) >> 16;
      opt.do = (packet.ttl & 32768) >> 15;
      opt.z = packet.ttl & 8191;
      debug("asOpt", opt);
      packet.opt = opt;
    }
    function asTLSA(consumer, packet, dataSize) {
      packet.usage = consumer.byte();
      packet.selector = consumer.byte();
      packet.matchingtype = consumer.byte();
      packet.buff = consumer.slice(dataSize - 3);
    }
  }
});

// node_modules/dns-js/lib/dnspacket.js
var require_dnspacket = __commonJS({
  "node_modules/dns-js/lib/dnspacket.js"(exports, module) {
    var debug = require_src2()("mdns-packet:lib:dns:dnspacket");
    var BufferWriter = require_bufferwriter();
    var DataConsumer = require_bufferconsumer();
    var DNSRecord = require_dnsrecord();
    var errors = require_errors();
    var MIN_RECORD_SIZE = 5;
    var SECTION_NAMES = [
      "answer",
      "authority",
      "additional"
    ];
    var ALL_SECTION_NAMES = ["question"].concat(SECTION_NAMES);
    function parseFlags(val, packet) {
      packet.header.qr = (val & 32768) >> 15;
      packet.header.opcode = (val & 30720) >> 11;
      packet.header.aa = (val & 1024) >> 10;
      packet.header.tc = (val & 512) >> 9;
      packet.header.rd = (val & 256) >> 8;
      packet.header.ra = (val & 128) >> 7;
      packet.header.res1 = (val & 64) >> 6;
      packet.header.res2 = (val & 32) >> 5;
      packet.header.res3 = (val & 16) >> 4;
      packet.header.rcode = val & 15;
    }
    function parseHeader(consumer, packet) {
      packet.header.id = consumer.short();
      parseFlags(consumer.short(), packet);
      packet.question = new Array(consumer.short());
      packet.answer = new Array(consumer.short());
      packet.authority = new Array(consumer.short());
      packet.additional = new Array(consumer.short());
      debug("packet.header:", packet.header);
      debug(
        "question: %d, answer: %d, authority: %d, additional: %d",
        packet.question.length,
        packet.answer.length,
        packet.authority.length,
        packet.additional.length
      );
      var allcount = packet.question.length + packet.answer.length + packet.authority.length + packet.additional.length;
      if (allcount * MIN_RECORD_SIZE > consumer.length - consumer.tell()) {
        throw new errors.MalformedPacket(
          "Unexpectedly big section count: %d. Missing at least %d bytes.",
          allcount,
          allcount * MIN_RECORD_SIZE - (consumer.length - consumer.tell())
        );
      }
    }
    function writeHeader(writer, packet) {
      var header = packet.header;
      writer.short(header.id);
      var val = 0;
      val += header.qr << 15 & 32768;
      val += header.opcode << 11 & 30720;
      val += header.aa << 10 & 1024;
      val += header.tc << 9 & 512;
      val += header.rd << 8 & 256;
      val += header.ra << 7 & 128;
      val += header.res1 << 6 & 64;
      val += header.res1 << 5 & 32;
      val += header.res1 << 4 & 16;
      val += header.rcode & 15;
      writer.short(val);
    }
    var DNSPacket = module.exports = function(flags) {
      this.header = {
        id: 0,
        qr: 0,
        opcode: 0,
        aa: 0,
        tc: 0,
        rd: 1,
        ra: 0,
        res1: 0,
        res2: 0,
        res3: 0,
        rcode: 0
      };
      if (flags) {
        parseFlags(flags, this);
      }
      this.question = [];
      this.answer = [];
      this.authority = [];
      this.additional = [];
      this.edns_options = [];
      this.payload = void 0;
    };
    DNSPacket.Flag = {
      RESPONSE: 32768,
      AUTHORATIVE: 1024,
      TRUNCATED: 512,
      RECURSION: 256
    };
    DNSPacket.RCODE = {
      NoError: 0,
      FormErr: 1,
      ServFail: 2,
      NXDomain: 3
    };
    DNSPacket.parse = function(buffer) {
      var consumer = new DataConsumer(buffer);
      var packet = new DNSPacket();
      var receivedOpts = 0;
      parseHeader(consumer, packet);
      for (var qi = 0; qi < packet.question.length; qi++) {
        debug("doing qd %s", qi);
        try {
          debug("before question", consumer.tell());
          var part = DNSRecord.parseQuestion(consumer);
          packet.question[qi] = part;
        } catch (err) {
          debug("consumer", consumer);
          throw err;
        }
      }
      SECTION_NAMES.forEach(function(sectionName) {
        var section = packet[sectionName];
        debug("about to parse section %s", sectionName, section.length);
        for (var si = 0; si < section.length; si++) {
          debug("doing record %s/%s", si + 1, section.length, consumer.tell());
          var record = DNSRecord.parse(consumer);
          debug("parsed type `%d` for section %s", record.type, sectionName);
          if (record.type === DNSRecord.Type.OPT) {
            if (receivedOpts++ >= 0) {
              if (sectionName === "additional") {
                packet.edns_version = record.opt.version;
                packet.do = record.opt.do;
                packet.payload = record.class;
              }
            } else {
              debug("more than 1 opts".receivedOpts);
            }
          }
          section[si] = record;
        }
      });
      if (!consumer.isEOF()) {
        debug(
          "was not EOF on incoming packet. %d bytes in overflow",
          consumer.length - consumer.tell()
        );
        var multiple = [packet];
        multiple.push(DNSPacket.parse(consumer.slice()));
        return multiple;
      }
      debug("packet done", packet);
      return packet;
    };
    DNSPacket.prototype.each = each;
    function each(section) {
      if (ALL_SECTION_NAMES.indexOf(section) === -1) {
        throw new Error("Unkown section, " + section);
      }
      var filter = false;
      var cb;
      if (arguments.length === 2) {
        cb = arguments[1];
      } else {
        filter = arguments[1];
        cb = arguments[2];
        if (typeof filter === "undefined") {
          throw new Error("Filter given but is undefined");
        }
      }
      this[section].forEach(function(rec) {
        if (!filter || rec.type === filter) {
          cb(rec);
        }
      });
    }
    DNSPacket.toBuffer = function(packet) {
      var writer = new BufferWriter();
      var sections = ["question"].concat(SECTION_NAMES);
      writeHeader(writer, packet);
      sections.forEach(function(sectionName) {
        var section = packet[sectionName];
        debug("%d records in %s", section.length, sectionName);
        writer.short(section.length);
      });
      var e = each.bind(packet);
      sections.forEach(function(sectionName) {
        e(sectionName, function(rec) {
          DNSRecord.write(writer, rec, true);
          if (sectionName !== "question" && rec.isQD) {
            throw new Error("unexpected QD record in non QD section.");
          }
        });
      });
      return writer.slice(0, writer.tell());
    };
  }
});

// node_modules/dns-js/lib/index.js
var require_lib = __commonJS({
  "node_modules/dns-js/lib/index.js"(exports) {
    exports.DNSPacket = require_dnspacket();
    exports.DNSRecord = require_dnsrecord();
    exports.errors = require_errors();
    exports.parse = exports.DNSPacket.parse;
  }
});

// node_modules/dns-js/index.js
var require_dns_js = __commonJS({
  "node_modules/dns-js/index.js"(exports, module) {
    module.exports = require_lib();
  }
});

// node_modules/mdns-js/lib/networking.js
var require_networking = __commonJS({
  "node_modules/mdns-js/lib/networking.js"(exports, module) {
    var debug = require_src()("mdns:lib:networking");
    var debuginbound = require_src()("mdns:inbound");
    var debugoutbound = require_src()("mdns:outbound");
    var util = __require("util");
    var EventEmitter = __require("events").EventEmitter;
    var os = __require("os");
    var dgram = __require("dgram");
    var semver = require_semver();
    var dns = require_dns_js();
    var DNSPacket = dns.DNSPacket;
    var MDNS_MULTICAST = "224.0.0.251";
    var Networking = module.exports = function(options) {
      this.options = options || {};
      this.created = 0;
      this.connections = [];
      this.started = false;
      this.users = [];
      this.INADDR_ANY = typeof this.options.INADDR_ANY === "undefined" ? true : this.options.INADDR_ANY;
    };
    util.inherits(Networking, EventEmitter);
    Networking.prototype.start = function() {
      var interfaces = os.networkInterfaces();
      var ifaceFilter = this.options.networkInterface;
      var index = 0;
      for (var key in interfaces) {
        if (interfaces.hasOwnProperty(key) && (typeof ifaceFilter === "undefined" || key === ifaceFilter)) {
          for (var i = 0; i < interfaces[key].length; i++) {
            var iface = interfaces[key][i];
            if (iface.internal) {
              continue;
            }
            if (iface.address.indexOf(":") !== -1) {
              continue;
            }
            debug("interface", key, iface.address);
            this.createSocket(
              index++,
              key,
              iface.address,
              0,
              this.bindToAddress.bind(this)
            );
          }
        }
      }
      if (this.INADDR_ANY) {
        this.createSocket(
          index++,
          "pseudo multicast",
          "0.0.0.0",
          5353,
          this.bindToAddress.bind(this)
        );
      }
    };
    Networking.prototype.stop = function() {
      debug("stopping");
      this.connections.forEach(closeEach);
      this.connections = [];
      this.created = 0;
      this.started = false;
      function closeEach(connection) {
        var socket = connection.socket;
        socket.close();
        socket.unref();
      }
    };
    Networking.prototype.createSocket = function(interfaceIndex, networkInterface, address, port, next) {
      var sock;
      if (semver.gte(process.versions.node, "0.11.13")) {
        sock = dgram.createSocket({ type: "udp4", reuseAddr: true });
      } else {
        sock = dgram.createSocket("udp4");
      }
      sock.on("error", function(err) {
        next(err, interfaceIndex, networkInterface, sock);
      });
      debug("creating socket for", networkInterface);
      this.created++;
      sock.bind(port, address, function(err) {
        if (!err && port === 5353) {
          sock.addMembership(MDNS_MULTICAST);
          sock.setMulticastTTL(255);
          sock.setMulticastLoopback(true);
        }
        next(err, interfaceIndex, networkInterface, sock);
      });
    };
    Networking.prototype.bindToAddress = function(err, interfaceIndex, networkInterface, sock) {
      if (err) {
        debug("there was an error binding %s", err);
        return;
      }
      debug("bindToAddress", networkInterface);
      var info = sock.address();
      var connection = {
        socket: sock,
        interfaceIndex,
        networkInterface,
        counters: {
          sent: 0,
          received: 0
        }
      };
      this.connections.push(connection);
      var self = this;
      sock.on("message", function(message, remote) {
        var packets;
        connection.counters.received++;
        debuginbound("incoming message", message.toString("hex"));
        try {
          packets = dns.DNSPacket.parse(message);
          if (!(packets instanceof Array)) {
            packets = [packets];
          }
        } catch (er) {
          debug("packet parsing error", er);
          return;
        }
        self.emit("packets", packets, remote, connection);
      });
      sock.on("error", self.onError.bind(self));
      sock.on("close", function() {
        debug("socket closed", info);
      });
      if (this.created === this.connections.length) {
        this.emit("ready", this.connections.length);
      }
    };
    Networking.prototype.onError = function(err) {
      this.emit("error", err);
    };
    Networking.prototype.send = function(packet, next) {
      var buf = DNSPacket.toBuffer(packet);
      const netwk = this;
      this.connections.forEach(onEach);
      onSent();
      debug("created buffer with length", buf.length);
      debugoutbound("message", buf.toString("hex"));
      function onEach(connection) {
        var sock = connection.socket;
        if (sock.address().address === "0.0.0.0" && !netwk.INADDR_ANY) {
          debug("skip send on pseudo interface.");
          onSent();
        } else {
          debug("sending to", sock.address());
          sock.send(buf, 0, buf.length, 5353, "224.0.0.251", function(err, bytes) {
            connection.counters.sent++;
            debug(
              "%s sent %d bytes with err:%s",
              sock.address().address,
              bytes,
              err
            );
            onSent();
          });
        }
      }
      var sent = -1;
      function onSent() {
        if (next !== void 0) {
          sent++;
          if (this.connections === void 0 || sent === this.connections.length) {
            next();
          }
        }
      }
    };
    Networking.prototype.startRequest = function(callback) {
      if (this.started) {
        return process.nextTick(callback());
      }
      this.start();
      this.once("ready", function() {
        if (typeof callback === "function") {
          callback();
        }
      });
    };
    Networking.prototype.stopRequest = function() {
      if (this.users.length === 0) {
        this.stop();
      }
    };
    Networking.prototype.addUsage = function(browser, next) {
      this.users.push(browser);
      this.startRequest(next);
    };
    Networking.prototype.removeUsage = function(browser) {
      var index = this.users.indexOf(browser);
      if (index > -1) {
        this.users.splice(index, 1);
      }
      this.connections.forEach(function(c) {
        if (c.services && c.services[browser.serviceType.toString()]) {
          delete c.services[browser.serviceType.toString()];
        }
      });
      this.stopRequest();
    };
  }
});

// node_modules/mdns-js/lib/decoder.js
var require_decoder = __commonJS({
  "node_modules/mdns-js/lib/decoder.js"(exports, module) {
    var debug = require_src()("mdns:lib:decoder");
    var ServiceType = require_service_type().ServiceType;
    var dns = require_dns_js();
    var Record = dns.DNSRecord;
    var decodeSection = module.exports.decodeSection = function(packet, sectionName, obj) {
      if (!packet.hasOwnProperty(sectionName)) {
        debug("error in packet", packet);
        throw new Error("Section missing from packet:" + sectionName);
      }
      debug("%s has %d records", sectionName, packet[sectionName].length);
      if (typeof obj === "undefined") {
        throw new Error("Argument obj is missing");
      }
      var records = packet[sectionName].length;
      var processed = 0;
      if (packet[sectionName].length === 0) {
        return false;
      }
      packet.each(sectionName, function(rec) {
        processed++;
        switch (rec.type) {
          case Record.Type.A:
            obj.host = rec.name;
            break;
          case Record.Type.PTR:
            obj.type = obj.type || [];
            if (packet.header.qr === 1 && rec.name.indexOf("_service") === 0) {
              if (rec.data) {
                obj.type.push(new ServiceType(rec.data.replace(".local", "")));
              } else {
                processed--;
              }
            } else if (rec.name.indexOf("_") === 0) {
              obj.type.push(new ServiceType(rec.name.replace(".local", "")));
            } else {
              debug("strange PTR record in %s", sectionName, rec);
            }
            break;
          case Record.Type.TXT:
            if (!obj.txt) {
              obj.txt = [];
            }
            debug("txt", rec);
            obj.txt = obj.txt.concat(rec.data);
            break;
          case Record.Type.SRV:
            obj.port = rec.port;
            obj.fullname = rec.name;
            break;
          case Record.Type.NSEC:
            processed--;
            break;
          default:
            processed--;
            debug("section: %s type: %s", sectionName, rec.type, rec);
        }
      });
      return records > 0 && processed > 0;
    };
    module.exports.decodeMessage = function(message) {
      var packets;
      try {
        packets = dns.DNSPacket.parse(message);
      } catch (err) {
        debug("packet parsing error", err);
        return;
      }
      if (!(packets instanceof Array)) {
        packets = [packets];
      }
      return decodePackets(packets);
    };
    var decodePackets = module.exports.decodePackets = function(packets) {
      var queryOnly = false;
      var data = {
        addresses: []
      };
      var query = [];
      data.query = query;
      debug("decodePackets");
      packets.forEach(function(packet) {
        debug(
          packet.answer.length,
          packet.authority.length,
          packet.additional.length
        );
        if (queryOnly || packet.answer.length === 0 && packet.authority.length === 0 && packet.additional.length === 0) {
          data = null;
          queryOnly = true;
          debug("skip", data);
          return;
        }
        decodeSection(packet, "answer", data);
        decodeSection(packet, "authority", data);
        decodeSection(packet, "additional", data);
        packet.question.forEach(function(rec) {
          if (rec.type === dns.DNSRecord.Type.PTR) {
            query.push(rec.name);
          }
        });
      });
      return data;
    };
  }
});

// node_modules/mdns-js/lib/browser.js
var require_browser3 = __commonJS({
  "node_modules/mdns-js/lib/browser.js"(exports, module) {
    var debug = require_src()("mdns:browser");
    var util = __require("util");
    var { EventEmitter } = __require("events");
    var { DNSPacket, DNSRecord } = require_dns_js();
    var { ServiceType } = require_service_type();
    var decoder = require_decoder();
    var Browser = class extends EventEmitter {
      constructor(networking, serviceType) {
        super();
        const notString = typeof serviceType !== "string";
        const notType = !(serviceType instanceof ServiceType);
        if (notString && notType) {
          debug("serviceType type:", typeof serviceType);
          debug("serviceType is ServiceType:", serviceType instanceof ServiceType);
          debug("serviceType=", serviceType);
          throw new Error("argument must be instance of ServiceType or valid string");
        }
        this.serviceType = serviceType;
        this.networking = networking;
        this.connections = {};
        networking.addUsage(this, () => {
          this.emit("ready");
        });
        this.onMessageListener = this.onMessage.bind(this);
        networking.on("packets", this.onMessageListener);
      }
      /**
      * Handles incoming UDP traffic.
      * @private
      */
      onMessage(packets, remote, connection) {
        debug("got packets from remote", remote);
        const data = decoder.decodePackets(packets);
        if (!data) {
          return;
        }
        let isNew = false;
        const iface = connection.networkInterface;
        this.connections[iface] = this.connections[iface] || {
          services: {},
          addresses: {}
        };
        const { services, addresses } = this.connections[iface];
        function setNew(...args) {
          isNew = true;
          debug("new on %s, because %s", iface, util.format(...args));
        }
        function updateValue(src, dst, name) {
          if (JSON.stringify(dst[name]) !== JSON.stringify(src)) {
            setNew("updated host.%s", name);
            dst[name] = src;
          }
        }
        function addValue(src, dst, name) {
          if (typeof dst[name] === "undefined") {
            setNew("added host.%s", name);
            dst[name] = src;
          }
        }
        if (data) {
          data.interfaceIndex = connection.interfaceIndex;
          data.networkInterface = connection.networkInterface;
          data.addresses.push(remote.address);
          if (typeof data.type !== "undefined") {
            data.type.forEach(function(type) {
              let serviceKey = type.toString();
              if (!services.hasOwnProperty(serviceKey)) {
                setNew("new service - %s", serviceKey);
                services[serviceKey] = {
                  type,
                  addresses: []
                };
              }
              const service = services[serviceKey];
              data.addresses.forEach(function(adr) {
                if (service.addresses.indexOf(adr) === -1) {
                  service.addresses.push(adr);
                  setNew("new address");
                }
                let host;
                if (addresses.hasOwnProperty(adr)) {
                  host = addresses[adr];
                } else {
                  host = addresses[adr] = { address: adr };
                  setNew("new host");
                }
                addValue({}, host, serviceKey);
                updateValue(data.port, host[serviceKey], "port");
                updateValue(data.host, host[serviceKey], "host");
                updateValue(data.txt, host[serviceKey], "txt");
              });
            });
          }
          debug("isNew", isNew);
          if (isNew && data) {
            this.emit("update", data);
          }
        }
      }
      stop() {
        this.networking.removeUsage(this);
        this.networking.removeListener("packets", this.onMessageListener);
        this.connections = {};
      }
      discover() {
        const packet = new DNSPacket();
        packet.question.push(
          new DNSRecord(
            this.serviceType.toString() + ".local",
            DNSRecord.Type.PTR,
            1
          )
        );
        this.networking.send(packet);
      }
    };
    module.exports = Browser;
  }
});

// node_modules/mdns-js/lib/packetfactory.js
var require_packetfactory = __commonJS({
  "node_modules/mdns-js/lib/packetfactory.js"(exports, module) {
    var debug = require_src()("mdns:packetfactory");
    var os = __require("os");
    var dns = require_dns_js();
    var DNSPacket = dns.DNSPacket;
    var DNSRecord = dns.DNSRecord;
    module.exports.buildQDPacket = function() {
      var packet = new DNSPacket();
      if (typeof this.nameSuffix !== "string") {
        throw new Error("nameSuffix is missing");
      }
      var name = this.options.name + this.nameSuffix;
      var domain = this.options.domain || "local";
      var serviceType = this.serviceType.toString() + "." + domain;
      this.alias = name + "." + serviceType;
      packet.question.push(new DNSRecord(this.alias, DNSRecord.Type.ANY, 1));
      return packet;
    };
    module.exports.buildANPacket = function(ttl) {
      if (typeof this.nameSuffix !== "string") {
        throw new Error("nameSuffix is missing");
      }
      if (typeof this.port !== "number" && this.port < 1) {
        throw new Error("port is missing or bad value");
      }
      var packet = new DNSPacket(DNSPacket.Flag.RESPONSE | DNSPacket.Flag.AUTHORATIVE);
      var name = this.options.name + this.nameSuffix;
      var domain = this.options.domain || "local";
      var target = (this.options.host || name) + "." + domain;
      var serviceType = this.serviceType.toString() + "." + domain;
      var cl = DNSRecord.Class.IN | DNSRecord.Class.FLUSH;
      debug("alias:", this.alias);
      packet.answer.push({
        name: this.alias,
        type: DNSRecord.Type.SRV,
        class: cl,
        ttl,
        priority: 0,
        weight: 0,
        port: this.port,
        target
      });
      if ("txt" in this.options) {
        packet.answer.push({
          name: this.alias,
          type: DNSRecord.Type.TXT,
          class: cl,
          ttl,
          data: this.options.txt
        });
      }
      packet.answer.push({
        name: serviceType,
        type: DNSRecord.Type.PTR,
        class: cl,
        ttl,
        data: this.alias
      });
      packet.answer.push({
        name: "_services._dns-sd._udp." + domain,
        type: DNSRecord.Type.PTR,
        class: cl,
        ttl,
        data: serviceType
      });
      var interfaces = os.networkInterfaces();
      var ifaceFilter = this.options.networkInterface;
      var address;
      var i;
      for (var key in interfaces) {
        if (typeof ifaceFilter === "undefined" || key === ifaceFilter) {
          for (i = 0; i < interfaces[key].length; i++) {
            var iface = interfaces[key][i];
            if (iface.internal) {
              continue;
            }
            if (iface.address.indexOf(":") === -1) {
              debug("add A record for iface: %s %s", key, iface.address);
              packet.additional.push({
                name: target,
                type: DNSRecord.Type.A,
                class: cl,
                ttl,
                address: iface.address
              });
            } else {
            }
          }
        }
      }
      if (this.options.additionalAddresses) {
        for (i = 0; i < interfaces[key].length; i++) {
          address = this.options.additionalAddresses[i];
          if (address.indexOf(":") === -1) {
            debug("add A record for interface: %s %s", key, address);
            packet.additional.push({
              name: target,
              type: DNSRecord.Type.A,
              class: cl,
              ttl,
              address
            });
          } else {
          }
        }
      }
      return packet;
    };
  }
});

// node_modules/mdns-js/lib/advertisement.js
var require_advertisement = __commonJS({
  "node_modules/mdns-js/lib/advertisement.js"(exports, module) {
    var debug = require_src()("mdns:advertisement");
    var dns = require_dns_js();
    var DNSRecord = dns.DNSRecord;
    var ServiceType = require_service_type().ServiceType;
    var pf = require_packetfactory();
    var internal = {};
    internal.services = [];
    internal.probes = [];
    internal.connections = [];
    internal.handleQuery = function(rec) {
      if (rec.type !== DNSRecord.Type.PTR && rec.type !== DNSRecord.Type.SRV && rec.type !== DNSRecord.Type.ANY) {
        debug("skipping query: type not PTR/SRV/ANY");
        return;
      }
      rec.class &= ~DNSRecord.Class.IS_OM;
      if (rec.class !== DNSRecord.Class.IN && rec.type !== DNSRecord.Class.ANY) {
        debug("skipping query: class not IN/ANY: %d", rec.class);
        return;
      }
      try {
        var type = new ServiceType(rec.name);
        internal.services.forEach(function(service) {
          if (type.isWildcard() || type.matches(service.serviceType)) {
            debug("answering query");
            internal.sendDNSPacket(
              pf.buildANPacket.apply(service, [DNSRecord.TTL])
            );
          } else {
            debug(
              "skipping query; type %s not * or %s",
              type,
              service.serviceType
            );
          }
        });
      } catch (err) {
      }
    };
    internal.handleAnswer = function(rec) {
      try {
        internal.probes.forEach(function(service) {
          if (service.status < 3) {
            var conflict = false;
            debug("check names: %s and %s", rec.name, service.alias);
            switch (rec.type) {
              case DNSRecord.Type.PTR:
                if (rec.asName() === service.alias) {
                  conflict = true;
                  debug("name conflict in PTR");
                }
                break;
              case DNSRecord.Type.SRV:
              case DNSRecord.Type.TXT:
                if (rec.name === service.alias) {
                  conflict = true;
                  debug("name conflict in SRV/TXT");
                }
                break;
            }
            if (conflict) {
              service.status = 4;
            }
          }
        });
      } catch (err) {
      }
    };
    internal.probeAndAdvertise = function() {
      debug("probeAndAdvertise(%s)", this.status);
      switch (this.status) {
        case 0:
        case 1:
        case 2:
          debug("probing service %d", this.status + 1);
          this.networking.send(pf.buildQDPacket.apply(this, []));
          break;
        case 3:
          debug("publishing service, suffix=%s", this.nameSuffix);
          var packet = pf.buildANPacket.apply(this, [DNSRecord.TTL]);
          internal.sendDNSPacket = this.networking.send.bind(this.networking);
          this.networking.send(packet);
          setTimeout(function onTimeout() {
            this.networking.send(packet);
          }.bind(this), 1e3);
          internal.services.push(this);
          internal.probes = internal.probes.filter(function(service) {
            return service === this;
          });
          break;
        case 4:
          if (this.nameSuffix === "") {
            this.nameSuffix = "1";
          } else {
            this.nameSuffix = parseInt(this.nameSuffix) + 1 + "";
          }
          this.status = -1;
          break;
      }
      if (this.status < 3) {
        this.status++;
        setTimeout(internal.probeAndAdvertise.bind(this), 250);
      }
    };
    var Advertisement = module.exports = function(networking, serviceType, port, options) {
      if (!(this instanceof Advertisement)) {
        return new Advertisement(serviceType, port, options);
      }
      if (!("name" in options)) {
        throw new Error("options must contain the name field.");
      }
      var self = this;
      this.serviceType = serviceType;
      this.port = port;
      this.options = options;
      this.nameSuffix = "";
      this.alias = "";
      this.status = 0;
      this.networking = networking;
      if (typeof this.options.INADDR_ANY !== "undefined") {
        this.networking.INADDR_ANY = this.options.INADDR_ANY;
      }
      networking.on("packets", function(packets) {
        packets.forEach(function(packet) {
          packet.question.forEach(internal.handleQuery.bind(self));
          packet.answer.forEach(internal.handleAnswer.bind(self));
        });
      });
      this.start = function() {
        networking.addUsage(self, function() {
          internal.probes.push(self);
          internal.probeAndAdvertise.apply(self, []);
        });
      };
      this.stop = function(next) {
        debug("unpublishing service");
        internal.services = internal.services.filter(function(service) {
          return service === self;
        });
        networking.send(pf.buildANPacket.apply(self, [0]), function() {
          networking.stop();
          if (next) {
            next();
          }
        });
        this.nameSuffix = "";
        this.alias = "";
        this.status = 0;
      };
      debug("created new service");
    };
  }
});

// node_modules/mdns-js/index.js
var require_mdns_js = __commonJS({
  "node_modules/mdns-js/index.js"(exports, module) {
    var config = require_package();
    var st = require_service_type();
    var Networking = require_networking();
    var networking = new Networking();
    module.exports.version = config.version;
    module.exports.name = config.name;
    var Browser = module.exports.Browser = require_browser3();
    var Advertisement = module.exports.Advertisement = require_advertisement();
    module.exports.createBrowser = function browserCreated(serviceType) {
      if (typeof serviceType === "undefined") {
        serviceType = st.ServiceType.wildcard;
      }
      return new Browser(networking, serviceType);
    };
    module.exports.excludeInterface = function(iface) {
      if (networking.started) {
        throw new Error("can not exclude interfaces after start");
      }
      if (iface === "0.0.0.0") {
        networking.INADDR_ANY = false;
      } else {
        var err = new Error("Not a supported interface");
        err.interface = iface;
      }
    };
    module.exports.createAdvertisement = function advertisementCreated(serviceType, port, options) {
      return new Advertisement(
        networking,
        serviceType,
        port,
        options
      );
    };
    module.exports.ServiceType = st.ServiceType;
    module.exports.makeServiceType = st.makeServiceType;
    module.exports.tcp = st.protocolHelper("tcp");
    module.exports.udp = st.protocolHelper("udp");
  }
});

// index.js
var mdns = __toESM(require_mdns_js(), 1);
var sweetpea_mdns_default = mdns;
export {
  sweetpea_mdns_default as default
};
