import { Schema, model } from "mongoose";
import { IUserRegisterRequest } from "../interfaces/user.interface";

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
export const userModel = model<IUserRegisterRequest>("users", UserSchema);
