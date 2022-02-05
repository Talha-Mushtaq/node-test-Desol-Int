"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./route/user.route");
const mongodb_conn_1 = require("./config/mongodb.conn");
const constant_1 = require("./utill/constant");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
new mongodb_conn_1.DbMongo().connect(constant_1.MongoCluster, constant_1.MongoDbName, constant_1.MongoUserName, constant_1.MongoUserPassword);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/user", user_route_1.UserRoutesApi);
app.listen(PORT, () => console.log(`server running on  http://localhost:${PORT}/`));
