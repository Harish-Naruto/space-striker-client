import { motion } from 'framer-motion';
import { Sprite } from '../components/Game/Spritesheet'; // Import your Sprite component

export const SpaceBattleBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* 1. Deep Space Gradient */}
            <div className="absolute inset-0 bg-[#050B14]" style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1f3a 0%, #050B14 100%)'
            }} />

            {/* 2. Parallax Stars (Background Layer) */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={`star-${i}`}
                    className="absolute bg-white rounded-full"
                    style={{
                        width: Math.random() * 2 + 1 + 'px',
                        height: Math.random() * 2 + 1 + 'px',
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        opacity: Math.random() * 0.5 + 0.1,
                    }}
                    animate={{
                        y: [0, 1000], // Stars move down slowly
                    }}
                    transition={{
                        duration: Math.random() * 20 + 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}

            {/* 3. The "Hero" Ship (X-Wing Style) */}
            <motion.div
                className="absolute"
                initial={{ x: '-10%', y: '80%', rotate: 45 }}
                animate={{ 
                    x: ['-10%', '110%'], // Fly across screen
                    y: ['80%', '20%']    // Move diagonally up
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0
                }}
            >
                {/* Engine Trail */}
                <motion.div 
                    className="absolute top-2 -left-8 w-12 h-1 bg-gradient-to-l from-[#00f0ff] to-transparent"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                />
                <Sprite spriteId="ship-sprite" size={48} className="text-[#eee] rotate-90" />
                
                {/* Hero Laser Fire */}
                <motion.div
                    className="absolute top-1/2 left-full w-4 h-1 bg-[#00f0ff]"
                    style={{ boxShadow: '0 0 5px #00f0ff' }}
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ 
                        opacity: [0, 1, 1, 0],
                        x: [0, 400] 
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 0.8 // Shoot every 0.8s
                    }}
                />
            </motion.div>

            {/* 4. The "Enemy" Ship (Destroyer/TIE Style) */}
            <motion.div
                className="absolute"
                initial={{ x: '110%', y: '10%', rotate: -135 }}
                animate={{ 
                    x: ['110%', '-10%'], // Fly across screen (opposite)
                    y: ['10%', '90%']    // Move diagonally down
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1 // Start slightly later
                }}
            >
                {/* Enemy Engine Trail */}
                <motion.div 
                    className="absolute top-2 -right-8 w-12 h-1 bg-gradient-to-r from-[#ff0080] to-transparent"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                />
                
                <Sprite spriteId="ship-destroyer" size={64} className="text-[#999] -rotate-90" />

                {/* Enemy Laser Fire */}
                <motion.div
                    className="absolute top-1/2 right-full w-4 h-1 bg-[#ff0080]"
                    style={{ boxShadow: '0 0 5px #ff0080' }}
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ 
                        opacity: [0, 1, 1, 0],
                        x: [0, -400] 
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatDelay: 0.4 // Shoot faster
                    }}
                />
            </motion.div>

            {/* 5. Random Explosions in background */}
            <motion.div
                className="absolute top-1/2 left-1/2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 2, 2.5]
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatDelay: 3
                }}
            >
                <Sprite spriteId="explosion-3" size={64} />
            </motion.div>
        </div>
    );
};