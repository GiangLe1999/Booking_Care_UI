import { FC, useEffect, useState } from "react";
import SubHeader from "../components/layout/sub-header";
import { Link } from "react-router-dom";
import StyledImage from "../components/styled-image";
import { arrayBufferToBase64 } from "../utils/bufferToBase64";
import Skeleton from "react-loading-skeleton";
import { getTopDoctors } from "../service/doctor.service";
import { FetchedDoctor } from "../dtos/doctor.dto";

interface Props {}

const Doctors: FC<Props> = (props): JSX.Element => {
  const [showHeading, setShowHeading] = useState(false);
  const [doctors, setDoctors] = useState<FetchedDoctor[]>([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);

  const fetchDoctors = async () => {
    setIsLoadingDoctors(true);
    const res = await getTopDoctors(20);

    if (res.doctors) {
      setDoctors(res.doctors);
    }

    setIsLoadingDoctors(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      if (position > 80) {
        setShowHeading(true);
      } else {
        setShowHeading(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <>
      <SubHeader
        headingContent={showHeading ? "Danh sách bác sĩ nổi bật" : ""}
      />
      <div className="container mt-24">
        <h1 className="font-semibold text-lg mb-3">Danh sách bác sĩ nổi bật</h1>

        <>
          {isLoadingDoctors ? (
            <div className="mb-8">
              {[...Array(10).keys()].map((item, index) => (
                <Skeleton
                  count={1}
                  className="w-full h-[120px] rounded-md"
                  key={index}
                />
              ))}
            </div>
          ) : (
            <div className="mt-4 mb-8">
              {doctors.map((doctor) => (
                <Link
                  to={`/doctor/${doctor.id}`}
                  className="flex gap-4 py-4 border-b border-[#eee]"
                  key={doctor?.id}
                >
                  <StyledImage
                    wrapperClasses="w-[110px] aspect-square rounded-md overflow-hidden"
                    src={arrayBufferToBase64(doctor?.image)}
                    alt={`Chuyên khoa ${doctor?.firstName} ${doctor?.lastName}`}
                  />

                  <h2>
                    Bác sĩ {doctor?.firstName} {doctor?.lastName}
                  </h2>
                </Link>
              ))}
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default Doctors;
