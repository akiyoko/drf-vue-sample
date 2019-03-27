import axios from 'axios'
import store from '@/store'
import userService from './userService'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// 共通前処理
api.interceptors.request.use(function (config) {
  // メッセージをクリア
  store.dispatch('messages/clearMessages')
  // 認証用トークンがあればリクエストヘッダに乗せる
  const token = localStorage.getItem('access')
  if (token) {
    config.headers.Authorization = 'JWT ' + token
    return config
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 共通エラー処理
api.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.log('error=', error)
  console.log('error.response=', error.response)
  const status = error.response ? error.response.status : 500
  console.log('status=', status)

  // エラーの内容に応じてstoreのメッセージを更新
  let message
  if (status === 400) {
    // バリデーションNG
    let messages = Object.entries(error.response.data)
    store.dispatch('messages/setWarningMessages', { messages: messages })

  } else if (status === 401) {
    // 認証エラー
    const token = localStorage.getItem('access')
    if (token != null) {
      message = 'ログイン有効期限切れ'
    } else {
      message = '認証エラー'
    }
    // TODO: ログアウト
    userService.logout()
    store.dispatch('messages/setErrorMessage', { message: message })

  } else if (status === 403) {
    // 権限エラー
    message = '権限エラーです。'
    store.dispatch('messages/setErrorMessage', { message: message })

  } else {
    // その他のエラー
    message = error.statusText ? error.statusText : '想定外のエラーです。'
    store.dispatch('messages/setErrorMessage', { message: message })
  }
  return Promise.reject(error)
})

export default api
