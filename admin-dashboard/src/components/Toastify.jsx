import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const successToast = (msg) => toast.success(msg);
const warnToast = (msg) => toast.warn(msg);
const errorToast = (msg) => toast.error(msg);
const notifyToast = (msg) => toast(msg);
export {
    successToast, warnToast, errorToast, notifyToast
};