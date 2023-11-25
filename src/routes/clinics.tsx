import { FC, useEffect, useState } from "react";
import SubHeader from "../components/layout/sub-header";
import { Link } from "react-router-dom";
import { arrayBufferToBase64 } from "../utils/bufferToBase64";
import Skeleton from "react-loading-skeleton";
import { getHomeClinics } from "../service/clinic.service";
import StyledImage from "../components/styled-image";
import { FetchedClinic } from "../dtos/clinic.dto";
import RootFooter from "../components/layout/root-footer";

interface Props {}

const Clinics: FC<Props> = (props): JSX.Element => {
  const [showHeading, setShowHeading] = useState(false);
  const [clinics, setClinics] = useState<FetchedClinic[]>([]);
  const [isLoadingClinics, setIsLoadingClinics] = useState(false);

  const fetchClinics = async () => {
    setIsLoadingClinics(true);
    const res = await getHomeClinics();

    if (res.clinics) {
      setClinics(res.clinics);
    }
    setIsLoadingClinics(false);
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
    fetchClinics();
  }, []);

  return (
    <>
      <SubHeader headingContent={showHeading ? "Cơ sở y tế nổi bật" : ""} />
      <div className="container mt-24">
        <h1 className="font-semibold text-lg mb-3">
          Danh sách cơ sở y tế dành cho bạn
        </h1>

        <>
          {isLoadingClinics ? (
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
              {clinics.map((specialty) => (
                <Link
                  to={`/specialty/${specialty.id}`}
                  className="flex gap-4 py-4 border-b border-[#eee]"
                  key={specialty?.id}
                >
                  <StyledImage
                    wrapperClasses="w-[110px] aspect-[1.778] rounded-md overflow-hidden"
                    src={arrayBufferToBase64(specialty?.logo)}
                    alt={`Cơ sở y tế ${specialty?.name}`}
                  />

                  <h2>{specialty?.name}</h2>
                </Link>
              ))}
            </div>
          )}
        </>
      </div>

      <RootFooter />
    </>
  );
};

export default Clinics;
