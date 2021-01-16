import { createServer, Model, RestSerializer } from "miragejs"
import { TodoDetails } from "./lib/TodoService"

const mockModels = {
  todo: Model.extend<Partial<TodoDetails>>({}),
}

export function makeServer({ environment = "development" } = {}) {
  const server = createServer<typeof mockModels, {}>({
    environment,
    serializers: {
      application: RestSerializer,
    },

    models: {
      todo: Model,
    },

    seeds(server) {
      server.create("todo", { title: "Buy Fruits", done: false })
      server.create("todo", { title: "Homework", done: true })
      server.create("todo", {
        title: "Learn to write efficient JavaScript",
        done: false,
      })
    },

    routes() {
      this.namespace = "api"

      this.get("/todos")
      this.get("/todos/:id")
      this.post("/todos")
      this.patch("/todos/:id")
      this.del("/todos/:id")
    },
  })

  return server
}
