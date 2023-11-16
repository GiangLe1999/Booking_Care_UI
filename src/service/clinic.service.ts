import axios from "../axios";
import {
  CreateNewClinicInput,
  GetAllClinicsOutput,
  GetClinicOutput,
} from "../dtos/clinic.dto";

export const createNewClinic = async (
  createNewClinicInput: CreateNewClinicInput
) => {
  try {
    const { data } = await axios.post("/api/clinic", createNewClinicInput);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllClinics = async (): Promise<GetAllClinicsOutput> => {
  try {
    const { data } = await axios.get(`/api/clinics`);
    return data as GetAllClinicsOutput;
  } catch (error) {
    return { ok: false, error: "Could not load clinics" };
  }
};

export const getClinic = async (id: string): Promise<GetClinicOutput> => {
  try {
    const { data } = await axios.get(`/api/clinic?id=${id}`);
    return data as GetClinicOutput;
  } catch (error) {
    return { ok: false, error: "Could not load specialty" };
  }
};
