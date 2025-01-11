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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingComponent from './components/LoadingComponent';
import ProjectComponent from './components/project/ProjectComponent';
import StatusBarComponent from './components/StatusBarComponent';
import { getRepoContents } from '../controllers/githubSlice';
import { setMessage, setMessageType, setShowStatusBar } from '../controllers/messageSlice';
import GitHubRepoQuery from '../model/GitHubRepoQuery';
var ProjectPage = function () {
    var dispatch = useDispatch();
    var location = useLocation();
    var _a = useSelector(function (state) { return state.project; }), projectLoading = _a.projectLoading, projectErrorMessage = _a.projectErrorMessage;
    var project = location.state;
    var _b = __read(useState(new GitHubRepoQuery(project.owner, project.id)), 2), repoQuery = _b[0], setRepoQuery = _b[1];
    useEffect(function () {
        if (project) {
            setRepoQuery(new GitHubRepoQuery(project.owner, project.id));
        }
    }, [project]);
    useEffect(function () {
        if (project.title) {
            document.title = project.title.toUpperCase();
        }
    }, [project]);
    useEffect(function () {
        if (repoQuery) {
            dispatch(getRepoContents({
                owner: repoQuery.owner,
                repo: repoQuery.repo,
                path: ''
            }));
        }
    }, [dispatch, project]);
    useEffect(function () {
        if (projectErrorMessage) {
            dispatch(setMessageType('error'));
            dispatch(setMessage(projectErrorMessage));
            dispatch(setShowStatusBar(true));
        }
    }, [dispatch, projectErrorMessage]);
    if (projectLoading) {
        return _jsx(LoadingComponent, {});
    }
    return (_jsx("section", { className: "project", children: _jsx(_Fragment, { children: projectErrorMessage ? (_jsx("main", { className: "error-page", children: _jsx(StatusBarComponent, {}) })) : (project && _jsx(ProjectComponent, { project: project, repoQuery: repoQuery })) }) }));
};
export default ProjectPage;
