import { ref, computed } from "vue"
import type { Question, Answer } from "@/utils/types"
import defaultData from '../data/testData';
import { useQuizMetaStore } from '@/stores/quizMetaStore'
import router from "@/router";



export const useQuiz = () => {
    const state = ref('loading')
    const meta = useQuizMetaStore()
    const questions = ref<Question[]>([])
    const initchoices = ref<Answer[]>([])
    const choices = ref<Answer[]>([])
    const currentQuestionIndex = ref(0)
    const score = ref(0)
    const isQuizDone = ref(false)
    const hasAnswered = ref(false)

    const loadQuestions = async () => {

        const url = new URL('https://opentdb.com/api.php')

        if (meta.numberOfQuestions) url.searchParams.set('amount', meta.numberOfQuestions.toString())
        if (meta.category) url.searchParams.set('category', meta.category)
        if (meta.difficulty) url.searchParams.set('difficulty', meta.difficulty)

        const res = await fetch(url.toString())

        if (!res.ok) {
            questions.value = defaultData.results;
            initchoices.value = defaultData.results.map((question: any) => {
                return {
                    question: question.question,
                    selectedAnswer: null,
                    isCorrect: false
                }
            });
            choices.value = [...initchoices.value];
            state.value = 'error';
        }
        else {
            const data = await res.json()

            if (data.results) {
                questions.value = data.results.map((q: Question) => ({
                    question: decodeHtmlEntities(q.question),
                    correct_answer: decodeHtmlEntities(q.correct_answer),
                    incorrect_choices: q.incorrect_choices.map((a: string) => decodeHtmlEntities(a))
                }))
                initchoices.value = data.results.map((question: any) => {
                    return {
                        question: decodeHtmlEntities(question.question),
                        selectedAnswer: null,
                        isCorrect: false
                    }
                });
                choices.value = [...initchoices.value];
            }
            state.value = 'done';
        }      
    }

    const decodeHtmlEntities = (text: string) => {
        return text.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
      }

    const recordAnswer = (selectedAnswer: string) => {
        if (hasAnswered.value) return
        hasAnswered.value = true
        choices.value[currentQuestionIndex.value].selectedAnswer = selectedAnswer
        const correctAnswer = questions.value[currentQuestionIndex.value].correct_answer
        if (selectedAnswer === correctAnswer) {
            score.value++
            choices.value[currentQuestionIndex.value].isCorrect = true
        }
    }

    const resetQuiz = () => {
        choices.value = [...initchoices.value]
        console.log('resetting choices', choices.value)
        currentQuestionIndex.value = 0
        score.value = 0
        isQuizDone.value = false
        hasAnswered.value = false
    }

    const startNewQuiz = () => {
        meta.resetMeta();
        resetQuiz();
        router.push('./configurate-quiz')
    }

    const goToNextQuestion = () => {
        if (currentQuestionIndex.value < questions.value.length - 1) {
            currentQuestionIndex.value++
            hasAnswered.value = false
        } else {
            isQuizDone.value = true
        }
    }

    

    const getScorePercentage = computed(() => {
        return Math.floor((score.value / questions.value.length) * 100)
    })

    const enableNextButton = computed(() => {
        return currentQuestionIndex.value < questions.value.length && hasAnswered.value;
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
        hasAnswered,
        loadQuestions,
        recordAnswer,
        goToNextQuestion,
        resetQuiz,
        enableNextButton,
        getScorePercentage,
        totalQuestions,
        progressPercentage,
        state,
        startNewQuiz,
    }

}