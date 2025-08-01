import { ref, computed, onUnmounted } from "vue"
import type { Question, Answer, State } from "@/utils/types"
import { useQuizMetaStore } from '@/stores/quizMetaStore'
import fetchQuestions from "./fetchQuestions";
import {useAuthStore} from "@/stores/auth";
import router from "@/router";
import api from "@/services/api";


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
    const timeLimit = ref(0) 
    const timeLeft = ref(0)
    const timer = ref<NodeJS.Timeout | null>(null)
    const isTimeUp = ref(false)
    const auth = useAuthStore()

    const timeUp = () => {
        if (timer.value) clearInterval(timer.value)
        isTimeUp.value = true
        isQuizDone.value = true
    }

     const formattedTime = computed(() => {
        const minutes = Math.floor(timeLeft.value / 60)
        const seconds = timeLeft.value % 60
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    })


    const startTimer = () => {
        timeLeft.value = timeLimit.value
        isTimeUp.value = false
        if (timer.value) clearInterval(timer.value)
        
        timer.value = setInterval(() => {
            timeLeft.value--
            if (timeLeft.value <= 0) {
                timeUp()
            }
        }, 1000)
    }

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

        timeLimit.value = questions.value.length * 8
        startTimer()
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

    const saveResults = async () => {
        const scoreData = {
            userId: auth.user?._id || 'anonymous',
            score: score.value,
            totalQuestions: questions.value.length,
            choices: choices.value,
            quizType: meta.category,
        }

        const response = await api.post('api/scores', scoreData);

        if (response.status === 201) {
            console.log('Score saved successfully:', response.data);
            router.push('/configurate-quiz');
        } else {
            console.error('Failed to save score:', response.data);
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

        if (timer.value) clearInterval(timer.value)
        isTimeUp.value = false
        timeLeft.value = timeLimit.value
        startTimer()
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
        return (((currentQuestionIndex.value + 1) / questions.value.length) * 100).toFixed(0) + '%';
    });

    onUnmounted(() => {
        if (timer.value) clearInterval(timer.value)
    })


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
        formattedTime,
        isTimeUp,
        timeLeft,
        startTimer,
        timeUp,
        loadQuestions,
        recordAnswer,
        goToNextQuestion,
        resetQuiz,
        startNewQuiz,
        quitQuiz,
        saveResults
    }

}