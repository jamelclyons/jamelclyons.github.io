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
import { collection, updateDoc, doc, } from 'firebase/firestore';
import db from '../services/firebase/config';
var initialState = {
    updateLoading: false,
    updateSuccessMessage: '',
    updateError: null,
    updateErrorMessage: '',
    updateStatusCode: '',
    solution: null,
    process: null,
    problem: null,
    details: null,
};
var projectCollection = collection(db, 'portfolio');
export var updateProject = createAsyncThunk('update/updateProject', function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, updateDoc(doc(projectCollection, data.id), data)];
            case 1:
                _a.sent();
                return [2 /*return*/, "Project with the #ID: ".concat(data.id, " was updated.")];
            case 2:
                error_1 = _a.sent();
                err = error_1;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var updateSolution = createAsyncThunk('update/updateSolution', function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, updateDoc(doc(projectCollection, data.id), {
                        solution: data.solution,
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, "Project with the #ID: ".concat(data.id, " was updated.")];
            case 2:
                error_2 = _a.sent();
                err = error_2;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var updateProcess = createAsyncThunk('update/updateProcess', function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, updateDoc(doc(projectCollection, data.id), {
                        process: data.process,
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, "Project with the #ID: ".concat(data.id, " was updated.")];
            case 2:
                error_3 = _a.sent();
                err = error_3;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var updateStatus = createAsyncThunk('update/updateStatus', function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, updateDoc(doc(projectCollection, data.id), {
                        status: data.status,
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, "Project with the #ID: ".concat(data.id, " was updated.")];
            case 2:
                error_4 = _a.sent();
                err = error_4;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var updateDesign = createAsyncThunk('update/updateDesign', function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var error_5, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, updateDoc(doc(projectCollection, data.id), {
                        design: data.design,
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, "Project with the #ID: ".concat(data.id, " was updated.")];
            case 2:
                error_5 = _a.sent();
                err = error_5;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var updateDevelopment = createAsyncThunk('update/updateDevelopment', function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var error_6, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, updateDoc(doc(projectCollection, data.id), {
                        development: data.development,
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, "Project with the #ID: ".concat(data.id, " was updated.")];
            case 2:
                error_6 = _a.sent();
                err = error_6;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var updateDelivery = createAsyncThunk('update/updateDelivery', function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var error_7, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, updateDoc(doc(projectCollection, data.id), {
                        delivery: data.delivery,
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, "Project with the #ID: ".concat(data.id, " was updated.")];
            case 2:
                error_7 = _a.sent();
                err = error_7;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var updateProblem = createAsyncThunk('update/updateProblem', function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var error_8, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, updateDoc(doc(projectCollection, data.id), {
                        problem: data.problem,
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, "Project with the #ID: ".concat(data.id, " was updated.")];
            case 2:
                error_8 = _a.sent();
                err = error_8;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
export var updateDetails = createAsyncThunk('update/updateDetails', function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var error_9, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, updateDoc(doc(projectCollection, data.id), {
                        details: data.details,
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, "Project with the #ID: ".concat(data.id, " was updated.")];
            case 2:
                error_9 = _a.sent();
                err = error_9;
                console.error(err);
                throw new Error(err.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
var updateSliceOptions = {
    name: 'update',
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            .addMatcher(isAnyOf(updateSolution.fulfilled, updateProcess.fulfilled, updateProblem.fulfilled, updateDetails.fulfilled), function (state, action) {
            state.updateLoading = false;
            state.updateSuccessMessage = action.payload;
        })
            .addMatcher(isAnyOf(updateSolution.pending, updateProcess.pending, updateProblem.pending, updateDetails.pending), function (state) {
            state.updateLoading = true;
            state.updateError = null;
            state.updateErrorMessage = '';
        })
            .addMatcher(isAnyOf(updateSolution.rejected, updateProcess.rejected, updateProblem.rejected, updateDetails.rejected), function (state, action) {
            state.updateLoading = false;
            state.updateError = action.error || null;
            state.updateErrorMessage = action.error.message || '';
        });
    },
};
export var updateSlice = createSlice(updateSliceOptions);
export default updateSlice;
