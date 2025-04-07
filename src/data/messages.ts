import { Message } from '@/types';
import { nanoid } from 'nanoid';

// Helper function to create timestamps
const getTimestamp = (minutesAgo: number) => {
  return new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();
};

export const messagesMap: Record<string, Message[]> = {
  'chat1': [
    {
      id: nanoid(),
      from: 'u1',
      to: 'me',
      type: 'text',
      content: 'Take a deep breath. How are you feeling today?',
      timestamp: getTimestamp(1440) // 1 day ago
    },
    {
      id: nanoid(),
      from: 'me',
      to: 'u1',
      type: 'text',
      content: 'A bit stressed with work deadlines, honestly.',
      timestamp: getTimestamp(1430)
    },
    {
      id: nanoid(),
      from: 'u1',
      to: 'me',
      type: 'text',
      content: 'It sounds like you\'re carrying a lot. Remember to be gentle with yourself during stressful periods.',
      timestamp: getTimestamp(1420)
    },
    {
      id: nanoid(),
      from: 'me',
      to: 'u1',
      type: 'text',
      content: 'Thanks, that helps. I think I need to set better boundaries.',
      timestamp: getTimestamp(60)
    },
    {
      id: nanoid(),
      from: 'u1',
      to: 'me',
      type: 'text',
      content: 'Setting boundaries is an act of self-care. What small step could you take today?',
      timestamp: getTimestamp(45)
    }
  ],
  'chat2': [
    {
      id: nanoid(),
      from: 'u2',
      to: 'me',
      type: 'text',
      content: 'Hey! Ready to crush those goals today?',
      timestamp: getTimestamp(180)
    },
    {
      id: nanoid(),
      from: 'me',
      to: 'u2',
      type: 'text',
      content: 'Feeling a bit unmotivated today actually...',
      timestamp: getTimestamp(178)
    },
    {
      id: nanoid(),
      from: 'u2',
      to: 'me',
      type: 'text',
      content: 'Remember why you started! Even small progress adds up. What\'s one tiny step you can take?',
      timestamp: getTimestamp(175)
    },
    {
      id: nanoid(),
      from: 'me',
      to: 'u2',
      type: 'text',
      content: 'I guess I could spend just 10 minutes on the project.',
      timestamp: getTimestamp(170)
    },
    {
      id: nanoid(),
      from: 'u2',
      to: 'me',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1522120657009-060ca00d6cb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      timestamp: getTimestamp(165)
    },
    {
      id: nanoid(),
      from: 'u2',
      to: 'me',
      type: 'text',
      content: 'Perfect! Sometimes 10 minutes turns into an hour once you get going. I believe in you!',
      timestamp: getTimestamp(165)
    }
  ],
  'chat3': [
    {
      id: nanoid(),
      from: 'u3',
      to: 'me',
      type: 'text',
      content: 'Why don\'t scientists trust atoms? Because they make up everything! 😂',
      timestamp: getTimestamp(2880) // 2 days ago
    },
    {
      id: nanoid(),
      from: 'me',
      to: 'u3',
      type: 'text',
      content: 'Haha, that\'s terrible but I laughed anyway',
      timestamp: getTimestamp(2870)
    },
    {
      id: nanoid(),
      from: 'u3',
      to: 'me',
      type: 'text',
      content: 'Mission accomplished! How\'s your day going?',
      timestamp: getTimestamp(2865)
    },
    {
      id: nanoid(),
      from: 'me',
      to: 'u3',
      type: 'text',
      content: 'Not bad, could use a good laugh. Got any more?',
      timestamp: getTimestamp(2860)
    },
    {
      id: nanoid(),
      from: 'u3',
      to: 'me',
      type: 'text',
      content: 'Did you hear about the mathematician who\'s afraid of negative numbers? He\'ll stop at nothing to avoid them! 🤣',
      timestamp: getTimestamp(2855)
    },
    {
      id: nanoid(),
      from: 'me',
      to: 'u3',
      type: 'audio',
      content: 'audio-message-laugh.mp3',
      timestamp: getTimestamp(2850)
    }
  ],
  'chat4': [
    {
      id: nanoid(),
      from: 'u4',
      to: 'me',
      type: 'text',
      content: 'The dawn breaks softly, whispering promises of new beginnings in your ear.',
      timestamp: getTimestamp(30)
    },
    {
      id: nanoid(),
      from: 'me',
      to: 'u4',
      type: 'text',
      content: 'That\'s beautiful. I love how you see the world.',
      timestamp: getTimestamp(28)
    },
    {
      id: nanoid(),
      from: 'u4',
      to: 'me',
      type: 'text',
      content: 'In the garden of your thoughts, which flowers will you nurture today?',
      timestamp: getTimestamp(25)
    },
    {
      id: nanoid(),
      from: 'me',
      to: 'u4',
      type: 'text',
      content: 'Kindness and patience, I think. I need more of both.',
      timestamp: getTimestamp(20)
    },
    {
      id: nanoid(),
      from: 'u4',
      to: 'me',
      type: 'text',
      content: 'Those bloom into the most radiant blossoms. The soil of your soul is richer for them.',
      timestamp: getTimestamp(18)
    },
    {
      id: nanoid(),
      from: 'me',
      to: 'u4',
      type: 'file',
      content: 'thoughts.pdf',
      timestamp: getTimestamp(15)
    }
  ],
  'chat5': [
    {
      id: nanoid(),
      from: 'u5',
      to: 'me',
      type: 'text',
      content: 'How\'s the project coming along?',
      timestamp: getTimestamp(4320) // 3 days ago
    },
    {
      id: nanoid(),
      from: 'me',
      to: 'u5',
      type: 'text',
      content: 'Making progress! But I\'m stuck on the implementation part.',
      timestamp: getTimestamp(4310)
    },
    {
      id: nanoid(),
      from: 'u5',
      to: 'me',
      type: 'text',
      content: 'What specifically is blocking you? Sometimes breaking it down helps.',
      timestamp: getTimestamp(4300)
    },
    {
      id: nanoid(),
      from: 'me',
      to: 'u5',
      type: 'text',
      content: 'I can\'t figure out how to structure the data model efficiently.',
      timestamp: getTimestamp(4290)
    },
    {
      id: nanoid(),
      from: 'u5',
      to: 'me',
      type: 'text',
      content: 'Have you tried drawing it out visually first? Sometimes seeing the relationships helps before coding.',
      timestamp: getTimestamp(4280)
    },
    {
      id: nanoid(),
      from: 'me',
      to: 'u5',
      type: 'text',
      content: 'That\'s a great idea! I\'ll try that approach.',
      timestamp: getTimestamp(4270)
    }
  ]
};

export default messagesMap; 