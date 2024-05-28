"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateValidationSchema = exports.changePasswordValidationSchema = exports.loginValidationSchema = exports.registerValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({ required_error: "Name is required" }),
        email: zod_1.default.string({ required_error: "Email is required" }),
        password: zod_1.default.string({ required_error: "Password is required" }),
    }),
});
exports.loginValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.string({ required_error: "Email is required" }),
        password: zod_1.default.string({ required_error: "Password is required" }),
    }),
});
exports.changePasswordValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        currentPassword: zod_1.default.string({ required_error: "Email is required" }),
        newPassword: zod_1.default.string({ required_error: "Password is required" }),
    }),
});
exports.userUpdateValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().optional(),
        email: zod_1.default.string().optional(),
        photo: zod_1.default.string().optional(),
    }),
});
