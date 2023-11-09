import { FC, useState } from "react";
import RootHeader from "../components/layout/root-header";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import StyledImage from "../components/styled-image";
import moment from "moment";
import "moment/locale/vi";
import { formatVNDCurrency } from "../utils/formatPrice";
import { IoMdArrowRoundBack } from "react-icons/io";
import FormInput from "../components/form-input";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ImUser } from "react-icons/im";
import BtnWithLoading from "../components/btn-with-loading";
import { IoCalendar } from "react-icons/io5";
import ForMeForm from "../components/book-schedule-page/for-me-form";
import ForFamilyForm from "../components/book-schedule-page/for-family-form";

const schema = Yup.object({
  patientName: Yup.string().required("Vui lòng nhập thông tin"),
  phone: Yup.string().required("Vui lòng nhập thông tin"),
  dateOfBirth: Yup.string().required("Vui lòng nhập thông tin"),
  address: Yup.string().required("Vui lòng nhập thông tin"),
});

interface FormValues {
  patientName: string;
  phone: string;
  dateOfBirth: string;
  address: string;
}

interface Props {}

const BookSchedule: FC<Props> = (props): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const [forWho, setForWho] = useState("forMe");
  const [gender, setGender] = useState("male");
  const [patientPhone, setPatientPhone] = useState("");

  const { time, date, doctorName, doctorImg, doctorPosition, doctorPrice } =
    location.state;

  const form = useForm<FormValues>({
    defaultValues: {
      patientName: "",
      phone: "",
      dateOfBirth: "",
      address: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {};

  return (
    <>
      <RootHeader />

      <div className="bg-[#efefef] border-b shadow">
        <div className="w-[700px] mx-auto py-6">
          <div className="flex items-center gap-6">
            <StyledImage
              wrapperClasses="w-[120px] aspect-square rounded-full overflow-hidden shadow-md"
              src={doctorImg}
              alt={`doctorName`}
            />

            <div className="text-[#555]">
              <h1 className="uppercase text-sm mb-1">Đặt lịch khám</h1>
              <p className="font-semibold text-[#337ab7] mb-1">
                {doctorPosition}&nbsp;
                {doctorName}
              </p>
              <p className="text-sm capitalize">
                {time} - {moment(date).locale("vi").format("dddd - DD/MM/YYYY")}
              </p>
            </div>

            <div className="ml-auto rounded py-2 px-4 border border-main_color text-main_color font-semibold flex items-center gap-2">
              <input className="accent-[#0697a8]" type="radio" checked /> Giá
              khám: {formatVNDCurrency(doctorPrice)}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white w-[700px] mx-auto my-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-main_color text-sm underline mb-6"
        >
          <IoMdArrowRoundBack />
          Quay lại trang chọn lịch
        </button>

        {/* For Who */}
        <div className="flex items-center gap-8 mb-3">
          <div className="flex items-center cursor-pointer text-sm gap-1">
            <input
              type="radio"
              name="forWho"
              id="forMe"
              checked={forWho === "forMe"}
              onClick={() => setForWho("forMe")}
            />
            <label htmlFor="forMe" className="cursor-pointer">
              Đặt cho mình
            </label>
          </div>

          <div className="flex items-center cursor-pointer text-sm gap-1">
            <input
              type="radio"
              name="forWho"
              id="forFamily"
              checked={forWho === "forFamily"}
              onClick={() => setForWho("forFamily")}
            />
            <label htmlFor="forFamily" className="cursor-pointer">
              Đặt cho người thân
            </label>
          </div>
        </div>

        {forWho === "forMe" ? (
          <ForMeForm price={formatVNDCurrency(doctorPrice)} />
        ) : (
          <ForFamilyForm price={formatVNDCurrency(doctorPrice)} />
        )}
      </div>

      <footer className="bg-[#efefef] text-sm">
        <div className="container py-12 flex items-center justify-between">
          <span> © 2023 BookingCare - All rights reserved.</span>
          <a
            href="tel:02473012468"
            className="text-main_color flex items-center gap-1 font-semibold"
          >
            <BsFillTelephoneFill />
            HỖ TRỢ: 024-7301-2468
          </a>
        </div>
      </footer>
    </>
  );
};

export default BookSchedule;
