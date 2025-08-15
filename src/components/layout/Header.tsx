import Link from "next/link";
import Icon from "../Icon";
import { Button } from "../ui/Button";
import MobileNav from "./MobileNav";

import { auth } from "@/auth";
import { APP_NAME, navItems } from "@/data";


export default async function Header() {
  const session = await auth();
  const user = session?.user;
  const isLoggedIn = !!user;

  return (
    <header className="w-full sticky top-0 z-20 flex justify-between items-center px-4 md:px-8 py-2 rounded-b-2xl bg-gradient-to-r from-indigo-100 to-purple-300">
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

      <nav className="hidden md:flex items-center space-x-10">
        {navItems.map((item) => (
          <Link 
            key={item.name}
            href={item.href}
            className="text-gray-900 font-medium text-lg hover:text-indigo-800 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {user ? (
        <Link href={"/profile"} className="hidden md:block">
          <Button variant="gradient" className="px-6 py-1 text-xl">Profile</Button>
        </Link>
      ) : (
        <Link href={"/login"} className="hidden md:block">
          <Button variant="gradient" className="px-6 py-1 text-xl">Login</Button>
        </Link>
      )}

      {/* Mobile nav button */}
      <MobileNav isLoggedIn={isLoggedIn} />
    </header>
  );
}
