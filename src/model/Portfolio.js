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
import Model from '../model/Model';
import Project from './Project';
import Taxonomy from './Taxonomy';
var Portfolio = /** @class */ (function (_super) {
    __extends(Portfolio, _super);
    function Portfolio(projects, projectTypes, languages, frameworks, technologies) {
        if (projects === void 0) { projects = []; }
        if (projectTypes === void 0) { projectTypes = []; }
        if (languages === void 0) { languages = []; }
        if (frameworks === void 0) { frameworks = []; }
        if (technologies === void 0) { technologies = []; }
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "projects", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "projectTypes", {
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
        _this.projects = _this.getProjects(projects);
        _this.projectTypes = _this.getProjectTypes(projectTypes);
        _this.languages = _this.getLanguages(languages);
        _this.frameworks = _this.getFrameworks(frameworks);
        _this.technologies = _this.getTechnologies(technologies);
        return _this;
    }
    Object.defineProperty(Portfolio.prototype, "getProjects", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data) {
            if (data === void 0) { data = []; }
            var projects = new Set();
            data.forEach(function (project) {
                projects.add(new Project(project));
            });
            return projects;
        }
    });
    Object.defineProperty(Portfolio.prototype, "getProjectTypes", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data) {
            if (data === void 0) { data = []; }
            var projectTypes = new Set();
            data.forEach(function (projectType) {
                projectTypes.add(new Taxonomy(projectType));
            });
            return projectTypes;
        }
    });
    Object.defineProperty(Portfolio.prototype, "getLanguages", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data) {
            if (data === void 0) { data = []; }
            var languages = new Set();
            data.forEach(function (language) {
                languages.add(new Taxonomy(language));
            });
            return languages;
        }
    });
    Object.defineProperty(Portfolio.prototype, "getFrameworks", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data) {
            if (data === void 0) { data = []; }
            var frameworks = new Set();
            data.forEach(function (framework) {
                frameworks.add(new Taxonomy(framework));
            });
            return frameworks;
        }
    });
    Object.defineProperty(Portfolio.prototype, "getTechnologies", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data) {
            if (data === void 0) { data = []; }
            var technologies = new Set();
            data.forEach(function (technology) {
                technologies.add(new Taxonomy(technology));
            });
            return technologies;
        }
    });
    return Portfolio;
}(Model));
export default Portfolio;
