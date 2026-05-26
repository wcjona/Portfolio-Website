import { useEffect, useMemo, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { CareerStockCompanySnapshot } from "../data/careerStockSnapshot";

type Props = {
  snapshot: CareerStockCompanySnapshot;
  compact?: boolean;
};

type Point = { x: number; y: number };
const CHART_WIDTH = 660;
const CHART_HEIGHT = 220;

const chartCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

function formatSignedCurrency(value: number, compact = false): string {
  const abs = Math.abs(value);
  const formatted = compact ? compactCurrencyFormatter.format(abs) : chartCurrencyFormatter.format(abs);
  return `${value >= 0 ? "+" : "-"}${formatted}`;
}

function formatSignedPercent(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function formatIsoAsLongDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function buildCoordinates(snapshot: CareerStockCompanySnapshot): {
  points: Point[];
  linePath: string;
  areaPath: string;
} {
  const width = CHART_WIDTH;
  const height = CHART_HEIGHT;
  const left = 24;
  const right = 24;
  const top = 28;
  const bottom = 30;
  const drawableW = width - left - right;
  const drawableH = height - top - bottom;

  const prices = snapshot.points.map((point) => point.close);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = Math.max(max - min, 1);

  const points = snapshot.points.map((point, index) => {
    const ratioX = snapshot.points.length <= 1 ? 0 : index / (snapshot.points.length - 1);
    const ratioY = (point.close - min) / range;
    return {
      x: left + ratioX * drawableW,
      y: top + (1 - ratioY) * drawableH,
    };
  });

  const linePath = points.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ");
  const baselineY = height - bottom;
  const areaPath =
    `${linePath} L ${points[points.length - 1]?.x.toFixed(2)} ${baselineY.toFixed(2)} ` +
    `L ${points[0]?.x.toFixed(2)} ${baselineY.toFixed(2)} Z`;

  return { points, linePath, areaPath };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export default function CareerStockChart({ snapshot, compact = false }: Props): JSX.Element {
  const [displayPrice, setDisplayPrice] = useState(snapshot.endPoint.close);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);

  useEffect(() => {
    setDisplayPrice(snapshot.endPoint.close);
  }, [snapshot.endPoint.close]);

  useEffect(() => {
    if (!snapshot.isLive) return;
    const anchor = snapshot.endPoint.close;
    const maxDrift = anchor * 0.012;
    const step = anchor * 0.0015;
    const interval = window.setInterval(() => {
      setDisplayPrice((prev) => {
        const next = prev + (Math.random() * 2 - 1) * step;
        return clamp(next, anchor - maxDrift, anchor + maxDrift);
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [snapshot.isLive, snapshot.endPoint.close]);

  const renderedSnapshot = useMemo(() => {
    if (!snapshot.isLive || snapshot.points.length === 0) return snapshot;
    const last = snapshot.points[snapshot.points.length - 1];
    const nextPoints = [...snapshot.points.slice(0, -1), { ...last, close: displayPrice }];
    return { ...snapshot, points: nextPoints };
  }, [snapshot, displayPrice]);

  const { points, linePath, areaPath } = buildCoordinates(renderedSnapshot);
  const activeIndex = pinnedIndex ?? hoveredIndex;
  const hoveredPoint = activeIndex === null ? null : points[activeIndex] ?? null;
  const hoveredData = activeIndex === null ? null : renderedSnapshot.points[activeIndex] ?? null;
  const showTooltipBelow = hoveredPoint ? hoveredPoint.y < 52 : false;
  const tooltipOffsetY = showTooltipBelow ? 14 : -12;
  const tooltipRectY = showTooltipBelow ? 0 : -30;
  const tooltipDateY = showTooltipBelow ? 12 : -18;
  const tooltipPriceY = showTooltipBelow ? 24 : -6;
  const tooltipX = hoveredPoint ? clamp(hoveredPoint.x + 10, 100, CHART_WIDTH - 120) : 0;
  const tooltipY = hoveredPoint ? clamp(hoveredPoint.y + tooltipOffsetY, 10, CHART_HEIGHT - 40) : 0;

  const getNearestIndex = (event: ReactPointerEvent<SVGSVGElement>): number | null => {
    const svgRect = event.currentTarget.getBoundingClientRect();
    if (svgRect.width <= 0 || points.length === 0) return null;
    const pointerX = ((event.clientX - svgRect.left) / svgRect.width) * CHART_WIDTH;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (let i = 0; i < points.length; i += 1) {
      const distance = Math.abs(points[i].x - pointerX);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = i;
      }
    }
    return nearest;
  };

  const handlePointerDown = (event: ReactPointerEvent<SVGSVGElement>): void => {
    const nearest = getNearestIndex(event);
    if (nearest === null) return;
    setHoveredIndex(nearest);
    if (event.pointerType === "touch") {
      setPinnedIndex((current) => (current === nearest ? null : nearest));
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<SVGSVGElement>): void => {
    const nearest = getNearestIndex(event);
    if (nearest === null) return;
    if (event.pointerType === "touch" && pinnedIndex !== null) {
      setPinnedIndex(nearest);
      setHoveredIndex(nearest);
      return;
    }
    setHoveredIndex(nearest);
  };

  const handlePointerLeave = (event: ReactPointerEvent<SVGSVGElement>): void => {
    if (event.pointerType !== "touch") {
      setHoveredIndex(null);
    }
  };

  const handlePointerCancel = (): void => {
    setHoveredIndex(null);
  };

  const startCoord = points[0];
  const endCoord = points[points.length - 1];
  const priceDelta = displayPrice - snapshot.startPoint.close;
  const priceDeltaPct = snapshot.startPoint.close === 0 ? 0 : (priceDelta / snapshot.startPoint.close) * 100;
  const endMarketCap = displayPrice * snapshot.metrics.endShares;
  const marketCapDelta = endMarketCap - snapshot.metrics.startMarketCap;
  const marketCapDeltaPct = snapshot.metrics.startMarketCap === 0 ? 0 : (marketCapDelta / snapshot.metrics.startMarketCap) * 100;
  const pricePositive = priceDelta >= 0;
  const marketCapPositive = marketCapDelta >= 0;
  const gradientId = `career-stock-gradient-${snapshot.id}`;
  const valueBroughtLabel = `Individual total value brought: ${formatSignedCurrency(marketCapDelta, true)}`;
  const attributionLine = marketCapPositive
    ? "Drove measurable business impact."
    : "Demonstrated resilience in adverse market environments.";

  return (
    <article className={compact ? "pf-career-stock-card" : "pf-career-stock-card rounded-lg border border-ink-500/15 p-4 dark:border-zinc-700"}>
      {compact ? null : (
        <div className="pf-career-stock-header mb-4">
          <h4 className="pf-career-stock-title text-base font-semibold leading-5 ink-strong">
            {snapshot.company} ({snapshot.ticker})
          </h4>
          <p className="pf-career-stock-tenure mt-1 text-xs font-medium uppercase tracking-wide ink-label">
            Tenure: {snapshot.tenureLabel}
          </p>
        </div>
      )}

      <div className="pf-career-stock-header flex flex-wrap items-start justify-between gap-3">
        <div className="pf-career-stock-metrics flex flex-wrap gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              pricePositive
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                : "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
            }`}
          >
            Price {formatSignedPercent(priceDeltaPct)}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              marketCapPositive
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                : "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
            }`}
          >
            {valueBroughtLabel}
          </span>
        </div>
      </div>

      <div className="pf-career-stock-plot mt-4">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          role="img"
          aria-label={`${snapshot.ticker} stock chart during ${snapshot.tenureLabel}`}
          className="h-auto w-full"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerCancel={handlePointerCancel}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(var(--accent-section) / 0.35)" />
              <stop offset="100%" stopColor="rgb(var(--accent-section) / 0)" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gradientId})`} />
          <path d={linePath} fill="none" stroke="rgb(var(--accent-section) / 1)" strokeWidth="2.5" />

          <circle cx={startCoord.x} cy={startCoord.y} r="4.5" fill="rgb(var(--accent-about) / 1)" />
          <circle cx={endCoord.x} cy={endCoord.y} r="4.5" fill="rgb(var(--accent-section) / 1)" />

          {hoveredPoint && hoveredData ? (
            <g>
              <line
                x1={hoveredPoint.x}
                x2={hoveredPoint.x}
                y1="28"
                y2="190"
                stroke="rgb(var(--accent-section) / 0.35)"
                strokeDasharray="4 4"
              />
              <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r="5.5" fill="rgb(var(--accent-section) / 1)" />
              <g transform={`translate(${tooltipX}, ${tooltipY})`}>
                <rect
                  x="0"
                  y={tooltipRectY}
                  width="116"
                  height="34"
                  rx="6"
                  fill="rgb(var(--surface) / 0.96)"
                  stroke="rgb(var(--accent-section) / 0.35)"
                />
                <text x="8" y={tooltipDateY} fontSize="9" fill="rgb(var(--accent-section) / 1)">
                  {formatIsoAsLongDate(hoveredData.date)}
                </text>
                <text x="8" y={tooltipPriceY} fontSize="10" fontWeight="600" fill="currentColor">
                  {chartCurrencyFormatter.format(hoveredData.close)}
                </text>
              </g>
            </g>
          ) : null}
        </svg>

        <div className="pf-career-stock-axis mt-2 flex items-center justify-between gap-2 text-xs ink-label">
          <span>
            <span className="font-semibold">When I started:</span> {formatIsoAsLongDate(snapshot.startPoint.date)}
          </span>
          <span className="hidden text-[11px] text-center sm:block">Hover or tap to inspect daily prices</span>
          <span className="text-right">
            <span className="font-semibold">End date:</span> {formatIsoAsLongDate(snapshot.endPoint.date)}
          </span>
        </div>
      </div>

      <ul className="pf-career-stock-summary mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 ink-body marker:text-accent-section">
        <li>
          <span className="font-medium ink-strong">{valueBroughtLabel}</span>
        </li>
        <li>
          Price: {chartCurrencyFormatter.format(snapshot.startPoint.close)} {"->"} {chartCurrencyFormatter.format(displayPrice)} (
          <span className={pricePositive ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}>
            {formatSignedCurrency(priceDelta)} / {formatSignedPercent(priceDeltaPct)}
          </span>
          )
        </li>
        <li>
          Market cap: {compactCurrencyFormatter.format(snapshot.metrics.startMarketCap)} {"->"}{" "}
          {compactCurrencyFormatter.format(endMarketCap)} (
          <span className={marketCapPositive ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}>
            {formatSignedCurrency(marketCapDelta, true)} / {formatSignedPercent(marketCapDeltaPct)}
          </span>
          )
        </li>
        <li>{attributionLine}</li>
      </ul>
    </article>
  );
}
