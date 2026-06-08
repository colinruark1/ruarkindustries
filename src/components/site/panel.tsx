import type { ReactNode } from "react";
import type { TabId } from "./nav";

/**
 * A single section panel. Each section is its own route, so the panel is always
 * shown; legacy.css (.tab-panel) handles spacing and the mount fade.
 */
export function Panel({ id, children }: { id: TabId; children: ReactNode }) {
  return (
    <section className="tab-panel is-active" id={id} data-panel={id} tabIndex={-1}>
      {children}
    </section>
  );
}
