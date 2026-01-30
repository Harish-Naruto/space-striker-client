import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Users } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { generateRoomID } from '../utils/utils';

interface LobbyProps {
    onJoinGame: (roomID: string) => void;
}

export const Lobby = ({ onJoinGame }: LobbyProps) => {
    const [inputRoomID, setInputRoomID] = useState('');
    const { playerID } = useGameStore();

    const handleJoin = () => {
        if (inputRoomID.trim()) {
            onJoinGame(inputRoomID.trim().toUpperCase());
        }
    };

    const handleCreateRoom = () => {
        const newRoomID = generateRoomID();
        setInputRoomID(newRoomID);
        onJoinGame(newRoomID);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && inputRoomID.trim()) {
            handleJoin();
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Title */}
                <div className="text-center mb-8">
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                        className="flex justify-center mb-4"
                    >
                        <Rocket className="w-20 h-20 text-cyan-400" />
                    </motion.div>
                    <h1 className="text-5xl font-bold text-cyan-400 mb-2 tracking-wider">
                        SPACE STRIKER
                    </h1>
                    <p className="text-slate-400 text-lg">Real-Time Tactical Combat</p>
                </div>

                {/* Lobby Card */}
                <motion.div
                    className="bg-slate-900/80 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                    whileHover={{ boxShadow: '0 0 40px rgba(34,211,238,0.3)' }}
                >
                    {/* Player ID Display */}
                    <div className="mb-6 p-3 bg-slate-800/50 rounded border border-slate-700">
                        <p className="text-slate-400 text-sm mb-1">Your Player ID:</p>
                        <p className="text-cyan-300 font-mono text-xs break-all">{playerID}</p>
                    </div>

                    {/* Room Input */}
                    <div className="mb-4">
                        <label className="block text-slate-300 mb-2 font-semibold">
                            Room Code
                        </label>
                        <input
                            type="text"
                            value={inputRoomID}
                            onChange={(e) => setInputRoomID(e.target.value.toUpperCase())}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter room code..."
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono text-lg"
                            maxLength={6}
                        />
                    </div>

                    {/* Join Button */}
                    <motion.button
                        onClick={handleJoin}
                        disabled={!inputRoomID.trim()}
                        className={`w-full px-6 py-3 rounded-lg font-bold text-lg mb-3 transition-all ${inputRoomID.trim()
                                ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-pointer'
                                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                            }`}
                        whileHover={inputRoomID.trim() ? { scale: 1.02 } : {}}
                        whileTap={inputRoomID.trim() ? { scale: 0.98 } : {}}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Users className="w-5 h-5" />
                            Join Game
                        </div>
                    </motion.button>

                    {/* Divider */}
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-slate-900 text-slate-500">OR</span>
                        </div>
                    </div>

                    {/* Create Room Button */}
                    <motion.button
                        onClick={handleCreateRoom}
                        className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg font-bold transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Create New Room
                    </motion.button>
                </motion.div>

                {/* Footer Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-center text-slate-500 text-sm"
                >
                    <p>Multiplayer strategy game • 5x5 tactical grid</p>
                </motion.div>
            </motion.div>
        </div>
    );
};
