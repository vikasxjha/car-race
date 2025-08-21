import React, { useRef, useEffect, useState } from 'react';
import { useSound } from '../contexts/SoundContext';
import { useGame } from '../contexts/GameContext';
import GameEngine from '../game/GameEngine';

interface GameCanvasProps {
  selectedCar: string;
  isPaused: boolean;
  isDayMode: boolean;
  onScoreUpdate: (score: number) => void;
  onLivesUpdate: (lives: number) => void;
  onLevelUpdate: (level: number) => void;
  onGameOver: () => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  selectedCar,
  isPaused,
  isDayMode,
  onScoreUpdate,
  onLivesUpdate,
  onLevelUpdate,
  onGameOver
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameEngineRef = useRef<GameEngine | null>(null);
  const { playSound } = useSound();
  const { updateStats } = useGame();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize game engine
    gameEngineRef.current = new GameEngine(
      canvas,
      ctx,
      selectedCar,
      isDayMode,
      {
        onScoreUpdate,
        onLivesUpdate,
        onLevelUpdate,
        onGameOver,
        playSound,
        updateStats
      }
    );

    gameEngineRef.current.start();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (gameEngineRef.current) {
        gameEngineRef.current.destroy();
      }
    };
  }, [selectedCar, isDayMode]);

  useEffect(() => {
    if (gameEngineRef.current) {
      gameEngineRef.current.setPaused(isPaused);
    }
  }, [isPaused]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ touchAction: 'none' }}
    />
  );
};

export default GameCanvas;