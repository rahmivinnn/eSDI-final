import { DominoTile } from '@/types/game';

// Generate all available domino tiles (0-0 to 3-6 based on available assets)
export const generateDominoSet = (): DominoTile[] => {
  const tiles: DominoTile[] = [];
  
  for (let left = 0; left <= 3; left++) {
    for (let right = left; right <= 6; right++) {
      tiles.push({
        id: `${left}-${right}`,
        left,
        right,
        isDouble: left === right
      });
    }
  }
  
  return tiles;
};

// Shuffle array using Fisher-Yates algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Deal tiles to each of 4 players (we have 16 tiles total: 0-0 to 3-6)
export const dealTiles = (tiles: DominoTile[]): DominoTile[][] => {
  const hands: DominoTile[][] = [[], [], [], []];
  
  for (let i = 0; i < tiles.length; i++) {
    hands[i % 4].push(tiles[i]);
  }
  
  return hands;
};

// Find player with highest double to start
export const findStartingPlayer = (hands: DominoTile[][]): number => {
  let highestDouble = -1;
  let startingPlayer = 0;
  
  for (let playerIndex = 0; playerIndex < hands.length; playerIndex++) {
    const hand = hands[playerIndex];
    for (const tile of hand) {
      if (tile.isDouble && tile.left > highestDouble) {
        highestDouble = tile.left;
        startingPlayer = playerIndex;
      }
    }
  }
  
  return startingPlayer;
};

// Check if a tile can be played on the board
export const canPlayTile = (tile: DominoTile, leftEnd: number, rightEnd: number): { canPlay: boolean; side?: 'left' | 'right'; needsFlip?: boolean } => {
  // Check if tile can be played on left side
  if (tile.left === leftEnd || tile.right === leftEnd) {
    return {
      canPlay: true,
      side: 'left',
      needsFlip: tile.right === leftEnd
    };
  }
  
  // Check if tile can be played on right side
  if (tile.left === rightEnd || tile.right === rightEnd) {
    return {
      canPlay: true,
      side: 'right',
      needsFlip: tile.left === rightEnd
    };
  }
  
  return { canPlay: false };
};

// Calculate pip sum for a hand
export const calculatePipSum = (hand: DominoTile[]): number => {
  return hand.reduce((sum, tile) => sum + tile.left + tile.right, 0);
};

// Get tile image path
export const getTileImagePath = (tile: DominoTile): string => {
  return `/image/domino_${tile.left}_${tile.right}.png`;
};

// Get tile back image path
export const getTileBackPath = (): string => {
  return `/image/domino_0_0.png`; // Using a tile as back, could be any tile
};