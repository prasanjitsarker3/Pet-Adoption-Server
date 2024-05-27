import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status";
import AppError from "../Error/AppError";
import { verifyToken } from "../Utilities/verifyToken";
import config from "../../config";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "Your are not authorization"
        );
      }
      const verifyUser = verifyToken(token, config.jwt.accessToken as string);
      console.log(verifyUser);
      req.user = verifyUser;
      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new AppError(httpStatus.FORBIDDEN, "Forbidden !");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
