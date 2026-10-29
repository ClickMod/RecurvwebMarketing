"use client";

/**
 * DashboardMock — the ONE signature animation moment on the page.
 *
 * When it scrolls into view (prefers-reduced-motion: no-preference only):
 *  1. Revenue line draws on via stroke-dashoffset (~900ms, shared easing)
 *  2. Area fill fades in behind it after the line starts (~600ms delay)
 *  3. Revenue headline counts up to its final value (~1s, ease-out cubic)
 *
 * All gated behind prefers-reduced-motion. Runs ONCE, then unobserves.
 * SSR/no-JS/reduced-motion: all elements render in their final visible state.
 */

import { useEffect, useRef, useState } from "react";
import { theme } from "./theme";
import { Logo } from "./Logo";
import { EASE } from "./motion";

const FINAL_REVENUE = 2412608;
const LINE_DURATION = 900;
const COUNTER_DURATION = 1000;
const AREA_DELAY = 600;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function fmtRevenue(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function DashboardMock() {
  const t = theme;

  const rev = [140, 162, 158, 184, 196, 215, 232, 248, 264, 281, 305, 322];
  const max = Math.max(...rev);
  const min = Math.min(...rev);
  const points = rev.map((v, i) => {
    const x = (i / (rev.length - 1)) * 580 + 30;
    const y = 180 - ((v - min) / (max - min)) * 140 - 10;
    return [x, y];
  });
  const pathD = points
    .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
    .join(" ");
  const areaD = `${pathD} L ${points[points.length - 1][0]} 180 L ${points[0][0]} 180 Z`;

  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const hasAnimated = useRef(false);

  // Default to the final value so SSR and reduced-motion environments show the real number.
  const [revenue, setRevenue] = useState(FINAL_REVENUE);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    const area = areaRef.current;
    if (!container || !line || !area) return;

    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;

    // Set initial hidden state for line and area (JS-only; SSR renders final state).
    line.style.strokeDasharray = "1";
    line.style.strokeDashoffset = "1";
    line.style.transition = `stroke-dashoffset ${LINE_DURATION}ms ${EASE}`;

    area.style.opacity = "0";
    area.style.transition = `opacity 500ms ${EASE} ${AREA_DELAY}ms`;

    // Revenue starts at 0 for the counter animation.
    setRevenue(0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            // 1. Draw the revenue line.
            requestAnimationFrame(() => {
              line.style.strokeDashoffset = "0";
            });

            // 2. Fade in the area fill.
            requestAnimationFrame(() => {
              area.style.opacity = "1";
            });

            // 3. Count up the headline revenue figure.
            const start = performance.now();
            function tick(now: number) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / COUNTER_DURATION, 1);
              setRevenue(easeOutCubic(progress) * FINAL_REVENUE);
              if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);

            observer.unobserve(container);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        background: t.surface,
        borderRadius: 12,
        boxShadow:
          "0 30px 80px -20px rgba(15,12,30,0.20), 0 2px 8px rgba(15,12,30,0.06)",
        border: `1px solid ${t.line}`,
        overflow: "hidden",
        color: t.ink,
        fontFamily: t.fontBody,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 18px",
          borderBottom: `1px solid ${t.line}`,
          background: t.surface,
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <Logo color={t.ink} accent={t.primary} size={18} />
        <div
          className="hidden md:flex"
          style={{
            marginLeft: 16,
            gap: 22,
            fontSize: 12,
            color: t.inkSoft,
          }}
        >
          <span style={{ color: t.ink, fontWeight: 600 }}>Overview</span>
          <span>Plans</span>
          <span>Customers</span>
          <span>Reports</span>
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: t.success,
              display: "block",
            }}
          />
          <span
            className="mono"
            style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 0.5 }}
          >
            SAMPLE DASHBOARD · ZAR
          </span>
        </div>
      </div>

      <div style={{ padding: "24px 24px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px 12px",
            minWidth: 0,
          }}
        >
          <div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: t.inkSoft,
                letterSpacing: 1,
                marginBottom: 6,
              }}
            >
              ILLUSTRATIVE DASHBOARD PREVIEW · NOT CUSTOMER DATA
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span
                style={{
                  fontFamily: t.fontDisplay,
                  fontSize: 40,
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                R {fmtRevenue(revenue)}
              </span>
              <span style={{ fontSize: 13, color: t.success, fontWeight: 600 }}>
                ↑ 12.4%
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["1M", "3M", "12M", "YTD"].map((p, i) => (
              <span
                key={p}
                className="mono"
                style={{
                  fontSize: 11,
                  padding: "5px 10px",
                  borderRadius: 999,
                  background: i === 2 ? t.ink : "transparent",
                  color: i === 2 ? t.surface : t.inkSoft,
                  border: i === 2 ? "none" : `1px solid ${t.line}`,
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <svg
          viewBox="0 0 640 200"
          width="100%"
          height="170"
          preserveAspectRatio="none"
          style={{ marginTop: 14 }}
        >
          <defs>
            <linearGradient id="dash-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={t.primary} stopOpacity="0.18" />
              <stop offset="100%" stopColor={t.primary} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="20"
              x2="620"
              y1={30 + i * 40}
              y2={30 + i * 40}
              stroke={t.line}
              strokeDasharray="2 4"
            />
          ))}
          {/* Area fill — fades in behind the line */}
          <path ref={areaRef} d={areaD} fill="url(#dash-grad)" />
          {/* Revenue line — draws on via stroke-dashoffset */}
          <path
            ref={lineRef}
            d={pathD}
            pathLength={1}
            stroke={t.primary}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p[0]}
              cy={p[1]}
              r={i === points.length - 1 ? 5 : 2.5}
              fill={t.primary}
              stroke={i === points.length - 1 ? t.surface : "none"}
              strokeWidth={i === points.length - 1 ? 3 : 0}
            />
          ))}
        </svg>

        <div
          className="grid grid-cols-3 gap-px mt-[14px] rounded-lg overflow-hidden"
          style={{
            background: t.line,
            border: `1px solid ${t.line}`,
          }}
        >
          {[
            ["ACTIVE PLANS", "1,284", "+38 wk"],
            ["SAMPLE SUCCESS RATE", "—", "ILLUSTRATIVE"],
            ["AVG. CYCLE", "28 days", "unchanged"],
          ].map(([l, v, d], i) => (
            <div
              key={l}
              style={{
                background: t.surface,
                padding: "14px 14px",
                borderRadius:
                  i === 0 ? "8px 0 0 8px" : i === 2 ? "0 8px 8px 0" : 0,
              }}
            >
              <div
                className="mono"
                style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1 }}
              >
                {l}
              </div>
              <div
                style={{
                  fontFamily: t.fontDisplay,
                  fontSize: 22,
                  fontWeight: 500,
                  marginTop: 6,
                  letterSpacing: "-0.02em",
                }}
              >
                {v}
              </div>
              <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 2 }}>
                {d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
