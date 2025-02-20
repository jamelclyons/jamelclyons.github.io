"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const organization_1 = __importDefault(require("./routes/organization"));
const skills_1 = __importDefault(require("./routes/skills"));
const project_1 = __importDefault(require("./routes/project"));
const authentication_1 = __importDefault(require("./routes/authentication"));
const error_1 = __importDefault(require("./middleware/error"));
const config_1 = require("./config");
console.log(`Server is now accepting request from ${config_1.origin}`);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: config_1.origin }));
app.use('/user', user_1.default);
app.use('/organization', organization_1.default);
app.use('/skill', skills_1.default);
app.use('/project', project_1.default);
app.use('/auth', authentication_1.default);
app.use(error_1.default);
exports.default = app;
