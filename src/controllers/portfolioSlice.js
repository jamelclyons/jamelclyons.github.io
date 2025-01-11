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
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { collection, getDocs, query, where, } from 'firebase/firestore';
import db from '../services/firebase/config';
import Project from '../model/Project';
var portfolioCollection = collection(db, 'portfolio');
var initialState = {
    portfolioLoading: false,
    portfolioError: null,
    portfolioErrorMessage: '',
    portfolioObject: [],
    projects: [],
};
export var getPortfolio = createAsyncThunk('portfolio/getPortfolio', function (repos) { return __awaiter(void 0, void 0, void 0, function () {
    var projects_1, repoProjects_1, querySnapshot_1, error_1, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                projects_1 = new Set();
                repoProjects_1 = new Set();
                if (Array.isArray(repos) && repos.length > 0) {
                    repos.forEach(function (repo) {
                        var project = new Project();
                        project.fromRepo(repo);
                        repoProjects_1.add(project);
                    });
                }
                return [4 /*yield*/, getDocs(portfolioCollection)];
            case 1:
                querySnapshot_1 = _a.sent();
                if (querySnapshot_1.size > 0) {
                    repoProjects_1.forEach(function (project) {
                        var matchingDoc = querySnapshot_1.docs.find(function (doc) { return doc.id === project.id; });
                        if (matchingDoc) {
                            project.fromDocumentData(matchingDoc.id, matchingDoc.data());
                        }
                        projects_1.add(project.toObject());
                    });
                }
                return [2 /*return*/, Array.from(projects_1)];
            case 2:
                error_1 = _a.sent();
                err = error_1;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getProjectsBy = createAsyncThunk('portfolio/getProjectsBy', function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var contentCollection, projectQuery, querySnapshot, docs, projects_2, error_2, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                contentCollection = collection(db, 'portfolio');
                projectQuery = query(contentCollection, where(params.taxonomy, 'array-contains', params.term));
                return [4 /*yield*/, getDocs(projectQuery)];
            case 1:
                querySnapshot = _a.sent();
                docs = querySnapshot.docs;
                if (docs.length === 0) {
                    throw new Error('No projects found.');
                }
                projects_2 = [];
                docs.forEach(function (doc) {
                    var project = new Project();
                    project.fromDocumentData(doc.id, doc.data());
                    projects_2.push(project.toObject());
                });
                return [2 /*return*/, projects_2];
            case 2:
                error_2 = _a.sent();
                err = error_2;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var portfolioSlice = createSlice({
    name: 'portfolio',
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            .addCase(getPortfolio.fulfilled, function (state, action) {
            state.portfolioLoading = false;
            state.portfolioError = null;
            state.portfolioErrorMessage = '';
            state.portfolioObject = action.payload;
        })
            .addCase(getProjectsBy.fulfilled, function (state, action) {
            state.portfolioLoading = false;
            state.portfolioError = null;
            state.portfolioErrorMessage = '';
            state.projects = action.payload;
        })
            .addMatcher(isAnyOf(getPortfolio.pending, getProjectsBy.pending), function (state) {
            state.portfolioLoading = true;
            state.portfolioError = null;
            state.portfolioErrorMessage = '';
        })
            .addMatcher(isAnyOf(getPortfolio.rejected, getProjectsBy.rejected), function (state, action) {
            state.portfolioLoading = false;
            state.portfolioError = action.error || null;
            state.portfolioErrorMessage = action.error.message || '';
        });
    },
});
export default portfolioSlice;
