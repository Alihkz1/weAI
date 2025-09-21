import { defineStore } from "pinia";

export const useTabStore = defineStore("tab", {
  state: () => ({ index: 0 }),
  actions: {
    increment() {
      this.index++;
    },
    decrement() {
      this.index--;
    },
    setTabIndex(n) {
      this.index = n;
    },
    tabIndex() {
      return this.index;
    },
  },
});
