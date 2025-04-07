'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import Header from '@/components/Header';
import Avatar from '@/components/Avatar';
import { archivedChats } from '@/data/chats';
import { users } from '@/data/users';
import { formatDate } from '@/utils/dateUtils';
import styles from '@/styles/VaultPage.module.scss';
import confetti from 'canvas-confetti';

export default function VaultPage() {
  const [chats, setChats] = useState(archivedChats);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  // Initialize data from localStorage if available
  useEffect(() => {
    const savedChats = localStorage.getItem('whispChats');
    if (savedChats) {
      try {
        const allChats = JSON.parse(savedChats);
        setChats(allChats.filter((chat: any) => chat.archived));
      } catch (error) {
        console.error('Failed to parse saved chats', error);
      }
    }
  }, []);

  // Run confetti effect when requested
  useEffect(() => {
    if (showConfetti) {
      const confettiDuration = 2000;
      const end = Date.now() + confettiDuration;

      const runConfetti = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ['#6a8caf', '#f05d5e', '#364f6b'],
        });
        
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ['#6a8caf', '#f05d5e', '#364f6b'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(runConfetti);
        }
      };

      runConfetti();
      setTimeout(() => setShowConfetti(false), confettiDuration);
    }
  }, [showConfetti]);

  const getUserById = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  const getOtherParticipant = (chat: any) => {
    const otherUserId = chat.participants.find((id: string) => id !== 'me');
    return otherUserId ? getUserById(otherUserId) : undefined;
  };

  const handleRestoreChat = (chatId: string) => {
    // In a real app, we would make an API call here
    // For this mock, we'll update localStorage
    const savedChats = localStorage.getItem('whispChats');
    if (savedChats) {
      try {
        const allChats = JSON.parse(savedChats);
        const updatedChats = allChats.map((chat: any) => 
          chat.id === chatId ? { ...chat, archived: false } : chat
        );
        localStorage.setItem('whispChats', JSON.stringify(updatedChats));
        setChats(chats.filter(chat => chat.id !== chatId));
      } catch (error) {
        console.error('Failed to update chats', error);
      }
    }
  };

  const handleDeleteChat = (chatId: string) => {
    // In a real app, we would make an API call here
    // For this mock, we'll update localStorage
    const savedChats = localStorage.getItem('whispChats');
    if (savedChats) {
      try {
        const allChats = JSON.parse(savedChats);
        const updatedChats = allChats.filter((chat: any) => chat.id !== chatId);
        localStorage.setItem('whispChats', JSON.stringify(updatedChats));
        setChats(chats.filter(chat => chat.id !== chatId));
      } catch (error) {
        console.error('Failed to delete chat', error);
      }
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all archived chats? This cannot be undone.')) {
      const savedChats = localStorage.getItem('whispChats');
      if (savedChats) {
        try {
          const allChats = JSON.parse(savedChats);
          const updatedChats = allChats.filter((chat: any) => !chat.archived);
          localStorage.setItem('whispChats', JSON.stringify(updatedChats));
          setChats([]);
          setShowConfetti(true);
        } catch (error) {
          console.error('Failed to clear vault', error);
        }
      }
    }
  };

  const filteredChats = chats.filter(chat => {
    if (!searchTerm) return true;
    
    const otherUser = getOtherParticipant(chat);
    if (!otherUser) return false;
    
    return otherUser.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={styles.container}>
      <Header showBackButton showVaultButton={false} />
      
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Whisp Vault</h1>
          <p className={styles.subtitle}>Your archived conversations</p>
          
          <div className={styles.searchContainer}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search vault..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {chats.length > 0 && (
          <button 
            className={styles.clearButton}
            onClick={handleClearAll}
          >
            Clear All
          </button>
        )}
        
        <div className={styles.chatsGrid}>
          <AnimatePresence>
            {filteredChats.length > 0 ? (
              filteredChats.map(chat => {
                const otherUser = getOtherParticipant(chat);
                if (!otherUser) return null;

                return (
                  <motion.div
                    key={chat.id}
                    className={styles.chatCard}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.chatCardAvatar}>
                      <Avatar 
                        src={otherUser.avatar} 
                        alt={otherUser.name} 
                        size="large" 
                      />
                    </div>
                    <h3 className={styles.chatCardName}>{otherUser.name}</h3>
                    <p className={styles.chatCardDate}>
                      Archived: {formatDate(new Date(chat.updatedAt))}
                    </p>
                    <div className={styles.chatCardActions}>
                      <button 
                        className={`${styles.actionButton} ${styles.restoreButton}`}
                        onClick={() => handleRestoreChat(chat.id)}
                      >
                        <FiRefreshCw /> Restore
                      </button>
                      <button 
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => handleDeleteChat(chat.id)}
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                className={styles.emptyState}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className={styles.emptyIcon}>🔍</div>
                <h2 className={styles.emptyTitle}>
                  {searchTerm ? 'No results found' : 'Your vault is empty'}
                </h2>
                <p className={styles.emptyText}>
                  {searchTerm 
                    ? 'Try a different search term'
                    : 'Archived conversations will appear here'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
} 