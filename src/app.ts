import fastify from 'fastify'
import routes from './routes'

const app = fastify({
  // Logger only for production
  logger: !!(process.env.NODE_ENV !== "development"),
})

app.register(routes)

app.listen({ port: 8080, host: '::' }, (err) => {
  if (err) throw err
  console.log('Server is running...')
})