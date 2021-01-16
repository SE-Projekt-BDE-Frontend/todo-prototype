import axios from "axios"
import { reactive, watch } from "vue"

export type NewTodo = {
  title: string
  done?: boolean
}

export type TodoDetails = Required<NewTodo>

type TodoRecord = TodoDetails & { id: number }

export class Todo implements TodoDetails {
  readonly id: number
  private details: TodoDetails

  constructor(id: number, todo: TodoDetails) {
    this.id = id
    this.details = {
      title: todo.title,
      done: todo.done,
    }
  }

  set title(newTitle: string) {
    const previous = this.details.title

    this.details.title = newTitle

    console.log("Todo setTitle():", this)
    axios
      .patch(`/api/todos/${this.id}`, {
        todo: { title: newTitle },
      })
      .then((response) => {
        this.details.title = response.data.todo.title
      })
      .catch(() => {
        this.details.title = previous
      })
  }
  get title() {
    // console.log("Todo getTitle():", this._title)
    return this.details.title
  }

  set done(newDone: boolean) {
    const previous = this.details.done

    this.details.done = newDone

    console.log("Todo setDone():", this)
    axios
      .patch(`/api/todos/${this.id}`, {
        todo: { done: newDone },
      })
      .then((response) => {
        this.details.done = response.data.todo.done
      })
      .catch(() => {
        this.details.done = previous
      })
  }
  get done() {
    // console.log("Todo getDone():", this._done)
    return this.details.done
  }

  public toggle() {
    this.details.done = !this.details.done
  }
}

export class TodoService {
  private todos: TodoRecord[]

  constructor() {
    this.todos = reactive([])

    axios.get("/api/todos").then((response) => {
      response.data.todos.forEach((todo: TodoRecord) => {
        this._pushTodo(new Todo(todo.id, todo))
      })
      console.log(this.todos)
    })
  }

  private _pushTodo(todo: Todo) {
    const reactiveTodo = reactive(todo)
    this.todos.push(reactiveTodo)
    watch(reactiveTodo, (newTodoState) => {
      console.log("watch:", newTodoState)
      if (newTodoState.title === "") {
        this.deleteTodo(newTodoState.id)
      }
    })
  }

  public getTodo(id: number) {
    const todo = this.todos.find((todo) => todo.id === id)
    if (todo === undefined)
      throw new Error(`Todo with id ${id} does not exist!`)
    return todo
  }

  public getTodos() {
    return this.todos
  }

  public async addTodo(todo: NewTodo) {
    if (todo.done === undefined) todo.done = false
    try {
      const addedTodo = (await axios.post("/api/todos", { todo })).data.todo
      this._pushTodo(new Todo(addedTodo.id, addedTodo))
    } finally {
      console.log("TodoService addTodo():")
    }
  }

  public async deleteTodo(id: number) {
    try {
      await axios.delete(`/api/todos/${id}`)
      this.todos.splice(
        this.todos.findIndex((todo) => todo.id === id),
        1
      )
    } finally {
      console.log("TodoService deleteTodo():", id)
    }
  }
}
