<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <component :is="Component" :key="$route.path" />
    </router-view>
  </div>
</template>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>