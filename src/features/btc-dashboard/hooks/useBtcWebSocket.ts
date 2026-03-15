import { useEffect } from "react";
import { createWebSocket } from "../../../lib/websocket";
import { useBtcStore } from "../store/btcStore";
import type { BybitTickerMessage } from "../types/btc.types";

function isTickerMessage(data: unknown): data is BybitTickerMessage {
  if (typeof data !== "object" || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj["topic"] === "string" &&
    obj["topic"] === "tickers.BTCUSDT" &&
    typeof obj["data"] === "object" &&
    obj["data"] !== null
  );
}

export function useBtcWebSocket(): void {
  const updateTicker = useBtcStore((s) => s.updateTicker);
  const setStatus = useBtcStore((s) => s.setStatus);

  useEffect(() => {
    const cleanup = createWebSocket({
      url: "wss://stream.bybit.com/v5/public/linear",
      onMessage: (raw) => {
        if (!isTickerMessage(raw)) return;

        const d = raw.data;
        const partial: Record<string, string> = {};

        if (d.lastPrice !== undefined) partial["lastPrice"] = d.lastPrice;
        if (d.markPrice !== undefined) partial["markPrice"] = d.markPrice;
        if (d.highPrice24h !== undefined) partial["highPrice24h"] = d.highPrice24h;
        if (d.lowPrice24h !== undefined) partial["lowPrice24h"] = d.lowPrice24h;
        if (d.turnover24h !== undefined) partial["turnover24h"] = d.turnover24h;
        if (d.price24hPcnt !== undefined) partial["price24hPcnt"] = d.price24hPcnt;

        if (Object.keys(partial).length > 0) {
          updateTicker(partial);
        }
      },
      onStatusChange: setStatus,
    });

    return cleanup;
  }, [updateTicker, setStatus]);
}
