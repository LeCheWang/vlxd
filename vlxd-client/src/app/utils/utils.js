import { DEFAULT_DATE_TIME_FORMAT } from "../constants/common";
import dayjs from "dayjs";

export const formatMoneyVN = (money, options) => {
  return Intl.NumberFormat("vi-VN", options).format(Number(money));
};

export const formatDate = (dateString, format = DEFAULT_DATE_TIME_FORMAT) => {
  if (dateString && dayjs(dateString).isValid()) {
    return dayjs(dateString).format(format);
  }

  return dateString;
};
