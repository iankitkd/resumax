import Link from "next/link";

import Icon from "../Icon";
import Socials from "./Socials";

interface AuthFormWrapperProps {
  children: React.ReactNode;
  showSocials: boolean;
  label: string;
  desciption?: string;
  backButtonLabel: string;
  backButtonDescription: string;
  backButtonHref: string;
}

export default function AuthFormWrapper({
  children,
  label,
  desciption,
  backButtonLabel,
  backButtonDescription,
  backButtonHref,
  showSocials = false,
}: AuthFormWrapperProps) {

  return (
    <div className="w-full min-h-screen md:min-h-full max-w-md bg-white rounded-2xl p-8">
      <div className="text-center mb-4">
        <div className="mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 w-14 h-14 rounded-full flex items-center justify-center mb-2">
          <Icon name="lock" className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{label}</h1>
        <p className="text-gray-600 mt-2">{desciption}</p>
      </div>

      {children}

      {showSocials && (
        <Socials />
      )}

      <div className="flex justify-center gap-2 text-sm mt-6">
        <span className="text-gray-600">{backButtonDescription}</span>
        <Link href={backButtonHref} className="text-indigo-600 hover:underline hover:text-indigo-800 transition">{backButtonLabel}</Link>
      </div>
    </div>
  );
}
