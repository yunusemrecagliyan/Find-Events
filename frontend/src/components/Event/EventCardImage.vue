<template>
  <div class="relative overflow-hidden block m-0 p-0 aspect-video h-52">
    <img
      :src="baseUrl + imgSrc"
      class="object-contain transition-all w-full group-hover:border-0 border-b-[1px] rounded align-middle"
    />

    <span
      v-if="discount"
      class="absolute left-4 z-20 top-4 rounded-lg border bg-gray-50 border-secondary-200 px-2 py-1"
    >
      <span class="text-lg font-semibold mr-2 text-secondary-300">
        %{{ discount }} </span
      >indirim
    </span>
  </div>
</template>

<script setup>
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  imgSrc: {
    type: String,
    default: "() => {}",
  },
  discount: {
    type: Number,
    default: 0,
  },
});
</script>

<style></style>
