const isDev = process.env.NODE_ENV === 'development'

export default {
  baseUrl: {
    dev: 'http://localhost:3000',
    pro: 'http://www.toimc.com:12000'
  },
  publicPath: [/^\/public/, /^\/login/],
  wsconfig: {
    url: isDev ? '127:0.0.1' : 'www.toimc.com',
    port: isDev ? '3001' : 12001
  }
}
