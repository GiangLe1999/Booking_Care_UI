import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import StyledImage from "../styled-image";
import { arrayBufferToBase64 } from "../../utils/bufferToBase64";
import { Link } from "react-router-dom";
import { FetchedSpecialty } from "../../dtos/specialty.dto";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

interface Props {
  specialties: FetchedSpecialty[];
  isLoadingSpecialties: boolean;
}

export default function SpecialtiesSwiper({
  specialties,
  isLoadingSpecialties,
}: Props) {
  return (
    <>
      <div className="relative">
        {isLoadingSpecialties ? (
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
            className="specialties-swiper"
            spaceBetween={15}
            slidesPerView={3}
            slidesPerGroup={4}
            speed={800}
            loop={true}
            loopAdditionalSlides={0}
            navigation={{
              nextEl: ".specialties-swiper-button-next",
              prevEl: ".specialties-swiper-button-prev",
            }}
          >
            <>
              {specialties.map((specialty) => (
                <SwiperSlide key={specialty.id}>
                  <div className="border rounded-md">
                    <Link to={`/specialty/${specialty.id}`} className="block">
                      <StyledImage
                        wrapperClasses="w-full aspect-[1.778] rounded-t-md overflow-hidden"
                        src={arrayBufferToBase64(specialty.image)}
                        alt={`Chuyên khoa ${specialty.name}`}
                      />
                    </Link>
                    <Link to={`/specialty/${specialty.id}`} className="block">
                      <h3 className="text-center my-3 font-semibold text-lg">
                        {specialty.name}
                      </h3>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </>
          </Swiper>
        )}

        <i className="icon-arrow-long-right specialties-swiper-button-next">
          <GoChevronRight className="text-[#34929e]" size={30} />
        </i>
        <i className="icon-arrow-long-left specialties-swiper-button-prev">
          <GoChevronLeft className="text-[#34929e]" size={30} />
        </i>
      </div>
    </>
  );
}
