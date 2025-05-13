<template>
    <div  class="bg-white shadow-md rounded-2xl p-6 border border-indigo-100">
      <h3 class="text-xl font-semibold text-indigo-700 mb-4">
        {{ question.question }}
      </h3>
  
      <div class="space-y-3">
        <div
          v-for="(option, index) in answers"
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

    const answers = ref<string[]>([]);

    const selectedOption = ref<string | null>(null);
    
    const props = defineProps({
        question: {
            type: Object as () => Question,
            required: true,
            default: () => ({
                question: "",
                correct_answer: "",
                answers: [],
            }),
        },
        index: {
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

    const shuffleAnswersWithCorrectAnswer = () => {
        answers.value = [...props.question.answers];
        const randIndex = Math.floor(Math.random() * (answers.value.length + 1));
        answers.value.splice(randIndex, 0, props.question.correct_answer);
    }

    onMounted(() => {
        shuffleAnswersWithCorrectAnswer()
    });



    
    

</script>
