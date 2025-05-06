<template>
    <div v-if="!quizFinished" class="max-w-3xl mx-auto px-4 py-8">
        <h2 class="text-3xl font-bold text-indigo-800 mb-6 text-center">
            Questionnaire sur la culture générale
        </h2>
    
        <ProgressBar
            :currentIndex="currentQuestionIndex"
            :totalQuestions="questions.length"
            class="mb-6"
        />
  
        <Questions 
            :questions="questions"
            :answers="answers"
            :currentQuestionIndex="currentQuestionIndex"
            :hasSelectedAnswer="hasSelectedAnswer"
            @select-answer="onAnswered"
            @go-to-next-question="goToNextQuestion"
        />   
        
    </div>
  
    <div v-else class="max-w-2xl mx-auto px-4 py-8">
      <Result
        :questions="questions"
        :answers="answers"
        @reset-quiz="resetQuiz"
      />
    </div>
</template>
  

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import defaultData from '../data/testData';
    import ProgressBar from '@/components/ProgressBar.vue';
    import Result from '@/components/Result.vue';
    import Questions from '@/components/Questions.vue';
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

    function goToNextQuestion() {
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

    function onAnswered( selectedAnswer: string) {
        answers.value[currentQuestionIndex.value].selectedAnswer = selectedAnswer;
        answers.value[currentQuestionIndex.value].isCorrect = selectedAnswer === questions.value[currentQuestionIndex.value].correct_answer;
        hasSelectedAnswer.value = true;
    }

</script>