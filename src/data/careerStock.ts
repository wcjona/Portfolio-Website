export type CareerStockCompanyConfig = {
  id: "amd" | "amd-present" | "grmn";
  company: string;
  ticker: string;
  cik: string;
  tenureStart: string;
  tenureEnd: string;
  tenureLabel: string;
};

export const trackedCareerStocks: readonly CareerStockCompanyConfig[] = [
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
