import { mapState, mapActions } from "pinia";
import { useSiteStore } from "@/stores/site";

export const siteComputed = {
  ...mapState(useSiteStore, [
    "storeMenu",
    "locations"
  ]),
};

export const siteMethods = mapActions(useSiteStore, {
  setStoreMenu: "setStoreMenu",
  setLocations: "setLocations",
});

