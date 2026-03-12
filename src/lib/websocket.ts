interface WebSocketConfig {
  url: string;
  onMessage: (data: unknown) => void;
  onStatusChange: (status: "connected" | "reconnecting" | "disconnected") => void;
}

const MAX_RECONNECT_DELAY = 30000;
const BASE_DELAY = 1000;

export function createWebSocket(config: WebSocketConfig): () => void {
  let ws: WebSocket | null = null;
  let reconnectAttempts = 0;
  let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  let destroyed = false;

  function getReconnectDelay(): number {
    const delay = Math.min(BASE_DELAY * Math.pow(2, reconnectAttempts), MAX_RECONNECT_DELAY);
    return delay + Math.random() * 1000;
  }

  function connect(): void {
    if (destroyed) return;

    ws = new WebSocket(config.url);

    ws.onopen = (): void => {
      reconnectAttempts = 0;
      config.onStatusChange("connected");

      const subscribeMsg = JSON.stringify({
        op: "subscribe",
        args: ["tickers.BTCUSDT"],
      });
      ws?.send(subscribeMsg);
    };

    ws.onmessage = (event: MessageEvent): void => {
      try {
        const parsed: unknown = JSON.parse(String(event.data));
        config.onMessage(parsed);
      } catch {
        // ignore malformed messages
      }
    };

    ws.onclose = (): void => {
      if (destroyed) return;
      config.onStatusChange("reconnecting");
      scheduleReconnect();
    };

    ws.onerror = (): void => {
      ws?.close();
    };
  }

  function scheduleReconnect(): void {
    if (destroyed) return;
    const delay = getReconnectDelay();
    reconnectAttempts += 1;
    reconnectTimeout = setTimeout(connect, delay);
  }

  function cleanup(): void {
    destroyed = true;
    if (reconnectTimeout !== null) {
      clearTimeout(reconnectTimeout);
    }
    if (ws) {
      ws.onclose = null;
      ws.onerror = null;
      ws.onmessage = null;
      if (ws.readyState === WebSocket.CONNECTING) {
        ws.onopen = (): void => {
          ws?.close();
        };
      } else {
        ws.onopen = null;
        if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CLOSING) {
          ws.close();
        }
      }
    }
  }

  connect();

  return cleanup;
}
