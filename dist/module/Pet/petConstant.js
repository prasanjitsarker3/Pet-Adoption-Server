"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.petSearchingField = exports.optionsPaginationFields = exports.petFilterableFields = void 0;
exports.petFilterableFields = [
    "species",
    "breed",
    "age",
    "size",
    "location",
    "searchTerm",
];
exports.optionsPaginationFields = ["limit", "page", "sortBy", "sortOrder"];
exports.petSearchingField = ["species", "breed", "location"];
const paginationCalculation = (options) => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (Number(page) - 1) * limit;
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder || "desc";
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.default = paginationCalculation;
