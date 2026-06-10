import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { PreferencesPage } from "./PreferencesPage";
import { mockPreferences } from "@platform/contracts";

describe("PreferencesPage", () => {
  it("renders all preference labels", () => {
    render(
      <MemoryRouter>
        <PreferencesPage />
      </MemoryRouter>
    );

    for (const pref of mockPreferences) {
      expect(screen.getByText(pref.label)).toBeInTheDocument();
    }
  });

  it("shows enabled/disabled state for each preference", () => {
    render(
      <MemoryRouter>
        <PreferencesPage />
      </MemoryRouter>
    );

    const enabledCount = mockPreferences.filter((p) => p.enabled).length;
    const disabledCount = mockPreferences.filter((p) => !p.enabled).length;

    expect(screen.getAllByText("On")).toHaveLength(enabledCount);
    expect(screen.getAllByText("Off")).toHaveLength(disabledCount);
  });
});
