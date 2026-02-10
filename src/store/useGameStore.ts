import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { GameStateResponse, ConnectionStatus, HitPayload, GameStatus } from '../types/game';

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
    lastMove: HitPayload | null;
    serverOffset: number; // Difference between server and local clock

    // Actions
    setGameState: (state: GameStateResponse) => void;
    updateConnectionStatus: (status: ConnectionStatus) => void;
    setRoomID: (roomID: string | null) => void;
    setLastMove: (move: HitPayload) => void;
    applyMove: (move: HitPayload) => void;
    setGameStatus: (NewStatus: GameStatus) => void;
    setTurn :(nextTurn: string,endAt:number) => void;
    resetGame: () => void;
    gameOver :(winnerId: string) => void;
    setServerOffset: (serverTime: number) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
    gameState: null,
    playerID: getPlayerID(),
    connectionStatus: 'disconnected',
    roomID: null,
    lastMove: null,
    serverOffset: 0,

    setGameState: (gameState) => {
        console.log('[Store] Setting game state:', {
            status: gameState.status,
            activePlayer: gameState.activePlayer,
            winner: gameState.winner
        });
        set({ gameState });
    },

    updateConnectionStatus: (connectionStatus) => {
        console.log('[Store] Connection status:', connectionStatus);
        set({ connectionStatus });
    },

    setRoomID: (roomID) => {
        console.log('[Store] Room ID:', roomID);
        set({ roomID });
    },

    setLastMove: (lastMove) => {
        console.log('[Store] Last move:', lastMove);
        set({ lastMove });
    },

    setGameStatus: (NewStatus) => {
        const {gameState} = get();
        if(!gameState){
            console.warn('[Store] Cannot apply status: no game state')
            return;
        }
        const updatedState: GameStateResponse = {
            ...gameState,
            status:NewStatus
        }
        set({ gameState: updatedState});

    },

    setTurn: (nextTurn,endAt) =>{
        const {gameState} = get();
        if(!gameState){
            console.warn('[Store] Cannot apply turn: no game state')
            return;
        }
        const updatedState: GameStateResponse = {
            ...gameState,
            activePlayer:nextTurn,
            endAt:endAt,
        }
        set({ gameState: updatedState});

    },

    applyMove: (move: HitPayload) => {
        const { gameState, playerID } = get();
        
        if (!gameState) {
            console.warn('[Store] Cannot apply move: no game state');
            return;
        }

        const { x, y, result, nextTurn, by,endAt } = move;
        
        const cellValue = parseInt(result)

        const newYourBoard = gameState.yourBoard.map(row => [...row]);
        const newOpponentBoard = gameState.opponentBoard.map(row => [...row]);

        if (by === playerID) {

            newOpponentBoard[x][y] = cellValue;
        } else {
            newYourBoard[x][y] = cellValue;
        }

        const updatedState: GameStateResponse = {
            ...gameState,
            yourBoard: newYourBoard,
            opponentBoard: newOpponentBoard,
            activePlayer: nextTurn,
            endAt:endAt
        };

        set({ gameState: updatedState, lastMove: move });
    },

    resetGame: () => {
        console.log('[Store] Resetting game');
        set({
            gameState: null,
            roomID: null,
            connectionStatus: 'disconnected',
            lastMove: null,
        });
    },

    gameOver : (winnerId) =>{
        const {gameState} = get();
        if (!gameState) {
            console.warn('[Store] Cannot apply move: no game state');
            return;
        }
        const updatedState: GameStateResponse = {
            ...gameState,
            status:"OVER",
            winner:winnerId
        }
        set({gameState:updatedState});

    },
    setServerOffset: (serverTime) => {
        const offset = serverTime - Date.now();
        console.log('[Store] Clock synced. Offset:', offset, 'ms');
        set({ serverOffset: offset });
    },



}));
