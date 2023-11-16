import { CoreOutput } from "./common.dto";

export interface CreateNewClinicInput {
  name: string;
  image: string;
  logo: string;
  description: string;
  address: string;
}

export interface FetchedClinic {
  id: number;
  name: string;
  description: string;
  address: string;
  image: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

export interface DetailedClinic extends FetchedClinic {}

export interface GetAllClinicsOutput extends CoreOutput {
  clinics?: FetchedClinic[];
}

export interface GetClinicOutput extends CoreOutput {
  clinic?: DetailedClinic;
}
