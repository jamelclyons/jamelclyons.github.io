"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const admin_1 = __importDefault(require("./middleware/admin"));
const user_1 = __importDefault(require("./routes/user"));
const organization_1 = __importDefault(require("./routes/organization"));
const skills_1 = __importDefault(require("./routes/skills"));
const project_1 = __importDefault(require("./routes/project"));
const authentication_1 = __importDefault(require("./routes/authentication"));
const error_1 = __importDefault(require("./middleware/error"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
let origin = process.env.CORS_ORIGIN ?? 'http://localhost:3000';
if (process.env.NODE_ENV === 'development') {
    if (process.env.DEV_CORS_ORIGIN && process.env.DEV_CORS_ORIGIN_1) {
        origin = [process.env.DEV_CORS_ORIGIN, process.env.DEV_CORS_ORIGIN_1];
        origin.forEach((url) => {
            console.log(`Server is now accepting request from ${url}`);
        });
    }
}
else {
    if (process.env.CORS_ORIGIN && process.env.CORS_ORIGIN_1) {
        origin = [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN_1];
        origin.forEach((url) => {
            console.log(`Server is now accepting request from ${url}`);
        });
    }
}
const corsOptions = {
    origin: origin,
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Refresh-Token'],
};
app.use((0, cors_1.default)(corsOptions));
app.post('*', admin_1.default);
app.use('/user', user_1.default);
app.use('/organization', organization_1.default);
app.use('/skill', skills_1.default);
app.use('/project', project_1.default);
app.use('/auth', authentication_1.default);
app.use(error_1.default);
exports.default = app;
