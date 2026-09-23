"use client";

import { useEffect, useRef, useState } from "react";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  /** Empty string when the member has no photo set in /admin/team - the
   * card then keeps its portrait stage (so every name panel stays on one
   * baseline) but renders no image. */
  photo: string;
};

// Final Design pass (Homepage.dc.html team carousel): cards fill the track
// width instead of a fixed 200px, with a minimum card width of 220px on
// desktop and exactly one full-width card on phones.
const MIN_CARD_W = 220;
const MOBILE_BREAKPOINT = 560;
const DESKTOP_GAP = 28;
const MOBILE_GAP = 16;
const DESKTOP_STAGE_H = 360;
const MOBILE_STAGE_H = 380;
const NAME_PANEL_H = 88;

// Intrinsic size of the studio portraits in public/images/team/ - used for
// the width/height attributes so the browser reserves the aspect ratio.
const PORTRAIT_W = 1122;
const PORTRAIT_H = 1402;

/**
 * Ports the Homepage's team carousel, originally driven by a DCLogic
 * component (class Component extends DCLogic { ... }) that only runs in
 * the Design Canvas editor preview (it needs React loaded from unpkg.com at
 * runtime there). Same measure-the-track / clamp-the-index / translateX
 * logic, reimplemented as a plain React Client Component so it works in the
 * built site without that runtime dependency. Members still come from the
 * TeamMember table (lib/data/team.ts) - no roster is hardcoded here.
 */
export function TeamCarousel({ members }: { members: TeamMember[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setTrackWidth(el.clientWidth);
    measure();
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const total = members.length;
  const mobile = trackWidth > 0 && trackWidth < MOBILE_BREAKPOINT;
  const gap = mobile ? MOBILE_GAP : DESKTOP_GAP;
  const visible = mobile ? 1 : Math.min(Math.max(total, 1), Math.max(1, Math.floor((trackWidth + gap) / (MIN_CARD_W + gap))));
  const cardW = mobile ? trackWidth : trackWidth ? (trackWidth - gap * (visible - 1)) / visible : MIN_CARD_W;
  const stageH = mobile ? MOBILE_STAGE_H : DESKTOP_STAGE_H;
  const maxIndex = Math.max(0, total - visible);
  const clampedIndex = Math.min(index, maxIndex);

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        aria-label="Previous team member"
        onClick={() => setIndex((i) => Math.max(0, Math.min(i, maxIndex) - 1))}
        style={{
          position: "absolute",
          left: "-56px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "44px",
          height: "44px",
          border: "1px solid oklch(58% 0.16 45)",
          background: "oklch(97% 0.012 75)",
          color: "oklch(58% 0.16 45)",
          fontSize: "20px",
          cursor: "pointer",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ‹
      </button>
      <div id="team-track" ref={trackRef} style={{ overflow: "hidden", paddingTop: "48px" }}>
        <div
          style={{
            display: "flex",
            gap: `${gap}px`,
            transition: "transform 0.35s ease",
            transform: `translateX(-${clampedIndex * (cardW + gap)}px)`,
          }}
        >
          {members.map((member, i) => (
            <div
              key={member.id}
              data-agent={member.id}
              style={{
                flex: `0 0 ${cardW}px`,
                width: `${cardW}px`,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ position: "relative", height: `${stageH}px`, width: "100%", overflow: "hidden", background: "#fff" }}>
                {member.photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={`Portrait of ${member.name}`}
                    id={`agent-${member.id}`}
                    src={member.photo}
                    width={PORTRAIT_W}
                    height={PORTRAIT_H}
                    loading={i < visible ? "eager" : "lazy"}
                    decoding="async"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  background: "oklch(15% 0.02 250)",
                  height: `${NAME_PANEL_H}px`,
                  boxSizing: "border-box",
                  padding: "0 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-cormorant-garamond), serif",
                    fontSize: "19px",
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                    margin: "0 0 6px",
                    color: "oklch(78% 0.11 75)",
                  }}
                >
                  {member.name}
                </h4>
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "oklch(72% 0.02 60)",
                  }}
                >
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label="Next team member"
        onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
        style={{
          position: "absolute",
          right: "-56px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "44px",
          height: "44px",
          border: "1px solid oklch(58% 0.16 45)",
          background: "oklch(97% 0.012 75)",
          color: "oklch(58% 0.16 45)",
          fontSize: "20px",
          cursor: "pointer",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ›
      </button>
    </div>
  );
}
