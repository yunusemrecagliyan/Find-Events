import { defineStore } from "pinia";
import { $axios } from "../plugins/axios";
import { deleteUser, deleteToken, setToken, setUser } from "../services/jwt";

import config from "../services/jwt/config";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
  }),
  getters: {
    isUserLoggedIn: (state) => !!state.user,
    userType: (state) => (state.user ? state.user.type : null),
  },
  actions: {
    async login({ email, password }) {
      try {
        const {
          data: { jwt, user },
        } = await $axios.post(config.LOGIN_ENDPOINT, {
          identifier: email,
          password,
        });
        setToken(jwt);
        setUser(user);
        this.user = user;
        return true;
      } catch (error) {
        return false;
      }
    },
    async register({ name, password, email, username }) {
      try {
        const {
          data: { jwt, user },
        } = await $axios.post("/auth/local/register", {
          name,
          password,
          email,
          username,
        });
        setToken(jwt);
        setUser(user);
        this.user = user;
        return true;
      } catch (error) {
        return false;
      }
    },
    async logout() {
      deleteToken();
      deleteUser();
      this.user = null;
    },
  },
});
