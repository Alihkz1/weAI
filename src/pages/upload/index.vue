<script setup>
import { ref } from 'vue';
import List from './List.vue';
import Masking from './Masking.vue';
import Preview from './Preview.vue';
import Uploader from './Uploader.vue';
import MyTransition from '@/components/MyTransition.vue';
import Loading from '@/components/Loading.vue';

let tabIndex = ref(0);
const toPreviewImage = ref(null)

const handleNewUpload = (e) => {
    if (!e) return;
    toPreviewImage.value = e
    tabIndex.value = 3
    setTimeout(() => {
        tabIndex.value = 2
    }, 2000);
}

const onManualMasking = () => {
    tabIndex.value = 1
}

</script>

<template>
    <div class="w-full flex justify-center">
        <MyTransition>
            <div class="min-h-screen w-full md:w-[620px] flex flex-col items-center">

                <!-- uploader -->
                <template v-if="tabIndex === 0" key="uploader">
                    <div class="w-full flex flex-col gap-2 items-center">
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
                    <Preview key="preview" :image="toPreviewImage" @manual-masking="onManualMasking" />
                </template>

                <template v-else-if="tabIndex === 3">
                    <Loading />
                </template>

            </div>
        </MyTransition>
    </div>
</template>