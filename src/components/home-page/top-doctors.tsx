import { FC } from "react";
import { FormattedMessage } from "react-intl";
import BtnWithIcon from "../btn-with-icon";
import { BiSolidChevronsRight } from "react-icons/bi";
import TopDoctorsSwiper from "./top-doctors-swiper";

interface Props {}

const TopDoctors: FC<Props> = (props): JSX.Element => {
  return (
    <div>
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <h2 className="section-title">
            <FormattedMessage id="homesections.top-doctors" />
          </h2>

          <BtnWithIcon content="see-more" iconBehind={BiSolidChevronsRight} />
        </div>

        <TopDoctorsSwiper />
      </div>
    </div>
  );
};

export default TopDoctors;
