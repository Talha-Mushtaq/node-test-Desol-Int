"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonStatConnection = exports.DbMongo = void 0;
const mongoose_1 = require("mongoose");
class DbMongo {
    constructor() { }
    connect(MongoCluster, MongoDbName, MongoUserName, MongoUserPassword, p) {
        let uri = `mongodb://${MongoCluster}:${p}/${MongoDbName}`;
        if (MongoUserName != undefined && MongoUserPassword != undefined) {
            uri = `mongodb+srv://${MongoUserName}:${MongoUserPassword}@${MongoCluster}/${MongoDbName}`;
        }
        (0, mongoose_1.connect)(uri, (err) => {
            if (err) {
                console.log(err);
                console.log("DataBase Connection Failed");
            }
            else {
                console.log("DataBase Connection Successfully");
            }
        });
    }
}
exports.DbMongo = DbMongo;
exports.MonStatConnection = mongoose_1.connection.readyState;
