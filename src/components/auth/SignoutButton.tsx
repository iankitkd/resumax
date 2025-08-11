"use client";

import { Button } from "../ui/Button";
import { signOut } from "next-auth/react";

export default function SignoutButton() {
  return (
    <Button
      variant="outline"
      className="px-6 py-1"
      onClick={() => signOut()}
    >
      Logout
    </Button>
  );
}
