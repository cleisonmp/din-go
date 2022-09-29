import { createServer, Factory, Model } from 'miragejs'
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
      server.createList('user', 10)
    },

    routes() {
      this.namespace = 'api'
      this.timing = 750
      this.get('/users')
      this.post('/users')
      this.namespace = ''
      this.passthrough()
    },
  })
  return server
}
