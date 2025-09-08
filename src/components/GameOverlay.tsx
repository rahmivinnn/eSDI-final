'use client';

import { motion } from 'framer-motion';
import { Player } from '@/types/game';

interface GameOverlayProps {
  winner: Player | null;
  isBlocked: boolean;
  onRestart: () => void;
}

export default function GameOverlay({ winner, isBlocked, onRestart }: GameOverlayProps) {
  if (!winner) return null;

  return (
    <motion.div
      className="absolute inset-0 bg-black/80 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Winner announcement */}
        <motion.div
          className="mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isBlocked ? 'Game Blocked!' : 'Winner!'}
          </h2>
          <div className="text-xl text-gray-600">
            {winner.name} wins!
          </div>
        </motion.div>

        {/* Winner details */}
        <motion.div
          className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-4 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-lg font-semibold text-gray-800">
            {winner.name}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {isBlocked ? `Lowest pip sum: ${winner.score}` : 'First to empty hand!'}
          </div>
        </motion.div>

        {/* Restart button */}
        <motion.button
          onClick={onRestart}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Play Again
        </motion.button>

        {/* Game type indicator */}
        <motion.div
          className="mt-4 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {isBlocked ? 'Game ended due to no valid moves' : 'Game completed successfully'}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}