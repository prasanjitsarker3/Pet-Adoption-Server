import { Request, Response } from "express";
import catchAsync from "../../App/Utilities/catchAysnc";
import sendResponse from "../../App/Utilities/sendResponse";
import httpStatus from "http-status";
import { userService } from "./userService";

const userRegistration = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.userRegistration(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const userLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.userLogin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});
const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await userService.changeUserPassword(user, req.body);
    console.log("result", result);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User password change in successfully",
      data: result,
    });
  }
);
const getUser = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await userService.getUser(user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile retrieved successfully",
      data: result,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await userService.updatedUserProfile(user, req.body);
    console.log("result");
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile updated successfully",
      data: result,
    });
  }
);

const updateUserAction = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  console.log("R", req.body);
  const result = await userService.updateUserAction(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status updated successfully",
    data: result,
  });
});
const updateUserRoles = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.updateUserRoles(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User roles updated successfully",
    data: result,
  });
});
const allUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.allUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetch successfully",
    data: result,
  });
});
const metaData = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await userService.profileMetaData(user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Meat data fetch successfully",
      data: result,
    });
  }
);

export const userController = {
  userRegistration,
  userLogin,
  changePassword,
  getUser,
  updateUser,
  updateUserAction,
  updateUserRoles,
  allUsers,
  metaData,
};
