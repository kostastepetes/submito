<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-16">
      <h1 class="text-4xl font-extrabold sm:text-5xl md:text-6xl">
        <span class="block bg-gradient-to-r from-purple-600 via-primary-600 to-pink-600 bg-clip-text text-transparent">Form Submissions</span>
        <span class="block bg-gradient-to-r from-emerald-600 via-primary-600 to-indigo-600 bg-clip-text text-transparent">Made Simple</span>
      </h1>
      <p class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Generate endpoints for your forms and collect submissions in one place. No backend required.
      </p>
    </div>
    
    <div class="flex justify-center mb-16">
      <button 
        @click="generateNewEndpoint"
        class="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-purple-600 via-primary-600 to-pink-600 hover:from-purple-700 hover:via-primary-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-105"
      >
        Generate form submission endpoint
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>

    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="endpoint in store.endpoints" :key="endpoint" 
           class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl border border-gray-100 dark:border-gray-700">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Endpoint</h2>
            <span class="px-3 py-1 text-xs font-medium rounded-full" 
                  :class="[store.submissions[endpoint].length > 0 
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white'
                    : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white']">
              {{ store.submissions[endpoint].length }} submissions
            </span>
          </div>
          <code class="block p-3 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-lg text-sm text-gray-800 dark:text-gray-200 font-mono break-all border border-gray-200 dark:border-gray-600">
            {{ endpoint }}
          </code>
          
          <div class="mt-6 space-y-4">
            <div v-for="submission in store.submissions[endpoint]" :key="submission.id" 
                 class="border dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <div class="text-sm text-gray-500 dark:text-gray-300 mb-2">
                {{ new Date(submission.timestamp).toLocaleString() }}
              </div>
              <pre class="bg-gradient-to-br from-gray-50 to-white dark:from-white-900 dark:to-white-800 p-3 rounded-lg text-sm overflow-x-auto border border-gray-100 dark:border-gray-700">{{ JSON.stringify(submission.data, null, 2) }}</pre>
            </div>
            <div v-if="!store.submissions[endpoint].length" class="text-gray-500 dark:text-gray-400 text-center py-4">
              No submissions yet
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEndpointStore } from '../stores/endpoint'

const store = useEndpointStore()

const generateNewEndpoint = () => {
  const endpoint = store.generateEndpoint()
  alert(`Your new endpoint is: ${endpoint}`)
}
</script>