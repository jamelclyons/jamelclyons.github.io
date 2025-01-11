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
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setMessage, setMessageType, setShowStatusBar, } from '../controllers/messageSlice';
import ProjectsComponent from './components/portfolio/ProjectsComponent';
import TaxList from './components/TaxList';
import TaxListIcon from './components/TaxListIcon';
var Search = function (_a) {
    var portfolio = _a.portfolio;
    var projects = portfolio.projects, projectTypes = portfolio.projectTypes, languages = portfolio.languages, frameworks = portfolio.frameworks, technologies = portfolio.technologies;
    var dispatch = useDispatch();
    var _b = useParams(), taxonomy = _b.taxonomy, term = _b.term;
    var _c = useSelector(function (state) { return state.portfolio; }), portfolioLoading = _c.portfolioLoading, portfolioErrorMessage = _c.portfolioErrorMessage;
    var _d = __read(useState(projects), 2), filteredProjects = _d[0], setFilteredProjects = _d[1];
    useEffect(function () {
        if (taxonomy && term) {
            var updatedProjects_1 = new Set();
            projects.forEach(function (project) {
                if (taxonomy == 'project-types') {
                    if (project.process.development.types.has(term)) {
                        updatedProjects_1.add(project);
                    }
                }
                if (taxonomy == 'languages') {
                    if (project.process.development.languages.has(term)) {
                        updatedProjects_1.add(project);
                    }
                }
                if (taxonomy == 'frameworks') {
                    if (project.process.development.frameworks.has(term)) {
                        updatedProjects_1.add(project);
                    }
                }
                if (taxonomy == 'technologies') {
                    if (project.process.development.technologies.has(term)) {
                        updatedProjects_1.add(project);
                    }
                }
            });
            setFilteredProjects(updatedProjects_1);
        }
    }, [taxonomy, term, dispatch]);
    useEffect(function () {
        if (taxonomy && term) {
            var skillClass = taxonomy.charAt(0).toUpperCase() + taxonomy.slice(1).toLowerCase();
            var skill = term.charAt(0).toUpperCase() + term.slice(1).toLowerCase();
            document.title = "Projects > ".concat(skillClass, " > ").concat(skill);
        }
    }, [taxonomy, term]);
    useEffect(function () {
        if (portfolioLoading) {
            dispatch(setShowStatusBar(Date.now()));
        }
    }, [portfolioLoading]);
    useEffect(function () {
        if (portfolioErrorMessage) {
            dispatch(setMessage(portfolioErrorMessage));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    }, [portfolioErrorMessage]);
    return (_jsx("section", { className: "search", children: _jsxs(_Fragment, { children: [projects && projects.size > 0 && _jsx(ProjectsComponent, { projects: filteredProjects }), projectTypes.size > 0 && _jsx(TaxList, { taxonomies: projectTypes, title: 'Project Types' }), languages.size > 0 && _jsx(TaxListIcon, { taxonomies: languages, title: 'Languages' }), frameworks.size > 0 && _jsx(TaxListIcon, { taxonomies: frameworks, title: 'Frameworks' }), technologies.size > 0 && _jsx(TaxListIcon, { taxonomies: technologies, title: 'Technologies' })] }) }));
};
export default Search;
