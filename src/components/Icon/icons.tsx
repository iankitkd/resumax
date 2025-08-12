import { IconType } from "react-icons";
import { CiLock } from "react-icons/ci";
import { FaLock, FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LuUserRound } from "react-icons/lu";
import { MdAlternateEmail } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

export type IconName = "userCircle" | "user" | "email" | "lock" | "lockOutline" | "google" | "checkCircle" | "exclamationTriangle" | "sparkle" | "logout";

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
};
