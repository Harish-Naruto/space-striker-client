# Space Striker - Real-Time Multiplayer Strategy Game (Frontend)

<div align="center">
  <h3>🚀 A modern web-based Battleship-style tactical combat game with real-time multiplayer</h3>
  <p>Built with React, TypeScript, and WebSocket for instant player-to-player interaction</p>
</div>

---

## 📖 Overview

**Space Striker** is a real-time multiplayer tactical combat game where players compete in a 5x5 grid battlefield. This repository contains the **frontend client** - a modern, responsive web application that communicates with a Go-based WebSocket server to provide instant, synchronized gameplay between two players.

The game follows a Battleship-inspired mechanic where players:
1. **Place their fleet** strategically on their own board
2. **Take turns** striking at the opponent's board
3. **Win** by destroying all enemy ships first

---

## 🎮 Game Mechanics

### Lobby System
- Players can **create a new room** (generates a 6-character room code)
- Players can **join an existing room** using a room code
- Each player has a persistent unique ID stored in localStorage
- Real-time connection status indicators

### Ship Placement Phase
- Players place their ships on a 5x5 grid
- Ships are placed one cell at a time
- Visual feedback for valid/invalid placements
- Confirmation system before starting the battle

### Battle Phase
- **Turn-based combat** with real-time updates
- Click on opponent's board to launch strikes
- Visual indicators for:
  - **Hits** (✖) - Red indicator when a ship is struck
  - **Misses** (○) - Gray indicator when striking empty water
  - **Ships** (▬) - Blue indicator on your own board
- Active player indicator with turn status
- Both boards visible simultaneously (yours and opponent's)

### Game Over
- Victory/defeat screen with winner announcement
- Options to play again or return to lobby
- Game statistics display

---

## 🏗️ Frontend Architecture

### Technology Stack

#### Core Technologies
- **React 19** - Modern UI library with latest features
- **TypeScript 5.9** - Type-safe development
- **Vite 7** - Lightning-fast build tool and dev server
- **SWC** - Super-fast TypeScript/JavaScript compiler

#### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **CVA** (Class Variance Authority) - Component variant management

#### State Management & Data
- **Zustand 5** - Lightweight state management
- **WebSocket API** - Real-time bidirectional communication
- **UUID** - Unique player identification

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Game/           # Game-specific components
│   │   ├── Board.tsx        # Game board grid with cell rendering
│   │   ├── HUD.tsx          # Heads-up display (room code, status)
│   │   ├── Placement.tsx    # Ship placement interface
│   │   └── GameOver.tsx     # End game screen
│   └── ui/             # Generic UI components (buttons, etc.)
│
├── views/              # Main application views
│   ├── Lobby.tsx           # Room creation/joining interface
│   └── GameView.tsx        # Main game container
│
├── store/              # State management
│   └── useGameStore.ts     # Zustand store for game state
│
├── hooks/              # Custom React hooks
│   └── useGameSocket.ts    # WebSocket connection management
│
├── types/              # TypeScript type definitions
│   └── game.ts            # Game state, messages, and types
│
├── utils/              # Utility functions
│   └── utils.ts           # Helper functions (room ID generation, etc.)
│
├── lib/                # Library configurations
├── assets/             # Static assets
├── App.tsx             # Root application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

---

## 🔄 Real-Time Communication (WebSocket)

### Connection Architecture

The frontend establishes a WebSocket connection to the backend server using the player's unique ID and room code:

```typescript
ws://localhost:8080/ws?roomID={ROOM_CODE}&playerID={PLAYER_ID}
```

### Message Types

**Client → Server:**
- `MOVE` - Strike a cell on opponent's board
- `PLACE_SHIP` - Submit ship placement coordinates
- `CHAT` - (Future feature) Send chat messages

**Server → Client:**
- `GAME_STATE` - Initial game state on connection
- `GAME_UPDATE` - Real-time updates after each move
- `GAME_OVER` - Final game state with winner
- `ERROR` - Error messages from server

### Message Format
```typescript
interface MessageWs {
  type: MessageType;
  payload: any;  // Varies by message type
}
```

### Connection States
- **Disconnected** - No active connection
- **Connecting** - Establishing WebSocket connection
- **Connected** - Active real-time connection

The `useGameSocket` hook manages the entire WebSocket lifecycle and handles all message types.

---

## 🎨 State Management

### Zustand Store (`useGameStore`)

The application uses a centralized Zustand store for global state:

```typescript
interface GameStore {
  gameState: GameStateResponse | null;  // Current game state from server
  playerID: string;                     // Persistent unique player ID
  connectionStatus: ConnectionStatus;   // WebSocket connection status
  roomID: string | null;                // Current room code
  
  // Actions
  setGameState(state): void;
  updateConnectionStatus(status): void;
  setRoomID(roomID): void;
  resetGame(): void;
}
```

### Game State Structure

```typescript
interface GameStateResponse {
  id: string;                    // Game session ID
  yourBoard: number[][];         // Your 5x5 board (shows your ships)
  opponentBoard: number[][];     // Opponent's 5x5 board (ships hidden)
  activePlayer: string;          // Player ID whose turn it is
  winner: string;                // Player ID of winner (if game finished)
  status: GameStatus;            // Current game phase
}
```

### Cell States
- `0` - Empty water
- `1` - Ship (only visible on your board)
- `2` - Hit (ship was struck)
- `3` - Miss (struck empty water)

---

## 🎭 Component Overview

### Core Components

#### `App.tsx`
Root component that manages routing between Lobby and GameView based on whether a room is active.

#### `Lobby.tsx`
- Room code input with validation
- "Create New Room" button (generates random 6-character code)
- "Join Game" button
- Player ID display
- Animated UI with Framer Motion

#### `GameView.tsx`
Main game container that:
- Renders appropriate UI based on game status
- Shows "Waiting for opponent" during lobby phase
- Displays ship placement interface
- Shows dual boards during active gameplay
- Handles game over state

#### `Board.tsx`
Interactive 5x5 grid component featuring:
- Cell click handlers for strikes
- Visual state indicators (hit/miss/ship)
- Animated radar scanning effect
- Hover effects for clickable cells
- Responsive design

#### `Placement.tsx`
Ship placement interface allowing players to:
- Click cells to place ships
- Visual validation of placements
- Confirmation button to submit
- Instructions and feedback

#### `HUD.tsx`
Heads-up display showing:
- Current room code
- Connection status indicator
- Active player indicator
- Return to lobby button

#### `GameOver.tsx`
End game overlay with:
- Winner/loser announcement
- "Play Again" option
- "Return to Lobby" option
- Animated entrance

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun runtime
- Backend server running (see backend repository)

### Installation

```bash
# Clone the repository
git clone https://github.com/Harish-Naruto/space-striker-client.git
cd space-striker-client

# Install dependencies
npm install
# or with bun
bun install
```

### Development

```bash
# Start the development server
npm run dev
# or with bun
bun run dev
```

The application will start at `http://localhost:5173` (default Vite port).

**Note:** Ensure the backend WebSocket server is running at `ws://localhost:8080/ws` before starting the frontend.

### Build for Production

```bash
# Create optimized production build
npm run build
# or with bun
bun run build

# Preview production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

---

## 🔧 Configuration

### WebSocket URL
The WebSocket connection URL is configured in `src/hooks/useGameSocket.ts`:

```typescript
const WEBSOCKET_URL = 'ws://localhost:8080/ws';
```

Update this to point to your backend server in production.

### Tailwind CSS
Tailwind configuration is managed through `@tailwindcss/vite` plugin v4, with styles in `src/index.css`.

### TypeScript
- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.app.json` - Application-specific config
- `tsconfig.node.json` - Node.js/Vite config

---

## 🎯 Key Features

✅ **Real-time multiplayer** - Instant updates via WebSocket  
✅ **Responsive design** - Works on desktop and mobile  
✅ **Smooth animations** - Framer Motion powered transitions  
✅ **Type-safe** - Full TypeScript coverage  
✅ **Modern UI** - Tailwind CSS with custom animations  
✅ **Persistent player ID** - No signup required  
✅ **Room-based matchmaking** - Easy join with room codes  
✅ **Visual feedback** - Clear indicators for all game states  

---

## 🔮 Future Enhancements

- 🗨️ In-game chat system
- 📊 Game statistics and leaderboards
- 🎵 Sound effects and background music
- 🌐 Multiple room lobbies
- 🏆 Ranking system
- 🎨 Customizable themes
- 📱 Progressive Web App (PWA) support
- 🔄 Reconnection handling for disconnected players

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🔗 Related

- **Backend Repository** - [space-striker-server](https://github.com/Harish-Naruto/space-striker-server) (Go WebSocket server)

---

<div align="center">
  Made with ❤️ using React + TypeScript + Vite
</div>
