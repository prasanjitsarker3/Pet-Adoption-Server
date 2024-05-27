import { Request, Response } from "express";
import catchAsync from "../../App/Utilities/catchAysnc";
import sendResponse from "../../App/Utilities/sendResponse";
import { adoptionService } from "./adoptionService";

const adoptionRequest = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await adoptionService.adoptionRequest(user, req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Adoption request submitted successfully",
      data: result,
    });
  }
);
const getAdoptionAll = catchAsync(async (req: Request, res: Response) => {
  const result = await adoptionService.getAllAdoptionRequestAdmin();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Adoption requests retrieved successfully",
    data: result,
  });
});
const getAdoption = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await adoptionService.getAllAdoptionRequest(user);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Adoption requests retrieved successfully",
      data: result,
    });
  }
);
const getSingleAdoption = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adoptionService.getSingleAdoptionPet(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single Adoption retrieved successfully",
    data: result,
  });
});
const changeAdoptionStatus = catchAsync(async (req: Request, res: Response) => {
  const { requestId } = req.params;
  const result = await adoptionService.updateRequestStatus(requestId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Adoption request updated successfully",
    data: result,
  });
});

export const adoptionController = {
  adoptionRequest,
  getAdoption,
  changeAdoptionStatus,
  getAdoptionAll,
  getSingleAdoption,
};
