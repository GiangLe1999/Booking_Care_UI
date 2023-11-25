import axios from "../axios";
import {
  CreateNewArticleInput,
  GetAllArticlesOutput,
  GetArticleBySlugOutput,
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

export const getLongliveBySlug = async (
  slug: string
): Promise<GetArticleBySlugOutput> => {
  try {
    const { data } = await axios.get(`/api/longlive?slug=${slug}`);
    return data as GetArticleBySlugOutput;
  } catch (error) {
    return { ok: false, error: "Could not load longlive" };
  }
};
