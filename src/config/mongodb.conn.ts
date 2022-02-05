import { connect, connection } from "mongoose";
export class DbMongo {
  constructor() {}
  connect(
    MongoCluster: string,
    MongoDbName: string,
    MongoUserName?: string,
    MongoUserPassword?: string,
    p?: number
  ) {
    let uri = `mongodb://${MongoCluster}:${p}/${MongoDbName}`;
    if (MongoUserName != undefined && MongoUserPassword != undefined) {
      uri = `mongodb+srv://${MongoUserName}:${MongoUserPassword}@${MongoCluster}/${MongoDbName}`;
    }
    connect(uri, (err: any) => {
      if (err) {
        console.log(err);
        console.log("DataBase Connection Failed");
      } else {
        console.log("DataBase Connection Successfully");
      }
    });
  }
}
export const MonStatConnection = connection.readyState;
