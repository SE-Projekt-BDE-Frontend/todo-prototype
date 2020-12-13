<template>
  <h3 class="text-2xl py-2 text-center font-bold">My Todos</h3>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      <input type="checkbox" v-model="todo.done" />
      {{ todo.title }}
    </li>
  </ul>
  <button @click="addTodo('test')">Add Todo</button>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue" // @ is an alias to /src

export default defineComponent({
  name: "Home",
  setup() {
    const todos = ref([{ title: "A", done: false }])

    const addTodo = (title: string) => todos.value.push({ title, done: false })

    watch(todos.value, (todos, newTodos) => {
      alert(JSON.stringify(newTodos))
    })

    return { todos, addTodo }
  },
})
</script>
