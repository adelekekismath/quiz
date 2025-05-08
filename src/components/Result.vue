<template>
    <div class="max-w-3xl mx-auto px-4 py-10 bg-white rounded-2xl shadow-md border border-indigo-100">
      <h2 class="text-3xl font-bold text-indigo-700 text-center mb-4">Quiz Completed</h2>
      <p class="text-lg text-gray-600 text-center mb-6">Thanks for participating!</p>
  
      <div class="mb-8">
        <p class="text-center text-lg font-medium text-indigo-800 mb-2">
          Your Score is : {{ getScorePercentage }}%
        </p>
        <div class="w-full bg-gray-200 h-6 rounded-full overflow-hidden">
          <div
            class="bg-indigo-600 h-6 transition-all duration-500"
            :style="{ width: getScorePercentage + '%' }"
          ></div>
        </div>
      </div>
  
      <ul class="space-y-4">
        <li
          v-for="(answer, index) in answers"
          :key="index"
          class="p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <p class="text-indigo-700 font-semibold mb-4">Q: {{ answer.question }}</p>
          <p class="text-gray-800 mb-4">Your answer: <span class="font-medium">{{ answer.selectedAnswer }}</span></p>
          <p
            v-if="answer.isCorrect"
            class="text-green-600 font-semibold"
          >
            Correct
          </p>
          <p
            v-else
            class="text-red-600 font-semibold"
          >
            Incorrect — Correct answer: <span class="underline">{{ questions[index].correct_answer }}</span>
          </p>
        </li>
      </ul>
  
      <div class="text-center mt-10">
        <button
          @click="resetQuiz()"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition"
        >
          Restart Quiz
        </button>
      </div>
    </div>
</template>
  
  


<script setup lang="ts">
    import { defineProps } from 'vue';
    import type { Answer, Question } from '@/utils/types';

    defineProps({
        getScorePercentage: {
            type: Number,
            required: true
        },
        answers: {
            type: Array<Answer>,
            required: true
        },
        questions: {
            type: Array<Question>,
            required: true
        }
    });

    const emit = defineEmits<{
        (event: "reset-quiz"): void;
    }>();

    const resetQuiz = () => {
        emit("reset-quiz");
    };
    
</script>