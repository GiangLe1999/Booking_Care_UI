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
  priceId: string;
  paymentId: string;
  provinceId?: string;
  specialtyId?: string;
  clinicId?: string;
  clinicAddress?: string;
  clinicName: string;
  note?: string;
}

export interface DetailedDoctor extends FetchedDoctor {
  Content: { description: string; content: string };
  Doctor_Info: {
    clinicAddress?: string;
    clinicName: string;
    count: number;
    note?: string;
    paymentId: string;
    paymentTypeData: { valueEn: string; valueVi: string };
    priceId: string;
    priceTypeData: { valueEn: string; valueVi: string };
    provinceId?: string;
    provinceTypeData?: { valueEn: string; valueVi: string };
    Specialty: { id: number; name: string };
    Clinic: { id: number; name: string };
  };
  positionData: {
    valueEn: string;
    valueVi: string;
  };
}

export interface GetDoctorOutput extends CoreOutput {
  doctor?: DetailedDoctor;
}

export interface EditDoctorInfoInput extends SaveDoctorInfoInput {}

export type BulkCreateSchedulesInput = {
  doctorId: number;
  date: Date;
  timeType: string;
}[];

export interface FetchedSchedule {
  id: number;
  currentNumber: number;
  maxNumber: number;
  date: string;
  timeType: string;
  doctorId: number;
  timeTypeData: {
    valueEn: string;
    valueVi: string;
  };
}

export interface GetScheduleByDateInput {
  doctorId: number;
  date: number;
}

export interface GetScheduleByDateOutput extends CoreOutput {
  schedules?: FetchedSchedule[];
}
