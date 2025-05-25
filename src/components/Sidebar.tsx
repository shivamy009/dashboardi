import React from 'react';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  activeSection: 'weather' | 'news' | 'finance';
  setActiveSection: (section: 'weather' | 'news' | 'finance') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <nav className={styles.sidebar} aria-label="Dashboard navigation">
      <div className={styles.logo}>
        <h2 className={styles.logoText}>PGAGI Dashboard</h2>
      </div>
      <ul className={styles.navList}>
        <li>
          <button
            className={`${styles.navItem} ${activeSection === 'weather' ? styles.active : ''}`}
            onClick={() => setActiveSection('weather')}
            aria-current={activeSection === 'weather' ? 'page' : undefined}
          >
            <span className={styles.icon}>🌤️</span>
            Weather
          </button>
        </li>
        <li>
          <button
            className={`${styles.navItem} ${activeSection === 'news' ? styles.active : ''}`}
            onClick={() => setActiveSection('news')}
            aria-current={activeSection === 'news' ? 'page' : undefined}
          >
            <span className={styles.icon}>📰</span>
            News
          </button>
        </li>
        <li>
          <button
            className={`${styles.navItem} ${activeSection === 'finance' ? styles.active : ''}`}
            onClick={() => setActiveSection('finance')}
            aria-current={activeSection === 'finance' ? 'page' : undefined}
          >
            <span className={styles.icon}>📈</span>
            Finance
          </button>
        </li>
      </ul>
    </nav>
  );
};