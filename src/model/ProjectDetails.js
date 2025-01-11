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
import { Privacy, privacyFromString } from './enum/Enums';
import Model from './Model';
import packageJson from '../../package.json';
var ProjectDetails = /** @class */ (function (_super) {
    __extends(ProjectDetails, _super);
    function ProjectDetails(data) {
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "privacy", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Privacy.Private
        });
        Object.defineProperty(_this, "clientID", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "clientName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "startDate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "endDate", {
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
        Object.defineProperty(_this, "teamList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        var author = packageJson.author;
        _this.privacy = (data === null || data === void 0 ? void 0 : data.privacy)
            ? privacyFromString(data === null || data === void 0 ? void 0 : data.privacy)
            : Privacy.Private;
        _this.clientID = (data === null || data === void 0 ? void 0 : data.client_id) || '0';
        _this.clientName = (data === null || data === void 0 ? void 0 : data.client_name) || author.company.name;
        _this.startDate = (data === null || data === void 0 ? void 0 : data.start_date) || author.company.founded_on;
        _this.endDate = (data === null || data === void 0 ? void 0 : data.end_date) || 'Active Development';
        _this.content = (data === null || data === void 0 ? void 0 : data.content) || '';
        _this.teamList = (data === null || data === void 0 ? void 0 : data.team_list) || [];
        return _this;
    }
    return ProjectDetails;
}(Model));
export default ProjectDetails;
