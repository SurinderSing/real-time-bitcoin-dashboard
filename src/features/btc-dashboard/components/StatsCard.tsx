import { memo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "../../../components/Card";

interface StatsCardProps {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  previousValue?: string;
  sparkline?: React.ReactNode;
}

export const StatsCard = memo(function StatsCard({
  label,
  value,
  prefix = "",
  suffix = "",
  previousValue,
  sparkline,
}: StatsCardProps): React.JSX.Element {
  const [flashClass, setFlashClass] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (previousValue === undefined || previousValue === value) return;

    const current = parseFloat(value);
    const prev = parseFloat(previousValue);
    if (isNaN(current) || isNaN(prev)) return;

    const newFlash = current > prev ? "flash-green" : current < prev ? "flash-red" : "";
    if (newFlash === "") return;

    setFlashClass(newFlash);

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setFlashClass("");
    }, 600);
  }, [value, previousValue]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const numValue = parseFloat(value);
  const isPositive = !isNaN(numValue) && numValue > 0;
  const isPercentage = suffix === "%";

  return (
    <Card className={`flex h-full flex-col ${flashClass}`}>
      <p className="mb-1 text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <div className="relative">
        <motion.p
          key={value}
          initial={{ opacity: 0.8, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
          className={`text-2xl font-bold ${
            isPercentage
              ? isPositive
                ? "text-green-500"
                : "text-red-500"
              : "text-gray-900 dark:text-white"
          }`}
        >
          {prefix}
          {value}
          {suffix && <span className="ml-1 text-sm font-medium">{suffix}</span>}
        </motion.p>
      </div>
      {sparkline !== undefined && sparkline !== null && (
        <div className="mt-2">{sparkline}</div>
      )}
    </Card>
  );
});
