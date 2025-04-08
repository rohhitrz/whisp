'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Background } from '@/types';
import styles from '@/styles/BackgroundSelector.module.scss';

interface BackgroundOption {
  id: Background;
  name: string;
  preview: string;
}

interface BackgroundSelectorProps {
  currentBackground: Background;
  onChange: (background: Background) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  currentBackground,
  onChange
}) => {
  const backgroundOptions: BackgroundOption[] = [
    {
      id: 'none',
      name: 'None',
      preview: '/backgrounds/none.png'
    },
    {
      id: 'gradient',
      name: 'Gradient',
      preview: '/backgrounds/gradient.png'
    },
    {
      id: 'blur',
      name: 'Anime Panel',
      preview: '/backgrounds/anime.png'
    },
    {
      id: 'texture',
      name: 'Soft Grid',
      preview: '/backgrounds/grid.png'
    }
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Chat Background</h3>
      
      <div className={styles.optionsGrid}>
        {backgroundOptions.map(option => (
          <motion.div
            key={option.id}
            className={`${styles.option} ${currentBackground === option.id ? styles.selected : ''}`}
            onClick={() => onChange(option.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div 
              className={styles.preview}
              style={{ backgroundImage: `url(${option.preview})` }}
            />
            <div className={styles.name}>{option.name}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundSelector; 