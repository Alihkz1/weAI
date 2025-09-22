import { defineStore } from "pinia";

export const useFileStore = defineStore("file", {
  state: () => ({ files: [] }),
  actions: {
    pushItem(newItem) {
      this.files.push(newItem);
    },
    removeItemByName(fileName: string) {
      this.files = this.files.filter((file) => file.name != fileName);
    },
    editFileByName(fileName: string, model) {
      const file = this.files.find((f) => f.name === fileName);
      file.data = model;
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
