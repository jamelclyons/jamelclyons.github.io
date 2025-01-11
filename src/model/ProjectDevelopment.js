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
import Task from './Task';
import ProjectVersions from './ProjectVersions';
var ProjectDevelopment = /** @class */ (function (_super) {
    __extends(ProjectDevelopment, _super);
    function ProjectDevelopment(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "content", {
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
        Object.defineProperty(_this, "repoURL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "versionsList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "types", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "languages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "frameworks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "technologies", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.repoURL = (data === null || data === void 0 ? void 0 : data.repo_url) || '';
        _this.checkList = (data === null || data === void 0 ? void 0 : data.check_list) ? _this.toArrayTask(data.check_list) : [];
        _this.versionsList = (data === null || data === void 0 ? void 0 : data.versions_list)
            ? new ProjectVersions(data.versions_list)
            : new ProjectVersions();
        _this.types = (data === null || data === void 0 ? void 0 : data.types) ? new Set(data.types) : new Set();
        _this.languages = (data === null || data === void 0 ? void 0 : data.languages) ? new Set(data.languages) : new Set();
        _this.frameworks = (data === null || data === void 0 ? void 0 : data.frameworks) ? new Set(data.frameworks) : new Set();
        _this.technologies = (data === null || data === void 0 ? void 0 : data.technologies)
            ? new Set(data.technologies)
            : new Set();
        _this.content = (data === null || data === void 0 ? void 0 : data.content) || '';
        return _this;
    }
    Object.defineProperty(ProjectDevelopment.prototype, "toArrayTask", {
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
    return ProjectDevelopment;
}(Model));
export default ProjectDevelopment;
