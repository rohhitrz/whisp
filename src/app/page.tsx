'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiPlus } from 'react-icons/fi';
import Header from '@/components/Header';
import ChatList from '@/components/ChatList';
import { activeChats } from '@/data/chats';
import { users, currentUser } from '@/data/users';
import { personas } from '@/data/personas';
import { useApp } from '@/components/AppProvider';
import styles from '@/styles/HomePage.module.scss';

export default function HomePage() {
  const [chats, setChats] = useState(activeChats);
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { settings, toggleTheme, toggleFont, toggleBubbleStyle, toggleBackground, toggleAIMode } = useApp();

  // Initialize data from localStorage if available
  useEffect(() => {
    const savedChats = localStorage.getItem('whispChats');
    if (savedChats) {
      try {
        setChats(JSON.parse(savedChats));
      } catch (error) {
        console.error('Failed to parse saved chats', error);
      }
    }
  }, []);

  // Save chats to localStorage when they change
  useEffect(() => {
    localStorage.setItem('whispChats', JSON.stringify(chats));
  }, [chats]);

  const handleArchiveChat = (chatId: string) => {
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId ? { ...chat, archived: true } : chat
      )
    );
  };

  const handleCreateNewChat = (personaId: string) => {
    // In a real app, we would make an API call here
    // For this mock, we'll just add a new chat to the list
    setShowPersonaModal(false);
  };

  return (
    <div className={styles.container}>
      <Header onSettingsClick={() => setShowSettingsModal(true)} showVaultButton />
      
      <main className={styles.main}>
        <div className={styles.chatListWrapper}>
          <ChatList 
            chats={chats.filter(chat => !chat.archived)} 
            users={users}
            onNewChat={() => setShowPersonaModal(true)}
            onArchive={handleArchiveChat}
          />
        </div>
        
        <div className={styles.welcomeSection}>
          <motion.div 
            className={styles.logoContainer}
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <div className={styles.logo}>
              <span className={styles.logoText}>W</span>
            </div>
          </motion.div>
          <h1 className={styles.title}>
            Welcome to <span className={styles.highlight}>Whisp X</span>
          </h1>
          <p className={styles.subtitle}>
            Select a chat or start a new conversation
          </p>
          <button 
            className={styles.newChatButton}
            onClick={() => setShowPersonaModal(true)}
          >
            <FiPlus />
            <span>New Chat</span>
          </button>
        </div>
      </main>
      
      {/* Persona Selection Modal */}
      <AnimatePresence>
        {showPersonaModal && (
          <motion.div 
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPersonaModal(false)}
          >
            <motion.div 
              className={styles.modal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h2 className={styles.modalTitle}>Choose a Chat Persona</h2>
              <div className={styles.personaGrid}>
                {personas.map(persona => (
                  <motion.div
                    key={persona.id}
                    className={styles.personaCard}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCreateNewChat(persona.id)}
                  >
                    <div className={styles.personaAvatar}>
                      <img src={persona.avatar} alt={persona.name} />
                    </div>
                    <h3 className={styles.personaName}>{persona.name}</h3>
                    <p className={styles.personaDescription}>{persona.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <motion.div 
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettingsModal(false)}
          >
            <motion.div 
              className={styles.modal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h2 className={styles.modalTitle}>Settings</h2>
              
              <div className={styles.settingGroup}>
                <h3>Appearance</h3>
                <div className={styles.settingItem}>
                  <span>Theme</span>
                  <button onClick={toggleTheme} className={styles.settingButton}>
                    {settings.theme === 'light' ? 'Light' : settings.theme === 'dark' ? 'Dark' : 'Solarized'}
                  </button>
                </div>
                <div className={styles.settingItem}>
                  <span>Font</span>
                  <button onClick={toggleFont} className={styles.settingButton}>
                    {settings.font}
                  </button>
                </div>
                <div className={styles.settingItem}>
                  <span>Bubble Style</span>
                  <button onClick={toggleBubbleStyle} className={styles.settingButton}>
                    {settings.bubbleStyle}
                  </button>
                </div>
                <div className={styles.settingItem}>
                  <span>Background</span>
                  <button onClick={toggleBackground} className={styles.settingButton}>
                    {settings.background}
                  </button>
                </div>
              </div>
              
              <div className={styles.settingGroup}>
                <h3>Chat</h3>
                <div className={styles.settingItem}>
                  <span>AI Mode</span>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox"
                      checked={settings.aiMode}
                      onChange={toggleAIMode}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <div className={styles.settingItem}>
                  <span>Clear All Chats</span>
                  <button 
                    className={`${styles.settingButton} ${styles.dangerButton}`}
                    onClick={() => {
                      if (confirm('Are you sure you want to clear all chats? This cannot be undone.')) {
                        setChats([]);
                        setShowSettingsModal(false);
                      }
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 