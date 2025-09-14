<template>
    <div
        class="max-w-3xl  mx-auto px-4 py-10 bg-white rounded-2xl shadow-md border border-indigo-100"
    >
        <h2 class="text-3xl font-bold text-indigo-700 text-center mb-4">
            Quiz Completed
        </h2>
        <p class="text-lg text-gray-600 text-center mb-6">
            Thanks for participating!
        </p>

        <div class="mb-8 ">
            <p class="text-center text-lg font-medium text-indigo-800 mb-2">
                Your Score is : {{ score }}/{{ questions.length }}
            </p>
            <ProgressBar :progressPercentage="scorePercentage"/>
            
        </div>

        <ul class="space-y-4">
            <li
                v-for="(answer, index) in choices"
                :key="index"
                class="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
                <p class="text-indigo-700 font-semibold mb-4">
                    Q: {{ answer.question }}
                </p>
                <p class="text-gray-800 mb-4">
                    Your answer:
                    <span class="font-medium">{{ answer.selectedAnswer }}</span>
                </p>
                <p v-if="answer.isCorrect" class="correct-ans text-green-600 font-semibold">
                    Correct
                </p>
                <p v-else class="incorrect-ans text-red-600 font-semibold">
                    Incorrect — Correct answer:
                    <span class="underline">{{ questions[index].correct_answer }}</span>
                </p>
            </li>
        </ul>

        <div class="flex gap-4 mt-8 justify-center">
            <button
                @click="resetQuiz()"
                class="bg-indigo-600 reset-btn hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition"
            >
                Restart Quiz
            </button>
            <button
                @click="startNewQuiz()"
                class="bg-indigo-600 start-btn hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition"
            >
                Start New Quiz
            </button>
            <button
                v-if="auth.isAuthenticated"
                @click="saveResults()"
                class="bg-indigo-600 save-btn hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition"
            >
                Save Results
            </button>
        </div>

       

    </div>
</template>

<script setup lang="ts">
    import { computed } from "vue";
    import type { Answer, Question } from "@/utils/types";
    import ProgressBar from "./ProgressBar.vue";
    import { useAuthStore } from "@/stores/auth";

    const auth = useAuthStore()

    const props = defineProps({
        score: {
            type: Number,
            required: true,
        },
        choices: {
            type: Array<Answer>,
            required: true,
        },
        questions: {
            type: Array<Question>,
            required: true,
        }
    });

    const scorePercentage = computed(()=> {
        return (props.score/props.questions.length*100).toFixed(0) +'%'
    })

    const emit = defineEmits<{
        (event: "reset-quiz"): void;
        (event: "start-new-quiz"): void;
        (event: "save-results"): void;
    }>();

    const resetQuiz = () => {
        emit("reset-quiz");
    };

    const startNewQuiz = () => {
        emit("start-new-quiz");
    };

    const saveResults = () => {
        emit("save-results");
    };
</script>
