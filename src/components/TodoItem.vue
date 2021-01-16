<template>
  <div
    class="h-8 flex items-center hover:bg-gray-200 focus:bg-gray-300 focus-within:bg-gray-300 rounded-md outline-none"
    :class="{ 'hover:bg-gray-300': editMode }"
    tabindex="0"
    @blur.capture="blur($event)"
  >
    <input
      type="checkbox"
      v-model="todo.done"
      class="h-6 w-6 mx-1"
      @change="$emit('update:done', todo.done)"
      @mouseup="$event.target.blur()"
    />

    <div
      class="w-full h-full"
      :class="{ 'cursor-text': editMode }"
      @mousedown="editMode = true"
    >
      <input
        type="text"
        ref="titleInputElement"
        v-model.trim.lazy="todo.title"
        class="pl-1 w-full h-full flex items-center bg-transparent"
        :class="{ 'pointer-events-none': !editMode }"
        @keypress.enter="$event.target.blur()"
        @blur="$emit('update:title', todo.title)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue"

export default defineComponent({
  name: "TodoItem",
  props: {
    title: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:title", "update:done"],
  setup(props) {
    const todo = reactive({
      title: props.title,
      done: props.done,
    })

    const titleInputElement = ref<HTMLElement>()
    onMounted(() => {
      if (todo.title === "") {
        titleInputElement.value?.focus()
      }
    })

    const editMode = ref(false)
    const blur = (event: FocusEvent) => {
      if (
        !(event.target as HTMLElement).contains(event.relatedTarget as Node)
      ) {
        editMode.value = false
      }
    }

    return {
      todo,
      titleInputElement,
      editMode,
      blur,
    }
  },
})
</script>
