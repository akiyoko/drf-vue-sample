<template>
  <!-- メッセージエリア -->
  <div id="messages">
    <b-alert
      variant="danger" show
      v-show="message.error" class="mb-0">
      {{ $store.state.messages.error }}
    </b-alert>
    <b-alert
      variant="warning" show
      v-show="message.warnings.length > 0" class="mb-0">
      <p v-for="v in message.warnings" class="mb-0">{{ v[1][0] }}</p>
    </b-alert>
    <b-alert
      variant="info" show
      v-show="message.info" class="mb-0">
      {{ $store.state.messages.info }}
    </b-alert>
  </div>
</template>

<script>
  export default {
    computed: {
      message: function () {
        return this.$store.state.messages
      }
    }
  }
</script>
