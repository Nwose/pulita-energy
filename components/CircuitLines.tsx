import React from "react";

const CircuitLines: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1200 800"
      >
        <defs>
          <linearGradient
            id="circuitGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {[
          ["M 50 200 L 200 200 L 250 250 L 400 250", 0.6],
          ["M 80 350 L 180 350 L 220 390 L 350 390", 0.4],
          ["M 30 500 L 150 500 L 200 550 L 320 550", 0.5],
          ["M 800 180 L 950 180 L 1000 230 L 1150 230", 0.6],
          ["M 850 320 L 980 320 L 1020 360 L 1120 360", 0.4],
          ["M 880 480 L 1000 480 L 1050 530 L 1170 530", 0.5],
        ].map(([d, opacity], i) => (
          <path
            key={i}
            d={d as string}
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            fill="none"
            style={{ opacity: Number(opacity) }}
          />
        ))}
        {[250, 220, 200, 1000, 1020, 1050].map((cx, i) => (
          <circle
            key={i}
            cx={cx}
            cy={[250, 390, 550, 230, 360, 530][i]}
            r="3"
            fill="#0ea5e9"
            style={{ opacity: 0.7 }}
          />
        ))}
      </svg>
    </div>
  );
};

export default CircuitLines;
