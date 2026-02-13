import { motion } from 'framer-motion';
import { RotateCcw, Home } from 'lucide-react';
import { Sprite, AnimatedSprite } from './Spritesheet';

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
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
        >
            {/* Retro grid background */}
            <div className="absolute inset-0" style={{
                backgroundImage: `
                    linear-gradient(0deg, transparent 24%, rgba(255, 0, 128, .15) 25%, rgba(255, 0, 128, .15) 26%, transparent 27%, transparent 74%, rgba(255, 0, 128, .15) 75%, rgba(255, 0, 128, .15) 76%, transparent 77%, transparent),
                    linear-gradient(90deg, transparent 24%, rgba(255, 0, 128, .15) 25%, rgba(255, 0, 128, .15) 26%, transparent 27%, transparent 74%, rgba(255, 0, 128, .15) 75%, rgba(255, 0, 128, .15) 76%, transparent 77%, transparent)
                `,
                backgroundSize: '80px 80px',
            }} />

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)',
            }} />

            {/* Floating pixels/stars */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -300],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                >
                    <Sprite 
                        spriteId={isWinner ? "star-pixel" : "sparkle-pixel"}
                        size={16}
                        className={isWinner ? "text-[#ffd700]" : "text-[#ff0080]"}
                        style={{
                            filter: isWinner ? 'drop-shadow(0 0 4px #ffd700)' : 'drop-shadow(0 0 4px #ff0080)'
                        }}
                    />
                </motion.div>
            ))}

            {/* Main Modal */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative max-w-lg w-full mx-4"
            >
                {/* Outer glow */}
                <div className={`absolute -inset-2 blur-xl opacity-50 ${
                    isWinner ? 'bg-[#ffd700]' : 'bg-[#ff0080]'
                }`} />

                <div className={`relative bg-[#1a1f3a] border-4 p-12 ${
                    isWinner ? 'border-[#ffd700]' : 'border-[#ff0080]'
                }`} style={{
                    boxShadow: isWinner 
                        ? 'inset 0 0 40px rgba(255,215,0,0.2), 0 0 60px rgba(255,215,0,0.4)'
                        : 'inset 0 0 40px rgba(255,0,128,0.2), 0 0 60px rgba(255,0,128,0.4)'
                }}>
                    {/* Corner pixels */}
                    {[
                        { top: -2, left: -2 },
                        { top: -2, right: -2 },
                        { bottom: -2, left: -2 },
                        { bottom: -2, right: -2 },
                    ].map((pos, i) => (
                        <div
                            key={i}
                            className={`absolute w-4 h-4 ${isWinner ? 'bg-[#00f0ff]' : 'bg-[#00f0ff]'}`}
                            style={{ ...pos }}
                        />
                    ))}

                    {/* Icon - Sprite Based */}
                    <div className="flex justify-center mb-8">
                        {isWinner ? (
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 0.5, type: 'spring' }}
                            >
                                {/* Animated glowing trophy */}
                                <AnimatedSprite
                                    frames={['trophy-glow-1', 'trophy-glow-2']}
                                    frameRate={3}
                                    size={128}
                                    className="text-[#ffd700]"
                                    style={{
                                        filter: 'drop-shadow(0 0 30px #ffd700)',
                                    }}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ 
                                    scale: 1,
                                }}
                                transition={{ 
                                    scale: { duration: 0.3 },
                                }}
                            >
                                {/* Shaking skull */}
                                <AnimatedSprite
                                    frames={['skull-pixel', 'skull-shake-1', 'skull-pixel', 'skull-shake-2']}
                                    frameRate={8}
                                    size={128}
                                    className="text-[#ff0080]"
                                    style={{
                                        filter: 'drop-shadow(0 0 30px #ff0080)',
                                    }}
                                />
                            </motion.div>
                        )}
                    </div>

                    {/* Result Text */}
                    <div className="text-center mb-10 space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={`text-6xl font-black tracking-wider ${
                                isWinner ? 'text-[#ffd700]' : 'text-[#ff0080]'
                            }`}
                            style={{
                                fontFamily: '"Press Start 2P", cursive',
                                textShadow: isWinner 
                                    ? '4px 4px 0 #00f0ff, 8px 8px 0 rgba(0,0,0,0.3), 0 0 40px #ffd700' 
                                    : '4px 4px 0 #00f0ff, 8px 8px 0 rgba(0,0,0,0.3), 0 0 40px #ff0080',
                            }}
                        >
                            {isWinner ? 'VICTORY' : 'GAME OVER'}
                        </motion.h2>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4"
                        >
                            <p className={`text-xl font-bold ${isWinner ? 'text-white' : 'text-white'}`} style={{
                                fontFamily: '"Press Start 2P", cursive',
                                textShadow: isWinner ? '0 0 10px #ffd700' : '0 0 10px #ff0080'
                            }}>
                                {isWinner ? 'ENEMY DEFEATED!' : 'YOU LOSE!'}
                            </p>
                            
                            {/* Score display with sprites */}
                            <div className={`inline-block px-6 py-3 border-2 ${
                                isWinner ? 'border-[#ffd700] bg-black' : 'border-[#ff0080] bg-black'
                            }`}>
                                <div className="flex items-center justify-center gap-3">
                                    <Sprite 
                                        spriteId={isWinner ? "star-pixel" : "sparkle-pixel"}
                                        size={16}
                                        className={isWinner ? "text-[#ffd700]" : "text-[#ff0080]"}
                                    />
                                    <span className="text-xs text-gray-400 tracking-widest" style={{
                                        fontFamily: '"Press Start 2P", cursive',
                                    }}>
                                        {isWinner ? 'WINNER' : 'DEFEATED'}
                                    </span>
                                    <Sprite 
                                        spriteId={isWinner ? "star-pixel" : "sparkle-pixel"}
                                        size={16}
                                        className={isWinner ? "text-[#ffd700]" : "text-[#ff0080]"}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Divider */}
                    <div className={`w-full h-1 mb-8 ${
                        isWinner ? 'bg-[#ffd700]' : 'bg-[#ff0080]'
                    }`} style={{
                        boxShadow: isWinner ? '0 0 10px #ffd700' : '0 0 10px #ff0080'
                    }} />

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col gap-4"
                    >
                        {/* Play Again Button */}
                        <motion.button
                            onClick={onPlayAgain}
                            className="flex items-center justify-center gap-3 px-8 py-4 bg-[#00ff00] text-black border-4 border-[#00ff00] font-bold text-sm"
                            style={{
                                fontFamily: '"Press Start 2P", cursive',
                                boxShadow: '0 6px 0 #009900, 0 0 30px rgba(0,255,0,0.5)',
                            }}
                            whileHover={{ y: 2 }}
                            whileTap={{ y: 6 }}
                        >
                            <RotateCcw className="w-5 h-5" />
                            PLAY AGAIN
                        </motion.button>

                        {/* Return to Lobby Button */}
                        <motion.button
                            onClick={onReturnToLobby}
                            className="flex items-center justify-center gap-3 px-8 py-4 bg-black text-[#00f0ff] border-4 border-[#00f0ff] font-bold text-sm"
                            style={{
                                fontFamily: '"Press Start 2P", cursive',
                                boxShadow: '0 6px 0 #0099aa, 0 0 20px rgba(0,240,255,0.3)',
                            }}
                            whileHover={{ y: 2 }}
                            whileTap={{ y: 6 }}
                        >
                            <Home className="w-5 h-5" />
                            MAIN MENU
                        </motion.button>
                    </motion.div>

                    {/* Blinking "Press Start" style message with coin sprite */}
                    <motion.div
                        className="mt-8 text-center"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <Sprite spriteId="coin-pixel" size={16} className="text-[#ffd700]" />
                            <p className="text-xs text-gray-500 tracking-widest" style={{
                                fontFamily: '"Press Start 2P", cursive',
                            }}>
                                THANKS FOR PLAYING
                            </p>
                            <Sprite spriteId="coin-pixel" size={16} className="text-[#ffd700]" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Add Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        </motion.div>
    );
};