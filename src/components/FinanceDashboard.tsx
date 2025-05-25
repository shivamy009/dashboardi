import React, { useState } from 'react';
import { useGetStockDataQuery } from '../services/financeApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { StockData, AlphaVantageResponse, TimeSeriesData } from '../types/finance';
import styles from './FinanceDashboard.module.scss';

export const FinanceDashboard: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('AAPL');
  const [timeRange, setTimeRange] = useState<string>('TIME_SERIES_DAILY');
  const { data, error, isLoading } = useGetStockDataQuery({ symbol, timeRange });

  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(e.target.value.toUpperCase());
  };

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value);
  };

  const formatStockData = (stockData: AlphaVantageResponse | undefined, range: string): StockData[] => {
    if (!stockData) return [];

    const timeSeriesKey = {
      TIME_SERIES_DAILY: 'Time Series (Daily)',
      TIME_SERIES_WEEKLY: 'Weekly Time Series',
      TIME_SERIES_MONTHLY: 'Monthly Time Series',
    }[range] || 'Time Series (Daily)';

    const timeSeries = stockData[timeSeriesKey] as TimeSeriesData | undefined;
    if (!timeSeries) return [];

    return Object.entries(timeSeries)
      .map(([date, values]) => ({
        date,
        close: parseFloat(values['4. close'] || '0'),
      }))
      .slice(0, range === 'TIME_SERIES_DAILY' ? 30 : range === 'TIME_SERIES_WEEKLY' ? 12 : 6)
      .reverse();
  };

  const latestPrice = data
    ? Object.values(data[Object.keys(data)[0] as keyof AlphaVantageResponse] as TimeSeriesData)?.[0]?.['4. close']
    : undefined;

  return (
    <section className={styles.financeDashboard} aria-label="Finance Dashboard">
      <div className={styles.searchContainer}>
        <label htmlFor="symbol-search" className="sr-only">Search for a stock symbol</label>
        <input
          id="symbol-search"
          type="text"
          value={symbol}
          onChange={handleSymbolChange}
          placeholder="Enter stock symbol (e.g., AAPL)"
          className={styles.searchInput}
          aria-describedby="search-error"
        />
        <label htmlFor="time-range" className="sr-only">Select time range</label>
        <select
          id="time-range"
          value={timeRange}
          onChange={handleTimeRangeChange}
          className={styles.timeRangeSelect}
        >
          <option value="TIME_SERIES_DAILY">Daily</option>
          <option value="TIME_SERIES_WEEKLY">Weekly</option>
          <option value="TIME_SERIES_MONTHLY">Monthly</option>
        </select>
      </div>
      {isLoading && <div className={styles.loader} aria-live="polite">Loading...</div>}
      {error && (
        <div className={styles.error} role="alert" id="search-error">
          Error fetching stock data. Please try again.
        </div>
      )}
      {data && latestPrice && (
        <div className={styles.stockInfo}>
          <h2>{symbol} Stock Data</h2>
          <p>Latest Price: ${parseFloat(latestPrice).toFixed(2)}</p>
        </div>
      )}
      {data && (
        <div className={styles.stockChart}>
          <h3>Price Trend ({timeRange.replace('TIME_SERIES_', '').toLowerCase()})</h3>
          <LineChart
            width={600}
            height={300}
            data={formatStockData(data, timeRange)}
            aria-label={`Stock price trend for ${timeRange}`}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="close" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      )}
    </section>
  );
};