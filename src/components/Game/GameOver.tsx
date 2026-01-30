import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Home } from 'lucide-react';

interface GameOverProps {
    winner: string;
    playerID: string;
    onPlayAgain: () => void;
    onReturnToLobby: () => void;
}

export const GameOver = ({ winner, playerID, onPlayAgain, onReturnToLobby }: GameOverProps) => {
    const isWinner = winner === playerID;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className="bg-slate-900 border-2 border-cyan-500/50 rounded-lg p-8 max-w-md w-full mx-4 shadow-[0_0_50px_rgba(34,211,238,0.3)]"
            >
                {/* Trophy Icon */}
                <div className="flex justify-center mb-6">
                    <motion.div
                        animate={{
                            rotate: [0, -10, 10, -10, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <Trophy
                            className={`w-24 h-24 ${isWinner ? 'text-yellow-400' : 'text-slate-600'
                                }`}
                        />
                    </motion.div>
                </div>

                {/* Result Text */}
                <div className="text-center mb-8">
                    <h2
                        className={`text-4xl font-bold mb-2 ${isWinner ? 'text-green-400' : 'text-red-400'
                            }`}
                    >
                        {isWinner ? 'VICTORY!' : 'DEFEAT'}
                    </h2>
                    <p className="text-slate-300 text-lg">
                        {isWinner
                            ? 'You have destroyed the enemy fleet!'
                            : 'Your fleet has been destroyed!'}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <motion.button
                        onClick={onPlayAgain}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <RotateCcw className="w-5 h-5" />
                        Play Again
                    </motion.button>

                    <motion.button
                        onClick={onReturnToLobby}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg font-bold transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Home className="w-5 h-5" />
                        Return to Lobby
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};
