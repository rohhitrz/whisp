// User type definition
export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  persona: string;
  lastSeen?: string;
}

// Message type definition
export interface Message {
  id: string;
  from: string;
  to: string;
  type: 'text' | 'image' | 'audio' | 'file';
  content: string;
  timestamp: string;
  read?: boolean;
  delivered?: boolean;
}

// Persona type definition
export interface Persona {
  id: string;
  name: string;
  tone: string;
  replies: string[];
  avatar: string;
  description: string;
}

// Chat type definition
export interface Chat {
  id: string;
  participants: string[];
  messages: string[];
  createdAt: string;
  updatedAt: string;
  archived?: boolean;
}

// Theme type definition
export type Theme = 'light' | 'dark';

// Font type definition
export type Font = 'Outfit' | 'Inter' | 'DM Sans';

// Bubble style type definition
export type BubbleStyle = 'rounded' | 'flat';

// Background type definition
export type Background = 'texture' | 'gradient' | 'blur' | 'starscape' | 'none';

// User settings type definition
export interface UserSettings {
  theme: Theme;
  font: Font;
  bubbleStyle: BubbleStyle;
  background: Background;
  aiMode: boolean;
} 