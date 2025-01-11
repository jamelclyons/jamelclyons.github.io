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
import ProjectSolution from './ProjectSolution';
import { ProjectURLs } from './ProjectURLs';
import ProjectProcess from './ProjectProcess';
import ProjectDesign from './ProjectDesign';
import ProjectDevelopment from './ProjectDevelopment';
import ProjectDelivery from './ProjectDelivery';
import ProjectProblem from './ProjectProblem';
import ProjectDetails from './ProjectDetails';
import Gallery from './Gallery';
var Project = /** @class */ (function (_super) {
    __extends(Project, _super);
    function Project(data) {
        if (data === void 0) { data = {}; }
        var _a;
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "owner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "title", {
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
        Object.defineProperty(_this, "solution", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "process", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "problem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "details", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.id = data === null || data === void 0 ? void 0 : data.id;
        _this.owner = data === null || data === void 0 ? void 0 : data.owner;
        _this.title = (data === null || data === void 0 ? void 0 : data.title) ? _this.getTitle(data === null || data === void 0 ? void 0 : data.id) : '';
        _this.description = (_a = data === null || data === void 0 ? void 0 : data.description) !== null && _a !== void 0 ? _a : 'No Description Provided.';
        _this.solution = (data === null || data === void 0 ? void 0 : data.solution)
            ? new ProjectSolution(data.solution)
            : new ProjectSolution();
        _this.process = (data === null || data === void 0 ? void 0 : data.process)
            ? new ProjectProcess(data.process)
            : new ProjectProcess();
        _this.problem = (data === null || data === void 0 ? void 0 : data.problem)
            ? new ProjectProblem(data.problem)
            : new ProjectProblem();
        _this.details = (data === null || data === void 0 ? void 0 : data.details)
            ? new ProjectDetails(data.details)
            : new ProjectDetails();
        return _this;
    }
    Object.defineProperty(Project.prototype, "create", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (repo_url, title) {
            try {
                var parsedUrl = new URL(repo_url);
                var pathname = parsedUrl.pathname;
                var parts = pathname.split('/');
                var filteredArray = parts.filter(function (item) { return item !== ''; });
                this.id = filteredArray[1];
                this.title = title;
                this.process.development.repoURL = repo_url;
            }
            catch (error) {
                var err = error;
                console.error(err);
            }
        }
    });
    Object.defineProperty(Project.prototype, "getTitle", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (id) {
            return id
                ? id
                    .split('-')
                    .map(function (part) { return part.charAt(0).toUpperCase() + part.slice(1); })
                    .join(' ')
                : '';
        }
    });
    Object.defineProperty(Project.prototype, "fromRepo", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (repo) {
            this.id = repo.id;
            this.owner = repo.owner;
            this.title = this.title ? this.title : this.getTitle(this.id);
            this.description =
                repo.description !== '' ? repo.description : 'No Description Provided.';
            this.solution.urlsList.homepage.url = repo.homepage;
            this.process.status.createdAt = repo.createdAt;
            this.process.status.updatedAt = repo.updatedAt;
            this.process.development.repoURL = repo.repoURL;
        }
    });
    Object.defineProperty(Project.prototype, "fromDocumentData", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (id, data) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            this.id = id;
            this.title = (data === null || data === void 0 ? void 0 : data.title) ? data.title : this.getTitle(this.id);
            this.solution.gallery = ((_a = data === null || data === void 0 ? void 0 : data.solution) === null || _a === void 0 ? void 0 : _a.gallery)
                ? new Gallery(data.solution.gallery)
                : new Gallery();
            this.solution.currency = (_b = data === null || data === void 0 ? void 0 : data.solution) === null || _b === void 0 ? void 0 : _b.currency;
            this.solution.features = (_c = data === null || data === void 0 ? void 0 : data.solution) === null || _c === void 0 ? void 0 : _c.features;
            this.solution.price = (_d = data === null || data === void 0 ? void 0 : data.solution) === null || _d === void 0 ? void 0 : _d.price;
            this.solution.urlsList = ((_e = data === null || data === void 0 ? void 0 : data.solution) === null || _e === void 0 ? void 0 : _e.urlsList)
                ? new ProjectURLs()
                : new ProjectURLs();
            this.process.status.progress = (_h = (_g = (_f = data === null || data === void 0 ? void 0 : data.process) === null || _f === void 0 ? void 0 : _f.status) === null || _g === void 0 ? void 0 : _g.progress) !== null && _h !== void 0 ? _h : '0';
            this.process.design = ((_j = data === null || data === void 0 ? void 0 : data.process) === null || _j === void 0 ? void 0 : _j.design)
                ? new ProjectDesign(data.process.design)
                : new ProjectDesign();
            this.process.development = ((_k = data === null || data === void 0 ? void 0 : data.process) === null || _k === void 0 ? void 0 : _k.development)
                ? new ProjectDevelopment(data.process.development)
                : new ProjectDevelopment();
            this.process.delivery = ((_l = data === null || data === void 0 ? void 0 : data.process) === null || _l === void 0 ? void 0 : _l.delivery)
                ? new ProjectDelivery(data.process.delivery)
                : new ProjectDelivery();
            this.problem = (data === null || data === void 0 ? void 0 : data.problem)
                ? new ProjectProblem(data.problem)
                : new ProjectProblem();
            this.details = (data === null || data === void 0 ? void 0 : data.details)
                ? new ProjectDetails(data.details)
                : new ProjectDetails();
        }
    });
    return Project;
}(Model));
export default Project;
