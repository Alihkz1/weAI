<script setup>
import { ref } from 'vue';
import List from './List.vue';
import Masking from './Masking.vue';
import Preview from './Preview.vue';
import Uploader from './Uploader.vue';
import MyTransition from '@/components/MyTransition.vue';

let tabIndex = ref(0);
const showLoading = ref(false)
const toPreviewImage = ref(null)

const handleNewUpload = (e) => {
    if (!e) return;
    showLoading.value = true;
    toPreviewImage.value = e

    setTimeout(() => {
        showLoading.value = false;
        tabIndex.value = 2
    }, 2000);
}

</script>

<template>
    <div class="w-full flex justify-center">
        <MyTransition>
            <div class="min-h-screen w-full md:w-[620px] flex flex-col items-center">
                
                <!-- uploader -->
                <template v-if="tabIndex === 0" key="uploader">
                    <div v-if="showLoading" class="flex-1 flex items-center justify-center">
                        <p class="text-stone-300">Loading...</p>
                    </div>
                    <div v-else class="w-full flex flex-col gap-2 items-center">
                        <Uploader @new-upload="handleNewUpload" />
                        <List :items="uploadedItems" />
                    </div>
                </template>

                <!-- masking -->
                <template v-else-if="tabIndex === 1">
                    <Masking key="masking" />
                </template>

                <!-- uploaded image preview -->
                <template v-else-if="tabIndex === 2">
                    <Preview key="preview" :image="toPreviewImage" />
                </template>

            </div>
        </MyTransition>
    </div>
</template>