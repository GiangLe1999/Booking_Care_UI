import { FC, useEffect, useState } from "react";
import { sevenDaysArr } from "../../utils/create7daysArr";
import { useGetLanguage } from "../../hooks/useGetLanguage";
import { getScheduleByDate } from "../../service/doctor.service";
import { FetchedSchedule } from "../../dtos/doctor.dto";
import moment from "moment";
import { ImCalendar } from "react-icons/im";
import { FaRegHandPointUp } from "react-icons/fa";
import { FormattedMessage } from "react-intl";

interface Props {
  doctorId: number;
}

const DoctorSchedule: FC<Props> = ({ doctorId }): JSX.Element => {
  const [periods, setPeriods] = useState<FetchedSchedule[]>([]);
  const currentLanguage = useGetLanguage();
  const [currentDate, setCurrentDate] = useState<string>(
    moment().startOf("day").locale("vi").format("L").toString()
  );

  const fetchSchedule = async () => {
    const res = await getScheduleByDate({ doctorId, date: currentDate });
    if (res.ok && res.schedules) {
      setPeriods(res.schedules);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [currentDate]);

  console.log(periods);
  return (
    <div>
      <select
        name="schedule"
        id="schedule"
        className="text-[#337ab7] font-semibold border-b border-[#999] text-sm min-w-[131px] py-1 cursor-pointer capitalize outline-none"
        value={currentDate}
        onChange={(e) => setCurrentDate(e.target.value)}
      >
        {sevenDaysArr.map((opt) => (
          <option value={opt.value} key={opt.value} className="capitalize">
            {currentLanguage === "vi" ? opt.labelVi : opt.labelEn}
          </option>
        ))}
      </select>

      <h2 className="uppercase font-semibold flex items-center gap-1 mt-4 mb-3 text-title_text">
        <ImCalendar />
        <FormattedMessage id="doctor-page.schedule" />
      </h2>

      {periods.length > 0 ? (
        <>
          <div className="grid grid-cols-4 gap-2">
            {periods.map((period) => (
              <button
                key={period.id}
                className="w-full text-center py-[10px] bg-yellow text-xs font-bold rounded-sm cursor-pointer border-[2px] border-transparent hover:border-main_color transition"
              >
                {currentLanguage === "vi"
                  ? period.timeTypeData.valueVi
                  : period.timeTypeData.valueEn}
              </button>
            ))}
          </div>
          <span className="text-xs flex items-baseline mt-3">
            <FormattedMessage id="doctor-page.choose" />{" "}
            <FaRegHandPointUp size={18} className="mx-1" />{" "}
            <FormattedMessage id="doctor-page.and" />
            <span className="text-[9px] -top-1 relative">đ</span>
            &nbsp;)
          </span>
        </>
      ) : (
        <span className="text-sm">
          <FormattedMessage id="doctor-page.empty-schedule" />
        </span>
      )}
    </div>
  );
};

export default DoctorSchedule;
