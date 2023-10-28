import { FC } from "react";
import { menuSidebarItems } from "../../data/menu";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import StyledImage from "../styled-image";
import Socials from "../socials";

interface Props {}

const RootSidebar: FC<Props> = (props): JSX.Element => {
  return (
    <div>
      <ul>
        {menuSidebarItems.map((item, index) => {
          if (index === 5) {
            return (
              <>
                <li key={5}>
                  <Link
                    to={item.link}
                    className="text-main_color py-3 px-4 block border-b"
                  >
                    <FormattedMessage id={`rootsidebar.${item.title}`} />
                  </Link>
                </li>
                <div className="bg-[#f1f1f1] text-[#555] text-xs py-3 px-4 border-b">
                  <FormattedMessage id={`rootsidebar.about`} />
                </div>
              </>
            );
          }

          return (
            <li key={index}>
              <Link
                to={item.link}
                className="text-main_color py-3 px-4 block border-b"
              >
                <FormattedMessage id={`rootsidebar.${item.title}`} />
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="my-5 py-3 px-4">
        <Socials />
      </div>
    </div>
  );
};

export default RootSidebar;
