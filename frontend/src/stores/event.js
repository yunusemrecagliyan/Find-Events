import { defineStore } from "pinia";
import { $axios } from "../plugins/axios";
export const useEventStore = defineStore({
  id: "event",
  state: () => ({
    events: [],
    popularEvents: [],
  }),
  getters: {},
  actions: {
    async getEvents(query) {
      try {
        const { data } = await $axios.get(`/organizations?${query}`);
        return data;
      } catch (error) {
        return [];
      }
    },
  },
});
