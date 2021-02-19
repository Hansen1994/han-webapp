const isDev = process.env.NODE_ENV === 'development'

export default {
  baseUrl: {
    dev: 'http://localhost:3000',
    pro: 'http://122.51.156.210:22000'
  },
  publicPath: [/^\/public/, /^\/login/],
  wsconfig: {
    url: isDev ? '127:0.0.1' : 'www.toimc.com',
    port: isDev ? '3001' : 12001
  }
}
