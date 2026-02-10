import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer } from 'lucide-react';
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
        const interval = setInterval(updateTimer, 200); // High frequency for smooth UI
        return () => clearInterval(interval);
    }, [endsAt, serverOffset]);

    if (secondsLeft === null) return null;

    // Danger state: time is running out (less than 5 seconds)
    const isUrgent = secondsLeft <= 5;

    return (
        <div className="flex flex-col items-center justify-center min-w-20">
            <div className="flex items-center gap-2 mb-1">
                <Timer className={`w-4 h-4 ${isUrgent ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`} />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Time Remaining</span>
            </div>
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={secondsLeft}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    className={`text-2xl font-black font-mono leading-none ${
                        isUrgent ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'text-cyan-300'
                    }`}
                >
                    {secondsLeft}s
                </motion.div>
            </AnimatePresence>

            {/* Visual Progress Bar */}
            <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden border border-slate-700">
                <motion.div
                    className={`h-full ${isUrgent ? 'bg-red-500' : 'bg-cyan-500'}`}
                    initial={{ width: "100%" }}
                    animate={{ width: `${(secondsLeft / 30) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </div>
    );
};