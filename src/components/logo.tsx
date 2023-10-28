import { FC } from "react";
import { Link } from "react-router-dom";
import StyledImage from "./styled-image";

interface Props {
  wrapperClasses: string;
}

const Logo: FC<Props> = ({ wrapperClasses }): JSX.Element => {
  return (
    <Link to="/">
      <StyledImage
        wrapperClasses={wrapperClasses}
        src="/assets/images/home-page/bookingcare-logo.svg"
        alt="Booking Care Logo"
        imageClasses="!object-contain"
      />
    </Link>
  );
};

export default Logo;
