import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../model/user.model";
const secretKey: string = "this is a secret key";
const exp: number = 3 * 24 * 60 * 60;

export const CreateJWTToken = (email: string) => {
  const jwtToken = jwt.sign({ email }, secretKey, {
    expiresIn: exp,
  });

  return jwtToken;
};

export const varifyJWTToken = async (token: string) => {
  const data = jwt.verify(token, secretKey);
  return data;
};
