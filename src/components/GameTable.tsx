'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import PlayerAvatar from './PlayerAvatar';
import PlayerHand from './PlayerHand';
import GameBoard from './GameBoard';
import GameOverlay from './GameOverlay';

export default function GameTable() {
  const {
    players,
    board,
    leftEnd,
    rightEnd,
    gameStatus,
    winner,
    isBlocked,
    startGame,
    playCard,
    restartGame
  } = useGameStore();

  // Start game on component mount
  useEffect(() => {
    if (gameStatus === 'waiting') {
      startGame();
    }
  }, [gameStatus, startGame]);

  // Get human player (bottom player)
  const humanPlayer = players.find(p => p.isHuman);
  const aiPlayers = players.filter(p => !p.isHuman);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/background.png)'
        }}
      />
      
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Game content */}
      <div className="relative z-10 w-full h-full">
        {/* Player avatars */}
        {players.length > 0 && (
          <>
            {/* Top player */}
            {aiPlayers[0] && (
              <PlayerAvatar player={aiPlayers[0]} position="top" />
            )}
            
            {/* Left player */}
            {aiPlayers[1] && (
              <PlayerAvatar player={aiPlayers[1]} position="left" />
            )}
            
            {/* Right player */}
            {aiPlayers[2] && (
              <PlayerAvatar player={aiPlayers[2]} position="right" />
            )}
            
            {/* Bottom player (human) */}
            {humanPlayer && (
              <PlayerAvatar player={humanPlayer} position="bottom" />
            )}
          </>
        )}

        {/* Game board */}
        <GameBoard 
          board={board} 
          leftEnd={leftEnd} 
          rightEnd={rightEnd} 
        />

        {/* Human player hand */}
        {humanPlayer && gameStatus === 'playing' && (
          <PlayerHand
            tiles={humanPlayer.hand}
            leftEnd={leftEnd}
            rightEnd={rightEnd}
            onPlayCard={(tileId, side) => playCard(humanPlayer.id, tileId, side)}
            isCurrentTurn={humanPlayer.isCurrentTurn}
          />
        )}

        {/* Game over overlay */}
        {gameStatus === 'ended' && (
          <GameOverlay
            winner={winner}
            isBlocked={isBlocked}
            onRestart={restartGame}
          />
        )}

        {/* Loading state */}
        {gameStatus === 'waiting' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white text-2xl font-bold">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
              />
              Setting up game...
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}