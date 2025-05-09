<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 text-center px-4">
        <h1 class="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
            Welcome to the Quiz App
        </h1>
        <p class="text-lg md:text-xl text-indigo-600 mb-8">
            Test your knowledge with our interactive quiz!
        </p>
        <router-link
            to="/configurate-quiz"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition duration-300"
        >
            Start Quiz
        </router-link>
    </div>
</template>
  