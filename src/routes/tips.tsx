import { FC, useEffect, useState } from "react";
import RootHeader from "../components/layout/root-header";
import RootFooter from "../components/layout/root-footer";
import { FetchedArticle } from "../dtos/articles.dto";
import RelatedArticles from "../components/related-articles";
import CreateArticleProcess from "../components/create-article-process";
import ArticleSearch from "../components/article-search";
import { getHomeTips } from "../service/tips.service";

interface Props {}

const Tips: FC<Props> = (props): JSX.Element => {
  const [articles, setArticles] = useState<FetchedArticle[]>();
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const fetchArticles = async () => {
    setIsLoadingArticles(true);
    const res = await getHomeTips();

    if (res.articles) {
      setArticles(res.articles);
    }
    setIsLoadingArticles(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <>
      <RootHeader />

      <div className="container my-10">
        <ArticleSearch categorySlug="danh-cho-bac-si" />
      </div>

      <RelatedArticles
        articles={articles}
        categorySlug="danh-cho-bac-si"
        isLoadingArticles={isLoadingArticles}
        customTitle="Tất cả bài viết thuộc danh mục Dành cho bác sĩ & cơ sở y tế"
      />

      <CreateArticleProcess />
      <RootFooter />
    </>
  );
};

export default Tips;
