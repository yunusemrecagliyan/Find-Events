<template>
  <div
    class="sm:h-36 py-6 sm:py-0 bg-secondary-50 border-b border-secondary-200 relative"
  >
    <nav
      class="px-6 container mt-10 sm:flex sm:justify-between sm:items-center"
    >
      <div class="flex justify-between">
        <router-link
          to="/"
          class="text-xl font-bold text-gray-800 sm:text-2xl hover:text-secondary-400"
          >Find Your Events
        </router-link>

        <navbar-toggle-button
          @click="showMenu = !showMenu"
        ></navbar-toggle-button>
      </div>
      <mobile-menu :show-menu="showMenu" />
    </nav>
    <div
      class="absolute bottom-0 w-3/4 mx-auto -mb-6 absolute-input-center hidden sm:block"
    >
      <navbar-search-input
        with-icon
        placeholder="Aradığınız etkinlik, kategori veya sanatçıyı yazınız."
        :value="searchText"
        @input="(e) => (searchText = e)"
        @focus="showSearch = true"
        @away="showSearch = false"
        @keydown="enterSearch"
      >
        <template #icon>
          <icon-search
            class="mt-[18px] w-5 h-5 stroke-current text-secondary-500"
          /> </template
      ></navbar-search-input>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MobileMenu from "./Navbar/MobileMenu.vue";
import NavbarToggleButton from "./Navbar/NavbarToggleButton.vue";
import NavbarSearchInput from "./Navbar/NavbarSearchInput.vue";
import IconSearch from "../Icons/IconSearch.vue";
const showMenu = ref(false);
let searchText = ref("");
const showSearch = ref(false);

const enterSearch = (e) => {
  if (e.key === "Enter") {
    this.$router.push({
      path: "tum-etkinlikler",
      query: { q: this.searchText },
    });
  }
};
</script>

<style>
.absolute-input-center {
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
