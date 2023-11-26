import axios from "../axios";
import {
  CreateNewArticleInput,
  GetAllArticlesOutput,
  GetArticleBySlugOutput,
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

export const getHandbookBySlug = async (
  slug: string
): Promise<GetArticleBySlugOutput> => {
  try {
    const { data } = await axios.get(`/api/handbook?slug=${slug}`);
    return data as GetArticleBySlugOutput;
  } catch (error) {
    return { ok: false, error: "Could not load handbook" };
  }
};

export const getHandbookResults = async (
  query: string
): Promise<GetAllArticlesOutput> => {
  try {
    if (query && query.length > 0) {
      const { data } = await axios.get(`/api/handbook-results?query=${query}`);
      return data as GetAllArticlesOutput;
    } else {
      return { ok: false, error: "Missing required parameter" };
    }
  } catch (error) {
    return { ok: false, error: "Could not load handbooks" };
  }
};
