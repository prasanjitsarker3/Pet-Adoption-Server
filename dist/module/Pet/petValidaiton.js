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
        species: zod_1.default.enum([
            client_1.Species.BIRD,
            client_1.Species.CAT,
            client_1.Species.DOG,
            client_1.Species.FISH,
            client_1.Species.OTHER,
            client_1.Species.RABBIT,
            client_1.Species.REPTILE,
        ]),
        breed: zod_1.default.string({ required_error: "Breed is required" }),
        age: zod_1.default.number().optional(),
        photos: zod_1.default.string({ required_error: "Photo is required" }),
        size: zod_1.default.enum([client_1.Size.LARGE, client_1.Size.MEDIUM, client_1.Size.SMALL], {
            required_error: "Size Required!h",
        }),
        gender: zod_1.default.enum([client_1.Gender.FEMALE, client_1.Gender.MALE, client_1.Gender.UNKNOWN]),
        location: zod_1.default.string({ required_error: "Location is required" }),
        description: zod_1.default.string().optional(),
        healthStatus: zod_1.default.string().optional(),
        adoptionRequirements: zod_1.default.string().optional(),
    }),
});
