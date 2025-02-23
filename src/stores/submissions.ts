import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'



const API_URL = 'http://submito/api'

interface Submission {
  id: string
  form_data: Record<string, any>
  created_at: string
  endpoint_key: string
}

export const useSubmissionsStore = defineStore('submissions', () => {
  const auth = useAuthStore()
  const submissions = ref<Submission[]>([])
  const endpoints = ref<string[]>([])
  const error = ref<string | null>(null)

  async function generateEndpoint() {
    try {
      const response = await fetch(`${API_URL}/endpoints`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to generate endpoint')
      }

      const data = await response.json()
      endpoints.value.push(data.endpoint_key)
      return data.endpoint_key
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to generate endpoint'
      throw err
    }
  }

  async function fetchSubmissions() {
    try {
      const response = await fetch(`${API_URL}/submissions`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch submissions')
      }

      const data = await response.json()
      submissions.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch submissions'
      throw err
    }
  }

  async function submitForm(endpoint: string, formData: FormData) {
    try {
      const response = await fetch(`${API_URL}/submit/${endpoint}`, {
        method: 'POST',
        body: formData,
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Submission failed')
      }
  
      const result = await response.json()
      await fetchSubmissions() // Refresh the submissions list
      return result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to submit form'
      throw err
    }
  }
  

  return {
    submissions,
    endpoints,
    error,
    generateEndpoint,
    fetchSubmissions,
    submitForm,
  }
})