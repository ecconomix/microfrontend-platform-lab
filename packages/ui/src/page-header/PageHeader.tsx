interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h1
        style={{
          margin: "0 0 4px 0",
          fontSize: "24px",
          fontWeight: 700,
          color: "#111827",
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
