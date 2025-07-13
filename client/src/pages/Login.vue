<template>
  <div class="max-w-md mx-auto p-8 bg-white rounded-xl shadow">
    <h2 class="text-2xl font-bold text-center mb-6">Connexion</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" class="input" required />
      <input v-model="password" type="password" placeholder="Mot de passe" class="input" required />
      <button type="submit" class="btn">Se connecter</button>
    </form>
    <p class="text-sm mt-4">Pas encore de compte ?
      <router-link to="/register" class="text-indigo-600 underline">S'inscrire</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value })
  })
  const data = await response.json()
  if (response.ok) {
    localStorage.setItem('token', data.token)
    router.push('/') // vers le quiz
  } else {
    alert(data.error || 'Erreur lors de la connexion')
  }
}
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.btn {
  background-color: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  width: 100%;
}
</style>
