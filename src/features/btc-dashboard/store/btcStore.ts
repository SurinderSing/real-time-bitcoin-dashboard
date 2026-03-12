import { create } from "zustand";
import type {
  BtcTickerData,
  ConnectionStatus,
  PricePoint,
} from "../types/btc.types";

const MAX_PRICE_HISTORY = 60;

interface BtcStore {
  ticker: BtcTickerData;
  previousLastPrice: string;
  status: ConnectionStatus;
  priceHistory: PricePoint[];
  updateTicker: (partial: Partial<BtcTickerData>) => void;
  setStatus: (status: ConnectionStatus) => void;
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

  updateTicker: (partial) =>
    set((state) => {
      const newTicker = { ...state.ticker, ...partial };
      const newHistory = [...state.priceHistory];

      if (partial.lastPrice !== undefined) {
        newHistory.push({
          time: Date.now(),
          price: parseFloat(partial.lastPrice),
        });
        if (newHistory.length > MAX_PRICE_HISTORY) {
          newHistory.shift();
        }
      }

      return {
        ticker: newTicker,
        previousLastPrice: state.ticker.lastPrice,
        priceHistory: newHistory,
      };
    }),

  setStatus: (status) => set({ status }),
}));
