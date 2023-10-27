import { path } from "../constants";

export const adminMenuItems = [
  {
    //hệ thống
    name: "menu.system.header",
    menus: [
      {
        name: "menu.system.system-administrator.header",
        link: "/system",
        subMenus: [
          {
            name: "menu.system.system-administrator.user-manage",
            link: "/system/manage-user",
          },
          {
            name: "menu.system.system-administrator.product-manage",
            link: "/system/manage-product",
          },
          {
            name: "menu.system.system-administrator.register-package-group-or-account",
            link: "/system/register-package-group-or-account",
          },
        ],
      },

      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ],
  },
];

export const rootMenuItems = [
  { title: "speciality", subtitle: "find-doctor", link: path.SPECIALITY },
  { title: "health-facility", subtitle: "find-clinic", link: path.FACILITY },
  { title: "doctor", subtitle: "choose-doctor", link: path.DOCTOR },
  { title: "package-fee", subtitle: "check-health", link: path.PACKAGE },
];
