"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uid = process.env;
// console.log(process.env.PWD)
const getToken = (req) => {
    return req.headers.authorization?.split('Bearer ')[1];
};
const checkToken = async (req) => {
    try {
        const idToken = getToken(req);
        if (!idToken) {
            return idToken;
        }
        const token = jsonwebtoken_1.default.decode(idToken);
        if (typeof token === 'object') {
            if (token && token?.user_id && uid == token.user_id) {
                console.log(token.user_id);
                console.log(token.isAdmin);
            }
        }
        const decodedToken = await firebase_admin_1.default.auth().verifyIdToken(idToken);
        return decodedToken;
    }
    catch (error) {
        const err = error;
        throw new Error(err.message);
    }
};
exports.default = checkToken;
