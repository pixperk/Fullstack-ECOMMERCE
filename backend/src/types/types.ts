import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  name: string;
  email: string;
  photo: string;
  gender: string;
  _id: string;
  dob: Date;
}

export interface Params{
  id:string,
}

export type ControllerType = (
  req: Request<Params, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => Promise<void|Response<any, Record<string, any>>>;
