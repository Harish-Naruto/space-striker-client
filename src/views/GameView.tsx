import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';

import { isMyTurn } from '../utils/utils';
import type { MessageWs } from '../types/game';
import { SpriteDefinitions } from '@/components/Game/Spritesheet';
import { HUD } from '@/components/Game/HUD';
import { Placement } from '@/components/Game/Placement';
import { Board } from '@/components/Game/Board';
import { GameOver } from '@/components/Game/GameOver';
import { useGameSocket } from '@/hooks/useGameSocket';

interface GameViewProps {
    onReturnToLobby: () => void;
}

export const GameView = ({onReturnToLobby }: GameViewProps) => {
    const { gameState, playerID,roomID,resetGame } = useGameStore();
    const {sendMessage} = useGameSocket(roomID);

    // Handle cell click on opponent's board
    const handleAttack = (x: number, y: number) => {
        if (!gameState) return;

        const myTurn = isMyTurn(gameState.activePlayer, playerID);
        if (!myTurn) return;

        const message: MessageWs = {
            type: 'MOVE',
            payload: { x, y },
        };

        sendMessage(message);
    };

    // Handle ship placement
    const handlePlacement = (message: MessageWs) => {
        sendMessage(message);
    };

    // Handle play again
    const handlePlayAgain = () => {
        resetGame()
    };

    if (!gameState) {
        return (
            <>
            <HUD />
            <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-[#00f0ff] text-xl font-bold mb-4" style={{
                        fontFamily: '"Press Start 2P", cursive',
                    }}>
                        LOADING GAME...
                    </div>
                    <motion.div
                        className="w-16 h-16 border-4 border-[#ff0080] border-t-transparent rounded-full mx-auto"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
            </div>
            </>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0e27] relative overflow-hidden">
            {/* Load sprite definitions once at the root */}
            <SpriteDefinitions />

            {/* Retro grid background */}
            <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `
                    linear-gradient(0deg, transparent 24%, rgba(255, 0, 128, .1) 25%, rgba(255, 0, 128, .1) 26%, transparent 27%, transparent 74%, rgba(255, 0, 128, .1) 75%, rgba(255, 0, 128, .1) 76%, transparent 77%, transparent),
                    linear-gradient(90deg, transparent 24%, rgba(255, 0, 128, .1) 25%, rgba(255, 0, 128, .1) 26%, transparent 27%, transparent 74%, rgba(255, 0, 128, .1) 75%, rgba(255, 0, 128, .1) 76%, transparent 77%, transparent)
                `,
                backgroundSize: '50px 50px',
            }} />

            {/* Scanlines effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10" style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)',
            }} />

            {/* HUD */}
            <HUD />

            {/* Main Game Content */}
            <div className="relative z-10 p-8">
                {/* PLACEMENT Phase */}
                {gameState.status === 'WAITING_FOR_SHIP' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center min-h-[calc(100vh-120px)]"
                    >
                        <Placement onConfirmPlacement={handlePlacement} />
                    </motion.div>
                )}

                {/* WAITING_FOR_OPPONENT Phase */}
                {gameState.status === 'WAITING_FOR_PLAYER' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center min-h-[calc(100vh-120px)]"
                    >
                        <div className="text-center space-y-6">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#ff0080] via-[#00f0ff] to-[#ff0080] opacity-40 blur-md" />
                                <div className="relative bg-[#1a1f3a] border-4 border-[#00f0ff] p-12" style={{
                                    boxShadow: 'inset 0 0 30px rgba(0,240,255,0.2), 0 0 40px rgba(0,240,255,0.3)'
                                }}>
                                    <h2 className="text-3xl font-black text-white mb-6 tracking-wider" style={{
                                        fontFamily: '"Press Start 2P", cursive',
                                        textShadow: '3px 3px 0 #ff0080, 6px 6px 0 #00f0ff'
                                    }}>
                                        STANDBY
                                    </h2>
                                    
                                    <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="text-[#00f0ff] text-sm tracking-widest"
                                        style={{
                                            fontFamily: '"Press Start 2P", cursive',
                                        }}
                                    >
                                        AWAITING ENEMY...
                                    </motion.div>

                                    <motion.div
                                        className="mt-8 flex justify-center gap-2"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-3 h-3 bg-[#00f0ff]"
                                                style={{ 
                                                    boxShadow: '0 0 10px #00f0ff',
                                                    animationDelay: `${i * 0.2}s`
                                                }}
                                            />
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ACTIVE Phase - Battle Boards */}
                {gameState.status === 'ACTIVE' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            {/* Player's Board */}
                            <div className="space-y-4">
                                <div className="text-center">
                                    <h3 className="text-xl font-black text-white mb-2 tracking-wider" style={{
                                        fontFamily: '"Press Start 2P", cursive',
                                        textShadow: '2px 2px 0 #00f0ff, 0 0 20px rgba(0,240,255,0.5)'
                                    }}>
                                        YOUR FLEET
                                    </h3>
                                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                                        <div className="w-2 h-2 bg-[#00f0ff] animate-pulse" />
                                        <span style={{ fontFamily: '"Press Start 2P", cursive' }}>
                                            DEFENDING
                                        </span>
                                    </div>
                                </div>
                                <Board
                                    board={gameState.yourBoard || []}
                                    isOpponentBoard={false}
                                    isClickable={false}
                                />
                            </div>

                            {/* Opponent's Board */}
                            <div className="space-y-4">
                                <div className="text-center">
                                    <h3 className="text-xl font-black text-white mb-2 tracking-wider" style={{
                                        fontFamily: '"Press Start 2P", cursive',
                                        textShadow: '2px 2px 0 #ff0080, 0 0 20px rgba(255,0,128,0.5)'
                                    }}>
                                        ENEMY FLEET
                                    </h3>
                                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                                        <div className="w-2 h-2 bg-[#ff0080] animate-pulse" />
                                        <span style={{ fontFamily: '"Press Start 2P", cursive' }}>
                                            {isMyTurn(gameState.activePlayer, playerID) ? 'TARGET' : 'LOCKED'}
                                        </span>
                                    </div>
                                </div>
                                <Board
                                    board={gameState.opponentBoard|| []}
                                    isOpponentBoard={true}
                                    onCellClick={handleAttack}
                                    isClickable={isMyTurn(gameState.activePlayer, playerID)}
                                />
                            </div>
                        </div>

                        {/* Battle Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 text-center"
                        >
                            <div className="inline-block bg-black border-2 border-[#00f0ff] px-6 py-3" style={{
                                boxShadow: 'inset 0 0 20px rgba(0,240,255,0.2), 0 0 20px rgba(0,240,255,0.3)'
                            }}>
                                <p className="text-xs text-gray-400 tracking-widest mb-1" style={{
                                    fontFamily: '"Press Start 2P", cursive',
                                }}>
                                    {isMyTurn(gameState.activePlayer, playerID) ? 'SELECT TARGET COORDINATES' : 'ENEMY COMPUTING...'}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* FINISHED Phase - Game Over */}
                {gameState.status === 'OVER' && gameState.winner && (
                    <GameOver
                        winner={gameState.winner}
                        playerID={playerID}
                        onPlayAgain={handlePlayAgain}
                        onReturnToLobby={onReturnToLobby}
                    />
                )}
            </div>

            {/* Add Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        </div>
    );
};