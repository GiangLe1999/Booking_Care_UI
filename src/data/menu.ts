import { path } from "../constants";

type AdminMenuItems = {
  name: string;
  menus: {
    name: string;
    link: string;
    subMenus?: { name: string; link: string }[];
  }[];
}[];

export const adminMenuItems: AdminMenuItems = [
  {
    name: "adminheader.admin.user",
    menus: [
      {
        name: "manage-general-user",
        link: path.MANAGE_USER,
      },
      {
        name: "manage-doctor",
        link: path.MANAGE_DOCTOR,
      },

      {
        name: "manage-admin",
        link: "/system/system-parameter",
      },
    ],
  },

  {
    name: "adminheader.admin.clinic",
    menus: [
      {
        name: "manage-clinic",
        link: path.MANAGE_CLINIC,
      },
    ],
  },

  {
    name: "adminheader.admin.specialty",
    menus: [
      {
        name: "manage-specialty",
        link: path.MANAGE_SPECIALTY,
      },
    ],
  },

  {
    name: "adminheader.admin.article",
    menus: [
      {
        name: "manage-handbook",
        link: path.MANAGE_HANDBOOK,
      },
      {
        name: "manage-longlive",
        link: path.MANAGE_LONGLIVE,
      },
      {
        name: "manage-tips",
        link: path.MANAGE_TIPS,
      },
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

export const doctorMenuItems: AdminMenuItems = [
  {
    name: "adminheader.admin.user",
    menus: [
      {
        name: "manage-schedule",
        link: path.MANAGE_SCHEDULE,
      },
      {
        name: "manage-patient",
        link: path.MANAGE_PATIENT,
      },
    ],
  },
];

export const mediaItems = [
  {
    logo: "vtv1",
    link: "https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm",
  },
  {
    logo: "ictnews",
    link: "https://vietnamnet.vn/thong-tin-truyen-thong",
  },
  {
    logo: "vnexpress",
    link: "https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html",
  },
  {
    logo: "vtcnewslogo",
    link: "https://vtc.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html",
  },
  {
    logo: "cuc-cong-nghe-thong-tin-bo-y-te-2",
    link: "https://ehealth.gov.vn/?action=News&amp;newsId=46094",
  },
  {
    logo: "infonet",
    link: "https://infonet.vietnamnet.vn/da-co-hon-20000-luot-benh-nhan-dat-lich-kham-qua-bookingcare-175080.html",
  },
  {
    logo: "vtv1",
    link: "https://vtv.vn/video/ca-phe-khoi-nghiep-16-8-2018-317687.htm",
  },
  {
    logo: "dantri",
    link: "https://dantri.com.vn/nhan-tai-dat-viet/san-pham-nen-tang-dat-kham-booking-care-201908201625624751.htm",
  },
];
