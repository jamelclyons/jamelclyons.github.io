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
import Contact from './Contact';
import packageJson from '../../package.json';
import Image from './Image';
var ContactMethods = /** @class */ (function (_super) {
    __extends(ContactMethods, _super);
    function ContactMethods(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "gitHub", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "instagram", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "linkedIn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "x", {
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
        var _a = packageJson.author.contact, gitHub = _a.gitHub, instagram = _a.instagram, linkedIn = _a.linkedIn, x = _a.x, email = _a.email, phone = _a.phone;
        _this.gitHub = _this.getContactGitHub(gitHub);
        _this.instagram = _this.getContactInstagram(instagram);
        _this.linkedIn = _this.getContactLinkedIn(linkedIn);
        _this.x = _this.getContactX(x);
        _this.email = _this.getContactEmail(email);
        _this.phone = _this.getContactPhone(phone);
        return _this;
    }
    Object.defineProperty(ContactMethods.prototype, "getContact", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data) {
            var _a, _b, _c, _d;
            var id = (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : '';
            var title = (_b = data === null || data === void 0 ? void 0 : data.title) !== null && _b !== void 0 ? _b : '';
            var url = (_c = data === null || data === void 0 ? void 0 : data.url) !== null && _c !== void 0 ? _c : '';
            var image = (data === null || data === void 0 ? void 0 : data.image)
                ? new Image(data.image)
                : new Image({
                    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAn8B9oOKlwAAAABJRU5ErkJggg==',
                });
            var value = (_d = data === null || data === void 0 ? void 0 : data.value) !== null && _d !== void 0 ? _d : '';
            return new Contact(id, title, url, image, value);
        }
    });
    Object.defineProperty(ContactMethods.prototype, "getContactGitHub", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (url) {
            var id = 'gitHub';
            var title = 'GitHub';
            var className = 'fa fa-github fa-fw';
            var image = new Image({
                id: id,
                title: title,
                class_name: className,
            });
            return new Contact(id, title, url, image, '');
        }
    });
    Object.defineProperty(ContactMethods.prototype, "getContactInstagram", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (url) {
            var id = 'instagram';
            var title = 'Instagram';
            var className = 'fa fa-instagram fa-fw';
            var image = new Image({
                id: id,
                title: title,
                class_name: className,
            });
            return new Contact(id, title, url, image, '');
        }
    });
    Object.defineProperty(ContactMethods.prototype, "getContactLinkedIn", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (url) {
            var id = 'linkedIn';
            var title = 'LinkedIn';
            var className = 'fa fa-linkedin fa-fw';
            var image = new Image({
                id: id,
                title: title,
                class_name: className,
            });
            return new Contact(id, title, url, image, '');
        }
    });
    Object.defineProperty(ContactMethods.prototype, "getContactX", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (url) {
            var id = 'x';
            var title = 'X';
            var className = 'fa-brands fa-x-twitter';
            var image = new Image({
                id: id,
                title: title,
                class_name: className,
            });
            return new Contact(id, title, url, image, '');
        }
    });
    Object.defineProperty(ContactMethods.prototype, "getContactEmail", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (value) {
            var id = 'email';
            var title = 'Email';
            var className = 'fa fa-envelope fa-fw';
            var image = new Image({
                id: id,
                title: title,
                class_name: className,
            });
            return new Contact(id, title, '', image, value);
        }
    });
    Object.defineProperty(ContactMethods.prototype, "getContactPhone", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (value) {
            var id = 'phone';
            var title = 'Phone';
            var className = 'fa-solid fa-phone';
            var image = new Image({
                id: id,
                title: title,
                class_name: className,
            });
            return new Contact(id, title, '', image, value);
        }
    });
    return ContactMethods;
}(Model));
export default ContactMethods;
