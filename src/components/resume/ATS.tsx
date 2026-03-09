import Icon from "../Icon";
import TipIcon from "../shared/TipIcon";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

export default function ATS ({ score, suggestions } : ATSProps) {
  // Determine background gradient based on score
  const gradientClass =
    score > 69 ? "from-success/20"
    : score > 49 ? "from-warning/20"
    : "from-danger/20";

  const borderClass =
   score > 69 ? "border-success/30"
    : score > 49 ? "border-warning/30"
    : "border-danger/30";

  // Determine icon based on score
  const iconSrc = 
    score > 69 ? '/icons/ats-good.svg'
      : score > 49 ? '/icons/ats-warning.svg'
      : '/icons/ats-bad.svg';

  // Determine subtitle based on score
  const subtitle = 
    score > 69 ? 'Great Job!'
      : score > 49 ? 'Good Start'
      : 'Needs Improvement';

  return (
    <div className={`bg-gradient-to-b ${gradientClass} to-transparent border ${borderClass} rounded-2xl shadow-md w-full p-4`}>
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-4 mb-6">
        <img src={iconSrc} alt="ATS Score Icon" className="w-10 h-10" />
        <div>
          <h2 className="text-2xl font-bold">ATS Score - {score}/100</h2>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{subtitle}</h3>
        <p className="text-text-secondary mb-4">
          This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers.
        </p>

        {/* Suggestions list */}
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-center gap-3">
              <TipIcon tipType={suggestion.type} />
              <p className={suggestion.type === "good" ? "text-success" : "text-warning"}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing encouragement */}
      <p className="text-text-secondary text-sm italic">
        Keep refining your resume to improve your chances of getting past ATS filters and into the hands of recruiters.
      </p>
    </div>
  )
}