import { Request, Response } from "express";
import catchAsync from "../../App/Utilities/catchAysnc";
import { petService } from "./petService";
import sendResponse from "../../App/Utilities/sendResponse";
import pick from "../../App/Shared/pick";
import { optionsPaginationFields, petFilterableFields } from "./petConstant";

const addPetInToDB = catchAsync(async (req: Request, res: Response) => {
  const result = await petService.addPetInToDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Pet added successfully",
    data: result,
  });
});
const getAllPets = catchAsync(async (req: Request, res: Response) => {
  const filterData = pick(req.query, petFilterableFields);
  const optionsData = pick(req.query, optionsPaginationFields);
  const result = await petService.getAllPets(filterData, optionsData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Pets retrieved successfully",
    data: result,
  });
});
const getSinglePets = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await petService.getSinglePet(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single Pets retrieved successfully",
    data: result,
  });
});

const updatePet = catchAsync(async (req: Request, res: Response) => {
  const { petId } = req.params;
  const result = await petService.updatePetFromDB(petId, req.body);
  console.log(result);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Pet profile updated successfully",
    data: result,
  });
});
const deletePet = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await petService.softDeletePet(id);
  console.log(result);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Pet delete successfully",
    data: result,
  });
});

export const petController = {
  addPetInToDB,
  getAllPets,
  updatePet,
  getSinglePets,
  deletePet,
};
