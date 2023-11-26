import { FC, useEffect, useState } from "react";
import RootHeader from "../components/layout/root-header";
import RootFooter from "../components/layout/root-footer";
import { FetchedArticle } from "../dtos/articles.dto";
import { getHomeHandbooks } from "../service/handbook.service";
import RelatedArticles from "../components/related-articles";
import CreateArticleProcess from "../components/create-article-process";
import ArticleSearch from "../components/article-search";

interface Props {}

const Handbooks: FC<Props> = (props): JSX.Element => {
  const [articles, setArticles] = useState<FetchedArticle[]>();
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const fetchArticles = async () => {
    setIsLoadingArticles(true);
    const res = await getHomeHandbooks();

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
        <ArticleSearch categorySlug="cam-nang" />
      </div>

      <RelatedArticles
        articles={articles}
        categorySlug="cam-nang"
        isLoadingArticles={isLoadingArticles}
        customTitle="Tất cả bài viết thuộc danh mục Cẩm nang"
      />

      <CreateArticleProcess />
      <RootFooter />
    </>
  );
};

export default Handbooks;
