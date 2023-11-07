import moment from "moment";
import "moment/locale/vi";

export const sevenDaysArr: {
  labelVi: string;
  labelEn: string;
  value: string;
}[] = [];
for (let i = 0; i < 7; i++) {
  const startOfDayMoment = moment().add(i, "days").startOf("day");
  sevenDaysArr.push({
    labelVi: startOfDayMoment.locale("vi").format("dddd - DD/MM").toString(),
    labelEn: startOfDayMoment.locale("en").format("dddd - DD/MM").toString(),
    value: startOfDayMoment.locale("vi").format("L").toString(),
  });
}
