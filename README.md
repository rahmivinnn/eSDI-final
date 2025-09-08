# 🎮 Gaple Domino Game

<!-- Version 0.1.1 - Fixed Vercel deployment -->

A complete 4-player Gaple (Domino) game built with Next.js, Tailwind CSS, and Zustand. Features AI opponents, smooth animations, and a beautiful UI inspired by Higgs Domino Island.

## 🚀 Live Demo

[Play the game here](https://esdi-final.vercel.app)

## ✨ Features

- **4-Player Game**: Human player vs 3 AI opponents
- **Automatic Game Start**: No setup required, game begins immediately
- **Smart AI**: AI players make moves automatically with realistic timing
- **Real-time Timers**: 10-second countdown for each turn
- **Responsive Design**: Works perfectly on mobile and desktop
- **Smooth Animations**: Framer Motion powered card movements
- **Win Detection**: Handles both normal wins and blocked games
- **Beautiful UI**: Modern design with wooden table background

## 🎯 How to Play

1. **Game starts automatically** when you visit the page
2. **Cards are dealt** - 7 tiles per player (22 total tiles: 0-0 to 3-6)
3. **Player with highest double starts** the game
4. **Play matching tiles** on the left or right end of the chain
5. **AI players move automatically** after 1.5 seconds
6. **Win by emptying your hand** or having lowest pip sum in blocked game

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Framer Motion** - Animations
- **Vercel** - Deployment

## 📱 Responsive Design

- **Landscape orientation** optimized
- **Mobile-friendly** with portrait warning
- **No scrolling** - everything fits on screen
- **Touch-friendly** card interactions

## 🎨 Game Assets

- **Background**: Wooden table texture
- **Domino Tiles**: All 22 tiles (0-0 to 3-6)
- **Player Avatars**: CSS-generated with initials
- **Animations**: Card movements and UI transitions

## 🚀 Deployment

The game is automatically deployed to Vercel on every push to the master branch.

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎮 Game Rules

- **Objective**: Be the first to empty your hand or have the lowest pip sum
- **Turns**: Clockwise rotation with 10-second timers
- **Valid Moves**: Play tiles that match the left or right end of the chain
- **Doubles**: Can be played on either end
- **Blocked Game**: When no player can make a valid move, winner is determined by lowest pip sum

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy playing Gaple Domino! 🎲**