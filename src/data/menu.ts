export const adminMenuItems = [
  {
    //hệ thống
    name: "menu.system.header",
    menus: [
      {
        name: "menu.system.system-administrator.header",
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
