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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const jwt_middleware_1 = require("../middleware/jwt.middleware");
const securePassword_middleware_1 = require("../middleware/securePassword.middleware");
const user_repository_1 = require("../repository/user.repository");
class UserController {
    constructor() { }
    findUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield new user_repository_1.UserRepository().findUser(data);
            return response;
        });
    }
    saveDataUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data.password = yield (0, securePassword_middleware_1.hashingPassword)(data.password);
            const token = (0, jwt_middleware_1.CreateJWTToken)(data.email);
            const response = yield new user_repository_1.UserRepository().saveDataUser(data);
            return {
                email: response.email,
                token: token,
            };
        });
    }
    LoginUser(dbData, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const matching = yield (0, securePassword_middleware_1.matchingPassword)(dbData.password, userData.password);
            console.log(matching);
            if (!matching)
                return {};
            const token = (0, jwt_middleware_1.CreateJWTToken)(dbData.email);
            return {
                email: dbData.email,
                token: token,
            };
        });
    }
    meUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, jwt_middleware_1.varifyJWTToken)(token);
            return data;
        });
    }
}
exports.UserController = UserController;
