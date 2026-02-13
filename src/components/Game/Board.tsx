import { motion } from 'framer-motion';
import { memo, useCallback } from 'react';
import { Sprite, AnimatedSprite } from './Spritesheet';

interface BoardProps {
    board: number[][];
    isOpponentBoard?: boolean;
    onCellClick?: (x: number, y: number) => void;
    isClickable?: boolean;
}

// Cell states as constants
const CellState = {
    EMPTY: 0,
    SHIP: 1,
    HIT: 2,
    MISS: 3,
} as const;

/**
 * Individual Cell Component - Memoized for performance
 * Only re-renders when its own state changes
 */
const Cell = memo(({ 
    cellState, 
    x, 
    y, 
    isOpponentBoard,
    isClickable,
    onCellClick 
}: {
    cellState: number;
    x: number;
    y: number;
    isOpponentBoard: boolean;
    isClickable: boolean;
    onCellClick?: (x: number, y: number) => void;
}) => {
    const handleClick = useCallback(() => {
        if (isClickable && onCellClick) {
            onCellClick(x, y);
        }
    }, [isClickable, onCellClick, x, y]);

    const isHoverable = isClickable && cellState === CellState.EMPTY;
    const isHit = cellState === CellState.HIT;
    const isMiss = cellState === CellState.MISS;
    const isShip = cellState === CellState.SHIP;

    // Determine cell background and border styles
    const getCellStyle = () => {
        if (isHit) {
            return {
                bg: 'bg-[#ff0000]',
                border: 'border-[#ff0000]',
                shadow: '0 0 20px #ff0000, inset 0 0 10px rgba(255,0,0,0.5)'
            };
        }
        if (isMiss) {
            return {
                bg: 'bg-[#003366]',
                border: 'border-[#0066cc]',
                shadow: '0 0 10px #0066cc, inset 0 0 5px rgba(0,102,204,0.3)'
            };
        }
        if (isShip && !isOpponentBoard) {
            return {
                bg: 'bg-[#00f0ff]',
                border: 'border-[#00f0ff]',
                shadow: '0 0 15px #00f0ff, inset 0 0 10px rgba(0,240,255,0.3)'
            };
        }
        if (!isOpponentBoard) {
            return {
                bg: 'bg-[#0a1929]',
                border: 'border-[#1e3a5f]',
                shadow: 'inset 0 0 5px rgba(0,0,0,0.5)'
            };
        }
        return {
            bg: 'bg-[#0a0e27]',
            border: 'border-gray-800',
            shadow: 'inset 0 0 5px rgba(0,0,0,0.5)'
        };
    };

    const { bg, border, shadow } = getCellStyle();

    return (
        <motion.div
            className={`
                relative h-16 transition-all duration-100 border-2 overflow-hidden
                ${bg} ${border}
                ${isHoverable ? 'cursor-crosshair hover:border-[#ff0080] hover:bg-[#1a0033]' : ''}
            `}
            onClick={handleClick}
            whileHover={isHoverable ? { 
                scale: 1.05,
                boxShadow: '0 0 20px rgba(255,0,128,0.6)'
            } : {}}
            whileTap={isHoverable ? { scale: 0.95 } : {}}
            style={{ boxShadow: shadow }}
        >
            {/* Pixelated grid pattern overlay - uses CSS for performance */}
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

            {/* Targeting crosshair on hover - sprite-based */}
            {isHoverable && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                    <Sprite 
                        spriteId="crosshair" 
                        size={48}
                        className="text-[#ff0080]"
                        style={{
                            filter: 'drop-shadow(0 0 5px #ff0080)',
                        }}
                    />
                </div>
            )}

            {/* HIT - Explosion animation + X marker */}
            {isHit && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Background explosion animation */}
                    <div className="absolute inset-0">
                        <AnimatedSprite
                            frames={['explosion-1', 'explosion-2', 'explosion-3', 'explosion-4']}
                            frameRate={12}
                            size={64}
                            loop={false}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{
                                filter: 'drop-shadow(0 0 10px #ff0000)',
                            }}
                        />
                    </div>
                    
                    {/* Persistent X marker */}
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                    >
                        <Sprite 
                            spriteId="hit-marker" 
                            size={48}
                            style={{
                                filter: 'drop-shadow(0 0 8px #ffffff)',
                            }}
                        />
                    </motion.div>
                </div>
            )}

            {/* MISS - Splash sprite */}
            {isMiss && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, type: 'spring' }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Sprite 
                        spriteId="miss-splash" 
                        size={48}
                        className="text-[#00aaff]"
                        style={{
                            filter: 'drop-shadow(0 0 5px #00aaff)',
                        }}
                    />
                </motion.div>
            )}

            {/* SHIP - Player's own ships with sprite */}
            {isShip && !isOpponentBoard && (
                <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3, type: 'spring' }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Sprite 
                        spriteId="ship-sprite"
                        size={40}
                        className="text-white"
                        style={{
                            filter: 'drop-shadow(0 0 8px #00f0ff)',
                        }}
                    />
                </motion.div>
            )}

            {/* Cell coordinate display (tiny) */}
            <div className="absolute bottom-0.5 right-0.5 text-[6px] font-mono text-gray-700 select-none">
                {x}{y}
            </div>
        </motion.div>
    );
});

Cell.displayName = 'Cell';

/**
 * Main Board Component - Optimized with memoization
 */
export const Board = memo(({ board, isOpponentBoard = false, onCellClick, isClickable = false }: BoardProps) => {
    return (
        <div className="relative">
            {/* Grid Container */}
            <div className="relative bg-black border-2 border-gray-800 p-3" style={{
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
            }}>
                {/* Coordinate labels - Top */}
                <div className="grid grid-cols-5 gap-2 mb-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div 
                            key={`col-${i}`} 
                            className="h-6 flex items-center justify-center text-xs font-bold text-[#00f0ff] select-none"
                            style={{
                                fontFamily: '"Press Start 2P", cursive',
                                textShadow: '0 0 5px #00f0ff'
                            }}
                        >
                            {i}
                        </div>
                    ))}
                </div>

                {/* Main Grid with Row Labels */}
                <div className="flex gap-2">
                    {/* Row labels - Left */}
                    <div className="flex flex-col gap-2">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <div 
                                key={`row-${i}`} 
                                className="w-6 h-16 flex items-center justify-center text-xs font-bold text-[#00f0ff] select-none"
                                style={{
                                    fontFamily: '"Press Start 2P", cursive',
                                    textShadow: '0 0 5px #00f0ff'
                                }}
                            >
                                {i}
                            </div>
                        ))}
                    </div>

                    {/* 5x5 Grid - Flattened for better performance */}
                    <div className="grid grid-cols-5 gap-2 flex-1">
                        {board.map((row, x) =>
                            row.map((cellState, y) => (
                                <Cell
                                    key={`${x}-${y}`}
                                    cellState={cellState}
                                    x={x}
                                    y={y}
                                    isOpponentBoard={isOpponentBoard}
                                    isClickable={isClickable}
                                    onCellClick={onCellClick}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Add Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        </div>
    );
});

Board.displayName = 'Board';