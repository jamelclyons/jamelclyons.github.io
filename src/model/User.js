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
import ContactMethods from './ContactMethods';
import Organization from '../model/Organization';
import packageJson from '../../package.json';
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "avatarURL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "name", {
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
        Object.defineProperty(_this, "bio", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "email", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "phone", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "resume", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "website", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "organizations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "repos", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "contactMethods", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "images", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        var homepage = packageJson.homepage, author = packageJson.author;
        _this.id = _this.getGitHubUsername(homepage);
        _this.avatarURL = (data === null || data === void 0 ? void 0 : data.avatar_url) || '';
        _this.name = (data === null || data === void 0 ? void 0 : data.name) || author.name;
        _this.title = (data === null || data === void 0 ? void 0 : data.title) || author.title;
        _this.bio = (data === null || data === void 0 ? void 0 : data.bio) || '';
        _this.email = (data === null || data === void 0 ? void 0 : data.email) || author.contact.email;
        _this.phone = (data === null || data === void 0 ? void 0 : data.phone) || '';
        _this.resume = (data === null || data === void 0 ? void 0 : data.resume) || '';
        _this.website = (data === null || data === void 0 ? void 0 : data.website) || homepage;
        _this.organizations = _this.setOrganizations(data === null || data === void 0 ? void 0 : data.organizations) || [];
        _this.repos = (data === null || data === void 0 ? void 0 : data.repos) || '';
        _this.contactMethods = new ContactMethods(data === null || data === void 0 ? void 0 : data.contact_methods);
        _this.images = (data === null || data === void 0 ? void 0 : data.images) || '';
        return _this;
    }
    Object.defineProperty(User.prototype, "getGitHubUsername", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (url) {
            try {
                var parsedUrl = new URL(url);
                var hostname = parsedUrl.hostname;
                var username = hostname.split('.')[0];
                return hostname.includes('github.io') ? username : '';
            }
            catch (error) {
                console.error('Invalid homepage url check your package.json file:', error);
                return '';
            }
        }
    });
    Object.defineProperty(User.prototype, "setOrganizations", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (organizations) {
            if (Array.isArray(organizations) && organizations.length > 0) {
                return organizations.map(function (organization) { return new Organization(organization); });
            }
            return [];
        }
    });
    return User;
}(Model));
export default User;
