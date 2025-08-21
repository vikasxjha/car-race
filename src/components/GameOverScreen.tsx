import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Home, Trophy } from 'lucide-react';
import { saveScore } from '../services/firebase';
import { useSound } from '../contexts/SoundContext';

interface GameOverScreenProps {
  score: number;
  level: number;
  onRestart: () => void;
  onMenu: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, level, onRestart, onMenu }) => {
  const [playerName, setPlayerName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { playSound } = useSound();
  
  const handleSaveScore = async () => {
    if (!playerName.trim()) return;
    
    setIsSaving(true);
    try {
      await saveScore({
        playerName: playerName.trim(),
        score,
        level,
        date: new Date(),
        car: 'default'
      });
      setSaved(true);
      playSound('levelUp');
    } catch (error) {
      console.error('Failed to save score:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card max-w-md w-full"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="racing-text text-4xl text-center text-red-500 mb-6"
        >
          GAME OVER
        </motion.h2>
        
        <div className="space-y-4 mb-8">
          <div className="text-center">
            <p className="text-gray-400 mb-2">Final Score</p>
            <p className="text-3xl font-bold text-racing-yellow">
              {score.toString().padStart(6, '0')}
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 mb-2">Level Reached</p>
            <p className="text-2xl font-bold text-green-400">{level}</p>
          </div>
        </div>
        
        {!saved ? (
          <div className="space-y-4 mb-8">
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-racing-yellow"
              maxLength={20}
            />
            <button
              onClick={handleSaveScore}
              disabled={!playerName.trim() || isSaving}
              className="w-full px-6 py-3 bg-racing-yellow text-slate-900 font-bold rounded-lg 
                       hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105
                       shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-3"
            >
              <Trophy size={20} />
              {isSaving ? 'SAVING...' : 'SAVE TO LEADERBOARD'}
            </button>
          </div>
        ) : (
          <div className="mb-8 p-4 bg-green-500/20 rounded-lg text-center">
            <p className="text-green-400 font-bold">Score Saved!</p>
          </div>
        )}
        
        <div className="space-y-4">
          <button
            onClick={onRestart}
            className="w-full btn-primary flex items-center justify-center gap-3"
          >
            <RotateCcw size={20} />
            PLAY AGAIN
          </button>
          
          <button
            onClick={onMenu}
            className="w-full btn-secondary flex items-center justify-center gap-3"
          >
            <Home size={20} />
            MAIN MENU
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameOverScreen;