import express from "express";
import { userRoutes } from "../../module/User/user.routes";
import { petRoutes } from "../../module/Pet/pet.routes";
import { adoptionRoutes } from "../../module/Adoption/adoption.routes";

const router = express.Router();

const moduleRoute = [
  {
    path: "/users",
    element: userRoutes,
  },
  {
    path: "/pets",
    element: petRoutes,
  },
  {
    path: "/adoption",
    element: adoptionRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.element));
export default router;
