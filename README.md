# Gaple Domino Game

A complete 4-player Gaple (Indonesian Domino) game built with Next.js, Tailwind CSS, and Zustand. The game features a beautiful wooden table interface similar to Higgs Domino Island.

## Features

- **4-Player Gameplay**: One human player vs 3 AI opponents
- **Authentic Gaple Rules**: Traditional Indonesian domino game mechanics
- **Beautiful UI**: Wooden table background with smooth animations
- **Responsive Design**: Works on both desktop and mobile (landscape mode)
- **Real-time Animations**: Smooth card movements using Framer Motion
- **Turn-based System**: 10-second timer per turn with visual countdown
- **Smart AI**: AI players make strategic moves automatically
- **Game End Detection**: Handles both win conditions and blocked games
- **Score Calculation**: Pip counting for blocked game scenarios

## Game Rules

1. Each player starts with 7 domino tiles
2. Player with the highest double tile starts the game
3. Players take turns placing tiles that match the ends of the chain
4. If a player cannot play, they must skip their turn
5. Game ends when:
   - A player runs out of tiles (winner)
   - No player can make a move (blocked game - lowest pip sum wins)

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **Framer Motion**: Smooth animations and transitions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rahmivinnn/eSDI-final.git
cd eSDI-final
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── DominoCard.tsx  # Individual domino tile
│   ├── GameBoard.tsx   # Game board with tile chain
│   ├── GameOverlay.tsx # End game overlay
│   ├── GameTable.tsx   # Main game container
│   ├── PlayerAvatar.tsx# Player info with timer
│   └── PlayerHand.tsx  # Player's hand of cards
├── store/              # Zustand store
│   └── gameStore.ts    # Game state management
├── types/              # TypeScript types
│   └── game.ts         # Game-related types
└── utils/              # Utility functions
    └── domino.ts       # Game logic utilities

image/                  # Game assets
├── background.png      # Wooden table background
└── domino_*.png       # Domino tile images
```

## Game Components

### GameStore (Zustand)
- Manages game state, player hands, board state
- Handles turn logic, timer, and game end conditions
- Provides actions for playing tiles, skipping turns

### GameTable
- Main game container with background
- Positions player avatars around the table
- Handles AI player logic and timing

### PlayerHand
- Displays human player's cards in curved layout
- Highlights playable cards
- Handles card selection and playing

### GameBoard
- Shows the domino chain in the center
- Animates new tiles being placed
- Displays game progress information

## Game Logic

The game implements authentic Gaple rules:
- **Tile Generation**: Creates all 28 standard domino tiles (0-0 to 6-6)
- **Shuffling & Dealing**: Fisher-Yates shuffle algorithm
- **Move Validation**: Checks if tiles can be played on either end
- **AI Strategy**: AI players automatically play valid moves
- **End Game Detection**: Handles both empty hand and blocked scenarios

## Mobile Support

The game is optimized for landscape orientation on mobile devices. Portrait mode shows a rotation prompt to ensure the best gaming experience.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Higgs Domino Island
- Built for educational purposes
- Uses traditional Indonesian Gaple rules
