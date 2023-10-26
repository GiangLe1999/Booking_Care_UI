import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { adminMenuItems } from "../../data/menu";
import { Link, useLocation } from "react-router-dom";

interface Props {}

const AdminNavigator: FC<Props> = (props): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <div className="border-r border-white">
      {adminMenuItems.map((itemLv1, indexLv1) => (
        <div
          key={indexLv1}
          className="px-4 py-3 cursor-pointer relative hover:bg-sky-700 transition group/lv1 item-level-1"
        >
          <FormattedMessage id={itemLv1.name} />
          <div className="hidden absolute top-full left-0 w-[250px] bg-admin_menu_bg_color text-normal_text custom-shadow group-hover/lv1:block">
            {itemLv1.menus.map((itemLv2, indexLv2) => (
              <div
                key={indexLv2}
                className={`group/lv2 px-4 py-3 relative hover:text-admin_main_color item-level-2 ${
                  pathname.includes(itemLv2.link) && "text-admin_main_color"
                }`}
              >
                <FormattedMessage id={itemLv2.name} />
                <div className="absolute top-0 left-[100%] bg-admin_menu_bg_color text-normal_text group-hover/lv2:visible z-[100] items-block-level-3 custom-shadow">
                  {itemLv2.subMenus.map((itemLv3, indexLv3) => (
                    <Link
                      to={itemLv3.link}
                      key={indexLv3}
                      className={`block px-4 py-3 hover:text-admin_main_color w-max ${
                        pathname === itemLv3.link && "text-admin_main_color"
                      }`}
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
