import { FC, useEffect, useState } from "react";
import SubHeader from "../components/layout/sub-header";
import { FetchedSpecialty } from "../dtos/specialty.dto";
import { getHomeSpecialties } from "../service/specialty.service";
import { Link } from "react-router-dom";
import StyledImage from "../components/styled-image";
import { arrayBufferToBase64 } from "../utils/bufferToBase64";
import Skeleton from "react-loading-skeleton";

interface Props {}

const Specialties: FC<Props> = (props): JSX.Element => {
  const [showHeading, setShowHeading] = useState(false);
  const [specialties, setSpecialties] = useState<FetchedSpecialty[]>([]);
  const [isLoadingSpecialties, setIsLoadingSpecialties] = useState(false);

  const fetchSpecialties = async () => {
    setIsLoadingSpecialties(true);
    const res = await getHomeSpecialties();

    if (res.specialties) {
      setSpecialties(res.specialties);
    }
    setIsLoadingSpecialties(false);
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
    fetchSpecialties();
  }, []);

  return (
    <>
      <SubHeader headingContent={showHeading ? "Khám chuyên khoa" : ""} />
      <div className="container mt-24">
        <h1 className="font-semibold text-lg mb-3">
          Danh sách chuyên khoa dành cho bạn
        </h1>

        <>
          {isLoadingSpecialties ? (
            <div className="mb-8">
              {[...Array(10).keys()].map((item, index) => (
                <Skeleton
                  count={1}
                  className="w-full h-[95px] rounded-md"
                  key={index}
                />
              ))}
            </div>
          ) : (
            <div className="mt-4 mb-8">
              {specialties.map((specialty) => (
                <Link
                  to={`/specialty/${specialty.id}`}
                  className="flex gap-4 py-4 border-b border-[#eee]"
                  key={specialty?.id}
                >
                  <StyledImage
                    wrapperClasses="w-[110px] aspect-[1.778] rounded-md overflow-hidden"
                    src={arrayBufferToBase64(specialty?.image)}
                    alt={`Chuyên khoa ${specialty?.name}`}
                  />

                  <h2>{specialty?.name}</h2>
                </Link>
              ))}
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default Specialties;
