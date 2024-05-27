"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAysnc_1 = __importDefault(require("../../App/Utilities/catchAysnc"));
const sendResponse_1 = __importDefault(require("../../App/Utilities/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const userService_1 = require("./userService");
const userRegistration = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userService_1.userService.userRegistration(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "User registered successfully",
        data: result,
    });
}));
const userLogin = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userService_1.userService.userLogin(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User logged in successfully",
        data: result,
    });
}));
const getUser = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield userService_1.userService.getUser(user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User profile retrieved successfully",
        data: result,
    });
}));
const updateUser = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield userService_1.userService.updatedUserProfile(user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User profile updated successfully",
        data: result,
    });
}));
exports.userController = {
    userRegistration,
    userLogin,
    getUser,
    updateUser,
};
