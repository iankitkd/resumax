import { IconType } from "react-icons";
import { CiLock } from "react-icons/ci";
import { FaInfoCircle, FaLock, FaRegMinusSquare, FaRegPlusSquare, FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LuUserRound } from "react-icons/lu";
import { MdAlternateEmail, MdOutlineCancel, MdPictureAsPdf } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FiBarChart2, FiEdit, FiSearch } from "react-icons/fi";

export type IconName = "userCircle" | "user" | "email" | "lock" | "lockOutline" | "google"
  | "checkCircle" | "exclamationTriangle" | "sparkle" | "logout" | "barChart" | "search" | "edit" 
  | "plus" | "minus" | "info" | "cancel" | "pdf";

export const Icons: Record<IconName, IconType> = {
  user: LuUserRound,
  userCircle: FaUserCircle,
  email: MdAlternateEmail,
  lock: FaLock,
  lockOutline: CiLock,
  google: FcGoogle,
  checkCircle: FaCheckCircle,
  exclamationTriangle: FaExclamationTriangle,
  sparkle: IoSparkles,
  logout: MdLogout,
  barChart: FiBarChart2,
  search: FiSearch,
  edit: FiEdit,
  plus: FaRegPlusSquare,
  minus: FaRegMinusSquare,
  info: FaInfoCircle,
  cancel: MdOutlineCancel,
  pdf: MdPictureAsPdf,
};
