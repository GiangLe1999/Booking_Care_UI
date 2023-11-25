import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import StyledImage from "../styled-image";
import { arrayBufferToBase64 } from "../../utils/bufferToBase64";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FetchedArticle } from "../../dtos/articles.dto";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

interface Props {
  longlives: FetchedArticle[] | undefined;
  isLoadingLonglives: boolean;
}

export default function LonglivesSwiper({
  longlives,
  isLoadingLonglives,
}: Props) {
  return (
    <div className="relative">
      {isLoadingLonglives ? (
        <div className="grid grid-cols-3 gap-4 w-full h-[200px]">
          {[...Array(3).keys()].map((item, index) => (
            <SwiperSlide key={index}>
              <Skeleton count={1} className="w-full aspect-[1.8] rounded-md" />
            </SwiperSlide>
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Navigation]}
          className="clinics-swiper"
          spaceBetween={35}
          slidesPerView={3}
          slidesPerGroup={3}
          speed={800}
          loop={true}
          navigation={{
            nextEl: ".clinics-swiper-button-next",
            prevEl: ".clinics-swiper-button-prev",
          }}
        >
          {longlives?.map((longlive) => (
            <SwiperSlide key={longlive.id}>
              <div>
                <Link to={`/song-khoe/${longlive?.slug}`} className="block">
                  <StyledImage
                    wrapperClasses="w-full aspect-[1.9] rounded-md border"
                    src={arrayBufferToBase64(longlive?.thumbnail)}
                    alt={`Bài viết ${longlive?.title}`}
                    imageClasses="rounded-md"
                  />
                </Link>
                <Link to={`/song-khoe/${longlive?.id}`} className="block">
                  <h3 className="my-3 font-semibold leading-7 line-clamp-2">
                    {longlive?.title}
                  </h3>
                </Link>
              </div>
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
  );
}