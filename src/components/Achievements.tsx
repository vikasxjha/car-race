import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, CheckCircle } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { achievements } from '../data/achievements';

interface AchievementsProps {
  onBack: () => void;
}

const Achievements: React.FC<AchievementsProps> = ({ onBack }) => {
  const { unlockedAchievements } = useGame();
  
  const isUnlocked = (achievementId: string) => {
    return unlockedAchievements.some(a => a.id === achievementId);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-4"
    >
      <button
        onClick={onBack}
        className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-racing-yellow transition-colors"
      >
        <ArrowLeft size={24} />
        <span className="font-racing">BACK</span>
      </button>
      
      <div className="max-w-4xl mx-auto pt-20">
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="racing-text text-4xl md:text-5xl text-center text-racing-yellow mb-8"
        >
          ACHIEVEMENTS
        </motion.h2>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-6">
            <p className="text-xl">
              Unlocked: {unlockedAchievements.length} / {achievements.length}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const unlocked = isUnlocked(achievement.id);
              
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`card p-4 ${
                    unlocked ? 'bg-green-500/10 border border-green-500/30' : 'opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">
                      {unlocked ? (
                        <CheckCircle className="text-green-400" size={40} />
                      ) : (
                        <Lock className="text-gray-500" size={40} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {achievement.description}
                      </p>
                      {unlocked && (
                        <p className="text-xs text-green-400 mt-2">
                          Unlocked!
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Achievements;