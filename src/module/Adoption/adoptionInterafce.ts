export type IUser = {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
};

export type IAdoptionRequest = {
  petId: string;
  petOwnershipExperience: string;
};
