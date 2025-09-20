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
    set(n) {
      this.index = n;
    },
  },
});
