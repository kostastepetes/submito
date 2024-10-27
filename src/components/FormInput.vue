<script setup lang="ts">
defineProps<{
  modelValue: string
  type?: string
  label: string
  placeholder?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-group">
    <label class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <input
      :type="type || 'text'"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

input[type="text"] {
  width: 100%;
  padding: .75rem;
  font-size: 1rem;
  transition: all .3s ease-in-out;
}

input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(82, 168, 236, .25);
}
</style>