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
import { lazy, Suspense, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingComponent from './views/components/LoadingComponent';
import HeaderComponent from './views/components/HeaderComponent';
import FooterComponent from './views/components/FooterComponent';
var Home = lazy(function () { return import('./views/Home'); });
var About = lazy(function () { return import('./views/About'); });
var PortfolioPage = lazy(function () { return import('./views/PortfolioPage'); });
var ProjectPage = lazy(function () { return import('./views/ProjectPage'); });
var Search = lazy(function () { return import('./views/Search'); });
var Resume = lazy(function () { return import('./views/Resume'); });
var Contact = lazy(function () { return import('./views/Contact'); });
var AddSkill = lazy(function () { return import('./views/SkillAdd'); });
var ProjectAdd = lazy(function () { return import('./views/ProjectAdd'); });
var NotFound = lazy(function () { return import('./views/NotFound'); });
import { getUser, getOrganizations, getRepos } from './controllers/githubSlice';
import { getPortfolio } from './controllers/portfolioSlice';
import { getLanguages, getProjectTypes, getFrameworks, getTechnologies, } from './controllers/taxonomiesSlice';
import Repo from './model/Repo';
import User from './model/User';
import Portfolio from './model/Portfolio';
import ProjectUpdate from './views/ProjectUpdate';
var App = function () {
    var dispatch = useDispatch();
    var _a = useSelector(function (state) { return state.github; }), userObject = _a.userObject, organizations = _a.organizations;
    var portfolioObject = useSelector(function (state) { return state.portfolio; }).portfolioObject;
    var _b = useSelector(function (state) { return state.taxonomies; }), projectTypesObject = _b.projectTypesObject, languagesObject = _b.languagesObject, frameworksObject = _b.frameworksObject, technologiesObject = _b.technologiesObject;
    var _c = __read(useState(new Portfolio), 2), portfolio = _c[0], setPortfolio = _c[1];
    var user = new User(userObject);
    useEffect(function () {
        document.title = user.name;
    }, []);
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
    useEffect(function () {
        if (user.id) {
            dispatch(getUser(user.id));
        }
    }, [user.id]);
    useEffect(function () {
        if (user.id) {
            dispatch(getOrganizations());
        }
    }, [user.id]);
    // useEffect(() => {
    //   if (organizations) {
    //     userType?.setOrganizations(organizations);
    //   }
    // }, [organizations]);
    useEffect(function () {
        var fetchPortfolio = function () { return __awaiter(void 0, void 0, void 0, function () {
            var reposObject, repos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dispatch(getRepos()).unwrap()];
                    case 1:
                        reposObject = _a.sent();
                        repos = [];
                        if (Array.isArray(reposObject) && reposObject.length > 0) {
                            reposObject.forEach(function (repo) {
                                repos.push(new Repo(repo));
                            });
                        }
                        dispatch(getPortfolio(repos));
                        return [2 /*return*/];
                }
            });
        }); };
        if (user.id) {
            fetchPortfolio();
        }
    }, [dispatch, user.id]);
    useEffect(function () {
        if (portfolioObject ||
            projectTypesObject ||
            languagesObject ||
            frameworksObject ||
            technologiesObject) {
            setPortfolio(new Portfolio(portfolioObject, projectTypesObject, languagesObject, frameworksObject, technologiesObject));
        }
    }, [portfolioObject,
        projectTypesObject,
        languagesObject,
        frameworksObject,
        technologiesObject]);
    return (_jsxs(_Fragment, { children: [_jsx(HeaderComponent, { name: user.name }), _jsx(Router, { children: _jsx(Suspense, { fallback: _jsx(LoadingComponent, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, { user: user, portfolio: portfolio }) }), _jsx(Route, { path: "/about", element: _jsx(About, { user: user }) }), _jsx(Route, { path: "/portfolio", element: _jsx(PortfolioPage, { user: user, portfolio: portfolio }) }), _jsx(Route, { path: "/portfolio/:projectID", element: _jsx(ProjectPage, {}) }), _jsx(Route, { path: "/projects/:taxonomy/:term", element: _jsx(Search, { portfolio: portfolio }) }), _jsx(Route, { path: "/resume", element: _jsx(Resume, { user: user }) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, { user: user }) }), _jsx(Route, { path: "/add/project", element: _jsx(ProjectAdd, {}) }), _jsx(Route, { path: "/update/project/:projectID", element: _jsx(ProjectUpdate, {}) }), _jsx(Route, { path: "/add/skill", element: _jsx(AddSkill, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }) }), _jsx(FooterComponent, { contactMethods: user.contactMethods })] }));
};
export default App;
