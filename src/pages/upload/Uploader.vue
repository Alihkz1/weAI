<script setup lang="ts">
import { ref, onBeforeUnmount, watch } from "vue";
import MyButton from "@/components/MyButton.vue";
import MyTransition from "@/components/MyTransition.vue";
import { useIsMobile } from "@/composables/useIsMobile";
import { useTabStore } from "../../../stores/tab";
import { usePreviewImage } from "../../../stores/preview-image";
import List from "./List.vue";
import { processFile } from "@/utilities/process-file.utility";
import { TAB_INDEX } from "@/enums/tab-index.enum";

const errorText = ref<string | null>(null);
const uploadedImage = ref<File | null>(null);
const dragZone = ref<HTMLElement | null>(null);
const uploadInput = ref<HTMLInputElement | null>(null);

const { setTabIndex } = useTabStore();
const { isMobile, unmount } = useIsMobile();
const previewImageStore = usePreviewImage();

const emit = defineEmits(["newUpload"]);

onBeforeUnmount(unmount);

const handleUpload = () => {
  if (!uploadedImage.value) return;
  previewImageStore.setImageForPreview(uploadedImage.value);
  setTabIndex(TAB_INDEX.LOADING);
  setTimeout(() => {
    setTabIndex(TAB_INDEX.PREVIEW);
  }, 2000);
};

watch(uploadedImage, handleUpload);

const onUpload = () => {
  uploadInput.value?.click();
};

let dragCounter = 0;

const onDragEnter = (e: DragEvent) => {
  e.preventDefault();
  dragCounter++;
  dragZone.value?.classList.add("drag-over");
};

const onDragLeave = (e: DragEvent) => {
  e.preventDefault();
  dragCounter--;
  if (dragCounter <= 0) {
    dragZone.value?.classList.remove("drag-over");
    dragCounter = 0;
  }
};

const onDrop = async (e: DragEvent) => {
  e.preventDefault();
  dragCounter = 0;
  dragZone.value?.classList.remove("drag-over");
  const files = e.dataTransfer?.files;
  if (files && files.length) executeUploading(files);
};

const uploadInputChange = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length) executeUploading(files);
};

const executeUploading = async (files: FileList) => {
  const { newUploadedImage, errorMessage } = await processFile(files[0]);
  if (errorMessage) errorText.value = errorMessage;
  if (newUploadedImage) uploadedImage.value = newUploadedImage;
};

</script>

<template>
  <div class="w-full flex flex-col gap-2 items-center">
    <div class="flex flex-col gap-3 w-full">
      <h1 class="text-gray-100 text-2xl ps-1 font-bold mb-3">Upload Photo</h1>
      <div class="bg-[#4D4DBD66] h-[314px] md:h-[438px] rounded-2xl flex flex-col justify-center items-center gap-6"
        ref="dragZone" @dragover.prevent @dragenter.prevent="onDragEnter" @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop">
        <h1 class="text-xl text-[#CECEEE] font-bold">
          <span v-if="!isMobile">Drag or </span> <span>Select Your Photo</span>
        </h1>
        <MyButton @click="onUpload">
          <img src="@/assets/svgs/upload.svg" alt="" />
          Upload
        </MyButton>
        <input class="hidden" ref="uploadInput" type="file" accept="image/*" @change="uploadInputChange" />
      </div>
      <MyTransition>
        <p v-if="errorText" class="ps-2 text-red-300 text-sm">{{ errorText }}</p>
      </MyTransition>
    </div>
    <List />
  </div>
</template>

<style>
.drag-over {
  background-color: #313188;
  border: 2px dashed white;
}
</style>
