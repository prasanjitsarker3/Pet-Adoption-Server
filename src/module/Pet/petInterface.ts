import { Size } from "@prisma/client";

export type IPet = {
  name: string;
  species: string;
  breed: string | undefined;
  age?: number;
  size: Size;
  location: string | undefined;
  description: string | undefined;
  temperament: string;
  medicalHistory: string | undefined;
  adoptionRequirements: string | undefined;
};
