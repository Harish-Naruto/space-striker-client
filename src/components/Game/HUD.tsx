import { motion } from 'framer-motion';
import { Wifi, WifiOff, Loader2, Radio, Zap } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { formatConnectionStatus, isMyTurn } from '../../utils/utils';
import { CountDown } from './CountDown';

export const HUD = () => {
    const { gameState, roomID, connectionStatus, playerID } = useGameStore();

    const connection = formatConnectionStatus(connectionStatus);
    const myTurn = gameState ? isMyTurn(gameState.activePlayer, playerID) : false;

    return (
        <div className="w-full bg-[#0a0e27] border-b-4 border-[#00f0ff] relative" style={{
            boxShadow: '0 4px 20px rgba(0,240,255,0.3)'
        }}>
            {/* Top neon line */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[#ff0080] to-transparent" style={{
                boxShadow: '0 0 10px #ff0080'
            }} />
            
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    {/* Left: Room Info */}
                    <div className="flex items-center gap-4 flex-wrap">
                        {/* Room Code */}
                        <div className="flex items-center gap-3 bg-black border-2 border-[#ff0080] px-4 py-2" style={{
                            boxShadow: 'inset 0 0 10px rgba(255,0,128,0.2), 0 0 15px rgba(255,0,128,0.3)'
                        }}>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            >
                                <Radio className="w-4 h-4 text-[#ff0080]" />
                            </motion.div>
                            <div className="font-mono">
                                <span className="text-[#ff0080] text-[8px] uppercase tracking-widest block" style={{
                                    fontFamily: '"Press Start 2P", cursive',
                                }}>
                                    ROOM
                                </span>
                                <span className="text-[#ffd700] text-lg font-bold tracking-wider" style={{
                                    textShadow: '0 0 10px #ffd700'
                                }}>
                                    {roomID || '---'}
                                </span>
                            </div>
                        </div>

                        {gameState && (
                            <div className='flex items-center gap-4 flex-wrap'>
                                {/* Game Status */}
                                <div className="flex items-center gap-2 bg-black border-2 border-[#00f0ff] px-4 py-2" style={{
                                    boxShadow: 'inset 0 0 10px rgba(0,240,255,0.2)'
                                }}>
                                    <div className="w-2 h-2 bg-[#00f0ff] animate-pulse" style={{
                                        boxShadow: '0 0 5px #00f0ff'
                                    }} />
                                    <div className="font-mono">
                                        <span className="text-[#00f0ff] text-[8px] uppercase tracking-widest block" style={{
                                            fontFamily: '"Press Start 2P", cursive',
                                        }}>
                                            STATUS
                                        </span>
                                        <span className="text-white text-xs font-semibold">{gameState.status.replace('_', ' ')}</span>
                                    </div>
                                </div>

                                {/* Countdown Timer */}
                                <CountDown />
                            </div>
                        )}
                    </div>

                    {/* Center: Turn Indicator */}
                    {gameState && gameState.status === 'ACTIVE' && (
                        <motion.div
                            className={`px-6 py-3 font-black text-sm border-4 ${
                                myTurn
                                    ? 'bg-[#00ff00] text-black border-[#00ff00]'
                                    : 'bg-black text-gray-600 border-gray-700'
                            }`}
                            style={{
                                fontFamily: '"Press Start 2P", cursive',
                                boxShadow: myTurn ? '0 0 30px rgba(0,255,0,0.6)' : 'none'
                            }}
                            animate={myTurn ? {
                                boxShadow: ['0 0 20px rgba(0,255,0,0.6)', '0 0 40px rgba(0,255,0,0.8)', '0 0 20px rgba(0,255,0,0.6)']
                            } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            {myTurn ? (
                                <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4" fill="currentColor" />
                                    <span>YOUR TURN</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>ENEMY TURN</span>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Right: Connection Status */}
                    <div className="flex items-center gap-2 bg-black border-2 border-[#00f0ff] px-4 py-2" style={{
                        boxShadow: 'inset 0 0 10px rgba(0,240,255,0.2)'
                    }}>
                        {connectionStatus === 'connected' && (
                            <Wifi className="w-4 h-4 text-[#00ff00]" style={{
                                filter: 'drop-shadow(0 0 5px #00ff00)'
                            }} />
                        )}
                        {connectionStatus === 'connecting' && (
                            <Loader2 className="w-4 h-4 text-[#ffff00] animate-spin" />
                        )}
                        {connectionStatus === 'disconnected' && (
                            <WifiOff className="w-4 h-4 text-[#ff0000]" />
                        )}
                        <div className="font-mono">
                            <span className="text-[#00f0ff] text-[8px] uppercase tracking-widest block" style={{
                                fontFamily: '"Press Start 2P", cursive',
                            }}>
                                LINK
                            </span>
                            <span className={`text-xs font-bold ${connection.color}`}>
                                {connection.text}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom neon line */}
            <div className="h-0.5 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent" style={{
                boxShadow: '0 0 5px #00f0ff'
            }} />

            {/* Add Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        </div>
    );
};