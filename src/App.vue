<template>
  <nav
    class="p-2 bg-purple-500 text-white flex justify-center gap-x-6 font-bold"
  >
    <router-link to="/" active-class="underline">Todos</router-link>
    <router-link to="/about" active-class="underline">About</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

#app {
  @apply container mx-auto px-24 select-none;
}
</style>
