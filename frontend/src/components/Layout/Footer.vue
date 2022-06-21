<template>
  <footer
    class="p-4 bg-white rounded-t-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800"
  >
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
      <small class="mr-2">© 2022</small>
      <router-link to="/" class="hover:underline">FindEvent</router-link>
    </span>
    <ul
      class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
    >
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

<script setup></script>
