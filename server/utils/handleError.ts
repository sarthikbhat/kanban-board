import { Response } from "express"
import { Error } from "../types/Error";

export const handleError = (error: Error | any, res: Response) => {
  if(typeCheck("status",error)){
    return res.status(error.status).send(error.message);
  }

  if (error.name === "ValidationError") {
    let errors: any = {};

    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });

    return res.status(400).send(errors);
  }
  return res.status(500).send("Something went wrong");
};

function typeCheck(member: string, object: any): object is Error {
  return member in object;
} 