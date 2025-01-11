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
var Organization = /** @class */ (function (_super) {
    __extends(Organization, _super);
    function Organization(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "id", {
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
        Object.defineProperty(_this, "avatarURL", {
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
        Object.defineProperty(_this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "company", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "blog", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "location", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "email", {
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
        _this.id = data === null || data === void 0 ? void 0 : data.id;
        _this.createdAt = data === null || data === void 0 ? void 0 : data.created_at;
        _this.updatedAt = data === null || data === void 0 ? void 0 : data.updated_at;
        _this.avatarURL = data === null || data === void 0 ? void 0 : data.avatar_url;
        _this.description = data === null || data === void 0 ? void 0 : data.description;
        _this.name = data === null || data === void 0 ? void 0 : data.name;
        _this.company = data === null || data === void 0 ? void 0 : data.company;
        _this.blog = data === null || data === void 0 ? void 0 : data.blog;
        _this.location = data === null || data === void 0 ? void 0 : data.location;
        _this.email = data === null || data === void 0 ? void 0 : data.email;
        _this.url = data === null || data === void 0 ? void 0 : data.url;
        return _this;
    }
    return Organization;
}(Model));
export default Organization;
