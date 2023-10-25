import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { adminMenuItems } from "../../data/menu";
import { Link } from "react-router-dom";

interface Props {}

const AdminNavigator: FC<Props> = (props): JSX.Element => {
  return (
    <div className="border-r border-white">
      {adminMenuItems.map((itemLv1, indexLv1) => (
        <div
          key={indexLv1}
          className="px-4 py-3 cursor-pointer relative hover:bg-sky-700 transition group/lv1 item-level-1"
        >
          <FormattedMessage id={itemLv1.name} />
          <div className="hidden absolute top-full left-0 w-[250px] bg-menu_bg_color text-text_in_light custom-shadow group-hover/lv1:block">
            {itemLv1.menus.map((itemLv2, indexLv2) => (
              <div
                key={indexLv2}
                className="group/lv2 px-4 py-3 relative hover:text-main_color item-level-2"
              >
                <FormattedMessage id={itemLv2.name} />
                <div className="absolute top-0 left-[100%] bg-menu_bg_color text-text_in_light group-hover/lv2:visible z-[100] items-block-level-3 custom-shadow">
                  {itemLv2.subMenus.map((itemLv3, indexLv3) => (
                    <Link
                      to={itemLv3.link}
                      key={indexLv3}
                      className="block px-4 py-3 hover:text-main_color w-max"
                    >
                      <FormattedMessage id={itemLv3.name} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminNavigator;
