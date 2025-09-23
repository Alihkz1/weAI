import { defineStore } from "pinia";

interface PreviewImageState {
  image: File | null;
}

export const usePreviewImage = defineStore("previewImage", {
  state: (): PreviewImageState => ({ image: null }),
  actions: {
    setImageForPreview(imageFile: File) {
      this.image = imageFile;
    },
    resetPreviewImage() {
      this.image = null;
    },
  },
});
