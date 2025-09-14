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
