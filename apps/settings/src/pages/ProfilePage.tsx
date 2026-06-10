import { PageLayout, PageHeader, Card } from "@platform/ui";
import { mockUser } from "@platform/contracts";

export const ProfilePage = () => {
  return (
    <PageLayout>
      <PageHeader title="Profile" subtitle="Your account information" />
      <div style={{ maxWidth: "480px" }}>
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "#2563eb",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {mockUser.avatarInitials}
          </div>
          <div>
            <p style={{ margin: "0 0 2px 0", fontSize: "16px", fontWeight: 600, color: "#111827" }}>
              {mockUser.name}
            </p>
            <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>{mockUser.role}</p>
          </div>
        </div>
        <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <dt style={{ fontSize: "12px", fontWeight: 500, color: "#6b7280", marginBottom: "2px" }}>
              Email
            </dt>
            <dd style={{ margin: 0, fontSize: "14px", color: "#111827" }}>{mockUser.email}</dd>
          </div>
          <div>
            <dt style={{ fontSize: "12px", fontWeight: 500, color: "#6b7280", marginBottom: "2px" }}>
              Role
            </dt>
            <dd style={{ margin: 0, fontSize: "14px", color: "#111827" }}>{mockUser.role}</dd>
          </div>
        </dl>
      </Card>
      </div>
    </PageLayout>
  );
};
