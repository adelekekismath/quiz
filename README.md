# Quiz Master
#### Video Demo: <URL HERE>

#### Description:

**Quiz Genius** is a web-based quiz application built with Vue.js 3 that allows users to test their knowledge across various categories, track their performance history, and get immediate feedback on their results. The project was developed as part of the CS50 Final Project requirement, focusing on building a fully functional single-page application with state management, user authentication, persistent data storage, and user-friendly UI components.

The application supports the following features:

- Dynamic quiz generation with randomized questions and answers
- Timer-based quizzes with a countdown
- Score calculation and result submission
- Persistent score history (per user)
- A responsive and modern user interface using Tailwind CSS
- Modular and reusable code structure with Vue composables and Pinia stores

---

### 🧠 How It Works

Upon entering the app, users are redirected to a quiz configuration page where they can choose the quiz category. Once the quiz starts, questions are loaded dynamically and displayed one at a time. Users answer each question and progress through the quiz. At the end, the score is calculated, displayed, and stored.

The system enforces a time limit based on the number of questions (8 seconds per question), and if time runs out, the quiz is automatically submitted.

Once the quiz is completed, the user can view a history of their past scores and attempt a new quiz.

---

### 📁 Project Files Overview

#### `useQuiz.ts`
This composable handles the entire quiz logic:

- `loadQuestions`: Fetches questions from the server and initializes the quiz
- `recordAnswer`: Records the user’s selected answer and checks if it's correct
- `startTimer`, `timeUp`, and `formattedTime`: Manage the countdown timer
- `goToNextQuestion`: Moves the quiz forward
- `saveResults`: Persists the score in the backend
- `resetQuiz` and `startNewQuiz`: Restart the quiz or return to the configuration
- `getScorePercentage`, `progressPercentage`, and `enableNextButton`: Computed properties for UI feedback

We debated whether to store the timer state globally or locally. To keep it component-specific and easier to reset on unmount, we chose a local implementation with cleanup using `onUnmounted`.

#### `useUserScores.ts`
This composable fetches the user's past quiz results:

- Uses the `authStore` to access the currently authenticated user
- Fetches all associated scores from the backend
- Returns reactive `scores`, `loading`, and `error` states

We considered implementing pagination but opted for simplicity due to project scope. Scores are currently loaded and displayed in a scrollable list.

---

### 🧪 Backend Integration

- Uses Axios (`api`) for HTTP requests to a REST API
- `POST /api/scores`: Saves a new score
- `GET /api/scores/`: Fetches all scores of the current user

Authentication is handled via a simple store (`authStore`), assuming the user is logged in. For demonstration, anonymous users are also supported.

---

### 🎨 UI and UX

The interface is built using **Tailwind CSS**, designed for clarity and responsiveness:

- Score history is displayed in styled cards
- Timer is visible and updates in real time
- Quiz result is clearly presented with a percentage
- Users are shown progress with a visual indicator

Additionally, a **"Start New Quiz"** button is included for quick reattempts.

---

### ⚙️ Design Decisions

- **Composables over Vuex**: We used Vue 3 composables (`ref`, `computed`) for quiz logic instead of Vuex for simplicity and modularity.
- **Pinia Store**: Used for quiz metadata (`quizMetaStore`) and auth (`authStore`) to manage shared state
- **Quiz Timer Logic**: Chose to handle timing in milliseconds, using `setInterval`, with clean-up on unmount
- **Answer Tracking**: Answers are stored as objects with additional metadata (`selectedAnswer`, `isCorrect`) to support result review

---

### 🚧 Future Improvements

- Add detailed feedback per question at the end of the quiz
- Enable leaderboard with global scores
- Add difficulty levels and filtering
- Include authentication (OAuth / JWT) for secure login
- Support mobile-friendly animations and transitions

---

This project was a deep dive into frontend architecture, reactive programming, and API integration. It helped me understand stateful logic, reactivity, and design decisions in a real-world context.

