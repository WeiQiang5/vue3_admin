import { defineStore } from "pinia";

export interface SideBarState {
  collapse: boolean;
}

const useSideBar = defineStore("sidebar", {
  state: (): SideBarState => ({
    collapse: false,
  }),
  actions: {
    handleCollapse() {
      this.collapse = !this.collapse;
    },
  },
});

export default useSideBar;
