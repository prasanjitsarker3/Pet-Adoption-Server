import { Action, PrismaClient, UserRole } from "@prisma/client";
import { ILogin, IRegister } from "./userInterface";
import bcrypt from "bcrypt";
import AppError from "../../App/Error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createToken } from "../../App/Utilities/createToken";
import config from "../../config";
import { IUser } from "../Adoption/adoptionInterafce";

const prisma = new PrismaClient();

const userRegistration = async (payload: IRegister) => {
  const hashPassword = await bcrypt.hash(payload.password, 12);
  const userData = {
    name: payload.name,
    email: payload.email,
    password: hashPassword,
  };

  const result = await prisma.user.create({
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
};

const userLogin = async (payload: ILogin) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  console.log(userData);

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found !");
  }
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new AppError(httpStatus.FORBIDDEN, "Incorrect password !");
  }
  const jwtPayload: JwtPayload = {
    id: userData.id,
    name: userData.name,
    role: userData.role,
    email: userData.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt.accessToken as string,
    config.jwt.accessTokenExpireDate as string
  );
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    token: accessToken,
  };
};

const changeUserPassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
      // action:Action
    },
  });
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "User Data Not Found !");
  }

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.currentPassword,
    userData.password
  );
  console.log("Check:", isCorrectPassword);

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.NOT_FOUND, "Password doesn't match !");
  }

  const hashPassword: string = await bcrypt.hash(payload.newPassword, 12);
  console.log(hashPassword);

  const result = await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashPassword,
      // needPasswordChange: false,
    },
  });

  return result;
};

const getUser = async (user: IUser) => {
  const result = await prisma.user.findUnique({
    where: {
      id: user.id,
      email: user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updateAt: true,
    },
  });
  return result;
};

const updatedUserProfile = async (user: IUser, payload: ILogin) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
  });
  console.log("Pay", payload);

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: payload,
    // select: {
    //   id: true,
    //   name: true,
    //   email: true,
    //   photo: true,
    //   createdAt: true,
    //   updateAt: true,
    // },
  });

  return result;
};

const updateUserAction = async (id: string, Action: Action) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
  });
  // console.log("AC", Action);

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found!");
  }
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: Action,
  });
  // console.log(result);

  return result;
};

const updateUserRoles = async (id: string, UserRole: UserRole) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
  });

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found!");
  }
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: UserRole,
  });

  return result;
};

const allUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      photo: true,
      role: true,
      action: true,
      createdAt: true,
    },
  });
  return result;
};

const profileMetaData = async (user: IUser) => {
  const userCount = await prisma.user.count();
  const petCount = await prisma.pet.count();
  const adoptionCount = await prisma.adoptionRequest.count();
  const piaChart = await prisma.pet.groupBy({
    by: ["species"],
    _count: {
      id: true,
    },
  });
  const formattedPiaData = piaChart.map((count) => ({
    status: count.species,
    count: Number(count._count.id),
  }));

  return {
    user: userCount,
    pet: petCount,
    adoption: adoptionCount,
    piaData: formattedPiaData,
  };
};

export const userService = {
  userRegistration,
  userLogin,
  changeUserPassword,
  getUser,
  updatedUserProfile,
  updateUserAction,
  updateUserRoles,
  allUsers,
  profileMetaData,
};
