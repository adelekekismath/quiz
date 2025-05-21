<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-indigo-50 text-center px-4">
      <h1 class="text-6xl font-bold text-indigo-700 mb-4">404</h1>
      <p class="text-2xl text-indigo-600 mb-2">Page not found</p>
      <p class="text-indigo-500 mb-6">Sorry, the page you are looking for doesn't exist.</p>
      <router-link
        to="/"
        class="inline-block bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-indigo-700 transition"
      >
        Go back home
      </router-link>
    </div>
</template>