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
