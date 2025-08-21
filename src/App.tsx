import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameProvider } from './contexts/GameContext';
import { SoundProvider } from './contexts/SoundContext';
import HomePage from './components/HomePage';
import GameCanvas from './components/GameCanvas';
import Leaderboard from './components/Leaderboard';
import CarSelection from './components/CarSelection';
import GameOverScreen from './components/GameOverScreen';
import PauseMenu from './components/PauseMenu';
import HUD from './components/HUD';
import Achievements from './components/Achievements';
import { GameState } from './types/game';

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [level, setLevel] = useState(1);
  const [isDayMode, setIsDayMode] = useState(true);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ' && gameState === 'playing') {
        setIsPaused(!isPaused);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [gameState, isPaused]);

  const startGame = () => {
    if (!selectedCar) {
      setGameState('car-selection');
    } else {
      setGameState('playing');
      setScore(0);
      setLives(3);
      setLevel(1);
      setIsPaused(false);
    }
  };

  const handleCarSelect = (carId: string) => {
    setSelectedCar(carId);
    setGameState('playing');
  };

  const handleGameOver = () => {
    setGameState('game-over');
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setIsPaused(false);
    setGameState('playing');
  };

  const backToMenu = () => {
    setGameState('menu');
    setSelectedCar(null);
  };

  return (
    <SoundProvider>
      <GameProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          <AnimatePresence mode="wait">
            {gameState === 'menu' && (
              <HomePage
                onStartGame={startGame}
                onShowLeaderboard={() => setGameState('leaderboard')}
                onShowAchievements={() => setGameState('achievements')}
                onToggleDayNight={() => setIsDayMode(!isDayMode)}
                isDayMode={isDayMode}
              />
            )}

            {gameState === 'car-selection' && (
              <CarSelection
                onSelectCar={handleCarSelect}
                onBack={backToMenu}
              />
            )}

            {gameState === 'playing' && (
              <div className="relative w-full h-screen">
                <HUD
                  score={score}
                  lives={lives}
                  level={level}
                  isPaused={isPaused}
                  onPause={() => setIsPaused(!isPaused)}
                />
                <GameCanvas
                  selectedCar={selectedCar!}
                  isPaused={isPaused}
                  isDayMode={isDayMode}
                  onScoreUpdate={setScore}
                  onLivesUpdate={setLives}
                  onLevelUpdate={setLevel}
                  onGameOver={handleGameOver}
                />
                {isPaused && (
                  <PauseMenu
                    onResume={() => setIsPaused(false)}
                    onRestart={restartGame}
                    onQuit={backToMenu}
                  />
                )}
              </div>
            )}

            {gameState === 'game-over' && (
              <GameOverScreen
                score={score}
                level={level}
                onRestart={restartGame}
                onMenu={backToMenu}
              />
            )}

            {gameState === 'leaderboard' && (
              <Leaderboard onBack={backToMenu} />
            )}

            {gameState === 'achievements' && (
              <Achievements onBack={backToMenu} />
            )}
          </AnimatePresence>
        </div>
      </GameProvider>
    </SoundProvider>
  );
}

export default App;