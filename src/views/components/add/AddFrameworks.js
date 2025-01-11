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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFramework } from '../../../controllers/addSlice';
import { setMessage, setMessageType, setShowStatusBar, } from '../../../controllers/messageSlice';
import StatusBarComponent from '../StatusBarComponent';
import Taxonomy from '../../../model/Taxonomy';
var AddFrameworks = function () {
    var dispatch = useDispatch();
    var _a = useSelector(function (state) { return state.add; }), addLoading = _a.addLoading, addStatusCode = _a.addStatusCode, addSuccessMessage = _a.addSuccessMessage, addErrorMessage = _a.addErrorMessage;
    var frameworksObject = useSelector(function (state) { return state.taxonomies; }).frameworksObject;
    var _b = __read(useState(''), 2), id = _b[0], setId = _b[1];
    var _c = __read(useState(''), 2), title = _c[0], setTitle = _c[1];
    var _d = __read(useState(''), 2), path = _d[0], setPath = _d[1];
    var _e = __read(useState(''), 2), icon_url = _e[0], setIconUrl = _e[1];
    var _f = __read(useState(''), 2), class_name = _f[0], setClassName = _f[1];
    var handleChange = function (e) {
        try {
            var target = e.target;
            var name_1 = target.name, value = target.value;
            if (name_1 === 'id') {
                setId(value);
            }
            else if (name_1 === 'title') {
                setTitle(value);
            }
            else if (name_1 === 'path') {
                setPath(value);
            }
            else if (name_1 === 'icon_url') {
                setIconUrl(value);
            }
            else if (name_1 === 'class_name') {
                setClassName(value);
            }
        }
        catch (error) {
            var err = error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };
    var handleAddFramework = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var framework, err;
        return __generator(this, function (_a) {
            e.preventDefault();
            try {
                framework = new Taxonomy({
                    id: id,
                    type: 'technologies',
                    title: title,
                    icon_url: icon_url,
                    class_name: class_name
                });
                dispatch(addFramework(framework));
                dispatch(setMessageType('info'));
                dispatch(setMessage('Standbye while an attempt to log you is made.'));
            }
            catch (error) {
                err = error;
                dispatch(setMessageType('error'));
                dispatch(setMessage(err.message));
                dispatch(setShowStatusBar(Date.now()));
            }
            return [2 /*return*/];
        });
    }); };
    useEffect(function () {
        if (addLoading) {
            dispatch(setShowStatusBar(Date.now()));
        }
    }, [addLoading]);
    useEffect(function () {
        if (addSuccessMessage) {
            dispatch(setMessage(addSuccessMessage));
            dispatch(setMessageType('success'));
            dispatch(setShowStatusBar(Date.now()));
        }
    }, [addSuccessMessage]);
    useEffect(function () {
        if (addErrorMessage) {
            dispatch(setMessage(addErrorMessage));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    }, [addErrorMessage]);
    return (_jsx(_Fragment, { children: _jsxs("main", { children: [_jsx("h2", { children: "Add Framework" }), _jsxs("form", { action: "", children: [_jsx("input", { type: "text", name: "id", placeholder: "ID", value: id, onChange: handleChange }), _jsx("input", { type: "text", name: "title", placeholder: "Title", value: title, onChange: handleChange }), _jsx("input", { type: "text", name: "icon_url", placeholder: "icon_url", value: icon_url, onChange: handleChange }), _jsx("button", { onClick: handleAddFramework, children: _jsx("h3", { children: "add" }) })] }), _jsx(StatusBarComponent, {})] }) }));
};
export default AddFrameworks;
