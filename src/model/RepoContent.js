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
var RepoContent = /** @class */ (function (_super) {
    __extends(RepoContent, _super);
    function RepoContent(data) {
        if (data === void 0) { data = {}; }
        var _a, _b, _c, _d, _e, _f, _g;
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "path", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "size", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "downloadURL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.id = (_b = (_a = data === null || data === void 0 ? void 0 : data.sha) !== null && _a !== void 0 ? _a : data.id) !== null && _b !== void 0 ? _b : '';
        _this.name = (_c = data === null || data === void 0 ? void 0 : data.name) !== null && _c !== void 0 ? _c : '';
        _this.path = (_d = data === null || data === void 0 ? void 0 : data.path) !== null && _d !== void 0 ? _d : '';
        _this.type = (_e = data === null || data === void 0 ? void 0 : data.type) !== null && _e !== void 0 ? _e : '';
        _this.size = (_f = data === null || data === void 0 ? void 0 : data.size) !== null && _f !== void 0 ? _f : '';
        _this.downloadURL = (_g = data === null || data === void 0 ? void 0 : data.download_url) !== null && _g !== void 0 ? _g : '';
        return _this;
    }
    return RepoContent;
}(Model));
export default RepoContent;
