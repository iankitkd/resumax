"use client"

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "../ui/Button";
import Icon from "../Icon";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";

export default function Socials() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleClick = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: callbackUrl || DEFAULT_SIGNIN_REDIRECT,
    });
  };

  return (
    <div>
      <div className="relative flex items-center justify-center py-2">
        <div className="absolute top-1/2 w-40 border-t border-gray-300"></div>
        <span className="relative px-2 bg-white text-gray-500">OR</span>
      </div>

      <div className="py-1">
        <Button
          variant="outline"
          className="flex-1 py-3 w-full"
          onClick={() => handleClick("google")}
        >
          <Icon name="google" className="text-xl mr-2" />
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
