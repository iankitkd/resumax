import { NextResponse } from "next/server";

import { generateContent } from "@/lib/aiClient";
import { ANALYSIS_PROMPT } from "@/data";

export async function POST(req: Request) {
  try {
    const { text } = await req.json()
    const fullPrompt = `${ANALYSIS_PROMPT}\n\nResume Text: ${text}`;
    const res = await generateContent(fullPrompt);
    console.log(res, "res")
    return NextResponse.json({ data: res },{ status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong while analysing.", error },
      { status: 500 }
    );
  }
}
