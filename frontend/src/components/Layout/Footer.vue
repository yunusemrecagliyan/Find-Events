<template>
  <footer
    v-if="currentLayout != 'auth'"
    class="p-4 bg-gray-800 rounded-t-lg shadow md:flex md:items-center md:justify-between md:p-6"
  >
    <span class="text-sm sm:text-center text-gray-300">
      <small class="mr-2">© 2022</small>
      <router-link to="/" class="hover:underline">FindEvent</router-link>
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-400 sm:mt-0">
      <li>
        <router-link to="/hakkinda" class="mr-4 hover:underline md:mr-6"
          >About</router-link
        >
      </li>
      <li>
        <router-link to="/tum-etkinlikler" class="mr-4 hover:underline md:mr-6"
          >Tüm Etkinlikler</router-link
        >
      </li>
      <li>
        <router-link to="/artists" class="mr-4 hover:underline md:mr-6"
          >Sanatçılar</router-link
        >
      </li>
      <li>
        <router-link to="/places" class="hover:underline">Mekanlar</router-link>
      </li>
    </ul>
  </footer>
</template>

<script setup>
import { useRoute } from "vue-router";
import { watch, ref } from "vue";

const route = useRoute();
const currentLayout = ref("");

watch(
  () => route.meta.layout,
  async (layout) => {
    currentLayout.value = layout;
  }
);
</script>
