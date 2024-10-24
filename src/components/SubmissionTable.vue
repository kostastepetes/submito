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
  <div class="mt-8 flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">ID</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Form Data</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created At</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="submission in submissions" :key="submission.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{{ submission.id }}</td>
                <td class="px-3 py-4 text-sm text-gray-500">
                  <pre class="whitespace-pre-wrap">{{ JSON.stringify(submission.form_data, null, 2) }}</pre>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ new Date(submission.created_at).toLocaleString() }}
                </td>
              </tr>
              <tr v-if="submissions.length === 0">
                <td colspan="3" class="px-3 py-4 text-sm text-gray-500 text-center">No submissions yet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>