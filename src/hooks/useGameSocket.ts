import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';
import type { MessageWs, GameStateResponse } from '../types/game';

const WEBSOCKET_URL = 'ws://localhost:8080/ws';

export const useGameSocket = (roomID: string | null) => {
    const wsRef = useRef<WebSocket | null>(null);
    const { playerID, setGameState, updateConnectionStatus } = useGameStore();

    const sendMessage = useCallback((message: MessageWs) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(message));
        } else {
            console.warn('WebSocket is not open. Cannot send message:', message);
        }
    }, []);

    useEffect(() => {
        if (!roomID) {
            return;
        }

        // Construct WebSocket URL with query parameters
        const url = `${WEBSOCKET_URL}?roomID=${roomID}&playerID=${playerID}`;

        updateConnectionStatus('connecting');
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('WebSocket connected');
            updateConnectionStatus('connected');
        };

        ws.onmessage = (event) => {
            try {
                const message: MessageWs = JSON.parse(event.data);

                switch (message.type) {
                    case 'GAME_STATE':
                    case 'GAME_UPDATE':
                        const gameState = message.payload as GameStateResponse;
                        setGameState(gameState);
                        break;

                    case 'GAME_OVER':
                        const finalState = message.payload as GameStateResponse;
                        setGameState(finalState);
                        // Could trigger a notification or sound effect here
                        console.log('Game Over!', message.payload);
                        break;

                    case 'ERROR':
                        console.error('Server error:', message.payload);
                        // Could trigger a toast notification here
                        break;

                    case 'CHAT':
                        console.log('Chat message:', message.payload);
                        // Handle chat if implemented
                        break;

                    default:
                        console.log('Unknown message type:', message);
                }
            } catch (error) {
                console.error('Failed to parse WebSocket message:', error);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            updateConnectionStatus('disconnected');
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
            updateConnectionStatus('disconnected');
        };

        // Cleanup on unmount
        return () => {
            if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
                ws.close();
            }
        };
    }, [roomID, playerID, setGameState, updateConnectionStatus]);

    return { sendMessage, isConnected: wsRef.current?.readyState === WebSocket.OPEN };
};
