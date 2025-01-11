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
import { useDispatch } from 'react-redux';
import Taxonomy from '../../../model/Taxonomy';
import CheckList from './CheckList';
import ContentComponent from '../content/ContentComponent';
import TaxList from '../TaxList';
import TaxListIcon from '../TaxListIcon';
import { getProjectType, getFramework, getTechnology, } from '../../../controllers/taxonomiesSlice';
import { getTaxImages } from '../../../controllers/taxonomiesSlice';
import { getRepoLanguages } from '../../../controllers/githubSlice';
var Development = function (_a) {
    var development = _a.development;
    var dispatch = useDispatch();
    var checkList = development.checkList, content = development.content, repoURL = development.repoURL, versionsList = development.versionsList;
    var _b = __read(useState(''), 2), owner = _b[0], setOwner = _b[1];
    var _c = __read(useState(''), 2), repo = _c[0], setRepo = _c[1];
    var _d = __read(useState(new Set()), 2), types = _d[0], setTypes = _d[1];
    var _e = __read(useState(), 2), languagesObject = _e[0], setLanguagesObject = _e[1];
    var _f = __read(useState(), 2), technologiesObject = _f[0], setTechnologiesObject = _f[1];
    var _g = __read(useState(new Set()), 2), languages = _g[0], setLanguages = _g[1];
    var _h = __read(useState(new Set()), 2), frameworks = _h[0], setFrameworks = _h[1];
    var _j = __read(useState(new Set()), 2), technologies = _j[0], setTechnologies = _j[1];
    useEffect(function () {
        if (repoURL) {
            try {
                var repoUrl = new URL(repoURL);
                var pathname = repoUrl.pathname;
                var parts = pathname.split('/').filter(Boolean);
                setOwner(parts[0]);
                setRepo(parts[1]);
            }
            catch (error) {
                var err = error;
                console.error('Invalid URL format:', err.message);
            }
        }
    }, [repoURL, dispatch]);
    useEffect(function () {
        if (owner && repo) {
            dispatch(getRepoLanguages({
                owner: owner,
                repo: repo,
                path: ''
            })).unwrap().then(function (contents) {
                setLanguagesObject(contents.languages);
                setTechnologiesObject(contents.technologies);
            });
        }
    }, [owner, repo, dispatch]);
    useEffect(function () {
        if (development.types.size > 0) {
            var taxTypes_1 = new Set();
            var fetchProjectTypes = function () { return __awaiter(void 0, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Promise.all(Array.from(development.types).map(function (tax) { return __awaiter(void 0, void 0, void 0, function () {
                                    var result, taxonomy;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, dispatch(getProjectType(tax))];
                                            case 1:
                                                result = _a.sent();
                                                if (getProjectType.fulfilled.match(result)) {
                                                    taxonomy = result.payload;
                                                    taxTypes_1.add(new Taxonomy(taxonomy));
                                                }
                                                else {
                                                    console.error("Failed to fetch project type:", result.error);
                                                    return [2 /*return*/, null];
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 1:
                            _a.sent();
                            setTypes(taxTypes_1);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error("Error fetching project types:", error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            fetchProjectTypes();
        }
    }, [development, dispatch, setTypes]);
    useEffect(function () {
        if (languagesObject && languagesObject.length > 0) {
            var updatedLanguages_1 = new Set();
            dispatch(getTaxImages({ type: 'languages', taxonomies: languagesObject })).unwrap().then(function (langs) {
                langs.forEach(function (lang) {
                    var language = new Taxonomy(lang);
                    updatedLanguages_1.add(language);
                });
            });
            setLanguages(updatedLanguages_1);
        }
    }, [dispatch, languagesObject, setLanguages]);
    useEffect(function () {
        if (development && development.frameworks.size > 0) {
            var fetchFrameworks_1 = function () { return __awaiter(void 0, void 0, void 0, function () {
                var taxFrameworks_1, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            taxFrameworks_1 = [];
                            return [4 /*yield*/, Promise.all(Array.from(development.frameworks).map(function (tax) { return __awaiter(void 0, void 0, void 0, function () {
                                    var result, taxonomy;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, dispatch(getFramework(tax))];
                                            case 1:
                                                result = _a.sent();
                                                if (getFramework.fulfilled.match(result)) {
                                                    taxonomy = result.payload;
                                                    taxFrameworks_1.push(taxonomy);
                                                }
                                                else {
                                                    console.error("Failed to fetch framework:", result.error);
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, taxFrameworks_1];
                        case 2:
                            error_2 = _a.sent();
                            console.error("Error fetching frameworks:", error_2);
                            return [2 /*return*/, []]; // Ensure a valid fallback return
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            var processFrameworks = function () { return __awaiter(void 0, void 0, void 0, function () {
                var taxFrameworks, frameworks_1, updatedFrameworks, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetchFrameworks_1()];
                        case 1:
                            taxFrameworks = _a.sent();
                            if (!(taxFrameworks.length > 0)) return [3 /*break*/, 5];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, dispatch(getTaxImages({ type: "frameworks", taxonomies: taxFrameworks })).unwrap()];
                        case 3:
                            frameworks_1 = _a.sent();
                            updatedFrameworks = new Set(frameworks_1.map(function (tax) { return new Taxonomy(tax); }));
                            setFrameworks(updatedFrameworks);
                            return [3 /*break*/, 5];
                        case 4:
                            error_3 = _a.sent();
                            console.error("Error fetching tax images:", error_3);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
            processFrameworks();
        }
    }, [development, dispatch, setFrameworks]);
    useEffect(function () {
        if (development && development.technologies.size > 0) {
            var fetchTechnologies_1 = function () { return __awaiter(void 0, void 0, void 0, function () {
                var taxTechnologies_1, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            taxTechnologies_1 = [];
                            return [4 /*yield*/, Promise.all(Array.from(development.technologies).map(function (tax) { return __awaiter(void 0, void 0, void 0, function () {
                                    var result, taxonomy;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, dispatch(getTechnology(tax))];
                                            case 1:
                                                result = _a.sent();
                                                if (getTechnology.fulfilled.match(result)) {
                                                    taxonomy = result.payload;
                                                    taxTechnologies_1.push(taxonomy);
                                                }
                                                else {
                                                    console.error("Failed to fetch project type:", result.error);
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, taxTechnologies_1];
                        case 2:
                            error_4 = _a.sent();
                            console.error("Error fetching project types:", error_4);
                            return [2 /*return*/, []];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            var processTechnologies = function () { return __awaiter(void 0, void 0, void 0, function () {
                var taxTechnologies, technologies_1, updatedTechnologies, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetchTechnologies_1()];
                        case 1:
                            taxTechnologies = _a.sent();
                            if (!(taxTechnologies.length > 0)) return [3 /*break*/, 5];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, dispatch(getTaxImages({ type: 'technologies', taxonomies: taxTechnologies })).unwrap()];
                        case 3:
                            technologies_1 = _a.sent();
                            updatedTechnologies = new Set(technologies_1.map(function (tax) { return new Taxonomy(tax); }));
                            setTechnologies(updatedTechnologies);
                            return [3 /*break*/, 5];
                        case 4:
                            error_5 = _a.sent();
                            console.error("Error fetching tax images:", error_5);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
            processTechnologies();
        }
    }, [development, dispatch, setTechnologies]);
    var handleSeeCode = function () {
        window.open(repoURL, '_blank');
    };
    return (_jsx(_Fragment, { children: (types.size > 0 || languages.size > 0 || frameworks.size > 0 || technologies.size > 0 ||
            checkList.length > 0 ||
            (typeof content === 'string' && content !== '') ||
            ((versionsList === null || versionsList === void 0 ? void 0 : versionsList.current) !== '' && (versionsList === null || versionsList === void 0 ? void 0 : versionsList.previous.length) > 0) ||
            repoURL !== '') &&
            _jsxs("div", { className: "project-process-development", id: "project_process_development", children: [_jsx("h4", { className: "title", children: "development" }), types.size > 0 && _jsx(TaxList, { taxonomies: types, title: 'types' }), languages.size > 0 && _jsx(TaxListIcon, { taxonomies: languages, title: 'Languages' }), frameworks.size > 0 && _jsx(TaxListIcon, { taxonomies: frameworks, title: 'frameworks' }), technologies.size > 0 && _jsx(TaxListIcon, { taxonomies: technologies, title: 'technologies' }), checkList.length > 0 && _jsx(CheckList, { checkList: checkList }), typeof content === 'string' && content !== '' && _jsx(ContentComponent, { html: content }), repoURL !== '' &&
                        _jsx("button", { onClick: handleSeeCode, children: _jsx("h3", { className: 'title', children: "See Code" }) })] }) }));
};
export default Development;
