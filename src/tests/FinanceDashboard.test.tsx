import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { FinanceDashboard } from '../src/components/FinanceDashboard';
import { financeApi } from '../src/services/financeApi';

jest.mock('../src/services/financeApi');

describe('FinanceDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (financeApi.endpoints.getStockData.useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
    });

    render(
      <Provider store={store}>
        <FinanceDashboard />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders stock data', async () => {
    (financeApi.endpoints.getStockData.useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        'Time Series (Daily)': {
          '2023-10-01': { '4. close': '150.00' },
        },
      },
      error: null,
    });

    render(
      <Provider store={store}>
        <FinanceDashboard />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/AAPL Stock Data/i)).toBeInTheDocument();
      expect(screen.getByText(/Latest Price: \$150.00/i)).toBeInTheDocument();
    });
  });
});