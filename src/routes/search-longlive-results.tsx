import { FC, useEffect, useState } from "react";
import RootHeader from "../components/layout/root-header";
import RootFooter from "../components/layout/root-footer";
import { useSearchParams } from "react-router-dom";
import { FetchedArticle } from "../dtos/articles.dto";
import ArticleSearch from "../components/article-search";
import ArticleCard from "../components/article-card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getLongliveResults } from "../service/longlive.service";

interface Props {}

const SearchLongliveResults: FC<Props> = (props): JSX.Element => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("tu-khoa");
  const [articles, setArticles] = useState<FetchedArticle[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchResults = async () => {
    if (query && query.length > 0) {
      setIsLoading(true);
      const data = await getLongliveResults(query);
      setArticles(data.articles);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [query]);

  return (
    <>
      <RootHeader />
      <div className="container my-10">
        <div className="flex items-center justify-between mt-10">
          <h1 className="font-semibold text-lg -mt-12">
            Tìm thấy {articles?.length || 0} bài viết Sống khỏe suốt đời cho từ
            khóa "{query}"
          </h1>

          <ArticleSearch categorySlug="song-khoe" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {isLoading ? (
            <>
              {[...Array(6).keys()].map((item, index) => (
                <Skeleton
                  count={1}
                  className="w-full aspect-[1.5] rounded-md"
                />
              ))}
            </>
          ) : (
            <>
              {articles?.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  categorySlug="song-khoe"
                />
              ))}
            </>
          )}
        </div>
      </div>
      <RootFooter />
    </>
  );
};

export default SearchLongliveResults;
