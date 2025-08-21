import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Howl } from 'howler';

interface SoundContextType {
  isMusicEnabled: boolean;
  isSoundEnabled: boolean;
  toggleMusic: () => void;
  toggleSound: () => void;
  playSound: (soundName: string) => void;
  playMusic: () => void;
  stopMusic: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Initialize sounds
const sounds = {
  engine: new Howl({ src: ['/sounds/engine.mp3'], loop: true, volume: 0.3 }),
  crash: new Howl({ src: ['/sounds/crash.mp3'], volume: 0.5 }),
  collect: new Howl({ src: ['/sounds/collect.mp3'], volume: 0.4 }),
  boost: new Howl({ src: ['/sounds/boost.mp3'], volume: 0.6 }),
  levelUp: new Howl({ src: ['/sounds/level-up.mp3'], volume: 0.5 }),
  gameOver: new Howl({ src: ['/sounds/game-over.mp3'], volume: 0.5 }),
};

const bgMusic = new Howl({
  src: ['/sounds/background-music.mp3'],
  loop: true,
  volume: 0.2,
});

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMusicEnabled, setIsMusicEnabled] = useState(() => {
    const saved = localStorage.getItem('musicEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('musicEnabled', JSON.stringify(isMusicEnabled));
    if (isMusicEnabled) {
      bgMusic.play();
    } else {
      bgMusic.stop();
    }
  }, [isMusicEnabled]);

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(isSoundEnabled));
  }, [isSoundEnabled]);

  const toggleMusic = () => {
    setIsMusicEnabled(!isMusicEnabled);
  };

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
  };

  const playSound = (soundName: string) => {
    if (isSoundEnabled && sounds[soundName as keyof typeof sounds]) {
      sounds[soundName as keyof typeof sounds].play();
    }
  };

  const playMusic = () => {
    if (isMusicEnabled && !bgMusic.playing()) {
      bgMusic.play();
    }
  };

  const stopMusic = () => {
    bgMusic.stop();
  };

  return (
    <SoundContext.Provider value={{
      isMusicEnabled,
      isSoundEnabled,
      toggleMusic,
      toggleSound,
      playSound,
      playMusic,
      stopMusic
    }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within SoundProvider');
  }
  return context;
}