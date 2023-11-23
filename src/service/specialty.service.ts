import {
  CreateNewSpecialtyInput,
  GetAllSpecialtiesOutput,
  GetSpecialtyOutput,
} from "../dtos/specialty.dto";
import axios from "../axios";

export const createNewSpecialty = async (
  createNewSpecialtyInput: CreateNewSpecialtyInput
) => {
  try {
    const { data } = await axios.post(
      "/api/specialty",
      createNewSpecialtyInput
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllSpecialties = async (): Promise<GetAllSpecialtiesOutput> => {
  try {
    const { data } = await axios.get(`/api/specialties`);
    return data as GetAllSpecialtiesOutput;
  } catch (error) {
    return { ok: false, error: "Could not load specialties" };
  }
};

export const getHomeSpecialties =
  async (): Promise<GetAllSpecialtiesOutput> => {
    try {
      const { data } = await axios.get(`/api/home-specialties`);
      return data as GetAllSpecialtiesOutput;
    } catch (error) {
      return { ok: false, error: "Could not load specialties" };
    }
  };

export const getSpecialty = async (id: string): Promise<GetSpecialtyOutput> => {
  try {
    const { data } = await axios.get(`/api/specialty?id=${id}`);
    return data as GetSpecialtyOutput;
  } catch (error) {
    return { ok: false, error: "Could not load specialty" };
  }
};
