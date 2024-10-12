# Two-Player Trivia Battle Game

This project is a competitive two-player trivia game built with **HTML**, **CSS**, and **JavaScript**. It allows two players to answer trivia questions fetched from **The Trivia API**. Players take turns answering questions from selected categories and compete for the highest score. The game ends when all categories are exhausted or players decide to end it early.

## Table of Contents

- [Features](#features)
- [Game Flow](#game-flow)
- [Technologies Used](#technologies-used)
- [How to Run the Game](#how-to-run-the-game)
- [API Used](#api-used)
- [Future Enhancements](#future-enhancements)

## Features

1. **Player Setup**:
   - Players input their names to start the game.
   
2. **Category Selection**:
   - Players choose a category from a list fetched from the trivia API.
   - Categories are dynamically fetched and cannot be repeated.

3. **Question Difficulty Levels**:
   - The game fetches questions of varying difficulty (easy, medium, hard) for each category.
   - Each difficulty level contains 2 questions.

4. **Scoring System**:
   - Correct answers are rewarded based on question difficulty:
     - Easy: 10 points
     - Medium: 15 points
     - Hard: 20 points
     
5. **End Game Options**:
   - Players can select a new category or end the game after each set of questions.
   - The game declares a winner based on the final scores.

6. **Dynamic Question Display**:
   - Players take turns answering questions.
   - The correct answers are validated, and scores are updated in real-time.

## Game Flow

1. **Player Setup**:
   - Players enter their names and click "Start Game."
   
2. **Category Selection**:
   - The game fetches available categories from **The Trivia API**.
   - Players select a category to proceed.

3. **Answering Questions**:
   - Players alternate turns answering questions.
   - The difficulty of the questions (easy, medium, hard) increases after every two questions.

4. **Scoring**:
   - Points are awarded based on the correctness of the answers and the difficulty of the question.
   
5. **End of Game**:
   - Players can end the game or continue with a new category.
   - The game ends automatically if all categories are used, and the winner is announced.

## Technologies Used

- **HTML**: Structure of the game interface.
- **CSS**: Basic styling for layout and design.
- **JavaScript**: Core logic for fetching data, managing game flow, and handling player interactions.
- **The Trivia API**: Used to fetch categories and trivia questions.

## How to Run the Game

1. Clone the repository or download the files:
   ```bash
   https://github.com/vvssgowtham/TwoPlayerTriviaGame.git
   ```

2. Navigate to the project directory:
   ```bash
   cd TwoPlayerTriviaGame
   ```

3. Open `index.html` in your web browser.

4. Enter player names and start the game.

## API Used

- **The Trivia API**: This API provides the trivia questions and categories. The game uses the API to fetch questions based on selected categories and difficulty levels.
  - API Endpoint: `https://the-trivia-api.com/v2/questions`

Enjoy playing the **Two-Player Trivia Battle Game**! Feel free to contribute or suggest improvements.
