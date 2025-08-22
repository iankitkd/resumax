"use server"

import pdfParse from "pdf-parse";

export async function extractTextFromBuffer(buffer: Buffer): Promise<string> {
  try {
    const parsed = await pdfParse(buffer);
    const text = (parsed?.text || "").trim();

    // can add OCR fallback

    return text;
  } catch (err) {
    console.log(err);
    return "";
  }
}
