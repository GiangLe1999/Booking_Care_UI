import { FC } from "react";
import { FormattedMessage } from "react-intl";
import BtnWithIcon from "../btn-with-icon";
import { BiSolidChevronsRight } from "react-icons/bi";
import TopDoctorsSwiper from "./top-doctors-swiper";
import { FetchedDoctor } from "../../dtos/doctor.dto";
import { path } from "../../constants";

interface Props {
  doctors: FetchedDoctor[];
  isLoadingDoctors: boolean;
}

const TopDoctors: FC<Props> = ({ doctors, isLoadingDoctors }): JSX.Element => {
  return (
    <div>
      <div className="container">
        <div className="flex items-center justify-between mb-5">
          <h2 className="section-title">
            <FormattedMessage id="homesections.top-doctors" />
          </h2>

          <BtnWithIcon
            content="see-more"
            iconBehind={BiSolidChevronsRight}
            to={path.DOCTOR}
            customClasses="!rounded-md after:!rounded-md"
          />
        </div>

        <TopDoctorsSwiper
          doctors={doctors}
          isLoadingDoctors={isLoadingDoctors}
        />
      </div>
    </div>
  );
};

export default TopDoctors;
