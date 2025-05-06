<template>
    <div class="max-w-3xl mx-auto px-4 py-8 bg-white rounded-2xl shadow-md border border-indigo-100">
      <h2 class="text-3xl font-bold text-green-600 mb-4 text-center">Quiz done!</h2>
      <p class="text-lg text-gray-700 text-center mb-2">Thanks for playing!</p>
      <p class="text-xl text-indigo-800 font-semibold text-center mb-6">
        Your score is: {{ calculateScore() }}%
      </p>
  
      <ul class="space-y-4">
        <li
          v-for="(answer, index) in answers"
          :key="index"
          class="bg-indigo-50 p-4 rounded-lg border border-indigo-200"
        >
          <p class="text-indigo-800 font-medium">Question: {{ answer.question }}</p>
          <p class="text-gray-800">Your answer: {{ answer.selectedAnswer }}</p>
          <p
            v-if="answer.isCorrect"
            class="text-green-600 font-semibold"
          >
            ✅ Correct!
          </p>
          <p
            v-else
            class="text-red-600 font-semibold"
          >
            ❌ Incorrect! Correct answer: {{ questions[index].correct_answer }}
          </p>
        </li>
      </ul>
  
      <div class="text-center mt-8">
        <button
          @click="resetQuiz()"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition duration-300"
        >
          Restart Quiz
        </button>
      </div>
    </div>
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