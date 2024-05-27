import { Prisma, PrismaClient } from "@prisma/client";
import { IPet } from "./petInterface";
import paginationCalculation, {
  IPaginationOptions,
  IPetFilterRequest,
  petSearchingField,
} from "./petConstant";
import AppError from "../../App/Error/AppError";
import httpStatus from "http-status";

const prisma = new PrismaClient();

const addPetInToDB = async (payload: any) => {
  const result = await prisma.pet.create({
    data: payload,
  });
  return result;
};

const getAllPets = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationCalculation(options);

  const { searchTerm, ...filterData } = params;
  console.log("Search", searchTerm);

  const andCondition: Prisma.PetWhereInput[] = [];

  // Add search conditions
  if (searchTerm) {
    andCondition.push({
      OR: petSearchingField.map((field) => ({
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

  const whereCondition: Prisma.PetWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  // Fetch data from the database
  const result = await prisma.pet.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "asc" },
  });

  // Fetch the total count of records
  const total = await prisma.pet.count({ where: whereCondition });

  return {
    meta: {
      page,
      limit,
      total,
    },
    result,
  };
};

const getSinglePet = async (id: string) => {
  const petData = await prisma.pet.findFirstOrThrow({
    where: {
      id,
    },
  });
  if (!petData) {
    throw new AppError(httpStatus.NOT_FOUND, "Pet Data Not Found!");
  }
  return petData;
};
const updatePetFromDB = async (id: string, payload: any) => {
  await prisma.pet.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  const result = await prisma.pet.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

const softDeletePet = async (id: string) => {
  const petData = await prisma.pet.findFirstOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.pet.update({
    where: {
      id: petData.id,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};

export const petService = {
  addPetInToDB,
  getAllPets,
  updatePetFromDB,
  getSinglePet,
  softDeletePet,
};
