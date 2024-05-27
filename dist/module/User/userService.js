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
exports.userService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = __importDefault(require("../../App/Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createToken_1 = require("../../App/Utilities/createToken");
const config_1 = __importDefault(require("../../config"));
const prisma = new client_1.PrismaClient();
const userRegistration = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcrypt_1.default.hash(payload.password, 12);
    const userData = {
        name: payload.name,
        email: payload.email,
        password: hashPassword,
    };
    const result = yield prisma.user.create({
        data: userData,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updateAt: true,
        },
    });
    return result;
});
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ payload });
    const userData = yield prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Incorrect password !");
    }
    const jwtPayload = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt.accessToken, config_1.default.jwt.accessTokenExpireDate);
    return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        token: accessToken,
    };
});
const getUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updateAt: true,
        },
    });
    return result;
});
const updatedUserProfile = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.user.findUniqueOrThrow({
        where: {
            id: user.id,
        },
    });
    const result = yield prisma.user.update({
        where: {
            id: user.id,
        },
        data: payload,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updateAt: true,
        },
    });
    return result;
});
exports.userService = {
    userRegistration,
    userLogin,
    getUser,
    updatedUserProfile,
};
