interface EmptyStateProps {
  title: string;
  description?: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "48px 24px",
        color: "#6b7280",
      }}
    >
      <p
        style={{
          margin: "0 0 8px 0",
          fontSize: "16px",
          fontWeight: 600,
          color: "#374151",
        }}
      >
        {title}
      </p>
      {description && (
        <p style={{ margin: 0, fontSize: "14px" }}>{description}</p>
      )}
    </div>
  );
};
