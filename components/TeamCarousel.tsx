"use client";

import { useEffect, useRef, useState } from "react";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo: string;
};

const CARD_W = 200;
const GAP = 16;

/**
 * Ports the Homepage's team carousel, originally driven by a DCLogic
 * component (class Component extends DCLogic { ... }) that only runs in
 * the Design Canvas editor preview (it needs React loaded from unpkg.com at
 * runtime there). Same measure-the-track / clamp-the-index / translateX
 * logic, reimplemented as a plain React Client Component so it works in the
 * built site without that runtime dependency.
 */
export function TeamCarousel({ members }: { members: TeamMember[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setTrackWidth(trackRef.current.clientWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const step = CARD_W + GAP;
  const visible = Math.max(1, Math.floor((trackWidth + GAP) / step));
  const maxIndex = Math.max(0, members.length - visible);
  const clampedIndex = Math.min(index, maxIndex);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIndex((i) => Math.max(0, i - 1))}
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
      <div id="team-track" ref={trackRef} style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            gap: "16px",
            transition: "transform 0.35s ease",
            transform: `translateX(-${clampedIndex * step}px)`,
          }}
        >
          {members.map((member) => (
            <div
              key={member.id}
              style={{
                flex: "0 0 200px",
                width: "200px",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Full-length portrait"
                id={`agent-${member.id}`}
                src={member.photo}
                style={{
                  width: "200px",
                  height: "380px",
                  display: "block",
                  boxSizing: "border-box",
                }}
              />
              <div
                style={{
                  background: "oklch(15% 0.02 250)",
                  padding: "20px 12px",
                  textAlign: "center",
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-cormorant-garamond), serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    margin: "0 0 5px",
                    color: "oklch(78% 0.11 75)",
                  }}
                >
                  {member.name}
                </h4>
                <span style={{ fontSize: "11px", color: "oklch(70% 0.02 60)" }}>
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
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
