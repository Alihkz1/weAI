<script setup>
import { ref } from 'vue';
import List from './List.vue';
import Masking from './Masking.vue';
import Preview from './Preview.vue';
import Uploader from './Uploader.vue';
import MyTransition from '@/components/MyTransition.vue';

let tabIndex = ref(0);

const uploadedItems = ref([])

const handleNewUpload = (e) => {
    uploadedItems.value = e
}

</script>

<template>
    <div class="w-full flex justify-center">
        <MyTransition>
            <template v-if="tabIndex === 0" key="uploader">
                <div class="min-h-screen w-full md:w-[620px] flex flex-col gap-2 items-center">
                    <Uploader v-on:new-upload="handleNewUpload" />
                    <List :items="uploadedItems" />
                </div>
            </template>
            <template v-else-if="tabIndex === 1">
                <Masking key="masking" />

            </template>
            <template v-else-if="tabIndex === 2">
                <Preview key="preview" />
            </template>
        </MyTransition>
    </div>
</template>