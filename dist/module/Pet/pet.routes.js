"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petRoutes = void 0;
const express_1 = __importDefault(require("express"));
const petController_1 = require("./petController");
const validationRequest_1 = __importDefault(require("../../App/Middlewares/validationRequest"));
const petValidaiton_1 = require("./petValidaiton");
const auth_1 = __importDefault(require("../../App/Middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/create", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.MANEGER, client_1.UserRole.USER), (0, validationRequest_1.default)(petValidaiton_1.petValidationSchema), petController_1.petController.addPetInToDB);
router.get("", petController_1.petController.getAllPets);
router.get("/:id", petController_1.petController.getSinglePets);
router.patch("/:petId", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.MANEGER), petController_1.petController.updatePet);
router.delete("/:id", petController_1.petController.deletePet);
exports.petRoutes = router;
