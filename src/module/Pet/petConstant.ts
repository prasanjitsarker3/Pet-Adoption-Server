export const petFilterableFields = ["size", "gender", "species", "searchTerm"];
export const optionsPaginationFields = ["limit", "page", "sortBy", "sortOrder"];
export const petSearchingField = ["name", "breed", "location"];

export type IPetFilterRequest = {
  species?: string | undefined;
  size?: string | undefined;
  gender?: string | undefined;
  searchTerm?: string | undefined;
};

export type IPaginationOptions = {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
};

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

const paginationCalculation = (options: IOptions): IOptionsResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip: number = (Number(page) - 1) * limit;
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

export default paginationCalculation;
