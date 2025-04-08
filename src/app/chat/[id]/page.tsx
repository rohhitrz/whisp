'use client';

import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import ChatArea from '@/components/ChatArea';
import TypingArea from '@/components/TypingArea';
import TypingIndicator from '@/components/TypingIndicator';
import MemoryDrawer from '@/components/MemoryDrawer';
import ConfirmationModal from '@/components/ConfirmationModal';
import { Message, User } from '@/types';
import { messagesMap } from '@/data/messages';
import { users, currentUser } from '@/data/users';
import { personas } from '@/data/personas';
import { useApp } from '@/components/AppProvider';
import { getAutoReply } from '@/utils/autoReply';
import styles from '@/styles/ChatPage.module.scss';

interface ChatPageProps {
  params: {
    id: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id: chatId } = params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState(users[0]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMemoryOpen, setIsMemoryOpen] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const { settings } = useApp();

  // Load initial messages from mock data or localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem(`whisp-chat-${chatId}`);
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Failed to parse saved messages', error);
        // Fallback to mock data if parsing fails
        setMessages(messagesMap[chatId] || []);
      }
    } else {
      setMessages(messagesMap[chatId] || []);
    }

    // Find the user for this chat
    const chatUser = users.find(u => {
      const chatIdNumber = parseInt(chatId.replace('chat', ''), 10);
      const userIdNumber = parseInt(u.id.replace('u', ''), 10);
      return chatIdNumber === userIdNumber;
    });
    
    if (chatUser) {
      setUser(chatUser);
    }
  }, [chatId]);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`whisp-chat-${chatId}`, JSON.stringify(messages));
    }
  }, [messages, chatId]);

  // Whisp AI Auto-Reply - Handle sending a new message and trigger auto-reply
  const handleSendMessage = (content: string, type: 'text' | 'image' | 'audio' | 'file') => {
    const newMessage: Message = {
      id: nanoid(),
      from: 'me',
      to: user.id,
      type,
      content,
      timestamp: new Date().toISOString(),
      delivered: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response if AI mode is enabled
    if (settings.aiMode) {
      // Find the persona associated with the user
      const userPersona = personas.find(p => p.name === user.persona);
      
      // Show typing indicator and set user as online
      setIsTyping(true);
      setUser(prev => ({
        ...prev,
        status: 'online',
        lastSeen: new Date().toISOString()
      }));
      
      // Generate reply after delay
      getAutoReply(userPersona || null, 'me', (replyMessage) => {
        // First hide the typing indicator
        setIsTyping(false);
        
        // Mark all previously sent messages as read
        setMessages(prev => 
          prev.map(msg => 
            msg.from === 'me' ? { ...msg, delivered: true, read: true } : msg
          )
        );
        
        // Then add the message
        setTimeout(() => {
          setMessages(prev => [...prev, replyMessage]);
        }, 100);
      });
    }
  };

  // Toggle memory drawer
  const toggleMemory = () => {
    setIsMemoryOpen(!isMemoryOpen);
  };

  // Show clear chat confirmation modal
  const openClearChatModal = () => {
    setShowClearModal(true);
  };

  // Clear chat history
  const clearChatHistory = () => {
    localStorage.removeItem(`whisp-chat-${chatId}`);
    setMessages([]);
  };

  return (
    <div className={styles.container}>
      <div 
        className={styles.background} 
        data-background={settings.background}
      />
      
      <Header 
        user={user}
        showBackButton
        onMemoryClick={toggleMemory}
        onClearChat={openClearChatModal}
      />
      
      <main className={styles.main}>
        <ChatArea 
          messages={messages}
          currentUserId="me"
        />
        
        <AnimatePresence>
          {isTyping && (
            <TypingIndicator isTyping={isTyping} userName={user.name} />
          )}
        </AnimatePresence>
        
        <TypingArea 
          onSendMessage={handleSendMessage}
          placeholder={`Message ${user.name}...`}
        />
      </main>
      
      <MemoryDrawer 
        isOpen={isMemoryOpen}
        onClose={() => setIsMemoryOpen(false)}
        messages={messages}
      />

      <ConfirmationModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={clearChatHistory}
        title="Clear Chat History"
        message="Are you sure you want to clear all messages in this chat? This action cannot be undone."
        confirmText="Clear History"
        cancelText="Cancel"
        isDestructive={true}
      />
    </div>
  );
} 