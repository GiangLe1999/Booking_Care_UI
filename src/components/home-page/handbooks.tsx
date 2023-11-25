import { FC } from "react";
import { FetchedArticle } from "../../dtos/articles.dto";
import { FormattedMessage } from "react-intl";
import BtnWithIcon from "../btn-with-icon";
import { BiSolidChevronsRight } from "react-icons/bi";
import { path } from "../../constants";
import HandbooksSwiper from "./hanbooks-swiper";

interface Props {
  handbooks: FetchedArticle[] | undefined;
  isLoadingHandbooks: boolean;
}

const Handbooks: FC<Props> = ({
  handbooks,
  isLoadingHandbooks,
}): JSX.Element => {
  return (
    <div className="container">
      <div className="flex items-center justify-between mb-5">
        <h2 className="section-title">
          <FormattedMessage id="homesections.handbooks" />
        </h2>

        <BtnWithIcon
          content="see-more"
          iconBehind={BiSolidChevronsRight}
          to={path.HANDBOOK}
          customClasses="!rounded-md after:!rounded-md"
        />
      </div>

      <HandbooksSwiper
        handbooks={handbooks}
        isLoadingHandbooks={isLoadingHandbooks}
      />
    </div>
  );
};

export default Handbooks;
