import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

import SignoutButton from "@/components/auth/SignoutButton";
import Icon from "@/components/Icon";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const { user } = session;

  return (
    <div className="max-w-5xl mx-auto py-4">
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden">
          {user.image ? (
            <Image
              src={user.image}
              alt={`${user.name}'s profile picture`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 96px, 128px"
              priority
            />
          ) : (
            <Icon name="userCircle" className="h-full w-full text-gray-300" />
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
          <p className="mt-2 opacity-90">{user.email}</p>
        </div>

        <div className="">
          <SignoutButton />
        </div>
      </div>
    </div>
  );
}
