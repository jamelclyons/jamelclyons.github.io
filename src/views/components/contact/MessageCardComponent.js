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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage, setMessageType, } from '../../../controllers/messageSlice';
var MessageCardComponent = function (_a) {
    var page = _a.page;
    var dispatch = useDispatch();
    var _b = __read(useState(), 2), firstName = _b[0], setFirstName = _b[1];
    var _c = __read(useState(), 2), lastName = _c[0], setLastName = _c[1];
    var _d = __read(useState(), 2), email = _d[0], setEmail = _d[1];
    var _e = __read(useState(), 2), subject = _e[0], setSubject = _e[1];
    var _f = __read(useState(), 2), msg = _f[0], setMsg = _f[1];
    var handleInputChange = function (e) {
        try {
            var target = e.target;
            var name_1 = target.name, value = target.value;
            if (name_1 === 'first_name') {
                setFirstName(value);
            }
            if (name_1 === 'last_name') {
                setLastName(value);
            }
            if (name_1 === 'email') {
                setEmail(value);
            }
            if (name_1 === 'subject') {
                setSubject(value);
            }
            if (name_1 === 'msg') {
                setMsg(value);
            }
        }
        catch (error) {
            var err = error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var form, formData;
        return __generator(this, function (_a) {
            form = document.getElementById('message_card');
            formData = new FormData(form);
            console;
            return [2 /*return*/];
        });
    }); };
    return (_jsx(_Fragment, { children: _jsx("form", { className: "message-card", id: 'message_card', children: _jsx("table", { children: _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { children: _jsx("input", { type: "text", name: "first_name", className: "input", id: "first_name", placeholder: "First Name", onChange: handleInputChange, value: firstName }) }), _jsx("td", { children: _jsx("input", { type: "text", name: "last_name", className: "input", id: "last_name", placeholder: "Last Name", onChange: handleInputChange, value: lastName }) })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("input", { name: "email", type: "email", id: "contact_email", className: "input", placeholder: "Email", onChange: handleInputChange, value: email }) }), _jsx("td", { children: _jsx("input", { name: "subject", type: "text", id: "contact_subject", className: "input", placeholder: "Subject", onChange: handleInputChange, value: subject }) })] }), _jsx("tr", { children: _jsx("td", { colSpan: 2, children: _jsx("textarea", { name: "msg", id: "contact_message", placeholder: "Message", onChange: handleInputChange, value: msg }) }) }), _jsx("tr", { children: _jsxs("td", { colSpan: 2, children: [_jsx("input", { type: "hidden", name: "action", value: "thfw_email_contact" }), _jsx("button", { className: "sendmsg", id: "contact_submit", name: "submit", type: "button", value: "submit", onClick: handleSubmit, children: _jsx("h3", { children: "SEND" }) })] }) })] }) }) }) }));
};
export default MessageCardComponent;
