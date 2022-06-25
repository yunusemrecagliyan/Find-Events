<template>
  <div
    v-if="currentLayout != 'auth'"
    class="sm:h-32 py-6 sm:py-0 border-b bg-white relative z-10"
  >
    <nav
      class="px-6 container mt-4 sm:flex sm:justify-between sm:items-center mx-auto"
    >
      <div class="flex justify-between">
        <router-link
          to="/"
          class="text-lg font-bold text-gray-100 sm:text-2xl hover:text-secondary-400"
        >
          <icon-logo alt="FindEvent" class="w-44 h-20 text-secondary-400" />
        </router-link>

        <navbar-toggle-button
          @click="showMenu = !showMenu"
        ></navbar-toggle-button>
      </div>
      <mobile-menu :show-menu="showMenu" />
    </nav>
    <div
      v-if="currentLayout == 'search'"
      class="absolute bottom-0 w-4/6 mx-auto -mb-6 absolute-input-center hidden sm:block"
    >
      <navbar-search-input
        with-icon
        placeholder="Aradığınız etkinlik, kategori veya sanatçıyı yazınız."
        :value="searchText"
        @input="(e) => changeSearchText(e)"
        @focus="showSearch = searchText.length > 3"
        @away="showSearch = false"
        @keydown="enterSearch"
        :show-search="showSearch"
      >
        <template #icon>
          <icon-search
            class="mt-[14px] w-5 h-5 stroke-current text-secondary-500"
          />
        </template>
        <template #searchResult>
          <div class="bg-white text-black h-full px-2 overflow-auto">
            <div class="py-4">Selam</div>
            <div class="py-4">Selam</div>
            <div class="py-4">Selam</div>
            <div class="py-4">Selam</div>
            <div class="py-4">Selam</div>
          </div>
        </template>
      </navbar-search-input>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import MobileMenu from "./Navbar/MobileMenu.vue";
import NavbarToggleButton from "./Navbar/NavbarToggleButton.vue";
import NavbarSearchInput from "./Navbar/NavbarSearchInput.vue";
import IconSearch from "../Icons/IconSearch.vue";
import IconLogo from "../Icons/IconLogo.vue";
const showMenu = ref(false);
let searchText = ref("");
const showSearch = ref(false);
let currentLayout = ref("");

const route = useRoute();

const changeSearchText = (e) => {
  searchText.value = e;
  if (searchText.value.length >= 3) showSearch.value = true;
  else showSearch.value = false;
};

watch(
  () => route.meta.layout,
  async (layout) => {
    currentLayout.value = layout;
  }
);

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
