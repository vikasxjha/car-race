export type GameState = 'menu' | 'car-selection' | 'playing' | 'paused' | 'game-over' | 'leaderboard' | 'achievements';

export interface Car {
  id: string;
  name: string;
  speed: number;
  handling: number;
  acceleration: number;
  color: string;
  sprite?: string;
}

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'car' | 'oil' | 'broken';
  speed?: number;
  lane?: number;
}

export interface Collectible {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'fuel' | 'boost' | 'coin';
  collected: boolean;
}

export interface LeaderboardEntry {
  id?: string;
  playerName: string;
  score: number;
  level: number;
  date: Date;
  car: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  condition: (stats: GameStats) => boolean;
}

export interface GameStats {
  totalDistance: number;
  totalFuelCollected: number;
  totalBoostsUsed: number;
  crashCount: number;
  highestLevel: number;
  longestNoCrashDistance: number;
}

export interface GameConfig {
  canvasWidth: number;
  canvasHeight: number;
  roadWidth: number;
  laneCount: number;
  baseSpeed: number;
  maxSpeed: number;
  acceleration: number;
  deceleration: number;
}