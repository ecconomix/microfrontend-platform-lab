interface StatCardProps {
  label: string;
  value: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
}

const trendColor = {
  up: "#16a34a",
  down: "#dc2626",
  neutral: "#6b7280",
};

const trendSymbol = {
  up: "↑",
  down: "↓",
  neutral: "→",
};

export const StatCard = ({ label, value, trend, trendValue }: StatCardProps) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <p
        style={{
          margin: "0 0 8px 0",
          fontSize: "13px",
          fontWeight: 500,
          color: "#6b7280",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: "0 0 8px 0",
          fontSize: "32px",
          fontWeight: 700,
          color: "#111827",
        }}
      >
        {value}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          color: trendColor[trend],
          fontWeight: 500,
        }}
      >
        {trendSymbol[trend]} {trendValue}
      </p>
    </div>
  );
};
