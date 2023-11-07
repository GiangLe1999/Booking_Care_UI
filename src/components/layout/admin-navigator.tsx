import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { adminMenuItems, doctorMenuItems } from "../../data/menu";
import { Link, useLocation } from "react-router-dom";
import { useGetUser } from "../../hooks/useGetUser";

interface Props {}

const AdminNavigator: FC<Props> = (props): JSX.Element => {
  const { pathname } = useLocation();
  const user = useGetUser();

  const menuItems =
    user?.roleId === "R1"
      ? adminMenuItems
      : user?.roleId === "R2"
      ? doctorMenuItems
      : [];

  return (
    <div className="flex items-center">
      {menuItems.map((itemLv1, indexLv1) => (
        <div
          key={indexLv1}
          className="px-4 py-3 cursor-pointer relative hover:bg-sky-700 transition group/lv1 item-level-1 border-r border-white"
        >
          <FormattedMessage id={itemLv1.name} />
          <div className="hidden absolute top-full left-0 w-[250px] bg-section_bg text-normal_text custom-shadow group-hover/lv1:block">
            {itemLv1.menus.map((itemLv2, indexLv2) => (
              <Link
                to={itemLv2.link}
                key={indexLv2}
                className={`block group/lv2 px-4 py-3 relative hover:text-admin_main_color item-level-2 ${
                  pathname.includes(itemLv2.link) && "text-admin_main_color"
                }`}
              >
                <FormattedMessage id={`adminheader.admin.${itemLv2.name}`} />
                <div className="absolute top-0 left-[100%] bg-section_bg text-normal_text group-hover/lv2:visible z-[100] items-block-level-3 custom-shadow">
                  {itemLv2?.subMenus
                    ? itemLv2?.subMenus?.map((itemLv3, indexLv3) => (
                        <Link
                          to={itemLv3.link}
                          key={indexLv3}
                          className={`block px-4 py-3 hover:text-admin_main_color w-max ${
                            pathname === itemLv3.link && "text-admin_main_color"
                          }`}
                        >
                          <FormattedMessage
                            id={`menu.system.system-administrator.${itemLv3.name}`}
                          />
                        </Link>
                      ))
                    : null}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminNavigator;
