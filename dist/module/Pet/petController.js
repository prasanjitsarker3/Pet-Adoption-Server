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
exports.petController = void 0;
const catchAysnc_1 = __importDefault(require("../../App/Utilities/catchAysnc"));
const petService_1 = require("./petService");
const sendResponse_1 = __importDefault(require("../../App/Utilities/sendResponse"));
const pick_1 = __importDefault(require("../../App/Shared/pick"));
const petConstant_1 = require("./petConstant");
const addPetInToDB = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield petService_1.petService.addPetInToDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Pet added successfully",
        data: result,
    });
}));
const getAllPets = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterData = (0, pick_1.default)(req.query, petConstant_1.petFilterableFields);
    const optionsData = (0, pick_1.default)(req.query, petConstant_1.optionsPaginationFields);
    const result = yield petService_1.petService.getAllPets(filterData, optionsData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Pets retrieved successfully",
        data: result,
    });
}));
const updatePet = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { petId } = req.params;
    const result = yield petService_1.petService.updatePetFromDB(petId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Pet profile updated successfully",
        data: result,
    });
}));
exports.petController = {
    addPetInToDB,
    getAllPets,
    updatePet,
};
