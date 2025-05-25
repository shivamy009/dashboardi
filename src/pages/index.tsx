import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { WeatherDashboard } from '@/components/WeatherDashboard';
import { NewsDashboard } from '@/components/NewsDashboard';
import { FinanceDashboard } from '@/components/FinanceDashboard';
import styles from '@/styles/App.module.scss';

const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'weather' | 'news' | 'finance'>('weather');

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Analytics Dashboard</h1>
      </header>
      <div className={styles.layout}>
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className={styles.main}>
          {activeSection === 'weather' && <WeatherDashboard />}
          {activeSection === 'news' && <NewsDashboard />}
          {activeSection === 'finance' && <FinanceDashboard />}
        </main>
      </div>
    </div>
  );
};

export default Home;