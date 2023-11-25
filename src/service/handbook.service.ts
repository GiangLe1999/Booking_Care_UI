import axios from "../axios";
import {
  CreateNewArticleInput,
  GetAllArticlesOutput,
} from "../dtos/articles.dto";

export const createNewHandbook = async (
  createNewHandbookInput: CreateNewArticleInput
) => {
  try {
    const { data } = await axios.post("/api/handbook", createNewHandbookInput);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getHomeHandbooks = async (): Promise<GetAllArticlesOutput> => {
  try {
    const { data } = await axios.get(`/api/home-handbooks`);
    return data as GetAllArticlesOutput;
  } catch (error) {
    return { ok: false, error: "Could not load handbooks" };
  }
};
