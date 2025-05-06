<template>
    <Question
            v-for="(question, index) in questions"
            v-show="index === currentQuestionIndex"
            :key="index"
            :currentQuestion="question"
            :currentIndex="index"
            @select-answer="onAnswered"
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
</template>


<script setup lang="ts">

    import Question from '@/components/Question.vue';
    import type { Question as QuestionType,  Answer } from '@/utils/types';
    import { computed } from 'vue';

    const props = defineProps({
        questions: {
            type: Array as () => QuestionType[],
            required: true
        },
        answers: {
            type: Array as () => Answer[],
            required: true
        },
        currentQuestionIndex: {
            type: Number,
            required: true
        },
        hasSelectedAnswer: {
            type: Boolean,
            required: true
        }
    })

    
    const emit = defineEmits<{
        (e: 'select-answer',  answer: string ): void,
        (e: 'go-to-next-question' ): void
    }>()
        
    function onAnswered( answer: string) {
        emit('select-answer',  answer);
    }

    function goToNextQuestion(){
        emit('go-to-next-question');
    }

    const enableNextButton = computed(() => {
        return props.currentQuestionIndex < props.questions.length  && props.hasSelectedAnswer;
    });



</script>