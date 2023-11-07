import { FC, useEffect, useState } from "react";
import DoctorProtectedPage from "../containers/doctor-protected-page";
import { FormattedMessage } from "react-intl";
import { formatDoctorsDataForSelect } from "../utils/formatDoctorsDataForSelect";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { getCodesByType } from "../service/allcodes.service";
import { FetchedCode } from "../dtos/allcodes.dto";
import { useGetLanguage } from "../hooks/useGetLanguage";
import { bulkCreateSchedules } from "../service/doctor.service";
import { toast } from "react-toastify";
import BtnWithLoading from "../components/btn-with-loading";

interface Props {}

const ManageSchedule: FC<Props> = (props): JSX.Element => {
  const currentLanguage = useGetLanguage();
  const [date, setDate] = useState<any>(new Date());
  const [periods, setPeriods] = useState<FetchedCode[]>();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);

  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });
  const [doctors, setDoctors] = useState<{ label: string; value: string }[]>(
    []
  );

  const selectPeriodHandler = (period: string) => {
    if (!selectedPeriods.includes(period)) {
      setSelectedPeriods((prev) => {
        const newPeriods = [...prev, period];
        return newPeriods;
      });
    } else {
      setSelectedPeriods((prev) => {
        let newPeriods = [...prev];
        newPeriods = newPeriods.filter((item) => item !== period);
        return newPeriods;
      });
    }
  };

  const confirmHandler = async () => {
    if (!selectedOption.value) {
      toast.error("Vui lòng chọn bác sĩ");
      return;
    }

    setIsLoading(true);
    const data = selectedPeriods?.map((period) => ({
      doctorId: Number(selectedOption.value),
      date,
      timeType: period,
    }));

    const res = await bulkCreateSchedules(data);

    if (!res.ok) {
      return toast.error(res.error);
    }

    setIsLoading(false);
    toast.success("Tạo lịch khám bệnh thành công");
  };

  const fetchDoctors = async () => {
    const formattedDoctors = await formatDoctorsDataForSelect();

    setDoctors(formattedDoctors as { label: string; value: string }[]);
  };

  const fetchPeriods = async () => {
    const res = await getCodesByType("TIME");
    if (res.ok) {
      setPeriods(res.codes);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchPeriods();
  }, []);

  return (
    <DoctorProtectedPage>
      <div className="admin-page-container">
        <h1 className="admin-page-title">
          <FormattedMessage id="adminheader.admin.manage-schedule" />
        </h1>

        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <label className="form-input-label mb-2 block">
              <FormattedMessage id="manage-schedule.choose-doctor" />
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
        </div>

        <div className="grid grid-cols-4 gap-x-8 gap-y-4 mt-8">
          {periods?.map((period) => (
            <div
              key={period.id}
              className={`${
                selectedPeriods.includes(period.keyMap)
                  ? "bg-yellow border-yellow"
                  : "bg-transparent border-[#ccc]"
              } text-[#333] font-bold text-center py-[10px] rounded-md border cursor-pointer`}
              onClick={() => selectPeriodHandler(period.keyMap)}
            >
              {currentLanguage === "vi" ? period.valueVi : period.valueEn}
            </div>
          ))}
        </div>

        <div className="text-right">
          <BtnWithLoading
            content="confirm"
            isLoading={isLoading}
            disabled={isLoading}
            customClasses="mt-8"
            onClick={confirmHandler}
          />
        </div>
      </div>
    </DoctorProtectedPage>
  );
};

export default ManageSchedule;
