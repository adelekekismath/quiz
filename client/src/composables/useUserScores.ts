import { ref } from "vue"
import api from "@/services/api"
import { useAuthStore } from "@/stores/auth"

export const useUserScores = () => {
  const scores = ref([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchUserScores = async () => {
    loading.value = true
    error.value = null
    try {
      const { user } = useAuthStore()
      const response = await api.get(`/api/scores/`)
      scores.value = response.data
      console.log("Fetched scores:", scores.value)
      console.log(scores.value[0]?.createdAt)
    } catch (err: any) {
      error.value = err.message || "Failed to fetch scores"
    } finally {
      loading.value = false
    }
  }

  return {
    scores,
    loading,
    error,
    fetchUserScores
  }
}
