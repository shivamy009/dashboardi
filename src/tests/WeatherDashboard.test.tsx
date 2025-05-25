import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { WeatherDashboard } from '../src/components/WeatherDashboard';
import { weatherApi } from '../src/services/weatherApi';

jest.mock('../src/services/weatherApi');

describe('WeatherDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (weatherApi.endpoints.getWeatherByCity.useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
    });

    render(
      <Provider store={store}>
        <WeatherDashboard />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders weather data', async () => {
    (weatherApi.endpoints.getWeatherByCity.useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        main: { temp: 20, humidity: 65 },
        wind: { speed: 5 },
        weather: [{ description: 'clear sky' }],
      },
      error: null,
    });

    render(
      <Provider store={store}>
        <WeatherDashboard />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/London Weather/i)).toBeInTheDocument();
      expect(screen.getByText(/Temperature: 20°C/i)).toBeInTheDocument();
    });
  });
});