import { FC, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import DoctorProtectedPage from "../containers/doctor-protected-page";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { getPatientsByDoctor, sendBill } from "../service/doctor.service";
import { useGetUser } from "../hooks/useGetUser";
import moment from "moment";
import { useGetLanguage } from "../hooks/useGetLanguage";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useForm } from "react-hook-form";
import BtnWithLoading from "../components/btn-with-loading";
import { blobToBase64 } from "../utils/blobToBase64";
import { toast } from "react-toastify";

interface Props {}

interface FormValues {
  file: FileList;
}

const ManagePatient: FC<Props> = (props): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const user = useGetUser();
  const currentLanguage = useGetLanguage();
  const [patients, setPatients] = useState<any[]>();
  const [currentPatient, setCurrentPatient] = useState<any>();
  const [date, setDate] = useState<any>([
    moment(new Date()).startOf("day").valueOf(),
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>();

  const { register, handleSubmit } = form;

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const base64File = await blobToBase64(data.file[0]);

      const res = await sendBill(
        currentPatient.User.email,
        user?.id as number,
        currentPatient.patientId,
        currentPatient.timeTypeData.keyMap,
        base64File,
        currentPatient.User.lastName
      );

      if (!res.ok) {
        setIsLoading(false);
        return toast.error(res.error);
      } else {
        await fetchPatients();
        setIsLoading(false);
        setOpenModal(false);
        return toast.success("Xác nhận thành công");
      }
    } catch (error) {
      toast.error("Không thể xác nhận thành ôcng");
    }
  };

  const fetchPatients = async () => {
    const data = await getPatientsByDoctor(
      user?.id?.toString() as string,
      moment(date[0]).startOf("day").valueOf().toString()
    );

    if (data.patients) {
      setPatients(data.patients);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [date[0]]);

  return (
    <DoctorProtectedPage>
      <div className="admin-page-container">
        <h1 className="admin-page-title">
          <FormattedMessage id="adminheader.admin.manage-patient" />
        </h1>

        <div className="w-1/2">
          <label className="form-input-label mb-2 block">
            <FormattedMessage id="manage-schedule.choose-date" />
          </label>
          <Flatpickr
            value={date}
            onChange={(dateSelect) => setDate(dateSelect)}
            options={{
              dateFormat: "d-m-Y",
            }}
            className="w-full outline-none border border-[#ccc] rounded-[4px] py-[6px] px-4"
          />
        </div>

        <div className="admin-table-wrapper">
          <table className="manage-user-table !text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col">
                  <FormattedMessage id="manage-patient.time" />
                </th>
                <th scope="col">
                  <FormattedMessage id="manage-patient.fullName" />
                </th>
                <th scope="col">
                  <FormattedMessage id="manage-patient.address" />
                </th>
                <th scope="col">
                  <FormattedMessage id="manage-patient.gender" />
                </th>
                <th scope="col">
                  <FormattedMessage id="manage-patient.status" />
                </th>
                <th scope="col">
                  <FormattedMessage id="common.actions" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {patients?.map((patient, index) => (
                <tr className="hover:bg-gray-50" key={patient.id}>
                  <td>
                    {currentLanguage === "vi"
                      ? patient?.timeTypeData?.valueVi
                      : patient?.timeTypeData?.valueEn}
                  </td>
                  <td>{patient.User.lastName}</td>
                  <td>{patient.User.address}</td>
                  <td>
                    {currentLanguage === "vi"
                      ? patient?.User?.genderData.valueVi
                      : patient?.User?.genderData.valueEn}
                  </td>
                  <td>
                    {currentLanguage === "vi"
                      ? patient?.statusData?.valueVi
                      : patient?.statusData?.valueEn}
                  </td>
                  <td className="flex items-center gap-1">
                    {patient?.statusData?.keyMap === "S2" && (
                      <button
                        onClick={() => {
                          setOpenModal(true);
                          setCurrentPatient(patient);
                        }}
                        className="px-2 py-1 bg-emerald-600 text-white rounded"
                      >
                        {currentLanguage === "vi" ? "Gửi mail" : "Send mail"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setCurrentPatient(null);
        }}
        center
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="bg-admin_main_color text-white py-4 pl-6 text-xl font-bold">
            <FormattedMessage id="manage-patient.confirm" />
          </h3>

          <div className="p-6 px-6 border-b">
            <input
              type="file"
              id="file"
              {...register("file", { required: true })}
            />
          </div>

          <div className="flex justify-between items-center px-6 py-3">
            <button
              className="cancel-btn"
              type="button"
              onClick={() => {
                setOpenModal(false);
                setCurrentPatient(null);
              }}
            >
              <FormattedMessage id="button.cancel" />
            </button>

            <BtnWithLoading
              content="confirm"
              isLoading={isLoading}
              customClasses="admin-btn"
              type="submit"
            />
          </div>
        </form>
      </Modal>
    </DoctorProtectedPage>
  );
};

export default ManagePatient;
