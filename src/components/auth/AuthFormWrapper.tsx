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
    <div className="w-full min-h-screen md:min-h-full max-w-md bg-card rounded-2xl p-8">
      <div className="text-center mb-4">
        <div className="mx-auto bg-gradient-to-r from-accent to-accent-secondary w-14 h-14 rounded-full flex items-center justify-center mb-2">
          <Icon name="lock" className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-text-primary">{label}</h1>
        <p className="text-text-secondary mt-2">{desciption}</p>
      </div>

      {children}

      {showSocials && (
        <Socials />
      )}

      <div className="flex justify-center gap-2 text-sm mt-6">
        <span className="text-text-secondary">{backButtonDescription}</span>
        <Link href={backButtonHref} className="text-accent hover:underline hover:accent-accent-secondary transition">{backButtonLabel}</Link>
      </div>
    </div>
  );
}
