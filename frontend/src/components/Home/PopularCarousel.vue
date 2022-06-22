<template>
  <carousel class="px-16" :items-to-show="1">
    <slide v-for="slide in popularEvents" :key="slide.picture">
      <div class="">
        {{ slide.eventName }}
      </div>
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  name: "App",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  props: {
    popularEvents: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style></style>
