import axios from "../axios";
import {
  CreateNewArticleInput,
  GetAllArticlesOutput,
  GetArticleBySlugOutput,
} from "../dtos/articles.dto";

export const createNewTip = async (
  createNewTipInput: CreateNewArticleInput
) => {
  try {
    const { data } = await axios.post("/api/tip", createNewTipInput);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getHomeTips = async (): Promise<GetAllArticlesOutput> => {
  try {
    const { data } = await axios.get(`/api/home-tips`);
    return data as GetAllArticlesOutput;
  } catch (error) {
    return { ok: false, error: "Could not load tips" };
  }
};

export const getTipBySlug = async (
  slug: string
): Promise<GetArticleBySlugOutput> => {
  try {
    const { data } = await axios.get(`/api/tip?slug=${slug}`);
    return data as GetArticleBySlugOutput;
  } catch (error) {
    return { ok: false, error: "Could not load tip" };
  }
};

export const getTipsResults = async (
  query: string
): Promise<GetAllArticlesOutput> => {
  try {
    if (query && query.length > 0) {
      const { data } = await axios.get(`/api/tip-results?query=${query}`);
      return data as GetAllArticlesOutput;
    } else {
      return { ok: false, error: "Missing required parameter" };
    }
  } catch (error) {
    return { ok: false, error: "Could not load tips" };
  }
};
