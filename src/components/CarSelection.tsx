import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { cars } from '../data/cars';

interface CarSelectionProps {
  onSelectCar: (carId: string) => void;
  onBack: () => void;
}

const CarSelection: React.FC<CarSelectionProps> = ({ onSelectCar, onBack }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };
  
  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % cars.length);
  };
  
  const currentCar = cars[selectedIndex];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4"
    >
      <button
        onClick={onBack}
        className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-racing-yellow transition-colors"
      >
        <ArrowLeft size={24} />
        <span className="font-racing">BACK</span>
      </button>
      
      <motion.h2
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="racing-text text-4xl md:text-5xl text-racing-yellow mb-8"
      >
        SELECT YOUR CAR
      </motion.h2>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card max-w-2xl w-full"
      >
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handlePrevious}
            className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors"
          >
            <ChevronLeft size={30} />
          </button>
          
          <div className="flex-1 text-center">
            <h3 className="text-2xl font-racing text-racing-red mb-2">
              {currentCar.name}
            </h3>
            <div
              className="w-32 h-48 mx-auto rounded-lg shadow-2xl"
              style={{ backgroundColor: currentCar.color }}
            />
          </div>
          
          <button
            onClick={handleNext}
            className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors"
          >
            <ChevronRight size={30} />
          </button>
        </div>
        
        <div className="space-y-4 mb-8">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Speed</span>
              <span>{currentCar.speed}/10</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="bg-racing-red h-3 rounded-full transition-all duration-300"
                style={{ width: `${currentCar.speed * 10}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Handling</span>
              <span>{currentCar.handling}/10</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="bg-racing-blue h-3 rounded-full transition-all duration-300"
                style={{ width: `${currentCar.handling * 10}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Acceleration</span>
              <span>{currentCar.acceleration}/10</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="bg-racing-yellow h-3 rounded-full transition-all duration-300"
                style={{ width: `${currentCar.acceleration * 10}%` }}
              />
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onSelectCar(currentCar.id)}
          className="w-full btn-primary text-lg"
        >
          SELECT THIS CAR
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CarSelection;