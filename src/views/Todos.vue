<template>
  <div class="flex flex-col items-center">
    <div class="flex items-center justify-between w-1/2 pt-4 pb-1">
      <h3 class="text-2xl font-bold">My Todos</h3>
      <button
        @click="todoService.addTodo({ title: '' })"
        class="bg-purple-600 text-gray-50 px-1 rounded-sm text-lg font-bold"
      >
        +
      </button>
    </div>
    <ul class="w-1/2 flex flex-col gap-y-1 focus-group">
      <li v-for="todo in todos" :key="todo.id">
        <todo-item
          v-model:title="todo.title"
          v-model:done="todo.done"
        ></todo-item>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue" // @ is an alias to /src
import { TodoService } from "@/lib/TodoService"
import TodoItem from "@/components/TodoItem.vue"

export default defineComponent({
  components: {
    TodoItem,
  },
  name: "Todos",
  setup() {
    const todoService = new TodoService()
    const todos = todoService.getTodos()

    return { todoService, todos }
  },
})
</script>
