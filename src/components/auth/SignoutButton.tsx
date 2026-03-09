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
        className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition flex gap-1 items-center cursor-pointer font-medium"
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
