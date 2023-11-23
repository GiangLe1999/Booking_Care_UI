import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { FetchedDoctor } from "../../dtos/doctor.dto";
import StyledImage from "../styled-image";
import { arrayBufferToBase64 } from "../../utils/bufferToBase64";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

interface Props {
  doctors: FetchedDoctor[];
  isLoadingDoctors: boolean;
}

export default function TopDoctorsSwiper({ doctors, isLoadingDoctors }: Props) {
  return (
    <>
      <div className="relative">
        {isLoadingDoctors ? (
          <div className="grid grid-cols-4 gap-4 w-full h-[200px]">
            {[...Array(4).keys()].map((item, index) => (
              <SwiperSlide key={index}>
                <Skeleton count={1} className="w-full h-full rounded-full" />
              </SwiperSlide>
            ))}
          </div>
        ) : (
          <Swiper
            navigation={{
              nextEl: ".specialties-swiper-button-next",
              prevEl: ".specialties-swiper-button-prev",
            }}
            modules={[Navigation]}
            className="top-doctors-swiper"
            spaceBetween={60}
            slidesPerView={4}
            slidesPerGroup={4}
            loop={true}
            speed={800}
          >
            {doctors.map((doctor) => (
              <SwiperSlide key={doctor.id}>
                <Link to={`/user/${doctor.id}`} className="block">
                  <StyledImage
                    wrapperClasses="w-full aspect-square rounded-full overflow-hidden"
                    src={arrayBufferToBase64(doctor.image)}
                    alt={`Bác sĩ ${doctor.lastName}`}
                  />
                </Link>
                <div className="">
                  <h3 className="text-center my-3 font-semibold text-lg line-clamp-2">
                    {doctor.firstName} {doctor.lastName}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
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
