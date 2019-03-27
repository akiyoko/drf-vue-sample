<template>
  <div id="dashboard-page">
    <GlobalHeader/>

    <!-- メイン -->
    <main class="container">
      <p class="h5 mb-4">DashboardPage</p>
    </main>

    <!-- For debug -->
    <debug :data="$data">DashboardPage</debug>
  </div>
</template>

<script>
  import GlobalHeader from '@/components/GlobalHeader.vue'
  import Debug from '@/components/Debug.vue'

  export default {
    components: {
      GlobalHeader,
      Debug
    },
    data: function () {
      return {
        step: 'DashboardPage'
      }
    },
  }
</script>

<style scoped>
</style>
