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
import { setMessage, setMessageType, setShowStatusBar, } from '../../../controllers/messageSlice';
import { getProjectTypes, getLanguages, getFrameworks, getTechnologies, } from '../../../controllers/taxonomiesSlice';
import { updateDevelopment } from '../../../controllers/updateSlice';
var UpdateDevelopment = function (_a) {
    var projectID = _a.projectID, development = _a.development;
    var dispatch = useDispatch();
    var _b = useSelector(function (state) { return state.update; }), updateLoading = _b.updateLoading, updateErrorMessage = _b.updateErrorMessage, updateSuccessMessage = _b.updateSuccessMessage;
    var _c = useSelector(function (state) { return state.taxonomies; }), projectTypesObject = _c.projectTypesObject, languagesObject = _c.languagesObject, frameworksObject = _c.frameworksObject, technologiesObject = _c.technologiesObject;
    useEffect(function () {
        if (updateLoading) {
            dispatch(setMessage('Standbye while an attempt to update the development section of your project is made.'));
            dispatch(setMessageType('info'));
        }
    }, [updateLoading, dispatch]);
    useEffect(function () {
        if (updateErrorMessage) {
            dispatch(setMessage(updateErrorMessage));
            dispatch(setMessageType('error'));
        }
    }, [updateErrorMessage, dispatch]);
    useEffect(function () {
        if (updateSuccessMessage) {
            dispatch(setMessage(updateSuccessMessage));
            dispatch(setMessageType('success'));
        }
    }, [updateSuccessMessage, dispatch]);
    useEffect(function () {
        dispatch(getProjectTypes());
    }, []);
    useEffect(function () {
        dispatch(getLanguages());
    }, []);
    useEffect(function () {
        dispatch(getFrameworks());
    }, []);
    useEffect(function () {
        dispatch(getTechnologies());
    }, []);
    var _d = __read(useState(development.checkList), 2), checkList = _d[0], setCheckList = _d[1];
    var _e = __read(useState(development.versionsList), 2), versionsList = _e[0], setVersionsList = _e[1];
    var _f = __read(useState(new Set(development.types)), 2), selectedProjectTypes = _f[0], setSelectedProjectTypes = _f[1];
    var _g = __read(useState(new Set(development.languages)), 2), selectedLanguages = _g[0], setSelectedLanguages = _g[1];
    var _h = __read(useState(new Set(development.frameworks)), 2), selectedFrameworks = _h[0], setSelectedFrameworks = _h[1];
    var _j = __read(useState(new Set(development.technologies)), 2), selectedTechnologies = _j[0], setSelectedTechnologies = _j[1];
    var handleProjectTypesCheckboxChange = function (id) {
        setSelectedProjectTypes(function (prevSelectedIds) {
            var updatedSelection = new Set(prevSelectedIds);
            if (updatedSelection.has(id)) {
                updatedSelection.delete(id);
            }
            else {
                updatedSelection.add(id);
            }
            return updatedSelection;
        });
    };
    var handleLanguagesCheckboxChange = function (id) {
        setSelectedLanguages(function (prevSelectedIds) {
            var updatedSelection = new Set(prevSelectedIds);
            if (updatedSelection.has(id)) {
                updatedSelection.delete(id);
            }
            else {
                updatedSelection.add(id);
            }
            return updatedSelection;
        });
    };
    var handleFrameworksCheckboxChange = function (id) {
        setSelectedFrameworks(function (prevSelectedIds) {
            var updatedSelection = new Set(prevSelectedIds);
            if (updatedSelection.has(id)) {
                updatedSelection.delete(id);
            }
            else {
                updatedSelection.add(id);
            }
            return updatedSelection;
        });
    };
    var handleTechnologiesCheckboxChange = function (id) {
        setSelectedTechnologies(function (prevSelectedIds) {
            var updatedSelection = new Set(prevSelectedIds);
            if (updatedSelection.has(id)) {
                updatedSelection.delete(id);
            }
            else {
                updatedSelection.add(id);
            }
            return updatedSelection;
        });
    };
    var handleUpdateDelivery = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var form, formData, developmentData_1, data, err;
        return __generator(this, function (_a) {
            e.preventDefault();
            try {
                form = document.getElementById('update_delivery');
                formData = new FormData(form);
                developmentData_1 = {};
                formData.forEach(function (value, key) {
                    developmentData_1[key] = value;
                });
                data = {
                    id: projectID,
                    delivery: developmentData_1
                };
                dispatch(updateDevelopment(data));
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
    return (_jsxs(_Fragment, { children: [_jsx("h2", { className: "title", children: "development" }), _jsxs("div", { className: "project-selection", children: [_jsx("label", { htmlFor: "options", children: "Choose Project Types:" }), Array.isArray(projectTypesObject) &&
                        projectTypesObject.map(function (item) { return (_jsxs("div", { className: "project-checkbox", children: [_jsx("input", { type: "checkbox", id: "checkbox-".concat(item.id), value: item.id, checked: selectedProjectTypes.has(item.id), onChange: function () { return handleProjectTypesCheckboxChange(item.id); } }), _jsx("label", { htmlFor: "checkbox-".concat(item.id), children: item.title })] }, item.id)); })] }), _jsxs("div", { className: "project-selection", children: [_jsx("label", { htmlFor: "options", children: "Choose Languages:" }), Array.isArray(languagesObject) &&
                        languagesObject.map(function (item) { return (_jsxs("div", { className: "project-checkbox", children: [_jsx("input", { type: "checkbox", id: "checkbox-".concat(item.id), value: item.id, checked: selectedLanguages.has(item.id), onChange: function () { return handleLanguagesCheckboxChange(item.id); } }), _jsx("label", { htmlFor: "checkbox-".concat(item.id), children: item.title })] }, item.id)); })] }), _jsxs("div", { className: "project-selection", children: [_jsx("label", { htmlFor: "options", children: "Choose Frameworks:" }), Array.isArray(frameworksObject) &&
                        frameworksObject.map(function (item) { return (_jsxs("div", { className: "project-checkbox", children: [_jsx("input", { type: "checkbox", id: "checkbox-".concat(item.id), value: item.id, checked: selectedFrameworks.has(item.id), onChange: function () { return handleFrameworksCheckboxChange(item.id); } }), _jsx("label", { htmlFor: "checkbox-".concat(item.id), children: item.title })] }, item.id)); })] }), _jsxs("div", { className: "project-selection", children: [_jsx("label", { htmlFor: "options", children: "Choose Technologies:" }), Array.isArray(technologiesObject) &&
                        technologiesObject.map(function (item) { return (_jsxs("div", { className: "project-checkbox", children: [_jsx("input", { type: "checkbox", id: "checkbox-".concat(item.id), value: item.id, checked: selectedTechnologies.has(item.id), onChange: function () { return handleTechnologiesCheckboxChange(item.id); } }), _jsx("label", { htmlFor: "checkbox-".concat(item.id), children: item.title })] }, item.id)); })] }), " "] }));
};
export default UpdateDevelopment;
