import { FC } from "react";
import { categoryMenuItems } from "../../data/menu";
import { Link } from "react-router-dom";
import StyledImage from "../styled-image";
import { FormattedMessage } from "react-intl";

interface Props {}

const HomeCategories: FC<Props> = (props): JSX.Element => {
  return (
    <ul className="grid grid-cols-5 gap-y-6">
      {categoryMenuItems.map((category, index) => (
        <li key={index} className="group">
          <Link to={category.link}>
            <div className="bg-white w-[50px] aspect-square rounded-full grid place-items-center category-shadow mx-auto">
              <StyledImage
                wrapperClasses="w-8 h-8"
                src={`/assets/images/home-page/${category.image}.png`}
                alt={category.title}
              />
            </div>

            <p className="w-[110px] text-center mx-auto font-semibold mt-1 group-hover:text-main_color transition">
              <FormattedMessage id={`homecategories.${category.title}`} />
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HomeCategories;
