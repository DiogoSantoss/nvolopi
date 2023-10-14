import proxy from 'http-proxy-middleware'

export default function(app) {
    app.use(proxy('/api/auth', {target: 'http://localhost:3001'}))
}