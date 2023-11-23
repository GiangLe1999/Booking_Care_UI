import { FC } from "react";
import { BiSolidChevronsRight } from "react-icons/bi";
import { FormattedMessage } from "react-intl";
import BtnWithIcon from "../btn-with-icon";
import SpecialtiesSwiper from "./specialties-swiper";
import { FetchedSpecialty } from "../../dtos/specialty.dto";

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
      <div className="flex items-center justify-between mb-10">
        <h2 className="section-title">
          <FormattedMessage id="homesections.specialties" />
        </h2>

        <BtnWithIcon content="see-more" iconBehind={BiSolidChevronsRight} />
      </div>

      <SpecialtiesSwiper
        specialties={specialties}
        isLoadingSpecialties={isLoadingSpecialties}
      />
    </div>
  );
};

export default Specialties;
