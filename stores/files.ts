import { defineStore } from "pinia";

export interface FileData {
  name: string;
  category: string;
}

export interface UploadedFile extends File {
  data: FileData;
}

interface FileState {
  files: UploadedFile[];
}

export const useFileStore = defineStore("file", {
  state: (): FileState => ({
    files: [],
  }),

  actions: {
    pushItem(newItem: UploadedFile) {
      this.files.push(newItem);
    },

    removeItemByName(fileName: string) {
      this.files = this.files.filter((file) => file.name !== fileName);
    },

    editFileByName(fileName: string, model: FileData) {
      const file = this.files.find((f) => f.name === fileName);
      if (file) {
        file.data = model;
      }
    },

    popItem() {
      this.files.pop();
    },

    uploadedFilesInStore(): UploadedFile[] {
      return [...this.files];
    },

    clear() {
      this.files = [];
    },

    sameNameExists(imageName: string): boolean {
      return this.files.some((f) => f.data.name === imageName);
    },

    sameFileExists(fileName: string): boolean {
      return this.files.some((f) => f.name === fileName);
    },
  },
});
