import { FC, useEffect, useState } from "react";
import Searchbar from "../components/home-page/search-bar";
import { FormattedMessage } from "react-intl";
import HomeCategories from "../components/home-page/home-categories";
import DownloadApp from "../components/home-page/download-app";
import DownloadAppBtns from "../components/home-page/download-app-btns";
import TopDoctors from "../components/home-page/top-doctors";
import RootLayout from "../containers/root-layout";
import Specialties from "../components/home-page/specialties";
import Clinics from "../components/home-page/clinics";
import { FetchedSpecialty } from "../dtos/specialty.dto";
import { getHomeSpecialties } from "../service/specialty.service";
import { FetchedClinic } from "../dtos/clinic.dto";
import { getHomeClinics } from "../service/clinic.service";
import { FetchedDoctor } from "../dtos/doctor.dto";
import { getTopDoctors } from "../service/doctor.service";
import Media from "../components/home-page/media";
import Handbooks from "../components/home-page/handbooks";
import { getHomeHandbooks } from "../service/handbook.service";
import { FetchedArticle } from "../dtos/articles.dto";
import { getHomeLonglives } from "../service/longlive.service";
import Longlives from "../components/home-page/longlives";
import { getHomeTips } from "../service/tips.service";
import Tips from "../components/home-page/tips";

interface Props {}

const Home: FC<Props> = (): JSX.Element => {
  const [specialties, setSpecialties] = useState<FetchedSpecialty[]>([]);
  const [isLoadingSpecialties, setIsLoadingSpecialties] = useState(false);
  const [clinics, setClinics] = useState<FetchedClinic[]>([]);
  const [isLoadingClinics, setIsLoadingClinics] = useState(false);
  const [doctors, setDoctors] = useState<FetchedDoctor[]>([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);
  const [handbooks, setHandbooks] = useState<FetchedArticle[]>([]);
  const [isLoadingHandbooks, setIsLoadingHandbooks] = useState(false);
  const [longlives, setLonglives] = useState<FetchedArticle[]>([]);
  const [isLoadingLonglives, setIsLoadingLonglives] = useState(false);
  const [tips, setTips] = useState<FetchedArticle[]>([]);
  const [isLoadingTips, setIsLoadingTips] = useState(false);

  const fetchSpecialties = async () => {
    setIsLoadingSpecialties(true);
    const res = await getHomeSpecialties();

    if (res.specialties) {
      setSpecialties(res.specialties);
    }
    setIsLoadingSpecialties(false);
  };

  const fetchClinics = async () => {
    setIsLoadingClinics(true);
    const res = await getHomeClinics();

    if (res.clinics) {
      setIsLoadingClinics(false);
      setClinics(res.clinics);
    }
  };

  const fetchDoctors = async () => {
    setIsLoadingDoctors(true);
    const res = await getTopDoctors(20);

    if (res.doctors) {
      setDoctors(res.doctors);
    }

    setIsLoadingDoctors(false);
  };

  const fetchHandbooks = async () => {
    setIsLoadingHandbooks(true);
    const res = await getHomeHandbooks();

    if (res.articles) {
      setIsLoadingHandbooks(false);
      setHandbooks(res.articles);
    }
  };

  const fetchLonglives = async () => {
    setIsLoadingLonglives(true);
    const res = await getHomeLonglives();

    if (res.articles) {
      setIsLoadingLonglives(false);
      setLonglives(res.articles);
    }
  };

  const fetchTips = async () => {
    setIsLoadingTips(true);
    const res = await getHomeTips();

    if (res.articles) {
      setIsLoadingTips(false);
      setTips(res.articles);
    }
  };

  const fetchData = () => {
    Promise.all([fetchSpecialties(), fetchDoctors(), fetchClinics()]);
  };

  const fetchArticlesData = () => {
    Promise.all([fetchHandbooks(), fetchLonglives(), fetchTips()]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchArticlesData();
  }, []);

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
          <Specialties
            specialties={specialties}
            isLoadingSpecialties={isLoadingSpecialties}
          />
        </div>

        <div className="pb-16">
          <Clinics clinics={clinics} isLoadingClinics={isLoadingClinics} />
        </div>

        <div className="has-bg-section-1">
          <TopDoctors doctors={doctors} isLoadingDoctors={isLoadingDoctors} />
        </div>

        <div className="py-10 px-4">
          <DownloadApp />
        </div>

        <div className="has-bg-section-1">
          <Media />
        </div>

        <div className="py-10 px-4">
          <Handbooks
            handbooks={handbooks}
            isLoadingHandbooks={isLoadingHandbooks}
          />
        </div>

        <div className="py-10 px-4">
          <Longlives
            longlives={longlives}
            isLoadingLonglives={isLoadingLonglives}
          />
        </div>

        <div className="py-10 px-4">
          <Tips tips={tips} isLoadingTips={isLoadingTips} />
        </div>
      </div>
    </RootLayout>
  );
};

export default Home;
