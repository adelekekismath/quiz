<script setup lang="ts">

</script>

<template>
  <Navbar />
  <main class="pt-16 min-h-screen ">
    <router-view />
  </main>
</template>

<script setup lang="ts">
  import Navbar from '@/components/Navbar.vue'
  import { useAuthStore } from '@/stores/auth'
  import api from '@/services/api'
  import { onMounted } from 'vue'
  import { fetchUserData } from '@/utils/helpers'
  const auth = useAuthStore()

  onMounted(async () => {
    const token = localStorage.getItem('token')
    if (token) {
      await fetchUserData(api, auth)
    }
  })


</script>

<style scoped>

</style>
