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
import Model from './Model';
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "title", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "className", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.id = (data === null || data === void 0 ? void 0 : data.id) || '';
        _this.title = (data === null || data === void 0 ? void 0 : data.title) || '';
        _this.url = (data === null || data === void 0 ? void 0 : data.url) || '';
        _this.className = (data === null || data === void 0 ? void 0 : data.class_name) || '';
        return _this;
    }
    return Image;
}(Model));
export default Image;
