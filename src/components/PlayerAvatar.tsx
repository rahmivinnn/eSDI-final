'use client';

import { motion } from 'framer-motion';
import { Player } from '@/types/game';

interface PlayerAvatarProps {
  player: Player;
  position: 'top' | 'left' | 'right' | 'bottom';
}

export default function PlayerAvatar({ player, position }: PlayerAvatarProps) {
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'left':
        return 'left-4 top-1/2 transform -translate-y-1/2';
      case 'right':
        return 'right-4 top-1/2 transform -translate-y-1/2';
      case 'bottom':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      default:
        return '';
    }
  };

  const getAvatarClasses = () => {
    const baseClasses = 'w-16 h-16 rounded-full border-4 flex items-center justify-center text-white font-bold text-lg shadow-lg';
    const colorClasses = player.isCurrentTurn 
      ? 'border-yellow-400 bg-gradient-to-br from-yellow-500 to-orange-500 shadow-yellow-400/50' 
      : 'border-gray-400 bg-gradient-to-br from-gray-600 to-gray-700';
    
    return `${baseClasses} ${colorClasses}`;
  };

  const getTimerPosition = () => {
    switch (position) {
      case 'top':
        return 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2';
      case 'left':
        return 'right-0 top-1/2 transform -translate-y-1/2 translate-x-2';
      case 'right':
        return 'left-0 top-1/2 transform -translate-y-1/2 -translate-x-2';
      case 'bottom':
        return 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-2';
      default:
        return '';
    }
  };

  const getInfoPosition = () => {
    switch (position) {
      case 'top':
        return 'top-20 left-1/2 transform -translate-x-1/2 text-center';
      case 'left':
        return 'left-20 top-1/2 transform -translate-y-1/2 text-left';
      case 'right':
        return 'right-20 top-1/2 transform -translate-y-1/2 text-right';
      case 'bottom':
        return 'bottom-20 left-1/2 transform -translate-x-1/2 text-center';
      default:
        return '';
    }
  };

  return (
    <div className={`absolute ${getPositionClasses()}`}>
      {/* Avatar with glow effect for current turn */}
      <motion.div
        className={getAvatarClasses()}
        animate={player.isCurrentTurn ? {
          boxShadow: [
            '0 0 20px rgba(255, 255, 0, 0.5)',
            '0 0 30px rgba(255, 255, 0, 0.8)',
            '0 0 20px rgba(255, 255, 0, 0.5)'
          ]
        } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {player.name.charAt(0).toUpperCase()}
      </motion.div>

      {/* Timer ring */}
      <div className={`absolute ${getTimerPosition()}`}>
        <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-gray-300"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 10}`}
            strokeDashoffset={`${2 * Math.PI * 10 * (1 - player.timeLeft / 10)}`}
            className={`transition-all duration-1000 ${
              player.timeLeft <= 3 ? 'text-red-500' : 
              player.timeLeft <= 6 ? 'text-yellow-500' : 'text-green-500'
            }`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
          {player.timeLeft}
        </div>
      </div>

      {/* Player info */}
      <div className={`absolute ${getInfoPosition()}`}>
        <div className="text-white font-semibold text-sm drop-shadow-lg">
          {player.name}
        </div>
        <div className="text-yellow-300 text-xs drop-shadow-lg">
          Score: {player.score}
        </div>
        <div className="text-blue-300 text-xs drop-shadow-lg">
          Cards: {player.hand.length}
        </div>
      </div>
    </div>
  );
}