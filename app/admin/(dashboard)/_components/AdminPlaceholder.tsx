/** Shared "module not built yet" shell used by every sidebar destination
 * that doesn't have real CRUD/editing UI yet (Phase 4C is layout/shell
 * only - see the Phase 4C report for what's deferred to later phases). */
export function AdminPlaceholder({
  title,
  description,
  stats,
}: {
  title: string;
  description?: string;
  stats?: { label: string; value: string }[];
}) {
  return (
    <div>
      <h1
        style={{
          fontFamily: "var(--font-cormorant-garamond), serif",
          fontSize: "28px",
          fontWeight: 600,
          margin: "0 0 8px",
          color: "oklch(23% 0.012 60)",
        }}
      >
        {title}
      </h1>
      <p style={{ fontSize: "14px", color: "oklch(46% 0.02 60)", margin: "0 0 28px", maxWidth: "560px" }}>
        {description ?? "This module isn't built yet - it's coming in a later phase."}
      </p>
      {stats && stats.length > 0 && (
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "28px" }}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "oklch(99% 0.004 90)",
                border: "1px solid oklch(89% 0.012 70)",
                borderRadius: "4px",
                padding: "14px 20px",
                minWidth: "160px",
              }}
            >
              <div style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(52% 0.02 60)" }}>
                {s.label}
              </div>
              <div style={{ fontFamily: "var(--font-cormorant-garamond), serif", fontSize: "22px", fontWeight: 600, marginTop: "4px" }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        style={{
          border: "1px dashed oklch(83% 0.015 70)",
          borderRadius: "4px",
          padding: "40px 24px",
          textAlign: "center",
          color: "oklch(58% 0.02 60)",
          fontSize: "13px",
        }}
      >
        Editing tools for this section are coming in a future phase.
      </div>
    </div>
  );
}
