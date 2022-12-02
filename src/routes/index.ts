import { FastifyInstance } from "fastify"
import PokemonRoute from "./pokemon"

export default async function routes(fastify: FastifyInstance) {
  fastify.register(PokemonRoute,{prefix:'api/pokemon'})
}