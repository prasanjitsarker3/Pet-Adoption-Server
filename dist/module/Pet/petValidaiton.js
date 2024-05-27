"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petValidationSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
exports.petValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({ required_error: "Name is required!" }),
        species: zod_1.default.string({ required_error: "Species is required !" }),
        breed: zod_1.default.string({ required_error: "Breed is required" }),
        age: zod_1.default.number().optional(),
        size: zod_1.default.enum([client_1.Size.LARGE, client_1.Size.MEDIUM, client_1.Size.SMALL]),
        location: zod_1.default.string({ required_error: "Location is required" }),
        description: zod_1.default.string().optional(),
        temperament: zod_1.default.string({ required_error: "Temperament is required" }),
        medicalHistory: zod_1.default.string().optional(),
        adoptionRequirements: zod_1.default.string().optional(),
    }),
});
