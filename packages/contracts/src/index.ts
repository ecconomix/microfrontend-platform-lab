export { type RemoteApi } from "./remote";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
}

export interface NavigationItem {
  label: string;
  path: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
}

export interface Preference {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export const mockUser: User = {
  id: 1,
  name: "Alex Morgan",
  email: "alex.morgan@internal.company.com",
  role: "Platform Engineer",
  avatarInitials: "AM",
};

export const mockNavigation: NavigationItem[] = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Settings", path: "/settings" },
];

export const mockStats: DashboardStat[] = [
  {
    id: "deploys",
    label: "Deployments",
    value: "142",
    trend: "up",
    trendValue: "+12 this week",
  },
  {
    id: "services",
    label: "Active Services",
    value: "24",
    trend: "neutral",
    trendValue: "No change",
  },
  {
    id: "incidents",
    label: "Open Incidents",
    value: "3",
    trend: "down",
    trendValue: "-2 vs last week",
  },
  {
    id: "uptime",
    label: "Uptime",
    value: "99.8%",
    trend: "up",
    trendValue: "+0.1% vs last month",
  },
];

export const mockPreferences: Preference[] = [
  {
    id: "notifications",
    label: "Email Notifications",
    description: "Receive deployment and incident alerts by email",
    enabled: true,
  },
  {
    id: "darkMode",
    label: "Dark Mode",
    description: "Use dark color scheme across the platform",
    enabled: false,
  },
  {
    id: "betaFeatures",
    label: "Beta Features",
    description: "Opt into experimental features before general release",
    enabled: false,
  },
  {
    id: "weeklyDigest",
    label: "Weekly Digest",
    description: "Get a weekly summary of platform activity",
    enabled: true,
  },
];
