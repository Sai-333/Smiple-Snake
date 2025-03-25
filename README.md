# Snake Game

A classic Snake game implemented in JavaScript with HTML5 Canvas. This modern implementation features smooth controls, score tracking, and a clean user interface.

## Features

- Responsive snake movement with arrow key controls
- Score tracking system
- Food generation system
- Collision detection (walls and self)
- Game over screen
- Restart functionality
- Smooth animations using requestAnimationFrame
- Modern, minimalist design

## Installation

1. Clone or download this repository
2. Open `index.html` in a modern web browser

## How to Play

1. Use the arrow keys to control the snake's direction:
   - ↑ (Up Arrow): Move up
   - ↓ (Down Arrow): Move down
   - ← (Left Arrow): Move left
   - → (Right Arrow): Move right

2. Collect the red food blocks to grow the snake and increase your score
3. Avoid hitting the walls or the snake's own body
4. Click the restart button to start a new game when game over

## Game Rules

- Each food item collected adds 10 points to your score
- The snake grows longer when collecting food
- The game ends if the snake hits the walls or itself
- You cannot move in the opposite direction of current movement

## Technical Details

- Built with vanilla JavaScript
- Renders using HTML5 Canvas
- Implements object-oriented programming principles
- Uses requestAnimationFrame for smooth animation

## Development

The game is built using modern JavaScript and follows object-oriented programming principles. The main components are:

- `Snake` class: Handles snake movement, growth, and collision detection
- `Game` class: Manages game state, rendering, and user input

Feel free to modify and enhance the game by editing the source code in `game.js`.