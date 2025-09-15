<template>
    <div class="absolute top-4 right-4 z-20">
      
      <div v-if="auth.isAuthenticated">
        <span class="text-indigo-800 font-medium mr-4">Welcome {{ auth.user?.username }}</span>
        <router-link
          to="/scores-history"
          class=" px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition"
        >
          Score History
        </router-link>

        <button
          @click="handleLogout"
          class="ml-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition"
        >
          Log Out
        </button>

      </div>
      <div v-else>
        <router-link
          to="/login"
          class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition"
        >
          Log In
        </router-link>
      </div>
    </div>

</template>

<script setup>
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const handleLogout = () => {
  auth.logout()
  localStorage.removeItem('token')
  router.push('/login')
}
</script>