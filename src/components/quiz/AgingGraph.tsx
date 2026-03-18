"use client";

import { useState, useEffect } from "react";

export default function AgingGraph({
  bodyAge,
  targetAge,
  actualAge,
}: {
  bodyAge: number;
  targetAge: number;
  actualAge: number;
}) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setProgress(1), 200);
    return () => clearTimeout(t);
  }, []);

  const years = 10;
  const W = 360, H = 200, padL = 44, padR = 16, padT = 24, padB = 36;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const currentPace = 1.3;
  const targetPace = 0.75;

  const points = (pace: number) => {
    const pts = [];
    for (let i = 0; i <= years; i++) {
      const x = padL + (i / years) * chartW;
      const ageAtYear = bodyAge + pace * i;
      const minAge = bodyAge - 2;
      const maxAge = bodyAge + currentPace * years + 2;
      const y = padT + chartH - ((ageAtYear - minAge) / (maxAge - minAge)) * chartH;
      pts.push(`${x},${y}`);
    }
    return pts.join(" ");
  };

  const currentLine = points(currentPace);
  const targetLine = points(targetPace);

  const len = Math.sqrt(chartW * chartW + chartH * chartH) * 1.5;
  const dashOffset = len * (1 - progress);

  // suppress unused variable warning
  void actualAge;
  void targetAge;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id="targetFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A7D7B" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3A7D7B" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="currentFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C0544E" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#C0544E" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {[0, 2, 4, 6, 8, 10].map((yr) => {
        const x = padL + (yr / years) * chartW;
        return (
          <g key={yr}>
            <line x1={x} y1={padT} x2={x} y2={padT + chartH} stroke="#E0E7E6" strokeWidth="0.5" />
            <text x={x} y={H - 8} textAnchor="middle" fill="#9AABA7" fontSize="10" fontFamily="Outfit, sans-serif">
              {yr === 0 ? "Now" : `+${yr}y`}
            </text>
          </g>
        );
      })}

      <polygon
        points={`${currentLine} ${padL + chartW},${padT + chartH} ${padL},${padT + chartH}`}
        fill="url(#currentFill)"
      />
      <polyline points={currentLine} fill="none" stroke="#C0544E" strokeWidth="2" strokeDasharray="5,4" opacity="0.6" />

      <polygon
        points={`${targetLine} ${padL + chartW},${padT + chartH} ${padL},${padT + chartH}`}
        fill="url(#targetFill)"
      />
      <polyline
        points={targetLine}
        fill="none"
        stroke="#3A7D7B"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={dashOffset}
        style={{ transition: "stroke-dashoffset 2s ease" }}
      />

      <circle
        cx={padL}
        cy={
          padT +
          chartH -
          ((bodyAge - (bodyAge - 2)) / (bodyAge + currentPace * years + 2 - (bodyAge - 2))) * chartH
        }
        r="4"
        fill="#3A7D7B"
      />

      <g style={{ opacity: progress, transition: "opacity 1.5s ease 1s" }}>
        <rect
          x={padL + chartW - 100}
          y={padT + 2}
          width="100"
          height="42"
          rx="6"
          fill="white"
          fillOpacity="0.9"
          stroke="#E0E7E6"
          strokeWidth="0.5"
        />
        <circle cx={padL + chartW - 88} cy={padT + 16} r="4" fill="#C0544E" opacity="0.6" />
        <text x={padL + chartW - 78} y={padT + 20} fill="#6B7C78" fontSize="9" fontFamily="Outfit, sans-serif">
          Current path
        </text>
        <circle cx={padL + chartW - 88} cy={padT + 32} r="4" fill="#3A7D7B" />
        <text
          x={padL + chartW - 78}
          y={padT + 36}
          fill="#3A7D7B"
          fontSize="9"
          fontFamily="Outfit, sans-serif"
          fontWeight="600"
        >
          With your plan
        </text>
      </g>

      <text x={padL - 6} y={padT + 6} textAnchor="end" fill="#9AABA7" fontSize="9" fontFamily="Outfit, sans-serif">
        {bodyAge}
      </text>
      {(() => {
        const endAge = Math.round(bodyAge + targetPace * years);
        const endAgeCurrent = Math.round(bodyAge + currentPace * years);
        return (
          <>
            <text
              x={padL + chartW + 4}
              y={
                padT +
                chartH -
                ((endAge - (bodyAge - 2)) / (bodyAge + currentPace * years + 2 - (bodyAge - 2))) * chartH +
                4
              }
              fill="#3A7D7B"
              fontSize="10"
              fontFamily="Outfit, sans-serif"
              fontWeight="600"
              style={{ opacity: progress, transition: "opacity 1s ease 1.5s" }}
            >
              {endAge}
            </text>
            <text
              x={padL + chartW + 4}
              y={padT + 12}
              fill="#C0544E"
              fontSize="10"
              fontFamily="Outfit, sans-serif"
              opacity="0.6"
              style={{ opacity: progress * 0.6, transition: "opacity 1s ease 1.5s" }}
            >
              {endAgeCurrent}
            </text>
          </>
        );
      })()}
    </svg>
  );
}
