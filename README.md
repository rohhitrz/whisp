# Whisp X

A beautifully minimal, fully responsive messaging app with real-time simulation and creative UX features.

## 🎯 Features

- **Modern UI**: Clean design with smooth animations
- **Persona-Based Chat**: Different AI personalities with unique tones
- **Message Types**: Support for text, images, audio, and files
- **Vault System**: Archive and restore conversations
- **Theme Customization**: Light, dark, and solarized themes
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Interactive Elements**: Drag messages for reactions, confetti effects, and more

## 🔧 Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: SCSS Modules (no Tailwind)
- **Animations**: Framer Motion
- **Iconography**: React Icons
- **3D Effects**: Vanilla Tilt
- **Storage**: LocalStorage for persistence
- **Mocking**: nanoid for IDs, faker.js for AI replies

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/whisp-x.git
cd whisp-x
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3002](http://localhost:3002) in your browser

## 📱 App Structure

- **Home Page** (`/`): Chat list and welcome screen
- **Chat Page** (`/chat/[id]`): Individual conversation view
- **Vault Page** (`/vault`): Archived conversations

## 🎨 UI/UX Details

- **Font**: Outfit (fallback: Inter, DM Sans)
- **Color Palette**: Soft grays, teals, purples
- **Animations**: Page transitions, message bubbles, typing indicators
- **3D Effects**: Tilt on avatars and cards
- **Responsive**: Adapts to all screen sizes with mobile-first approach

## 🧠 Advanced Features

- **Real-time status simulation**: Typing indicators, "last seen" updates
- **AI Auto-replies**: Simulated GPT-like responses based on persona
- **Rich media messaging**: Image previews, voice messages with waveforms
- **Draggable chat bubbles**: Swipe for reactions
- **Background customization**: Choose from gradients, textures, and blurred images

## 📁 Project Structure

```
/src
  /app - Next.js App Router pages
  /components - Reusable UI components
  /data - Mock data for users, chats, personas
  /styles - SCSS modules for components
  /types - TypeScript interfaces
  /utils - Helper functions and utilities
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ as a frontend showcase project. No real backend or API calls are made - all data is simulated. # chatApp-FE
# whisp
