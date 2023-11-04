import { FC, useEffect, useState } from "react";
import ProtectedPage from "../containers/protected-page";
import { FormattedMessage } from "react-intl";
import SmallTextEditor from "../components/small-text-editor";
import TextEditor from "../components/text-editor";

import Select from "react-select";
import BtnWithLoading from "../components/btn-with-loading";
import {
  editDoctorInfo,
  getAllDoctors,
  getDoctor,
  saveDoctorInfo,
} from "../service/doctor.service";
import { DetailedDoctor } from "../dtos/doctor.dto";
import { toast } from "react-toastify";

interface Props {}

const ManageDoctor: FC<Props> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState<{ label: string; value: string }[]>(
    []
  );
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });

  const [currentDoctor, setCurrentDoctor] = useState<DetailedDoctor>();
  const [isLoadingCurrentDoctor, setIsLoadingCurrentDoctor] = useState(false);

  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const submitHandler = async () => {
    if (!selectedOption.value) {
      toast.error("Vui lòng chọn 1 bác sĩ");
      return;
    }

    setIsLoading(true);

    if (!currentDoctor?.Content.content) {
      const res = await saveDoctorInfo({
        doctorId: Number(selectedOption.value),
        content,
        description,
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
        doctorId: Number(selectedOption.value),
        content,
        description,
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
    const res = await getAllDoctors();

    if (res.doctors) {
      const formattedDoctors = res.doctors.map((doctor) => ({
        label: `${doctor.firstName} ${doctor.lastName}`,
        value: doctor.id.toString(),
      }));

      setDoctors(formattedDoctors);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchCurrentDoctor = async () => {
    setIsLoadingCurrentDoctor(true);
    const res = await getDoctor(selectedOption.value);
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
    setIsLoadingCurrentDoctor(false);
  };

  useEffect(() => {
    fetchCurrentDoctor();
  }, [selectedOption.value]);

  console.log(description);

  return (
    <ProtectedPage>
      <div className="admin-page-container">
        <h1 className="admin-page-title">
          <FormattedMessage id="adminheader.admin.manage-doctor" />
        </h1>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div>
            <label className="form-input-label mb-2 block">
              <FormattedMessage id="manage-doctor.choose-doctor" />
            </label>
            <Select
              options={doctors}
              className="h-fit !outline-none"
              onChange={setSelectedOption as any}
              defaultValue={selectedOption}
              isDisabled={isLoadingCurrentDoctor}
            />
          </div>

          <div>
            <label className="form-input-label mb-2 block">
              <FormattedMessage id="manage-doctor.introduction" />
            </label>
            <SmallTextEditor setContent={setDescription} value={description} />
          </div>
        </div>

        <div className="mt-12">
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
    </ProtectedPage>
  );
};

export default ManageDoctor;
