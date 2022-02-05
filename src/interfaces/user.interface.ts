export interface IUserRegisterRequest {
  email: string;
  password: string;
}
export interface IUserLoginRequest {
  email: string;
  password: string;
}
export interface IUserRegisterResponse {
  email: string;
  password: string;
  token?: string;
}
