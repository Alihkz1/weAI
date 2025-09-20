<script setup>
import { ref, onMounted, onBeforeUnmount, watch, reactive } from 'vue';
import MyButton from '@/components/MyButton.vue';
import './uploader-styles.scss';

const uploadInput = ref(null);
const dragZone = ref(null);

const newUploadedImage = ref(null)

const emit = defineEmits(["newUpload"])

watch(
    newUploadedImage,
    (newValue) => {
        emit('newUpload', newValue)
    },
)

const onUpload = () => {
    uploadInput.value.click();
};

function processFile(file) {
    if (!file.type.startsWith('image/')) return
    const sizeKB = Math.round(file.size / 1024)
    const img = new Image()
    img.onload = () => {
        const width = img.naturalWidth
        const height = img.naturalHeight
        const ratio = `${width}:${height}`
        //todo: toast
        newUploadedImage.value =
        {
            name: file.name,
            size: sizeKB,
            width,
            height,
            ratio,
            url: URL.createObjectURL(file),
        }
    }
    img.src = URL.createObjectURL(file)
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

onMounted(() => {
    uploadInput.value.addEventListener('change', (e) => {
        processFile(e.target.files[0]);
    });
    dragZone.value.addEventListener('dragover', onDragOver);
    dragZone.value.addEventListener('dragleave', onDragLeave);
    dragZone.value.addEventListener('drop', onDrop);
});

onBeforeUnmount(() => {
    dragZone.value.removeEventListener('dragover', onDragOver);
    dragZone.value.removeEventListener('dragleave', onDragLeave);
    dragZone.value.removeEventListener('drop', onDrop);
});
</script>

<template>
    <div class="flex flex-col gap-6 w-full">
        <h1 class="text-white text-2xl ps-1 font-semibold">Upload Photo</h1>
        <div class="bg-[#4D4DBD] h-[226px] rounded-2xl flex flex-col justify-center items-center gap-6" ref="dragZone">
            <!-- <div class="bg-bgBlue h-100 rounded-2xl flex flex-col justify-center items-center gap-6"> -->
            <!-- todo: tailwind config colors -->
            <h1 class="text-stone-200 font-bold text-xl">
                Drag or Select Your Photo
            </h1>
            <MyButton @click="onUpload">
                <img src="@/assets/upload.svg" alt="">
                Upload
            </MyButton>
            <input class="hidden" ref="uploadInput" type="file" accept="image/*" />
        </div>
    </div>
</template>