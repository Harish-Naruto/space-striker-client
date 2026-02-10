import { motion } from 'framer-motion';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { formatConnectionStatus, isMyTurn } from '../../utils/utils';
import { CountDown } from './CountDown';

export const HUD = () => {
    const { gameState, roomID, connectionStatus, playerID } = useGameStore();

    const connection = formatConnectionStatus(connectionStatus);
    const myTurn = gameState ? isMyTurn(gameState.activePlayer, playerID) : false;

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full bg-slate-900/80 border-b border-cyan-500/30 backdrop-blur-sm"
        >
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Left: Room Info */}
                <div className="flex items-center gap-4">
                    <div className="text-cyan-400 font-mono">
                        <span className="text-slate-400">ROOM:</span>
                        <span className="ml-2 text-xl font-bold">{roomID || '---'}</span>
                    </div>

                    {gameState && (
                        <div className='flex items-center gap-8'>
                        <div className="text-slate-400 text-sm font-mono">
                            <span>STATUS:</span>
                            <span className="ml-2 text-cyan-300">{gameState.status}</span>
                        </div>
                         <CountDown />
                        </div>
                    )}
                </div>

                {/* Center: Turn Indicator */}
                {gameState && gameState.status === 'ACTIVE' && (
                        <motion.div
                            className={`px-6 py-2 rounded-full font-bold text-lg ${myTurn
                                    ? 'bg-green-600/20 text-green-400 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                                    : 'bg-slate-700/20 text-slate-400 border border-slate-600/50'
                                }`}
                            animate={myTurn ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            {myTurn ? '⚡ YOUR TURN' : '⏳ OPPONENT\'S TURN'}
                        </motion.div>
                    
                )}

                {/* Right: Connection Status */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        {connectionStatus === 'connected' && (
                            <Wifi className="w-5 h-5 text-green-400" />
                        )}
                        {connectionStatus === 'connecting' && (
                            <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
                        )}
                        {connectionStatus === 'disconnected' && (
                            <WifiOff className="w-5 h-5 text-red-400" />
                        )}
                        <span className={`font-mono text-sm font-bold ${connection.color}`}>
                            {connection.text}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
