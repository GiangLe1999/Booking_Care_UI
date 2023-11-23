import { FC } from "react";
import { FormattedMessage } from "react-intl";
import BtnWithIcon from "../btn-with-icon";
import { BiSolidChevronsRight } from "react-icons/bi";
import ClinicsSwiper from "./clinics-swiper";
import { FetchedClinic } from "../../dtos/clinic.dto";

interface Props {
  clinics: FetchedClinic[];
  isLoadingClinics: boolean;
}

const Clinics: FC<Props> = ({ clinics, isLoadingClinics }): JSX.Element => {
  return (
    <div className="container">
      <div className="flex items-center justify-between mb-10">
        <h2 className="section-title">
          <FormattedMessage id="homesections.clinics" />
        </h2>

        <BtnWithIcon content="see-more" iconBehind={BiSolidChevronsRight} />
      </div>

      <ClinicsSwiper clinics={clinics} isLoadingClinics={isLoadingClinics} />
    </div>
  );
};

export default Clinics;
