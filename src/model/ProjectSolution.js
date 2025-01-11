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
import { ProjectURLs } from './ProjectURLs';
import Gallery from './Gallery';
var ProjectSolution = /** @class */ (function (_super) {
    __extends(ProjectSolution, _super);
    function ProjectSolution(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "gallery", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "features", {
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
        Object.defineProperty(_this, "currency", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "price", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "urlsList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.gallery = (data === null || data === void 0 ? void 0 : data.gallery) ? new Gallery(data.gallery) : new Gallery();
        _this.features = (data === null || data === void 0 ? void 0 : data.features)
            ? _this.getFeatures(data.features)
            : new Set();
        _this.content = (data === null || data === void 0 ? void 0 : data.content) || [];
        _this.currency = (data === null || data === void 0 ? void 0 : data.currency) || '';
        _this.price = (data === null || data === void 0 ? void 0 : data.price) || 0;
        _this.urlsList = (data === null || data === void 0 ? void 0 : data.urlsList)
            ? new ProjectURLs(data === null || data === void 0 ? void 0 : data.urlsList)
            : new ProjectURLs();
        return _this;
    }
    Object.defineProperty(ProjectSolution.prototype, "getFeatures", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data) {
            var features = new Set();
            if (data && (data === null || data === void 0 ? void 0 : data.size) > 0) {
                data.forEach(function (feature) {
                    features.add(feature);
                });
            }
            return features;
        }
    });
    return ProjectSolution;
}(Model));
export default ProjectSolution;
