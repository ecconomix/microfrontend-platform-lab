import { PageLayout, PageHeader } from "@platform/ui";
import { mockPreferences } from "@platform/contracts";

export const PreferencesPage = () => {
  return (
    <PageLayout>
      <PageHeader title="Preferences" subtitle="Configure your platform experience" />
      <div style={{ display: "flex", flexDirection: "column", gap: "1px", maxWidth: "560px" }}>
        {mockPreferences.map((pref) => (
          <div
            key={pref.id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "16px",
              padding: "16px",
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              marginBottom: "8px",
            }}
          >
            <div>
              <p style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: 600, color: "#111827" }}>
                {pref.label}
              </p>
              <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
                {pref.description}
              </p>
            </div>
            <span
              style={{
                flexShrink: 0,
                fontSize: "12px",
                fontWeight: 500,
                padding: "2px 8px",
                borderRadius: "12px",
                backgroundColor: pref.enabled ? "#dcfce7" : "#f3f4f6",
                color: pref.enabled ? "#16a34a" : "#6b7280",
              }}
            >
              {pref.enabled ? "On" : "Off"}
            </span>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};
