import { cn } from "@/lib/utils";
import TipIcon from "./TipIcon";

export default function ScoreBadge ({ score }: { score: number }) {
  return (
    <div className={cn(
        "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
        score > 69 ? "bg-success/20"
          : score > 39 ? "bg-warning/20"
          : "bg-danger/20"
      )}
    >
      <TipIcon tipType={score > 69 ? "good" : score > 39 ? "improve" : "bad"} />
      <p className={cn(
          "text-sm font-medium",
          score > 69 ? "text-success"
            : score > 39 ? "text-warning"
            : "text-danger"
        )}
      >
        {score}/100
      </p>
    </div>
  );
};