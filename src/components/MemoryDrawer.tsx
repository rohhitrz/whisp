'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiMessageSquare, FiCalendar, FiBriefcase, FiActivity } from 'react-icons/fi';
import SlideDrawer from './SlideDrawer';
import styles from '@/styles/MemoryDrawer.module.scss';
import { Message } from '@/types';

interface MemoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
}

const MemoryDrawer: React.FC<MemoryDrawerProps> = ({ isOpen, onClose, messages }) => {
  const [insights, setInsights] = useState({
    totalMessages: 0,
    firstMessageDate: '',
    averageReplyTime: '',
    mostUsedWord: '',
    vibeSummary: ''
  });

  useEffect(() => {
    if (messages.length > 0) {
      // Calculate insights from messages
      analyzeMessages(messages);
    }
  }, [messages]);

  const analyzeMessages = (msgs: Message[]) => {
    // Calculate total messages
    const totalMessages = msgs.length;
    
    // Find first message date
    const firstMessage = msgs[0];
    const firstDate = new Date(firstMessage.timestamp);
    const formattedFirstDate = firstDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    // Mock average reply time (would calculate from real timestamps in production)
    const mockReplyTimes = ['2 minutes', '5 minutes', '30 seconds', '1 minute', '3 minutes'];
    const randomIndex = Math.floor(Math.random() * mockReplyTimes.length);
    const averageReplyTime = mockReplyTimes[randomIndex];
    
    // Simple word analysis (in a real app, would filter out common words)
    const wordMap: Record<string, number> = {};
    msgs.forEach(message => {
      if (message.type === 'text') {
        const words = message.content.toLowerCase().split(/\s+/);
        words.forEach(word => {
          // Filter out very short words and common words
          if (word.length > 3 && !['this', 'that', 'with', 'from', 'have', 'your'].includes(word)) {
            wordMap[word] = (wordMap[word] || 0) + 1;
          }
        });
      }
    });
    
    let mostUsedWord = '';
    let maxCount = 0;
    
    Object.entries(wordMap).forEach(([word, count]) => {
      if (count > maxCount) {
        mostUsedWord = word;
        maxCount = count;
      }
    });
    
    // If no word was found with the filtering, provide a fallback
    if (!mostUsedWord) {
      mostUsedWord = '(not enough data)';
    }
    
    // Generate a mock vibe summary
    const vibes = ['chill', 'energetic', 'thoughtful', 'creative', 'chaotic', 'focused', 'deep', 'optimistic'];
    const vibe = vibes[Math.floor(Math.random() * vibes.length)];
    
    setInsights({
      totalMessages,
      firstMessageDate: formattedFirstDate,
      averageReplyTime,
      mostUsedWord,
      vibeSummary: vibe
    });
  };

  return (
    <SlideDrawer isOpen={isOpen} onClose={onClose} title="Memory Mode">
      <div className={styles.memoryContainer}>
        <h4 className={styles.sectionTitle}>Conversation Insights</h4>
        
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}>
            <FiMessageSquare />
          </div>
          <div className={styles.insightContent}>
            <h5>Total Messages</h5>
            <p>{insights.totalMessages}</p>
          </div>
        </div>
        
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}>
            <FiCalendar />
          </div>
          <div className={styles.insightContent}>
            <h5>First Message</h5>
            <p>{insights.firstMessageDate}</p>
          </div>
        </div>
        
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}>
            <FiClock />
          </div>
          <div className={styles.insightContent}>
            <h5>Average Reply Time</h5>
            <p>{insights.averageReplyTime}</p>
          </div>
        </div>
        
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}>
            <FiBriefcase />
          </div>
          <div className={styles.insightContent}>
            <h5>Most Used Word</h5>
            <p>{insights.mostUsedWord}</p>
          </div>
        </div>
        
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}>
            <FiActivity />
          </div>
          <div className={styles.insightContent}>
            <h5>Conversation Vibe</h5>
            <p>{insights.vibeSummary}</p>
          </div>
        </div>
      </div>
    </SlideDrawer>
  );
};

export default MemoryDrawer; 