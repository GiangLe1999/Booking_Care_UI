import { FC, useEffect, useState } from "react";
import RootHeader from "../components/layout/root-header";
import RootFooter from "../components/layout/root-footer";
import { FetchedArticle } from "../dtos/articles.dto";
import RelatedArticles from "../components/related-articles";
import CreateArticleProcess from "../components/create-article-process";
import ArticleSearch from "../components/article-search";
import { getHomeLonglives } from "../service/longlive.service";

interface Props {}

const Longlives: FC<Props> = (props): JSX.Element => {
  const [articles, setArticles] = useState<FetchedArticle[]>();
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const fetchArticles = async () => {
    setIsLoadingArticles(true);
    const res = await getHomeLonglives();

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
        <ArticleSearch categorySlug="song-khoe" />
      </div>

      <RelatedArticles
        articles={articles}
        categorySlug="song-khoe"
        isLoadingArticles={isLoadingArticles}
        customTitle="Tất cả bài viết thuộc danh mục Sống khỏe suốt đời"
      />

      <CreateArticleProcess />
      <RootFooter />
    </>
  );
};

export default Longlives;
