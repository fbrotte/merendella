# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **prototype** camping management assistant built with React + TypeScript + Vite. It simulates an AI-powered email assistant for managing camping reservations, questions, and administrative tasks. All interactions are mocked - no real AI, no real emails.

**Purpose**: Demonstrate UI/UX flow and interface design for client demos. Not production-ready.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Application Flow

1. **App.tsx**: Navigation controller between `home` and `main` screens using Framer Motion transitions
2. **HomePage.tsx**: Landing page with typing effect animation and stats display
3. **MainScreen.tsx**: Primary orchestrator that manages:
   - Global state (messages, current email, panel mode, AI response)
   - Coordinates ChatColumn (left) and ContextPanel (right)
   - Auto-advances through email queue
   - Simulates AI interactions with delays

### Component Hierarchy

```
App (navigation state)
├── HomePage (landing + onStart callback)
└── MainScreen (global state orchestrator)
    ├── ChatColumn (conversation display, read-only)
    └── ContextPanel (email/Trello dual-mode panel)
        └── Toast (notifications)
```

### State Management

All state is centralized in **MainScreen.tsx**:

- `messages[]`: Chat conversation history
- `currentEmailIndex`: Which email is being reviewed (0-4)
- `panelMode`: 'email' | 'trello' (right panel toggle)
- `aiResponse`: Generated response text
- `isGenerating`: Loading state for AI generation simulation

State flows down via props, callbacks flow up to MainScreen.

### Data Layer

**src/data/MockData.ts** contains all mock data:

- `Email` interface: id, sender, subject, content, category, optional trelloCardId
- `TrelloCard` interface: id, title, description, list, checklist, optional linkedEmailId
- `Message` interface: id, role, content, timestamp
- `mockEmails`: 5 sample emails (reservations, billing, questions)
- `mockTrelloCards`: 3 linked Trello cards
- `mockAIResponse`: Pre-written responses by category (reservation, question, annulation)

### Key Interaction Patterns

All interactions are simulated with setTimeout delays:

1. **Generate Response**: 2s delay → fetches response from mockAIResponse by email category
2. **Modify Response**: 1.5s delay → simple text transformation
3. **Send Response**: Shows toast → clears response → auto-advances to next email after 2s
4. **View Trello/Back to Email**: Toggles panelMode with conversation updates

### Styling

- **TailwindCSS**: Utility-first styling throughout
- **Framer Motion**: Page transitions, component animations, hover effects
- **Lucide Icons**: Consistent icon system
- **Custom font**: Inter from Google Fonts (defined in index.css)

### TypeScript Usage

- Strict typing enabled (tsconfig.json)
- All interfaces exported from MockData.ts
- Props are explicitly typed in components
- No `any` types used

## Important Notes

- **ChatColumn input is disabled** (prototype only shows AI-driven conversation)
- **All AI responses are pre-written** in MockData.ts, indexed by email category
- **Email progression is automatic** after sending a response
- The prototype cycles through exactly 5 emails, then shows completion message
- **No backend, no API calls** - everything runs client-side with mocked data

## File Organization

```
src/
├── main.tsx                 # React entry point
├── App.tsx                  # Navigation router (home/main)
├── index.css                # Global styles + Tailwind directives
├── components/
│   ├── HomePage.tsx         # Landing page with animations
│   ├── MainScreen.tsx       # Main orchestrator (core state)
│   ├── ChatColumn.tsx       # Left panel - conversation display
│   ├── ContextPanel.tsx     # Right panel - email/Trello dual-mode
│   └── Toast.tsx            # Notification component
├── data/
│   └── MockData.ts          # All interfaces + mock data
└── lib/
    └── utils.ts             # cn() helper for className merging
```

## Testing the Prototype

Manual testing flow:
1. Start dev server → should open to HomePage
2. Observe typing effect animation
3. Click "Démarrer la revue" → transitions to MainScreen
4. Verify initial conversation loads
5. Click "Générer réponse IA" → wait 2s → response appears
6. Click "Modifier via IA" → wait 1.5s → response updates
7. Click "Voir carte Trello" → panel switches to Trello view
8. Click "Retour au mail" → panel switches back
9. Click "Envoyer" → toast appears → auto-advances to next email
10. Repeat until all 5 emails processed

## Common Tasks

**To add a new email**: Add to `mockEmails` array in MockData.ts with unique id, set category, optionally link trelloCardId

**To add a new Trello card**: Add to `mockTrelloCards` array, set linkedEmailId to match an email

**To modify AI responses**: Edit `mockAIResponse` object in MockData.ts (keys: reservation, question, annulation)

**To change animation timings**: Search for `setTimeout` calls in MainScreen.tsx

**To modify UI styles**: Edit Tailwind classes directly in component JSX