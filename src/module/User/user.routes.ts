import express, { NextFunction, Request, Response } from "express";

import validationRequest from "../../App/Middlewares/validationRequest";
import {
  loginValidationSchema,
  registerValidationSchema,
  userUpdateValidationSchema,
} from "./userValidation";
import { userController } from "./userController";
import auth from "../../App/Middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/register",
  validationRequest(registerValidationSchema),
  userController.userRegistration
);
router.post(
  "/login",
  validationRequest(loginValidationSchema),
  userController.userLogin
);

router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.MANEGER, UserRole.USER),
  userController.changePassword
);

router.get("", userController.allUsers);
router.get(
  "/profile",
  auth(UserRole.ADMIN, UserRole.MANEGER, UserRole.USER),
  userController.getUser
);

router.patch(
  "/profile",
  validationRequest(userUpdateValidationSchema),
  auth(UserRole.ADMIN, UserRole.MANEGER, UserRole.USER),
  userController.updateUser
);

router.patch(
  "/update-action/:id",
  auth(UserRole.ADMIN, UserRole.MANEGER),
  userController.updateUserAction
);

router.patch(
  "/update-role/:id",
  auth(UserRole.ADMIN, UserRole.MANEGER),
  userController.updateUserRoles
);
router.get(
  "/meta",
  auth(UserRole.ADMIN, UserRole.MANEGER),
  userController.metaData
);

export const userRoutes = router;
