import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import StyledImage from "../styled-image";
import { arrayBufferToBase64 } from "../../utils/bufferToBase64";
import { Link } from "react-router-dom";
import { getAllClinics } from "../../service/clinic.service";
import { FetchedClinic } from "../../dtos/clinic.dto";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

interface Props {
  clinics: FetchedClinic[];
  isLoadingClinics: boolean;
}

export default function ClinicsSwiper({ clinics, isLoadingClinics }: Props) {
  return (
    <div className="relative">
      {isLoadingClinics ? (
        <div className="grid grid-cols-3 gap-4 w-full h-[200px]">
          {[...Array(3).keys()].map((item, index) => (
            <SwiperSlide key={index}>
              <Skeleton count={1} className="w-full aspect-[1.5] rounded-md" />
            </SwiperSlide>
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Navigation]}
          className="clinics-swiper"
          spaceBetween={15}
          slidesPerView={3}
          slidesPerGroup={3}
          speed={800}
          loop={true}
          navigation={{
            nextEl: ".clinics-swiper-button-next",
            prevEl: ".clinics-swiper-button-prev",
          }}
        >
          {clinics.map((clinic) => (
            <SwiperSlide key={clinic.id}>
              {isLoadingClinics ? (
                <Skeleton
                  count={1}
                  className="w-full aspect-[1.5] rounded-md"
                />
              ) : (
                <div className="border rounded-md">
                  <Link
                    to={`/clinic/${clinic.id}`}
                    className="block w-[90%] mx-auto"
                  >
                    <StyledImage
                      wrapperClasses="w-full aspect-[1.5] rounded-t-md overflow-hidden"
                      src={arrayBufferToBase64(clinic.logo)}
                      alt={`Cơ sở y tế ${clinic.name}`}
                      imageClasses="!object-contain"
                    />
                  </Link>
                  <Link
                    to={`/clinic/${clinic.id}`}
                    className="block w-[90%] mx-auto"
                  >
                    <h3 className="text-center my-3 font-semibold text-lg line-clamp-1">
                      {clinic.name}
                    </h3>
                  </Link>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <i className="icon-arrow-long-right clinics-swiper-button-next">
        <GoChevronRight className="text-[#34929e]" size={30} />
      </i>
      <i className="icon-arrow-long-left clinics-swiper-button-prev">
        <GoChevronLeft className="text-[#34929e]" size={30} />
      </i>
    </div>
  );
}
