import { FC } from "react";
import StyledImage from "./styled-image";
import { Link } from "react-router-dom";

interface Props {}

const Socials: FC<Props> = (props): JSX.Element => {
  return (
    <div className="flex items-center gap-4">
      <Link to="/">
        <StyledImage
          wrapperClasses="w-[32px] h-[32px]"
          src="/assets/images/home-page/facebook-square.svg"
          alt="Facebook"
        />
      </Link>

      <Link to="/">
        <StyledImage
          wrapperClasses="w-[32px] h-[32px]"
          src="/assets/images/home-page/youtube-square.svg"
          alt="Youtube"
        />
      </Link>
    </div>
  );
};

export default Socials;
