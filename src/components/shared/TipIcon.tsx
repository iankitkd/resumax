import Icon from "../Icon";

export default function TipIcon({ tipType, size=4 }: { tipType: "good" | "improve" | "bad", size?: number }) {
  return (
    <div className={`size-${size}`}>
      {tipType == "good" ? (
        <Icon name="checkCircle" className="text-green-700" />
      ) : tipType == "improve" ? (
        <Icon name="exclamationTriangle" className="text-yellow-700" />
      ): (
        <Icon name="exclamationTriangle" className="text-red-700" />
      )}
    </div>
  );
}
