import { defineStore } from "pinia";
import { $axios } from "../plugins/axios";
import qs from "qs";
export const useEventStore = defineStore({
  id: "event",
  state: () => ({
    events: [],
  }),
  getters: {},
  actions: {
    async getEvents() {
      const query = qs.stringify(
        {
          filters: {
            events: {
              name: {
                $containsi: "evg1",
              },
            },
          },
        },
        {
          populate: { events: { populate: ["category", "pictures"] } },
        },

        {
          encodeValuesOnly: true,
        }
      );
      try {
        const { data } = await $axios.get(`/organizations?${query}`);
        this.events = data;
        return data;
      } catch (error) {
        return [];
      }
    },
  },
});
