<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useSubmissionsStore } from '../stores/submissions'

// Define the type for a submission object
interface Submission {
  id: string
  form_data: Record<string, any>
  created_at: string
  endpoint_key: string
}

const store = useSubmissionsStore()
const submissions = ref<Submission[]>([])

async function loadSubmissions() {
  await store.fetchSubmissions()
  submissions.value = store.submissions
}

onMounted(loadSubmissions)

// Watch for store changes
watch(() => store.submissions, (newSubmissions) => {
  submissions.value = newSubmissions
  console.log('Received submissions:', submissions.value)
}, { deep: true })
</script>

<template>
  <div class="w-full px-0 py-0">
    <h2 class="text-2xl font-bold text-blue-600 mb-4">Submission Table</h2>
    
    <div class="bg-white shadow-lg rounded-none overflow-hidden">
      <table class="w-full bg-white border-collapse">
        <thead class="bg-blue-100 text-blue-800">
          <tr>
            <th class="py-3 px-4 text-left">ID</th>
            <th class="px-4 py-3 text-left">Form Data</th>
            <th class="px-4 py-3 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(submission, index) in submissions" :key="submission.id" :class="{ 'bg-yellow-100': index % 2 === 0 }">
            <td class="border-b border-gray-200 py-4 px-4">{{ submission.id }}</td>
            <td class="border-b border-gray-200 py-4 px-4">
              <pre class="whitespace-pre-wrap bg-red-100 rounded-lg p-2">{{ JSON.stringify(submission.form_data, null, 2) }}</pre>
            </td>
            <td class="border-b border-gray-200 py-4 px-4">{{ new Date(submission.created_at).toLocaleString() }}</td>
          </tr>
          <tr v-if="submissions.length === 0" class="text-center">
            <td colspan="3" class="py-4">No submissions yet</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-auto {
  width: auto;
}

.bg-blue-100 {
  background-color: #E0F2FF;
}

.text-blue-800 {
  color: #004085;
}

.bg-yellow-100 {
  background-color: #FFFDE7;
}

.bg-red-100 {
  background-color: #FFF0E6;
}
</style>