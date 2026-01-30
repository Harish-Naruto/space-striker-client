import { Lobby } from './views/Lobby';
import { GameView } from './views/GameView';
import { useGameStore } from './store/useGameStore';
import './App.css';

function App() {
  const { roomID, setRoomID } = useGameStore();

  const handleJoinGame = (room: string) => {
    setRoomID(room);
  };

  const handleReturnToLobby = () => {
    setRoomID(null);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {!roomID ? (
        <Lobby onJoinGame={handleJoinGame} />
      ) : (
        <GameView onReturnToLobby={handleReturnToLobby} />
      )}
    </div>
  );
}

export default App;
