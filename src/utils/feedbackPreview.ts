import { Feedback } from "@/types";

export function generatePreviewText(feedback: Feedback): string {

  const tips = [
    ...feedback.ATS.tips,
    ...feedback.structure.tips,
    ...feedback.content.tips,
  ];

  const improveTip = tips.find(t => t.type === "improve");

  if (improveTip) {
    return `Score ${feedback.overallScore}. ${improveTip.tip}`;
  }

  const goodTip = tips.find(t => t.type === "good");

  if (goodTip) {
    return `Score ${feedback.overallScore}. ${goodTip.tip}`;
  }

  return `Resume score ${feedback.overallScore}.`;
}