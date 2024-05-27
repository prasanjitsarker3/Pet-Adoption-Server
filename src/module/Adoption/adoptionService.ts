import { Prisma, PrismaClient, Status } from "@prisma/client";
import AppError from "../../App/Error/AppError";
import httpStatus from "http-status";
import { IAdoptionRequest, IUser } from "./adoptionInterafce";

const prisma = new PrismaClient();

const adoptionRequest = async (user: IUser, payload: IAdoptionRequest) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
  });
  await prisma.pet.findUniqueOrThrow({
    where: {
      id: payload.petId,
    },
  });

  const requestData = {
    userId: user.id,
    ...payload,
  };
  const result = await prisma.adoptionRequest.create({
    data: requestData,
  });
  return result;
};

const getAllAdoptionRequestAdmin = async () => {
  const result = await prisma.adoptionRequest.findMany({
    include: {
      user: true,
      pet: true,
    },
  });
  return result;
};
const getAllAdoptionRequest = async (user: any) => {
  const result = await prisma.adoptionRequest.findMany({
    where: {
      userId: user.id,
    },
    include: {
      pet: true,
    },
  });
  return result;
};

const getSingleAdoptionPet = async (id: string) => {
  const result = await prisma.adoptionRequest.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      pet: true,
    },
  });
  return result;
};
const updateRequestStatus = async (id: string, status: Status) => {
  const isExistAdoption = await prisma.adoptionRequest.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  if (!isExistAdoption) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found!");
  }
  const result = await prisma.adoptionRequest.update({
    where: {
      id: id,
    },
    // @ts-ignore
    data: status,
  });
  return result;
};

export const adoptionService = {
  adoptionRequest,
  getAllAdoptionRequest,
  updateRequestStatus,
  getAllAdoptionRequestAdmin,
  getSingleAdoptionPet,
};
