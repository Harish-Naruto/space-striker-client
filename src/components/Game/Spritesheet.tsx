import * as React from 'react';
import { memo } from 'react';

/**
 * SVG Sprite Definitions - REMASTERED VERSION
 * Enhanced pixel art shapes while preserving original color palette
 */
export const SpriteDefinitions = memo(() => (
    <svg 
        width="0" 
        height="0" 
        style={{ position: 'absolute' }}
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            {/* ========== SHIP SPRITES (Remastered) ========== */}
            
            {/* Ship Sprite - Fighter Jet Style */}
            <g id="ship-sprite">
                {/* Nose */}
                <rect x="7" y="0" width="2" height="2" fill="currentColor" />
                <rect x="6" y="2" width="4" height="2" fill="currentColor" />
                
                {/* Body & Wings */}
                <rect x="5" y="4" width="6" height="3" fill="currentColor" />
                <rect x="2" y="7" width="12" height="2" fill="currentColor" />
                <rect x="1" y="9" width="14" height="3" fill="currentColor" />
                <rect x="3" y="12" width="10" height="2" fill="currentColor" />
                
                {/* Cockpit (sleeker) */}
                <rect x="7" y="3" width="2" height="2" fill="#00f0ff" />
                
                {/* Engine Output */}
                <rect x="4" y="14" width="2" height="1" fill="#ff0080" />
                <rect x="10" y="14" width="2" height="1" fill="#ff0080" />
            </g>

            {/* Cruiser - Heavy Plating Style */}
            <g id="ship-cruiser">
                {/* Front */}
                <rect x="6" y="0" width="4" height="2" fill="currentColor" />
                <rect x="5" y="2" width="6" height="2" fill="currentColor" />
                
                {/* Bulk */}
                <rect x="4" y="4" width="8" height="8" fill="currentColor" />
                <rect x="2" y="6" width="2" height="6" fill="currentColor" />
                <rect x="12" y="6" width="2" height="6" fill="currentColor" />
                
                {/* Rear Flaps */}
                <rect x="3" y="12" width="10" height="2" fill="currentColor" />
                <rect x="5" y="14" width="6" height="1" fill="currentColor" />
                
                {/* Windows (Bridge) */}
                <rect x="7" y="5" width="2" height="1" fill="#00f0ff" />
                
                {/* Engines */}
                <rect x="3" y="13" width="2" height="1" fill="#ff0080" />
                <rect x="11" y="13" width="2" height="1" fill="#ff0080" />
            </g>

            {/* Destroyer - Wide & Aggressive */}
            <g id="ship-destroyer">
                {/* Twin Prows */}
                <rect x="5" y="1" width="2" height="3" fill="currentColor" />
                <rect x="9" y="1" width="2" height="3" fill="currentColor" />
                
                {/* Main Deck */}
                <rect x="4" y="4" width="8" height="4" fill="currentColor" />
                <rect x="2" y="6" width="12" height="6" fill="currentColor" />
                <rect x="4" y="12" width="8" height="2" fill="currentColor" />
                
                {/* Bridge */}
                <rect x="7" y="8" width="2" height="2" fill="#ffd700" />
                
                {/* Thrusters */}
                <rect x="1" y="9" width="1" height="2" fill="#ff0080" />
                <rect x="14" y="9" width="1" height="2" fill="#ff0080" />
            </g>

            {/* ========== EFFECT SPRITES (Pixelated) ========== */}

            {/* Miss Splash - Water Ripple (Pixelated Curves) */}
            <g id="miss-splash">
                {/* Outer Ring */}
                <path d="M5 2 h6 v1 h2 v2 h1 v6 h-1 v2 h-2 v1 h-6 v-1 h-2 v-2 h-1 v-6 h1 v-2 h2 Z" 
                      fill="none" stroke="#0066cc" strokeWidth="1" opacity="0.8" />
                
                {/* Inner Ring */}
                <rect x="6" y="6" width="4" height="4" fill="none" stroke="#00aaff" strokeWidth="1" opacity="0.8" />
                
                {/* Center */}
                <rect x="7" y="7" width="2" height="2" fill="#00ddff" opacity="0.6" />
                
                {/* Droplets */}
                <rect x="3" y="3" width="1" height="1" fill="#00aaff" />
                <rect x="12" y="3" width="1" height="1" fill="#00aaff" />
                <rect x="2" y="10" width="1" height="1" fill="#00aaff" />
                <rect x="13" y="10" width="1" height="1" fill="#00aaff" />
            </g>

            {/* Explosion 1 - Core */}
            <g id="explosion-1">
                <rect x="6" y="6" width="4" height="4" fill="#ffff00" />
                <rect x="5" y="5" width="6" height="6" fill="#ff8800" opacity="0.5" />
            </g>

            {/* Explosion 2 - Expansion */}
            <g id="explosion-2">
                <rect x="5" y="3" width="6" height="10" fill="#ff6600" />
                <rect x="3" y="5" width="10" height="6" fill="#ff6600" />
                <rect x="6" y="6" width="4" height="4" fill="#ffff00" />
                <rect x="2" y="2" width="2" height="2" fill="#ff0000" opacity="0.6" />
                <rect x="12" y="12" width="2" height="2" fill="#ff0000" opacity="0.6" />
            </g>

            {/* Explosion 3 - Peak (Pixel Cloud) */}
            <g id="explosion-3">
                {/* Main Cloud */}
                <path d="M5 2 h6 v2 h2 v2 h1 v4 h-1 v2 h-2 v2 h-6 v-2 h-2 v-2 h-1 v-4 h1 v-2 h2 Z" fill="#ff3300" />
                
                {/* Hot Center */}
                <rect x="6" y="6" width="4" height="4" fill="#ffff00" />
                
                {/* Debris */}
                <rect x="2" y="1" width="2" height="1" fill="#666" />
                <rect x="13" y="4" width="1" height="2" fill="#666" />
                <rect x="1" y="12" width="2" height="2" fill="#666" />
            </g>

            {/* Explosion 4 - Smoke */}
            <g id="explosion-4">
                 <path d="M4 2 h8 v2 h2 v8 h-2 v2 h-8 v-2 h-2 v-8 h2 Z" fill="#aa0000" opacity="0.4" />
                
                {/* Dissipating Smoke chunks */}
                <rect x="4" y="4" width="3" height="3" fill="#555" opacity="0.6" />
                <rect x="9" y="8" width="3" height="3" fill="#555" opacity="0.6" />
                <rect x="12" y="3" width="1" height="1" fill="#444" />
                <rect x="2" y="11" width="1" height="1" fill="#444" />
            </g>

            {/* Hit Marker - Sharper X */}
            <g id="hit-marker">
                <path d="M3 2 h2 v2 h2 v2 h2 v-2 h2 v-2 h2 v2 h-2 v2 h-2 v2 h2 v2 h2 v2 h-2 v-2 h-2 v-2 h-2 v2 h-2 v2 h-2 v-2 h2 v-2 h2 v-2 h-2 v-2 h-2 Z" fill="#fff" />
            </g>

            {/* Crosshair - Precision */}
            <g id="crosshair">
                <rect x="7" y="7" width="2" height="2" fill="#ff0080" />
                <rect x="7" y="2" width="2" height="3" fill="#ff0080" />
                <rect x="7" y="11" width="2" height="3" fill="#ff0080" />
                <rect x="2" y="7" width="3" height="2" fill="#ff0080" />
                <rect x="11" y="7" width="3" height="2" fill="#ff0080" />
                {/* Corners */}
                <rect x="3" y="3" width="1" height="1" fill="#ff0080" />
                <rect x="12" y="3" width="1" height="1" fill="#ff0080" />
                <rect x="3" y="12" width="1" height="1" fill="#ff0080" />
                <rect x="12" y="12" width="1" height="1" fill="#ff0080" />
            </g>

            {/* ========== VICTORY SPRITES (Redesigned) ========== */}

            {/* Trophy - 3D Cup Shape */}
            <g id="trophy-pixel">
                {/* Top Rim */}
                <rect x="3" y="3" width="10" height="1" fill="currentColor" />
                <rect x="2" y="4" width="12" height="1" fill="currentColor" />
                
                {/* Bowl Body (Tapered) */}
                <rect x="3" y="5" width="10" height="2" fill="currentColor" />
                <rect x="4" y="7" width="8" height="2" fill="currentColor" />
                <rect x="5" y="9" width="6" height="1" fill="currentColor" />
                
                {/* Handles (Curved) */}
                <rect x="1" y="5" width="2" height="1" fill="currentColor" />
                <rect x="13" y="5" width="2" height="1" fill="currentColor" />
                <rect x="1" y="6" width="1" height="2" fill="currentColor" />
                <rect x="14" y="6" width="1" height="2" fill="currentColor" />
                <rect x="2" y="8" width="1" height="1" fill="currentColor" />
                <rect x="13" y="8" width="1" height="1" fill="currentColor" />
                
                {/* Stem & Base */}
                <rect x="7" y="10" width="2" height="2" fill="currentColor" />
                <rect x="5" y="12" width="6" height="1" fill="currentColor" />
                <rect x="4" y="13" width="8" height="2" fill="currentColor" />
                
                {/* Reflection/Shine */}
                <rect x="5" y="5" width="1" height="3" fill="#ffff00" />
                <rect x="10" y="5" width="1" height="1" fill="#ffff00" />
            </g>

            {/* Trophy Animation Frames */}
            <g id="trophy-glow-1">
                <use href="#trophy-pixel" />
                <rect x="1" y="1" width="1" height="1" fill="#ffff00" />
                <rect x="14" y="2" width="1" height="1" fill="#ffff00" />
                <rect x="6" y="6" width="2" height="2" fill="#ffff00" opacity="0.5" />
            </g>

            <g id="trophy-glow-2">
                <use href="#trophy-pixel" />
                <rect x="2" y="2" width="1" height="1" fill="#ffff00" />
                <rect x="13" y="1" width="1" height="1" fill="#ffff00" />
                <rect x="15" y="10" width="1" height="1" fill="#ffff00" />
                <rect x="5" y="5" width="6" height="1" fill="#ffff00" opacity="0.5" />
            </g>

            {/* ... inside <defs> in SpriteDefinitions ... */}

{/* ========== NEW: RADAR LOBBY SPRITES ========== */}

{/* Radar Screen Base */}
<g id="radar-screen">
    {/* Dark Glass Background */}
    <rect x="1" y="1" width="14" height="14" rx="7" fill="#001a33" />
    
    {/* Outer Ring */}
    <path d="M8 1 A7 7 0 1 1 8 15 A7 7 0 1 1 8 1" fill="none" stroke="#00f0ff" strokeWidth="1" />
    
    {/* Inner Ring (Dashed) */}
    <path d="M8 4 A4 4 0 1 1 8 12 A4 4 0 1 1 8 4" fill="none" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
    
    {/* Crosshairs */}
    <line x1="8" y1="2" x2="8" y2="14" stroke="#00f0ff" strokeWidth="1" opacity="0.3" />
    <line x1="2" y1="8" x2="14" y2="8" stroke="#00f0ff" strokeWidth="1" opacity="0.3" />
    
    {/* Decorative Blips (Static) */}
    <rect x="10" y="5" width="1" height="1" fill="#ff0080" opacity="0.8" />
    <rect x="5" y="11" width="1" height="1" fill="#00ff00" opacity="0.6" />
</g>

{/* Radar Sweep Hand (The spinning part) */}
<g id="radar-hand">
    {/* The Sweep Gradient (Simulated with opacity) */}
    <path d="M8 8 L12 2 A7 7 0 0 0 8 1 Z" fill="#00f0ff" opacity="0.2" />
    <line x1="8" y1="8" x2="8" y2="1" stroke="#fff" strokeWidth="1" opacity="0.9" />
    {/* Center Dot */}
    <rect x="7" y="7" width="2" height="2" fill="#00f0ff" />
</g>

            {/* ========== DEFEAT SPRITES (Redesigned) ========== */}

            {/* Skull - Anatomical & Scary */}
            <g id="skull-pixel">
                {/* Cranium (Rounded Top) */}
                <rect x="5" y="1" width="6" height="1" fill="currentColor" />
                <rect x="3" y="2" width="10" height="1" fill="currentColor" />
                <rect x="2" y="3" width="12" height="5" fill="currentColor" />
                
                {/* Cheekbones */}
                <rect x="3" y="8" width="10" height="1" fill="currentColor" />
                
                {/* Eyes (Large & Deep) */}
                <rect x="4" y="4" width="3" height="3" fill="#000" />
                <rect x="9" y="4" width="3" height="3" fill="#000" />
                
                {/* Nose (Triangular) */}
                <rect x="7" y="8" width="2" height="2" fill="#000" />
                
                {/* Upper Teeth Row */}
                <rect x="4" y="9" width="8" height="2" fill="currentColor" />
                
                {/* Jaw Separation (Shadow) */}
                <rect x="2" y="8" width="1" height="2" fill="#000" opacity="0.2" />
                <rect x="13" y="8" width="1" height="2" fill="#000" opacity="0.2" />

                {/* Lower Jaw (Mandible) */}
                <rect x="5" y="12" width="6" height="1" fill="currentColor" />
                <rect x="4" y="11" width="1" height="1" fill="currentColor" />
                <rect x="11" y="11" width="1" height="1" fill="currentColor" />
                
                {/* Teeth Definition */}
                <rect x="5" y="10" width="1" height="2" fill="#000" />
                <rect x="7" y="10" width="2" height="2" fill="#000" />
                <rect x="10" y="10" width="1" height="2" fill="#000" />
            </g>

            {/* Skull Shake Frames */}
            <g id="skull-shake-1" transform="translate(0, 1)">
                <use href="#skull-pixel" />
            </g>

            <g id="skull-shake-2" transform="translate(0, -1)">
                <use href="#skull-pixel" />
            </g>

            {/* ========== JOYSTICK SPRITES (Refined) ========== */}

            <g id="joystick-neutral">
                {/* Base */}
                <rect x="2" y="12" width="12" height="3" fill="currentColor" />
                {/* Stick */}
                <rect x="7" y="6" width="2" height="6" fill="currentColor" />
                {/* Knob */}
                <rect x="5" y="3" width="6" height="4" fill="#ff0000" />
                <rect x="6" y="4" width="2" height="2" fill="#ff6666" />
                {/* Button */}
                <rect x="11" y="12" width="2" height="1" fill="#ffff00" />
            </g>

            <g id="joystick-left">
                <rect x="2" y="12" width="12" height="3" fill="currentColor" />
                {/* Tilted Stick */}
                <rect x="5" y="6" width="2" height="2" fill="currentColor" />
                <rect x="6" y="8" width="2" height="2" fill="currentColor" />
                <rect x="7" y="10" width="2" height="2" fill="currentColor" />
                {/* Knob */}
                <rect x="2" y="4" width="6" height="4" fill="#ff0000" />
                <rect x="3" y="5" width="2" height="2" fill="#ff6666" />
            </g>

            <g id="joystick-right">
                <rect x="2" y="12" width="12" height="3" fill="currentColor" />
                {/* Tilted Stick */}
                <rect x="9" y="6" width="2" height="2" fill="currentColor" />
                <rect x="8" y="8" width="2" height="2" fill="currentColor" />
                <rect x="7" y="10" width="2" height="2" fill="currentColor" />
                {/* Knob */}
                <rect x="8" y="4" width="6" height="4" fill="#ff0000" />
                <rect x="9" y="5" width="2" height="2" fill="#ff6666" />
            </g>

            <g id="joystick-pressed">
                 <rect x="2" y="12" width="12" height="3" fill="currentColor" />
                <rect x="7" y="6" width="2" height="6" fill="currentColor" />
                <rect x="5" y="3" width="6" height="4" fill="#ff0000" />
                {/* Glow */}
                <rect x="11" y="12" width="2" height="1" fill="#ffff00" />
                <rect x="10" y="11" width="4" height="3" fill="#ffff00" opacity="0.5" />
            </g>

            {/* ========== DECORATIVE (Sharper) ========== */}

            <g id="star-pixel">
                 <rect x="7" y="1" width="2" height="14" fill="currentColor" />
                 <rect x="1" y="7" width="14" height="2" fill="currentColor" />
                 <rect x="4" y="4" width="8" height="8" fill="currentColor" opacity="0.5" />
                 <rect x="7" y="7" width="2" height="2" fill="#ffff00" />
            </g>

            <g id="coin-pixel">
                <rect x="5" y="2" width="6" height="12" fill="currentColor" />
                <rect x="3" y="4" width="10" height="8" fill="currentColor" />
                <rect x="7" y="5" width="2" height="6" fill="#000" />
                <rect x="6" y="5" width="1" height="1" fill="#ffff00" />
            </g>
        </defs>
    </svg>
));

SpriteDefinitions.displayName = 'SpriteDefinitions';

/**
 * Reusable Sprite Component
 * Uses SVG <use> for maximum performance
 */
interface SpriteProps {
    spriteId: string;
    className?: string;
    style?: React.CSSProperties;
    size?: number;
}

export const Sprite = memo(({ spriteId, className = '', style = {}, size = 16 }: SpriteProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        className={className}
        style={{ 
            display: 'block',
            imageRendering: 'pixelated', // Critical for crisp pixel art
            ...style 
        }}
        xmlns="http://www.w3.org/2000/svg"
    >
        <use href={`#${spriteId}`} />
    </svg>
));

Sprite.displayName = 'Sprite';

/**
 * Animated Sprite Component
 */
interface AnimatedSpriteProps {
    frames: string[];
    frameRate?: number;
    className?: string;
    style?: React.CSSProperties;
    size?: number;
    loop?: boolean;
    onComplete?: () => void;
}

export const AnimatedSprite = memo(({ 
    frames, 
    frameRate = 10,
    className = '',
    style = {},
    size = 16,
    loop = true,
    onComplete
}: AnimatedSpriteProps) => {
    const [currentFrame, setCurrentFrame] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame(prev => {
                const nextFrame = prev + 1;
                if (nextFrame >= frames.length) {
                    if (loop) {
                        return 0;
                    } else {
                        onComplete?.();
                        return prev;
                    }
                }
                return nextFrame;
            });
        }, 1000 / frameRate);

        return () => clearInterval(interval);
    }, [frames.length, frameRate, loop, onComplete]);

    return <Sprite spriteId={frames[currentFrame]} className={className} style={style} size={size} />;
});

AnimatedSprite.displayName = 'AnimatedSprite';