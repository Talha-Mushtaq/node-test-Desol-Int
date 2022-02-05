"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.varifyJWTToken = exports.CreateJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "this is a secret key";
const exp = 3 * 24 * 60 * 60;
const CreateJWTToken = (email) => {
    const jwtToken = jsonwebtoken_1.default.sign({ email }, secretKey, {
        expiresIn: exp,
    });
    return jwtToken;
};
exports.CreateJWTToken = CreateJWTToken;
const varifyJWTToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const data = jsonwebtoken_1.default.verify(token, secretKey);
    return data;
});
exports.varifyJWTToken = varifyJWTToken;
