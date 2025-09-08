import { create } from 'zustand';
import { GameState, GameActions, Player, DominoTile } from '@/types/game';
import { generateDominoSet, shuffleArray, dealTiles, findStartingPlayer, canPlayTile, calculatePipSum } from '@/utils/domino';

interface GameStore extends GameState, GameActions {}

const TURN_TIME = 10; // 10 seconds per turn

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  players: [],
  board: [],
  currentPlayerIndex: 0,
  gameStatus: 'waiting',
  winner: null,
  leftEnd: -1,
  rightEnd: -1,
  isBlocked: false,
  turnTimer: TURN_TIME,

  // Actions
  startGame: () => {
    const tiles = shuffleArray(generateDominoSet());
    const hands = dealTiles(tiles);
    const startingPlayer = findStartingPlayer(hands);
    
    const players: Player[] = [
      { id: 0, name: 'You', hand: hands[0], score: 0, isHuman: true, isCurrentTurn: false, timeLeft: TURN_TIME },
      { id: 1, name: 'AI 1', hand: hands[1], score: 0, isHuman: false, isCurrentTurn: false, timeLeft: TURN_TIME },
      { id: 2, name: 'AI 2', hand: hands[2], score: 0, isHuman: false, isCurrentTurn: false, timeLeft: TURN_TIME },
      { id: 3, name: 'AI 3', hand: hands[3], score: 0, isHuman: false, isCurrentTurn: false, timeLeft: TURN_TIME },
    ];
    
    // Set starting player
    players[startingPlayer].isCurrentTurn = true;
    
    // Find and play the starting double
    const startingHand = hands[startingPlayer];
    const doubles = startingHand.filter(t => t.isDouble);
    const highestDouble = doubles.length > 0 ? Math.max(...doubles.map(t => t.left)) : -1;
    const startingTile = startingHand.find(tile => tile.isDouble && tile.left === highestDouble);
    
    if (startingTile) {
      const newHand = startingHand.filter(tile => tile.id !== startingTile.id);
      players[startingPlayer].hand = newHand;
      
      set({
        players,
        board: [startingTile],
        currentPlayerIndex: startingPlayer,
        gameStatus: 'playing',
        leftEnd: startingTile.left,
        rightEnd: startingTile.right,
        turnTimer: TURN_TIME,
        winner: null,
        isBlocked: false
      });
      
      // Start timer
      get().startTurnTimer();
      
      // If starting player is AI, make move after delay
      if (!players[startingPlayer].isHuman) {
        setTimeout(() => get().makeAIMove(startingPlayer), 1500);
      }
    } else {
      // Fallback: if no doubles found, start with any tile
      const fallbackTile = startingHand[0];
      if (fallbackTile) {
        const newHand = startingHand.filter(tile => tile.id !== fallbackTile.id);
        players[startingPlayer].hand = newHand;
        
        set({
          players,
          board: [fallbackTile],
          currentPlayerIndex: startingPlayer,
          gameStatus: 'playing',
          leftEnd: fallbackTile.left,
          rightEnd: fallbackTile.right,
          turnTimer: TURN_TIME,
          winner: null,
          isBlocked: false
        });
        
        // Start timer
        get().startTurnTimer();
        
        // If starting player is AI, make move after delay
        if (!players[startingPlayer].isHuman) {
          setTimeout(() => get().makeAIMove(startingPlayer), 1500);
        }
      }
    }
  },

  playCard: (playerId: number, tileId: string, side: 'left' | 'right') => {
    const state = get();
    const player = state.players.find(p => p.id === playerId);
    if (!player || !player.isCurrentTurn || state.gameStatus !== 'playing') return;
    
    const tile = player.hand.find(t => t.id === tileId);
    if (!tile) return;
    
    const canPlay = canPlayTile(tile, state.leftEnd, state.rightEnd);
    if (!canPlay.canPlay || canPlay.side !== side) return;
    
    // Remove tile from player's hand
    const newHand = player.hand.filter(t => t.id !== tileId);
    const updatedPlayers = state.players.map(p => 
      p.id === playerId ? { ...p, hand: newHand } : p
    );
    
    // Add tile to board
    let newBoard = [...state.board];
    let newLeftEnd = state.leftEnd;
    let newRightEnd = state.rightEnd;
    
    if (side === 'left') {
      newBoard.unshift(tile);
      newLeftEnd = canPlay.needsFlip ? tile.right : tile.left;
    } else {
      newBoard.push(tile);
      newRightEnd = canPlay.needsFlip ? tile.left : tile.right;
    }
    
    // Check for win condition
    if (newHand.length === 0) {
      const winner = { ...player, hand: newHand };
      set({
        players: updatedPlayers,
        board: newBoard,
        leftEnd: newLeftEnd,
        rightEnd: newRightEnd,
        gameStatus: 'ended',
        winner
      });
      return;
    }
    
    // Move to next player
    const nextPlayerIndex = (state.currentPlayerIndex + 1) % 4;
    const finalPlayers = updatedPlayers.map((p, index) => ({
      ...p,
      isCurrentTurn: index === nextPlayerIndex,
      timeLeft: TURN_TIME
    }));
    
    set({
      players: finalPlayers,
      board: newBoard,
      currentPlayerIndex: nextPlayerIndex,
      leftEnd: newLeftEnd,
      rightEnd: newRightEnd,
      turnTimer: TURN_TIME
    });
    
    // Start timer for next player
    get().startTurnTimer();
    
    // If next player is AI, make move after delay
    if (!finalPlayers[nextPlayerIndex].isHuman) {
      setTimeout(() => get().makeAIMove(nextPlayerIndex), 1500);
    }
  },

  skipTurn: (playerId: number) => {
    const state = get();
    const player = state.players.find(p => p.id === playerId);
    if (!player || !player.isCurrentTurn || state.gameStatus !== 'playing') return;
    
    // Check if game is blocked
    const hasValidMove = player.hand.some(tile => 
      canPlayTile(tile, state.leftEnd, state.rightEnd).canPlay
    );
    
    if (!hasValidMove) {
      // Check if all players are blocked
      const allBlocked = state.players.every(p => 
        !p.hand.some(tile => canPlayTile(tile, state.leftEnd, state.rightEnd).canPlay)
      );
      
      if (allBlocked) {
        // Game is blocked, calculate winner by lowest pip sum
        const playersWithScores = state.players.map(p => ({
          ...p,
          score: calculatePipSum(p.hand)
        }));
        const winner = playersWithScores.reduce((min, p) => 
          p.score < min.score ? p : min
        );
        
        set({
          players: playersWithScores,
          gameStatus: 'ended',
          winner,
          isBlocked: true
        });
        return;
      }
    }
    
    // Move to next player
    const nextPlayerIndex = (state.currentPlayerIndex + 1) % 4;
    const updatedPlayers = state.players.map((p, index) => ({
      ...p,
      isCurrentTurn: index === nextPlayerIndex,
      timeLeft: TURN_TIME
    }));
    
    set({
      players: updatedPlayers,
      currentPlayerIndex: nextPlayerIndex,
      turnTimer: TURN_TIME
    });
    
    // Start timer for next player
    get().startTurnTimer();
    
    // If next player is AI, make move after delay
    if (!updatedPlayers[nextPlayerIndex].isHuman) {
      setTimeout(() => get().makeAIMove(nextPlayerIndex), 1500);
    }
  },

  restartGame: () => {
    set({
      players: [],
      board: [],
      currentPlayerIndex: 0,
      gameStatus: 'waiting',
      winner: null,
      leftEnd: -1,
      rightEnd: -1,
      isBlocked: false,
      turnTimer: TURN_TIME
    });
    
    // Start new game after a short delay
    setTimeout(() => get().startGame(), 500);
  },

  updateTimer: () => {
    const state = get();
    if (state.gameStatus !== 'playing') return;
    
    const newTime = state.turnTimer - 1;
    if (newTime <= 0) {
      // Time's up, skip turn
      const currentPlayer = state.players[state.currentPlayerIndex];
      get().skipTurn(currentPlayer.id);
    } else {
      // Update both global timer and current player's timer
      const updatedPlayers = state.players.map((p, index) => 
        index === state.currentPlayerIndex ? { ...p, timeLeft: newTime } : p
      );
      set({ 
        turnTimer: newTime,
        players: updatedPlayers
      });
    }
  },

  setCurrentPlayer: (playerIndex: number) => {
    const updatedPlayers = get().players.map((p, index) => ({
      ...p,
      isCurrentTurn: index === playerIndex
    }));
    
    set({
      players: updatedPlayers,
      currentPlayerIndex: playerIndex,
      turnTimer: TURN_TIME
    });
  },

  // Helper methods
  startTurnTimer: () => {
    // Clear any existing timer
    const existingInterval = (get() as any).timerInterval;
    if (existingInterval) {
      clearInterval(existingInterval);
    }
    
    const interval = setInterval(() => {
      get().updateTimer();
    }, 1000);
    
    // Store interval ID to clear later
    (get() as any).timerInterval = interval;
  },

  makeAIMove: (playerIndex: number) => {
    const state = get();
    const player = state.players[playerIndex];
    if (!player || player.isHuman || !player.isCurrentTurn) return;
    
    // Find a valid move
    for (const tile of player.hand) {
      const canPlay = canPlayTile(tile, state.leftEnd, state.rightEnd);
      if (canPlay.canPlay) {
        get().playCard(player.id, tile.id, canPlay.side!);
        return;
      }
    }
    
    // No valid move, skip turn
    get().skipTurn(player.id);
  }
}));