<template>
  <ENavbar></ENavbar>
  <main class="flex-1 h-full">
    <RouterView />
  </main>
  <EFooter></EFooter>
</template>

<script setup>
import { RouterView } from "vue-router";
import ENavbar from "./components/Layout/Navbar.vue";
import EFooter from "./components/Layout/Footer.vue";
</script>
<style></style>
