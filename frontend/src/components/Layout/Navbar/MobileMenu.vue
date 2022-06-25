<template>
  <ul
    class="flex-col mt-8 space-y-4 z-10 h-full sm:flex sm:space-y-0 sm:flex-row sm:items-center sm:mt-0 sm:rounded-lg sm:border sm:px-4 sm:py-2 sm:bg-secondary-100 sm:gap-2 sm:divide-x divide-secondary-300 border-secondary-200"
    :class="showMenu ? 'flex' : 'hidden'"
  >
    <mobile-menu-link
      v-if="isUserLoggedIn"
      to="/profil"
      :title="user.username ?? 'Profil'"
    >
      <template #icon>
        <IconRegister />
      </template>
    </mobile-menu-link>
    <mobile-menu-link
      v-if="isUserLoggedIn"
      class="sm:pl-2"
      @click="logout"
      title="Çıkış"
    >
    </mobile-menu-link>

    <mobile-menu-link v-if="!isUserLoggedIn" title="Giriş Yap" to="/login">
      <template #icon>
        <IconLogin />
      </template>
    </mobile-menu-link>
    <hr />
    <mobile-menu-link
      class="sm:pl-2"
      v-if="!isUserLoggedIn"
      title="Kayıt Ol"
      to="/register"
    >
      <template #icon>
        <IconRegister />
      </template>
    </mobile-menu-link>
  </ul>
</template>

<script setup>
import MobileMenuLink from "./MobileMenuLink.vue";

import { useAuthStore } from "@/stores/auth";
import IconLogin from "../../Icons/IconLogin.vue";
import IconRegister from "../../Icons/IconRegister.vue";
import { storeToRefs } from "pinia";

const { isUserLoggedIn, user } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();
defineProps({
  showMenu: {
    type: Boolean,
    default: false,
  },
});
</script>

<style></style>
