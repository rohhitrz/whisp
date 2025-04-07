'use client';

import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { motion } from 'framer-motion';
import styles from '@/styles/Avatar.module.scss';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
  status?: 'online' | 'offline' | 'away';
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'medium',
  status,
  onClick,
}) => {
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (avatarRef.current) {
      VanillaTilt.init(avatarRef.current, {
        max: 15,
        speed: 200,
        glare: true,
        'max-glare': 0.2,
        scale: 1.05,
      });
    }

    return () => {
      if (avatarRef.current && (avatarRef.current as any).vanillaTilt) {
        (avatarRef.current as any).vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <motion.div
      ref={avatarRef}
      className={`${styles.avatar} ${styles[size]} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={styles.wrapper}>
        <img src={src} alt={alt} className={styles.image} />
        {status && <span className={`${styles.status} ${styles[status]}`} />}
      </div>
    </motion.div>
  );
};

export default Avatar; 