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
import { collection, getDocs, doc, getDoc, } from 'firebase/firestore';
import db from '../services/firebase/config';
import Taxonomy from '../model/Taxonomy';
var initialState = {
    taxonomiesLoading: false,
    taxonomiesError: null,
    taxonomiesErrorMessage: '',
    taxonomiesStatusCode: '',
    projectTypesObject: [],
    projectTypeObject: null,
    languagesObject: [],
    languageObject: null,
    frameworksObject: [],
    frameworkObject: null,
    technologiesObject: [],
    technologyObject: null,
};
var getTaxonomy = function (type, doc) {
    var data = doc.data();
    var taxonomy = new Taxonomy({
        id: doc.id,
        type: type,
        title: data === null || data === void 0 ? void 0 : data.title,
        icon_url: data === null || data === void 0 ? void 0 : data.icon_url,
        class_name: data === null || data === void 0 ? void 0 : data.class_name,
    });
    return taxonomy.toObject();
};
export var getTaxImages = createAsyncThunk('taxonomies/getTaxImage', function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var querySnapshot, updatedTaxonomies_1, error_1, err;
    var type = _b.type, taxonomies = _b.taxonomies;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getDocs(collection(db, type))];
            case 1:
                querySnapshot = _c.sent();
                updatedTaxonomies_1 = [];
                querySnapshot.forEach(function (doc) {
                    var data = doc.data();
                    taxonomies.forEach(function (taxonomy) {
                        if (taxonomy.id === doc.id) {
                            var tax = new Taxonomy(taxonomy);
                            tax.className = data === null || data === void 0 ? void 0 : data.class_name;
                            tax.iconURL = data === null || data === void 0 ? void 0 : data.icon_url;
                            updatedTaxonomies_1.push(tax.toObject());
                        }
                    });
                });
                return [2 /*return*/, updatedTaxonomies_1];
            case 2:
                error_1 = _c.sent();
                err = error_1;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getProjectTypes = createAsyncThunk('taxonomies/getProjectTypes', function () { return __awaiter(void 0, void 0, void 0, function () {
    var type_1, querySnapshot, projectTypes_1, error_2, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                type_1 = 'project_types';
                return [4 /*yield*/, getDocs(collection(db, type_1))];
            case 1:
                querySnapshot = _a.sent();
                projectTypes_1 = [];
                querySnapshot.forEach(function (doc) {
                    var taxonomy = getTaxonomy(type_1, doc);
                    projectTypes_1.push(taxonomy);
                });
                return [2 /*return*/, projectTypes_1];
            case 2:
                error_2 = _a.sent();
                err = error_2;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getLanguages = createAsyncThunk('taxonomies/getLanguages', function () { return __awaiter(void 0, void 0, void 0, function () {
    var type_2, querySnapshot, languages_1, error_3, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                type_2 = 'languages';
                return [4 /*yield*/, getDocs(collection(db, type_2))];
            case 1:
                querySnapshot = _a.sent();
                languages_1 = [];
                querySnapshot.forEach(function (doc) {
                    var taxonomy = getTaxonomy(type_2, doc);
                    languages_1.push(taxonomy);
                });
                return [2 /*return*/, languages_1];
            case 2:
                error_3 = _a.sent();
                err = error_3;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getFrameworks = createAsyncThunk('taxonomies/getFrameworks', function () { return __awaiter(void 0, void 0, void 0, function () {
    var type_3, querySnapshot, frameworks_1, error_4, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                type_3 = 'frameworks';
                return [4 /*yield*/, getDocs(collection(db, type_3))];
            case 1:
                querySnapshot = _a.sent();
                frameworks_1 = [];
                querySnapshot.forEach(function (doc) {
                    var taxonomy = getTaxonomy(type_3, doc);
                    frameworks_1.push(taxonomy);
                });
                return [2 /*return*/, frameworks_1];
            case 2:
                error_4 = _a.sent();
                err = error_4;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getTechnologies = createAsyncThunk('taxonomies/getTechnologies', function () { return __awaiter(void 0, void 0, void 0, function () {
    var type_4, querySnapshot, technologies_1, error_5, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                type_4 = 'technologies';
                return [4 /*yield*/, getDocs(collection(db, type_4))];
            case 1:
                querySnapshot = _a.sent();
                technologies_1 = [];
                querySnapshot.forEach(function (doc) {
                    var taxonomy = getTaxonomy(type_4, doc);
                    technologies_1.push(taxonomy);
                });
                return [2 /*return*/, technologies_1];
            case 2:
                error_5 = _a.sent();
                err = error_5;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getProjectType = createAsyncThunk('taxonomies/getProjectType', function (projectType) { return __awaiter(void 0, void 0, void 0, function () {
    var type, projectTypeCollection, docRef, docSnap, taxonomy, error_6, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                type = 'project_types';
                projectTypeCollection = collection(db, type);
                docRef = doc(projectTypeCollection, projectType);
                return [4 /*yield*/, getDoc(docRef)];
            case 1:
                docSnap = _a.sent();
                taxonomy = {};
                if (docSnap.exists()) {
                    taxonomy = getTaxonomy(type, docSnap);
                }
                return [2 /*return*/, taxonomy];
            case 2:
                error_6 = _a.sent();
                err = error_6;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getLanguage = createAsyncThunk('taxonomies/getLanguage', function (language) { return __awaiter(void 0, void 0, void 0, function () {
    var type, languageCollection, docRef, docSnap, taxonomy, error_7, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                type = 'languages';
                languageCollection = collection(db, type);
                docRef = doc(languageCollection, language);
                return [4 /*yield*/, getDoc(docRef)];
            case 1:
                docSnap = _a.sent();
                taxonomy = {};
                if (docSnap.exists()) {
                    taxonomy = getTaxonomy(type, docSnap);
                }
                return [2 /*return*/, taxonomy];
            case 2:
                error_7 = _a.sent();
                err = error_7;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getFramework = createAsyncThunk('taxonomies/getFramework', function (framework) { return __awaiter(void 0, void 0, void 0, function () {
    var type, frameworkCollection, docRef, docSnap, taxonomy, error_8, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                type = 'project_types';
                frameworkCollection = collection(db, 'frameworks');
                docRef = doc(frameworkCollection, framework);
                return [4 /*yield*/, getDoc(docRef)];
            case 1:
                docSnap = _a.sent();
                taxonomy = {};
                if (docSnap.exists()) {
                    taxonomy = getTaxonomy(type, docSnap);
                }
                return [2 /*return*/, taxonomy];
            case 2:
                error_8 = _a.sent();
                err = error_8;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var getTechnology = createAsyncThunk('taxonomies/getTechnology', function (technology) { return __awaiter(void 0, void 0, void 0, function () {
    var type, technologyCollection, docRef, docSnap, taxonomy, error_9, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                type = 'project_types';
                technologyCollection = collection(db, 'technologies');
                docRef = doc(technologyCollection, technology);
                return [4 /*yield*/, getDoc(docRef)];
            case 1:
                docSnap = _a.sent();
                taxonomy = {};
                if (docSnap.exists()) {
                    taxonomy = getTaxonomy(type, docSnap);
                }
                return [2 /*return*/, taxonomy];
            case 2:
                error_9 = _a.sent();
                err = error_9;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
var taxonomiesSliceOptions = {
    name: 'taxonomies',
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            .addCase(getProjectTypes.fulfilled, function (state, action) {
            state.taxonomiesLoading = false;
            state.taxonomiesError = null;
            state.taxonomiesErrorMessage = '';
            state.projectTypesObject = action.payload;
        })
            .addCase(getLanguages.fulfilled, function (state, action) {
            state.taxonomiesLoading = false;
            state.taxonomiesError = null;
            state.taxonomiesErrorMessage = '';
            state.languagesObject = action.payload;
        })
            .addCase(getFrameworks.fulfilled, function (state, action) {
            state.taxonomiesLoading = false;
            state.taxonomiesError = null;
            state.taxonomiesErrorMessage = '';
            state.frameworksObject = action.payload;
        })
            .addCase(getTechnologies.fulfilled, function (state, action) {
            state.taxonomiesLoading = false;
            state.taxonomiesError = null;
            state.taxonomiesErrorMessage = '';
            state.technologiesObject = action.payload;
        })
            .addCase(getProjectType.fulfilled, function (state, action) {
            state.taxonomiesLoading = false;
            state.taxonomiesError = null;
            state.taxonomiesErrorMessage = '';
            state.projectTypeObject = action.payload;
        })
            .addCase(getLanguage.fulfilled, function (state, action) {
            state.taxonomiesLoading = false;
            state.taxonomiesError = null;
            state.taxonomiesErrorMessage = '';
            state.languageObject = action.payload;
        })
            .addCase(getFramework.fulfilled, function (state, action) {
            state.taxonomiesLoading = false;
            state.taxonomiesError = null;
            state.taxonomiesErrorMessage = '';
            state.frameworkObject = action.payload;
        })
            .addCase(getTechnology.fulfilled, function (state, action) {
            state.taxonomiesLoading = false;
            state.taxonomiesError = null;
            state.taxonomiesErrorMessage = '';
            state.technologyObject = action.payload;
        })
            .addMatcher(isAnyOf(getProjectTypes.pending, getFrameworks.pending, getTechnologies.pending, getProjectType.pending, getLanguage.pending, getFramework.pending, getTechnology.pending), function (state) {
            state.taxonomiesLoading = true;
            state.taxonomiesError = null;
            state.taxonomiesErrorMessage = '';
            state.taxonomiesStatusCode = '';
        })
            .addMatcher(isAnyOf(getProjectTypes.rejected, getFrameworks.rejected, getTechnologies.rejected, getProjectType.rejected, getLanguage.rejected, getFramework.rejected, getTechnology.rejected), function (state, action) {
            state.taxonomiesLoading = false;
            state.taxonomiesError = action.error;
            state.taxonomiesErrorMessage = action.error.message || '';
            state.taxonomiesStatusCode = action.error.code || '';
        });
    },
};
export var taxonomiesSlice = createSlice(taxonomiesSliceOptions);
export default taxonomiesSlice;
