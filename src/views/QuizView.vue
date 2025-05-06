<template>

    <div v-if="!quizFinished">
        <h2>Questionnaire sur la culture générale</h2>

        <ProgressBar :currentIndex="currentQuestionIndex" :totalQuestions="questions.length" />

        <div class="question">
            <Question  
                v-for="(question, index) in questions"
                v-show="index === currentQuestionIndex"
                :key="index"
                :currentQuestion="question"
                :currentIndex="index"
                @select-answer="onAnswered"
            />
        </div>
        <button @click="nextQuestion" :disabled="!enableNextButton">
            Next Question
        </button>

    </div>
    <div v-else>
        <Result
            :questions="questions"
            :answers="answers"
            @reset-quiz="resetQuiz"
        />
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref, computed } from 'vue';
    import defaultData from '../data/testData';
    import ProgressBar from '@/components/ProgressBar.vue';
    import Question from '@/components/Question.vue';
    import Result from '@/components/Result.vue';
    import type { Question as QuestionType, Answer as AnswerType } from '@/utils/types';
    

    let currentQuestionIndex = ref(0);
    let questions = ref<Array<QuestionType>>([]);
    let answers = ref<Array<AnswerType>>([]);
    let quizFinished = ref(false);
    let hasSelectedAnswer = ref(false);


    onMounted(() => {
        fetch('https://opentdb.com/api.php?amount=10')
        .then(response => {
            if (!response.ok) {
                console.log('Network response was not ok');
                return defaultData
            }
            return response.json();
        })
        .then(data => {
            questions.value = data.results;
            questions.value.forEach((question: any) => {
                answers.value.push({
                    question: question.question,
                    selectedAnswer: null,
                    isCorrect: false
                });
            });
        })
    });

    function nextQuestion() {
        if (currentQuestionIndex.value < questions.value.length - 1 && hasSelectedAnswer.value) {
            currentQuestionIndex.value++;
            hasSelectedAnswer.value = false;
        }
        else if(currentQuestionIndex.value >= questions.value.length - 1) {
            quizFinished.value = true;
        }
    }

    function resetQuiz() {
        currentQuestionIndex.value = 0;
        answers.value = [];
        quizFinished.value = false;
    }

    const enableNextButton = computed(() => {
        return currentQuestionIndex.value < questions.value.length  && hasSelectedAnswer.value;
    });

    function onAnswered(index: number, selectedAnswer: string) {
        answers.value[index].selectedAnswer = selectedAnswer;
        answers.value[index].isCorrect = selectedAnswer === questions.value[index].correct_answer;
        console.log(index);
        console.log(answers.value[index].selectedAnswer);
        hasSelectedAnswer.value = true;
    }

    const calculateScore = () => {
        return answers.value.filter(answer => answer.isCorrect).length / questions.value.length * 100;
    };

</script>

<style scoped>
.question {
    margin: 30px 0;
}

</style>