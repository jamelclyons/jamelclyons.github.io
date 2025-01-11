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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage, setMessageType, setShowStatusBar, } from '../../../controllers/messageSlice';
var UpdateProblem = function (_a) {
    var projectID = _a.projectID, problem = _a.problem;
    var dispatch = useDispatch();
    var _b = useSelector(function (state) { return state.update; }), updateLoading = _b.updateLoading, updateErrorMessage = _b.updateErrorMessage, updateSuccessMessage = _b.updateSuccessMessage;
    useEffect(function () {
        if (updateLoading) {
            dispatch(setMessage('Standbye while an attempt to update the problem section of your project is made.'));
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
    var _c = __read(useState(problem === null || problem === void 0 ? void 0 : problem.gallery), 2), problemGallery = _c[0], setProblemGallery = _c[1];
    // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //   try {
    //     const target = e.target as HTMLInputElement;
    //     const { name, value } = target;
    //     if (name === 'progress') {
    //       setProgress(value.toString());
    //     }
    //   } catch (error) {
    //     const err = error as Error;
    //     dispatch(setMessage(err.message));
    //     dispatch(setMessageType('error'));
    //   }
    // };
    var handleUpdateSolution = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var form, formData, status_1, err;
        return __generator(this, function (_a) {
            e.preventDefault();
            try {
                form = document.getElementById('update_problem');
                formData = new FormData(form);
                status_1 = {};
                formData.forEach(function (value, key) {
                    status_1[key] = value;
                });
                // dispatch(addProject(project));
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
    return (_jsxs(_Fragment, { children: [_jsx("h2", { className: "title", children: "problem" }), _jsx("form", { action: "", id: 'update_problem', children: _jsx("button", { onClick: handleUpdateSolution, children: _jsx("h3", { children: "update" }) }) })] }));
};
export default UpdateProblem;
