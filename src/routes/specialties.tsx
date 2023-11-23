import { FC, useEffect, useState } from "react";
import SubHeader from "../components/layout/sub-header";

interface Props {}

const Specialties: FC<Props> = (props): JSX.Element => {
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      if (position > 80) {
        setShowHeading(true);
      } else {
        setShowHeading(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <SubHeader headingContent={showHeading ? "Khám chuyên khoa" : ""} />
    </div>
  );
};

export default Specialties;
