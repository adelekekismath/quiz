import { defineStore } from 'pinia'

type User = {
  _id: string
  username: string
  email: string
  createdAt: string
  updatedAt: string
}


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null
  }),
  actions: {
    login(userData: User) {
        if(userData !== null) this.user = userData
    },
    logout() {
      this.user = null
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user
  }
})
