import dayjs, { Dayjs } from "dayjs";

export const formatDate = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  format = "YYYY/MM/DD HH:mm:ss",
) => {
  return dayjs(date).format(format);
};
