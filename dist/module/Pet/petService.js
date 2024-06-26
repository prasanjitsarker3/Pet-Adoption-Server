"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petService = void 0;
const client_1 = require("@prisma/client");
const petConstant_1 = __importStar(require("./petConstant"));
const AppError_1 = __importDefault(require("../../App/Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma = new client_1.PrismaClient();
const addPetInToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.pet.create({
        data: payload,
    });
    return result;
});
const getAllPets = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, petConstant_1.default)(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    console.log("Search", searchTerm);
    const andCondition = [];
    // Add search conditions
    if (searchTerm) {
        andCondition.push({
            OR: petConstant_1.petSearchingField.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    // Add filter conditions
    if (Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    andCondition.push({
        isDeleted: false,
    });
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    // Fetch data from the database
    const result = yield prisma.pet.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "asc" },
    });
    // Fetch the total count of records
    const total = yield prisma.pet.count({ where: whereCondition });
    return {
        meta: {
            page,
            limit,
            total,
        },
        result,
    };
});
const getSinglePet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const petData = yield prisma.pet.findFirstOrThrow({
        where: {
            id,
        },
    });
    if (!petData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Pet Data Not Found!");
    }
    return petData;
});
const updatePetFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.pet.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma.pet.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const softDeletePet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const petData = yield prisma.pet.findFirstOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma.pet.update({
        where: {
            id: petData.id,
        },
        data: {
            isDeleted: true,
        },
    });
    return result;
});
exports.petService = {
    addPetInToDB,
    getAllPets,
    updatePetFromDB,
    getSinglePet,
    softDeletePet,
};
