import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const USER_AGENT = "jonathanchong-portfolio jonathanchongyyc@gmail.com";
const DAY_MS = 24 * 60 * 60 * 1000;

const trackedCompanies = [
  {
    id: "amd",
    company: "Advanced Micro Devices (AMD)",
    ticker: "AMD",
    cik: "0000002488",
    tenureStart: "2023-05-01",
    tenureEnd: "2024-08-31",
    tenureLabel: "MAY 2023 - AUG 2024",
  },
  {
    id: "amd-present",
    company: "Advanced Micro Devices (AMD)",
    ticker: "AMD",
    cik: "0000002488",
    tenureStart: "2025-07-01",
    tenureEnd: "present",
    tenureLabel: "JUL 2025 - PRESENT",
  },
  {
    id: "grmn",
    company: "Garmin Ltd.",
    ticker: "GRMN",
    cik: "0001121788",
    tenureStart: "2022-01-01",
    tenureEnd: "2022-12-31",
    tenureLabel: "JAN 2022 - DEC 2022",
  },
];

function isoDateFromUnix(seconds) {
  return new Date(seconds * 1000).toISOString().slice(0, 10);
}

function fmtIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function resolveTenureEndDate(rawEndDate) {
  if (String(rawEndDate).toLowerCase() === "present") {
    return fmtIsoDate(new Date());
  }
  return rawEndDate;
}

function sortByDateAscending(points) {
  return [...points].sort((a, b) => a.date.localeCompare(b.date));
}

function firstOnOrAfter(points, date) {
  const found = points.find((p) => p.date >= date);
  return found ?? points[0] ?? null;
}

function lastOnOrBefore(points, date) {
  for (let i = points.length - 1; i >= 0; i -= 1) {
    if (points[i].date <= date) return points[i];
  }
  return points[points.length - 1] ?? null;
}

function downsample(points, maxPoints = 32) {
  if (points.length <= maxPoints) return points;
  const stride = (points.length - 1) / (maxPoints - 1);
  const sampled = [];
  for (let i = 0; i < maxPoints; i += 1) {
    const idx = Math.round(i * stride);
    sampled.push(points[idx]);
  }
  return sampled;
}

function mergeUniqueByDate(points) {
  const byDate = new Map();
  for (const point of points) byDate.set(point.date, point);
  return sortByDateAscending(Array.from(byDate.values()));
}

function pickSharesAtDate(series, targetDate) {
  let candidate = null;
  for (const row of series) {
    if (row.date <= targetDate) candidate = row;
    else break;
  }
  if (candidate) return candidate.value;
  return series[0]?.value ?? null;
}

async function fetchJson(url, headers = {}) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`);
  }
  return response.json();
}

async function fetchYahooSeries(ticker, startDate, endDate) {
  const paddedStart = new Date(`${startDate}T00:00:00Z`).getTime() - 14 * DAY_MS;
  const paddedEnd = new Date(`${endDate}T00:00:00Z`).getTime() + 14 * DAY_MS;
  const period1 = Math.floor(paddedStart / 1000);
  const period2 = Math.floor(paddedEnd / 1000);
  const url =
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}` +
    `?period1=${period1}&period2=${period2}&interval=1d&events=div,splits`;
  const payload = await fetchJson(url, { "User-Agent": "Mozilla/5.0" });
  const result = payload?.chart?.result?.[0];
  if (!result) throw new Error(`No Yahoo chart result for ${ticker}`);

  const timestamps = result.timestamp ?? [];
  const close = result.indicators?.quote?.[0]?.close ?? [];
  const points = [];
  for (let i = 0; i < timestamps.length; i += 1) {
    const price = close[i];
    if (typeof price === "number" && Number.isFinite(price)) {
      points.push({ date: isoDateFromUnix(timestamps[i]), close: Number(price) });
    }
  }
  if (points.length === 0) throw new Error(`No valid price points for ${ticker}`);
  return sortByDateAscending(points);
}

function extractShareSeries(companyFacts) {
  const deiUnits = companyFacts?.facts?.dei?.EntityCommonStockSharesOutstanding?.units?.shares;
  const gaapUnits = companyFacts?.facts?.["us-gaap"]?.CommonStockSharesOutstanding?.units?.shares;
  const sourceUnits = Array.isArray(deiUnits) && deiUnits.length > 0 ? deiUnits : gaapUnits;
  if (!Array.isArray(sourceUnits) || sourceUnits.length === 0) {
    throw new Error("No shares outstanding series found");
  }

  const rows = [];
  for (const item of sourceUnits) {
    if (!item?.end || typeof item?.val !== "number") continue;
    rows.push({ date: item.end, value: item.val, filed: item.filed ?? null });
  }
  if (rows.length === 0) throw new Error("Shares series had no usable rows");
  return sortByDateAscending(rows);
}

async function fetchSharesSeries(cik) {
  const url = `https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`;
  const payload = await fetchJson(url, { "User-Agent": USER_AGENT });
  return extractShareSeries(payload);
}

function buildCompanySnapshot(config, series, sharesSeries) {
  const isLive = String(config.tenureEnd).toLowerCase() === "present";
  const startPoint = firstOnOrAfter(series, config.tenureStart);
  const endPoint = isLive ? (series[series.length - 1] ?? null) : lastOnOrBefore(series, config.tenureEnd);
  if (!startPoint || !endPoint) {
    throw new Error(`Unable to resolve tenure boundary points for ${config.ticker}`);
  }

  const startShares = pickSharesAtDate(sharesSeries, startPoint.date);
  const endShares = pickSharesAtDate(sharesSeries, endPoint.date);
  if (startShares === null || endShares === null) {
    throw new Error(`Unable to resolve shares outstanding for ${config.ticker}`);
  }

  const startMarketCap = startPoint.close * startShares;
  const endMarketCap = endPoint.close * endShares;
  const priceDelta = endPoint.close - startPoint.close;
  const marketCapDelta = endMarketCap - startMarketCap;
  const priceDeltaPct = startPoint.close === 0 ? 0 : (priceDelta / startPoint.close) * 100;
  const marketCapDeltaPct = startMarketCap === 0 ? 0 : (marketCapDelta / startMarketCap) * 100;

  const windowPoints = series.filter((point) => point.date >= startPoint.date && point.date <= endPoint.date);
  const sampledPoints = downsample(windowPoints, 34);
  const points = mergeUniqueByDate([startPoint, ...sampledPoints, endPoint]);

  return {
    id: config.id,
    company: config.company,
    ticker: config.ticker,
    tenureLabel: config.tenureLabel,
    isLive,
    startPoint,
    endPoint,
    points,
    metrics: {
      startShares,
      endShares,
      startMarketCap,
      endMarketCap,
      priceDelta,
      priceDeltaPct,
      marketCapDelta,
      marketCapDeltaPct,
    },
  };
}

function buildSnapshotModule(snapshot) {
  return `/* eslint-disable */
// Generated by scripts/buildCareerStockData.mjs
// Do not edit by hand unless the generator script changes.

export type CareerStockPoint = {
  date: string;
  close: number;
};

export type CareerStockMetrics = {
  startShares: number;
  endShares: number;
  startMarketCap: number;
  endMarketCap: number;
  priceDelta: number;
  priceDeltaPct: number;
  marketCapDelta: number;
  marketCapDeltaPct: number;
};

export type CareerStockCompanySnapshot = {
  id: string;
  company: string;
  ticker: string;
  tenureLabel: string;
  isLive: boolean;
  startPoint: CareerStockPoint;
  endPoint: CareerStockPoint;
  points: CareerStockPoint[];
  metrics: CareerStockMetrics;
};

export const CAREER_STOCK_SNAPSHOT_GENERATED_AT = "${fmtIsoDate(new Date())}";

export const careerStockSnapshot: CareerStockCompanySnapshot[] = ${JSON.stringify(snapshot, null, 2)};
`;
}

async function main() {
  const companySnapshots = [];
  for (const config of trackedCompanies) {
    const resolvedEndDate = resolveTenureEndDate(config.tenureEnd);
    const series = await fetchYahooSeries(config.ticker, config.tenureStart, resolvedEndDate);
    const sharesSeries = await fetchSharesSeries(config.cik);
    companySnapshots.push(buildCompanySnapshot(config, series, sharesSeries));
  }

  const moduleText = buildSnapshotModule(companySnapshots);
  const outputPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "src",
    "data",
    "careerStockSnapshot.ts",
  );
  await writeFile(outputPath, moduleText, "utf8");
  console.log(`Wrote ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
