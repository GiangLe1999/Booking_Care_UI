import axios from "../axios";
import { CoreOutput } from "../dtos/common.dto";
import {
  EditDoctorInfoInput,
  GetAllDoctorsOutput,
  GetDoctorOutput,
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
