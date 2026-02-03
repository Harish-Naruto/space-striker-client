import { HUD } from '../components/Game/HUD';
import { Board } from '../components/Game/Board';
import { Placement } from '../components/Game/Placement';
import { GameOver } from '../components/Game/GameOver';
import { useGameStore } from '../store/useGameStore';
import { useGameSocket } from '../hooks/useGameSocket';
import type { MessageWs } from '../types/game';
import { isMyTurn } from '../utils/utils';


interface GameViewProps {
    onReturnToLobby: () => void;
}

export const GameView = ({ onReturnToLobby }: GameViewProps) => {
    const { gameState, roomID, playerID, resetGame } = useGameStore();
    const { sendMessage } = useGameSocket(roomID);

    const handleMove = (x: number, y: number) => {
        if (!gameState || !isMyTurn(gameState.activePlayer, playerID)) {
            return;
        }

        const message: MessageWs = {
            type: 'MOVE',
            payload: { x, y },
        };

        sendMessage(message);
    };

    const handlePlaceShips = (message: MessageWs) => {
        sendMessage(message);
    };

    const handlePlayAgain = () => {
        // In a real implementation, this might request a new game
        resetGame();
        onReturnToLobby();
    };

    const handleReturnToLobby = () => {
        resetGame();
        onReturnToLobby();
    };

    const myTurn = gameState ? isMyTurn(gameState.activePlayer, playerID) : false;
    const isGameFinished = gameState?.status === "OVER";
    const showPlacement = gameState?.status === 'WAITING_FOR_SHIP';
    const showBoards = gameState?.status === 'ACTIVE' || isGameFinished;

    return (
        <div className="min-h-screen bg-slate-950">
            <HUD />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Waiting for Players */}
                {gameState?.status === 'WAITING_FOR_PLAYER' && (
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <div className="animate-pulse text-cyan-400 text-2xl font-bold mb-4">
                                Waiting for opponent...
                            </div>
                            <p className="text-slate-400">Share room code: <span className="text-cyan-300 font-mono text-xl">{roomID}</span></p>
                        </div>
                    </div>
                )}

                {/* Ship Placement Phase */}
                {showPlacement && (
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <Placement onConfirmPlacement={handlePlaceShips} />
                    </div>
                )}

                {/* Active Game - Two Boards */}
                {showBoards && gameState && (
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Your Board */}
                        <div>
                            <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">
                                YOUR FLEET
                            </h2>
                            <Board
                                board={gameState.yourBoard}
                                isOpponentBoard={false}
                                isClickable={false}
                            />
                        </div>

                        {/* Opponent Board */}
                        <div>
                            <h2 className="text-2xl font-bold text-red-400 mb-4 text-center">
                                ENEMY FLEET
                            </h2>
                            <Board
                                board={gameState.opponentBoard}
                                isOpponentBoard={true}
                                onCellClick={handleMove}
                                isClickable={myTurn && !isGameFinished}
                            />

                            {/* Turn Hint */}
                            {!isGameFinished && (
                                <div className="mt-4 text-center">
                                    <p className={`text-sm font-mono ${myTurn ? 'text-green-400' : 'text-slate-500'}`}>
                                        {myTurn ? '▶ Click on enemy board to strike' : '▶ Wait for your turn'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Game Over Overlay */}
                {isGameFinished && gameState && (
                    <GameOver
                        winner={gameState.winner}
                        playerID={playerID}
                        onPlayAgain={handlePlayAgain}
                        onReturnToLobby={handleReturnToLobby}
                    />
                )}
            </div>
        </div>
    );
};
