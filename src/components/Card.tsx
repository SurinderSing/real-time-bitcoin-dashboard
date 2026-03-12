import { memo } from "react";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = memo(function Card({ children, className = "" }: CardProps): React.JSX.Element {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-gray-700/50 dark:bg-gray-800/80 ${className}`}
    >
      {children}
    </div>
  );
});
