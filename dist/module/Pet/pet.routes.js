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
const router = express_1.default.Router();
router.post("", (0, auth_1.default)(), (0, validationRequest_1.default)(petValidaiton_1.petValidationSchema), petController_1.petController.addPetInToDB);
router.get("", (0, auth_1.default)(), petController_1.petController.getAllPets);
router.patch("/:petId", (0, auth_1.default)(), petController_1.petController.updatePet);
exports.petRoutes = router;
