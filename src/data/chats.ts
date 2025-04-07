import { Chat } from '@/types';
import { nanoid } from 'nanoid';

export const chats: Chat[] = [
  {
    id: 'chat1',
    participants: ['u1', 'me'],
    messages: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    updatedAt: new Date().toISOString(),
    archived: false
  },
  {
    id: 'chat2',
    participants: ['u2', 'me'],
    messages: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    archived: false
  },
  {
    id: 'chat3',
    participants: ['u3', 'me'],
    messages: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    archived: false
  },
  {
    id: 'chat4',
    participants: ['u4', 'me'],
    messages: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    archived: false
  },
  {
    id: 'chat5',
    participants: ['u5', 'me'],
    messages: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    archived: false
  },
  {
    id: 'chat6',
    participants: ['u2', 'u3', 'me'],
    messages: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    archived: true
  }
];

export const archivedChats = chats.filter(chat => chat.archived);
export const activeChats = chats.filter(chat => !chat.archived);

export default chats; 