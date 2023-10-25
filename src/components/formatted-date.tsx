import { FC } from "react";
import moment from "moment";

interface Props {
  formatType?: string;
  rawDate: string;
}

const defaultFormat = "DD/MM/YYYY";

const FormattedDate: FC<Props> = ({ formatType, rawDate }): JSX.Element => {
  const dateFormat = formatType ? formatType : defaultFormat;
  const formattedDate = moment.utc(rawDate).format(dateFormat);
  return <span>{formattedDate}</span>;
};

export default FormattedDate;
