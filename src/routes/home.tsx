import { FC } from "react";
import Searchbar from "../components/home-page/search-bar";
import { FormattedMessage } from "react-intl";
import StyledImage from "../components/styled-image";
import { Link } from "react-router-dom";
import HomeCategories from "../components/home-page/home-categories";

interface Props {}

const Home: FC<Props> = (props): JSX.Element => {
  return (
    <div>
      <div className="home-page-bg text-center">
        <div className="search-section">
          <h1 className="uppercase text-white text-[32px] title-shadow mb-5">
            <FormattedMessage id="homebanner.title1" />
            <br />
            <b>
              <FormattedMessage id="homebanner.title2" />
            </b>
          </h1>

          <Searchbar />

          <div className="my-5 py-3 px-4 flex items-center justify-center gap-4">
            <Link to="/">
              <StyledImage
                wrapperClasses="w-[108px] h-[32px]"
                src="/assets/images/home-page/google-play-badge.svg"
                alt="Google Play"
              />
            </Link>

            <Link to="/">
              <StyledImage
                wrapperClasses="w-[108px] h-[32px]"
                src="/assets/images/home-page/app-store-badge-black.svg"
                alt="App Store"
              />
            </Link>
          </div>
        </div>

        <div className="categories-section">
          <HomeCategories />
        </div>
      </div>
    </div>
  );
};

export default Home;
