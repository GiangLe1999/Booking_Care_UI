import { FC } from "react";
import { FetchedArticle } from "../dtos/articles.dto";
import { SwiperSlide, Swiper } from "swiper/react";
import Skeleton from "react-loading-skeleton";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import "react-loading-skeleton/dist/skeleton.css";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import ArticleCard from "./article-card";

interface Props {
  articles: FetchedArticle[] | undefined;
  isLoadingArticles: boolean;
  categorySlug: string;
  reloadDocument?: boolean;
  customTitle?: string;
}

const RelatedArticles: FC<Props> = ({
  articles,
  isLoadingArticles,
  categorySlug,
  reloadDocument,
  customTitle,
}): JSX.Element => {
  return (
    <div className="container mb-10">
      <h3 className="font-semibold mt-10 mb-3 text-2xl">
        {customTitle ? customTitle : "Bài viết liên quan"}{" "}
      </h3>
      <div className="relative">
        {isLoadingArticles ? (
          <div className="grid grid-cols-3 gap-4 w-full h-[200px]">
            {[...Array(3).keys()].map((item, index) => (
              <SwiperSlide key={index}>
                <Skeleton
                  count={1}
                  className="w-full aspect-[1.5] rounded-md"
                />
              </SwiperSlide>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            className="clinics-swiper"
            spaceBetween={20}
            slidesPerView={3}
            slidesPerGroup={3}
            speed={800}
            loop={true}
            navigation={{
              nextEl: ".clinics-swiper-button-next",
              prevEl: ".clinics-swiper-button-prev",
            }}
          >
            {articles?.map((article) => (
              <SwiperSlide key={article.id}>
                <ArticleCard
                  article={article}
                  categorySlug={categorySlug}
                  reloadDocument={reloadDocument}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <i className="icon-arrow-long-right clinics-swiper-button-next -mt-8">
          <GoChevronRight className="text-[#34929e]" size={30} />
        </i>
        <i className="icon-arrow-long-left clinics-swiper-button-prev -mt-8">
          <GoChevronLeft className="text-[#34929e]" size={30} />
        </i>
      </div>
    </div>
  );
};

export default RelatedArticles;
