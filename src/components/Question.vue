<template>
    <div  class="bg-white shadow-md rounded-2xl p-6 border border-indigo-100">
      <h3 class="text-xl font-semibold text-indigo-700 mb-4">
        {{ currentQuestion.question }}
      </h3>
  
      <div class="space-y-3">
        <div
          v-for="(option, index) in anwersOptions"
          :key="index"
          class="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
          @click="recordAnswer(option)"
        >
          <input
            type="radio"
            @change="recordAnswer(option)"
            :id="'option' + index"
            :checked="option === selectedAnswer"
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
    import { ref, onMounted } from "vue";
    import type { Question } from "@/utils/types";
    import { useQuiz } from "@/composables/useQuiz";

    const { recordAnswer, isQuizDone } = useQuiz();

    const selectedAnswer = ref<string | null>(null);
    const anwersOptions = ref<string[]>([]);
    
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

    onMounted(() => {
        anwersOptions.value = [...props.currentQuestion.incorrect_answers];
        const randIndex = Math.floor(Math.random() * (anwersOptions.value.length + 1));
        anwersOptions.value.splice(randIndex, 0, props.currentQuestion.correct_answer);
    });

    
    

</script>
