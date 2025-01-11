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
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { marked } from 'marked';
import DescriptionComponent from '../DescriptionComponent';
import Details from './Details';
import TheSolution from './TheSolution';
import TheProblem from './TheProblem';
import TheProcess from './TheProcess';
import RepoContent from '../../../model/RepoContent';
import { loadMarkdown } from '../../../controllers/contentSlice';
var ProjectComponent = function (_a) {
    var project = _a.project, repoQuery = _a.repoQuery;
    var title = project.title, description = project.description, solution = project.solution, process = project.process, problem = project.problem, details = project.details;
    var contents = useSelector(function (state) { return state.github; }).contents;
    var _b = __read(useState(null), 2), solutionContent = _b[0], setSolutionContent = _b[1];
    var _c = __read(useState(null), 2), designContent = _c[0], setDesignContent = _c[1];
    var _d = __read(useState(null), 2), developmentContent = _d[0], setDevelopmentContent = _d[1];
    var _e = __read(useState(null), 2), deliveryContent = _e[0], setDeliveryContent = _e[1];
    var _f = __read(useState(null), 2), problemContent = _f[0], setProblemContent = _f[1];
    useEffect(function () {
        if (Array.isArray(contents) && contents.length > 0) {
            contents.map(function (content) {
                if (content.type === 'file') {
                    if (content.name === 'TheSolution.md') {
                        setSolutionContent(new RepoContent(content));
                    }
                    if (content.name === 'Design.md') {
                        setDesignContent(new RepoContent(content));
                    }
                    if (content.name === 'Development.md') {
                        setDevelopmentContent(new RepoContent(content));
                    }
                    if (content.name === 'Delivery.md') {
                        setDeliveryContent(new RepoContent(content));
                    }
                    if (content.name === 'TheProblem.md') {
                        setProblemContent(new RepoContent(content));
                    }
                }
            });
        }
    }, [contents]);
    useEffect(function () {
        if (solutionContent) {
            loadMarkdown(solutionContent.downloadURL)
                .then(function (markdown) {
                if (typeof markdown === 'string') {
                    solution.content = marked(markdown).valueOf();
                }
            });
        }
    }, [contents, solutionContent]);
    useEffect(function () {
        if (designContent) {
            loadMarkdown(designContent.downloadURL)
                .then(function (markdown) {
                if (typeof markdown === 'string') {
                    process.design.content = marked(markdown).valueOf();
                }
            });
        }
    }, [contents, designContent]);
    useEffect(function () {
        if (developmentContent) {
            loadMarkdown(developmentContent.downloadURL)
                .then(function (markdown) {
                if (typeof markdown === 'string') {
                    process.development.content = marked(markdown).valueOf();
                }
            });
        }
    }, [contents, developmentContent]);
    useEffect(function () {
        if (deliveryContent) {
            loadMarkdown(deliveryContent.downloadURL)
                .then(function (markdown) {
                if (typeof markdown === 'string') {
                    process.delivery.content = marked(markdown).valueOf();
                }
            });
        }
    }, [contents, deliveryContent]);
    useEffect(function () {
        if (problemContent) {
            loadMarkdown(problemContent.downloadURL)
                .then(function (markdown) {
                if (typeof markdown === 'string') {
                    problem.content = marked(markdown).valueOf();
                }
            });
        }
    }, [contents, problemContent]);
    return (_jsx(_Fragment, { children: _jsxs("main", { className: "project", children: [title !== '' && _jsx("h1", { className: "title", children: title }), _jsx(DescriptionComponent, { description: description }), _jsx(TheSolution, { solution: solution }), _jsx(TheProcess, { process: process }), _jsx(TheProblem, { problem: problem }), _jsx(Details, { details: details, contributorsQuery: repoQuery })] }) }));
};
export default ProjectComponent;
