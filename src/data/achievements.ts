import { Achievement } from '../types/game';

export const achievements: Achievement[] = [
  {
    id: 'first-5km',
    name: 'Road Warrior',
    description: 'Drive 5KM without crashing',
    icon: '🏁',
    unlocked: false,
    condition: (stats) => stats.longestNoCrashDistance >= 5000,
  },
  {
    id: 'fuel-master',
    name: 'Fuel Master',
    description: 'Collect 10 fuel cans',
    icon: '⛽',
    unlocked: false,
    condition: (stats) => stats.totalFuelCollected >= 10,
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Use 5 boosts',
    icon: '🚀',
    unlocked: false,
    condition: (stats) => stats.totalBoostsUsed >= 5,
  },
  {
    id: 'level-5',
    name: 'Level Master',
    description: 'Reach level 5',
    icon: '⭐',
    unlocked: false,
    condition: (stats) => stats.highestLevel >= 5,
  },
  {
    id: 'survivor',
    name: 'Survivor',
    description: 'Play without crashing for 10KM',
    icon: '🛡️',
    unlocked: false,
    condition: (stats) => stats.longestNoCrashDistance >= 10000,
  },
  {
    id: 'distance-king',
    name: 'Distance King',
    description: 'Travel a total of 50KM',
    icon: '👑',
    unlocked: false,
    condition: (stats) => stats.totalDistance >= 50000,
  },
];