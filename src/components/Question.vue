<template>
    <div class="bg-white shadow-md rounded-2xl p-6 border border-indigo-100">
      <h3 class="text-xl font-semibold text-indigo-700 mb-4">
        {{ question }}
      </h3>
  
      <div class="space-y-3">
        <div
          v-for="(option, index) in options"
          :key="index"
          class="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
        >
          <input
            type="radio"
            @change="selectAnswer(option)"
            :id="'option' + index"
            :name="question"
            :value="option"
            class="accent-indigo-600 w-5 h-5"
          />
          <label
            :for="'option' + index"
            class="text-indigo-800 text-base cursor-pointer"
          >
            {{ option }}
          </label>
        </div>
      </div>
    </div>
</template>
  

<script setup lang="ts">
    import { computed } from "vue";

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
        (e: 'select-answer',answer: string, ): void
    }>()
        
    function selectAnswer( answer: string) {
        emit('select-answer', answer);
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
