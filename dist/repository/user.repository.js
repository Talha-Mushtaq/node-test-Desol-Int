"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = require("../model/user.model");
class UserRepository {
    constructor() { }
    saveDataUser(data) {
        return new user_model_1.userModel(data).save();
    }
    findUser(data) {
        return user_model_1.userModel.findOne({ email: data });
    }
}
exports.UserRepository = UserRepository;
