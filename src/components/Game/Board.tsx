import { motion } from 'framer-motion';
import { getCellClassName, CellState } from '../../utils/utils';

interface BoardProps {
    board: number[][];
    isOpponentBoard?: boolean;
    onCellClick?: (x: number, y: number) => void;
    isClickable?: boolean;
}

export const Board = ({ board, isOpponentBoard = false, onCellClick, isClickable = false }: BoardProps) => {
    const handleCellClick = (x: number, y: number) => {
        if (isClickable && onCellClick) {
            onCellClick(x, y);
        }
    };

    return (
        <div className="relative">
            {/* Radar scanning line animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 rounded-lg">
                <motion.div
                    className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                    animate={{
                        y: ['0%', '100%'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            </div>

            {/* 5x5 Grid */}
            <div className="grid grid-cols-5 gap-1 p-2 bg-slate-800/50 rounded-lg border border-cyan-900/50 shadow-lg">
                {board.map((row, y) =>
                    row.map((cell, x) => {
                        const cellState = cell as typeof CellState[keyof typeof CellState];
                        const isHoverable = isClickable && cellState === CellState.EMPTY;

                        return (
                            <motion.div
                                key={`${x}-${y}`}
                                className={getCellClassName(cellState, isOpponentBoard, isHoverable)}
                                onClick={() => handleCellClick(x, y)}
                                whileHover={isHoverable ? { scale: 1.05 } : {}}
                                whileTap={isHoverable ? { scale: 0.95 } : {}}
                                animate={cellState === CellState.HIT ? {
                                    scale: [1, 1.1, 1],
                                } : {}}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Cell content indicators */}
                                {cellState === CellState.HIT && (
                                    <span className="text-red-300 text-xl font-bold">✖</span>
                                )}
                                {cellState === CellState.MISS && (
                                    <span className="text-slate-400 text-sm">○</span>
                                )}
                                {cellState === CellState.SHIP && !isOpponentBoard && (
                                    <span className="text-blue-300 text-lg">▬</span>
                                )}
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
