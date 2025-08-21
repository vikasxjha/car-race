import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Pause, Play } from 'lucide-react';

interface HUDProps {
  score: number;
  lives: number;
  level: number;
  isPaused: boolean;
  onPause: () => void;
}

const HUD: React.FC<HUDProps> = ({ score, lives, level, isPaused, onPause }) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4">
      <div className="flex justify-between items-start">
        {/* Score and Level */}
        <div className="card bg-slate-900/80 backdrop-blur-sm p-4">
          <div className="game-text text-racing-yellow mb-2">
            SCORE: {score.toString().padStart(6, '0')}
          </div>
          <div className="game-text text-green-400">
            LEVEL: {level}
          </div>
        </div>
        
        {/* Lives */}
        <div className="card bg-slate-900/80 backdrop-blur-sm p-4">
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                size={24}
                className={i < lives ? 'text-red-500 fill-red-500' : 'text-gray-600'}
              />
            ))}
          </div>
        </div>
        
        {/* Pause Button */}
        <button
          onClick={onPause}
          className="card bg-slate-900/80 backdrop-blur-sm p-4 hover:bg-slate-800/80 transition-colors"
        >
          {isPaused ? <Play size={24} /> : <Pause size={24} />}
        </button>
      </div>
    </div>
  );
};

export default HUD;