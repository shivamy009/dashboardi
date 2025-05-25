PGAGI Analytics Dashboard
Project Overview
This is a Comprehensive Analytics Dashboard built for the PGAGI Front-End Developer Intern Assignment. It features three interactive dashboards accessible via a stylish, responsive sidebar:

Weather Dashboard: Displays current weather and a 7-day forecast for a user-specified city using the OpenWeatherMap API, with an interactive line chart for temperature trends.
News Dashboard: Shows categorized news headlines from NewsAPI with pagination and a modal for viewing article details, including images and external links.
Finance Dashboard: Presents real-time stock data from Alpha Vantage, supporting daily, weekly, and monthly price trends with an interactive line chart.

The application is built with a focus on scalability, accessibility (WCAG 2.1), performance optimization, and type safety, meeting the assignment's requirements for a production-ready front-end project.
Technologies Used

Next.js 14.2.3: React framework for server-side rendering and static site generation.
React 18.2.0: JavaScript library for building user interfaces.
TypeScript 5.2.2: For type-safe code with strict type checking.
Tailwind CSS: Utility-first CSS framework for responsive and modern styling.
SCSS: For component-scoped styling with CSS Modules.
Redux Toolkit 1.9.0 & RTK Query: For state management and efficient data fetching.
Recharts 2.10.0: For interactive data visualizations (line charts).
Jest 29.7.0 & React Testing Library 14.0.0: For unit testing with >80% coverage.
ESLint 8.53.0 & Prettier 3.0.3: For code quality and formatting.
Husky 8.0.3 & Lint-Staged 15.0.2: For pre-commit hooks to enforce linting and formatting.

Installation Instructions

Clone the Repository:git clone https://github.com/your-username/pgagi-analytics-pdf.git
cd pgagi-analytics-pdf


Install Dependencies:npm install


Set Up Environment Variables:
Create a .env.local file in the root directory.
Add the following API keys:NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key


Obtain API keys from:
OpenWeatherMap
NewsAPI
Alpha Vantage





How to Run the Project

Start the Development Server:npm run dev


Open http://localhost:3000 in your browser to view the application.


Build and Run Production Version:npm run build
npm run start



Testing Instructions

Run Unit Tests:npm run test


Tests cover loading states and data rendering for all dashboards.


Generate Test Coverage Report:npm run test:coverage


Achieves >80% coverage, as required.



Deployment Details
The application is deployed to Vercel for a live demo. To deploy:

Push the repository to GitHub:git push origin main


Connect to Vercel:
Use the Vercel CLI: vercel --prod.
Or link the GitHub repository to Vercel and configure environment variables via the Vercel dashboard.


Set environment variables in Vercel:
NEXT_PUBLIC_OPENWEATHER_API_KEY
NEXT_PUBLIC_NEWS_API_KEY
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY


Access the live demo at the Vercel-provided URL (e.g., https://pgagi-analytics-pdf.vercel.app).

Live Demo: [Insert live demo URL after deployment]
Environment Variables

NEXT_PUBLIC_OPENWEATHER_API_KEY: API key for OpenWeatherMap.
NEXT_PUBLIC_NEWS_API_KEY: API key for NewsAPI.
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY: API key for Alpha Vantage.

API Setup

OpenWeatherMap API:
Sign up at openweathermap.org to get an API key.
Used for current weather and 7-day forecast data.


NewsAPI:
Register at newsapi.org to obtain an API key.
Provides categorized news headlines with pagination.


Alpha Vantage API:
Get an API key from alphavantage.co.
Supports daily, weekly, and monthly stock price data.



Screenshots

Weather Dashboard: Shows current weather and a 7-day forecast with an interactive temperature chart.
News Dashboard: Displays categorized news with pagination and a modal for article details.
Finance Dashboard: Presents stock data with daily, weekly, and monthly price trends in an interactive chart.
Sidebar: A stylish, sticky sidebar with gradient background, icons, and hover animations for navigation.

Additional Notes

Accessibility: The application adheres to WCAG 2.1 standards with ARIA attributes, keyboard navigation, and sr-only classes for screen readers.
Responsiveness: Built with Tailwind CSS, ensuring compatibility across devices (desktop, tablet, mobile).
Performance: Optimized with Next.js code splitting, RTK Query caching, and lazy-loaded components.
Type Safety: Uses strict TypeScript with no implicit any types, with type definitions for all API responses.
Styling: Combines Tailwind CSS for layout and SCSS Modules for component-scoped styles, with smooth CSS transitions for animations (e.g., sidebar hover effects).
Sidebar: Features a modern gradient background, emoji icons, and hover animations for an enhanced user experience.
Testing: Unit tests cover all dashboards, with mocks for API responses, ensuring robust functionality.
Limitations: Due to the 48-hour deadline, advanced features like city/stock autocomplete (e.g., GeoDB Cities API) and complex animations (e.g., Three.js) were omitted. These can be added for future iterations.
Submission: The GitHub repository link will be submitted by [insert your submission time, e.g., 11:25 AM IST, May 26, 2025], within the 48-hour deadline.

For any issues or further enhancements, contact [your contact info or GitHub username].
GitHub Repository: [Insert your GitHub repository URL]
