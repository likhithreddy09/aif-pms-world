"use client";

const COLORS = ["#c4a35a", "#120e0a", "#8a7353", "#d4b56a", "#3d3226", "#ebe3d4"];

export function StrategyCharts({
  name,
  categories,
  type,
  oneYearReturn,
  threeYearReturn,
  fiveYearReturn,
  sinceInceptionReturn,
}: {
  name: string;
  categories: string[];
  type: string;
  oneYearReturn?: number | null;
  threeYearReturn?: number | null;
  fiveYearReturn?: number | null;
  sinceInceptionReturn?: number | null;
}) {
  const allocation = buildAllocation(categories, type);
  const returns = [
    { label: "1Y", value: oneYearReturn },
    { label: "3Y", value: threeYearReturn },
    { label: "5Y", value: fiveYearReturn },
    { label: "SI", value: sinceInceptionReturn },
  ].filter((item) => item.value != null) as { label: string; value: number }[];
  const series = buildPerformanceSeries(name, oneYearReturn ?? threeYearReturn ?? 12);

  if (allocation.length === 0 && returns.length === 0) return null;

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div className="border border-ink/10 bg-white p-5">
        <h3 className="text-base font-semibold">Indicative allocation</h3>
        <p className="mt-1 text-xs text-ink-400">
          Sample mix for this strategy style. Not a live portfolio.
        </p>
        <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row">
          <Donut slices={allocation} />
          <ul className="w-full space-y-2 text-sm">
            {allocation.map((slice, index) => (
              <li key={slice.label} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ background: COLORS[index % COLORS.length] }}
                  />
                  {slice.label}
                </span>
                <span className="font-medium">{slice.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border border-ink/10 bg-white p-5">
        <h3 className="text-base font-semibold">Return snapshot</h3>
        <p className="mt-1 text-xs text-ink-400">Annualised demonstration figures.</p>
        {returns.length ? <BarChart data={returns} /> : <p className="mt-8 text-sm text-ink-400">No returns entered.</p>}
      </div>

      <div className="border border-ink/10 bg-white p-5 lg:col-span-2">
        <h3 className="text-base font-semibold">Illustrative 24-month path</h3>
        <p className="mt-1 text-xs text-ink-400">
          Generated from the listed 1-year return for visualisation only.
        </p>
        <LineChart series={series} />
      </div>
    </div>
  );
}

function buildAllocation(categories: string[], type: string) {
  if (categories.includes("Long Short")) {
    return [
      { label: "Long book", value: 62 },
      { label: "Short book", value: 26 },
      { label: "Cash / hedges", value: 12 },
    ];
  }
  if (categories.includes("Multi Asset")) {
    return [
      { label: "Equity", value: 48 },
      { label: "Credit", value: 32 },
      { label: "Gold", value: 12 },
      { label: "Cash", value: 8 },
    ];
  }
  if (categories.includes("Small Cap")) {
    return [
      { label: "Small cap", value: 68 },
      { label: "Mid cap", value: 22 },
      { label: "Cash", value: 10 },
    ];
  }
  if (categories.includes("Large Cap")) {
    return [
      { label: "Large cap", value: 82 },
      { label: "Mid cap", value: 12 },
      { label: "Cash", value: 6 },
    ];
  }
  if (categories.includes("Thematic")) {
    return [
      { label: "Theme stocks", value: 70 },
      { label: "Core holdings", value: 22 },
      { label: "Cash", value: 8 },
    ];
  }
  if (categories.includes("Multi Cap") || type === "PMS") {
    return [
      { label: "Large cap", value: 42 },
      { label: "Mid cap", value: 33 },
      { label: "Small cap", value: 18 },
      { label: "Cash", value: 7 },
    ];
  }
  return [
    { label: "Core", value: 75 },
    { label: "Satellite", value: 18 },
    { label: "Cash", value: 7 },
  ];
}

function buildPerformanceSeries(seed: string, annualReturn: number) {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  const monthly = annualReturn / 12;
  const points: { label: string; value: number }[] = [];
  let value = 100;
  for (let i = 0; i < 24; i += 1) {
    hash = (hash * 1664525 + 1013904223) >>> 0;
    const noise = ((hash % 1000) / 1000 - 0.5) * 2.4;
    value = Number((value * (1 + (monthly + noise) / 100)).toFixed(2));
    const date = new Date();
    date.setMonth(date.getMonth() - (23 - i));
    points.push({
      label: date.toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
      value,
    });
  }
  return points;
}

function Donut({ slices }: { slices: { label: string; value: number }[] }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <svg viewBox="0 0 100 100" className="h-40 w-40 shrink-0" aria-hidden>
      {slices.map((slice, index) => {
        const length = (slice.value / 100) * circumference;
        const circle = (
          <circle
            key={slice.label}
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={COLORS[index % COLORS.length]}
            strokeWidth="14"
            strokeDasharray={`${length} ${circumference - length}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 50 50)"
          />
        );
        offset += length;
        return circle;
      })}
      <circle cx="50" cy="50" r="24" fill="#fbf8f2" />
    </svg>
  );
}

function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((item) => Math.abs(item.value)), 1);
  return (
    <div className="mt-6 flex h-48 items-end gap-4">
      {data.map((item) => {
        const height = Math.max(8, (Math.abs(item.value) / max) * 100);
        return (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-xs font-medium">{item.value.toFixed(1)}%</span>
            <div className="flex h-36 w-full items-end justify-center">
              <div
                className="w-10 bg-gold"
                style={{ height: `${height}%` }}
                title={`${item.label}: ${item.value}%`}
              />
            </div>
            <span className="text-xs text-ink-500">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function LineChart({ series }: { series: { label: string; value: number }[] }) {
  const width = 640;
  const height = 220;
  const padding = 28;
  const values = series.map((item) => item.value);
  const min = Math.min(...values) * 0.98;
  const max = Math.max(...values) * 1.02;
  const points = series.map((item, index) => {
    const x = padding + (index / (series.length - 1)) * (width - padding * 2);
    const y = padding + ((max - item.value) / (max - min || 1)) * (height - padding * 2);
    return `${x},${y}`;
  });
  const area = `${padding},${height - padding} ${points.join(" ")} ${width - padding},${height - padding}`;
  const ticks = [0, 5, 11, 17, 23];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-4 h-56 w-full" role="img" aria-label="Illustrative performance chart">
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#d4c4a8" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#d4c4a8" />
      <polygon points={area} fill="rgba(196,163,90,0.16)" />
      <polyline fill="none" stroke="#c4a35a" strokeWidth="2.5" points={points.join(" ")} />
      {ticks.map((tick) => (
        <text
          key={tick}
          x={padding + (tick / 23) * (width - padding * 2)}
          y={height - 8}
          textAnchor="middle"
          fontSize="10"
          fill="#8a7353"
        >
          {series[tick]?.label}
        </text>
      ))}
    </svg>
  );
}
