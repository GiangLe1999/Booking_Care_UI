import { FC } from "react";
import { FetchedArticle } from "../../dtos/articles.dto";
import { FormattedMessage } from "react-intl";
import BtnWithIcon from "../btn-with-icon";
import { BiSolidChevronsRight } from "react-icons/bi";
import { path } from "../../constants";
import LonglivesSwiper from "./longlives-swiper";

interface Props {
  longlives: FetchedArticle[] | undefined;
  isLoadingLonglives: boolean;
}

const Longlives: FC<Props> = ({
  longlives,
  isLoadingLonglives,
}): JSX.Element => {
  return (
    <div className="container">
      <div className="flex items-center justify-between mb-5">
        <h2 className="section-title">
          <FormattedMessage id="homesections.longlives" />
        </h2>

        <BtnWithIcon
          content="see-more"
          iconBehind={BiSolidChevronsRight}
          to={path.LONGLIVE}
          customClasses="!rounded-md after:!rounded-md"
        />
      </div>

      <LonglivesSwiper
        longlives={longlives}
        isLoadingLonglives={isLoadingLonglives}
      />
    </div>
  );
};

export default Longlives;
