import { useState } from 'react';
import { motion } from 'framer-motion';
import type { MessageWs } from '../../types/game';

interface PlacementProps {
    onConfirmPlacement: (message: MessageWs) => void;
}

export const Placement = ({ onConfirmPlacement }: PlacementProps) => {
    const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
    const REQUIRED_SHIPS = 5; // Adjust based on game rules

    const toggleCell = (x: number, y: number) => {
        const key = `${x},${y}`;
        const newSelected = new Set(selectedCells);

        if (newSelected.has(key)) {
            newSelected.delete(key);
        } else {
            newSelected.add(key);
        }

        setSelectedCells(newSelected);
    };

    const handleConfirm = () => {
        const ships = Array.from(selectedCells).map(key => {
            const [x, y] = key.split(',').map(Number);
            return { x, y };
        });

        const message: MessageWs = {
            type: 'PLACE_SHIP',
            payload: { ships },
        };

        onConfirmPlacement(message);
    };

    const isSelected = (x: number, y: number): boolean => {
        return selectedCells.has(`${x},${y}`);
    };

    const canConfirm = selectedCells.size === REQUIRED_SHIPS;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6 p-6 bg-slate-800/80 rounded-lg border border-cyan-500/30"
        >
            <div className="text-center">
                <h2 className="text-2xl font-bold text-cyan-400 mb-2">Place Your Ships</h2>
                <p className="text-slate-300">
                    Select {REQUIRED_SHIPS} cells for your ships ({selectedCells.size}/{REQUIRED_SHIPS})
                </p>
            </div>

            {/* 5x5 Grid for placement */}
            <div className="grid grid-cols-5 gap-2 p-4 bg-slate-900/50 rounded-lg">
                {Array.from({ length: 5 }).map((_, x) =>
                    Array.from({ length: 5 }).map((_, y) => (
                        <motion.button
                            key={`${x}-${y}`}
                            onClick={() => toggleCell(x, y)}
                            className={`
                w-12 h-12 rounded border-2 transition-all duration-200
                ${isSelected(x, y)
                                    ? 'bg-blue-600 border-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.6)]'
                                    : 'bg-slate-800 border-slate-600 hover:border-cyan-500/50 hover:bg-slate-700'
                                }
              `}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isSelected(x, y) && (
                                <span className="text-blue-200 text-lg">▬</span>
                            )}
                        </motion.button>
                    ))
                )}
            </div>

            <motion.button
                onClick={handleConfirm}
                disabled={!canConfirm}
                className={`
          px-8 py-3 rounded-lg font-bold text-lg transition-all duration-200
          ${canConfirm
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.5)] cursor-pointer'
                        : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    }
        `}
                whileHover={canConfirm ? { scale: 1.05 } : {}}
                whileTap={canConfirm ? { scale: 0.95 } : {}}
            >
                Confirm Placement
            </motion.button>
        </motion.div>
    );
};
