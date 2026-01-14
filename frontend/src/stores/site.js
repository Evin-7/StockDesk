import { defineStore } from "pinia";
import axios from "axios";
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const useSiteStore = defineStore("site", {
  state: () => ({
    store_menu: getSavedState("site.store_menu") || new Map(),
    locations: getSavedState("site.locations") || new Map(),
  }),

  getters: {
    getStoreMenu() {
      return this.store_menu;
    },
    getLocations() {
      return this.locations;
    },
  },

  actions: {
    async setStoreMenu(params) {
      try {
        const menus = await axios.get(
          `${baseUrl}/menu/getMenu/${params.location}`
        );
        if (menus.status === 200) {
          this.store_menu = menus.data;
          saveState("site.store_menu", this.store_menu);
          return menus.data;
        }
      } catch (e) {
        console.log(e.response);
      }
    },
    async setLocations() {
      try {
        const locations = await axios.get(`${baseUrl}/store/getStore`);
        if (locations.status === 200) {
          this.locations = locations.data;

          saveState("site.locations", this.locations);
          return locations.data;
        }
      } catch (e) {
        console.log(e.response);
      }
    },
  },
});

// Private helpers

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}
