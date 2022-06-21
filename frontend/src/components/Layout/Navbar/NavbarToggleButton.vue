<template>
  <base-button variant="success" class="sm:hidden border-white">
    <div class="flex">
      <button
        type="button"
        class="text-white hover:text-gray-400 focus:outline-none focus:text-gray-400"
      >
        <icon-hamburger />
      </button></div
  ></base-button>
</template>

<script>
import BaseButton from "../../Common/BaseButton.vue";
import IconHamburger from "../../Icons/IconHamburger.vue";
export default {
  components: { BaseButton, IconHamburger },
};
</script>

<style></style>
