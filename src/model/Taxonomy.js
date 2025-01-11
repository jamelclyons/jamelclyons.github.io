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
import { snakeCaseToPath } from '../utilities/String';
import Image from './Image';
var Taxonomy = /** @class */ (function (_super) {
    __extends(Taxonomy, _super);
    function Taxonomy(data) {
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "type", {
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
        Object.defineProperty(_this, "path", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "image", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "iconURL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "className", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "usage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.id = (data === null || data === void 0 ? void 0 : data.id) ? data.id : '';
        _this.type = (data === null || data === void 0 ? void 0 : data.type) ? data.type : '';
        _this.title = (data === null || data === void 0 ? void 0 : data.title) ? data.title : '';
        _this.path = _this.type ? snakeCaseToPath(_this.type) : '';
        _this.iconURL = (data === null || data === void 0 ? void 0 : data.icon_url) ? data.icon_url : '';
        _this.className = (data === null || data === void 0 ? void 0 : data.class_name) ? data.class_name : '';
        _this.usage = (data === null || data === void 0 ? void 0 : data.usage) ? data.usage : '';
        _this.image = new Image({
            id: data === null || data === void 0 ? void 0 : data.id,
            title: data === null || data === void 0 ? void 0 : data.title,
            url: _this.iconURL,
            class_name: _this.className,
        });
        return _this;
    }
    Object.defineProperty(Taxonomy.prototype, "isValid", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            if (this.id == '') {
                throw new Error('ID is not valid');
            }
            if (this.type == '') {
                throw new Error('Type is not valid');
            }
            if (this.title == '') {
                throw new Error('Title is not valid');
            }
            if (this.path == '') {
                throw new Error('Path is not valid');
            }
            return true;
        }
    });
    return Taxonomy;
}(Model));
export default Taxonomy;
