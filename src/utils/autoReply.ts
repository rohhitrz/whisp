import { nanoid } from 'nanoid';
import { Message, Persona } from '@/types';

// Default auto-replies
const DEFAULT_REPLIES = [
  "Tell me more 😄",
  "That's interesting... keep going.",
  "Oh, I'd love to hear more about that!",
  "Could you elaborate on that?",
  "What happened next?",
  "I'm curious to know more...",
  "Fascinating! Please continue.",
  "And then what?",
  "How did that make you feel?",
  "That's quite a story! What else?",
  "I've never heard something like that before...",
  "Wow, I'm all ears 👂",
  "That's a unique perspective! Tell me more.",
  "I'm enjoying this conversation!",
  "Really? Go on...",
  "I'm intrigued... what else?",
  "Let's explore that idea further."
];

// Get persona-specific replies based on persona type
const getPersonaReplies = (persona: Persona | null): string[] => {
  if (!persona) return DEFAULT_REPLIES;
  return persona.replies;
};

// Generate a random typing delay between min and max seconds
const getRandomDelay = (min: number = 1, max: number = 3): number => {
  return (Math.random() * (max - min) + min) * 1000;
};

// Create an auto-reply message
export const createAutoReplyMessage = (
  personaId: string,
  content: string,
  toUserId: string
): Message => {
  return {
    id: nanoid(),
    from: personaId,
    to: toUserId,
    type: 'text',
    content,
    timestamp: new Date().toISOString(),
    delivered: true,
    read: true
  };
};

// Get a random reply from the array of replies
export const getRandomReply = (replies: string[]): string => {
  const randomIndex = Math.floor(Math.random() * replies.length);
  return replies[randomIndex];
};

// Auto-reply utility that returns a message after a delay
export const getAutoReply = (
  persona: Persona | null, 
  toUserId: string, 
  callback: (message: Message) => void
): void => {
  const replies = getPersonaReplies(persona);
  const replyContent = getRandomReply(replies);
  const delay = getRandomDelay();

  setTimeout(() => {
    const autoReplyMessage = createAutoReplyMessage(
      persona?.id || 'ai',
      replyContent,
      toUserId
    );
    callback(autoReplyMessage);
  }, delay);
};

export default {
  DEFAULT_REPLIES,
  getPersonaReplies,
  getRandomDelay,
  createAutoReplyMessage,
  getRandomReply,
  getAutoReply
}; 