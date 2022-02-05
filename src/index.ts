import express from "express";
import { UserRoutesApi } from "./route/user.route";
import { DbMongo } from "./config/mongodb.conn";
import {
  MongoCluster,
  MongoDbName,
  MongoUserName,
  MongoUserPassword,
} from "./utill/constant";

const app: express.Application = express();
const PORT: string | number = process.env.PORT || 8080;

new DbMongo().connect(
  MongoCluster,
  MongoDbName,
  MongoUserName,
  MongoUserPassword
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", UserRoutesApi);

app.listen(PORT, () =>
  console.log(`server running on  http://localhost:${PORT}/`)
);
