import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      document.documentElement.classList.toggle('dark')
    },
    initTheme() {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.isDark = true
        document.documentElement.classList.add('dark')
      }
    }
  }
})