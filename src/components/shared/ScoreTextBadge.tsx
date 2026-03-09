
export default function ScoreTextBadge({ score }: {score: number}) {
  let badgeColor = '';
  let badgeText = '';

  if (score > 70) {
    badgeColor = 'bg-success/20 text-success';
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeColor = 'bg-warning/20 text-warning';
    badgeText = 'Good Start';
  } else {
    badgeColor = 'bg-danger/20 text-danger';
    badgeText = 'Needs Work';
  }

  return (
    <div className={`px-3 py-1 rounded-full w-fit ${badgeColor}`}>
      <p className="text-sm font-medium">{badgeText}</p>
    </div>
  );
};