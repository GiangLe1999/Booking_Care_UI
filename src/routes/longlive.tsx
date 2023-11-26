import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RootHeader from "../components/layout/root-header";
import RootFooter from "../components/layout/root-footer";
import { DetailedFetchedArticle, FetchedArticle } from "../dtos/articles.dto";
import ArticleContent from "../components/article-content";
import {
  getHomeLonglives,
  getLongliveBySlug,
} from "../service/longlive.service";
import RelatedArticles from "../components/related-articles";

interface Props {}

const Longlive: FC<Props> = (props): JSX.Element => {
  const { slug } = useParams();
  const [article, setArticle] = useState<DetailedFetchedArticle>();
  const [relatedArticles, setRelatedArticles] = useState<FetchedArticle[]>();
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);

  const fetchArticle = async () => {
    const data = await getLongliveBySlug(slug || "");
    setArticle(data.article);
  };

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, []);

  const fetchRelatedArticles = async () => {
    setIsLoadingArticles(true);
    const res = await getHomeLonglives();

    if (res.articles) {
      const relatedArticles = res.articles.filter(
        (article) => article.slug !== slug
      );

      setIsLoadingArticles(false);
      setRelatedArticles(relatedArticles);
    }
  };

  useEffect(() => {
    fetchRelatedArticles();
  }, []);

  return (
    <>
      <RootHeader />
      <ArticleContent belongsTo="Sống khỏe" article={article} />
      <RelatedArticles
        articles={relatedArticles}
        isLoadingArticles={isLoadingArticles}
        categorySlug="song-khoe"
      />
      <RootFooter />
    </>
  );
};

export default Longlive;
