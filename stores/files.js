import { defineStore } from "pinia";

export const useFileStore = defineStore("file", {
  state: () => ({ files: [] }),
  actions: {
    pushItem(newItem) {
      this.files.push(newItem);
    },
    popItem() {
      this.files.pop();
    },
    copy() {
      return [...this.files];
    },
    clear() {
      this.files = [];
    },
  },
});
