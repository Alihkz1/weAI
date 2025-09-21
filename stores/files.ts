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
    uploadedFilesInStore() {
      return [...this.files];
    },
    clear() {
      this.files = [];
    },
    sameNameExists(imageName) {
      return this.files.findIndex((f) => f.data.name === imageName) > -1;
    },
    sameFileExists(fileName) {
      return this.files.findIndex((f) => f.name === fileName) > -1;
    },
  },
});
