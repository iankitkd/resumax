import { NextResponse } from "next/server";
import { saveResult } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const {result} = await req.json();
    if (!result) return NextResponse.json({ error: "Missing result" }, {status: 400});

    // generate short id (UUID or crypto)
    const id = crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 9);

    const toStore = {
      feedback: result,
      createdAt: new Date().toISOString(),
    };

    await saveResult(id, JSON.stringify(toStore));

    return NextResponse.json({ id }, {status: 200});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error", err }, {status: 500});
  }
}
