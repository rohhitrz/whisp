'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/TypingIndicator.module.scss';

interface TypingIndicatorProps {
  isTyping: boolean;
  userName: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isTyping, userName }) => {
  return (
    <AnimatePresence>
      {isTyping && (
        <motion.div
          className={styles.typingIndicator}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <span className={styles.userName}>{userName}</span> is typing
          <span className={styles.dots}>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              .
            </motion.span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TypingIndicator; 