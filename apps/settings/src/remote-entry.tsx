import { createRoot, type Root } from "react-dom/client";
import { SettingsApp } from "./SettingsApp";

const roots = new Map<HTMLElement, Root>();

function mount(container: HTMLElement) {
  const root = createRoot(container);
  root.render(<SettingsApp />);
  roots.set(container, root);
}

function unmount(container: HTMLElement) {
  const root = roots.get(container);

  if (!root) return;

  root.unmount();
  roots.delete(container);
}

window.settingsRemote = {
  mount,
  unmount,
};

declare global {
  interface Window {
    settingsRemote?: {
      mount: (container: HTMLElement) => void;
      unmount: (container: HTMLElement) => void;
    };
  }
}
