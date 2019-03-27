import api from '@/services/api'
import store from '@/store'

/**
 * ログイン
 * @param username
 * @param password
 */
function login (username, password) {
  return api.post('/auth/jwt/create/', {
    'username': username,
    'password': password
  })
    .then(response => {
      // localStorageにJWTを保存
      localStorage.setItem('access', response.data.access)
      // ユーザー情報を取得してstoreのユーザー情報を更新
      return getUser()
        .then(user => user)
    })
}

/**
 * ログアウト
 */
function logout () {
  // localStorageからJWTを削除
  localStorage.removeItem('access')
  console.log('localStorageからJWTを削除!!')
  // storeのユーザー情報をクリア
  store.commit('user/clear')
}

/**
 * ユーザー情報を取得
 */
function getUser () {
  return api.get('/auth/users/me/')
    .then(response => {
      const user = response.data
      console.log('getUser .... user=', user)
      // storeのユーザー情報を更新
      store.commit('user/set', { user: user })
      return user
    })
}

export default {
  login,
  logout,
  getUser
}
