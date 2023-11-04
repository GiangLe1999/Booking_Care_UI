import { FC, useEffect, useState } from "react";
import { getDoctor } from "../service/doctor.service";
import { DetailedDoctor } from "../dtos/doctor.dto";
import { useParams } from "react-router-dom";
import SubLayout from "../containers/sub-layout";
import StyledImage from "../components/styled-image";
import { arrayBufferToBase64 } from "../utils/bufferToBase64";
import Skeleton from "react-loading-skeleton";
import parse from "html-react-parser";

interface Props {}

const Doctor: FC<Props> = (props): JSX.Element => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<DetailedDoctor>();
  const [isLoading, setIsLoading] = useState(false);
  const [doctorImage, setDoctorImage] = useState("");
  const [doctorDescription, setDoctorDescription] = useState("");
  const [doctorContent, setDoctorContent] = useState("");

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

  if (isLoading) return <p>Loading</p>;

  return (
    <SubLayout>
      <div className="container mt-24">
        <div className="flex items-center gap-3">
          <StyledImage
            wrapperClasses="w-[120px] aspect-square rounded-full overflow-hidden shadow-md"
            src={doctorImage}
            alt={`Bác sĩ ${doctor?.firstName} ${doctor?.lastName}`}
          />

          <div className="doctor-description">{parse(doctorDescription)}</div>
        </div>
      </div>

      <div className="border-y bg-[#f9f9f9] pb-4">
        <div className="doctor-content">{parse(doctorContent)}</div>
      </div>
    </SubLayout>
  );
};

export default Doctor;
