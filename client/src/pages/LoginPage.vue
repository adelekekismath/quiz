<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12 overflow-hidden relative">
    <div class="relative z-10 w-full max-w-md p-8 bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-extrabold text-indigo-800">Login</h2>
      </div>

      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div class="relative">
            <input 
              v-model="email"
              type="email"
              id="email"
              placeholder="exemple@email.com"
              class="input pl-4 pr-4 py-2 w-full rounded-lg bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
              :disabled="loading"
            />
          </div>
        </div>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label for="password" class="text-sm font-medium text-gray-700">Password</label>
            <router-link 
              to="/forgot-password" 
              class="text-sm text-indigo-600 hover:underline"
            >
              Forgot your password?
            </router-link>
          </div>
          <div class="relative">
            <input 
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="••••••••"
              class="input pl-4 pr-10 py-2 w-full rounded-lg bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
              :disabled="loading"
            />
            <button 
              type="button" 
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              @click="showPassword = !showPassword"
            >
              <EyeIcon v-if="showPassword" class="h-5 w-5" />
              <EyeSlashIcon v-else class="h-5 w-5" />
            </button>
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-2 rounded-md">
          {{ errorMessage }}
        </div>

        <button 
          type="submit" 
          class="w-full relative flex justify-center items-center px-6 py-3 font-semibold text-white bg-indigo-600 rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="loading"
        >
          <svg v-if="loading" class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>{{ loading ? 'Login...': 'Log in' }}</span>
        </button>
      </form>

      <p class="text-center text-sm mt-8 text-gray-700">
        Don't have an account yet? 
        <router-link to="/register" class="text-indigo-600 font-medium hover:underline ml-1">
          Sign up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import {
    EyeIcon,
    EyeSlashIcon
  } from '@heroicons/vue/24/outline'
import api from '@/services/api'

  onMounted(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }
  })

  const email = ref('')
  const password = ref('')
  const showPassword = ref(false)
  const loading = ref(false)
  const errorMessage = ref('')
  const router = useRouter()

  const login = async () => {
    loading.value = true
    errorMessage.value = ''
    
    try {
      const response = await api.post('api/auth/login', {
        email: email.value,
        password: password.value
      })

      const data = response.data
      if (response.status === 200) {
        localStorage.setItem('token', data.token)
        router.push('/')
      } else {
        errorMessage.value = data.error || 'Identifiants incorrects'
      }
    } catch (err) {
      errorMessage.value = 'Erreur de connexion au serveur'
    } finally {
      loading.value = false
    }
  }
</script>
