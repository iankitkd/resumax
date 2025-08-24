import { cn } from "@/lib/utils";
import TipIcon from "./TipIcon";

export default function ScoreBadge ({ score }: { score: number }) {
  return (
    <div className={cn(
        "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
        score > 69 ? "bg-green-100"
          : score > 39 ? "bg-yellow-100"
          : "bg-red-100"
      )}
    >
      <TipIcon tipType={score > 69 ? "good" : score > 39 ? "improve" : "bad"} />
      <p className={cn(
          "text-sm font-medium",
          score > 69 ? "text-green-600"
            : score > 39 ? "text-yellow-600"
            : "text-red-600"
        )}
      >
        {score}/100
      </p>
    </div>
  );
};