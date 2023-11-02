import { CoreOutput } from "./common.dto";

export interface FetchedDoctors {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  gender: string;
  image: any;
  roleId: string;
  phoneNumber: string;
  positionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetTopDoctorsOutput extends CoreOutput {
  doctors?: FetchedDoctors[];
}

export interface GetAllDoctorsOutput extends GetTopDoctorsOutput {}

export interface SaveDoctorInfoInput {
  doctorId: number;
  content: string;
  description?: string;
}
