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
import User from '../../../model/User';
import ProjectTeamComponent from './ProjectTeam';
import { getContributors } from '../../../controllers/githubSlice';
var ProjectDetailsComponent = function (_a) {
    var details = _a.details, contributorsQuery = _a.contributorsQuery;
    var dispatch = useDispatch();
    var privacy = details.privacy, clientID = details.clientID, clientName = details.clientName, startDate = details.startDate, endDate = details.endDate;
    var _b = __read(useState(), 2), teamList = _b[0], setTeamList = _b[1];
    useEffect(function () {
        if (privacy === 'public' || clientID === '0') {
            var getTeamList = function () { return __awaiter(void 0, void 0, void 0, function () {
                var result, contributors, users_1, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, dispatch(getContributors(contributorsQuery))];
                        case 1:
                            result = _a.sent();
                            if (getContributors.fulfilled.match(result)) {
                                contributors = result.payload;
                                users_1 = [];
                                contributors.forEach(function (user) {
                                    users_1.push(new User(user));
                                });
                                setTeamList(users_1);
                            }
                            else {
                                console.error('Failed to fetch contributors');
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Error fetching team list:', error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            getTeamList();
        }
    }, [privacy, clientID, dispatch]);
    return (_jsx(_Fragment, { children: (privacy === 'public' || clientID === '0') && (_jsxs("div", { className: "project-details", children: [_jsx("h3", { className: "title", children: "the details" }), _jsx("table", { children: _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { children: _jsx("label", { htmlFor: "client_name", children: "Client Name:" }) }), _jsx("td", { children: _jsx("h4", { className: "company-name", children: clientName }) })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("label", { htmlFor: "start_date", children: "Start Date:" }) }), _jsx("td", { children: startDate })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("label", { htmlFor: "end_date", children: "End Date:" }) }), _jsx("td", { children: endDate })] })] }) }), teamList &&
                    _jsx(ProjectTeamComponent, { projectTeam: teamList })] })) }));
};
export default ProjectDetailsComponent;
