import { GoogleGenAI } from "@google/genai";

import { GEMINI_API_KEY } from "./env";

export async function generateContent(prompt: string) {
  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.log(error);
  }
}