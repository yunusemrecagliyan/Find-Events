<template>
  <div>
    <div
      class="gap-3 flex justify-between flex-wrap sm:flex-nowrap items-center"
    >
      <div class="border border-gray-200 py-2 sm:order-1">
        <select v-model="selectedSortOption">
          <option
            v-for="option in sortByOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
      <!-- :slidesPerView="categories.length + 1" -->
      <swiper
        :breakpoints="{
          320: {
            slidesPerView: 2.6,
            spaceBetween: 0,
          },
          480: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }"
        tag="div"
        class="py-2 flex w-full order-3 border-t sm:order-2 sm:border-t-0"
      >
        <swiper-slide
          tag="button"
          class="py-2 text-center rounded-lg"
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
      mode="out-in"
      enter-active-class="duration-200 transition origin-top"
      leave-active-class="duration-200 transition origin-top"
      enter-from-class="opacity-0 scale-y-0"
      enter-to-class="opacity-100 scale-y-100"
      leave-to-class="opacity-0 scale-y-0"
      leave-from-class="opacity-100 scale-y-100"
    >
      <div
        v-show="showFilters"
        class="px-4 space-y-4 md:flex md:justify-between"
      >
        <div class="flex flex-col">
          <label class="font-semibold" for="date">Tarih</label>
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
          <label class="font-semibold" for="place">Mekan</label>
          <select id="place" name="place" v-model="selectedSortOption">
            <option
              v-for="option in sortByOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold" for="city">Şehir</label>
          <select id="city" name="city" v-model="selectedSortOption">
            <option
              v-for="option in sortByOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";

import { ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import IconFilter from "../Icons/IconFilter.vue";
import "@vuepic/vue-datepicker/dist/main.css";

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
  filterOptions: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Object,
    required: true,
  },
});
const selectedSortOption = ref(props.sortByOptions[0].value);
const selectedCategory = ref(0);
const selectedDate = ref(new Date());

const selectCategory = (id) => {
  selectedCategory.value = id;
};
</script>
