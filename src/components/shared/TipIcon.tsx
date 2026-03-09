import Icon from "../Icon";

export default function TipIcon({ tipType, size=4 }: { tipType: "good" | "improve" | "bad", size?: number }) {
  return (
    <div className={`size-${size}`}>
      {tipType == "good" ? (
        <Icon name="checkCircle" className="text-success" />
      ) : tipType == "improve" ? (
        <Icon name="exclamationTriangle" className="text-warning" />
      ): (
        <Icon name="exclamationTriangle" className="text-danger" />
      )}
    </div>
  );
}
