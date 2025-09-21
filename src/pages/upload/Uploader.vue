<script setup>
import { ref, onBeforeUnmount, watch } from 'vue';
import MyButton from '@/components/MyButton.vue';
import { useIsMobile } from '@/composables/useIsMobile';
import { useFileStore } from '../../../stores/files';
import { ERROR_MESSAGE } from '@/enums/error-messages.enum';
import MyTransition from '@/components/MyTransition.vue';
import { useTabStore } from '../../../stores/tab';
import { usePreviewImage } from '../../../stores/preview-image';
import List from './List.vue';

const dragZone = ref(null);
const uploadInput = ref(null);
const errorMessage = ref(null)
const newUploadedImage = ref(null)

const { sameFileExists } = useFileStore()
const { isMobile, unmount } = useIsMobile()
const { set: setTabIndex } = useTabStore()
const previewImageStore = usePreviewImage()

const emit = defineEmits(["newUpload"])

onBeforeUnmount(unmount)

watch(
    newUploadedImage,
    () => {
        newUpload()
    },
)

const newUpload = () => {
    previewImageStore.setImageForPreview(newUploadedImage.value)
    setTabIndex(3)
    setTimeout(() => {
        setTabIndex(2)
    }, 2000);
}

const onUpload = () => {
    uploadInput.value.click();
};

async function processFile(file) {
    if (!file.type.startsWith('image/')) return;

    const maxSizeKB = 5 * 1024;
    const sizeKB = Math.round(file.size / 1024);

    if (sizeKB > maxSizeKB) {
        errorMessage.value = ERROR_MESSAGE.IMAGE_SIZE_INVALID;
        return;
    }

    try {
        const bitmap = await createImageBitmap(file);
        const width = bitmap.width;
        const height = bitmap.height;
        const ratio = `${width}:${height}`;

        if (sameFileExists(file.name)) {
            errorMessage.value = ERROR_MESSAGE.IMAGE_ALREADY_EXISTS;
            return;
        }

        errorMessage.value = null;

        newUploadedImage.value = {
            name: file.name,
            size: sizeKB,
            width,
            height,
            ratio,
            url: URL.createObjectURL(file),
        };
    } catch (err) {
        errorMessage.value = ERROR_MESSAGE.COULD_NOT_READ_IMAGE;
    }
}


const onDragOver = (e) => {
    e.preventDefault();
    dragZone.value.classList.add('drag-over');
};

const onDragLeave = (e) => {
    e.preventDefault();
    dragZone.value.classList.remove('drag-over');
};

const onDrop = (e) => {
    e.preventDefault();
    dragZone.value.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length) processFile(files[0]);
};
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
                    <img src="@/assets/svgs/upload.svg" alt="">
                    Upload
                </MyButton>
                <input class="hidden" ref="uploadInput" type="file" accept="image/*"
                    @change="(e) => processFile(e.target.files[0])" />
            </div>
            <MyTransition>
                <p v-if="errorMessage" class="ps-2 text-red-300 text-sm">{{ errorMessage }}</p>
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