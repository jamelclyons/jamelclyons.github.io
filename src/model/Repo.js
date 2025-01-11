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
var Repo = /** @class */ (function (_super) {
    __extends(Repo, _super);
    function Repo(data) {
        if (data === void 0) { data = {}; }
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "owner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "createdAt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "updatedAt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "homepage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "repoURL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.id = (_b = (_a = data === null || data === void 0 ? void 0 : data.name) !== null && _a !== void 0 ? _a : data === null || data === void 0 ? void 0 : data.id) !== null && _b !== void 0 ? _b : '';
        _this.owner = _this.getOwner(data === null || data === void 0 ? void 0 : data.owner);
        _this.createdAt = (_c = data === null || data === void 0 ? void 0 : data.created_at) !== null && _c !== void 0 ? _c : '';
        _this.updatedAt = (_d = data === null || data === void 0 ? void 0 : data.updated_at) !== null && _d !== void 0 ? _d : '';
        _this.homepage = (_e = data === null || data === void 0 ? void 0 : data.homepage) !== null && _e !== void 0 ? _e : '';
        _this.description = (_f = data === null || data === void 0 ? void 0 : data.description) !== null && _f !== void 0 ? _f : '';
        _this.repoURL = (_h = (_g = data === null || data === void 0 ? void 0 : data.repo_url) !== null && _g !== void 0 ? _g : data === null || data === void 0 ? void 0 : data.html_url) !== null && _h !== void 0 ? _h : '';
        return _this;
    }
    Object.defineProperty(Repo.prototype, "getOwner", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data) {
            if (typeof data === 'object') {
                return data.login;
            }
            if (typeof data === 'string') {
                return data;
            }
            return '';
        }
    });
    return Repo;
}(Model));
export default Repo;
