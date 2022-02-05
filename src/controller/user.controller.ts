import {
  IUserRegisterRequest,
  IUserRegisterResponse,
} from "../interfaces/user.interface";
import { CreateJWTToken, varifyJWTToken } from "../middleware/jwt.middleware";
import {
  hashingPassword,
  matchingPassword,
} from "../middleware/securePassword.middleware";
import { UserRepository } from "../repository/user.repository";

export class UserController {
  constructor() {}

  async findUser(data: string): Promise<any> {
    const response = await new UserRepository().findUser(<string>data);
    return response;
  }
  async saveDataUser(data: IUserRegisterRequest): Promise<any> {
    data.password = await hashingPassword(data.password);
    const token: string = CreateJWTToken(data.email);
    const response: IUserRegisterResponse =
      await new UserRepository().saveDataUser(<IUserRegisterRequest>data);
    return {
      email: response.email,
      token: token,
    };
  }
  async LoginUser(dbData: any, userData: IUserRegisterRequest): Promise<any> {
    const matching = await matchingPassword(dbData.password, userData.password);
    console.log(matching);
    if (!matching) return {};
    const token: string = CreateJWTToken(dbData.email);
    return {
      email: dbData.email,
      token: token,
    };
  }
  async meUser(token: string): Promise<any> {
    const data = await varifyJWTToken(token);
    return data;
  }
}
