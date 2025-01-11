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
import { ProjectURL } from './ProjectURL';
var ProjectURLs = /** @class */ (function (_super) {
    __extends(ProjectURLs, _super);
    function ProjectURLs(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "homepage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "ios", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "android", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.homepage = (data === null || data === void 0 ? void 0 : data.homepage)
            ? new ProjectURL(data === null || data === void 0 ? void 0 : data.homepage)
            : new ProjectURL();
        _this.ios = (data === null || data === void 0 ? void 0 : data.ios) ? new ProjectURL(data === null || data === void 0 ? void 0 : data.ios) : new ProjectURL();
        _this.android = (data === null || data === void 0 ? void 0 : data.android)
            ? new ProjectURL(data === null || data === void 0 ? void 0 : data.android)
            : new ProjectURL();
        return _this;
    }
    return ProjectURLs;
}(Model));
export { ProjectURLs };
