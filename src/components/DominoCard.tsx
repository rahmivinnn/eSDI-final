'use client';

import { motion } from 'framer-motion';
import { DominoTile } from '@/types/game';
import { getTileImagePath, canPlayTile } from '@/utils/domino';

interface DominoCardProps {
  tile: DominoTile;
  isPlayable?: boolean;
  isHidden?: boolean;
  onClick?: () => void;
  leftEnd?: number;
  rightEnd?: number;
  className?: string;
}

export default function DominoCard({ 
  tile, 
  isPlayable = false, 
  isHidden = false, 
  onClick, 
  leftEnd, 
  rightEnd,
  className = ''
}: DominoCardProps) {
  const canPlay = leftEnd !== undefined && rightEnd !== undefined 
    ? canPlayTile(tile, leftEnd, rightEnd).canPlay 
    : false;

  const handleClick = () => {
    if (onClick && (isPlayable || canPlay)) {
      onClick();
    }
  };

  return (
    <motion.div
      className={`
        relative w-16 h-24 cursor-pointer select-none
        ${isPlayable || canPlay ? 'hover:scale-110' : ''}
        ${className}
      `}
      onClick={handleClick}
      whileHover={isPlayable || canPlay ? { scale: 1.1 } : {}}
      whileTap={isPlayable || canPlay ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-full">
        {isHidden ? (
          <div className="w-full h-full bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg border-2 border-blue-600 shadow-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-400 rounded-full opacity-50"></div>
          </div>
        ) : (
          <img
            src={getTileImagePath(tile)}
            alt={`Domino ${tile.left}-${tile.right}`}
            className="w-full h-full object-contain rounded-lg border-2 border-gray-300 shadow-lg"
            draggable={false}
          />
        )}
        
        {/* Playable indicator */}
        {(isPlayable || canPlay) && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          />
        )}
      </div>
    </motion.div>
  );
}