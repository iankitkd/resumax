import { NextResponse } from "next/server";
import { saveResult } from "@/lib/store";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const {result, imageUrl} = await req.json();
    if (!result) return NextResponse.json({ error: "Missing result" }, {status: 400});

    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    // const id = crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 9);
    const id = await saveResult(result, imageUrl, userId);

    return NextResponse.json({ id }, {status: 200});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error", err }, {status: 500});
  }
}