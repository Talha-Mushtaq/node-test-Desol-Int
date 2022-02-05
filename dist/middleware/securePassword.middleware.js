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
exports.matchingPassword = exports.hashingPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashingPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashed = yield bcrypt_1.default.hash(password, salt);
    return hashed;
});
exports.hashingPassword = hashingPassword;
const matchingPassword = (dbPassword, userPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const matching = yield bcrypt_1.default.compare(userPassword, dbPassword);
    return matching;
});
exports.matchingPassword = matchingPassword;
