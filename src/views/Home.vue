<template>
  <div class="relative bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div class="sm:text-center lg:text-left">
            <h1 class="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
              <span class="block xl:inline">Collect form submissions</span>
              <span class="block text-indigo-600 xl:inline">{{ typedText }}</span>
            </h1>
            <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Generate a unique endpoint for your forms and receive submissions directly in your dashboard. No backend setup required.
            </p>
            <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div class="rounded-md shadow">
                <router-link to="/register" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Get started
                </router-link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullText: " the easy way",
      typedText: "",
    };
  },
  mounted() {
    this.startTyping();
  },
  methods: {
    startTyping() {
      let index = 0;
      const interval = setInterval(() => {
        if (index < this.fullText.length) {
          this.typedText += this.fullText[index];
          index++;
        } else {
          clearInterval(interval);
        }
      }, 100); // Adjust the speed of typing by changing the delay
    },
  },
};
</script>

<style scoped>
/* Optional: Add any specific styling here */
</style>
