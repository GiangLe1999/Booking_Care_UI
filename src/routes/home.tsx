import { FC } from "react";
import Searchbar from "../components/home-page/search-bar";
import { FormattedMessage } from "react-intl";
import HomeCategories from "../components/home-page/home-categories";
import DownloadApp from "../components/home-page/download-app";
import DownloadAppBtns from "../components/home-page/download-app-btns";
import TopDoctors from "../components/home-page/top-doctors";
import RootLayout from "../containers/root-layout";
import Specialties from "../components/home-page/specialties";
import Clinics from "../components/home-page/clinics";

interface Props {}

const Home: FC<Props> = (props): JSX.Element => {
  return (
    <RootLayout>
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

        <div className="pt-10 pb-16">
          <Specialties />
        </div>

        <div className="pt-10 pb-16">
          <Clinics />
        </div>

        <div className="has-bg-section-1">
          <TopDoctors />
        </div>

        <div className="py-10 px-4">
          <DownloadApp />
        </div>
      </div>
    </RootLayout>
  );
};

export default Home;
