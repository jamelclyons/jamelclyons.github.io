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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Repo from '../model/Repo';
import { getProject } from '../controllers/projectSlice';
import { updateProject } from '../controllers/updateSlice';
import { setMessage, setMessageType, setShowStatusBar, } from '../controllers/messageSlice';
import UpdateDetails from './components/update/UpdateDetails';
import UpdateProcess from './components/update/UpdateProcess';
import UpdateSolution from './components/update/UpdateSolution';
import UpdateProblem from './components/update/UpdateProblem';
import StatusBarComponent from './components/StatusBarComponent';
import Project from '../model/Project';
var ProjectUpdate = function () {
    var dispatch = useDispatch();
    var projectID = useParams().projectID;
    var _a = useSelector(function (state) { return state.update; }), updateLoading = _a.updateLoading, updateErrorMessage = _a.updateErrorMessage, updateSuccessMessage = _a.updateSuccessMessage;
    var projectObject = useSelector(function (state) { return state.project; }).projectObject;
    var _b = __read(useState(new Project(projectObject)), 2), project = _b[0], setProject = _b[1];
    var solution = project.solution, process = project.process, problem = project.problem, details = project.details;
    var _c = __read(useState(project.title), 2), title = _c[0], setTitle = _c[1];
    var _d = __read(useState(project.process.development.repoURL), 2), repoURL = _d[0], setRepoURL = _d[1];
    useEffect(function () {
        if (projectID) {
            var repo = new Repo({ id: projectID });
            dispatch(getProject(repo));
        }
    }, [projectID]);
    useEffect(function () {
        if (projectObject) {
            setProject(new Project(projectObject));
        }
    }, [projectID]);
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
    var handleChange = function (e) {
        try {
            var target = e.target;
            var name_1 = target.name, value = target.value;
            if (name_1 === 'repo_url') {
                setRepoURL(value);
            }
            else if (name_1 === 'title') {
                setTitle(value);
            }
        }
        catch (error) {
            var err = error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
        }
    };
    var handleUpdateProject = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var err;
        return __generator(this, function (_a) {
            e.preventDefault();
            try {
                if (!repoURL) {
                    throw new Error('A valid repo url is required.');
                }
                if (!title) {
                    throw new Error('A valid project title is required.');
                }
                project.create(repoURL, title);
                dispatch(updateProject(project.toObject())).unwrap().then(function (response) {
                    dispatch(setMessageType('success'));
                    dispatch(setMessage(response));
                });
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
    return (_jsxs("section", { className: 'update-project', children: [_jsx("h2", { children: "Update Project" }), _jsxs("form", { action: "", id: "add_project", children: [_jsx("input", { type: "text", name: "repo_url", placeholder: "Repo URL", value: repoURL, onChange: handleChange }), _jsx("input", { type: "text", name: "title", placeholder: "Title", value: title, onChange: handleChange }), _jsx("button", { onClick: handleUpdateProject, children: _jsx("h3", { children: "Update" }) })] }), projectID && _jsx(UpdateSolution, { projectID: projectID, solution: solution }), projectID && _jsx(UpdateProcess, { projectID: projectID, process: process }), projectID && _jsx(UpdateProblem, { projectID: projectID, problem: problem }), projectID && _jsx(UpdateDetails, { projectID: projectID, details: details }), _jsx(StatusBarComponent, {})] }));
};
export default ProjectUpdate;
