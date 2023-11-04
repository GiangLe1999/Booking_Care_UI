import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { FetchedDoctor } from "../../dtos/doctor.dto";
import { getTopDoctors } from "../../service/doctor.service";
import StyledImage from "../styled-image";
import { arrayBufferToBase64 } from "../../utils/bufferToBase64";
import { Link } from "react-router-dom";

export default function TopDoctorsSwiper() {
  const [doctors, setDoctors] = useState<FetchedDoctor[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchDoctors = async () => {
    setIsLoading(true);
    const res = await getTopDoctors(20);

    console.log(res);

    if (res.doctors) {
      setDoctors(res.doctors);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="top-doctors-swiper"
        spaceBetween={80}
        slidesPerView={4}
        slidesPerGroup={4}
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
              <h3 className="text-center my-3 font-semibold text-lg">
                {doctor.firstName} {doctor.lastName}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
