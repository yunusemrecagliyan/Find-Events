import { defineStore } from "pinia";
import { $axios } from "../plugins/axios";

export const useCityStore = defineStore({
  id: "city",
  state: () => ({
    cities: [],
  }),
  getters: {},
  actions: {
    async getCities() {
      try {
        const { data } = await $axios.get(`/cities`);
        this.cities = data.data.map((city) => ({
          ...city.attributes,
          id: city.id,
        }));
        return data;
      } catch (error) {
        return [];
      }
    },
  },
});
