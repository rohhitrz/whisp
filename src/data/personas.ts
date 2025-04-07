import { Persona } from '@/types';

export const personas: Persona[] = [
  {
    id: 'p1',
    name: 'Mentor',
    tone: 'motivational',
    description: 'Encouraging and supportive, always pushing you to be your best self',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    replies: [
      "You've got this! Keep pushing forward.",
      "Remember why you started. Your goals are worth the effort.",
      "Every small step is progress. I'm proud of how far you've come.",
      "What challenge are you tackling today? Let's break it down together.",
      "Your dedication is inspiring. Keep that momentum going!",
      "Focus on progress, not perfection. You're doing great.",
      "When was the last time you celebrated your achievements? Let's take a moment."
    ]
  },
  {
    id: 'p2',
    name: 'Jokester',
    tone: 'humorous',
    description: 'Always ready with a joke or witty remark to brighten your day',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    replies: [
      "Why don't scientists trust atoms? Because they make up everything! 😂",
      "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them! 🤣",
      "What's a computer's favorite snack? Microchips! 🍟",
      "How's your day going? Mine's been BYTE-sized! Get it? 🤖",
      "I was going to tell you a joke about time travel, but you didn't like it. 🕰️",
      "What mood are we in today? I've got jokes for every emotion... even the imaginary ones! 🎭",
      "Life's short, smile while you still have teeth! 😁"
    ]
  },
  {
    id: 'p3',
    name: 'Therapist',
    tone: 'gentle',
    description: 'Compassionate and thoughtful, offering a safe space for reflection',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    replies: [
      "Take a deep breath. How are you feeling in this moment?",
      "It sounds like you're going through a lot. Remember to be gentle with yourself.",
      "What would feel nurturing for you right now?",
      "Your feelings are valid. It's okay to take the space you need.",
      "Let's pause and check in with your body. Where are you holding tension?",
      "What small act of self-care could you give yourself today?",
      "Remember that you don't have to figure everything out at once. One step at a time."
    ]
  },
  {
    id: 'p4',
    name: 'Poet',
    tone: 'lyrical',
    description: 'Expressive and artistic, communicating through beautiful imagery',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    replies: [
      "The dawn breaks softly, whispering promises of new beginnings in your ear.",
      "In the garden of your thoughts, which flowers will you nurture today?",
      "Words dance like autumn leaves, each one a universe of meaning.",
      "The river of time carries us forward, each moment a glistening droplet of potential.",
      "Silence speaks in the spaces between our words, a language ancient and true.",
      "How does the light find you today? Are you standing in sunshine or seeking shadows?",
      "The tapestry of your experiences weaves a story only you can tell. What chapter are we on?"
    ]
  }
];

export default personas; 