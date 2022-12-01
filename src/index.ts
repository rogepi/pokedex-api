import { Prisma, PrismaClient } from "@prisma/client"
import fastify from 'fastify'

const prisma = new PrismaClient()
const app = fastify({ logger: true })

app.get('/',()=>{
  return "Server is running"
})

app.get('/pokemon', async(req,res)=>{
  const data = await prisma.pw_pokemon.findMany()
  return data
})

app.listen({port:8080,host: '::'},(err)=>{
  if(err) throw err
  console.log('Server is running')
})