import { auth } from "@/auth";
import React from "react";

export default async function page() {
  const session = await auth();
  return <div>{JSON.stringify(session?.user)}</div>;
}
