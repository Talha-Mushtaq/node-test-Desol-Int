import { IUserRegisterRequest } from "../interfaces/user.interface";
import { userModel } from "../model/user.model";

export class UserRepository {
  constructor() {}
  saveDataUser(data: IUserRegisterRequest) {
    return new userModel(data).save();
  }
  findUser(data: string) {
    return userModel.findOne({ email: data });
  }
}
