"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../App/Middlewares/validationRequest"));
const userValidation_1 = require("./userValidation");
const userController_1 = require("./userController");
const auth_1 = __importDefault(require("../../App/Middlewares/auth"));
const router = express_1.default.Router();
router.post("/register", (0, validationRequest_1.default)(userValidation_1.registerValidationSchema), userController_1.userController.userRegistration);
router.post("/login", (0, validationRequest_1.default)(userValidation_1.loginValidationSchema), userController_1.userController.userLogin);
router.get("/profile", (0, auth_1.default)(), userController_1.userController.getUser);
router.patch("/profile", (0, validationRequest_1.default)(userValidation_1.userUpdateValidationSchema), (0, auth_1.default)(), userController_1.userController.updateUser);
exports.userRoutes = router;
