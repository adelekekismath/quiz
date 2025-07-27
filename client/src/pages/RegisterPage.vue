<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12 overflow-hidden relative">
    <div class="relative z-10 w-full max-w-md p-8 bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-extrabold text-indigo-800">Create an account</h2>
      </div>

      <form @submit.prevent="register" class="space-y-6">
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
                v-model="username"
                type="text"
                id="name"
                placeholder="Your Name"
                class="input pl-4 pr-4 py-2 w-full rounded-lg bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
                :disabled="loading"
            />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            v-model="email"
            type="email"
            id="email"
            placeholder="example@email.com"
            class="input pl-4 pr-4 py-2 w-full rounded-lg bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
            :disabled="loading"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
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

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div class="relative">
            <input 
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              placeholder="••••••••"
              class="input pl-4 pr-10 py-2 w-full rounded-lg bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
              :disabled="loading"
            />
            <button 
              type="button" 
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <EyeIcon v-if="showConfirmPassword" class="h-5 w-5" />
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
          <span>{{ loading ? 'Creating account...' : 'Sign up' }}</span>
        </button>
      </form>

      <p class="text-center text-sm mt-8 text-gray-700">
        Already have an account?
        <router-link to="/login" class="text-indigo-600 font-medium hover:underline ml-1">
          Log in
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import api from '@/services/api'

const email = ref('')
const password = ref('')
const username = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const router = useRouter()

const register = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await api.post('/apiauth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, email: email.value, password: password.value })
    })

    if (response && response.data && response.data.token) {
      localStorage.setItem('token', response.data.token)
      router.push('/login')
    } else if (response && response.data && response.data.error) {
      errorMessage.value = response.data.error
    } else {
      errorMessage.value = 'Registration failed'
    }
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'An unexpected error occurred'
  } finally {
    loading.value = false
  }
}
</script>
