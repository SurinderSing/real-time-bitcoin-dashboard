import { memo } from "react";
import type { ConnectionStatus } from "../features/btc-dashboard/types/btc.types";

interface StatusIndicatorProps {
  status: ConnectionStatus;
}

const STATUS_CONFIG: Record<ConnectionStatus, { color: string; label: string }> = {
  connected: { color: "bg-green-500", label: "Connected" },
  reconnecting: { color: "bg-yellow-500", label: "Reconnecting" },
  disconnected: { color: "bg-red-500", label: "Disconnected" },
};

export const StatusIndicator = memo(function StatusIndicator({ status }: StatusIndicatorProps): React.JSX.Element {
  const config = STATUS_CONFIG[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`h-2.5 w-2.5 rounded-full ${config.color} pulse-dot`} />
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {config.label}
      </span>
    </div>
  );
});
