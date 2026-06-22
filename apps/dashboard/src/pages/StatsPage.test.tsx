import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatsPage } from "./StatsPage";
import { mockStats } from "@platform/contracts";

describe("StatsPage", () => {
  it("displays all stat values", () => {
    render(<StatsPage />);

    for (const stat of mockStats) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
  });
});
