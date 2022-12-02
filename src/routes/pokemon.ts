import {FastifyInstance} from 'fastify'
import db from '../db'
import { IPaginationQuerystring } from '../type'

export default async function PokemonRoute(fastify: FastifyInstance) {

  fastify.get<{ Querystring: IPaginationQuerystring }>('/',
  async (req, res) => {
    let { page, size } = req.query
    try {
      const data = await db.pw_pokemon.findMany({
        select: {
          index: true,
          nameZh: true,
          imgUrl: true,
          type1: true,
          type2: true
        },
        skip: Number(page) * Number(size) || undefined,
        take: Number(size) || 20,
      })
      return data
    } catch (err) {
      throw err
    }
  })
}