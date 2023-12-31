import { FC } from "react";
import { BiSolidChevronsRight } from "react-icons/bi";
import { FormattedMessage } from "react-intl";
import BtnWithIcon from "../btn-with-icon";
import SpecialtiesSwiper from "./specialties-swiper";
import { FetchedSpecialty } from "../../dtos/specialty.dto";
import { path } from "../../constants";

interface Props {
  specialties: FetchedSpecialty[];
  isLoadingSpecialties: boolean;
}

const Specialties: FC<Props> = ({
  specialties,
  isLoadingSpecialties,
}): JSX.Element => {
  return (
    <div className="container">
      <div className="flex items-center justify-between mb-5">
        <h2 className="section-title">
          <FormattedMessage id="homesections.specialties" />
        </h2>

        <BtnWithIcon
          content="see-more"
          iconBehind={BiSolidChevronsRight}
          to={path.SPECIALITY}
          customClasses="!rounded-md after:!rounded-md"
        />
      </div>

      <SpecialtiesSwiper
        specialties={specialties}
        isLoadingSpecialties={isLoadingSpecialties}
      />
    </div>
  );
};

export default Specialties;
