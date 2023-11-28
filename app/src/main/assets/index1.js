/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
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
        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}
if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (predicate) {
        if (this == null) {
            throw new TypeError('Array.prototype.findIndex called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;
        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return i;
            }
        }
        return -1;
    };
}
if (!Array.prototype.fill) {
    Array.prototype.Fill = function (val) {
        for (var i = 0; i < this.length; i++) {
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


/***/ }),

/***/ 84649:
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
    "if (u_lightUsed) {",
    "vec3 normal = normalize(v_normal);",
    "vec3 surfaceToLightDirection = normalize(v_surfaceToLight);",
    "vec3 surfaceToViewDirection = normalize(v_surfaceToView);",
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
    "vec3 I = normalize(vec3(v_position));",
    "vec3 R = reflect(I, normalize(v_normal));",
    "vec4 reflectionColor = textureCube(u_cubeMapTexture, R);",
    "gl_FragColor = mix(gl_FragColor,reflectionColor,u_reflectivity);",
    "}",
    "gl_FragColor*=u_alpha;",
    "}"
].join('\n');

/***/ }),

/***/ 70690:
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

/***/ 4201:
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

/***/ 94432:
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
    "if (distX>halfW - u_borderRadius && distY>halfH - u_borderRadius) {",
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
    "if (u_shapeType==SHAPE_TYPE_ELLIPSE) drawEllipse();",
    "else if (u_shapeType==SHAPE_TYPE_RECT) drawRect();",
    "else gl_FragColor = ERROR_COLOR;",
    "gl_FragColor*=u_alpha;",
    "}"
].join('\n');

/***/ }),

/***/ 34098:
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

/***/ 98520:
/***/ (function(module) {

module.exports = [
    "precision mediump float;",
    "void main(){",
    "vec2 uv;",
    "int idx = int(a_idx);",
    "if (idx==0) {",
    "uv = vec2(0.0, 0.0);",
    "} else if (idx==1) {",
    "uv = vec2(0.0, 1.0);",
    "} else if (idx==2) {",
    "uv = vec2(1.0, 0.0);",
    "} else {",
    "uv = vec2(1.0, 1.0);",
    "}",
    "float objWidth  = a_pos.z;",
    "float objHeight = a_pos.w;",
    "vec2 pos = vec2(",
    "a_pos.x + sin(a_angle)*objHeight *(-0.5 + uv.y)",
    "+ cos(a_angle)*objWidth  *(-0.5 + uv.x),",
    "a_pos.y + cos(a_angle)*objHeight *(-0.5 + uv.y)",
    "- sin(a_angle)*objWidth  *(-0.5 + uv.x)",
    ");",
    "gl_Position = vec4(",
    "-1.0 + 2.0 * pos.x/u_viewPort.x,",
    "-1.0 + 2.0 * pos.y/u_viewPort.y,",
    "0.0,  1.0",
    ");",
    "v_color = a_color;",
    "}"
].join('\n');

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";

;// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.js
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
/* global Reflect, Promise */

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
        while (_) try {
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
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
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

;// CONCATENATED MODULE: ./engine/debug/debugError.ts

var DebugError = (function (_super) {
    __extends(DebugError, _super);
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


;// CONCATENATED MODULE: ./engine/delegates/parentChildDelegate.ts

var ParentChildDelegate = (function () {
    function ParentChildDelegate(model) {
        this.model = model;
    }
    ParentChildDelegate.prototype._validateBeforeAppend = function (c) {
        if (true) {
            if (!c)
                throw new DebugError("illegal argument: ".concat(c));
            if (c === this.model)
                throw new DebugError("parent and child objects are the same");
            if (this.model._children.find(function (it) { return it === c; })) {
                console.error(c);
                throw new DebugError("this children is already added");
            }
            if (c.parent !== undefined) {
                throw new DebugError("this children is already added to another object");
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
                throw new DebugError("illegal argument: ".concat(c));
            if (index > this.model._children.length - 1)
                throw new DebugError("can not insert element: index is out of range (".concat(index, ",").concat(this.model._children.length - 1, ")"));
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
                throw new DebugError("illegal argument: ".concat(modelAfter));
        }
        var afterIndex = this.model._children.indexOf(modelAfter);
        if (true) {
            if (afterIndex === -1)
                throw new DebugError("can not insert element: object is detached or does not belong to parent");
        }
        if (afterIndex === this.model._children.length - 1)
            this.appendChild(newChild);
        else
            this.appendChildAt(newChild, afterIndex + 1);
    };
    ParentChildDelegate.prototype.appendChildBefore = function (modelBefore, newChild) {
        if (true) {
            if (!modelBefore || !newChild)
                throw new DebugError("illegal argument: ".concat(modelBefore));
        }
        var beforeIndex = this.model._children.indexOf(modelBefore);
        if (true) {
            if (beforeIndex === -1)
                throw new DebugError("can not insert element: object is detached or does not belong to parent");
        }
        if (beforeIndex === 0)
            this.prependChild(newChild);
        else
            this.appendChildAt(newChild, beforeIndex - 1);
    };
    ParentChildDelegate.prototype.prependChild = function (c) {
        if (true) {
            if (!c)
                throw new DebugError("illegal argument: ".concat(c));
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
            throw new DebugError("can not remove children with index ".concat(i));
        if ( true && c.parent === undefined)
            throw new DebugError("can not remove children with index ".concat(i, ": it is already detached"));
        var parent = c.parent;
        parent._children.splice(i, 1);
        c.parent = undefined;
        if (this.afterChildRemoved !== undefined)
            this.afterChildRemoved(c);
    };
    ParentChildDelegate.prototype.removeChild = function (child) {
        if (true) {
            if (!child)
                throw new DebugError("illegal argument: ".concat(child));
        }
        var parent = child.getParent();
        var i = parent._children.indexOf(child);
        if ( true && i === -1)
            throw new DebugError("can not remove child: it doesn't belong to parent");
        parent._children.splice(i, 1);
        child.parent = undefined;
        if (this.afterChildRemoved !== undefined)
            this.afterChildRemoved(child);
    };
    ParentChildDelegate.prototype.removeSelf = function () {
        var parent = this.model.getParent();
        if ( true && parent === undefined)
            throw new DebugError("can not remove child: it is already detached");
        var i = parent._children.indexOf(this.model);
        if ( true && i === -1)
            throw new DebugError("can not remove child: it doesn't belong to parent");
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
                throw new DebugError("illegal argument: ".concat(c));
        }
        var indexOf = this.model._children.indexOf(c);
        if ( true && indexOf === -1)
            throw new DebugError("can not replace child: destination node doesn't belong to element");
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
            throw new DebugError("can not move to front: object is detached");
        var parentArray = parent._children;
        var index = parentArray.indexOf(this.model);
        if ( true && index === -1)
            throw new DebugError("can not move to front: object is not belong to current scene");
        parentArray.splice(index, 1);
        parentArray.push(this.model);
    };
    ParentChildDelegate.prototype.moveToBack = function () {
        var parent = this.model.getParent();
        if ( true && !parent)
            throw new DebugError("can not move to back: object is detached");
        var parentArray = parent._children;
        var index = parentArray.indexOf(this.model);
        if ( true && index === -1)
            throw new DebugError("can not move to front: object is not belong to current scene");
        parentArray.splice(index, 1);
        parentArray.unshift(this.model);
    };
    ParentChildDelegate.prototype.findChildById = function (id) {
        if (true) {
            if (!id)
                throw new DebugError("illegal argument: ".concat(id));
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
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var c = _a[_i];
            c.render();
        }
        renderer.afterItemStackDraw(layerStatePointer);
    };
    return Layer;
}());


;// CONCATENATED MODULE: ./engine/misc/object.ts
var isString = function (s) {
    return (s === null || s === void 0 ? void 0 : s.substr) !== undefined;
};
var isCommonArray = function (a) {
    return a.length !== undefined;
};
var isTypedArray = function (a) {
    return !!(a.buffer);
};
var isArray = function (a) {
    return isCommonArray(a) || isTypedArray(a);
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
    for (var i = 0, max = a.length; i < max; i++) {
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

;// CONCATENATED MODULE: ./engine/misc/releaseableEntity.ts
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


;// CONCATENATED MODULE: ./engine/geometry/abstract/observableEntity.ts



var ObservableEntity = (function (_super) {
    __extends(ObservableEntity, _super);
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
        removeFromArray(this._onChanged, function (it) { return it === f; });
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
}(ReleaseableEntity));


;// CONCATENATED MODULE: ./engine/renderer/common/color.ts



var alignTo2Symbols = function (val) {
    if (val.length === 1)
        return "0" + val;
    return val;
};
var Color = (function (_super) {
    __extends(Color, _super);
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
                throw new DebugError("wrong rgb color values: ".concat(r, ",").concat(g, ",").concat(b));
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
                throw new DebugError("the color is friezed and can no be changed");
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
}(ObservableEntity));


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
            throw new DebugError("loop property need to be set to true if numOfLoops is specified");
        }
        if ( true && tweenDesc.loop === undefined && tweenDesc.yoyo !== undefined) {
            throw new DebugError("loop property need to be set to true if yoyo is true");
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
                this._currentLoop++;
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
                if (!(key in _this._target)) {
                    console.error('target', _this._target);
                    throw new DebugError("Can not create tween animation: property \"".concat(String(key), "\" does not belong to target object"));
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
                throw new DebugError("can not create timer with negative interval: ".concat(interval));
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
        removeFromArray(this.parent.getTimers(), function (it) { return it === _this; });
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
                throw new DebugError("can not remove event listener ".concat(eventName, ", it does not belong to this eventEmitter"));
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
    return "can not listen ".concat(controlName, " events: ").concat(controlName, " control is not added;\ninvoke \"game.addControl(").concat(controlClassName, ");\"");
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


;// CONCATENATED MODULE: ./engine/misc/objectPool.ts

var ObjectPool = (function () {
    function ObjectPool(Class, numberOfInstances) {
        if (numberOfInstances === void 0) { numberOfInstances = 32; }
        this.Class = Class;
        this.numberOfInstances = numberOfInstances;
        this._ptr = 0;
        this._pool = [];
        if ( true && !Class)
            throw new DebugError("can not instantiate ObjectPool: class not provided in constructor");
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
        for (var i = 0; i < this._ptr; i++) {
            var possible = this._getFreeObjectAt(i);
            if (possible !== undefined) {
                this._ptr = (++i) % this.numberOfInstances;
                return possible;
            }
        }
        if ( true && !silently) {
            console.trace(this._pool);
            throw new DebugError("can not get free object: no free object in pool");
        }
        return undefined;
    };
    ObjectPool.prototype.releaseObject = function (obj) {
        var indexOf = obj.getCapturedIndex();
        if ( true && indexOf === -1) {
            throw new DebugError("can not release the object: it does not belong to the pool");
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


;// CONCATENATED MODULE: ./engine/geometry/point2d.ts





var Point2d = (function (_super) {
    __extends(Point2d, _super);
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
        return Point2d.pool.getFreeObject();
    };
    Point2d.toPool = function (obj) {
        return Point2d.pool.releaseObject(obj);
    };
    Point2d.prototype.setXY = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = x; }
        if ( true && (isNotNumber(x) || isNotNumber(y))) {
            console.trace();
            throw new DebugError("Point2d: wrong numeric arguments ".concat(x, ",").concat(y));
        }
        var changed = this._x !== x || this._y !== y;
        if (changed) {
            this._x = x;
            this._y = y;
            this._arr[0] = this._x;
            this._arr[1] = this._y;
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
    Point2d.prototype.substract = function (another) {
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
    Point2d.prototype.equal = function (x, y) {
        if (y === void 0) { y = x; }
        return this._x === x && this._y === y;
    };
    Point2d.prototype.equalPoint = function (point) {
        return this.equal(point.x, point.y);
    };
    Point2d.prototype.clone = function () {
        return new Point2d(this._x, this._y);
    };
    Point2d.prototype.fromJSON = function (json) {
        this.setXY(json.x, json.y);
    };
    Point2d.prototype.toJSON = function () {
        return { x: this._x, y: this._y };
    };
    Point2d.prototype.toArray = function () {
        return this._arr;
    };
    Point2d.pool = new ObjectPool(Point2d, 4);
    return Point2d;
}(ObservableEntity));


;// CONCATENATED MODULE: ./engine/geometry/vec4.ts



var Vec4;
(function (Vec4) {
    var Vec4Holder = (function (_super) {
        __extends(Vec4Holder, _super);
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
        Vec4Holder.pool = new ObjectPool(Vec4Holder, 32);
        return Vec4Holder;
    }(ReleaseableEntity));
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
        __extends(Mat16Holder, _super);
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
        Mat16Holder.m16hPool = new ObjectPool(Mat16Holder, Infinity);
        return Mat16Holder;
    }(ReleaseableEntity));
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
                throw new DebugError("Can not create ortho matrix with wrong parameters");
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
        var r = out.mat16;
        var a = aHolder.mat16;
        var b = bHolder.mat16;
        var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
        var a9 = a[9], a10 = a[10], a11 = a[11], a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
        var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
        var b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
        r[0] = a0 * b0 + a1 * b4 + a2 * b8 + a3 * b12;
        r[1] = a0 * b1 + a1 * b5 + a2 * b9 + a3 * b13;
        r[2] = a0 * b2 + a1 * b6 + a2 * b10 + a3 * b14;
        r[3] = a0 * b3 + a1 * b7 + a2 * b11 + a3 * b15;
        r[4] = a4 * b0 + a5 * b4 + a6 * b8 + a7 * b12;
        r[5] = a4 * b1 + a5 * b5 + a6 * b9 + a7 * b13;
        r[6] = a4 * b2 + a5 * b6 + a6 * b10 + a7 * b14;
        r[7] = a4 * b3 + a5 * b7 + a6 * b11 + a7 * b15;
        r[8] = a8 * b0 + a9 * b4 + a10 * b8 + a11 * b12;
        r[9] = a8 * b1 + a9 * b5 + a10 * b9 + a11 * b13;
        r[10] = a8 * b2 + a9 * b6 + a10 * b10 + a11 * b14;
        r[11] = a8 * b3 + a9 * b7 + a10 * b11 + a11 * b15;
        r[12] = a12 * b0 + a13 * b4 + a14 * b8 + a15 * b12;
        r[13] = a12 * b1 + a13 * b5 + a14 * b9 + a15 * b13;
        r[14] = a12 * b2 + a13 * b6 + a14 * b10 + a15 * b14;
        r[15] = a12 * b3 + a13 * b7 + a14 * b11 + a15 * b15;
    };
    Mat4.multVecByMatrix = function (out, matrix, vec4Arr) {
        var vec4Arr_vec4_0 = vec4Arr.vec4[0];
        var vec4Arr_vec4_1 = vec4Arr.vec4[1];
        var vec4Arr_vec4_2 = vec4Arr.vec4[2];
        var vec4Arr_vec4_3 = vec4Arr.vec4[3];
        var mat16 = matrix.mat16;
        for (var i = 0; i < 4; i++) {
            out.vec4[i] =
                vec4Arr_vec4_0 * mat16[0 + i] +
                    vec4Arr_vec4_1 * mat16[4 + i] +
                    vec4Arr_vec4_2 * mat16[2 * 4 + i] +
                    vec4Arr_vec4_3 * mat16[3 * 4 + i];
        }
    };
    Mat4.inverse = function (out, mHolder) {
        var r = out.mat16;
        var m = mHolder.mat16;
        var m0 = m[0], m1 = m[1], m2 = m[2], m3 = m[3], m4 = m[4], m5 = m[5], m6 = m[6], m7 = m[7];
        var m8 = m[8], m9 = m[9], m10 = m[10], m11 = m[11], m12 = m[12], m13 = m[13], m14 = m[14], m15 = m[15];
        r[0] = m5 * m10 * m15 - m5 * m14 * m11 - m6 * m9 * m15 + m6 * m13 * m11 + m7 * m9 * m14 - m7 * m13 * m10;
        r[1] = -m1 * m10 * m15 + m1 * m14 * m11 + m2 * m9 * m15 - m2 * m13 * m11 - m3 * m9 * m14 + m3 * m13 * m10;
        r[2] = m1 * m6 * m15 - m1 * m14 * m7 - m2 * m5 * m15 + m2 * m13 * m7 + m3 * m5 * m14 - m3 * m13 * m6;
        r[3] = -m1 * m6 * m11 + m1 * m10 * m7 + m2 * m5 * m11 - m2 * m9 * m7 - m3 * m5 * m10 + m3 * m9 * m6;
        r[4] = -m4 * m10 * m15 + m4 * m14 * m11 + m6 * m8 * m15 - m6 * m12 * m11 - m7 * m8 * m14 + m7 * m12 * m10;
        r[5] = m0 * m10 * m15 - m0 * m14 * m11 - m2 * m8 * m15 + m2 * m12 * m11 + m3 * m8 * m14 - m3 * m12 * m10;
        r[6] = -m0 * m6 * m15 + m0 * m14 * m7 + m2 * m4 * m15 - m2 * m12 * m7 - m3 * m4 * m14 + m3 * m12 * m6;
        r[7] = m0 * m6 * m11 - m0 * m10 * m7 - m2 * m4 * m11 + m2 * m8 * m7 + m3 * m4 * m10 - m3 * m8 * m6;
        r[8] = m4 * m9 * m15 - m4 * m13 * m11 - m5 * m8 * m15 + m5 * m12 * m11 + m7 * m8 * m13 - m7 * m12 * m9;
        r[9] = -m0 * m9 * m15 + m0 * m13 * m11 + m1 * m8 * m15 - m1 * m12 * m11 - m3 * m8 * m13 + m3 * m12 * m9;
        r[10] = m0 * m5 * m15 - m0 * m13 * m7 - m1 * m4 * m15 + m1 * m12 * m7 + m3 * m4 * m13 - m3 * m12 * m5;
        r[11] = -m0 * m5 * m11 + m0 * m9 * m7 + m1 * m4 * m11 - m1 * m8 * m7 - m3 * m4 * m9 + m3 * m8 * m5;
        r[12] = -m4 * m9 * m14 + m4 * m13 * m10 + m5 * m8 * m14 - m5 * m12 * m10 - m6 * m8 * m13 + m6 * m12 * m9;
        r[13] = m0 * m9 * m14 - m0 * m13 * m10 - m1 * m8 * m14 + m1 * m12 * m10 + m2 * m8 * m13 - m2 * m12 * m9;
        r[14] = -m0 * m5 * m14 + m0 * m13 * m6 + m1 * m4 * m14 - m1 * m12 * m6 - m2 * m4 * m13 + m2 * m12 * m5;
        r[15] = m0 * m5 * m10 - m0 * m9 * m6 - m1 * m4 * m10 + m1 * m8 * m6 + m2 * m4 * m9 - m2 * m8 * m5;
        var det = m0 * r[0] + m1 * r[4] + m2 * r[8] + m3 * r[12];
        if ( true && det === 0) {
            console.error(m);
            throw new DebugError("can not invert matrix with zero determinant");
        }
        for (var i = 0; i < 16; i++)
            r[i] /= det;
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

;// CONCATENATED MODULE: ./engine/geometry/rect.ts





var Rect = (function (_super) {
    __extends(Rect, _super);
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
        return Rect.rectPool.getFreeObject();
    };
    Rect.toPool = function (obj) {
        return Rect.rectPool.releaseObject(obj);
    };
    Rect.prototype.setXYWH = function (x, y, width, height) {
        if ( true &&
            (isNotNumber(x) ||
                isNotNumber(y) ||
                isNotNumber(width) ||
                isNotNumber(height)))
            throw new DebugError("Rect: wrong numeric arguments ".concat(x, ",").concat(y, ",").concat(width, ",").concat(height));
        var oldX = this._x;
        var oldY = this._y;
        var oldW = this._width;
        var oldH = this._height;
        var changed = oldX !== x || oldY !== y || oldW !== width || oldH !== height;
        if (changed) {
            this._x = x;
            this._y = y;
            this._width = width;
            this._height = height;
            this._right = this._x + this._width;
            this._bottom = this._y + this._height;
            this._arr[0] = this._x;
            this._arr[1] = this._y;
            this._arr[2] = this._width;
            this._arr[3] = this._height;
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
    Rect.prototype.set = function (another) {
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
    Rect.prototype.fromJSON = function (jsonObj) {
        this.setXYWH(jsonObj.x, jsonObj.y, jsonObj.width, jsonObj.height);
    };
    Rect.rectPool = new ObjectPool(Rect);
    return Rect;
}(ObservableEntity));


;// CONCATENATED MODULE: ./engine/geometry/size.ts





var Size = (function (_super) {
    __extends(Size, _super);
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
            if ( true && isNotNumber(val)) {
                console.trace();
                throw new DebugError("Size.width: wrong numeric argument  ".concat(val));
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
            if ( true && isNotNumber(val)) {
                console.trace();
                throw new DebugError("Size.height: wrong numeric argument  ".concat(val));
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
        return Size.rectPool.getFreeObject();
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
        if ( true && (isNotNumber(width) || isNotNumber(width))) {
            console.trace();
            throw new DebugError("Size.setWH: wrong numeric argument (".concat(width, ",").concat(height, ")"));
        }
        var changed = this._width !== width || this._height !== height;
        if (changed) {
            this._width = width;
            this._height = height;
            this._arr[0] = this._width;
            this._arr[1] = this._height;
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
    Size.rectPool = new ObjectPool(Size);
    return Size;
}(ObservableEntity));


;// CONCATENATED MODULE: ./engine/geometry/point3d.ts




var Point3d = (function (_super) {
    __extends(Point3d, _super);
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
    Point3d.prototype.setXYZ = function (x, y, z) {
        if (y === void 0) { y = x; }
        if (z === void 0) { z = y; }
        this.x = x;
        this.y = y;
        if ( true && (isNotNumber(z))) {
            console.trace();
            throw new DebugError("Point3d: wrong numeric arguments ".concat(x, ",").concat(y, ",").concat(z));
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
    return Point3d;
}(Point2d));


;// CONCATENATED MODULE: ./engine/core/baseModel.ts



var BaseModel = (function () {
    function BaseModel(game) {
        this.game = game;
        this.size = new Size();
        this.pos = new Point3d(0, 0, 0);
        if ( true && !game)
            throw new DebugError("can not create model '".concat(this.type, "': game instance not passed to model constructor"));
    }
    return BaseModel;
}());


;// CONCATENATED MODULE: ./engine/renderable/abstract/transformableModel.ts






var Mat16Holder = Mat4.Mat16Holder;

var AnglePoint3d = (function (_super) {
    __extends(AnglePoint3d, _super);
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
}(ObservableEntity));
var ModelPoint2d = (function (_super) {
    __extends(ModelPoint2d, _super);
    function ModelPoint2d(model) {
        var _this = _super.call(this) || this;
        _this.model = model;
        return _this;
    }
    ModelPoint2d.prototype.setToCenter = function () {
        this.model.revalidate();
        if ( true && !(this.model.size.width && this.model.size.height))
            throw new DebugError("can not set anchor to center: width or height of transformable object is not set");
        this.setXY(this.model.size.width / 2, this.model.size.height / 2);
    };
    return ModelPoint2d;
}(Point2d));
var TransformableModel = (function (_super) {
    __extends(TransformableModel, _super);
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
        renderer.transformTranslate(-this.transformPoint.x, -this.transformPoint.y);
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
    __extends(MouseEventEmitterDelegate, _super);
    function MouseEventEmitterDelegate(game, model) {
        var _this = _super.call(this, game) || this;
        _this.model = model;
        return _this;
    }
    MouseEventEmitterDelegate.prototype.on = function (eventName, callBack) {
        if (true) {
            if (!this.game.hasControl('MouseControl'))
                throw new DebugError(getControlErrorMessage('mouse', 'MouseControl'));
        }
        this.model.interactive = true;
        return _super.prototype.on.call(this, eventName, callBack);
    };
    return MouseEventEmitterDelegate;
}(EventEmitterDelegate));


;// CONCATENATED MODULE: ./engine/renderable/abstract/renderableModel.ts












var EMPTY_FILTERS_ARR = [];
var RenderableModel = (function (_super) {
    __extends(RenderableModel, _super);
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
        _this._destRect = new Rect();
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
    RenderableModel.prototype.getDestRect = function () {
        this._destRect.setPoint(this.pos);
        this._destRect.setSize(this.size);
        return this._destRect;
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
    RenderableModel.prototype.getRigidBody = function () {
        return this._rigidBody;
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
            throw new DebugError("can not render destroyed object");
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
        if (this.scale.equal(0))
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
        cloned.filters = __spreadArray([], this.filters, true);
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
                throw new DebugError("can not clone object: cloneable interface is not implemented");
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
    __extends(Shape, _super);
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
        cloned.filters = __spreadArray([], this.filters, true);
        _super.prototype.setClonedProperties.call(this, cloned);
    };
    return Shape;
}(RenderableModel));


;// CONCATENATED MODULE: ./engine/renderable/impl/geometry/rectangle.ts


var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
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
    __extends(RenderingObjectStackItem, _super);
    function RenderingObjectStackItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.constrainObjects = [];
        return _this;
    }
    return RenderingObjectStackItem;
}(ReleaseableEntity));

var pool = new ObjectPool(RenderingObjectStackItem, Infinity);
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
        if (val > max)
            val = max;
        return val;
    };
    MathEx.overlapTest = function (a, b) {
        return (a.x < b.x + b.width) &&
            (a.x + a.width > b.x) &&
            (a.y < b.y + b.height) &&
            (a.y + a.height > b.y);
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

;// CONCATENATED MODULE: ./engine/renderer/camera.ts





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
        this._cameraPosCorrection = {
            current: new Point2d(),
            max: new Point2d()
        };
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
            return;
        }
        this._objFollowTo = gameObject;
        this._objFollowToPrevPos = new Point2d();
        this._objFollowToPrevPos.setFrom(this._objFollowTo.pos);
        this.revalidate();
    };
    Camera.prototype.update = function () {
        var gameObject = this._objFollowTo;
        if (gameObject !== undefined) {
            if ((gameObject.pos.x - this._objFollowToPrevPos.x) > 0)
                this._directionCorrection = 0;
            else if ((gameObject.pos.x - this._objFollowToPrevPos.x) < 0)
                this._directionCorrection = 1;
            if ((gameObject.pos.y - this._objFollowToPrevPos.y) > 0)
                this._directionCorrection = 3;
            else if ((gameObject.pos.y - this._objFollowToPrevPos.y) < 0)
                this._directionCorrection = 2;
            this._objFollowToPrevPos.setFrom(gameObject.pos);
            var _a = this.getRect(), width = _a.width, height = _a.height;
            if (this._directionCorrection === 0)
                this._cameraPosCorrection.max.x = width / 3;
            else if (this._directionCorrection === 1)
                this._cameraPosCorrection.max.x = -width / 3;
            else if (this._directionCorrection === 3)
                this._cameraPosCorrection.max.y = height / 3;
            else if (this._directionCorrection === 2)
                this._cameraPosCorrection.max.y = -height / 3;
            var currCorrection = this._cameraPosCorrection.max.
                substract(this._cameraPosCorrection.current).
                multiply(0.05);
            this._cameraPosCorrection.current.add(currCorrection);
            var newPos = Point2d.fromPool();
            var pointToFollow = Point2d.fromPool();
            var scene = this.scene;
            var w = this.game.size.width;
            var h = this.game.size.height;
            var wDiv2 = w / 2;
            var hDiv2 = h / 2;
            pointToFollow.setFrom(gameObject.pos);
            pointToFollow.addXY(-wDiv2, -hDiv2);
            newPos.x = this.pos.x + (pointToFollow.x + this._cameraPosCorrection.current.x - this.pos.x) * Camera.FOLLOW_FACTOR.x;
            newPos.y = this.pos.y + (pointToFollow.y + this._cameraPosCorrection.current.y - this.pos.y) * Camera.FOLLOW_FACTOR.y;
            if (newPos.x < 0) {
                newPos.x = 0;
            }
            if (newPos.y < 0) {
                newPos.y = 0;
            }
            if (newPos.x > scene.size.width - w) {
                newPos.x = scene.size.width - w;
            }
            if (newPos.y > scene.size.height - h) {
                newPos.y = scene.size.height - h;
            }
            this.pos.setFrom(newPos);
            Point2d.toPool(newPos);
            Point2d.toPool(pointToFollow);
        }
        if (this._cameraShakeTween !== undefined)
            this._cameraShakeTween.update();
    };
    Camera.prototype.shake = function (amplitude, time) {
        var _this = this;
        var tweenTarget = { time: 0, point: new Point2d(0, 0) };
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
        var needTransform = this.angle !== 0 || !this.scale.equal(1);
        if (needTransform) {
            renderer.transformTranslate(this.game.size.width / 2, this.game.size.height / 2, 0);
            renderer.transformRotateZ(this.angle);
            renderer.transformScale(this.scale.x, this.scale.y);
            renderer.transformTranslate(-this.game.size.width / 2, -this.game.size.height / 2);
        }
        if (this._cameraShakeTween !== undefined)
            renderer.transformTranslate(this._cameraShakeTween.getTarget().point.x, this._cameraShakeTween.getTarget().point.y);
    };
    Camera.prototype.screenToWorld = function (p) {
        return Mat4.unproject(p.x, p.y, this.worldTransformMatrix);
    };
    Camera.prototype.getRect = function () {
        this._rect.setXY(this.pos.x, this.pos.y);
        return this._rect;
    };
    Camera.FOLLOW_FACTOR = new Point2d(0.1, 0.1);
    return Camera;
}());


;// CONCATENATED MODULE: ./engine/delegates/eventDelegates/keyboardEventEmitterDelegate.ts



var KeyboardEventEmitterDelegate = (function (_super) {
    __extends(KeyboardEventEmitterDelegate, _super);
    function KeyboardEventEmitterDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KeyboardEventEmitterDelegate.prototype.on = function (eventName, callBack) {
        if (true) {
            if (!this.game.hasControl('KeyboardControl'))
                throw new DebugError(getControlErrorMessage('keyboard', 'KeyboardControl'));
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
    __extends(GamepadEventEmitterDelegate, _super);
    function GamepadEventEmitterDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamepadEventEmitterDelegate.prototype.on = function (eventName, callBack) {
        if (true) {
            if (!this.game.hasControl('GamePadControl'))
                throw new DebugError(getControlErrorMessage('gamepad', 'GamePadControl'));
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
        this.size = new Size();
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
                throw new DebugError("can not remove layer: is doesn't belong to target scene");
            this._layers.splice(i, 1);
        }
        else {
            this.getDefaultLayer().removeChild(modelOrLayer);
        }
    };
    Scene.prototype.appendChild = function (modelOrLayer) {
        if ( true && !modelOrLayer) {
            throw new DebugError("cannot append child, is is ".concat(modelOrLayer));
        }
        if (Scene.isLayerGuard(modelOrLayer)) {
            if ( true && this._layers.indexOf(modelOrLayer) > -1) {
                console.error(modelOrLayer);
                throw new DebugError("this layer is already added to this scene");
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
            this.game.getPhysicsSystem().nextTick(this);
        this.onUpdate();
    };
    return Scene;
}());


;// CONCATENATED MODULE: ./demo/particles2/mainScene.ts




var Particle = (function (_super) {
    __extends(Particle, _super);
    function Particle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.acc_x = 0;
        _this.acc_y = 0;
        _this.vel_x = 0;
        _this.vel_y = 0;
        return _this;
    }
    return Particle;
}(Rectangle));
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainScene.prototype.onUpdate = function () {
        var newParticle = new Particle(this.game);
        newParticle.fillColor = Color.fromRGBNumeric(0x0000ff);
        newParticle.pos.setXY(0, 0);
        newParticle.acc_x = 0;
        newParticle.acc_y = 0.5;
        newParticle.vel_x = Math.random() * 7 + 3;
        newParticle.vel_y = Math.random() * 5;
        this.appendChild(newParticle);
        for (var _i = 0, _a = this.getLayers()[0]._children; _i < _a.length; _i++) {
            var particle = _a[_i];
            if (particle.pos.x > this.size.width) {
                this.removeChild(particle);
            }
            else {
                particle.pos.x += particle.vel_x;
                particle.pos.y += particle.vel_y;
                particle.vel_x += particle.acc_x;
                particle.vel_y += particle.acc_y;
                if (particle.pos.y > this.size.height) {
                    particle.pos.y = this.size.height;
                    particle.vel_y *= -Math.random() * 0.7;
                }
            }
        }
    };
    return MainScene;
}(Scene));


// EXTERNAL MODULE: ./engine/misc/polyfills.ts
var polyfills = __webpack_require__(77519);
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
            throw new DebugError("empty stack");
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
    xhr.open(urlRequest.method, addUrlParameter(urlRequest.url, 'modified', 1656601162156), true);
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.getUrl().indexOf('data:') === 0)
                    return [2, loadBase64(this.urlRequest)];
                else
                    return [2, loadViaXmlHttp(this.urlRequest, this.onProgress)];
                return [2];
            });
        });
    };
    return UrlLoader;
}());


;// CONCATENATED MODULE: ./engine/resources/resourceUtil.ts


var ResourceUtil;
(function (ResourceUtil) {
    var _this = this;
    var loadArrayBuffer = function (req, progress) { return __awaiter(_this, void 0, void 0, function () {
        var iReq, loader;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (req.substr !== undefined) {
                        iReq = { url: req, responseType: 'arraybuffer', method: 'GET' };
                    }
                    else
                        iReq = req;
                    loader = new UrlLoader(iReq);
                    if (progress !== undefined)
                        loader.onProgress = progress;
                    return [4, loader.load()];
                case 1: return [2, _a.sent()];
            }
        });
    }); };
    var createBitmapFromBlob = function (imgBlob) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, globalThis.createImageBitmap(imgBlob)];
        });
    }); };
    var createHTMLImageFromUrl = function (imgUrl, progress) { return __awaiter(_this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            url = imgUrl.url ? imgUrl.url : imgUrl;
            return [2, new Promise(function (resolve, reject) {
                    var img = new window.Image();
                    img.src = url;
                    img.onload = function () {
                        resolve(img);
                    };
                    img.onerror = function (e) {
                        console.error(e);
                        var msg =  true ? "can not create image. Bad url data: ".concat(url) : 0;
                        reject(msg);
                    };
                    img.onprogress = function (e) {
                        if (progress !== undefined)
                            progress(e.loaded / e.total);
                    };
                })];
        });
    }); };
    ResourceUtil.createImageFromData = function (imageData, progress) { return __awaiter(_this, void 0, void 0, function () {
        var isBase64, arrayBuffer, arrayBufferView, imgBlob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isBase64 = imageData.substr !== undefined && imageData.indexOf('data:image/') === 0;
                    if (!isBase64) return [3, 2];
                    return [4, createHTMLImageFromUrl(imageData)];
                case 1: return [2, _a.sent()];
                case 2:
                    if (!(globalThis.createImageBitmap === undefined)) return [3, 4];
                    return [4, createHTMLImageFromUrl(imageData)];
                case 3: return [2, _a.sent()];
                case 4: return [4, loadArrayBuffer(imageData, progress)];
                case 5:
                    arrayBuffer = _a.sent();
                    arrayBufferView = new Uint8Array(arrayBuffer);
                    imgBlob = new Blob([arrayBufferView]);
                    return [4, createBitmapFromBlob(imgBlob)];
                case 6: return [2, _a.sent()];
            }
        });
    }); };
})(ResourceUtil || (ResourceUtil = {}));

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
        throw new DebugError('not implemented');
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
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, _i, _a, task, state_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _loop_1 = function (task) {
                            var taskId, fn, onProgressCallBack, e_1;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        taskId = task.taskId, fn = task.fn;
                                        onProgressCallBack = function (n) { return _this.progressTask(taskId, n); };
                                        _c.label = 1;
                                    case 1:
                                        _c.trys.push([1, 3, , 4]);
                                        return [4, fn(onProgressCallBack)];
                                    case 2:
                                        _c.sent();
                                        return [3, 4];
                                    case 3:
                                        e_1 = _c.sent();
                                        return [2, { value: Promise.reject(e_1) }];
                                    case 4:
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
                        state_1 = _b.sent();
                        if (typeof state_1 === "object")
                            return [2, state_1.value];
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        this._resolved = true;
                        if (this.onProgress !== undefined)
                            this.onProgress(1);
                        return [4, Promise.resolve()];
                    case 5:
                        _b.sent();
                        this.onResolved.forEach(function (f) { return f(); });
                        return [2, Promise.resolve()];
                }
            });
        });
    };
    return Queue;
}());


;// CONCATENATED MODULE: ./engine/renderable/abstract/renderableModelWithTexture.ts



var RenderableModelWithTexture = (function (_super) {
    __extends(RenderableModelWithTexture, _super);
    function RenderableModelWithTexture(game) {
        return _super.call(this, game) || this;
    }
    RenderableModelWithTexture.prototype.setTexture = function (texture) {
        if (true) {
            if (!texture) {
                throw new DebugError("can not set texture: texture passed is undefined");
            }
            if (!texture.size || texture.size.width === 0 || texture.size.height === 0) {
                throw new DebugError("can not set resource texture: wrong texture size: (width: ".concat(texture.size.width, ", height: ").concat(texture.size.height, ")"));
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
    __extends(Image, _super);
    function Image(game, texture) {
        var _this = _super.call(this, game) || this;
        _this.type = 'Image';
        _this.borderRadius = 0;
        _this.offset = new Point2d();
        _this.stretchMode = 0;
        _this.color = Color.NONE.clone();
        _this.lineWidth = 0;
        _this._pixelPerfect = false;
        _this._srcRect = new Rect();
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
        if (this._srcRect.width === 0 || this._srcRect.height === 0)
            this._srcRect.setSize(this.size);
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
    Image.prototype.getSrcRect = function () {
        return this._srcRect;
    };
    Image.prototype.setPixelPerfect = function (val) {
        this._pixelPerfect = val;
    };
    Image.prototype.isPixelPerfect = function () {
        return this._pixelPerfect;
    };
    Image.prototype.setClonedProperties = function (cloned) {
        cloned._srcRect.set(this._srcRect);
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


;// CONCATENATED MODULE: ./engine/renderable/impl/general/font/helpers.ts
var fontAsCss = function (fontSize, fontFamily) {
    return "".concat(fontSize, "px ").concat(fontFamily);
};

;// CONCATENATED MODULE: ./engine/renderable/impl/general/font/factory/fontContextAbstractFactory.ts

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
        var textWidthPlusPadding = textWidth + 2 * this.SYMBOL_PADDING;
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
        return new Font(this.game, fontContext);
    };
    return FontContextAbstractFactory;
}());


;// CONCATENATED MODULE: ./engine/renderable/impl/general/font/factory/fontContextCanvasFactory.ts


var FontContextCanvasFactory = (function (_super) {
    __extends(FontContextCanvasFactory, _super);
    function FontContextCanvasFactory(game, strFont) {
        var _this = _super.call(this, game) || this;
        _this.strFont = strFont;
        var el = document.createElement('canvas');
        _this.measureCanvas = el.getContext('2d');
        _this.measureCanvas.font = strFont;
        return _this;
    }
    FontContextCanvasFactory.prototype.getFontHeight = function () {
        var parent = document.createElement("span");
        parent.appendChild(document.createTextNode("height"));
        document.body.appendChild(parent);
        parent.style.cssText = "font: ".concat(this.strFont, "; white-space: nowrap; display: inline-block;line-height:1em;");
        var height = parent.offsetHeight;
        document.body.removeChild(parent);
        return height;
    };
    FontContextCanvasFactory.prototype.getLetterWidth = function (letter) {
        return ~~this.measureCanvas.measureText(letter).width;
    };
    FontContextCanvasFactory.prototype.texturePageToTexture = function (page) {
        return this.game.getRenderer().createTexture(page.canvas);
    };
    FontContextCanvasFactory.prototype.createTexturePage = function (size) {
        var cnv = document.createElement('canvas');
        cnv.width = size.width;
        cnv.height = size.height;
        var ctx = cnv.getContext('2d');
        ctx.font = this.strFont;
        ctx.textBaseline = 'top';
        ctx.imageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.oImageSmoothingEnabled = false;
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, cnv.width, cnv.height);
        ctx.fillStyle = '#fff';
        return ctx;
    };
    FontContextCanvasFactory.prototype.drawLetter = function (context, letter, x, y) {
        context.fillText(letter, x, y);
    };
    return FontContextCanvasFactory;
}(FontContextAbstractFactory));


;// CONCATENATED MODULE: ./engine/renderable/impl/general/font/createFontMethods/params/createFontParams.ts
var DEFAULT_FONT_PARAMS = {
    fontFamily: 'monospace',
    fontSize: 12
};
var LAT_CHARS = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
var STANDARD_SYMBOLS = '1234567890 ' +
    '"!`?\'.,;:()[]{}<>|/@\\^$-%+=#_&~*';
var CYR_CHARS = 'АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНн' +
    'ОоПпРрСсТтУуФфХхЦцЧчШшЩщ' +
    'ЫыЬьЪъЭэЮюЯя' +
    'ЇїІіЄєҐґ';

;// CONCATENATED MODULE: ./engine/renderable/impl/general/font/createFontMethods/createFontFromCssDescription.ts



var createFontFromCssDescription = function (game, params) {
    var _a, _b, _c, _d;
    var fontFamily = (_a = params.fontFamily) !== null && _a !== void 0 ? _a : DEFAULT_FONT_PARAMS.fontFamily;
    var fontSize = (_b = params.fontSize) !== null && _b !== void 0 ? _b : DEFAULT_FONT_PARAMS.fontSize;
    var cssFontDescription = fontAsCss(fontSize, fontFamily);
    var fontFactory = new FontContextCanvasFactory(game, cssFontDescription);
    return fontFactory.createFont((_c = params.chars) !== null && _c !== void 0 ? _c : (LAT_CHARS + STANDARD_SYMBOLS + CYR_CHARS).split(''), (_d = params.extraChars) !== null && _d !== void 0 ? _d : [], fontFamily, fontSize);
};

;// CONCATENATED MODULE: ./engine/renderable/impl/general/font/createFontMethods/createSystemFont.ts


var _systemFontInstance;
var createSystemFont = function (game) {
    _systemFontInstance =
        _systemFontInstance ||
            createFontFromCssDescription(game, { fontSize: DEFAULT_FONT_PARAMS.fontSize, fontFamily: DEFAULT_FONT_PARAMS.fontFamily });
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
        return createFontFromCssDescription(game, desc);
    };
    Font.getSystemFont = function (game) {
        return createSystemFont(game);
    };
    Font.isDefaultChar = function (char) {
        return char === ' ' || char === '\n';
    };
    Font.prototype.asCss = function () {
        return fontAsCss(this.context.fontSize, this.context.fontFamily);
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
            throw new DebugError("wrong texturePages array");
        }
        if (Font.isDefaultChar(char))
            return this.context.texturePages[0].texture;
        var pageId = this.getSymbolInfoByChar(char).pageId;
        if ( true && (pageId < 0 || pageId > this.context.texturePages.length - 1)) {
            throw new DebugError("wrong page index for character \"".concat(char, "\""));
        }
        var textureWithId = this.context.texturePages.find(function (it) { return it.id === pageId; });
        if ( true && !textureWithId) {
            throw new DebugError("wrong page id: ".concat(pageId));
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


;// CONCATENATED MODULE: ./engine/renderable/impl/general/font/createFontMethods/createFontFromAtlas.ts



var querySelector = function (doc, path, attrName, required) {
    if (required === void 0) { required = false; }
    var res = doc.querySelector(path);
    if ( true && res === undefined) {
        console.error(doc);
        throw new DebugError("can not receive node ".concat(path, " from document"));
    }
    if (res)
        return res.getAttribute(attrName) || '';
    if ( true && required && !res) {
        throw new DebugError("can not create font from atlas: node \"".concat(path, "\" with attribute \"").concat(attrName, "\" is mandatory"));
    }
    return '';
};
var createFontFromAtlas = function (game, texturePages, doc) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, up, right, down, left, _b, spacingHorizontal, spacingVertical, lineHeight, base, fontFamily, fontSize, kerning, context, chars, i, el, id, width, widthAdvanced, height, x, y, xOffset, yOffset, char;
    return __generator(this, function (_c) {
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
        return [2, new Font(game, context)];
    });
}); };

;// CONCATENATED MODULE: ./engine/resources/resourceLoader.ts







var createImageFromData = ResourceUtil.createImageFromData;



var ResourceCache;
(function (ResourceCache) {
    ResourceCache.cache = {};
    ResourceCache.clear = function () {
        var keys = Object.keys(ResourceCache.cache);
        keys.forEach(function (k) { return delete ResourceCache.cache[k]; });
    };
})(ResourceCache || (ResourceCache = {}));
var ResourceLoader = (function () {
    function ResourceLoader(game) {
        this.game = game;
        this.q = new Queue();
        this.game = game;
    }
    ResourceLoader.createUrlLoader = function (req, responseType) {
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
        return __awaiter(this, void 0, void 0, function () {
            var loader, text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loader = ResourceLoader.createUrlLoader(req);
                        if (progressFn !== undefined)
                            loader.onProgress = progressFn;
                        return [4, loader.load()];
                    case 1:
                        text = _a.sent();
                        return [2, postProcess(text)];
                }
            });
        });
    };
    ResourceLoader.mergeUrl = function (pageFile, baseUrl) {
        if (!baseUrl)
            return pageFile;
        if (baseUrl[baseUrl.length - 1] === '/')
            baseUrl = baseUrl.substr(0, baseUrl.length - 1);
        if (pageFile.indexOf('/') === 0)
            pageFile = pageFile.substr(1);
        return "".concat(baseUrl, "/").concat(pageFile);
    };
    ResourceLoader.prototype.loadTexture = function (req, progress) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var fromCache, img;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fromCache = ResourceCache.cache[(_a = req.url) !== null && _a !== void 0 ? _a : req];
                        if (fromCache !== undefined) {
                            return [2, fromCache];
                        }
                        return [4, createImageFromData(req, progress)];
                    case 1:
                        img = _b.sent();
                        return [2, this.game.getRenderer().createTexture(img)];
                }
            });
        });
    };
    ResourceLoader.prototype.loadImage = function (req, progress) {
        return __awaiter(this, void 0, void 0, function () {
            var texture;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadTexture(req, progress)];
                    case 1:
                        texture = _a.sent();
                        return [2, new Image(this.game, texture)];
                }
            });
        });
    };
    ResourceLoader.prototype.loadCubeTexture = function (leftSide, rightSide, topSide, bottomSide, frontSide, backSide, progress) {
        return __awaiter(this, void 0, void 0, function () {
            var currProgress, progressCallBack, imgLeft, imgRight, imgTop, imgBottom, imgFront, imgBack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currProgress = 0;
                        progressCallBack = function (n) {
                            currProgress += n;
                            if (progress !== undefined)
                                progress(n / 6);
                        };
                        return [4, createImageFromData(leftSide, progressCallBack)];
                    case 1:
                        imgLeft = _a.sent();
                        return [4, createImageFromData(rightSide, progressCallBack)];
                    case 2:
                        imgRight = _a.sent();
                        return [4, createImageFromData(topSide, progressCallBack)];
                    case 3:
                        imgTop = _a.sent();
                        return [4, createImageFromData(bottomSide, progressCallBack)];
                    case 4:
                        imgBottom = _a.sent();
                        return [4, createImageFromData(frontSide, progressCallBack)];
                    case 5:
                        imgFront = _a.sent();
                        return [4, createImageFromData(backSide, progressCallBack)];
                    case 6:
                        imgBack = _a.sent();
                        return [2, this.game.getRenderer().createCubeTexture(imgLeft, imgRight, imgTop, imgBottom, imgFront, imgBack)];
                }
            });
        });
    };
    ResourceLoader.prototype.loadText = function (req, progress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, ResourceLoader._loadAndProcessText(req, function (t) { return t; }, progress)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    ResourceLoader.prototype.loadXML = function (xmlParserClass, req, progress) {
        return __awaiter(this, void 0, void 0, function () {
            var text, xmlParser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadText(req, progress)];
                    case 1:
                        text = _a.sent();
                        xmlParser = new xmlParserClass(text);
                        return [2, xmlParser.getTree()];
                }
            });
        });
    };
    ResourceLoader.prototype.loadYAML = function (yamlParserClass, req, progress) {
        return __awaiter(this, void 0, void 0, function () {
            var text, yamlParser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadText(req, progress)];
                    case 1:
                        text = _a.sent();
                        yamlParser = new yamlParserClass(text);
                        return [2, yamlParser.getResult()];
                }
            });
        });
    };
    ResourceLoader.prototype.loadJSON = function (req, progress) {
        return __awaiter(this, void 0, void 0, function () {
            var postPrecessFn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postPrecessFn = function (t) { return JSON.parse(t); };
                        return [4, ResourceLoader._loadAndProcessText(req, postPrecessFn, progress)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    ResourceLoader.prototype.loadSound = function (req, progress) {
        return __awaiter(this, void 0, void 0, function () {
            var loader, buff, url, ref;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loader = ResourceLoader.createUrlLoader(req, 'arraybuffer');
                        if (progress !== undefined)
                            loader.onProgress = progress;
                        return [4, loader.load()];
                    case 1:
                        buff = _a.sent();
                        url = (req.substr !== undefined) ? req : req.url;
                        return [4, this.game.getAudioPlayer().uploadBufferToContext(url, buff)];
                    case 2:
                        ref = _a.sent();
                        return [2, new Sound(this.game, ref)];
                }
            });
        });
    };
    ResourceLoader.prototype.loadBinary = function (req, progress) {
        return __awaiter(this, void 0, void 0, function () {
            var loader;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loader = ResourceLoader.createUrlLoader(req, 'arraybuffer');
                        if (progress !== undefined)
                            loader.onProgress = progress;
                        return [4, loader.load()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    ResourceLoader.prototype.loadFontFromCssDescription = function (params, progress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, createFontFromCssDescription(this.game, params)];
            });
        });
    };
    ResourceLoader.prototype.loadFontFromAtlas = function (baseUrl, doc, progress) {
        return __awaiter(this, void 0, void 0, function () {
            var texturePages, pages, _i, pages_1, page, baseUrlCopy, pageFile, texturePage, pageId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        texturePages = [];
                        pages = doc.querySelectorAll('page');
                        if ( true && !pages.length)
                            throw new DebugError("no 'page' node");
                        _i = 0, pages_1 = pages;
                        _a.label = 1;
                    case 1:
                        if (!(_i < pages_1.length)) return [3, 4];
                        page = pages_1[_i];
                        baseUrlCopy = baseUrl;
                        pageFile = page.getAttribute('file');
                        if ( true && !pageFile)
                            throw new DebugError("no 'file' attribute for 'page' node");
                        if (isString(baseUrlCopy)) {
                            baseUrlCopy = ResourceLoader.mergeUrl(pageFile, baseUrlCopy);
                        }
                        else {
                            baseUrlCopy = __assign({}, baseUrlCopy);
                            baseUrlCopy.url = ResourceLoader.mergeUrl(pageFile, baseUrlCopy.url);
                        }
                        return [4, this.loadTexture(baseUrlCopy, function (n) {
                                if (progress !== undefined)
                                    progress(n / pages.length);
                            })];
                    case 2:
                        texturePage = _a.sent();
                        pageId = +page.getAttribute('id');
                        if ( true && Number.isNaN(pageId))
                            throw new DebugError("wrong page id: ".concat(page.getAttribute('id')));
                        texturePages.push({ texture: texturePage, id: pageId });
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [4, createFontFromAtlas(this.game, texturePages, doc)];
                    case 5: return [2, _a.sent()];
                }
            });
        });
    };
    ResourceLoader.prototype.loadFontFromAtlasUrl = function (baseUrl, docFileName, docParser, progress) {
        return __awaiter(this, void 0, void 0, function () {
            var docUrl, plainText, parser, doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isString(baseUrl)) {
                            docUrl = ResourceLoader.mergeUrl(docFileName, baseUrl);
                        }
                        else {
                            docUrl = __assign(__assign({}, baseUrl), { url: ResourceLoader.mergeUrl(docFileName, baseUrl.url) });
                        }
                        return [4, this.loadText(docUrl, function (n) { return progress && progress(n / 2); })];
                    case 1:
                        plainText = _a.sent();
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.q.start()];
            });
        });
    };
    ResourceLoader.prototype.clearCache = function () {
        ResourceCache.clear();
    };
    ResourceLoader.prototype.isResolved = function () {
        return this.q.isResolved();
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
            throw new DebugError("cannot add next task: invoke scheduleStart firstly");
        }
        this.resourceLoader.addNextTask(task);
    };
    TaskQueue.prototype.getLoader = function () {
        return this.resourceLoader;
    };
    TaskQueue.prototype.scheduleStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
        this.timeSpan = 0;
        this.frames = 0;
        this._fps = 0;
    }
    FpsCounter.prototype.enterFrame = function (deltaTime) {
        this.frames++;
        this.timeSpan += deltaTime;
        if (this.timeSpan > 1000) {
            this._fps = ~~(1000 * this.frames / this.timeSpan);
            this.frames = 0;
            this.timeSpan = 0;
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
        this.size = new Size();
        this.scale = new Point2d(1, 1);
        this.pos = new Point2d(0, 0);
        this._scaleStrategy = 1;
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
        this._scaleStrategy = scaleStrategy;
        this._startedTime = Date.now();
        this.rootContainerElement = containerElement;
    }
    Object.defineProperty(Game.prototype, "scaleStrategy", {
        get: function () {
            return this._scaleStrategy;
        },
        enumerable: false,
        configurable: true
    });
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
                    throw new DebugError("control with type \"".concat(c.type, "\" added already"));
                }
            }
        }
        this._controls.push(instance);
        instance.listenTo();
    };
    Game.prototype.hasControl = function (type) {
        return this.getControl(type) !== undefined;
    };
    Game.prototype.getControl = function (type) {
        for (var _i = 0, _a = this._controls; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.type === type) {
                return c;
            }
        }
        return undefined;
    };
    Game.prototype.setPhysicsSystem = function (s) {
        this._physicsSystem = new s(this);
    };
    Game.prototype.getPhysicsSystem = function () {
        if ( true && this._physicsSystem === undefined)
            throw new DebugError("Physics system is not initialized.");
        return this._physicsSystem;
    };
    Game.prototype.hasPhysicsSystem = function () {
        return this._physicsSystem !== undefined;
    };
    Game.prototype.setAudioPLayer = function (p) {
        this._audioPlayer = new p(this);
    };
    Game.prototype.getAudioPlayer = function () {
        if ( true && !this._audioPlayer) {
            throw new DebugError('audio player is not set');
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
    Game.prototype.getRenderer = function () {
        return this._renderer;
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
            var resourceLoader = taskQueue_1.getLoader();
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
            throw new DebugError("can not pop scene: no scene in stack");
        var transition = last.transition ? last.transition.getOppositeTransition() : undefined;
        var prevScene = this._sceneStack.getLast().scene;
        this.runScene(prevScene, transition);
    };
    Game.prototype.getCurrentScene = function () {
        if ( true && !this._currScene)
            throw new DebugError("current scene is not set yet");
        return this._currScene;
    };
    Game.prototype.update = function () {
        if (this._destroyed)
            return;
        this._lastTime = this._currTime;
        this._currTime = Date.now();
        var currTimeCopy = this._currTime;
        if (!this._lastTime)
            this._lastTime = this._currTime;
        this._deltaTime = this._currTime - this._lastTime;
        var dt = this._deltaTime;
        if (true) {
            var renderError = this._renderer.getError();
            if (renderError !== undefined) {
                throw new DebugError("rendering error with code ".concat(renderError.code, " (").concat(renderError.desc, ")"));
            }
        }
        var numOfLoops = (~~(this._deltaTime / Game._UPDATE_TIME_RATE)) || 1;
        this._currTime = this._currTime - numOfLoops * Game._UPDATE_TIME_RATE;
        var currentScene = this._currScene;
        var loopCnt = 0;
        do {
            this._lastTime = this._currTime;
            this._currTime += Game._UPDATE_TIME_RATE;
            this._deltaTime = this._currTime - this._lastTime;
            if (this._currSceneTransition !== undefined)
                this._currSceneTransition.update();
            else
                currentScene.update();
            for (var _i = 0, _a = this._controls; _i < _a.length; _i++) {
                var c = _a[_i];
                c.update();
            }
            loopCnt++;
            if (loopCnt > 10) {
                this._lastTime = this._currTime = currTimeCopy;
                break;
            }
        } while (loopCnt < numOfLoops);
        this._deltaTime = dt;
        if (this._currSceneTransition !== undefined)
            this._currSceneTransition.render();
        else
            currentScene.render();
        if (true) {
            this._fpsCounter.enterFrame(this._deltaTime);
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
            throw new DebugError("game renderer is not set");
    };
    Game._UPDATE_TIME_RATE = 20;
    return Game;
}());

if (true) {
    if (!window.__POLYFILLS_INCLUDED__)
        throw new DebugError("polyfills module is not included!");
}
if (true) {
    var now = Date.now();
    var passed = now - 1656601119530;
    console.log("last compiled ".concat(passed / 1000, " sec ago, ").concat('dev (193592)'));
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

;// CONCATENATED MODULE: ./engine/renderer/webGl/base/shaderProgramUtils.ts

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
            throw new DebugError("can not compile shader: shader source not specified for type ".concat(shaderType));
    }
    var shader = gl.createShader(shaderType);
    if ( true && !shader)
        throw new DebugError("can not allocate memory for shader: gl.createShader(shaderType)");
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
                throw new DebugError("Error compiling shader: ".concat(errorMsg_1 ? errorMsg_1 : lastError));
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
        throw new DebugError("can not allocate memory for gl.createProgram()");
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
                throw new DebugError("Error in program linking. Last error \"".concat(lastError, "\", status: ").concat(status_1));
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
        throw new DebugError("bad uniform name: \"".concat(s, "\", check spaces!"));
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
            throw new DebugError("can not receive active uniforms info: gl.getActiveUniform()");
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
            throw new DebugError("can not receive active attribute info: gl.getActiveAttrib()");
        var location_2 = gl.getAttribLocation(glProgram, attrData.name);
        if ( true && location_2 < 0) {
            console.log(program);
            throw new DebugError("error finding attribute location: ".concat(attrData.name));
        }
        attrMap[attrData.name] = location_2;
    }
    return attrMap;
};
var shaderProgramUtils_isNumber = function (val) {
    if (false)
        {}
    if (isNaN(parseFloat(String(val))) || !isFinite(Number(val)))
        throw new DebugError("can not set uniform with value ".concat(val, ": expected argument of type number"));
    else
        return true;
};
var isInteger = function (val) {
    if (false)
        {}
    shaderProgramUtils_isNumber(val);
    if (val !== ~~val)
        throw new DebugError("can not set uniform with value ".concat(val, ": expected argument of integer type, but ").concat(val, " found"));
    else
        return true;
};
var isBoolean = function (val) {
    if (false)
        {}
    if (!(val === true || val === false))
        throw new DebugError("can not set uniform with value ".concat(val, ": expected argument of boolean type, but ").concat(val, " found"));
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
                if (shaderProgramUtils_isNumber(value))
                    gl.uniform1f(location, value);
            };
            case GL_TYPE.FLOAT_VEC2: return function (gl, location, value) {
                if (isArrayOfType(value, shaderProgramUtils_isNumber, 2))
                    gl.uniform2f(location, value[0], value[1]);
            };
            case GL_TYPE.FLOAT_VEC3: return function (gl, location, value) {
                if (isArrayOfType(value, shaderProgramUtils_isNumber, 3))
                    gl.uniform3f(location, value[0], value[1], value[2]);
            };
            case GL_TYPE.FLOAT_VEC4: return function (gl, location, value) {
                if (isArrayOfType(value, shaderProgramUtils_isNumber, 4))
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
                if (isArrayOfType(value, shaderProgramUtils_isNumber, 2 * 2))
                    gl.uniformMatrix2fv(location, false, value);
            };
            case GL_TYPE.FLOAT_MAT3: return function (gl, location, value) {
                if (isArrayOfType(value, shaderProgramUtils_isNumber, 3 * 3))
                    gl.uniformMatrix3fv(location, false, value);
            };
            case GL_TYPE.FLOAT_MAT4: return function (gl, location, value) {
                if (isArrayOfType(value, shaderProgramUtils_isNumber, 4 * 4))
                    gl.uniformMatrix4fv(location, false, value);
            };
            case GL_TYPE.SAMPLER_2D: return function (gl, location, value) {
                if (shaderProgramUtils_isNumber(value))
                    gl.uniform1i(location, value);
            };
            case GL_TYPE.SAMPLER_CUBE: return function (gl, location, value) {
                if (shaderProgramUtils_isNumber(value))
                    gl.uniform1i(location, value);
            };
            default:
                if (true)
                    throw new DebugError("can not set uniform for type ".concat(type, " and size ").concat(size));
                break;
        }
    }
    else {
        switch (type) {
            case GL_TYPE.FLOAT: return function (gl, location, value) {
                if (isArrayOfType(value, shaderProgramUtils_isNumber, size))
                    gl.uniform1fv(location, value);
            };
            case GL_TYPE.FLOAT_VEC2: return function (gl, location, value) {
                if (isArrayOfType(value, shaderProgramUtils_isNumber, size * 2))
                    gl.uniform2fv(location, value);
            };
            case GL_TYPE.FLOAT_VEC3: return function (gl, location, value) {
                if (isArrayOfType(value, shaderProgramUtils_isNumber, size * 3))
                    gl.uniform3fv(location, value);
            };
            case GL_TYPE.FLOAT_VEC4: return function (gl, location, value) {
                if (isArrayOfType(value, shaderProgramUtils_isNumber, size * 4))
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
                    throw new DebugError("can not set uniform for type ".concat(type, " and size ").concat(size));
                break;
        }
    }
    throw new Error();
};

;// CONCATENATED MODULE: ./engine/renderer/webGl/base/shaderProgram.ts


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
            throw new DebugError("no uniform name was provided!");
        }
        var uniformWrapper = this._uniforms[name];
        if ( true && !uniformWrapper) {
            if (this._uniformSourceNames.indexOf(name) > -1) {
                return;
            }
            console.error('uniforms', this._uniforms);
            throw new DebugError("no uniform with name ".concat(name, " found!"));
        }
        if (true) {
            if (ShaderProgram.currentProgram !== this) {
                console.error(this);
                throw new DebugError("can not set uniform: target program is inactive");
            }
        }
        uniformWrapper.setter(this._gl, uniformWrapper.location, value);
    };
    ShaderProgram.prototype.bindVertexBuffer = function (buffer) {
        var attrName = buffer.getAttrName();
        if (true) {
            if (!attrName)
                throw new DebugError("can not find attribute location: attrName not defined");
            if (this._attributes[attrName] === undefined) {
                if (this._attributeSourceNames.indexOf(attrName) > -1) {
                    return;
                }
                console.log(this);
                throw new DebugError("can not find attribute location for  ".concat(attrName));
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
            throw new DebugError("unbind error: can not find attribute location for ".concat(attrName));
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


;// CONCATENATED MODULE: ./engine/renderer/webGl/programs/abstract/abstractPainter.ts



var AbstractPainter = (function () {
    function AbstractPainter(gl) {
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
        if (isCommonArray(value)) {
            this.setUniformVector(name, value);
        }
        else {
            this.setUniformScalar(name, value);
        }
    };
    AbstractPainter.prototype.setUniformScalar = function (name, value) {
        if ( true && !name) {
            console.trace();
            throw new DebugError("can not set uniform with value ".concat(value, ": name is not provided"));
        }
        if ( true && value === null || value === undefined) {
            console.trace();
            throw new DebugError("can not set uniform with name ".concat(name, " and value ").concat(value));
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
            throw new DebugError("can not set uniform with value ".concat(value, ": name is not provided"));
        }
        if ( true && value === null || value === undefined) {
            console.trace();
            throw new DebugError("can not set uniform with name ".concat(name, " and value ").concat(value));
        }
        if (!this.uniformCache.has(name)) {
            this.uniformCache.put(name, { value: new Float32Array(value.length), dirty: true });
        }
        var uniformInCache = this.uniformCache.get(name);
        var arr = uniformInCache.value;
        if (dirtyFlag || !isEqualArray(arr, value)) {
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
            throw new DebugError("can not find bound texture: out of range: index:".concat(i, ", length:").concat(this.texturesToBind.length));
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
            throw new DebugError("can not init painter: initProgram method must be invoked!");
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
            throw new DebugError("can not bind VertexBuffer, it is already destroyed");
    };
    AbstractBuffer.prototype.destroy = function () {
        this._destroyed = true;
    };
    AbstractBuffer.prototype.isDestroyed = function () {
        return this._destroyed;
    };
    return AbstractBuffer;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/vertexBuffer.ts



var VertexBuffer = (function (_super) {
    __extends(VertexBuffer, _super);
    function VertexBuffer(_gl) {
        var _this = _super.call(this) || this;
        _this._gl = _gl;
        _this.dataLength = 0;
        if ( true && !_gl)
            throw new DebugError("can not create VertexBuffer, gl context not passed to the constructor, expected: new VertexBuffer(gl), found expected: new VertexBuffer(".concat(_gl, ")"));
        _this.buffer = _gl.createBuffer();
        if ( true && !_this.buffer)
            throw new DebugError("can not allocate memory for vertex buffer");
        return _this;
    }
    VertexBuffer.prototype.setData = function (desc, drawMethod) {
        if (drawMethod === void 0) { drawMethod = this._gl.STATIC_DRAW; }
        if (true) {
            if (!desc)
                throw new DebugError("can not set data to vertex buffer: wrong desc parameter: ".concat(desc));
            if (!desc.array)
                throw new DebugError('can not set data to vertex buffer: bufferData is not specified');
            if (!desc.type)
                throw new DebugError('can not set data to vertex buffer: itemType is not specified');
            if (!desc.size)
                throw new DebugError('can not set data to vertex buffer: itemSize is not specified');
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


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/indexBuffer.ts



var IndexBuffer = (function (_super) {
    __extends(IndexBuffer, _super);
    function IndexBuffer(_gl) {
        var _this = _super.call(this) || this;
        _this._gl = _gl;
        if ( true && !_gl)
            throw new DebugError("can not create IndexBuffer, gl context not passed to constructor, expected: IndexBuffer(gl)");
        _this._buffer = _gl.createBuffer();
        if ( true && !_this._buffer)
            throw new DebugError("can not allocate memory for index buffer");
        return _this;
    }
    IndexBuffer.prototype.setData = function (bufferData) {
        if (true) {
            if (!bufferData)
                throw new DebugError('can not set data to buffer: bufferData not specified');
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

;// CONCATENATED MODULE: ./engine/renderer/webGl/base/bufferInfo.ts




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
        throw new DebugError("unknown drawMethod enum value: ".concat(m));
    }
};
var BufferInfo = (function () {
    function BufferInfo(gl, description) {
        this.miscVertexBuffers = [];
        this.numOfElementsToDraw = 0;
        this._destroyed = false;
        this.gl = gl;
        if ( true && description.drawMethod === undefined)
            throw new DebugError("can not create BufferInfo: drawMethod is not defined");
        this.drawMethod = drawMethodToGlEnum(gl, description.drawMethod);
        if ( true && !description.posVertexInfo)
            throw new DebugError("can not create BufferInfo: posVertexInfo is mandatory");
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
                throw new DebugError("unknown draw method: ".concat(drawMethod, " (").concat(glEnumToString(this.gl, drawMethod), ")"));
        }
    };
    return BufferInfo;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/primitives/abstractPrimitive.ts
var AbstractPrimitive = (function () {
    function AbstractPrimitive() {
        this.vertexItemSize = 3;
    }
    return AbstractPrimitive;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/primitives/plane.ts


var Plane = (function (_super) {
    __extends(Plane, _super);
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


// EXTERNAL MODULE: ./engine/renderer/webGl/programs/impl/base/shape/shape.fragment.glsl
var shape_fragment = __webpack_require__(94432);
// EXTERNAL MODULE: ./engine/renderer/webGl/programs/impl/base/shape/fragment-structures.glsl
var fragment_structures = __webpack_require__(4201);
;// CONCATENATED MODULE: ./engine/renderable/impl/fill/abstract/abstractGradient.ts



var AbstractGradient = (function () {
    function AbstractGradient() {
        this._points = [];
    }
    AbstractGradient.prototype.set = function (g) {
        this._points = __spreadArray([], g._points.map(function (it) { return (__assign({}, it)); }), true);
    };
    AbstractGradient.prototype.setColorAtPosition = function (position, color) {
        if ( true && this._points.length > AbstractGradient.MAX_NUM_OF_GRADIENT_POINTS) {
            throw new DebugError("Maxinum number of gradient points is ".concat(AbstractGradient.MAX_NUM_OF_GRADIENT_POINTS, ",\n                to use more points change AbstractGradient.MAX_NUM_OF_GRADIENT_POINTS before Game instance creation"));
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


;// CONCATENATED MODULE: ./engine/renderer/webGl/programs/misc.ts

var misc_Mat16Holder = Mat4.Mat16Holder;
var zToWMatrix = misc_Mat16Holder.create();
Mat4.makeZToWMatrix(zToWMatrix, 1);
var Z_To_W_MATRIX_SOURCE = zToWMatrix.mat16.join(',');

;// CONCATENATED MODULE: ./engine/renderer/webGl/programs/impl/base/shape/shapePainter.ts












var ShapePainter = (function (_super) {
    __extends(ShapePainter, _super);
    function ShapePainter(gl) {
        var _this = _super.call(this, gl) || this;
        var gen = new ShaderGenerator();
        gen.prependVertexCodeBlock("\n            #define zToW_matrix mat4(".concat(Z_To_W_MATRIX_SOURCE, ")\n        "));
        gen.setVertexMainFn("\n            void main(){\n                v_position = a_position;\n                gl_Position = zToW_matrix * u_projectionMatrix * u_vertexMatrix * a_position;\n            }\n        ");
        _this.u_vertexMatrix = gen.addVertexUniform(GL_TYPE.FLOAT_MAT4, 'u_vertexMatrix');
        _this.u_projectionMatrix = gen.addVertexUniform(GL_TYPE.FLOAT_MAT4, 'u_projectionMatrix');
        _this.a_position = gen.addAttribute(GL_TYPE.FLOAT_VEC4, 'a_position');
        gen.addVarying(GL_TYPE.FLOAT_VEC4, 'v_position');
        gen.prependFragmentCodeBlock(parametrizeString(fragment_structures, {
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


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/abstract/abstractTexture.ts


var isPowerOf2 = function (value) {
    return (value & (value - 1)) === 0;
};
var AbstractTexture = (function () {
    function AbstractTexture(gl) {
        this.gl = gl;
        this.size = new Size(0, 0);
        this._destroyed = false;
        if (true) {
            if (!gl)
                throw new DebugError("can not create Texture, gl context not passed to constructor, expected: Texture(gl)");
            if (!AbstractTexture._MAX_TEXTURE_IMAGE_UNITS) {
                AbstractTexture._MAX_TEXTURE_IMAGE_UNITS = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
                if ( true && !AbstractTexture._MAX_TEXTURE_IMAGE_UNITS) {
                    throw new DebugError("Can not obtain MAX_TEXTURE_IMAGE_UNITS value");
                }
            }
        }
        this.tex = gl.createTexture();
        if ( true && !this.tex)
            throw new DebugError("can not allocate memory for texture");
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
                throw new DebugError("can not bind texture: uniform name was not provided");
            }
            if (i > AbstractTexture._MAX_TEXTURE_IMAGE_UNITS - 1) {
                console.error(this);
                throw new DebugError("can not bind texture with index ".concat(i, ". Max supported value by device is ").concat(AbstractTexture._MAX_TEXTURE_IMAGE_UNITS));
            }
            if (this._destroyed) {
                console.error(this);
                throw new DebugError("can not bind destroyed texture");
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
                    throw new DebugError("unknown interpolation mode ".concat(mode));
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
        var isPowerOfTwo = isPowerOf2(this.size.width) && isPowerOf2(this.size.height);
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


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/texture.ts




var Texture = (function (_super) {
    __extends(Texture, _super);
    function Texture(gl) {
        var _this = _super.call(this, gl) || this;
        _this.samplerType = _this.gl.TEXTURE_2D;
        _this.setRawData(new Uint8Array([0, 0, 0, 255]), 1, 1);
        return _this;
    }
    Texture.prototype.setImage = function (img, size) {
        if (size === void 0) { size = new Size(0, 0); }
        var gl = this.gl;
        if (true) {
            if (!(img || size.width || size.height))
                throw new DebugError("texture.setImage: if image is undefined, width and height must be specified: tex.setImage(null,w,h)");
            var maxSupportedSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            if ( true && !maxSupportedSize)
                throw new DebugError("Can not obtain MAX_TEXTURE_SIZE value");
            if (size.width > maxSupportedSize || size.height > maxSupportedSize) {
                throw new DebugError("can not create texture with size ".concat(size.width, "x").concat(size.height, ", max supported size is ").concat(maxSupportedSize));
            }
        }
        if (img !== undefined)
            this.size.setWH(img.width, img.height);
        else
            this.size.setFrom(size);
        this.beforeOperation();
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
        if (img) {
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
            throw new DebugError("wrong framebuffer state!");
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
                throw new DebugError("unexpected Uint8Array length, expected width*height*4 (".concat(width, "*").concat(height, "*4=").concat(numOfBytes, "), but is found ").concat(data.length));
            }
        }
        var gl = this.gl;
        this.beforeOperation();
        this.size.setWH(width, height);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        this.setFilters();
        this.setInterpolationMode(mode);
        this.afterOperation();
    };
    return Texture;
}(AbstractTexture));


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
            buildAt: 1656601160530,
            embeddedEngine: Device.embeddedEngine,
        });
    };
    Device.isTouch = ('ontouchstart' in window);
    Device.isFrame = window.top !== window.self;
    Device.isIPhone = navigator.platform.toLowerCase().indexOf('iphone') > -1;
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

var ScaleStrategyFitCanvasToScreen = (function () {
    function ScaleStrategyFitCanvasToScreen() {
    }
    ScaleStrategyFitCanvasToScreen.prototype.onResize = function (container, game, renderer) {
        var _a = Device.getScreenResolution(), innerWidth = _a[0], innerHeight = _a[1];
        var canvasRatio = game.size.height / game.size.width;
        var windowRatio = innerHeight / innerWidth;
        var width;
        var height;
        if (windowRatio < canvasRatio) {
            height = innerHeight;
            width = height / canvasRatio;
        }
        else {
            width = innerWidth;
            height = width * canvasRatio;
        }
        game.scale.setXY(width / game.size.width, height / game.size.height);
        game.pos.setXY((innerWidth - width) / 2, (innerHeight - height) / 2);
        container.style.width = width + 'px';
        container.style.height = height + 'px';
        container.style.marginTop = "".concat(game.pos.y, "px");
        renderer.viewPortSize.setWH(width, height);
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
        this.viewPortSize = new Size(this.game.width, this.game.height);
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
    __extends(AbstractCanvasRenderer, _super);
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


// EXTERNAL MODULE: ./engine/renderer/webGl/programs/impl/base/mesh/mesh.fragment.glsl
var mesh_fragment = __webpack_require__(84649);
// EXTERNAL MODULE: ./engine/renderer/webGl/programs/impl/base/mesh/mesh.vertex.glsl
var mesh_vertex = __webpack_require__(70690);
;// CONCATENATED MODULE: ./engine/renderer/webGl/programs/impl/base/mesh/meshPainter.ts









var MeshPainter = (function (_super) {
    __extends(MeshPainter, _super);
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
        _this.u_heightMapFactor = 'u_heightMapFactor';
        _this.program = new ShaderProgram(gl, parametrizeString(mesh_vertex, {
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
    MeshPainter.prototype.setHeightMapFactor = function (val) {
        this.setUniformScalar(this.u_heightMapFactor, val);
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
            throw new DebugError("can not bind modelPainter; bindModel must be invoked firstly");
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
                    throw new DebugError("unknown blend mode: ".concat(blendMode));
                }
                break;
        }
    };
    return Blender;
}());


;// CONCATENATED MODULE: ./engine/renderer/abstract/rendererHelper.ts
var RendererHelper = (function () {
    function RendererHelper(game) {
        this.game = game;
    }
    RendererHelper.prototype.renderSceneToTexture = function (scene, renderTarget) {
        return undefined;
    };
    RendererHelper.prototype.saveRenderTarget = function () {
    };
    RendererHelper.prototype.restoreRenderTarget = function () {
    };
    RendererHelper.prototype.renderModelToTexture = function (m, renderTarget, clear) {
        if (clear === void 0) { clear = false; }
        return undefined;
    };
    RendererHelper.prototype.createRenderTarget = function (game, size) {
        return undefined;
    };
    RendererHelper.prototype.destroyRenderTarget = function (t) { };
    return RendererHelper;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/frameBuffer.ts



var FrameBuffer = (function () {
    function FrameBuffer(_gl, size) {
        this._gl = _gl;
        this._destroyed = false;
        if ( true && !_gl)
            throw new DebugError("can not create FrameBuffer, gl context not passed to constructor, expected: FrameBuffer(gl)");
        this._width = size.width;
        this._height = size.height;
        this.texture = new Texture(_gl);
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
                throw new DebugError("can not bind destroyed frame buffer");
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
            throw new DebugError("can not allocate memory for glRenderBuffer");
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.glRenderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, size.width, size.height);
        this.glFrameBuffer = gl.createFramebuffer();
        if ( true && !this.glFrameBuffer)
            throw new DebugError("can not allocate memory for glFrameBuffer");
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFrameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.getGlTexture(), 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.glRenderBuffer);
        var fbStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if ( true && fbStatus !== gl.FRAMEBUFFER_COMPLETE) {
            throw new DebugError("frame buffer status error: ".concat(fbStatus, " (expected gl.FRAMEBUFFER_COMPLETE(").concat(gl.FRAMEBUFFER_COMPLETE, "))"));
        }
        this.texture.unbind();
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };
    FrameBuffer.prototype._checkBound = function () {
        if (false)
            {}
        if (FrameBuffer.currentBuffer !== this)
            throw new DebugError("frame buffer is not bound; call bind() method firstly");
    };
    return FrameBuffer;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/doubleFrameBuffer.ts

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
        for (var i = 1; i < len; i++) {
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


;// CONCATENATED MODULE: ./engine/renderer/webGl/programs/impl/base/simpleRect/simpleRectPainter.ts








var SimpleRectPainter = (function (_super) {
    __extends(SimpleRectPainter, _super);
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
                throw new DebugError("can not init simpleRectPainter instance: ShaderGenerator must be created");
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


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/frameBufferStack.ts







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
            this._stackPointer++;
        }
        else {
            this._getLast().frameBuffer.bind();
        }
        return prevPointer;
    };
    FrameBufferStack.prototype.bind = function () {
        this._getLast().frameBuffer.bind();
    };
    FrameBufferStack.prototype.clear = function (color, alphaBlend) {
        for (var _i = 0, _a = this._stack; _i < _a.length; _i++) {
            var b = _a[_i];
            b.frameBuffer.bind();
            b.frameBuffer.clear(color, true, alphaBlend);
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
        for (var i = this._stackPointer - 1; i > to.ptr; i--) {
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






var webGlRendererHelper_IDENTITY_HOLDER = Mat4.IDENTITY_HOLDER;
var WebGlRendererHelper = (function (_super) {
    __extends(WebGlRendererHelper, _super);
    function WebGlRendererHelper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderTargetStack = new Stack();
        return _this;
    }
    WebGlRendererHelper.prototype.createRenderTarget = function (game, size) {
        var renderer = this.game.getRenderer();
        return new FrameBufferStack(game, renderer.getNativeContext(), size);
    };
    WebGlRendererHelper.prototype.saveRenderTarget = function () {
        var renderer = this.game.getRenderer();
        this.renderTargetStack.push(renderer.getRenderTarget());
    };
    WebGlRendererHelper.prototype.restoreRenderTarget = function () {
        var renderer = this.game.getRenderer();
        renderer.setRenderTarget(this.renderTargetStack.pop());
    };
    WebGlRendererHelper.prototype.renderSceneToTexture = function (scene, renderTarget) {
        var renderer = this.game.getRenderer();
        this.saveRenderTarget();
        renderer.setRenderTarget(renderTarget);
        scene.render();
        this.restoreRenderTarget();
    };
    WebGlRendererHelper.prototype.renderModelToTexture = function (m, renderTarget, clear) {
        if (clear === void 0) { clear = false; }
        var renderer = this.game.getRenderer();
        if (m.size.isZero())
            m.revalidate();
        var currRenderTarget = this.game.getRenderer().getRenderTarget();
        var needSave = currRenderTarget !== renderTarget;
        if (needSave)
            this.saveRenderTarget();
        renderer.setRenderTarget(renderTarget);
        renderer.transformSave();
        renderer.transformSet(webGlRendererHelper_IDENTITY_HOLDER);
        if (clear)
            renderTarget.clear(Color.NONE, 0);
        m.render();
        if (needSave)
            this.restoreRenderTarget();
        renderer.transformRestore();
    };
    return WebGlRendererHelper;
}(RendererHelper));


;// CONCATENATED MODULE: ./engine/renderer/webGl/base/cubeMapTexture.ts



var CubeMapTexture = (function (_super) {
    __extends(CubeMapTexture, _super);
    function CubeMapTexture(gl) {
        var _this = _super.call(this, gl) || this;
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
                throw new DebugError("can not create Texture, gl context not passed to constructor, expected: Texture(gl)");
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
                throw new DebugError("can not create cube texture: wrong image is passed");
            }
            var w = top.width, h = top.height;
            if (!isOfSize(bottom, w, h) ||
                !isOfSize(left, w, h) ||
                !isOfSize(right, w, h) ||
                !isOfSize(front, w, h) ||
                !isOfSize(back, w, h)) {
                throw new DebugError("can not create cube texture: the same size of images is required");
            }
            if (w !== h) {
                throw new DebugError("with and height must be the same for cubeMapTexture, but ".concat(w, "*").concat(h, " size provided"));
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


;// CONCATENATED MODULE: ./engine/renderer/webGl/programs/impl/base/simpleRect/simpleColoredRectPainter.ts









var SimpleColoredRectPainter = (function (_super) {
    __extends(SimpleColoredRectPainter, _super);
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
                throw new DebugError("can not init simpleRectPainter instance: ShaderGenerator must be created");
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
    return GlCachedAccessor;
}());


;// CONCATENATED MODULE: ./engine/misc/collection/lruMap.ts


var LruMap = (function (_super) {
    __extends(LruMap, _super);
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


// EXTERNAL MODULE: ./engine/renderer/webGl/programs/impl/batch/shaders/batch.vertex.glsl
var batch_vertex = __webpack_require__(98520);
// EXTERNAL MODULE: ./engine/renderer/webGl/programs/impl/batch/shaders/batch.fragment.glsl
var batch_fragment = __webpack_require__(34098);
;// CONCATENATED MODULE: ./engine/renderer/webGl/programs/impl/batch/batchArrays/abstract/abstractBatchArray.ts

var NUM_OF_VERTICES_IN_QUAD = 4;
var AbstractBatchArray = (function () {
    function AbstractBatchArray(size) {
        this.size = size;
        this.dirty = false;
        this.array = new Float32Array(NUM_OF_VERTICES_IN_QUAD * size * BatchPainter.NUM_OF_QUADS_IN_BATCH);
    }
    AbstractBatchArray.prototype.setVertexBuffer = function (vb) {
        this.vertexBuffer = vb;
    };
    AbstractBatchArray.prototype.setOnPutNextChunkCallback = function (cb) {
        this.onPutNextChunkCallback = cb;
    };
    AbstractBatchArray.prototype.putNextChunk = function (model, chunkIndex) {
        this.dirty = true;
        var size = this.size;
        var offset = chunkIndex * size * NUM_OF_VERTICES_IN_QUAD;
        for (var i = 0; i < NUM_OF_VERTICES_IN_QUAD; i++) {
            this.onPutNextChunkCallback(model, this.array, offset);
            offset += size;
        }
    };
    AbstractBatchArray.prototype.uploadToVertexBufferAndReset = function () {
        if (!this.dirty)
            return;
        this.dirty = false;
        this.vertexBuffer.updateData(this.array);
        this.array.fill(0);
    };
    AbstractBatchArray.prototype.getArray = function () {
        return this.array;
    };
    return AbstractBatchArray;
}());


;// CONCATENATED MODULE: ./engine/renderer/webGl/programs/impl/batch/batchArrays/colorBatchArray.ts


var ColorBatchArray = (function (_super) {
    __extends(ColorBatchArray, _super);
    function ColorBatchArray() {
        var _this = _super.call(this, 4) || this;
        _this.setOnPutNextChunkCallback(function (model, array, offset) {
            var colorArray = model.asGL();
            array[offset] = colorArray[0];
            array[offset + 1] = colorArray[1];
            array[offset + 2] = colorArray[2];
            array[offset + 3] = colorArray[3];
        });
        return _this;
    }
    return ColorBatchArray;
}(AbstractBatchArray));


;// CONCATENATED MODULE: ./engine/renderer/webGl/programs/impl/batch/batchArrays/angleBatchArray.ts


var AngleBatchArray = (function (_super) {
    __extends(AngleBatchArray, _super);
    function AngleBatchArray() {
        var _this = _super.call(this, 1) || this;
        _this.setOnPutNextChunkCallback(function (model, array, offset) {
            array[offset] = model;
        });
        return _this;
    }
    return AngleBatchArray;
}(AbstractBatchArray));


;// CONCATENATED MODULE: ./engine/renderer/webGl/programs/impl/batch/batchArrays/posBatchArray.ts


var PosBatchArray = (function (_super) {
    __extends(PosBatchArray, _super);
    function PosBatchArray() {
        var _this = _super.call(this, 4) || this;
        _this.setOnPutNextChunkCallback(function (model, array, offset) {
            var pos = model.pos;
            var size = model.size;
            array[offset] = pos.x + size.width / 2;
            array[offset + 1] = pos.y + size.height / 2;
            array[offset + 2] = size.width;
            array[offset + 3] = size.height;
        });
        return _this;
    }
    return PosBatchArray;
}(AbstractBatchArray));


;// CONCATENATED MODULE: ./engine/renderer/webGl/programs/impl/batch/batchPainter.ts











var BatchPainter = (function (_super) {
    __extends(BatchPainter, _super);
    function BatchPainter(gl) {
        var _this = _super.call(this, gl) || this;
        _this.currentModelIndex = 0;
        _this.dirty = false;
        var gen = new ShaderGenerator();
        _this.u_viewPort = gen.addVertexUniform(GL_TYPE.FLOAT_VEC2, 'u_viewPort');
        _this.a_idx = gen.addAttribute(GL_TYPE.FLOAT, 'a_idx');
        _this.a_color = gen.addAttribute(GL_TYPE.FLOAT_VEC4, 'a_color');
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
                    size: 4, attrName: _this.a_color,
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
        if (model.angle !== 0)
            this.angleBatchArray.putNextChunk(model.angle, index);
        this.posBatchArray.putNextChunk(model, index);
        this.currentModelIndex++;
        this.dirty = true;
    };
    BatchPainter.prototype.flush = function (renderer) {
        if (!this.dirty)
            return;
        var viewPortSize = renderer.getRenderTarget().getTexture().size.toArray();
        this.setUniform(this.u_viewPort, viewPortSize);
        this.colorBatchArray.uploadToVertexBufferAndReset();
        this.angleBatchArray.uploadToVertexBufferAndReset();
        this.posBatchArray.uploadToVertexBufferAndReset();
        this.draw();
        this.reset();
    };
    BatchPainter.prototype.reset = function () {
        this.currentModelIndex = 0;
        this.dirty = false;
    };
    BatchPainter.NUM_OF_QUADS_IN_BATCH = 8000;
    return BatchPainter;
}(AbstractPainter));


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
        throw new DebugError("webGl is not accessible on this device");
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
    function InstanceHolder(clazz) {
        this.clazz = clazz;
    }
    InstanceHolder.prototype.getInstance = function (gl) {
        if (this.instance === undefined)
            this.instance = new this.clazz(gl);
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
var size = new Size();
var WebGlRenderer = (function (_super) {
    __extends(WebGlRenderer, _super);
    function WebGlRenderer(game) {
        var _this = _super.call(this, game) || this;
        _this.type = 'WebGlRenderer';
        _this.rendererHelper = new WebGlRendererHelper(_this.game);
        _this._matrixStack = new MatrixStack();
        _this._shapePainterHolder = new InstanceHolder(ShapePainter);
        _this._coloredRectPainterHolder = new InstanceHolder(SimpleColoredRectPainter);
        _this._meshPainterHolder = new InstanceHolder(MeshPainter);
        _this._batchPainterHolder = new InstanceHolder(BatchPainter);
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
        var texture = img.getTexture();
        texture.setInterpolationMode(img.isPixelPerfect() ? 0 : 1);
        var maxSize = Math.max(img.size.width, img.size.height);
        var sp = this._shapePainterHolder.getInstance(this._gl);
        this.prepareGeometryUniformInfo(img);
        sp.setUniformScalar(sp.u_lineWidth, Math.min(img.lineWidth / maxSize, 1));
        sp.setUniformVector(sp.u_color, img.color.asGL());
        var repeatFactor = size;
        repeatFactor.setWH(img.size.width / img.getSrcRect().width, img.size.height / img.getSrcRect().height);
        sp.setUniformVector(sp.u_repeatFactor, repeatFactor.toArray());
        sp.setUniformScalar(sp.u_borderRadius, Math.min(img.borderRadius / maxSize, 1));
        sp.setUniformScalar(sp.u_shapeType, 1);
        sp.setUniformScalar(sp.u_fillType, 1);
        var _a = texture.size, textureWidth = _a.width, textureHeight = _a.height;
        var _b = img.getSrcRect(), srcRectX = _b.x, srcRectY = _b.y;
        var _c = img.getSrcRect(), destRectWidth = _c.width, destRectHeight = _c.height;
        var destArr = rect.setXYWH(srcRectX / textureWidth, srcRectY / textureHeight, destRectWidth / textureWidth, destRectHeight / textureHeight).toArray();
        sp.setUniformVector(sp.u_texRect, destArr);
        var offSetArr = size.setWH(img.offset.x / maxSize, img.offset.y / maxSize).toArray();
        sp.setUniformVector(sp.u_texOffset, offSetArr);
        sp.setUniformScalar(sp.u_stretchMode, img.stretchMode);
        sp.attachTexture('texture', texture);
        sp.draw();
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
            throw new DebugError("can not apply texture without texture coordinates");
        mp.setTextureUsed(isTextureUsed);
        mp.attachTexture('u_texture', isTextureUsed ? mesh.texture : this._nullTexture);
        var isVertexColorUsed = mesh._modelPrimitive.vertexColorArr !== undefined;
        mp.setVertexColorUsed(isVertexColorUsed);
        var isNormalsTextureUsed = mesh.normalsTexture !== undefined;
        mp.setNormalsTextureUsed(isNormalsTextureUsed);
        mp.attachTexture('u_normalsTexture', isNormalsTextureUsed ? mesh.normalsTexture : this._nullTexture);
        var isSpecularTextureUsed = mesh.specularTexture !== undefined;
        mp.setSpecularTextureUsed(isSpecularTextureUsed);
        mp.attachTexture('u_specularTexture', isSpecularTextureUsed ? mesh.specularTexture : this._nullTexture);
        var isCubeMapTextureUsed = mesh.cubeMapTexture !== undefined;
        if ( true && !isCubeMapTextureUsed && mesh.material.reflectivity !== 0)
            throw new DebugError("can not apply reflectivity without cubeMapTexture");
        mp.setCubeMapTextureUsed(isCubeMapTextureUsed);
        mp.setReflectivity(mesh.material.reflectivity);
        mp.attachTexture('u_cubeMapTexture', isCubeMapTextureUsed ? mesh.cubeMapTexture : this._nullCubeMapTexture);
        if ( true && mesh.isLightAccepted()) {
            if (!mesh.getBufferInfo().normalBuffer) {
                console.error(mesh);
                throw new DebugError("can not accept light: normals are not specified");
            }
        }
        mp.setLightUsed(mesh.isLightAccepted() || false);
        mp.setColor(mesh.material.diffuseColor);
        mp.setColorMix(mesh.material.diffuseColorMix);
        mp.setSpecular(mesh.material.specular);
        this._glCachedAccessor.setDepthTest(mesh.depthTest);
        this._blender.setBlendMode(mesh.blendMode);
        mesh.onUpdatingBuffers();
        mp.draw();
        inverseTransposeModelMatrix.release();
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
        mp.attachTexture('u_texture', this._nullTexture);
        mp.setNormalsTextureUsed(false);
        mp.attachTexture('u_normalsTexture', this._nullTexture);
        mp.setSpecularTextureUsed(false);
        mp.attachTexture('u_specularTexture', this._nullTexture);
        mp.setCubeMapTextureUsed(false);
        mp.setReflectivity(0);
        mp.attachTexture('u_cubeMapTexture', this._nullCubeMapTexture);
        mp.setLightUsed(false);
        mp.setColor(mesh.fillColor);
        mp.setColorMix(0);
        mp.setSpecular(0);
        this._glCachedAccessor.setDepthTest(mesh.depthTest);
        this._blender.setBlendMode(mesh.blendMode);
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
            this.drawSimpleColoredRectangle(rectangle);
        }
        else {
            var rw = rectangle.size.width;
            var rh = rectangle.size.height;
            var maxSize = Math.max(rw, rh);
            var sp = this._shapePainterHolder.getInstance(this._gl);
            this.prepareGeometryUniformInfo(rectangle);
            this.prepareShapeUniformInfo(rectangle);
            this.prepareShapeFillUniformInfo(rectangle);
            sp.setUniformScalar(sp.u_borderRadius, Math.min(rectangle.borderRadius / maxSize, 1));
            sp.setUniformScalar(sp.u_shapeType, 1);
            sp.attachTexture('texture', this._nullTexture);
            sp.draw();
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
        sp.attachTexture('texture', this._nullTexture);
        sp.draw();
    };
    WebGlRenderer.prototype.flush = function () {
        this._glCachedAccessor.setDepthTest(false);
        this._batchPainterHolder.getInstance(this._gl).flush(this);
    };
    WebGlRenderer.prototype.transformSave = function () {
        this._matrixStack.save();
    };
    WebGlRenderer.prototype.transformScale = function (x, y, z) {
        if (z === void 0) { z = 1; }
        if (x === 1 && y === 1 && z === 1)
            return;
        this._matrixStack.scale(x, y, z);
    };
    WebGlRenderer.prototype.transformReset = function () {
        this._matrixStack.resetTransform();
    };
    WebGlRenderer.prototype.transformRotateX = function (angleInRadians) {
        if (angleInRadians === 0)
            return;
        this._matrixStack.rotateX(angleInRadians);
    };
    WebGlRenderer.prototype.transformRotateY = function (angleInRadians) {
        if (angleInRadians === 0)
            return;
        this._matrixStack.rotateY(angleInRadians);
    };
    WebGlRenderer.prototype.transformRotateZ = function (angleInRadians) {
        if (angleInRadians === 0)
            return;
        this._matrixStack.rotateZ(angleInRadians);
    };
    WebGlRenderer.prototype.transformTranslate = function (x, y, z) {
        if (z === void 0) { z = 0; }
        if (x === 0 && y === 0 && z === 0)
            return;
        this._matrixStack.translate(x, y, z);
    };
    WebGlRenderer.prototype.transformRotationReset = function () {
        this._matrixStack.rotationReset();
    };
    WebGlRenderer.prototype.transformSkewX = function (angle) {
        if (angle === 0)
            return;
        this._matrixStack.skewX(angle);
    };
    WebGlRenderer.prototype.transformSkewY = function (angle) {
        if (angle === 0)
            return;
        this._matrixStack.skewY(angle);
    };
    WebGlRenderer.prototype.transformRestore = function () {
        this._matrixStack.restore();
    };
    WebGlRenderer.prototype.transformSet = function (val) {
        this._matrixStack.setMatrix(val);
    };
    WebGlRenderer.prototype.transformGet = function () {
        return this._matrixStack.getCurrentValue();
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
        this._glCachedAccessor.setDepthTest(false);
        this._currFrameBufferStack.reduceState(stackPointer);
    };
    WebGlRenderer.prototype.beforeFrameDraw = function () {
        if (this.clearBeforeRender) {
            this._currFrameBufferStack.clear(this.clearColor, 1);
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
            throw new DebugError('undefined parameter: setRenderTarget(undefined)');
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
        this._nullTexture.destroy();
        this._nullCubeMapTexture.destroy();
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
            throw new DebugError("WebGLRenderingContext is not supported by this device");
        this._gl = gl;
        this._glCachedAccessor = new GlCachedAccessor(this._gl);
        this._nullTexture = new Texture(gl);
        this._nullCubeMapTexture = new CubeMapTexture(gl);
        this._nullCubeMapTexture.setAsZero();
        this._blender = Blender.getSingleton(gl);
        this._blender.enable();
        this._blender.setBlendMode(0);
        this._origFrameBufferStack = new FrameBufferStack(this.game, this.getNativeContext(), this.game.size);
        this._currFrameBufferStack = this._origFrameBufferStack;
    };
    WebGlRenderer.prototype.drawSimpleColoredRectangle = function (rectangle) {
        var scp = this._coloredRectPainterHolder.getInstance(this._gl);
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
        scp.draw();
    };
    WebGlRenderer.prototype.prepareGeometryUniformInfo = function (model) {
        if (true) {
            if (!model.size.width || !model.size.height) {
                console.error(model);
                throw new DebugError("Can not render model with zero size");
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
                throw new DebugError("Can not render model with zero size");
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


;// CONCATENATED MODULE: ./engine/control/mouse/mousePoint.ts




var MousePoint = (function (_super) {
    __extends(MousePoint, _super);
    function MousePoint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.screenCoordinate = new Point2d();
        _this.sceneCoordinate = new Point2d();
        return _this;
    }
    return MousePoint;
}(ReleaseableEntity));

var MousePointsPullHolder = (function () {
    function MousePointsPullHolder() {
    }
    MousePointsPullHolder.fromPool = function () {
        return this.mousePointsPool.getFreeObject();
    };
    MousePointsPullHolder.mousePointsPool = new ObjectPool(MousePoint);
    return MousePointsPullHolder;
}());


;// CONCATENATED MODULE: ./engine/control/mouse/mouseControlHelper.ts




var Vec4Holder = Vec4.Vec4Holder;
var recycledArray = [undefined, undefined, undefined, undefined];
var MouseControlHelper = (function () {
    function MouseControlHelper(game) {
        this.game = game;
        this.isPointInPolygon4 = function (polygon, testPoint) {
            var result = false;
            var j = polygon.length - 1;
            for (var i = 0, max = polygon.length; i < max; i++) {
                if (polygon[i][1] < testPoint.y
                    && polygon[j][1] >= testPoint.y || polygon[j][1] < testPoint.y
                    && polygon[i][1] >= testPoint.y) {
                    if (polygon[i][0] + (testPoint.y - polygon[i][1])
                        /
                            (polygon[j][1] - polygon[i][1]) * (polygon[j][0] - polygon[i][0]) < testPoint.x) {
                        result = !result;
                    }
                }
                j = i;
            }
            return result;
        };
    }
    MouseControlHelper.prototype.isPointInRect = function (mousePoint, obj, constrainObjects) {
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
        recycledArray[0] = pointTopLeftTransformation.vec4;
        recycledArray[1] = pointTopRightTransformation.vec4;
        recycledArray[2] = pointBottomRightTransformation.vec4;
        recycledArray[3] = pointBottomLeftTransformation.vec4;
        var result = this.isPointInPolygon4(recycledArray, mousePoint.screenCoordinate);
        if (result && constrainObjects !== undefined) {
            for (var i = 0; i < constrainObjects.length; i++) {
                if (!this.isPointInRect(mousePoint, constrainObjects[i])) {
                    result = false;
                    break;
                }
            }
        }
        Rect.toPool(modelRect);
        Vec4Holder.toPool(pointBottomRight);
        Vec4Holder.toPool(pointBottomRightTransformation);
        Vec4Holder.toPool(pointTopRight);
        Vec4Holder.toPool(pointTopRightTransformation);
        Vec4Holder.toPool(pointTopLeft);
        Vec4Holder.toPool(pointTopLeftTransformation);
        Vec4Holder.toPool(pointBottomLeft);
        Vec4Holder.toPool(pointBottomLeftTransformation);
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
var MouseEventTrottler = (function () {
    function MouseEventTrottler() {
    }
    MouseEventTrottler.prototype.checkSameEventAndSet = function (event, x, y) {
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
    MouseEventTrottler.prototype.checkSameEvent = function (event) {
        return this.event === event;
    };
    return MouseEventTrottler;
}());
var MouseControl = (function () {
    function MouseControl(game) {
        this.game = game;
        this.type = 'MouseControl';
        this._helper = new MouseControlHelper(this.game);
        this._capturedObjectsByTouchIdHolder = new CapturedObjectsByTouchIdHolder();
        this._capturedObjectsByTouchIdPrevHolder = new CapturedObjectsByTouchIdHolder();
        this._mouseEventTrottler = new MouseEventTrottler();
    }
    MouseControl.prototype.listenTo = function () {
        var _this = this;
        if ( true && !this.game.getRenderer()) {
            throw new DebugError("can not initialize mouse control: renderer is not set");
        }
        var container = this.game.getRenderer().container;
        this._container = container;
        container.ontouchstart = function (e) {
            e.preventDefault();
            if (_this._mouseEventTrottler.checkSameEventAndSet("mouseDown", e.touches[0].clientX, e.touches[0].clientY)) {
                return;
            }
            var l = e.touches.length;
            while (l--) {
                _this.resolveClick(e.touches[l]);
            }
        };
        container.onmousedown = function (e) {
            if (_this._mouseEventTrottler.checkSameEventAndSet("mouseDown", e.clientX, e.clientY)) {
                return;
            }
            if (e.button === LEFT_MOUSE_BTN)
                _this.resolveClick(e);
            else {
                _this.resolveButtonPressed(e);
            }
        };
        container.onpointerdown = function (e) {
            if (_this._mouseEventTrottler.checkSameEventAndSet("mouseDown", e.clientX, e.clientY)) {
                return;
            }
            _this.resolveClick(e);
        };
        container.ontouchend = container.ontouchcancel = function (e) {
            if (_this._mouseEventTrottler.checkSameEventAndSet("mouseUp", e.changedTouches[0].clientX, e.changedTouches[0].clientY)) {
                return;
            }
            e.preventDefault();
            var l = e.changedTouches.length;
            while (l--) {
                _this.resolveMouseUp(e.changedTouches[l]);
            }
        };
        document.body.ontouchend = document.body.ontouchcancel = function (e) {
            if (_this._mouseEventTrottler.checkSameEvent("mouseUp")) {
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
                            if (_this._mouseEventTrottler.checkSameEventAndSet("mouseUp", e.clientX, e.clientY)) {
                                return;
                            }
                            _this.resolveMouseUp(e);
                        };
        container.onmouseup = function (e) {
            if (_this._mouseEventTrottler.checkSameEventAndSet("mouseUp", e.clientX, e.clientY)) {
                return;
            }
            _this.resolveMouseUp(e);
        };
        document.body.onpointerup = function (e) {
            if (_this._mouseEventTrottler.checkSameEventAndSet("mouseUp", e.clientX, e.clientY)) {
                return;
            }
            _this.resolveMouseUp(e);
        };
        document.body.onmouseup = function (e) {
            if (_this._mouseEventTrottler.checkSameEventAndSet("mouseUp", e.clientX, e.clientY)) {
                return;
            }
            _this.resolveMouseUp(e);
        };
        container.ontouchmove = function (e) {
            if (_this._mouseEventTrottler.checkSameEventAndSet("mouseMove", e.touches[0].clientX, e.touches[0].clientY)) {
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
            if (_this._mouseEventTrottler.checkSameEventAndSet("mouseMove", e.clientX, e.clientY)) {
                return;
            }
            _this.resolveMouseMove(e, e.pressure > 0);
        };
        container.onmousemove = function (e) {
            if (_this._mouseEventTrottler.checkSameEventAndSet("mouseMove", e.clientX, e.clientY)) {
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
            'onpointerup', 'onpointermove',
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
                    mousePoint.target = obj;
                    if (mouseEvent === "mouseMove")
                        this._capturedObjectsByTouchIdHolder.add(mousePoint.id, obj);
                    var parent_1 = obj.parent;
                    while (parent_1 !== undefined) {
                        var propagationEvent = this._helper.captureObject(e, mouseEvent, mousePoint, parent_1, obj, constrainObjects);
                        if (propagationEvent !== undefined) {
                            if (!propagationEvent.isPropagated)
                                break;
                            if (mouseEvent === "mouseMove")
                                this._capturedObjectsByTouchIdHolder.add(mousePoint.id, parent_1);
                        }
                        parent_1 = parent_1.parent;
                    }
                    break;
                }
            }
        }
        if (scene.interactive) {
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


;// CONCATENATED MODULE: ./demo/particles2/index.ts




var game = new Game({ width: 800, height: 600 });
game.setRenderer(WebGlRenderer);
game.addControl(MouseControl);
var mainScene = new MainScene(game);
game.runScene(mainScene);

}();
/******/ })()
;