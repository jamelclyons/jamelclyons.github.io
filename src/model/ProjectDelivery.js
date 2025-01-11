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
import Image from './Image';
import Model from './Model';
import Task from './Task';
var ProjectDelivery = /** @class */ (function (_super) {
    __extends(ProjectDelivery, _super);
    function ProjectDelivery(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "checkList", {
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
        Object.defineProperty(_this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.checkList = (data === null || data === void 0 ? void 0 : data.check_list) ? _this.toArrayTask(data === null || data === void 0 ? void 0 : data.check_list) : [];
        _this.gallery = (data === null || data === void 0 ? void 0 : data.gallery) ? _this.toArrayImage(data.gallery) : [];
        _this.content = (data === null || data === void 0 ? void 0 : data.content) || '';
        return _this;
    }
    Object.defineProperty(ProjectDelivery.prototype, "toArrayTask", {
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
    Object.defineProperty(ProjectDelivery.prototype, "toArrayImage", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data) {
            var images = [];
            data.forEach(function (image) {
                images.push(new Image(image));
            });
            return images;
        }
    });
    return ProjectDelivery;
}(Model));
export default ProjectDelivery;
