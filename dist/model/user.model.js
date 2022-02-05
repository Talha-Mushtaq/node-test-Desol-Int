"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });
exports.userModel = (0, mongoose_1.model)("users", UserSchema);
