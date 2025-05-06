<template>
    <div>
        <h3>{{ question }}</h3>
        <div v-for="(option, index) in options" :key="index">
            <input
                type="radio"
                @change="selectAnswer(option)"
                :id="'option' + index"
                :name="question"
                :value="option"
            />
            <label :for="'option' + index">
                {{ option }}
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, defineProps } from "vue";

    interface Question {
        question: string;
        correct_answer: string;
        incorrect_answers: string[];
    }
    
    const props = defineProps({
        currentQuestion: {
            type: Object as () => Question,
            required: true,
            default: () => ({
                question: "",
                correct_answer: "",
                incorrect_answers: [],
            }),
        },
        currentIndex: {
            type: Number,
            required: true,
        },
    });

    const emit = defineEmits<{
        (e: 'select-answer', currentQuestion: number, answer: string, ): void
    }>()
        
    function selectAnswer( answer: string) {
        emit('select-answer', props.currentIndex, answer);
    }

    const options = computed(() => {
    const allOptions = [...props.currentQuestion.incorrect_answers];
    const randIndex = Math.floor(Math.random() * (allOptions.length + 1));
        allOptions.splice(randIndex, 0, props.currentQuestion.correct_answer);
        return allOptions;
    });

    const question = computed(() => {
        return props.currentQuestion.question
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'");
        });
    

</script>
