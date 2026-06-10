import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Card title="My Card">content</Card>);
    expect(screen.getByText("My Card")).toBeInTheDocument();
  });

  it("does not render a title element when title is omitted", () => {
    render(<Card>content</Card>);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
