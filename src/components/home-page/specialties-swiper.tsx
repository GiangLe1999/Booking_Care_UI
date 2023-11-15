import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import StyledImage from "../styled-image";
import { arrayBufferToBase64 } from "../../utils/bufferToBase64";
import { Link } from "react-router-dom";
import { FetchedSpecialty } from "../../dtos/specialty.dto";
import { getAllSpecialties } from "../../service/specialty.service";

export default function SpecialtiesSwiper() {
  const [specialties, setSpecialties] = useState<FetchedSpecialty[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchDoctors = async () => {
    setIsLoading(true);
    const res = await getAllSpecialties();

    if (res.specialties) {
      setSpecialties(res.specialties);
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
        className="specialties-swiper"
        spaceBetween={75}
        slidesPerView={3}
        slidesPerGroup={4}
        speed={800}
        loopAdditionalSlides={0}
      >
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
      </Swiper>
    </>
  );
}
