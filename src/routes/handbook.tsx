import { FC, useEffect, useState } from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import RootHeader from "../components/layout/root-header";
import RootFooter from "../components/layout/root-footer";
import {
  getHandbookBySlug,
  getHomeHandbooks,
} from "../service/handbook.service";
import { DetailedFetchedArticle, FetchedArticle } from "../dtos/articles.dto";
import ArticleContent from "../components/article-content";
import RelatedArticles from "../components/related-articles";

interface Props {}

const Handbook: FC<Props> = (props): JSX.Element => {
  const { slug } = useParams();
  const [article, setArticle] = useState<DetailedFetchedArticle>();
  const [relatedArticles, setRelatedArticles] = useState<FetchedArticle[]>();
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);

  const fetchArticle = async () => {
    const data = await getHandbookBySlug(slug || "");
    setArticle(data.article);
  };

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, []);

  const fetchRelatedArticles = async () => {
    setIsLoadingArticles(true);
    const res = await getHomeHandbooks();

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
      <ArticleContent belongsTo="Cẩm nang" article={article} />
      <RelatedArticles
        articles={relatedArticles}
        isLoadingArticles={isLoadingArticles}
        categorySlug="cam-nang"
      />
      <RootFooter />
    </>
  );
};

export default Handbook;
