import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export const useEndpointStore = defineStore('endpoint', {
  state: () => ({
    endpoints: [],
    submissions: {}
  }),
  actions: {
    generateEndpoint() {
      const endpoint = `submito.co/${nanoid(10)}`
      this.endpoints.push(endpoint)
      this.submissions[endpoint] = []
      return endpoint
    },
    addSubmission(endpoint, formData) {
      if (this.submissions[endpoint]) {
        this.submissions[endpoint].push({
          id: nanoid(),
          data: formData,
          timestamp: new Date().toISOString()
        })
      }
    }
  }
})