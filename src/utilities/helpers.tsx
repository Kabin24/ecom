import { toast } from "react-toastify";

export enum NotifyType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export const notify = (msg: string, type: NotifyType) => {
  if (type === "success") {
    toast.success(msg);
  } else if (type === "error") {
    toast.error(msg);
  } else if (type === "warning") {
    toast.warning(msg);
  } else if (type === "info") {
    toast.info(msg);
  } else {
    toast(msg);
  }
};
