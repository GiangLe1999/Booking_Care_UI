import axios from "../axios";
import {
  CreateNewArticleInput,
  GetAllArticlesOutput,
} from "../dtos/articles.dto";

export const createNewLonglive = async (
  createNewLongliveInput: CreateNewArticleInput
) => {
  try {
    const { data } = await axios.post("/api/longlive", createNewLongliveInput);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getHomeLonglives = async (): Promise<GetAllArticlesOutput> => {
  try {
    const { data } = await axios.get(`/api/home-longlives`);
    return data as GetAllArticlesOutput;
  } catch (error) {
    return { ok: false, error: "Could not load longlive" };
  }
};
