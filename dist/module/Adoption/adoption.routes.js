"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../App/Middlewares/auth"));
const adoptionController_1 = require("./adoptionController");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/request", (0, auth_1.default)(client_1.UserRole.USER), adoptionController_1.adoptionController.adoptionRequest);
router.get("", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.MANEGER), adoptionController_1.adoptionController.getAdoptionAll);
router.get("/single/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.MANEGER, client_1.UserRole.USER), adoptionController_1.adoptionController.getSingleAdoption);
router.get("/my-pet", (0, auth_1.default)(client_1.UserRole.USER), adoptionController_1.adoptionController.getAdoption);
router.patch("/adoption-requests/:requestId", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.MANEGER), adoptionController_1.adoptionController.changeAdoptionStatus);
exports.adoptionRoutes = router;
