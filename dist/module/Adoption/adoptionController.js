"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionController = void 0;
const catchAysnc_1 = __importDefault(require("../../App/Utilities/catchAysnc"));
const sendResponse_1 = __importDefault(require("../../App/Utilities/sendResponse"));
const adoptionService_1 = require("./adoptionService");
const adoptionRequest = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield adoptionService_1.adoptionService.adoptionRequest(user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Adoption request submitted successfully",
        data: result,
    });
}));
const getAdoptionAll = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adoptionService_1.adoptionService.getAllAdoptionRequestAdmin();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Adoption requests retrieved successfully",
        data: result,
    });
}));
const getAdoption = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield adoptionService_1.adoptionService.getAllAdoptionRequest(user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Adoption requests retrieved successfully",
        data: result,
    });
}));
const getSingleAdoption = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield adoptionService_1.adoptionService.getSingleAdoptionPet(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Single Adoption retrieved successfully",
        data: result,
    });
}));
const changeAdoptionStatus = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId } = req.params;
    const result = yield adoptionService_1.adoptionService.updateRequestStatus(requestId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Adoption request updated successfully",
        data: result,
    });
}));
exports.adoptionController = {
    adoptionRequest,
    getAdoption,
    changeAdoptionStatus,
    getAdoptionAll,
    getSingleAdoption,
};
