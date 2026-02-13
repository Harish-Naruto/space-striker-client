import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Check, X } from 'lucide-react';
import { Sprite } from './Spritesheet';
import type { MessageWs } from '../../types/game';

interface PlacementProps {
    onConfirmPlacement: (message: MessageWs) => void;
}

/**
 * Individual Placement Cell - Memoized for performance
 */
const PlacementCell = memo(({ 
    x, 
    y, 
    isSelected, 
    onToggle 
}: { 
    x: number; 
    y: number; 
    isSelected: boolean; 
    onToggle: (x: number, y: number) => void;
}) => {
    const handleClick = useCallback(() => {
        onToggle(x, y);
    }, [x, y, onToggle]);

    return (
        <motion.button
            onClick={handleClick}
            className={`
                relative w-20 h-20 transition-all duration-100 border-2 overflow-hidden
                ${isSelected
                    ? 'bg-[#00f0ff] border-[#00f0ff]'
                    : 'bg-[#0a0e27] border-gray-800 hover:border-[#ff0080] hover:bg-[#1a0033]'
                }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
                boxShadow: isSelected 
                    ? '0 0 20px #00f0ff, inset 0 0 10px rgba(0,240,255,0.5)' 
                    : 'inset 0 0 5px rgba(0,0,0,0.5)',
                imageRendering: 'pixelated'
            }}
        >
            {/* Grid coordinates */}
            <div className="absolute top-1 left-1 text-[8px] font-mono text-gray-600 select-none">
                {x}{y}
            </div>

            {/* Pixelated grid pattern */}
            <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(0deg, transparent 48%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 52%),
                        linear-gradient(90deg, transparent 48%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 52%)
                    `,
                    backgroundSize: '8px 8px',
                    imageRendering: 'pixelated'
                }}
            />

            {/* Ship Sprite - Shows when selected */}
            <AnimatePresence>
                {isSelected && (
                    <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -180 }}
                        transition={{ duration: 0.2, type: 'spring' }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <Sprite 
                            spriteId="ship-sprite"
                            size={32}
                            className="text-black"
                            style={{
                                filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hover indicator for empty cells */}
            {!isSelected && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-30 transition-opacity pointer-events-none">
                    <Sprite 
                        spriteId="ship-sprite"
                        size={28}
                        className="text-[#ff0080]"
                    />
                </div>
            )}
        </motion.button>
    );
});

PlacementCell.displayName = 'PlacementCell';

/**
 * Main Placement Component
 */
export const Placement = ({ onConfirmPlacement }: PlacementProps) => {
    const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
    const REQUIRED_SHIPS = 5;

    const toggleCell = useCallback((x: number, y: number) => {
        const key = `${x},${y}`;
        setSelectedCells(prev => {
            const newSelected = new Set(prev);

            if (newSelected.has(key)) {
                newSelected.delete(key);
            } else {
                if (newSelected.size < REQUIRED_SHIPS) {
                    newSelected.add(key);
                }
            }

            return newSelected;
        });
    }, [REQUIRED_SHIPS]);

    const handleConfirm = useCallback(() => {
        const ships = Array.from(selectedCells).map(key => {
            const [x, y] = key.split(',').map(Number);
            return { x, y };
        });

        const message: MessageWs = {
            type: 'PLACE_SHIP',
            payload: { ships },
        };

        onConfirmPlacement(message);
    }, [selectedCells, onConfirmPlacement]);

    const handleReset = useCallback(() => {
        setSelectedCells(new Set());
    }, []);

    const isSelected = useCallback((x: number, y: number): boolean => {
        return selectedCells.has(`${x},${y}`);
    }, [selectedCells]);

    const canConfirm = selectedCells.size === REQUIRED_SHIPS;
    const progress = (selectedCells.size / REQUIRED_SHIPS) * 100;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-8 max-w-3xl relative"
        >
            <div className="relative w-full">
                {/* Outer glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ff0080] via-[#00f0ff] to-[#ff0080] opacity-40 blur-md" />
                
                <div className="relative bg-[#1a1f3a] border-4 border-[#00f0ff] p-8" style={{
                    boxShadow: 'inset 0 0 30px rgba(0,240,255,0.2), 0 0 40px rgba(0,240,255,0.3)'
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
                            className="absolute w-4 h-4 bg-[#ff0080]"
                            style={{ ...pos, boxShadow: '0 0 10px #ff0080' }}
                        />
                    ))}

                    {/* Header */}
                    <div className="text-center space-y-6 mb-8">
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Rocket className="w-16 h-16 text-[#00f0ff] mx-auto" style={{
                                filter: 'drop-shadow(0 0 20px #00f0ff)'
                            }} />
                        </motion.div>
                        
                        <h2 className="text-3xl font-black text-white tracking-wider" style={{
                            fontFamily: '"Press Start 2P", cursive',
                            textShadow: '3px 3px 0 #ff0080, 6px 6px 0 #00f0ff'
                        }}>
                            DEPLOY
                            <br />
                            FLEET
                        </h2>
                        
                        <p className="text-[#00f0ff] text-sm tracking-widest" style={{
                            fontFamily: '"Press Start 2P", cursive',
                        }}>
                            PLACE {REQUIRED_SHIPS} SHIPS
                        </p>

                        {/* Progress Bar */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs" style={{
                                fontFamily: '"Press Start 2P", cursive',
                            }}>
                                <span className="text-gray-400">SHIPS</span>
                                <span className={canConfirm ? 'text-[#00ff00]' : 'text-[#ff0080]'}>
                                    {selectedCells.size}/{REQUIRED_SHIPS}
                                </span>
                            </div>
                            <div className="w-full h-4 bg-black border-2 border-[#00f0ff] relative overflow-hidden">
                                <motion.div
                                    className={canConfirm ? 'bg-[#00ff00]' : 'bg-[#ff0080]'}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        height: '100%',
                                        boxShadow: canConfirm ? '0 0 20px #00ff00' : '0 0 20px #ff0080',
                                        imageRendering: 'pixelated'
                                    }}
                                />
                                {/* Scanline effect */}
                                <div className="absolute inset-0 pointer-events-none" style={{
                                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                                }} />
                            </div>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="mb-8">
                        <div className="grid grid-cols-5 gap-3 p-6 bg-black border-2 border-gray-800" style={{
                            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
                        }}>
                            {Array.from({ length: 5 }).map((_, x) =>
                                Array.from({ length: 5 }).map((_, y) => (
                                    <PlacementCell
                                        key={`${x}-${y}`}
                                        x={x}
                                        y={y}
                                        isSelected={isSelected(x, y)}
                                        onToggle={toggleCell}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        {/* Reset Button */}
                        <motion.button
                            onClick={handleReset}
                            disabled={selectedCells.size === 0}
                            className={`
                                flex items-center justify-center gap-2 px-6 py-4 font-bold text-sm transition-all border-4
                                ${selectedCells.size > 0
                                    ? 'bg-[#ff0000] text-white border-[#ff0000] cursor-pointer'
                                    : 'bg-gray-800 text-gray-600 border-gray-700 cursor-not-allowed'
                                }
                            `}
                            style={{
                                fontFamily: '"Press Start 2P", cursive',
                                boxShadow: selectedCells.size > 0 ? '0 6px 0 #990000, 0 0 20px rgba(255,0,0,0.5)' : '0 6px 0 #333',
                            }}
                            whileHover={selectedCells.size > 0 ? { y: 2 } : {}}
                            whileTap={selectedCells.size > 0 ? { y: 6 } : {}}
                        >
                            <X className="w-5 h-5" />
                            CLEAR
                        </motion.button>

                        {/* Confirm Button */}
                        <motion.button
                            onClick={handleConfirm}
                            disabled={!canConfirm}
                            className={`
                                flex-1 flex items-center justify-center gap-3 px-8 py-4 font-bold text-sm transition-all border-4
                                ${canConfirm
                                    ? 'bg-[#00ff00] text-black border-[#00ff00] cursor-pointer'
                                    : 'bg-gray-800 text-gray-600 border-gray-700 cursor-not-allowed'
                                }
                            `}
                            style={{
                                fontFamily: '"Press Start 2P", cursive',
                                boxShadow: canConfirm ? '0 6px 0 #009900, 0 0 30px rgba(0,255,0,0.5)' : '0 6px 0 #333',
                            }}
                            whileHover={canConfirm ? { y: 2 } : {}}
                            whileTap={canConfirm ? { y: 6 } : {}}
                        >
                            <Check className="w-6 h-6" />
                            CONFIRM
                        </motion.button>
                    </div>

                    {/* Helper Text */}
                    <motion.p 
                        className="text-xs text-gray-500 text-center mt-6 tracking-wider"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                            fontFamily: '"Press Start 2P", cursive',
                        }}
                    >
                        CLICK TO SELECT
                    </motion.p>
                </div>
            </div>

            {/* Add Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        </motion.div>
    );
};