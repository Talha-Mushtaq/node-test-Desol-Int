import express, { Request, Response } from "express";
import {
  IUserLoginRequest,
  IUserRegisterRequest,
} from "../interfaces/user.interface";
import { UserController } from "../controller/user.controller";

const userRouter: express.Router = express.Router();

userRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { body }: { body: IUserRegisterRequest } = req;

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email)) {
      res.statusCode = 400;
      res.set("x-auth-token", "");
      res.send({
        code: res.statusCode,
        message: "Wrong email",
      });
    }
    const exist = await new UserController().findUser(body.email);
    if (exist) {
      res.statusCode = 400;
      res.set("x-auth-token", "");
      res.send({
        code: res.statusCode,
        message: "User already registered",
      });
    }
    const response = await new UserController().saveDataUser(body);
    res.set("x-auth-token", response.token);
    res.send({
      code: res.statusCode,
      message: "User registered successfully",
      email: response.email,
    });
  } catch (error) {
    res.send(error);
  }
});
userRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { body }: { body: IUserLoginRequest } = req;

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email)) {
      res.statusCode = 400;
      res.set("x-auth-token", "");
      res.send({
        code: res.statusCode,
        message: "Wrong email",
      });
    }
    const exist = await new UserController().findUser(body.email);
    if (!exist) {
      res.statusCode = 400;
      // res.set("x-auth-token", "");
      res.send({
        code: res.statusCode,
        message: "Please register your account",
      });
    }
    const response = await new UserController().LoginUser(exist, body);
    if (response.email) {
      res.set("x-auth-token", response.token);
      res.send({
        code: 200,
        message: "User logged in successfully",
        email: response.email,
      });
    } else {
      res.statusCode = 400;
      res.set("x-auth-token", "");
      res.send({
        code: res.statusCode,
        message: "Wrong email or password",
      });
    }
  } catch (error) {
    res.send(error);
  }
});
userRouter.get("/me", async (req: Request, res: Response) => {
  try {
    const token: string | undefined = req.header("x-auth-token");
    if (!token) {
      res.statusCode = 401;
      res.send({ message: "unauthorize" });
    }
    const response = await new UserController().meUser(<string>token);
    res.set("x-auth-token", response.token);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

export const UserRoutesApi = userRouter;
