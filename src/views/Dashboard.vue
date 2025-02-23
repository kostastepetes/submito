<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSubmissionsStore } from '../stores/submissions'
import SubmissionTable from '../components/SubmissionTable.vue'

const store = useSubmissionsStore()
const newEndpoint = ref('')
const error = ref('')
const success = ref('')

onMounted(() => {
  store.fetchSubmissions()
})

async function handleGenerateEndpoint() {
  try {
    error.value = ''
    newEndpoint.value = await store.generateEndpoint()
    success.value = 'Endpoint generated successfully!'
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to generate endpoint'
  }
}

async function createDemoForm() {
  try {
    error.value = ''
    success.value = ''
    
    const formData = new FormData()
    formData.append('name', 'Test User')
    formData.append('email', 'test@example.com')
    formData.append('message', 'This is a test submission')

    await store.submitForm(newEndpoint.value, formData)
    success.value = 'Form submitted successfully!'
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to submit form'
  }
}
</script>

<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
        {{ error }}
      </div>
      
      <div v-if="success" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
        {{ success }}
      </div>
      
      <div class="mt-6">
        <button
          @click="handleGenerateEndpoint"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate New Endpoint
        </button>

        <div v-if="newEndpoint" class="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 class="text-lg font-medium text-gray-900">Your new endpoint:</h3>
          <code class="mt-2 block text-sm text-gray-800 bg-white p-2 rounded border">
            http://submito/api/submit/{{ newEndpoint }}
          </code>
          <p class="mt-2 text-sm text-gray-600">
            Use this endpoint as your form's action URL:
          </p>
          <pre class="mt-2 bg-white p-2 rounded border"><code>&lt;form action="http://submito/api/submit/{{ newEndpoint }}" method="POST"&gt;
  &lt;input type="text" name="name" placeholder="Name"&gt;
  &lt;input type="email" name="email" placeholder="Email"&gt;
  &lt;textarea name="message" placeholder="Message"&gt;&lt;/textarea&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>
          
          <button
            @click="createDemoForm"
            class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Test with Demo Submission
          </button>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-lg font-medium text-gray-900">Recent Submissions</h2>
        <SubmissionTable />
      </div>
    </div>
  </div>
</template>
