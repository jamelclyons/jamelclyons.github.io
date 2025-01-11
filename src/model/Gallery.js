var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
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
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import Model from './Model';
import Image from './Image';
var Gallery = /** @class */ (function (_super) {
    __extends(Gallery, _super);
    function Gallery(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "logos", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "icons", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "animations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "umlDiagrams", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "images", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.logos = Array.isArray(data === null || data === void 0 ? void 0 : data.logos) ? _this.toArrayImage(data.logos) : [];
        _this.icons = Array.isArray(data === null || data === void 0 ? void 0 : data.icons) ? _this.toArrayImage(data.icons) : [];
        _this.animations = Array.isArray(data === null || data === void 0 ? void 0 : data.animations) ? _this.toArrayImage(data.animations) : [];
        _this.umlDiagrams = Array.isArray(data === null || data === void 0 ? void 0 : data.umlDiagrams) ? _this.toArrayImage(data.umlDiagrams) : [];
        _this.images = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(_this.logos), false), __read(_this.icons), false), __read(_this.animations), false), __read(_this.umlDiagrams), false);
        return _this;
    }
    Object.defineProperty(Gallery.prototype, "toArrayImage", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data) {
            var images = [];
            data.forEach(function (image) {
                images.push(new Image(image));
            });
            return images;
        }
    });
    return Gallery;
}(Model));
export default Gallery;
