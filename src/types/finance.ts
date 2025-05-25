export interface StockData {
  date: string;
  close: number;
}

export interface TimeSeriesData {
  [date: string]: {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  };
}

export interface AlphaVantageResponse {
  'Time Series (Daily)'?: TimeSeriesData;
  'Weekly Time Series'?: TimeSeriesData;
  'Monthly Time Series'?: TimeSeriesData;
}