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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import { collection, doc, getDoc } from 'firebase/firestore';
import db from '../services/firebase/config';
import Model from '../model/Model';
var ContactPage = /** @class */ (function (_super) {
    __extends(ContactPage, _super);
    function ContactPage(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "title", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.title = data === null || data === void 0 ? void 0 : data.title;
        _this.message = data === null || data === void 0 ? void 0 : data.message;
        return _this;
    }
    return ContactPage;
}(Model));
export { ContactPage };
var initialState = {
    contactLoading: false,
    contactError: null,
    contactErrorMessage: '',
    contactSuccessMessage: '',
    contactPage: null,
};
export var sendEmail = createAsyncThunk('contact/sendEmail', function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var response, responseData, error_1, err;
    var page = _b.page, firstname = _b.firstname, lastname = _b.lastname, email = _b.email, subject = _b.subject, msg = _b.msg;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("/wp-json/seven-tech/v1/email/".concat(page), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email,
                            firstname: firstname,
                            lastname: lastname,
                            subject: subject,
                            message: msg,
                        }),
                    })];
            case 1:
                response = _c.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _c.sent();
                return [2 /*return*/, responseData];
            case 3:
                error_1 = _c.sent();
                err = error_1;
                console.error(err);
                throw new Error(err.message);
            case 4: return [2 /*return*/];
        }
    });
}); });
export var getContactPageContent = createAsyncThunk('about/getContactPageContent', function () { return __awaiter(void 0, void 0, void 0, function () {
    var contactCollection, docRef, docSnap, error_2, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                contactCollection = collection(db, 'content');
                docRef = doc(contactCollection, 'contact');
                return [4 /*yield*/, getDoc(docRef)];
            case 1:
                docSnap = _a.sent();
                if (!docSnap.exists()) {
                    throw new Error('Contact page content could not be found.');
                }
                return [2 /*return*/, new ContactPage(docSnap.data()).toObject()];
            case 2:
                error_2 = _a.sent();
                err = error_2;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
var contactSliceOptions = {
    name: 'contact',
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            .addCase(sendEmail.pending, function (state) {
            state.contactLoading = true;
            state.contactError = null;
            state.contactErrorMessage = '';
        })
            .addCase(getContactPageContent.fulfilled, function (state, action) {
            state.contactLoading = false;
            state.contactError = null;
            state.contactErrorMessage = '';
            state.contactPage = action.payload;
        })
            .addCase(sendEmail.fulfilled, function (state, action) {
            state.contactLoading = false;
            state.contactError = null;
            state.contactErrorMessage = '';
            state.contactSuccessMessage = action.payload;
        })
            .addCase(sendEmail.rejected, function (state, action) {
            state.contactLoading = false;
            state.contactError = action.error || null;
            state.contactErrorMessage = action.error.message || '';
        });
    },
};
export var contactSlice = createSlice(contactSliceOptions);
export default contactSlice;
