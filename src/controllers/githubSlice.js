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
import { createSlice, createAsyncThunk, isAnyOf, } from '@reduxjs/toolkit';
import { Octokit } from '@octokit/rest';
import RepoContent from '../model/RepoContent';
import User from '../model/User';
import Repo from '../model/Repo';
import Taxonomy from '../model/Taxonomy';
var octokit = new Octokit();
try {
    if (import.meta.env.VITE_OCTOKIT_AUTH == null) {
        throw new Error('VITE_OCTOKIT_AUTH is not defined in the environment variables.');
    }
    else {
        octokit = new Octokit({
            auth: import.meta.env.VITE_OCTOKIT_AUTH,
        });
    }
}
catch (error) {
    var err = error;
    console.error(err.message);
}
var baseURL = 'https://api.github.com';
var getUserURL = "".concat(baseURL, "/users");
var initialState = {
    githubLoading: false,
    githubStatusCode: 0,
    githubError: null,
    githubErrorMessage: '',
    userObject: {},
    organizations: [],
    repos: [],
    socialAccounts: [],
    repo: {},
    contents: [],
    languagesObject: [],
    contributorsObject: [],
};
export var getUser = createAsyncThunk('github/getUser', function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, octokit.request("GET /users/".concat(username), {
                        headers: {
                            'X-GitHub-Api-Version': '2022-11-28',
                        },
                    })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, new User(data).toObject()];
            case 2:
                error_1 = _a.sent();
                err = error_1;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getRepos = createAsyncThunk('github/getRepos', function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, repos_1, error_2, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, octokit.request('/user/repos')];
            case 1:
                data = (_a.sent()).data;
                repos_1 = [];
                if (Array.isArray(data)) {
                    data.forEach(function (repo) {
                        repos_1.push(new Repo(repo).toObject());
                    });
                }
                return [2 /*return*/, repos_1];
            case 2:
                error_2 = _a.sent();
                err = error_2;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getOrganizations = createAsyncThunk('github/getOrganizations', function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_3, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, octokit.request('/user/orgs')];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_3 = _a.sent();
                err = error_3;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getOrganizationsRepos = createAsyncThunk('github/getOrganizationsRepos', function (organization) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_4, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, octokit.request("/orgs/".concat(organization, "/repos"))];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                error_4 = _a.sent();
                err = error_4;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getRepo = createAsyncThunk('github/getRepo', function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, error_5, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, octokit.rest.repos.get({
                        owner: query.owner,
                        repo: query.repo,
                    })];
            case 1:
                repo = _a.sent();
                return [2 /*return*/, new Repo(repo.data).toObject()];
            case 2:
                error_5 = _a.sent();
                err = error_5;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getRepoContents = createAsyncThunk('github/getRepoContents', function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var repoContents, contents_1, error_6, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, octokit.rest.repos.getContent({
                        owner: query.owner,
                        repo: query.repo,
                        path: query.path,
                    })];
            case 1:
                repoContents = _a.sent();
                contents_1 = [];
                if (Array.isArray(repoContents.data) && repoContents.data.length > 0) {
                    repoContents.data.forEach(function (content) {
                        contents_1.push(new RepoContent(content).toObject());
                    });
                }
                return [2 /*return*/, contents_1];
            case 2:
                error_6 = _a.sent();
                err = error_6;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getRepoLanguages = createAsyncThunk('github/getRepoLanguages', function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var repoLanguages, languages_1, error_7, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, octokit.rest.repos.listLanguages({
                        owner: query.owner,
                        repo: query.repo,
                    })];
            case 1:
                repoLanguages = _a.sent();
                languages_1 = [];
                Object.entries(repoLanguages.data).forEach(function (_a) {
                    var _b = __read(_a, 2), language = _b[0], usage = _b[1];
                    languages_1.push(new Taxonomy({
                        id: language.toLowerCase(),
                        type: 'language',
                        title: language.toUpperCase(),
                        icon_url: '',
                        class_name: '',
                        usage: usage,
                    }).toObject());
                });
                return [2 /*return*/, languages_1];
            case 2:
                error_7 = _a.sent();
                err = error_7;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getContributors = createAsyncThunk('github/getContributors', function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var repoContributors, contributors_1, error_8, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, octokit.rest.repos.listContributors({
                        owner: query.owner,
                        repo: query.repo,
                    })];
            case 1:
                repoContributors = _a.sent();
                contributors_1 = [];
                repoContributors.data.forEach(function (user) {
                    contributors_1.push(user);
                });
                return [2 /*return*/, contributors_1];
            case 2:
                error_8 = _a.sent();
                err = error_8;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getCommits = createAsyncThunk('github/getFounder', function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_9, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("".concat(getUserURL, "/").concat(username, "/repos"), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                console.log(responseData);
                return [2 /*return*/, responseData];
            case 3:
                error_9 = _a.sent();
                err = error_9;
                console.error(err);
                throw new Error(err.message);
            case 4: return [2 /*return*/];
        }
    });
}); });
export var getSocialAccounts = createAsyncThunk('github/getSocialAccounts', function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_10, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("".concat(getUserURL, "/").concat(username, "/social_accounts"), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                console.log(responseData);
                return [2 /*return*/, responseData];
            case 3:
                error_10 = _a.sent();
                err = error_10;
                console.error(err);
                throw new Error(err.message);
            case 4: return [2 /*return*/];
        }
    });
}); });
var githubSliceOptions = {
    name: 'github',
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            .addCase(getUser.fulfilled, function (state, action) {
            state.githubLoading = false;
            state.githubErrorMessage = '';
            state.githubError = null;
            state.userObject = action.payload;
        })
            .addCase(getOrganizations.fulfilled, function (state, action) {
            state.githubLoading = false;
            state.githubErrorMessage = '';
            state.githubError = null;
            state.organizations = action.payload;
        })
            .addCase(getRepos.fulfilled, function (state, action) {
            state.githubLoading = false;
            state.githubErrorMessage = '';
            state.githubError = null;
            state.repos = action.payload;
        })
            .addCase(getRepo.fulfilled, function (state, action) {
            state.githubLoading = false;
            state.githubErrorMessage = '';
            state.githubError = null;
            state.repo = action.payload;
        })
            .addCase(getRepoContents.fulfilled, function (state, action) {
            state.githubLoading = false;
            state.githubErrorMessage = '';
            state.githubError = null;
            state.contents = action.payload;
        })
            .addCase(getRepoLanguages.fulfilled, function (state, action) {
            state.githubLoading = false;
            state.githubErrorMessage = '';
            state.githubError = null;
            state.languagesObject = action.payload;
        })
            .addCase(getSocialAccounts.fulfilled, function (state, action) {
            state.githubLoading = false;
            state.githubErrorMessage = '';
            state.githubError = null;
            state.socialAccounts = action.payload;
        })
            .addMatcher(isAnyOf(getUser.pending, getOrganizations.pending, getRepos.pending, getRepo.pending, getRepoContents.pending, getRepoLanguages.pending, getSocialAccounts.pending), function (state) {
            state.githubLoading = true;
            state.githubErrorMessage = '';
            state.githubError = null;
        })
            .addMatcher(isAnyOf(getUser.rejected, getOrganizations.rejected, getRepos.rejected, getRepo.rejected, getRepoContents.rejected, getRepoLanguages.rejected, getSocialAccounts.rejected), function (state, action) {
            state.githubLoading = false;
            state.githubErrorMessage = action.error.message || '';
            state.githubError = action.error;
        });
    },
};
export var githubSlice = createSlice(githubSliceOptions);
export default githubSlice;
