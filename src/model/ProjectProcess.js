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
import ProjectDesign from './ProjectDesign';
import ProjectDevelopment from './ProjectDevelopment';
import ProjectDelivery from './ProjectDelivery';
import ProjectStatus from './ProjectStatus';
var ProjectProcess = /** @class */ (function (_super) {
    __extends(ProjectProcess, _super);
    function ProjectProcess(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "design", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "development", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "delivery", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.status = new ProjectStatus(data === null || data === void 0 ? void 0 : data.status);
        _this.design = new ProjectDesign(data === null || data === void 0 ? void 0 : data.design);
        _this.development = new ProjectDevelopment(data === null || data === void 0 ? void 0 : data.development);
        _this.delivery = new ProjectDelivery(data === null || data === void 0 ? void 0 : data.delivery);
        return _this;
    }
    return ProjectProcess;
}(Model));
export default ProjectProcess;
