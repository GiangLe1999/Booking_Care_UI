import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RootHeader from "../components/layout/root-header";
import RootFooter from "../components/layout/root-footer";
import { getHandbookBySlug } from "../service/handbook.service";
import { DetailedFetchedArticle } from "../dtos/articles.dto";
import ArticleContent from "../components/article-content";

interface Props {}

const Handbook: FC<Props> = (props): JSX.Element => {
  const { slug } = useParams();
  const [article, setArticle] = useState<DetailedFetchedArticle>();

  const fetchArticle = async () => {
    const data = await getHandbookBySlug(slug || "");
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
      <ArticleContent belongsTo="Cẩm nang" article={article} />
      <RootFooter />
    </>
  );
};

export default Handbook;
