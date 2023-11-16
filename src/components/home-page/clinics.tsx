import { FC } from "react";
import { FormattedMessage } from "react-intl";
import BtnWithIcon from "../btn-with-icon";
import { BiSolidChevronsRight } from "react-icons/bi";
import ClinicsSwiper from "./clinics-swiper";

interface Props {}

const Clinics: FC<Props> = (props): JSX.Element => {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-10 container">
        <h2 className="section-title">
          <FormattedMessage id="homesections.clinics" />
        </h2>

        <BtnWithIcon content="see-more" iconBehind={BiSolidChevronsRight} />
      </div>

      <ClinicsSwiper />
    </div>
  );
};

export default Clinics;
