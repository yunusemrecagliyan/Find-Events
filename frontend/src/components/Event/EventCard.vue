<template>
  <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
    <div
      class="group w-full h-full min-h-[300px] cursor-pointer transition-all shadow hover:shadow-lg rounded flex flex-col"
    >
      <event-card-image
        :img-src="event.picture"
        :discount="event.prices[0].discount"
      ></event-card-image>
      <event-card-info :event="event"></event-card-info>
    </div>
  </div>
</template>

<script setup>
import EventCardImage from "./EventCardImage.vue";
import EventCardInfo from "./EventCardInfo.vue";
import dayjs from "dayjs";
import tr from "dayjs/locale/tr";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);
dayjs.locale(tr);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  event: {
    type: Object,
    default: () => {},
  },
});
</script>

<style></style>
