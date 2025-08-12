"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import SignoutModal from "./SignoutModal";
import Icon from "../Icon";

export default function SignoutButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="flex gap-1 items-center cursor-pointer font-medium text-lg"
      >
        <Icon name="logout" />
        Logout
      </div>

      {isOpen && (
        <SignoutModal 
          close={() => setIsOpen(false)} 
          handleSignout={() => signOut()}
        />
      )}
    </>
  );
}
