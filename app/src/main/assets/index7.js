/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 85727:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: function() { return /* binding */ DebugError; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97582);

var DebugError = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .ZT)(DebugError, _super);
    function DebugError(message) {
        var _this = _super.call(this, message) || this;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, _this.constructor);
        }
        else {
            _this.stack = (new Error()).stack;
        }
        _this.name = 'DebugError';
        _this.errorMessage = message;
        return _this;
    }
    DebugError.prototype.toString = function () {
        return this.errorMessage;
    };
    return DebugError;
}(Error));



/***/ }),

/***/ 33661:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: function() { return /* binding */ ObservableEntity; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97582);
/* harmony import */ var _engine_misc_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6221);
/* harmony import */ var _engine_misc_releaseableEntity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(60627);



var ObservableEntity = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .ZT)(ObservableEntity, _super);
    function ObservableEntity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onChanged = [];
        return _this;
    }
    ObservableEntity.prototype.forceTriggerChange = function () {
        for (var _i = 0, _a = this._onChanged; _i < _a.length; _i++) {
            var fn = _a[_i];
            fn();
        }
    };
    ObservableEntity.prototype.addOnChangeListener = function (f) {
        this._onChanged.push(f);
    };
    ObservableEntity.prototype.removeOnChangeListener = function (f) {
        (0,_engine_misc_object__WEBPACK_IMPORTED_MODULE_1__/* .removeFromArray */ .As)(this._onChanged, function (it) { return it === f; });
    };
    ObservableEntity.prototype.observe = function (onChangedFn) {
        this.addOnChangeListener(onChangedFn);
    };
    ObservableEntity.prototype.triggerObservable = function () {
        if (this._onChanged.length === 0)
            return;
        for (var _i = 0, _a = this._onChanged; _i < _a.length; _i++) {
            var fn = _a[_i];
            fn();
        }
    };
    return ObservableEntity;
}(_engine_misc_releaseableEntity__WEBPACK_IMPORTED_MODULE_2__/* .ReleaseableEntity */ .c));



/***/ }),

/***/ 39735:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: function() { return /* binding */ Size; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97582);
/* harmony import */ var _misc_objectPool__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(49541);
/* harmony import */ var _engine_geometry_abstract_observableEntity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(33661);
/* harmony import */ var _engine_debug_debugError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85727);
/* harmony import */ var _engine_misc_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6221);





var Size = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .ZT)(Size, _super);
    function Size(width, height, onChangedFn) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        var _this = _super.call(this) || this;
        _this._arr = new Float32Array([0, 0]);
        if (onChangedFn)
            _this.addOnChangeListener(onChangedFn);
        _this.setWH(width, height);
        return _this;
    }
    Object.defineProperty(Size.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (val) {
            if ( true && (0,_engine_misc_object__WEBPACK_IMPORTED_MODULE_1__/* .isNotNumber */ .iy)(val)) {
                console.trace();
                throw new _engine_debug_debugError__WEBPACK_IMPORTED_MODULE_2__/* .DebugError */ .N("Size.width: wrong numeric argument  ".concat(val));
            }
            var changed = this._width !== val;
            if (changed) {
                this._width = val;
                this.triggerObservable();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Size.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (val) {
            if ( true && (0,_engine_misc_object__WEBPACK_IMPORTED_MODULE_1__/* .isNotNumber */ .iy)(val)) {
                console.trace();
                throw new _engine_debug_debugError__WEBPACK_IMPORTED_MODULE_2__/* .DebugError */ .N("Size.height: wrong numeric argument  ".concat(val));
            }
            var changed = this._height !== val;
            if (changed) {
                this._height = val;
                this.triggerObservable();
            }
        },
        enumerable: false,
        configurable: true
    });
    Size.fromPool = function () {
        return this.rectPool.getFreeObject();
    };
    Size.prototype.setW = function (width) {
        this.setWH(width, this._height);
        return this;
    };
    Size.prototype.setH = function (height) {
        this.setWH(this._width, height);
        return this;
    };
    Size.prototype.setWH = function (width, height) {
        if (height === void 0) { height = width; }
        if ( true && ((0,_engine_misc_object__WEBPACK_IMPORTED_MODULE_1__/* .isNotNumber */ .iy)(width) || (0,_engine_misc_object__WEBPACK_IMPORTED_MODULE_1__/* .isNotNumber */ .iy)(width))) {
            console.trace();
            throw new _engine_debug_debugError__WEBPACK_IMPORTED_MODULE_2__/* .DebugError */ .N("Size.setWH: wrong numeric argument (".concat(width, ",").concat(height, ")"));
        }
        var changed = this._width !== width || this._height !== height;
        if (changed) {
            this._width = width;
            this._height = height;
            this._arr[0] = width;
            this._arr[1] = height;
            this.triggerObservable();
        }
        return this;
    };
    Size.prototype.addWH = function (width, height) {
        if (height === void 0) { height = width; }
        this.setWH(this.width + width, this.height + height);
        return this;
    };
    Size.prototype.setFrom = function (another) {
        this.setWH(another.width, another.height);
        return this;
    };
    Size.prototype.equalsWH = function (width, height) {
        if (height === void 0) { height = width; }
        return this._width === width && this._height === height;
    };
    Size.prototype.equals = function (another) {
        return this.equalsWH(another.width, another.height);
    };
    Size.prototype.clone = function () {
        return new Size(this.width, this.height);
    };
    Size.prototype.isZero = function () {
        return this.equalsWH(0, 0);
    };
    Size.prototype.toArray = function () {
        return this._arr;
    };
    Size.prototype.toJSON = function () {
        return {
            width: this.width,
            height: this.height
        };
    };
    Size.rectPool = new _misc_objectPool__WEBPACK_IMPORTED_MODULE_3__/* .ObjectPool */ .L(Size);
    return Size;
}(_engine_geometry_abstract_observableEntity__WEBPACK_IMPORTED_MODULE_4__/* .ObservableEntity */ .R));


/***/ }),

/***/ 6221:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   As: function() { return /* binding */ removeFromArray; },
/* harmony export */   HD: function() { return /* binding */ isString; },
/* harmony export */   cg: function() { return /* binding */ isEqualArray; },
/* harmony export */   fU: function() { return /* binding */ isTypedArray; },
/* harmony export */   hj: function() { return /* binding */ isNumber; },
/* harmony export */   iy: function() { return /* binding */ isNotNumber; },
/* harmony export */   qI: function() { return /* binding */ parametrizeString; }
/* harmony export */ });
/* unused harmony exports isCommonArray, isArray, isObject, createRange, noop */
var isString = function (s) {
    return (s === null || s === void 0 ? void 0 : s.substr) !== undefined;
};
var isCommonArray = function (a) {
    return a.push !== undefined;
};
var isTypedArray = function (a) {
    return !!(a.buffer);
};
var isArray = function (a) {
    return isCommonArray(a) || isTypedArray(a);
};
var isObject = function (a) {
    return a !== null && !Array.isArray(a) && typeof a === 'object';
};
var isNumber = function (value) {
    if (value === null || value === undefined)
        return false;
    if (value.toFixed === undefined)
        return false;
    if (Number.isNaN(value))
        return false;
    if (value === Infinity)
        return false;
    return value !== -Infinity;
};
var isNotNumber = function (value) {
    return !isNumber(value);
};
var isEqualArray = function (a, b) {
    for (var i = 0, max = a.length; i < max; ++i) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
};
var removeFromArray = function (arr, predicate) {
    var i = arr.length;
    var cnt = 0;
    while (i--) {
        if (predicate(arr[i])) {
            arr.splice(i, 1);
            cnt++;
        }
    }
    return cnt;
};
var parametrizeString = function (source, args) {
    Object.keys(args).forEach(function (key) {
        source = source.split(key).join('' + args[key]);
    });
    return source;
};
var createRange = function (_a) {
    var from = _a.from, to = _a.to;
    from !== null && from !== void 0 ? from : (from = 0);
    var l = Math.abs(to - from);
    var res = [];
    var delta = from < to ? 1 : -1;
    var cnt = from;
    for (var i = 0; i < l; i++) {
        res.push(cnt);
        cnt += delta;
    }
    return res;
};
var noop = function (arg) { };


/***/ }),

/***/ 49541:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: function() { return /* binding */ ObjectPool; }
/* harmony export */ });
/* harmony import */ var _debug_debugError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85727);

var ObjectPool = (function () {
    function ObjectPool(Class, numberOfInstances) {
        if (numberOfInstances === void 0) { numberOfInstances = 32; }
        this.Class = Class;
        this.numberOfInstances = numberOfInstances;
        this._ptr = 0;
        this._pool = [];
        if ( true && !Class)
            throw new _debug_debugError__WEBPACK_IMPORTED_MODULE_0__/* .DebugError */ .N("can not instantiate ObjectPool: class not provided in constructor");
        if (numberOfInstances !== Infinity) {
            for (var i = 0; i < numberOfInstances; i++)
                this._pool.push(undefined);
        }
    }
    ObjectPool.prototype.getFreeObject = function (silently) {
        if (silently === void 0) { silently = false; }
        for (var i = this._ptr, max = this.numberOfInstances; i < max; i++) {
            var possible = this._getFreeObjectAt(i);
            if (possible !== undefined) {
                this._ptr = (++i) % this.numberOfInstances;
                return possible;
            }
        }
        for (var i = 0; i < this._ptr; ++i) {
            var possible = this._getFreeObjectAt(i);
            if (possible !== undefined) {
                this._ptr = (++i) % this.numberOfInstances;
                return possible;
            }
        }
        if ( true && !silently) {
            console.trace(this._pool);
            throw new _debug_debugError__WEBPACK_IMPORTED_MODULE_0__/* .DebugError */ .N("can not get free object: no free object in pool");
        }
        return undefined;
    };
    ObjectPool.prototype.releaseObject = function (obj) {
        var indexOf = obj.getCapturedIndex();
        if ( true && indexOf === -1) {
            throw new _debug_debugError__WEBPACK_IMPORTED_MODULE_0__/* .DebugError */ .N("can not release the object: it does not belong to the pool");
        }
        this._ptr = indexOf;
        this._pool[indexOf].release();
    };
    ObjectPool.prototype.releaseAll = function () {
        for (var _i = 0, _a = this._pool; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item !== undefined)
                item.release();
        }
        this._ptr = 0;
    };
    ObjectPool.prototype._getFreeObjectAt = function (i) {
        var current = this._pool[i];
        if (current === undefined) {
            current = this._pool[i] = new this.Class();
            current.capture(i);
            return current;
        }
        else if (!current.isCaptured()) {
            current.capture(i);
            return current;
        }
        else
            return undefined;
    };
    return ObjectPool;
}());



/***/ }),

/***/ 77519:
/***/ (function() {

"use strict";

if (true) {
    window.__POLYFILLS_INCLUDED__ = true;
}
if (typeof globalThis === 'undefined')
    window.globalThis = window;
var rafPolyfill = function (f) {
    return setTimeout(f, 17);
};
globalThis.requestAnimationFrame =
    globalThis.requestAnimationFrame ||
        globalThis.webkitRequestAnimationFrame ||
        rafPolyfill;
if (!globalThis.cancelAnimationFrame) {
    globalThis.cancelAnimationFrame = function (id) { return clearTimeout(id); };
}
if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (predicate) {
        if (!this && true) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function' && true) {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;
        for (var i = 0; i < length; ++i) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        var index = this.findIndex(predicate);
        return this[index];
    };
}
if (!Array.prototype.fill) {
    Array.prototype.fill = function (val) {
        for (var i = 0; i < this.length; ++i) {
            this[i] = val;
        }
    };
}
if (!Float32Array.prototype.fill) {
    Float32Array.prototype.fill = Array.prototype.fill;
}
if (!Float32Array.prototype.join) {
    Float32Array.prototype.join = Array.prototype.join;
}
if (!Number.isInteger) {
    Number.isInteger = function (value) {
        return typeof value === 'number' &&
            isFinite(value) &&
            Math.floor(value) === value;
    };
}


/***/ }),

/***/ 60627:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: function() { return /* binding */ ReleaseableEntity; }
/* harmony export */ });
var ReleaseableEntity = (function () {
    function ReleaseableEntity() {
        this._capturedIndex = -1;
    }
    ReleaseableEntity.prototype.isCaptured = function () {
        return this._capturedIndex !== -1;
    };
    ReleaseableEntity.prototype.capture = function (i) {
        this._capturedIndex = i;
        return this;
    };
    ReleaseableEntity.prototype.release = function () {
        this._capturedIndex = -1;
        return this;
    };
    ReleaseableEntity.prototype.getCapturedIndex = function () {
        return this._capturedIndex;
    };
    return ReleaseableEntity;
}());



/***/ }),

/***/ 17686:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: function() { return /* binding */ createFontFromCssDescription; }
/* harmony export */ });
/* harmony import */ var _engine_renderable_impl_general_font_createFontMethods_params_createFontParams__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37891);
/* harmony import */ var _engine_renderable_impl_general_font_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10732);


var createFontFromCssDescription = function (game, params) {
    var _a, _b, _c, _d;
    var fontFamily = (_a = params.fontFamily) !== null && _a !== void 0 ? _a : _engine_renderable_impl_general_font_createFontMethods_params_createFontParams__WEBPACK_IMPORTED_MODULE_0__/* .DEFAULT_FONT_PARAMS */ .dX.fontFamily;
    var fontSize = (_b = params.fontSize) !== null && _b !== void 0 ? _b : _engine_renderable_impl_general_font_createFontMethods_params_createFontParams__WEBPACK_IMPORTED_MODULE_0__/* .DEFAULT_FONT_PARAMS */ .dX.fontSize;
    var cssFontDescription = (0,_engine_renderable_impl_general_font_helpers__WEBPACK_IMPORTED_MODULE_1__/* .fontAsCss */ .O)(fontSize, fontFamily);
    var FontContextCanvasFactory = (__webpack_require__(1263)/* .FontContextCanvasFactory */ .Y);
    var fontFactory = new FontContextCanvasFactory(game, cssFontDescription);
    return fontFactory.createFont((_c = params.chars) !== null && _c !== void 0 ? _c : (_engine_renderable_impl_general_font_createFontMethods_params_createFontParams__WEBPACK_IMPORTED_MODULE_0__/* .LAT_CHARS */ .f + _engine_renderable_impl_general_font_createFontMethods_params_createFontParams__WEBPACK_IMPORTED_MODULE_0__/* .STANDARD_SYMBOLS */ .eI + _engine_renderable_impl_general_font_createFontMethods_params_createFontParams__WEBPACK_IMPORTED_MODULE_0__/* .CYR_CHARS */ .fU).split(''), (_d = params.extraChars) !== null && _d !== void 0 ? _d : [], fontFamily, +fontSize);
};


/***/ }),

/***/ 37891:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dX: function() { return /* binding */ DEFAULT_FONT_PARAMS; },
/* harmony export */   eI: function() { return /* binding */ STANDARD_SYMBOLS; },
/* harmony export */   f: function() { return /* binding */ LAT_CHARS; },
/* harmony export */   fU: function() { return /* binding */ CYR_CHARS; }
/* harmony export */ });
var DEFAULT_FONT_PARAMS = {
    fontFamily: 'monospace',
    fontSize: 12
};
var LAT_CHARS = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
var STANDARD_SYMBOLS = '1234567890 ' +
    '"!`?\'.,;:()[]{}<>|/@\\^$-%+=#_&~*';
var CYR_CHARS = 'РђР°Р‘Р±Р’РІР“РіР”РґР•РµРЃС‘Р–Р¶Р—Р·РРёР™Р№РљРєР›Р»РњРјРќРЅ' +
    'РћРѕРџРїР СЂРЎСЃРўС‚РЈСѓР¤С„РҐС…Р¦С†Р§С‡РЁС€Р©С‰' +
    'Р«С‹Р¬СЊРЄСЉР­СЌР®СЋРЇСЏ' +
    'Р‡С—Р†С–Р„С”ТђТ‘';


/***/ }),

/***/ 36349:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: function() { return /* binding */ FontContextAbstractFactory; }
/* harmony export */ });
/* harmony import */ var _engine_renderable_impl_general_font_font__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87074);

var FontContextAbstractFactory = (function () {
    function FontContextAbstractFactory(game) {
        this.game = game;
        this.SYMBOL_PADDING = 4;
        this.MAX_HEIGHT = 512;
        this.WIDTH = 512;
        this.pageRects = [];
        this.currentPageRect = undefined;
        this.currentPageIndex = -1;
        this.currX = 0;
        this.currY = 0;
        this.symbols = {};
        this.texturePages = [];
    }
    FontContextAbstractFactory.prototype.newPage = function () {
        if (this.currentPageRect !== undefined)
            this.pageRects.push(this.currentPageRect);
        this.currentPageIndex++;
        this.currentPageRect = {
            width: this.WIDTH,
            height: this.rowHeight,
        };
    };
    FontContextAbstractFactory.prototype.putCharOnContext = function (char) {
        var textWidth = this.getLetterWidth(char);
        var textWidthPlusPadding = this.getAdvancedWidth(char) + 2 * this.SYMBOL_PADDING;
        if (textWidthPlusPadding === 0)
            return;
        if (this.currX + textWidthPlusPadding > this.WIDTH) {
            this.currX = 0;
            this.currY += this.rowHeight;
            this.currentPageRect.height += this.rowHeight;
            if (this.currY > this.MAX_HEIGHT) {
                this.currX = 0;
                this.currY = 0;
                this.newPage();
            }
        }
        this.symbols[char] = {
            x: this.currX,
            y: this.currY,
            width: textWidthPlusPadding,
            widthAdvanced: textWidth,
            height: this.rowHeight,
            destOffsetX: 0,
            destOffsetY: 0,
            pageId: this.currentPageIndex,
        };
        this.currX += textWidthPlusPadding;
    };
    FontContextAbstractFactory.prototype.createFont = function (standardChars, extraChars, fontFamily, fontSize) {
        var _this = this;
        var lineHeight = this.getFontHeight();
        this.rowHeight = lineHeight + 2 * this.SYMBOL_PADDING;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.newPage();
        standardChars.forEach(function (c) { return _this.putCharOnContext(c); });
        extraChars.forEach(function (c) { return _this.putCharOnContext(c); });
        if (this.pageRects.indexOf(this.currentPageRect) === -1)
            this.pageRects.push(this.currentPageRect);
        this.partialContext = {
            symbols: this.symbols,
            pageRects: this.pageRects,
            padding: [
                this.SYMBOL_PADDING,
                this.SYMBOL_PADDING,
                this.SYMBOL_PADDING,
                this.SYMBOL_PADDING
            ],
            spacing: [0, 0],
            lineHeight: lineHeight,
        };
        this.partialContext.pageRects.forEach(function (size, i) { return _this.generateTexturePage(i, size); });
        return this._createFont();
    };
    FontContextAbstractFactory.prototype.getFontSize = function () {
        return this.fontSize;
    };
    FontContextAbstractFactory.prototype.generateTexturePage = function (pageId, size) {
        var _this = this;
        var texturePage = this.createTexturePage(size);
        this.texturePages.push(texturePage);
        var symbolsForThisPage = Object.keys(this.symbols).
            map(function (key) { return ({ char: key, info: _this.symbols[key] }); }).
            filter(function (it) { return (it.info.pageId === pageId); });
        symbolsForThisPage.forEach(function (symbol) {
            var rect = symbol.info;
            _this.drawLetter(texturePage, symbol.char, rect.x + _this.SYMBOL_PADDING, rect.y + _this.SYMBOL_PADDING);
        });
    };
    FontContextAbstractFactory.prototype._createFont = function () {
        var partialContext = this.partialContext;
        var texturePages = [];
        var cnt = 0;
        for (var _i = 0, _a = this.texturePages; _i < _a.length; _i++) {
            var texturePage = _a[_i];
            var texture = this.texturePageToTexture(texturePage);
            texturePages.push({ texture: texture, id: cnt });
            cnt++;
        }
        var fontContext = {
            lineHeight: partialContext.lineHeight,
            padding: partialContext.padding,
            spacing: partialContext.spacing,
            symbols: partialContext.symbols,
            base: partialContext.lineHeight,
            kerning: {},
            texturePages: texturePages,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
        };
        return new _engine_renderable_impl_general_font_font__WEBPACK_IMPORTED_MODULE_0__/* .Font */ .Z(this.game, fontContext);
    };
    return FontContextAbstractFactory;
}());



/***/ }),

/***/ 1263:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: function() { return /* binding */ FontContextCanvasFactory; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97582);
/* harmony import */ var _engine_geometry_size__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39735);
/* harmony import */ var _engine_renderable_impl_general_font_factory_fontContextAbstractFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36349);
/* harmony import */ var _engine_debug_debugError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85727);




var createCanvas = function (size) {
    var c = document.createElement('canvas');
    c.width = size.width;
    c.height = size.height;
    return c;
};
var FontContextCanvasFactory = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__/* .__extends */ .ZT)(FontContextCanvasFactory, _super);
    function FontContextCanvasFactory(game, strFont) {
        var _this = _super.call(this, game) || this;
        _this.strFont = strFont;
        var el = createCanvas(new _engine_geometry_size__WEBPACK_IMPORTED_MODULE_1__/* .Size */ .$().setWH(512));
        _this.measureCanvas = el.getContext('2d');
        _this.measureCanvas.font = strFont;
        return _this;
    }
    FontContextCanvasFactory.prototype.getFontHeight = function () {
        var parent = document.createElement("span");
        parent.appendChild(document.createTextNode("height!"));
        document.body.appendChild(parent);
        parent.style.cssText = "font: ".concat(this.strFont, "; white-space: nowrap; display: inline-block;line-height:1em;");
        var height = parent.offsetHeight;
        document.body.removeChild(parent);
        return height;
    };
    FontContextCanvasFactory.prototype.getLetterWidth = function (letter) {
        return ~~this.measureCanvas.measureText(letter).width;
    };
    FontContextCanvasFactory.prototype.getAdvancedWidth = function (letter) {
        return this.getLetterWidth(letter);
    };
    FontContextCanvasFactory.prototype.texturePageToTexture = function (page) {
        return this.game.getRenderer().createTexture(page.canvas);
    };
    FontContextCanvasFactory.prototype.createTexturePage = function (size) {
        var cnv = createCanvas(size);
        var ctx = cnv.getContext('2d');
        if ( true && !ctx) {
            throw new _engine_debug_debugError__WEBPACK_IMPORTED_MODULE_2__/* .DebugError */ .N("can not get context 2d");
        }
        ctx.font = this.strFont;
        ctx.textBaseline = 'top';
        ctx.imageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.oImageSmoothingEnabled = false;
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, cnv.width, cnv.height);
        return ctx;
    };
    FontContextCanvasFactory.prototype.drawLetter = function (context, letter, x, y) {
        context.fillStyle = '#fff';
        context.fillText(letter, x, y);
    };
    return FontContextCanvasFactory;
}(_engine_renderable_impl_general_font_factory_fontContextAbstractFactory__WEBPACK_IMPORTED_MODULE_3__/* .FontContextAbstractFactory */ .D));



/***/ }),

/***/ 87074:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: function() { return /* binding */ Font; }
});

// EXTERNAL MODULE: ./engine/debug/debugError.ts
var debugError = __webpack_require__(85727);
// EXTERNAL MODULE: ./engine/renderable/impl/general/font/helpers.ts
var helpers = __webpack_require__(10732);
// EXTERNAL MODULE: ./engine/renderable/impl/general/font/createFontMethods/createFontFromCssDescription.ts
var createFontFromCssDescription = __webpack_require__(17686);
// EXTERNAL MODULE: ./engine/renderable/impl/general/font/createFontMethods/params/createFontParams.ts
var createFontParams = __webpack_require__(37891);
;// CONCATENATED MODULE: ./engine/renderable/impl/general/font/createFontMethods/createSystemFont.ts


var _systemFontInstance;
var createSystemFont = function (game) {
    _systemFontInstance =
        _systemFontInstance ||
            (0,createFontFromCssDescription/* createFontFromCssDescription */.l)(game, { fontSize: createFontParams/* DEFAULT_FONT_PARAMS */.dX.fontSize, fontFamily: createFontParams/* DEFAULT_FONT_PARAMS */.dX.fontFamily });
    return _systemFontInstance;
};

;// CONCATENATED MODULE: ./engine/renderable/impl/general/font/font.ts




var Font = (function () {
    function Font(game, context) {
        this.game = game;
        this.context = context;
        this.DEFAULT_SPACE_INFO = {
            x: 0,
            y: 0,
            destOffsetX: 0,
            destOffsetY: 0,
            width: this.context.fontSize,
            height: this.context.lineHeight + this.context.padding[0] + this.context.padding[2],
            widthAdvanced: this.context.fontSize,
            pageId: 0
        };
        this.type = 'Font';
        this.DEFAULT_SYMBOL_IN_CONTEXT = context.symbols[Object.keys(context.symbols)[0]];
    }
    Font.fromCssDescription = function (game, desc) {
        return (0,createFontFromCssDescription/* createFontFromCssDescription */.l)(game, desc);
    };
    Font.getSystemFont = function (game) {
        return createSystemFont(game);
    };
    Font.isDefaultChar = function (char) {
        return char === ' ' || char === '\n';
    };
    Font.prototype.asCss = function () {
        return (0,helpers/* fontAsCss */.O)(this.context.fontSize, this.context.fontFamily);
    };
    Font.prototype.getSymbolInfoByChar = function (char) {
        if (Font.isDefaultChar(char) && this.context.symbols[char] === undefined) {
            return this.context.symbols[' '] || this.DEFAULT_SPACE_INFO;
        }
        return this.context.symbols[char] ||
            this.context.symbols['?'] ||
            this.DEFAULT_SYMBOL_IN_CONTEXT;
    };
    Font.prototype.getResourceLinkByChar = function (char) {
        if ( true && this.context.texturePages.length === 0) {
            throw new debugError/* DebugError */.N("wrong texturePages array");
        }
        if (Font.isDefaultChar(char))
            return this.context.texturePages[0].texture;
        var pageId = this.getSymbolInfoByChar(char).pageId;
        if ( true && (pageId < 0 || pageId > this.context.texturePages.length - 1)) {
            throw new debugError/* DebugError */.N("wrong page index for character \"".concat(char, "\""));
        }
        var textureWithId = this.context.texturePages.find(function (it) { return it.id === pageId; });
        if ( true && !textureWithId) {
            throw new debugError/* DebugError */.N("wrong page id: ".concat(pageId));
        }
        return textureWithId.texture;
    };
    Font.prototype.getSize = function () {
        return this.context.fontSize;
    };
    Font.prototype.getFontFamily = function () {
        return this.context.fontFamily;
    };
    Font.prototype.getKerning = function (firstChar, secondChar) {
        return this.context.kerning["".concat(firstChar).concat(secondChar)] || 0;
    };
    return Font;
}());



/***/ }),

/***/ 10732:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: function() { return /* binding */ fontAsCss; }
/* harmony export */ });
var fontAsCss = function (fontSize, fontFamily) {
    return "".concat(fontSize, "px ").concat(fontFamily);
};


/***/ }),

/***/ 90414:
/***/ (function(module) {

module.exports = [
    "precision mediump float;",
    "varying vec2 v_texCoord;",
    "varying vec3 v_normal;",
    "varying vec4 v_vertexColor;",
    "varying vec4 v_position;",
    "varying vec3 v_surfaceToLight;",
    "varying vec3 v_surfaceToView;",
    "uniform sampler2D u_texture;",
    "uniform sampler2D u_normalsTexture;",
    "uniform sampler2D u_specularTexture;",
    "uniform samplerCube u_cubeMapTexture;",
    "uniform bool  u_textureUsed;",
    "uniform bool  u_normalsTextureUsed;",
    "uniform bool  u_specularTextureUsed;",
    "uniform bool  u_cubeMapTextureUsed;",
    "uniform bool  u_vertexColorUsed;",
    "uniform float u_alpha;",
    "uniform float u_reflectivity;",
    "uniform float u_specular;",
    "uniform bool  u_lightUsed;",
    "uniform vec4  u_color;",
    "uniform float u_color_mix;",
    "uniform mat4  u_modelMatrix;",
    "void main() {",
    "if (u_textureUsed) gl_FragColor = mix(texture2D(u_texture, v_texCoord),u_color,u_color_mix);",
    "else if (u_vertexColorUsed) gl_FragColor = v_vertexColor;",
    "else gl_FragColor = u_color;",
    "vec3 normal = normalize(v_normal);",
    "vec3 surfaceToViewDirection = normalize(v_surfaceToView);",
    "if (u_lightUsed) {",
    "vec3 surfaceToLightDirection = normalize(v_surfaceToLight);",
    "vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);",
    "if (u_normalsTextureUsed) {",
    "vec4 bumpNormal = texture2D(u_normalsTexture, v_texCoord) * 2. - 1.;",
    "normal+= bumpNormal.rgb;",
    "normal = normalize(normal);",
    "}",
    "vec3 directionLightPos = vec3(0,0,-100);",
    "vec3 lightDirection = normalize(directionLightPos);",
    "float light = max(0.,dot(normal, lightDirection));",
    "light += max(0.,dot(normal, surfaceToLightDirection));",
    "float specular = pow(max(dot(normal, halfVector), 0.0), 32.);",
    "specular*=u_specular;",
    "if (u_specularTextureUsed) {",
    "specular*=texture2D(u_specularTexture, v_texCoord).r;",
    "}",
    "light = clamp(light,.5,1.0);",
    "//gl_FragColor = vec4(normalize(v_normal)*0.5+0.5,1.0); // to debug normals",
    "gl_FragColor.rgb *= light;",
    "gl_FragColor.rgb+=specular;",
    "}",
    "if (u_cubeMapTextureUsed) {",
    "vec3 direction = reflect(surfaceToViewDirection,normal);",
    "vec4 reflectionColor = textureCube(u_cubeMapTexture, direction);",
    "gl_FragColor = mix(gl_FragColor,reflectionColor,u_reflectivity);",
    "}",
    "gl_FragColor*=u_alpha;",
    "}"
].join('\n');

/***/ }),

/***/ 18885:
/***/ (function(module) {

module.exports = [
    "precision mediump float;",
    "#define zToW_matrix mat4(__Z_To_W_MATRIX_SOURCE__)",
    "attribute vec4 a_position;",
    "attribute vec2 a_texCoord;",
    "attribute vec3 a_normal;",
    "attribute vec4 a_vertexColor;",
    "uniform mat4 u_modelMatrix;",
    "uniform mat4 u_inverseTransposeModelMatrix;",
    "uniform mat4 u_projectionMatrix;",
    "varying vec2 v_texCoord;",
    "varying vec3 v_normal;",
    "varying vec4 v_position;",
    "varying vec4 v_vertexColor;",
    "varying vec3 v_surfaceToLight;",
    "varying vec3 v_surfaceToView;",
    "void main() {",
    "vec4 position = a_position;",
    "v_texCoord = vec2(a_texCoord.x,1.-a_texCoord.y);",
    "v_normal = mat3(u_inverseTransposeModelMatrix) * a_normal;",
    "v_position = zToW_matrix * u_projectionMatrix * u_modelMatrix * position;",
    "// the vector of the surface to the light",
    "v_surfaceToLight = vec3(600,200,1000) - vec3(u_modelMatrix * position);",
    "// the vector of the surface to the view/camera",
    "v_surfaceToView = normalize(vec3(500,300,1000) - vec3(u_modelMatrix * position));",
    "v_vertexColor = a_vertexColor;",
    "gl_Position = v_position;",
    "}"
].join('\n');

/***/ }),

/***/ 7797:
/***/ (function(module) {

module.exports = [
    "struct GradientPoint {",
    "bool pointActive;",
    "float value;",
    "float r;",
    "float g;",
    "float b;",
    "float a;",
    "};",
    "#define HALF                            .5",
    "#define ZERO                            .0",
    "#define ONE                             1.",
    "#define PI                              __PI__",
    "#define TWO_PI                          (__PI__*2.)",
    "#define ERROR_COLOR                     vec4(ONE,ZERO,ZERO,ONE)",
    "#define STRETCH_MODE_STRETCH            __STRETCH_MODE_STRETCH__",
    "#define STRETCH_MODE_REPEAT             __STRETCH_MODE_REPEAT__",
    "#define FILL_TYPE_COLOR                 __FILL_TYPE_COLOR__",
    "#define FILL_TYPE_TEXTURE               __FILL_TYPE_TEXTURE__",
    "#define FILL_TYPE_LINEAR_GRADIENT       __FILL_TYPE_LINEAR_GRADIENT__",
    "#define FILL_TYPE_RADIAL_GRADIENT       __FILL_TYPE_RADIAL_GRADIENT__",
    "#define SHAPE_TYPE_ELLIPSE              __SHAPE_TYPE_ELLIPSE__",
    "#define SHAPE_TYPE_RECT                 __SHAPE_TYPE_RECT__",
    "#define MAX_NUM_OF_GRADIENT_POINTS      __MAX_NUM_OF_GRADIENT_POINTS__"
].join('\n');

/***/ }),

/***/ 67236:
/***/ (function(module) {

module.exports = [
    "vec4 getStretchedImage(float tx,float ty){",
    "vec2 txVec = vec2(tx,ty);",
    "txVec += fract(u_texOffset);",
    "txVec = mod(txVec,u_texRect.zw);",
    "txVec += u_texRect.xy;",
    "return texture2D(texture, txVec);",
    "}",
    "vec4 getRepeatedImage(float tx,float ty){",
    "vec2 txVec = vec2(tx,ty)*u_repeatFactor;",
    "txVec += fract(u_texOffset);",
    "txVec = mod(txVec,u_texRect.zw);",
    "txVec += u_texRect.xy;",
    "return texture2D(texture, txVec);",
    "}",
    "vec4 mixTextureColorWithTint(vec4 textureCol, vec4 tint){",
    "return mix(textureCol,tint,tint.a)*textureCol.a;",
    "}",
    "vec4 getInterpolatedGradientColor(float position) {",
    "GradientPoint currentLeftPoint = u_fillGradientPoints[0];",
    "GradientPoint currentRightPoint = u_fillGradientPoints[MAX_NUM_OF_GRADIENT_POINTS-1];",
    "for (int i=0;i<MAX_NUM_OF_GRADIENT_POINTS;i++) {",
    "GradientPoint currentPointFromLtoR = u_fillGradientPoints[i];",
    "GradientPoint currentPointFromRtoL = u_fillGradientPoints[MAX_NUM_OF_GRADIENT_POINTS-1-i];",
    "if (!currentLeftPoint.pointActive) currentLeftPoint = currentPointFromLtoR;",
    "if (!currentRightPoint.pointActive) currentRightPoint = currentPointFromRtoL;",
    "if (currentPointFromLtoR.pointActive && currentPointFromLtoR.value>currentLeftPoint.value && currentPointFromLtoR.value<position) {",
    "currentLeftPoint = currentPointFromLtoR;",
    "}",
    "if (currentPointFromRtoL.pointActive && currentPointFromRtoL.value<currentRightPoint.value && currentPointFromRtoL.value>=position) {",
    "currentRightPoint = currentPointFromRtoL;",
    "}",
    "}",
    "GradientPoint lp = currentLeftPoint;",
    "GradientPoint rp = currentRightPoint;",
    "return mix(",
    "vec4(lp.r*lp.a,lp.g*lp.a,lp.b*lp.a,lp.a),",
    "vec4(rp.r*rp.a,rp.g*rp.a,rp.b*rp.a,rp.a),",
    "(position - currentLeftPoint.value)/(currentRightPoint.value - currentLeftPoint.value+0.00001)",
    ");",
    "}",
    "vec4 getFillColor(){",
    "if (u_fillType==FILL_TYPE_TEXTURE) {",
    "float tx = (v_position.x-u_rectOffsetLeft)/u_width*u_texRect[2];",
    "float ty = (v_position.y-u_rectOffsetTop)/u_height*u_texRect[3];",
    "vec4 txVec;",
    "if (u_stretchMode==STRETCH_MODE_STRETCH) txVec = mixTextureColorWithTint(getStretchedImage(tx,ty),u_color);",
    "else if (u_stretchMode==STRETCH_MODE_REPEAT) txVec = mixTextureColorWithTint(getRepeatedImage(tx,ty),u_color);",
    "else txVec = ERROR_COLOR;",
    "if (txVec.a==ZERO) discard;",
    "return txVec;",
    "}",
    "else if (u_fillType==FILL_TYPE_COLOR) return vec4(",
    "u_fillColor.r*u_fillColor.a,",
    "u_fillColor.g*u_fillColor.a,",
    "u_fillColor.b*u_fillColor.a,",
    "u_fillColor.a",
    ");",
    "else if (u_fillType==FILL_TYPE_LINEAR_GRADIENT) {",
    "float r = distance(vec2(HALF, HALF), v_position.xy);",
    "float angle = atan(v_position.y - HALF,v_position.x - HALF);",
    "angle+=u_fillGradientAngle;",
    "float x = r*cos(angle);",
    "float y = r*sin(angle);",
    "return getInterpolatedGradientColor(x + HALF);",
    "}",
    "else if (u_fillType==FILL_TYPE_RADIAL_GRADIENT) {",
    "float r = distance(vec2(u_radialGradientCenterX, u_radialGradientCenterY), v_position.xy);",
    "// interpolate r to [0..1] interval",
    "float radiusTopLeft = distance(vec2(u_radialGradientCenterX, u_radialGradientCenterY), vec2(ZERO,ZERO));",
    "float radiusBottomLeft = distance(vec2(u_radialGradientCenterX, u_radialGradientCenterY), vec2(ZERO,ONE));",
    "float radiusTopRight = distance(vec2(u_radialGradientCenterX, u_radialGradientCenterY), vec2(ONE,ZERO));",
    "float radiusBottomRight = distance(vec2(u_radialGradientCenterX, u_radialGradientCenterY), vec2(ONE,ONE));",
    "float maxRadius = radiusTopLeft;",
    "if (radiusBottomLeft>maxRadius) maxRadius = radiusBottomLeft;",
    "if (radiusTopRight>maxRadius) maxRadius = radiusTopRight;",
    "if (radiusBottomRight>maxRadius) maxRadius = radiusBottomRight;",
    "return getInterpolatedGradientColor(r/maxRadius);",
    "}",
    "else return ERROR_COLOR;",
    "}",
    "float calcRadiusAtPosition(vec2 pos,vec2 center,vec2 radius,float lineWidth) {",
    "float a = atan(pos.y-center.y,pos.x-center.x);",
    "float cosA = cos(a);",
    "float sinA = sin(a);",
    "float rx = radius.x - lineWidth;",
    "float ry = radius.y - lineWidth;",
    "if (rx<ZERO) return ZERO;",
    "if (ry<ZERO) return ZERO;",
    "return rx*ry/sqrt(rx*rx*sinA*sinA+ry*ry*cosA*cosA);",
    "}",
    "void _drawEllipse(){",
    "float rOuterAtCurrAngle = calcRadiusAtPosition(v_position.xy, vec2(HALF,HALF),vec2(u_rx, u_ry),ZERO);",
    "float rInnerAtCurrAngle  = calcRadiusAtPosition(v_position.xy, vec2(HALF,HALF),vec2(u_rx, u_ry),u_lineWidth);",
    "float dist = distance(vec2(HALF, HALF), v_position.xy);",
    "if (dist > rOuterAtCurrAngle) discard;",
    "else if (dist > rInnerAtCurrAngle) gl_FragColor = vec4(",
    "u_color.r*u_color.a,",
    "u_color.g*u_color.a,",
    "u_color.b*u_color.a,",
    "u_color.a",
    ");",
    "else gl_FragColor = getFillColor();",
    "}",
    "void drawEllipse(){",
    "bool isArcNotUsed = u_arcAngleFrom==u_arcAngleTo;",
    "if (isArcNotUsed) {",
    "_drawEllipse();",
    "} else {",
    "float angle = atan(v_position.y-HALF, v_position.x-HALF);",
    "float angleFrom = u_arcAngleFrom;",
    "float angleTo =  u_arcAngleTo;",
    "if (angleFrom<ZERO) angleFrom = TWO_PI + angleFrom;",
    "if (angleTo<ZERO) angleTo = TWO_PI + angleTo;",
    "if (angle<ZERO) angle = TWO_PI + angle;",
    "bool anticlockwise = u_anticlockwise;",
    "if (angleFrom>angleTo) {",
    "anticlockwise=!anticlockwise;",
    "float tmp = angleFrom;",
    "angleFrom = angleTo;",
    "angleTo = tmp;",
    "}",
    "bool withinArc = (angleFrom<=angle) && (angle<=angleTo);",
    "if (withinArc) {",
    "if (anticlockwise) discard;",
    "else _drawEllipse();",
    "}",
    "else {",
    "if (!anticlockwise) discard;",
    "else _drawEllipse();",
    "}",
    "}",
    "}",
    "void drawRect(){",
    "float x = v_position.x - HALF;",
    "float y = v_position.y - HALF;",
    "float distX = abs(x);",
    "float distY = abs(y);",
    "float halfW = u_width  * HALF;",
    "float halfH = u_height * HALF;",
    "if (distX < halfW && distY < halfH) {",
    "if (u_borderRadius>ZERO && distX>halfW - u_borderRadius && distY>halfH - u_borderRadius) {",
    "vec2 borderCenter = vec2(ZERO,ZERO);",
    "float posX = v_position.x, posY = v_position.y;",
    "if (posX<HALF && posY<HALF) { // top left",
    "borderCenter = vec2(HALF - halfW + u_borderRadius,HALF - halfH + u_borderRadius);",
    "}",
    "else if (posX>HALF && posY<HALF) { // top right",
    "borderCenter = vec2(HALF + halfW - u_borderRadius,HALF - halfH + u_borderRadius);",
    "}",
    "else if (posX<HALF && posY>HALF) { // bottom left",
    "borderCenter = vec2(HALF - halfW + u_borderRadius,HALF + halfH - u_borderRadius);",
    "}",
    "else {  // bottom right",
    "borderCenter = vec2(HALF + halfW - u_borderRadius,HALF + halfH - u_borderRadius);",
    "}",
    "float distToBorderCenter = distance(v_position.xy,borderCenter);",
    "if (distToBorderCenter>u_borderRadius) discard;",
    "else if (distToBorderCenter>u_borderRadius-u_lineWidth) gl_FragColor = u_color;",
    "else gl_FragColor = getFillColor();",
    "}",
    "else if (distX > halfW - u_lineWidth || distY > halfH - u_lineWidth) gl_FragColor = u_color;",
    "else gl_FragColor = getFillColor();",
    "}",
    "else discard;",
    "}",
    "void main(){",
    "if (u_shapeType==SHAPE_TYPE_RECT) drawRect();",
    "else if (u_shapeType==SHAPE_TYPE_ELLIPSE) drawEllipse();",
    "else gl_FragColor = ERROR_COLOR;",
    "gl_FragColor*=u_alpha;",
    "}"
].join('\n');

/***/ }),

/***/ 22352:
/***/ (function(module) {

module.exports = [
    "precision mediump float;",
    "void main(){",
    "// gl_FragColor = texture2D(texture, v_texCoord);",
    "gl_FragColor = v_color;",
    "gl_FragColor.rgb *= v_color.a;",
    "}"
].join('\n');

/***/ }),

/***/ 72526:
/***/ (function(module) {

module.exports = [
    "precision mediump float;",
    "#define HALF    .5",
    "#define ZERO    .0",
    "#define ONE     1.",
    "vec2 _unpack(float n) {",
    "float a = n/256.;",
    "float b = n - float(int(a))*256.;",
    "return vec2(a/255.,b/255.);",
    "}",
    "vec4 unpackColor(vec2 v) {",
    "vec2 a = _unpack(v[0]);",
    "vec2 b = _unpack(v[1]);",
    "return vec4(a[0],a[1],b[0],b[1]);",
    "}",
    "void main(){",
    "vec2 uv;",
    "int idx = int(a_idx);",
    "if (idx==0) {",
    "uv = vec2(ZERO, ZERO);",
    "} else if (idx==1) {",
    "uv = vec2(ZERO, ONE);",
    "} else if (idx==2) {",
    "uv = vec2(ONE, ZERO);",
    "} else {",
    "uv = vec2(ONE, ONE);",
    "}",
    "float objWidth  = a_pos.z;",
    "float objHeight = a_pos.w;",
    "float dy = objHeight * (-HALF + uv.y);",
    "float dx = objWidth  * (-HALF + uv.x);",
    "vec2 pos = vec2(",
    "a_pos.x",
    "+ objWidth / 2.",
    "+ sin(a_angle) * dy",
    "+ cos(a_angle) * dx,",
    "a_pos.y",
    "+ objHeight / 2.",
    "+ cos(a_angle) * dy",
    "- sin(a_angle) * dx",
    ");",
    "gl_Position = vec4(",
    "-ONE + 2.0 * pos.x/u_viewPort.x,",
    "-ONE + 2.0 * pos.y/u_viewPort.y,",
    "ZERO,  ONE",
    ");",
    "v_color = unpackColor(a_color);",
    "}"
].join('\n');

/***/ }),

/***/ 97582:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Jh: function() { return /* binding */ __generator; },
/* harmony export */   ZT: function() { return /* binding */ __extends; },
/* harmony export */   ev: function() { return /* binding */ __spreadArray; },
/* harmony export */   mG: function() { return /* binding */ __awaiter; },
/* harmony export */   pi: function() { return /* binding */ __assign; }
/* harmony export */ });
/* unused harmony exports __rest, __decorate, __param, __esDecorate, __runInitializers, __propKey, __setFunctionName, __metadata, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet, __classPrivateFieldIn, __addDisposableResource, __disposeResources */
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose;
    if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.mjs
var tslib_es6 = __webpack_require__(97582);
// EXTERNAL MODULE: ./engine/geometry/abstract/observableEntity.ts
var observableEntity = __webpack_require__(33661);
// EXTERNAL MODULE: ./engine/debug/debugError.ts
var debugError = __webpack_require__(85727);
;// CONCATENATED MODULE: ./engine/control/abstract/abstractKeypad.ts



var KeyPadEvent = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(KeyPadEvent, _super);
    function KeyPadEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return KeyPadEvent;
}(observableEntity/* ObservableEntity */.R));

var AbstractKeypad = (function () {
    function AbstractKeypad(game) {
        this.buffer = [];
        this.reflectKey = {
            control: undefined,
            map: undefined
        };
        this.game = game;
    }
    AbstractKeypad.prototype.reflectToControl = function (control, map) {
        this.reflectKey.control = control;
        this.reflectKey.map = map;
    };
    AbstractKeypad.prototype.reflectToSelf = function (map) {
        this.reflectKey.control = this;
        this.reflectKey.map = map;
    };
    AbstractKeypad.prototype.press = function (event) {
        event.keyState = 1;
        this.buffer.push(event);
        this.notify("keyPressed", event);
    };
    AbstractKeypad.prototype.release = function (event) {
        event.keyState = 0;
        this.notify("keyReleased", event);
    };
    AbstractKeypad.prototype.update = function () {
        for (var _i = 0, _a = this.buffer; _i < _a.length; _i++) {
            var event_1 = _a[_i];
            if (!event_1.isCaptured())
                continue;
            var keyVal = event_1.keyState;
            switch (keyVal) {
                case -1:
                    this.buffer.splice(this.buffer.indexOf(event_1), 1);
                    event_1.release();
                    break;
                case 0:
                    event_1.keyState = -1;
                    break;
                case 2:
                    event_1.keyState = 1;
                    break;
                case 1:
                    this.notify("keyHold", event_1);
                    break;
                default:
                    if (true)
                        throw new debugError/* DebugError */.N("unknown button state: ".concat(keyVal));
                    break;
            }
        }
    };
    AbstractKeypad.prototype.notify = function (eventName, e) {
        if (this.reflectKey.control !== undefined && this.reflectKey.map[e.button]) {
            var self_1 = this;
            var clonedEvent = new (function (_super) {
                (0,tslib_es6/* __extends */.ZT)(class_1, _super);
                function class_1() {
                    var _this = _super.call(this) || this;
                    _this.keyState = e.keyState;
                    _this.button = self_1.reflectKey.map[e.button];
                    return _this;
                }
                return class_1;
            }(KeyPadEvent));
            this.reflectKey.control.notify(eventName, clonedEvent);
        }
    };
    return AbstractKeypad;
}());


// EXTERNAL MODULE: ./engine/misc/objectPool.ts
var objectPool = __webpack_require__(49541);
;// CONCATENATED MODULE: ./engine/control/keyboard/keyboardEvent.ts



var KeyBoardEvent = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(KeyBoardEvent, _super);
    function KeyBoardEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KeyBoardEvent.fromPool = function () {
        return this._pool.getFreeObject();
    };
    KeyBoardEvent._pool = new objectPool/* ObjectPool */.L(KeyBoardEvent);
    return KeyBoardEvent;
}(KeyPadEvent));

;// CONCATENATED MODULE: ./engine/control/keyboard/keyboardControl.ts



var ADDITIONAL_KEYS_MAP = {
    'softRight': -1,
    'softLeft': -2,
    'call': -3
};
var KeyboardControl = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(KeyboardControl, _super);
    function KeyboardControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'KeyboardControl';
        _this.keyPressed = "keyPressed";
        _this.keyHold = "keyHold";
        _this.keyReleased = "keyReleased";
        return _this;
    }
    KeyboardControl.prototype.isJustPressed = function (key) {
        var event = this.findEvent(key);
        if (event === undefined)
            return false;
        return event.keyState === 2;
    };
    KeyboardControl.prototype.isReleased = function (key) {
        var event = this.findEvent(key);
        if (event === undefined)
            return false;
        return event.keyState <= 0;
    };
    KeyboardControl.prototype.isJustReleased = function (key) {
        var event = this.findEvent(key);
        if (event === undefined)
            return false;
        return event.keyState === 0;
    };
    KeyboardControl.prototype.listenTo = function () {
        var _this = this;
        this._keyDownListener = function (e) {
            if (e.keyCode !== 8) {
                e.preventDefault();
            }
            e.stopPropagation();
            var code = KeyboardControl.mapKeyCode(e);
            _this.triggerKeyPress(code, e);
        };
        this._keyUpListener = function (e) {
            var code = KeyboardControl.mapKeyCode(e);
            _this.triggerKeyRelease(code, e);
        };
        globalThis.addEventListener('keydown', this._keyDownListener);
        globalThis.addEventListener('keyup', this._keyUpListener);
    };
    KeyboardControl.mapKeyCode = function (e) {
        var _a;
        if (e.keyCode === 0)
            return (_a = ADDITIONAL_KEYS_MAP[e.key]) !== null && _a !== void 0 ? _a : e.keyCode;
        else
            return e.keyCode;
    };
    KeyboardControl.prototype.triggerKeyPress = function (code, nativeEvent) {
        var eventFromBuffer = KeyBoardEvent.fromPool();
        if (eventFromBuffer === undefined) {
            if (true)
                console.warn('keyboard pool is full');
            return;
        }
        eventFromBuffer.button = code;
        eventFromBuffer.nativeEvent = nativeEvent;
        if (this.isPressed(code)) {
            this.notify("keyRepeated", eventFromBuffer);
            eventFromBuffer.release();
            return;
        }
        this.press(eventFromBuffer);
    };
    KeyboardControl.prototype.triggerKeyRelease = function (code, nativeEvent) {
        var eventFromBuffer = this.findEvent(code);
        if (eventFromBuffer === undefined)
            return;
        eventFromBuffer.nativeEvent = nativeEvent;
        this.release(eventFromBuffer);
    };
    KeyboardControl.prototype.destroy = function () {
        globalThis.removeEventListener('keydown', this._keyDownListener);
        globalThis.removeEventListener('keyup', this._keyUpListener);
    };
    KeyboardControl.prototype.isPressed = function (key) {
        var event = this.findEvent(key);
        if (event === undefined)
            return false;
        return event.keyState >= 1;
    };
    KeyboardControl.prototype.notify = function (eventName, e) {
        _super.prototype.notify.call(this, eventName, e);
        this.game.getCurrentScene().keyboardEventHandler.trigger(eventName, e);
    };
    KeyboardControl.prototype.findEvent = function (button) {
        for (var _i = 0, _a = this.buffer; _i < _a.length; _i++) {
            var event_1 = _a[_i];
            if (event_1.button === button)
                return event_1;
        }
        return undefined;
    };
    return KeyboardControl;
}(AbstractKeypad));


// EXTERNAL MODULE: ./engine/misc/polyfills.ts
var polyfills = __webpack_require__(77519);
// EXTERNAL MODULE: ./engine/misc/object.ts
var object = __webpack_require__(6221);
;// CONCATENATED MODULE: ./engine/geometry/point2d.ts





var Point2d = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(Point2d, _super);
    function Point2d(x, y, onChangedFn) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = x; }
        var _this = _super.call(this) || this;
        _this._x = 0;
        _this._y = 0;
        _this._arr = new Float32Array([0, 0, 0]);
        if (onChangedFn)
            _this.addOnChangeListener(onChangedFn);
        _this.setXY(x, y);
        return _this;
    }
    Object.defineProperty(Point2d.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this.setX(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Point2d.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this.setY(value);
        },
        enumerable: false,
        configurable: true
    });
    Point2d.fromPool = function () {
        return this.pool.getFreeObject();
    };
    Point2d.toPool = function (obj) {
        return this.pool.releaseObject(obj);
    };
    Point2d.prototype.setXY = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = x; }
        if ( true && ((0,object/* isNotNumber */.iy)(x) || (0,object/* isNotNumber */.iy)(y))) {
            console.trace();
            throw new debugError/* DebugError */.N("Point2d: wrong numeric arguments ".concat(x, ",").concat(y));
        }
        var changed = this._x !== x || this._y !== y;
        if (changed) {
            this._x = x;
            this._y = y;
            this._arr[0] = x;
            this._arr[1] = y;
            this.triggerObservable();
        }
        return this;
    };
    Point2d.prototype.setX = function (x) {
        this.setXY(x, this._y);
        return this;
    };
    Point2d.prototype.setY = function (y) {
        this.setXY(this._x, y);
        return this;
    };
    Point2d.prototype.setFrom = function (another) {
        this.setXY(another.x, another.y);
        return this;
    };
    Point2d.prototype.add = function (another) {
        this.addXY(another.x, another.y);
        return this;
    };
    Point2d.prototype.subtract = function (another) {
        this.addXY(-another.x, -another.y);
        return this;
    };
    Point2d.prototype.multiply = function (n) {
        this.setXY(this._x * n, this._y * n);
        return this;
    };
    Point2d.prototype.addXY = function (x, y) {
        this.setXY(this._x + x, this._y + y);
        return this;
    };
    Point2d.prototype.addX = function (x) {
        this.addXY(x, 0);
        return this;
    };
    Point2d.prototype.addY = function (y) {
        this.addXY(0, y);
        return this;
    };
    Point2d.prototype.negative = function () {
        this.setXY(-this._x, -this._y);
        return this;
    };
    Point2d.prototype.truncate = function () {
        this.setXY(~~this._x, ~~this._y);
        return this;
    };
    Point2d.prototype.equals = function (x, y) {
        if (y === void 0) { y = x; }
        return this._x === x && this._y === y;
    };
    Point2d.prototype.equalsToPoint = function (point) {
        return this.equals(point.x, point.y);
    };
    Point2d.prototype.clone = function () {
        return new Point2d(this._x, this._y);
    };
    Point2d.prototype.toJSON = function () {
        return { x: this._x, y: this._y };
    };
    Point2d.prototype.toArray = function () {
        return this._arr;
    };
    Point2d.pool = new objectPool/* ObjectPool */.L(Point2d, 4);
    return Point2d;
}(observableEntity/* ObservableEntity */.R));

;// CONCATENATED MODULE: ./engine/delegates/parentChildDelegate.ts

var ParentChildDelegate = (function () {
    function ParentChildDelegate(model) {
        this.model = model;
    }
    ParentChildDelegate.prototype._validateBeforeAppend = function (c) {
        if (true) {
            if (!c)
                throw new debugError/* DebugError */.N("illegal argument: ".concat(c));
            if (c === this.model)
                throw new debugError/* DebugError */.N("parent and child objects are the same");
            if (this.model._children.find(function (it) { return it === c; })) {
                console.error(c);
                throw new debugError/* DebugError */.N("this children is already added");
            }
            if (c.parent !== undefined) {
                throw new debugError/* DebugError */.N("this children is already added to another object");
            }
        }
    };
    ParentChildDelegate.prototype.appendChild = function (c) {
        this._validateBeforeAppend(c);
        c.parent = this.model;
        this.model._children.push(c);
        if (this.afterChildAppended !== undefined)
            this.afterChildAppended(c);
    };
    ParentChildDelegate.prototype.appendChildAt = function (c, index) {
        if (true) {
            if (!c)
                throw new debugError/* DebugError */.N("illegal argument: ".concat(c));
            if (index > this.model._children.length - 1)
                throw new debugError/* DebugError */.N("can not insert element: index is out of range (".concat(index, ",").concat(this.model._children.length - 1, ")"));
        }
        this._validateBeforeAppend(c);
        c.parent = this.model;
        this.model._children.splice(index, 0, c);
        if (this.afterChildAppended !== undefined)
            this.afterChildAppended(c);
    };
    ParentChildDelegate.prototype.appendChildAfter = function (modelAfter, newChild) {
        if (true) {
            if (!modelAfter || !newChild)
                throw new debugError/* DebugError */.N("illegal argument: ".concat(modelAfter));
        }
        var afterIndex = this.model._children.indexOf(modelAfter);
        if (true) {
            if (afterIndex === -1)
                throw new debugError/* DebugError */.N("can not insert element: object is detached or does not belong to parent");
        }
        if (afterIndex === this.model._children.length - 1)
            this.appendChild(newChild);
        else
            this.appendChildAt(newChild, afterIndex + 1);
    };
    ParentChildDelegate.prototype.appendChildBefore = function (modelBefore, newChild) {
        if (true) {
            if (!modelBefore || !newChild)
                throw new debugError/* DebugError */.N("illegal argument: ".concat(modelBefore));
        }
        var beforeIndex = this.model._children.indexOf(modelBefore);
        if (true) {
            if (beforeIndex === -1)
                throw new debugError/* DebugError */.N("can not insert element: object is detached or does not belong to parent");
        }
        if (beforeIndex === 0)
            this.prependChild(newChild);
        else
            this.appendChildAt(newChild, beforeIndex - 1);
    };
    ParentChildDelegate.prototype.prependChild = function (c) {
        if (true) {
            if (!c)
                throw new debugError/* DebugError */.N("illegal argument: ".concat(c));
        }
        this._validateBeforeAppend(c);
        c.parent = this.model;
        this.model._children.unshift(c);
        if (this.afterChildAppended !== undefined)
            this.afterChildAppended(c);
    };
    ParentChildDelegate.prototype.removeChildAt = function (i) {
        var c = this.model._children[i];
        if ( true && !c)
            throw new debugError/* DebugError */.N("can not remove children with index ".concat(i));
        if ( true && c.parent === undefined)
            throw new debugError/* DebugError */.N("can not remove children with index ".concat(i, ": it is already detached"));
        var parent = c.parent;
        parent._children.splice(i, 1);
        c.parent = undefined;
        if (this.afterChildRemoved !== undefined)
            this.afterChildRemoved(c);
    };
    ParentChildDelegate.prototype.removeChild = function (child) {
        if (true) {
            if (!child)
                throw new debugError/* DebugError */.N("illegal argument: ".concat(child));
        }
        var parent = child.getParent();
        var i = parent._children.indexOf(child);
        if ( true && i === -1)
            throw new debugError/* DebugError */.N("can not remove child: it doesn't belong to parent");
        parent._children.splice(i, 1);
        child.parent = undefined;
        if (this.afterChildRemoved !== undefined)
            this.afterChildRemoved(child);
    };
    ParentChildDelegate.prototype.removeSelf = function () {
        var parent = this.model.getParent();
        if ( true && parent === undefined)
            throw new debugError/* DebugError */.N("can not remove child: it is already detached");
        var i = parent._children.indexOf(this.model);
        if ( true && i === -1)
            throw new debugError/* DebugError */.N("can not remove child: it doesn't belong to parent");
        parent._children.splice(i, 1);
        this.model.parent = undefined;
        if (this.afterChildRemoved !== undefined)
            this.afterChildRemoved(this.model);
    };
    ParentChildDelegate.prototype.removeChildren = function () {
        for (var i = this.model._children.length - 1; i >= 0; i--) {
            this.removeChildAt(i);
        }
    };
    ParentChildDelegate.prototype.replaceChild = function (c, newChild) {
        if (true) {
            if (!c || !newChild)
                throw new debugError/* DebugError */.N("illegal argument: ".concat(c));
        }
        var indexOf = this.model._children.indexOf(c);
        if ( true && indexOf === -1)
            throw new debugError/* DebugError */.N("can not replace child: destination node doesn't belong to element");
        this.model._children[indexOf] = newChild;
        c.parent = undefined;
        newChild.parent = this.model;
        if (this.afterChildRemoved !== undefined)
            this.afterChildRemoved(c);
        if (this.afterChildAppended !== undefined)
            this.afterChildAppended(newChild);
    };
    ParentChildDelegate.prototype.moveToFront = function () {
        var parent = this.model.getParent();
        if ( true && !parent)
            throw new debugError/* DebugError */.N("can not move to front: object is detached");
        var parentArray = parent._children;
        var index = parentArray.indexOf(this.model);
        if ( true && index === -1)
            throw new debugError/* DebugError */.N("can not move to front: object is not belong to current scene");
        parentArray.splice(index, 1);
        parentArray.push(this.model);
    };
    ParentChildDelegate.prototype.moveToBack = function () {
        var parent = this.model.getParent();
        if ( true && !parent)
            throw new debugError/* DebugError */.N("can not move to back: object is detached");
        var parentArray = parent._children;
        var index = parentArray.indexOf(this.model);
        if ( true && index === -1)
            throw new debugError/* DebugError */.N("can not move to front: object is not belong to current scene");
        parentArray.splice(index, 1);
        parentArray.unshift(this.model);
    };
    ParentChildDelegate.prototype.findChildById = function (id) {
        if (true) {
            if (!id)
                throw new debugError/* DebugError */.N("illegal argument: ".concat(id));
        }
        if (id === this.model.id)
            return this.model;
        for (var _i = 0, _a = this.model._children; _i < _a.length; _i++) {
            var c = _a[_i];
            var possibleObject = c.findChildById(id);
            if (possibleObject)
                return possibleObject;
        }
        return undefined;
    };
    return ParentChildDelegate;
}());


;// CONCATENATED MODULE: ./engine/resources/incrementer.ts
var val = 0;
var Incrementer = (function () {
    function Incrementer() {
    }
    Incrementer.getValue = function () {
        return val++;
    };
    return Incrementer;
}());


;// CONCATENATED MODULE: ./engine/scene/layer.ts


var Layer = (function () {
    function Layer(game) {
        var _this = this;
        this.game = game;
        this.type = 'Layer';
        this.transformType = 0;
        this.filters = [];
        this.alpha = 1;
        this.id = "object_".concat(Incrementer.getValue());
        this._children = [];
        this._parentChildDelegate = new ParentChildDelegate(this);
        this._parentChildDelegate.afterChildAppended = function (c) {
            var m = c;
            m._setLayer(_this);
            m._setScene(_this._scene);
            c.parent = undefined;
            m.revalidate();
        };
    }
    Layer.prototype.appendChild = function (newChild) {
        this._parentChildDelegate.appendChild(newChild);
    };
    Layer.prototype.appendChildAt = function (newChild, index) {
        this._parentChildDelegate.appendChildAt(newChild, index);
    };
    Layer.prototype.appendChildAfter = function (modelAfter, newChild) {
        this._parentChildDelegate.appendChildAfter(modelAfter, newChild);
    };
    Layer.prototype.appendChildBefore = function (modelBefore, newChild) {
        this._parentChildDelegate.appendChildBefore(modelBefore, newChild);
    };
    Layer.prototype.prependChild = function (newChild) {
        this._parentChildDelegate.prependChild(newChild);
    };
    Layer.prototype.appendTo = function (parent) {
        parent.appendChild(this);
    };
    Layer.prototype.prependTo = function (parent) {
        parent.prependChild(this);
    };
    Layer.prototype.removeChildAt = function (i) {
        this._parentChildDelegate.removeChildAt(i);
    };
    Layer.prototype.removeChild = function (c) {
        this._parentChildDelegate.removeChild(c);
    };
    Layer.prototype.replaceChild = function (c, newChild) {
        this._parentChildDelegate.replaceChild(c, newChild);
    };
    Layer.prototype.removeSelf = function () {
        this._parentChildDelegate.removeSelf();
    };
    Layer.prototype.removeChildren = function () {
        this._parentChildDelegate.removeChildren();
    };
    Layer.prototype.moveToFront = function () {
        this._parentChildDelegate.moveToFront();
    };
    Layer.prototype.moveToBack = function () {
        this._parentChildDelegate.moveToBack();
    };
    Layer.prototype.findChildById = function (id) {
        return this._parentChildDelegate.findChildById(id);
    };
    Layer.prototype.getParent = function () {
        return this._scene;
    };
    Layer.prototype.getParentNode = function () {
        return this.parent;
    };
    Layer.prototype.getChildrenCount = function () {
        return this._children.length;
    };
    Layer.prototype.getChildAt = function (index) {
        return this._children[index];
    };
    Layer.prototype._setScene = function (scene) {
        this._scene = scene;
    };
    Layer.prototype.update = function () {
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var c = _a[_i];
            c.update();
        }
    };
    Layer.prototype.render = function () {
        var renderer = this.game.getRenderer();
        var layerStatePointer = renderer.beforeItemStackDraw(this.filters, this.alpha, false);
        for (var i = 0, l = this._children.length; i < l; ++i) {
            var c = this._children[i];
            if (c !== undefined)
                c.render();
        }
        renderer.afterItemStackDraw(layerStatePointer);
    };
    return Layer;
}());


;// CONCATENATED MODULE: ./engine/renderer/common/color.ts



var alignTo2Symbols = function (val) {
    if (val.length === 1)
        return "0" + val;
    return val;
};
var Color = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(Color, _super);
    function Color(r, g, b, a) {
        if (r === void 0) { r = 0; }
        if (g === void 0) { g = r; }
        if (b === void 0) { b = g; }
        if (a === void 0) { a = 255; }
        var _this = _super.call(this) || this;
        _this.type = 'Color';
        _this._arr = new Float32Array([0, 0, 0, 0]);
        _this._friezed = false;
        _this.setRGBA(r, g, b, a);
        return _this;
    }
    Object.defineProperty(Color.prototype, "r", {
        get: function () {
            return this._r;
        },
        set: function (value) {
            this.setRGBA(value, this._g, this._b, this._a);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "g", {
        get: function () {
            return this._g;
        },
        set: function (value) {
            this.setRGBA(this._r, value, this._b, this._a);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "b", {
        get: function () {
            return this._b;
        },
        set: function (value) {
            this.setRGBA(this._r, this._g, value, this._a);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "a", {
        get: function () {
            return this._a;
        },
        set: function (value) {
            this.setRGBA(this._r, this._g, this._b, value);
        },
        enumerable: false,
        configurable: true
    });
    Color.RGB = function (r, g, b) {
        if (g === void 0) { g = r; }
        if (b === void 0) { b = r; }
        return Color.RGBA(r, g, b, 255);
    };
    Color.RGBA = function (r, g, b, a) {
        if (g === void 0) { g = r; }
        if (b === void 0) { b = g; }
        if (a === void 0) { a = 255; }
        return new Color(r, g, b, a);
    };
    Color.from = function (col) {
        return new Color(col.r, col.g, col.b, col.a);
    };
    Color.fromRGBNumeric = function (col) {
        var r = (col & 16711680) >> (4 * 4);
        var g = (col & 65280) >> (4 * 2);
        var b = (col & 255);
        return new Color(r, g, b);
    };
    Color.prototype.setRGBA = function (r, g, b, a) {
        if (a === void 0) { a = 255; }
        if (true) {
            if (r === undefined || g === undefined || b === undefined) {
                throw new debugError/* DebugError */.N("wrong rgb color values: ".concat(r, ",").concat(g, ",").concat(b));
            }
        }
        this.checkFriezed();
        var changed = this._r !== r || this._g !== g || this._b !== b || this._a !== a;
        if (!changed)
            return;
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
        this._arr[0] = r / 0xff;
        this._arr[1] = g / 0xff;
        this._arr[2] = b / 0xff;
        this._arr[3] = a / 0xff;
        this.triggerObservable();
    };
    Color.prototype.setRGB = function (r, g, b) {
        if (g === void 0) { g = r; }
        if (b === void 0) { b = g; }
        this.setRGBA(r, g, b, 255);
    };
    Color.prototype.setFrom = function (another) {
        this.setRGBA(another.r, another.g, another.b, another.a);
    };
    Color.prototype.clone = function () {
        return new Color(this._r, this._g, this._b, this._a);
    };
    Color.prototype.freeze = function () {
        this._friezed = true;
        return this;
    };
    Color.prototype.asGL = function () {
        return this._arr;
    };
    Color.prototype.asCssRgba = function () {
        return "rgba(".concat(this._r, ",").concat(this._g, ",").concat(this._b, ",").concat(this._a / 255, ")");
    };
    Color.prototype.asCssHex = function () {
        return ('#' + ([
            alignTo2Symbols(this._r.toString(16)),
            alignTo2Symbols(this._g.toString(16)),
            alignTo2Symbols(this._b.toString(16)),
            alignTo2Symbols(this._a.toString(16))
        ].join('')));
    };
    Color.prototype.asRGBNumeric = function () {
        return (this._r << 16) | (this._g << 8) | this._b;
    };
    Color.prototype.asRGBANumeric = function () {
        return (this._r << 24) | (this._g << 16) | (this._b << 8) | (this._a);
    };
    Color.prototype.toJSON = function () {
        return { r: this._r, g: this._g, b: this._b, a: this._a };
    };
    Color.prototype.fromJSON = function (json) {
        this.setRGBA(json.r, json.g, json.b, json.a);
    };
    Color.prototype.checkFriezed = function () {
        if (this._friezed) {
            if (true) {
                console.error(this);
                throw new debugError/* DebugError */.N("the color is friezed and can no be changed");
            }
            else
                {}
        }
    };
    Color.WHITE = Color.RGB(255, 255, 255).freeze();
    Color.GREY = Color.RGB(127, 127, 127).freeze();
    Color.BLACK = Color.RGB(0, 0, 0).freeze();
    Color.NONE = Color.RGBA(0, 0, 0, 0).freeze();
    return Color;
}(observableEntity/* ObservableEntity */.R));

;// CONCATENATED MODULE: ./engine/misc/easing/functions/linear.ts
var EasingLinear = function (t, b, c, d) { return c * t / d + b; };

;// CONCATENATED MODULE: ./engine/animation/tween.ts


var Tween = (function () {
    function Tween(game, tweenDesc) {
        var _a;
        this.game = game;
        this._propsToChange = [];
        this._startedTime = 0;
        this._delayWaitTime = 0;
        this._currTime = 0;
        this._completed = false;
        this._delayBeforeStart = 0;
        this._currentLoop = 0;
        this._started = false;
        this._target = tweenDesc.target;
        this._progressFn = tweenDesc.progress;
        this._completeFn = tweenDesc.complete;
        this._startedFn = tweenDesc.start;
        this._easeFn = tweenDesc.ease || EasingLinear;
        this._delayBeforeStart = tweenDesc.delayBeforeStart || 0;
        this._tweenTime = (tweenDesc.time || 1000);
        if ( true && tweenDesc.loop === undefined && tweenDesc.numOfLoops !== undefined) {
            throw new debugError/* DebugError */.N("loop property need to be set to true if numOfLoops is specified");
        }
        if ( true && tweenDesc.loop === undefined && tweenDesc.yoyo !== undefined) {
            throw new debugError/* DebugError */.N("loop property need to be set to true if yoyo is true");
        }
        this._loop = tweenDesc.loop || false;
        this._numOfLoops = (_a = tweenDesc.numOfLoops) !== null && _a !== void 0 ? _a : Infinity;
        this._yoyo = tweenDesc.yoyo || false;
        this._desc = this.normalizeDesc(tweenDesc);
    }
    Tween.prototype.update = function () {
        if (this._completed)
            return;
        var currTime = this.game.getCurrentTime();
        if (this._currentLoop === 0 && this._delayBeforeStart > 0) {
            this._delayWaitTime = this._delayWaitTime || currTime;
            if (currTime - this._delayWaitTime < this._delayBeforeStart)
                return;
        }
        this._currTime = currTime;
        if (this._startedTime === 0)
            this._startedTime = currTime;
        var curTweenTime = currTime - this._startedTime;
        if (curTweenTime > this._tweenTime) {
            if (this._loop) {
                this._startedTime = currTime;
                if (this._currentLoop === this._numOfLoops - 1) {
                    this.complete();
                    return;
                }
                ++this._currentLoop;
                curTweenTime = 0;
            }
            else {
                this.complete();
                return;
            }
        }
        if (this._yoyo && this._currentLoop % 2 !== 0) {
            curTweenTime = this._tweenTime - curTweenTime;
        }
        var l = this._propsToChange.length;
        if (this._startedFn && !this._started)
            this._startedFn(this._target);
        while (l--) {
            var prp = this._propsToChange[l];
            var valFrom = this._desc.from[prp];
            var valTo = this._desc.to[prp];
            var fn = this._easeFn;
            this._target[prp] = fn(curTweenTime, valFrom, valTo - valFrom, this._tweenTime);
        }
        if (this._progressFn)
            this._progressFn(this._target);
        this._started = true;
    };
    Tween.prototype.reset = function () {
        this._startedTime = 0;
        this._completed = false;
    };
    Tween.prototype.complete = function () {
        if (this._completed)
            return;
        var needReversion = this._yoyo && this._currentLoop % 2 !== 0;
        var target = needReversion ? this._desc.from : this._desc.to;
        for (var _i = 0, _a = this._propsToChange; _i < _a.length; _i++) {
            var k = _a[_i];
            this._target[k] = target[k];
        }
        if (this._progressFn)
            this._progressFn(this._target);
        if (this._completeFn)
            this._completeFn(this._target);
        this._completed = true;
    };
    Tween.prototype.stop = function () {
        this._completed = true;
    };
    Tween.prototype.isCompleted = function () {
        return this._completed;
    };
    Tween.prototype.getTarget = function () {
        return this._target;
    };
    Tween.prototype.getTweenTime = function () {
        return this._tweenTime;
    };
    Tween.prototype.normalizeDesc = function (tweenDesc) {
        var _this = this;
        var normalized = tweenDesc;
        normalized.from = normalized.from || {};
        normalized.to = normalized.to || {};
        var allPropsMap = {};
        Object.keys(normalized.from).forEach(function (keyFrom) {
            allPropsMap[keyFrom] = true;
        });
        Object.keys(normalized.to).forEach(function (keyTo) {
            allPropsMap[keyTo] = true;
        });
        this._propsToChange = Object.keys(allPropsMap);
        if (true) {
            this._propsToChange.forEach(function (key) {
                if (_this._target[key] === undefined) {
                    console.error('target', _this._target);
                    throw new debugError/* DebugError */.N("Can not create tween animation: property \"".concat(String(key), "\" does not belong to target object or is undefined"));
                }
            });
        }
        this._propsToChange.forEach(function (prp) {
            if (normalized.from[prp] === undefined)
                normalized.from[prp] = _this._target[prp];
            if (normalized.to[prp] === undefined)
                normalized.to[prp] = _this._target[prp];
        });
        return normalized;
    };
    return Tween;
}());


;// CONCATENATED MODULE: ./engine/delegates/tweenableDelegate.ts

var TweenableDelegate = (function () {
    function TweenableDelegate(game) {
        this.game = game;
    }
    TweenableDelegate.prototype.tween = function (desc) {
        var t = new Tween(this.game, desc);
        this.addTween(t);
        return t;
    };
    TweenableDelegate.prototype.addTween = function (t) {
        if (!this._tweens)
            this._tweens = [];
        this._tweens.push(t);
    };
    TweenableDelegate.prototype.addTweenMovie = function (tm) {
        if (!this._tweenMovies)
            this._tweenMovies = [];
        this._tweenMovies.push(tm);
    };
    TweenableDelegate.prototype.update = function () {
        if (this._tweens !== undefined) {
            for (var i = 0, l = this._tweens.length; i < l; i++) {
                var t = this._tweens[i];
                t.update();
                if (t.isCompleted()) {
                    this._tweens.splice(i, 1);
                    l--;
                }
            }
        }
        if (this._tweenMovies !== undefined) {
            for (var i = 0, l = this._tweenMovies.length; i < l; i++) {
                var t = this._tweenMovies[i];
                t.update();
                if (t.isCompleted()) {
                    this._tweenMovies.splice(i, 1);
                    l--;
                }
            }
        }
    };
    return TweenableDelegate;
}());


;// CONCATENATED MODULE: ./engine/misc/timer.ts


var Timer = (function () {
    function Timer(game, parent, callback, interval, once) {
        this.game = game;
        this.parent = parent;
        this.once = once;
        this._lastTime = 0;
        if (true) {
            if (interval < 0)
                throw new debugError/* DebugError */.N("can not create timer with negative interval: ".concat(interval));
        }
        this._interval = interval;
        this._callback = callback;
    }
    Timer.prototype.onUpdate = function () {
        var time = this.game.getCurrentTime();
        if (!this._lastTime)
            this._lastTime = time;
        var delta = time - this._lastTime;
        if (delta !== 0 && delta > this._interval) {
            this._lastTime = time;
            this._callback();
            if (this.once)
                this.kill();
        }
    };
    Timer.prototype.reset = function () {
        this._lastTime = 0;
    };
    Timer.prototype.kill = function () {
        var _this = this;
        (0,object/* removeFromArray */.As)(this.parent.getTimers(), function (it) { return it === _this; });
    };
    return Timer;
}());


;// CONCATENATED MODULE: ./engine/delegates/timerDelegate.ts

var TimerDelegate = (function () {
    function TimerDelegate(game) {
        this.game = game;
    }
    TimerDelegate.prototype.setInterval = function (callback, interval) {
        return this._addTimer(callback, interval, false);
    };
    TimerDelegate.prototype.setTimeout = function (callback, interval) {
        return this._addTimer(callback, interval, true);
    };
    TimerDelegate.prototype.getTimers = function () {
        return this._timers;
    };
    TimerDelegate.prototype.update = function () {
        if (!this._timers)
            return;
        for (var _i = 0, _a = this._timers; _i < _a.length; _i++) {
            var t = _a[_i];
            t.onUpdate();
        }
    };
    TimerDelegate.prototype._addTimer = function (callback, interval, once) {
        var t = new Timer(this.game, this, callback, interval, once);
        if (!this._timers)
            this._timers = [];
        this._timers.push(t);
        return t;
    };
    return TimerDelegate;
}());


;// CONCATENATED MODULE: ./engine/misc/eventEmitter.ts

var EventEmitter = (function () {
    function EventEmitter() {
        this._events = {};
    }
    EventEmitter.prototype.on = function (eventNameOrList, callBack) {
        var _this = this;
        if (typeof eventNameOrList === 'string') {
            this._on(eventNameOrList, callBack);
        }
        else if (eventNameOrList.splice !== undefined) {
            eventNameOrList.forEach(function (eventName) {
                _this._on(eventName, callBack);
            });
        }
    };
    EventEmitter.prototype.off = function (eventName, callback) {
        if (callback === undefined) {
            if (this._events[eventName] !== undefined)
                this._events[eventName].length = 0;
        }
        else {
            var es = this._events[eventName];
            if (!es)
                return;
            var index = es.indexOf(callback);
            if ( true && index === -1) {
                console.error(callback);
                throw new debugError/* DebugError */.N("can not remove event listener ".concat(eventName, ", it does not belong to this eventEmitter"));
            }
            es.splice(index, 1);
        }
    };
    EventEmitter.prototype.trigger = function (eventName, data) {
        var evnts = this._events[eventName];
        if (!evnts)
            return;
        for (var i = 0; i < evnts.length; i++) {
            evnts[i](data);
        }
    };
    EventEmitter.prototype._on = function (name, callBack) {
        var _a;
        var _b;
        (_a = (_b = this._events)[name]) !== null && _a !== void 0 ? _a : (_b[name] = []);
        this._events[name].push(callBack);
    };
    return EventEmitter;
}());


;// CONCATENATED MODULE: ./engine/delegates/eventDelegates/eventEmitterDelegate.ts

var getControlErrorMessage = function (controlName, controlClassName) {
    if (false)
        {}
    return "can not listen to ".concat(controlName, " events: ").concat(controlName, " control is not added;\ninvoke \"game.addControl(").concat(controlClassName, ");\"");
};
var EventEmitterDelegate = (function () {
    function EventEmitterDelegate(game) {
        this.game = game;
    }
    EventEmitterDelegate.prototype.on = function (eventName, callBack) {
        if (this._emitter === undefined)
            this._emitter = new EventEmitter();
        this._emitter.on(eventName, callBack);
        return callBack;
    };
    EventEmitterDelegate.prototype.once = function (eventName, callBack) {
        var _this = this;
        var cb = this.on(eventName, function (_args) {
            _this.off(eventName, cb);
            callBack(_args);
        });
    };
    EventEmitterDelegate.prototype.off = function (eventName, callBack) {
        if (this._emitter !== undefined)
            this._emitter.off(eventName, callBack);
    };
    EventEmitterDelegate.prototype.trigger = function (eventName, data) {
        if (this._emitter !== undefined)
            this._emitter.trigger(eventName, data);
    };
    return EventEmitterDelegate;
}());


// EXTERNAL MODULE: ./engine/misc/releaseableEntity.ts
var releaseableEntity = __webpack_require__(60627);
;// CONCATENATED MODULE: ./engine/geometry/point3d.ts





var Point3d = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(Point3d, _super);
    function Point3d(x, y, z, onChangedFn) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = x; }
        if (z === void 0) { z = y; }
        var _this = _super.call(this, x, y, onChangedFn) || this;
        _this._z = 0;
        _this.setXYZ(x, y, z);
        return _this;
    }
    Object.defineProperty(Point3d.prototype, "z", {
        get: function () {
            return this._z;
        },
        set: function (value) {
            this.setZ(value);
        },
        enumerable: false,
        configurable: true
    });
    Point3d.fromPool = function () {
        return this._pool.getFreeObject();
    };
    Point3d.toPool = function (obj) {
        return this._pool.releaseObject(obj);
    };
    Point3d.prototype.setXYZ = function (x, y, z) {
        if (y === void 0) { y = x; }
        if (z === void 0) { z = y; }
        this.x = x;
        this.y = y;
        if ( true && ((0,object/* isNotNumber */.iy)(z))) {
            console.trace();
            throw new debugError/* DebugError */.N("Point3d: wrong numeric arguments ".concat(x, ",").concat(y, ",").concat(z));
        }
        var changed = this._z !== z;
        if (changed) {
            this._z = z;
            this._arr[2] = z;
            this.triggerObservable();
        }
        return this;
    };
    Point3d.prototype.addXYZ = function (x, y, z) {
        if (y === void 0) { y = x; }
        if (z === void 0) { z = y; }
        this.setXYZ(this.x + x, this.y + y, this.z + z);
        return this;
    };
    Point3d.prototype.setZ = function (z) {
        this.setXYZ(this.x, this.y, z);
        return this;
    };
    Point3d.prototype.clone = function () {
        return new Point3d(this.x, this.y, this._z);
    };
    Point3d.prototype.toJSON = function () {
        return { x: this.x, y: this.y, z: this._z };
    };
    Point3d._pool = new objectPool/* ObjectPool */.L(Point3d, 4);
    return Point3d;
}(Point2d));

;// CONCATENATED MODULE: ./engine/misc/math/vec3.ts

var vec3;
(function (vec3) {
    vec3.normalize = function (v, out) {
        out = out !== null && out !== void 0 ? out : new Point3d(v.x, v.y, v.z);
        var l = vec3.length(v);
        if (l > 0.00001) {
            out.x = out.x / l;
            out.y = out.y / l;
            out.z = out.z / l;
        }
        return out;
    };
    vec3.subtract = function (a, b, out) {
        out = out !== null && out !== void 0 ? out : new Point3d();
        out.x = a.x - b.x;
        out.y = a.y - b.y;
        out.z = a.z - b.z;
        return out;
    };
    vec3.cross = function (a, b, out) {
        out = out !== null && out !== void 0 ? out : new Point3d();
        out.x = a.y * b.z - a.z * b.y;
        out.y = a.z * b.x - a.x * b.z;
        out.z = a.x * b.y - a.y * b.x;
        return out;
    };
    vec3.dot = function (a, b) {
        return (a.x * b.x) + (a.y * b.y) + (a.z * b.z);
    };
    vec3.distanceSq = function (a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        var dz = a.z - b.z;
        return dx * dx + dy * dy + dz * dz;
    };
    vec3.distance = function (a, b) {
        return Math.sqrt(vec3.distanceSq(a, b));
    };
    vec3.lengthSq = function (v) {
        return v.x * v.x + v.y * v.y + v.z * v.z;
    };
    vec3.length = function (v) {
        return Math.sqrt(vec3.lengthSq(v));
    };
})(vec3 || (vec3 = {}));

;// CONCATENATED MODULE: ./engine/geometry/vec4.ts



var Vec4;
(function (Vec4) {
    var Vec4Holder = (function (_super) {
        (0,tslib_es6/* __extends */.ZT)(Vec4Holder, _super);
        function Vec4Holder() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.vec4 = new Float32Array(4);
            return _this;
        }
        Object.defineProperty(Vec4Holder.prototype, "x", {
            get: function () {
                return this.vec4[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vec4Holder.prototype, "y", {
            get: function () {
                return this.vec4[1];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vec4Holder.prototype, "z", {
            get: function () {
                return this.vec4[2];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vec4Holder.prototype, "w", {
            get: function () {
                return this.vec4[3];
            },
            enumerable: false,
            configurable: true
        });
        Vec4Holder.fromPool = function () {
            return Vec4Holder.pool.getFreeObject();
        };
        Vec4Holder.toPool = function (obj) {
            return Vec4Holder.pool.releaseObject(obj);
        };
        Vec4Holder.prototype.set = function (x, y, z, w) {
            var v = this.vec4;
            v[0] = x;
            v[1] = y;
            v[2] = z;
            v[3] = w;
        };
        Vec4Holder.pool = new objectPool/* ObjectPool */.L(Vec4Holder, 32);
        return Vec4Holder;
    }(releaseableEntity/* ReleaseableEntity */.c));
    Vec4.Vec4Holder = Vec4Holder;
})(Vec4 || (Vec4 = {}));

;// CONCATENATED MODULE: ./engine/misc/math/mat4.ts







var Mat4;
(function (Mat4) {
    var Vec4Holder = Vec4.Vec4Holder;
    var sin = Math.sin;
    var cos = Math.cos;
    var tan = Math.tan;
    Mat4.IDENTITY = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
    var Mat16Holder = (function (_super) {
        (0,tslib_es6/* __extends */.ZT)(Mat16Holder, _super);
        function Mat16Holder() {
            var _this = _super.call(this) || this;
            _this.identityFlag = false;
            _this.mat16 = new Float32Array(16);
            _this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            return _this;
        }
        Mat16Holder.fromPool = function () {
            window.p = this.m16hPool;
            return Mat16Holder.m16hPool.getFreeObject();
        };
        Mat16Holder.toPool = function (obj) {
            return Mat16Holder.m16hPool.releaseObject(obj);
        };
        Mat16Holder.create = function () {
            return new Mat16Holder();
        };
        Mat16Holder.prototype.set = function (v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15) {
            var mat16 = this.mat16;
            mat16[0] = v0;
            mat16[1] = v1;
            mat16[2] = v2;
            mat16[3] = v3;
            mat16[4] = v4;
            mat16[5] = v5;
            mat16[6] = v6;
            mat16[7] = v7;
            mat16[8] = v8;
            mat16[9] = v9;
            mat16[10] = v10;
            mat16[11] = v11;
            mat16[12] = v12;
            mat16[13] = v13;
            mat16[14] = v14;
            mat16[15] = v15;
            this.identityFlag = false;
        };
        Mat16Holder.prototype.fromMat16 = function (mat16Holder) {
            this.mat16.set(mat16Holder.mat16);
            this.identityFlag = mat16Holder.identityFlag;
        };
        Mat16Holder.prototype.clone = function () {
            var m = new Mat16Holder();
            m.fromMat16(this);
            m.identityFlag = this.identityFlag;
            return m;
        };
        Mat16Holder.m16hPool = new objectPool/* ObjectPool */.L(Mat16Holder, Infinity);
        return Mat16Holder;
    }(releaseableEntity/* ReleaseableEntity */.c));
    Mat4.Mat16Holder = Mat16Holder;
    Mat4.makeIdentity = function (out) {
        out.mat16.set(Mat4.IDENTITY);
        out.identityFlag = true;
    };
    Mat4.makeZToWMatrix = function (out, fudgeFactor) {
        out.mat16.set(Mat4.IDENTITY);
        out.mat16[11] = fudgeFactor;
        out.identityFlag = false;
    };
    Mat4.make2DProjection = function (out, width, height, depth) {
        out.set(2 / width, 0, 0, 0, 0, -2 / height, 0, 0, 0, 0, 2 / depth, 0, -1, 1, 0, 1);
    };
    Mat4.ortho = function (out, left, right, bottom, top, near, far) {
        if (true) {
            if (left === right || bottom === top || near === far) {
                console.error({ left: left, right: right, bottom: bottom, top: top, near: near, far: far });
                throw new debugError/* DebugError */.N("Can not create ortho matrix with wrong parameters");
            }
        }
        var lr = 1.0 / (left - right), bt = 1.0 / (bottom - top), nf = 1.0 / (near - far);
        var outMat16 = out.mat16;
        outMat16.set(Mat4.IDENTITY);
        outMat16[0] = -2 * lr;
        outMat16[5] = -2 * bt;
        outMat16[10] = 2 * nf;
        outMat16[12] = (left + right) * lr;
        outMat16[13] = (top + bottom) * bt;
        outMat16[14] = (near + far) * nf;
        out.identityFlag = false;
    };
    Mat4.perspective = function (out, fovy, aspect, near, far) {
        var f = 1.0 / tan(fovy / 2), nf = 1 / (near - far);
        var outMat16 = out.mat16;
        outMat16[0] = f / aspect;
        outMat16[1] = 0;
        outMat16[2] = 0;
        outMat16[3] = 0;
        outMat16[4] = 0;
        outMat16[5] = f;
        outMat16[6] = 0;
        outMat16[7] = 0;
        outMat16[8] = 0;
        outMat16[9] = 0;
        outMat16[10] = (far + near) * nf;
        outMat16[11] = -1;
        outMat16[12] = 0;
        outMat16[13] = 0;
        outMat16[14] = (2 * far * near) * nf;
        outMat16[15] = 0;
        out.identityFlag = false;
    };
    Mat4.lookAt = function (out, cameraPosition, target, up) {
        var zAxis = vec3.normalize(vec3.subtract(cameraPosition, target));
        var xAxis = vec3.normalize(vec3.cross(up, zAxis));
        var yAxis = vec3.normalize(vec3.cross(zAxis, xAxis));
        var dst = out.mat16;
        dst[0] = xAxis.x;
        dst[1] = xAxis.y;
        dst[2] = xAxis.z;
        dst[3] = 0;
        dst[4] = yAxis.x;
        dst[5] = yAxis.y;
        dst[6] = yAxis.z;
        dst[7] = 0;
        dst[8] = zAxis.x;
        dst[9] = zAxis.y;
        dst[10] = zAxis.z;
        dst[11] = 0;
        dst[12] = cameraPosition.x;
        dst[13] = cameraPosition.y;
        dst[14] = cameraPosition.z;
        dst[15] = 1;
    };
    Mat4.makeTranslation = function (out, tx, ty, tz) {
        var m = out.mat16;
        m.set(Mat4.IDENTITY);
        m[12] = tx;
        m[13] = ty;
        m[14] = tz;
        out.identityFlag = false;
    };
    Mat4.makeXSkew = function (out, angle) {
        var t = tan(angle);
        var m = out.mat16;
        m.set(Mat4.IDENTITY);
        m[4] = t;
        out.identityFlag = false;
    };
    Mat4.makeYSkew = function (out, angle) {
        var t = tan(angle);
        var m = out.mat16;
        m.set(Mat4.IDENTITY);
        m[1] = t;
        out.identityFlag = false;
    };
    Mat4.makeXRotation = function (out, angleInRadians) {
        var c = cos(angleInRadians);
        var s = sin(angleInRadians);
        var m = out.mat16;
        m.set(Mat4.IDENTITY);
        m[5] = c;
        m[6] = s;
        m[9] = -s;
        m[10] = c;
        out.identityFlag = false;
    };
    Mat4.makeYRotation = function (out, angleInRadians) {
        var c = cos(angleInRadians);
        var s = sin(angleInRadians);
        var m = out.mat16;
        m.set(Mat4.IDENTITY);
        m[0] = c;
        m[2] = -s;
        m[8] = s;
        m[10] = c;
        out.identityFlag = false;
    };
    Mat4.makeZRotation = function (out, angleInRadians) {
        var c = cos(angleInRadians);
        var s = sin(angleInRadians);
        var m = out.mat16;
        m.set(Mat4.IDENTITY);
        m[0] = c;
        m[1] = s;
        m[4] = -s;
        m[5] = c;
        out.identityFlag = false;
    };
    Mat4.makeRotationReset = function (out) {
        var m = out.mat16;
        var m0 = m[0], m1 = m[1], m2 = m[2];
        var m12 = m[12], m13 = m[13], m14 = m[14];
        var d = Math.sqrt(m0 * m0 + m1 * m1 + m2 * m2);
        out.mat16.set(Mat4.IDENTITY);
        m[0] = d;
        m[5] = d;
        m[10] = d;
        m[12] = m12;
        m[13] = m13;
        m[14] = m14;
        out.identityFlag = false;
    };
    Mat4.makeScale = function (out, sx, sy, sz) {
        var m = out.mat16;
        out.mat16.set(Mat4.IDENTITY);
        m[0] = sx;
        m[5] = sy;
        m[10] = sz;
        out.identityFlag = false;
    };
    Mat4.matrixMultiply = function (out, aHolder, bHolder) {
        var dst = out.mat16;
        var a = aHolder.mat16;
        var b = bHolder.mat16;
        var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
        var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
        var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
        var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
        var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
        var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
        var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
        dst[0] = b0 * a0 + b1 * a4 + b2 * a8 + b3 * a12;
        dst[1] = b0 * a1 + b1 * a5 + b2 * a9 + b3 * a13;
        dst[2] = b0 * a2 + b1 * a6 + b2 * a10 + b3 * a14;
        dst[3] = b0 * a3 + b1 * a7 + b2 * a11 + b3 * a15;
        dst[4] = b4 * a0 + b5 * a4 + b6 * a8 + b7 * a12;
        dst[5] = b4 * a1 + b5 * a5 + b6 * a9 + b7 * a13;
        dst[6] = b4 * a2 + b5 * a6 + b6 * a10 + b7 * a14;
        dst[7] = b4 * a3 + b5 * a7 + b6 * a11 + b7 * a15;
        dst[8] = b8 * a0 + b9 * a4 + b10 * a8 + b11 * a12;
        dst[9] = b8 * a1 + b9 * a5 + b10 * a9 + b11 * a13;
        dst[10] = b8 * a2 + b9 * a6 + b10 * a10 + b11 * a14;
        dst[11] = b8 * a3 + b9 * a7 + b10 * a11 + b11 * a15;
        dst[12] = b12 * a0 + b13 * a4 + b14 * a8 + b15 * a12;
        dst[13] = b12 * a1 + b13 * a5 + b14 * a9 + b15 * a13;
        dst[14] = b12 * a2 + b13 * a6 + b14 * a10 + b15 * a14;
        dst[15] = b12 * a3 + b13 * a7 + b14 * a11 + b15 * a15;
    };
    Mat4.multVecByMatrix = function (out, matrix, vec4Arr) {
        var v = vec4Arr.vec4;
        var mat4 = matrix.mat16;
        var x = v[0], y = v[1], z = v[2], w = v[3];
        var c1r1 = mat4[0], c2r1 = mat4[1], c3r1 = mat4[2], c4r1 = mat4[3], c1r2 = mat4[4], c2r2 = mat4[5], c3r2 = mat4[6], c4r2 = mat4[7], c1r3 = mat4[8], c2r3 = mat4[9], c3r3 = mat4[10], c4r3 = mat4[11], c1r4 = mat4[12], c2r4 = mat4[13], c3r4 = mat4[14], c4r4 = mat4[15];
        out.set(x * c1r1 + y * c1r2 + z * c1r3 + w * c1r4, x * c2r1 + y * c2r2 + z * c2r3 + w * c2r4, x * c3r1 + y * c3r2 + z * c3r3 + w * c3r4, x * c4r1 + y * c4r2 + z * c4r3 + w * c4r4);
    };
    Mat4.inverse = function (out, mHolder) {
        var dst = out.mat16;
        var m = mHolder.mat16;
        var m00 = m[0 * 4 + 0];
        var m01 = m[0 * 4 + 1];
        var m02 = m[0 * 4 + 2];
        var m03 = m[0 * 4 + 3];
        var m10 = m[1 * 4 + 0];
        var m11 = m[1 * 4 + 1];
        var m12 = m[1 * 4 + 2];
        var m13 = m[1 * 4 + 3];
        var m20 = m[2 * 4 + 0];
        var m21 = m[2 * 4 + 1];
        var m22 = m[2 * 4 + 2];
        var m23 = m[2 * 4 + 3];
        var m30 = m[3 * 4 + 0];
        var m31 = m[3 * 4 + 1];
        var m32 = m[3 * 4 + 2];
        var m33 = m[3 * 4 + 3];
        var tmp_0 = m22 * m33;
        var tmp_1 = m32 * m23;
        var tmp_2 = m12 * m33;
        var tmp_3 = m32 * m13;
        var tmp_4 = m12 * m23;
        var tmp_5 = m22 * m13;
        var tmp_6 = m02 * m33;
        var tmp_7 = m32 * m03;
        var tmp_8 = m02 * m23;
        var tmp_9 = m22 * m03;
        var tmp_10 = m02 * m13;
        var tmp_11 = m12 * m03;
        var tmp_12 = m20 * m31;
        var tmp_13 = m30 * m21;
        var tmp_14 = m10 * m31;
        var tmp_15 = m30 * m11;
        var tmp_16 = m10 * m21;
        var tmp_17 = m20 * m11;
        var tmp_18 = m00 * m31;
        var tmp_19 = m30 * m01;
        var tmp_20 = m00 * m21;
        var tmp_21 = m20 * m01;
        var tmp_22 = m00 * m11;
        var tmp_23 = m10 * m01;
        var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
        var x = (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
        if ( true && x === 0) {
            throw new debugError/* DebugError */.N("can not calculate determinant: division by zero");
        }
        var d = 1.0 / x;
        dst[0] = d * t0;
        dst[1] = d * t1;
        dst[2] = d * t2;
        dst[3] = d * t3;
        dst[4] = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
            (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
        dst[5] = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
            (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
        dst[6] = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
            (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
        dst[7] = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
            (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
        dst[8] = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
            (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
        dst[9] = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
            (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
        dst[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
            (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
        dst[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
            (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
        dst[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
            (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
        dst[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
            (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
        dst[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
            (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
        dst[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
            (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));
        out.identityFlag = false;
    };
    Mat4.transpose = function (out, mHolder) {
        var m = mHolder.mat16;
        out.set(m[0], m[4], m[8], m[12], m[1], m[5], m[9], m[13], m[2], m[6], m[10], m[14], m[3], m[7], m[11], m[15]);
    };
    Mat4.unproject = function (x, y, projectionView) {
        var vec4Holder = Vec4Holder.fromPool();
        vec4Holder.set(x, y, 0, 1);
        var invProjectionView = Mat16Holder.fromPool();
        Mat4.inverse(invProjectionView, projectionView);
        var vec4Transformed = Vec4Holder.fromPool();
        Mat4.multVecByMatrix(vec4Transformed, invProjectionView, vec4Holder);
        Mat16Holder.toPool(invProjectionView);
        Vec4Holder.toPool(vec4Holder);
        var pointResult = Point2d.fromPool();
        pointResult.setXY(vec4Transformed.x, vec4Transformed.y);
        Vec4Holder.toPool(vec4Transformed);
        return pointResult;
    };
    Mat4.IDENTITY_HOLDER = new Mat16Holder();
    Mat4.IDENTITY_HOLDER.mat16.set(Mat4.IDENTITY);
    Mat4.IDENTITY_HOLDER.identityFlag = true;
})(Mat4 || (Mat4 = {}));

// EXTERNAL MODULE: ./engine/geometry/size.ts
var geometry_size = __webpack_require__(39735);
;// CONCATENATED MODULE: ./engine/geometry/rect.ts





var Rect = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(Rect, _super);
    function Rect(x, y, width, height, onChangedFn) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        var _this = _super.call(this) || this;
        _this._x = 0;
        _this._y = 0;
        _this._width = 0;
        _this._height = 0;
        _this._arr = new Float32Array([0, 0, 0, 0]);
        if (onChangedFn)
            _this.addOnChangeListener(onChangedFn);
        _this.setXYWH(x, y, width, height);
        return _this;
    }
    Object.defineProperty(Rect.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (x) {
            this.setXY(x, this.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (y) {
            this.setXY(this.x, y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (width) {
            this.setWH(width, this.height);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (height) {
            this.setWH(this.width, height);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "right", {
        get: function () {
            return this._right;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "bottom", {
        get: function () {
            return this._bottom;
        },
        enumerable: false,
        configurable: true
    });
    Rect.fromPool = function () {
        return this.rectPool.getFreeObject();
    };
    Rect.toPool = function (obj) {
        return Rect.rectPool.releaseObject(obj);
    };
    Rect.prototype.setXYWH = function (x, y, width, height) {
        if ( true &&
            ((0,object/* isNotNumber */.iy)(x) ||
                (0,object/* isNotNumber */.iy)(y) ||
                (0,object/* isNotNumber */.iy)(width) ||
                (0,object/* isNotNumber */.iy)(height))) {
            throw new debugError/* DebugError */.N("Rect: wrong numeric arguments ".concat(x, ",").concat(y, ",").concat(width, ",").concat(height));
        }
        var changed = this._x !== x || this._y !== y || this._width !== width || this._height !== height;
        if (changed) {
            this._x = x;
            this._y = y;
            this._width = width;
            this._height = height;
            this._right = x + width;
            this._bottom = y + height;
            this._arr[0] = x;
            this._arr[1] = y;
            this._arr[2] = width;
            this._arr[3] = height;
            this.triggerObservable();
        }
        return this;
    };
    Rect.prototype.setXY = function (x, y) {
        this.setXYWH(x, y, this._width, this._height);
        return this;
    };
    Rect.prototype.setWH = function (width, height) {
        this.setXYWH(this._x, this._y, width, height);
        return this;
    };
    Rect.prototype.setFrom = function (another) {
        this.setXYWH(another.x, another.y, another.width, another.height);
        return this;
    };
    Rect.prototype.setSize = function (s) {
        this.setWH(s.width, s.height);
        return this;
    };
    Rect.prototype.setPoint = function (p) {
        this.setXY(p.x, p.y);
        return this;
    };
    Rect.prototype.setPointAndSize = function (p, size) {
        this.setPoint(p);
        this.setSize(size);
        return this;
    };
    Rect.prototype.addXY = function (x, y) {
        this.setXY(this._x + x, this._y + y);
        return this;
    };
    Rect.prototype.addWH = function (width, height) {
        this.setWH(this._width + width, this._height + height);
        return this;
    };
    Rect.prototype.addPoint = function (another) {
        this.addXY(another.x, another.y);
        return this;
    };
    Rect.prototype.isZeroSize = function () {
        return this._width === 0 || this._height === 0;
    };
    Rect.prototype.clone = function () {
        return new Rect(this._x, this._y, this._width, this._height);
    };
    Rect.prototype.toJSON = function () {
        return {
            x: this._x,
            y: this._y,
            width: this._width,
            height: this._height
        };
    };
    Rect.prototype.toArray = function () {
        return this._arr;
    };
    Rect.rectPool = new objectPool/* ObjectPool */.L(Rect);
    return Rect;
}(observableEntity/* ObservableEntity */.R));

;// CONCATENATED MODULE: ./engine/core/baseModel.ts




var BaseModel = (function () {
    function BaseModel(game) {
        var _this = this;
        this.game = game;
        this.size = new geometry_size/* Size */.$();
        this.pos = new Point3d(0, 0, 0);
        this._destRect = new Rect();
        this._dirtyDestRect = true;
        if ( true && !game)
            throw new debugError/* DebugError */.N("can not create model '".concat(this.type, "': game instance is not passed to model constructor"));
        this.pos.observe(function () { return _this._dirtyDestRect = true; });
        this.size.observe(function () { return _this._dirtyDestRect = true; });
    }
    BaseModel.prototype.getDestRect = function () {
        if (this._dirtyDestRect) {
            this._destRect.setXYWH(this.pos.x, this.pos.y, this.size.width, this.size.height);
            this._dirtyDestRect = false;
        }
        return this._destRect;
    };
    return BaseModel;
}());


;// CONCATENATED MODULE: ./engine/renderable/_helper/getScreenCoords.ts



var Vec4Holder = Vec4.Vec4Holder;
var out = [undefined, undefined, undefined, undefined];
var getScreenCoords = function (obj) {
    var modelRect = Rect.fromPool();
    var pointBottomRight = Vec4Holder.fromPool();
    pointBottomRight.set(obj.size.width, obj.size.height, 0, 1);
    var pointBottomRightTransformation = Vec4Holder.fromPool();
    Mat4.multVecByMatrix(pointBottomRightTransformation, obj.worldTransformMatrix, pointBottomRight);
    var pointTopRight = Vec4Holder.fromPool();
    pointTopRight.set(obj.size.width, 0, 0, 1);
    var pointTopRightTransformation = Vec4Holder.fromPool();
    Mat4.multVecByMatrix(pointTopRightTransformation, obj.worldTransformMatrix, pointTopRight);
    var pointTopLeft = Vec4Holder.fromPool();
    pointTopLeft.set(0, 0, 0, 1);
    var pointTopLeftTransformation = Vec4Holder.fromPool();
    Mat4.multVecByMatrix(pointTopLeftTransformation, obj.worldTransformMatrix, pointTopLeft);
    var pointBottomLeft = Vec4Holder.fromPool();
    pointBottomLeft.set(0, obj.size.height, 0, 1);
    var pointBottomLeftTransformation = Vec4Holder.fromPool();
    Mat4.multVecByMatrix(pointBottomLeftTransformation, obj.worldTransformMatrix, pointBottomLeft);
    out[0] = pointTopLeftTransformation.vec4;
    out[1] = pointTopRightTransformation.vec4;
    out[2] = pointBottomRightTransformation.vec4;
    out[3] = pointBottomLeftTransformation.vec4;
    Rect.toPool(modelRect);
    Vec4Holder.toPool(pointBottomRight);
    Vec4Holder.toPool(pointBottomRightTransformation);
    Vec4Holder.toPool(pointTopRight);
    Vec4Holder.toPool(pointTopRightTransformation);
    Vec4Holder.toPool(pointTopLeft);
    Vec4Holder.toPool(pointTopLeftTransformation);
    Vec4Holder.toPool(pointBottomLeft);
    Vec4Holder.toPool(pointBottomLeftTransformation);
    return out;
};

;// CONCATENATED MODULE: ./engine/renderable/abstract/transformableModel.ts






var Mat16Holder = Mat4.Mat16Holder;


var AnglePoint3d = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(AnglePoint3d, _super);
    function AnglePoint3d(m, zProperty) {
        var _this = _super.call(this) || this;
        _this.m = m;
        _this.zProperty = zProperty;
        _this._x = 0;
        _this._y = 0;
        _this._z = 0;
        return _this;
    }
    Object.defineProperty(AnglePoint3d.prototype, "z", {
        get: function () {
            return this._z;
        },
        set: function (val) {
            if (val !== this.m[this.zProperty]) {
                this.m[this.zProperty] = val;
                this.triggerObservable();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnglePoint3d.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            if (this._x !== value) {
                this._x = value;
                this.triggerObservable();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnglePoint3d.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            if (this._y !== value) {
                this._y = value;
                this.triggerObservable();
            }
        },
        enumerable: false,
        configurable: true
    });
    AnglePoint3d.prototype.setXYZ = function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    };
    AnglePoint3d.prototype._setZSilently = function (val) {
        this._z = val;
    };
    AnglePoint3d.prototype.clone = function (m) {
        var a = new AnglePoint3d(m, this.zProperty);
        a._x = this._x;
        a._y = this._y;
        a.z = this.z;
        return a;
    };
    return AnglePoint3d;
}(observableEntity/* ObservableEntity */.R));
var ModelPoint2d = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(ModelPoint2d, _super);
    function ModelPoint2d(model) {
        var _this = _super.call(this) || this;
        _this.model = model;
        return _this;
    }
    ModelPoint2d.prototype.setToCenter = function () {
        this.model.revalidate();
        if ( true && !(this.model.size.width && this.model.size.height))
            throw new debugError/* DebugError */.N("can not set anchor to center: width or height of transformable object is not set");
        this.setXY(this.model.size.width / 2, this.model.size.height / 2);
    };
    return ModelPoint2d;
}(Point2d));
var TransformableModel = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(TransformableModel, _super);
    function TransformableModel(game) {
        var _this = _super.call(this, game) || this;
        _this.worldTransformMatrix = new Mat16Holder();
        _this.modelViewMatrix = new Mat16Holder();
        _this.worldTransformDirty = true;
        _this._children = [];
        _this.scale = new Point3d(1, 1, 1);
        _this.skew = new Point2d(0, 0);
        _this.anchorPoint = new ModelPoint2d(_this);
        _this.transformPoint = new ModelPoint2d(_this);
        _this.angle3d = new AnglePoint3d(_this, 'angle');
        _this.billBoard = false;
        _this._angleVelocity3d = new AnglePoint3d(_this, 'angleVelocity');
        _this._angle = 0;
        var observer = function () { return _this.worldTransformDirty = true; };
        _this.pos.observe(observer);
        _this.size.observe(observer);
        _this.scale.observe(observer);
        _this.skew.observe(observer);
        _this.transformPoint.observe(observer);
        _this.anchorPoint.observe(observer);
        _this.angle3d.observe(observer);
        return _this;
    }
    Object.defineProperty(TransformableModel.prototype, "angle", {
        get: function () {
            return this._angle;
        },
        set: function (val) {
            if (this._angle === val)
                return;
            this.worldTransformDirty = true;
            this._angle = val;
            this.angle3d._setZSilently(val);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TransformableModel.prototype, "angleVelocity", {
        get: function () {
            return this._angleVelocity3d.z;
        },
        set: function (val) {
            this._angleVelocity3d._setZSilently(val);
        },
        enumerable: false,
        configurable: true
    });
    TransformableModel.prototype._translate = function () {
        var renderer = this.game.getRenderer();
        renderer.transformTranslate(this.pos.x - this.anchorPoint.x + this.transformPoint.x, this.pos.y - this.anchorPoint.y + this.transformPoint.y, this.pos.z);
    };
    TransformableModel.prototype._transform = function () {
        var renderer = this.game.getRenderer();
        renderer.transformRotateX(this.angle3d.x);
        renderer.transformRotateY(this.angle3d.y);
        renderer.transformRotateZ(this.angle3d.z);
        var scaleArr = this.scale.toArray();
        renderer.transformScale(scaleArr[0], scaleArr[1], scaleArr[2]);
        renderer.transformSkewX(this.skew.x);
        renderer.transformSkewY(this.skew.y);
        renderer.transformTranslate(-this.transformPoint.x, -this.transformPoint.y, 0);
        if (this.billBoard)
            renderer.transformRotationReset();
    };
    TransformableModel.prototype.setProps = function (props) {
        if (props.pos !== undefined)
            this.pos.setFrom(props.pos);
        if (props.size !== undefined)
            this.size.setFrom(props.size);
        if (props.scale !== undefined)
            this.scale.setFrom(props.scale);
        if (props.anchorPoint !== undefined)
            this.anchorPoint.setFrom(props.anchorPoint);
        if (props.transformPoint !== undefined)
            this.transformPoint.setFrom(props.transformPoint);
    };
    TransformableModel.prototype.getScreenCoords = function () {
        return getScreenCoords(this);
    };
    TransformableModel.prototype.setClonedProperties = function (cloned) {
        cloned.angle = this.angle;
        cloned.angleVelocity = this.angleVelocity;
        cloned.pos.setFrom(this.pos);
        cloned.scale.setFrom(this.scale);
        cloned.anchorPoint.setFrom(this.anchorPoint);
        cloned.skew.setFrom(this.skew);
        cloned.transformPoint.setFrom(this.transformPoint);
        var angle3dCloned = this.angle3d.clone(this);
        cloned.angle3d.x = angle3dCloned.x;
        cloned.angle3d.y = angle3dCloned.y;
        cloned.angle3d.z = angle3dCloned.z;
    };
    return TransformableModel;
}(BaseModel));


;// CONCATENATED MODULE: ./engine/delegates/eventDelegates/mouseEventEmitterDelegate.ts



var MouseEventEmitterDelegate = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(MouseEventEmitterDelegate, _super);
    function MouseEventEmitterDelegate(game, model) {
        var _this = _super.call(this, game) || this;
        _this.model = model;
        return _this;
    }
    MouseEventEmitterDelegate.prototype.on = function (eventName, callBack) {
        if (true) {
            if (!this.game.hasControl('MouseControl'))
                throw new debugError/* DebugError */.N(getControlErrorMessage('mouse', 'MouseControl'));
        }
        this.model.interactive = true;
        return _super.prototype.on.call(this, eventName, callBack);
    };
    return MouseEventEmitterDelegate;
}(EventEmitterDelegate));


;// CONCATENATED MODULE: ./engine/renderable/abstract/renderableModel.ts











var EMPTY_FILTERS_ARR = [];
var RenderableModel = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(RenderableModel, _super);
    function RenderableModel(game) {
        var _this = _super.call(this, game) || this;
        _this.id = "object_".concat(Incrementer.getValue());
        _this.alpha = 1;
        _this.visible = true;
        _this.blendMode = 0;
        _this.depthTest = false;
        _this.filters = [];
        _this.forceDrawChildrenOnNewSurface = false;
        _this.mouseEventHandler = new MouseEventEmitterDelegate(_this.game, _this);
        _this.dragEventHandler = new EventEmitterDelegate(_this.game);
        _this.velocity = new Point2d(0, 0);
        _this.interactive = false;
        _this._behaviours = [];
        _this._propertyAnimations = [];
        _this._destroyed = false;
        _this._tweenDelegate = new TweenableDelegate(_this.game);
        _this._timerDelegate = new TimerDelegate(_this.game);
        _this.tsxEvents = {};
        _this.memoizeCache = {};
        _this._parentChildDelegate = new ParentChildDelegate(_this);
        _this._parentChildDelegate.afterChildAppended = function (child) {
            child._setLayer(_this._layer);
            child._setScene(_this._scene);
            child.revalidate();
        };
        _this._parentChildDelegate.afterChildRemoved = function (child) {
            child._setLayer(undefined);
            child._setScene(undefined);
        };
        return _this;
    }
    RenderableModel.prototype.getMemoizedView = function (factory) {
        var _a;
        var _b, _c;
        var model = factory();
        (_a = (_b = this.memoizeCache)[_c = model.id]) !== null && _a !== void 0 ? _a : (_b[_c] = model.clone());
        return this.memoizeCache[model.id];
    };
    RenderableModel.prototype.revalidate = function () {
        for (var _i = 0, _a = this._behaviours; _i < _a.length; _i++) {
            var b = _a[_i];
            b.revalidate();
        }
    };
    RenderableModel.prototype.getLayer = function () {
        return this._layer;
    };
    RenderableModel.prototype._setLayer = function (value) {
        this._layer = value;
    };
    RenderableModel.prototype.getScene = function () {
        return this._scene;
    };
    RenderableModel.prototype._setScene = function (value) {
        this._scene = value;
    };
    RenderableModel.prototype.addBehaviour = function (b) {
        this._behaviours.push(b);
        b.manage(this);
    };
    RenderableModel.prototype.addPropertyAnimation = function (animation) {
        animation._target = this;
        this._propertyAnimations.push(animation);
    };
    RenderableModel.prototype.getChildrenCount = function () {
        return this._children.length;
    };
    RenderableModel.prototype.getChildAt = function (index) {
        return this._children[index];
    };
    RenderableModel.prototype.setPosAndSize = function (x, y, w, h) {
        this.pos.setXY(x, y);
        this.size.setWH(w, h);
    };
    RenderableModel.prototype.setRigidBody = function (rigidBody) {
        this._rigidBody = rigidBody;
        rigidBody.setBoundsAndObserveModel(this);
    };
    RenderableModel.prototype.getRigidBody = function (type) {
        var body = this._rigidBody;
        if (type === undefined)
            return body;
        if (true) {
            if (body.constructor !== type) {
                throw new debugError/* DebugError */.N("can not get rigid body with type \"".concat(type.name, " - current rigid body is of type \"").concat(body.constructor.name, "\""));
            }
        }
        return body;
    };
    RenderableModel.prototype.destroy = function () {
        if (this._destroyed) {
            return;
        }
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var c = _a[_i];
            c.destroy();
        }
        this._destroyed = true;
        for (var _b = 0, _c = this._behaviours; _b < _c.length; _b++) {
            var b = _c[_b];
            b.destroy();
        }
        this.game.getRenderer().killObject(this);
    };
    RenderableModel.prototype.isDestroyed = function () {
        return this._destroyed;
    };
    RenderableModel.prototype.update = function () {
        if (this._rigidBody !== undefined) {
            this._rigidBody.nextTick();
        }
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var c = _a[_i];
            c.update();
        }
    };
    RenderableModel.prototype.render = function () {
        if ( true && this._destroyed) {
            console.error(this);
            throw new debugError/* DebugError */.N("can not render destroyed object");
        }
        this._tweenDelegate.update();
        this._timerDelegate.update();
        for (var _i = 0, _a = this._behaviours; _i < _a.length; _i++) {
            var bh = _a[_i];
            bh.update();
        }
        for (var _b = 0, _c = this._propertyAnimations; _b < _c.length; _b++) {
            var pa = _c[_b];
            pa.update();
        }
        if (!this.visible)
            return;
        if (this.scale.equals(0))
            return;
        if (this.alpha === 0)
            return;
        var delta = this.game.getDeltaTime();
        var dSeconds = delta / 1000;
        if (this._rigidBody === undefined) {
            if (this.velocity.x !== 0)
                this.pos.x += this.velocity.x * dSeconds;
            if (this.velocity.y !== 0)
                this.pos.y += this.velocity.y * dSeconds;
        }
        if (this._angleVelocity3d.x !== 0)
            this.angle3d.x += this._angleVelocity3d.x * dSeconds;
        if (this._angleVelocity3d.y !== 0)
            this.angle3d.y += this._angleVelocity3d.y * dSeconds;
        if (this._angleVelocity3d.z !== 0)
            this.angle3d.z += this._angleVelocity3d.z * dSeconds;
        if (this._scene === undefined)
            this._scene = Scene._currentRenderingScene;
        if (this._layer === undefined)
            this._layer = this._scene._renderingSessionInfo.currentLayer;
        if (this.interactive && this._scene._renderingSessionInfo.drawingStackEnabled) {
            this._scene._renderingObjectStack.add(this, this._scene._renderingSessionInfo.currentConstrainObjects);
        }
        var renderer = this.game.getRenderer();
        renderer.transformSave();
        if (this._scene.camera.worldTransformDirty)
            this.worldTransformDirty = true;
        if (this.worldTransformDirty) {
            this._translate();
            this._transform();
            this.worldTransformMatrix.fromMat16(renderer.transformGet());
        }
        else {
            renderer.transformSet(this.worldTransformMatrix);
        }
        var filters = this._scene._renderingSessionInfo.drawingEnabled ? this.filters : EMPTY_FILTERS_ARR;
        var statePointer = renderer.beforeItemStackDraw(filters, this.getChildrenCount() === 0 ? 1 : this.alpha, this.forceDrawChildrenOnNewSurface);
        if (this._scene._renderingSessionInfo.drawingEnabled)
            this.draw();
        for (var _d = 0, _e = this._children; _d < _e.length; _d++) {
            var c = _e[_d];
            c.worldTransformDirty = this.worldTransformDirty || c.worldTransformDirty;
            c.render();
        }
        renderer.afterItemStackDraw(statePointer);
        renderer.transformRestore();
        this.worldTransformDirty = false;
        if ( true && this._rigidBody !== undefined)
            this._rigidBody.debugRender();
    };
    RenderableModel.prototype.addTween = function (t) {
        this._tweenDelegate.addTween(t);
    };
    RenderableModel.prototype.addTweenMovie = function (tm) {
        this._tweenDelegate.addTweenMovie(tm);
    };
    RenderableModel.prototype.tween = function (desc) {
        return this._tweenDelegate.tween(desc);
    };
    RenderableModel.prototype.setTimeout = function (callback, interval) {
        return this._timerDelegate.setTimeout(callback, interval);
    };
    RenderableModel.prototype.setInterval = function (callback, interval) {
        return this._timerDelegate.setInterval(callback, interval);
    };
    RenderableModel.prototype.appendChild = function (newChild) {
        this._parentChildDelegate.appendChild(newChild);
    };
    RenderableModel.prototype.appendChildAt = function (newChild, index) {
        this._parentChildDelegate.appendChildAt(newChild, index);
    };
    RenderableModel.prototype.appendChildAfter = function (modelAfter, newChild) {
        this._parentChildDelegate.appendChildAfter(modelAfter, newChild);
    };
    RenderableModel.prototype.appendChildBefore = function (modelBefore, newChild) {
        this._parentChildDelegate.appendChildBefore(modelBefore, newChild);
    };
    RenderableModel.prototype.prependChild = function (newChild) {
        this._parentChildDelegate.prependChild(newChild);
    };
    RenderableModel.prototype.appendTo = function (parent) {
        parent.appendChild(this);
    };
    RenderableModel.prototype.prependTo = function (parent) {
        parent.prependChild(this);
    };
    RenderableModel.prototype.removeChild = function (c) {
        this._parentChildDelegate.removeChild(c);
    };
    RenderableModel.prototype.removeChildAt = function (i) {
        this._parentChildDelegate.removeChildAt(i);
    };
    RenderableModel.prototype.removeChildren = function () {
        this._parentChildDelegate.removeChildren();
    };
    RenderableModel.prototype.getParentNode = function () {
        return undefined;
    };
    RenderableModel.prototype.removeSelf = function () {
        this._parentChildDelegate.removeSelf();
    };
    RenderableModel.prototype.moveToFront = function () {
        this._parentChildDelegate.moveToFront();
    };
    RenderableModel.prototype.moveToBack = function () {
        this._parentChildDelegate.moveToBack();
    };
    RenderableModel.prototype.findChildById = function (id) {
        return this._parentChildDelegate.findChildById(id);
    };
    RenderableModel.prototype.replaceChild = function (c, newChild) {
        this._parentChildDelegate.replaceChild(c, newChild);
    };
    RenderableModel.prototype.getParent = function () {
        return this.parent || this._layer;
    };
    RenderableModel.prototype.renderToTexture = function (target, clear) {
        if (clear === void 0) { clear = false; }
        this.worldTransformDirty = true;
        this.game.getRenderer().getHelper().renderModelToTexture(this, target, clear);
        this.worldTransformDirty = true;
    };
    RenderableModel.prototype.isDetached = function () {
        return this._scene === undefined;
    };
    RenderableModel.prototype.setProps = function (props) {
        if (props.id !== undefined)
            this.id = props.id;
        if (props.alpha !== undefined)
            this.alpha = props.alpha;
        if (props.filters !== undefined)
            this.filters = props.filters;
        if (props.click !== undefined && this.tsxEvents.click !== props.click) {
            if (this.tsxEvents.click !== undefined)
                this.mouseEventHandler.off("click", this.tsxEvents.click);
            this.mouseEventHandler.on("click", props.click);
            this.tsxEvents.click = props.click;
        }
        if (props.mouseUp !== undefined && this.tsxEvents.mouseUp !== props.mouseUp) {
            if (this.tsxEvents.mouseUp !== undefined)
                this.mouseEventHandler.off("mouseUp", this.tsxEvents.mouseUp);
            this.mouseEventHandler.on("mouseUp", props.mouseUp);
            this.tsxEvents.mouseUp = props.mouseUp;
        }
        if (props.mouseLeave !== undefined && this.tsxEvents.mouseLeave !== props.mouseLeave) {
            if (this.tsxEvents.mouseLeave !== undefined)
                this.mouseEventHandler.off("mouseLeave", this.tsxEvents.mouseLeave);
            this.mouseEventHandler.on("mouseLeave", props.mouseLeave);
            this.tsxEvents.mouseLeave = props.mouseLeave;
        }
        _super.prototype.setProps.call(this, props);
    };
    RenderableModel.prototype.setClonedProperties = function (cloned) {
        cloned.size.setFrom(this.size);
        cloned.alpha = this.alpha;
        cloned.blendMode = this.blendMode;
        cloned.visible = this.visible;
        cloned.depthTest = this.depthTest;
        cloned.filters = (0,tslib_es6/* __spreadArray */.ev)([], this.filters, true);
        cloned.forceDrawChildrenOnNewSurface = this.forceDrawChildrenOnNewSurface;
        cloned.velocity.setFrom(this.velocity);
        if (this.getRigidBody() !== undefined)
            cloned.setRigidBody(this.getRigidBody().clone());
        this._behaviours.forEach(function (b) {
            cloned.addBehaviour(b.clone());
        });
        this._children.forEach(function (c) {
            if ( true && !('clone' in c)) {
                console.error(c);
                throw new debugError/* DebugError */.N("can not clone object: cloneable interface is not implemented");
            }
            var clonedChildren = c.clone();
            cloned.appendChild(clonedChildren);
        });
        cloned.game = this.game;
        _super.prototype.setClonedProperties.call(this, cloned);
    };
    return RenderableModel;
}(TransformableModel));


;// CONCATENATED MODULE: ./engine/renderable/abstract/shape.ts



var Shape = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(Shape, _super);
    function Shape(game) {
        var _this = _super.call(this, game) || this;
        _this.color = Color.BLACK.clone();
        _this._lineWidth = 0;
        _this.fillColor = Color.GREY.clone();
        return _this;
    }
    Object.defineProperty(Shape.prototype, "lineWidth", {
        get: function () {
            return this._lineWidth;
        },
        set: function (value) {
            this._lineWidth = value;
        },
        enumerable: false,
        configurable: true
    });
    Shape.prototype.setProps = function (props) {
        _super.prototype.setProps.call(this, props);
        if (props.color !== undefined) {
            this.color.setRGBA(props.color.r, props.color.g, props.color.b, props.color.a);
        }
        if (props.fillColor !== undefined) {
            this.fillColor.setRGBA(props.fillColor.r, props.fillColor.g, props.fillColor.b, props.fillColor.a);
        }
        if (props.lineWidth !== undefined)
            this._lineWidth = props.lineWidth;
    };
    Shape.prototype.setClonedProperties = function (cloned) {
        cloned.color.setFrom(this.color);
        cloned._lineWidth = this._lineWidth;
        cloned.fillColor = this.fillColor.clone();
        cloned.filters = (0,tslib_es6/* __spreadArray */.ev)([], this.filters, true);
        _super.prototype.setClonedProperties.call(this, cloned);
    };
    return Shape;
}(RenderableModel));


;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/rectangle.ts


var Rectangle = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(Rectangle, _super);
    function Rectangle(game) {
        var _this = _super.call(this, game) || this;
        _this.type = 'Rectangle';
        _this.borderRadius = 0;
        _this.size.setWH(16);
        _this.lineWidth = 1;
        return _this;
    }
    Rectangle.prototype.draw = function () {
        this.game.getRenderer().drawRectangle(this);
    };
    Rectangle.prototype.clone = function () {
        var cloned = new Rectangle(this.game);
        this.setClonedProperties(cloned);
        return cloned;
    };
    Rectangle.prototype.setProps = function (props) {
        _super.prototype.setProps.call(this, props);
        if (props.borderRadius !== undefined)
            this.borderRadius = props.borderRadius;
    };
    Rectangle.prototype.setClonedProperties = function (cloned) {
        cloned.borderRadius = this.borderRadius;
        cloned.size.setFrom(this.size);
        cloned.lineWidth = this.lineWidth;
        if (this.fillGradient !== undefined)
            cloned.fillGradient = this.fillGradient.clone();
        _super.prototype.setClonedProperties.call(this, cloned);
    };
    return Rectangle;
}(Shape));


;// CONCATENATED MODULE: ./engine/scene/internal/renderingObjectStack.ts



var RenderingObjectStackItem = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(RenderingObjectStackItem, _super);
    function RenderingObjectStackItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.constrainObjects = [];
        return _this;
    }
    return RenderingObjectStackItem;
}(releaseableEntity/* ReleaseableEntity */.c));

var pool = new objectPool/* ObjectPool */.L(RenderingObjectStackItem, Infinity);
var RenderingObjectStack = (function () {
    function RenderingObjectStack() {
        this.stack = [];
    }
    RenderingObjectStack.prototype.clear = function () {
        for (var _i = 0, _a = this.stack; _i < _a.length; _i++) {
            var item = _a[_i];
            item.constrainObjects.length = 0;
            item.release();
        }
        this.stack.length = 0;
    };
    RenderingObjectStack.prototype.add = function (obj, constrainObjects) {
        var _a;
        var stackItem = pool.getFreeObject();
        stackItem.obj = obj;
        if (constrainObjects.length > 0)
            (_a = stackItem.constrainObjects).push.apply(_a, constrainObjects);
        this.stack.push(stackItem);
    };
    RenderingObjectStack.prototype.get = function () {
        return this.stack;
    };
    return RenderingObjectStack;
}());


;// CONCATENATED MODULE: ./engine/scene/internal/renderingSessionInfo.ts
var RenderingSessionInfo = (function () {
    function RenderingSessionInfo() {
        this.drawingEnabled = true;
        this.drawingStackEnabled = true;
        this.currentConstrainObjects = [];
    }
    return RenderingSessionInfo;
}());


;// CONCATENATED MODULE: ./engine/misc/math/mathEx.ts

var MathEx;
(function (MathEx) {
    MathEx.isPointInRect = function (point, rect) {
        return point.x > rect.x &&
            point.x < (rect.x + rect.width) &&
            point.y > rect.y &&
            point.y < (rect.y + rect.height);
    };
    MathEx.clamp = function (val, min, max) {
        if (val < min)
            val = min;
        else if (val > max)
            val = max;
        return val;
    };
    MathEx.overlapTest = function (a, b) {
        return (a.x < b.right) &&
            (a.right > b.x) &&
            (a.y < b.bottom) &&
            (a.bottom > b.y);
    };
    MathEx.radToDeg = function (rad) {
        return rad * 180 / Math.PI;
    };
    MathEx.degToRad = function (deg) {
        return deg * Math.PI / 180;
    };
    MathEx.rectToPolar = function (point, center) {
        var radius = Math.sqrt(point.x * point.x + center.y * center.y);
        var angle = Math.atan2(center.y - point.y, center.x - point.x);
        return { radius: radius, angle: angle };
    };
    MathEx.polarToRect = function (radius, angle, center) {
        var x = radius * Math.cos(angle);
        var y = radius * Math.sin(angle);
        return new Point2d(center.x - x, center.y - y);
    };
    MathEx.getDistanceSquared = function (p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    };
    MathEx.closeTo = function (a, b, epsilon) {
        if (epsilon === void 0) { epsilon = 0.01; }
        return Math.abs(a - b) <= epsilon;
    };
    MathEx.getDistance = function (p1, p2) {
        return Math.sqrt(MathEx.getDistanceSquared(p1, p2));
    };
    MathEx.getAngle = function (p1, p2) {
        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;
        return Math.atan2(dy, dx);
    };
    MathEx.random = function (min, max) {
        if (min > max) {
            var tmp = min;
            min = max;
            max = tmp;
        }
        return Math.random() * (max - min) + min;
    };
    MathEx.randomInt = function (min, max) {
        return ~~MathEx.random(min, max + 1);
    };
    MathEx.randomUint8 = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 255; }
        return MathEx.randomInt(min, max);
    };
})(MathEx || (MathEx = {}));

;// CONCATENATED MODULE: ./engine/renderer/camera/follow/scrollFollowStrategy.ts
var clampCameraPos = function (pos, sceneSize, gameSize) {
    if (pos.x < 0) {
        pos.x = 0;
    }
    if (pos.y < 0) {
        pos.y = 0;
    }
    if (pos.x > sceneSize.width - gameSize.width) {
        pos.x = sceneSize.width - gameSize.width;
    }
    if (pos.y > sceneSize.height - gameSize.height) {
        pos.y = sceneSize.height - gameSize.height;
    }
};
var ScrollFollowStrategy = (function () {
    function ScrollFollowStrategy(game) {
        this.game = game;
    }
    ScrollFollowStrategy.prototype.init = function (targetObject, camera) {
        this.targetObject = targetObject;
        this.camera = camera;
        if (targetObject !== undefined) {
            this.camera.pos.setXY(targetObject.pos.x - this.game.width / 2, targetObject.pos.y - this.game.height / 2);
            var scene = this.game.getCurrentScene();
            clampCameraPos(camera.pos, scene.size, this.game.size);
        }
    };
    ScrollFollowStrategy.prototype.update = function () {
        var targetObject = this.targetObject;
        if (targetObject !== undefined) {
            var w = this.game.size.width;
            var h = this.game.size.height;
            var wDiv2 = w / 2;
            var hDiv2 = h / 2;
            var scene = this.game.getCurrentScene();
            var pos = this.camera.pos;
            var lerp = 0.05;
            pos.x += (targetObject.pos.x - wDiv2 - pos.x) * lerp;
            pos.y += (targetObject.pos.y - hDiv2 - pos.y) * lerp;
            clampCameraPos(pos, scene.size, this.game.size);
        }
    };
    return ScrollFollowStrategy;
}());


;// CONCATENATED MODULE: ./engine/renderer/camera/camera.ts







var camera_Mat16Holder = Mat4.Mat16Holder;
var Camera = (function () {
    function Camera(game, scene) {
        var _this = this;
        this.game = game;
        this.scene = scene;
        this.pos = new Point3d(0, 0, 0);
        this.scale = new Point2d(1, 1);
        this.worldTransformDirty = true;
        this.worldTransformMatrix = new camera_Mat16Holder();
        this._angle = 0;
        this._rect = new Rect();
        this._followStrategy = new ScrollFollowStrategy(this.game);
        var observer = function () { return _this.worldTransformDirty = true; };
        this.pos.observe(observer);
        this.scale.observe(observer);
        this._rect.observe(observer);
        Mat4.makeIdentity(this.worldTransformMatrix);
        this.revalidate();
    }
    Object.defineProperty(Camera.prototype, "angle", {
        get: function () {
            return this._angle;
        },
        set: function (value) {
            if (this._angle === value)
                return;
            this.worldTransformDirty = true;
            this._angle = value;
        },
        enumerable: false,
        configurable: true
    });
    Camera.prototype.revalidate = function () {
        this._rect.setSize(this.game.size);
        this.worldTransformDirty = true;
    };
    Camera.prototype.followTo = function (gameObject) {
        if (gameObject === undefined) {
            this._objFollowTo = undefined;
            this._followStrategy.init(undefined, this);
            return;
        }
        this._objFollowTo = gameObject;
        this._followStrategy.init(gameObject, this);
        this.revalidate();
    };
    Camera.prototype.update = function () {
        this._followStrategy.update();
        if (this._cameraShakeTween !== undefined)
            this._cameraShakeTween.update();
    };
    Camera.prototype.shake = function (amplitude, time) {
        var _this = this;
        var tweenTarget = { time: 0, point: new Point2d() };
        this._cameraShakeTween = new Tween(this.game, {
            target: tweenTarget,
            time: time,
            to: { time: time },
            progress: function () {
                var r1 = MathEx.random(-amplitude / 2, amplitude / 2);
                var r2 = MathEx.random(-amplitude / 2, amplitude / 2);
                tweenTarget.point.setXY(r1, r2);
            },
            complete: function () { return _this._cameraShakeTween = undefined; }
        });
    };
    Camera.prototype._translate = function () {
        var renderer = this.game.getRenderer();
        renderer.transformTranslate(-this.pos.x, -this.pos.y, -this.pos.z);
    };
    Camera.prototype._transform = function () {
        var renderer = this.game.getRenderer();
        var needTransform = this.angle !== 0 || !this.scale.equals(1);
        if (needTransform) {
            renderer.transformTranslate(this.game.size.width / 2, this.game.size.height / 2, 0);
            renderer.transformRotateZ(this.angle);
            renderer.transformScale(this.scale.x, this.scale.y);
            renderer.transformTranslate(-this.game.size.width / 2, -this.game.size.height / 2, 0);
        }
        if (this._cameraShakeTween !== undefined)
            renderer.transformTranslate(this._cameraShakeTween.getTarget().point.x, this._cameraShakeTween.getTarget().point.y, 0);
    };
    Camera.prototype.screenToWorld = function (p) {
        return Mat4.unproject(p.x, p.y, this.worldTransformMatrix);
    };
    return Camera;
}());


;// CONCATENATED MODULE: ./engine/delegates/eventDelegates/keyboardEventEmitterDelegate.ts



var KeyboardEventEmitterDelegate = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(KeyboardEventEmitterDelegate, _super);
    function KeyboardEventEmitterDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KeyboardEventEmitterDelegate.prototype.on = function (eventName, callBack) {
        if (true) {
            if (!this.game.hasControl('KeyboardControl'))
                throw new debugError/* DebugError */.N(getControlErrorMessage('keyboard', 'KeyboardControl'));
        }
        return _super.prototype.on.call(this, eventName, callBack);
    };
    KeyboardEventEmitterDelegate.prototype.onKeyPressed = function (key, callBack) {
        return this.on("keyPressed", function (e) {
            if (e.button === key)
                callBack(e);
        });
    };
    KeyboardEventEmitterDelegate.prototype.offKeyPressed = function (callBack) {
        this.off("keyPressed", callBack);
    };
    KeyboardEventEmitterDelegate.prototype.onKeyHold = function (key, callBack) {
        return this.on("keyHold", function (e) {
            if (e.button === key)
                callBack(e);
        });
    };
    KeyboardEventEmitterDelegate.prototype.offKeyHold = function (callBack) {
        this.off("keyHold", callBack);
    };
    KeyboardEventEmitterDelegate.prototype.onKeyReleased = function (key, callBack) {
        return this.on("keyReleased", function (e) {
            if (e.button === key)
                callBack(e);
        });
    };
    KeyboardEventEmitterDelegate.prototype.offKeyReleased = function (callBack) {
        this.off("keyReleased", callBack);
    };
    return KeyboardEventEmitterDelegate;
}(EventEmitterDelegate));


;// CONCATENATED MODULE: ./engine/delegates/eventDelegates/gamepadEventEmitterDelegate.ts



var GamepadEventEmitterDelegate = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(GamepadEventEmitterDelegate, _super);
    function GamepadEventEmitterDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamepadEventEmitterDelegate.prototype.on = function (eventName, callBack) {
        if (true) {
            if (!this.game.hasControl('GamePadControl'))
                throw new debugError/* DebugError */.N(getControlErrorMessage('gamepad', 'GamePadControl'));
        }
        return _super.prototype.on.call(this, eventName, callBack);
    };
    return GamepadEventEmitterDelegate;
}(EventEmitterDelegate));


;// CONCATENATED MODULE: ./engine/scene/scene.ts
















var IDENTITY_HOLDER = Mat4.IDENTITY_HOLDER;
var Scene = (function () {
    function Scene(game) {
        this.game = game;
        this.type = "Scene";
        this.backgroundColor = Color.WHITE.clone();
        this.pos = new Point2d();
        this.filters = [];
        this.alpha = 1;
        this.interactive = false;
        this.size = new geometry_size/* Size */.$();
        this.lifeCycleState = 0;
        this.camera = new Camera(this.game, this);
        this.keyboardEventHandler = new KeyboardEventEmitterDelegate(this.game);
        this.gamepadEventHandler = new GamepadEventEmitterDelegate(this.game);
        this.mouseEventHandler = new MouseEventEmitterDelegate(this.game, this);
        this.sceneEventHandler = new EventEmitterDelegate(this.game);
        this._renderingSessionInfo = new RenderingSessionInfo();
        this._layers = [];
        this._propertyAnimations = [];
        this._tweenDelegate = new TweenableDelegate(this.game);
        this._timerDelegate = new TimerDelegate(this.game);
        this._renderingObjectStack = new RenderingObjectStack();
        this.size.setFrom(this.game.size);
    }
    Scene.isLayerGuard = function (modelOrLayer) {
        return modelOrLayer.type === 'Layer';
    };
    Scene.prototype.revalidate = function () {
        if (this.size.isZero())
            this.size.setFrom(this.game.size);
    };
    Scene.prototype.getLayers = function () {
        return this._layers;
    };
    Scene.prototype.getGame = function () {
        return this.game;
    };
    Scene.prototype.getDefaultLayer = function () {
        if (!this._layers.length)
            this.appendChild(new Layer(this.game));
        return this._layers[this._layers.length - 1];
    };
    Scene.prototype.getLayerById = function (id) {
        for (var _i = 0, _a = this._layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (layer.id === id)
                return layer;
        }
        return undefined;
    };
    Scene.prototype.getLayerAtIndex = function (index) {
        return this._layers[index];
    };
    Scene.prototype.removeChild = function (modelOrLayer) {
        if (Scene.isLayerGuard(modelOrLayer)) {
            var i = this._layers.indexOf(modelOrLayer);
            if ( true && i === -1)
                throw new debugError/* DebugError */.N("can not remove layer: is doesn't belong to target scene");
            this._layers.splice(i, 1);
        }
        else {
            this.getDefaultLayer().removeChild(modelOrLayer);
        }
    };
    Scene.prototype.appendChild = function (modelOrLayer) {
        if ( true && !modelOrLayer) {
            throw new debugError/* DebugError */.N("cannot append child, is is ".concat(modelOrLayer));
        }
        if (Scene.isLayerGuard(modelOrLayer)) {
            if ( true && this._layers.indexOf(modelOrLayer) > -1) {
                console.error(modelOrLayer);
                throw new debugError/* DebugError */.N("this layer is already added to this scene");
            }
            modelOrLayer._setScene(this);
            this._layers.push(modelOrLayer);
        }
        else {
            this.getDefaultLayer().appendChild(modelOrLayer);
        }
    };
    Scene.prototype.prependChild = function (modelOrLayer) {
        if (Scene.isLayerGuard(modelOrLayer)) {
            modelOrLayer._setScene(this);
            this._layers.unshift(modelOrLayer);
        }
        else {
            this.getDefaultLayer().prependChild(modelOrLayer);
        }
    };
    Scene.prototype.fitSizeToChildren = function () {
        var maxRight = this.game.size.width;
        var maxBottom = this.game.size.height;
        this._layers.forEach(function (l) {
            l._children.forEach(function (c) {
                var right = c.pos.x + c.size.width;
                var bottom = c.pos.y + c.size.height;
                if (right > maxRight)
                    maxRight = right;
                if (bottom > maxBottom)
                    maxBottom = bottom;
            });
        });
        this.size.setWH(maxRight, maxBottom);
    };
    Scene.prototype.update = function () {
        if (this.lifeCycleState !== 2) {
            if (this.preloadingGameObject !== undefined) {
                this.preloadingGameObject.update();
            }
        }
        else {
            this.updateFrame();
        }
    };
    Scene.prototype.renderToTexture = function (target) {
        this.game.getRenderer().getHelper().renderSceneToTexture(this, target);
    };
    Scene.prototype.addPropertyAnimation = function (animation) {
        this._propertyAnimations.push(animation);
    };
    Scene.prototype.addTween = function (t) {
        this._tweenDelegate.addTween(t);
    };
    Scene.prototype.addTweenMovie = function (tm) {
        this._tweenDelegate.addTweenMovie(tm);
    };
    Scene.prototype.tween = function (desc) {
        return this._tweenDelegate.tween(desc);
    };
    Scene.prototype.setTimeout = function (callback, interval) {
        return this._timerDelegate.setTimeout(callback, interval);
    };
    Scene.prototype.setInterval = function (callback, interval) {
        return this._timerDelegate.setInterval(callback, interval);
    };
    Scene.prototype.findChildById = function (id) {
        for (var _i = 0, _a = this._layers; _i < _a.length; _i++) {
            var l = _a[_i];
            var possibleObject = l.findChildById(id);
            if (possibleObject)
                return possibleObject;
        }
        return undefined;
    };
    Scene.prototype.onPreloading = function (taskQueue) {
        var rect = new Rectangle(this.game);
        rect.fillColor.setRGB(10, 100, 100);
        rect.size.height = 10;
        this.preloadingGameObject = rect;
    };
    Scene.prototype.onProgress = function (val) {
        if (this.preloadingGameObject !== undefined)
            this.preloadingGameObject.size.width = val * this.game.size.width;
    };
    Scene.prototype.onReady = function () { };
    Scene.prototype.onContinue = function () { };
    Scene.prototype.render = function () {
        Scene._currentRenderingScene = this;
        this._renderingObjectStack.clear();
        var renderer = this.game.getRenderer();
        renderer.transformSave();
        renderer.clearColor.setFrom(this.backgroundColor);
        var ptr = renderer.beforeItemStackDraw(this.filters, this.alpha, false);
        renderer.beforeFrameDraw();
        if (this.camera.worldTransformDirty) {
            this.camera._translate();
            this.camera._transform();
            this.camera.worldTransformMatrix.fromMat16(this.game.getRenderer().transformGet());
        }
        else {
            this.game.getRenderer().transformSet(this.camera.worldTransformMatrix);
        }
        if (this.lifeCycleState === 1) {
            if (this.preloadingGameObject !== undefined) {
                this.preloadingGameObject.render();
            }
        }
        else {
            for (var _i = 0, _a = this._layers; _i < _a.length; _i++) {
                var l = _a[_i];
                this._renderingSessionInfo.currentLayer = l;
                var isStuck = l.transformType === 1;
                if (isStuck) {
                    renderer.transformSave();
                    renderer.transformSet(IDENTITY_HOLDER);
                }
                l.render();
                if (isStuck) {
                    renderer.transformRestore();
                }
            }
        }
        renderer.transformSave();
        if (this.lifeCycleState === 2)
            this.onRender();
        renderer.transformRestore();
        renderer.afterItemStackDraw(ptr);
        renderer.afterFrameDraw();
        renderer.transformRestore();
        this.camera.worldTransformDirty = false;
    };
    Scene.prototype.onInactivated = function () { };
    Scene.prototype.onUpdate = function () { };
    Scene.prototype.onRender = function () { };
    Scene.prototype.updateFrame = function () {
        this.camera.update();
        this._tweenDelegate.update();
        this._timerDelegate.update();
        for (var _i = 0, _a = this._propertyAnimations; _i < _a.length; _i++) {
            var a = _a[_i];
            a.update();
        }
        for (var _b = 0, _c = this._layers; _b < _c.length; _b++) {
            var l = _c[_b];
            l.update();
        }
        if (this.game.hasPhysicsSystem())
            this.game.getPhysicsSystem(undefined).nextTick(this);
        this.onUpdate();
    };
    return Scene;
}());


;// CONCATENATED MODULE: ./engine/misc/collection/stack.ts

var Stack = (function () {
    function Stack() {
        this._array = new Array(16);
        this._stackPointer = 0;
    }
    Stack.prototype.push = function (obj) {
        this._array[this._stackPointer++] = obj;
    };
    Stack.prototype.pop = function () {
        if ( true && this._stackPointer === 0)
            throw new debugError/* DebugError */.N("empty stack");
        this._stackPointer--;
        var res = this._array[this._stackPointer];
        this._array[this._stackPointer] = undefined;
        return res;
    };
    Stack.prototype.replaceLast = function (obj) {
        if (!this._array.length)
            this.push(obj);
        else
            this._array[this._stackPointer - 1] = obj;
    };
    Stack.prototype.getLast = function () {
        if (!this._array)
            return undefined;
        else
            return this._array[this._stackPointer - 1];
    };
    Stack.prototype.getAt = function (i) {
        return this._array[i];
    };
    Stack.prototype.size = function () {
        return this._stackPointer;
    };
    Stack.prototype.isEmpty = function () {
        return this._stackPointer === 0;
    };
    return Stack;
}());


;// CONCATENATED MODULE: ./engine/resources/urlLoader.ts

var addUrlParameter = function (url, param, value) {
    if (url.indexOf('?') > -1)
        url += '&';
    else
        url += '?';
    return "".concat(url).concat(param, "=").concat(value);
};
var loadBase64 = function (urlRequest) {
    return Promise.resolve(urlRequest.url);
};
var loadViaXmlHttp = function (urlRequest, onProgress) {
    if (!urlRequest.method)
        urlRequest.method = 'GET';
    var xhr = new XMLHttpRequest();
    xhr.open(urlRequest.method, addUrlParameter(urlRequest.url, 'modified', 1690668626419), true);
    xhr.responseType = urlRequest.responseType;
    if (xhr.responseType === 'blob') {
        xhr.setRequestHeader('Accept-Ranges', 'bytes');
        xhr.setRequestHeader('Content-Range', 'bytes');
    }
    if (urlRequest.headers) {
        for (var _i = 0, _a = urlRequest.headers; _i < _a.length; _i++) {
            var header = _a[_i];
            xhr.setRequestHeader(header.name, header.value);
        }
    }
    return new Promise(function (resolve, reject) {
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                }
                else {
                    var message =  true ? "can not load resource with url '".concat(urlRequest.url, "', status ").concat(xhr.status) : 0;
                    reject(message);
                }
            }
        };
        if (onProgress) {
            xhr.onprogress = function (e) {
                if (e.total !== 0)
                    onProgress(e.loaded / e.total);
            };
        }
        xhr.onerror = function (e) {
            console.error(e);
            var rejectError =  true ? "can not load resource with url ".concat(urlRequest.url) : 0;
            reject(rejectError);
        };
        xhr.ontimeout = function (e) {
            console.error(e);
            var rejectError =  true ? "can not load resource with url ".concat(urlRequest.url) : 0;
            reject(rejectError);
        };
        xhr.send();
    });
};
var UrlLoader = (function () {
    function UrlLoader(urlRequest) {
        this.urlRequest = urlRequest;
    }
    UrlLoader.prototype.getUrl = function () {
        return this.urlRequest.url;
    };
    UrlLoader.prototype.load = function () {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            return (0,tslib_es6/* __generator */.Jh)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.getUrl().indexOf('data:') === 0)) return [3, 2];
                        return [4, loadBase64(this.urlRequest)];
                    case 1: return [2, _a.sent()];
                    case 2: return [4, loadViaXmlHttp(this.urlRequest, this.onProgress)];
                    case 3: return [2, _a.sent()];
                }
            });
        });
    };
    return UrlLoader;
}());


;// CONCATENATED MODULE: ./engine/media/sound.ts

var Sound = (function () {
    function Sound(game, uploadedSoundLink) {
        this.game = game;
        this.uploadedSoundLink = uploadedSoundLink;
        this.type = 'Sound';
        this.feedbackDelay = {
            delayTime: 0,
            gain: 0.8
        };
        this._loop = false;
        this._gain = 1;
        this._velocity = 1;
        this._stereoPan = 0.5;
        this.url = uploadedSoundLink.url;
    }
    Object.defineProperty(Sound.prototype, "loop", {
        get: function () {
            return this._loop;
        },
        set: function (value) {
            this._loop = value;
            this.game.getAudioPlayer().loop(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sound.prototype, "gain", {
        get: function () {
            return this._gain;
        },
        set: function (value) {
            this._gain = value;
            this.game.getAudioPlayer().setGain(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sound.prototype, "velocity", {
        get: function () {
            return this._velocity;
        },
        set: function (value) {
            this._velocity = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sound.prototype, "stereoPan", {
        get: function () {
            return this._stereoPan;
        },
        set: function (value) {
            this._stereoPan = value;
        },
        enumerable: false,
        configurable: true
    });
    Sound.prototype.getCurrentTime = function () {
        var node = this.game.getAudioPlayer().getNodeBySound(this);
        if (node === undefined)
            return -1;
        return node.getCurrentTime();
    };
    Sound.prototype.play = function () {
        this.game.getAudioPlayer().play(this);
    };
    Sound.prototype.stop = function () {
        this.game.getAudioPlayer().stop(this);
    };
    Sound.prototype.pause = function () {
        throw new debugError/* DebugError */.N('not implemented');
    };
    Sound.prototype.getUrl = function () {
        return this.url;
    };
    return Sound;
}());


;// CONCATENATED MODULE: ./engine/resources/queue.ts


var Queue = (function () {
    function Queue() {
        this.onResolved = [];
        this._tasks = [];
        this._tasksProgressById = {};
        this._resolved = false;
        this._currProgress = 0;
    }
    Queue.prototype.addTask = function (task) {
        var taskId = Incrementer.getValue();
        this._tasks.push({ fn: task, taskId: taskId });
        this._tasksProgressById[taskId] = 0;
    };
    Queue.prototype.isResolved = function () {
        return this._resolved;
    };
    Queue.prototype.calcProgress = function () {
        var _this = this;
        var sum = 0;
        Object.keys(this._tasksProgressById).forEach(function (taskId) {
            sum += _this._tasksProgressById[taskId] || 0;
        });
        var progress = sum / this._tasks.length;
        if (progress > this._currProgress)
            this._currProgress = progress;
        return this._currProgress;
    };
    Queue.prototype.progressTask = function (taskId, progress) {
        if (progress === 1)
            return;
        this._tasksProgressById[taskId] = progress;
        if (this.onProgress !== undefined)
            this.onProgress(this.calcProgress());
    };
    Queue.prototype.resolveTask = function (taskId) {
        this._tasksProgressById[taskId] = 1;
    };
    Queue.prototype.start = function () {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            var _loop_1, this_1, _i, _a, task;
            var _this = this;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _loop_1 = function (task) {
                            var taskId, fn, onProgressCallBack;
                            return (0,tslib_es6/* __generator */.Jh)(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        taskId = task.taskId, fn = task.fn;
                                        onProgressCallBack = function (n) { return _this.progressTask(taskId, n); };
                                        return [4, fn(onProgressCallBack)];
                                    case 1:
                                        _c.sent();
                                        this_1.resolveTask(taskId);
                                        if (this_1.onProgress !== undefined)
                                            this_1.onProgress(this_1.calcProgress());
                                        return [2];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = this._tasks;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        task = _a[_i];
                        return [5, _loop_1(task)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        this._resolved = true;
                        if (this.onProgress !== undefined && this._tasks.length === 0)
                            this.onProgress(1);
                        return [4, Promise.resolve()];
                    case 5:
                        _b.sent();
                        this.onResolved.forEach(function (f) { return f(); });
                        return [2];
                }
            });
        });
    };
    return Queue;
}());


;// CONCATENATED MODULE: ./engine/renderable/abstract/renderableModelWithTexture.ts



var RenderableModelWithTexture = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(RenderableModelWithTexture, _super);
    function RenderableModelWithTexture(game) {
        return _super.call(this, game) || this;
    }
    RenderableModelWithTexture.prototype.setTexture = function (texture) {
        if (true) {
            if (!texture) {
                throw new debugError/* DebugError */.N("can not set texture: texture passed is undefined");
            }
            if (!texture.size || texture.size.width === 0 || texture.size.height === 0) {
                throw new debugError/* DebugError */.N("can not set resource texture: wrong texture size: (width: ".concat(texture.size.width, ", height: ").concat(texture.size.height, ")"));
            }
        }
        this._texture = texture;
    };
    RenderableModelWithTexture.prototype.getTexture = function () {
        return this._texture;
    };
    return RenderableModelWithTexture;
}(RenderableModel));


;// CONCATENATED MODULE: ./engine/renderable/impl/general/image/image.ts





var Image = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(Image, _super);
    function Image(game, texture) {
        var _this = _super.call(this, game) || this;
        _this.type = 'Image';
        _this.borderRadius = 0;
        _this.offset = new Point2d();
        _this.stretchMode = 0;
        _this.color = Color.NONE.clone();
        _this.lineWidth = 0;
        _this.srcRect = new Rect();
        _this._pixelPerfect = false;
        _this.setTexture(texture);
        return _this;
    }
    Image.prototype.draw = function () {
        this.game.getRenderer().drawImage(this);
    };
    Image.prototype.setTexture = function (texture) {
        _super.prototype.setTexture.call(this, texture);
        if (this.size.isZero())
            this.size.setFrom(texture.size);
        if (this.srcRect.width === 0 || this.srcRect.height === 0)
            this.srcRect.setSize(this.size);
    };
    Image.prototype.clone = function () {
        var cloned = new Image(this.game, this.getTexture());
        this.setClonedProperties(cloned);
        return cloned;
    };
    Image.prototype.setProps = function (props) {
        _super.prototype.setProps.call(this, props);
        if (props.borderRadius !== undefined)
            this.borderRadius = props.borderRadius;
        if (props.color !== undefined)
            this.color.setRGBA(props.color.r, props.color.g, props.color.b, props.color.a);
        if (props.lineWidth !== undefined)
            this.lineWidth = props.lineWidth;
    };
    Image.prototype.setPixelPerfect = function (val) {
        this._pixelPerfect = val;
    };
    Image.prototype.isPixelPerfect = function () {
        return this._pixelPerfect;
    };
    Image.prototype.setClonedProperties = function (cloned) {
        cloned.srcRect.setFrom(this.srcRect);
        cloned.size.setFrom(this.size);
        cloned.borderRadius = this.borderRadius;
        cloned.offset.setFrom(this.offset);
        cloned.stretchMode = this.stretchMode;
        cloned.color = this.color.clone();
        cloned.lineWidth = this.lineWidth;
        cloned._pixelPerfect = this._pixelPerfect;
        _super.prototype.setClonedProperties.call(this, cloned);
    };
    return Image;
}(RenderableModelWithTexture));


// EXTERNAL MODULE: ./engine/renderable/impl/general/font/font.ts + 1 modules
var font = __webpack_require__(87074);
;// CONCATENATED MODULE: ./engine/renderable/impl/general/font/createFontMethods/createFontFromAtlas.ts



var querySelector = function (doc, path, attrName, required) {
    if (required === void 0) { required = false; }
    var res = doc.querySelector(path);
    if ( true && res === undefined) {
        console.error(doc);
        throw new debugError/* DebugError */.N("can not receive node ".concat(path, " from document"));
    }
    if (res)
        return res.getAttribute(attrName) || '';
    if ( true && required && !res) {
        throw new debugError/* DebugError */.N("can not create font from atlas: node \"".concat(path, "\" with attribute \"").concat(attrName, "\" is mandatory"));
    }
    return '';
};
var createFontFromAtlas = function (game, texturePages, doc) { return (0,tslib_es6/* __awaiter */.mG)(void 0, void 0, void 0, function () {
    var _a, up, right, down, left, _b, spacingHorizontal, spacingVertical, lineHeight, base, fontFamily, fontSize, kerning, context, chars, i, el, id, width, widthAdvanced, height, x, y, xOffset, yOffset, char;
    return (0,tslib_es6/* __generator */.Jh)(this, function (_c) {
        _a = querySelector(doc, 'info', 'padding').split(',').map(function (it) { return +it || 0; }), up = _a[0], right = _a[1], down = _a[2], left = _a[3];
        _b = querySelector(doc, 'info', 'spacing').split(',').map(function (it) { return +it || 0; }), spacingHorizontal = _b[0], spacingVertical = _b[1];
        lineHeight = +(querySelector(doc, 'common', 'lineHeight', true));
        base = +(querySelector(doc, 'common', 'base') || lineHeight);
        fontFamily = querySelector(doc, 'info', 'face', true);
        fontSize = +querySelector(doc, 'info', 'size', true);
        kerning = {};
        doc.getElementsByTagName('kerning').forEach(function (el) {
            var first = String.fromCharCode(+el.getAttribute('first'));
            var second = String.fromCharCode(+el.getAttribute('second'));
            kerning["".concat(first).concat(second)] = +el.getAttribute('amount');
        });
        context = {
            texturePages: texturePages,
            fontFamily: fontFamily,
            fontSize: fontSize,
            lineHeight: lineHeight,
            padding: [up || 0, right || 0, down || 0, left || 0],
            spacing: [spacingHorizontal || 0, spacingVertical || 0],
            symbols: {},
            kerning: kerning,
            base: base,
        };
        chars = doc.querySelectorAll('char');
        for (i = 0; i < chars.length; i++) {
            el = chars[i];
            id = +(el.getAttribute('id'));
            width = +(el.getAttribute('width')) || ~~(lineHeight / 3) || 16;
            widthAdvanced = +(el.getAttribute('xadvance')) || width;
            if (widthAdvanced > width)
                widthAdvanced = width;
            height = +(el.getAttribute('height')) || 0.0001;
            x = +(el.getAttribute('x'));
            y = +(el.getAttribute('y'));
            xOffset = +(el.getAttribute('xoffset')) || 0;
            yOffset = +(el.getAttribute('yoffset')) || 0;
            char = String.fromCharCode(id);
            context.symbols[char] = {
                x: x,
                y: y,
                width: width,
                widthAdvanced: widthAdvanced,
                height: height,
                destOffsetX: xOffset,
                destOffsetY: yOffset,
                pageId: +(el.getAttribute('page')) || 0,
            };
        }
        return [2, new font/* Font */.Z(game, context)];
    });
}); };

// EXTERNAL MODULE: ./engine/renderable/impl/general/font/createFontMethods/createFontFromCssDescription.ts
var createFontFromCssDescription = __webpack_require__(17686);
;// CONCATENATED MODULE: ./engine/resources/path.ts
var path;
(function (path) {
    var trimStart = function (part) {
        if (part.startsWith('./'))
            part = part.substr(2);
        else if (part.startsWith('/'))
            part = part.substr(1);
        return part;
    };
    var trimEnd = function (part) {
        if (part.endsWith('/'))
            part = part.substr(0, part.length - 1);
        return part;
    };
    path.join = function () {
        var parts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parts[_i] = arguments[_i];
        }
        for (var i = 0; i < parts.length; i++) {
            parts[i] = trimStart(parts[i]);
            if (i !== parts.length - 1)
                parts[i] = trimEnd(parts[i]);
        }
        return "./".concat(parts.filter(function (it) { return it.length > 0; }).join('/'));
    };
})(path || (path = {}));

;// CONCATENATED MODULE: ./engine/resources/resourceLoader.ts










var ResourceLoader = (function () {
    function ResourceLoader(game) {
        this.game = game;
        this.q = new Queue();
        this.game = game;
    }
    ResourceLoader._createUrlLoader = function (req, responseType) {
        if (responseType === void 0) { responseType = 'text'; }
        var iReq;
        if (req.substr !== undefined) {
            iReq = { url: req, responseType: responseType, method: 'GET' };
        }
        else
            iReq = req;
        return new UrlLoader(iReq);
    };
    ResourceLoader._loadAndProcessText = function (req, postProcess, progressFn) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            var loader, text;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        loader = ResourceLoader._createUrlLoader(req);
                        if (progressFn !== undefined)
                            loader.onProgress = progressFn;
                        return [4, loader.load()];
                    case 1:
                        text = _b.sent();
                        return [2, postProcess(text)];
                }
            });
        });
    };
    ResourceLoader._isGlobalUrl = function (url) {
        return (url.startsWith('data:') ||
            url.startsWith('https:') ||
            url.startsWith('http:'));
    };
    ResourceLoader._pathJoin = function (prefix, req) {
        if (req.url) {
            var segment = req.url;
            if (!this._isGlobalUrl(segment)) {
                req.url = path.join(this.BASE_URL, prefix, segment);
            }
            return req;
        }
        else {
            var segment = req;
            if (!this._isGlobalUrl(segment)) {
                return path.join(this.BASE_URL, prefix, segment);
            }
            else
                return req;
        }
    };
    ResourceLoader.prototype.loadTexture = function (req, progress) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            var img;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        req = ResourceLoader._pathJoin('', req);
                        return [4, ResourceLoader._loadHtmlImage(req, progress)];
                    case 1:
                        img = _b.sent();
                        return [2, this.game.getRenderer().createTexture(img)];
                }
            });
        });
    };
    ResourceLoader.prototype.loadImage = function (req, progress) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            var texture;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.loadTexture(req, progress)];
                    case 1:
                        texture = _b.sent();
                        return [2, new Image(this.game, texture)];
                }
            });
        });
    };
    ResourceLoader.prototype.loadCubeTexture = function (leftSide, rightSide, topSide, bottomSide, frontSide, backSide, progress) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            var currProgress, progressCallBack, imgLeft, imgRight, imgTop, imgBottom, imgFront, imgBack;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        leftSide = ResourceLoader._pathJoin('', leftSide);
                        rightSide = ResourceLoader._pathJoin('', rightSide);
                        topSide = ResourceLoader._pathJoin('', topSide);
                        bottomSide = ResourceLoader._pathJoin('', bottomSide);
                        frontSide = ResourceLoader._pathJoin('', frontSide);
                        backSide = ResourceLoader._pathJoin('', backSide);
                        currProgress = 0;
                        progressCallBack = function (n) {
                            currProgress += n;
                            if (progress !== undefined)
                                progress(n / 6);
                        };
                        return [4, ResourceLoader._loadHtmlImage(leftSide, progressCallBack)];
                    case 1:
                        imgLeft = _b.sent();
                        return [4, ResourceLoader._loadHtmlImage(rightSide, progressCallBack)];
                    case 2:
                        imgRight = _b.sent();
                        return [4, ResourceLoader._loadHtmlImage(topSide, progressCallBack)];
                    case 3:
                        imgTop = _b.sent();
                        return [4, ResourceLoader._loadHtmlImage(bottomSide, progressCallBack)];
                    case 4:
                        imgBottom = _b.sent();
                        return [4, ResourceLoader._loadHtmlImage(frontSide, progressCallBack)];
                    case 5:
                        imgFront = _b.sent();
                        return [4, ResourceLoader._loadHtmlImage(backSide, progressCallBack)];
                    case 6:
                        imgBack = _b.sent();
                        return [2, this.game.getRenderer().createCubeTexture(imgLeft, imgRight, imgTop, imgBottom, imgFront, imgBack)];
                }
            });
        });
    };
    ResourceLoader.prototype.loadText = function (req, progress) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        req = ResourceLoader._pathJoin('', req);
                        return [4, ResourceLoader._loadAndProcessText(req, function (t) { return t; }, progress)];
                    case 1: return [2, _b.sent()];
                }
            });
        });
    };
    ResourceLoader.prototype.loadXML = function (xmlParserClass, req, progress) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            var text, xmlParser;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.loadText(req, progress)];
                    case 1:
                        text = _b.sent();
                        xmlParser = new xmlParserClass(text);
                        return [2, xmlParser.getTree()];
                }
            });
        });
    };
    ResourceLoader.prototype.loadYAML = function (yamlParserClass, req, progress) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            var text, yamlParser;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.loadText(req, progress)];
                    case 1:
                        text = _b.sent();
                        yamlParser = new yamlParserClass(text);
                        return [2, yamlParser.getResult()];
                }
            });
        });
    };
    ResourceLoader.prototype.loadJSON = function (req, progress) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            var postPrecessFn;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        req = ResourceLoader._pathJoin('', req);
                        postPrecessFn = function (t) { return JSON.parse(t); };
                        return [4, ResourceLoader._loadAndProcessText(req, postPrecessFn, progress)];
                    case 1: return [2, _b.sent()];
                }
            });
        });
    };
    ResourceLoader.prototype.loadSound = function (req, progress) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            var loader, buff, url, ref;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        req = ResourceLoader._pathJoin('', req);
                        loader = ResourceLoader._createUrlLoader(req, 'arraybuffer');
                        if (progress !== undefined)
                            loader.onProgress = progress;
                        return [4, loader.load()];
                    case 1:
                        buff = _b.sent();
                        url = (req.substr !== undefined) ? req : req.url;
                        return [4, this.game.getAudioPlayer().uploadBufferToContext(url, buff)];
                    case 2:
                        ref = _b.sent();
                        return [2, new Sound(this.game, ref)];
                }
            });
        });
    };
    ResourceLoader.prototype.loadBinary = function (req, progress) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            var loader;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        req = ResourceLoader._pathJoin('', req);
                        loader = ResourceLoader._createUrlLoader(req, 'arraybuffer');
                        if (progress !== undefined)
                            loader.onProgress = progress;
                        return [4, loader.load()];
                    case 1: return [2, _b.sent()];
                }
            });
        });
    };
    ResourceLoader.prototype.loadFontFromCssDescription = function (params, progress) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                return [2, (0,createFontFromCssDescription/* createFontFromCssDescription */.l)(this.game, params)];
            });
        });
    };
    ResourceLoader.prototype.loadFontFromAtlas = function (baseUrl, doc, progress) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            var texturePages, pages, _i, pages_1, page, baseUrlCopy, pageFile, texturePage, pageId;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        texturePages = [];
                        pages = doc.querySelectorAll('page');
                        if ( true && !pages.length)
                            throw new debugError/* DebugError */.N("no 'page' node");
                        _i = 0, pages_1 = pages;
                        _b.label = 1;
                    case 1:
                        if (!(_i < pages_1.length)) return [3, 4];
                        page = pages_1[_i];
                        baseUrlCopy = baseUrl;
                        pageFile = page.getAttribute('file');
                        if ( true && !pageFile)
                            throw new debugError/* DebugError */.N("no 'file' attribute for 'page' node");
                        if ((0,object/* isString */.HD)(baseUrlCopy)) {
                            baseUrlCopy = path.join(ResourceLoader.BASE_URL, baseUrlCopy, pageFile);
                        }
                        else {
                            baseUrlCopy = (0,tslib_es6/* __assign */.pi)({}, baseUrlCopy);
                            baseUrlCopy.url = path.join(ResourceLoader.BASE_URL, baseUrlCopy.url, pageFile);
                        }
                        return [4, this.loadTexture(baseUrlCopy, function (n) {
                                if (progress !== undefined)
                                    progress(n / pages.length);
                            })];
                    case 2:
                        texturePage = _b.sent();
                        pageId = +page.getAttribute('id');
                        if ( true && Number.isNaN(pageId))
                            throw new debugError/* DebugError */.N("wrong page id: ".concat(page.getAttribute('id')));
                        texturePages.push({ texture: texturePage, id: pageId });
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [4, createFontFromAtlas(this.game, texturePages, doc)];
                    case 5: return [2, _b.sent()];
                }
            });
        });
    };
    ResourceLoader.prototype.loadFontFromAtlasUrl = function (baseUrl, docFileName, docParser, progress) {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            var docUrl, plainText, parser, doc;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        docUrl = baseUrl;
                        if ((0,object/* isString */.HD)(docUrl)) {
                            docUrl = path.join(ResourceLoader.BASE_URL, docUrl, docFileName);
                        }
                        else {
                            docUrl = (0,tslib_es6/* __assign */.pi)((0,tslib_es6/* __assign */.pi)({}, docUrl), { url: path.join(ResourceLoader.BASE_URL, docUrl.url, docFileName) });
                        }
                        return [4, this.loadText(docUrl, function (n) { return progress && progress(n / 2); })];
                    case 1:
                        plainText = _b.sent();
                        parser = new docParser(plainText);
                        doc = parser.getTree();
                        return [2, this.loadFontFromAtlas(baseUrl, doc, function (n) { return progress && progress(n / 2); })];
                }
            });
        });
    };
    ResourceLoader.prototype.addNextTask = function (task) {
        this.q.addTask(task);
    };
    ResourceLoader.prototype.onProgress = function (fn) {
        this.q.onProgress = fn;
    };
    ResourceLoader.prototype.onResolved = function (fn) {
        this.q.onResolved.push(fn);
    };
    ResourceLoader.prototype.start = function () {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                return [2, this.q.start()];
            });
        });
    };
    ResourceLoader.prototype.isResolved = function () {
        return this.q.isResolved();
    };
    var _a;
    _a = ResourceLoader;
    ResourceLoader.BASE_URL = '';
    ResourceLoader._loadHtmlImage = function (imgUrl, progress) {
        var url = imgUrl.url ? imgUrl.url : imgUrl;
        if (!_a._isGlobalUrl(url))
            url = addUrlParameter(url, 'modified', 1690668612859);
        return new Promise(function (resolve, reject) {
            var img = new window.Image();
            img.src = url;
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function (e) {
                console.error(e);
                var msg =  true ? "can not load image with url: ".concat(url) : 0;
                reject(msg);
            };
            img.onprogress = function (e) {
                if (progress !== undefined && e.total)
                    progress(e.loaded / e.total);
            };
        });
    };
    return ResourceLoader;
}());

;// CONCATENATED MODULE: ./engine/resources/taskQueue.ts



var TaskQueue = (function () {
    function TaskQueue(game) {
        this.game = game;
        this.startScheduled = false;
        this.resourceLoader = new ResourceLoader(this.game);
    }
    TaskQueue.prototype.addNextTask = function (task) {
        if ( true && !this.startScheduled) {
            throw new debugError/* DebugError */.N("cannot add next task: invoke scheduleStart firstly");
        }
        this.resourceLoader.addNextTask(task);
    };
    TaskQueue.prototype.getLoader = function () {
        return this.resourceLoader;
    };
    TaskQueue.prototype.scheduleStart = function () {
        return (0,tslib_es6/* __awaiter */.mG)(this, void 0, void 0, function () {
            return (0,tslib_es6/* __generator */.Jh)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.startScheduled = true;
                        return [4, Promise.resolve()];
                    case 1:
                        _a.sent();
                        return [4, this.resourceLoader.start()];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    return TaskQueue;
}());


;// CONCATENATED MODULE: ./engine/core/fpsCounter.ts
var FpsCounter = (function () {
    function FpsCounter() {
        this._timeSpan = 0;
        this._frames = 0;
        this._fps = 0;
    }
    FpsCounter.prototype.enterFrame = function (deltaTime) {
        this._frames++;
        this._timeSpan += deltaTime;
        if (this._timeSpan > 1000) {
            this._fps = ~~(1000 * this._frames / this._timeSpan);
            this._frames = 0;
            this._timeSpan = 0;
        }
    };
    FpsCounter.prototype.getFps = function () {
        return this._fps;
    };
    return FpsCounter;
}());


;// CONCATENATED MODULE: ./engine/core/game.ts









var Game = (function () {
    function Game(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.width, width = _c === void 0 ? 320 : _c, _d = _b.height, height = _d === void 0 ? 240 : _d, _e = _b.scaleStrategy, scaleStrategy = _e === void 0 ? 1 : _e, containerElement = _b.containerElement;
        this.loadEventHandler = new EventEmitterDelegate(this);
        this.size = new geometry_size/* Size */.$();
        this.scale = new Point2d(1, 1);
        this.pos = new Point2d(0, 0);
        this.scaleStrategy = 1;
        this._startedTime = 0;
        this._lastTime = 0;
        this._currTime = 0;
        this._deltaTime = 0;
        this._sceneStack = new Stack();
        this._running = false;
        this._destroyed = false;
        this._controls = [];
        this._mainLoop = new MainLoop(this);
        this._fpsCounter = new FpsCounter();
        Game._instance = this;
        if (true)
            window.game = this;
        this.size.setWH(width, height);
        this.scaleStrategy = scaleStrategy;
        this._startedTime = Date.now();
        this.rootContainerElement = containerElement;
    }
    Object.defineProperty(Game.prototype, "width", {
        get: function () {
            return this.size.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "height", {
        get: function () {
            return this.size.height;
        },
        enumerable: false,
        configurable: true
    });
    Game.getInstance = function () {
        return Game._instance;
    };
    Game.prototype.addControl = function (C) {
        var instance = new C(this);
        if (true) {
            for (var _i = 0, _a = this._controls; _i < _a.length; _i++) {
                var c = _a[_i];
                if (c.type === instance.type) {
                    throw new debugError/* DebugError */.N("control with type \"".concat(c.type, "\" added already"));
                }
            }
        }
        this._controls.push(instance);
        instance.listenTo();
    };
    Game.prototype.hasControl = function (type) {
        for (var _i = 0, _a = this._controls; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.type === type) {
                return true;
            }
        }
        return false;
    };
    Game.prototype.getControl = function (type) {
        for (var _i = 0, _a = this._controls; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.constructor === type) {
                return c;
            }
        }
        if (true) {
            throw new debugError/* DebugError */.N("control with type \"".concat(type.name, "\" is not added"));
        }
        else
            {}
    };
    Game.prototype.setPhysicsSystem = function (clz) {
        this._physicsSystem = new clz(this);
    };
    Game.prototype.getPhysicsSystem = function (type) {
        if ( true && this._physicsSystem === undefined)
            throw new debugError/* DebugError */.N("Physics system is not initialized.");
        var system = this._physicsSystem;
        if (type === undefined)
            return system;
        if (true) {
            if (system.constructor !== type) {
                throw new debugError/* DebugError */.N("can not get physics system with type \"".concat(type.name, " - current system is of type \"").concat(system.constructor.name, "\""));
            }
        }
        return system;
    };
    Game.prototype.hasPhysicsSystem = function () {
        return this._physicsSystem !== undefined;
    };
    Game.prototype.setAudioPLayer = function (p) {
        this._audioPlayer = new p(this);
    };
    Game.prototype.getAudioPlayer = function () {
        if ( true && !this._audioPlayer) {
            throw new debugError/* DebugError */.N('audio player is not set');
        }
        return this._audioPlayer;
    };
    Game.prototype.getCurrentTime = function () {
        return this._lastTime;
    };
    Game.prototype.getDeltaTime = function () {
        return this._deltaTime;
    };
    Game.prototype.getElapsedTime = function () {
        return this._lastTime - this._startedTime;
    };
    Game.prototype.setRenderer = function (Renderer) {
        this._renderer = new Renderer(this);
    };
    Game.prototype.getRenderer = function (type) {
        var renderer = this._renderer;
        if (type === undefined)
            return renderer;
        if (true) {
            if (renderer.constructor !== type) {
                throw new debugError/* DebugError */.N("can not get renderer with type \"".concat(type.name, " - current renderer is of type \"").concat(renderer.constructor.name, "\""));
            }
        }
        return renderer;
    };
    Game.prototype.runScene = function (scene, transition, replaceStack) {
        var _this = this;
        if (replaceStack === void 0) { replaceStack = true; }
        Scene._currentRenderingScene = scene;
        if (replaceStack)
            this._sceneStack.replaceLast({ scene: scene, transition: transition });
        this._prevScene = this._currScene;
        if (this._prevScene !== undefined) {
            this._prevScene.sceneEventHandler.trigger("INACTIVATED", undefined);
            this._prevScene.onInactivated();
            this._prevScene.lifeCycleState = 3;
        }
        this._currScene = scene;
        if (this._currSceneTransition !== undefined) {
            this._currSceneTransition.complete();
            this._currSceneTransition = undefined;
        }
        if (transition !== undefined) {
            this._currSceneTransition = transition;
            transition.start(this._prevScene, this._currScene);
            transition.onComplete(function () { return _this._currSceneTransition = undefined; });
        }
        this.revalidate();
        if (this._currScene.lifeCycleState === 0) {
            this._currScene.lifeCycleState = 1;
            var taskQueue_1 = new TaskQueue(this);
            taskQueue_1.
                scheduleStart().
                catch(function (e) {
                if (window.onerror)
                    window.onerror(e);
                console.trace(e);
            });
            this._currScene.sceneEventHandler.trigger("PRELOADING", { taskQueue: taskQueue_1 });
            this.loadEventHandler.trigger("PRELOADING", { taskQueue: taskQueue_1 });
            scene.onPreloading(taskQueue_1);
            var resourceLoader = taskQueue_1.getLoader();
            resourceLoader.onProgress(function (n) {
                _this._currScene.sceneEventHandler.trigger("PROGRESS", { taskQueue: taskQueue_1 });
                scene.onProgress(n);
            });
            resourceLoader.onResolved(function () {
                _this._currScene.onReady();
                _this._currScene.onContinue();
                _this._currScene.sceneEventHandler.trigger("LOADING_COMPLETED", { taskQueue: taskQueue_1 });
                _this._currScene.lifeCycleState = 2;
            });
        }
        else {
            this._currScene.sceneEventHandler.trigger("CONTINUE", { taskQueue: undefined });
            this._currScene.lifeCycleState = 2;
            this._currScene.onContinue();
        }
        if (!this._running) {
            this._mainLoop.start();
            this._running = true;
        }
    };
    Game.prototype.pushScene = function (scene, transition) {
        this.runScene(scene, transition, false);
        this._sceneStack.push({ scene: scene, transition: transition });
    };
    Game.prototype.popScene = function () {
        var last = this._sceneStack.pop();
        if ( true && !last)
            throw new debugError/* DebugError */.N("can not pop scene: no scene in stack");
        var transition = last.transition ? last.transition.getOppositeTransition() : undefined;
        var prevScene = this._sceneStack.getLast().scene;
        this.runScene(prevScene, transition);
    };
    Game.prototype.getCurrentScene = function () {
        if ( true && !this._currScene)
            throw new debugError/* DebugError */.N("current scene is not set yet");
        return this._currScene;
    };
    Game.prototype.update = function () {
        if (this._destroyed)
            return;
        this._lastTime = this._currTime;
        this._currTime = Date.now();
        if (!this._lastTime)
            this._lastTime = this._currTime;
        this._deltaTime = this._currTime - this._lastTime;
        var currTimeOrig = this._currTime;
        var deltaTimeOrig = this._deltaTime;
        if (true) {
            var renderError = this._renderer.getError();
            if (renderError !== undefined) {
                throw new debugError/* DebugError */.N("rendering error with code ".concat(renderError.code, " (").concat(renderError.desc, ")"));
            }
        }
        var numOfLoops = Math.ceil(this._deltaTime / Game._UPDATE_TIME_RATE);
        this._currTime =
            numOfLoops === 1 ?
                currTimeOrig :
                this._lastTime;
        var currentScene = this._currScene;
        var loopCnt = 0;
        do {
            if (loopCnt === numOfLoops - 1) {
                this._currTime = currTimeOrig;
            }
            else {
                this._currTime += Game._UPDATE_TIME_RATE;
            }
            this._deltaTime = this._currTime - this._lastTime;
            if (this._currSceneTransition !== undefined)
                this._currSceneTransition.update();
            else
                currentScene.update();
            for (var _i = 0, _a = this._controls; _i < _a.length; _i++) {
                var c = _a[_i];
                c.update();
            }
            this._lastTime = this._currTime;
            loopCnt++;
            if (loopCnt > 10) {
                break;
            }
        } while (loopCnt < numOfLoops);
        this._currTime = currTimeOrig;
        this._deltaTime = deltaTimeOrig;
        if (this._currSceneTransition !== undefined)
            this._currSceneTransition.render();
        else
            currentScene.render();
        if (true) {
            this._fpsCounter.enterFrame(deltaTimeOrig);
        }
    };
    Game.prototype.hasCurrentTransition = function () {
        return this._currSceneTransition !== undefined;
    };
    Object.defineProperty(Game.prototype, "fps", {
        get: function () {
            return this._fpsCounter.getFps();
        },
        enumerable: false,
        configurable: true
    });
    Game.prototype.destroy = function () {
        this._mainLoop.stop();
        this._destroyed = true;
        for (var _i = 0, _a = this._controls; _i < _a.length; _i++) {
            var c = _a[_i];
            c.destroy();
        }
        if (this._renderer) {
            this._renderer.cancelFullScreen();
            this._renderer.destroy();
        }
        if (this._audioPlayer)
            this._audioPlayer.stopAll();
    };
    Game.prototype.revalidate = function () {
        if ( true && !this._renderer)
            throw new debugError/* DebugError */.N("game renderer is not set");
    };
    Game._UPDATE_TIME_RATE = Math.ceil(1000 / 60);
    return Game;
}());
if (true) {
    if (!window.__POLYFILLS_INCLUDED__)
        throw new debugError/* DebugError */.N("polyfills module is not included!");
}
if (true) {
    var now = Date.now();
    var passed = now - 1690668609719;
    console.log("last compiled ".concat(passed / 1000, " sec ago, ").concat('dev (b29b88)'));
}
var MainLoop = (function () {
    function MainLoop(game) {
        this.game = game;
    }
    MainLoop.prototype.start = function () {
        var _this = this;
        var game = this.game;
        var updateFn = game.update.bind(game);
        var loopFn = function () {
            updateFn();
            _this.timerId = requestAnimationFrame(loopFn);
        };
        this.timerId = requestAnimationFrame(loopFn);
    };
    MainLoop.prototype.stop = function () {
        cancelAnimationFrame(this.timerId);
    };
    return MainLoop;
}());

;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/ellipse.ts



var Ellipse = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(Ellipse, _super);
    function Ellipse(game) {
        var _this = _super.call(this, game) || this;
        _this.type = 'Ellipse';
        _this.center = new Point2d();
        _this.arcAngleFrom = 0;
        _this.arcAngleTo = 0;
        _this.anticlockwise = false;
        _this.radiusX = 10;
        _this.radiusY = 20;
        _this.center.observe(function () {
            _this.pos.setXY(_this.center.x - _this.radiusX, _this.center.y - _this.radiusY);
        });
        _this.pos.observe(function () {
            _this.center.setXY(_this.pos.x + _this.radiusX, _this.pos.y + _this.radiusY);
        });
        return _this;
    }
    Object.defineProperty(Ellipse.prototype, "radiusX", {
        get: function () {
            return this._radiusX;
        },
        set: function (value) {
            if (this._radiusX === value)
                return;
            this._radiusX = value;
            this.size.setWH(this._radiusX * 2, this._radiusY * 2);
            this.center.forceTriggerChange();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ellipse.prototype, "radiusY", {
        get: function () {
            return this._radiusY;
        },
        set: function (value) {
            if (this._radiusY === value)
                return;
            this._radiusY = value;
            this.size.setWH(this._radiusX * 2, this._radiusY * 2);
            this.center.forceTriggerChange();
        },
        enumerable: false,
        configurable: true
    });
    Ellipse.prototype.draw = function () {
        this.game.getRenderer().drawEllipse(this);
    };
    Ellipse.prototype.clone = function () {
        var cloned = new Ellipse(this.game);
        this.setClonedProperties(cloned);
        return cloned;
    };
    Ellipse.prototype.setProps = function (props) {
        _super.prototype.setProps.call(this, props);
        if (props.center !== undefined)
            this.center.setXY(props.center.x, props.center.y);
        if (props.arcAngleFrom !== undefined)
            this.arcAngleFrom = props.arcAngleFrom;
        if (props.arcAngleTo !== undefined)
            this.arcAngleTo = props.arcAngleTo;
        if (props.anticlockwise !== undefined)
            this.anticlockwise = props.anticlockwise;
        if (props.radiusX !== undefined)
            this.radiusX = props.radiusX;
        if (props.radiusY !== undefined)
            this.radiusY = props.radiusY;
    };
    Ellipse.prototype.setClonedProperties = function (cloned) {
        cloned.radiusX = this.radiusX;
        cloned.radiusY = this.radiusY;
        cloned.arcAngleFrom = this.arcAngleFrom;
        cloned.arcAngleTo = this.arcAngleTo;
        cloned.anticlockwise = this.anticlockwise;
        _super.prototype.setClonedProperties.call(this, cloned);
    };
    Ellipse.prototype._getMaxRadius = function () {
        return this._radiusX > this._radiusY ? this._radiusX : this._radiusY;
    };
    return Ellipse;
}(Shape));


;// CONCATENATED MODULE: ./engine/renderable/abstract/mesh2d.ts




var Mesh2d = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(Mesh2d, _super);
    function Mesh2d(game, modelPrimitive, bufferInfo) {
        var _this = _super.call(this, game) || this;
        _this.fillColor = Color.BLACK.clone();
        if (true) {
            if (!modelPrimitive)
                throw new debugError/* DebugError */.N("model primitive is not set");
            if (modelPrimitive.vertexArr.length % modelPrimitive.vertexItemSize !== 0) {
                console.error(_this);
                throw new debugError/* DebugError */.N("Wrong vertexArr size, actual size is ".concat(modelPrimitive.vertexArr.length, ",\n                    but number must be a multiple of ").concat(modelPrimitive.vertexItemSize, " "));
            }
        }
        _this._modelPrimitive = modelPrimitive;
        _this._bufferInfo = bufferInfo;
        return _this;
    }
    Mesh2d.prototype.draw = function () {
        this.game.getRenderer().drawMesh2d(this);
    };
    Mesh2d.prototype.getBufferInfo = function () {
        if (this._bufferInfo === undefined) {
            this._bufferInfo =
                this.game.getRenderer().initBufferInfo(this);
        }
        return this._bufferInfo;
    };
    Mesh2d.prototype.destroy = function () {
        this._modelPrimitive.texCoordArr = undefined;
        this._modelPrimitive.normalArr = undefined;
        this._modelPrimitive.vertexColorArr = undefined;
        if (this._bufferInfo !== undefined &&
            !this._bufferInfo.isDestroyed()) {
            this.game.getRenderer().destroyMesh(this);
        }
        _super.prototype.destroy.call(this);
    };
    Mesh2d.prototype.setClonedProperties = function (cloned) {
        cloned.fillColor = this.fillColor.clone();
        cloned.depthTest = this.depthTest;
        cloned._bufferInfo = this.getBufferInfo();
        cloned._modelPrimitive = this._modelPrimitive;
        _super.prototype.setClonedProperties.call(this, cloned);
    };
    return Mesh2d;
}(RenderableModel));


;// CONCATENATED MODULE: ./engine/renderer/webGl/primitives/abstractPrimitive.ts
var AbstractPrimitive = (function () {
    function AbstractPrimitive() {
        this.vertexItemSize = 3;
    }
    return AbstractPrimitive;
}());


;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/line.ts





var Line = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(Line, _super);
    function Line(game) {
        var _this = _super.call(this, game) || this;
        _this.color = Color.BLACK.clone();
        _this.pointTo = new Point2d(0, 0, function () { return _this.onPointChanged(); });
        _this._rectangleRepresentation = new Rectangle(_this.game);
        _this.lineWidth = 1;
        _this._rectangleRepresentation.lineWidth = 0;
        return _this;
    }
    Line.prototype.setXYX1Y1 = function (x, y, x1, y1) {
        this.pos.setXY(x, y);
        var dx = x1 - this.pos.x;
        var dy = y1 - this.pos.y;
        this.pointTo.setXY(dx, dy);
    };
    Object.defineProperty(Line.prototype, "lineWidth", {
        get: function () {
            return this._lineWidth;
        },
        set: function (value) {
            this._lineWidth = value;
            this.onPointChanged();
        },
        enumerable: false,
        configurable: true
    });
    Line.prototype.clone = function () {
        var l = new Line(this.game);
        this.setClonedProperties(l);
        return l;
    };
    Line.prototype.draw = function () {
        this.game.getRenderer().drawLine(this);
    };
    Line.prototype._translate = function () {
        _super.prototype._translate.call(this);
        this.game.getRenderer().transformTranslate(0, -this.lineWidth / 2, 0);
    };
    Line.prototype.getRectangleRepresentation = function () {
        this._rectangleRepresentation.fillColor = this.color;
        return this._rectangleRepresentation;
    };
    Line.prototype.setProps = function (props) {
        var _a, _b, _c, _d;
        _super.prototype.setProps.call(this, props);
        this.setXYX1Y1((_b = (_a = props.pos) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : 0, (_d = (_c = props.pos) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : 0, props.pointTo.x, props.pointTo.y);
    };
    Line.prototype.setClonedProperties = function (cloned) {
        cloned.pointTo.setFrom(this.pointTo);
        _super.prototype.setClonedProperties.call(this, cloned);
    };
    Line.prototype.onPointChanged = function () {
        var w = Math.abs(this.pointTo.x);
        var h = Math.abs(this.pointTo.y);
        var l = Math.sqrt(w * w + h * h) + this.lineWidth / 2;
        this.size.setWH(w, h + this.lineWidth);
        this._rectangleRepresentation.size.setWH(l, this.lineWidth);
        this.angle = Math.atan2(this.pointTo.y, this.pointTo.x);
        this.transformPoint.setXY(0, this.lineWidth / 2);
    };
    return Line;
}(RenderableModel));


;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/_internal/splineFromPoints.ts
var createSplinePathFromPoints = function (points) {
    var x = [];
    var y = [];
    var cnt = 0;
    for (var i = 0; i < points.length; i = i + 2) {
        x[cnt] = points[i];
        y[cnt] = points[i + 1];
        cnt++;
    }
    var px = computeControlPoints(x);
    var py = computeControlPoints(y);
    var numOfPoints = points.length / 2;
    var pathStr = '';
    for (var i = 0; i < numOfPoints - 1; i++) {
        pathStr += splineFromPoints_path(i, x[i], y[i], px.p1[i], py.p1[i], px.p2[i], py.p2[i], x[i + 1], y[i + 1]);
    }
    return pathStr;
};
var splineFromPoints_path = function (i, x1, y1, px1, py1, px2, py2, x2, y2) {
    var res = '';
    if (i === 0)
        res += "M ".concat(x1, " ").concat(y1, " ");
    res += " C ".concat(px1, " ").concat(py1, " ").concat(px2, " ").concat(py2, " ").concat(x2, " ").concat(y2);
    return res;
};
var computeControlPoints = function (K) {
    var p1 = [];
    var p2 = [];
    var n = K.length - 1;
    var a = [];
    var b = [];
    var c = [];
    var r = [];
    a[0] = 0;
    b[0] = 2;
    c[0] = 1;
    r[0] = K[0] + 2 * K[1];
    for (var i = 1; i < n - 1; i++) {
        a[i] = 1;
        b[i] = 4;
        c[i] = 1;
        r[i] = 4 * K[i] + 2 * K[i + 1];
    }
    a[n - 1] = 2;
    b[n - 1] = 7;
    c[n - 1] = 0;
    r[n - 1] = 8 * K[n - 1] + K[n];
    for (var i = 1; i < n; i++) {
        var m = a[i] / b[i - 1];
        b[i] = b[i] - m * c[i - 1];
        r[i] = r[i] - m * r[i - 1];
    }
    p1[n - 1] = r[n - 1] / b[n - 1];
    for (var i = n - 2; i >= 0; --i) {
        p1[i] = (r[i] - c[i] * p1[i + 1]) / b[i];
    }
    for (var i = 0; i < n - 1; i++) {
        p2[i] = 2 * K[i + 1] - p1[i + 1];
    }
    p2[n - 1] = 0.5 * (K[n] + p1[n - 1]);
    return { p1: p1, p2: p2 };
};

;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/_internal/clearString.ts
var clearString = function (s) {
    return s.replace(/\s\s+/g, ' ').trim();
};

;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/_internal/arcToBezier.ts
var TAU = Math.PI * 2;
var mapToEllipse = function (_a, rx, ry, cosphi, sinphi, centerx, centery) {
    var x = _a.x, y = _a.y;
    x *= rx;
    y *= ry;
    var xp = cosphi * x - sinphi * y;
    var yp = sinphi * x + cosphi * y;
    return {
        x: xp + centerx,
        y: yp + centery
    };
};
var approxUnitArc = function (ang1, ang2) {
    var a = ang2 === 1.5707963267948966
        ? 0.551915024494
        : ang2 === -1.5707963267948966
            ? -0.551915024494
            : 4 / 3 * Math.tan(ang2 / 4);
    var x1 = Math.cos(ang1);
    var y1 = Math.sin(ang1);
    var x2 = Math.cos(ang1 + ang2);
    var y2 = Math.sin(ang1 + ang2);
    return [
        {
            x: x1 - y1 * a,
            y: y1 + x1 * a
        },
        {
            x: x2 + y2 * a,
            y: y2 - x2 * a
        },
        {
            x: x2,
            y: y2
        }
    ];
};
var vectorAngle = function (ux, uy, vx, vy) {
    var sign = (ux * vy - uy * vx < 0) ? -1 : 1;
    var umag = Math.sqrt(ux * ux + uy * uy);
    var vmag = Math.sqrt(ux * ux + uy * uy);
    var dot = ux * vx + uy * vy;
    var div = dot / (umag * vmag);
    if (div > 1) {
        div = 1;
    }
    if (div < -1) {
        div = -1;
    }
    return sign * Math.acos(div);
};
var getArcCenter = function (px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinphi, cosphi, pxp, pyp) {
    var rxsq = Math.pow(rx, 2);
    var rysq = Math.pow(ry, 2);
    var pxpsq = Math.pow(pxp, 2);
    var pypsq = Math.pow(pyp, 2);
    var radicant = (rxsq * rysq) - (rxsq * pypsq) - (rysq * pxpsq);
    if (radicant < 0) {
        radicant = 0;
    }
    radicant /= (rxsq * pypsq) + (rysq * pxpsq);
    radicant = Math.sqrt(radicant) * (largeArcFlag === sweepFlag ? -1 : 1);
    var centerxp = radicant * rx / ry * pyp;
    var centeryp = radicant * -ry / rx * pxp;
    var centerx = cosphi * centerxp - sinphi * centeryp + (px + cx) / 2;
    var centery = sinphi * centerxp + cosphi * centeryp + (py + cy) / 2;
    var vx1 = (pxp - centerxp) / rx;
    var vy1 = (pyp - centeryp) / ry;
    var vx2 = (-pxp - centerxp) / rx;
    var vy2 = (-pyp - centeryp) / ry;
    var ang1 = vectorAngle(1, 0, vx1, vy1);
    var ang2 = vectorAngle(vx1, vy1, vx2, vy2);
    if (sweepFlag === 0 && ang2 > 0) {
        ang2 -= TAU;
    }
    if (sweepFlag === 1 && ang2 < 0) {
        ang2 += TAU;
    }
    return [centerx, centery, ang1, ang2];
};
var arcToBezier = function (px, py, cx, cy, rx, ry, xAxisRotation, largeArcFlag, sweepFlag) {
    var _a;
    if (xAxisRotation === void 0) { xAxisRotation = 0; }
    if (largeArcFlag === void 0) { largeArcFlag = 0; }
    if (sweepFlag === void 0) { sweepFlag = 0; }
    var curves = [];
    if (rx === 0 || ry === 0) {
        return undefined;
    }
    var sinphi = Math.sin(xAxisRotation * TAU / 360);
    var cosphi = Math.cos(xAxisRotation * TAU / 360);
    var pxp = cosphi * (px - cx) / 2 + sinphi * (py - cy) / 2;
    var pyp = -sinphi * (px - cx) / 2 + cosphi * (py - cy) / 2;
    if (pxp === 0 && pyp === 0) {
        return undefined;
    }
    rx = Math.abs(rx);
    ry = Math.abs(ry);
    var lambda = Math.pow(pxp, 2) / Math.pow(rx, 2) +
        Math.pow(pyp, 2) / Math.pow(ry, 2);
    if (lambda > 1) {
        rx *= Math.sqrt(lambda);
        ry *= Math.sqrt(lambda);
    }
    var centerx, centery, ang1, ang2;
    _a = getArcCenter(px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinphi, cosphi, pxp, pyp), centerx = _a[0], centery = _a[1], ang1 = _a[2], ang2 = _a[3];
    var ratio = Math.abs(ang2) / (TAU / 4);
    if (Math.abs(1.0 - ratio) < 0.0000001) {
        ratio = 1.0;
    }
    var segments = Math.max(Math.ceil(ratio), 1);
    ang2 /= segments;
    for (var i = 0; i < segments; i++) {
        curves.push(approxUnitArc(ang1, ang2));
        ang1 += ang2;
    }
    return curves.map(function (curve) {
        var _a = mapToEllipse(curve[0], rx, ry, cosphi, sinphi, centerx, centery), x1 = _a.x, y1 = _a.y;
        var _b = mapToEllipse(curve[1], rx, ry, cosphi, sinphi, centerx, centery), x2 = _b.x, y2 = _b.y;
        var _c = mapToEllipse(curve[2], rx, ry, cosphi, sinphi, centerx, centery), x = _c.x, y = _c.y;
        return { x: x, y: y, x1: x1, y1: y1, x2: x2, y2: y2 };
    });
};

;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/_internal/basicStringTokenizer.ts


var BasicStringTokenizer = (function () {
    function BasicStringTokenizer(source) {
        this.source = source;
        this._pos = 0;
        this._CHAR = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this._NUM = '01234567890.';
        this.source = clearString(source);
    }
    BasicStringTokenizer.prototype.isEof = function () {
        return this._pos === this.source.length;
    };
    BasicStringTokenizer.prototype.getNextNumber = function (defaultResult) {
        this.skipEmptySymbols();
        var lastPos = this._lastPos;
        var sign = 1;
        if (this.source[this._pos] === '-') {
            sign = -1;
            this._pos++;
        }
        var s = this.getNextToken(this._NUM);
        if (sign === 1 && !s && defaultResult !== undefined)
            return defaultResult;
        if (this.source[this._pos] === 'e') {
            this._pos++;
            s += 'e' + this.getNextNumber();
        }
        if ( true && s.length === 0) {
            this._debug();
            throw new debugError/* DebugError */.N("can not read number, wrong next symbol: ".concat(this.source[this._pos]));
        }
        var n = +s;
        if ( true && isNaN(n)) {
            this._debug();
            throw new debugError/* DebugError */.N("can not read number: ".concat(sign === 1 ? '' : '-').concat(s));
        }
        n *= sign;
        this._lastPos = lastPos;
        return n;
    };
    BasicStringTokenizer.prototype.getRestString = function () {
        return this.source.substr(this._pos);
    };
    BasicStringTokenizer.prototype.skipEmptySymbols = function () {
        while (!this.isEof()) {
            if ([',', ' ', '\n'].indexOf(this.source[this._pos]) === -1)
                break;
            this._pos++;
        }
    };
    BasicStringTokenizer.prototype.getNextToken = function (allowedSymbols, limit) {
        if (limit === void 0) { limit = 0; }
        if ( true && this.isEof()) {
            this._debug();
            throw new debugError/* DebugError */.N("unexpected end of string");
        }
        var char;
        var res = '';
        this.skipEmptySymbols();
        this._lastPos = this._pos;
        while (!this.isEof()) {
            char = this.source[this._pos];
            if (allowedSymbols.indexOf(char) === -1)
                break;
            if (limit > 0 && res.length === limit)
                break;
            if (allowedSymbols === this._NUM && char === '.' && res.indexOf('.') > -1)
                break;
            res += char;
            this._pos++;
        }
        return res;
    };
    BasicStringTokenizer.prototype.skipOptionalToken = function (tkn) {
        return this.getNextToken(tkn, tkn.length) === tkn;
    };
    BasicStringTokenizer.prototype.skipRequiredToken = function (tkn) {
        if (!this.skipOptionalToken(tkn)) {
            this._debug();
            throw new debugError/* DebugError */.N("token \"".concat(tkn, "\" is expected"));
        }
    };
    BasicStringTokenizer.prototype.readUntilSymbol = function (symbol) {
        if ( true && this.isEof()) {
            this._debug();
            throw new debugError/* DebugError */.N("unexpected end of string, expected: ".concat(symbol));
        }
        var char;
        var res = '';
        this.skipEmptySymbols();
        this._lastPos = this._pos;
        while (!this.isEof()) {
            char = this.source[this._pos];
            if (char === symbol)
                break;
            res += char;
            this._pos++;
        }
        return res;
    };
    BasicStringTokenizer.prototype._debug = function () {
        console.error(this.source);
        console.log("%c".concat(this.source.substr(0, this._pos + 1), "%c<---%c").concat(this.source.substr(this._pos + 1)), 'color:black', 'color:red;font-weight:bold;', 'color:black');
    };
    return BasicStringTokenizer;
}());


;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/_internal/v2.ts

var add = function (a) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var n = (0,tslib_es6/* __spreadArray */.ev)([], a, true);
    args.forEach(function (p) {
        n[0] += p[0];
        n[1] += p[1];
    });
    return n;
};
var sub = function (a) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var n = __spreadArray([], a, true);
    args.forEach(function (p) {
        n[0] -= p[0];
        n[1] -= p[1];
    });
    return n;
};
var mult = function (a, scalar) {
    return [a[0] * scalar, a[1] * scalar];
};
var lerp = function (a, b, t) {
    return [
        a[0] + (b[0] - a[0]) * t,
        a[1] + (b[1] - a[1]) * t,
    ];
};
var distanceSq = function (a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return dx * dx + dy * dy;
};
var distance = function (a, b) {
    return Math.sqrt(distanceSq(a, b));
};
var v2_distanceToSegmentSq = function (p, v, w) {
    var l2 = distanceSq(v, w);
    if (l2 == 0) {
        return distanceSq(p, v);
    }
    var t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
    t = Math.max(0, Math.min(1, t));
    return distanceSq(p, lerp(v, w, t));
};
var distanceToSegment = function (p, v, w) {
    return Math.sqrt(v2_distanceToSegmentSq(p, v, w));
};

;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/_internal/getPointsOnBezierCurve.ts

var flatness = function (points, offset) {
    var p1 = points[offset];
    var p2 = points[offset + 1];
    var p3 = points[offset + 2];
    var p4 = points[offset + 3];
    var ux = 3 * p2[0] - 2 * p1[0] - p4[0];
    ux *= ux;
    var uy = 3 * p2[1] - 2 * p1[1] - p4[1];
    uy *= uy;
    var vx = 3 * p3[0] - 2 * p4[0] - p1[0];
    vx *= vx;
    var vy = 3 * p3[1] - 2 * p4[1] - p1[1];
    vy *= vy;
    if (ux < vx) {
        ux = vx;
    }
    if (uy < vy) {
        uy = vy;
    }
    return ux + uy;
};
var getPointsOnBezierCurveWithSplitting = function (points, offset, tolerance, newPoints) {
    if (newPoints === void 0) { newPoints = []; }
    var outPoints = newPoints;
    if (flatness(points, offset) < tolerance) {
        outPoints.push(points[offset]);
        outPoints.push(points[offset + 3]);
    }
    else {
        var t = .5;
        var p1 = points[offset];
        var p2 = points[offset + 1];
        var p3 = points[offset + 2];
        var p4 = points[offset + 3];
        var q1 = lerp(p1, p2, t);
        var q2 = lerp(p2, p3, t);
        var q3 = lerp(p3, p4, t);
        var r1 = lerp(q1, q2, t);
        var r2 = lerp(q2, q3, t);
        var red = lerp(r1, r2, t);
        getPointsOnBezierCurveWithSplitting([p1, q1, r1, red], 0, tolerance, outPoints);
        getPointsOnBezierCurveWithSplitting([red, r2, q3, p4], 0, tolerance, outPoints);
    }
    return outPoints;
};
var simplifyPoints = function (points, start, end, epsilon, newPoints) {
    var outPoints = newPoints || [];
    var s = points[start];
    var e = points[end - 1];
    var maxDistSq = 0;
    var maxNdx = 1;
    for (var i = start + 1; i < end - 1; ++i) {
        var distSq = distanceToSegmentSq(points[i], s, e);
        if (distSq > maxDistSq) {
            maxDistSq = distSq;
            maxNdx = i;
        }
    }
    if (Math.sqrt(maxDistSq) > epsilon) {
        simplifyPoints(points, start, maxNdx + 1, epsilon, outPoints);
        simplifyPoints(points, maxNdx, end, epsilon, outPoints);
    }
    else {
        outPoints.push(s, e);
    }
    return outPoints;
};

;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/_internal/svgPathToVertexArrayBuilder.ts







var SvgTokenizer = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(SvgTokenizer, _super);
    function SvgTokenizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SvgTokenizer.prototype.releaseNextToken = function () {
        if ( true && this._lastPos === undefined)
            throw new debugError/* DebugError */.N("can not release next token");
        this._pos = this._lastPos;
        this._lastPos = undefined;
    };
    SvgTokenizer.prototype.getNextCommand = function () {
        var tkn = this.getNextToken(this._CHAR, 1);
        if (!tkn)
            tkn = '' + this.getNextNumber();
        return tkn;
    };
    return SvgTokenizer;
}(BasicStringTokenizer));
var SvgPathToVertexArrayBuilder = (function () {
    function SvgPathToVertexArrayBuilder(game) {
        this.game = game;
        this.lastPenPoint = new Point2d();
        this.currentVertexGroup = { vertexArray: [], closed: false };
        this.result = [];
        this.result.push(this.currentVertexGroup);
    }
    SvgPathToVertexArrayBuilder.prototype.parsePolylines = function (path, close) {
        this.tokenizer = new SvgTokenizer(path);
        var lastCommand;
        while (!this.tokenizer.isEof()) {
            var command = this.tokenizer.getNextCommand();
            if (isFinite(+command) && lastCommand) {
                this.tokenizer.releaseNextToken();
                if (lastCommand === 'M')
                    lastCommand = 'L';
                else if (lastCommand === 'm')
                    lastCommand = 'l';
                this.executeCommand(lastCommand);
            }
            else {
                this.executeCommand(command);
                lastCommand = command;
            }
        }
        if (close)
            this.close();
        if (this.result.indexOf(this.currentVertexGroup) === -1)
            this.result.push(this.currentVertexGroup);
        return this.result;
    };
    SvgPathToVertexArrayBuilder.prototype.getLastResult = function () {
        return this.currentVertexGroup;
    };
    SvgPathToVertexArrayBuilder.prototype.getResult = function () {
        return this.result;
    };
    SvgPathToVertexArrayBuilder.prototype.moveTo = function (x, y) {
        if (this.currentVertexGroup.vertexArray.length > 0)
            this.complete();
        if (!this.lastPoint)
            this.lastPoint = new Point2d();
        this.lastPoint.setXY(x, y);
        this.lastPenPoint.setXY(x, y);
        if (!this.firstPoint)
            this.firstPoint = new Point2d();
        this.firstPoint.setXY(x, y);
    };
    SvgPathToVertexArrayBuilder.prototype.moveBy = function (x, y) {
        var lastX = this.lastPoint ? this.lastPoint.x : 0;
        var lastY = this.lastPoint ? this.lastPoint.y : 0;
        this.moveTo(lastX + x, lastY + y);
    };
    SvgPathToVertexArrayBuilder.prototype.lineTo = function (x, y) {
        if (!this.lastPoint)
            this.lastPoint = new Point2d();
        if (!this.firstPoint)
            this.firstPoint = new Point2d(x, y);
        this.addSegment(this.lastPoint.x, this.lastPoint.y, x, y);
        this.lastPoint.setXY(x, y);
        this.lastPenPoint.setXY(x, y);
    };
    SvgPathToVertexArrayBuilder.prototype.lineBy = function (x, y) {
        var lastX = this.lastPoint ? this.lastPoint.x : 0;
        var lastY = this.lastPoint ? this.lastPoint.y : 0;
        this.lineTo(lastX + x, lastY + y);
    };
    SvgPathToVertexArrayBuilder.prototype.arcTo = function (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
        this._arcTo(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y, false);
    };
    SvgPathToVertexArrayBuilder.prototype.arcBy = function (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
        this._arcTo(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y, true);
    };
    SvgPathToVertexArrayBuilder.prototype.bezierCurveTo = function (x1, y1, x2, y2, x3, y3) {
        var _a, _b, _c, _d;
        this._bezierTo([(_b = (_a = this.lastPoint) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : 0, (_d = (_c = this.lastPoint) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : 0], [x1, y1], [x2, y2], [x3, y3]);
    };
    SvgPathToVertexArrayBuilder.prototype.quadraticCurveTo = function (x1, y1, x2, y2) {
        var QP0 = [this.lastPoint.x, this.lastPoint.y];
        var QP1 = [x1, y1];
        var QP2 = [x2, y2];
        var p1 = (0,tslib_es6/* __spreadArray */.ev)([], QP0, true);
        var p2 = [
            QP0[0] + 2 / 3 * (QP1[0] - QP0[0]),
            QP0[1] + 2 / 3 * (QP1[1] - QP0[1])
        ];
        var p3 = [
            QP2[0] + 2 / 3 * (QP1[0] - QP2[0]),
            QP2[1] + 2 / 3 * (QP1[1] - QP2[1])
        ];
        var p4 = (0,tslib_es6/* __spreadArray */.ev)([], QP2, true);
        this._bezierTo(p1, p2, p3, p4);
    };
    SvgPathToVertexArrayBuilder.prototype.close = function () {
        if (!this.firstPoint)
            return;
        this.lineTo(this.firstPoint.x, this.firstPoint.y);
        this.currentVertexGroup.closed = true;
        this.complete();
    };
    SvgPathToVertexArrayBuilder.prototype.createNextVertexArray = function () {
        if (this.result.indexOf(this.currentVertexGroup) === -1)
            this.result.push(this.currentVertexGroup);
        this.currentVertexGroup = { vertexArray: [], closed: false };
    };
    SvgPathToVertexArrayBuilder.prototype._bezierTo = function (p1, p2, p3, p4) {
        var _this = this;
        var bezier = getPointsOnBezierCurveWithSplitting([p1, p2, p3, p4], 0, 0.5);
        bezier.forEach(function (v) {
            _this.lineTo(v[0], v[1]);
        });
    };
    SvgPathToVertexArrayBuilder.prototype._arcTo = function (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y, isRelativeCoordinates) {
        var _this = this;
        if ( true && largeArcFlag !== 0 && largeArcFlag !== 1)
            throw new debugError/* DebugError */.N("wrong largeArcFlag value: ".concat(largeArcFlag));
        if ( true && sweepFlag !== 0 && sweepFlag !== 1)
            throw new debugError/* DebugError */.N("wrong largeArcFlag value: ".concat(sweepFlag));
        if (isRelativeCoordinates) {
            x += this.lastPoint.x;
            y += this.lastPoint.y;
        }
        var arcs = arcToBezier(this.lastPoint.x, this.lastPoint.y, x, y, rx, ry, xAxisRotation, largeArcFlag, sweepFlag);
        if (arcs !== undefined)
            arcs.forEach(function (arc, i) {
                var xTo = arc.x;
                var yTo = arc.y;
                if (i === arcs.length - 1) {
                    xTo = x;
                    yTo = y;
                }
                _this._bezierTo([_this.lastPoint.x, _this.lastPoint.y], [arc.x1, arc.y1], [arc.x2, arc.y2], [xTo, yTo]);
            });
    };
    SvgPathToVertexArrayBuilder.prototype.complete = function () {
        this.firstPoint = undefined;
        if (this.tokenizer === undefined || !this.tokenizer.isEof())
            this.createNextVertexArray();
    };
    SvgPathToVertexArrayBuilder.prototype.addSegment = function (x, y, x1, y1) {
        if (this.currentVertexGroup.vertexArray.length === 0) {
            this.currentVertexGroup.vertexArray.push(x, y);
        }
        this.currentVertexGroup.vertexArray.push(x1, y1);
    };
    SvgPathToVertexArrayBuilder.prototype.executeCommand = function (command) {
        var tokenizer = this.tokenizer;
        switch (command) {
            case 'L': {
                this.lineTo(tokenizer.getNextNumber(), tokenizer.getNextNumber());
                break;
            }
            case 'l': {
                this.lineBy(tokenizer.getNextNumber(), tokenizer.getNextNumber());
                break;
            }
            case 'H': {
                this.lineTo(tokenizer.getNextNumber(), this.lastPoint.y);
                break;
            }
            case 'h': {
                this.lineBy(tokenizer.getNextNumber(), 0);
                break;
            }
            case 'V': {
                this.lineTo(this.lastPoint.x, tokenizer.getNextNumber());
                break;
            }
            case 'v': {
                this.lineBy(0, tokenizer.getNextNumber());
                break;
            }
            case 'M': {
                this.moveTo(tokenizer.getNextNumber(), tokenizer.getNextNumber());
                break;
            }
            case 'm': {
                this.moveBy(tokenizer.getNextNumber(), tokenizer.getNextNumber());
                break;
            }
            case 'C': {
                var p1 = [this.lastPoint.x, this.lastPoint.y];
                var p2 = [tokenizer.getNextNumber(), tokenizer.getNextNumber()];
                var p3 = [tokenizer.getNextNumber(), tokenizer.getNextNumber()];
                var p4 = [tokenizer.getNextNumber(), tokenizer.getNextNumber()];
                this.lastBezierPoint = p3;
                this._bezierTo(p1, p2, p3, p4);
                break;
            }
            case 'c': {
                var p1 = [this.lastPoint.x, this.lastPoint.y];
                var p2 = [tokenizer.getNextNumber(), tokenizer.getNextNumber()];
                var p3 = [tokenizer.getNextNumber(), tokenizer.getNextNumber()];
                var p4 = [tokenizer.getNextNumber(), tokenizer.getNextNumber()];
                this.lastBezierPoint = add(p1, p3);
                this._bezierTo(p1, add(p1, p2), add(p1, p3), add(p1, p4));
                break;
            }
            case 'S': {
                var p1 = [this.lastPoint.x, this.lastPoint.y];
                if (!this.lastBezierPoint || ['c', 'C', 'S', 's'].indexOf(tokenizer.lastCommand) === -1) {
                    this.lastBezierPoint = p1;
                }
                var p2 = [2 * p1[0] - this.lastBezierPoint[0], 2 * p1[1] - this.lastBezierPoint[1]];
                var p3 = [tokenizer.getNextNumber(), tokenizer.getNextNumber()];
                var p4 = [tokenizer.getNextNumber(), tokenizer.getNextNumber()];
                this.lastBezierPoint = p3;
                this._bezierTo(p1, p2, p3, p4);
                break;
            }
            case 's': {
                var p1 = [this.lastPoint.x, this.lastPoint.y];
                if (!this.lastBezierPoint || ['c', 'C', 'S', 's'].indexOf(tokenizer.lastCommand) === -1)
                    this.lastBezierPoint = p1;
                var p2 = [2 * p1[0] - this.lastBezierPoint[0], 2 * p1[1] - this.lastBezierPoint[1]];
                var p3 = add(p1, [tokenizer.getNextNumber(), tokenizer.getNextNumber()]);
                var p4 = add(p1, [tokenizer.getNextNumber(), tokenizer.getNextNumber()]);
                this.lastBezierPoint = p3;
                this._bezierTo(p1, p2, p3, p4);
                break;
            }
            case 'q':
            case 'Q': {
                var isRelative = command === 'q';
                var QP0 = [this.lastPoint.x, this.lastPoint.y];
                var QP1 = [tokenizer.getNextNumber(), tokenizer.getNextNumber()];
                var QP2 = [tokenizer.getNextNumber(), tokenizer.getNextNumber()];
                if (isRelative) {
                    QP1 = add(QP1, QP0);
                    QP2 = add(QP2, QP0);
                }
                var p1 = (0,tslib_es6/* __spreadArray */.ev)([], QP0, true);
                var p2 = [
                    QP0[0] + 2 / 3 * (QP1[0] - QP0[0]),
                    QP0[1] + 2 / 3 * (QP1[1] - QP0[1])
                ];
                var p3 = [
                    QP2[0] + 2 / 3 * (QP1[0] - QP2[0]),
                    QP2[1] + 2 / 3 * (QP1[1] - QP2[1])
                ];
                var p4 = (0,tslib_es6/* __spreadArray */.ev)([], QP2, true);
                this.lastBezierPoint = QP1;
                this._bezierTo(p1, p2, p3, p4);
                break;
            }
            case 't':
            case 'T': {
                var isRelative = command === 't';
                var QP0 = [this.lastPoint.x, this.lastPoint.y];
                if (!this.lastBezierPoint || ['q', 'Q', 'T', 't'].indexOf(tokenizer.lastCommand) === -1)
                    this.lastBezierPoint = QP0;
                var QP1 = [2 * QP0[0] - this.lastBezierPoint[0], 2 * QP0[1] - this.lastBezierPoint[1]];
                var QP2 = [tokenizer.getNextNumber(), tokenizer.getNextNumber()];
                if (isRelative) {
                    QP2 = add(QP2, QP0);
                }
                var p1 = (0,tslib_es6/* __spreadArray */.ev)([], QP0, true);
                var p2 = [
                    QP0[0] + 2 / 3 * (QP1[0] - QP0[0]),
                    QP0[1] + 2 / 3 * (QP1[1] - QP0[1])
                ];
                var p3 = [
                    QP2[0] + 2 / 3 * (QP1[0] - QP2[0]),
                    QP2[1] + 2 / 3 * (QP1[1] - QP2[1])
                ];
                var p4 = (0,tslib_es6/* __spreadArray */.ev)([], QP2, true);
                this.lastBezierPoint = QP1;
                this._bezierTo(p1, p2, p3, p4);
                break;
            }
            case 'A':
            case 'a':
                var rx = tokenizer.getNextNumber();
                var ry = tokenizer.getNextNumber();
                var xAxisRotation = tokenizer.getNextNumber();
                var largeArcFlag = tokenizer.getNextNumber();
                var sweepFlag = tokenizer.getNextNumber();
                var x = tokenizer.getNextNumber();
                var y = tokenizer.getNextNumber();
                var relative = command === 'a';
                this._arcTo(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y, relative);
                break;
            case 'Z':
            case 'z':
                this.close();
                break;
            default:
                if (true)
                    throw new debugError/* DebugError */.N("unexpected command: '".concat(command, "'"));
                break;
        }
        tokenizer.lastCommand = command;
    };
    return SvgPathToVertexArrayBuilder;
}());


;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/_internal/closePolylinePoints.ts

var closePolylinePoints = function (vertices) {
    var prev = vertices[vertices.length - 2];
    var last = vertices[vertices.length - 1];
    var first = vertices[0];
    var next = vertices[1];
    if (last !== next || prev !== first)
        vertices = (0,tslib_es6/* __spreadArray */.ev)((0,tslib_es6/* __spreadArray */.ev)([], vertices, true), [first, next], false);
    return vertices;
};

;// CONCATENATED MODULE: ./engine/geometry/vec2.ts
var Vec2 = (function () {
    function Vec2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vec2.angle = function (a, b) {
        return Math.acos(Vec2.dot(a, b) / (Vec2.magnitude(a) * Vec2.magnitude(b)));
    };
    Vec2.angleTo = function (a, b) {
        return Math.atan2(b.y - a.y, b.x - a.x);
    };
    Vec2.withAngle = function (vec, value) {
        var len = Vec2.magnitude(vec);
        var x = Math.cos(value) * len;
        var y = Math.sin(value) * len;
        return new Vec2(x, y);
    };
    Vec2.normal = function (v1, v2) {
        var v = Vec2.subtract(v1, v2);
        return Vec2.normalized(v);
    };
    Vec2.distance = function (a, b) {
        return Math.sqrt(Vec2.distanceSquared(a, b));
    };
    Vec2.distanceSquared = function (a, b) {
        var axMinusBx = a.x - b.x;
        var ayMinusBy = a.y - b.y;
        return Math.pow(axMinusBx, 2) + Math.pow(ayMinusBy, 2);
    };
    Vec2.equals = function (a, b) {
        return a.x === b.x && a.y === b.y;
    };
    Vec2.multiply = function (a, b) {
        return new Vec2(a.x * b.x, a.y * b.y);
    };
    Vec2.multiplyByScalar = function (vec, factor) {
        return new Vec2(vec.x * factor, vec.y * factor);
    };
    Vec2.divide = function (vec, factor) {
        if (factor === void 0) { factor = 1; }
        return new Vec2(vec.x / factor, vec.y / factor);
    };
    Vec2.add = function (a, b) {
        return new Vec2(a.x + b.x, a.y + b.y);
    };
    Vec2.subtract = function (a, b) {
        return new Vec2(a.x - b.x, a.y - b.y);
    };
    Vec2.magnitude = function (vec) {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    };
    Vec2.withLength = function (vec, len) {
        var mag = Vec2.magnitude(vec);
        if (mag === 0) {
            vec.x = vec.y = 0;
            return vec;
        }
        var factor = mag / len;
        return Vec2.divide(vec, factor);
    };
    Vec2.normalized = function (vec) {
        return Vec2.withLength(vec, 1);
    };
    Vec2.dot = function (a, b) {
        return a.x * b.x + a.y * b.y;
    };
    Vec2.cross = function (a, b) {
        return a.x * b.y - a.y * b.x;
    };
    Vec2.prototype.getAngle = function () {
        return Math.atan2(this.y, this.x);
    };
    Vec2.prototype.clone = function () {
        return new Vec2(this.x, this.y);
    };
    return Vec2;
}());


;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/_internal/polyline-triangulate/lineSegment.ts

var LineSegment = (function () {
    function LineSegment(a, b) {
        this.a = a;
        this.b = b;
    }
    LineSegment.intersection = function (a, b, infiniteLines) {
        var r = a.direction(false);
        var s = b.direction(false);
        var originDist = Vec2.subtract(b.a, a.a);
        var uNumerator = Vec2.cross(originDist, r);
        var denominator = Vec2.cross(r, s);
        if (Math.abs(denominator) < 0.0001) {
            return undefined;
        }
        var u = uNumerator / denominator;
        var t = Vec2.cross(originDist, s) / denominator;
        if (!infiniteLines && (t < 0 || t > 1 || u < 0 || u > 1)) {
            return undefined;
        }
        return Vec2.add(a.a, Vec2.multiplyByScalar(r, t));
    };
    LineSegment.prototype.add = function (toAdd) {
        return new LineSegment(Vec2.add(this.a, toAdd), Vec2.add(this.b, toAdd));
    };
    LineSegment.prototype.substract = function (toSubstract) {
        return new LineSegment(Vec2.subtract(this.a, toSubstract), Vec2.subtract(this.b, toSubstract));
    };
    LineSegment.prototype.normal = function () {
        var dir = this.direction();
        return new Vec2(-dir.y, dir.x);
    };
    LineSegment.prototype.direction = function (normalized) {
        if (normalized === void 0) { normalized = true; }
        var vec = Vec2.subtract(this.b, this.a);
        return normalized
            ? Vec2.normalized(vec)
            : vec;
    };
    return LineSegment;
}());


;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/_internal/polyline-triangulate/polySegment.ts

var PolySegment = (function () {
    function PolySegment(center, thickness) {
        this.center = center;
        this.edge1 = center.add(Vec2.multiplyByScalar(center.normal(), thickness));
        this.edge2 = center.substract(Vec2.multiplyByScalar(center.normal(), thickness));
    }
    return PolySegment;
}());


;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/_internal/polyline-triangulate/polylineTriangulator.ts



var PolylineTriangulator = (function () {
    function PolylineTriangulator() {
    }
    PolylineTriangulator.create = function (points, thickness, jointStyle, endCapStyle, allowOverlap) {
        if (jointStyle === void 0) { jointStyle = 0; }
        if (endCapStyle === void 0) { endCapStyle = 0; }
        if (allowOverlap === void 0) { allowOverlap = false; }
        var vertices = [];
        this._create(vertices, points, thickness, jointStyle, endCapStyle, allowOverlap);
        return vertices;
    };
    PolylineTriangulator._create = function (vertices, points, thickness, jointStyle, endCapStyle, allowOverlap) {
        var numVerticesBefore = vertices.length;
        this.__create(vertices, points, thickness, jointStyle, endCapStyle, allowOverlap);
        return vertices.length - numVerticesBefore;
    };
    PolylineTriangulator.__create = function (vertices, points, thickness, jointStyle, endCapStyle, allowOverlap) {
        thickness /= 2;
        var segments = [];
        for (var i = 0; i + 1 < points.length; i++) {
            var point1 = points[i];
            var point2 = points[i + 1];
            if (!Vec2.equals(point1, point2)) {
                segments.push(new PolySegment(new LineSegment(point1, point2), thickness));
            }
        }
        if (endCapStyle === 3) {
            var point1 = points[points.length - 1];
            var point2 = points[0];
            if (!Vec2.equals(point1, point2)) {
                segments.push(new PolySegment(new LineSegment(point1, point2), thickness));
            }
        }
        if (segments.length === 0) {
            return vertices;
        }
        var nextStart1 = new Vec2(0, 0);
        var nextStart2 = new Vec2(0, 0);
        var start1 = new Vec2(0, 0);
        var start2 = new Vec2(0, 0);
        var end1 = new Vec2(0, 0);
        var end2 = new Vec2(0, 0);
        var firstSegment = segments[0];
        var lastSegment = segments[segments.length - 1];
        var pathStart1 = firstSegment.edge1.a;
        var pathStart2 = firstSegment.edge2.a;
        var pathEnd1 = lastSegment.edge1.b;
        var pathEnd2 = lastSegment.edge2.b;
        if (endCapStyle === 1) {
            pathStart1 = Vec2.subtract(pathStart1, Vec2.multiplyByScalar(firstSegment.edge1.direction(), thickness));
            pathStart2 = Vec2.subtract(pathStart2, Vec2.multiplyByScalar(firstSegment.edge2.direction(), thickness));
            pathEnd1 = Vec2.add(pathEnd1, Vec2.multiplyByScalar(lastSegment.edge1.direction(), thickness));
            pathEnd2 = Vec2.add(pathEnd2, Vec2.multiplyByScalar(lastSegment.edge2.direction(), thickness));
        }
        else if (endCapStyle === 2) {
            this.createTriangleFan(vertices, firstSegment.center.a, firstSegment.center.a, firstSegment.edge1.a, firstSegment.edge2.a, false);
            this.createTriangleFan(vertices, lastSegment.center.b, lastSegment.center.b, lastSegment.edge1.b, lastSegment.edge2.b, true);
        }
        else if (endCapStyle === 3) {
            var byRef = {
                segment1: lastSegment, segment2: firstSegment,
                end1: pathEnd1, end2: pathEnd2,
                nextStart1: pathStart1, nextStart2: pathStart2
            };
            this.createJoint(vertices, jointStyle, allowOverlap, byRef);
            pathEnd1 = byRef.end1;
            pathEnd2 = byRef.end2;
            pathStart1 = byRef.nextStart1;
            pathStart2 = byRef.nextStart2;
        }
        for (var i = 0; i < segments.length; i++) {
            var segment = segments[i];
            if (i === 0) {
                start1 = pathStart1;
                start2 = pathStart2;
            }
            if (i + 1 === segments.length) {
                end1 = pathEnd1;
                end2 = pathEnd2;
            }
            else {
                var byRef = {
                    segment1: segment, segment2: segments[i + 1],
                    end1: end1,
                    end2: end1,
                    nextStart1: nextStart1,
                    nextStart2: nextStart2
                };
                this.createJoint(vertices, jointStyle, allowOverlap, byRef);
                end1 = byRef.end1;
                end2 = byRef.end2;
                nextStart1 = byRef.nextStart1;
                nextStart2 = byRef.nextStart2;
            }
            vertices.push(start1);
            vertices.push(start2);
            vertices.push(end1);
            vertices.push(end1);
            vertices.push(start2);
            vertices.push(end2);
            start1 = nextStart1;
            start2 = nextStart2;
        }
        return vertices;
    };
    PolylineTriangulator.createJoint = function (vertices, jointStyle, allowOverlap, byRef) {
        var dir1 = byRef.segment1.center.direction();
        var dir2 = byRef.segment2.center.direction();
        var angle = Vec2.angle(dir1, dir2);
        var wrappedAngle = angle;
        if (wrappedAngle > Math.PI / 2) {
            wrappedAngle = Math.PI - wrappedAngle;
        }
        if (jointStyle === 0 && wrappedAngle < this.miterMinAngle) {
            jointStyle = 1;
        }
        if (jointStyle === 0) {
            var sec1 = LineSegment.intersection(byRef.segment1.edge1, byRef.segment2.edge1, true);
            var sec2 = LineSegment.intersection(byRef.segment1.edge2, byRef.segment2.edge2, true);
            byRef.end1 = sec1 ? sec1 : byRef.segment1.edge1.b;
            byRef.end2 = sec2 ? sec2 : byRef.segment1.edge2.b;
            byRef.nextStart1 = byRef.end1;
            byRef.nextStart2 = byRef.end2;
        }
        else {
            var x1 = dir1.x;
            var x2 = dir2.x;
            var y1 = dir1.y;
            var y2 = dir2.y;
            var clockwise = x1 * y2 - x2 * y1 < 0;
            var inner1 = void 0, inner2 = void 0, outer1 = void 0, outer2 = void 0;
            if (clockwise) {
                outer1 = byRef.segment1.edge1;
                outer2 = byRef.segment2.edge1;
                inner1 = byRef.segment1.edge2;
                inner2 = byRef.segment2.edge2;
            }
            else {
                outer1 = byRef.segment1.edge2;
                outer2 = byRef.segment2.edge2;
                inner1 = byRef.segment1.edge1;
                inner2 = byRef.segment2.edge1;
            }
            var innerSecOpt = LineSegment.intersection(inner1, inner2, allowOverlap);
            var innerSec = innerSecOpt
                ? innerSecOpt
                : inner1.b;
            var innerStart = void 0;
            if (innerSecOpt) {
                innerStart = innerSec;
            }
            else if (angle > Math.PI / 2) {
                innerStart = outer1.b;
            }
            else {
                innerStart = inner1.b;
            }
            if (clockwise) {
                byRef.end1 = outer1.b;
                byRef.end2 = innerSec;
                byRef.nextStart1 = outer2.a;
                byRef.nextStart2 = innerStart;
            }
            else {
                byRef.end1 = innerSec;
                byRef.end2 = outer1.b;
                byRef.nextStart1 = innerStart;
                byRef.nextStart2 = outer2.a;
            }
            if (jointStyle === 1) {
                vertices.push(outer1.b);
                vertices.push(outer2.a);
                vertices.push(innerSec);
            }
            else if (jointStyle === 2) {
                this.createTriangleFan(vertices, innerSec, byRef.segment1.center.b, outer1.b, outer2.a, clockwise);
            }
            else {
                throw new Error("unexpected state");
            }
        }
        return vertices;
    };
    PolylineTriangulator.createTriangleFan = function (vertices, connectTo, origin, start, end, clockwise) {
        var point1 = Vec2.subtract(start, origin);
        var point2 = Vec2.subtract(end, origin);
        var angle1 = Math.atan2(point1.y, point1.x);
        var angle2 = Math.atan2(point2.y, point2.x);
        if (clockwise) {
            if (angle2 > angle1) {
                angle2 = angle2 - 2 * Math.PI;
            }
        }
        else {
            if (angle1 > angle2) {
                angle1 = angle1 - 2 * Math.PI;
            }
        }
        var jointAngle = angle2 - angle1;
        var numTriangles = ~~(Math.max(1, Math.floor(Math.abs(jointAngle) / this.roundMinAngle)));
        var triAngle = jointAngle / numTriangles;
        var startPoint = new Vec2(start.x, start.y);
        var endPoint = new Vec2(0, 0);
        for (var t = 0; t < numTriangles; t++) {
            if (t + 1 === numTriangles) {
                endPoint = new Vec2(end.x, end.y);
            }
            else {
                var rot = (t + 1) * triAngle;
                endPoint.x = Math.cos(rot) * point1.x - Math.sin(rot) * point1.y;
                endPoint.y = Math.sin(rot) * point1.x + Math.cos(rot) * point1.y;
                endPoint = Vec2.add(endPoint, origin);
            }
            vertices.push(startPoint.clone());
            vertices.push(endPoint.clone());
            vertices.push(connectTo.clone());
            startPoint = new Vec2(endPoint.x, endPoint.y);
        }
        return vertices;
    };
    PolylineTriangulator.miterMinAngle = 0.349066;
    PolylineTriangulator.roundMinAngle = 0.174533;
    return PolylineTriangulator;
}());

;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/_internal/triangulatedPathFromPolyline.ts





var PolylinePrimitive = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(PolylinePrimitive, _super);
    function PolylinePrimitive() {
        var _this = _super.call(this) || this;
        _this.vertexArr = [];
        _this.normalArr = undefined;
        _this.texCoordArr = undefined;
        _this.indexArr = undefined;
        return _this;
    }
    return PolylinePrimitive;
}(AbstractPrimitive));
var triangulatedPathFromPolyline = function (game, p, params) {
    var lineWidth = params.lineWidth, jointStyle = params.jointStyle, endCapStyle = params.endCapStyle;
    lineWidth !== null && lineWidth !== void 0 ? lineWidth : (lineWidth = 1);
    jointStyle !== null && jointStyle !== void 0 ? jointStyle : (jointStyle = 0);
    if (p.closed)
        endCapStyle = 3;
    else
        endCapStyle !== null && endCapStyle !== void 0 ? endCapStyle : (endCapStyle = 0);
    var vertices = [];
    p.getSegments().forEach(function (l) {
        vertices.push(new Vec2(l.pos.x, l.pos.y));
    });
    var lastLine = p.getSegments()[p.getSegments().length - 1];
    vertices.push(new Vec2(lastLine.pos.x + lastLine.pointTo.x, lastLine.pos.y + lastLine.pointTo.y));
    var triangleVertices = PolylineTriangulator.create(vertices, lineWidth, jointStyle, endCapStyle);
    var modelPrimitive = new PolylinePrimitive();
    triangleVertices.forEach(function (t) {
        modelPrimitive.vertexArr.push(t.x, t.y);
    });
    modelPrimitive.drawMethod = 3;
    modelPrimitive.vertexItemSize = 2;
    return new Polygon(game, modelPrimitive);
};

;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/polyLine.ts










var PolyLine = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(PolyLine, _super);
    function PolyLine(game, closed) {
        var _this = _super.call(this, game) || this;
        _this.closed = closed;
        _this.color = Color.BLACK.clone();
        _this._segments = [];
        return _this;
    }
    PolyLine.fromVertices = function (game, vertices, params, close) {
        if (params === void 0) { params = {}; }
        if (close === void 0) { close = false; }
        if (typeof vertices === 'string') {
            vertices = clearString(vertices).split(/[ |,]/).map(function (it) {
                var n = parseFloat(it);
                if ( true && isNaN(n))
                    throw new debugError/* DebugError */.N("can not parse vertex array ".concat(vertices, ": unexpected value ").concat(it));
                return n;
            });
        }
        if ( true && vertices.length === 0)
            return new PolyLine(game, close);
        if (close)
            vertices = closePolylinePoints(vertices);
        var p = new PolyLine(game, close);
        for (var i = 0; i < vertices.length - 2; i += 2) {
            var line = new Line(game);
            var x1 = vertices[i], y1 = vertices[i + 1];
            var x2 = vertices[i + 2], y2 = vertices[i + 3];
            line.setXYX1Y1(x1, y1, x2, y2);
            p._segments.push(line);
            p.updateSizeIfRequired(x1, y1);
            p.updateSizeIfRequired(x2, y2);
        }
        var mesh = triangulatedPathFromPolyline(game, p, params);
        mesh.fillColor = p.color;
        p.appendChild(mesh);
        return p;
    };
    PolyLine.fromPoints = function (game, poins, params, close) {
        if (params === void 0) { params = {}; }
        if (close === void 0) { close = false; }
        var vertices = [];
        for (var _i = 0, poins_1 = poins; _i < poins_1.length; _i++) {
            var p = poins_1[_i];
            vertices.push(p.x, p.y);
        }
        return this.fromVertices(game, vertices, params, close);
    };
    PolyLine.fromMultiCurveSvgPath = function (game, path, params, close) {
        if (params === void 0) { params = {}; }
        if (close === void 0) { close = false; }
        var arr = new SvgPathToVertexArrayBuilder(game).parsePolylines(path, close);
        var result = [];
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var group = arr_1[_i];
            result.push(this.fromVertices(game, group.vertexArray, params, group.closed));
        }
        return result;
    };
    PolyLine.fromSvgPath = function (game, path, params, close) {
        if (params === void 0) { params = {}; }
        if (close === void 0) { close = false; }
        var p = this.fromMultiCurveSvgPath(game, path, params, close);
        if ( true && p.length > 1)
            throw new debugError/* DebugError */.N("path is multi curve, use fromMultiCurveSvgPath instead");
        return p[0];
    };
    PolyLine.splineFromPoints = function (game, points, params, close) {
        if (params === void 0) { params = {}; }
        if (close === void 0) { close = false; }
        return PolyLine.fromSvgPath(game, createSplinePathFromPoints(points), params, close);
    };
    PolyLine.prototype.getSegments = function () {
        return this._segments;
    };
    PolyLine.prototype.clone = function () {
        var l = new PolyLine(this.game, this.closed);
        this.setClonedProperties(l);
        return l;
    };
    PolyLine.prototype.draw = function () { };
    PolyLine.prototype.updateSizeIfRequired = function (x, y) {
        if (this.size.width < x)
            this.size.width = x;
        if (this.size.height < y)
            this.size.height = y;
    };
    return PolyLine;
}(RenderableModel));


;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/_internal/calcNormal.ts
var calcNormal = function (p1, p2, p3) {
    var a = {
        x: p2.x - p1.x,
        y: p2.y - p1.y,
        z: p2.z - p1.z,
    };
    var b = {
        x: p3.x - p1.x,
        y: p3.y - p1.y,
        z: p3.z - p1.z,
    };
    var n = {
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.x
    };
    var l = Math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z);
    return {
        x: n.x / l,
        y: n.y / l,
        z: n.z / l
    };
};

;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/_internal/isPolylineClockWise.ts
var isPolylineCloseWise = function (vertices) {
    var sum = 0.0;
    var l = vertices.length;
    for (var i = 0; i < l; i += 2) {
        var v1x = vertices[i];
        var v1y = vertices[(i + 1) % l];
        var v2x = vertices[(i + 2) % l];
        var v2y = vertices[(i + 3) % l];
        sum += (v2x - v1x) * (v2y + v1y);
    }
    return sum > 0.0;
};

;// CONCATENATED MODULE: ./engine/renderable/impl/3d/meshMaterial.ts

var MeshMaterial = (function () {
    function MeshMaterial() {
        this.specular = 0;
        this.diffuseColorMix = 0;
        this.reflectivity = 0;
        this.diffuseColor = Color.BLACK.clone();
    }
    MeshMaterial.prototype.setClonedProperties = function (cloned) {
        cloned.specular = this.specular;
        cloned.diffuseColorMix = this.diffuseColorMix;
        cloned.reflectivity = this.reflectivity;
        cloned.diffuseColor = this.diffuseColor.clone();
    };
    MeshMaterial.prototype.clone = function () {
        var cloned = new MeshMaterial();
        this.setClonedProperties(cloned);
        return cloned;
    };
    return MeshMaterial;
}());


;// CONCATENATED MODULE: ./engine/renderable/impl/3d/mesh3d.ts



var Mesh3d = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(Mesh3d, _super);
    function Mesh3d(game, modelPrimitive, bufferInfo) {
        var _this = _super.call(this, game, modelPrimitive, bufferInfo) || this;
        _this.invertY = false;
        _this.cullFace = 2;
        _this.material = new MeshMaterial();
        return _this;
    }
    Mesh3d.prototype.acceptLight = function (val) {
        this._lightAccepted = val;
    };
    Mesh3d.prototype.isLightAccepted = function () {
        return this._lightAccepted;
    };
    Mesh3d.prototype._transform = function () {
        _super.prototype._transform.call(this);
        if (this.invertY)
            this.game.getRenderer().transformScale(1, -1, 1);
    };
    Mesh3d.prototype.draw = function () {
        this.game.getRenderer().drawMesh3d(this);
    };
    Mesh3d.prototype.onUpdatingBuffers = function () { };
    Mesh3d.prototype.setClonedProperties = function (cloned) {
        _super.prototype.setClonedProperties.call(this, cloned);
        cloned.texture = this.texture;
        cloned.cubeMapTexture = this.cubeMapTexture;
        cloned.normalsTexture = this.normalsTexture;
        cloned.specularTexture = this.specularTexture;
        cloned.material = this.material.clone();
        cloned.invertY = this.invertY;
    };
    return Mesh3d;
}(Mesh2d));


;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/_internal/earCut.ts
var earCut = function (data, holeIndices, dim) {
    if (holeIndices === void 0) { holeIndices = null; }
    if (dim === void 0) { dim = 2; }
    dim = dim || 2;
    var hasHoles = holeIndices && holeIndices.length, outerLen = hasHoles ? holeIndices[0] * dim : data.length;
    var outerNode = linkedList(data, 0, outerLen, dim, true);
    var triangles = [];
    if (!outerNode || outerNode.next === outerNode.prev)
        return triangles;
    var minX = 0, minY = 0, maxX, maxY, x, y, invSize = 0;
    if (hasHoles)
        outerNode = eliminateHoles(data, holeIndices, outerNode, dim);
    if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];
        for (var i = dim; i < outerLen; i += dim) {
            x = data[i];
            y = data[i + 1];
            if (x < minX)
                minX = x;
            if (y < minY)
                minY = y;
            if (x > maxX)
                maxX = x;
            if (y > maxY)
                maxY = y;
        }
        invSize = Math.max(maxX - minX, maxY - minY);
        invSize = invSize !== 0 ? 1 / invSize : 0;
    }
    earcutLinked(outerNode, triangles, dim, minX, minY, invSize);
    return triangles;
};
function linkedList(data, start, end, dim, clockwise) {
    var i, last = null;
    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
        for (i = start; i < end; i += dim)
            last = insertNode(i, data[i], data[i + 1], last);
    }
    else {
        for (i = end - dim; i >= start; i -= dim)
            last = insertNode(i, data[i], data[i + 1], last);
    }
    if (last && equals(last, last.next)) {
        removeNode(last);
        last = last.next;
    }
    return last;
}
function filterPoints(start, end) {
    if (end === void 0) { end = null; }
    if (!start)
        return start;
    if (!end)
        end = start;
    var p = start, again;
    do {
        again = false;
        if (!p.steiner && (equals(p, p.next) || earCut_area(p.prev, p, p.next) === 0)) {
            removeNode(p);
            p = end = p.prev;
            if (p === p.next)
                break;
            again = true;
        }
        else {
            p = p.next;
        }
    } while (again || p !== end);
    return end;
}
function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
    if (pass === void 0) { pass = 0; }
    if (!ear)
        return;
    if (!pass && invSize)
        indexCurve(ear, minX, minY, invSize);
    var stop = ear, prev, next;
    while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;
        if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
            triangles.push(prev.i / dim);
            triangles.push(ear.i / dim);
            triangles.push(next.i / dim);
            removeNode(ear);
            ear = next.next;
            stop = next.next;
            continue;
        }
        ear = next;
        if (ear === stop) {
            if (!pass) {
                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);
            }
            else if (pass === 1) {
                ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
                earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);
            }
            else if (pass === 2) {
                splitEarcut(ear, triangles, dim, minX, minY, invSize);
            }
            break;
        }
    }
}
function isEar(ear) {
    var a = ear.prev, b = ear, c = ear.next;
    if (earCut_area(a, b, c) >= 0)
        return false;
    var p = ear.next.next;
    while (p !== ear.prev) {
        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            earCut_area(p.prev, p, p.next) >= 0)
            return false;
        p = p.next;
    }
    return true;
}
function isEarHashed(ear, minX, minY, invSize) {
    var a = ear.prev, b = ear, c = ear.next;
    if (earCut_area(a, b, c) >= 0)
        return false;
    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x), minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y), maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x), maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);
    var minZ = zOrder(minTX, minTY, minX, minY, invSize), maxZ = zOrder(maxTX, maxTY, minX, minY, invSize);
    var p = ear.prevZ, n = ear.nextZ;
    while (p && p.z >= minZ && n && n.z <= maxZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            earCut_area(p.prev, p, p.next) >= 0)
            return false;
        p = p.prevZ;
        if (n !== ear.prev && n !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
            earCut_area(n.prev, n, n.next) >= 0)
            return false;
        n = n.nextZ;
    }
    while (p && p.z >= minZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            earCut_area(p.prev, p, p.next) >= 0)
            return false;
        p = p.prevZ;
    }
    while (n && n.z <= maxZ) {
        if (n !== ear.prev && n !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
            earCut_area(n.prev, n, n.next) >= 0)
            return false;
        n = n.nextZ;
    }
    return true;
}
function cureLocalIntersections(start, triangles, dim) {
    var p = start;
    do {
        var a = p.prev, b = p.next.next;
        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
            triangles.push(a.i / dim);
            triangles.push(p.i / dim);
            triangles.push(b.i / dim);
            removeNode(p);
            removeNode(p.next);
            p = start = b;
        }
        p = p.next;
    } while (p !== start);
    return filterPoints(p);
}
function splitEarcut(start, triangles, dim, minX, minY, invSize) {
    var a = start;
    do {
        var b = a.next.next;
        while (b !== a.prev) {
            if (a.i !== b.i && isValidDiagonal(a, b)) {
                var c = splitPolygon(a, b);
                a = filterPoints(a, a.next);
                c = filterPoints(c, c.next);
                earcutLinked(a, triangles, dim, minX, minY, invSize);
                earcutLinked(c, triangles, dim, minX, minY, invSize);
                return;
            }
            b = b.next;
        }
        a = a.next;
    } while (a !== start);
}
function eliminateHoles(data, holeIndices, outerNode, dim) {
    var queue = [];
    var i, len, start, end, list;
    for (i = 0, len = holeIndices.length; i < len; i++) {
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next)
            list.steiner = true;
        queue.push(getLeftmost(list));
    }
    queue.sort(compareX);
    for (i = 0; i < queue.length; i++) {
        outerNode = eliminateHole(queue[i], outerNode);
        outerNode = filterPoints(outerNode, outerNode.next);
    }
    return outerNode;
}
function compareX(a, b) {
    return a.x - b.x;
}
function eliminateHole(hole, outerNode) {
    var bridge = findHoleBridge(hole, outerNode);
    if (!bridge) {
        return outerNode;
    }
    var bridgeReverse = splitPolygon(bridge, hole);
    var filteredBridge = filterPoints(bridge, bridge.next);
    filterPoints(bridgeReverse, bridgeReverse.next);
    return outerNode === bridge ? filteredBridge : outerNode;
}
function findHoleBridge(hole, outerNode) {
    var p = outerNode;
    var hx = hole.x, hy = hole.y;
    var qx = -Infinity, m;
    do {
        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) {
                qx = x;
                if (x === hx) {
                    if (hy === p.y)
                        return p;
                    if (hy === p.next.y)
                        return p.next;
                }
                m = p.x < p.next.x ? p : p.next;
            }
        }
        p = p.next;
    } while (p !== outerNode);
    if (!m)
        return null;
    if (hx === qx)
        return m;
    var stop = m, mx = m.x, my = m.y;
    var tanMin = Infinity, tan;
    p = m;
    do {
        if (hx >= p.x && p.x >= mx && hx !== p.x &&
            pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
            tan = Math.abs(hy - p.y) / (hx - p.x);
            if (locallyInside(p, hole) &&
                (tan < tanMin || (tan === tanMin && (p.x > m.x || (p.x === m.x && sectorContainsSector(m, p)))))) {
                m = p;
                tanMin = tan;
            }
        }
        p = p.next;
    } while (p !== stop);
    return m;
}
function sectorContainsSector(m, p) {
    return earCut_area(m.prev, m, p.prev) < 0 && earCut_area(p.next, m, m.next) < 0;
}
function indexCurve(start, minX, minY, invSize) {
    var p = start;
    do {
        if (p.z === null)
            p.z = zOrder(p.x, p.y, minX, minY, invSize);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    } while (p !== start);
    p.prevZ.nextZ = null;
    p.prevZ = null;
    sortLinked(p);
}
function sortLinked(list) {
    var i, p, q, e, tail, numMerges, pSize, qSize, inSize = 1;
    do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;
        while (p) {
            numMerges++;
            q = p;
            pSize = 0;
            for (i = 0; i < inSize; i++) {
                pSize++;
                q = q.nextZ;
                if (!q)
                    break;
            }
            qSize = inSize;
            while (pSize > 0 || (qSize > 0 && q)) {
                if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                }
                else {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                }
                if (tail)
                    tail.nextZ = e;
                else
                    list = e;
                e.prevZ = tail;
                tail = e;
            }
            p = q;
        }
        tail.nextZ = null;
        inSize *= 2;
    } while (numMerges > 1);
    return list;
}
function zOrder(x, y, minX, minY, invSize) {
    x = 32767 * (x - minX) * invSize;
    y = 32767 * (y - minY) * invSize;
    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;
    y = (y | (y << 8)) & 0x00FF00FF;
    y = (y | (y << 4)) & 0x0F0F0F0F;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;
    return x | (y << 1);
}
function getLeftmost(start) {
    var p = start, leftmost = start;
    do {
        if (p.x < leftmost.x || (p.x === leftmost.x && p.y < leftmost.y))
            leftmost = p;
        p = p.next;
    } while (p !== start);
    return leftmost;
}
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
        (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
        (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
}
function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) &&
        (locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) &&
            (earCut_area(a.prev, a, b.prev) || earCut_area(a, b.prev, b)) ||
            equals(a, b) && earCut_area(a.prev, a, a.next) > 0 && earCut_area(b.prev, b, b.next) > 0);
}
function earCut_area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}
function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}
function intersects(p1, q1, p2, q2) {
    var o1 = sign(earCut_area(p1, q1, p2));
    var o2 = sign(earCut_area(p1, q1, q2));
    var o3 = sign(earCut_area(p2, q2, p1));
    var o4 = sign(earCut_area(p2, q2, q1));
    if (o1 !== o2 && o3 !== o4)
        return true;
    if (o1 === 0 && onSegment(p1, p2, q1))
        return true;
    if (o2 === 0 && onSegment(p1, q2, q1))
        return true;
    if (o3 === 0 && onSegment(p2, p1, q2))
        return true;
    if (o4 === 0 && onSegment(p2, q1, q2))
        return true;
    return false;
}
function onSegment(p, q, r) {
    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
}
function sign(num) {
    return num > 0 ? 1 : num < 0 ? -1 : 0;
}
function intersectsPolygon(a, b) {
    var p = a;
    do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
            intersects(p, p.next, a, b))
            return true;
        p = p.next;
    } while (p !== a);
    return false;
}
function locallyInside(a, b) {
    return earCut_area(a.prev, a, a.next) < 0 ?
        earCut_area(a, b, a.next) >= 0 && earCut_area(a, a.prev, b) >= 0 :
        earCut_area(a, b, a.prev) < 0 || earCut_area(a, a.next, b) < 0;
}
function middleInside(a, b) {
    var p = a, inside = false;
    var px = (a.x + b.x) / 2, py = (a.y + b.y) / 2;
    do {
        if (((p.y > py) !== (p.next.y > py)) && p.next.y !== p.y &&
            (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
            inside = !inside;
        p = p.next;
    } while (p !== a);
    return inside;
}
function splitPolygon(a, b) {
    var a2 = new LinkedNode(a.i, a.x, a.y), b2 = new LinkedNode(b.i, b.x, b.y), an = a.next, bp = b.prev;
    a.next = b;
    b.prev = a;
    a2.next = an;
    an.prev = a2;
    b2.next = a2;
    a2.prev = b2;
    bp.next = b2;
    b2.prev = bp;
    return b2;
}
function insertNode(i, x, y, last) {
    var p = new LinkedNode(i, x, y);
    if (!last) {
        p.prev = p;
        p.next = p;
    }
    else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    }
    return p;
}
function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;
    if (p.prevZ)
        p.prevZ.nextZ = p.nextZ;
    if (p.nextZ)
        p.nextZ.prevZ = p.prevZ;
}
var LinkedNode = (function () {
    function LinkedNode(i, x, y) {
        this.i = i;
        this.x = x;
        this.y = y;
        this.prev = null;
        this.next = null;
        this.z = null;
        this.prevZ = null;
        this.nextZ = null;
        this.steiner = false;
    }
    return LinkedNode;
}());
function signedArea(data, start, end, dim) {
    var sum = 0;
    var i = start, j = end - dim;
    for (; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    }
    return sum;
}

;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/polygon.ts









var PolygonPrimitive = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(PolygonPrimitive, _super);
    function PolygonPrimitive() {
        var _this = _super.call(this) || this;
        _this.vertexArr = [];
        _this.vertexItemSize = 2;
        return _this;
    }
    return PolygonPrimitive;
}(AbstractPrimitive));
var Polygon = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(Polygon, _super);
    function Polygon(game, modelPrimitive) {
        var _this = _super.call(this, game, modelPrimitive) || this;
        _this.type = 'Polygon';
        return _this;
    }
    Polygon.fromMultiCurveSvgPath = function (game, path) {
        var polygons = [];
        var polyLines = PolyLine.fromMultiCurveSvgPath(game, path, {}, true);
        polyLines.forEach(function (p) {
            polygons.push(Polygon.fromPolyline(game, p));
            p.destroy();
        });
        return polygons;
    };
    Polygon.createStar = function (game, points, radius, innerRadius, rotation) {
        if (innerRadius === void 0) { innerRadius = radius / 2; }
        if (rotation === void 0) { rotation = 0; }
        var startAngle = (-1 * Math.PI / 2) + rotation;
        var len = points * 2;
        var delta = Math.PI * 2 / len;
        var vertices = [];
        for (var i = 0; i < len; i++) {
            var r = i % 2 ? innerRadius : radius;
            var angle = (i * delta) + startAngle;
            vertices.push((r * Math.cos(angle)), (r * Math.sin(angle)));
        }
        vertices.push(vertices[0], vertices[1]);
        var p = PolyLine.fromVertices(game, vertices);
        return Polygon.fromPolyline(game, p);
    };
    Polygon.fromPolyline = function (game, p) {
        var vertices = [];
        for (var _i = 0, _a = p.getSegments(); _i < _a.length; _i++) {
            var l = _a[_i];
            vertices.push(l.pos.x, l.pos.y);
        }
        if (p.closed)
            vertices = closePolylinePoints(vertices);
        var triangulatedIndices = earCut(vertices);
        var triangulatedVertices = [];
        for (var _b = 0, triangulatedIndices_1 = triangulatedIndices; _b < triangulatedIndices_1.length; _b++) {
            var ind = triangulatedIndices_1[_b];
            triangulatedVertices.push(vertices[2 * ind], vertices[2 * ind + 1]);
        }
        var modelPrimitive = new PolygonPrimitive();
        modelPrimitive.vertexArr = triangulatedVertices;
        var pg = new Polygon(game, modelPrimitive);
        pg.size.setFrom(p.size);
        pg._edgeVertices = vertices;
        return pg;
    };
    Polygon.fromSvgPath = function (game, p) {
        var polyline = PolyLine.fromSvgPath(game, p, {}, true);
        return Polygon.fromPolyline(game, polyline);
    };
    Polygon.fromVertices = function (game, vertices) {
        var verticesClosed = closePolylinePoints(vertices);
        return Polygon.fromPolyline(game, PolyLine.fromVertices(game, verticesClosed));
    };
    Polygon.fromPoints = function (game, points) {
        var vertices = [];
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var p = points_1[_i];
            vertices.push(p.x, p.y);
        }
        return Polygon.fromPolyline(game, PolyLine.fromVertices(game, vertices));
    };
    Polygon.prototype.isClockWise = function () {
        return isPolylineCloseWise(this._edgeVertices);
    };
    Polygon.prototype.getEdgeVertices = function () {
        return this._edgeVertices;
    };
    Polygon.prototype.extrudeToMesh = function (depth) {
        var _a;
        var isClockWise = this.isClockWise();
        var primitive = new (function (_super) {
            (0,tslib_es6/* __extends */.ZT)(class_1, _super);
            function class_1() {
                return _super.call(this) || this;
            }
            return class_1;
        }(AbstractPrimitive))();
        primitive.normalArr = [];
        primitive.vertexArr = [];
        primitive.vertexItemSize = 3;
        var d2 = depth / 2;
        for (var i = 0; i < this._modelPrimitive.vertexArr.length; i += 6) {
            var vertexA1 = this._modelPrimitive.vertexArr[i];
            var vertexA2 = this._modelPrimitive.vertexArr[i + 1];
            var vertexB1 = this._modelPrimitive.vertexArr[i + 2];
            var vertexB2 = this._modelPrimitive.vertexArr[i + 3];
            var vertexC1 = this._modelPrimitive.vertexArr[i + 4];
            var vertexC2 = this._modelPrimitive.vertexArr[i + 5];
            primitive.vertexArr.push(vertexA1, vertexA2, d2, vertexB1, vertexB2, d2, vertexC1, vertexC2, d2);
            primitive.normalArr.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
            primitive.vertexArr.push(vertexA1, vertexA2, -d2, vertexB1, vertexB2, -d2, vertexC1, vertexC2, -d2);
            primitive.normalArr.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
        }
        for (var i = 0; i < this._edgeVertices.length - 2; i += 2) {
            var edgeVertexA1 = this._edgeVertices[i];
            var edgeVertexA2 = this._edgeVertices[i + 1];
            var edgeVertexB1 = this._edgeVertices[i + 2];
            var edgeVertexB2 = this._edgeVertices[i + 3];
            if (!isClockWise) {
                _a = [edgeVertexB1, edgeVertexB2, edgeVertexA1, edgeVertexA2], edgeVertexA1 = _a[0], edgeVertexA2 = _a[1], edgeVertexB1 = _a[2], edgeVertexB2 = _a[3];
            }
            primitive.vertexArr.push(edgeVertexA1, edgeVertexA2, d2, edgeVertexB1, edgeVertexB2, d2, edgeVertexA1, edgeVertexA2, -d2, edgeVertexA1, edgeVertexA2, -d2, edgeVertexB1, edgeVertexB2, d2, edgeVertexB1, edgeVertexB2, -d2);
            var normal = calcNormal({ x: edgeVertexA1, y: edgeVertexA2, z: d2 }, { x: edgeVertexB1, y: edgeVertexB2, z: d2 }, { x: edgeVertexA1, y: edgeVertexA2, z: -d2 });
            primitive.normalArr.push(normal.x, normal.y, normal.z, normal.x, normal.y, normal.z, normal.x, normal.y, normal.z, normal.x, normal.y, normal.z, normal.x, normal.y, normal.z, normal.x, normal.y, normal.z);
        }
        var game = this.game;
        var m = new (function (_super) {
            (0,tslib_es6/* __extends */.ZT)(class_2, _super);
            function class_2() {
                var _this = _super.call(this, game, primitive) || this;
                _this.invertY = true;
                return _this;
            }
            return class_2;
        }(Mesh3d))();
        m.depthTest = true;
        m.material.diffuseColor = this.fillColor.clone();
        m.size.setFrom(this.size);
        return m;
    };
    return Polygon;
}(Mesh2d));


;// CONCATENATED MODULE: ./engine/misc/math/mat4Special.ts
var Mat4Special;
(function (Mat4Special) {
    Mat4Special.multiplyTranslationByAny = function (out, aHolder, bHolder) {
        if (bHolder.identityFlag && out === aHolder) {
            return;
        }
        var r = out.mat16;
        var a = aHolder.mat16;
        var b = bHolder.mat16;
        var a12 = a[12], a13 = a[13], a14 = a[14];
        var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
        var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
        r.set(b);
        r[12] = a12 * b0 + a13 * b4 + a14 * b8 + b12;
        r[13] = a12 * b1 + a13 * b5 + a14 * b9 + b13;
        r[14] = a12 * b2 + a13 * b6 + a14 * b10 + b14;
    };
    Mat4Special.multiplyRotationXByAny = function (out, aHolder, bHolder) {
        if (bHolder.identityFlag && out === aHolder) {
            return;
        }
        var r = out.mat16;
        var a = aHolder.mat16;
        var b = bHolder.mat16;
        var a5 = a[5], a6 = a[6], a9 = a[9], a10 = a[10];
        var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
        var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
        var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
        r[0] = b0;
        r[1] = b1;
        r[2] = b2;
        r[3] = 0;
        r[4] = a5 * b4 + a6 * b8;
        r[5] = a5 * b5 + a6 * b9;
        r[6] = a5 * b6 + a6 * b10;
        r[7] = 0;
        r[8] = a9 * b4 + a10 * b8;
        r[9] = a9 * b5 + a10 * b9;
        r[10] = a9 * b6 + a10 * b10;
        r[11] = 0;
        r[12] = b12;
        r[13] = b13;
        r[14] = b14;
        r[15] = b15;
    };
    Mat4Special.multiplyRotationYByAny = function (out, aHolder, bHolder) {
        if (bHolder.identityFlag && out === aHolder) {
            return;
        }
        var r = out.mat16;
        var a = aHolder.mat16;
        var b = bHolder.mat16;
        var a0 = a[0], a2 = a[2], a8 = a[8], a10 = a[10];
        var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
        var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
        var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
        r[0] = a0 * b0 + a2 * b8;
        r[1] = a0 * b1 + a2 * b9;
        r[2] = a0 * b2 + a2 * b10;
        r[3] = 0;
        r[4] = b4;
        r[5] = b5;
        r[6] = b6;
        r[7] = 0;
        r[8] = a8 * b0 + a10 * b8;
        r[9] = a8 * b1 + a10 * b9;
        r[10] = a8 * b2 + a10 * b10;
        r[11] = 0;
        r[12] = b12;
        r[13] = b13;
        r[14] = b14;
        r[15] = b15;
    };
    Mat4Special.multiplyRotationZByAny = function (out, aHolder, bHolder) {
        if (bHolder.identityFlag && out === aHolder) {
            return;
        }
        var r = out.mat16;
        var a = aHolder.mat16;
        var b = bHolder.mat16;
        var a0 = a[0], a1 = a[1], a4 = a[4], a5 = a[5];
        var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
        r.set(b);
        r[0] = a0 * b0 + a1 * b4;
        r[1] = a0 * b1 + a1 * b5;
        r[2] = a0 * b2 + a1 * b6;
        r[3] = 0;
        r[4] = a4 * b0 + a5 * b4;
        r[5] = a4 * b1 + a5 * b5;
        r[6] = a4 * b2 + a5 * b6;
        r[7] = 0;
    };
    Mat4Special.multiplyScaleByAny = function (out, aHolder, bHolder) {
        if (bHolder.identityFlag && out === aHolder) {
            return;
        }
        var r = out.mat16;
        var a = aHolder.mat16;
        var b = bHolder.mat16;
        var a0 = a[0], a5 = a[5], a10 = a[10];
        var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
        var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
        r[0] = a0 * b0;
        r[1] = a0 * b1;
        r[2] = a0 * b2;
        r[3] = 0;
        r[4] = a5 * b4;
        r[5] = a5 * b5;
        r[6] = a5 * b6;
        r[7] = 0;
        r[8] = a10 * b8;
        r[9] = a10 * b9;
        r[10] = a10 * b10;
        r[11] = 0;
        r[12] = b12;
        r[13] = b13;
        r[14] = b14;
        r[15] = b15;
    };
    Mat4Special.multiplySkewXByAny = function (out, aHolder, bHolder) {
        if (bHolder.identityFlag && out === aHolder) {
            return;
        }
        var r = out.mat16;
        var a = aHolder.mat16;
        var b = bHolder.mat16;
        var a4 = a[4];
        var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
        r.set(b);
        r[0] = b0;
        r[1] = b1;
        r[2] = b2;
        r[3] = 0;
        r[4] = a4 * b0 + b4;
        r[5] = a4 * b1 + b5;
        r[6] = a4 * b2 + b6;
        r[7] = 0;
    };
    Mat4Special.multiplySkewYByAny = function (out, aHolder, bHolder) {
        if (bHolder.identityFlag && out === aHolder) {
            return;
        }
        var r = out.mat16;
        var a = aHolder.mat16;
        var b = bHolder.mat16;
        var a1 = a[1];
        var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
        r.set(b);
        r[0] = b0 + a1 * b4;
        r[1] = b1 + a1 * b5;
        r[2] = b2 + a1 * b6;
        r[3] = 0;
    };
    Mat4Special.multiplyScaleTranslateByAny = function (out, aHolder, bHolder) {
        var r = out.mat16;
        var a = aHolder.mat16;
        var b = bHolder.mat16;
        var a0 = a[0], a5 = a[5];
        var a10 = a[10], a12 = a[12], a13 = a[13];
        var b0 = b[0], b1 = b[1], b2 = b[2], b4 = b[4], b5 = b[5], b6 = b[6], b8 = b[8];
        var b9 = b[9], b10 = b[10], b12 = b[12], b13 = b[13], b14 = b[14];
        r[0] = a0 * b0;
        r[1] = a0 * b1;
        r[2] = a0 * b2;
        r[3] = 0;
        r[4] = a5 * b4;
        r[5] = a5 * b5;
        r[6] = a5 * b6;
        r[7] = 0;
        r[8] = a10 * b8;
        r[9] = a10 * b9;
        r[10] = a10 * b10;
        r[11] = 0;
        r[12] = a12 * b0 + a13 * b4 + b12;
        r[13] = a12 * b1 + a13 * b5 + b13;
        r[14] = a12 * b2 + a13 * b6 + b14;
        r[15] = 1;
    };
    Mat4Special.matrixMultiplyOptimized = function (out, aHolder, bHolder) {
        var r = out.mat16;
        var a = aHolder.mat16;
        var b = bHolder.mat16;
        var a0 = a[0], a1 = a[1], a2 = a[2], a4 = a[4], a5 = a[5], a6 = a[6], a8 = a[8];
        var a9 = a[9], a10 = a[10], a12 = a[12], a13 = a[13], a14 = a[14];
        var b0 = b[0], b1 = b[1], b2 = b[2], b4 = b[4], b5 = b[5], b6 = b[6], b8 = b[8];
        var b9 = b[9], b10 = b[10], b12 = b[12], b13 = b[13], b14 = b[14];
        r[0] = a0 * b0 + a1 * b4 + a2 * b8;
        r[1] = a0 * b1 + a1 * b5 + a2 * b9;
        r[2] = a0 * b2 + a1 * b6 + a2 * b10;
        r[3] = 0;
        r[4] = a4 * b0 + a5 * b4 + a6 * b8;
        r[5] = a4 * b1 + a5 * b5 + a6 * b9;
        r[6] = a4 * b2 + a5 * b6 + a6 * b10;
        r[7] = 0;
        r[8] = a8 * b0 + a9 * b4 + a10 * b8;
        r[9] = a8 * b1 + a9 * b5 + a10 * b9;
        r[10] = a8 * b2 + a9 * b6 + a10 * b10;
        r[11] = 0;
        r[12] = a12 * b0 + a13 * b4 + a14 * b8 + b12;
        r[13] = a12 * b1 + a13 * b5 + a14 * b9 + b13;
        r[14] = a12 * b2 + a13 * b6 + a14 * b10 + b14;
        r[15] = 1;
    };
})(Mat4Special || (Mat4Special = {}));

;// CONCATENATED MODULE: ./engine/misc/math/matrixStack.ts
var matrixStack_Mat16Holder = Mat4.Mat16Holder;



var MatrixStack = (function () {
    function MatrixStack() {
        this._stack = new Stack();
        this.restore();
    }
    MatrixStack.prototype.restore = function () {
        if (this._stack.isEmpty())
            this.setIdentity();
        else {
            var last = this._stack.pop();
            matrixStack_Mat16Holder.toPool(last);
        }
    };
    MatrixStack.prototype.save = function () {
        var copy = matrixStack_Mat16Holder.fromPool();
        var curVal = this.getCurrentValue();
        copy.fromMat16(curVal);
        this._stack.push(copy);
    };
    MatrixStack.prototype.getCurrentValue = function () {
        return this._stack.getLast();
    };
    MatrixStack.prototype.setCurrentValue = function (m) {
        return this._stack.replaceLast(m);
    };
    MatrixStack.prototype.translate = function (x, y, z) {
        if (z === void 0) { z = 0; }
        var t = matrixStack_Mat16Holder.fromPool();
        Mat4.makeTranslation(t, x, y, z);
        var m = this.getCurrentValue();
        Mat4Special.multiplyTranslationByAny(t, t, m);
        this.setCurrentValue(t);
        matrixStack_Mat16Holder.toPool(m);
        return this;
    };
    MatrixStack.prototype.setMatrix = function (val) {
        this.getCurrentValue().fromMat16(val);
        return this;
    };
    MatrixStack.prototype.transform = function (val) {
        var m = this.getCurrentValue();
        var result = matrixStack_Mat16Holder.fromPool();
        Mat4Special.matrixMultiplyOptimized(result, val, m);
        this.setCurrentValue(result);
        matrixStack_Mat16Holder.toPool(m);
    };
    MatrixStack.prototype.skewX = function (angle) {
        var t = matrixStack_Mat16Holder.fromPool();
        Mat4.makeXSkew(t, angle);
        var m = this.getCurrentValue();
        Mat4Special.multiplySkewXByAny(t, t, m);
        this.setCurrentValue(t);
        matrixStack_Mat16Holder.toPool(m);
        return this;
    };
    MatrixStack.prototype.skewY = function (angle) {
        var res = matrixStack_Mat16Holder.fromPool();
        Mat4.makeYSkew(res, angle);
        var m = this.getCurrentValue();
        Mat4Special.multiplySkewYByAny(res, res, m);
        this.setCurrentValue(res);
        matrixStack_Mat16Holder.toPool(m);
        return this;
    };
    MatrixStack.prototype.rotateX = function (angleInRadians) {
        var t = matrixStack_Mat16Holder.fromPool();
        Mat4.makeXRotation(t, angleInRadians);
        var m = this.getCurrentValue();
        Mat4Special.multiplyRotationXByAny(t, t, m);
        this.setCurrentValue(t);
        matrixStack_Mat16Holder.toPool(m);
        return this;
    };
    MatrixStack.prototype.rotateY = function (angleInRadians) {
        var t = matrixStack_Mat16Holder.fromPool();
        Mat4.makeYRotation(t, angleInRadians);
        var m = this.getCurrentValue();
        Mat4Special.multiplyRotationYByAny(t, t, m);
        this.setCurrentValue(t);
        matrixStack_Mat16Holder.toPool(m);
        return this;
    };
    MatrixStack.prototype.rotateZ = function (angleInRadians) {
        var t = matrixStack_Mat16Holder.fromPool();
        Mat4.makeZRotation(t, angleInRadians);
        var m = this.getCurrentValue();
        Mat4Special.multiplyRotationZByAny(t, t, m);
        this.setCurrentValue(t);
        matrixStack_Mat16Holder.toPool(m);
        return this;
    };
    MatrixStack.prototype.scale = function (x, y, z) {
        if (z === void 0) { z = 1; }
        var t = matrixStack_Mat16Holder.fromPool();
        Mat4.makeScale(t, x, y, z);
        var m = this.getCurrentValue();
        Mat4Special.multiplyScaleByAny(t, t, m);
        this.setCurrentValue(t);
        matrixStack_Mat16Holder.toPool(m);
        return this;
    };
    MatrixStack.prototype.resetTransform = function () {
        this.getCurrentValue().release();
        var identity = matrixStack_Mat16Holder.fromPool();
        Mat4.makeIdentity(identity);
        this.setCurrentValue(identity);
        return this;
    };
    MatrixStack.prototype.rotationReset = function () {
        var m = this.getCurrentValue();
        Mat4.makeRotationReset(m);
    };
    MatrixStack.prototype.release = function () {
        for (var i = 0, max = this._stack.size(); i < max; i++) {
            this._stack.getAt(i).release();
        }
        return this;
    };
    MatrixStack.prototype.setIdentity = function () {
        var ident = matrixStack_Mat16Holder.fromPool();
        Mat4.makeIdentity(ident);
        this._stack.push(ident);
    };
    return MatrixStack;
}());


;// CONCATENATED MODULE: ./engine/renderable/impl/general/simpleGameObjectContainer.ts


var SimpleGameObjectContainer = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(SimpleGameObjectContainer, _super);
    function SimpleGameObjectContainer(game) {
        return _super.call(this, game) || this;
    }
    SimpleGameObjectContainer.prototype.draw = function () { };
    return SimpleGameObjectContainer;
}(RenderableModel));


;// CONCATENATED MODULE: ./engine/renderable/impl/ui/textField/_internal/markableGameObjectContainer.ts


var MarkableGameObjectContainer = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(MarkableGameObjectContainer, _super);
    function MarkableGameObjectContainer(game) {
        var _this = _super.call(this, game) || this;
        _this._dirty = false;
        _this.size.addOnChangeListener(function () { return _this.markAsDirty(); });
        return _this;
    }
    MarkableGameObjectContainer.prototype.revalidate = function () {
        _super.prototype.revalidate.call(this);
    };
    MarkableGameObjectContainer.prototype.markAsDirty = function () {
        this._dirty = true;
    };
    MarkableGameObjectContainer.prototype.isDirty = function () {
        return this._dirty;
    };
    MarkableGameObjectContainer.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.isDirty()) {
            this.revalidate();
            this._dirty = false;
            this.onCleared();
        }
    };
    MarkableGameObjectContainer.prototype.onCleared = function () { };
    return MarkableGameObjectContainer;
}(SimpleGameObjectContainer));


;// CONCATENATED MODULE: ./engine/renderable/impl/ui/_internal/defaultBackgroundObject.ts


var DEFAULT_BACKGROUND_OBJECT_TYPE = 'DefaultBackgroundObject';
var DefaultBackgroundObject = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(DefaultBackgroundObject, _super);
    function DefaultBackgroundObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = DEFAULT_BACKGROUND_OBJECT_TYPE;
        return _this;
    }
    return DefaultBackgroundObject;
}(SimpleGameObjectContainer));


;// CONCATENATED MODULE: ./engine/renderable/impl/ui/textField/_internal/currentIKeyBoardFocusable.ts
var CurrentIKeyBoardFocusable;
(function (CurrentIKeyBoardFocusable) {
    var currentKeyBoardFocusable;
    CurrentIKeyBoardFocusable.setFocusable = function (focusable) {
        currentKeyBoardFocusable = focusable;
    };
    CurrentIKeyBoardFocusable.isFocusable = function (focusable) {
        return currentKeyBoardFocusable === focusable;
    };
})(CurrentIKeyBoardFocusable || (CurrentIKeyBoardFocusable = {}));

;// CONCATENATED MODULE: ./engine/renderable/impl/ui/widgetContainer.ts







var WidgetContainer = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(WidgetContainer, _super);
    function WidgetContainer(game) {
        var _this = _super.call(this, game) || this;
        _this.INTERNAL_CHILD_OFFSET_INDEX = 4;
        _this.type = 'Container';
        _this.marginLeft = 0;
        _this.marginTop = 0;
        _this.marginRight = 0;
        _this.marginBottom = 0;
        _this.paddingLeft = 0;
        _this.paddingTop = 0;
        _this.paddingRight = 0;
        _this.paddingBottom = 0;
        _this.background = new SimpleGameObjectContainer(_this.game);
        _this.backgroundHover = new DefaultBackgroundObject(_this.game);
        _this.backgroundActive = new DefaultBackgroundObject(_this.game);
        _this.backgroundDisabled = new DefaultBackgroundObject(_this.game);
        _this.state = 0;
        _this.focusable = false;
        _this.clientRect = new Rect();
        _this.hovered = false;
        _this.clicked = false;
        _super.prototype.appendChild.call(_this, _this.background);
        _super.prototype.appendChild.call(_this, _this.backgroundHover);
        _super.prototype.appendChild.call(_this, _this.backgroundActive);
        _super.prototype.appendChild.call(_this, _this.backgroundDisabled);
        _this.clientRect.observe(function () {
            _this.onClientRectChanged();
        });
        if (game.hasControl('MouseControl')) {
            _this.listenToHoverState();
            _this.listenToActiveState();
        }
        else {
            if (true) {
                console.log('hover effects are not awailable for ui elements without mouseControl module');
            }
        }
        return _this;
    }
    WidgetContainer.normalizeBorders = function (top, right, bottom, left) {
        if (right === undefined && bottom === undefined && left === undefined) {
            right = bottom = left = top;
        }
        else if (bottom === undefined && left === undefined) {
            bottom = top;
            left = right;
        }
        else if (left === undefined) {
            left = right;
        }
        return { top: top, right: right, bottom: bottom, left: left };
    };
    WidgetContainer.prototype.setBackground = function (background) {
        if ( true && background.parent !== undefined)
            throw new debugError/* DebugError */.N("can not set background: this object is already in use");
        _super.prototype.replaceChild.call(this, this.background, background);
        this.background = background;
        this.fitBackgroundToSize();
    };
    WidgetContainer.prototype.setBackgroundHover = function (backgroundHover) {
        if ( true && backgroundHover.parent !== undefined)
            throw new debugError/* DebugError */.N("can not set background: this object is already in use");
        _super.prototype.replaceChild.call(this, this.backgroundHover, backgroundHover);
        this.backgroundHover = backgroundHover;
        this.fitBackgroundToSize();
    };
    WidgetContainer.prototype.setBackgroundActive = function (backgroundActive) {
        if ( true && backgroundActive.parent !== undefined)
            throw new debugError/* DebugError */.N("can not set background: this object is already in use");
        _super.prototype.replaceChild.call(this, this.backgroundActive, backgroundActive);
        this.backgroundActive = backgroundActive;
        this.fitBackgroundToSize();
    };
    WidgetContainer.prototype.setBackgroundDisabled = function (backgroundDisabled) {
        _super.prototype.replaceChild.call(this, this.backgroundDisabled, backgroundDisabled);
        this.backgroundDisabled = backgroundDisabled;
        this.fitBackgroundToSize();
    };
    WidgetContainer.prototype.setMargin = function (top, right, bottom, left) {
        var _a;
        (_a = WidgetContainer.normalizeBorders(top, right, bottom, left), top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left);
        var isDirty = this.marginTop !== top ||
            this.marginRight !== right ||
            this.marginBottom !== bottom ||
            this.marginLeft !== left;
        if (!isDirty)
            return;
        var thisWriteable = this;
        thisWriteable.marginTop = top;
        thisWriteable.marginRight = right;
        thisWriteable.marginBottom = bottom;
        thisWriteable.marginLeft = left;
        this.recalculateClientRect();
        this.fitBackgroundToSize();
        this.markAsDirty();
    };
    WidgetContainer.prototype.setPadding = function (top, right, bottom, left) {
        var _a;
        (_a = WidgetContainer.normalizeBorders(top, right, bottom, left), top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left);
        var thisWriteable = this;
        var isDirty = this.paddingTop !== top ||
            this.paddingRight !== right ||
            this.paddingBottom !== bottom ||
            this.paddingLeft !== left;
        if (!isDirty)
            return;
        thisWriteable.paddingTop = top;
        thisWriteable.paddingRight = right;
        thisWriteable.paddingBottom = bottom;
        thisWriteable.paddingLeft = left;
        this.recalculateClientRect();
        this.fitBackgroundToSize();
        this.markAsDirty();
    };
    WidgetContainer.prototype.getChildrenCount = function () {
        return _super.prototype.getChildrenCount.call(this) - this.INTERNAL_CHILD_OFFSET_INDEX;
    };
    WidgetContainer.prototype.getChildAt = function (index) {
        return _super.prototype.getChildAt.call(this, index + this.INTERNAL_CHILD_OFFSET_INDEX);
    };
    WidgetContainer.prototype.revalidate = function () {
        _super.prototype.revalidate.call(this);
        this.recalculateClientRect();
        this.fitBackgroundToSize();
        this.setState(this.state);
    };
    WidgetContainer.prototype.getClientRect = function () {
        return this.clientRect;
    };
    WidgetContainer.prototype.setProps = function (props) {
        _super.prototype.setProps.call(this, props);
        if (props.background !== undefined) {
            var memoized = this.getMemoizedView(props.background);
            if (memoized !== this.background)
                this.setBackground(memoized);
        }
        if (props.backgroundActive !== undefined) {
            var memoized = this.getMemoizedView(props.backgroundActive);
            if (memoized !== this.backgroundActive)
                this.setBackgroundActive(memoized);
        }
        if (props.backgroundHover !== undefined) {
            var memoized = this.getMemoizedView(props.backgroundHover);
            if (memoized !== this.backgroundHover)
                this.setBackgroundActive(memoized);
        }
        if (props.backgroundDisabled !== undefined) {
            var memoized = this.getMemoizedView(props.backgroundDisabled);
            if (memoized !== this.backgroundDisabled)
                this.setBackgroundActive(memoized);
        }
        if (props.padding && props.padding.length > 0) {
            this.setPadding(props.padding[0], props.padding[1], props.padding[2], props.padding[3]);
        }
        if (props.margin && props.margin.length > 0) {
            this.setMargin(props.margin[0], props.margin[1], props.margin[2], props.margin[3]);
        }
    };
    WidgetContainer.prototype.blur = function () {
        CurrentIKeyBoardFocusable.setFocusable(undefined);
    };
    WidgetContainer.prototype.focus = function () {
        CurrentIKeyBoardFocusable.setFocusable(this);
    };
    WidgetContainer.prototype.isFocused = function () {
        return CurrentIKeyBoardFocusable.isFocusable(this);
    };
    WidgetContainer.prototype.setState = function (state) {
        this.state = state;
        switch (state) {
            case 1: {
                var isDefaultBg = this.backgroundActive.type === DEFAULT_BACKGROUND_OBJECT_TYPE;
                this.background.visible = isDefaultBg;
                this.backgroundHover.visible = false;
                this.backgroundActive.visible = !isDefaultBg;
                this.backgroundDisabled.visible = false;
                break;
            }
            case 2: {
                var isDefaultBg = this.backgroundHover.type === DEFAULT_BACKGROUND_OBJECT_TYPE;
                this.background.visible = isDefaultBg;
                this.backgroundHover.visible = !isDefaultBg;
                this.backgroundActive.visible = false;
                this.backgroundDisabled.visible = false;
                break;
            }
            case 0: {
                this.background.visible = true;
                this.backgroundHover.visible = false;
                this.backgroundActive.visible = false;
                this.backgroundDisabled.visible = false;
                break;
            }
            case 3: {
                var isDefaultBg = this.backgroundDisabled.type === DEFAULT_BACKGROUND_OBJECT_TYPE;
                this.background.visible = isDefaultBg;
                this.backgroundHover.visible = false;
                this.backgroundActive.visible = false;
                this.backgroundDisabled.visible = !isDefaultBg;
                break;
            }
        }
    };
    WidgetContainer.prototype.onClientRectChanged = function () { };
    WidgetContainer.prototype.listenToHoverState = function () {
        var _this = this;
        this.mouseEventHandler.on("mouseEnter", function (e) {
            if (_this.state === 3)
                return;
            _this.hovered = true;
            _this.setState(2);
        });
        this.mouseEventHandler.on("mouseLeave", function (e) {
            if (_this.state === 3)
                return;
            _this.hovered = false;
            _this.setState(0);
        });
    };
    WidgetContainer.prototype.listenToActiveState = function () {
        var _this = this;
        this.mouseEventHandler.on("mouseDown", function (e) {
            if (_this.state === 3)
                return;
            _this.clicked = true;
            _this.setState(1);
            _this.focus();
            if (_this.focusable) {
                e.isPropagated = false;
            }
        });
        this.mouseEventHandler.on("mouseUp", function (e) {
            if (_this.state === 3)
                return;
            _this.clicked = false;
            if (_this.hovered)
                _this.setState(2);
            else
                _this.setState(0);
        });
    };
    WidgetContainer.prototype.fitChildSize = function (view) {
        for (var _i = 0, _a = view._children; _i < _a.length; _i++) {
            var c = _a[_i];
            c.size.setFrom(this.size);
            this.fitChildSize(c);
        }
    };
    WidgetContainer.prototype.fitBackgroundToSize = function () {
        this.background.setPosAndSize(this.marginLeft, this.marginTop, this.size.width - this.marginRight - this.marginLeft, this.size.height - this.marginBottom - this.marginTop);
        if (this.background.size.width <= 0) {
            this.background.pos.x = 0;
            this.background.size.width = this.size.width;
        }
        if (this.background.size.height <= 0) {
            this.background.pos.y = 0;
            this.background.size.height = this.size.height;
        }
        this.backgroundHover.setPosAndSize(this.background.pos.x, this.background.pos.y, this.background.size.width, this.background.size.height);
        this.backgroundActive.setPosAndSize(this.background.pos.x, this.background.pos.y, this.background.size.width, this.background.size.height);
        this.backgroundDisabled.setPosAndSize(this.background.pos.x, this.background.pos.y, this.background.size.width, this.background.size.height);
        this.fitChildSize(this.background);
        this.fitChildSize(this.backgroundHover);
        this.fitChildSize(this.backgroundActive);
        this.fitChildSize(this.backgroundDisabled);
    };
    WidgetContainer.prototype.recalculateClientRect = function () {
        this.clientRect.setXYWH(this.marginLeft + this.paddingLeft, this.marginTop + this.paddingTop, this.size.width - this.marginLeft - this.paddingLeft - this.marginRight - this.paddingRight, this.size.height - this.marginTop - this.paddingTop - this.marginBottom - this.paddingBottom);
        if (this.clientRect.width <= 0) {
            this.clientRect.x = 0;
            this.clientRect.width = this.size.width;
        }
        if (this.clientRect.height <= 0) {
            this.clientRect.y = 0;
            this.clientRect.height = this.size.height;
        }
    };
    return WidgetContainer;
}(MarkableGameObjectContainer));


;// CONCATENATED MODULE: ./engine/renderable/impl/ui/textField/_internal/characterImage.ts




var CharacterImage = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(CharacterImage, _super);
    function CharacterImage(game, font, characterInfo, color) {
        var _this = _super.call(this, game, (characterInfo.font || font).getResourceLinkByChar(characterInfo.rawChar)) || this;
        _this.font = font;
        _this.characterInfo = characterInfo;
        _this.colorCloned = false;
        var actualFont = characterInfo.font || font;
        _this.stretchMode = 0;
        var _a = actualFont.context.padding, padUp = _a[0], padRight = _a[1], padDown = _a[2], padLeft = _a[3];
        var charRect = actualFont.getSymbolInfoByChar(characterInfo.rawChar);
        if (charRect === undefined) {
            var key = Object.keys(actualFont.context.symbols)[0];
            if ( true && key === undefined) {
                throw new debugError/* DebugError */.N("Bad fontContext has been provided");
            }
            charRect = actualFont.context.symbols[key];
        }
        if (true) {
            if (charRect.width === 0 || charRect.height === 0) {
                console.error(actualFont.context);
                console.error(characterInfo);
                throw new debugError/* DebugError */.N("font context error: wrong character rect for symbol \"".concat(characterInfo.rawChar, "\""));
            }
        }
        _this.srcRect.setXYWH(charRect.x + padLeft, charRect.y + padUp, charRect.width - padLeft - padRight, charRect.height - padUp - padDown);
        if (_this.srcRect.width <= 0)
            _this.srcRect.width = 0.001;
        if (_this.srcRect.height <= 0)
            _this.srcRect.height = 0.001;
        _this.setScaleFromCurrFontSize(_this.characterInfo.scaleFromCurrFontSize);
        _this.pos.setXY(charRect.destOffsetX * _this.characterInfo.scaleFromCurrFontSize, charRect.destOffsetY * _this.characterInfo.scaleFromCurrFontSize);
        _this.transformPoint.setToCenter();
        if (!characterInfo.multibyte)
            _this.color = color;
        if (characterInfo.italic)
            _this.setItalic(true);
        if (characterInfo.bold)
            _this.setBold(true);
        if (characterInfo.color)
            _this.setColor(characterInfo.color);
        if (characterInfo.underlined)
            _this.setUnderLined(true);
        if (characterInfo.linedThrough)
            _this.setLinedThrough(true);
        _this.updateVisibility();
        return _this;
    }
    CharacterImage.prototype.setItalic = function (val) {
        if (val)
            this.skew.setX(val ? -0.2 : 0);
        this.characterInfo.italic = val;
    };
    CharacterImage.prototype.setBold = function (val) {
        var scale = val ? 1.2 : 1;
        if (val)
            this.scale.setXY(scale);
        this.characterInfo.bold = val;
    };
    CharacterImage.prototype.setColor = function (color) {
        if (this.characterInfo.multibyte)
            return;
        if (!this.colorCloned) {
            this.color = this.color.clone();
            this.colorCloned = true;
        }
        this.color.setFrom(color);
        this.characterInfo.color = color;
        if (this.textDecoratorLine !== undefined)
            this.textDecoratorLine.color.setFrom(this.color);
    };
    CharacterImage.prototype.setUnderLined = function (val) {
        if (val) {
            this.createTextDecoratorLineIfNotExists();
            this.textDecoratorLine.pos.setXY(1, this.size.height - this.textDecoratorLine.size.height);
            this.textDecoratorLine.visible = true;
        }
        else {
            if (this.textDecoratorLine)
                this.textDecoratorLine.visible = false;
        }
        this.characterInfo.underlined = val;
        this.updateVisibility();
    };
    CharacterImage.prototype.setLinedThrough = function (val) {
        if (val) {
            this.createTextDecoratorLineIfNotExists();
            this.textDecoratorLine.pos.setXY(0, (this.size.height - this.textDecoratorLine.size.height) / 2);
            this.textDecoratorLine.visible = true;
        }
        else {
            if (this.textDecoratorLine)
                this.textDecoratorLine.visible = false;
        }
        this.characterInfo.linedThrough = val;
        this.updateVisibility();
    };
    CharacterImage.prototype.getCharacterInfo = function () {
        return this.characterInfo;
    };
    CharacterImage.prototype.setScaleFromCurrFontSize = function (scaleFromCurrFontSize) {
        this.characterInfo.scaleFromCurrFontSize = scaleFromCurrFontSize;
        this.size.setWH(this.srcRect.width * scaleFromCurrFontSize, this.srcRect.height * scaleFromCurrFontSize);
    };
    CharacterImage.prototype.clone = function () {
        var cloned = new CharacterImage(this.game, this.font, this.characterInfo, this.color.clone());
        this.setClonedProperties(cloned);
        return cloned;
    };
    CharacterImage.prototype.setClonedProperties = function (cloned) {
        _super.prototype.setClonedProperties.call(this, cloned);
    };
    CharacterImage.prototype.createTextDecoratorLineIfNotExists = function () {
        if (this.textDecoratorLine === undefined) {
            var textDecoratorLine = new Rectangle(this.game);
            var height = ~~((this.font.context.lineHeight * this.characterInfo.scaleFromCurrFontSize) / 12) || 1;
            textDecoratorLine.size.setWH(this.size.width + this.font.context.spacing[0] * 2, height);
            textDecoratorLine.lineWidth = 0;
            this.appendChild(textDecoratorLine);
            this.textDecoratorLine = textDecoratorLine;
        }
        this.textDecoratorLine.fillColor.setFrom(this.color);
    };
    CharacterImage.prototype.updateVisibility = function () {
        this.visible = this.characterInfo.rawChar !== ' ' && this.characterInfo.rawChar !== '\n';
    };
    return CharacterImage;
}(Image));


;// CONCATENATED MODULE: ./engine/renderable/impl/ui/textField/_internal/word.ts



var Word = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(Word, _super);
    function Word(game, font, chars, color, pixelPerfect) {
        var _this = _super.call(this, game) || this;
        _this.font = font;
        _this.chars = chars;
        _this.color = color;
        _this.pixelPerfect = pixelPerfect;
        var i = 0;
        var caret = 0;
        for (var _i = 0, chars_1 = chars; _i < chars_1.length; _i++) {
            var char = chars_1[_i];
            var characterFont = char.font || font;
            var charImage = new CharacterImage(game, font, char, color);
            charImage.setPixelPerfect(pixelPerfect);
            charImage.pos.setX(caret);
            var symbolInfo = characterFont.getSymbolInfoByChar(char.rawChar);
            var kerning = (chars.length > 0 && i < chars.length - 1) ?
                characterFont.getKerning(char.rawChar, chars[i + 1].rawChar) :
                0;
            var deltaWidth = (i < chars.length - 1 || char.rawChar === ' ') ?
                symbolInfo.widthAdvanced + characterFont.context.spacing[0] + kerning :
                charImage.size.width;
            var deltaWidthScaled = deltaWidth * char.scaleFromCurrFontSize;
            caret += deltaWidthScaled;
            _this.appendChild(charImage);
            _this.size.width += deltaWidthScaled;
            i++;
        }
        var maxRawHeight = Math.max.apply(Math, (0,tslib_es6/* __spreadArray */.ev)((0,tslib_es6/* __spreadArray */.ev)([], _this._children.map(function (it) { return it.size.height; }), false), [0], false));
        var maxSpacingVertical = Math.max.apply(Math, (0,tslib_es6/* __spreadArray */.ev)((0,tslib_es6/* __spreadArray */.ev)([], _this.chars.map(function (it) { return it.font ? it.font.context.spacing[1] : 0; }), false), [font.context.spacing[1]], false));
        _this.size.height = maxRawHeight + maxSpacingVertical;
        _this.rawValue = chars.join('');
        return _this;
    }
    Word.prototype.getMaxCharacterFontScale = function () {
        var _a;
        return (_a = Math.max.apply(Math, this.chars.map(function (it) { return it.scaleFromCurrFontSize; }))) !== null && _a !== void 0 ? _a : 1;
    };
    Word.prototype.getMaxCharacterLineHeight = function () {
        var _this = this;
        return Math.max.apply(Math, this.chars.map(function (it) {
            var font = it.font || _this.font;
            return font.context.lineHeight * it.scaleFromCurrFontSize;
        }));
    };
    return Word;
}(SimpleGameObjectContainer));


;// CONCATENATED MODULE: ./engine/renderable/impl/ui/textField/_internal/textRow.ts




var TextRow = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(TextRow, _super);
    function TextRow(game, font, constrainWidth, rowSet) {
        var _this = _super.call(this, game) || this;
        _this.font = font;
        _this.constrainWidth = constrainWidth;
        _this.rowSet = rowSet;
        _this.caret = 0;
        _this.alignText = 0;
        return _this;
    }
    TextRow.prototype.canAddWord = function (word) {
        if (this._children.length === 0)
            return true;
        var currentSpaceWidth = word.getMaxCharacterFontScale() * this.rowSet.DEFAULT_SPACE_CHAR_WIDTH;
        return this.caret + currentSpaceWidth + word.size.width <= this.constrainWidth;
    };
    TextRow.prototype.addWord = function (word, addWhiteSpaceBeforeIfNeed) {
        if (this._children.length !== 0 && addWhiteSpaceBeforeIfNeed) {
            var scaleFromCurrFontSize = word.getMaxCharacterFontScale();
            var space = new Word(this.game, this.font, [{ rawChar: ' ', multibyte: false, scaleFromCurrFontSize: scaleFromCurrFontSize }], Color.NONE, this.rowSet.isPixelPerfect());
            this._addWord(space);
        }
        this._addWord(word);
    };
    TextRow.prototype.complete = function () {
        if (this._children.length === 0) {
            this.size.height = this.font.context.lineHeight;
        }
        else {
            this.size.height = Math.max.apply(Math, this._children.map(function (it) { return it.getMaxCharacterLineHeight(); }));
        }
    };
    TextRow.prototype.updateWordsVisibility = function () {
        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i];
            if ((c.pos.x + this.rowSet.pos.x + c.size.width) < 0)
                c.visible = false;
            else {
                c.visible = (c.pos.x + this.rowSet.pos.x) <= this.constrainWidth;
            }
        }
    };
    TextRow.prototype.getMaxCharacterFontScale = function () {
        var _a;
        return (_a = Math.max.apply(Math, this._children.map(function (it) { return it.getMaxCharacterFontScale(); }))) !== null && _a !== void 0 ? _a : 1;
    };
    TextRow.prototype.setAlignText = function (align) {
        var _this = this;
        if (this._children.length === 0)
            return;
        if (align === this.alignText)
            return;
        switch (align) {
            case 2:
                this.pos.setX(this.rowSet.size.width - this.size.width);
                break;
            case 1:
                this.pos.setX((this.rowSet.size.width - this.size.width) / 2);
                break;
            case 0:
                this.pos.setX(0);
                break;
            case 3:
                var onlyWords = this._children.filter(function (it) { return it.rawValue !== ' '; });
                var onlyWordsWidth = onlyWords.
                    map(function (it) { return it.size.width; }).
                    reduce(function (it, prev) { return it + prev; }, 0);
                var spaceCharWidth = this.getMaxCharacterFontScale() * this.rowSet.DEFAULT_SPACE_CHAR_WIDTH;
                var spaceWidth_1 = (this.rowSet.size.width - onlyWordsWidth) / (onlyWords.length - 1);
                if (spaceWidth_1 > spaceCharWidth * 2)
                    spaceWidth_1 = spaceCharWidth;
                this.removeChildren();
                this.caret = 0;
                onlyWords.forEach(function (w) {
                    if (_this._children.length !== 0) {
                        _this.caret += spaceWidth_1;
                    }
                    _this._addWord(w);
                });
                break;
        }
        this.alignText = align;
    };
    TextRow.prototype._addWord = function (word) {
        word.pos.setX(this.caret);
        this.caret += word.size.width;
        this.appendChild(word);
        this.size.width += word.size.width;
    };
    return TextRow;
}(SimpleGameObjectContainer));


;// CONCATENATED MODULE: ./engine/renderable/impl/ui/textField/_internal/textRowSet.ts






var TextRowSet = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(TextRowSet, _super);
    function TextRowSet(game, font, constrainSize, color) {
        var _this = _super.call(this, game) || this;
        _this.font = font;
        _this.constrainSize = constrainSize;
        _this.color = color;
        _this.DEFAULT_SPACE_CHAR_WIDTH = new Word(_this.game, _this.font, [{ rawChar: ' ', multibyte: false, scaleFromCurrFontSize: 1 }], Color.NONE, false).size.width;
        _this.caret = 0;
        return _this;
    }
    TextRowSet.prototype.addWord = function (word, applyNewLineIfCurrentIsFull, addWhiteSpaceBeforeIfNeed) {
        if (this.currentTextRow === undefined) {
            this.currentTextRow = new TextRow(this.game, this.font, this.constrainSize.width, this);
            this.appendChild(this.currentTextRow);
        }
        if (applyNewLineIfCurrentIsFull && !this.currentTextRow.canAddWord(word)) {
            this.newRow();
        }
        this.currentTextRow.addWord(word, addWhiteSpaceBeforeIfNeed);
    };
    TextRowSet.prototype.newRow = function () {
        if (this.currentTextRow === undefined) {
            this.currentTextRow = new TextRow(this.game, this.font, this.constrainSize.width, this);
            this.appendChild(this.currentTextRow);
        }
        this.currentTextRow.complete();
        this.caret += this.currentTextRow.size.height;
        this.currentTextRow = new TextRow(this.game, this.font, this.constrainSize.width, this);
        this.currentTextRow.pos.y = this.caret;
        this.appendChild(this.currentTextRow);
    };
    TextRowSet.prototype.setFont = function (font) {
        this.font = font;
    };
    TextRowSet.prototype.setWordBrake = function (wordBrake) {
        this.wordBrake = wordBrake;
    };
    TextRowSet.prototype.setPixelPerfect = function (value) {
        this.pixelPerfect = value;
    };
    TextRowSet.prototype.isPixelPerfect = function () {
        return this.pixelPerfect;
    };
    TextRowSet.prototype.setAlignTextContentHorizontal = function (align) {
        if (this._children.length === 0)
            return;
        if (this.constrainSize.width === Infinity)
            return;
        switch (align) {
            case 1:
                var pos = (this.constrainSize.width - this.size.width) / 2;
                if (pos < 0)
                    pos = 0;
                this.pos.x = pos;
                break;
            case 0:
                this.pos.setX(0);
                break;
            case 2:
                this.pos.setX(this.constrainSize.width - this.size.width);
                break;
        }
        this.alignTextContentHorizontal = align;
    };
    TextRowSet.prototype.setAlignTextContentVertical = function (align) {
        if (this._children.length === 0)
            return;
        if (this.constrainSize.height === Infinity)
            return;
        switch (align) {
            case 1:
                var pos = (this.constrainSize.height - this.size.height) / 2;
                if (pos < 0)
                    pos = 0;
                this.pos.y = pos;
                break;
            case 0:
                this.pos.setY(0);
                break;
            case 2:
                this.pos.setY(this.constrainSize.height - this.size.height);
                break;
        }
        this.alignTextContentVertical = align;
    };
    TextRowSet.prototype.setAlignText = function (align) {
        if (this._children.length === 0)
            return;
        if (align === this.alignText)
            return;
        this._children.forEach(function (c) { return c.setAlignText(align); });
    };
    TextRowSet.prototype.updateRowsVisibility = function () {
        for (var i = 0, max = this._children.length; i < max; i++) {
            var c = this._children[i];
            if ((c.pos.y + this.pos.y + c.size.height) < 0)
                c.visible = false;
            else {
                c.visible = (c.pos.y + this.pos.y) <= this.constrainSize.height;
                if (c.visible)
                    c.updateWordsVisibility();
            }
        }
    };
    TextRowSet.prototype.getWordBrake = function () {
        return this.wordBrake;
    };
    TextRowSet.prototype.setText = function (stringEx) {
        var _this = this;
        this.clear();
        switch (this.wordBrake) {
            case 2:
            case 0: {
                var applyNewLineIfCurrentIsFull_1 = this.wordBrake === 2;
                stringEx.split(['\t', '\n', '\r', ' '], true).forEach(function (s) {
                    switch (s.getAllChars()[0].rawChar) {
                        case '\r':
                            break;
                        case '\n':
                            _this.newRow();
                            break;
                        case ' ':
                            _this.addWord(new Word(_this.game, _this.font, s.getAllChars(), _this.color, _this.pixelPerfect), applyNewLineIfCurrentIsFull_1, false);
                            break;
                        case '\t':
                            var char = s.getAllChars()[0];
                            char.rawChar = ' ';
                            _this.addWord(new Word(_this.game, _this.font, [char, char, char, char], _this.color, _this.pixelPerfect), applyNewLineIfCurrentIsFull_1, false);
                            break;
                        default:
                            _this.addWord(new Word(_this.game, _this.font, s.getAllChars(), _this.color, _this.pixelPerfect), applyNewLineIfCurrentIsFull_1, false);
                            break;
                    }
                });
                break;
            }
            case 1: {
                stringEx.
                    split(['\t', '\n', '\r', ' '], false).filter(function (it) { return it.asString().trim().length; }).
                    forEach(function (s) {
                    _this.addWord(new Word(_this.game, _this.font, s.getAllChars(), _this.color, _this.pixelPerfect), true, true);
                });
                break;
            }
            default: {
                if (true)
                    throw new debugError/* DebugError */.N("unknown wordBrake value: ".concat(this.wordBrake));
            }
        }
        if (this.currentTextRow !== undefined)
            this.currentTextRow.complete();
        this.fitSize();
    };
    TextRowSet.prototype.fitSize = function () {
        this.fitWidth();
        this.fitHeight();
    };
    TextRowSet.prototype.fitWidth = function () {
        this.size.width = Math.max.apply(Math, (0,tslib_es6/* __spreadArray */.ev)((0,tslib_es6/* __spreadArray */.ev)([], this._children.map(function (it) { return it.size.width; }), false), [0], false));
    };
    TextRowSet.prototype.fitHeight = function () {
        var height = 0;
        this._children.forEach(function (row) { return height += row.size.height; });
        this.size.height = height;
    };
    TextRowSet.prototype.clear = function () {
        this.removeChildren();
        this.caret = 0;
        this.currentTextRow = undefined;
    };
    return TextRowSet;
}(SimpleGameObjectContainer));


;// CONCATENATED MODULE: ./engine/renderable/impl/ui/textField/_internal/stringEx.ts
var StringEx = (function () {
    function StringEx(chars) {
        this.chars = chars;
    }
    StringEx.fromRaw = function (str) {
        var index = 0;
        var length = str.length;
        var output = [];
        for (; index < length; index++) {
            var charCode = str.charCodeAt(index);
            if (charCode >= 0xD800 && charCode <= 0xDBFF) {
                charCode = str.charCodeAt(index + 1);
                if (charCode >= 0xDC00 && charCode <= 0xDFFF) {
                    output.push({ rawChar: str.slice(index, index + 2), multibyte: true, scaleFromCurrFontSize: 1 });
                    index++;
                    continue;
                }
            }
            output.push({ rawChar: str.charAt(index), multibyte: false, scaleFromCurrFontSize: 1 });
        }
        return new StringEx(output);
    };
    StringEx.empty = function () {
        return new StringEx([]);
    };
    StringEx.prototype.split = function (delimiter, preserveDelimiter) {
        var _this = this;
        var result = [];
        var currentChars = [];
        this.chars.forEach(function (c, index) {
            if (delimiter.indexOf(c.rawChar) > -1) {
                if (currentChars.length > 0) {
                    result.push(new StringEx(currentChars));
                    currentChars = [];
                }
                if (preserveDelimiter) {
                    result.push(new StringEx([c]));
                }
            }
            else {
                currentChars.push(c);
            }
            if (index === _this.chars.length - 1 && currentChars.length > 0) {
                result.push(new StringEx(currentChars));
            }
        });
        return result;
    };
    StringEx.prototype.getAllChars = function () {
        return this.chars;
    };
    StringEx.prototype.getSize = function () {
        return this.chars.length;
    };
    StringEx.prototype.append = function (str) {
        var _a;
        (_a = this.chars).push.apply(_a, str.chars);
    };
    StringEx.prototype.asString = function () {
        return this.chars.map(function (it) { return it.rawChar; }).join('');
    };
    StringEx.prototype.setBold = function (val) {
        this.chars.forEach(function (c) { return c.bold = val; });
    };
    StringEx.prototype.setItalic = function (val) {
        this.chars.forEach(function (c) { return c.italic = val; });
    };
    StringEx.prototype.setColor = function (col) {
        this.chars.forEach(function (c) { return c.color = col; });
    };
    StringEx.prototype.setFontSize = function (fontSize) {
        this.chars.forEach(function (c) { return c.fontSize = fontSize; });
    };
    StringEx.prototype.setScaleFromCurrFontSize = function (scale) {
        this.chars.forEach(function (c) { return c.scaleFromCurrFontSize = scale; });
    };
    StringEx.prototype.setUnderlined = function (val) {
        this.chars.forEach(function (c) { return c.underlined = val; });
    };
    StringEx.prototype.setLinedThrough = function (val) {
        this.chars.forEach(function (c) { return c.linedThrough = val; });
    };
    StringEx.prototype.setFont = function (font) {
        this.chars.forEach(function (c) { return c.font = font; });
    };
    return StringEx;
}());


;// CONCATENATED MODULE: ./engine/renderable/impl/ui/textField/simple/textField.ts









var TextField = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(TextField, _super);
    function TextField(game, font, useCache) {
        if (useCache === void 0) { useCache = true; }
        var _this = _super.call(this, game) || this;
        _this.font = font;
        _this.useCache = useCache;
        _this.type = 'TextField';
        _this.textColor = Color.RGB(122, 122, 122);
        _this.rowSetContainer = new MarkableGameObjectContainer(_this.game);
        _this._textEx = StringEx.empty();
        _this.alignTextContentVertical = 0;
        _this.alignTextContentHorizontal = 0;
        _this.alignText = 0;
        _this.wordBrake = 1;
        _this.pixelPerfect = false;
        _this._text = '';
        _this._autosize = false;
        _this.needTextRedraw = false;
        if ( true && !font) {
            throw new debugError/* DebugError */.N("can not create textField: font is not passed");
        }
        _this.appendChild(_this.rowSetContainer);
        _this.size.setWH(300, 100);
        _this.rowSetContainer.size.setFrom(_this.size);
        _this.textColor.observe(function () { return _this.requestTextRedraw(); });
        return _this;
    }
    TextField.prototype.setText = function (text) {
        var strText = text.toString();
        if (strText === this._text)
            return;
        this._text = strText;
        this._textEx = StringEx.fromRaw(strText);
        this.markAsDirty();
    };
    TextField.prototype.getText = function () {
        return this._text;
    };
    TextField.prototype.setAutoSize = function (val) {
        if (this._autosize === val)
            return;
        this._autosize = val;
        this.markAsDirty();
    };
    TextField.prototype.getAutoSize = function () {
        return this._autosize;
    };
    TextField.prototype.setPixelPerfect = function (val) {
        this.pixelPerfect = val;
        this.markAsDirty();
    };
    TextField.prototype.getPixelPerfect = function () {
        return this.pixelPerfect;
    };
    TextField.prototype.revalidate = function () {
        if (this.useCache)
            this._revalidateWithCache();
        else
            this._revalidateWithoutCache();
    };
    TextField.prototype.setProps = function (props) {
        _super.prototype.setProps.call(this, props);
        if (props.textColor)
            this.textColor.setRGBA(props.textColor.r, props.textColor.g, props.textColor.b, props.textColor.a);
        if (props.text !== undefined)
            this.setText(props.text);
        if (props.autoSize !== undefined)
            this.setAutoSize(props.autoSize);
        if (props.pixelPerfect !== undefined)
            this.setPixelPerfect(props.pixelPerfect);
        if (props.font !== undefined)
            this.setFont(props.font);
        if (props.alignText !== undefined)
            this.setAlignText(props.alignText);
        if (props.alignTextContentVertical !== undefined)
            this.setAlignTextContentVertical(props.alignTextContentVertical);
        if (props.alignTextContentHorizontal !== undefined)
            this.setAlignTextContentHorizontal(props.alignTextContentHorizontal);
        if (props.wordBrake !== undefined)
            this.setWordBrake(props.wordBrake);
    };
    TextField.prototype._revalidateWithCache = function () {
        if ( true && !this._autosize && (this.size.width === 0 || this.size.height === 0)) {
            throw new debugError/* DebugError */.N("can not setText: TextField size.width and/or size.height is not defined");
        }
        if (this._autosize)
            this.calculateAutoSize();
        _super.prototype.revalidate.call(this);
        var rectIsDirty = false;
        var clientRect = this.getClientRect();
        var width = clientRect.width, height = clientRect.height;
        width = width | 0;
        height = height | 0;
        if (width < 1)
            width = 1;
        if (height < 1)
            height = 1;
        this.rowSetContainer.pos.setFrom(clientRect);
        this.rowSetContainer.size.setFrom(clientRect);
        if (this.cacheSurface === undefined) {
            this.cacheSurface = new DrawingSurface(this.game, new geometry_size/* Size */.$(width, height));
            this.rowSetContainer.appendChild(this.cacheSurface);
        }
        else {
            if (!this.cacheSurface.size.equals(clientRect)) {
                rectIsDirty = true;
                var cacheSurface = new DrawingSurface(this.game, new geometry_size/* Size */.$(width, height));
                this.rowSetContainer.replaceChild(this.cacheSurface, cacheSurface);
                this.cacheSurface.destroy();
                cacheSurface.setPixelPerfect(this.pixelPerfect);
                this.rowSetContainer.markAsDirty();
                this.cacheSurface = cacheSurface;
            }
        }
        if (this.rowSet === undefined || rectIsDirty) {
            this.rowSet = new TextRowSet(this.game, this.font, clientRect, this.textColor);
        }
        this._applyText();
    };
    TextField.prototype._revalidateWithoutCache = function () {
        var clientRect = this.getClientRect();
        if (this.rowSet === undefined) {
            this.rowSet = new TextRowSet(this.game, this.font, clientRect, this.textColor);
            this.rowSetContainer.appendChild(this.rowSet);
        }
        this.rowSetContainer.pos.setFrom(clientRect);
        this.rowSetContainer.size.setFrom(clientRect);
        this._applyText();
        if (this._autosize) {
            this.size.setWH(this.rowSet.size.width + this.marginLeft + this.paddingLeft + this.marginRight + this.paddingRight, this.rowSet.size.height + this.marginTop + this.paddingTop + this.marginBottom + this.paddingBottom);
        }
        _super.prototype.revalidate.call(this);
    };
    TextField.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.cacheSurface !== undefined)
            this.cacheSurface.destroy();
    };
    TextField.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isDirty())
            this.revalidate();
        if (this.needTextRedraw)
            this.redrawText();
    };
    TextField.prototype.setAlignTextContentHorizontal = function (align) {
        if (align === this.alignTextContentHorizontal)
            return;
        this.alignTextContentHorizontal = align;
        this.markAsDirty();
    };
    TextField.prototype.setWordBrake = function (wordBrake) {
        if (this.wordBrake === wordBrake)
            return;
        this.wordBrake = wordBrake;
        this.markAsDirty();
    };
    TextField.prototype.setAlignTextContentVertical = function (align) {
        if (align === this.alignTextContentVertical)
            return;
        this.alignTextContentVertical = align;
        this.markAsDirty();
    };
    TextField.prototype.setAlignText = function (align) {
        if (align === this.alignText)
            return;
        this.alignText = align;
        this.markAsDirty();
    };
    TextField.prototype.setFont = function (font) {
        if (font === this.font)
            return;
        this.font = font;
        this.markAsDirty();
    };
    TextField.prototype.setItalicAt = function (i, italic) {
        this.findCharImageByIndex(i).setItalic(italic);
        this.requestTextRedraw();
    };
    TextField.prototype.setBoldAt = function (i, bold) {
        this.findCharImageByIndex(i).setBold(bold);
        this.requestTextRedraw();
    };
    TextField.prototype.setColorAt = function (i, col) {
        this.findCharImageByIndex(i).setColor(col);
        this.requestTextRedraw();
    };
    TextField.prototype.collectAllChars = function () {
        var result = [];
        for (var m = 0; m < this.rowSet._children.length; m++) {
            var row = this.rowSet._children[m];
            for (var j = 0; j < row._children.length; j++) {
                var child = row._children[j];
                for (var k = 0; k < child._children.length; k++) {
                    var char = child._children[k];
                    result.push(char);
                }
            }
        }
        return result;
    };
    TextField.prototype.findCharImageByIndex = function (i) {
        var cnt = 0;
        for (var m = 0; m < this.rowSet._children.length; m++) {
            var row = this.rowSet._children[m];
            for (var j = 0; j < row._children.length; j++) {
                var child = row._children[j];
                for (var k = 0; k < child._children.length; k++) {
                    var char = child._children[k];
                    if (cnt === i)
                        return char;
                    cnt++;
                }
            }
        }
        return undefined;
    };
    TextField.prototype.requestTextRedraw = function () {
        this.needTextRedraw = true;
    };
    TextField.prototype.onCleared = function () {
        this.requestTextRedraw();
    };
    TextField.prototype._applyText = function () {
        this.passPropertiesToRowSet(this.rowSet);
        this.requestTextRedraw();
    };
    TextField.prototype.calculateAutoSize = function () {
        if (this.measurer === undefined)
            this.measurer = new TextRowSet(this.game, this.font, { width: Infinity, height: Infinity }, Color.NONE);
        this.passPropertiesToRowSet(this.measurer);
        this.size.setWH(this.measurer.size.width + this.marginLeft + this.paddingLeft + this.marginRight + this.paddingRight, this.measurer.size.height + this.marginTop + this.paddingTop + this.marginBottom + this.paddingBottom);
        if (this.size.width === 0)
            this.size.width = 1;
        if (this.size.height === 0)
            this.size.height = 1;
    };
    TextField.prototype.passPropertiesToRowSet = function (rowSet) {
        rowSet.setFont(this.font);
        rowSet.setPixelPerfect(this.pixelPerfect);
        rowSet.setWordBrake(this.wordBrake);
        rowSet.setText(this._textEx);
        rowSet.setAlignText(this.alignText);
        rowSet.setAlignTextContentHorizontal(this.alignTextContentHorizontal);
        rowSet.setAlignTextContentVertical(this.alignTextContentVertical);
    };
    TextField.prototype.redrawText = function () {
        if (!this.needTextRedraw)
            return;
        this.rowSet.updateRowsVisibility();
        if (this.cacheSurface !== undefined) {
            this.cacheSurface.clear();
            this.cacheSurface.drawModel(this.rowSet);
        }
        this.needTextRedraw = false;
    };
    return TextField;
}(WidgetContainer));

var TextFieldWithoutCache = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(TextFieldWithoutCache, _super);
    function TextFieldWithoutCache(game, font) {
        var _this = _super.call(this, game, font, false) || this;
        _this.type = 'TextFieldWithoutCache';
        return _this;
    }
    TextFieldWithoutCache.prototype.requestTextRedraw = function () {
    };
    return TextFieldWithoutCache;
}(TextField));


;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/_internal/arcToSvgCurve.ts
var polarToCartesian = function (centerX, centerY, radius, angle) {
    return {
        x: centerX + (radius * Math.cos(angle)),
        y: centerY + (radius * Math.sin(angle))
    };
};
var arcToSvgCurve = function (x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';
    return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
};

;// CONCATENATED MODULE: ./engine/renderable/impl/general/image/batchedImage.ts



var ColorEx = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(ColorEx, _super);
    function ColorEx() {
        var _this = _super.call(this) || this;
        _this.packed = [0, 0];
        _this.observe(function () {
            _this.packed[0] = (_this.r << 8) | _this.g;
            _this.packed[1] = (_this.b << 8) | _this.a;
        });
        return _this;
    }
    ColorEx.prototype.getPackedColor = function () {
        return this.packed;
    };
    ColorEx.prototype.clone = function () {
        var col = new ColorEx();
        col.setRGBA(this.r, this.g, this.b, this.a);
        return col;
    };
    return ColorEx;
}(Color));

var BatchedImage = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(BatchedImage, _super);
    function BatchedImage(game) {
        var _this = _super.call(this, game) || this;
        _this.fillColor = new ColorEx();
        _this.size.setWH(16);
        _this.fillColor.fromJSON(Color.GREY.toJSON());
        return _this;
    }
    BatchedImage.prototype._transform = function () { };
    BatchedImage.prototype._translate = function () { };
    BatchedImage.prototype.update = function () { };
    BatchedImage.prototype.render = function () {
        if (!this.visible)
            return;
        if (this.fillColor.a === 0)
            return;
        var delta = this.game.getDeltaTime();
        var dSeconds = delta / 1000;
        if (this.velocity.x !== 0)
            this.pos.x += this.velocity.x * dSeconds;
        if (this.velocity.y !== 0)
            this.pos.y += this.velocity.y * dSeconds;
        if (this._angleVelocity3d.z !== 0)
            this.angle3d.z += this._angleVelocity3d.z * dSeconds;
        this.draw();
    };
    BatchedImage.prototype.setClonedProperties = function (cloned) {
        cloned.fillColor.fromJSON(this.fillColor.toJSON());
        _super.prototype.setClonedProperties.call(this, cloned);
    };
    BatchedImage.prototype.clone = function () {
        var cloned = new BatchedImage(this.game);
        this.setClonedProperties(cloned);
        return cloned;
    };
    BatchedImage.prototype.draw = function () {
        this.game.getRenderer().drawBatchedImage(this);
    };
    return BatchedImage;
}(RenderableModel));


;// CONCATENATED MODULE: ./engine/renderable/impl/surface/drawingSurface.ts
















var ContainerForDrawingSurface = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(ContainerForDrawingSurface, _super);
    function ContainerForDrawingSurface(game, matrixStack) {
        var _this = _super.call(this, game) || this;
        _this.matrixStack = matrixStack;
        _this._parentChildDelegate.afterChildAppended = undefined;
        _this._parentChildDelegate.afterChildRemoved = undefined;
        return _this;
    }
    ContainerForDrawingSurface.prototype.render = function () {
        var renderer = this.game.getRenderer();
        renderer.transformSave();
        renderer.transformSet(this.matrixStack.getCurrentValue());
        renderer.transformTranslate(this.pos.x, this.pos.y, 0);
        this.pos.setXY(0);
        this.worldTransformDirty = true;
        _super.prototype.render.call(this);
        this.game.getRenderer().transformRestore();
    };
    return ContainerForDrawingSurface;
}(SimpleGameObjectContainer));
var DrawingSession = (function () {
    function DrawingSession(game, surface, _matrixStack) {
        this.game = game;
        this.surface = surface;
        this._matrixStack = _matrixStack;
        this._rect = new Rectangle(this.game);
        this._batchedImage = new BatchedImage(this.game);
        this._ellipse = new Ellipse(this.game);
        this._transformableContainer = new ContainerForDrawingSurface(this.game, this._matrixStack);
        this.pathParams = {
            lineWidth: 1
        };
        this.fillColor = Color.RGBA(0, 0, 0, 255);
        this.drawColor = Color.RGBA(0, 0, 0, 255);
        this._renderTarget =
            this.game.getRenderer().getHelper().createRenderTarget(this.game, this.surface.size);
    }
    DrawingSession.prototype.clear = function () {
        this._renderTarget.clear(Color.NONE, true, 0);
    };
    DrawingSession.prototype.drawRoundedRect = function (x, y, width, height, radius) {
        this._rect.borderRadius = radius;
        this.drawRect(x, y, width, height);
    };
    DrawingSession.prototype.drawRect = function (x, y, width, height) {
        if (width === 0 || height === 0)
            return;
        if (width < 0) {
            x -= width;
            width = -width;
        }
        if (height < 0) {
            y -= height;
            height = -height;
        }
        if (this._matrixStack.getCurrentValue().identityFlag &&
            this.pathParams.lineWidth === 0 &&
            this._rect.borderRadius === 0) {
            this._batchedImage.pos.setXY(x, y);
            this._batchedImage.size.setWH(width, height);
            this._batchedImage.fillColor.setFrom(this.surface.getFillColor());
            this._batchedImage.draw();
        }
        else {
            this._rect.pos.setXY(x, y);
            this._rect.size.setWH(width, height);
            this.drawSimpleShape(this._rect);
            this._rect.borderRadius = 0;
        }
    };
    DrawingSession.prototype.drawCircle = function (cx, cy, radius) {
        this.drawEllipse(cx, cy, radius, radius);
    };
    DrawingSession.prototype.drawEllipse = function (cx, cy, radiusX, radiusY) {
        if (radiusX === 0 || radiusY === 0)
            return;
        this._ellipse.radiusX = radiusX;
        this._ellipse.radiusY = radiusY;
        this._ellipse.center.setXY(cx, cy);
        this._ellipse.arcAngleFrom = 0;
        this._ellipse.arcAngleTo = 0;
        this._ellipse.anticlockwise = false;
        this.drawSimpleShape(this._ellipse);
    };
    DrawingSession.prototype.drawArc = function (cx, cy, radius, startAngle, endAngle, anticlockwise) {
        if (anticlockwise === void 0) { anticlockwise = false; }
        if (radius === 0)
            return;
        this._ellipse.radiusX = radius;
        this._ellipse.radiusY = radius;
        this._ellipse.center.setXY(cx, cy);
        this._ellipse.arcAngleFrom = startAngle;
        this._ellipse.arcAngleTo = endAngle;
        this._ellipse.anticlockwise = anticlockwise;
        var fillColor = this.surface.getFillColor();
        this.surface.setFillColor(Color.NONE);
        this.drawSimpleShape(this._ellipse);
        this.surface.setFillColor(fillColor);
    };
    DrawingSession.prototype.fillArc = function (cx, cy, radius, startAngle, endAngle, anticlockwise) {
        if (anticlockwise === void 0) { anticlockwise = false; }
        if (radius === 0)
            return;
        if (Math.abs(Math.abs(startAngle % (Math.PI * 2)) -
            Math.abs(endAngle % (Math.PI * 2))) <= 0.001) {
            var lineWidth = this.surface.getLineWidth();
            this.surface.setLineWidth(0);
            this.drawCircle(cx, cy, radius);
            this.surface.setLineWidth(lineWidth);
        }
        else {
            if (anticlockwise) {
                var tmp = startAngle;
                startAngle = endAngle;
                endAngle = tmp + 2 * Math.PI;
            }
            var path = arcToSvgCurve(cx, cy, radius, startAngle, endAngle) + " z";
            var polygon = Polygon.fromSvgPath(this.game, path);
            polygon.fillColor.setFrom(this.surface.getFillColor());
            this.drawModel(polygon);
        }
    };
    DrawingSession.prototype.drawText = function (text, x, y) {
        if ( true && this.surface.getFont() === undefined) {
            throw new debugError/* DebugError */.N("font is not set");
        }
        if (this._textField === undefined) {
            this._textField = new TextFieldWithoutCache(this.game, this.surface.getFont());
            this._textField.revalidate();
        }
        this._textField.setFont(this.surface.getFont());
        this._textField.setWordBrake(0);
        this._textField.textColor.setFrom(this.surface.getDrawColor());
        this._textField.pos.setXY(x, y);
        this._textField.setText(text);
        this._textField.update();
        this.drawModel(this._textField);
    };
    DrawingSession.prototype.moveTo = function (x, y) {
        if (this._svgPathToVertexArrayBuilder === undefined) {
            this._svgPathToVertexArrayBuilder = new SvgPathToVertexArrayBuilder(this.game);
        }
        this._svgPathToVertexArrayBuilder.moveTo(x, y);
    };
    DrawingSession.prototype.lineTo = function (x, y) {
        if (this._svgPathToVertexArrayBuilder === undefined) {
            this._svgPathToVertexArrayBuilder = new SvgPathToVertexArrayBuilder(this.game);
            this._svgPathToVertexArrayBuilder.moveTo(x, y);
        }
        else {
            this._svgPathToVertexArrayBuilder.lineTo(x, y);
        }
    };
    DrawingSession.prototype.quadraticCurveTo = function (x1, y1, x2, y2) {
        if (this._svgPathToVertexArrayBuilder === undefined) {
            this._svgPathToVertexArrayBuilder = new SvgPathToVertexArrayBuilder(this.game);
            this._svgPathToVertexArrayBuilder.moveTo(0, 0);
        }
        else {
            this._svgPathToVertexArrayBuilder.quadraticCurveTo(x1, y1, x2, y2);
        }
    };
    DrawingSession.prototype.closePolyline = function () {
        var _a;
        (_a = this._svgPathToVertexArrayBuilder) === null || _a === void 0 ? void 0 : _a.close();
    };
    DrawingSession.prototype.completePolyline = function () {
        if (this._svgPathToVertexArrayBuilder === undefined) {
            if (true)
                throw new debugError/* DebugError */.N("can not complete polyline: no path to complete");
            return;
        }
        var polyLines = [];
        var groups = this._svgPathToVertexArrayBuilder.getResult();
        for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
            var group = groups_1[_i];
            polyLines.push(PolyLine.fromVertices(this.game, group.vertexArray, this.pathParams, group.closed));
        }
        for (var _a = 0, polyLines_1 = polyLines; _a < polyLines_1.length; _a++) {
            var p = polyLines_1[_a];
            p.color.setFrom(this.drawColor);
            this.drawModel(p);
            p.destroy();
        }
        this._svgPathToVertexArrayBuilder = undefined;
    };
    DrawingSession.prototype.drawPolygon = function (pathOrVertices) {
        if (pathOrVertices.push !== undefined) {
            this.drawPolygonFromVertices(pathOrVertices);
        }
        else {
            this.drawPolygonFromSvgPath(pathOrVertices);
        }
    };
    DrawingSession.prototype.drawPolyline = function (pathOrVertices) {
        var p;
        if ((0,object/* isString */.HD)(pathOrVertices)) {
            p = PolyLine.fromSvgPath(this.game, pathOrVertices, this.pathParams);
        }
        else {
            p = PolyLine.fromVertices(this.game, pathOrVertices, this.pathParams);
        }
        p.color.setFrom(this.surface.getDrawColor());
        this.drawModel(p);
    };
    DrawingSession.prototype.drawModel = function (model) {
        if ( true && !model)
            throw new debugError/* DebugError */.N("illegal argument: ".concat(model));
        var parent = model.parent;
        model.parent = undefined;
        this._transformableContainer.appendChild(model);
        this.game.getCurrentScene()._renderingSessionInfo.drawingStackEnabled = false;
        this._transformableContainer.renderToTexture(this._renderTarget);
        this.game.getCurrentScene()._renderingSessionInfo.drawingStackEnabled = !this.game.hasCurrentTransition();
        this._transformableContainer.removeChild(model);
        model.parent = parent;
    };
    DrawingSession.prototype._getTexture = function () {
        return this.canvasImage.getTexture();
    };
    DrawingSession.prototype._draw = function () {
        this.canvasImage.alpha = this.surface.alpha;
        this.canvasImage.filters = this.surface.filters;
        this.game.getRenderer().drawImage(this.canvasImage);
    };
    DrawingSession.prototype._destroy = function () {
        this._renderTarget.destroy();
    };
    DrawingSession.prototype._setPixelPerfect = function (val) {
        this.canvasImage.setPixelPerfect(val);
    };
    DrawingSession.prototype.drawPolygonFromSvgPath = function (svgPath) {
        var polyLines = PolyLine.fromMultiCurveSvgPath(this.game, svgPath, { lineWidth: this.surface.getLineWidth() });
        for (var _i = 0, polyLines_2 = polyLines; _i < polyLines_2.length; _i++) {
            var pl = polyLines_2[_i];
            var pg = Polygon.fromPolyline(this.game, pl);
            pg.fillColor.setFrom(this.surface.getFillColor());
            this.drawModel(pg);
        }
        if (this.surface.getLineWidth() > 0) {
            for (var _a = 0, polyLines_3 = polyLines; _a < polyLines_3.length; _a++) {
                var pl = polyLines_3[_a];
                pl.color.setFrom(this.surface.getDrawColor());
                this.drawModel(pl);
            }
        }
    };
    DrawingSession.prototype.drawPolygonFromVertices = function (vertices) {
        var pl = PolyLine.fromVertices(this.game, vertices, { lineWidth: this.surface.getLineWidth() }, true);
        pl.color.setFrom(this.surface.getDrawColor());
        var pg = Polygon.fromPolyline(this.game, pl);
        pg.fillColor.setFrom(this.surface.getFillColor());
        this.drawModel(pg);
        if (this.surface.getLineWidth() > 0) {
            this.drawModel(pl);
        }
    };
    DrawingSession.prototype.prepareShape = function (shape) {
        shape.fillColor.setFrom(this.surface.getFillColor());
        shape.lineWidth = this.surface.getLineWidth();
        shape.color.setFrom(this.surface.getDrawColor());
    };
    DrawingSession.prototype.drawSimpleShape = function (shape) {
        this.prepareShape(shape);
        this.drawModel(shape);
    };
    return DrawingSession;
}());
var DrawingSurface = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(DrawingSurface, _super);
    function DrawingSurface(game, size) {
        var _this = _super.call(this, game) || this;
        _this.type = 'DrawingSurface';
        _this.setResourceLink = undefined;
        _this._matrixStack = new MatrixStack();
        if (true) {
            if (size.width === 0 || size.height === 0) {
                throw new debugError/* DebugError */.N("can not create Drawing surface with zero size: {width:".concat(size.width, ",height:").concat(size.height, "}"));
            }
        }
        _this.size.setFrom(size);
        _this._drawingSession = new DrawingSession(_this.game, _this, _this._matrixStack);
        _this.canvasImage = new Image(_this.game, _this._drawingSession._renderTarget.getTexture());
        _this.canvasImage.size.setFrom(_this.size);
        _this.canvasImage.revalidate();
        _this._drawingSession.canvasImage = _this.canvasImage;
        return _this;
    }
    DrawingSurface.normalizeColor = function (col, g, b, a) {
        if (a === void 0) { a = 255; }
        if (col.type === 'Color') {
            return col;
        }
        else if ((0,object/* isNumber */.hj)(col) && b === undefined) {
            var color = Color.fromRGBNumeric(col);
            if (g !== undefined)
                color.a = g;
            return color;
        }
        else {
            return new Color(col, g, b, a);
        }
    };
    DrawingSurface.prototype.getChildrenCount = function () {
        return 0;
    };
    DrawingSurface.prototype.clone = function () { return undefined; };
    DrawingSurface.prototype.draw = function () {
        this._drawingSession._draw();
    };
    DrawingSurface.prototype.getTexture = function () {
        return this._drawingSession._getTexture();
    };
    DrawingSurface.prototype.setFillColor = function (col, g, b, a) {
        if (a === void 0) { a = 255; }
        this._drawingSession.fillColor = DrawingSurface.normalizeColor(col, g, b, a);
    };
    DrawingSurface.prototype.getFillColor = function () {
        return this._drawingSession.fillColor;
    };
    DrawingSurface.prototype.getDrawColor = function () {
        return this._drawingSession.drawColor;
    };
    DrawingSurface.prototype.setDrawColor = function (col, g, b, a) {
        if (a === void 0) { a = 255; }
        this._drawingSession.drawColor = DrawingSurface.normalizeColor(col, g, b, a);
    };
    DrawingSurface.prototype.setLineWidth = function (v) {
        this._drawingSession.pathParams.lineWidth = v;
    };
    DrawingSurface.prototype.setLineJoint = function (style) {
        this._drawingSession.pathParams.jointStyle = style;
    };
    DrawingSurface.prototype.setLineCap = function (style) {
        this._drawingSession.pathParams.endCapStyle = style;
    };
    DrawingSurface.prototype.getLineWidth = function () {
        return this._drawingSession.pathParams.lineWidth;
    };
    DrawingSurface.prototype.transformReset = function () {
        this._matrixStack.resetTransform();
    };
    DrawingSurface.prototype.transformSet = function (val) {
        this._matrixStack.setMatrix(val);
    };
    DrawingSurface.prototype.transformRestore = function () {
        this._matrixStack.restore();
    };
    DrawingSurface.prototype.transformRotateX = function (angleInRadians) {
        this._matrixStack.rotateX(angleInRadians);
    };
    DrawingSurface.prototype.transformRotateY = function (angleInRadians) {
        this._matrixStack.rotateY(angleInRadians);
    };
    DrawingSurface.prototype.transformRotateZ = function (angleInRadians) {
        this._matrixStack.rotateZ(angleInRadians);
    };
    DrawingSurface.prototype.transformSave = function () {
        this._matrixStack.save();
    };
    DrawingSurface.prototype.transformScale = function (x, y, z) {
        this._matrixStack.scale(x, y, z);
    };
    DrawingSurface.prototype.transformSkewX = function (angle) {
        this._matrixStack.skewX(angle);
    };
    DrawingSurface.prototype.transformSkewY = function (angle) {
        this._matrixStack.skewY(angle);
    };
    DrawingSurface.prototype.transformTranslate = function (x, y, z) {
        this._matrixStack.translate(x, y, z);
    };
    DrawingSurface.prototype.setFont = function (font) {
        this._font = font;
    };
    DrawingSurface.prototype.getFont = function () {
        return this._font;
    };
    DrawingSurface.prototype.setPixelPerfect = function (val) {
        this._drawingSession._setPixelPerfect(val);
    };
    DrawingSurface.prototype._beforeSession = function () {
        this.game.getRenderer().getHelper().saveRenderTarget();
        this.game.getRenderer().setRenderTarget(this._drawingSession._renderTarget);
        this._drawingSession._renderTarget.bind();
    };
    DrawingSurface.prototype._afterSession = function () {
        this.game.getRenderer().getHelper().restoreRenderTarget();
    };
    DrawingSurface.prototype.drawBatch = function (fn) {
        this._beforeSession();
        fn(this._drawingSession);
        this._afterSession();
    };
    DrawingSurface.prototype.drawArc = function (cx, cy, radius, startAngle, endAngle, anticlockwise) {
        this._beforeSession();
        this._drawingSession.drawArc(cx, cy, radius, startAngle, endAngle, anticlockwise);
        this._afterSession();
    };
    DrawingSurface.prototype.fillArc = function (cx, cy, radius, startAngle, endAngle, anticlockwise) {
        this._beforeSession();
        this._drawingSession.fillArc(cx, cy, radius, startAngle, endAngle, anticlockwise);
        this._afterSession();
    };
    DrawingSurface.prototype.drawCircle = function (cx, cy, radius) {
        this._beforeSession();
        this._drawingSession.drawCircle(cx, cy, radius);
        this._afterSession();
    };
    DrawingSurface.prototype.drawEllipse = function (cx, cy, radiusX, radiusY) {
        this._beforeSession();
        this._drawingSession.drawEllipse(cx, cy, radiusX, radiusY);
        this._afterSession();
    };
    DrawingSurface.prototype.drawPolygon = function (pathOrVertices) {
        this._beforeSession();
        this._drawingSession.drawPolygon(pathOrVertices);
        this._afterSession();
    };
    DrawingSurface.prototype.drawPolyline = function (pathOrVertices) {
        this._beforeSession();
        this._drawingSession.drawPolyline(pathOrVertices);
        this._afterSession();
    };
    DrawingSurface.prototype.drawRect = function (x, y, width, height) {
        this._beforeSession();
        this._drawingSession.drawRect(x, y, width, height);
        this._afterSession();
    };
    DrawingSurface.prototype.drawRoundedRect = function (x, y, width, height, radius) {
        this._beforeSession();
        this._drawingSession.drawRoundedRect(x, y, width, height, radius);
        this._afterSession();
    };
    DrawingSurface.prototype.drawText = function (text, x, y) {
        this._beforeSession();
        this._drawingSession.drawText(text, x, y);
        this._afterSession();
    };
    DrawingSurface.prototype.lineTo = function (x, y) {
        this._drawingSession.lineTo(x, y);
    };
    DrawingSurface.prototype.quadraticCurveTo = function (x1, y1, x2, y2) {
        this._drawingSession.quadraticCurveTo(x1, y1, x2, y2);
    };
    DrawingSurface.prototype.moveTo = function (x, y) {
        this._drawingSession.moveTo(x, y);
    };
    DrawingSurface.prototype.closePolyline = function () {
        this._drawingSession.closePolyline();
    };
    DrawingSurface.prototype.completePolyline = function () {
        this._beforeSession();
        this._drawingSession.completePolyline();
        this._afterSession();
    };
    DrawingSurface.prototype.drawModel = function (m) {
        this._beforeSession();
        this._drawingSession.drawModel(m);
        this._afterSession();
    };
    DrawingSurface.prototype.clear = function () {
        this._beforeSession();
        this._drawingSession.clear();
        this._afterSession();
    };
    DrawingSurface.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._drawingSession._destroy();
    };
    return DrawingSurface;
}(RenderableModel));


;// CONCATENATED MODULE: ./engine/renderer/webGl/primitives/plane.ts


var Plane = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(Plane, _super);
    function Plane() {
        var _this = _super.call(this) || this;
        _this.vertexArr = [
            0, 0,
            0, 1,
            1, 0,
            1, 1
        ];
        _this.indexArr = [0, 1, 2, 3];
        _this.texCoordArr = [
            0, 0,
            0, 1,
            1, 0,
            1, 1
        ];
        return _this;
    }
    return Plane;
}(AbstractPrimitive));


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/program/shaderProgramUtils.ts

var parseErrors = function (log) {
    if (false)
        {}
    var logs = [];
    var result;
    while (result = log.match(/ERROR:([^\n]+)/)) {
        if (result.index !== undefined)
            log = log.slice((result.index + 1));
        var line = result[1].trim();
        var seps = line.split(':');
        var message = seps.slice(2).join(':').trim();
        var lineNum = +seps[1];
        logs.push({ message: message, lineNum: lineNum });
    }
    return logs;
};
var compileShader = function (gl, shaderSource, shaderType) {
    if (true) {
        if (!shaderSource)
            throw new debugError/* DebugError */.N("can not compile shader: shader source not specified for type ".concat(shaderType));
    }
    var shader = gl.createShader(shaderType);
    if ( true && !shader)
        throw new debugError/* DebugError */.N("can not allocate memory for shader: gl.createShader(shaderType)");
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        var lastError = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        if (lastError !== null) {
            if (true) {
                var parsedLogs = parseErrors(lastError);
                var lines_1 = shaderSource.split('\n');
                var errorMsg_1 = '';
                var arrow_1 = '----->';
                parsedLogs.forEach(function (inf) {
                    var i = inf.lineNum - 1;
                    if (lines_1[i].indexOf(arrow_1) === -1)
                        lines_1[i] = "".concat(arrow_1, " ").concat(lines_1[i]);
                    errorMsg_1 += "".concat(lines_1[i], " <----").concat(inf.message, "\n");
                });
                console.log(lines_1.join('\n'));
                throw new debugError/* DebugError */.N("Error compiling shader: ".concat(errorMsg_1 ? errorMsg_1 : lastError));
            }
            else {}
        }
        else {
            throw new Error( true ? 'unknown compilation error' : 0);
        }
    }
    return shader || undefined;
};
var createProgram = function (gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    if ( true && !program)
        throw new debugError/* DebugError */.N("can not allocate memory for gl.createProgram()");
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        var lastError = gl.getProgramInfoLog(program);
        if (lastError) {
            if (true) {
                var status_1 = gl.getProgramParameter(program, gl.VALIDATE_STATUS);
                console.error('VALIDATE_STATUS', status_1);
                var vertexSource = gl.getShaderSource(vertexShader);
                var fragmentSource = gl.getShaderSource(fragmentShader);
                console.log(vertexSource);
                console.log('\n\n');
                console.log(fragmentSource);
                gl.deleteProgram(program);
                throw new debugError/* DebugError */.N("Error in program linking. Last error \"".concat(lastError, "\", status: ").concat(status_1));
            }
            else {}
        }
        else {
            throw new Error( true ? 'unknown linking error' : 0);
        }
    }
    return program;
};
var GL_TABLE;
var GL_TYPE;
(function (GL_TYPE) {
    GL_TYPE["FLOAT"] = "float";
    GL_TYPE["FLOAT_VEC2"] = "vec2";
    GL_TYPE["FLOAT_VEC3"] = "vec3";
    GL_TYPE["FLOAT_VEC4"] = "vec4";
    GL_TYPE["INT"] = "int";
    GL_TYPE["INT_VEC2"] = "ivec2";
    GL_TYPE["INT_VEC3"] = "ivec3";
    GL_TYPE["INT_VEC4"] = "ivec4";
    GL_TYPE["BOOL"] = "bool";
    GL_TYPE["BOOL_VEC2"] = "bvec2";
    GL_TYPE["BOOL_VEC3"] = "bvec3";
    GL_TYPE["BOOL_VEC4"] = "bvec4";
    GL_TYPE["FLOAT_MAT2"] = "mat2";
    GL_TYPE["FLOAT_MAT3"] = "mat3";
    GL_TYPE["FLOAT_MAT4"] = "mat4";
    GL_TYPE["SAMPLER_2D"] = "sampler2D";
    GL_TYPE["SAMPLER_CUBE"] = "samplerCube";
})(GL_TYPE || (GL_TYPE = {}));
var mapType = function (gl, type) {
    if (GL_TABLE === undefined) {
        var typeNames = Object.keys(GL_TYPE);
        GL_TABLE = {};
        for (var i = 0; i < typeNames.length; ++i) {
            var tn = typeNames[i];
            GL_TABLE[gl[tn]] = GL_TYPE[tn];
        }
    }
    return GL_TABLE[type];
};
var normalizeUniformName = function (s) {
    if ( true && s.indexOf(' ') > -1)
        throw new debugError/* DebugError */.N("bad uniform name: \"".concat(s, "\", check spaces!"));
    else
        return s;
};
var extractUniformsFromShader = function (gl, program) {
    var glProgram = program.getProgram();
    var activeUniforms = gl.getProgramParameter(glProgram, gl.ACTIVE_UNIFORMS);
    var uniforms = {};
    for (var i = 0; i < activeUniforms; i++) {
        var uniformData = gl.getActiveUniform(glProgram, i);
        if ( true && !uniformData)
            throw new debugError/* DebugError */.N("can not receive active uniforms info: gl.getActiveUniform()");
        var type = mapType(gl, uniformData.type);
        var name_1 = normalizeUniformName(uniformData.name);
        var location_1 = gl.getUniformLocation(glProgram, name_1);
        if (location_1 === null) {
            continue;
        }
        uniforms[name_1] = {
            type: type,
            size: uniformData.size,
            location: location_1,
            setter: getUniformSetter(uniformData.size, type)
        };
        if (name_1.indexOf('[') > -1) {
            var arrayName = name_1.split(/\[/)[0];
            uniforms[arrayName] = uniforms[name_1];
        }
    }
    return uniforms;
};
var extractUniformsAndAttributesFromShaderSource = function (vertexSource, fragmentSource) {
    var uniforms = [];
    var attributes = [];
    var allTokens = "".concat(vertexSource, " ").concat(fragmentSource).split(/[\s;]/).filter(function (it) { return !!it; });
    allTokens.forEach(function (it, i) {
        var possibleUniformName = allTokens[i + 2];
        if (it === 'uniform' && possibleUniformName !== undefined && uniforms.indexOf(possibleUniformName) === -1) {
            uniforms.push(possibleUniformName);
        }
        else {
            var possibleAttributeName = allTokens[i + 2];
            if (it === 'attribute' && possibleAttributeName !== undefined && attributes.indexOf(possibleAttributeName) === -1) {
                attributes.push(possibleAttributeName);
            }
        }
    });
    return { uniforms: uniforms, attributes: attributes };
};
var extractAttributes = function (gl, program) {
    var glProgram = program.getProgram();
    var activeAttributes = gl.getProgramParameter(glProgram, gl.ACTIVE_ATTRIBUTES);
    var attrMap = {};
    for (var i = 0; i < activeAttributes; i++) {
        var attrData = gl.getActiveAttrib(glProgram, i);
        if ( true && !attrData)
            throw new debugError/* DebugError */.N("can not receive active attribute info: gl.getActiveAttrib()");
        var location_2 = gl.getAttribLocation(glProgram, attrData.name);
        if ( true && location_2 < 0) {
            console.log(program);
            throw new debugError/* DebugError */.N("error finding attribute location: ".concat(attrData.name));
        }
        attrMap[attrData.name] = location_2;
    }
    return attrMap;
};
var isNumber = function (val) {
    if (false)
        {}
    if (isNaN(parseFloat(String(val))) || !isFinite(Number(val)))
        throw new debugError/* DebugError */.N("can not set uniform with value ".concat(val, ": expected argument of type number"));
    else
        return true;
};
var isInteger = function (val) {
    if (false)
        {}
    isNumber(val);
    if (val !== ~~val)
        throw new debugError/* DebugError */.N("can not set uniform with value ".concat(val, ": expected argument of integer type, but ").concat(val, " found"));
    else
        return true;
};
var isBoolean = function (val) {
    if (false)
        {}
    if (!(val === true || val === false))
        throw new debugError/* DebugError */.N("can not set uniform with value ".concat(val, ": expected argument of boolean type, but ").concat(val, " found"));
    else
        return true;
};
var isArrayOfType = function (val, checker, size) {
    return true;
};
var getUniformSetter = function (size, type) {
    if (size === 1) {
        switch (type) {
            case GL_TYPE.FLOAT: return function (gl, location, value) {
                if (isNumber(value))
                    gl.uniform1f(location, value);
            };
            case GL_TYPE.FLOAT_VEC2: return function (gl, location, value) {
                if (isArrayOfType(value, isNumber, 2))
                    gl.uniform2f(location, value[0], value[1]);
            };
            case GL_TYPE.FLOAT_VEC3: return function (gl, location, value) {
                if (isArrayOfType(value, isNumber, 3))
                    gl.uniform3f(location, value[0], value[1], value[2]);
            };
            case GL_TYPE.FLOAT_VEC4: return function (gl, location, value) {
                if (isArrayOfType(value, isNumber, 4))
                    gl.uniform4f(location, value[0], value[1], value[2], value[3]);
            };
            case GL_TYPE.INT: return function (gl, location, value) {
                if (isInteger(value))
                    gl.uniform1i(location, value);
            };
            case GL_TYPE.INT_VEC2: return function (gl, location, value) {
                if (isArrayOfType(value, isInteger, 2))
                    gl.uniform2i(location, value[0], value[1]);
            };
            case GL_TYPE.INT_VEC3: return function (gl, location, value) {
                if (isArrayOfType(value, isInteger, 3))
                    gl.uniform3i(location, value[0], value[1], value[2]);
            };
            case GL_TYPE.INT_VEC4: return function (gl, location, value) {
                if (isArrayOfType(value, isInteger, 4))
                    gl.uniform4i(location, value[0], value[1], value[2], value[3]);
            };
            case GL_TYPE.BOOL: return function (gl, location, value) {
                if (isBoolean(value))
                    gl.uniform1i(location, value ? 1 : 0);
            };
            case GL_TYPE.BOOL_VEC2: return function (gl, location, value) {
                if (isArrayOfType(value, isBoolean, 2))
                    gl.uniform2i(location, value[0], value[1]);
            };
            case GL_TYPE.BOOL_VEC3: return function (gl, location, value) {
                if (isArrayOfType(value, isBoolean, 3))
                    gl.uniform3i(location, value[0], value[1], value[2]);
            };
            case GL_TYPE.BOOL_VEC4: return function (gl, location, value) {
                if (isArrayOfType(value, isBoolean, 4))
                    gl.uniform4i(location, value[0], value[1], value[2], value[3]);
            };
            case GL_TYPE.FLOAT_MAT2: return function (gl, location, value) {
                if (isArrayOfType(value, isNumber, 2 * 2))
                    gl.uniformMatrix2fv(location, false, value);
            };
            case GL_TYPE.FLOAT_MAT3: return function (gl, location, value) {
                if (isArrayOfType(value, isNumber, 3 * 3))
                    gl.uniformMatrix3fv(location, false, value);
            };
            case GL_TYPE.FLOAT_MAT4: return function (gl, location, value) {
                if (isArrayOfType(value, isNumber, 4 * 4))
                    gl.uniformMatrix4fv(location, false, value);
            };
            case GL_TYPE.SAMPLER_2D: return function (gl, location, value) {
                if (isNumber(value))
                    gl.uniform1i(location, value);
            };
            case GL_TYPE.SAMPLER_CUBE: return function (gl, location, value) {
                if (isNumber(value))
                    gl.uniform1i(location, value);
            };
            default:
                if (true)
                    throw new debugError/* DebugError */.N("can not set uniform for type ".concat(type, " and size ").concat(size));
                break;
        }
    }
    else {
        switch (type) {
            case GL_TYPE.FLOAT: return function (gl, location, value) {
                if (isArrayOfType(value, isNumber, size))
                    gl.uniform1fv(location, value);
            };
            case GL_TYPE.FLOAT_VEC2: return function (gl, location, value) {
                if (isArrayOfType(value, isNumber, size * 2))
                    gl.uniform2fv(location, value);
            };
            case GL_TYPE.FLOAT_VEC3: return function (gl, location, value) {
                if (isArrayOfType(value, isNumber, size * 3))
                    gl.uniform3fv(location, value);
            };
            case GL_TYPE.FLOAT_VEC4: return function (gl, location, value) {
                if (isArrayOfType(value, isNumber, size * 4))
                    gl.uniform4fv(location, value);
            };
            case GL_TYPE.INT: return function (gl, location, value) {
                if (isArrayOfType(value, isInteger, size))
                    gl.uniform1iv(location, value);
            };
            case GL_TYPE.INT_VEC2: return function (gl, location, value) {
                if (isArrayOfType(value, isInteger, size * 2))
                    gl.uniform2iv(location, value);
            };
            case GL_TYPE.INT_VEC3: return function (gl, location, value) {
                if (isArrayOfType(value, isInteger, size * 3))
                    gl.uniform3iv(location, value);
            };
            case GL_TYPE.INT_VEC4: return function (gl, location, value) {
                if (isArrayOfType(value, isInteger, size * 4))
                    gl.uniform4iv(location, value);
            };
            case GL_TYPE.BOOL: return function (gl, location, value) {
                if (isArrayOfType(value, isBoolean, size))
                    gl.uniform1iv(location, value);
            };
            case GL_TYPE.BOOL_VEC2: return function (gl, location, value) {
                if (isArrayOfType(value, isBoolean, size * 2))
                    gl.uniform2iv(location, value);
            };
            case GL_TYPE.BOOL_VEC3: return function (gl, location, value) {
                if (isArrayOfType(value, isBoolean, size * 3))
                    gl.uniform3iv(location, value);
            };
            case GL_TYPE.BOOL_VEC4: return function (gl, location, value) {
                if (isArrayOfType(value, isBoolean, size * 4))
                    gl.uniform4iv(location, value);
            };
            case GL_TYPE.SAMPLER_2D: return function (gl, location, value) {
                if (isArrayOfType(value, isInteger, size))
                    gl.uniform1iv(location, value);
            };
            case GL_TYPE.SAMPLER_CUBE: return function (gl, location, value) {
                if (isArrayOfType(value, isInteger, size))
                    gl.uniform1iv(location, value);
            };
            default:
                if (true)
                    throw new debugError/* DebugError */.N("can not set uniform for type ".concat(type, " and size ").concat(size));
                break;
        }
    }
    throw new Error();
};

;// CONCATENATED MODULE: ./engine/renderer/webGl/base/program/shaderProgram.ts


var ShaderProgram = (function () {
    function ShaderProgram(_gl, vertexSource, fragmentSource) {
        this._gl = _gl;
        this._attributeSourceNames = [];
        var vShader = compileShader(_gl, vertexSource, _gl.VERTEX_SHADER);
        var fShader = compileShader(_gl, fragmentSource, _gl.FRAGMENT_SHADER);
        this._program = createProgram(_gl, vShader, fShader);
        _gl.deleteShader(vShader);
        _gl.deleteShader(fShader);
        this._uniforms = extractUniformsFromShader(_gl, this);
        this._attributes = extractAttributes(_gl, this);
        var sourceExtracted = extractUniformsAndAttributesFromShaderSource(vertexSource, fragmentSource);
        this._attributeSourceNames = sourceExtracted.attributes;
        this._uniformSourceNames = sourceExtracted.uniforms;
    }
    ShaderProgram.prototype.getProgram = function () {
        return this._program;
    };
    ShaderProgram.prototype.bind = function () {
        if (ShaderProgram.currentProgram === this)
            return;
        this._gl.useProgram(this._program);
        ShaderProgram.currentProgram = this;
    };
    ShaderProgram.prototype.unbind = function () {
        this._gl.useProgram(null);
        ShaderProgram.currentProgram = undefined;
    };
    ShaderProgram.prototype.setUniform = function (name, value) {
        if ( true && !name) {
            throw new debugError/* DebugError */.N("no uniform name was provided!");
        }
        var uniformWrapper = this._uniforms[name];
        if ( true && !uniformWrapper) {
            if (this._uniformSourceNames.indexOf(name) > -1) {
                return;
            }
            console.error('uniforms', this._uniforms);
            throw new debugError/* DebugError */.N("no uniform with name ".concat(name, " found!"));
        }
        if (true) {
            if (ShaderProgram.currentProgram !== this) {
                console.error(this);
                throw new debugError/* DebugError */.N("can not set uniform: target program is inactive");
            }
        }
        uniformWrapper.setter(this._gl, uniformWrapper.location, value);
    };
    ShaderProgram.prototype.bindVertexBuffer = function (buffer) {
        var attrName = buffer.getAttrName();
        if (true) {
            if (!attrName)
                throw new debugError/* DebugError */.N("can not find attribute location: attrName not defined");
            if (this._attributes[attrName] === undefined) {
                if (this._attributeSourceNames.indexOf(attrName) > -1) {
                    return;
                }
                console.log(this);
                throw new debugError/* DebugError */.N("can not find attribute location for  ".concat(attrName));
            }
        }
        buffer.bind();
        this.enableAttribute(attrName);
        var attrLocation = this._attributes[attrName];
        this._gl.vertexAttribPointer(attrLocation, buffer.getItemSize(), buffer.getItemType(), false, buffer.getStride(), buffer.getOffset());
    };
    ShaderProgram.prototype.unbindVertexBuffer = function (buffer) {
        var attrName = buffer.getAttrName();
        buffer.unbind();
        this.disableAttribute(attrName);
    };
    ShaderProgram.prototype.disableAttribute = function (attrName) {
        this.toggleAttribute(attrName, false);
    };
    ShaderProgram.prototype.enableAttribute = function (attrName) {
        this.toggleAttribute(attrName, true);
    };
    ShaderProgram.prototype.destroy = function () {
        this._gl.deleteProgram(this._program);
    };
    ShaderProgram.prototype.toggleAttribute = function (attrName, on) {
        if (this._attributes[attrName] === undefined) {
            console.log(this);
            throw new debugError/* DebugError */.N("unbind error: can not find attribute location for ".concat(attrName));
        }
        var attrLocation = this._attributes[attrName];
        if (on) {
            this._gl.enableVertexAttribArray(attrLocation);
        }
        else {
            this._gl.disableVertexAttribArray(attrLocation);
        }
    };
    return ShaderProgram;
}());


;// CONCATENATED MODULE: ./engine/misc/collection/fastMap.ts
var FastMap = (function () {
    function FastMap() {
        this._keys = [];
        this._values = [];
    }
    FastMap.prototype.put = function (key, value) {
        var index = this._keys.indexOf(key);
        if (index === -1) {
            this._keys.push(key);
            this._values.push(value);
        }
        else {
            this._values[index] = value;
        }
    };
    FastMap.prototype.get = function (key) {
        var index = this._keys.indexOf(key);
        if (index === -1)
            return undefined;
        return this._values[index];
    };
    FastMap.prototype.has = function (key) {
        var index = this._keys.indexOf(key);
        return index > -1;
    };
    FastMap.prototype.remove = function (key) {
        var index = this._keys.indexOf(key);
        if (index === -1)
            return;
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
    };
    FastMap.prototype.getKeys = function () {
        return this._keys;
    };
    FastMap.prototype.getValues = function () {
        return this._values;
    };
    FastMap.prototype.size = function () {
        return this._keys.length;
    };
    return FastMap;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/painters/abstract/abstractPainter.ts




var AbstractPainter = (function () {
    function AbstractPainter(gl) {
        this.id = Incrementer.getValue();
        this.uniformCache = new FastMap();
        this.texturesToBind = { length: 0, texturesInfo: [] };
        this._destroyed = false;
        this.gl = gl;
    }
    AbstractPainter.prototype.destroy = function () {
        if (this.bufferInfo)
            this.bufferInfo.destroy();
        if (this.program !== undefined)
            this.program.destroy();
        this._destroyed = true;
    };
    AbstractPainter.prototype.isDestroyed = function () {
        return this._destroyed;
    };
    AbstractPainter.prototype.setUniform = function (name, value) {
        if ((0,object/* isTypedArray */.fU)(value)) {
            this.setUniformVector(name, value);
        }
        else {
            this.setUniformScalar(name, value);
        }
    };
    AbstractPainter.prototype.setUniformScalar = function (name, value) {
        if ( true && !name) {
            console.trace();
            throw new debugError/* DebugError */.N("can not set uniform with value ".concat(value, ": name is not provided"));
        }
        if ( true && value === null || value === undefined) {
            console.trace();
            throw new debugError/* DebugError */.N("can not set uniform with name ".concat(name, " and value ").concat(value));
        }
        if (!this.uniformCache.has(name)) {
            this.uniformCache.put(name, { value: value, dirty: true });
        }
        else {
            var valueInCache = this.uniformCache.get(name);
            if (valueInCache.value !== value) {
                valueInCache.value = value;
                valueInCache.dirty = true;
            }
        }
    };
    AbstractPainter.prototype.setUniformVector = function (name, value, dirtyFlag) {
        if (dirtyFlag === void 0) { dirtyFlag = false; }
        if ( true && !name) {
            console.trace();
            throw new debugError/* DebugError */.N("can not set uniform with value ".concat(value, ": name is not provided"));
        }
        if ( true && value === null || value === undefined) {
            console.trace();
            throw new debugError/* DebugError */.N("can not set uniform with name ".concat(name, " and value ").concat(value));
        }
        if (!this.uniformCache.has(name)) {
            this.uniformCache.put(name, { value: new Float32Array(value.length), dirty: true });
        }
        var uniformInCache = this.uniformCache.get(name);
        var arr = uniformInCache.value;
        if (dirtyFlag || !(0,object/* isEqualArray */.cg)(arr, value)) {
            arr.set(value);
            uniformInCache.dirty = true;
        }
    };
    AbstractPainter.prototype.attachTexture = function (uniformName, texture) {
        var _a;
        var _b, _c;
        var tx = (_a = (_b = this.texturesToBind.texturesInfo)[_c = this.texturesToBind.length]) !== null && _a !== void 0 ? _a : (_b[_c] = { uniformName: undefined, texture: undefined });
        tx.uniformName = uniformName;
        tx.texture = texture;
        this.texturesToBind.length++;
    };
    AbstractPainter.prototype.getAttachedTextureAt = function (i) {
        if ( true && i > this.texturesToBind.length - 1)
            throw new debugError/* DebugError */.N("can not find bound texture: out of range: index:".concat(i, ", length:").concat(this.texturesToBind.length));
        return this.texturesToBind.texturesInfo[i].texture;
    };
    AbstractPainter.prototype.setUniformsFromMap = function (batch) {
        var keys = batch.getKeys();
        var values = batch.getValues();
        for (var i = 0; i < keys.length; i++) {
            this.setUniform(keys[i], values[i]);
        }
    };
    AbstractPainter.prototype.draw = function () {
        this.bind();
        var keys = this.uniformCache.getKeys();
        var values = this.uniformCache.getValues();
        for (var i = 0, length_1 = keys.length; i < length_1; i++) {
            var v = values[i];
            if (!v.dirty)
                continue;
            this._setUniform(keys[i], v.value);
            v.dirty = false;
        }
        for (var i = 0, max = this.texturesToBind.length; i < max; i++) {
            var t = this.texturesToBind.texturesInfo[i];
            t.texture.bind(t.uniformName, i, this.program);
        }
        this.texturesToBind.length = 0;
        this.drawElements();
    };
    AbstractPainter.prototype.bind = function () {
        var _a;
        if ( true && this.program === undefined) {
            console.error(this);
            throw new debugError/* DebugError */.N("can not init painter: initProgram method must be invoked!");
        }
        if (AbstractPainter.currentInstance !== this) {
            (_a = AbstractPainter.currentInstance) === null || _a === void 0 ? void 0 : _a.unbind();
            AbstractPainter.currentInstance = this;
            this.bufferInfo.bind(this.program);
        }
    };
    AbstractPainter.prototype.unbind = function () {
        this.bufferInfo.unbind(this.program);
        AbstractPainter.currentInstance = undefined;
    };
    AbstractPainter.prototype.drawElements = function () {
        this.bufferInfo.draw();
    };
    AbstractPainter.prototype._setUniform = function (name, value) {
        this.program.setUniform(name, value);
    };
    return AbstractPainter;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/abstract/abstractBuffer.ts

var AbstractBuffer = (function () {
    function AbstractBuffer() {
        this._destroyed = false;
    }
    AbstractBuffer.prototype.checkDestroyed = function () {
        if ( true && this._destroyed)
            throw new debugError/* DebugError */.N("can not bind VertexBuffer, it is already destroyed");
    };
    AbstractBuffer.prototype.destroy = function () {
        this._destroyed = true;
    };
    AbstractBuffer.prototype.isDestroyed = function () {
        return this._destroyed;
    };
    return AbstractBuffer;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/buffer/vertexBuffer.ts



var VertexBuffer = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(VertexBuffer, _super);
    function VertexBuffer(_gl) {
        var _this = _super.call(this) || this;
        _this._gl = _gl;
        _this.dataLength = 0;
        if ( true && !_gl)
            throw new debugError/* DebugError */.N("can not create VertexBuffer, gl context not passed to the constructor, expected: new VertexBuffer(gl), found expected: new VertexBuffer(".concat(_gl, ")"));
        _this.buffer = _gl.createBuffer();
        if ( true && !_this.buffer)
            throw new debugError/* DebugError */.N("can not allocate memory for vertex buffer");
        return _this;
    }
    VertexBuffer.prototype.setData = function (desc, drawMethod) {
        if (drawMethod === void 0) { drawMethod = this._gl.STATIC_DRAW; }
        if (true) {
            if (!desc)
                throw new debugError/* DebugError */.N("can not set data to vertex buffer: wrong desc parameter: ".concat(desc));
            if (!desc.array)
                throw new debugError/* DebugError */.N('can not set data to vertex buffer: bufferData is not specified');
            if (!desc.type)
                throw new debugError/* DebugError */.N('can not set data to vertex buffer: itemType is not specified');
            if (!desc.size)
                throw new debugError/* DebugError */.N('can not set data to vertex buffer: itemSize is not specified');
        }
        var gl = this._gl;
        var lastBound = VertexBuffer.currentBuffer;
        this.bind();
        gl.bufferData(gl.ARRAY_BUFFER, desc.array, drawMethod);
        if (lastBound && !lastBound.isDestroyed())
            lastBound.bind();
        else
            this.unbind();
        this.vertexArrayInfo = desc;
        this.dataLength = desc.array.length;
        this.attrName = desc.attrName;
    };
    VertexBuffer.prototype.updateData = function (bufferData) {
        this.vertexArrayInfo.array = bufferData;
        this.setData(this.vertexArrayInfo, this._gl.DYNAMIC_DRAW);
    };
    VertexBuffer.prototype.getAttrName = function () {
        return this.attrName;
    };
    VertexBuffer.prototype.bind = function () {
        this.checkDestroyed();
        if (VertexBuffer.currentBuffer !== this) {
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this.getGlBuffer());
        }
        VertexBuffer.currentBuffer = this;
    };
    VertexBuffer.prototype.unbind = function () {
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
        VertexBuffer.currentBuffer = undefined;
    };
    VertexBuffer.prototype.destroy = function () {
        this._gl.deleteBuffer(this.buffer);
        _super.prototype.destroy.call(this);
    };
    VertexBuffer.prototype.getGlBuffer = function () {
        return this.buffer;
    };
    VertexBuffer.prototype.getItemSize = function () {
        return this.vertexArrayInfo.size;
    };
    VertexBuffer.prototype.getItemType = function () {
        return this.vertexArrayInfo.type;
    };
    VertexBuffer.prototype.getBufferLength = function () {
        return this.dataLength;
    };
    VertexBuffer.prototype.getStride = function () {
        var _a;
        return (_a = this.vertexArrayInfo.stride) !== null && _a !== void 0 ? _a : 0;
    };
    VertexBuffer.prototype.getOffset = function () {
        var _a;
        return (_a = this.vertexArrayInfo.offset) !== null && _a !== void 0 ? _a : 0;
    };
    return VertexBuffer;
}(AbstractBuffer));


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/buffer/indexBuffer.ts



var IndexBuffer = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(IndexBuffer, _super);
    function IndexBuffer(_gl) {
        var _this = _super.call(this) || this;
        _this._gl = _gl;
        if ( true && !_gl)
            throw new debugError/* DebugError */.N("can not create IndexBuffer, gl context not passed to constructor, expected: IndexBuffer(gl)");
        _this._buffer = _gl.createBuffer();
        if ( true && !_this._buffer)
            throw new debugError/* DebugError */.N("can not allocate memory for index buffer");
        return _this;
    }
    IndexBuffer.prototype.setData = function (bufferData) {
        if (true) {
            if (!bufferData)
                throw new debugError/* DebugError */.N('can not set data to buffer: bufferData not specified');
        }
        var gl = this._gl;
        this._dataLength = bufferData.length;
        var lastBound = IndexBuffer.currentBuffer;
        this.bind();
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(bufferData), gl.STATIC_DRAW);
        this.unbind();
        if (lastBound && !lastBound.isDestroyed())
            lastBound.bind();
    };
    IndexBuffer.prototype.getGlBuffer = function () {
        return this._buffer;
    };
    IndexBuffer.prototype.bind = function () {
        this.checkDestroyed();
        if (IndexBuffer.currentBuffer !== this) {
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._buffer);
            IndexBuffer.currentBuffer = this;
        }
    };
    IndexBuffer.prototype.unbind = function () {
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, null);
        IndexBuffer.currentBuffer = undefined;
    };
    IndexBuffer.prototype.destroy = function () {
        this._gl.deleteBuffer(this._buffer);
        _super.prototype.destroy.call(this);
    };
    IndexBuffer.prototype.getBufferLength = function () {
        return this._dataLength;
    };
    return IndexBuffer;
}(AbstractBuffer));


;// CONCATENATED MODULE: ./engine/renderer/webGl/debug/debugUtil.ts
var DebugUtil;
(function (DebugUtil) {
    var map;
    DebugUtil.glEnumToString = function (gl, glEnum) {
        if (!map && true) {
            map = {};
            var keymap = gl;
            for (var k in keymap) {
                if (isFinite(keymap[k]))
                    map[keymap[k]] = k;
            }
        }
        return map[glEnum];
    };
})(DebugUtil || (DebugUtil = {}));

;// CONCATENATED MODULE: ./engine/renderer/webGl/base/buffer/bufferInfo.ts




var glEnumToString = DebugUtil.glEnumToString;
var drawMethodToGlEnum = function (gl, m) {
    switch (m) {
        case 0:
            return gl.LINE_STRIP;
        case 1:
            return gl.TRIANGLE_FAN;
        case 2:
            return gl.TRIANGLE_STRIP;
        case 3:
            return gl.TRIANGLES;
        case 4:
            return gl.LINES;
        case 5:
            return gl.LINE_LOOP;
    }
    if (true) {
        throw new debugError/* DebugError */.N("unknown drawMethod enum value: ".concat(m));
    }
};
var BufferInfo = (function () {
    function BufferInfo(gl, description) {
        this.miscVertexBuffers = [];
        this.numOfElementsToDraw = 0;
        this._destroyed = false;
        this.gl = gl;
        if ( true && description.drawMethod === undefined)
            throw new debugError/* DebugError */.N("can not create BufferInfo: drawMethod is not defined");
        this.drawMethod = drawMethodToGlEnum(gl, description.drawMethod);
        if ( true && !description.posVertexInfo)
            throw new debugError/* DebugError */.N("can not create BufferInfo: posVertexInfo is mandatory");
        this.posVertexBuffer = new VertexBuffer(gl);
        this.posVertexBuffer.setData(description.posVertexInfo);
        if (description.posIndexInfo) {
            this.posIndexBuffer = new IndexBuffer(gl);
            this.posIndexBuffer.setData(description.posIndexInfo.array);
        }
        else
            this.numOfElementsToDraw = this._getNumOfElementsToDraw(this.drawMethod);
        if (description.texVertexInfo) {
            this.texVertexBuffer = new VertexBuffer(gl);
            this.texVertexBuffer.setData(description.texVertexInfo);
        }
        if (description.colorVertexInfo) {
            this.colorVertexBuffer = new VertexBuffer(gl);
            this.colorVertexBuffer.setData(description.colorVertexInfo);
        }
        if (description.normalInfo) {
            this.normalBuffer = new VertexBuffer(gl);
            this.normalBuffer.setData(description.normalInfo);
        }
        if (description.miscBuffersInfo) {
            for (var _i = 0, _a = description.miscBuffersInfo; _i < _a.length; _i++) {
                var d = _a[_i];
                var buffer = new VertexBuffer(gl);
                buffer.setData(d);
                this.miscVertexBuffers.push(buffer);
            }
        }
    }
    BufferInfo.prototype.bind = function (program) {
        program.bind();
        if (this.posIndexBuffer !== undefined)
            this.posIndexBuffer.bind();
        if (this.posVertexBuffer !== undefined)
            program.bindVertexBuffer(this.posVertexBuffer);
        if (this.texVertexBuffer !== undefined)
            program.bindVertexBuffer(this.texVertexBuffer);
        if (this.normalBuffer !== undefined)
            program.bindVertexBuffer(this.normalBuffer);
        if (this.colorVertexBuffer !== undefined)
            program.bindVertexBuffer(this.colorVertexBuffer);
        for (var _i = 0, _a = this.miscVertexBuffers; _i < _a.length; _i++) {
            var b = _a[_i];
            program.bindVertexBuffer(b);
        }
    };
    BufferInfo.prototype.unbind = function (program) {
        program.unbind();
        if (this.posIndexBuffer !== undefined)
            this.posIndexBuffer.unbind();
        if (this.posVertexBuffer !== undefined)
            program.unbindVertexBuffer(this.posVertexBuffer);
        if (this.texVertexBuffer !== undefined)
            program.unbindVertexBuffer(this.texVertexBuffer);
        if (this.normalBuffer !== undefined)
            program.unbindVertexBuffer(this.normalBuffer);
        if (this.colorVertexBuffer !== undefined)
            program.unbindVertexBuffer(this.colorVertexBuffer);
        for (var _i = 0, _a = this.miscVertexBuffers; _i < _a.length; _i++) {
            var b = _a[_i];
            program.unbindVertexBuffer(b);
        }
    };
    BufferInfo.prototype.destroy = function () {
        if (this.posVertexBuffer !== undefined)
            this.posVertexBuffer.destroy();
        if (this.posIndexBuffer !== undefined)
            this.posIndexBuffer.destroy();
        if (this.texVertexBuffer !== undefined)
            this.texVertexBuffer.destroy();
        if (this.normalBuffer !== undefined)
            this.normalBuffer.destroy();
        if (this.colorVertexBuffer !== undefined)
            this.colorVertexBuffer.destroy();
        for (var _i = 0, _a = this.miscVertexBuffers; _i < _a.length; _i++) {
            var b = _a[_i];
            b.destroy();
        }
        this._destroyed = true;
    };
    BufferInfo.prototype.isDestroyed = function () {
        return this._destroyed;
    };
    BufferInfo.prototype.draw = function () {
        if (this.posIndexBuffer !== undefined) {
            this.gl.drawElements(this.drawMethod, this.posIndexBuffer.getBufferLength(), this.gl.UNSIGNED_SHORT, 0);
        }
        else {
            this.gl.drawArrays(this.drawMethod, 0, this.numOfElementsToDraw);
        }
    };
    BufferInfo.prototype._getNumOfElementsToDraw = function (drawMethod) {
        switch (drawMethod) {
            case this.gl.LINE_STRIP:
            case this.gl.TRIANGLE_FAN:
                return this.posVertexBuffer.getBufferLength() / 2;
            case this.gl.TRIANGLE_STRIP:
                return this.posVertexBuffer.getBufferLength() / 3;
            case this.gl.TRIANGLES:
                return this.posVertexBuffer.getBufferLength() / this.posVertexBuffer.getItemSize();
            default:
                throw new debugError/* DebugError */.N("unknown draw method: ".concat(drawMethod, " (").concat(glEnumToString(this.gl, drawMethod), ")"));
        }
    };
    return BufferInfo;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/shaderGenerator/shaderGenerator.ts

var ShaderGenerator = (function () {
    function ShaderGenerator() {
        this._vertexUniforms = [];
        this._fragmentUniforms = [];
        this._attributes = [];
        this._varyings = [];
        this._appendedFragCodeBlocks = [];
        this._appendedVertexCodeBlocks = [];
        this._prependedVertexCodeBlocks = [];
        this._prependedFragCodeBlocks = [];
        this._vertexMainFn = '';
        this._fragmentMainFn = '';
    }
    ShaderGenerator.prototype.addVertexUniform = function (type, name) {
        this._vertexUniforms.push({ type: type, name: name });
        return normalizeUniformName(name);
    };
    ShaderGenerator.prototype.addScalarFragmentUniform = function (type, name, extractArrayName) {
        if (extractArrayName === void 0) { extractArrayName = false; }
        return this._addFragmentUniform(type, name, extractArrayName);
    };
    ShaderGenerator.prototype.addStructFragmentUniform = function (strucName, uniformName, extractArrayName) {
        if (extractArrayName === void 0) { extractArrayName = false; }
        return this._addFragmentUniform(strucName, uniformName, extractArrayName);
    };
    ShaderGenerator.prototype.addAttribute = function (type, name) {
        this._attributes.push({ type: type, name: name });
        return normalizeUniformName(name);
    };
    ShaderGenerator.prototype.addVarying = function (type, name) {
        this._varyings.push({ type: type, name: name });
    };
    ShaderGenerator.prototype.appendVertexCodeBlock = function (code) {
        this._appendedVertexCodeBlocks.push(code);
    };
    ShaderGenerator.prototype.appendFragmentCodeBlock = function (code) {
        this._appendedFragCodeBlocks.push(code);
    };
    ShaderGenerator.prototype.prependVertexCodeBlock = function (code) {
        this._prependedVertexCodeBlocks.push(code);
    };
    ShaderGenerator.prototype.prependFragmentCodeBlock = function (code) {
        this._prependedFragCodeBlocks.push(code);
    };
    ShaderGenerator.prototype.setVertexMainFn = function (fnCode) {
        this._vertexMainFn = fnCode;
    };
    ShaderGenerator.prototype.setFragmentMainFn = function (fnCode) {
        this._fragmentMainFn = fnCode;
    };
    ShaderGenerator.prototype.getVertexSource = function () {
        return ("\nprecision mediump float;\n\n".concat(this._prependedVertexCodeBlocks.map(function (v) { return "".concat(v); }).join('\n'), "\n\n").concat(this._vertexUniforms.map(function (u) { return "uniform   ".concat(u.type, " ").concat(u.name, ";"); }).join('\n'), "\n").concat(this._attributes.map(function (u) { return "attribute ".concat(u.type, " ").concat(u.name, ";"); }).join('\n'), "\n").concat(this._varyings.map(function (u) { return "varying   ".concat(u.type, " ").concat(u.name, ";"); }).join('\n'), "\n").concat(this._appendedVertexCodeBlocks.map(function (v) { return "".concat(v); }).join('\n'), "\n\n").concat(this._vertexMainFn));
    };
    ShaderGenerator.prototype.getFragmentSource = function () {
        return ("\nprecision mediump float;\n\n".concat(this._prependedFragCodeBlocks.map(function (v) { return "".concat(v); }).join('\n'), "\n\n").concat(this._fragmentUniforms.map(function (u) { return "uniform ".concat(u.type, " ").concat(u.name, ";"); }).join('\n'), "\n").concat(this._varyings.map(function (u) { return "varying ".concat(u.type, " ").concat(u.name, ";"); }).join('\n'), "\n").concat(this._appendedFragCodeBlocks.map(function (v) { return "".concat(v); }).join('\n'), "\n\n").concat(this._fragmentMainFn, "\n"));
    };
    ShaderGenerator.prototype.debug = function () {
        if (false)
            {}
        console.log('// *** vertex shader source ***');
        console.log(this.getVertexSource());
        console.log('// *** fragment shader source ***');
        console.log(this.getFragmentSource());
    };
    ShaderGenerator.prototype._addFragmentUniform = function (type, name, extractArrayName) {
        if (extractArrayName === void 0) { extractArrayName = false; }
        this._fragmentUniforms.push({ type: type, name: name });
        name = normalizeUniformName(name);
        if (extractArrayName)
            name = name.split('[')[0];
        return name;
    };
    return ShaderGenerator;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/painters/impl/base/simpleRect/simpleRectPainter.ts








var SimpleRectPainter = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(SimpleRectPainter, _super);
    function SimpleRectPainter(gl) {
        var _this = _super.call(this, gl) || this;
        _this.gen = new ShaderGenerator();
        var gen = _this.gen;
        _this.a_position = gen.addAttribute(GL_TYPE.FLOAT_VEC4, 'a_position');
        _this.a_texCoord = gen.addAttribute(GL_TYPE.FLOAT_VEC2, 'a_texCoord');
        _this.u_alpha = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_alpha');
        _this.u_flip = gen.addVertexUniform(GL_TYPE.BOOL, 'u_flip');
        gen.addVarying(GL_TYPE.FLOAT_VEC2, 'v_texCoord');
        gen.setVertexMainFn("\n            void main(){\n                gl_Position = vec4(\n                    -1.0 + 2.0 * a_position.x,\n                    -1.0 + 2.0 * a_position.y,\n                     0.0,  1.0\n                );\n                float y;\n                if (u_flip) y = 1.-a_texCoord.y;\n                else y = a_texCoord.y;\n                v_texCoord =  vec2(a_texCoord.x,y);\n            }\n        ");
        gen.addScalarFragmentUniform(GL_TYPE.SAMPLER_2D, 'texture');
        gen.setFragmentMainFn("\n            void main(){\n                gl_FragColor = texture2D(texture, v_texCoord)*u_alpha;\n            }\n        ");
        return _this;
    }
    SimpleRectPainter.prototype.initProgram = function () {
        if (true) {
            if (!this.gen)
                throw new debugError/* DebugError */.N("can not init simpleRectPainter instance: ShaderGenerator must be created");
        }
        this.primitive = new Plane();
        this.program = new ShaderProgram(this.gl, this.gen.getVertexSource(), this.gen.getFragmentSource());
        this.bufferInfo = new BufferInfo(this.gl, {
            posVertexInfo: { array: new Float32Array(this.primitive.vertexArr), type: this.gl.FLOAT, size: 2, attrName: 'a_position' },
            posIndexInfo: { array: this.primitive.indexArr },
            texVertexInfo: { array: new Float32Array(this.primitive.texCoordArr), type: this.gl.FLOAT, size: 2, attrName: 'a_texCoord' },
            drawMethod: 2
        });
    };
    return SimpleRectPainter;
}(AbstractPainter));


// EXTERNAL MODULE: ./engine/renderer/webGl/painters/impl/base/shape/shape.fragment.glsl
var shape_fragment = __webpack_require__(67236);
// EXTERNAL MODULE: ./engine/renderer/webGl/painters/impl/base/shape/fragment-structures.glsl
var fragment_structures = __webpack_require__(7797);
;// CONCATENATED MODULE: ./engine/renderable/impl/fill/abstract/abstractGradient.ts



var AbstractGradient = (function () {
    function AbstractGradient() {
        this._points = [];
    }
    AbstractGradient.prototype.set = function (g) {
        this._points = (0,tslib_es6/* __spreadArray */.ev)([], g._points.map(function (it) { return ((0,tslib_es6/* __assign */.pi)({}, it)); }), true);
    };
    AbstractGradient.prototype.setColorAtPosition = function (position, color) {
        if ( true && this._points.length > AbstractGradient.MAX_NUM_OF_GRADIENT_POINTS) {
            throw new debugError/* DebugError */.N("Maxinum number of gradient points is ".concat(AbstractGradient.MAX_NUM_OF_GRADIENT_POINTS, ",\n                to use more points change AbstractGradient.MAX_NUM_OF_GRADIENT_POINTS before Game instance creation"));
        }
        this._points.push({ color: Color.from(color), value: position });
    };
    AbstractGradient.prototype.setUniforms = function (sd) {
        for (var i = 0; i < AbstractGradient.MAX_NUM_OF_GRADIENT_POINTS; i++) {
            var possibleColorPoint = this._points[i];
            sd.setUniform("u_fillGradientPoints[".concat(i, "].pointActive"), possibleColorPoint !== undefined);
            sd.setUniform("u_fillGradientPoints[".concat(i, "].value"), possibleColorPoint ? possibleColorPoint.value : 0);
            sd.setUniform("u_fillGradientPoints[".concat(i, "].r"), possibleColorPoint ? possibleColorPoint.color.r / 255 : 0);
            sd.setUniform("u_fillGradientPoints[".concat(i, "].g"), possibleColorPoint ? possibleColorPoint.color.g / 255 : 0);
            sd.setUniform("u_fillGradientPoints[".concat(i, "].b"), possibleColorPoint ? possibleColorPoint.color.b / 255 : 0);
            sd.setUniform("u_fillGradientPoints[".concat(i, "].a"), possibleColorPoint ? possibleColorPoint.color.a / 255 : 0);
        }
    };
    AbstractGradient.MAX_NUM_OF_GRADIENT_POINTS = 4;
    return AbstractGradient;
}());

;// CONCATENATED MODULE: ./engine/renderer/webGl/painters/misc.ts

var misc_Mat16Holder = Mat4.Mat16Holder;
var zToWMatrix = misc_Mat16Holder.create();
Mat4.makeZToWMatrix(zToWMatrix, 1);
var Z_To_W_MATRIX_SOURCE = zToWMatrix.mat16.join(',');

;// CONCATENATED MODULE: ./engine/renderer/webGl/painters/impl/base/shape/shapePainter.ts












var ShapePainter = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(ShapePainter, _super);
    function ShapePainter(gl) {
        var _this = _super.call(this, gl) || this;
        var gen = new ShaderGenerator();
        gen.prependVertexCodeBlock("\n            #define zToW_matrix mat4(".concat(Z_To_W_MATRIX_SOURCE, ")\n        "));
        gen.setVertexMainFn("\n            void main(){\n                v_position = a_position;\n                gl_Position = zToW_matrix * u_projectionMatrix * u_vertexMatrix * a_position;\n            }\n        ");
        _this.u_vertexMatrix = gen.addVertexUniform(GL_TYPE.FLOAT_MAT4, 'u_vertexMatrix');
        _this.u_projectionMatrix = gen.addVertexUniform(GL_TYPE.FLOAT_MAT4, 'u_projectionMatrix');
        _this.a_position = gen.addAttribute(GL_TYPE.FLOAT_VEC4, 'a_position');
        gen.addVarying(GL_TYPE.FLOAT_VEC4, 'v_position');
        gen.prependFragmentCodeBlock((0,object/* parametrizeString */.qI)(fragment_structures, {
            __STRETCH_MODE_STRETCH__: 0,
            __STRETCH_MODE_REPEAT__: 1,
            __FILL_TYPE_COLOR__: 0,
            __FILL_TYPE_TEXTURE__: 1,
            __FILL_TYPE_LINEAR_GRADIENT__: 2,
            __FILL_TYPE_RADIAL_GRADIENT__: 3,
            __SHAPE_TYPE_ELLIPSE__: 0,
            __SHAPE_TYPE_RECT__: 1,
            __PI__: Math.PI,
            __MAX_NUM_OF_GRADIENT_POINTS__: AbstractGradient.MAX_NUM_OF_GRADIENT_POINTS,
        }));
        _this.u_lineWidth = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_lineWidth');
        _this.u_rx = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_rx');
        _this.u_ry = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_ry');
        _this.u_width = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_width');
        _this.u_height = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_height');
        _this.u_rectOffsetTop = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_rectOffsetTop');
        _this.u_rectOffsetLeft = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_rectOffsetLeft');
        _this.u_borderRadius = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_borderRadius');
        _this.u_color = gen.addScalarFragmentUniform(GL_TYPE.FLOAT_VEC4, 'u_color');
        _this.u_alpha = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_alpha');
        _this.u_fillColor = gen.addScalarFragmentUniform(GL_TYPE.FLOAT_VEC4, 'u_fillColor');
        gen.addStructFragmentUniform("GradientPoint", "u_fillGradientPoints[MAX_NUM_OF_GRADIENT_POINTS]");
        _this.u_fillGradientPoints = 'u_fillGradientPoints';
        _this.u_fillGradientAngle = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_fillGradientAngle');
        _this.u_radialGradientCenterX = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_radialGradientCenterX');
        _this.u_radialGradientCenterY = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_radialGradientCenterY');
        _this.u_texRect = gen.addScalarFragmentUniform(GL_TYPE.FLOAT_VEC4, 'u_texRect');
        _this.u_texOffset = gen.addScalarFragmentUniform(GL_TYPE.FLOAT_VEC2, 'u_texOffset');
        gen.addScalarFragmentUniform(GL_TYPE.SAMPLER_2D, 'texture');
        _this.u_shapeType = gen.addScalarFragmentUniform(GL_TYPE.INT, 'u_shapeType');
        _this.u_fillType = gen.addScalarFragmentUniform(GL_TYPE.INT, 'u_fillType');
        _this.u_arcAngleFrom = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_arcAngleFrom');
        _this.u_arcAngleTo = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_arcAngleTo');
        _this.u_repeatFactor = gen.addScalarFragmentUniform(GL_TYPE.FLOAT_VEC2, 'u_repeatFactor');
        _this.u_stretchMode = gen.addScalarFragmentUniform(GL_TYPE.INT, 'u_stretchMode');
        _this.u_anticlockwise = gen.addScalarFragmentUniform(GL_TYPE.BOOL, 'u_anticlockwise');
        gen.setFragmentMainFn(shape_fragment);
        _this.program = new ShaderProgram(gl, gen.getVertexSource(), gen.getFragmentSource());
        _this.primitive = new Plane();
        _this.bufferInfo = new BufferInfo(gl, {
            posVertexInfo: { array: new Float32Array(_this.primitive.vertexArr), type: gl.FLOAT, size: 2, attrName: _this.a_position },
            posIndexInfo: { array: _this.primitive.indexArr },
            drawMethod: 2,
        });
        return _this;
    }
    return ShapePainter;
}(AbstractPainter));


;// CONCATENATED MODULE: ./engine/renderer/abstract/scaleStrategy/impl/ScaleStrategyNone.ts
var ScaleStrategyNone = (function () {
    function ScaleStrategyNone() {
    }
    ScaleStrategyNone.prototype.onResize = function (container, game, renderer) {
    };
    return ScaleStrategyNone;
}());


;// CONCATENATED MODULE: ./engine/misc/device.ts
var Device = (function () {
    function Device() {
    }
    Device.getScreenResolution = function () {
        return [globalThis.innerWidth, globalThis.innerHeight];
    };
    Device.logInfo = function () {
        console.log({
            isTouch: Device.isTouch,
            isFrame: Device.isFrame,
            isIPhone: Device.isIPhone,
            isAndroid: Device.isAndroid,
            buildAt: 1690668626332,
            embeddedEngine: Device.embeddedEngine,
            screenResolution: "".concat(this.getScreenResolution()[0], "x").concat(this.getScreenResolution()[1]),
        });
    };
    var _a;
    _a = Device;
    Device.isTouch = ('ontouchstart' in window);
    Device.isFrame = window.top !== window.self;
    Device.isIPhone = navigator.platform.toLowerCase().indexOf('iphone') > -1;
    Device.isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;
    Device.isMobile = _a.isIPhone || _a.isAndroid;
    Device.embeddedEngine = navigator.userAgent === 'vEngine';
    return Device;
}());

;// CONCATENATED MODULE: ./engine/renderer/abstract/scaleStrategy/impl/ScaleStrategyStretchCanvasToScreen.ts

var ScaleStrategyStretchCanvasToScreen = (function () {
    function ScaleStrategyStretchCanvasToScreen() {
    }
    ScaleStrategyStretchCanvasToScreen.prototype.onResize = function (container, game, renderer) {
        var _a = Device.getScreenResolution(), innerWidth = _a[0], innerHeight = _a[1];
        container.style.width = "".concat(innerWidth, "px");
        container.style.height = "".concat(innerHeight, "px");
        renderer.viewPortSize.setWH(innerWidth, innerHeight);
        game.scale.setXY(innerWidth / game.size.width, innerHeight / game.size.height);
        game.pos.setXY(0);
    };
    return ScaleStrategyStretchCanvasToScreen;
}());


;// CONCATENATED MODULE: ./engine/renderer/abstract/scaleStrategy/impl/ScaleStrategyFitCanvasToScreen.ts

var ScaleHelper = (function () {
    function ScaleHelper() {
    }
    ScaleHelper.calcMetrixToFitRectToWindow = function (rect, window) {
        var rectRatio = rect.height / rect.width;
        var windowRatio = window.height / window.width;
        var width;
        var height;
        if (windowRatio < rectRatio) {
            height = window.height;
            width = height / rectRatio;
        }
        else {
            width = window.width;
            height = width * rectRatio;
        }
        return {
            scale: {
                x: width / rect.width,
                y: height / rect.height,
            },
            pos: {
                x: (window.width - width) / 2,
                y: (window.height - height) / 2,
            },
            size: { width: width, height: height },
        };
    };
    return ScaleHelper;
}());

var ScaleStrategyFitCanvasToScreen = (function () {
    function ScaleStrategyFitCanvasToScreen() {
    }
    ScaleStrategyFitCanvasToScreen.prototype.onResize = function (container, game, renderer) {
        var _a = Device.getScreenResolution(), innerWidth = _a[0], innerHeight = _a[1];
        var metrics = ScaleHelper.calcMetrixToFitRectToWindow(game.size, { width: innerWidth, height: innerHeight });
        game.scale.setFrom(metrics.scale);
        game.pos.setFrom(metrics.pos);
        container.style.width = metrics.size.width + 'px';
        container.style.height = metrics.size.height + 'px';
        container.style.marginTop = "".concat(game.pos.y, "px");
        renderer.viewPortSize.setFrom(metrics.size);
    };
    return ScaleStrategyFitCanvasToScreen;
}());


;// CONCATENATED MODULE: ./engine/renderer/abstract/scaleStrategy/factory/ScaleStrategyFactory.ts



var ScaleStrategyFactory = (function () {
    function ScaleStrategyFactory() {
    }
    ScaleStrategyFactory.getScaleStrategy = function (scaleStrategy) {
        if (scaleStrategy === 0) {
            return new ScaleStrategyNone();
        }
        if (scaleStrategy === 2) {
            return new ScaleStrategyStretchCanvasToScreen();
        }
        if (scaleStrategy === 1) {
            return new ScaleStrategyFitCanvasToScreen();
        }
        else
            return undefined;
    };
    return ScaleStrategyFactory;
}());


;// CONCATENATED MODULE: ./engine/renderer/abstract/abstractRenderer.ts




var AbstractRenderer = (function () {
    function AbstractRenderer(game) {
        this.game = game;
        this.clearBeforeRender = true;
        this.clearColor = Color.RGB(0, 0, 0);
        this.viewPortSize = new geometry_size/* Size */.$(this.game.width, this.game.height);
        this._matrixStack = new MatrixStack();
        this._fullScreenRequested = false;
        this._destroyed = false;
        this._scaleStrategy = ScaleStrategyFactory.getScaleStrategy(this.game.scaleStrategy);
        this.game = game;
    }
    AbstractRenderer.prototype.requestFullScreen = function () {
        var _this = this;
        var canRequest = this._requestFullScreen();
        if (canRequest) {
            var fn_1 = function () {
                if (_this._fullScreenRequested)
                    _this._requestFullScreen();
                document.body.removeEventListener('click', fn_1);
            };
            document.body.addEventListener('click', fn_1);
        }
    };
    AbstractRenderer.prototype.cancelFullScreen = function () {
        this._fullScreenRequested = false;
        var doc = globalThis.document;
        if (doc.cancelFullScreen !== undefined) {
            (doc).cancelFullScreen();
        }
        else if (doc.mozCancelFullScreen !== undefined) {
            doc.mozCancelFullScreen();
        }
        else if (doc.webkitCancelFullScreen !== undefined) {
            doc.webkitCancelFullScreen();
        }
    };
    AbstractRenderer.prototype.beforeItemStackDraw = function (filters, alpha, forceDrawChildrenOnNewSurface) {
        return undefined;
    };
    AbstractRenderer.prototype.afterItemStackDraw = function (stackPointer) { };
    AbstractRenderer.prototype.beforeFrameDraw = function () {
    };
    AbstractRenderer.prototype.afterFrameDraw = function () { };
    AbstractRenderer.prototype.destroy = function () {
        globalThis.removeEventListener('resize', this.onResize);
        this._destroyed = true;
    };
    AbstractRenderer.prototype.isDestroyed = function () {
        return this._destroyed;
    };
    AbstractRenderer.prototype.transformSave = function () {
        this._matrixStack.save();
    };
    AbstractRenderer.prototype.transformScale = function (x, y, z) {
        if (z === void 0) { z = 1; }
        if (x === 1 && y === 1 && z === 1)
            return;
        this._matrixStack.scale(x, y, z);
    };
    AbstractRenderer.prototype.transformReset = function () {
        this._matrixStack.resetTransform();
    };
    AbstractRenderer.prototype.transformRotateX = function (angleInRadians) {
        if (angleInRadians === 0)
            return;
        this._matrixStack.rotateX(angleInRadians);
    };
    AbstractRenderer.prototype.transformRotateY = function (angleInRadians) {
        if (angleInRadians === 0)
            return;
        this._matrixStack.rotateY(angleInRadians);
    };
    AbstractRenderer.prototype.transformRotateZ = function (angleInRadians) {
        if (angleInRadians === 0)
            return;
        this._matrixStack.rotateZ(angleInRadians);
    };
    AbstractRenderer.prototype.transformTranslate = function (x, y, z) {
        if (x === 0 && y === 0 && z === 0)
            return;
        this._matrixStack.translate(x, y, z);
    };
    AbstractRenderer.prototype.transformRotationReset = function () {
        this._matrixStack.rotationReset();
    };
    AbstractRenderer.prototype.transformSkewX = function (angle) {
        if (angle === 0)
            return;
        this._matrixStack.skewX(angle);
    };
    AbstractRenderer.prototype.transformSkewY = function (angle) {
        if (angle === 0)
            return;
        this._matrixStack.skewY(angle);
    };
    AbstractRenderer.prototype.transformRestore = function () {
        this._matrixStack.restore();
    };
    AbstractRenderer.prototype.transformSet = function (val) {
        this._matrixStack.setMatrix(val);
    };
    AbstractRenderer.prototype.transformGet = function () {
        return this._matrixStack.getCurrentValue();
    };
    AbstractRenderer.prototype.killObject = function (r) { };
    AbstractRenderer.prototype.getHelper = function () {
        return this.rendererHelper;
    };
    AbstractRenderer.prototype.registerResize = function () {
        var _this = this;
        this.onResize();
        globalThis.addEventListener('resize', function () {
            _this.onResize();
            setTimeout(function () { return _this.onResize(); }, 1000);
        });
        document.addEventListener('gesturestart', function (e) { return e.preventDefault(); });
        this.container.addEventListener('gesturestart', function (e) { return e.preventDefault(); });
    };
    AbstractRenderer.prototype.onResize = function () {
        var container = this.container;
        this._scaleStrategy.onResize(container, this.game, this);
        window.scrollTo(0, 1);
    };
    AbstractRenderer.prototype._requestFullScreen = function () {
        var element = this.container;
        this._fullScreenRequested = true;
        var canRequest = false;
        if (element.requestFullScreen) {
            element.requestFullScreen();
            canRequest = true;
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
            canRequest = true;
        }
        else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
            canRequest = true;
        }
        return canRequest;
    };
    return AbstractRenderer;
}());


;// CONCATENATED MODULE: ./engine/renderer/abstract/abstractCanvasRenderer.ts


var AbstractCanvasRenderer = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(AbstractCanvasRenderer, _super);
    function AbstractCanvasRenderer(game) {
        var _this = _super.call(this, game) || this;
        var canvasElement = document.createElement('canvas');
        if (game.rootContainerElement !== undefined) {
            game.rootContainerElement.appendChild(canvasElement);
        }
        else {
            document.body.appendChild(canvasElement);
        }
        canvasElement.setAttribute('width', game.size.width.toString());
        canvasElement.setAttribute('height', game.size.height.toString());
        canvasElement.ondragstart = function (e) {
            e.preventDefault();
        };
        _this.container = canvasElement;
        return _this;
    }
    AbstractCanvasRenderer.prototype.setPixelPerfect = function (mode) {
        this.container.style.imageRendering = mode ? 'pixelated' : '';
    };
    return AbstractCanvasRenderer;
}(AbstractRenderer));


// EXTERNAL MODULE: ./engine/renderer/webGl/painters/impl/base/mesh/mesh.fragment.glsl
var mesh_fragment = __webpack_require__(90414);
// EXTERNAL MODULE: ./engine/renderer/webGl/painters/impl/base/mesh/mesh.vertex.glsl
var mesh_vertex = __webpack_require__(18885);
;// CONCATENATED MODULE: ./engine/renderer/webGl/painters/impl/base/mesh/meshPainter.ts









var MeshPainter = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(MeshPainter, _super);
    function MeshPainter(gl) {
        var _this = _super.call(this, gl) || this;
        _this.a_position = 'a_position';
        _this.a_normal = 'a_normal';
        _this.a_texCoord = 'a_texCoord';
        _this.a_vertexColor = 'a_vertexColor';
        _this.u_modelMatrix = 'u_modelMatrix';
        _this.u_inverseTransposeModelMatrix = 'u_inverseTransposeModelMatrix';
        _this.u_projectionMatrix = 'u_projectionMatrix';
        _this.u_color = 'u_color';
        _this.u_color_mix = 'u_color_mix';
        _this.u_alpha = 'u_alpha';
        _this.u_reflectivity = 'u_reflectivity';
        _this.u_specular = 'u_specular';
        _this.u_textureUsed = 'u_textureUsed';
        _this.u_vertexColorUsed = 'u_vertexColorUsed';
        _this.u_normalsTextureUsed = 'u_normalsTextureUsed';
        _this.u_specularTextureUsed = 'u_specularTextureUsed';
        _this.u_lightUsed = 'u_lightUsed';
        _this.u_cubeMapTextureUsed = 'u_cubeMapTextureUsed';
        _this.program = new ShaderProgram(gl, (0,object/* parametrizeString */.qI)(mesh_vertex, {
            __Z_To_W_MATRIX_SOURCE__: Z_To_W_MATRIX_SOURCE
        }), mesh_fragment);
        return _this;
    }
    MeshPainter.prototype.bindMesh3d = function (mesh) {
        if (mesh.isLightAccepted() === undefined) {
            mesh.acceptLight(!!mesh.getBufferInfo().normalBuffer);
        }
        this.bindMesh2d(mesh);
    };
    MeshPainter.prototype.bindMesh2d = function (mesh) {
        this.mesh = mesh;
        this.bufferInfo = this.mesh.getBufferInfo();
    };
    MeshPainter.prototype.setModelMatrix = function (m) {
        this.setUniformVector(this.u_modelMatrix, m);
    };
    MeshPainter.prototype.setInverseTransposeModelMatrix = function (m) {
        this.setUniformVector(this.u_inverseTransposeModelMatrix, m);
    };
    MeshPainter.prototype.setProjectionMatrix = function (m) {
        this.setUniformVector(this.u_projectionMatrix, m);
    };
    MeshPainter.prototype.setAlpha = function (a) {
        this.setUniformScalar(this.u_alpha, a);
    };
    MeshPainter.prototype.setSpecular = function (s) {
        this.setUniformScalar(this.u_specular, s);
    };
    MeshPainter.prototype.setReflectivity = function (r) {
        this.setUniformScalar(this.u_reflectivity, r);
    };
    MeshPainter.prototype.setTextureUsed = function (used) {
        this.setUniformScalar(this.u_textureUsed, used);
    };
    MeshPainter.prototype.setNormalsTextureUsed = function (used) {
        this.setUniformScalar(this.u_normalsTextureUsed, used);
    };
    MeshPainter.prototype.setSpecularTextureUsed = function (used) {
        this.setUniformScalar(this.u_specularTextureUsed, used);
    };
    MeshPainter.prototype.setVertexColorUsed = function (used) {
        this.setUniformScalar(this.u_vertexColorUsed, used);
    };
    MeshPainter.prototype.setCubeMapTextureUsed = function (used) {
        this.setUniformScalar(this.u_cubeMapTextureUsed, used);
    };
    MeshPainter.prototype.setLightUsed = function (used) {
        this.setUniformScalar(this.u_lightUsed, used);
    };
    MeshPainter.prototype.setColor = function (c) {
        this.setUniformVector(this.u_color, c.asGL());
    };
    MeshPainter.prototype.setColorMix = function (val) {
        this.setUniformScalar(this.u_color_mix, val);
    };
    MeshPainter.prototype.bind = function () {
        if ( true && this.mesh === undefined)
            throw new debugError/* DebugError */.N("can not bind modelPainter; bindModel must be invoked firstly");
        _super.prototype.bind.call(this);
        this.bufferInfo.bind(this.program);
        if (!this.mesh._modelPrimitive.texCoordArr) {
            this.program.disableAttribute(this.a_texCoord);
        }
        else {
            this.program.enableAttribute(this.a_texCoord);
        }
        if (!this.mesh._modelPrimitive.normalArr) {
            this.program.disableAttribute(this.a_normal);
        }
        else {
            this.program.enableAttribute(this.a_normal);
        }
        if (!this.mesh._modelPrimitive.vertexColorArr) {
            this.program.disableAttribute(this.a_vertexColor);
        }
        else {
            this.program.enableAttribute(this.a_vertexColor);
        }
    };
    MeshPainter.prototype.disableAllAttributes = function () {
        this.program.disableAttribute(this.a_texCoord);
        this.program.disableAttribute(this.a_normal);
        this.program.disableAttribute(this.a_vertexColor);
    };
    MeshPainter.prototype.initBufferInfo = function (mesh2d) {
        var _a;
        var bufferInfoDesc = {
            posVertexInfo: {
                array: new Float32Array(mesh2d._modelPrimitive.vertexArr), type: this.gl.FLOAT,
                size: mesh2d._modelPrimitive.vertexItemSize, attrName: this.a_position
            },
            drawMethod: (_a = mesh2d._modelPrimitive.drawMethod) !== null && _a !== void 0 ? _a : 3
        };
        if (mesh2d._modelPrimitive.indexArr) {
            bufferInfoDesc.posIndexInfo = {
                array: mesh2d._modelPrimitive.indexArr
            };
        }
        if (mesh2d._modelPrimitive.normalArr) {
            bufferInfoDesc.normalInfo = {
                array: new Float32Array(mesh2d._modelPrimitive.normalArr),
                type: this.gl.FLOAT,
                size: 3,
                attrName: this.a_normal
            };
        }
        if (mesh2d._modelPrimitive.texCoordArr) {
            bufferInfoDesc.texVertexInfo = {
                array: new Float32Array(mesh2d._modelPrimitive.texCoordArr),
                type: this.gl.FLOAT,
                size: 2,
                attrName: this.a_texCoord
            };
        }
        if (mesh2d._modelPrimitive.vertexColorArr) {
            bufferInfoDesc.colorVertexInfo = {
                array: new Float32Array(mesh2d._modelPrimitive.vertexColorArr),
                type: this.gl.FLOAT,
                size: 4,
                attrName: this.a_vertexColor
            };
        }
        return new BufferInfo(this.gl, bufferInfoDesc);
    };
    return MeshPainter;
}(AbstractPainter));


;// CONCATENATED MODULE: ./engine/renderer/webGl/blender/blender.ts

var Blender = (function () {
    function Blender(_gl) {
        this._gl = _gl;
    }
    Blender.getSingleton = function (gl) {
        if (Blender.instance === undefined)
            Blender.instance = new Blender(gl);
        return Blender.instance;
    };
    Blender.prototype.enable = function () {
        if (this._enabled)
            return;
        this._enabled = true;
        this._gl.enable(this._gl.BLEND);
    };
    Blender.prototype.disable = function () {
        if (this._enabled === false)
            return;
        this._enabled = false;
        this._gl.disable(this._gl.BLEND);
    };
    Blender.prototype.setBlendMode = function (blendMode) {
        if (blendMode === this._lastMode)
            return;
        this._lastMode = blendMode;
        var gl = this._gl;
        switch (blendMode) {
            case 0:
                gl.blendEquation(gl.FUNC_ADD);
                gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                break;
            case 1:
                gl.blendEquation(gl.FUNC_ADD);
                gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                break;
            case 2:
                gl.blendEquation(gl.FUNC_ADD);
                gl.blendFunc(gl.ONE, gl.ONE);
                break;
            case 3:
                gl.blendEquation(gl.FUNC_SUBTRACT);
                gl.blendFunc(gl.ONE, gl.ONE);
                break;
            case 4:
                gl.blendEquation(gl.FUNC_REVERSE_SUBTRACT);
                gl.blendFunc(gl.ONE, gl.ONE);
                break;
            case 5:
                gl.blendEquation(gl.FUNC_ADD);
                gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_COLOR);
                break;
            default:
                if (true) {
                    throw new debugError/* DebugError */.N("unknown blend mode: ".concat(blendMode));
                }
                break;
        }
    };
    return Blender;
}());


;// CONCATENATED MODULE: ./engine/renderer/abstract/rendererHelper.ts



var rendererHelper_IDENTITY_HOLDER = Mat4.IDENTITY_HOLDER;
var RendererHelper = (function () {
    function RendererHelper(game) {
        this.game = game;
        this.renderTargetStack = new Stack();
    }
    RendererHelper.prototype.saveRenderTarget = function () {
        var renderer = this.game.getRenderer();
        this.renderTargetStack.push(renderer.getRenderTarget());
    };
    RendererHelper.prototype.restoreRenderTarget = function () {
        var renderer = this.game.getRenderer();
        renderer.setRenderTarget(this.renderTargetStack.pop());
    };
    RendererHelper.prototype.renderSceneToTexture = function (scene, renderTarget) {
        var renderer = this.game.getRenderer();
        this.saveRenderTarget();
        renderer.setRenderTarget(renderTarget);
        scene.render();
        this.restoreRenderTarget();
    };
    RendererHelper.prototype.renderModelToTexture = function (m, renderTarget, clear) {
        if (clear === void 0) { clear = false; }
        var renderer = this.game.getRenderer();
        if (m.size.isZero())
            m.revalidate();
        var currRenderTarget = renderer.getRenderTarget();
        var needSave = currRenderTarget !== renderTarget;
        if (needSave)
            this.saveRenderTarget();
        renderer.setRenderTarget(renderTarget);
        renderer.transformSave();
        renderer.transformSet(rendererHelper_IDENTITY_HOLDER);
        if (clear)
            renderTarget.clear(Color.NONE, true, 0);
        m.render();
        if (needSave)
            this.restoreRenderTarget();
        renderer.transformRestore();
    };
    return RendererHelper;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/abstract/abstractTexture.ts


var isPowerOf2 = function (value) {
    if (!Number.isInteger(value))
        return false;
    return (value & (value - 1)) === 0;
};
var AbstractTexture = (function () {
    function AbstractTexture(gl) {
        this.gl = gl;
        this.size = new geometry_size/* Size */.$(0, 0);
        this._destroyed = false;
        if (true) {
            if (!gl)
                throw new debugError/* DebugError */.N("can not create Texture, gl context not passed to constructor, expected: Texture(gl)");
            if (!AbstractTexture._MAX_TEXTURE_IMAGE_UNITS) {
                AbstractTexture._MAX_TEXTURE_IMAGE_UNITS = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
                if ( true && !AbstractTexture._MAX_TEXTURE_IMAGE_UNITS) {
                    throw new debugError/* DebugError */.N("Can not obtain MAX_TEXTURE_IMAGE_UNITS value");
                }
            }
        }
        this.tex = gl.createTexture();
        if ( true && !this.tex)
            throw new debugError/* DebugError */.N("can not allocate memory for texture");
    }
    AbstractTexture.destroyAll = function () {
        for (var i = 0; i < AbstractTexture._instances.length; i++) {
            AbstractTexture._instances[i].destroy();
        }
        AbstractTexture.currentBindTextureAt = {};
    };
    AbstractTexture.prototype.bind = function (name, i, program) {
        if (true) {
            if (!name) {
                console.error(this);
                throw new debugError/* DebugError */.N("can not bind texture: uniform name was not provided");
            }
            if (i > AbstractTexture._MAX_TEXTURE_IMAGE_UNITS - 1) {
                console.error(this);
                throw new debugError/* DebugError */.N("can not bind texture with index ".concat(i, ". Max supported value by device is ").concat(AbstractTexture._MAX_TEXTURE_IMAGE_UNITS));
            }
            if (this._destroyed) {
                console.error(this);
                throw new debugError/* DebugError */.N("can not bind destroyed texture");
            }
        }
        if (AbstractTexture.currentBindTextureAt[i] === this)
            return;
        program.setUniform(name, i);
        var gl = this.gl;
        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindTexture(this.samplerType, this.tex);
        AbstractTexture.currentBindTextureAt[i] = this;
    };
    AbstractTexture.prototype.unbind = function (i) {
        if (i === void 0) { i = 0; }
        var gl = this.gl;
        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindTexture(gl.TEXTURE_2D, null);
        delete AbstractTexture.currentBindTextureAt[i];
    };
    AbstractTexture.prototype.destroy = function () {
        this.gl.deleteTexture(this.tex);
        AbstractTexture._instances.splice(AbstractTexture._instances.indexOf(this), 1);
        this._destroyed = true;
    };
    AbstractTexture.prototype.isDestroyed = function () {
        return this._destroyed;
    };
    AbstractTexture.prototype.getGlTexture = function () {
        return this.tex;
    };
    AbstractTexture.prototype.setInterpolationMode = function (mode) {
        if (mode === this._interpolationMode)
            return;
        this.beforeOperation();
        var gl = this.gl;
        var glMode;
        switch (mode) {
            case 1:
                glMode = gl.LINEAR;
                break;
            case 0:
                glMode = gl.NEAREST;
                break;
            default:
                if (true)
                    throw new debugError/* DebugError */.N("unknown interpolation mode ".concat(mode));
                break;
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, glMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, glMode);
        this._interpolationMode = mode;
        this.afterOperation();
    };
    AbstractTexture.prototype.beforeOperation = function () {
        this._currentTextureAt0 = AbstractTexture.currentBindTextureAt[0];
        this.gl.bindTexture(this.samplerType, this.tex);
    };
    AbstractTexture.prototype.afterOperation = function () {
        var texAt0 = this._currentTextureAt0;
        if (texAt0 !== undefined) {
            this.gl.bindTexture(texAt0.samplerType, texAt0.tex);
        }
        else
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        this._currentTextureAt0 = undefined;
    };
    AbstractTexture.prototype.setFilters = function () {
        var gl = this.gl;
        var isPowerOfTwo = this.size.width > 1 && this.size.height > 1 &&
            isPowerOf2(this.size.width) && isPowerOf2(this.size.height);
        if (isPowerOfTwo) {
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        }
        else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
    };
    AbstractTexture.currentBindTextureAt = {};
    AbstractTexture._MAX_TEXTURE_IMAGE_UNITS = 0;
    AbstractTexture._instances = [];
    return AbstractTexture;
}());

;// CONCATENATED MODULE: ./engine/renderer/webGl/base/texture/texture.ts




var Texture = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(Texture, _super);
    function Texture(gl) {
        var _this = _super.call(this, gl) || this;
        _this.type = 'Texture';
        _this.__kind__ = 'Texture';
        _this.samplerType = _this.gl.TEXTURE_2D;
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        _this.setRawData(new Uint8Array([0, 0, 0, 255]), 1, 1);
        return _this;
    }
    Texture.prototype.setImage = function (img, size) {
        if (size === void 0) { size = new geometry_size/* Size */.$(0, 0); }
        var gl = this.gl;
        if (true) {
            if (!(img || size.width || size.height))
                throw new debugError/* DebugError */.N("texture.setImage: if image is undefined, width and height must be specified: tex.setImage(undefined,w,h)");
            if (img !== undefined) {
                if (!img.width || !img.height) {
                    console.error(img);
                    throw new debugError/* DebugError */.N("width and height of texture source must be defined, but ".concat(img.width, "*").concat(img.height, " is provided"));
                }
            }
            var maxSupportedSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            if ( true && !maxSupportedSize)
                throw new debugError/* DebugError */.N("Can not obtain MAX_TEXTURE_SIZE value");
            if (size.width > maxSupportedSize || size.height > maxSupportedSize) {
                throw new debugError/* DebugError */.N("can not create texture with size ".concat(size.width, "x").concat(size.height, ", max supported size is ").concat(maxSupportedSize));
            }
        }
        if (img !== undefined)
            this.size.setWH(img.width, img.height);
        else
            this.size.setFrom(size);
        this.beforeOperation();
        if (img !== undefined) {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        }
        else {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size.width, size.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        }
        this.setFilters();
        this.setInterpolationMode(1);
        this.afterOperation();
    };
    Texture.prototype.toDataArray = function () {
        var gl = this.gl;
        var wxh = this.size.width * this.size.height;
        var fb = gl.createFramebuffer();
        this.beforeOperation();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.tex, 0);
        if ( true && gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE)
            throw new debugError/* DebugError */.N("wrong framebuffer state!");
        var pixels = new Uint8Array(wxh * 4);
        gl.readPixels(0, 0, this.size.width, this.size.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        this.afterOperation();
        return pixels;
    };
    Texture.prototype.toDataUrl = function () {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = this.size.width;
        canvas.height = this.size.height;
        var imgData = ctx.createImageData(this.size.width, this.size.height);
        imgData.data.set(this.toDataArray());
        ctx.putImageData(imgData, 0, 0);
        return canvas.toDataURL();
    };
    Texture.prototype.setRawData = function (data, width, height, mode) {
        if (mode === void 0) { mode = 1; }
        if (true) {
            var numOfBytes = width * height * 4;
            if (data.length !== numOfBytes) {
                throw new debugError/* DebugError */.N("unexpected Uint8Array length, expected width*height*4 (".concat(width, "*").concat(height, "*4=").concat(numOfBytes, "), but is found ").concat(data.length));
            }
        }
        var gl = this.gl;
        this.size.setWH(width, height);
        this.beforeOperation();
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        this.setFilters();
        this.setInterpolationMode(mode);
        this.afterOperation();
    };
    return Texture;
}(AbstractTexture));


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/texture/frameBufferTexture.ts


var FrameBufferTexture = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(FrameBufferTexture, _super);
    function FrameBufferTexture() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'FrameBufferTexture';
        return _this;
    }
    return FrameBufferTexture;
}(Texture));


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/buffer/frameBuffer.ts



var FrameBuffer = (function () {
    function FrameBuffer(_gl, size) {
        this._gl = _gl;
        this._destroyed = false;
        if ( true && !_gl)
            throw new debugError/* DebugError */.N("can not create FrameBuffer, gl context not passed to constructor, expected: FrameBuffer(gl)");
        this._width = size.width;
        this._height = size.height;
        this.texture = new FrameBufferTexture(_gl);
        this.texture.setImage(undefined, size);
        this._init(_gl, size);
        var lastBound = FrameBuffer.currentBuffer;
        this.bind();
        this.clear(Color.RGB(0, 0, 0), true, 0);
        this.unbind();
        if (lastBound && !lastBound.isDestroyed())
            lastBound.bind();
    }
    FrameBuffer.getCurrent = function () {
        return this.currentBuffer;
    };
    FrameBuffer.prototype.setInterpolationMode = function (mode) {
        this.texture.setInterpolationMode(mode);
    };
    FrameBuffer.prototype.bind = function () {
        if (true) {
            if (this._destroyed) {
                console.error(this);
                throw new debugError/* DebugError */.N("can not bind destroyed frame buffer");
            }
        }
        if (FrameBuffer.currentBuffer === this)
            return;
        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this.glFrameBuffer);
        this._gl.viewport(0, 0, ~~this._width, ~~this._height);
        FrameBuffer.currentBuffer = this;
    };
    FrameBuffer.prototype.unbind = function () {
        this._checkBound();
        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);
        FrameBuffer.currentBuffer = undefined;
    };
    FrameBuffer.prototype.clear = function (color, withDepth, alphaBlendValue) {
        if (withDepth === void 0) { withDepth = false; }
        if (alphaBlendValue === void 0) { alphaBlendValue = 1; }
        this._checkBound();
        var arr = color.asGL();
        this._gl.clearColor(arr[0], arr[1], arr[2], arr[3] * alphaBlendValue);
        var flag = withDepth ? this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT : this._gl.COLOR_BUFFER_BIT;
        this._gl.clear(flag);
    };
    FrameBuffer.prototype.destroy = function () {
        this._gl.deleteRenderbuffer(this.glRenderBuffer);
        this._gl.deleteFramebuffer(this.glFrameBuffer);
        this._destroyed = true;
    };
    FrameBuffer.prototype.isDestroyed = function () {
        return this._destroyed;
    };
    FrameBuffer.prototype.getTexture = function () {
        return this.texture;
    };
    FrameBuffer.prototype._init = function (gl, size) {
        this.glRenderBuffer = gl.createRenderbuffer();
        if ( true && !this.glRenderBuffer)
            throw new debugError/* DebugError */.N("can not allocate memory for glRenderBuffer");
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.glRenderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, size.width, size.height);
        this.glFrameBuffer = gl.createFramebuffer();
        if ( true && !this.glFrameBuffer)
            throw new debugError/* DebugError */.N("can not allocate memory for glFrameBuffer");
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFrameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.getGlTexture(), 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.glRenderBuffer);
        var fbStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if ( true && fbStatus !== gl.FRAMEBUFFER_COMPLETE) {
            throw new debugError/* DebugError */.N("frame buffer status error: ".concat(fbStatus, " (expected gl.FRAMEBUFFER_COMPLETE(").concat(gl.FRAMEBUFFER_COMPLETE, "))"));
        }
        this.texture.unbind();
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };
    FrameBuffer.prototype._checkBound = function () {
        if (false)
            {}
        if (FrameBuffer.currentBuffer !== this)
            throw new debugError/* DebugError */.N("frame buffer is not bound; call bind() method firstly");
    };
    return FrameBuffer;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/buffer/doubleFrameBuffer.ts

var DoubleFrameBuffer = (function () {
    function DoubleFrameBuffer(_gl, size) {
        this._gl = _gl;
        this.buffers = [
            new FrameBuffer(_gl, size),
            new FrameBuffer(_gl, size)
        ];
    }
    DoubleFrameBuffer.prototype.setInterpolationMode = function (mode) {
        this.buffers[0].getTexture().setInterpolationMode(mode);
        this.buffers[1].getTexture().setInterpolationMode(mode);
    };
    DoubleFrameBuffer.prototype.applyFilters = function (texture, nextFrameBuffer, filters) {
        var len = filters.length;
        if (len === 0)
            return texture;
        var filter = filters[0];
        if (!filter.enabled)
            return texture;
        filter.getPainter().attachTexture('texture', texture);
        filter.doFilter(this.getDestBuffer(), nextFrameBuffer);
        for (var i = 1; i < len; ++i) {
            if (!filters[i].enabled)
                continue;
            this.flip();
            filters[i].getPainter().attachTexture('texture', this.getSourceBuffer().getTexture());
            filters[i].doFilter(this.getDestBuffer(), nextFrameBuffer);
        }
        this.flip();
        return this.getSourceBuffer().getTexture();
    };
    DoubleFrameBuffer.prototype.destroy = function () {
        this.buffers.forEach(function (b) { return b.destroy(); });
    };
    DoubleFrameBuffer.prototype.flip = function () {
        var tmp = this.buffers[0];
        this.buffers[0] = this.buffers[1];
        this.buffers[1] = tmp;
    };
    DoubleFrameBuffer.prototype.getSourceBuffer = function () {
        return this.buffers[0];
    };
    DoubleFrameBuffer.prototype.getDestBuffer = function () {
        return this.buffers[1];
    };
    return DoubleFrameBuffer;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/buffer/frameBufferStack.ts







var NONE_FILTERS = [];
var FrameBufferStack = (function () {
    function FrameBufferStack(game, _gl, _size) {
        this.game = game;
        this._gl = _gl;
        this._size = _size;
        this._stack = [];
        this._interpolationMode = 1;
        this._pixelPerfectMode = false;
        this._blender = Blender.getSingleton(this._gl);
        this._destroyed = false;
        this.id = Incrementer.getValue();
        this._stack.push({
            frameBuffer: new FrameBuffer(this._gl, this._size),
            filters: NONE_FILTERS,
            pointer: { ptr: 0 },
            alpha: 1,
        });
        this._stackPointer = 1;
        this._simpleRectPainter = new SimpleRectPainter(_gl);
        this._simpleRectPainter.initProgram();
        this._blender.enable();
        this._blender.setBlendMode(0);
        this._resourceTexture = this._getFirst().frameBuffer.getTexture();
    }
    FrameBufferStack.prototype.pushState = function (filters, alpha, forceDrawChildrenOnNewSurface) {
        var prevPointer = this._getLast().pointer;
        if (filters.length > 0 || alpha !== 1 || forceDrawChildrenOnNewSurface) {
            if (this._stack[this._stackPointer] === undefined) {
                this._stack[this._stackPointer] = {
                    frameBuffer: new FrameBuffer(this._gl, this._size),
                    filters: NONE_FILTERS,
                    alpha: alpha,
                    pointer: { ptr: this._stackPointer }
                };
            }
            this._stack[this._stackPointer].filters = filters;
            this._stack[this._stackPointer].alpha = alpha;
            this._stack[this._stackPointer].frameBuffer.bind();
            this._stack[this._stackPointer].frameBuffer.clear(Color.NONE, false);
            ++this._stackPointer;
        }
        else {
            this._getLast().frameBuffer.bind();
        }
        return prevPointer;
    };
    FrameBufferStack.prototype.bind = function () {
        this._getLast().frameBuffer.bind();
    };
    FrameBufferStack.prototype.clear = function (color, widthDepth, alphaBlend) {
        for (var _i = 0, _a = this._stack; _i < _a.length; _i++) {
            var b = _a[_i];
            b.frameBuffer.bind();
            b.frameBuffer.clear(color, widthDepth, alphaBlend);
        }
    };
    FrameBufferStack.prototype.setInterpolationMode = function (interpolation) {
        this._getLast().frameBuffer.setInterpolationMode(interpolation);
        this._getDoubleFrameBuffer().setInterpolationMode(interpolation);
        this._interpolationMode = interpolation;
    };
    FrameBufferStack.prototype.getCurrentTargetSize = function () {
        return this._getLast().frameBuffer.getTexture().size;
    };
    FrameBufferStack.prototype.setPixelPerfect = function (mode) {
        this._pixelPerfectMode = mode;
    };
    FrameBufferStack.prototype.getStackSize = function () {
        return this._stackPointer;
    };
    FrameBufferStack.prototype.destroy = function () {
        this._stack.forEach(function (f) { return f.frameBuffer.destroy(); });
        if (this._doubleFrameBuffer !== undefined)
            this._doubleFrameBuffer.destroy();
        this._simpleRectPainter.destroy();
    };
    FrameBufferStack.prototype.isDestroyed = function () {
        return this._destroyed;
    };
    FrameBufferStack.prototype.reduceState = function (to) {
        if (this._stackPointer === 1)
            return;
        for (var i = this._stackPointer - 1; i > to.ptr; --i) {
            var currItem = this._stack[i];
            var nextItem = this._stack[i - 1];
            var filteredTexture = this._getDoubleFrameBuffer().applyFilters(currItem.frameBuffer.getTexture(), nextItem.frameBuffer, currItem.filters);
            currItem.filters = NONE_FILTERS;
            nextItem.frameBuffer.bind();
            nextItem.frameBuffer.setInterpolationMode(this._interpolationMode);
            this._simpleRectPainter.setUniform(this._simpleRectPainter.u_alpha, currItem.alpha);
            this._simpleRectPainter.setUniform(this._simpleRectPainter.u_flip, false);
            this._simpleRectPainter.attachTexture('texture', filteredTexture);
            this._blender.setBlendMode(0);
            this._simpleRectPainter.draw();
        }
        this._stackPointer = to.ptr + 1;
    };
    FrameBufferStack.prototype.renderToScreen = function () {
        this._blender.setBlendMode(0);
        var needFullScreen = this._pixelPerfectMode || Device.embeddedEngine;
        var w = needFullScreen ? this.game.getRenderer().viewPortSize.width : this.game.size.width;
        var h = needFullScreen ? this.game.getRenderer().viewPortSize.height : this.game.size.height;
        FrameBuffer.getCurrent().unbind();
        this._gl.viewport(0, 0, ~~w, ~~h);
        this._simpleRectPainter.setUniform(this._simpleRectPainter.u_alpha, 1);
        this._simpleRectPainter.setUniform(this._simpleRectPainter.u_flip, true);
        this._simpleRectPainter.attachTexture('texture', this._getLast().frameBuffer.getTexture());
        this._simpleRectPainter.draw();
    };
    FrameBufferStack.prototype.getTexture = function () {
        return this._resourceTexture;
    };
    FrameBufferStack.prototype._getLast = function () {
        return this._stack[this._stackPointer - 1];
    };
    FrameBufferStack.prototype._getFirst = function () {
        return this._stack[0];
    };
    FrameBufferStack.prototype._getDoubleFrameBuffer = function () {
        if (this._doubleFrameBuffer === undefined)
            this._doubleFrameBuffer = new DoubleFrameBuffer(this._gl, this._size);
        return this._doubleFrameBuffer;
    };
    return FrameBufferStack;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/renderer/webGlRendererHelper.ts



var WebGlRendererHelper = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(WebGlRendererHelper, _super);
    function WebGlRendererHelper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebGlRendererHelper.prototype.createRenderTarget = function (game, size) {
        var renderer = this.game.getRenderer();
        return new FrameBufferStack(game, renderer.getNativeContext(), size);
    };
    WebGlRendererHelper.prototype.destroyRenderTarget = function (t) {
    };
    return WebGlRendererHelper;
}(RendererHelper));


;// CONCATENATED MODULE: ./engine/renderer/webGl/painters/impl/base/simpleRect/simpleColoredRectPainter.ts









var SimpleColoredRectPainter = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(SimpleColoredRectPainter, _super);
    function SimpleColoredRectPainter(gl) {
        var _this = _super.call(this, gl) || this;
        _this.gen = new ShaderGenerator();
        var gen = _this.gen;
        gen.addAttribute(GL_TYPE.FLOAT_VEC4, 'a_position');
        _this.u_vertexMatrix = gen.addVertexUniform(GL_TYPE.FLOAT_MAT4, 'u_vertexMatrix');
        _this.u_projectionMatrix = gen.addVertexUniform(GL_TYPE.FLOAT_MAT4, 'u_projectionMatrix');
        _this.u_alpha = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_alpha');
        _this.u_color = gen.addScalarFragmentUniform(GL_TYPE.FLOAT_VEC4, 'u_color');
        gen.prependVertexCodeBlock("\n            #define zToW_matrix mat4(".concat(Z_To_W_MATRIX_SOURCE, ")\n        "));
        gen.setVertexMainFn("\n            void main(){\n                gl_Position = zToW_matrix * u_projectionMatrix * u_vertexMatrix * a_position;\n            }\n        ");
        gen.setFragmentMainFn("\n            void main(){\n                vec4 color = vec4(\n                    u_color.r*u_color.a,\n                    u_color.g*u_color.a,\n                    u_color.b*u_color.a,\n                    u_color.a\n                );\n                gl_FragColor = color*u_alpha;\n            }\n        ");
        _this.initProgram();
        return _this;
    }
    SimpleColoredRectPainter.prototype.initProgram = function () {
        if (true) {
            if (!this.gen)
                throw new debugError/* DebugError */.N("can not init simpleRectPainter instance: ShaderGenerator must be created");
        }
        this.primitive = new Plane();
        this.program = new ShaderProgram(this.gl, this.gen.getVertexSource(), this.gen.getFragmentSource());
        this.bufferInfo = new BufferInfo(this.gl, {
            posVertexInfo: { array: new Float32Array(this.primitive.vertexArr), type: this.gl.FLOAT, size: 2, attrName: 'a_position' },
            posIndexInfo: { array: this.primitive.indexArr },
            drawMethod: 2
        });
        this.setUniformScalar(this.u_alpha, 1);
    };
    return SimpleColoredRectPainter;
}(AbstractPainter));


;// CONCATENATED MODULE: ./engine/renderer/webGl/blender/glCachedAccessor.ts
var GlCachedAccessor = (function () {
    function GlCachedAccessor(_gl) {
        this._gl = _gl;
    }
    GlCachedAccessor.prototype.setDepthTest = function (val) {
        if (this._depthTest === val)
            return;
        if (val)
            this._gl.enable(this._gl.DEPTH_TEST);
        else
            this._gl.disable(this._gl.DEPTH_TEST);
        this._depthTest = val;
    };
    GlCachedAccessor.prototype.setCulling = function (val) {
        if (val === this.cullFaceEnabled)
            return;
        if (val) {
            this._gl.enable(this._gl.CULL_FACE);
        }
        else {
            this._gl.disable(this._gl.CULL_FACE);
        }
        this.cullFaceEnabled = val;
    };
    GlCachedAccessor.prototype.setCullFace = function (val) {
        if (this.cullFace === val)
            return;
        if (val === 0) {
            this.setCulling(true);
            this._gl.cullFace(this._gl.FRONT);
        }
        else if (val === 1) {
            this.setCulling(true);
            this._gl.cullFace(this._gl.BACK);
        }
        else {
            this.setCulling(false);
        }
        this.cullFace = val;
    };
    return GlCachedAccessor;
}());


;// CONCATENATED MODULE: ./engine/misc/collection/lruMap.ts


var LruMap = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(LruMap, _super);
    function LruMap(capacity) {
        if (capacity === void 0) { capacity = 16; }
        var _this = _super.call(this) || this;
        _this.capacity = capacity;
        _this.keys = new Array(_this.capacity);
        return _this;
    }
    LruMap.prototype.put = function (key, value) {
        this.keys.push(key);
        if (this.keys.length > this.capacity) {
            this.remove(this.keys[0]);
            this.keys.splice(0, 1);
        }
        _super.prototype.put.call(this, key, value);
    };
    return LruMap;
}(FastMap));


// EXTERNAL MODULE: ./engine/renderer/webGl/painters/impl/batch/shaders/batch.vertex.glsl
var batch_vertex = __webpack_require__(72526);
// EXTERNAL MODULE: ./engine/renderer/webGl/painters/impl/batch/shaders/batch.fragment.glsl
var batch_fragment = __webpack_require__(22352);
;// CONCATENATED MODULE: ./engine/renderer/webGl/painters/impl/batch/batchArrays/abstract/abstractBatchArray.ts

var NUM_OF_VERTICES_IN_QUAD = 4;
var AbstractBatchArray = (function () {
    function AbstractBatchArray(size) {
        this.size = size;
        this.dirty = false;
        this.currentOffset = 0;
        this.array = new Float32Array(NUM_OF_VERTICES_IN_QUAD * size * BatchPainter.NUM_OF_QUADS_IN_BATCH);
        this.OFFSET_SIZE = size * NUM_OF_VERTICES_IN_QUAD;
    }
    AbstractBatchArray.prototype.setVertexBuffer = function (vb) {
        this.vertexBuffer = vb;
    };
    AbstractBatchArray.prototype.putNextChunk = function (model, chunkIndex) {
        this.dirty = true;
        var offset = chunkIndex * this.OFFSET_SIZE;
        this.onPutNextChunk(model, offset);
        offset += this.OFFSET_SIZE;
        this.currentOffset = offset;
    };
    AbstractBatchArray.prototype.uploadToVertexBuffer = function () {
        if (!this.dirty)
            return;
        this.dirty = false;
        this.vertexBuffer.updateData(this.array);
    };
    AbstractBatchArray.prototype.clearUnused = function () {
        this.array.fill(0, this.currentOffset);
    };
    AbstractBatchArray.prototype.getArray = function () {
        return this.array;
    };
    return AbstractBatchArray;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/painters/impl/batch/batchArrays/colorBatchArray.ts


var ColorBatchArray = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(ColorBatchArray, _super);
    function ColorBatchArray() {
        return _super.call(this, 2) || this;
    }
    ColorBatchArray.prototype.onPutNextChunk = function (model, offset) {
        var colorArray = model.getPackedColor();
        var rg = colorArray[0];
        var ba = colorArray[1];
        var array = this.array;
        for (var i = 0; i < NUM_OF_VERTICES_IN_QUAD; ++i) {
            array[offset++] = rg;
            array[offset++] = ba;
        }
    };
    return ColorBatchArray;
}(AbstractBatchArray));


;// CONCATENATED MODULE: ./engine/renderer/webGl/painters/impl/batch/batchArrays/angleBatchArray.ts


var AngleBatchArray = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(AngleBatchArray, _super);
    function AngleBatchArray() {
        return _super.call(this, 1) || this;
    }
    AngleBatchArray.prototype.onPutNextChunk = function (model, offset) {
        var array = this.array;
        array[offset] =
            array[++offset] =
                array[++offset] =
                    array[++offset] = model;
    };
    return AngleBatchArray;
}(AbstractBatchArray));


;// CONCATENATED MODULE: ./engine/renderer/webGl/painters/impl/batch/batchArrays/posBatchArray.ts


var PosBatchArray = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(PosBatchArray, _super);
    function PosBatchArray() {
        return _super.call(this, 4) || this;
    }
    PosBatchArray.prototype.onPutNextChunk = function (model, offset) {
        var pos = model.pos;
        var size = model.size;
        var width = size.width;
        var height = size.height;
        var x = pos.x;
        var y = pos.y;
        var array = this.array;
        for (var i = 0; i < NUM_OF_VERTICES_IN_QUAD; ++i) {
            array[offset++] = x;
            array[offset++] = y;
            array[offset++] = width;
            array[offset++] = height;
        }
    };
    return PosBatchArray;
}(AbstractBatchArray));


;// CONCATENATED MODULE: ./engine/renderer/webGl/painters/impl/batch/batchPainter.ts











var BatchPainter = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(BatchPainter, _super);
    function BatchPainter(gl) {
        var _this = _super.call(this, gl) || this;
        _this.currentModelIndex = 0;
        _this.dirty = false;
        var gen = new ShaderGenerator();
        _this.u_viewPort = gen.addVertexUniform(GL_TYPE.FLOAT_VEC2, 'u_viewPort');
        _this.a_idx = gen.addAttribute(GL_TYPE.FLOAT, 'a_idx');
        _this.a_color = gen.addAttribute(GL_TYPE.FLOAT_VEC2, 'a_color');
        _this.a_angle = gen.addAttribute(GL_TYPE.FLOAT, 'a_angle');
        _this.a_pos = gen.addAttribute(GL_TYPE.FLOAT_VEC4, 'a_pos');
        gen.addVarying(GL_TYPE.FLOAT_VEC4, 'v_color');
        gen.setVertexMainFn(batch_vertex);
        gen.setFragmentMainFn(batch_fragment);
        _this.program = new ShaderProgram(gl, gen.getVertexSource(), gen.getFragmentSource());
        var indexArray = [];
        for (var i = 0; i < 4 * BatchPainter.NUM_OF_QUADS_IN_BATCH; i += 4) {
            indexArray.push.apply(indexArray, [
                i,
                i + 1,
                i + 3,
                i,
                i + 2,
                i + 3
            ]);
        }
        var vertexIdxArray = new Float32Array(4 * 1 * BatchPainter.NUM_OF_QUADS_IN_BATCH);
        for (var i = 0; i < vertexIdxArray.length; i += 4) {
            vertexIdxArray[i] = 0;
            vertexIdxArray[i + 1] = 1;
            vertexIdxArray[i + 2] = 2;
            vertexIdxArray[i + 3] = 3;
        }
        _this.colorBatchArray = new ColorBatchArray();
        _this.angleBatchArray = new AngleBatchArray();
        _this.posBatchArray = new PosBatchArray();
        var bufferInfoDesc = {
            posIndexInfo: {
                array: indexArray,
            },
            posVertexInfo: {
                array: vertexIdxArray, type: gl.FLOAT,
                size: 1, attrName: _this.a_idx,
            },
            miscBuffersInfo: [
                {
                    array: _this.colorBatchArray.getArray(), type: gl.FLOAT,
                    size: 2, attrName: _this.a_color,
                },
                {
                    array: _this.angleBatchArray.getArray(), type: gl.FLOAT,
                    size: 1, attrName: _this.a_angle,
                },
                {
                    array: _this.posBatchArray.getArray(), type: gl.FLOAT,
                    size: 4, attrName: _this.a_pos,
                },
            ],
            drawMethod: 3
        };
        _this.bufferInfo = new BufferInfo(_this.gl, bufferInfoDesc);
        _this.colorBatchArray.setVertexBuffer(_this.bufferInfo.miscVertexBuffers[0]);
        _this.angleBatchArray.setVertexBuffer(_this.bufferInfo.miscVertexBuffers[1]);
        _this.posBatchArray.setVertexBuffer(_this.bufferInfo.miscVertexBuffers[2]);
        return _this;
    }
    BatchPainter.prototype.putNextModel = function (model, renderer) {
        if (this.currentModelIndex === BatchPainter.NUM_OF_QUADS_IN_BATCH) {
            this.flush(renderer);
        }
        var index = this.currentModelIndex;
        this.colorBatchArray.putNextChunk(model.fillColor, index);
        this.angleBatchArray.putNextChunk(model.angle, index);
        this.posBatchArray.putNextChunk(model, index);
        ++this.currentModelIndex;
        this.dirty = true;
    };
    BatchPainter.prototype.flush = function (renderer) {
        if (!this.dirty)
            return;
        var viewPortSize = renderer.getRenderTarget().getTexture().size.toArray();
        this.setUniform(this.u_viewPort, viewPortSize);
        this.colorBatchArray.uploadToVertexBuffer();
        this.colorBatchArray.clearUnused();
        this.angleBatchArray.uploadToVertexBuffer();
        this.posBatchArray.uploadToVertexBuffer();
        this.draw();
        this.currentModelIndex = 0;
        this.dirty = false;
    };
    BatchPainter.prototype.isDirty = function () {
        return this.dirty;
    };
    BatchPainter.NUM_OF_QUADS_IN_BATCH = 8000;
    return BatchPainter;
}(AbstractPainter));

;// CONCATENATED MODULE: ./engine/renderer/webGl/painters/impl/base/simpleImage/simpleImagePainter.ts








var SimpleImagePainter = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(SimpleImagePainter, _super);
    function SimpleImagePainter(gl) {
        var _this = _super.call(this, gl) || this;
        _this.gen = new ShaderGenerator();
        var gen = _this.gen;
        _this.u_vertexMatrix = gen.addVertexUniform(GL_TYPE.FLOAT_MAT4, 'u_vertexMatrix');
        _this.u_projectionMatrix = gen.addVertexUniform(GL_TYPE.FLOAT_MAT4, 'u_projectionMatrix');
        _this.a_position = gen.addAttribute(GL_TYPE.FLOAT_VEC4, 'a_position');
        _this.u_alpha = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_alpha');
        _this.u_color = gen.addScalarFragmentUniform(GL_TYPE.FLOAT_VEC4, 'u_color');
        _this.u_width = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_width');
        _this.u_height = gen.addScalarFragmentUniform(GL_TYPE.FLOAT, 'u_height');
        _this.u_texRect = gen.addScalarFragmentUniform(GL_TYPE.FLOAT_VEC4, 'u_texRect');
        gen.addScalarFragmentUniform(GL_TYPE.SAMPLER_2D, 'texture');
        gen.addVarying(GL_TYPE.FLOAT_VEC4, 'v_position');
        gen.prependVertexCodeBlock("\n            #define zToW_matrix mat4(".concat(Z_To_W_MATRIX_SOURCE, ")\n        "));
        gen.setVertexMainFn("\n            void main(){\n                v_position = a_position;\n                gl_Position = zToW_matrix * u_projectionMatrix * u_vertexMatrix * a_position;\n            }\n        ");
        gen.setFragmentMainFn("\n\n            vec4 mixTextureColorWithTint(vec4 textureCol, vec4 tint){\n                return mix(textureCol,tint,tint.a)*textureCol.a;\n            }\n\n            void main(){\n                float tx = u_texRect[0] + v_position.x * u_texRect[2];\n                float ty = u_texRect[1] + v_position.y * u_texRect[3];\n                vec4 color = texture2D(texture,vec2(tx,ty));\n                color = mixTextureColorWithTint(color,u_color)*u_alpha;\n                gl_FragColor = color;\n            }\n        ");
        _this.initProgram();
        return _this;
    }
    SimpleImagePainter.prototype.initProgram = function () {
        var gl = this.gl;
        var gen = this.gen;
        this.program = new ShaderProgram(gl, gen.getVertexSource(), gen.getFragmentSource());
        this.primitive = new Plane();
        this.bufferInfo = new BufferInfo(gl, {
            posVertexInfo: { array: new Float32Array(this.primitive.vertexArr), type: gl.FLOAT, size: 2, attrName: this.a_position },
            posIndexInfo: { array: this.primitive.indexArr },
            drawMethod: 2,
        });
    };
    return SimpleImagePainter;
}(AbstractPainter));


;// CONCATENATED MODULE: ./engine/renderer/webGl/painters/impl/base/skyBox/skyBoxPainter.ts







var SkyBoxPainter = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(SkyBoxPainter, _super);
    function SkyBoxPainter(gl) {
        var _this = _super.call(this, gl) || this;
        _this.gen = new ShaderGenerator();
        var gen = _this.gen;
        _this.a_position = gen.addAttribute(GL_TYPE.FLOAT_VEC4, 'a_position');
        _this.u_viewDirectionProjectionInverse = gen.addScalarFragmentUniform(GL_TYPE.FLOAT_MAT4, 'u_viewDirectionProjectionInverse');
        _this.u_skybox = gen.addScalarFragmentUniform(GL_TYPE.SAMPLER_CUBE, 'u_skybox');
        gen.addVarying(GL_TYPE.FLOAT_VEC4, 'v_position');
        gen.setVertexMainFn("\n            void main() {\n              vec4 pos = vec4(\n                  -1.0 + 2.0 * a_position.x,\n                   1.0 - 2.0 * a_position.y,\n                   0.0,  1.0\n              );\n              v_position = pos;\n              v_position.y = -pos.y;\n              gl_Position = pos;\n            }\n        ");
        gen.setFragmentMainFn("\n            void main() {\n                vec4 t = u_viewDirectionProjectionInverse * v_position;\n                gl_FragColor = textureCube(u_skybox, normalize(t.xyz / t.w));\n            }\n        ");
        _this.program = new ShaderProgram(_this.gl, _this.gen.getVertexSource(), _this.gen.getFragmentSource());
        _this.primitive = new Plane();
        _this.bufferInfo = new BufferInfo(gl, {
            posVertexInfo: {
                array: new Float32Array(_this.primitive.vertexArr),
                type: gl.FLOAT, size: 2,
                attrName: _this.a_position
            },
            posIndexInfo: { array: _this.primitive.indexArr },
            drawMethod: 2,
        });
        return _this;
    }
    return SkyBoxPainter;
}(AbstractPainter));


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/texture/cubeMapTexture.ts



var CubeMapTexture = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(CubeMapTexture, _super);
    function CubeMapTexture(gl) {
        var _this = _super.call(this, gl) || this;
        _this.type = 'CubeMapTexture';
        _this.__kind__ = _this.type;
        _this.samplerType = _this.gl.TEXTURE_CUBE_MAP;
        return _this;
    }
    CubeMapTexture.prototype.setImages = function (left, right, top, bottom, front, back) {
        this.validate(left, right, top, bottom, front, back);
        this.init(left, right, top, bottom, front, back);
    };
    CubeMapTexture.prototype.setAsZero = function () {
        var _this = this;
        var gl = this.gl;
        var faceInfos = [
            gl.TEXTURE_CUBE_MAP_POSITIVE_X,
            gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
            gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
        ];
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.tex);
        faceInfos.forEach(function (faceInfo) {
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, _this.tex);
            gl.texImage2D(faceInfo, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        });
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
    };
    CubeMapTexture.prototype.validate = function (left, right, top, bottom, front, back) {
        if (true) {
            if (!this.gl)
                throw new debugError/* DebugError */.N("can not create Texture, gl context not passed to constructor, expected: Texture(gl)");
            var isZeroImage = function (img) {
                return img.width === 0 || img.height === 0;
            };
            var isOfSize = function (img, width, height) {
                return img.width === width && img.height === height;
            };
            if (isZeroImage(top) ||
                isZeroImage(bottom) ||
                isZeroImage(left) ||
                isZeroImage(right) ||
                isZeroImage(top) ||
                isZeroImage(bottom)) {
                throw new debugError/* DebugError */.N("can not create cube texture: wrong image is passed");
            }
            var w = top.width, h = top.height;
            if (!isOfSize(bottom, w, h) ||
                !isOfSize(left, w, h) ||
                !isOfSize(right, w, h) ||
                !isOfSize(front, w, h) ||
                !isOfSize(back, w, h)) {
                throw new debugError/* DebugError */.N("can not create cube texture: the same size of images is required");
            }
            if (w !== h) {
                throw new debugError/* DebugError */.N("with and height must be the same for cubeMapTexture, but ".concat(w, "*").concat(h, " size provided"));
            }
        }
    };
    CubeMapTexture.prototype.init = function (left, right, top, bottom, front, back) {
        var _this = this;
        var gl = this.gl;
        var faceInfos = [
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                img: left,
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                img: right,
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                img: top,
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                img: bottom,
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                img: back,
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                img: front,
            },
        ];
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.tex);
        this.size.setWH(top.width, top.height);
        faceInfos.forEach(function (faceInfo) {
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, _this.tex);
            gl.texImage2D(faceInfo.target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, faceInfo.img);
        });
        if (isPowerOf2(this.size.width) && isPowerOf2(this.size.height)) {
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        }
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
    };
    return CubeMapTexture;
}(AbstractTexture));


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/texture/nullTexture.ts



var NullTexture = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(NullTexture, _super);
    function NullTexture() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NullTexture.prototype.bind = function (name, i, program) {
        if (AbstractTexture.currentBindTextureAt[i] !== undefined &&
            AbstractTexture.currentBindTextureAt[i].type === 'Texture') {
            return;
        }
        _super.prototype.bind.call(this, name, i, program);
    };
    return NullTexture;
}(Texture));


;// CONCATENATED MODULE: ./engine/renderer/webGl/renderer/webGlRenderer.ts




















var webGlRenderer_Mat16Holder = Mat4.Mat16Holder;
var webGlRenderer_glEnumToString = DebugUtil.glEnumToString;
var IDENTITY = Mat4.IDENTITY;




var getCtx = function (el) {
    var contextAttrs = { alpha: false, premultipliedAlpha: false };
    var possibles = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    for (var _i = 0, possibles_1 = possibles; _i < possibles_1.length; _i++) {
        var p = possibles_1[_i];
        var ctx = el.getContext(p, contextAttrs);
        if (ctx) {
            return ctx;
        }
    }
    if (true)
        throw new debugError/* DebugError */.N("webGl is not accessible on this device");
    return undefined;
};
var SCENE_DEPTH = 1000;
var lruCache = new LruMap();
var getProjectionMatrix = function (id, viewSize) {
    var projectionMatrix;
    if (lruCache.has(id)) {
        projectionMatrix = lruCache.get(id);
    }
    else {
        var m = webGlRenderer_Mat16Holder.create();
        Mat4.ortho(m, 0, viewSize.width, 0, viewSize.height, -SCENE_DEPTH, SCENE_DEPTH);
        lruCache.put(id, m);
        projectionMatrix = m;
    }
    return projectionMatrix;
};
var hlpMatrix1 = webGlRenderer_Mat16Holder.create();
Mat4.makeIdentity(hlpMatrix1);
var hlpMatrix2 = webGlRenderer_Mat16Holder.create();
var makeModelViewMatrix = function (rect, matrixStack) {
    var m = hlpMatrix1.mat16;
    m[0] = rect.width;
    m[5] = rect.height;
    m[12] = rect.x;
    m[13] = rect.y;
    Mat4Special.multiplyScaleTranslateByAny(hlpMatrix2, hlpMatrix1, matrixStack.getCurrentValue());
    return hlpMatrix2;
};
var InstanceHolder = (function () {
    function InstanceHolder(clazz, afterCreated) {
        this.clazz = clazz;
        this.afterCreated = afterCreated;
    }
    InstanceHolder.prototype.getInstance = function (gl) {
        if (this.instance === undefined) {
            this.instance = new this.clazz(gl);
            if (this.afterCreated !== undefined)
                this.afterCreated(this.instance);
        }
        return this.instance;
    };
    InstanceHolder.prototype.destroy = function () {
        if (this.instance !== undefined)
            this.instance.destroy();
    };
    InstanceHolder.prototype.isInvoked = function () {
        return this.instance !== undefined;
    };
    return InstanceHolder;
}());
var rect = new Rect();
var size = new geometry_size/* Size */.$();
var WebGlRenderer = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(WebGlRenderer, _super);
    function WebGlRenderer(game) {
        var _this = _super.call(this, game) || this;
        _this.type = 'WebGlRenderer';
        _this.rendererHelper = new WebGlRendererHelper(_this.game);
        _this._shapePainterHolder = new InstanceHolder(ShapePainter);
        _this._simpleImagePainterHolder = new InstanceHolder(SimpleImagePainter);
        _this._coloredRectPainterHolder = new InstanceHolder(SimpleColoredRectPainter);
        _this._meshPainterHolder = new InstanceHolder(MeshPainter);
        _this._skyBoxPainterHolder = new InstanceHolder(SkyBoxPainter);
        _this._batchPainterHolder = new InstanceHolder(BatchPainter);
        _this._nullTextureHolder = new InstanceHolder(NullTexture);
        _this._nullCubeMapTextureHolder = new InstanceHolder(CubeMapTexture, function (it) { return it.setAsZero(); });
        _this._pixelPerfectMode = false;
        _this.registerResize();
        _this._init();
        return _this;
    }
    WebGlRenderer.prototype.setPixelPerfect = function (mode) {
        _super.prototype.setPixelPerfect.call(this, mode);
        var interpolation = mode ? 0 : 1;
        this._currFrameBufferStack.setInterpolationMode(interpolation);
        this._currFrameBufferStack.setPixelPerfect(mode);
        this._pixelPerfectMode = mode;
        this.onResize();
    };
    WebGlRenderer.prototype.initBufferInfo = function (mesh2d) {
        return this._meshPainterHolder.getInstance(this._gl).initBufferInfo(mesh2d);
    };
    WebGlRenderer.prototype.drawImage = function (img) {
        this.flush();
        if (img.stretchMode === 0 &&
            img.offset.equals(0) &&
            img.borderRadius === 0 &&
            img.lineWidth === 0) {
            this._drawSimpleImage(img);
        }
        else {
            this._drawImage(img);
        }
    };
    WebGlRenderer.prototype.drawBatchedImage = function (model) {
        var bp = this._batchPainterHolder.getInstance(this._gl);
        bp.putNextModel(model, this);
    };
    WebGlRenderer.prototype.drawMesh3d = function (mesh) {
        this.flush();
        var mp = this._meshPainterHolder.getInstance(this._gl);
        mp.bindMesh3d(mesh);
        mp.bind();
        var modelMatrix = this._matrixStack.getCurrentValue();
        var inverseTransposeModelMatrix = webGlRenderer_Mat16Holder.fromPool();
        Mat4.inverse(inverseTransposeModelMatrix, modelMatrix);
        Mat4.transpose(inverseTransposeModelMatrix, inverseTransposeModelMatrix);
        mp.setModelMatrix(modelMatrix.mat16);
        mp.setInverseTransposeModelMatrix(inverseTransposeModelMatrix.mat16);
        mp.setProjectionMatrix(getProjectionMatrix(this._currFrameBufferStack.id, this._currFrameBufferStack.getCurrentTargetSize()).mat16);
        mp.setAlpha(mesh.getChildrenCount() === 0 ? mesh.alpha : 1);
        var isTextureUsed = mesh.texture !== undefined;
        if ( true && isTextureUsed && mesh._modelPrimitive.texCoordArr === undefined)
            throw new debugError/* DebugError */.N("can not apply texture without texture coordinates");
        mp.setTextureUsed(isTextureUsed);
        mp.attachTexture('u_texture', isTextureUsed ? mesh.texture : this._nullTextureHolder.getInstance(this._gl));
        var isVertexColorUsed = mesh._modelPrimitive.vertexColorArr !== undefined;
        mp.setVertexColorUsed(isVertexColorUsed);
        var isNormalsTextureUsed = mesh.normalsTexture !== undefined;
        mp.setNormalsTextureUsed(isNormalsTextureUsed);
        mp.attachTexture('u_normalsTexture', isNormalsTextureUsed ? mesh.normalsTexture : this._nullTextureHolder.getInstance(this._gl));
        var isSpecularTextureUsed = mesh.specularTexture !== undefined;
        mp.setSpecularTextureUsed(isSpecularTextureUsed);
        mp.attachTexture('u_specularTexture', isSpecularTextureUsed ? mesh.specularTexture : this._nullTextureHolder.getInstance(this._gl));
        var isCubeMapTextureUsed = mesh.cubeMapTexture !== undefined;
        if ( true && !isCubeMapTextureUsed && mesh.material.reflectivity !== 0)
            throw new debugError/* DebugError */.N("can not apply reflectivity without cubeMapTexture");
        mp.setCubeMapTextureUsed(isCubeMapTextureUsed);
        mp.setReflectivity(mesh.material.reflectivity);
        mp.attachTexture('u_cubeMapTexture', isCubeMapTextureUsed ? mesh.cubeMapTexture : this._nullCubeMapTextureHolder.getInstance(this._gl));
        if ( true && mesh.isLightAccepted()) {
            if (!mesh.getBufferInfo().normalBuffer) {
                console.error(mesh);
                throw new debugError/* DebugError */.N("can not accept light: normals are not specified");
            }
        }
        mp.setLightUsed(mesh.isLightAccepted() || false);
        mp.setColor(mesh.material.diffuseColor);
        mp.setColorMix(mesh.material.diffuseColorMix);
        mp.setSpecular(mesh.material.specular);
        this._glCachedAccessor.setCullFace(mesh.cullFace);
        this._glCachedAccessor.setDepthTest(mesh.depthTest);
        this._blender.setBlendMode(mesh.blendMode);
        mesh.onUpdatingBuffers();
        if (mesh.alpha !== 1) {
            this._glCachedAccessor.setCulling(true);
            this._glCachedAccessor.setCullFace(1);
            mp.draw();
            this._glCachedAccessor.setCullFace(0);
            mp.draw();
            this._glCachedAccessor.setCulling(false);
            this._glCachedAccessor.setCullFace(2);
        }
        else {
            this._glCachedAccessor.setCullFace(mesh.cullFace);
            mp.draw();
        }
        inverseTransposeModelMatrix.release();
    };
    WebGlRenderer.prototype.drawSkyBox = function (model) {
        this.flush();
        var sbp = this._skyBoxPainterHolder.getInstance(this._gl);
        var projectionMatrix = webGlRenderer_Mat16Holder.fromPool();
        Mat4.perspective(projectionMatrix, MathEx.degToRad(60), this._currFrameBufferStack.getTexture().size.width / this._currFrameBufferStack.getTexture().size.height, 1, 2000);
        var cameraMatrix = webGlRenderer_Mat16Holder.fromPool();
        var fi = model.angle3d.x;
        var theta = model.angle3d.y;
        var x = Math.cos(fi) * Math.sin(theta);
        var y = Math.sin(fi) * Math.sin(theta);
        var z = Math.cos(theta);
        var cameraPosition = Point3d.fromPool().setXYZ(x, y, z);
        var target = Point3d.fromPool().setXYZ(0, 0, 0);
        var up = Point3d.fromPool().setXYZ(0, 1, 0);
        Mat4.lookAt(cameraMatrix, cameraPosition, target, up);
        var viewMatrix = webGlRenderer_Mat16Holder.fromPool();
        Mat4.inverse(viewMatrix, cameraMatrix);
        viewMatrix.mat16[12] = 0;
        viewMatrix.mat16[13] = 0;
        viewMatrix.mat16[14] = 0;
        var viewDirectionProjectionMatrix = webGlRenderer_Mat16Holder.fromPool();
        Mat4.matrixMultiply(viewDirectionProjectionMatrix, projectionMatrix, viewMatrix);
        Mat4.inverse(viewDirectionProjectionMatrix, viewDirectionProjectionMatrix);
        sbp.setUniformVector(sbp.u_viewDirectionProjectionInverse, viewDirectionProjectionMatrix.mat16);
        sbp.attachTexture(sbp.u_skybox, model.texture);
        this._glCachedAccessor.setDepthTest(false);
        this._glCachedAccessor.setCullFace(2);
        sbp.draw();
        this._glCachedAccessor.setDepthTest(true);
        projectionMatrix.release();
        cameraMatrix.release();
        cameraPosition.release();
        target.release();
        up.release();
        viewMatrix.release();
        viewDirectionProjectionMatrix.release();
    };
    WebGlRenderer.prototype.drawMesh2d = function (mesh) {
        this.flush();
        var mp = this._meshPainterHolder.getInstance(this._gl);
        mp.bindMesh2d(mesh);
        mp.bind();
        var modelMatrix = this._matrixStack.getCurrentValue();
        mp.setModelMatrix(modelMatrix.mat16);
        mp.setInverseTransposeModelMatrix(IDENTITY);
        mp.setProjectionMatrix(getProjectionMatrix(this._currFrameBufferStack.id, this._currFrameBufferStack.getCurrentTargetSize()).mat16);
        mp.setAlpha(mesh.getChildrenCount() === 0 ? mesh.alpha : 1);
        mp.setTextureUsed(false);
        mp.attachTexture('u_texture', this._nullTextureHolder.getInstance(this._gl));
        mp.setNormalsTextureUsed(false);
        mp.attachTexture('u_normalsTexture', this._nullTextureHolder.getInstance(this._gl));
        mp.setSpecularTextureUsed(false);
        mp.attachTexture('u_specularTexture', this._nullTextureHolder.getInstance(this._gl));
        mp.setCubeMapTextureUsed(false);
        mp.setReflectivity(0);
        mp.attachTexture('u_cubeMapTexture', this._nullCubeMapTextureHolder.getInstance(this._gl));
        mp.setLightUsed(false);
        mp.setColor(mesh.fillColor);
        mp.setColorMix(0);
        mp.setSpecular(0);
        this._glCachedAccessor.setDepthTest(mesh.depthTest);
        this._blender.setBlendMode(mesh.blendMode);
        this._glCachedAccessor.setCullFace(2);
        mp.draw();
    };
    WebGlRenderer.prototype.destroyMesh = function (mesh) {
        var mp = this._meshPainterHolder.getInstance(this._gl);
        mp.bindMesh2d(mesh);
        mp.bind();
        mp.disableAllAttributes();
        mesh.getBufferInfo().destroy();
    };
    WebGlRenderer.prototype.drawRectangle = function (rectangle) {
        this.flush();
        if (rectangle.lineWidth === 0 && rectangle.borderRadius === 0 && rectangle.fillGradient === undefined) {
            this._drawSimpleColoredRectangle(rectangle);
        }
        else {
            this._drawRectangle(rectangle);
        }
    };
    WebGlRenderer.prototype.drawLine = function (line) {
        this.flush();
        var r = line.getRectangleRepresentation();
        this.drawRectangle(r);
    };
    WebGlRenderer.prototype.drawEllipse = function (ellipse) {
        this.flush();
        this.prepareGeometryUniformInfo(ellipse);
        this.prepareShapeUniformInfo(ellipse);
        this.prepareShapeFillUniformInfo(ellipse);
        var sp = this._shapePainterHolder.getInstance(this._gl);
        var maxR = Math.max(ellipse.radiusX, ellipse.radiusY);
        if (maxR === ellipse.radiusX) {
            sp.setUniformScalar(sp.u_rx, 0.5);
            sp.setUniformScalar(sp.u_ry, ellipse.radiusY / ellipse.radiusX * 0.5);
        }
        else {
            sp.setUniformScalar(sp.u_ry, 0.5);
            sp.setUniformScalar(sp.u_rx, ellipse.radiusX / ellipse.radiusY * 0.5);
        }
        sp.setUniformScalar(sp.u_shapeType, 0);
        sp.setUniformScalar(sp.u_width, 1);
        sp.setUniformScalar(sp.u_height, 1);
        sp.setUniformScalar(sp.u_rectOffsetLeft, 1);
        sp.setUniformScalar(sp.u_rectOffsetTop, 1);
        sp.setUniformScalar(sp.u_arcAngleFrom, ellipse.arcAngleFrom % (2 * Math.PI));
        sp.setUniformScalar(sp.u_arcAngleTo, ellipse.arcAngleTo % (2 * Math.PI));
        sp.setUniformScalar(sp.u_anticlockwise, ellipse.anticlockwise);
        sp.attachTexture('texture', this._nullTextureHolder.getInstance(this._gl));
        this._glCachedAccessor.setCullFace(2);
        sp.draw();
    };
    WebGlRenderer.prototype.flush = function () {
        if (!this._batchPainterHolder.isInvoked())
            return;
        var bp = this._batchPainterHolder.getInstance(this._gl);
        if (!bp.isDirty())
            return;
        this._glCachedAccessor.setDepthTest(false);
        this._glCachedAccessor.setCullFace(2);
        bp.flush(this);
    };
    WebGlRenderer.prototype.setLockRect = function (rect) {
        this._lockRect = rect;
    };
    WebGlRenderer.prototype.unsetLockRect = function () {
        this._lockRect = undefined;
    };
    WebGlRenderer.prototype.beforeItemStackDraw = function (filters, alpha, forceDrawChildrenOnNewSurface) {
        return this._currFrameBufferStack.pushState(filters, alpha, forceDrawChildrenOnNewSurface);
    };
    WebGlRenderer.prototype.afterItemStackDraw = function (stackPointer) {
        this.flush();
        this._glCachedAccessor.setDepthTest(false);
        this._currFrameBufferStack.reduceState(stackPointer);
    };
    WebGlRenderer.prototype.beforeFrameDraw = function () {
        if (this.clearBeforeRender) {
            this._currFrameBufferStack.clear(this.clearColor, true, 1);
        }
    };
    WebGlRenderer.prototype.afterFrameDraw = function () {
        if (this._currFrameBufferStack === this._origFrameBufferStack) {
            var hasLockRect = this._lockRect !== undefined;
            if (hasLockRect) {
                var rect_1 = this._lockRect;
                this._gl.enable(this._gl.SCISSOR_TEST);
                this._gl.scissor(~~rect_1.x, ~~(this.game.size.height - rect_1.height - rect_1.y), ~~rect_1.width, ~~rect_1.height);
            }
            this.flush();
            this._currFrameBufferStack.renderToScreen();
            if (hasLockRect)
                this._gl.disable(this._gl.SCISSOR_TEST);
        }
    };
    WebGlRenderer.prototype.getError = function () {
        if (false)
            {}
        var err = this._gl.getError();
        if (err !== this._gl.NO_ERROR) {
            return { code: err, desc: webGlRenderer_glEnumToString(this._gl, err) };
        }
        return undefined;
    };
    WebGlRenderer.prototype.createTexture = function (bitmap) {
        var texture = new Texture(this._gl);
        texture.setImage(bitmap);
        return texture;
    };
    WebGlRenderer.prototype.createCubeTexture = function (imgLeft, imgRight, imgTop, imgBottom, imgFront, imgBack) {
        var cubeTexture = new CubeMapTexture(this._gl);
        cubeTexture.setImages(imgLeft, imgRight, imgTop, imgBottom, imgFront, imgBack);
        return cubeTexture;
    };
    WebGlRenderer.prototype.getNativeContext = function () {
        return this._gl;
    };
    WebGlRenderer.prototype.setRenderTarget = function (fbs) {
        if ( true && fbs === undefined)
            throw new debugError/* DebugError */.N('undefined parameter: setRenderTarget(undefined)');
        if (this._currFrameBufferStack !== fbs)
            this.flush();
        this._currFrameBufferStack = fbs;
    };
    WebGlRenderer.prototype.getRenderTarget = function () {
        return this._currFrameBufferStack;
    };
    WebGlRenderer.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._origFrameBufferStack.destroy();
        this._nullTextureHolder.destroy();
        this._nullCubeMapTextureHolder.destroy();
        this._shapePainterHolder.destroy();
        this._meshPainterHolder.destroy();
        Texture.destroyAll();
    };
    WebGlRenderer.prototype.onResize = function () {
        _super.prototype.onResize.call(this);
        if (this._pixelPerfectMode && (this.game.scaleStrategy === 2 || this.game.scaleStrategy === 1)) {
            this.container.width = this.viewPortSize.width;
            this.container.height = this.viewPortSize.height;
        }
        else {
            this.container.width = this.game.size.width;
            this.container.height = this.game.size.height;
        }
    };
    WebGlRenderer.prototype._init = function () {
        var gl = getCtx(this.container);
        if ( true && gl === undefined)
            throw new debugError/* DebugError */.N("WebGLRenderingContext is not supported by this device");
        this._gl = gl;
        this._glCachedAccessor = new GlCachedAccessor(gl);
        this._blender = Blender.getSingleton(gl);
        this._blender.enable();
        this._blender.setBlendMode(0);
        this._origFrameBufferStack = new FrameBufferStack(this.game, this.getNativeContext(), this.game.size);
        this._currFrameBufferStack = this._origFrameBufferStack;
        gl.cullFace(gl.FRONT);
    };
    WebGlRenderer.prototype._drawSimpleColoredRectangle = function (rectangle) {
        var scp = this._coloredRectPainterHolder.getInstance(this._gl);
        if (rectangle._lastProgramId !== undefined && rectangle._lastProgramId !== scp.id)
            rectangle.worldTransformDirty = true;
        rectangle._lastProgramId = scp.id;
        if (rectangle.worldTransformDirty) {
            rect.setXYWH(0, 0, rectangle.size.width, rectangle.size.height);
            size.setFrom(this._currFrameBufferStack.getCurrentTargetSize());
            var mvpHolder = makeModelViewMatrix(rect, this._matrixStack);
            scp.setUniformVector(scp.u_vertexMatrix, mvpHolder.mat16, true);
            rectangle.modelViewMatrix.fromMat16(mvpHolder);
        }
        else {
            scp.setUniformVector(scp.u_vertexMatrix, rectangle.modelViewMatrix.mat16);
        }
        scp.setUniformVector(scp.u_projectionMatrix, getProjectionMatrix(this._currFrameBufferStack.id, this._currFrameBufferStack.getCurrentTargetSize()).mat16);
        scp.setUniformScalar(scp.u_alpha, rectangle.getChildrenCount() === 0 ? rectangle.alpha : 1);
        scp.setUniformVector(scp.u_color, rectangle.fillColor.asGL());
        this._glCachedAccessor.setCullFace(2);
        scp.draw();
    };
    WebGlRenderer.prototype._drawRectangle = function (rectangle) {
        var rw = rectangle.size.width;
        var rh = rectangle.size.height;
        var maxSize = Math.max(rw, rh);
        var sp = this._shapePainterHolder.getInstance(this._gl);
        if (rectangle._lastProgramId !== undefined && rectangle._lastProgramId !== sp.id)
            rectangle.worldTransformDirty = true;
        rectangle._lastProgramId = sp.id;
        this.prepareGeometryUniformInfo(rectangle);
        this.prepareShapeUniformInfo(rectangle);
        this.prepareShapeFillUniformInfo(rectangle);
        sp.setUniformScalar(sp.u_borderRadius, Math.min(rectangle.borderRadius / maxSize, 1));
        sp.setUniformScalar(sp.u_shapeType, 1);
        sp.attachTexture('texture', this._nullTextureHolder.getInstance(this._gl));
        this._glCachedAccessor.setCullFace(2);
        sp.draw();
    };
    WebGlRenderer.prototype._drawImage = function (img) {
        var texture = img.getTexture();
        texture.setInterpolationMode(img.isPixelPerfect() ? 0 : 1);
        var maxSize = Math.max(img.size.width, img.size.height);
        var sp = this._shapePainterHolder.getInstance(this._gl);
        if (img._lastProgramId !== undefined && img._lastProgramId !== sp.id)
            img.worldTransformDirty = true;
        img._lastProgramId = sp.id;
        this.prepareGeometryUniformInfo(img);
        sp.setUniformScalar(sp.u_lineWidth, Math.min(img.lineWidth / maxSize, 1));
        sp.setUniformVector(sp.u_color, img.color.asGL());
        size.setWH(img.size.width / img.srcRect.width, img.size.height / img.srcRect.height);
        sp.setUniformVector(sp.u_repeatFactor, size.toArray());
        sp.setUniformScalar(sp.u_borderRadius, Math.min(img.borderRadius / maxSize, 1));
        sp.setUniformScalar(sp.u_shapeType, 1);
        sp.setUniformScalar(sp.u_fillType, 1);
        var _a = texture.size, textureWidth = _a.width, textureHeight = _a.height;
        var _b = img.srcRect, srcRectX = _b.x, srcRectY = _b.y, destRectWidth = _b.width, destRectHeight = _b.height;
        var destArr = rect.setXYWH(srcRectX / textureWidth, srcRectY / textureHeight, destRectWidth / textureWidth, destRectHeight / textureHeight).toArray();
        sp.setUniformVector(sp.u_texRect, destArr);
        var offSetArr = size.setWH(img.offset.x / maxSize, img.offset.y / maxSize).toArray();
        sp.setUniformVector(sp.u_texOffset, offSetArr);
        sp.setUniformScalar(sp.u_stretchMode, img.stretchMode);
        sp.attachTexture('texture', texture);
        this._glCachedAccessor.setCullFace(2);
        sp.draw();
    };
    WebGlRenderer.prototype._drawSimpleImage = function (img) {
        var sip = this._simpleImagePainterHolder.getInstance(this._gl);
        if (img._lastProgramId !== undefined && img._lastProgramId !== sip.id)
            img.worldTransformDirty = true;
        img._lastProgramId = sip.id;
        var texture = img.getTexture();
        texture.setInterpolationMode(img.isPixelPerfect() ? 0 : 1);
        if (img.worldTransformDirty) {
            rect.setXYWH(0, 0, img.size.width, img.size.height);
            size.setFrom(this._currFrameBufferStack.getCurrentTargetSize());
            var mvpHolder = makeModelViewMatrix(rect, this._matrixStack);
            sip.setUniformVector(sip.u_vertexMatrix, mvpHolder.mat16, true);
            img.modelViewMatrix.fromMat16(mvpHolder);
        }
        else {
            sip.setUniformVector(sip.u_vertexMatrix, img.modelViewMatrix.mat16);
        }
        sip.setUniformVector(sip.u_projectionMatrix, getProjectionMatrix(this._currFrameBufferStack.id, this._currFrameBufferStack.getCurrentTargetSize()).mat16);
        sip.setUniformScalar(sip.u_alpha, img.getChildrenCount() === 0 ? img.alpha : 1);
        sip.setUniformVector(sip.u_color, img.color.asGL());
        var _a = texture.size, srcRectWidth = _a.width, srcRectHeight = _a.height;
        var _b = img.srcRect, srcRectX = _b.x, srcRectY = _b.y, destRectWidth = _b.width, destRectHeight = _b.height;
        var destArr = rect.setXYWH(srcRectX / srcRectWidth, srcRectY / srcRectHeight, destRectWidth / srcRectWidth, destRectHeight / srcRectHeight).toArray();
        sip.setUniformVector(sip.u_texRect, destArr);
        sip.setUniformScalar(sip.u_width, destRectWidth);
        sip.setUniformScalar(sip.u_height, destRectHeight);
        sip.attachTexture('texture', texture);
        this._blender.setBlendMode(img.blendMode);
        this._glCachedAccessor.setDepthTest(img.depthTest);
        this._glCachedAccessor.setCullFace(2);
        sip.draw();
    };
    WebGlRenderer.prototype.prepareGeometryUniformInfo = function (model) {
        if (true) {
            if (!model.size.width || !model.size.height) {
                console.error(model);
                throw new debugError/* DebugError */.N("Can not render model with zero size");
            }
        }
        var rw = model.size.width;
        var rh = model.size.height;
        var maxSize = Math.max(rw, rh);
        var sp = this._shapePainterHolder.getInstance(this._gl);
        var offsetX = 0, offsetY = 0;
        if (maxSize === rw) {
            sp.setUniformScalar(sp.u_width, 1);
            sp.setUniformScalar(sp.u_height, rh / rw);
            offsetY = (maxSize - rh) / 2;
            sp.setUniformScalar(sp.u_rectOffsetLeft, 0);
            sp.setUniformScalar(sp.u_rectOffsetTop, offsetY / maxSize);
        }
        else {
            sp.setUniformScalar(sp.u_height, 1);
            sp.setUniformScalar(sp.u_width, rw / rh);
            offsetX = (maxSize - rw) / 2;
            sp.setUniformScalar(sp.u_rectOffsetLeft, offsetX / maxSize);
            sp.setUniformScalar(sp.u_rectOffsetTop, 0);
        }
        if (model.worldTransformDirty) {
            rect.setXYWH(-offsetX, -offsetY, maxSize, maxSize);
            var mvpHolder = makeModelViewMatrix(rect, this._matrixStack);
            model.modelViewMatrix.fromMat16(mvpHolder);
            sp.setUniformVector(sp.u_vertexMatrix, mvpHolder.mat16, true);
        }
        else {
            sp.setUniformVector(sp.u_vertexMatrix, model.modelViewMatrix.mat16);
        }
        sp.setUniformVector(sp.u_projectionMatrix, getProjectionMatrix(this._currFrameBufferStack.id, this._currFrameBufferStack.getCurrentTargetSize()).mat16);
        sp.setUniformScalar(sp.u_alpha, model.getChildrenCount() === 0 ? model.alpha : 1);
        this._blender.setBlendMode(model.blendMode);
        this._glCachedAccessor.setDepthTest(model.depthTest);
    };
    WebGlRenderer.prototype.prepareShapeUniformInfo = function (model) {
        if (true) {
            if (!model.size.width || !model.size.height) {
                console.error(model);
                throw new debugError/* DebugError */.N("Can not render model with zero size");
            }
        }
        var maxSize = Math.max(model.size.width, model.size.height);
        var sp = this._shapePainterHolder.getInstance(this._gl);
        sp.setUniformScalar(sp.u_lineWidth, Math.min(model.lineWidth / maxSize, 1));
        sp.setUniformVector(sp.u_color, model.color.asGL());
    };
    WebGlRenderer.prototype.prepareShapeFillUniformInfo = function (model) {
        var sp = this._shapePainterHolder.getInstance(this._gl);
        if (model.fillGradient !== undefined) {
            model.fillGradient.setUniforms(sp);
            if (model.fillGradient.type === 'LinearGradient') {
                sp.setUniformScalar(sp.u_fillType, 2);
            }
            else {
                model.fillGradient.setUniforms(sp);
                sp.setUniformScalar(sp.u_fillType, 3);
            }
        }
        else {
            sp.setUniformVector(sp.u_fillColor, model.fillColor.asGL());
            sp.setUniformScalar(sp.u_fillType, 0);
        }
    };
    return WebGlRenderer;
}(AbstractCanvasRenderer));


;// CONCATENATED MODULE: ./engine/renderer/webGl/filters/abstract/abstractGlFilter.ts




var AbstractGlFilter = (function () {
    function AbstractGlFilter(game) {
        this.game = game;
        this.type = 'WebglFilter';
        this.kind = 'filter';
        this.enabled = true;
        this._uniformCache = new FastMap();
        this._destroyed = false;
        var renderer = game.getRenderer(WebGlRenderer);
        this.gl = renderer.getNativeContext();
        this.simpleRectPainter = new SimpleRectPainter(this.gl);
    }
    AbstractGlFilter.prototype.setUniform = function (name, value) {
        this._uniformCache.put(name, value);
    };
    AbstractGlFilter.prototype.getPainter = function () {
        return this.simpleRectPainter;
    };
    AbstractGlFilter.prototype.doFilter = function (destFrameBuffer, nextFrameBuffer) {
        var keys = this._uniformCache.getKeys();
        for (var i = 0; i < keys.length; i++) {
            var name_1 = keys[i];
            var value = this._uniformCache.get(keys[i]);
            this.simpleRectPainter.setUniform(name_1, value);
        }
        this.simpleRectPainter.setUniform(this.simpleRectPainter.u_alpha, 1);
        this.simpleRectPainter.setUniform(this.simpleRectPainter.u_flip, false);
        destFrameBuffer.bind();
        destFrameBuffer.clear(Color.NONE);
        this.simpleRectPainter.draw();
    };
    AbstractGlFilter.prototype.destroy = function () {
        this.simpleRectPainter.destroy();
        this._destroyed = true;
    };
    AbstractGlFilter.prototype.isDestroyed = function () {
        return this._destroyed;
    };
    return AbstractGlFilter;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/filters/texture/alphaMaskFilter.ts



var AlphaMaskFilter = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(AlphaMaskFilter, _super);
    function AlphaMaskFilter(game, maskTextureGl, alphaChannel) {
        var _this = _super.call(this, game) || this;
        _this.maskTextureGl = maskTextureGl;
        _this.alphaChannel = alphaChannel;
        var programGen = _this.simpleRectPainter.gen;
        _this.maskTexture = programGen.addScalarFragmentUniform(GL_TYPE.SAMPLER_2D, 'maskTexture');
        programGen.setFragmentMainFn("\n            void main(){\n                vec4 alfaTextureColor = texture2D(maskTexture, v_texCoord);\n                vec4 origColor = texture2D(texture, v_texCoord);\n                float a = alfaTextureColor.".concat(_this.alphaChannel, ";\n                gl_FragColor.rgb = origColor.rgb*origColor.a*a;\n                gl_FragColor.a = origColor.a*a;\n            }\n        "));
        _this.simpleRectPainter.initProgram();
        return _this;
    }
    AlphaMaskFilter.prototype.doFilter = function (destFrameBuffer) {
        this.simpleRectPainter.attachTexture(this.maskTexture, this.maskTextureGl);
        _super.prototype.doFilter.call(this, destFrameBuffer);
    };
    return AlphaMaskFilter;
}(AbstractGlFilter));


;// CONCATENATED MODULE: ./engine/renderer/common/colorFactory.ts


var NAMED_COLOR_TABLE = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    gray: "#808080",
    grey: "#808080",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    green: "#008000",
    greenyellow: "#adff2f",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgrey: "#d3d3d3",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370d8",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#d87093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
};
var ColorFactory = (function () {
    function ColorFactory() {
    }
    ColorFactory._calculateColorComponentsFromCss = function (literal) {
        var _a, _b;
        literal = literal.trim().toLowerCase();
        if (NAMED_COLOR_TABLE[literal] !== undefined)
            literal = NAMED_COLOR_TABLE[literal];
        var r = 0, g = 0, b = 0, a = 0;
        if (literal.substr(0, 1) === "#") {
            var numericPart = literal.substr(1);
            if (numericPart.length === 3) {
                r = ~~(parseInt(numericPart.substr(0, 1), 16) * 0xFF / 0xF);
                g = ~~(parseInt(numericPart.substr(1, 1), 16) * 0xFF / 0xF);
                b = ~~(parseInt(numericPart.substr(2, 1), 16) * 0xFF / 0xF);
                a = 255;
            }
            else if (numericPart.length === 6) {
                r = ~~(parseInt(numericPart.substr(0, 2), 16));
                g = ~~(parseInt(numericPart.substr(2, 2), 16));
                b = ~~(parseInt(numericPart.substr(4, 2), 16));
                a = 255;
            }
            else if (numericPart.length === 8) {
                r = ~~(parseInt(numericPart.substr(0, 2), 16));
                g = ~~(parseInt(numericPart.substr(2, 2), 16));
                b = ~~(parseInt(numericPart.substr(4, 2), 16));
                a = ~~(parseInt(numericPart.substr(6, 2), 16));
            }
            else {
                if (true)
                    throw new debugError/* DebugError */.N("unsupported or wrong color literal: ".concat(literal));
            }
        }
        else {
            if (literal.indexOf('rgb') === 0) {
                _a = literal.split("(")[1].split(")")[0].split(",").map(function (x) { return +x; }), r = _a[0], g = _a[1], b = _a[2], a = _a[3];
                if (a === undefined)
                    a = 255;
                else
                    a = ~~(a * 255);
            }
            else if (literal.indexOf('hsl') === 0) {
                var h = void 0, s = void 0, l = void 0, alfa = void 0;
                _b = literal.split("(")[1].split(")")[0].split(",").map(function (x) { return parseInt(x); }), h = _b[0], s = _b[1], l = _b[2], alfa = _b[3];
                if (alfa === undefined)
                    alfa = 255;
                else
                    alfa = ~~(alfa * 255);
                return this.fromHSLA(h, s, l, alfa);
            }
            else {
                if (true)
                    throw new debugError/* DebugError */.N("unsupported or wrong color literal: ".concat(literal));
            }
        }
        return { r: r, g: g, b: b, a: a };
    };
    ColorFactory.setHSLA = function (color, h, s, l, a) {
        h = (h % 360) / 360;
        s /= 100;
        l /= 100;
        var r, g, b;
        if (s === 0) {
            r = g = b = l;
        }
        else {
            var hue2rgb = function (pCol, qCol, t) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return pCol + (qCol - pCol) * 6 * t;
                if (t < 1 / 2)
                    return qCol;
                if (t < 2 / 3)
                    return pCol + (qCol - pCol) * (2 / 3 - t) * 6;
                return pCol;
            };
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        var rResult = Math.round(r * 255);
        var gResult = Math.round(g * 255);
        var bResult = Math.round(b * 255);
        color.setRGBA(rResult, gResult, bResult, a);
    };
    ColorFactory.setHSV = function (color, h, s, v) {
        h /= 100;
        s /= 100;
        v /= 100;
        var r = 0, g = 0, b = 0;
        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: {
                r = v;
                g = t;
                b = p;
                break;
            }
            case 1: {
                r = q;
                g = v;
                b = p;
                break;
            }
            case 2: {
                r = p;
                g = v;
                b = t;
                break;
            }
            case 3: {
                r = p;
                g = q;
                b = v;
                break;
            }
            case 4: {
                r = t;
                g = p;
                b = v;
                break;
            }
            case 5: {
                r = v;
                g = p;
                b = q;
                break;
            }
        }
        color.setRGB(~~(r * 255), ~~(b * 255), ~~(b * 255));
    };
    ColorFactory.setHSL = function (color, h, s, l) {
        this.setHSLA(color, h, s, l, 255);
    };
    ColorFactory.fromCSS = function (val) {
        var json = this._calculateColorComponentsFromCss(val);
        var c = new Color();
        c.fromJSON(json);
        return c;
    };
    ColorFactory.fromHSLA = function (h, s, l, a) {
        var c = new Color();
        this.setHSLA(c, h, s, l, a);
        return c;
    };
    ColorFactory.fromHSL = function (h, s, l) {
        return this.fromHSLA(h, s, l, 255);
    };
    ColorFactory.fromHSV = function (h, s, v) {
        var c = new Color();
        this.setHSV(c, h, s, v);
        return c;
    };
    return ColorFactory;
}());


;// CONCATENATED MODULE: ./demo/alphaMask/mainScene.ts





var MainScene = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(MainScene, _super);
    function MainScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainScene.prototype.onReady = function () {
        var surface = new DrawingSurface(this.game, this.game.size);
        this.surface = surface;
        surface.setLineWidth(0);
        this.appendChild(surface);
        this.filters = [
            new AlphaMaskFilter(this.game, this.mask, 'r')
        ];
    };
    MainScene.prototype.onRender = function () {
        var t = this.game.getCurrentTime() / 1000;
        var S = Math.sin;
        var C = Math.cos;
        var T = Math.tan;
        var c = this.surface;
        var x = this.surface;
        var R = function (r, g, b) {
            if (b === void 0) { b = 0; }
            if (r > 255)
                r = 255;
            if (g > 255)
                g = 255;
            if (b > 255)
                b = 255;
            return (r << 16) | (g << 8) | (b);
        };
        var v = 32;
        var l, d, r;
        x.drawBatch(function (batch) {
            for (l = 0; l < 572; l++) {
                d = l % v * v;
                x.setFillColor(ColorFactory.fromHSL((t * 150 - d % 360), 99, 65).asRGBNumeric());
                batch.drawRect(960 + S(r = S(t - d / 333) + l / v * .35) * d, 540 + C(r) * d, v, 24);
            }
        });
    };
    MainScene.prototype.onPreloading = function (taskQueue) {
        var _this = this;
        _super.prototype.onPreloading.call(this, taskQueue);
        taskQueue.addNextTask(function (progress) { return (0,tslib_es6/* __awaiter */.mG)(_this, void 0, void 0, function () {
            var _a;
            return (0,tslib_es6/* __generator */.Jh)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4, taskQueue.getLoader().loadTexture("./alphaMask/mask.png", progress)];
                    case 1:
                        _a.mask = _b.sent();
                        return [2];
                }
            });
        }); });
    };
    return MainScene;
}(Scene));


;// CONCATENATED MODULE: ./engine/control/mouse/mousePoint.ts




var MousePoint = (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(MousePoint, _super);
    function MousePoint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.screenCoordinate = new Point2d();
        _this.sceneCoordinate = new Point2d();
        return _this;
    }
    return MousePoint;
}(releaseableEntity/* ReleaseableEntity */.c));

var MousePointsPullHolder = (function () {
    function MousePointsPullHolder() {
    }
    MousePointsPullHolder.fromPool = function () {
        return this.mousePointsPool.getFreeObject();
    };
    MousePointsPullHolder.mousePointsPool = new objectPool/* ObjectPool */.L(MousePoint);
    return MousePointsPullHolder;
}());

;// CONCATENATED MODULE: ./engine/control/mouse/mouseControlHelper.ts


var MouseControlHelper = (function () {
    function MouseControlHelper(game) {
        this.game = game;
        this.isPointInPolygon4 = function (point, polygon) {
            var result = false;
            var j = polygon.length - 1;
            for (var i = 0, max = polygon.length; i < max; i++) {
                if (polygon[i][1] < point.y
                    && polygon[j][1] >= point.y || polygon[j][1] < point.y
                    && polygon[i][1] >= point.y) {
                    if (polygon[i][0] + (point.y - polygon[i][1])
                        /
                            (polygon[j][1] - polygon[i][1]) * (polygon[j][0] - polygon[i][0]) < point.x) {
                        result = !result;
                    }
                }
                j = i;
            }
            return result;
        };
    }
    MouseControlHelper.prototype.isPointInRect = function (mousePoint, obj, constrainObjects) {
        var result = this.isPointInPolygon4(mousePoint.screenCoordinate, getScreenCoords(obj));
        if (result && constrainObjects !== undefined) {
            for (var i = 0; i < constrainObjects.length; i++) {
                if (!this.isPointInRect(mousePoint, constrainObjects[i])) {
                    result = false;
                    break;
                }
            }
        }
        return result;
    };
    MouseControlHelper.prototype.captureObject = function (e, eventName, mousePoint, currentTarget, initialTarget, constrainObjects) {
        if (this.isPointInRect(mousePoint, currentTarget, constrainObjects)) {
            return this.triggerEventForObject(e, eventName, mousePoint, currentTarget, initialTarget);
        }
        else
            return undefined;
    };
    MouseControlHelper.prototype.triggerEventForObject = function (e, eventName, mousePoint, currentTarget, initialTarget) {
        mousePoint.target = currentTarget;
        var mouseEvent = {
            screenX: mousePoint.screenCoordinate.x,
            screenY: mousePoint.screenCoordinate.y,
            sceneX: mousePoint.sceneCoordinate.x,
            sceneY: mousePoint.sceneCoordinate.y,
            objectX: mousePoint.sceneCoordinate.x - currentTarget.pos.x,
            objectY: mousePoint.sceneCoordinate.y - currentTarget.pos.y,
            id: mousePoint.id,
            currentTarget: currentTarget,
            initialTarget: initialTarget,
            nativeEvent: e,
            eventName: eventName,
            isMouseDown: mousePoint.isMouseDown,
            button: e.buttons,
            isPropagated: true,
        };
        currentTarget.mouseEventHandler.trigger(eventName, mouseEvent);
        return mouseEvent;
    };
    MouseControlHelper.prototype.resolveSceneCoordinates = function (mousePoint, layerTransform) {
        if (layerTransform === 1) {
            mousePoint.sceneCoordinate.setFrom(mousePoint.screenCoordinate);
        }
        else {
            var worldPoint = this.game.getCurrentScene().camera.screenToWorld(mousePoint.screenCoordinate);
            mousePoint.sceneCoordinate.setFrom(worldPoint);
            worldPoint.release();
        }
    };
    MouseControlHelper.prototype.resolvePoint = function (e) {
        var game = this.game;
        var clientX = e.clientX;
        var clientY = e.clientY;
        var screenX = (clientX - game.pos.x) / game.scale.x;
        var screenY = (clientY - game.pos.y) / game.scale.y;
        var mousePoint = MousePointsPullHolder.fromPool();
        mousePoint.target = undefined;
        mousePoint.screenCoordinate.setXY(screenX, screenY);
        mousePoint.id = e.identifier || e.pointerId || 0;
        return mousePoint;
    };
    return MouseControlHelper;
}());


;// CONCATENATED MODULE: ./engine/control/mouse/capturedObjectsByTouchIdHolder.ts
var CapturedObjectsByTouchIdHolder = (function () {
    function CapturedObjectsByTouchIdHolder() {
        this.capturedObjects = {};
    }
    CapturedObjectsByTouchIdHolder.prototype._check = function (touchId) {
        if (this.capturedObjects[touchId] === undefined)
            this.capturedObjects[touchId] = [];
    };
    CapturedObjectsByTouchIdHolder.prototype.clear = function (touchId) {
        this._check(touchId);
        this.capturedObjects[touchId].length = 0;
    };
    CapturedObjectsByTouchIdHolder.prototype.add = function (touchId, obj) {
        this._check(touchId);
        this.capturedObjects[touchId].push(obj);
    };
    CapturedObjectsByTouchIdHolder.prototype.getByTouchId = function (touchId) {
        this._check(touchId);
        return this.capturedObjects[touchId];
    };
    return CapturedObjectsByTouchIdHolder;
}());


;// CONCATENATED MODULE: ./engine/control/mouse/mouseControl.ts



var LEFT_MOUSE_BTN = 0;
var MouseEventThrottler = (function () {
    function MouseEventThrottler() {
    }
    MouseEventThrottler.prototype.checkSameEventAndSet = function (event, x, y) {
        x = ~~x;
        y = ~~y;
        if (this.event === event &&
            this.lastX === x &&
            this.lastY === y) {
            return true;
        }
        else {
            this.event = event;
            this.lastX = x;
            this.lastY = y;
            return false;
        }
    };
    MouseEventThrottler.prototype.checkSameEvent = function (event) {
        return this.event === event;
    };
    return MouseEventThrottler;
}());
var MouseControl = (function () {
    function MouseControl(game) {
        this.game = game;
        this.type = 'MouseControl';
        this._helper = new MouseControlHelper(this.game);
        this._capturedObjectsByTouchIdHolder = new CapturedObjectsByTouchIdHolder();
        this._capturedObjectsByTouchIdPrevHolder = new CapturedObjectsByTouchIdHolder();
        this.mouseEventThrottler = new MouseEventThrottler();
    }
    MouseControl.prototype.listenTo = function () {
        var _this = this;
        if ( true && !this.game.getRenderer()) {
            throw new debugError/* DebugError */.N("can not initialize mouse control: renderer is not set");
        }
        var container = this.game.getRenderer().container;
        this._container = container;
        container.ontouchstart = function (e) {
            e.preventDefault();
            if (_this.mouseEventThrottler.checkSameEventAndSet("mouseDown", e.touches[0].clientX, e.touches[0].clientY)) {
                return;
            }
            var l = e.touches.length;
            while (l--) {
                _this.resolveClick(e.touches[l]);
            }
        };
        container.onmousedown = function (e) {
            if (_this.mouseEventThrottler.checkSameEventAndSet("mouseDown", e.clientX, e.clientY)) {
                return;
            }
            if (e.button === LEFT_MOUSE_BTN)
                _this.resolveClick(e);
            else {
                _this.resolveButtonPressed(e);
            }
        };
        container.onpointerdown = function (e) {
            if (_this.mouseEventThrottler.checkSameEventAndSet("mouseDown", e.clientX, e.clientY)) {
                return;
            }
            _this.resolveClick(e);
        };
        container.ontouchend = container.ontouchcancel = function (e) {
            if (_this.mouseEventThrottler.checkSameEventAndSet("mouseUp", e.changedTouches[0].clientX, e.changedTouches[0].clientY)) {
                return;
            }
            e.preventDefault();
            var l = e.changedTouches.length;
            while (l--) {
                _this.resolveMouseUp(e.changedTouches[l]);
            }
        };
        document.body.ontouchend = document.body.ontouchcancel = function (e) {
            if (_this.mouseEventThrottler.checkSameEvent("mouseUp")) {
                return;
            }
            var l = e.changedTouches.length;
            while (l--) {
                var point = _this._helper.resolvePoint(e.changedTouches[l]);
                _this.resolveMouseUp(e.changedTouches[l]);
                point.release();
            }
        };
        container.onpointerup =
            container.onpointercancel =
                container.onpointerleave =
                    container.onpointerup =
                        function (e) {
                            if (_this.mouseEventThrottler.checkSameEventAndSet("mouseUp", e.clientX, e.clientY)) {
                                return;
                            }
                            _this.resolveMouseUp(e);
                        };
        container.onmouseup = function (e) {
            if (_this.mouseEventThrottler.checkSameEventAndSet("mouseUp", e.clientX, e.clientY)) {
                return;
            }
            _this.resolveMouseUp(e);
        };
        document.body.onpointerup = function (e) {
            if (_this.mouseEventThrottler.checkSameEventAndSet("mouseUp", e.clientX, e.clientY)) {
                return;
            }
            _this.resolveMouseUp(e);
        };
        document.body.onmouseup = function (e) {
            if (_this.mouseEventThrottler.checkSameEventAndSet("mouseUp", e.clientX, e.clientY)) {
                return;
            }
            _this.resolveMouseUp(e);
        };
        container.ontouchmove = function (e) {
            if (_this.mouseEventThrottler.checkSameEventAndSet("mouseMove", e.touches[0].clientX, e.touches[0].clientY)) {
                return;
            }
            e.preventDefault();
            var l = e.touches.length;
            while (l--) {
                _this.resolveMouseMove(e.touches[l], true);
            }
        };
        container.onpointermove = function (e) {
            if (e.pointerType !== 'pen')
                return;
            if (_this.mouseEventThrottler.checkSameEventAndSet("mouseMove", e.clientX, e.clientY)) {
                return;
            }
            _this.resolveMouseMove(e, e.pressure > 0);
        };
        container.onmousemove = function (e) {
            if (_this.mouseEventThrottler.checkSameEventAndSet("mouseMove", e.clientX, e.clientY)) {
                return;
            }
            var isMouseDown = e.buttons === 1;
            _this.resolveMouseMove(e, isMouseDown);
        };
        container.ondblclick = function (e) {
            _this.resolveDoubleClick(e);
        };
        container.onmousewheel = function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.resolveScroll(e);
        };
    };
    MouseControl.prototype.update = function () { };
    MouseControl.prototype.destroy = function () {
        var _this = this;
        if (!this._container)
            return;
        [
            'mouseMove', 'ontouchstart', 'onmousedown',
            'ontouchend', 'onmouseup', 'ontouchmove',
            'onpointerup', 'onpointermove', 'onpointerdown',
            'onmousemove', 'ondblclick'
        ].forEach(function (evtName) {
            _this._container[evtName] = null;
            document.body.ontouchend =
                document.body.ontouchcancel =
                    document.body.onmouseup =
                        document.body.onpointerup =
                            null;
        });
    };
    MouseControl.prototype.triggerEvent = function (e, mouseEvent, isMouseDown) {
        if (isMouseDown === void 0) { isMouseDown = false; }
        var scene = this.game.getCurrentScene();
        var mousePoint = this._helper.resolvePoint(e);
        mousePoint.isMouseDown = isMouseDown;
        var objectStackItems = this.game.getCurrentScene()._renderingObjectStack.get();
        var i = objectStackItems.length;
        if (mouseEvent === "mouseMove")
            this._capturedObjectsByTouchIdHolder.clear(mousePoint.id);
        var propagationCancelled = false;
        if (i === 0) {
            this._helper.resolveSceneCoordinates(mousePoint, 0);
        }
        else {
            while (i--) {
                var objectStackItem = objectStackItems[i];
                var obj = objectStackItem.obj;
                var constrainObjects = objectStackItem.constrainObjects;
                var layer = obj.getLayer();
                if (layer === undefined)
                    continue;
                this._helper.resolveSceneCoordinates(mousePoint, layer.transformType);
                var capturedEvent = this._helper.captureObject(e, mouseEvent, mousePoint, obj, obj, constrainObjects);
                if (capturedEvent !== undefined) {
                    if (!capturedEvent.isPropagated) {
                        propagationCancelled = true;
                        break;
                    }
                    if (mouseEvent === "mouseMove")
                        this._capturedObjectsByTouchIdHolder.add(mousePoint.id, obj);
                    var parent_1 = obj.parent;
                    while (parent_1 !== undefined) {
                        var propagationEvent = this._helper.captureObject(e, mouseEvent, mousePoint, parent_1, obj, constrainObjects);
                        if (propagationEvent !== undefined) {
                            if (!propagationEvent.isPropagated) {
                                propagationCancelled = true;
                                break;
                            }
                            if (mouseEvent === "mouseMove")
                                this._capturedObjectsByTouchIdHolder.add(mousePoint.id, parent_1);
                        }
                        parent_1 = parent_1.parent;
                    }
                    break;
                }
            }
        }
        if (scene.interactive && !propagationCancelled) {
            if (mousePoint.target === undefined)
                mousePoint.target = scene;
            scene.mouseEventHandler.trigger(mouseEvent, {
                screenX: mousePoint.screenCoordinate.x,
                screenY: mousePoint.screenCoordinate.y,
                sceneX: mousePoint.sceneCoordinate.x,
                sceneY: mousePoint.sceneCoordinate.y,
                id: mousePoint.id,
                eventName: mouseEvent,
                nativeEvent: e,
                button: e.buttons,
                isMouseDown: isMouseDown,
            });
        }
        return mousePoint;
    };
    MouseControl.prototype.resolveClick = function (e) {
        var point = this.triggerEvent(e, "click");
        this.triggerEvent(e, "mouseDown").release();
        point.release();
    };
    MouseControl.prototype.resolveButtonPressed = function (e) {
        var point = this.triggerEvent(e, "click");
        this.triggerEvent(e, "mousePressed").release();
        point.release();
    };
    MouseControl.prototype.resolveMouseMove = function (e, isMouseDown) {
        var point = this.triggerEvent(e, "mouseMove", isMouseDown);
        var capturedNew = this._capturedObjectsByTouchIdHolder.getByTouchId(point.id);
        var capturedOld = this._capturedObjectsByTouchIdPrevHolder.getByTouchId(point.id);
        for (var i = 0; i < capturedNew.length; i++) {
            var obj = capturedNew[i];
            if (capturedOld.indexOf(obj) === -1) {
                this._helper.triggerEventForObject(e, "mouseEnter", point, obj, obj);
            }
        }
        for (var i = 0; i < capturedOld.length; i++) {
            var obj = capturedOld[i];
            if (capturedNew.indexOf(obj) === -1) {
                this._helper.triggerEventForObject(e, "mouseLeave", point, obj, obj);
            }
        }
        this._capturedObjectsByTouchIdPrevHolder.clear(point.id);
        for (var i = 0; i < capturedNew.length; i++) {
            this._capturedObjectsByTouchIdPrevHolder.add(point.id, capturedNew[i]);
        }
        point.release();
    };
    MouseControl.prototype.resolveMouseUp = function (e) {
        var point = this.triggerEvent(e, "mouseUp");
        var capturedNew = this._capturedObjectsByTouchIdHolder.getByTouchId(point.id);
        var capturedOld = this._capturedObjectsByTouchIdPrevHolder.getByTouchId(point.id);
        for (var i = 0; i < capturedOld.length; i++) {
            var obj = capturedOld[i];
            if (capturedNew.indexOf(obj) === -1) {
                this._helper.triggerEventForObject(e, "mouseUp", point, obj, obj);
            }
        }
        this._capturedObjectsByTouchIdPrevHolder.clear(point.id);
        this._capturedObjectsByTouchIdHolder.clear(point.id);
        point.release();
    };
    MouseControl.prototype.resolveDoubleClick = function (e) {
        this.triggerEvent(e, "doubleClick").release();
    };
    MouseControl.prototype.resolveScroll = function (e) {
        this.triggerEvent(e, "scroll").release();
    };
    return MouseControl;
}());


;// CONCATENATED MODULE: ./demo/alphaMask/index.ts





var game = new Game({ width: 1920, height: 980 });
game.setRenderer(WebGlRenderer);
game.addControl(KeyboardControl);
game.addControl(MouseControl);
var mainScene = new MainScene(game);
game.runScene(mainScene);

}();
/******/ })()
;