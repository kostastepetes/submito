import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_URL = 'http://localhost:3000/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const isAuthenticated = ref(!!token.value)

  async function login(email: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error('Invalid credentials')
    }

    const data = await response.json()
    token.value = data.token
    localStorage.setItem('token', data.token)
    isAuthenticated.value = true
    user.value = { email }
  }

  async function register(email: string, password: string) {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error('Registration failed')
    }

    const data = await response.json()
    token.value = data.token
    localStorage.setItem('token', data.token)
    isAuthenticated.value = true
    user.value = { email }
  }

  function logout() {
    token.value = null
    localStorage.removeItem('token')
    isAuthenticated.value = false
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    token,
    login,
    register,
    logout
  }
})