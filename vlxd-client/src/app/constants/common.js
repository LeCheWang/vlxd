import { GiConcentricCrescents } from "react-icons/gi";
import { FcMoneyTransfer } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { CiMoneyBill, CiViewList } from "react-icons/ci";

export const DEFAULT_DATE_FORMAT = "D/MM/YYYY";
export const DEFAULT_MINUTES_SECONDS_FORMAT = "mm:ss";
export const DEFAULT_DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm:ss";

export const ACCESS_TOKEN_KEY = "access_token";

export const PathnameUrl = {
  DELIVERY_HISTORY_MANAGEMENT: "delivery-history",
  ACCOUNT_MANAGEMENT: "account-management",
  AGENCY_MANAGEMENT: "agency-management",
  PRODUCT_MANAGEMENT: "product-management",
  EXPENSE_MANAGEMENT: "expense-management",
  ADMIN: "admin",
  HOME: "",
};

export const LabelAdmin = {
  DELIVERY_HISTORY_MANAGEMENT: "Thống Kê",
  ACCOUNT_MANAGEMENT: "Tài Khoản",
  AGENCY_MANAGEMENT: "Đại Lý",
  PRODUCT_MANAGEMENT: "Mặt Hàng",
  HOME: "Home",
  EXPENSE_MANAGEMENT: "Chi phí",
};

export const MenuAdmin = [
  {
    linkTo: "/admin/" + PathnameUrl.DELIVERY_HISTORY_MANAGEMENT,
    icon: <GiConcentricCrescents />,
    label: LabelAdmin.DELIVERY_HISTORY_MANAGEMENT,
  },
  {
    linkTo: "/admin/" + PathnameUrl.EXPENSE_MANAGEMENT,
    icon: <CiMoneyBill />,
    label: LabelAdmin.EXPENSE_MANAGEMENT,
  },
  {
    linkTo: "/admin/" + PathnameUrl.ACCOUNT_MANAGEMENT,
    icon: <GiConcentricCrescents />,
    label: LabelAdmin.ACCOUNT_MANAGEMENT,
  },
  {
    linkTo: "/admin/" + PathnameUrl.AGENCY_MANAGEMENT,
    icon: <GiConcentricCrescents />,
    label: LabelAdmin.AGENCY_MANAGEMENT,
  },
  {
    linkTo: "/admin/" + PathnameUrl.PRODUCT_MANAGEMENT,
    icon: <GiConcentricCrescents />,
    label: LabelAdmin.PRODUCT_MANAGEMENT,
  },
];

export const MenuDriver = [
  {
    linkTo: "/" + PathnameUrl.HOME,
    icon: <FaHome />,
    label: LabelAdmin.HOME,
  },
  {
    linkTo: "/" + PathnameUrl.DELIVERY_HISTORY_MANAGEMENT,
    icon: <CiViewList />,
    label: LabelAdmin.DELIVERY_HISTORY_MANAGEMENT,
  },
  {
    linkTo: "/expense",
    icon: <FcMoneyTransfer />,
    label: "Chi phí",
  },
];
