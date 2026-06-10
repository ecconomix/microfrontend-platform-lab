import { Link } from "react-router-dom";
import { PageLayout, PageHeader, Card } from "@platform/ui";
import { mockUser } from "@platform/contracts";

export const HomePage = () => {
  return (
    <PageLayout>
      <PageHeader
        title={`Welcome, ${mockUser.name}`}
        subtitle="Internal admin platform — select an app to get started"
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Card title="Dashboard">
          <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "#6b7280" }}>
            View deployment stats, active services, and incident overview.
          </p>
          <Link
            to="/dashboard"
            style={{ fontSize: "14px", color: "#2563eb", textDecoration: "none" }}
          >
            Go to Dashboard →
          </Link>
        </Card>
        <Card title="Settings">
          <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "#6b7280" }}>
            Manage your profile and configure platform preferences.
          </p>
          <Link
            to="/settings"
            style={{ fontSize: "14px", color: "#2563eb", textDecoration: "none" }}
          >
            Go to Settings →
          </Link>
        </Card>
      </div>
    </PageLayout>
  );
};
