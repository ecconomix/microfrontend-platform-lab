import { createRoot, type Root } from "react-dom/client";
import { DashboardApp } from "./DashboardApp";

const roots = new Map<HTMLElement, Root>();

function mount(container: HTMLElement) {
  const root = createRoot(container);
  root.render(<DashboardApp />);
  roots.set(container, root);
}

function unmount(container: HTMLElement) {
  const root = roots.get(container);

  if (!root) {
    return;
  }

  root.unmount();
  roots.delete(container);
}

window.dashboardRemote = {
  mount,
  unmount,
};

declare global {
  interface Window {
    dashboardRemote?: {
      mount: (container: HTMLElement) => void;
      unmount: (container: HTMLElement) => void;
    };
  }
}
