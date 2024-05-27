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
exports.adoptionService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../../App/Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma = new client_1.PrismaClient();
const adoptionRequest = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.user.findUniqueOrThrow({
        where: {
            id: user.id,
        },
    });
    yield prisma.pet.findUniqueOrThrow({
        where: {
            id: payload.petId,
        },
    });
    const requestData = Object.assign({ userId: user.id }, payload);
    const result = yield prisma.adoptionRequest.create({
        data: requestData,
    });
    return result;
});
const getAllAdoptionRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.adoptionRequest.findMany({});
    return result;
});
const updateRequestStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistAdoption = yield prisma.adoptionRequest.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    if (!isExistAdoption) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Data Not Found!");
    }
    const result = yield prisma.adoptionRequest.update({
        where: {
            id: id,
        },
        // @ts-ignore
        data: status,
    });
    return result;
});
exports.adoptionService = {
    adoptionRequest,
    getAllAdoptionRequest,
    updateRequestStatus,
};
