import { memo } from "react";
import type { ReactNode } from "react";
import type { ConnectionStatus, Theme } from "../features/btc-dashboard/types/btc.types";
import { StatusIndicator } from "../components/StatusIndicator";
import { ThemeToggle } from "../components/ThemeToggle";

interface DashboardLayoutProps {
  children: ReactNode;
  status: ConnectionStatus;
  theme: Theme;
  onToggleTheme: () => void;
}

export const DashboardLayout = memo(function DashboardLayout({
  children,
  status,
  theme,
  onToggleTheme,
}: DashboardLayoutProps): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm transition-colors duration-300 dark:border-gray-700/50 dark:bg-gray-800/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
            <span className="text-orange-500">BTC/</span>
            <span className="text-gray-400">USDT</span>
            {" "}Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <StatusIndicator status={status} />
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {children}
      </main>
    </div>
  );
});
