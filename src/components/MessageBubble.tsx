'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaThumbtack, FaCheck, FaCheckDouble } from 'react-icons/fa';
import { Message } from '@/types';
import { formatTime } from '@/utils/dateUtils';
import styles from '@/styles/MessageBubble.module.scss';
import { useApp } from './AppProvider';

interface MessageBubbleProps {
  message: Message;
  isSent: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isSent }) => {
  const [dragOffset, setDragOffset] = useState(0);
  const [liked, setLiked] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [formattedTime, setFormattedTime] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [reaction, setReaction] = useState<string | null>(null);
  const { settings } = useApp();

  useEffect(() => {
    setFormattedTime(formatTime(new Date(message.timestamp)));
  }, [message.timestamp]);

  const handleDragEnd = (event: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) {
      setLiked(true);
      setDragOffset(0);
    } else if (info.offset.x > 50) {
      setPinned(true);
      setDragOffset(0);
    } else {
      setDragOffset(0);
    }
  };

  const handleReaction = (emoji: string) => {
    setReaction(emoji);
    setIsHovered(false);
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'text':
        return <p className={styles.text}>{message.content}</p>;
      case 'image':
        return (
          <div className={styles.imageContainer}>
            <img src={message.content} alt="Image message" className={styles.image} />
          </div>
        );
      case 'audio':
        return (
          <div className={styles.audioContainer}>
            <div className={styles.waveform}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i} 
                  className={styles.bar} 
                  style={{ height: `${Math.random() * 20 + 5}px` }} 
                />
              ))}
            </div>
            <span className={styles.audioLabel}>{message.content}</span>
          </div>
        );
      case 'file':
        return (
          <div className={styles.fileContainer}>
            <div className={styles.fileIcon}>📄</div>
            <span className={styles.fileName}>{message.content}</span>
          </div>
        );
      default:
        return <p className={styles.text}>{message.content}</p>;
    }
  };

  const bubbleVariants = {
    initial: { 
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  const getDeliveryStatus = () => {
    if (isSent) {
      if (message.read) {
        return <FaCheckDouble className={styles.readIcon} />;
      } else if (message.delivered) {
        return <FaCheckDouble className={styles.deliveredIcon} />;
      } else {
        return <FaCheck className={styles.sentIcon} />;
      }
    }
    return null;
  };

  const bubbleClass = isSent 
    ? `${styles.bubble} ${styles.sent} ${styles[`bubbleStyle${settings.bubbleStyle === 'rounded' ? 'Rounded' : 'Flat'}`]}`
    : `${styles.bubble} ${styles.received} ${styles[`bubbleStyle${settings.bubbleStyle === 'rounded' ? 'Rounded' : 'Flat'}`]}`;

  return (
    <motion.div
      className={`${styles.bubbleContainer} ${isSent ? styles.sent : styles.received}`}
      initial="initial"
      animate="animate"
      variants={bubbleVariants}
      drag="x"
      dragConstraints={{ left: -50, right: 50 }}
      onDragEnd={handleDragEnd}
      style={{ x: dragOffset }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {liked && <FaHeart className={`${styles.reactionIcon} ${styles.likeIcon}`} />}
      {pinned && <FaThumbtack className={`${styles.reactionIcon} ${styles.pinIcon}`} />}
      {reaction && (
        <div className={styles.emojiReaction}>
          {reaction}
        </div>
      )}
      
      <div className={bubbleClass}>
        {renderMessageContent()}
        <div className={styles.metadata}>
          <time className={styles.timestamp}>{formattedTime}</time>
          {getDeliveryStatus()}
        </div>
      </div>
      
      <AnimatePresence>
        {isHovered && !reaction && (
          <motion.div
            className={styles.reactionOptions}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <button 
              className={styles.reactionButton}
              onClick={() => handleReaction('❤️')}
            >
              ❤️
            </button>
            <button 
              className={styles.reactionButton}
              onClick={() => handleReaction('👍')}
            >
              👍
            </button>
            <button 
              className={styles.reactionButton}
              onClick={() => handleReaction('😂')}
            >
              😂
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MessageBubble; 