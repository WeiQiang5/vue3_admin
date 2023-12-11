import { defineStore } from "pinia";

export interface SideBarState {
  collapse: boolean;
  mode: "horizontal" | "vertical";
  uniqueOpened: boolean;
}

const useLayout = defineStore("sidebar", {
  state: (): SideBarState => ({
    collapse: false,
    mode: "vertical",
    uniqueOpened: false,
  }),
  actions: {
    handleCollapse() {
      this.collapse = !this.collapse;
    },
  },
});

export default useLayout;
