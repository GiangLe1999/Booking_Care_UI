import { CoreOutput } from "./common.dto";

export interface FetchedDoctor {
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
  doctors?: FetchedDoctor[];
}

export interface GetAllDoctorsOutput extends GetTopDoctorsOutput {}

export interface SaveDoctorInfoInput {
  doctorId: number;
  content: string;
  description?: string;
}

export interface DetailedDoctor extends FetchedDoctor {
  Content: { description: string; content: string };
  positionData: {
    valueEn: string;
    valueVi: string;
  };
}

export interface GetDoctorOutput extends CoreOutput {
  doctor?: DetailedDoctor;
}

export interface EditDoctorInfoInput extends SaveDoctorInfoInput {}
