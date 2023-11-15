import { FC } from "react";
import StyledImage from "./styled-image";
import { arrayBufferToBase64 } from "../utils/bufferToBase64";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { useGetLanguage } from "../hooks/useGetLanguage";
import DoctorSchedule from "./doctor-page/doctor-schedule";
import DoctorMainInfo from "./doctor-page/doctor-main-info";

interface Props {
  doctor: any;
}

const DoctorCard: FC<Props> = ({ doctor }): JSX.Element => {
  const currentLanguage = useGetLanguage();

  return (
    <div className="custom-shadow rounded-md grid grid-cols-2 gap-6 bg-white">
      <div className="flex gap-4 p-4">
        <div className="">
          <StyledImage
            wrapperClasses="w-[80px] h-[80px] rounded-full overflow-hidden shadow-md"
            src={doctor.User.image && arrayBufferToBase64(doctor.User.image)}
            alt={`Bác sĩ ${doctor?.firstName} ${doctor?.lastName}`}
          />
          <Link
            to={`/user/${doctor.User.id}`}
            className="text-sm text-main_color mt-3 block text-center"
          >
            Xem thêm
          </Link>
        </div>

        <Link
          to={`/user/${doctor.User.id}`}
          className="flex-1 text-[#555555] text-sm leading-6 specialty-doctor-description"
        >
          {parse(doctor.User.Content.description || "")}
          <p className="flex items-center gap-1 mt-3">
            <MdLocationOn />{" "}
            {currentLanguage === "vi"
              ? doctor.provinceTypeData?.valueVi
              : doctor.provinceTypeData?.valueEn}
          </p>
        </Link>
      </div>

      <div className="p-4">
        <DoctorSchedule
          doctorId={doctor?.id as number}
          doctorName={`${doctor?.User?.firstName} ${doctor?.User?.lastName}`}
          doctorImg={
            doctor.User.image && arrayBufferToBase64(doctor.User.image)
          }
          doctorPosition={doctor?.User?.positionData?.valueVi}
          doctorPrice={doctor?.priceTypeData.valueVi}
        />

        <div className="mt-3 pt-3 border-t">
          <DoctorMainInfo
            note={doctor?.note || ""}
            clinicName={doctor?.clinicName || ""}
            clinicAddress={doctor?.clinicAddress || ""}
            priceTypeData={doctor?.priceTypeData}
            paymentTypeData={doctor?.paymentTypeData}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
