import { defineStore } from "pinia";
import { $axios } from "../plugins/axios";

import qs from "qs";
export const useCategoryStore = defineStore({
  id: "category",
  state: () => ({
    categories: [],
    subCategories: [],
  }),
  getters: {},
  actions: {
    async getCategories() {
      try {
        const query = qs.stringify(
          {
            populate: ["subCategories"],
          },
          {
            encodeValuesOnly: true,
          }
        );
        const { data } = await $axios.get(`/categories?${query}`);
        this.categories = data.data
          .filter((cat) => cat.attributes.isSubCategory === false)
          .map((cat) => ({
            id: cat.id,
            ...cat.attributes,
          }));
        this.subCategories = data.data
          .filter((cat) => cat.attributes.isSubCategory === true)
          .map((cat) => ({
            id: cat.id,
            ...cat.attributes,
          }));
        return data;
      } catch (error) {
        return [];
      }
    },
  },
});
