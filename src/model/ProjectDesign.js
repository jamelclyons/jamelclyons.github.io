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
import Task from './Task';
import Color from './Color';
var ProjectDesign = /** @class */ (function (_super) {
    __extends(ProjectDesign, _super);
    function ProjectDesign(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "gallery", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "checkList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "colorsList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.gallery = (data === null || data === void 0 ? void 0 : data.gallery) ? new Gallery(data.gallery) : new Gallery();
        _this.checkList = (data === null || data === void 0 ? void 0 : data.check_list) ? _this.toArrayTask(data.check_list) : [];
        _this.colorsList = (data === null || data === void 0 ? void 0 : data.colors_list)
            ? _this.toArrayColor(data.colors_list)
            : [];
        _this.content = (data === null || data === void 0 ? void 0 : data.content) || '';
        return _this;
    }
    Object.defineProperty(ProjectDesign.prototype, "toArrayTask", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data) {
            var checkList = [];
            data.forEach(function (task) {
                checkList.push(new Task(task));
            });
            return checkList;
        }
    });
    Object.defineProperty(ProjectDesign.prototype, "toArrayColor", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data) {
            var colorsList = [];
            data.forEach(function (color) {
                colorsList.push(new Color(color));
            });
            return colorsList;
        }
    });
    return ProjectDesign;
}(Model));
export default ProjectDesign;
