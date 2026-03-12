import { useBtcWebSocket } from "../features/btc-dashboard/hooks/useBtcWebSocket";
import { useBtcStore } from "../features/btc-dashboard/store/btcStore";
import { useTheme } from "../hooks/useTheme";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { StatsGrid } from "../features/btc-dashboard/components/StatsGrid";
import { TradingChart } from "../features/btc-dashboard/components/TradingChart";

function App(): React.JSX.Element {
  useBtcWebSocket();
  const status = useBtcStore((s) => s.status);
  const { theme, toggleTheme } = useTheme();

  return (
    <DashboardLayout status={status} theme={theme} onToggleTheme={toggleTheme}>
      <div className="space-y-6">
        <StatsGrid />
        <TradingChart theme={theme} />
      </div>
    </DashboardLayout>
  );
}

export default App;
