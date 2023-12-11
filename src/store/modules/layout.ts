import { defineStore } from "pinia";

export interface SideBarState {
  collapse: boolean;
}

const useLayout = defineStore("sidebar", {
  state: (): SideBarState => ({
    collapse: false,
  }),
  actions: {
    handleCollapse() {
      this.collapse = !this.collapse;
    },
  },
});

export default useLayout;
