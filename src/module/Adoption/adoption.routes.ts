import express, { NextFunction, Request, Response } from "express";

import auth from "../../App/Middlewares/auth";
import { adoptionController } from "./adoptionController";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/request",
  auth(UserRole.USER),
  adoptionController.adoptionRequest
);
router.get(
  "",
  auth(UserRole.ADMIN, UserRole.MANEGER),
  adoptionController.getAdoptionAll
);
router.get(
  "/single/:id",
  auth(UserRole.ADMIN, UserRole.MANEGER, UserRole.USER),
  adoptionController.getSingleAdoption
);
router.get("/my-pet", auth(UserRole.USER), adoptionController.getAdoption);
router.patch(
  "/adoption-requests/:requestId",
  auth(UserRole.ADMIN, UserRole.MANEGER),
  adoptionController.changeAdoptionStatus
);

export const adoptionRoutes = router;
