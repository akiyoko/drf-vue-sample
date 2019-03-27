<template>
  <!-- ヘッダナビゲーション -->
  <div id="header">
    <b-navbar type="dark" variant="dark">
      <a class="navbar-brand" href="/">
        <img src="@/assets/images/logo.png" width="120">
      </a>
      <b-navbar-nav class="ml-auto" v-if="$route.meta.requiresAuth">
        <b-nav-item-dropdown right v-if="isLoggedIn">
          <template slot="button-content">{{ username }}</template>
          <b-dropdown-item href="#" @click="clickLogout">ログアウト</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item href="#" @click="clickLogin" v-else>ログイン</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
  import userService from '@/services/userService'

  export default {
    computed: {
      username: function () {
        return this.$store.getters['user/username']
      },
      isLoggedIn: function () {
        return this.$store.getters['user/isLoggedIn']
      }
    },
    methods: {
      // ログアウトリンク押下時に呼び出されるメソッド
      clickLogout: function () {
        userService.logout()
        this.$store.dispatch('messages/setInfoMessage', { message: 'ログアウトしました。' })
        this.$router.replace('/login')
      },
      // ログインリンク押下時に呼び出されるメソッド
      clickLogin: function () {
        this.$store.dispatch('messages/clearMessages')
        this.$router.replace('/login')
      }
    }
  }
</script>
