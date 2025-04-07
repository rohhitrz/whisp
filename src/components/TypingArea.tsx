'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiPaperclip, FiMic, FiSmile } from 'react-icons/fi';
import styles from '@/styles/TypingArea.module.scss';

interface TypingAreaProps {
  onSendMessage: (message: string, type: 'text' | 'image' | 'audio' | 'file') => void;
  placeholder?: string;
}

const TypingArea: React.FC<TypingAreaProps> = ({
  onSendMessage,
  placeholder = 'Type a message...',
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle emoji selection
  const emojis = ['😊', '👍', '❤️', '😂', '🎉', '🔥', '👀', '✨', '🙏', '😎', '🤔', '👋'];

  // Handle send message
  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message, 'text');
      setMessage('');
      inputRef.current?.focus();
    }
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type.split('/')[0];
    const fileReaderType = fileType === 'image' ? 'image' : 'file';
    
    const mockContent = fileType === 'image' 
      ? 'https://images.unsplash.com/photo-1554519934-e32b1629d9ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
      : file.name;
    
    onSendMessage(mockContent, fileReaderType as 'image' | 'file');
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle recording
  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    
    // Simulate sending a voice note
    onSendMessage('voice-message.mp3', 'audio');
  };

  // Format recording time
  const formatRecordingTime = () => {
    const minutes = Math.floor(recordingTime / 60);
    const seconds = recordingTime % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.typingArea}>
      <AnimatePresence>
        {showEmoji && (
          <motion.div 
            className={styles.emojiPicker}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {emojis.map((emoji) => (
              <button 
                key={emoji}
                className={styles.emojiButton}
                onClick={() => {
                  setMessage(prev => prev + emoji);
                  setShowEmoji(false);
                  inputRef.current?.focus();
                }}
              >
                {emoji}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.inputContainer}>
        <button 
          className={styles.iconButton}
          onClick={() => setShowEmoji(!showEmoji)}
        >
          <FiSmile />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className={styles.fileInput}
          accept="image/*,audio/*,application/*"
        />
        <button 
          className={styles.iconButton}
          onClick={() => fileInputRef.current?.click()}
        >
          <FiPaperclip />
        </button>

        <input
          ref={inputRef}
          type="text"
          className={styles.messageInput}
          placeholder={isRecording ? 'Recording...' : placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isRecording}
        />
        
        {isRecording && (
          <div className={styles.recordingIndicator}>
            <div className={styles.recordingDot} />
            <span className={styles.recordingTime}>{formatRecordingTime()}</span>
          </div>
        )}

        {message.trim() ? (
          <button 
            className={`${styles.iconButton} ${styles.sendButton}`}
            onClick={handleSendMessage}
          >
            <FiSend />
          </button>
        ) : (
          <button 
            className={`${styles.iconButton} ${styles.micButton}`}
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
          >
            <FiMic />
          </button>
        )}
      </div>
    </div>
  );
};

export default TypingArea; 