import { FC, useEffect, useState } from "react";
import { getDoctor } from "../service/doctor.service";
import { DetailedDoctor } from "../dtos/doctor.dto";
import { Link, useParams } from "react-router-dom";
import StyledImage from "../components/styled-image";
import { arrayBufferToBase64 } from "../utils/bufferToBase64";
import parse from "html-react-parser";
import DoctorSchedule from "../components/doctor-page/doctor-schedule";
import RootFooter from "../components/layout/root-footer";
import SubHeader from "../components/layout/sub-header";

import DoctorMainInfo from "../components/doctor-page/doctor-main-info";
import { path } from "../constants";
import LikeAndShare from "../components/like-and-share";
import Comments from "../components/comments";

interface Props {}

const Doctor: FC<Props> = (props): JSX.Element => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<DetailedDoctor>();
  const [isLoading, setIsLoading] = useState(false);
  const [doctorImage, setDoctorImage] = useState("");
  const [doctorDescription, setDoctorDescription] = useState("");
  const [doctorContent, setDoctorContent] = useState("");
  const [showHeading, setShowHeading] = useState(false);

  const fetchDoctor = async () => {
    setIsLoading(true);
    const res = await getDoctor(id as string);

    if (res.ok && res.doctor) {
      setDoctor(res.doctor);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  useEffect(() => {
    if (doctor?.image) {
      setDoctorImage(arrayBufferToBase64(doctor?.image));
    }

    if (doctor?.Content.description) {
      setDoctorDescription(doctor?.Content.description);
    }

    if (doctor?.Content.content) {
      setDoctorContent(doctor?.Content.content);
    }
  }, [doctor]);

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
      <div className="container mt-24">
        <div className="flex items-center gap-3">
          <StyledImage
            wrapperClasses="w-[120px] aspect-square rounded-full overflow-hidden shadow-md"
            src={doctorImage}
            alt={`Bác sĩ ${doctor?.firstName} ${doctor?.lastName}`}
          />

          <div className="doctor-description">
            {parse(doctorDescription)}
            <div className="mt-2">
              <LikeAndShare
                href={`${process.env.REACT_APP_BASE_URL}`}
                testHref={`https://test1.com.vn/${doctor?.id}`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-10 container flex gap-10">
        <div className="w-[55%]">
          <DoctorSchedule
            doctorId={doctor?.id as number}
            doctorName={`${doctor?.firstName} ${doctor?.lastName}`}
            doctorImg={doctorImage}
            doctorPosition={doctor?.positionData?.valueVi}
            doctorPrice={doctor?.Doctor_Info.priceTypeData.valueVi}
          />
        </div>

        <div className="border-l pl-4 text-[15px] pb-4 w-[40%]">
          <DoctorMainInfo
            note={doctor?.Doctor_Info.note || ""}
            clinicName={doctor?.Doctor_Info?.clinicName || ""}
            clinicAddress={doctor?.Doctor_Info?.clinicAddress || ""}
            priceTypeData={doctor?.Doctor_Info?.priceTypeData}
            paymentTypeData={doctor?.Doctor_Info?.paymentTypeData}
          />
        </div>
      </div>

      <div className="border-y bg-[#f9f9f9] pb-4">
        <div className="doctor-content">{parse(doctorContent)}</div>
      </div>

      <div className="bg-[#006e6f] py-3">
        <div className="container text-sm">
          <span className="text-white">Cần tỉm hiểm thêm?</span>
          <Link to={path.FAQ} className="ml-1 font-semibold text-yellow">
            Xem câu hỏi thường gặp.
          </Link>
        </div>
      </div>

      <div className="my-10 page-container">
        <Comments
          href={`${process.env.REACT_APP_BASE_URL}`}
          testHref={`https://test1.com.vn/${doctor?.id}`}
        />
      </div>
      <RootFooter />
    </>
  );
};

export default Doctor;
