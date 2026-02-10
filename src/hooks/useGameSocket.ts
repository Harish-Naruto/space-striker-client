import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';
import type { MessageWs, GameStateResponse, HitPayload, GameStatus } from '../types/game';
import { toast } from 'react-toastify';

const WEBSOCKET_URL = 'ws://localhost:8080/ws';

export const useGameSocket = (roomID: string | null) => {
    const wsRef = useRef<WebSocket | null>(null);
    const { playerID, setGameState, updateConnectionStatus, applyMove, setGameStatus, gameOver,setTurn } = useGameStore();

    const sendMessage = useCallback((message: MessageWs) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(message));
        } else {
            console.warn('WebSocket is not open. Cannot send message:', message);
            toast.error('WebSocket is not open. Cannot send message')
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
            toast.success('WebSocket connected')
            updateConnectionStatus('connected');
        };

        ws.onmessage = (event) => {
            try {
                console.log(event.data)
                const message: MessageWs = JSON.parse(event.data);

                switch (message.type) {
                    case 'GAME_STATE':
                        const gameState = message.payload as GameStateResponse;
                        console.log('Updating game state:', gameState);
                        setGameState(gameState);
                        break;

                    case 'GAME_UPDATE':
                        const NewStatus = message.payload.status as GameStatus;
                        setGameStatus(NewStatus);
                        break;

                    case 'MOVE':
                        const hitPayload = message.payload as HitPayload;
                        console.log('Move received:', hitPayload);
                        applyMove(hitPayload);
                        break;

                    case 'GAME_OVER':
                        const winnerId = message.payload.winner;
                        console.log('Game Over! winner :', winnerId);
                        gameOver(winnerId);
                        break;
                    
                    case 'TIME_OUT':
                        const {nextTurn,endAt} = message.payload;
                        setTurn(nextTurn,endAt)
                        break;

                    case 'ERROR':
                        console.error('Server error:', message.payload.message);
                        toast.error(message.payload.message)
                        break;

                    case 'CHAT':
                        console.log('Chat message:', message.payload);
                        break;
                    case 'SYNC_TIME':
                        const { serverTime } = message.payload as SyncTimePayload;
                        useGameStore.getState().setServerOffset(serverTime);
                        break;

                    default:
                        toast.error('Unknow message type');
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
            toast.error("disconnected")
            updateConnectionStatus('disconnected');
        };

        // Cleanup on unmount
        return () => {
            if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
                ws.close();
            }
        };
    }, [roomID, playerID, setGameState, updateConnectionStatus, applyMove]);

    return { sendMessage, isConnected: wsRef.current?.readyState === WebSocket.OPEN };
};