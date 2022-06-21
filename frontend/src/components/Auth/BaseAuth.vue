<template>
  <div class="flex flex-col sm:flex-row">
    <div class="flex flex-col p-8 justify-between w-full">
      <div class="logo">
        <router-link
          to="/"
          class="text-lg font-bold text-gray-100 sm:text-2xl hover:text-secondary-400"
        >
          <icon-logo alt="FindEvent" class="w-44 h-20 text-black" />
        </router-link>
      </div>
      <div class="form flex-1 flex flex-col justify-center items-start mx-auto">
        <slot name="form"></slot>
      </div>
      <div class="footer text-sm mt-16 hidden sm:block">
        <small class="mr-2">© 2022</small>
        <router-link to="/" class="hover:underline">FindEvent</router-link>
      </div>
    </div>
    <div
      class="bg-secondary-100 w-full h-full px-8 text-center items-center justify-center flex"
    >
      <div class="shadow-lg p-2"><img src="@/assets/login_images.png" /></div>
    </div>
  </div>
</template>

<script setup>
import IconLogo from "../Icons/IconLogo.vue";
</script>
