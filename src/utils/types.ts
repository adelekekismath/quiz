type Question = {
    category: string;
    type: string;
    question: string;
    difficulty: string;
    correct_answer: string;
    incorrect_answers: string[];
};

type Answer = {
    question: string;
    selectedAnswer: string | null;
    isCorrect: boolean;
};

export type { Question, Answer };