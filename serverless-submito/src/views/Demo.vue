<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-16">
      <h1 class="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-primary-600 to-pink-600 bg-clip-text text-transparent">
        Test Your Endpoints
      </h1>
      <p class="mt-3 text-lg text-gray-500 dark:text-gray-400">
        Try out your form endpoints before implementing them in production
      </p>
    </div>
    
    <div class="max-w-2xl mx-auto">
      <div v-if="store.endpoints.length === 0" 
           class="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 border-l-4 border-yellow-400 p-4 rounded-lg">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700 dark:text-yellow-200">
              Please generate an endpoint first in the dashboard
            </p>
          </div>
        </div>
      </div>
      
      <div v-else class="space-y-8">
        <div class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <select 
            v-model="selectedEndpoint" 
            class="w-full p-3 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select an endpoint</option>
            <option v-for="endpoint in store.endpoints" :key="endpoint" :value="endpoint">
              {{ endpoint }}
            </option>
          </select>

          <form v-if="selectedEndpoint" @submit.prevent="handleSubmit" class="mt-8 space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input 
                type="text" 
                v-model="formData.name" 
                class="w-full p-3 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                required
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input 
                type="email" 
                v-model="formData.email" 
                class="w-full p-3 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                required
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea 
                v-model="formData.message" 
                class="w-full p-3 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                rows="4"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 via-primary-600 to-pink-600 hover:from-purple-700 hover:via-primary-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-105"
            >
              Submit Form
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useEndpointStore } from '../stores/endpoint'

const store = useEndpointStore()
const selectedEndpoint = ref('')
const formData = reactive({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  store.addSubmission(selectedEndpoint.value, { ...formData })
  alert('Form submitted successfully!')
  formData.name = ''
  formData.email = ''
  formData.message = ''
}
</script>