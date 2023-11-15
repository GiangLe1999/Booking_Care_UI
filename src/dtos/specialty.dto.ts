import { CoreOutput } from "./common.dto";

export interface CreateNewSpecialtyInput {
  name: string;
  image: string;
  description: string;
}

export interface FetchedSpecialty {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface DetailedSpecialty extends FetchedSpecialty {}

export interface GetAllSpecialtiesOutput extends CoreOutput {
  specialties?: FetchedSpecialty[];
}

export interface GetSpecialtyOutput extends CoreOutput {
  specialty?: DetailedSpecialty;
}
