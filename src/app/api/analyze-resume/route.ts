import { NextResponse } from "next/server";

import { generateContent } from "@/lib/aiClient";
import { ANALYSIS_PROMPT, prepareAnalysisPrompt } from "@/data";

export async function POST(req: Request) {
  try {
    const { text, jobTitle, jobDescription } = await req.json();
    let fullPrompt = '';
    if(jobTitle && jobDescription) {
      const prompt = prepareAnalysisPrompt({jobTitle, jobDescription});
      fullPrompt = `${prompt}\n\nResume Text: ${text}`;
    } else {
      fullPrompt = `${ANALYSIS_PROMPT}\n\nResume Text: ${text}`;
    }

    const rawString = await generateContent(fullPrompt);
    const data = rawString?.replace(/```json|```/g, "").trim();
    
    return NextResponse.json({ data },{ status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong while analysing.", error },
      { status: 500 }
    );
  }
}
