import { memo, useEffect, useRef } from "react";
import type { Theme } from "../types/btc.types";

interface TradingChartProps {
  theme: Theme;
}

interface TradingViewWidgetConfig {
  autosize: boolean;
  symbol: string;
  interval: string;
  timezone: string;
  theme: string;
  style: string;
  locale: string;
  toolbar_bg: string;
  enable_publishing: boolean;
  allow_symbol_change: boolean;
  hide_side_toolbar: boolean;
  container_id: string;
}

declare global {
  interface Window {
    TradingView?: {
      widget: new (config: TradingViewWidgetConfig) => unknown;
    };
  }
}

export const TradingChart = memo(function TradingChart({ theme }: TradingChartProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    const containerId = "tradingview-widget";

    function createWidget(): void {
      if (window.TradingView === undefined) return;
      const container = containerRef.current;
      if (container === null) return;

      container.innerHTML = "";
      const widgetDiv = document.createElement("div");
      widgetDiv.id = containerId;
      widgetDiv.style.height = "100%";
      widgetDiv.style.width = "100%";
      container.appendChild(widgetDiv);

      new window.TradingView.widget({
        autosize: true,
        symbol: "BYBIT:BTCUSDT",
        interval: "1",
        timezone: "Etc/UTC",
        theme: theme === "dark" ? "dark" : "light",
        style: "1",
        locale: "en",
        toolbar_bg: theme === "dark" ? "#1f2937" : "#f9fafb",
        enable_publishing: false,
        allow_symbol_change: false,
        hide_side_toolbar: false,
        container_id: containerId,
      });
    }

    if (scriptLoadedRef.current) {
      createWidget();
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://s3.tradingview.com/tv.js"]'
    );

    if (existingScript !== null) {
      scriptLoadedRef.current = true;
      createWidget();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = (): void => {
      scriptLoadedRef.current = true;
      createWidget();
    };
    document.head.appendChild(script);
  }, [theme]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-colors duration-300 dark:border-gray-700/50 dark:bg-gray-800/80">
      <div ref={containerRef} className="h-[500px] w-full" />
    </div>
  );
});
