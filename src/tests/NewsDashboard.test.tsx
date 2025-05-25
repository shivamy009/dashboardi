import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { NewsDashboard } from '../src/components/NewsDashboard';
import { newsApi } from '../src/services/newsApi';

jest.mock('../src/services/newsApi');

describe('NewsDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (newsApi.endpoints.getNews.useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
    });

    render(
      <Provider store={store}>
        <NewsDashboard />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders news articles', async () => {
    (newsApi.endpoints.getNews.useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        articles: [
          { title: 'Test News', description: 'Description', source: { name: 'Source' } },
        ],
      },
      error: null,
    });

    render(
      <Provider store={store}>
        <NewsDashboard />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test News')).toBeInTheDocument();
    });
  });
});