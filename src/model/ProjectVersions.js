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
var ProjectVersions = /** @class */ (function (_super) {
    __extends(ProjectVersions, _super);
    function ProjectVersions(current, previous) {
        if (current === void 0) { current = '1.0.0'; }
        if (previous === void 0) { previous = []; }
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "current", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "previous", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.current = current;
        _this.previous = previous;
        return _this;
    }
    return ProjectVersions;
}(Model));
export default ProjectVersions;
