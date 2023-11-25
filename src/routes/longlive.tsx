import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RootHeader from "../components/layout/root-header";
import RootFooter from "../components/layout/root-footer";
import { DetailedFetchedArticle } from "../dtos/articles.dto";
import ArticleContent from "../components/article-content";
import { getLongliveBySlug } from "../service/longlive.service";

interface Props {}

const Longlive: FC<Props> = (props): JSX.Element => {
  const { slug } = useParams();
  const [article, setArticle] = useState<DetailedFetchedArticle>();

  const fetchArticle = async () => {
    const data = await getLongliveBySlug(slug || "");
    setArticle(data.article);
  };

  console.log(article);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, []);

  return (
    <>
      <RootHeader />
      <ArticleContent belongsTo="Sống khỏe" article={article} />
      <RootFooter />
    </>
  );
};

export default Longlive;
