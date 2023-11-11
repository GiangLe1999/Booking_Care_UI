import { FC, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../form-input";
import { ImLocation, ImUser } from "react-icons/im";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoCalendar } from "react-icons/io5";
import BtnWithLoading from "../btn-with-loading";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { path } from "../../constants";
import { MdEmail } from "react-icons/md";
import { CoreOutput } from "../../dtos/common.dto";
import { bookSchedule } from "../../service/patient.service";
import { toast } from "react-toastify";

interface Props {
  price: string;
  doctorId: string;
  timeType: string;
  date: string;
  doctorName: string;
  time: string;
}

const schema: any = Yup.object({
  patientName: Yup.string().required("Vui lòng nhập thông tin"),
  email: Yup.string()
    .email("Your email is invalid")
    .required("Please enter your email"),
  phone: Yup.string().required("Vui lòng nhập thông tin"),
  dateOfBirth: Yup.string().required("Vui lòng nhập thông tin"),
  address: Yup.string().required("Vui lòng nhập thông tin"),
});

interface FormValues {
  patientName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  reason: string;
}

const ForMeForm: FC<Props> = ({
  price,
  doctorId,
  date,
  timeType,
  doctorName,
  time,
}): JSX.Element => {
  const [gender, setGender] = useState("male");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      patientName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      reason: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = async (formData: FormValues) => {
    try {
      setIsLoading(true);
      const data: CoreOutput = await bookSchedule({
        ...formData,
        date,
        timeType,
        time,
        doctorName,
        doctorId: Number(doctorId),
        gender,
      });

      console.log(data);

      setIsLoading(false);

      if (!data.ok) {
        return toast.error(data.error);
      } else {
        return toast.success("Đặt lịch thành công");
      }
    } catch (error: any) {
      setIsLoading(false);
      return toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <FormInput
          id="patientName"
          label=""
          register={register("patientName")}
          errorMsg={errors.patientName?.message}
          placeholder="Họ tên bệnh nhân (bắt buộc)"
          twoLang={false}
          inputCustomClasses="pl-12 focus:border-main_color"
        />
        <div className="absolute left-4 top-3 cursor-pointer text-[#666]">
          <ImUser size={20} />
        </div>
      </div>
      <p className="text-[#666] text-xs -mt-2">
        Hãy ghi rõ Họ Và Tên, viết hoa những chữ cái đầu tiên, ví dụ: Trần Văn
        Phú
      </p>

      <div className="flex items-center gap-8 mt-3">
        <div className="flex items-center cursor-pointer text-sm gap-1">
          <input
            type="radio"
            name="gender"
            id="male"
            checked={gender === "male"}
            onClick={() => setGender("male")}
          />
          <label htmlFor="male" className="cursor-pointer">
            Nam
          </label>
        </div>

        <div className="flex items-center cursor-pointer text-sm gap-1">
          <input
            type="radio"
            name="gender"
            id="female"
            checked={gender === "female"}
            onClick={() => setGender("female")}
          />
          <label htmlFor="female" className="cursor-pointer">
            Nữ
          </label>
        </div>
      </div>

      <div className="relative mt-4">
        <FormInput
          id="phone"
          label=""
          register={register("phone")}
          errorMsg={errors.phone?.message}
          placeholder="Số điện thoại liên hệ (bắt buộc)"
          twoLang={false}
          inputCustomClasses="pl-12 focus:border-main_color"
        />
        <div className="absolute left-[18px] top-[14px] cursor-pointer text-[#666]">
          <BsFillTelephoneFill size={17} />
        </div>
      </div>

      <div className="relative mt-4">
        <FormInput
          id="email"
          label=""
          register={register("email")}
          errorMsg={errors.email?.message}
          placeholder="Email liên hệ (bắt buộc)"
          twoLang={false}
          inputCustomClasses="pl-12 focus:border-main_color"
        />
        <div className="absolute left-4 top-[14px] cursor-pointer text-[#666]">
          <MdEmail size={20} />
        </div>
      </div>

      <div className="relative mt-4">
        <FormInput
          id="dateOfBirth"
          label=""
          register={register("dateOfBirth")}
          errorMsg={errors.dateOfBirth?.message}
          placeholder="Ngày/tháng/năm sinh (bắt buộc)"
          twoLang={false}
          inputCustomClasses="pl-12 focus:border-main_color"
        />
        <div className="absolute left-4 top-3 cursor-pointer text-[#666]">
          <IoCalendar size={20} />
        </div>
      </div>

      <div className="relative mt-4">
        <FormInput
          id="address"
          label=""
          register={register("address")}
          errorMsg={errors.address?.message}
          placeholder="Địa chỉ (bắt buộc)"
          twoLang={false}
          inputCustomClasses="pl-12 focus:border-main_color"
        />
        <div className="absolute left-4 top-3 cursor-pointer text-[#666]">
          <ImLocation size={20} />
        </div>
      </div>

      <div className="relative mt-4">
        <FormInput
          textarea
          rows={4}
          id="reason"
          register={register("reason")}
          errorMsg={errors.reason?.message}
          label=""
          placeholder="Lý do khám"
          twoLang={false}
          inputCustomClasses="pl-12 focus:border-main_color"
        />
        <div className="absolute left-4 top-3 cursor-pointer text-[#666]">
          <FaPlusCircle size={20} />
        </div>
      </div>

      <span className="text-xs font-semibold text-[#337ab7] block -mt-2">
        Hình thức thanh toán
      </span>

      <div className="flex items-center cursor-pointer text-sm gap-1 mt-2">
        <input type="radio" name="payment" id="payment" checked />
        <label htmlFor="payment" className="cursor-pointer">
          Thanh toán sau tại cơ sở y tế
        </label>
      </div>

      <div className="p-4 bg-[#f6f6f6] mt-3 text-sm rounded-sm">
        <div className="flex items-center justify-between">
          <span>Giá khám</span>
          <span>{price}</span>
        </div>
        <div className="flex items-center justify-between pt-2 pb-3 border-b">
          <span>Phí đặt lịch</span>
          <span>Miễn phí</span>
        </div>
        <div className="flex items-center justify-between pt-3">
          <span>Tổng cộng</span>
          <span className="text-red-600">{price}</span>
        </div>
      </div>

      <p className="text-center text-xs text-[#666] my-3">
        Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ
        tục khám
      </p>

      <div className="p-4 bg-[#D4EFFC] text-sm rounded-sm mb-4">
        <p className="font-semibold mb-2">LƯU Ý:</p>
        <p className="mb-2">
          Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, khi
          điền thông tin anh/chị vui lòng:
        </p>
        <ul className="list-disc ml-6">
          <li>
            Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ:{" "}
            <span className="semibold">Trần Văn Phú</span>
          </li>
          <li>
            Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn
            "Xác nhận"
          </li>
        </ul>
      </div>

      <BtnWithLoading
        content="book"
        isLoading={isLoading}
        customClasses="mt-2 w-full"
        type="submit"
      />

      <p className="text-xs text-center text-[#666] my-2">
        Bằng việc xác nhận đặt khám, bạn đã hoàn toàn đồng ý với{" "}
        <Link className="text-main_color" to={path.TERMS}>
          Điều khoản sử dụng dịch vụ
        </Link>{" "}
        của chúng tôi.
      </p>
    </form>
  );
};

export default ForMeForm;
