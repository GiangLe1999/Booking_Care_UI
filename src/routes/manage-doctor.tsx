import { FC, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import SmallTextEditor from "../components/small-text-editor";
import TextEditor from "../components/text-editor";

import Select from "react-select";
import BtnWithLoading from "../components/btn-with-loading";
import {
  editDoctorInfo,
  getDoctor,
  saveDoctorInfo,
} from "../service/doctor.service";
import { DetailedDoctor } from "../dtos/doctor.dto";
import { toast } from "react-toastify";
import AdminProtectedPage from "../containers/admin-protected-page";
import { formatDoctorsDataForSelect } from "../utils/formatDoctorsDataForSelect";
import FormInput from "../components/form-input";
import { getCodesByType } from "../service/allcodes.service";
import { useGetLanguage } from "../hooks/useGetLanguage";

const defaultOption = {
  value: "",
  label: "",
};

interface IOption {
  label: string;
  value: string;
}

interface Props {}

const ManageDoctor: FC<Props> = (props): JSX.Element => {
  const currentLanguage = useGetLanguage();

  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState<IOption[]>([]);
  const [prices, setPrices] = useState<IOption[]>([]);
  const [payments, setPayments] = useState<IOption[]>([]);
  const [provinces, setProvinces] = useState<IOption[]>([]);

  const [selectedDoctor, setSelectedDoctor] = useState(defaultOption);
  const [currentDoctor, setCurrentDoctor] = useState<DetailedDoctor>();
  const [isLoadingCurrentDoctor, setIsLoadingCurrentDoctor] = useState(false);

  const [selectedPrice, setSelectedPrice] = useState(defaultOption);

  const [selectedProvince, setSelectedProvince] = useState(defaultOption);

  const [selectedPayment, setSelectedPayment] = useState(defaultOption);

  console.log(selectedPrice, selectedPayment, selectedProvince);

  const [clinicName, setClinicName] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [note, setNote] = useState("");

  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const submitHandler = async () => {
    if (!selectedDoctor.value) {
      toast.error("Vui lòng chọn 1 bác sĩ");
      return;
    }

    if (
      !content ||
      !selectedPrice.value ||
      !selectedPayment.value ||
      !clinicName
    ) {
      return toast.error("Vui lòng nhập đầy đủ thông tin cần thiết");
    }

    setIsLoading(true);

    if (!currentDoctor?.Content.content) {
      const res = await saveDoctorInfo({
        doctorId: Number(selectedDoctor.value),
        content,
        description,
        priceId: selectedPrice.value,
        provinceId: selectedProvince.value,
        paymentId: selectedPayment.value,
        clinicAddress,
        clinicName,
        note,
      });

      if (res.ok) {
        toast.success("Tạo mới thông tin bác sĩ thành công");
        setContent("");
        setDescription("");
        await fetchCurrentDoctor();
      }

      if (res.error) {
        toast.error(res.error);
      }
    } else {
      const res = await editDoctorInfo({
        doctorId: Number(selectedDoctor.value),
        content,
        description,
        priceId: selectedPrice.value,
        provinceId: selectedProvince.value,
        paymentId: selectedPayment.value,
        clinicAddress,
        clinicName,
        note,
      });

      if (res.ok) {
        toast.success("Sửa thông tin bác sĩ thành công");
        setContent("");
        setDescription("");
        await fetchCurrentDoctor();
      }

      if (res.error) {
        toast.error(res.error);
      }
    }

    setIsLoading(false);
  };

  const fetchDoctors = async () => {
    const formattedDoctors = await formatDoctorsDataForSelect();

    setDoctors(formattedDoctors as { label: string; value: string }[]);
  };

  const fetchData = async () => {
    const promise1 = getCodesByType("PRICE");
    const promise2 = getCodesByType("PAYMENT");
    const promise3 = getCodesByType("PROVINCE");
    const promise4 = fetchDoctors();
    Promise.all([promise1, promise2, promise3, promise4]).then((values) => {
      const formattedPrices = values[0]?.codes?.map((code) => ({
        label: currentLanguage === "vi" ? code.valueVi : code.valueEn,
        value: code.keyMap,
      }));

      const formattedPayments = values[1]?.codes?.map((code) => ({
        label: currentLanguage === "vi" ? code.valueVi : code.valueEn,
        value: code.keyMap,
      }));

      const formattedProvinces = values[2]?.codes?.map((code) => ({
        label: currentLanguage === "vi" ? code.valueVi : code.valueEn,
        value: code.keyMap,
      }));

      setPrices(formattedPrices || []);
      setPayments(formattedPayments || []);
      setProvinces(formattedProvinces || []);
    });
  };

  useEffect(() => {
    fetchData();
  }, [currentLanguage]);

  const fetchCurrentDoctor = async () => {
    setIsLoadingCurrentDoctor(true);
    const res = await getDoctor(selectedDoctor.value);
    if (res.doctor?.Content.content) {
      setContent(res.doctor?.Content.content);
    } else {
      setContent("");
    }
    if (res.doctor?.Content.description) {
      setDescription(res.doctor?.Content.description);
    } else {
      setDescription("");
    }
    setCurrentDoctor(res.doctor);
    setSelectedPrice({
      label:
        currentLanguage === "vi"
          ? (res.doctor?.Doctor_Info.priceTypeData.valueVi as string)
          : (res.doctor?.Doctor_Info.priceTypeData.valueEn as string),
      value: res.doctor?.Doctor_Info.priceId as string,
    });

    setSelectedPayment({
      label:
        currentLanguage === "vi"
          ? (res.doctor?.Doctor_Info.paymentTypeData.valueVi as string)
          : (res.doctor?.Doctor_Info.paymentTypeData.valueEn as string),
      value: res.doctor?.Doctor_Info.paymentId as string,
    });

    setSelectedProvince({
      label:
        currentLanguage === "vi"
          ? (res.doctor?.Doctor_Info.provinceTypeData?.valueVi as string)
          : (res.doctor?.Doctor_Info.provinceTypeData?.valueEn as string),
      value: res.doctor?.Doctor_Info.provinceId as string,
    });

    setClinicName(res.doctor?.Doctor_Info.clinicName || "");
    setClinicAddress(res.doctor?.Doctor_Info.clinicAddress || "");
    setNote(res.doctor?.Doctor_Info.note || "");

    setIsLoadingCurrentDoctor(false);
  };

  useEffect(() => {
    fetchCurrentDoctor();
  }, [selectedDoctor.value]);

  return (
    <AdminProtectedPage>
      <div className="admin-page-container">
        <h1 className="admin-page-title">
          <FormattedMessage id="adminheader.admin.manage-doctor" />
        </h1>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div>
            <div className="grid grid-cols-2 gap-3 gap-y-6 ">
              {/* Doctor */}
              <div>
                <label className="form-input-label mb-2 block">
                  <FormattedMessage id="manage-doctor.choose-doctor" />
                </label>
                <Select
                  options={doctors}
                  className="!outline-none"
                  onChange={setSelectedDoctor as any}
                  defaultValue={selectedDoctor}
                  isDisabled={isLoadingCurrentDoctor}
                />
              </div>

              {/* Price */}
              <div>
                <label className="form-input-label mb-2 block">
                  <FormattedMessage id="manage-doctor.choose-price" />
                </label>
                <Select
                  options={prices}
                  className="!outline-none"
                  onChange={setSelectedPrice as any}
                  defaultValue={selectedPrice}
                  value={selectedPrice}
                />
              </div>

              {/* Payment method */}
              <div>
                <label className="form-input-label mb-2 block">
                  <FormattedMessage id="manage-doctor.choose-payment" />
                </label>
                <Select
                  options={payments}
                  className="!outline-none"
                  onChange={setSelectedPayment as any}
                  defaultValue={selectedPayment}
                  value={selectedPayment}
                />
              </div>

              {/* Province */}
              <div>
                <label className="form-input-label mb-2 block">
                  <FormattedMessage id="manage-doctor.choose-province" />
                </label>
                <Select
                  options={provinces}
                  className="!outline-none"
                  onChange={setSelectedProvince as any}
                  defaultValue={selectedProvince}
                  value={selectedProvince}
                />
              </div>
            </div>

            <div className="mt-6">
              <FormInput
                id="clinicName"
                label="manage-doctor.choose-clinic"
                twoLang={true}
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                inputCustomClasses="bg-transparent border-[#cccccc] rounded !py-[7px]"
              />
            </div>

            <div className="mt-6">
              <FormInput
                id="clinicAddress"
                label="manage-doctor.choose-clinic-address"
                twoLang={true}
                value={clinicAddress}
                onChange={(e) => setClinicAddress(e.target.value)}
                inputCustomClasses="bg-transparent border-[#cccccc] rounded !py-[7px]"
              />
            </div>

            <div className="mt-6">
              <FormInput
                textarea
                rows={4}
                id="note"
                label="manage-doctor.note"
                twoLang={true}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                inputCustomClasses="bg-transparent border-[#cccccc] rounded !py-[7px]"
              />
            </div>
          </div>

          <div className="text-editor">
            <label className="form-input-label mb-2 block">
              <FormattedMessage id="manage-doctor.introduction" />
            </label>
            <SmallTextEditor setContent={setDescription} value={description} />
          </div>
        </div>

        <div className="text-large-editor">
          <label className="form-input-label mb-2 block">
            <FormattedMessage id="manage-doctor.detail" />
          </label>
          <TextEditor setContent={setContent} value={content} />
        </div>

        <div className="text-right mt-6">
          <BtnWithLoading
            content="confirm"
            isLoading={isLoading}
            customClasses="admin-btn"
            onClick={submitHandler}
            disabled={isLoading}
          />
        </div>
      </div>
    </AdminProtectedPage>
  );
};

export default ManageDoctor;
