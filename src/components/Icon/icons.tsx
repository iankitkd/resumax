import { IconType } from "react-icons";
import { CiLock } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LuUserRound } from "react-icons/lu";
import { MdAlternateEmail } from "react-icons/md";

export type IconName = "user" | "email" | "lock" | "lockOutline" | "google";

export const Icons: Record<IconName, IconType> = {
  user: LuUserRound,
  email: MdAlternateEmail,
  lock: FaLock,
  lockOutline: CiLock,
  google: FcGoogle,
};
