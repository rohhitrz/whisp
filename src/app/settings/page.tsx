'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import BackgroundSelector from '@/components/BackgroundSelector';
import { useApp } from '@/components/AppProvider';
import styles from '@/styles/SettingsPage.module.scss';

export default function SettingsPage() {
  const { 
    settings, 
    toggleTheme, 
    toggleFont, 
    toggleBubbleStyle, 
    updateSettings 
  } = useApp();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          <FiArrowLeft />
        </Link>
        <h1 className={styles.title}>Settings</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Appearance</h2>
          
          <div className={styles.settingItem}>
            <div className={styles.settingLabel}>
              <h3>Theme</h3>
              <p>Choose light or dark mode</p>
            </div>
            <button onClick={toggleTheme} className={styles.settingToggle}>
              {settings.theme === 'light' ? 'Light' : 'Dark'}
            </button>
          </div>
          
          <div className={styles.settingItem}>
            <div className={styles.settingLabel}>
              <h3>Font</h3>
              <p>Change the app typography</p>
            </div>
            <button onClick={toggleFont} className={styles.settingToggle}>
              {settings.font}
            </button>
          </div>
          
          <div className={styles.settingItem}>
            <div className={styles.settingLabel}>
              <h3>Message Style</h3>
              <p>Adjust message bubble style</p>
            </div>
            <button onClick={toggleBubbleStyle} className={styles.settingToggle}>
              {settings.bubbleStyle === 'rounded' ? 'Rounded' : 'Flat'}
            </button>
          </div>
        </section>
        
        <section className={styles.section}>
          <BackgroundSelector 
            currentBackground={settings.background}
            onChange={(background) => updateSettings({ background })}
          />
        </section>

        <section className={styles.section}>
          <div className={styles.settingItem}>
            <div className={styles.settingLabel}>
              <h3>Chat AI Mode</h3>
              <p>Enable smart AI responses</p>
            </div>
            <label className={styles.switch}>
              <input 
                type="checkbox"
                checked={settings.aiMode}
                onChange={() => updateSettings({ aiMode: !settings.aiMode })}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </section>
      </main>
    </div>
  );
} 