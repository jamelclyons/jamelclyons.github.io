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
import Image from './Image';
var ProjectURL = /** @class */ (function (_super) {
    __extends(ProjectURL, _super);
    function ProjectURL(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "name", {
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
        Object.defineProperty(_this, "image", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.name = data === null || data === void 0 ? void 0 : data.name;
        _this.url = data === null || data === void 0 ? void 0 : data.url;
        _this.image = new Image(data === null || data === void 0 ? void 0 : data.image);
        return _this;
    }
    return ProjectURL;
}(Model));
export { ProjectURL };