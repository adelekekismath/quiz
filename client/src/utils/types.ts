type Question = {
    question: string;
    correct_answer: string;
    answers: string[];
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

type State = 'loading'| 'error'| 'done'

export type { Question, Answer, QuizMeta, State };