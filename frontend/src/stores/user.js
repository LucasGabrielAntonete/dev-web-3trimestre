import { defineStore } from 'pinia'
import axios from 'axios'
import { useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: useStorage('user', null),
    logged: false,
    router: useRouter()
  }),
  actions: {
    async login(user) {
      const { data } = await axios.post('http://localhost:8000/api/login/', user)
      this.user = data
      this.logged = true
    },
    async register(user) {
      const { data } = await axios.post('http://localhost:8000/api/cadastro/', user)
      this.user = data
    },
    async logout() {
      this.user = null
      this.logged = false
      this.router.push('/')
    }
  }
})
