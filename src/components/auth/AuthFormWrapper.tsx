import Icon from "../Icon";
import { Button } from "../ui/Button";
import Link from "next/link";

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
    <div className="w-full h-dvh md:h-full max-w-md bg-white rounded-2xl p-8">
      <div className="text-center mb-4">
        <div className="mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 w-14 h-14 rounded-full flex items-center justify-center mb-2">
          <Icon name="lock" className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{label}</h1>
        <p className="text-gray-600 mt-2">{desciption}</p>
      </div>

      {children}

      {showSocials && (
        <div>
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute top-1/2 w-40 border-t border-gray-300"></div>
            <span className="relative px-2 bg-white text-gray-500">OR</span>
          </div>

          <div className="py-1">
            <Button
              variant="outline"
              className="flex-1 py-3 w-full"
              // onClick={() => socialLogin('google')}
              // disabled={loading}
            >
              <Icon name="google" className="text-xl mr-2" />
              Continue with Google
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-2 text-sm mt-6">
        <span className="text-gray-600">{backButtonDescription}</span>
        <Link href={backButtonHref} className="text-indigo-600 hover:underline hover:text-indigo-800 transition">{backButtonLabel}</Link>
      </div>
    </div>
  );
}
