<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div class="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 border border-indigo-100">
        <h1 class="text-4xl font-bold text-indigo-700 text-center mb-8">
          Start your Quiz
        </h1>
  
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-indigo-700 mb-1">Your Pseudo</label>
            <input
              v-model="pseudo"
              aria-label="pseudo"
              type="text"
              placeholder="Enter your pseudo"
              class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
  
          <div>
            <label class="block text-sm font-medium text-indigo-700 mb-1">Category</label>
            <select
              v-model="category"
              class="w-full border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="category"
            >
              <option disabled value="">Select category</option>
              <option value="9">General Knowledge</option>
              <option value="21">Sports</option>
              <option value="23">History</option>
              <option value="18">Science: Computers</option>
              <option value="22">Geography</option>
              <option value="11">Entertainment: Film</option>
            </select>
          </div>
  
          <div>
            <label class="block text-sm font-medium text-indigo-700 mb-1">Difficulty</label>
            <select
              v-model="difficulty"
              class="w-full border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="difficulty"
            >
              <option disabled value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
  
          <div>
            <label class="block text-sm font-medium text-indigo-700 mb-2">
              Number of Questions: <span class="font-bold">{{ numberOfQuestions }}</span>
            </label>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              v-model="numberOfQuestions"
              class="w-full accent-indigo-600"
              aria-label="number of questions"
            />
          </div>
  
          <button
            @click="startQuiz"
            :disabled="!pseudo || !category || !difficulty"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
             Start Quiz
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useQuizMetaStore } from '@/stores/quizMetaStore'
    
    const router = useRouter()
    const quizMeta = useQuizMetaStore()
    
    const pseudo = ref(quizMeta.pseudo || '')
    const category = ref('')
    const difficulty = ref('')
    const numberOfQuestions = ref(10)
    
    function startQuiz() {
        quizMeta.setMeta({
            pseudo: pseudo.value,
            category: category.value,
            difficulty: difficulty.value,
            numberOfQuestions: numberOfQuestions.value,
        });
    
        router.push('/quiz')
    }
  </script>
  