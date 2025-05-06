<template>
    <h2>Quiz done !</h2>
        <p> Thanks for playing !</p>
        <p>Your score is: {{ calculateScore() }}%</p>
        <ul>
            <li v-for="(answer, index) in answers" :key="index">
                <p>Question: {{ answer.question }}</p>
                <p>Answer selected : {{ answer.selectedAnswer }}</p>
                <p v-if="answer.isCorrect">Correct !</p>
                <p v-else> 
                    Incorrect ! The correct answer is: {{ questions[index].correct_answer }}
                </p>
            </li>
        </ul>
        <button @click="resetQuiz()">
            Restart Quiz
        </button>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import type { Question, Answer } from '@/utils/types';

const props = defineProps({
    questions: {
        type: Array as () => Array<Question>,
        required: true,
    },
    answers: {
        type: Array as () => Array<Answer>,
        required: true,
    },
});
const emit = defineEmits<{
    (e: 'reset-quiz'): void
}>()
const calculateScore = () => {
    const correctAnswers = props.answers.filter(answer => answer.isCorrect).length;
    return Math.round((correctAnswers / props.questions.length) * 100);
};
const resetQuiz = () => {
    emit('reset-quiz');
};
const questions = computed(() => {
    return props.questions 
});
const answers = computed(() => {
    return props.answers;
});


</script>