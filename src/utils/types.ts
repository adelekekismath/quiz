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

type QuizMeta = {
    pseudo : string;
    numberOfQuestions: number;
    category: string;
    difficulty: string;
}

export type { Question, Answer, QuizMeta };