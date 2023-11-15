import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailedSpecialty } from "../dtos/specialty.dto";
import { getSpecialty } from "../service/specialty.service";
import SubHeader from "../components/layout/sub-header";
import { arrayBufferToBase64 } from "../utils/bufferToBase64";
import parse from "html-react-parser";
import { useGetLanguage } from "../hooks/useGetLanguage";
import { IOption } from "../dtos/common.dto";
import { getDoctorsBySpecialty } from "../service/doctor.service";
import { getUniqueArr } from "../utils/getUniqueArr";
import DoctorCard from "../components/doctor-card";
import RootFooter from "../components/layout/root-footer";
import { FormattedMessage } from "react-intl";

interface Props {}

const Specialty: FC<Props> = (props): JSX.Element => {
  const currentLanguage = useGetLanguage();
  const { id } = useParams();
  const [specialty, setSpecialty] = useState<DetailedSpecialty>();
  const [doctors, setDoctors] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [showHeading, setShowHeading] = useState(false);
  const [specialtyImage, setSpecialtyImage] = useState("");
  const [specialtyDescription, setSpecialtyDescription] = useState("");
  const [hideDescription, setHideDescription] = useState(true);
  const [provinces, setProvinces] = useState<IOption[]>();
  const [selectedProvince, setSelectedProvince] = useState("ALL");

  const fetchSpecialty = async () => {
    const res = await getSpecialty(id as string);

    if (res.ok && res.specialty) {
      setSpecialty(res.specialty);
    }
  };

  const fetchDoctors = async () => {
    const res = await getDoctorsBySpecialty(id as string);
    if (res.ok && res.doctors) {
      setDoctors(res.doctors);
    }

    const provinces = res.doctors.map((doctor: any) => doctor.provinceTypeData);
    const uniqueProvinces = getUniqueArr(provinces, "keyMap");
    setProvinces(uniqueProvinces);
  };

  const refetchDoctors = async () => {
    const res = await getDoctorsBySpecialty(id as string, selectedProvince);
    if (res.ok && res.doctors) {
      setDoctors(res.doctors);
    }
  };

  const fetchData = async () => {
    Promise.all([fetchSpecialty(), fetchDoctors()]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    refetchDoctors();
  }, [selectedProvince]);

  useEffect(() => {
    if (specialty?.image) {
      setSpecialtyImage(arrayBufferToBase64(specialty?.image));
    }

    if (specialty?.description) {
      setSpecialtyDescription(specialty?.description);
    }
  }, [specialty]);

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

  if (isLoading) return <p>Loading</p>;

  return (
    <>
      <SubHeader
        headingContent={
          showHeading ? document.getElementsByTagName("h1")[0]?.innerText : ""
        }
      />

      <div
        style={{
          backgroundImage: `url('${specialtyImage}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full h-fit transition-height"
      >
        <div className="specialty-page-overlay mt-[54px] w-full h-full">
          <div
            className={`specialty-content pt-10 ${
              hideDescription ? "h-[250px]" : "h-full"
            }  overflow-hidden transition-height`}
          >
            {parse(specialtyDescription)}
          </div>

          <div className="container bg-white pb-4">
            <button
              className="text-[#288ad6] text-sm font-semibold underline"
              onClick={() => setHideDescription((prev) => !prev)}
            >
              {hideDescription ? (
                <FormattedMessage id="button.read-more" />
              ) : (
                <FormattedMessage id="button.hide" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#eeeeee] pb-10">
        <div className="container">
          <select
            name="province"
            id="province"
            className="bg-white p-2 rounded border my-4"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            <option value="ALL">
              {currentLanguage === "vi" ? "Toàn quốc" : "Nationwide"}
            </option>
            {provinces?.map((province: any, index) => (
              <option key={index} value={province.keyMap}>
                {currentLanguage === "vi" ? province.valueVi : province.valueEn}
              </option>
            ))}
          </select>

          <div className="space-y-3">
            {doctors?.map((doctor: any) => (
              <DoctorCard doctor={doctor} key={doctor?.User?.id} />
            ))}
          </div>
        </div>
      </div>
      <RootFooter />
    </>
  );
};

export default Specialty;
