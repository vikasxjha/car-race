import React from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Home } from 'lucide-react';

interface PauseMenuProps {
  onResume: () => void;
  onRestart: () => void;
  onQuit: () => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ onResume, onRestart, onQuit }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-20"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="card max-w-md w-full mx-4"
      >
        <h2 className="racing-text text-3xl text-center text-racing-yellow mb-8">
          PAUSED
        </h2>
        
        <div className="space-y-4">
          <button
            onClick={onResume}
            className="w-full btn-primary flex items-center justify-center gap-3"
          >
            <Play size={20} />
            RESUME
          </button>
          
          <button
            onClick={onRestart}
            className="w-full btn-secondary flex items-center justify-center gap-3"
          >
            <RotateCcw size={20} />
            RESTART
          </button>
          
          <button
            onClick={onQuit}
            className="w-full px-6 py-3 bg-slate-700 text-white font-bold rounded-lg 
                     hover:bg-slate-600 transition-all duration-300 transform hover:scale-105
                     shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-3"
          >
            <Home size={20} />
            QUIT TO MENU
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PauseMenu;