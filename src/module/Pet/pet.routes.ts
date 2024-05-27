import express, { NextFunction, Request, Response } from "express";
import { petController } from "./petController";
import validationRequest from "../../App/Middlewares/validationRequest";
import { petValidationSchema } from "./petValidaiton";
import auth from "../../App/Middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/create",
  auth(UserRole.ADMIN, UserRole.MANEGER, UserRole.USER),
  validationRequest(petValidationSchema),
  petController.addPetInToDB
);
router.get("", petController.getAllPets);
router.get("/:id", petController.getSinglePets);
router.patch(
  "/:petId",
  auth(UserRole.ADMIN, UserRole.MANEGER),
  petController.updatePet
);
router.delete("/:id", petController.deletePet);

export const petRoutes = router;
