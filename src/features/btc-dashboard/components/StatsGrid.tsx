import { memo } from "react";
import { useBtcStore } from "../store/btcStore";
import { StatsCard } from "./StatsCard";
import { SparklineChart } from "./SparklineChart";

function formatPrice(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return "$0.00";
  return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatVolume(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return "0";
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toFixed(0);
}

function formatPercent(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return "0.00";
  const pct = num * 100;
  return `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}`;
}

export const StatsGrid = memo(function StatsGrid(): React.JSX.Element {
  const ticker = useBtcStore((s) => s.ticker);
  const previousLastPrice = useBtcStore((s) => s.previousLastPrice);
  const priceHistory = useBtcStore((s) => s.priceHistory);

  const changeValue = formatPercent(ticker.price24hPcnt);
  const changeNum = parseFloat(ticker.price24hPcnt) * 100;
  const isPositive = changeNum >= 0;
  const sparkColor = isPositive ? "#22c55e" : "#ef4444";

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatsCard
          label="Last Price"
          value={formatPrice(ticker.lastPrice)}
          previousValue={formatPrice(previousLastPrice)}
          sparkline={<SparklineChart data={priceHistory} height={40} color={sparkColor} />}
        />
        <StatsCard
          label="Mark Price"
          value={formatPrice(ticker.markPrice)}
        />
        <StatsCard
          label="24h High"
          value={formatPrice(ticker.highPrice24h)}
        />
        <StatsCard
          label="24h Low"
          value={formatPrice(ticker.lowPrice24h)}
        />
        <StatsCard
          label="24h Volume"
          value={formatVolume(ticker.turnover24h)}
          suffix="BTC"
        />
      </div>
      <div className="mt-3">
        <StatsCard
          label="24h Change"
          value={changeValue}
          suffix="%"
          sparkline={<SparklineChart data={priceHistory} height={40} color={sparkColor} />}
        />
      </div>
    </div>
  );
});
