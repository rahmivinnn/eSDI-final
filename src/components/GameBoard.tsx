'use client';

import { motion } from 'framer-motion';
import { DominoTile } from '@/types/game';
import DominoCard from './DominoCard';

interface GameBoardProps {
  board: DominoTile[];
  leftEnd: number;
  rightEnd: number;
}

export default function GameBoard({ board, leftEnd, rightEnd }: GameBoardProps) {
  if (board.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-white text-2xl font-bold opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        >
          Waiting for first move...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <motion.div
        className="flex items-center space-x-1 max-w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {board.map((tile, index) => (
          <motion.div
            key={`${tile.id}-${index}`}
            initial={{ 
              opacity: 0, 
              scale: 0.5,
              x: index === 0 ? -100 : 100,
              y: index === 0 ? -50 : 50
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: 0,
              y: 0
            }}
            transition={{ 
              duration: 0.6,
              delay: index * 0.1,
              type: "spring",
              stiffness: 200
            }}
            className="relative"
          >
            <DominoCard
              tile={tile}
              className="w-12 h-18"
            />
            
            {/* Connection line to next tile */}
            {index < board.length - 1 && (
              <motion.div
                className="absolute top-1/2 -right-1 w-2 h-0.5 bg-gray-400 transform -translate-y-1/2"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
      
      {/* End indicators */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <div className="text-white text-sm font-bold bg-black/50 px-2 py-1 rounded">
            Left: {leftEnd}
          </div>
          <div className="text-white text-sm font-bold bg-black/50 px-2 py-1 rounded">
            Right: {rightEnd}
          </div>
        </div>
      </motion.div>
    </div>
  );
}