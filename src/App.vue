<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter() // Initialize the router instance

// Wrap the logout function to include redirection
function handleLogout() {
  auth.logout()
  router.push('/') // Redirect to homepage after logout
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex-shrink-0 flex items-center">
              <span class="text-2xl font-bold text-indigo-600">Submito</span>
            </router-link>
          </div>
          <div class="flex items-center">
            <template v-if="auth.isAuthenticated">
              <router-link to="/dashboard" class="text-gray-700 hover:text-indigo-600 px-3 py-2">
                Dashboard
              </router-link>
              <button @click="handleLogout" class="text-gray-700 hover:text-indigo-600 px-3 py-2">
                Logout
              </button>
            </template>
            <template v-else>
              <router-link to="/login" class="text-gray-700 hover:text-indigo-600 px-3 py-2">
                Login
              </router-link>
              <router-link to="/register" class="text-gray-700 hover:text-indigo-600 px-3 py-2">
                Register
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view></router-view>
    </main>
  </div>
</template>
