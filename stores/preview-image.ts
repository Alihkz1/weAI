import { defineStore } from "pinia";

export const usePreviewImage = defineStore("previewImage", {
  state: () => ({ image: null }),
  actions: {
    setImageForPreview(imageFile) {
      this.image = imageFile;
    },
    getImageForPreview() {
      return this.image;
    },
    reset() {
      this.image = null;
    },
  },
});
