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
import Gallery from './Gallery';
var ProjectProblem = /** @class */ (function (_super) {
    __extends(ProjectProblem, _super);
    function ProjectProblem(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "gallery", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.content = (data === null || data === void 0 ? void 0 : data.content) || '';
        _this.gallery = (data === null || data === void 0 ? void 0 : data.gallery) ? new Gallery(data === null || data === void 0 ? void 0 : data.gallery) : new Gallery;
        return _this;
    }
    return ProjectProblem;
}(Model));
export default ProjectProblem;
