var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { camelCaseToSnakeCase } from '../utilities/String';
var Model = /** @class */ (function () {
    function Model() {
    }
    Object.defineProperty(Model.prototype, "isEmpty", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var e_1, _a;
            var properties = Object.entries(this);
            try {
                for (var properties_1 = __values(properties), properties_1_1 = properties_1.next(); !properties_1_1.done; properties_1_1 = properties_1.next()) {
                    var _b = __read(properties_1_1.value, 2), key = _b[0], value = _b[1];
                    if (value !== null &&
                        value !== undefined &&
                        ((typeof value === 'string' && value.trim() !== '') ||
                            (Array.isArray(value) && value.length > 0) ||
                            (typeof value === 'object' && value !== null && Object.keys(value).length > 0) ||
                            value instanceof Set || // Check for Set instances
                            value instanceof Map || // Check for Map instances
                            value instanceof Model) // Check if value is an instance of Model or its subclasses
                    ) {
                        return false;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (properties_1_1 && !properties_1_1.done && (_a = properties_1.return)) _a.call(properties_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        }
    });
    Object.defineProperty(Model.prototype, "toObject", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var properties = Object.entries(this);
            var object = {};
            properties.forEach(function (_a) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                var capitalLetterRegex = /[A-Z]/;
                var finalKey = key;
                if (capitalLetterRegex.test(key)) {
                    finalKey = camelCaseToSnakeCase(key);
                }
                if (value instanceof Set) {
                    object[finalKey] = Array.from(value);
                }
                else if (value instanceof Model) {
                    object[finalKey] = value.toObject();
                }
                else {
                    object[finalKey] = value;
                }
            });
            return object;
        }
    });
    return Model;
}());
export default Model;
