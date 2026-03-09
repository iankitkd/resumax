import { Feedback } from "@/types";
import ScoreGauge from "../shared/ScoreGauge";
import ScoreTextBadge from "../shared/ScoreTextBadge";

export default function Summary({ feedback }: { feedback: Feedback }) {
  return (
    <div className="bg-background border border-border rounded-2xl shadow-md w-full">
      <div className="flex flex-col-reverse md:flex-row items-center p-4 md:gap-8">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Your Resume Score</h2>
          <p className="text-sm text-text-secondary">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
      <Category title="Content" score={feedback.content.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Skills" score={feedback.skills.score} />
    </div>
  );
}

function Category ({ title, score }: { title: string; score: number }) {
  const textColor =
    score > 70 ? "text-success"
    : score > 49 ? "text-warning"
    : "text-danger";

  return (
    <div className="p-2">
      <div className="flex flex-row gap-2 items-center justify-between bg-card/50 rounded-2xl p-4 w-full">
        <div className="flex flex-col md:flex-row md:gap-2 md:items-center justify-start">
          <p className="text-2xl font-medium">{title}</p>
          <ScoreTextBadge score={score} />
        </div>
        <p className="text-2xl">
          <span className={`${textColor} font-medium`}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};
