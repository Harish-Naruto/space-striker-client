import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { GameStateResponse, ConnectionStatus } from '../types/game';

// Initialize or retrieve player ID from localStorage
const getPlayerID = (): string => {
    const stored = localStorage.getItem('space-striker-player-id');
    if (stored) {
        return stored;
    }
    const newID = uuidv4();
    localStorage.setItem('space-striker-player-id', newID);
    return newID;
};

interface GameStore {
    // State
    gameState: GameStateResponse | null;
    playerID: string;
    connectionStatus: ConnectionStatus;
    roomID: string | null;

    // Actions
    setGameState: (state: GameStateResponse) => void;
    updateConnectionStatus: (status: ConnectionStatus) => void;
    setRoomID: (roomID: string | null) => void;
    resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
    // Initial state
    gameState: null,
    playerID: getPlayerID(),
    connectionStatus: 'disconnected',
    roomID: null,

    // Actions
    setGameState: (gameState) => set({ gameState }),

    updateConnectionStatus: (connectionStatus) => set({ connectionStatus }),

    setRoomID: (roomID) => set({ roomID }),

    resetGame: () => set({
        gameState: null,
        roomID: null,
        connectionStatus: 'disconnected',
    }),
}));
