import { CoreOutput } from "./common.dto";

export interface CreateNewArticleInput {
  title: string;
  thumbnail: string;
  slug: string;
  description: string;
  content: string;
  authorId: number;
}

export interface FetchedArticle {
  id: number;
  title: string;
  description: string;
  slug: string;
  Author: any;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export interface DetailedFetchedArticle {
  id: number;
  title: string;
  description: string;
  slug: string;
  User: any;
  content: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllArticlesOutput extends CoreOutput {
  articles?: FetchedArticle[];
}

export interface GetArticleBySlugOutput extends CoreOutput {
  article?: DetailedFetchedArticle;
}
