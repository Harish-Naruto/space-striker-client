// Message Types matching Go backend exactly
export type MessageType = "MOVE" | "CHAT" | "GAME_STATE" | "GAME_OVER" | "ERROR" | "PLACE_SHIP" | "GAME_UPDATE";

// Message Envelope
export interface MessageWs {
    type: MessageType;
    payload: any;
}

// Cell States (matching domain.CellState in Go backend)
export const CellState = {
    EMPTY: 0,
    SHIP: 1,
    HIT: 2,
    MISS: 3,
} as const;

export type CellStateValue = typeof CellState[keyof typeof CellState];

// Game Status
export type GameStatus = "WAITING_FOR_PLAYER" | "WAITING_FOR_SHIP" | "ACTIVE" | "OVER";

export type ConnectionStatus = "disconnected" | "connecting" | "connected";

// Payload Interfaces
export interface GameStateResponse {
    id: string;
    yourBoard: number[][];      // 0: Empty, 1: Ship, 2: Hit, 3: Miss
    opponentBoard: number[][];  // Masked: only shows 0, 2, 3
    activePlayer: string;       // UserID of current turn
    winner: string;
    status: GameStatus;
}

export interface MovePayload {
    x: number;
    y: number;
}

export interface PlacePayload {
    ships: { x: number; y: number }[]; // List of all ship coordinates
}

export interface ChatPayload {
    sender?: string;
    message: string;
}

export interface GameOverPayload {
    winner: string;
    message?: string;
}

export interface ErrorPayload {
    message: string;
}

export interface HitPayload {
    x: number;
    y: number;
    result: string; // This should match your domain.CellState type
    nextTurn: string;
    by: string;
}