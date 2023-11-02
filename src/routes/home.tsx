import { FC } from "react";
import Searchbar from "../components/home-page/search-bar";
import { FormattedMessage } from "react-intl";
import HomeCategories from "../components/home-page/home-categories";
import DownloadApp from "../components/home-page/download-app";
import DownloadAppBtns from "../components/home-page/download-app-btns";

interface Props {}

const Home: FC<Props> = (props): JSX.Element => {
  return (
    <div>
      <div className="home-page-bg text-center mb-14">
        <div className="search-section">
          <h1 className="uppercase text-white text-[32px] title-shadow mb-5">
            <FormattedMessage id="homebanner.title1" />
            <br />
            <b>
              <FormattedMessage id="homebanner.title2" />
            </b>
          </h1>

          <Searchbar />

          <div className="my-5 py-3 px-4 mx-auto w-fit">
            <DownloadAppBtns imgWrapperClasses="w-[108px] h-[32px]" />
          </div>
        </div>

        <div className="categories-section">
          <HomeCategories />
        </div>
      </div>

      <div className="has-bg-section">
        <DownloadApp />
      </div>
    </div>
  );
};

export default Home;
