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
import ProjectDetails from '../../../model/ProjectDetails';
import { setMessage, setMessageType, setShowStatusBar, } from '../../../controllers/messageSlice';
import { Privacy, privacyFromString } from '../../../model/enum/Enums';
var UpdateDetails = function (_a) {
    var projectID = _a.projectID, details = _a.details;
    var dispatch = useDispatch();
    var _b = useSelector(function (state) { return state.update; }), updateLoading = _b.updateLoading, updateErrorMessage = _b.updateErrorMessage, updateSuccessMessage = _b.updateSuccessMessage;
    useEffect(function () {
        if (updateLoading) {
            dispatch(setMessage('Standbye while an attempt to update the details section of your project is made.'));
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
    var _c = __read(useState(details.privacy), 2), privacy = _c[0], setPrivacy = _c[1];
    var _d = __read(useState(details.clientID), 2), clientID = _d[0], setClientID = _d[1];
    var _e = __read(useState(details.clientName), 2), clientName = _e[0], setClientName = _e[1];
    var _f = __read(useState(details.startDate), 2), startDate = _f[0], setStartDate = _f[1];
    var _g = __read(useState(details.endDate), 2), endDate = _g[0], setEndDate = _g[1];
    var _h = __read(useState(details.teamList), 2), teamList = _h[0], setTeamList = _h[1];
    var handleChangeSelect = function (e) {
        try {
            var target = e.target;
            var name_1 = target.name, value = target.value;
            if (name_1 === 'privacy') {
                setPrivacy(privacyFromString(value));
            }
        }
        catch (error) {
            var err = error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };
    var handleChange = function (e) {
        try {
            var target = e.target;
            var name_2 = target.name, value = target.value;
            if (name_2 === 'client_id') {
                setClientID(value);
            }
            if (name_2 === 'client_name') {
                setClientName(value);
            }
            if (name_2 === 'start_date') {
                setStartDate(value);
            }
            if (name_2 === 'end_date') {
                setEndDate(value);
            }
        }
        catch (error) {
            var err = error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };
    var handleUpdateDetails = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var form, formData, detailsData_1, details_1, data, err;
        return __generator(this, function (_a) {
            e.preventDefault();
            try {
                form = document.getElementById('update_details');
                formData = new FormData(form);
                detailsData_1 = {};
                formData.forEach(function (value, key) {
                    detailsData_1[key] = value;
                });
                details_1 = new ProjectDetails(detailsData_1);
                data = {
                    id: projectID,
                    details: details_1.toObject()
                };
                console.log(data);
                // dispatch(updateDetails(data));
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
    return (_jsxs(_Fragment, { children: [_jsx("h2", { className: 'title', children: "Details" }), _jsxs("form", { action: "", id: 'update_details', children: [_jsx("label", { htmlFor: "privacy", children: "Privacy:" }), privacy && _jsxs("p", { children: ["Current Privacy Setting: ", privacy.toString().charAt(0).toUpperCase() + privacy.toString().slice(1)] }), _jsxs("select", { id: "privacy", name: 'privacy', value: privacy, onChange: handleChangeSelect, children: [_jsx("option", { value: Privacy.Private, children: "Private" }), _jsx("option", { value: Privacy.Public, children: "Public" })] }), _jsx("label", { htmlFor: "client_id", children: "Client ID:" }), _jsx("input", { type: "text", id: 'client_id', name: 'client_id', value: clientID, onChange: handleChange }), _jsx("label", { htmlFor: "client_name", children: "Client Name:" }), _jsx("input", { type: "text", id: 'client_name', name: 'client_name', value: clientName, onChange: handleChange }), _jsx("label", { htmlFor: "start_date", children: "Start Date:" }), _jsx("input", { type: "date", id: "start_date", name: "start_date", value: startDate, min: "2010-06-16", onChange: handleChange }), _jsx("label", { htmlFor: "end_date", children: "End Date:" }), _jsx("input", { type: "date", id: "end_date", name: "end_date", value: endDate, min: "2010-06-16", onChange: handleChange }), _jsx("button", { onClick: handleUpdateDetails, children: _jsx("h3", { children: "update" }) })] })] }));
};
export default UpdateDetails;
