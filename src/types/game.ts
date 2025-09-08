export interface DominoTile {
  id: string;
  left: number;
  right: number;
  isDouble: boolean;
}

export interface Player {
  id: number;
  name: string;
  hand: DominoTile[];
  score: number;
  isHuman: boolean;
  isCurrentTurn: boolean;
  timeLeft: number;
}

export interface GameState {
  players: Player[];
  board: DominoTile[];
  currentPlayerIndex: number;
  gameStatus: 'waiting' | 'playing' | 'ended';
  winner: Player | null;
  leftEnd: number;
  rightEnd: number;
  isBlocked: boolean;
  turnTimer: number;
}

export interface GameActions {
  startGame: () => void;
  playCard: (playerId: number, tileId: string, side: 'left' | 'right') => void;
  skipTurn: (playerId: number) => void;
  restartGame: () => void;
  updateTimer: () => void;
  setCurrentPlayer: (playerIndex: number) => void;
}