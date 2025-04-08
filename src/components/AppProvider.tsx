'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, Font, BubbleStyle, Background, UserSettings } from '@/types';

interface AppContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  toggleTheme: () => void;
  toggleFont: () => void;
  toggleBubbleStyle: () => void;
  toggleBackground: () => void;
  toggleAIMode: () => void;
}

const defaultSettings: UserSettings = {
  theme: 'light',
  font: 'Outfit',
  bubbleStyle: 'rounded',
  background: 'none',
  aiMode: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isClient, setIsClient] = useState(false);

  // On component mount, check for saved settings in localStorage
  useEffect(() => {
    setIsClient(true);
    const savedSettings = localStorage.getItem('whispSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
      } catch (error) {
        console.error('Failed to parse saved settings', error);
      }
    }
  }, []);

  // Apply theme to document whenever it changes
  useEffect(() => {
    if (isClient) {
      document.documentElement.setAttribute('data-theme', settings.theme);
      document.documentElement.setAttribute('data-font', settings.font);
      
      // Save settings to localStorage whenever they change
      localStorage.setItem('whispSettings', JSON.stringify(settings));
    }
  }, [settings, isClient]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark'];
    const currentIndex = themes.indexOf(settings.theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    updateSettings({ theme: themes[nextIndex] });
  };

  const toggleFont = () => {
    const fonts: Font[] = ['Outfit', 'Inter', 'DM Sans'];
    const currentIndex = fonts.indexOf(settings.font);
    const nextIndex = (currentIndex + 1) % fonts.length;
    updateSettings({ font: fonts[nextIndex] });
  };

  const toggleBubbleStyle = () => {
    const bubbleStyles: BubbleStyle[] = ['rounded', 'flat'];
    const currentIndex = bubbleStyles.indexOf(settings.bubbleStyle);
    const nextIndex = (currentIndex + 1) % bubbleStyles.length;
    updateSettings({ bubbleStyle: bubbleStyles[nextIndex] });
  };

  const toggleBackground = () => {
    const backgrounds: Background[] = ['none', 'texture', 'gradient', 'blur', 'starscape'];
    const currentIndex = backgrounds.indexOf(settings.background);
    const nextIndex = (currentIndex + 1) % backgrounds.length;
    updateSettings({ background: backgrounds[nextIndex] });
  };

  const toggleAIMode = () => {
    updateSettings({ aiMode: !settings.aiMode });
  };

  const value = {
    settings,
    updateSettings,
    toggleTheme,
    toggleFont,
    toggleBubbleStyle,
    toggleBackground,
    toggleAIMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 