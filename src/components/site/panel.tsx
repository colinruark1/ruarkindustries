import type { ReactNode } from "react";
import type { TabId } from "./nav";

/** A single tab panel. Visibility is driven by legacy.css (.tab-panel.is-active). */
export function Panel({
  id,
  active,
  children,
}: {
  id: TabId;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`tab-panel${active ? " is-active" : ""}`}
      id={id}
      data-panel={id}
      tabIndex={-1}
    >
      {children}
    </section>
  );
}
