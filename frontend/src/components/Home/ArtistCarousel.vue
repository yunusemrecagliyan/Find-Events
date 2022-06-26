<template>
  <div class="relative">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="50"
      :autoplay="{
        delay: 10000,
      }"
    >
      <swiper-slide v-for="slide in artists" :key="slide.id">
        <router-link
          :to="`/sanatci/${slide.artistName.trim().slug()}/${slide.id}`"
          class="flex justify-center align-middle h-96 relative bg-black aspect-auto"
        >
          <img :src="baseUrl + slide.picture" class="h-full object-contain" />
          <div
            class="absolute w-full bottom-0 p-16 flex flex-col justify-end text-2xl font-bold bg-gradient-to-t from-black/70 text-secondary-100 h-1/2"
          >
            <span>
              {{ slide.artistName ?? "" }}
            </span>
            <span>
              {{ dayjs(slide.date).format("llll") }}
            </span>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
    <h2
      class="select-none text-right text-xl font-bold p-4 rounded bg-gradient-to-t from-secondary-300/70 text-white absolute bottom-0 m-3 right-0 z-10"
    >
      Sanatçılar
    </h2>
  </div>
</template>
<script setup>
// Import Swiper Vue.js components
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { defineProps } from "vue";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import Turkish from "dayjs/locale/tr";
// Import Swiper styles
const modules = [Navigation, Pagination, Scrollbar, Autoplay];

dayjs.extend(LocalizedFormat);
dayjs.locale(Turkish);
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
defineProps({
  artists: {
    type: Array,
    default: () => [],
  },
});
</script>
