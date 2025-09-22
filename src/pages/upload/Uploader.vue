<script setup>
import { ref, onBeforeUnmount, watch } from "vue";
import MyButton from "@/components/MyButton.vue";
import { useIsMobile } from "@/composables/useIsMobile";
import MyTransition from "@/components/MyTransition.vue";
import { useTabStore } from "../../../stores/tab";
import { usePreviewImage } from "../../../stores/preview-image";
import List from "./List.vue";
import { processFile } from "@/functions/process-file.function";
import { TAB_INDEX } from "@/enums/tab-index.enum";

const dragZone = ref(null);
const errorText = ref(null);
const uploadInput = ref(null);
const uploadedImage = ref(null);

const { setTabIndex } = useTabStore();
const { isMobile, unmount } = useIsMobile();
const previewImageStore = usePreviewImage();

const emit = defineEmits(["newUpload"]);

onBeforeUnmount(unmount);

const handleUpload = () => {
  previewImageStore.setImageForPreview(uploadedImage.value);
  setTabIndex(TAB_INDEX.LOADING);
  setTimeout(() => {
    setTabIndex(TAB_INDEX.PREVIEW);
  }, 2000);
};

watch(uploadedImage, handleUpload);

const onUpload = () => {
  uploadInput.value.click();
};

const onDragOver = (e) => {
  e.preventDefault();
  dragZone.value.classList.add("drag-over");
};

const onDragLeave = (e) => {
  e.preventDefault();
  dragZone.value.classList.remove("drag-over");
};

const onDrop = async (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  executeUploading(files)
};

const uploadInputChange = async (e) => {
  const files = e.target.files
  executeUploading(files)
}

const executeUploading = async (files) => {
  if (files.length) {
    const { newUploadedImage, errorMessage } = await processFile(files[0]);
    if (errorMessage) errorText.value = errorMessage;
    if (newUploadedImage)
      uploadedImage.value = newUploadedImage;
  }
  dragZone.value.classList.remove("drag-over");
}

</script>

<template>
  <div class="w-full flex flex-col gap-2 items-center">
    <div class="flex flex-col gap-3 w-full">
      <h1 class="text-gray-100 text-2xl ps-1 font-bold mb-3">Upload Photo</h1>
      <div class="bg-[#4D4DBD66] h-[314px] md:h-[438px] rounded-2xl flex flex-col justify-center items-center gap-6"
        ref="dragZone" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
        <h1 class="text-xl text-[#CECEEE] font-bold text-xl">
          <span v-if="!isMobile">Drag or </span> <span>Select Your Photo</span>
        </h1>
        <MyButton @click="onUpload">
          <img src="@/assets/svgs/upload.svg" alt="" />
          Upload
        </MyButton>
        <input class="hidden" ref="uploadInput" type="file" accept="image/*" @change="uploadInputChange" />
      </div>
      <MyTransition>
        <p v-if="errorText" class="ps-2 text-red-300 text-sm">
          {{ errorText }}
        </p>
      </MyTransition>
    </div>
    <List />
  </div>
</template>

<style>
.drag-over {
  background-color: #313188;
  border: white dashed;
}
</style>
