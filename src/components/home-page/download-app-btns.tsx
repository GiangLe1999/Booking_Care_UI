import { FC } from "react";
import StyledImage from "../styled-image";
import { Link } from "react-router-dom";

interface Props {
  imgWrapperClasses: string;
}

const DownloadAppBtns: FC<Props> = ({ imgWrapperClasses }): JSX.Element => {
  return (
    <div className="flex items-center gap-4">
      <Link to="/">
        <StyledImage
          wrapperClasses={imgWrapperClasses}
          src="/assets/images/home-page/google-play-badge.svg"
          alt="Google Play"
        />
      </Link>

      <Link to="/">
        <StyledImage
          wrapperClasses={imgWrapperClasses}
          src="/assets/images/home-page/app-store-badge-black.svg"
          alt="App Store"
        />
      </Link>
    </div>
  );
};

export default DownloadAppBtns;
