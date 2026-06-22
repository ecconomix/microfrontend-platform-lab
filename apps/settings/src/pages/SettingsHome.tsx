import { PageLayout, PageHeader, Card } from "@platform/ui";

export const SettingsHome = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "480px",
        }}
      >
        <Card title="Profile">
          <p
            style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#6b7280" }}
          >
            View and update your account information.
          </p>
          <a
            href="/settings/profile"
            style={{
              fontSize: "14px",
              color: "#2563eb",
              textDecoration: "none",
            }}
          >
            Edit profile →
          </a>
        </Card>
        <Card title="Preferences">
          <p
            style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#6b7280" }}
          >
            Configure notifications and platform behaviour.
          </p>
          <a
            href="/settings/preferences"
            style={{
              fontSize: "14px",
              color: "#2563eb",
              textDecoration: "none",
            }}
          >
            Edit preferences →
          </a>
        </Card>
      </div>
    </PageLayout>
  );
};
