module.exports = {
  outputDir: 'dist',  // build 時に吐き出す先の格納パス
  assetsDir: 'static',  // 格納パスの下に吐き出す際に作成されるディレクトリ。一段深くなる（あれ？そういえば src/assets の下の logo.png が出てない？？）
  // dist以下の静的ファイルのプレフィックスとして付けられる。加えて、public/index.html のビルド時に <%= BASE_URL %> の値が置換される（末尾の / は付けても付けなくてもどちらでもよい。ただし、空文字だとダメっぽい）
  //publicPath: IS_PRODUCTION ? 'http://example.com/' : '/',
  publicPath: '/',

  devServer: {
    proxy: {
      '/api*': {
        // Forward frontend dev server request for /api to django dev server
        target: 'http://localhost:8080/',
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '\*'
    }
  }
}
