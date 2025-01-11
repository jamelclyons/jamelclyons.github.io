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
import { createSlice, createAsyncThunk, isAnyOf, } from '@reduxjs/toolkit';
import { collection, setDoc, doc } from 'firebase/firestore';
import db from '../services/firebase/config';
var initialState = {
    addLoading: false,
    addSuccessMessage: '',
    addError: null,
    addErrorMessage: '',
    addStatusCode: '',
    projectID: '',
};
export var addProject = createAsyncThunk('add/addProject', function (project) { return __awaiter(void 0, void 0, void 0, function () {
    var projectCollection, error_1, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                projectCollection = collection(db, 'portfolio');
                return [4 /*yield*/, setDoc(doc(projectCollection, project.id), project)];
            case 1:
                _a.sent();
                return [2 /*return*/, {
                        project_id: project.id,
                        success_message: "".concat(project.id, " was added to portfolio"),
                    }];
            case 2:
                error_1 = _a.sent();
                err = error_1;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var addProjectType = createAsyncThunk('add/addProjectType', function (taxonomy) { return __awaiter(void 0, void 0, void 0, function () {
    var projectTypeCollection, error_2, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                projectTypeCollection = collection(db, 'project_types');
                return [4 /*yield*/, setDoc(doc(projectTypeCollection, taxonomy.id), taxonomy.toObject())];
            case 1:
                _a.sent();
                return [2 /*return*/, "".concat(taxonomy.id, " was added to projectTypes")];
            case 2:
                error_2 = _a.sent();
                err = error_2;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var addLanguage = createAsyncThunk('add/addLanguage', function (taxonomy) { return __awaiter(void 0, void 0, void 0, function () {
    var languageCollection, error_3, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                languageCollection = collection(db, 'languages');
                return [4 /*yield*/, setDoc(doc(languageCollection, taxonomy.id), taxonomy.toObject())];
            case 1:
                _a.sent();
                return [2 /*return*/, "".concat(taxonomy.id, " was added to languages")];
            case 2:
                error_3 = _a.sent();
                err = error_3;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var addFramework = createAsyncThunk('add/addFramework', function (taxonomy) { return __awaiter(void 0, void 0, void 0, function () {
    var frameworkCollection, error_4, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                frameworkCollection = collection(db, 'frameworks');
                return [4 /*yield*/, setDoc(doc(frameworkCollection, taxonomy.id), taxonomy.toObject())];
            case 1:
                _a.sent();
                return [2 /*return*/, "".concat(taxonomy.id, " was added to frameworks")];
            case 2:
                error_4 = _a.sent();
                err = error_4;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var addTechnology = createAsyncThunk('add/addTechnology', function (taxonomy) { return __awaiter(void 0, void 0, void 0, function () {
    var technologyCollection, error_5, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                technologyCollection = collection(db, 'technologies');
                return [4 /*yield*/, setDoc(doc(technologyCollection, taxonomy.id), taxonomy.toObject())];
            case 1:
                _a.sent();
                return [2 /*return*/, "".concat(taxonomy.id, " was added to technologies")];
            case 2:
                error_5 = _a.sent();
                err = error_5;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
var addSliceOptions = {
    name: 'add',
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            .addCase(addProject.fulfilled, function (state, action) {
            state.addLoading = false;
            state.addSuccessMessage = action.payload.success_message;
            state.projectID = action.payload.project_id;
        })
            .addMatcher(isAnyOf(addProjectType.fulfilled, addLanguage.fulfilled, addFramework.fulfilled, addTechnology.fulfilled), function (state, action) {
            state.addLoading = false;
            state.addSuccessMessage = action.payload;
        })
            .addMatcher(isAnyOf(addProject.pending, addProjectType.pending, addLanguage.pending, addFramework.pending, addTechnology.pending), function (state) {
            state.addLoading = true;
            state.addError = null;
            state.addErrorMessage = '';
        })
            .addMatcher(isAnyOf(addProject.rejected, addProjectType.rejected, addLanguage.rejected, addFramework.rejected, addTechnology.rejected), function (state, action) {
            state.addLoading = false;
            state.addError = action.error || null;
            state.addErrorMessage = action.error.message || '';
        });
    },
};
export var addSlice = createSlice(addSliceOptions);
export default addSlice;
