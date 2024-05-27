import { Gender, Size, Species } from "@prisma/client";
import z from "zod";

export const petValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }),
    species: z.enum([
      Species.BIRD,
      Species.CAT,
      Species.DOG,
      Species.FISH,
      Species.OTHER,
      Species.RABBIT,
      Species.REPTILE,
    ]),
    breed: z.string({ required_error: "Breed is required" }),
    age: z.number().optional(),
    photos: z.string({ required_error: "Photo is required" }),
    size: z.enum([Size.LARGE, Size.MEDIUM, Size.SMALL], {
      required_error: "Size Required!h",
    }),
    gender: z.enum([Gender.FEMALE, Gender.MALE, Gender.UNKNOWN]),
    location: z.string({ required_error: "Location is required" }),
    description: z.string().optional(),
    healthStatus: z.string().optional(),
    adoptionRequirements: z.string().optional(),
  }),
});
