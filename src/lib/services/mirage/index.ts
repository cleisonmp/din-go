import { createServer, Factory, Model, Response } from 'miragejs'
import { faker } from '@faker-js/faker'
import { User } from '../../models/user'

export const makeServer = () => {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend<Partial<User>>({
        name() {
          return faker.name.fullName()
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        role() {
          return faker.word.adjective()
        },
        createdAt() {
          return faker.date.recent(120, new Date()).toString()
        },
      }),
    },

    seeds(server) {
      server.createList('user', 174)
    },

    routes() {
      this.namespace = 'api'
      this.timing = 750
      this.get('/users', function (schema, request) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { page = 1, per_page = 10 } = request.queryParams

        const allUsers = schema.all('user')
        const totalUsers = allUsers.length

        const pageStart = (Number(page) - 1) * Number(per_page)
        const pageEnd = pageStart + Number(per_page)

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const users = this.serialize(allUsers).users.slice(pageStart, pageEnd) // eslint-disable-line

        return new Response(
          200,
          {
            'x-total-count': String(totalUsers),
          },
          { users },
        )
      })
      this.post('/users')
      this.namespace = ''
      this.passthrough()
    },
  })
  return server
}
