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
          @click="selectOption(option)"
        >
          <input
            type="radio"
            @change="selectOption(option)"
            :id="'option' + index"
            :value="option"
            :checked="selectedOption === option"
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

    const anwersOptions = ref<string[]>([]);

    const selectedOption = ref<string | null>(null);
    
    const props = defineProps({
        currentQuestion: {
            type: Object as () => Question,
            required: true,
            default: () => ({
                question: "",
                correct_answer: "",
                incorrect_choices: [],
            }),
        },
        currentIndex: {
            type: Number,
            required: true,
        },
    });

    const selectOption = (option: string) => {
        selectedOption.value = option;
        recordAnswer(option);
    };

    const emit = defineEmits<{
        (event: "record-answer", answer: string): void;
    }>();

    const recordAnswer = (answer: string) => {
        emit("record-answer", answer);
    };

    onMounted(() => {
        anwersOptions.value = [...props.currentQuestion.incorrect_choices];
        const randIndex = Math.floor(Math.random() * (anwersOptions.value.length + 1));
        anwersOptions.value.splice(randIndex, 0, props.currentQuestion.correct_answer);
    });

    
    

</script>
