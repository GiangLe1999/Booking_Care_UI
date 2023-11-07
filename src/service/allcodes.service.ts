import { GetCodesByTypeOutput } from "../dtos/allcodes.dto";
import axios from "../axios";

export const getCodesByType = async (
  type: string
): Promise<GetCodesByTypeOutput> => {
  try {
    const { data } = await axios.get(`/api/codes?type=${type}`);
    return data as GetCodesByTypeOutput;
  } catch (error) {
    return { ok: false, error: "Could not load codes" };
  }
};
