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
        const response = await api.get('api/auth/me')
        auth.login(response.data)

      } catch (error) {
        console.error('Failed to fetch user data:', error)

        if (error.response?.status === 401) {
          localStorage.removeItem('token')
          auth.logout()
          router.push('/login')
        }
      }
    }
  })


</script>

<style scoped>

</style>
