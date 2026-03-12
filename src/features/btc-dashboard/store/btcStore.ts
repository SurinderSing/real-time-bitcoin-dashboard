import { create } from "zustand";
import type {
  BtcTickerData,
  ConnectionStatus,
  PricePoint,
} from "../types/btc.types";

const MAX_HISTORY = 60;

interface MetricHistories {
  lastPrice: PricePoint[];
  markPrice: PricePoint[];
  highPrice24h: PricePoint[];
  lowPrice24h: PricePoint[];
  turnover24h: PricePoint[];
  price24hPcnt: PricePoint[];
}

interface BtcStore {
  ticker: BtcTickerData;
  previousLastPrice: string;
  status: ConnectionStatus;
  priceHistory: PricePoint[];
  metricHistories: MetricHistories;
  updateTicker: (partial: Partial<BtcTickerData>) => void;
  setStatus: (status: ConnectionStatus) => void;
}

function pushPoint(arr: PricePoint[], value: string): PricePoint[] {
  const num = parseFloat(value);
  if (isNaN(num)) return arr;
  const next = [...arr, { time: Date.now(), price: num }];
  if (next.length > MAX_HISTORY) next.shift();
  return next;
}

export const useBtcStore = create<BtcStore>((set) => ({
  ticker: {
    lastPrice: "0",
    markPrice: "0",
    highPrice24h: "0",
    lowPrice24h: "0",
    turnover24h: "0",
    price24hPcnt: "0",
  },
  previousLastPrice: "0",
  status: "disconnected",
  priceHistory: [],
  metricHistories: {
    lastPrice: [],
    markPrice: [],
    highPrice24h: [],
    lowPrice24h: [],
    turnover24h: [],
    price24hPcnt: [],
  },

  updateTicker: (partial) =>
    set((state) => {
      const newTicker = { ...state.ticker, ...partial };
      const mh = { ...state.metricHistories };
      let newPriceHistory = state.priceHistory;

      if (partial.lastPrice !== undefined) {
        mh.lastPrice = pushPoint(mh.lastPrice, partial.lastPrice);
        const next = [...state.priceHistory, { time: Date.now(), price: parseFloat(partial.lastPrice) }];
        if (next.length > MAX_HISTORY) next.shift();
        newPriceHistory = next;
      }
      if (partial.markPrice !== undefined) {
        mh.markPrice = pushPoint(mh.markPrice, partial.markPrice);
      }
      if (partial.highPrice24h !== undefined) {
        mh.highPrice24h = pushPoint(mh.highPrice24h, partial.highPrice24h);
      }
      if (partial.lowPrice24h !== undefined) {
        mh.lowPrice24h = pushPoint(mh.lowPrice24h, partial.lowPrice24h);
      }
      if (partial.turnover24h !== undefined) {
        mh.turnover24h = pushPoint(mh.turnover24h, partial.turnover24h);
      }
      if (partial.price24hPcnt !== undefined) {
        mh.price24hPcnt = pushPoint(mh.price24hPcnt, partial.price24hPcnt);
      }

      return {
        ticker: newTicker,
        previousLastPrice: state.ticker.lastPrice,
        priceHistory: newPriceHistory,
        metricHistories: mh,
      };
    }),

  setStatus: (status) => set({ status }),
}));
