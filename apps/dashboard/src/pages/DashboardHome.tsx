import { Link } from "react-router-dom";
import { PageLayout, PageHeader, Card } from "@platform/ui";
import { mockStats } from "@platform/contracts";

export const DashboardHome = () => {
  return (
    <PageLayout>
      <PageHeader title="Dashboard" subtitle="Platform health at a glance" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {mockStats.map((stat) => (
          <Card key={stat.id}>
            <p style={{ margin: "0 0 4px 0", fontSize: "13px", color: "#6b7280", fontWeight: 500 }}>
              {stat.label}
            </p>
            <p style={{ margin: "0 0 4px 0", fontSize: "28px", fontWeight: 700, color: "#111827" }}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>
      <Link to="/stats" style={{ fontSize: "14px", color: "#2563eb", textDecoration: "none" }}>
        View detailed stats →
      </Link>
    </PageLayout>
  );
};
