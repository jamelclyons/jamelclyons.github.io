"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.saveProject = exports.project = exports.check = void 0;
const functions = __importStar(require("firebase-functions/v1"));
const database_1 = require("./controllers/database");
const ResponseError_1 = __importDefault(require("./model/ResponseError"));
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
exports.check = functions.https.onRequest(async (req, res) => {
    try {
        console.log(req);
        // await checkToken(req);
        res.json({ success_message: 'Token is valid.' });
    }
    catch (error) {
        const err = error;
        res.json({
            error_message: err.message,
            status_code: err.statusCode,
        });
    }
});
const corsCheck = (headers) => {
    let isAllowed = false;
    if (Array.isArray(corsOptions.origin)) {
        const corsOrigins = corsOptions.origin;
        if (headers.origin) {
            isAllowed = corsOrigins.includes(headers.origin);
        }
    }
    if (corsOptions.origin === headers.origin) {
        isAllowed = true;
    }
    if (!isAllowed) {
        throw new ResponseError_1.default(`Access denied request from ${origin} is not allowed.`, 204);
    }
    return isAllowed;
};
exports.project = functions.https.onRequest(async (req, res) => {
    try {
        corsCheck(req.headers);
        const projectID = req.params[0];
        const data = await (0, database_1.getData)('portfolio', projectID);
        if (data === null) {
            throw new ResponseError_1.default(`${projectID} could not be found.`, 404);
        }
        res.json({ data: data });
    }
    catch (error) {
        const err = error;
        res.json({
            error_message: err.message,
            status_code: err.statusCode,
        });
    }
});
exports.saveProject = functions.https.onRequest(async (req, res) => {
    corsCheck(req.headers);
    const id = req.params[0];
    let repoURL = null;
    if (req.body.process) {
        repoURL = req.body.process.development.repo_url;
    }
    const data = await (0, database_1.postData)('portfolio', id, req.body);
    if (!data) {
        throw new ResponseError_1.default(`Project with the #ID: ${id} could not be updated.`, 400);
    }
    res.json({
        id: id,
        repo_url: repoURL,
        success_message: `Project with the #ID: ${id} was updated at ${data}.`,
    });
});
exports.user = functions.https.onRequest(async (req, res) => {
    try {
        corsCheck(req.headers);
        const id = req.params[0];
        const data = await (0, database_1.getData)('user', id);
        if (data === null) {
            throw new ResponseError_1.default(`${id} could not be found.`, 404);
        }
        res.json({ data: data });
    }
    catch (error) {
        const err = error;
        res.json({
            error_message: err.message,
            status_code: err.statusCode,
        });
    }
});
