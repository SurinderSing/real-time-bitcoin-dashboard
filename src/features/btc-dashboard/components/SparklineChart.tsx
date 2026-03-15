import { memo, useMemo } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  YAxis,
  XAxis,
} from "recharts";
import type { PricePoint } from "../types/btc.types";

interface SparklineChartProps {
  data: PricePoint[];
  height?: number;
  color?: string;
}

export const SparklineChart = memo(function SparklineChart({
  data,
  height = 40,
  color = "#22c55e",
}: SparklineChartProps): React.JSX.Element {
  const mappedData = useMemo(() => {
    return data.map((d, index) => ({ ...d, index }));
  }, [data]);

  const domain = useMemo((): [number, number] => {
    if (data.length === 0) return [0, 0];
    const prices = data.map((d) => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.5 || 1;
    return [min - padding, max + padding];
  }, [data]);

  if (data.length < 2) {
    return <div style={{ height }} className="flex items-center justify-center text-xs text-slate-400">Waiting for data...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={mappedData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`sparkGradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="index" type="number" domain={[0, 59]} hide />
        <YAxis domain={domain} hide />
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#sparkGradient-${color})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
});
