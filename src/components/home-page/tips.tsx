import { FC } from "react";
import { FetchedArticle } from "../../dtos/articles.dto";
import { FormattedMessage } from "react-intl";
import BtnWithIcon from "../btn-with-icon";
import { BiSolidChevronsRight } from "react-icons/bi";
import { path } from "../../constants";
import TipsSwiper from "./tips-swiper";

interface Props {
  tips: FetchedArticle[] | undefined;
  isLoadingTips: boolean;
}

const Tips: FC<Props> = ({ tips, isLoadingTips }): JSX.Element => {
  return (
    <div className="container">
      <div className="flex items-center justify-between mb-5">
        <h2 className="section-title">
          <FormattedMessage id="homesections.tips" />
        </h2>

        <BtnWithIcon
          content="see-more"
          iconBehind={BiSolidChevronsRight}
          to={path.TIP}
          customClasses="!rounded-md after:!rounded-md"
        />
      </div>

      <TipsSwiper tips={tips} isLoadingTips={isLoadingTips} />
    </div>
  );
};

export default Tips;
