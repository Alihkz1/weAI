<script setup>
import { computed, ref, watch, watchEffect } from 'vue';
import List from './List.vue';
import Masking from './Masking.vue';
import Preview from './Preview.vue';
import Uploader from './Uploader.vue';
import MyTransition from '@/components/MyTransition.vue';
import Loading from '@/components/Loading.vue';
import { useTabStore } from '../../../stores/tab';
import { useFileStore } from '../../../stores/files';

const toPreviewImage = ref(null)

const handleNewUpload = (e) => {
    if (!e) return;
    toPreviewImage.value = e
    tabStore.set(3)
    setTimeout(() => {
        tabStore.set(2)
    }, 2000);
}

const handleManualMasking = () => {
    tabStore.set(1)
}

const handlePreviewCompletion = () => {
    tabStore.set(0)
    toPreviewImage.value = null
}

const tabStore = useTabStore()
const filesStore = useFileStore()

const uploadedFiles = computed(() => [...filesStore.copy()])
</script>

<template>
    <div class="h-full w-full flex justify-center">
        <div class="h-full w-full md:w-[620px] flex flex-col items-center">
            <MyTransition>

                <!-- uploader -->
                <template v-if="tabStore.index === 0" key="uploader">
                    <div class="w-full flex flex-col gap-2 items-center">
                        <Uploader @new-upload="handleNewUpload" />
                        <List :items="uploadedFiles" />
                    </div>
                </template>

                <!-- masking -->
                <template v-else-if="tabStore.index === 1">
                    <Masking key="masking" />
                </template>

                <!-- uploaded image preview -->
                <template v-else-if="tabStore.index === 2">
                    <Preview key="preview" :image="toPreviewImage" @manual-masking="handleManualMasking"
                        @previewCompletion="handlePreviewCompletion" />
                </template>

                <template v-else-if="tabStore.index === 3">
                    <Loading />
                </template>

            </MyTransition>
        </div>
    </div>
</template>