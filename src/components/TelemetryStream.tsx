"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

/* ------------------------------------------------------------------
   Ambient telemetry instrument panel.

   The stream is SYNTHETIC and deterministic (seeded hash, no Math.random)
   so server and client render identically and nothing real is implied.
   The caption says so on the page — this illustrates the shape of the
   work, it is not production data.

   Color roles (validated against the #050505 surface):
     series   #059669  in the dark lightness band, >= 3:1
     anomaly  #d03b3b  status:critical
   Their CVD separation sits in the warn band, so anomalies ALSO carry
   secondary encoding: a surface ring, a dropline, and a text label.
   ------------------------------------------------------------------ */

const W = 760;
const H = 268;
const PAD = { top: 26, right: 14, bottom: 46, left: 14 };
const PLOT_H = H - PAD.top - PAD.bottom;
const PLOT_W = W - PAD.left - PAD.right;
const VISIBLE = 150;
const STEP = PLOT_W / (VISIBLE - 1);
const DOMAIN: [number, number] = [12, 108];
const SPEED = 8.5; // samples per second

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const isAnomaly = (i: number) => i > 6 && hash(i * 1.37 + 9.1) > 0.977;

const sample = (i: number) => {
  const seasonal =
    Math.sin(i / 15.5) * 11 + Math.sin(i / 6.1 + 1.2) * 5.5 + Math.sin(i / 41) * 6;
  const noise = (hash(i) - 0.5) * 6;
  const base = 46 + seasonal + noise;
  return isAnomaly(i) ? base + 26 + hash(i * 3.3) * 13 : base;
};

const toY = (v: number) =>
  PAD.top + PLOT_H * (1 - (v - DOMAIN[0]) / (DOMAIN[1] - DOMAIN[0]));

/** Motion preference read as an external store, so nothing sets state in an effect body. */
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;
const getReducedOnServer = () => false;

/** A settled window that happens to contain anomalies — shown when motion is reduced. */
const STILL_OFFSET = 220;

export function TelemetryStream() {
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedOnServer);
  const [offset, setOffset] = useState(0);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (reduced) return;

    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      acc += dt;
      // cap at ~30fps of state churn; the motion still reads as continuous
      if (acc >= 1 / 30) {
        setOffset((v) => v + acc * SPEED);
        acc = 0;
      }
      frame.current = requestAnimationFrame(loop);
    };
    frame.current = requestAnimationFrame(loop);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [reduced]);

  const view = reduced ? STILL_OFFSET : offset;

  const { linePath, areaPath, anomalies, flagged } = useMemo(() => {
    const i0 = Math.floor(view);
    const frac = view - i0;
    const pts: { x: number; y: number; i: number; v: number }[] = [];

    for (let k = -1; k <= VISIBLE; k++) {
      const gi = i0 + k;
      const v = sample(gi);
      pts.push({ x: PAD.left + k * STEP - frac * STEP, y: toY(v), i: gi, v });
    }

    const d = pts
      .map((p, idx) => `${idx === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
      .join(" ");

    const first = pts[0];
    const last = pts[pts.length - 1];
    const area = `${d} L${last.x.toFixed(2)},${(PAD.top + PLOT_H).toFixed(2)} L${first.x.toFixed(
      2,
    )},${(PAD.top + PLOT_H).toFixed(2)} Z`;

    const anoms = pts.filter(
      (p) => isAnomaly(p.i) && p.x > PAD.left - 4 && p.x < W - PAD.right + 4,
    );

    return { linePath: d, areaPath: area, anomalies: anoms, flagged: anoms.length };
  }, [view]);

  // Label only the most recent in-window anomaly — never every point.
  const labelled = anomalies.length ? anomalies[anomalies.length - 1] : null;

  return (
    <figure className="w-full">
      <div className="card overflow-hidden p-0">
        {/* instrument header */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
              Network telemetry — anomaly scoring
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] tabular-nums text-ink-3">
            <span>
              <span className="text-ink-3">elements </span>
              <span className="text-ink-2">118,432</span>
            </span>
            <span className="hidden sm:inline">
              <span className="text-ink-3">window </span>
              <span className="text-ink-2">24h</span>
            </span>
            <span>
              <span className="text-ink-3">flagged </span>
              <span style={{ color: "var(--viz-anomaly)" }}>{flagged}</span>
            </span>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full"
          role="img"
          aria-label={`Illustrative telemetry stream. A continuous signal with ${flagged} points currently flagged as anomalies.`}
          preserveAspectRatio="none"
          style={{ height: "clamp(200px, 30vw, 268px)" }}
        >
          <defs>
            <linearGradient id="tel-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--viz-series)" stopOpacity="0.26" />
              <stop offset="100%" stopColor="var(--viz-series)" stopOpacity="0" />
            </linearGradient>
            <clipPath id="tel-clip">
              <rect x={PAD.left} y={0} width={PLOT_W} height={H} />
            </clipPath>
          </defs>

          {/* recessive grid */}
          <g stroke="var(--viz-grid)" strokeWidth="1">
            {[0, 0.25, 0.5, 0.75, 1].map((f) => (
              <line
                key={f}
                x1={PAD.left}
                x2={W - PAD.right}
                y1={PAD.top + PLOT_H * f}
                y2={PAD.top + PLOT_H * f}
              />
            ))}
          </g>

          {/* alert threshold */}
          <line
            x1={PAD.left}
            x2={W - PAD.right}
            y1={toY(84)}
            y2={toY(84)}
            stroke="var(--viz-anomaly)"
            strokeWidth="1"
            strokeDasharray="3 5"
            opacity="0.5"
          />
          <text
            x={W - PAD.right}
            y={toY(84) - 6}
            textAnchor="end"
            className="font-mono"
            fontSize="9"
            letterSpacing="0.12em"
            fill="var(--viz-anomaly)"
            opacity="0.75"
          >
            THRESHOLD
          </text>

          <g clipPath="url(#tel-clip)">
            <path d={areaPath} fill="url(#tel-fill)" />
            <path
              d={linePath}
              fill="none"
              stroke="var(--viz-series)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* anomalies: dropline + ringed mark (shape, not colour alone) */}
            {anomalies.map((p) => (
              <g key={p.i}>
                <line
                  x1={p.x}
                  x2={p.x}
                  y1={p.y}
                  y2={PAD.top + PLOT_H}
                  stroke="var(--viz-anomaly)"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                  opacity="0.55"
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="4.5"
                  fill="var(--viz-anomaly)"
                  stroke="var(--surface)"
                  strokeWidth="2"
                />
              </g>
            ))}

            {labelled ? (
              <g transform={`translate(${labelled.x}, ${labelled.y})`}>
                <line
                  x1="0"
                  y1="-9"
                  x2="0"
                  y2="-17"
                  stroke="var(--viz-anomaly)"
                  strokeWidth="1"
                  opacity="0.8"
                />
                <text
                  x="0"
                  y="-22"
                  textAnchor="middle"
                  className="font-mono"
                  fontSize="9"
                  letterSpacing="0.14em"
                  fill="var(--viz-anomaly)"
                >
                  ANOMALY
                </text>
              </g>
            ) : null}
          </g>

          {/* live edge */}
          <line
            x1={W - PAD.right}
            x2={W - PAD.right}
            y1={PAD.top - 6}
            y2={PAD.top + PLOT_H}
            stroke="var(--accent)"
            strokeWidth="1"
            opacity="0.45"
          />

          {/* baseline */}
          <line
            x1={PAD.left}
            x2={W - PAD.right}
            y1={PAD.top + PLOT_H}
            y2={PAD.top + PLOT_H}
            stroke="#383840"
            strokeWidth="1"
          />

          {/* axis hints */}
          <text
            x={PAD.left}
            y={PAD.top + PLOT_H + 18}
            className="font-mono"
            fontSize="9"
            letterSpacing="0.14em"
            fill="#71717a"
          >
            T-24H
          </text>
          <text
            x={W - PAD.right}
            y={PAD.top + PLOT_H + 18}
            textAnchor="end"
            className="font-mono"
            fontSize="9"
            letterSpacing="0.14em"
            fill="#71717a"
          >
            NOW
          </text>
        </svg>

        {/* legend — identity carried by shape + label, never colour alone */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-4 py-3">
          <span className="flex items-center gap-2 font-mono text-[11px] text-ink-2">
            <svg width="16" height="8" aria-hidden>
              <line
                x1="0"
                y1="4"
                x2="16"
                y2="4"
                stroke="var(--viz-series)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Signal
          </span>
          <span className="flex items-center gap-2 font-mono text-[11px] text-ink-2">
            <svg width="12" height="12" aria-hidden>
              <circle
                cx="6"
                cy="6"
                r="4"
                fill="var(--viz-anomaly)"
                stroke="var(--surface)"
                strokeWidth="1.5"
              />
            </svg>
            Flagged anomaly
          </span>
          <span className="flex items-center gap-2 font-mono text-[11px] text-ink-3">
            <svg width="16" height="8" aria-hidden>
              <line
                x1="0"
                y1="4"
                x2="16"
                y2="4"
                stroke="var(--viz-anomaly)"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
            </svg>
            Threshold
          </span>
        </div>
      </div>

      <figcaption className="mt-3 text-xs leading-relaxed text-ink-3">
        Illustrative synthetic stream — not production data. It mirrors the shape of the
        real-time detection work described below, which runs over petabyte-scale telemetry
        from 100K+ distributed network elements.
      </figcaption>
    </figure>
  );
}