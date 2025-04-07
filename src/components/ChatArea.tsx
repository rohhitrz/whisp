'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import MessageBubble from './MessageBubble';
import { Message } from '@/types';
import { getDateGroup } from '@/utils/dateUtils';
import styles from '@/styles/ChatArea.module.scss';

interface ChatAreaProps {
  messages: Message[];
  currentUserId: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, currentUserId }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [visibleDateGroup, setVisibleDateGroup] = useState<string | null>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Handle scroll event to show/hide scroll button
  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom);
    
    // Simplified approach: Just check if scrolling and update visibility
    if (!isNearBottom && messages.length > 0) {
      const firstMessageDate = getDateGroup(new Date(messages[0].timestamp));
      setVisibleDateGroup(firstMessageDate);
    } else {
      setVisibleDateGroup(null);
    }
  };

  // Group messages by date
  const messagesByDate = messages.reduce<Record<string, Message[]>>((groups, message) => {
    const date = getDateGroup(new Date(message.timestamp));
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className={styles.container}>
      <div 
        className={styles.chatArea}
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        {Object.entries(messagesByDate).map(([date, dateMessages]) => (
          <div key={date} className={styles.dateGroup} data-date={date}>
            <div className={styles.dateHeader}>
              <span className={styles.dateBadge}>{date}</span>
            </div>
            
            <div className={styles.messagesGroup}>
              {dateMessages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isSent={message.from === currentUserId}
                />
              ))}
            </div>
          </div>
        ))}
        
        {messages.length === 0 && (
          <div className={styles.emptyState}>
            <motion.div
              className={styles.emptyStateAnimation}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <span className={styles.emptyStateIcon}>💬</span>
            </motion.div>
            <p>No messages yet. Say hello!</p>
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            className={styles.scrollButton}
            onClick={scrollToBottom}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiArrowDown />
          </motion.button>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {visibleDateGroup && showScrollButton && (
          <motion.div
            className={styles.floatingDate}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {visibleDateGroup}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatArea; 