import { useState } from "react";
import { motion } from "framer-motion";
import { Hash } from "lucide-react";
import { useGameStore } from "../store/useGameStore";
import { generateRoomID } from "../utils/utils";
import {
  Sprite,
  AnimatedSprite,
  SpriteDefinitions,
} from "../components/Game/Spritesheet";
import { SpaceBattleBackground } from "./SpaceBattkeBackground";

interface LobbyProps {
  onJoinGame: (roomID: string) => void;
}

export const Lobby = ({ onJoinGame }: LobbyProps) => {
  const [inputRoomID, setInputRoomID] = useState("");
  const [joystickActive, setJoystickActive] = useState(true);
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
    setJoystickActive(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputRoomID.trim()) {
      handleJoin();
      setJoystickActive(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] relative overflow-hidden flex items-center justify-center p-4">
      {/* 2. Render SpriteDefinitions here so the SVGs exist in the DOM */}
      <SpriteDefinitions />

      <SpaceBattleBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Retro Title */}
        <div className="text-center mb-8">
          {/* ... inside Lobby.tsx, replacing the Joystick section ... */}

          {/* Animated Radar - REPLACES JOYSTICK */}
          <div className="mb-6 flex justify-center relative">
            {/* 1. The Static Radar Screen */}
            <Sprite
              spriteId="radar-screen"
              size={100}
              className="text-[#00f0ff]"
              style={{
                filter: "drop-shadow(0 0 15px rgba(0, 240, 255, 0.4))",
              }}
            />

            {/* 2. The Spinning Sweep Hand */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Sprite spriteId="radar-hand" size={100} className="text-white" />
            </motion.div>

            {/* 3. "Searching" Text Blinking below */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full text-center"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-[10px] text-[#00f0ff] tracking-widest font-mono">
                SCANNING...
              </span>
            </motion.div>
          </div>
          {/* Pixelated title effect */}
          <h1
            className="text-6xl font-black mb-2 tracking-wider relative"
            style={{
              fontFamily: '"Press Start 2P", cursive',
              color: "#fff",
              textShadow: `
                            3px 3px 0px #ff0080,
                            6px 6px 0px #00f0ff,
                            9px 9px 0px rgba(0,0,0,0.3)
                        `,
            }}
          >
            SPACE
            <br />
            STRIKER
          </h1>
          <p
            className="text-[#00f0ff] text-sm tracking-widest"
            style={{
              fontFamily: '"Press Start 2P", cursive',
            }}
          >
            [ TACTICAL COMBAT ]
          </p>

          {/* Retro coin slot decoration with sprite coins */}
          <div className="mt-6 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <Sprite
                  spriteId="coin-pixel"
                  size={16}
                  className="text-[#ffd700]"
                  style={{
                    filter: "drop-shadow(0 0 5px #ffd700)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Arcade Cabinet Style Card */}
        <div className="relative">
          {/* Outer border glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ff0080] via-[#00f0ff] to-[#ff0080] opacity-50 blur-sm" />

          <div
            className="relative bg-[#1a1f3a] border-4 border-[#ff0080] p-6"
            style={{
              boxShadow: `
                            inset 0 0 20px rgba(255,0,128,0.3),
                            0 0 30px rgba(255,0,128,0.5)
                        `,
            }}
          >
            {/* Corner decorations */}
            {[
              { top: -2, left: -2 },
              { top: -2, right: -2 },
              { bottom: -2, left: -2 },
              { bottom: -2, right: -2 },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-[#00f0ff]"
                style={{ ...pos, boxShadow: "0 0 10px #00f0ff" }}
              />
            ))}

            {/* Player ID Display */}
            <div className="mb-6 p-4 bg-black border-2 border-[#00f0ff] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent animate-pulse" />
              <p
                className="text-[#00f0ff] text-xs mb-2 tracking-widest"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                }}
              >
                PLAYER.ID
              </p>
              <p className="text-[#ffd700] font-mono text-[10px] break-all leading-relaxed">
                {playerID}
              </p>
            </div>

            {/* Room Input */}
            <div className="mb-4">
              <label
                className="block text-white mb-3 text-sm tracking-wider"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                }}
              >
                ROOM CODE
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ff0080]" />
                <input
                  type="text"
                  value={inputRoomID}
                  onChange={(e) => setInputRoomID(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  placeholder="ENTER CODE"
                  className="w-full pl-12 pr-4 py-4 bg-black border-3 border-[#ff0080] text-white placeholder-gray-600 focus:outline-none focus:border-[#00f0ff] transition-all font-mono text-lg uppercase tracking-widest"
                  style={{
                    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.8)",
                  }}
                  maxLength={6}
                />
                {/* Scanline effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.03) 2px, rgba(0,240,255,0.03) 4px)",
                  }}
                />
              </div>
            </div>

            {/* Join Button */}
            <motion.button
              onClick={() => {
                handleJoin();
                setJoystickActive(true);
              }}
              disabled={!inputRoomID.trim()}
              className={`w-full py-4 font-bold text-sm mb-3 transition-all relative overflow-hidden ${
                inputRoomID.trim()
                  ? "bg-[#ff0080] text-white border-4 border-[#ff0080] cursor-pointer"
                  : "bg-gray-800 text-gray-600 border-4 border-gray-700 cursor-not-allowed"
              }`}
              style={{
                fontFamily: '"Press Start 2P", cursive',
                boxShadow: inputRoomID.trim()
                  ? "0 6px 0 #b30059, 0 0 20px rgba(255,0,128,0.5)"
                  : "0 6px 0 #333",
                transform: "translateY(0)",
              }}
              whileHover={
                inputRoomID.trim()
                  ? {
                      boxShadow:
                        "0 4px 0 #b30059, 0 0 30px rgba(255,0,128,0.7)",
                      y: 2,
                    }
                  : {}
              }
              whileTap={
                inputRoomID.trim()
                  ? {
                      boxShadow: "0 0 0 #b30059",
                      y: 6,
                    }
                  : {}
              }
            >
              <span className="relative z-10 tracking-wider">
                &gt; START GAME &lt;
              </span>
              {inputRoomID.trim() && (
                <motion.div
                  className="absolute inset-0 bg-white"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ opacity: 0.2 }}
                />
              )}
            </motion.button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-dashed border-gray-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span
                  className="px-3 bg-[#1a1f3a] text-[#00f0ff] text-xs tracking-widest"
                  style={{
                    fontFamily: '"Press Start 2P", cursive',
                  }}
                >
                  OR
                </span>
              </div>
            </div>

            {/* Create Room Button */}
            <motion.button
              onClick={handleCreateRoom}
              className="w-full py-4 bg-[#00f0ff] text-[#0a0e27] border-4 border-[#00f0ff] font-bold text-sm transition-all"
              style={{
                fontFamily: '"Press Start 2P", cursive',
                boxShadow: "0 6px 0 #0099aa, 0 0 20px rgba(0,240,255,0.5)",
              }}
              whileHover={{
                boxShadow: "0 4px 0 #0099aa, 0 0 30px rgba(0,240,255,0.7)",
                y: 2,
              }}
              whileTap={{
                boxShadow: "0 0 0 #0099aa",
                y: 6,
              }}
            >
              <span className="tracking-wider">&gt; NEW ROOM &lt;</span>
            </motion.button>

            {/* Insert Coin Animation */}
            <motion.div
              className="mt-6 text-center"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <p
                className="text-[#ffd700] text-xs tracking-widest"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                }}
              >
                INSERT COIN
              </p>
            </motion.div>
          </div>
        </div>

        {/* Footer Info with sparkles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-gray-500 text-xs tracking-wider"
          style={{
            fontFamily: '"Press Start 2P", cursive',
          }}
        >
          <div className="flex justify-center gap-4 items-center mb-2">
            <Sprite
              spriteId="sparkle-pixel"
              size={12}
              className="text-[#ff0080]"
            />
            <p>© 2026 ARCADE</p>
            <Sprite
              spriteId="sparkle-pixel"
              size={12}
              className="text-[#00f0ff]"
            />
          </div>
          <p className="mt-2">5x5 GRID - 2 PLAYERS</p>
        </motion.div>
      </motion.div>

      {/* Add Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};
