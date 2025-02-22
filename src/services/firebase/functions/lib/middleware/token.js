"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const dotenv_1 = __importDefault(require("dotenv"));
const ResponseError_1 = __importDefault(require("../model/ResponseError"));
const config_2 = require("../config");
dotenv_1.default.config();
const getToken = (req) => {
    return req.headers.authorization?.split('Bearer ')[1];
};
const verifyToken = async (idToken, uid) => {
    try {
        const decodedIdToken = await config_1.auth.verifyIdToken(idToken, true);
        console.log(decodedIdToken);
        if (typeof decodedIdToken === 'object') {
            return idToken;
        }
        return null;
    }
    catch (error) {
        const err = error;
        if ('code' in err && typeof err.code === 'string') {
            switch (err.code) {
                case 'auth/id-token-expired':
                    return await config_1.auth.createCustomToken(uid, { isAdmin: true });
                case 'auth/argument-error':
                    throw new ResponseError_1.default('Invalid token.', 400);
                case 'auth/id-token-revoked':
                    throw new ResponseError_1.default('Token revoked. Please log in again.', 403);
                case 'auth/invalid-id-token':
                    throw new ResponseError_1.default('Invalid token.', 400);
                default:
                    throw new ResponseError_1.default(err.message, 500);
            }
        }
    }
};
const checkToken = async (req) => {
    try {
        const idToken = getToken(req);
        if (!idToken) {
            throw new ResponseError_1.default('Unauthorized: No authentication token provided.', 403);
        }
        const token = jsonwebtoken_1.default.decode(idToken);
        if (typeof token === 'object') {
            if (token && token?.user_id && config_2.ADMIN_UID === token.user_id) {
                const uid = token?.user_id;
                if (token?.isAdmin !== true) {
                    await config_1.auth.setCustomUserClaims(uid, { isAdmin: true });
                }
                return await verifyToken(idToken, uid);
            }
        }
        return null;
    }
    catch (error) {
        const err = error;
        throw new ResponseError_1.default(err.message, err.statusCode);
    }
};
exports.default = checkToken;
