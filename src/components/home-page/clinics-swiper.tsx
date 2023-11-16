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

export default function ClinicsSwiper() {
  const [clinics, setClinics] = useState<FetchedClinic[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchClinics = async () => {
    setIsLoading(true);
    const res = await getAllClinics();

    if (res.clinics) {
      setClinics(res.clinics);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="specialties-swiper"
        spaceBetween={15}
        slidesPerView={3}
        slidesPerGroup={4}
        speed={800}
        loopAdditionalSlides={0}
      >
        {clinics.map((clinic) => (
          <SwiperSlide key={clinic.id}>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}