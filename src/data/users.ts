import { User } from '@/types';

export const users: User[] = [
  {
    id: 'u1',
    name: 'Zara',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    status: 'online',
    persona: 'Therapist',
    lastSeen: new Date().toISOString()
  },
  {
    id: 'u2',
    name: 'Alex',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'away',
    persona: 'Mentor',
    lastSeen: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 minutes ago
  },
  {
    id: 'u3',
    name: 'Maya',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    status: 'offline',
    persona: 'Jokester',
    lastSeen: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
  },
  {
    id: 'u4',
    name: 'Ravi',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    status: 'online',
    persona: 'Poet',
    lastSeen: new Date().toISOString()
  },
  {
    id: 'u5',
    name: 'Sophie',
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
    status: 'offline',
    persona: 'Mentor',
    lastSeen: new Date(Date.now() - 1000 * 60 * 60).toISOString() // 1 hour ago
  }
];

export const currentUser = {
  id: 'me',
  name: 'You',
  avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
  status: 'online',
  persona: 'User'
};

export default users; 