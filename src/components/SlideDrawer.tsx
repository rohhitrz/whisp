'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import styles from '@/styles/SlideDrawer.module.scss';

interface SlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const SlideDrawer: React.FC<SlideDrawerProps> = ({
  isOpen,
  onClose,
  children,
  title = 'Drawer'
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className={styles.header}>
              <h3 className={styles.title}>{title}</h3>
              <button 
                className={styles.closeButton}
                onClick={onClose}
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className={styles.content}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SlideDrawer; 