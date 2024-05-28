"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../../module/User/user.routes");
const pet_routes_1 = require("../../module/Pet/pet.routes");
const adoption_routes_1 = require("../../module/Adoption/adoption.routes");
const router = express_1.default.Router();
const moduleRoute = [
    {
        path: "/users",
        element: user_routes_1.userRoutes,
    },
    {
        path: "/pets",
        element: pet_routes_1.petRoutes,
    },
    {
        path: "/adoption",
        element: adoption_routes_1.adoptionRoutes,
    },
];
moduleRoute.forEach((route) => router.use(route.path, route.element));
exports.default = router;
