export interface BtcTickerData {
  lastPrice: string;
  markPrice: string;
  highPrice24h: string;
  lowPrice24h: string;
  turnover24h: string;
  price24hPcnt: string;
}

export type ConnectionStatus = "connected" | "reconnecting" | "disconnected";

export interface PricePoint {
  time: number;
  price: number;
}

export interface BybitTickerMessage {
  topic: string;
  type: string;
  ts: number;
  data: BybitTickerPayload;
}

export interface BybitTickerPayload {
  lastPrice?: string;
  markPrice?: string;
  highPrice24h?: string;
  lowPrice24h?: string;
  turnover24h?: string;
  price24hPcnt?: string;
}

export type Theme = "light" | "dark";
