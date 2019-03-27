<template>
  <div id="login-page">
    <GlobalHeader/>
    <GlobalMessage/>

    <!-- メイン -->
    <main class="container">
      <p class="h5 mb-4">ログイン</p>
      <b-form @submit.prevent="submitLogin">
        <div class="row form-group">
          <label class="col-sm-3 col-form-label">ユーザー名</label>
          <div class="col-sm-8">
            <b-form-input type="text" v-model="form.username" required/>
          </div>
        </div>
        <div class="row form-group">
          <label class="col-sm-3 col-form-label">パスワード</label>
          <div class="col-sm-8">
            <b-form-input type="password" v-model="form.password" required/>
          </div>
        </div>
        <div class="row text-center mt-5">
          <div class="col-sm-12">
            <b-button type="submit" variant="primary">ログイン</b-button>
          </div>
        </div>
      </b-form>
    </main>

    <!-- For debug -->
    <debug :data="$data">LoginPage</debug>
  </div>
</template>

<script>
  import userService from '@/services/userService'
  import GlobalHeader from '@/components/GlobalHeader.vue'
  import GlobalMessage from '@/components/GlobalMessage.vue'
  import Debug from '@/components/Debug.vue'

  export default {
    components: {
      GlobalHeader,
      GlobalMessage,
      Debug
    },
    data () {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      // ログインボタン押下時に呼び出されるメソッド
      submitLogin: function () {
        userService.login(this.form.username, this.form.password)
          .then(user => {
            this.$store.dispatch('messages/setInfoMessage', { message: 'ログインしました。' })
            const next = this.$route.query.next || '/'
            this.$router.replace(next)
            console.log('Login succeeded.')
          })
      }
    }
  }
</script>
