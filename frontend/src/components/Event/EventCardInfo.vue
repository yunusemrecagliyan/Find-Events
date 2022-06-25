<template>
  <div class="px-2 py-1 flex flex-col flex-1 justify-between">
    <div class="flex flex-col">
      <span class="font-bold text-secondary-400 h-12">
        {{ event.eventName }}</span
      >
      <small class="text-gray-600 truncate">{{ event.place.name }}</small>
      <span class="text-gray-800 text-sm">{{
        dayjs(event.date).format("DD MMMM YYYY HH:mm")
      }}</span>
    </div>

    <div
      class="self-end justify-self-end border rounded-lg mt-4 mb-2 py-1 px-2 flex items-baseline group-hover:bg-secondary-500 transition-all"
    >
      <span
        :class="
          lowestPrice.discount
            ? 'line-through text-gray-600 group-hover:text-gray-100'
            : ''
        "
        class="text-[16px] font-normal text-gray-400 group-hover:text-gray-50 mr-2"
      >
        <icon-cart
          v-if="!lowestPrice.discount"
          class="my-auto h-5 mr-1"
        ></icon-cart>

        {{ lowestPrice.price }} TL</span
      >

      <span
        v-if="lowestPrice.discount"
        class="text-[20px] font-semibold text-gray-600 flex group-hover:text-gray-100"
      >
        <icon-cart class="my-auto h-5 mr-1"></icon-cart>
        {{
          lowestPrice.price - (lowestPrice.price * lowestPrice.discount) / 100
        }}
        TL</span
      >
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue-demi";
import dayjs from "dayjs";
import tr from "dayjs/locale/tr";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import IconCart from "../Icons/IconCart.vue";

dayjs.extend(LocalizedFormat);
dayjs.locale(tr);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  event: {
    type: Object,
    default: () => {},
  },
});

const lowestPrice = computed(() => {
  const prices = props.event.prices;
  const lowest = prices.sort((a, b) => a.price - b.price)[0];
  return lowest;
});
</script>

<style></style>
