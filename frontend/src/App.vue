<template>
  <ENavbar></ENavbar>
  <main class="flex flex-1 h-full">
    <RouterView />
  </main>
  <EFooter></EFooter>
</template>

<script setup>
import { RouterView } from "vue-router";
import ENavbar from "./components/Layout/ENavbar.vue";
import EFooter from "./components/Layout/EFooter.vue";
</script>
<style></style>
