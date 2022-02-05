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
exports.UserRoutesApi = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const userRouter = express_1.default.Router();
userRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email)) {
            res.statusCode = 400;
            res.set("x-auth-token", "");
            res.send({
                code: res.statusCode,
                message: "Wrong email",
            });
        }
        const exist = yield new user_controller_1.UserController().findUser(body.email);
        if (exist) {
            res.statusCode = 400;
            res.set("x-auth-token", "");
            res.send({
                code: res.statusCode,
                message: "User already registered",
            });
        }
        const response = yield new user_controller_1.UserController().saveDataUser(body);
        res.set("x-auth-token", response.token);
        res.send({
            code: res.statusCode,
            message: "User registered successfully",
            email: response.email,
        });
    }
    catch (error) {
        res.send(error);
    }
}));
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email)) {
            res.statusCode = 400;
            res.set("x-auth-token", "");
            res.send({
                code: res.statusCode,
                message: "Wrong email",
            });
        }
        const exist = yield new user_controller_1.UserController().findUser(body.email);
        if (!exist) {
            res.statusCode = 400;
            // res.set("x-auth-token", "");
            res.send({
                code: res.statusCode,
                message: "Please register your account",
            });
        }
        const response = yield new user_controller_1.UserController().LoginUser(exist, body);
        if (response.email) {
            res.set("x-auth-token", response.token);
            res.send({
                code: 200,
                message: "User logged in successfully",
                email: response.email,
            });
        }
        else {
            res.statusCode = 400;
            res.set("x-auth-token", "");
            res.send({
                code: res.statusCode,
                message: "Wrong email or password",
            });
        }
    }
    catch (error) {
        res.send(error);
    }
}));
userRouter.get("/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            res.statusCode = 401;
            res.send({ message: "unauthorize" });
        }
        const response = yield new user_controller_1.UserController().meUser(token);
        res.set("x-auth-token", response.token);
        res.send(response);
    }
    catch (error) {
        res.send(error);
    }
}));
exports.UserRoutesApi = userRouter;
