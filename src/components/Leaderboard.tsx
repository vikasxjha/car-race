import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';
import { getLeaderboard } from '../services/firebase';
import { LeaderboardEntry } from '../types/game';

interface LeaderboardProps {
  onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onBack }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadLeaderboard();
  }, []);
  
  const loadLeaderboard = async () => {
    try {
      const data = await getLeaderboard();
      setEntries(data);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="text-yellow-400" size={24} />;
      case 2:
        return <Medal className="text-gray-400" size={24} />;
      case 3:
        return <Award className="text-orange-600" size={24} />;
      default:
        return <span className="text-xl font-bold">{position}</span>;
    }
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
          LEADERBOARD
        </motion.h2>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="loading-spinner" />
            </div>
          ) : entries.length === 0 ? (
            <p className="text-center text-gray-400 py-12">No scores yet. Be the first!</p>
          ) : (
            <div className="space-y-3">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    index === 0 ? 'bg-yellow-500/10 border border-yellow-500/30' :
                    index === 1 ? 'bg-gray-500/10 border border-gray-500/30' :
                    index === 2 ? 'bg-orange-500/10 border border-orange-500/30' :
                    'bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 flex justify-center">
                      {getMedalIcon(index + 1)}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{entry.playerName}</p>
                      <p className="text-sm text-gray-400">Level {entry.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-racing-yellow">
                      {entry.score.toString().padStart(6, '0')}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Leaderboard;