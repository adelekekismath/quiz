<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div v-for="i in 12" :key="i"
           class="absolute rounded-full bg-indigo-200 opacity-20"
           :class="`w-${Math.floor(Math.random() * 20) + 10} h-${Math.floor(Math.random() * 20) + 10}`"
           :style="`top: ${Math.random() * 100}%; left: ${Math.random() * 100}%; transform: scale(${Math.random() * 2 + 0.5});`">
      </div>
    </div>

    <div class="relative z-10 max-w-2xl w-full space-y-8 transform transition-all duration-500 hover:scale-[1.01]">
      <!-- Header -->
      <div class="space-y-4">
        <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight mb-2">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 animate-text-shine">
            Quiz Genius
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-indigo-700/90 font-medium">
          Challenge your mind, expand your knowledge
        </p>
      </div>

      <!-- Subtitle -->
      <p class="text-lg text-indigo-600/80 max-w-lg mx-auto leading-relaxed">
        Dive into our interactive quiz experience tailored to test and enhance your skills across various topics.
      </p>

      <!-- CTA -->
      <div class="pt-6">
        <router-link
          to="/configurate-quiz"
          class="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white rounded-2xl group shadow-xl hover:shadow-2xl transition-all duration-300"
          style="background: linear-gradient(135deg, #6366f1, #8b5cf6)"
        >
          <span class="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-indigo-700 rounded-2xl group-hover:mt-0 group-hover:ml-0"></span>
          <span class="absolute inset-0 w-full h-full bg-white rounded-2xl opacity-0 group-hover:opacity-5"></span>
          <span class="absolute inset-0 w-0 h-0 -mt-1 -ml-1 transition-all duration-300 ease-in-out bg-indigo-900 opacity-20 group-hover:w-full group-hover:h-full group-hover:mt-0 group-hover:ml-0"></span>
          <span class="relative flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span class="text-lg">Start Quiz Now</span>
          </span>
        </router-link>
      </div>

      <!-- Features -->
      <div class="pt-12 grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
        <div class="p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm hover:shadow-md transition">
          <div class="text-indigo-600 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="font-semibold text-indigo-800">1000+ Questions</h3>
        </div>
        <div class="p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm hover:shadow-md transition">
          <div class="text-indigo-600 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="font-semibold text-indigo-800">Instant Feedback</h3>
        </div>
        <div class="p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm hover:shadow-md transition">
          <div class="text-indigo-600 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="font-semibold text-indigo-800">Time Challenges</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<style>
@keyframes textShine {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

.animate-text-shine {
  background-size: 200% auto;
  animation: textShine 3s linear infinite alternate;
}
</style>
