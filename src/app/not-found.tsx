'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import styles from '@/styles/NotFound.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className={styles.icon}
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          💬
        </motion.div>
        
        <h1 className={styles.title}>Whisp away...</h1>
        
        <p className={styles.message}>
          You've drifted off the conversation. This page doesn't exist.
        </p>
        
        <Link href="/" className={styles.button}>
          <FiArrowLeft />
          <span>Return to Home</span>
        </Link>
      </motion.div>
    </div>
  );
} 