<template>
  <!-- メッセージエリア -->
  <div id="messages">
    <b-alert
      variant="danger" show
      v-show="$store.state.messages.error" class="mb-0">
      {{ $store.state.messages.error }}
    </b-alert>
    <b-alert
      variant="warning" show
      v-show="$store.state.messages.warnings.length > 0" class="mb-0">
      <p v-for="v in $store.state.messages.warnings" class="mb-0">{{ v[1][0] }}</p>
    </b-alert>
    <b-alert
      variant="info" show
      v-show="$store.state.messages.info" class="mb-0">
      {{ $store.state.messages.info }}
    </b-alert>
  </div>
</template>
