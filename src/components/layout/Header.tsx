import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon";
import { Button } from "../ui/Button";

import { auth } from "@/auth";
import SignoutButton from "../auth/SignoutButton";

const APP_NAME = "Resumax AI";

export default async function Header() {
  const session = await auth();

  return (
    <header className="w-full flex justify-between items-center px-4 py-2 rounded-xl">
      <Link href={"/"}>
        <div className="flex gap-2 items-center text-2xl font-semibold">
          <span>
            <Icon name="sparkle" className="text-indigo-500" />
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            {APP_NAME}
          </span>
        </div>
      </Link>

      {session?.user ? (
        <>
        <Link href={"/profile"}>
          <div className="rounded-full h-8 w-8">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt="Profile Image"
                width={32}
                height={32}
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <Icon name="userCircle" className="h-full w-full" />
            )}
          </div>
        </Link>
          <SignoutButton />
          </>
      ) : (
        <Link href={"/login"}>
          <Button variant="gradient" className="px-6 py-1">Login</Button>
        </Link>
      )}
    </header>
  );
}
