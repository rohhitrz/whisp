'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiSettings, FiArchive, FiActivity, FiMoreVertical, FiTrash2 } from 'react-icons/fi';
import Avatar from './Avatar';
import { User } from '@/types';
import { formatTimeAgo } from '@/utils/dateUtils';
import styles from '@/styles/Header.module.scss';
import Link from 'next/link';

interface HeaderProps {
  user?: User;
  onMenuClick?: () => void;
  onSettingsClick?: () => void;
  onMemoryClick?: () => void;
  onClearChat?: () => void;
  showBackButton?: boolean;
  showVaultButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  user,
  onMenuClick,
  onSettingsClick,
  onMemoryClick,
  onClearChat,
  showBackButton = false,
  showVaultButton = false,
}) => {
  const [lastSeen, setLastSeen] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Simulate typing indicator and last seen updates
  useEffect(() => {
    if (!user) return;

    const typingInterval = setInterval(() => {
      if (user.status === 'online') {
        const shouldType = Math.random() > 0.7;
        setIsTyping(shouldType);
        
        if (!shouldType) {
          setLastSeen('Online');
        }
      } else {
        setIsTyping(false);
        if (user.lastSeen) {
          setLastSeen(formatTimeAgo(new Date(user.lastSeen)));
        }
      }
    }, 3000);

    return () => clearInterval(typingInterval);
  }, [user]);

  const statusText = isTyping ? 'typing...' : lastSeen;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClearChat = () => {
    setShowMenu(false);
    if (onClearChat) {
      onClearChat();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {showBackButton ? (
          <Link href="/" className={styles.backButton}>
            <span className={styles.backArrow}>←</span>
          </Link>
        ) : (
          <button onClick={onMenuClick} className={styles.iconButton}>
            <FiMenu />
          </button>
        )}
        
        {user && (
          <motion.div 
            className={styles.userInfo}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Avatar 
              src={user.avatar} 
              alt={user.name} 
              status={user.status} 
              size="medium" 
            />
            <div className={styles.userDetails}>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userStatus}>
                {isTyping && (
                  <motion.div
                    className={styles.typingIndicator}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.span
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: 0 }}
                    >•</motion.span>
                    <motion.span
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: 0.15 }}
                    >•</motion.span>
                    <motion.span
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: 0.3 }}
                    >•</motion.span>
                  </motion.div>
                )}
                <span className={`${styles.statusText} ${isTyping ? styles.typing : ''}`}>
                  {statusText}
                </span>
              </div>
              {user.persona && (
                <div className={styles.personaBadge}>{user.persona}</div>
              )}
            </div>
          </motion.div>
        )}
      </div>
      
      <div className={styles.rightSection}>
        {showVaultButton && (
          <Link href="/vault" className={styles.iconButton}>
            <FiArchive />
          </Link>
        )}
        
        {onMemoryClick && (
          <button onClick={onMemoryClick} className={styles.iconButton}>
            <FiActivity />
          </button>
        )}

        {onClearChat && (
          <div className={styles.menuContainer}>
            <button onClick={toggleMenu} className={styles.iconButton}>
              <FiMoreVertical />
            </button>
            
            <AnimatePresence>
              {showMenu && (
                <motion.div 
                  className={styles.menuDropdown}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <button 
                    className={styles.menuItem}
                    onClick={handleClearChat}
                  >
                    <FiTrash2 />
                    <span>Clear Chat History</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        
        <button onClick={onSettingsClick} className={styles.iconButton}>
          <FiSettings />
        </button>
      </div>
    </header>
  );
};

export default Header; 