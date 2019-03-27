<template>
  <div id="debug">
    <div class="container debug">
      <p>
        <slot></slot>
      </p>
      <pre>{{ data }}</pre>
    </div>

    <div class="container debug">
      <p>Store</p>
      <pre>{{ $store.state }}</pre>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object
      }
    }
  }
</script>

<style scoped>
  .container.debug {
    margin-top: 2em;
  }
</style>
