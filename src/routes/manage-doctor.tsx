import { FC, useEffect, useState } from "react";
import ProtectedPage from "../containers/protected-page";
import { FormattedMessage } from "react-intl";
import SmallTextEditor from "../components/small-text-editor";
import TextEditor from "../components/text-editor";

import Select from "react-select";
import BtnWithLoading from "../components/btn-with-loading";
import { getAllDoctors, saveDoctorInfo } from "../service/doctor.service";
import { FetchedDoctors } from "../dtos/doctor.dto";
import { toast } from "react-toastify";

interface Props {}

const ManageDoctor: FC<Props> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState<{ label: string; value: string }[]>(
    []
  );
  const [rawDoctors, setRawDoctors] = useState<FetchedDoctors[]>([]);
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const currentDoctorInfo = rawDoctors.find(
    (doctor) => Number(selectedOption.value) === doctor.id
  );

  const submitHandler = async () => {
    if (!selectedOption.value) {
      toast.error("Vui lòng chọn 1 bác sĩ");
      return;
    }

    setIsLoading(true);
    const res = await saveDoctorInfo({
      doctorId: Number(selectedOption.value),
      content,
      description,
    });

    if (res.ok) {
      toast.success("Lưu thông tin bác sĩ thành công");
    }

    if (res.error) {
      toast.error(res.error);
    }

    setIsLoading(false);
  };

  const fetchDoctors = async () => {
    const res = await getAllDoctors();

    if (res.doctors) {
      setRawDoctors(res.doctors);
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
            />
          </div>

          <div>
            <label className="form-input-label mb-2 block">
              <FormattedMessage id="manage-doctor.introduction" />
            </label>
            <SmallTextEditor setContent={setDescription} />
          </div>
        </div>

        <div className="mt-12">
          <label className="form-input-label mb-2 block">
            <FormattedMessage id="manage-doctor.detail" />
          </label>
          <TextEditor setContent={setContent} />
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
