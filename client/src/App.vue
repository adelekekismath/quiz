<script setup lang="ts">

</script>

<template>
  <main>
    <router-view />
  </main>
</template>

<script setup lang="ts">

  import { useAuthStore } from '@/stores/auth'
  import api from '@/services/api'
  import { onMounted } from 'vue'
  const auth = useAuthStore()

  onMounted(async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await api.get('/auth/me')
        auth.login(response.data)

      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }
  })


</script>

<style scoped>

</style>
