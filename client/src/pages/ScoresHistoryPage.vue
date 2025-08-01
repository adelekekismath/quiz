<template>
  <div class="max-w-4xl mx-auto p-6 min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 rounded-xl shadow-lg">
    <h2 class="text-3xl font-bold text-gray-800 mb-4 text-center">📊 Your Score History</h2>

    <!-- Nouveau bouton -->
    <div class="flex justify-center mb-6">
      <button
        @click="startNewQuiz"
        class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded shadow transition"
      >
         Start a New Quiz
      </button>
    </div>

    <div v-if="loading" class="text-center text-blue-600 font-semibold animate-pulse">
      Loading your scores...
    </div>

    <div v-else-if="error" class="text-center text-red-600 font-semibold">
      {{ error }}
    </div>

    <ul v-else class="space-y-6">
      <li
        v-for="score in scores"
        :key="score._id"
        class="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg p-5 border border-gray-200"
      >
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-gray-500">
            📅 {{ new Date(score.date).toLocaleString("fr-FR", { dateStyle: 'medium', timeStyle: 'short' }) }}
          </span>
          <span
            class="px-2 py-1 text-xs font-semibold text-white bg-indigo-500 rounded"
          >
            {{ quizCategories[score.quizType] || 'N/A' }}
          </span>
        </div>

        <div class="flex justify-between items-center">
          <p class="text-lg font-medium text-gray-700">
            🧠 Score: 
            <span class="font-bold text-indigo-600">
              {{ score.score }} / {{ score.totalQuestions }}
            </span>
            ({{ getScorePercentage(score) }}%)
          </p>
        </div>

        <div class="w-full bg-gray-100 rounded-full h-2 mt-3">
          <div
            class="bg-indigo-500 h-2 rounded-full transition-all"
            :style="{ width: getScorePercentage(score) + '%' }"
          ></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useUserScores } from "@/composables/useUserScores"
import { quizCategories } from "../data/quizCategories"

const router = useRouter()
const { scores, loading, error, fetchUserScores } = useUserScores()

onMounted(() => {
  fetchUserScores()
})

function getScorePercentage(score: { score: number; totalQuestions: number }) {
  return Math.floor((score.score / score.totalQuestions) * 100)
}

function startNewQuiz() {
  router.push("/configurate-quiz")
}
</script>
