"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.origin = exports.db = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, app_1.initializeApp)({
    credential: (0, app_1.cert)({
        projectId: process.env.PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY,
    }),
});
exports.db = (0, firestore_1.getFirestore)();
let origin = process.env.CORS_ORIGIN ?? 'http://localhost:3000';
exports.origin = origin;
if (process.env.NODE_ENV === 'development') {
    exports.origin = origin = 'http://localhost:3000';
}
