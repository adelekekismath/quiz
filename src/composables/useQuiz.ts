import { ref, computed } from "vue"
import type { Question, Answer, State } from "@/utils/types"
import { useQuizMetaStore } from '@/stores/quizMetaStore'
import fetchQuestions from "./fetchQuestions";
import router from "@/router";


export const useQuiz = () => {
    const state = ref<State>('loading')
    const meta = useQuizMetaStore()
    const questions = ref<Question[]>([])
    const initchoices = ref<Answer[]>([])
    const choices = ref<Answer[]>([])
    const currentQuestionIndex = ref(0)
    const score = ref(0)
    const isQuizDone = ref(false)
    const hasAnsweredCuurentQuestion = ref(false)

    const loadQuestions = async () => {
        const { 
            questions: fetchedQuestions,
            initchoices: fetchedInitChoices,
            status: fetchedState }
        = await fetchQuestions();
        questions.value = fetchedQuestions;
        initchoices.value = fetchedInitChoices;
        choices.value = fetchedInitChoices;
        state.value = fetchedState;
    }

    const recordAnswer = (selectedAnswer: string) => {
        if (hasAnsweredCuurentQuestion.value) return
        hasAnsweredCuurentQuestion.value = true
        choices.value[currentQuestionIndex.value].selectedAnswer = selectedAnswer
        const correctAnswer = questions.value[currentQuestionIndex.value].correct_answer
        if (selectedAnswer === correctAnswer) {
            score.value++
            choices.value[currentQuestionIndex.value].isCorrect = true
        }
    }

    const quitQuiz = () => {
        meta.resetMeta();
        resetQuiz();
        router.push('/configurate-quiz')
    }
    const resetQuiz = () => {
        choices.value = [...initchoices.value]
        currentQuestionIndex.value = 0
        score.value = 0
        isQuizDone.value = false
        hasAnsweredCuurentQuestion.value = false
    }

    const startNewQuiz = () => {
        meta.resetMeta();
        resetQuiz();
        router.push('./configurate-quiz')
    }

    const goToNextQuestion = () => {
        if (currentQuestionIndex.value < questions.value.length - 1) {
            currentQuestionIndex.value++
            hasAnsweredCuurentQuestion.value = false
        } else {
            isQuizDone.value = true
        }
    }  

    const getScorePercentage = computed(() => {
        return Math.floor((score.value / questions.value.length) * 100)
    })

    const enableNextButton = computed(() => {
        return currentQuestionIndex.value < questions.value.length && hasAnsweredCuurentQuestion.value;
    });

    const totalQuestions = computed(() => {
        return questions.value.length;
    });

    const progressPercentage = computed(() => {
        if (questions.value.length === 0) return 0;
        return ((currentQuestionIndex.value + 1) / questions.value.length) * 100;
    });

    


    return {
        questions,
        choices,
        currentQuestionIndex,
        isQuizDone,
        progressPercentage,
        enableNextButton,
        getScorePercentage,
        totalQuestions,
        state,
        score,
        loadQuestions,
        recordAnswer,
        goToNextQuestion,
        resetQuiz,
        startNewQuiz,
        quitQuiz,
    }

}