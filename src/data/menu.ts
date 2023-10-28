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

export const menuSidebarItems = [
  { title: "home", link: path.HOME },
  { title: "handbook", link: path.HANDBOOK },
  { title: "co-operate", link: path.CO_OPERATE },
  { title: "company", link: path.FOR_COMPANY },
  { title: "company-package", link: path.PACKAGE_FOR_COMPANY },
  { title: "hire", link: path.HIRE },
  { title: "for-patient", link: path.FOR_PATIENT },
  { title: "for-doctor", link: path.FOR_DOCTOR },
  { title: "role", link: path.ROLE },
  { title: "contact", link: path.CONTACT },
  { title: "faq", link: path.FAQ },
  { title: "terms", link: path.TERMS },
  { title: "complain", link: path.COMPLAIN },
  { title: "procedure", link: path.PROCEDURE },
];

export const categoryMenuItems = [
  {
    title: "specialized-checkup",
    image: "icon-kham-chuyen-khoa",
    link: path.SPECIALITY,
  },
  {
    title: "remote-checkup",
    image: "icon-kham-tu-xa",
    link: path.REMOTE_CHECKUP,
  },
  {
    title: "general-checkup",
    image: "icon-kham-tong-quan",
    link: path.PACKAGE,
  },
  {
    title: "diagnosis",
    image: "icon-xet-nghiem-y-hoc",
    link: path.DIAGNOSIS,
  },
  {
    title: "mental",
    image: "icon-suc-khoe-tinh-than",
    link: path.MENTAL,
  },
  {
    title: "dentist",
    image: "icon-kham-nha-khoa",
    link: path.DENTIST,
  },
  {
    title: "surgery-package",
    image: "icon-goi-phau-thuat",
    link: path.SURGERY,
  },
  {
    title: "diabetes",
    image: "icon-song-khoe-tieu-duong",
    link: path.DIABETES,
  },
  {
    title: "health-test",
    image: "icon-bai-test-suc-khoe",
    link: path.TEST,
  },
  {
    title: "near-facilities",
    image: "icon-y-te-gan-ban",
    link: path.NEAR_FACILITIES,
  },
];

export const footerMenuItems = [
  ...menuSidebarItems.slice(2, 6),
  { title: "directory", link: path.DIRECTORY },
  ...menuSidebarItems.slice(10),
  { title: "privacy", link: path.PRIVACY },
];
