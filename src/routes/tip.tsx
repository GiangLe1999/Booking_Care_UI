import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RootHeader from "../components/layout/root-header";
import RootFooter from "../components/layout/root-footer";
import { DetailedFetchedArticle } from "../dtos/articles.dto";
import ArticleContent from "../components/article-content";
import { getTipBySlug } from "../service/tips.service";

interface Props {}

const Tip: FC<Props> = (props): JSX.Element => {
  const { slug } = useParams();
  const [article, setArticle] = useState<DetailedFetchedArticle>();

  const fetchArticle = async () => {
    const data = await getTipBySlug(slug || "");
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
      <ArticleContent belongsTo="Dành cho bác sĩ" article={article} />
      <RootFooter />
    </>
  );
};

export default Tip;
