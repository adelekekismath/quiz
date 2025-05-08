<template>
    <div v-if="!isQuizDone" class="  max-w-3xl mx-auto px-4 py-8">
        <h2 class="text-3xl font-bold text-indigo-800 mb-8 text-center">
            Questionnaire sur la culture générale
        </h2>
    
        <ProgressBar :progressPercentage="progressPercentage"/>
  
        <Question
            v-for="(question, index) in questions"
            v-show="index === currentQuestionIndex"
            :key="index"
            :currentQuestion="question"
            :currentIndex="index"
            @record-answer="recordAnswer"
        />

    
        <div class="flex justify-center mt-8">
            <button
                @click="goToNextQuestion()"
                :disabled="!enableNextButton"
                class="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition duration-300"
            >
                Next Question
            </button>
        </div>
        
    </div>
  
    <div v-else class="max-w-2xl mx-auto px-4 py-8">
      <Result
        :getScorePercentage="getScorePercentage"
        :answers="answers"
        :questions="questions"
        @reset-quiz="resetQuiz"
      />
    </div>
</template>
  

<script setup lang="ts">
import { useQuiz } from '@/composables/useQuiz';
import ProgressBar from '@/components/ProgressBar.vue';
import Question from '@/components/Question.vue';
import Result from '@/components/Result.vue';
import { onMounted } from 'vue';

const { isQuizDone, getScorePercentage,resetQuiz, questions,progressPercentage, answers,recordAnswer, goToNextQuestion, currentQuestionIndex, enableNextButton, loadQuestions } = useQuiz();

onMounted( () => {
    loadQuestions();
})   

</script>