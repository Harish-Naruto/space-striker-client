import { CellState, type CellStateValue } from '../types/game';

// Re-export CellState for use in components
export { CellState };


/**
 * Generate a random room ID
 */
export const generateRoomID = (): string => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

/**
 * Get Tailwind CSS classes based on cell state
 */
export const getCellClassName = (
    cellState: CellStateValue,
    isOpponentBoard: boolean,
    isHoverable: boolean = false
): string => {
    const baseClasses = 'aspect-square flex items-center justify-center border border-cyan-900/30 transition-all duration-200';

    switch (cellState) {
        case CellState.EMPTY:
            return `${baseClasses} bg-slate-900/50 ${isHoverable ? 'hover:bg-cyan-900/20 hover:border-cyan-500/50 cursor-pointer' : ''}`;

        case CellState.SHIP:
            // Ships are only visible on your own board
            if (isOpponentBoard) {
                return `${baseClasses} bg-slate-900/50`;
            }
            return `${baseClasses} bg-blue-600/70 shadow-[0_0_10px_rgba(37,99,235,0.5)] border-blue-500/50`;

        case CellState.HIT:
            return `${baseClasses} bg-red-600/80 shadow-[0_0_15px_rgba(225,29,72,0.6)] border-red-500/70 animate-pulse`;

        case CellState.MISS:
            return `${baseClasses} bg-slate-700/60 border-slate-600/50`;

        default:
            return baseClasses;
    }
};

/**
 * Check if it's the current player's turn
 */
export const isMyTurn = (activePlayer: string, playerID: string): boolean => {
    return activePlayer === playerID;
};

/**
 * Format connection status for display
 */
export const formatConnectionStatus = (status: string): { text: string; color: string } => {
    switch (status) {
        case 'connected':
            return { text: 'ONLINE', color: 'text-green-400' };
        case 'connecting':
            return { text: 'CONNECTING...', color: 'text-yellow-400' };
        case 'disconnected':
            return { text: 'OFFLINE', color: 'text-red-400' };
        default:
            return { text: 'UNKNOWN', color: 'text-gray-400' };
    }
};
