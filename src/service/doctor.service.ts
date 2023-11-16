import axios from "../axios";
import { CoreOutput } from "../dtos/common.dto";
import {
  BulkCreateSchedulesInput,
  EditDoctorInfoInput,
  GetAllDoctorsOutput,
  GetDoctorOutput,
  GetScheduleByDateInput,
  GetScheduleByDateOutput,
  GetTopDoctorsOutput,
  SaveDoctorInfoInput,
} from "../dtos/doctor.dto";

export const getTopDoctors = async (
  limit?: number
): Promise<GetTopDoctorsOutput> => {
  try {
    const { data } = await axios.get(
      `/api/top-doctors${limit ? `?limit=${limit}` : ""}`
    );
    return data as GetTopDoctorsOutput;
  } catch (error) {
    return { ok: false, error: "Could not load top doctors" };
  }
};

export const getAllDoctors = async (): Promise<GetAllDoctorsOutput> => {
  try {
    const { data } = await axios.get("/api/doctors");
    return data as GetAllDoctorsOutput;
  } catch (error) {
    return { ok: false, error: "Could not load all doctors" };
  }
};

export const getDoctor = async (id: string): Promise<GetDoctorOutput> => {
  try {
    const { data } = await axios.get(`/api/doctor?id=${id}`);
    return data as GetDoctorOutput;
  } catch (error) {
    return { ok: false, error: "Could not load doctor" };
  }
};

export const saveDoctorInfo = async (
  saveDoctorInfoInput: SaveDoctorInfoInput
): Promise<CoreOutput> => {
  try {
    const { data } = await axios.post("/api/doctor-info", saveDoctorInfoInput);
    return data as CoreOutput;
  } catch (error: any) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

export const editDoctorInfo = async (
  editDoctorInfoInput: EditDoctorInfoInput
): Promise<CoreOutput> => {
  try {
    const { data } = await axios.put("/api/doctor-info", editDoctorInfoInput);
    return data as CoreOutput;
  } catch (error: any) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

export const bulkCreateSchedules = async (
  bulkCreateSchedulesInput: BulkCreateSchedulesInput
): Promise<CoreOutput> => {
  try {
    const { data } = await axios.post(
      "/api/schedule",
      bulkCreateSchedulesInput
    );
    return data as CoreOutput;
  } catch (error: any) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

export const getScheduleByDate = async (
  getScheduleByDateInput: GetScheduleByDateInput
): Promise<GetScheduleByDateOutput> => {
  try {
    const { data } = await axios.post(
      "/api/get-schedule-by-date",
      getScheduleByDateInput
    );
    return data as GetScheduleByDateOutput;
  } catch (error: any) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

export const getDoctorsBySpecialty = async (
  specialtyId: string,
  location: string = "ALL"
) => {
  try {
    const { data } = await axios(
      `/api/get-doctors-by-specialty?specialtyId=${specialtyId}&location=${location}`
    );
    return data;
  } catch (error: any) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

export const getDoctorsByClinic = async (clinicId: string) => {
  try {
    const { data } = await axios(
      `/api/get-doctors-by-clinic?clinicId=${clinicId}`
    );
    return data;
  } catch (error: any) {
    return {
      ok: false,
      error: error.message,
    };
  }
};
