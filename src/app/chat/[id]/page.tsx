'use client';

import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Header from '@/components/Header';
import ChatArea from '@/components/ChatArea';
import TypingArea from '@/components/TypingArea';
import { Message } from '@/types';
import { messagesMap } from '@/data/messages';
import { users, currentUser } from '@/data/users';
import { personas } from '@/data/personas';
import { useApp } from '@/components/AppProvider';
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

  // Simulate typing and response for AI
  const simulateResponse = (message: Message) => {
    // Find the persona associated with the user
    const userPersona = personas.find(p => p.name === user.persona);
    
    if (!userPersona || !settings.aiMode) return;
    
    // Set typing indicator
    setTimeout(() => {
      // Choose a random reply from the persona's replies
      const replyIndex = Math.floor(Math.random() * userPersona.replies.length);
      const replyContent = userPersona.replies[replyIndex];
      
      // Add the AI response
      const aiResponse: Message = {
        id: nanoid(),
        from: user.id,
        to: 'me',
        type: 'text',
        content: replyContent,
        timestamp: new Date().toISOString(),
        delivered: true,
        read: true
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1500 + Math.random() * 2000); // Random delay between 1.5 and 3.5 seconds
  };

  // Handle sending a new message
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
      simulateResponse(newMessage);
    }
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
      />
      
      <main className={styles.main}>
        <ChatArea 
          messages={messages}
          currentUserId="me"
        />
        
        <TypingArea 
          onSendMessage={handleSendMessage}
          placeholder={`Message ${user.name}...`}
        />
      </main>
    </div>
  );
} 