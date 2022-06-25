<template>
  <div class="container">
    <div
      class="gap-3 flex justify-between flex-wrap sm:flex-nowrap items-center"
    >
      <div class="py-2 sm:order-1">
        <base-select
          :options="sortByOptions"
          v-model="selectedSortOption"
        ></base-select>
      </div>
      <!-- :slidesPerView="categories.length + 1" -->
      <swiper
        :modules="[Navigation]"
        navigation
        :breakpoints="{
          320: {
            slidesPerView: 2.6,
            spaceBetween: 0,
          },
          480: {
            slidesPerView: 4.4,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 5.4,
            spaceBetween: 3,
          },
          768: {
            slidesPerView: 7.4,
            spaceBetween: 20,
          },
        }"
        tag="div"
        class="py-2 flex w-full order-3 border-t sm:order-2 sm:border-t-0"
      >
        <swiper-slide
          tag="button"
          class="py-2 text-center rounded-lg my-auto"
          v-for="(category, index) in categories"
          :class="
            selectedCategory === index
              ? 'bg-secondary-400 text-secondary-50 font-semibold'
              : 'border-secondary-200 bg-secondary-50'
          "
          @click="selectCategory(index)"
          :key="category.id"
        >
          {{ category.name }}
        </swiper-slide>
      </swiper>
      <button
        @click="showFilters = !showFilters"
        class="px-2 flex items-center gap-2 border rounded-lg border-gray-300 py-2 sm:order-3 hover:bg-secondary-400 hover:text-secondary-100"
      >
        <icon-filter class="w-4 h-4"></icon-filter>
        <span> Filtrele </span>
      </button>
    </div>
    <transition
      mode="in-out"
      enter-active-class="transition origin-top"
      leave-active-class="transition origin-top"
      enter-from-class="opacity-0 scale-y-0 h-0"
      enter-to-class="opacity-100 scale-y-100 h-100"
      leave-to-class="opacity-0 scale-y-0 h-0"
      leave-from-class="opacity-100 scale-y-100 h-100"
    >
      <div v-show="showFilters" class="px-4 md:flex md:justify-between">
        <div class="flex flex-col">
          <label class="block mb-2 text-sm font-medium text-gray-900" for="date"
            >Tarih</label
          >
          <datepicker
            format="yyyy-MM-dd"
            range
            locale="tr"
            name="date"
            id="name"
            cancelText="Kapat"
            selectText="Seç"
            v-model="selectedDate"
          ></datepicker>
        </div>
        <div class="flex flex-col">
          <base-select
            label="Mekan"
            :options="placeOptions"
            v-model="selectedPlaceOption"
          ></base-select>
        </div>
        <div class="flex flex-col">
          <base-select
            label="Şehir"
            :options="cityOptions"
            v-model="selectedCityOption"
          ></base-select>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";

import { ref, watch } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import IconFilter from "../Icons/IconFilter.vue";
import "@vuepic/vue-datepicker/dist/main.css";
import BaseSelect from "../Common/BaseSelect.vue";

const emit = defineEmits(["changed"]);

const showFilters = ref(false);
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  sortByOptions: {
    type: Array,
    required: true,
  },
  placeOptions: {
    type: Array,
    required: true,
  },
  cityOptions: {
    type: Array,
    required: true,
  },
});
const selectedSortOption = ref(props.sortByOptions[0].value);
const selectedCategory = ref(0);
const selectedDate = ref(null);
const selectedPlaceOption = ref(0);
const selectedCityOption = ref(0);

watch(
  () => [
    selectedCategory.value,
    selectedSortOption.value,
    selectedDate.value,
    selectedPlaceOption.value,
    selectedCityOption.value,
  ],
  () => {
    emit("changed", {
      category: props.categories[selectedCategory.value].id,
      sort: selectedSortOption.value,
      date: selectedDate.value,
      place: selectedPlaceOption.value,
      city: selectedCityOption.value,
    });
  }
);

const selectCategory = (id) => {
  selectedCategory.value = id;
};
</script>
<style>
.swiper-button-prev,
.swiper-button-next {
  @apply text-gray-600;
}
.swiper-button-next:after,
.swiper-rtl .swiper-button-prev:after {
  content: "next";
  font-size: 24px;
}
.swiper-button-prev:after {
  content: "prev";
  font-size: 24px;
}
</style>
