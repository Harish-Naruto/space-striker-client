import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export const CountDown = () => {
    const endsAt = useGameStore((state) => state.gameState?.endAt);
    const serverOffset = useGameStore((state) => state.serverOffset);
    const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

    useEffect(() => {
        if (!endsAt) {
            setSecondsLeft(null);
            return;
        }

        const updateTimer = () => {
            const syncedNow = Date.now() + serverOffset;
            const diff = endsAt - syncedNow;
            const remaining = Math.max(0, Math.ceil(diff / 1000));
            setSecondsLeft(remaining);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 200);
        return () => clearInterval(interval);
    }, [endsAt, serverOffset]);

    if (secondsLeft === null) return null;

    const isUrgent = secondsLeft <= 5;
    const isCritical = secondsLeft <= 3;
    const progressPercent = Math.min((secondsLeft / 30) * 100, 100);

    return (
        <div className="flex items-center gap-3 bg-black border-2 border-[#ff0080] px-4 py-2 min-w-[180px]" style={{
            boxShadow: isUrgent 
                ? '0 0 20px rgba(255,0,0,0.5), inset 0 0 10px rgba(255,0,128,0.2)' 
                : 'inset 0 0 10px rgba(255,0,128,0.2)'
        }}>
            {/* Icon */}
            <div>
                {isUrgent ? (
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                    >
                        <AlertTriangle className={`w-5 h-5 ${isCritical ? 'text-[#ff0000]' : 'text-[#ffff00]'}`} fill="currentColor" />
                    </motion.div>
                ) : (
                    <Clock className="w-5 h-5 text-[#00f0ff]" />
                )}
            </div>

            {/* Timer Display */}
            <div className="flex-1">
                <span className="text-[8px] text-[#ff0080] uppercase tracking-widest block mb-1" style={{
                    fontFamily: '"Press Start 2P", cursive',
                }}>
                    TIME
                </span>
                
                <div className="flex items-baseline gap-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={secondsLeft}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.1 }}
                            className={`text-2xl font-black font-mono leading-none ${
                                isCritical 
                                    ? 'text-[#ff0000]' 
                                    : isUrgent 
                                        ? 'text-[#ffff00]' 
                                        : 'text-white'
                            }`}
                            style={{
                                textShadow: isCritical 
                                    ? '0 0 15px #ff0000' 
                                    : isUrgent
                                        ? '0 0 15px #ffff00'
                                        : '0 0 10px #00f0ff',
                            }}
                        >
                            {secondsLeft}
                        </motion.div>
                    </AnimatePresence>
                    <span className="text-[10px] text-gray-500">S</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-900 border border-gray-700 mt-2 relative overflow-hidden">
                    <motion.div
                        className={
                            isCritical
                                ? 'bg-[#ff0000]'
                                : isUrgent
                                    ? 'bg-[#ffff00]'
                                    : 'bg-[#00f0ff]'
                        }
                        initial={{ width: "100%" }}
                        animate={{ 
                            width: `${progressPercent}%`,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            height: '100%',
                            boxShadow: isCritical 
                                ? '0 0 10px #ff0000' 
                                : isUrgent
                                    ? '0 0 10px #ffff00'
                                    : '0 0 10px #00f0ff'
                        }}
                    />
                    {/* Pixel effect */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                    }} />
                </div>
            </div>

            {/* Add Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        </div>
    );
};