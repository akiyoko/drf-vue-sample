<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import config from './config';

  export default {
    mounted: function () {
      console.log('ROOT_API=', config.ROOT_API)
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  main.container {
    border: 1px solid #cccccc;
    margin-top: 4em;
    padding: 2em;
    width: 600px;
  }
</style>
