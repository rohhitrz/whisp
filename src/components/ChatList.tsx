'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiPlus, FiArchive, FiMoreVertical } from 'react-icons/fi';
import Link from 'next/link';
import Avatar from './Avatar';
import { Chat, User } from '@/types';
import { formatTime, formatDate } from '@/utils/dateUtils';
import styles from '@/styles/ChatList.module.scss';

interface ChatListProps {
  chats: Chat[];
  users: User[];
  currentChat?: string;
  onNewChat: () => void;
  onArchive: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  users,
  currentChat,
  onNewChat,
  onArchive,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState<string | null>(null);

  const getUserById = (userId: string): User | undefined => {
    return users.find(user => user.id === userId);
  };

  const getOtherParticipant = (chat: Chat): User | undefined => {
    const otherUserId = chat.participants.find(id => id !== 'me');
    return otherUserId ? getUserById(otherUserId) : undefined;
  };

  const getLastMessagePreview = (chat: Chat): string => {
    // In a real app, we would get this from the last message
    // For this mock, we'll return a placeholder
    return 'Lorem ipsum dolor sit amet...';
  };

  const filteredChats = chats.filter(chat => {
    if (!searchTerm) return true;
    
    const otherUser = getOtherParticipant(chat);
    if (!otherUser) return false;
    
    return otherUser.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={styles.chatList}>
      <div className={styles.header}>
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search conversations..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className={styles.newChatButton} onClick={onNewChat}>
          <FiPlus />
        </button>
      </div>

      <div className={styles.chatsContainer}>
        <AnimatePresence>
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => {
              const otherUser = getOtherParticipant(chat);
              if (!otherUser) return null;

              return (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className={`${styles.chatItem} ${currentChat === chat.id ? styles.active : ''}`}
                >
                  <Link href={`/chat/${chat.id}`} className={styles.chatLink}>
                    <Avatar 
                      src={otherUser.avatar} 
                      alt={otherUser.name} 
                      status={otherUser.status} 
                      size="medium" 
                    />
                    <div className={styles.chatInfo}>
                      <div className={styles.chatHeader}>
                        <h3 className={styles.chatName}>{otherUser.name}</h3>
                        <span className={styles.chatTime}>
                          {formatTime(new Date(chat.updatedAt))}
                        </span>
                      </div>
                      <p className={styles.chatPreview}>
                        {getLastMessagePreview(chat)}
                      </p>
                    </div>
                  </Link>
                  
                  <button 
                    className={styles.optionsButton}
                    onClick={() => setShowOptions(showOptions === chat.id ? null : chat.id)}
                  >
                    <FiMoreVertical />
                  </button>
                  
                  {showOptions === chat.id && (
                    <motion.div 
                      className={styles.optionsMenu}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <button 
                        className={styles.optionItem}
                        onClick={() => {
                          onArchive(chat.id);
                          setShowOptions(null);
                        }}
                      >
                        <FiArchive />
                        <span>Archive chat</span>
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.emptyState}
            >
              <p>No conversations found</p>
              <button onClick={onNewChat} className={styles.emptyStateButton}>
                Start a new chat
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatList; 