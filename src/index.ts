import { Prisma, PrismaClient } from "@prisma/client"
import fastify from 'fastify'

const prisma = new PrismaClient()
const app = fastify()

app.get('/', () => {
  return "Server is running"
})

interface IQuerystring {
  page?: number
  size?: number
}
app.get<{ Querystring: IQuerystring }>('/pokemon',
  async (req, res) => {
    let { page, size } = req.query
    page = Number(page) || 1
    size = Number(size) || 10
    console.log(page, size)
    try {
      const data = await prisma.pw_pokemon.findMany({
        select: {
          index: true,
          nameZh: true,
          imgUrl: true,
          type1: true,
          type2: true
        },
        skip:  (page - 1) * size,
        take: size ,
      })
      return data
    } catch (err) {
      throw err
    }
  })

app.listen({ port: 8080, host: '::' }, (err) => {
  if (err) throw err
  console.log('Server is running')
})