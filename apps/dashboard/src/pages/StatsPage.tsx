import { PageLayout, PageHeader, StatCard } from "@platform/ui";
import { mockStats } from "@platform/contracts";

export const StatsPage = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Statistics"
        subtitle="Detailed breakdown of platform metrics"
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
        {mockStats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
            trendValue={stat.trendValue}
          />
        ))}
      </div>
    </PageLayout>
  );
};
