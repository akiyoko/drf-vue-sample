import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/pages/HomePage'
import DashboardPage from '@/pages/DashboardPage'
import LoginPage from '@/pages/LoginPage'
import userService from '@/services/userService'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // ログインが必要な画面には「requiresAuth」フラグを付けておく
  routes: [
    { path: '/', component: HomePage, meta: { requiresAuth: true } },
    { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
    { path: '/login', component: LoginPage },
    { path: '*', redirect: '/' }
  ]
})

// routerで画面遷移する直前に実行される
router.beforeEach((to, from, next) => {
  console.log('to.path=', to.path)
  console.log('to.meta.requiresAuth=', to.meta.requiresAuth)

  const isLoggedIn = store.state.user.isLoggedIn
  const token = localStorage.getItem('access')

  console.log('beforeEach ... isLoggedIn=', isLoggedIn)
  console.log('beforeEach ... token=', token)

  // ログインが必要な画面に遷移しようとした場合
  if (to.matched.some(record => record.meta.requiresAuth)) {

    // ログインしている状態の場合
    if (isLoggedIn) {
      console.log('User is logged in, So go next!')
      next()

      // ログインしていない状態の場合
    } else {
      // まだJWTが残っていればユーザー情報を再取得してみる
      if (token != null) {
        console.log('User is not logged in at the first time. So, try to get user again!')
        userService.getUser()
          .then(() => {
            // 再取得できたらそのまま次へ
            console.log('Succeeded to get user, and free to next!')
            next()
          })
          .catch(() => {
            // ダメだった場合はログイン画面へ
            console.log('Failed to get user, so login page.')
            next({
              path: '/login',
              query: { next: to.fullPath }
            })
          })
      } else {
        // ログインしていない場合は、ログイン画面へ
        console.log('Force usr to login page.')
        next({
          path: '/login',
          query: { next: to.fullPath }
        })
      }
    }

  } else {
    console.log('User try to go public page, so next.')
    next()
  }
})

export default router
