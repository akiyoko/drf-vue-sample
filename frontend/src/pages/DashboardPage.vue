<template>
  <div id="dashboard-page">
    <GlobalHeader/>

    <!-- メイン -->
    <main class="container">
      <p class="h5 mb-4">DashboardPage</p>
    </main>
  </div>
</template>

<script>
  import GlobalHeader from '@/components/GlobalHeader.vue'

  export default {
    components: {
      GlobalHeader
    },
    data () {
      return {
        step: 'DashboardPage'
      }
    },
  }
</script>

<style scoped>
</style>
