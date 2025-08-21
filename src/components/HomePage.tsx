import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Play, Info, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';

interface HomePageProps {
  onStartGame: () => void;
  onShowLeaderboard: () => void;
  onShowAchievements: () => void;
  onToggleDayNight: () => void;
  isDayMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({
  onStartGame,
  onShowLeaderboard,
  onShowAchievements,
  onToggleDayNight,
  isDayMode
}) => {
  const { isMusicEnabled, isSoundEnabled, toggleMusic, toggleSound } = useSound();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4"
    >
      {/* Title */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="racing-text text-6xl md:text-8xl text-racing-red mb-4 
                     drop-shadow-[0_0_30px_rgba(255,0,0,0.5)]">
          ROAD RACER
        </h1>
        <p className="text-racing-yellow text-xl md:text-2xl font-racing">
          Classic Racing Reimagined
        </p>
      </motion.div>

      {/* Main Menu */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="card w-full max-w-md space-y-4"
      >
        <button
          onClick={onStartGame}
          className="w-full btn-primary flex items-center justify-center gap-3 text-lg"
        >
          <Play size={24} />
          START GAME
        </button>

        <button
          onClick={onShowLeaderboard}
          className="w-full btn-secondary flex items-center justify-center gap-3"
        >
          <Trophy size={20} />
          LEADERBOARD
        </button>

        <button
          onClick={onShowAchievements}
          className="w-full px-6 py-3 bg-racing-yellow text-slate-900 font-bold rounded-lg 
                   hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105
                   shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-3"
        >
          <Trophy size={20} />
          ACHIEVEMENTS
        </button>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="card mt-8 w-full max-w-md"
      >
        <h3 className="text-racing-yellow font-racing text-xl mb-4 flex items-center gap-2">
          <Info size={20} />
          HOW TO PLAY
        </h3>
        <div className="space-y-2 text-sm text-slate-300">
          <p>• Use Arrow Keys or WASD to control your car</p>
          <p>• Avoid obstacles and collect fuel cans</p>
          <p>• Grab boosts for extra speed</p>
          <p>• Survive as long as possible</p>
          <p>• Press SPACE to pause during game</p>
        </div>
      </motion.div>

      {/* Settings Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="fixed bottom-4 right-4 flex gap-2"
      >
        <button
          onClick={onToggleDayNight}
          className="p-3 bg-slate-800/80 backdrop-blur rounded-full hover:bg-slate-700 
                   transition-colors duration-300"
          aria-label="Toggle day/night mode"
        >
          {isDayMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-blue-300" />}
        </button>

        <button
          onClick={toggleMusic}
          className="p-3 bg-slate-800/80 backdrop-blur rounded-full hover:bg-slate-700 
                   transition-colors duration-300"
          aria-label="Toggle music"
        >
          {isMusicEnabled ? <Volume2 size={24} className="text-green-400" /> : <VolumeX size={24} className="text-red-400" />}
        </button>

        <button
          onClick={toggleSound}
          className="p-3 bg-slate-800/80 backdrop-blur rounded-full hover:bg-slate-700 
                   transition-colors duration-300"
          aria-label="Toggle sound effects"
        >
          {isSoundEnabled ? 
            <Volume2 size={24} className="text-green-400" /> : 
            <VolumeX size={24} className="text-red-400" />
          }
        </button>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;