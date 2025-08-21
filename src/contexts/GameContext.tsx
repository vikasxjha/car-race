import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Achievement, GameStats } from '../types/game';
import { achievements } from '../data/achievements';

interface GameContextType {
  stats: GameStats;
  updateStats: (updates: Partial<GameStats>) => void;
  unlockedAchievements: Achievement[];
  checkAchievements: () => void;
  resetStats: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialStats: GameStats = {
  totalDistance: 0,
  totalFuelCollected: 0,
  totalBoostsUsed: 0,
  crashCount: 0,
  highestLevel: 1,
  longestNoCrashDistance: 0,
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<GameStats>(() => {
    const saved = localStorage.getItem('gameStats');
    return saved ? JSON.parse(saved) : initialStats;
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('gameStats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  const updateStats = (updates: Partial<GameStats>) => {
    setStats(prev => ({ ...prev, ...updates }));
  };

  const checkAchievements = () => {
    const newUnlocked = achievements.filter(achievement => {
      const isUnlocked = unlockedAchievements.some(a => a.id === achievement.id);
      if (!isUnlocked && achievement.condition(stats)) {
        return true;
      }
      return false;
    });

    if (newUnlocked.length > 0) {
      setUnlockedAchievements(prev => [
        ...prev,
        ...newUnlocked.map(a => ({ ...a, unlocked: true, unlockedAt: new Date() }))
      ]);
    }
  };

  const resetStats = () => {
    setStats(initialStats);
    setUnlockedAchievements([]);
    localStorage.removeItem('gameStats');
    localStorage.removeItem('achievements');
  };

  return (
    <GameContext.Provider value={{
      stats,
      updateStats,
      unlockedAchievements,
      checkAchievements,
      resetStats
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}