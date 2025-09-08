'use client';

import { motion } from 'framer-motion';
import { DominoTile } from '@/types/game';
import DominoCard from './DominoCard';
import { canPlayTile } from '@/utils/domino';

interface PlayerHandProps {
  tiles: DominoTile[];
  leftEnd: number;
  rightEnd: number;
  onPlayCard: (tileId: string, side: 'left' | 'right') => void;
  isCurrentTurn: boolean;
}

export default function PlayerHand({ tiles, leftEnd, rightEnd, onPlayCard, isCurrentTurn }: PlayerHandProps) {
  const getPlayableTiles = () => {
    return tiles.map(tile => {
      const canPlay = canPlayTile(tile, leftEnd, rightEnd);
      return {
        tile,
        canPlay: canPlay.canPlay,
        side: canPlay.side,
        needsFlip: canPlay.needsFlip
      };
    });
  };

  const playableTiles = getPlayableTiles();

  const handleCardClick = (tileId: string) => {
    const playableTile = playableTiles.find(pt => pt.tile.id === tileId);
    if (playableTile && playableTile.canPlay && isCurrentTurn) {
      onPlayCard(tileId, playableTile.side!);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 flex items-center justify-center">
      <motion.div
        className="flex items-end space-x-2"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {tiles.map((tile, index) => {
          const playableTile = playableTiles.find(pt => pt.tile.id === tile.id);
          const isPlayable = playableTile?.canPlay && isCurrentTurn;
          
          return (
            <motion.div
              key={tile.id}
              initial={{ y: 50, opacity: 0, rotate: -10 }}
              animate={{ 
                y: isPlayable ? -10 : 0, 
                opacity: 1, 
                rotate: 0,
                zIndex: isPlayable ? 10 : 1
              }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 200
              }}
              className="relative"
            >
              <DominoCard
                tile={tile}
                isPlayable={isPlayable}
                onClick={() => handleCardClick(tile.id)}
                leftEnd={leftEnd}
                rightEnd={rightEnd}
                className={`
                  ${isPlayable ? 'shadow-lg shadow-green-500/50' : ''}
                  transition-all duration-300
                `}
              />
              
              {/* Playable indicator */}
              {isPlayable && (
                <motion.div
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Turn indicator */}
      {isCurrentTurn && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            Your Turn
          </div>
        </motion.div>
      )}
    </div>
  );
}